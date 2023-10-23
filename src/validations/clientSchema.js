const joi = require('joi');

const clientSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome não pode estar vazio'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode estar vazio',
        'string.email': 'O campo email precisa ter um email válido'
    }),
    cpf: joi.string().length(11).pattern(/^\d+$/).required().messages({
        'any.required': 'O campo CPF é obrigatório',
        'string.empty': 'O campo CPF não pode estar vazio',
        'string.length': 'O campo CPF deve ter 11 caracteres',
        'string.pattern.base': 'O campo CPF deve conter apenas números'
    }),
    cep: joi.string().length(8).pattern(/^\d+$/).required().messages({
        'any.required': 'O campo CEP é obrigatório',
        'string.empty': 'O campo CEP não pode estar vazio',
        'string.length': 'O campo CEP deve ter 8 caracteres',
        'string.pattern.base': 'O campo CEP deve conter apenas números'
    }),

});

module.exports = clientSchema;