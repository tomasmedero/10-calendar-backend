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
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),

    check('start', 'La fecha de inicio es obligatorio').custom(isDate),
    check('end', 'La fecha de fin es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  getEventos
)

//Crear un nuevo Evento
router.post('/', crearEvento)

//Actualizar Evento
router.put('/:id', actualizarEvento)

//Eliminar Evento
router.delete('/:id', eliminarEvento)

module.exports = router
