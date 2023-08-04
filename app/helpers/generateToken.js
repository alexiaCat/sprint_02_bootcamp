const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config.js');

const config = authConfig();

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, config.secretKey, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('Error al crear el token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateJWT,
};
