const knex = require("../connection");
const axios = require('axios');


const registerCustomer = async (req, res) => {

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

const listerCustomers = async (req, res) => {

  try {
    const customers = await knex
      .from('clientes')
      .select('*')

    const { senha: _, ...customersFormatted } = customers

    return res.status(200).json(customersFormatted)

  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const detailCustomer = async (req, res) => {
  const { id } = req.params

  try {
    const customer = await knex
      .from('clientes')
      .select('*')
      .where({ id })

    return res.json(customer)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  registerCustomer,
  listerCustomers,
  detailCustomer
}