const knex = require("../connection");

const registerOrder = async (req, res) => {
  const { client_id, observacao, pedido_produtos } = req.body;

  try {
    const existingClient = await knex("clientes")
      .where({ id: client_id })
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

      // TODO - Criar lógica para cadastrar os pedidos somente se todos contiverem o campo produto_id válido
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { registerOrder };
