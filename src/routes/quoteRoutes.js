import express from 'express'
import { createQuote,deleteQuote,getAiQuote,getAllQuotes,getRandomQuote, updateQuote } from '../controllers/quoteController.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

// On va pouvoir gérer les routess
            //La router, middlevare (si on utilise),controller
            //route, controller -> La fonction qui vient du controller
// Une app qui fourni des phrases inspirantes
router.get('/',getRandomQuote)

router.get('/',getRandomQuote)

router.post('/',protect,createQuote)

router.delete('/:id',protect, deleteQuote)

router.put('/:id',protect,  updateQuote)

router.get('/all', getAllQuotes)

router.get('/aiquote',getAiQuote)

export default router