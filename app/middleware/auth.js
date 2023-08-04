const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config.js'); 

const config = authConfig();

const checkToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'Debes iniciar sesión'
        });
    }

    try {
        jwt.verify(token, config.secretKey);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'No cuentas con acceso a este recurso - el token no es válido'
        });
    }
};

module.exports = checkToken;
