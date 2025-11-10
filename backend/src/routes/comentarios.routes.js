const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario');

// LA BASE DE LA RUTA SE DEFINE EN app.js

// DELETE /api/comentarios/:id → elimina comentario

router.post('/', async (req, res, next) => {
  try {
    const { publicacionId, nombre, cuerpo } = req.body;
    const nuevo = await Comentario.create({ publicacionId, nombre, cuerpo });
    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) {
      return res.status(404).json({ error: true, mensaje: 'Comentario no encontrado' });
    }

    await comentario.destroy();
    res.json({ mensaje: 'Comentario eliminado' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
