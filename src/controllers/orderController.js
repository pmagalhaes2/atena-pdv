const knex = require("../connections/postgres");
const sendEmail = require("../connections/nodemailer");
const htmlCompiler = require("../utils/htmlCompiler");
const productsList = require("../utils/htmlString");

const registerOrder = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const existingClient = await knex("clientes")
      .where({ id: cliente_id })
      .first();

    if (!existingClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    let valor_total = 0;

    for (const order of pedido_produtos) {
      const existingProduct = await knex("produtos")
        .where({ id: order.produto_id })
        .first();

      if (!existingProduct) {
        return res.status(404).json({
          mensagem: `Nenhum produto com o id ${order.produto_id} foi encontrado.`,
        });
      }

      if (existingProduct.quantidade_estoque < order.quantidade_produto) {
        return res.status(404).json({
          mensagem: `Apenas ${existingProduct.quantidade_estoque} unidades disponíveis do produto ${existingProduct.descricao}`
        })
      }
      valor_total += order.quantidade_produto * existingProduct.valor;
    }

    const newOrder = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total,
      })
      .returning("*");

    for (const order of pedido_produtos) {
      await knex("pedido_produtos")
        .insert({
          pedido_id: newOrder[0].id,
          produto_id: order.produto_id,
          quantidade_produto: order.quantidade_produto,
          valor_produto: knex.raw("(SELECT valor FROM produtos WHERE id = ?)", [
            order.produto_id,
          ]),
        })
        .returning("*");
    }

    const orderObject = {
      numero_do_pedido: newOrder[0].id,
      produtos: pedido_produtos,
      valor_total,
    };

    const html = await htmlCompiler("./src/templates/email.html", {
      client: existingClient.nome,
      order: newOrder[0].id,
      products: await productsList(req),
      totalPrice: (valor_total / 100).toFixed(2),
    });

    sendEmail(existingClient.nome, existingClient.email, html);

    return res
      .status(201)
      .json({ mensagem: "Pedido realizado com sucesso", pedido: orderObject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listOrder = async (req, res) => {
  try {
    const { cliente_id } = req.query;
   

    let query = knex("pedidos as p")
      .select(
        "p.id as pedido_id",
        "p.valor_total",
        "p.observacao",
        "p.cliente_id",
        "pp.id as produto_pedido_id",
        "pp.quantidade_produto",
        "pp.valor_produto as valor_unitario",
        "pp.pedido_id",
        "pp.produto_id"
      )
      .leftJoin("pedido_produtos as pp", "p.id", "pp.pedido_id");

    if (cliente_id) {
      query = query.where("p.cliente_id", cliente_id);
    }

    const orders = await query;

    const formattedOrders = {};

    for (const order of orders) {
      const { pedido_id, cliente_id, observacao, valor_total } = order;
      if (!formattedOrders[pedido_id]) {
        formattedOrders[pedido_id] = {
          pedido: {
            id: pedido_id,
            cliente_id,
            observacao,
            valor_total,
          },
          pedido_produtos: [],
        };
      }

      if (order.produto_pedido_id) {
        formattedOrders[pedido_id].pedido_produtos.push({
          id: order.produto_pedido_id,
          quantidade_produto: order.quantidade_produto,
          valor_unitario: order.valor_unitario,
          pedido_id: order.pedido_id,
          produto_id: order.produto_id,
        });
      }
    }

    return res.status(200).json(Object.values(formattedOrders));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { 
  registerOrder,
  listOrder
};
