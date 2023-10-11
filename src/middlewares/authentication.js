const knex = require('../connection');
const jwt = require('jsonwebtoken');
const jwtKey = require('../../jwtKey');

const authenticatedUser = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, jwtKey);

        const userFound = await knex('usuarios').where({ id }).first();

        if (!userFound) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...user } = userFound;

        req.user = user;

        next()

    } catch (error) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

    }
}

module.exports = authenticatedUser;