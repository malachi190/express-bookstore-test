import { Request, Response } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { createReview, deleteReview, updateReview } from '../services/review-service';

interface TypedRequest<T = any> extends Request {
    body: T;
}

export const ReviewInputSchema = z.object({
    bookId: z.number().int().positive(),
    stars: z.number().int().min(1).max(5),
    note: z.string().optional(),
});

type ReviewCreateInput = z.infer<typeof ReviewInputSchema>;

export async function createReviewFunc(
    req: TypedRequest<ReviewCreateInput>,
    res: Response
) {
    try {
        const payload = ReviewInputSchema.parse(req.body);
        const review = await createReview(payload);
        res.status(201).json({
            message: 'Review created successfully',
            review,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}

export async function updateReviewFunc(
    req: TypedRequest<Prisma.ReviewUpdateInput>,
    res: Response
) {
    try {
        const review = await updateReview(
            req.body,
            parseInt(req.params.id, 10)
        );
        res.status(200).json({
            message: 'Review updated successfully',
            review,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}

export async function deleteReviewFunc(req: Request, res: Response) {
    try {
        await deleteReview(parseInt(req.params.id))
        res.status(204).json({ message: "Review deleted successfully" })
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: String(error) });
        }
    }
}