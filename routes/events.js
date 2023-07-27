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

// Obtener eventos
router.get('/', getEventos)

// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
)

// Actualizar Evento
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

// Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router
