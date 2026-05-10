import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(productRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})