const joi = require("joi");

const productSchema = joi.object({
  produto_id: joi.number().integer().required().messages({
    "number.base": "O campo produto_id deve ser um número",
    "any.required": "O campo produto_id é obrigatório",
  }),
  quantidade_produto: joi.number().integer().min(1).required().messages({
    "number.base": "O campo quantidade_produto deve ser um número",
    "any.required": "O campo quantidade_produto é obrigatório",
    "number.min": "quantidade_produto deve ser maior ou igual a 1"
  }),
});

const orderSchema = joi.object({
  client_id: joi.number().integer().required().messages({
    "any.required": "O campo client_id é obrigatório",
    "number.base": "O campo client_id deve ser um número",
  }),
  observacao: joi.string().messages({
    "string.empty": "O campo observação não pode estar vazio",
    "string.base": "O campo observação deve ser um texto",
  }),
  pedido_produtos: joi
    .array()
    .min(1)
    .items(productSchema)
    .messages({
      "any.required": "O campo pedido_produtos é obrigatório",
      "array.base": "O campo pedido_produtos deve ser um array",
      "array.min": "O campo pedido_produtos deve conter no mínimo um item",
    }),
});

module.exports = orderSchema;
