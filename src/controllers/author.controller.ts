import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import * as z from "zod"
import { createAuthor, updateAuthor } from "../services/author-service";


const AuthorCreateSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string(),
    email: z.email().optional()
})

interface TypedRequest<T = any> extends Request {
    body: T;
}

type AuthorCreateInput = Prisma.AuthorCreateInput

export async function createAuthorFunc(req: TypedRequest<AuthorCreateInput>, res: Response) {
    try {
        const payload = AuthorCreateSchema.parse(req.body)
        const author = await createAuthor(payload)
        res.status(201).json({
            message: "Author created successfully",
            author
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}


export async function updateAuthorFunc(req: TypedRequest<Prisma.AuthorUpdateInput>, res: Response) {
    try {
        const author = await updateAuthor(req.body, parseInt(req.params.id)) 
        res.status(200).json({message: "Author updated successfully", author})
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        } 
    }
}