const knex = require("../connections/postgres");
const axios = require("axios");

const registerClient = async (req, res) => {
  try {
    const { nome, email, cpf, cep, numero } = req.body;

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = response.data;

    if (addressData.erro) {
      return res.status(400).json({ mensagem: "CEP não encontrado." });
    }

    const {
      logradouro: rua,
      bairro,
      localidade: cidade,
      uf: estado,
    } = addressData;

    const existingEmail = await knex("clientes").where({ email }).first();

    if (existingEmail) {
      return res.status(400).json({ mensagem: "Email já cadastrado." });
    }

    const existingCpf = await knex("clientes").where({ cpf }).first();

    if (existingCpf) {
      return res.status(400).json({ mensagem: "CPF já cadastrado." });
    }

    const client = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .returning("*");

    return res.status(201).json({ "Cliente Cadastrado": client[0] });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await knex("clientes");

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detailClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await knex("clientes").where({ id }).first();

    if (!client) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cpf, cep, numero } = req.body;

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = response.data;

    if (addressData.erro) {
      return res.status(400).json({ mensagem: "CEP não encontrado." });
    }

    const {
      logradouro: rua,
      bairro,
      localidade: cidade,
      uf: estado,
    } = addressData;

    const existingClient = await knex("clientes").where({ id }).first();

    if (!existingClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    const emailExists = await knex("clientes")
      .where({ email })
      .whereNot({ id })
      .first();

    if (emailExists) {
      return res.status(400).json({ mensagem: "Email já cadastrado." });
    }

    const cpfExists = await knex("clientes")
      .where({ cpf })
      .whereNot({ id })
      .first();

    if (cpfExists) {
      return res.status(400).json({ mensagem: "CPF já cadastrado." });
    }

    const updatedClient = {
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    };

    await knex("clientes").where({ id }).update(updatedClient);

    const client = await knex("clientes").where({ id }).first();

    return res
      .status(200)
      .json({ mensagem: "Cliente atualizado com sucesso", cliente: client });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  registerClient,
  getClients,
  detailClient,
  updateClient,
};
