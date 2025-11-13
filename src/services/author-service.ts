import { Prisma, PrismaClient } from "@prisma/client";
import { Book } from "./book-service";

const client = new PrismaClient()

type Author = {
    firstName: string
    lastName: string
    email?: string
    isActive?: boolean
}

export async function createAuthor(payload: Author) {
    try {
        return await client.author.create({
            data: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email
            }
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}

export async function updateAuthor(payload: Prisma.AuthorUpdateInput, authorId: number) {
    try {
        return await client.$transaction(async (prisma) => {
            const author = await prisma.author.findUnique({
                where: {id: authorId}
            })

            if (!author){
                throw new Error(`Author with id ${authorId} not found`)
            }

            await prisma.author.update({
                where: {id: authorId},
                data: {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    isActive: payload.isActive
                }
            })
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}