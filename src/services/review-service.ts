import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export type Review = {
    bookId: number
    stars: number
    note?: string
}


export async function createReview(payload: Review) {
    try {
        return await client.review.create({
            data: {
                bookId: payload.bookId,
                stars: payload.stars,
                note: payload.note
            }
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}


export async function updateReview(payload: Prisma.ReviewUpdateInput, reviewId: number) {
    try {
        return await client.$transaction(async (prisma) => {
            const review = await prisma.review.findUnique({
                where: { id: reviewId }
            })

            if (!review) {
                throw new Error(`Review with id ${reviewId} not found`)
            }

            await prisma.review.update({
                where: { id: reviewId },
                data: {
                    note: payload.note
                }
            })
        })
    } catch (error) {
        console.error("error", error)
        throw error;
    }
}

export async function deleteReview(reviewId: number) {
    try {
        return await client.review.delete({
            where: {id: reviewId}
        })
    } catch (error) {
        console.error("error", error)
        throw error; 
    }
}