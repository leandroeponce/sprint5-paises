import express from 'express'
import { connectDB } from './config/dbConfig.mjs'
import countryRoutes from './routes/countryRoutes.mjs'
import expressEjsLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url'
import methodOverride from 'method-override'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Conexión a la base de datos
connectDB()

// Configuración de middlewares
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configuración de vistas
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layout')

// Rutas
app.use('/api', countryRoutes)
app.use((req, res) => {
    res.status(404).send({ message: 'Ruta no encontrada'})
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})