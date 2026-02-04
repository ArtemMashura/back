import { prisma } from '../prismaclient'
import express, { Application, Request, Response } from 'express';

// export const get = async (req: Request, res: Response) => {
    
// }

export const create = async (req: Request, res: Response) => {
    const data = req.body

    let orderInTable = Number(data.orderInTable)

    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data?.description,
            boardId: data.boardId,
            taskProgress: data?.taskProgress,
            orderInTable: orderInTable
        }
    })

    res.status(200).json({
        message: "Task successfully created",
        task: task
    })
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body

    if (!id) {
        res.status(404).json({
            message: "No task id was included",
        })
    }

    else if (typeof id === 'string') {
        try {
            const task = await prisma.task.update({
            where: {
                id: id
            },
            data: data
        })

        res.status(200).json({
            message: "Task successfully updated",
            task: task
        })
        }
        catch (e) {
            res.status(400).json({
                message: e
            })
        }
    }
    else {
        res.status(400).json({
            message: "ID is not a valid string",
        })
    }

    
}

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({
            message: "No task id was included",
        })
    }

    else if (typeof id === 'string') {
        const task = await prisma.task.delete({
            where: {
                id: id
            }
        })
        if (task) {
            res.status(200).json({
                deletedTask: task,
                message: "Task deleted successfully"
            })
        }
        else {
            res.status(404).json({
                message: "No task was found",
            })
        }
    }
    else {
        res.status(400).json({
            message: "ID is not a valid string",
        })
    }
}