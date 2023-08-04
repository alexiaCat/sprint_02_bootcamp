const { Router } = require("express");
const {
    createUser,
    signin,
    findUserById,
    findAll,
    updateUserById,
    deleteUserById,
} = require('../controllers/user.controller.js');
const { verifyToken } = require('../middleware');

const userRouter = Router();

userRouter.post('/api/signup', createUser);
userRouter.post('/api/signin', signin);
userRouter.get('/api/user/:id', [verifyToken], findUserById);
userRouter.get('/api/user', [verifyToken], findAll);
userRouter.put('/api/user/:id', [verifyToken], updateUserById);
userRouter.delete('/api/user/:id', [verifyToken], deleteUserById);

module.exports = {
    userRouter
};