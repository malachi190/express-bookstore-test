import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { router } from './routes/route';
import client from "prom-client";

const app = express();
dotenv.config()

app.use(express.json())

const register = new client.Registry()
client.collectDefaultMetrics({ register })

// Health Check
app.get("/health", async (req: Request, res: Response) => {
    res.json({
        message: "Welcome to Bookstore API!"
    })
})

// Other metrics can be added later e.g CPU usage, Memory count, etc
const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of http requests",
    labelNames: ["method", "route", "status"]
})

// Create Middleware to track api requests
app.use((req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.path,
            status: res.statusCode
        })
    })
    next()
})

register.registerMetric(httpRequestCounter)

// Expose /metrics endpoint
app.get("/metrics", async (req: Request, res: Response) => {
    res.set("Content-Type", register.contentType)
    res.end(await register.metrics())
})

app.use("/api", router)

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})