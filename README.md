# Employee Management System - Kubernetes DevOps Demo

A full-stack employee management application built to demonstrate Kubernetes deployment with Kind!

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Web Server**: Nginx (for frontend)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (via Kind)

## Project Structure

```
devops-demo/
├── backend/          # Node.js Express API
│   ├── k8s/          # Backend Kubernetes manifests
│   ├── server.js     # API server code
│   └── Dockerfile    # Backend Docker image
├── frontend/         # React + Vite frontend
│   ├── k8s/          # Frontend Kubernetes manifests
│   ├── src/          # Frontend source code
│   ├── nginx.conf    # Nginx configuration for proxying API calls
│   └── Dockerfile    # Frontend Docker image
├── postgres/         # PostgreSQL Kubernetes manifests
├── kind-config.yaml  # Kind cluster configuration
└── namespace.yaml    # Kubernetes namespace manifest
```

## Local Development

### Prerequisites

- Docker
- Node.js & npm
- kubectl
- Kind (Kubernetes in Docker)

### Running Locally (Without Kubernetes)

1. **Start PostgreSQL locally or use Docker**
   ```bash
   docker run --name devops-postgres -e POSTGRES_USER=devuser -e POSTGRES_PASSWORD=devpassword -e POSTGRES_DB=devdb -p 5432:5432 -d postgres:15
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install
   npm run start
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Kubernetes Deployment (Kind)

### Step 1: Create Kind Cluster
```bash
kind create cluster --config kind-config.yaml
```

### Step 2: Build & Load Docker Images
```bash
# Build backend
cd backend
docker build -t node-backend:v3 .
kind load docker-image node-backend:v3

# Build frontend
cd ../frontend
docker build -t employee-frontend:v1 .
kind load docker-image employee-frontend:v1
```

### Step 3: Deploy to Kubernetes
```bash
cd ..  # Go back to project root
kubectl apply -f namespace.yaml
kubectl apply -f postgres/
kubectl apply -f backend/k8s/
kubectl apply -f frontend/k8s/
```

### Step 4: Verify Everything is Running
```bash
kubectl get all -n devops-demo
```

### Step 5: Access the Application
Open your browser and go to:
```
http://localhost:30080
```

## Features

- ✅ Add new employees
- ✅ View all employees
- ✅ Edit existing employees
- ✅ Delete employees
- ✅ Search employees
- ✅ Real-time health status of backend/database
- ✅ Department badges (DevOps, Backend, QA, HR)
- ✅ Responsive UI

## Cleanup

To delete the Kind cluster:
```bash
kind delete cluster
```
