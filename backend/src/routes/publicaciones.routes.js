const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');



const { Publicacion, Comentario } = require('../db');


// LA BASE DE LA RUTA SE DEFINE EN app.js

// GET /api/publicaciones → lista con filtros
router.get('/', async (req, res, next) => {
  try {
    const { q = '', usuarioId, pagina = 1, limite = 10 } = req.query;
    const offset = (pagina - 1) * limite;

    const where = {
      [Op.and]: [
        q ? {
          [Op.or]: [
            { titulo: { [Op.like]: `%${q}%` } },
            { cuerpo: { [Op.like]: `%${q}%` } }
          ]
        } : {},
        usuarioId ? { usuarioId } : {}
      ]
    };

    const publicaciones = await Publicacion.findAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limite),
      order: [['id', 'ASC']]
    });

    res.json(publicaciones);
  } catch (error) {
    next(error);
  }
});

// GET /api/publicaciones/:id → detalle
router.get('/:id', async (req, res, next) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });
    res.json(pub);
  } catch (error) {
    next(error);
  }
});

// POST /api/publicaciones → crear
router.post('/', async (req, res, next) => {
  try {
    const { usuarioId, titulo, cuerpo } = req.body;
    const nueva = await Publicacion.create({ usuarioId, titulo, cuerpo });
    res.status(201).json(nueva);
  } catch (error) {
    next(error);
  }
});

// PUT /api/publicaciones/:id → actualizar
router.put('/:id', async (req, res, next) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });

    await pub.update(req.body);
    res.json(pub);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/publicaciones/:id → eliminar
router.delete('/:id', async (req, res, next) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: true, mensaje: 'Publicación no encontrada' });

    await pub.destroy();
    res.json({ mensaje: 'Publicación eliminada' });
  } catch (error) {
    next(error);
  }
});

// GET /api/publicaciones/:id/comentarios → lista comentarios
router.get('/:id/comentarios', async (req, res, next) => {
  try {
    const comentarios = await Comentario.findAll({
      where: { publicacionId: req.params.id },
      order: [['id', 'ASC']]
    });

    res.json(comentarios);
  } catch (error) {
    next(error);
  }
});

// POST /api/publicaciones/:id/comentarios → crear comentario
router.post('/:id/comentarios', async (req, res, next) => {
  try {
    const { nombre, correo, cuerpo } = req.body;
    const nuevo = await Comentario.create({
      publicacionId: req.params.id,
      nombre,
      correo,
      cuerpo
    });

    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
