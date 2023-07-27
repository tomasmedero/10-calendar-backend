const { Router } = require('express')
const { validarJWT } = require('../middlewares/validarJWT')
const {
  getEventos,
  actualizarEvento,
  crearEvento,
  eliminarEvento,
} = require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const { isDate } = require('../helpers/isDate')

const router = Router()

//Validar Token

router.use(validarJWT)

//Obtener Eventos
router.get(
  '/',

  getEventos
)

//Crear un nuevo Evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),

    check('start', 'La fecha de inicio es obligatorio').custom(isDate),
    check('end', 'La fecha de fin es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearEvento
)

//Actualizar Evento
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  actualizarEvento
)

//Eliminar Evento
router.delete('/:id', eliminarEvento)

module.exports = router
