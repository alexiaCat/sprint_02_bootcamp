const { Router } = require("express");
const {
    createBootcamp,
    addUser,
    findById,
    findAll,
} = require('../controllers/bootcamp.controller.js');
const { verifyToken } = require('../middleware');

const bootcampRouter = Router();

bootcampRouter.post('/api/bootcamp', [verifyToken], createBootcamp);
bootcampRouter.post('/api/bootcamp/adduser', [verifyToken], addUser);
bootcampRouter.get('/api/bootcamp/:id', [verifyToken], findById);
bootcampRouter.get('/api/bootcamp', findAll);

module.exports = {
    bootcampRouter
};