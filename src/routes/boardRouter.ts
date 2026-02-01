import express, { Application, Request, Response, Router } from 'express';

import * as boardController from '../controllers/boardController';

const router: Router = express.Router();

router.get('/getAll', boardController.getAll);
router.get('/get/:id', boardController.getOne);
router.post('/create', boardController.create);
router.patch('/update/:id', boardController.update);
router.delete('/delete/:id', boardController.deleteOne);



export default router;