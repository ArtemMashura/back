import express, { Application, Request, Response, Router } from 'express';

import * as taskController from '../controllers/taskController';

const router: Router = express.Router();

// router.get('/get', taskController.get);
router.post('/create', taskController.create);
router.patch('/update/:id', taskController.update);
router.delete('/delete/:id', taskController.deleteOne);



export default router;