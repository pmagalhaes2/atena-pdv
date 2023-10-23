const bcrypt = require("bcrypt");
const knex = require("../connection");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const userFound = await knex("usuarios").where({ email }).first();

    if (!userFound) {
      return res
        .status(404)
        .json({ mensagem: "E-mail e/ou senha inválido(s)" });
    }

    const { senha: userPassword, ...user } = userFound;

    const validPassword = await bcrypt.compare(senha, userPassword);

    if (!validPassword) {
      return res
        .status(404)
        .json({ mensagem: "E-mail e/ou senha inválido(s)" });
    }

    const token = jwt.sign({ id: userFound.id }, process.env.JWT_KEY, {
      expiresIn: "8h",
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = login;
