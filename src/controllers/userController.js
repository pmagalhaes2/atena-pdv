const bcrypt = require("bcrypt");
const knex = require("../connection");

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const passwordEncrypted = await bcrypt.hash(senha, 10);

    const userFound = await knex("usuarios").where({ email }).first();

    if (userFound) {
      return res
        .status(400)
        .json({ mensagem: "Esse email já possui cadastro" });
    }

    const user = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: passwordEncrypted,
      })
      .returning("*");

    const { senha: _, ...userRegistered } = user[0];

    return res.status(201).json(userRegistered);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detailUser = async (req, res) => {
  const { user } = req;

  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { user } = req;
  const { nome, email, senha } = req.body;

  try {
    const emailAlreadyRegistered = await knex("usuarios")
      .where({ email })
      .andWhere("id", "<>", user.id)
      .first();

    if (emailAlreadyRegistered) {
      return res
        .status(400)
        .json({ mensagem: "O e-mail informado já consta cadastrado." });
    }

    const passwordEncrypted = await bcrypt.hash(senha, 10);

    const updateUser = await knex("usuarios")
      .where({ id: user.id })
      .update({
        nome,
        email,
        senha: passwordEncrypted,
      })
      .returning("*");

    if (!updateUser) {
      return res.status(400).json({ mensagem: "Erro ao atualizar usuário." });
    }

    return res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  registerUser,
  detailUser,
  updateUser,
};
