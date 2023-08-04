const express = require('express');
const { userRouter } = require('../routes/user.routes.js');
const { bootcampRouter } = require('../routes/bootcamp.routes.js');
const { User } = require('./user.model.js');
const { Bootcamp } = require('./bootcamp.model.js');


class Index {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3500;
        this.middlewares();
        this.routes();
        this.setupDatabase();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', userRouter);
        this.app.use('/', bootcampRouter);
    }

    setupDatabase() {
        User.belongsToMany(Bootcamp, {
            through: "user_bootcamp",
            foreignKey: "user_id",
        });

        Bootcamp.belongsToMany(User, {
            through: "user_bootcamp",
            foreignKey: "bootcamp_id",
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Index;
