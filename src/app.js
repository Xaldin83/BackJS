import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'


dotenv.config()

const app = express()

// On défini les routes de l'API
app.use('/API/quote', quoteRoutes)

// Route de test pour l'accueil /
app.get('/',(req,res)=>{
    res.json({message:"L'app se lance!"})
})




export default app;