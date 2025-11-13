import { Prisma, PrismaClient } from "@prisma/client";
import { Review } from "./review-service";

// Initialize prisma client
const client = new PrismaClient()

export type Book = {
    authorId: number
    title: string
    yearOfPublication: number
    description?: string
    imageUrl?: string
    fileUrl?: string
    genre: string
}

export async function addBook(book: Book) {
    try {
        return await client.book.create({
            data: {
                authorId: book.authorId,
                title: book.title,
                yearOfPublication: book.yearOfPublication,
                description: book.description,
                imageUrl: book.imageUrl,
                fileUrl: book.fileUrl,
                genre: book.genre
            }
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}

export async function getBooks() {
    try {
        return await client.book.findMany()
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}

export async function getBook(bookId: number) {
    try {
        return await client.book.findUnique({
            where: {
                id: bookId
            },
            include: {
                author: true,
                reviews: true
            }
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}


export async function updateBook(payload: Prisma.BookUpdateInput, bookId: number) {
    try {
        return await client.$transaction(async (prisma) => {
            const book = await prisma.book.findUnique({
                where: {
                    id: bookId
                }
            })

            if (!book) {
                throw new Error(`Book with id ${bookId} not found`)
            }

            await prisma.book.update({
                where: {
                    id: bookId
                },
                data: {
                    title: payload.title,
                    description: payload.description,
                    yearOfPublication: payload.yearOfPublication,
                    genre: payload.genre,
                    imageUrl: payload.imageUrl
                }
            })
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}


export async function deleteBook(bookId: number) {
    try {
        return await client.book.delete({
            where: {
                id: bookId
            }
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}