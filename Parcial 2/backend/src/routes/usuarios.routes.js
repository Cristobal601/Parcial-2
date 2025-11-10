const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Usuario, Publicacion } = require('../db');


// LA BASE DE LA RUTA SE DEFINE EN app.js

// GET /api/usuarios?q&pagina&limite → lista usuarios con filtros
router.get('/', async (req, res, next) => {
  try {
    const { q = '', pagina = 1, limite = 10 } = req.query;
    const offset = (pagina - 1) * limite;

    const usuarios = await Usuario.findAll({
      where: {
        nombre: { [Op.like]: `%${q}%` }
      },
      offset: parseInt(offset),
      limit: parseInt(limite),
      order: [['id', 'ASC']]
    });

    res.json(usuarios);
  } catch (error) {
    next(error);
  }
});

// GET /api/usuarios/:id → detalle
router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

// POST /api/usuarios → crea usuario
router.post('/', async (req, res, next) => {
  try {
    const { nombre, correo, ciudad } = req.body;
    const nuevo = await Usuario.create({ nombre, correo, ciudad });
    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
});

// PUT /api/usuarios/:id → actualiza parcial
router.put('/:id', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });

    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/usuarios/:id → elimina
router.delete('/:id', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });

    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
});

// GET /api/usuarios/:id/publicaciones → publicaciones del usuario
router.get('/:id/publicaciones', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: true, mensaje: 'Usuario no encontrado' });

    const publicaciones = await Publicacion.findAll({
      where: { usuarioId: req.params.id },
      order: [['id', 'ASC']]
    });

    res.json(publicaciones);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
