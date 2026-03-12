import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()


app.use(cors())
// Body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// On défini les routes de l'API
app.use('/API/auth',authRoutes)
app.use('/API/quote', quoteRoutes)

// Route de test pour l'accueil /
app.get('/',(req,res)=>{
    res.json({message:"L'app se lance!"})
})




export default app;