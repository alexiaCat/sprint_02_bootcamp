const { User } = require('../models/user.model.js');
const { Bootcamp } = require('../models/bootcamp.model.js');


const createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;

    if (!title || !cue || !description) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const createdBootcamp = await Bootcamp.create({
      title,
      cue,
      description,
    });

    res.status(201).json(createdBootcamp);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: "Error de validación al crear el bootcamp", message: err.message });
    } else {
      res.status(500).json({ error: "Error al crear el bootcamp" });
    }
  }
};


const addUser = async (req, res) => {
  try {
    const { id, user_id } = req.body;
    const bootcampId = parseInt(id, 10);
    const userId = parseInt(user_id, 10);
    if (isNaN(bootcampId) || bootcampId <= 0 || isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "Los campos 'id' y 'user_id' deben ser números enteros válidos y mayores que cero." });
    }

    const bootcamp = await Bootcamp.findByPk(bootcampId);
    if (!bootcamp) {
      return res.status(404).json({ error: "No se encontró el Bootcamp" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await bootcamp.addUser(user);

    return res.status(200).json(bootcamp);
  } catch (err) {
    return res.status(500).json({ error: "Error mientras se estaba agregando Usuario al Bootcamp" });
  }
};


const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcampId = parseInt(id, 10);

    if (isNaN(bootcampId) || bootcampId <= 0) {
      return res.status(400).json({ error: "El parámetro 'id' debe ser un número entero válido y mayor que cero." });
    }

    const bootcamp = await Bootcamp.findByPk(bootcampId, {
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }],
    });

    if (!bootcamp) {
      return res.status(404).json({ error: "Bootcamp no encontrado" });
    }

    res.status(200).json(bootcamp);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el bootcamp" });
  }
};


const findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }],
    });
    res.status(200).json(bootcamps);
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).json({
        message: "Error en la consulta a la base de datos",
        code: 500,
        name: error.name,
        mensajePersonalizado: "Error al obtener los bootcamps",
      });
    }
  }
};



module.exports = {
  findAll,
  findById,
  addUser,
  createBootcamp
}