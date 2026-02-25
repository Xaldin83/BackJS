import express from 'express'
import { createQuote,getRandomQuote } from '../controllers/quoteController.js'

const router = express.Router()

// On va pouvoir gérer les routess
            //La router, middlevare (si on utilise),controller
            //route, controller -> La fonction qui vient du controller
// Une app qui fourni des phrases inspirantes
router.get('/',getRandomQuote)

router.get('/',getRandomQuote)

router.post('/',createQuote)

export default router