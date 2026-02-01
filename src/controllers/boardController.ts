import { prisma } from '../prismaclient'
import express, { Application, Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
    const tables = await prisma.board.findMany()
    
    res.status(201).json({
        boards: tables
    })
}

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({
            message: "No table id was included",
        })
    }

    else if (typeof id === 'string') {
        const table = await prisma.board.findFirst({
            where: {
                id: id
            },
            include: {
                tasks: true
            }
        })
        if (table) {
            res.status(200).json({
                board: table
            })
        }
        else {
            res.status(404).json({
                message: "No table was found",
            })
        }
    }
    else {
        res.status(400).json({
            message: "ID is not a valid string",
        })
    }
}

export const create = async (req: Request, res: Response) => {
    const data = req.body

    try {
        const table = await prisma.board.create({
            data: {
                name: data.name
            }
        })
        res.status(200).json({
            message: "Table successfully created",
            board: table
        })
    }
    catch {
        res.status(400).json({
            message: "Name field should be filled"
        })
    }
    
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body

    if (!id) {
        res.status(404).json({
            message: "No table id was included",
        })
    }

    else if (typeof id === 'string') {
        try {
            const table = await prisma.board.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name
                }
            })
            res.status(200).json({
                message: "Table successfully updated",
                updatedBoard: table
            })
        }
        catch {
            res.status(400).json({
                message: "Error while updating table"
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
            message: "No table id was included",
        })
    }

    else if (typeof id === 'string') {
        const table = await prisma.board.delete({
            where: {
                id: id
            }
        })
        if (table) {
            res.status(200).json({
                deletedBoard: table,
                message: "Table deleted successfully"
            })
        }
        else {
            res.status(404).json({
                message: "No table was found",
            })
        }
    }
    else {
        res.status(400).json({
            message: "ID is not a valid string",
        })
    }
    
}