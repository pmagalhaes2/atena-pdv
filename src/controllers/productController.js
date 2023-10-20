const knex = require("../connection");

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const category = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!category) {
      return res.status(400).json({ mensagem: "Categoria inválida" });
    }

    const productName = await knex("produtos")
      .where("descricao", "ilike", descricao)
      .first();

    if (productName) {
      return res
        .status(400)
        .json({ mensagem: "Produto já cadastrado", Produto: productName });
    }

    const product = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    return res.status(201).json({ "Produto registrado": product[0] });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const productFound = await knex("produtos").where({ id }).first();

    if (!productFound) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const productName = await knex("produtos")
      .where("descricao", "ilike", descricao)
      .whereNot("id", "=", id)
      .first();

    if (productName) {
      return res.status(400).json({
        mensagem: "Já existe um produto com essa descricao",
        Produto: productName,
      });
    }

    const category = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!category) {
      return res.status(400).json({ mensagem: "Categoria inválida" });
    }

    const updateProduct = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    if (!updateProduct) {
      return res.status(400).json({ mensagem: "Erro ao atualizar produto." });
    }

    return res.status(200).json({
      mensagem: "Produto atualizado com sucesso!",
      Produto: updateProduct[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getProducts = async (req, res) => {
  let { categoria_id } = req.query;

  try {
    if (!categoria_id) {
      const products = await knex("produtos");

      return res.status(200).json(products);
    }

    if (typeof categoria_id === "string") categoria_id = Array(categoria_id);

    const categoryFound = await knex("categorias").whereIn("id", categoria_id);

    if (!categoryFound.length) {
      return res.status(404).json({ mensagem: "Categoria inválida!" });
    }

    const filteredProducts = await knex("produtos").whereIn(
      "categoria_id",
      categoria_id
    );

    if (!filteredProducts.length) {
      return res.status(400).json({
        mensagem:
          "Não foi encontrado nenhum produto cadastrado com essa categoria!",
      });
    }

    return res.status(200).json(filteredProducts);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productFound = await knex("produtos").where({ id }).first();

    if (!productFound) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.status(200).json(productFound);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { registerProduct, updateProduct, getProducts, detailProduct };
