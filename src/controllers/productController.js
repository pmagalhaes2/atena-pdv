const knex = require("../connection");

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        const category = await knex("categorias").where({ id: categoria_id }).first();

        if (!category) {
            return res
                .status(400)
                .json({ mensagem: "Categoria inválida" });
        }

        const productName = await knex("produtos").where({ descricao }).first();

        if (productName) {
            return res
                .status(400)
                .json({ mensagem: "Produto já cadastrado", "Produto": productName });
        }

        const product = await knex("produtos")
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })
            .returning("*");

        return res.status(201).json({ "Produto registrado": product[0] });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = { registerProduct };