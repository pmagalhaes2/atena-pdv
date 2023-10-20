const knex = require("../connection");
const axios = require('axios');


const registerClient = async (req, res) => {

  try {
    const { nome, email, cpf, cep, numero } = req.body;

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = response.data;

    if (addressData.erro) {
      return res.status(400).json({ mensagem: "CEP não encontrado." });
    }

    const { logradouro: rua, bairro, localidade: cidade, uf: estado } = addressData;

    const existingEmail = await knex("clientes").where({ email }).first();

    if (existingEmail) {
      return res.status(400).json({ mensagem: "Email já cadastrado." });
    };

    const existingCpf = await knex("clientes").where({ cpf }).first();

    if (existingCpf) {
      return res.status(400).json({ mensagem: "CPF já cadastrado." });
    };

    const client = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero: req.body.numero,
        bairro,
        cidade,
        estado
      })
      .returning("*");

    return res.status(201).json({ "Cliente Cadastrado": client[0] });

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const getClients = async (req, res) => {

  try {
    const clients = await knex
      .from('clientes')
      .select('*')

    const { senha: _, ...clientsFormatted } = clients

    return res.status(200).json(clientsFormatted)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const detailClient = async (req, res) => {
  const { id } = req.params

  try {
    const client = await knex('clientes').where({ id })

    return res.status(200).json(client)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  registerClient,
  getClients,
  detailClient
}