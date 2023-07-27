const { response } = require('express')

const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate('user', 'name')

  try {
    res.status(201).json({
      ok: true,
      eventos,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'No se puede obtener eventos',
    })
  }
}

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body)

  try {
    evento.user = req.uid
    const eventoGuardado = await evento.save()

    res.status(201).json({
      ok: true,
      evento: eventoGuardado,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'No se puede crear eventos',
    })
  }
}

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id',
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No puedes editar este evento',
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    )
    res.json({
      ok: true,
      evento: eventoActualizado,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'No se puede actualizar eventos',
    })
  }
}

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id',
      })
    }

    if (evento.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: 'No puedes eliminar este evento',
      })
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId)

    res.json({
      ok: true,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'No se puede eliminar evento',
    })
  }
}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
}
