const joi = require('joi');

const productSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao é obrigatório'
    }),
    quantidade_estoque: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'any.empty': 'O campo quantidade_estoque é obrigatório',
        'number.min': 'quantidade_estoque deve ser maior ou igual a 0',
        'number.base': 'O campo quantidade_estoque deve ser um número',
    }),
    valor: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo valor é obrigatório',
        'any.empty': 'O campo valor é obrigatório',
        'number.min': 'valor deve ser maior ou igual a 0',
        'number.base': 'O campo valor deve ser um número',
    }),
    categoria_id: joi.number().integer().min(1).required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'any.empty': 'O campo categoria_id é obrigatório',
        'number.min': 'categoria_id deve ser maior ou igual a 1',
        'number.base': 'O campo categoria_id deve ser um número',
    }),
});

module.exports = productSchema;