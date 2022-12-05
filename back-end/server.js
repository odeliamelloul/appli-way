
import express from 'express'
import path from 'path'
import dotenv from "dotenv"
import connectDB from './config/db.js'
import color from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use('/uploads', express.static('/uploads'))
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/recipes', recipeRoutes)

const upload = multer({ dest: "./front-end/src/images/" })
app.post('/uploadFile', upload.single("avatar"), (req, res) => {
  let fileType = req.file.mimetype.split("/")[1];
  let newFileName = req.file.filename + "." + fileType;
  fs.rename(`./front-end/src/images/${req.file.filename}`, `./front-end/src/images/${newFileName}`, function () {
    res.send(newFileName)
  })
})

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/front-end/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in development on port  ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))