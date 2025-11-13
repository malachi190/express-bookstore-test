import { Request, Response } from "express";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "../services/book-service";
import * as z from "zod" 
import { Prisma } from "@prisma/client";

type ApiError = {
    message: string
}

const BookCreateSchema = z.object({
  title: z.string().min(1),
  authorId: z.number().int().positive(),
  yearOfPublication: z.number().int(),
  genre: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  fileUrl: z.string().optional(),
});

interface TypedRequest<T = any> extends Request {
  body: T;
}

type BookCreateInput = Prisma.BookCreateInput; 

export async function createBook(req: TypedRequest<BookCreateInput>, res: Response) {
    try {
        const payload = BookCreateSchema.parse(req.body)
        const book = await addBook(payload)

        res.status(201).json({
            message: "Book added successfully",
            book
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}

export async function fetchBooks(req: Request, res: Response) {
    try {
        const books = await getBooks()
        res.status(200).json(books)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}


export async function fetchBook(req: Request, res: Response) {
    try {
        const book = await getBook(parseInt(req.params.id))
        res.status(200).json(book)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}


export async function updateBookFunc(req: TypedRequest<Prisma.BookUpdateInput>, res: Response) {
    try {
        const book = await updateBook(req.body, parseInt(req.params.id))
        res.status(200).json({message: "Book updated successfully", book})
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}


export async function deleteBookFunc(req: Request, res: Response) {
    try {
        await deleteBook(parseInt(req.params.id))
        res.status(204).json({message: "Book deleted successfully"})
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}