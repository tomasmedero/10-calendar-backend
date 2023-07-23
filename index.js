const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//Crear servidor de express

const app = express()

//Base de Datos
dbConnection()

//Lectura y parseo del body

app.use(express.json())

//CORs
app.use(cors())

//Directorio Publico

app.use(express.static('public'))

//Rutas

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Escuchar Peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT} `)
})
