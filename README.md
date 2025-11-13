# 📚 Express.js Bookstore API | Monitoring & Observability Demo

A lightweight **Express.js bookstore server** built to learn and
demonstrate **monitoring**, **metrics**, and **observability** using
**Prometheus**, **Grafana**, and **Docker containers**.

------------------------------------------------------------------------

## 🚀 Features

-   CRUD API for managing books\
-   Integrated **Prometheus metrics endpoint** (`/metrics`)\
-   **Custom metrics**: request duration, request count, memory usage\
-   Exported metrics scraped via **Prometheus**\
-   **Grafana dashboards** for visualization\
-   Fully containerized with **Docker & Docker Compose**

------------------------------------------------------------------------

## 🏗️ Tech Stack

-   **Node.js / Express.js**\
-   **Prometheus**\
-   **Grafana**\
-   **Docker & Docker Compose**

------------------------------------------------------------------------

## 📦 Getting Started

### 1️⃣ Clone the repo

``` bash
git clone https://github.com/malachi190/express-bookstore-test.git
cd express-bookstore
```

### 2️⃣ Start services

``` bash
docker compose up -d
```

### 3️⃣ Access services

  Service         URL
  --------------- -----------------------
  Bookstore API   http://localhost:3000
  Prometheus UI   http://localhost:9090
  Grafana         http://localhost:3001

------------------------------------------------------------------------

## 📊 Metrics & Observability

-   Prometheus scrapes `/metrics` exposed by the Express server\
-   Default dashboards available in Grafana\
-   Custom metrics included:
    -   HTTP Request Duration Histogram\
    -   Request Counter\
    -   Process & System Metrics

------------------------------------------------------------------------

## 📝 Purpose

This project is designed **for learning**:\
- How to instrument a Node.js API\
- How Prometheus scrapes & stores metrics\
- How to build Grafana dashboards\
- How to run everything inside Docker
