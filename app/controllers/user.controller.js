const { User } = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
const { Bootcamp } = require('../models/bootcamp.model.js');
const { generateJWT } = require('../helpers/generateToken.js');
const { verifySignup } = require('../middleware');


const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    verifySignup(req, res, async () => {
      const hashedPassword = bcrypt.hashSync(password);

      try {
        const createdUser = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        res.status(201).json(createdUser);
      } catch (err) {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json({ error: "Error de validación al crear el usuario", message: err.message });
        } else {
          res.status(500).json({ error: "Error al crear el usuario" });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Correo o contraseña incorrecta" });
    }

    const passCrypt = bcrypt.compareSync(password, user.password);
    if (!passCrypt) {
      return res.status(401).json({ error: "Correo o contraseña incorrecta" });
    }

    const token = await generateJWT(user.id);

    res.json({ msg: 'Log exitoso, se genero el token', token });
  } catch (err) {
    res.status(500).json({ error: "Usuario no registrado" });
  }
};



const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "El parámetro 'id' debe ser un número entero válido y mayor que cero." });
    }

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Bootcamp,
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado. Verifica el ID proporcionado." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error en la consulta a la base de datos:", err);
    res.status(500).json({ error: "Error al obtener el usuario. Por favor, intenta nuevamente más tarde." });
  }
};


const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Bootcamp,
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }],
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(`>> Error al obtener los usuarios: ${err}`);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};



const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const userId = parseInt(id, 10);

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "El parámetro 'id' debe ser un número entero válido y mayor que cero." });
    }

    if (!firstName.trim() || !lastName.trim()) {
      return res.status(400).json({ error: "Los campos 'firstName' y 'lastName' no pueden estar vacíos." });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.update({ firstName, lastName });

    res.status(200).json({ msg: 'Usuario actualizado exitosamente' });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: "Error de validación al actualizar el usuario", message: err.message });
    }
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};



const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "El parámetro 'id' debe ser un número entero válido y mayor que cero." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    res.status(200).json({ message: `Usuario id: ${userId} eliminado exitosamente` });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};


module.exports = {
  createUser,
  signin,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
};



