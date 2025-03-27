import express  from 'express'
import { getAll, getUserById } from '../controller/userController'

const router = express.Router();

router.get('/users', getAll )
router.get('/users/:id', getUserById)

export default router;