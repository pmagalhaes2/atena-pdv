const knex = require("../connections/postgres");
const sendEmail = require("../connections/nodemailer");
const htmlCompiler = require("../utils/htmlCompiler");
const { exist } = require("joi");

const registerOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const existingClient = await knex("clientes")
      .where({ id: cliente_id })
      .first();

    if (!existingClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    for (const order of pedido_produtos) {
      const existingProduct = await knex("produtos")
        .where({ id: order.produto_id })
        .first();

      if (!existingProduct) {
        return res.status(404).json({
          mensagem: `Nenhum produto com o id ${order.produto_id} foi encontrado.`,
        });
      }
    }

    // TODO - Criar lógica para cadastrar os pedidos somente se todos contiverem o campo produto_id válido

    const newOrder = await knex('pedidos')
      .insert({
        cliente_id,
        observacao
      })
      .returning('*');

    let valor_total = 0;

    for (const order of pedido_produtos) {
      const productPrice = await knex('produtos')
        .where({ id: order.produto_id })
        .select('valor as valor_produto');

      const productOrder = await knex('pedido_produtos')
        .insert({
          pedido_id: newOrder[0].id,
          produto_id: order.produto_id,
          quantidade_produto: order.quantidade_produto,
          valor_produto: productPrice[0].valor_produto
        })
        .returning('*')

      valor_total += (order.quantidade_produto * productPrice[0].valor_produto);
    }

    await knex('pedidos')
      .where({ id: newOrder[0].id })
      .update({ valor_total });

    const orderObject = {
      numero_do_pedido: newOrder[0].id,
      produtos: pedido_produtos,
      valor_total
    }

    const html = await htmlCompiler('./src/templates/email.html', {
      client: existingClient.nome,
      order: newOrder[0].id,
      products: pedido_produtos.map((product) => {
        return `
          Produto #${product.produto_id} \n
          Quantidade: ${product.quantidade_produto}
        `
      }),
      totalPrice: valor_total
    });

    sendEmail(existingClient.nome, existingClient.email, html);

    return res
      .status(201)
      .json({ mensagem: 'Pedido realizado com sucesso', pedido: orderObject })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { registerOrder };
