const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const objectRoutes = require('./routes/objects')
const userRoutes = require('./routes/user')

app.use('/api/objetos', objectRoutes)
app.use('/api/usuarios', userRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/mongosh?directConnection=true&serverSelectionTimeoutMS=2000')
  .then(() => {
    app.listen(5000, () => {
      console.log('servidor iniciado en puerto 5000')
    })

    // ✅ Ejecutar después de la conexión
    crearAdminSiNoExiste()
  })
  .catch((err) => {
    console.error('error al conectar a la base de datos:', err)
  })

// ✅ Lógica para crear automáticamente a GustavoPeralta si no existe
const User = require('./models/User')

const crearAdminSiNoExiste = async () => {
  try {
    const admin = await User.findOne({ username: 'GustavoPeralta' })
    if (!admin) {
      const nuevoAdmin = new User({
        username: 'GustavoPeralta',
        password: 'admin123', // Podés cambiarla por una más segura
        role: 'admin'
      })
      await nuevoAdmin.save()
      console.log('✅ Usuario administrador "GustavoPeralta" creado automáticamente.')
    } else {
      console.log('🔒 El usuario "GustavoPeralta" ya existe.')
    }
  } catch (error) {
    console.error('❌ Error al verificar o crear el administrador:', error)
  }
}
