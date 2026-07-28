# 🚀 Employee Management System on Kubernetes

A full-stack Employee Management application deployed on Kubernetes using React, Node.js, PostgreSQL and Docker.

The goal of this project is to learn production-style Kubernetes concepts by building and deploying a real application instead of isolated examples.

---

## ✨ Features

- Employee CRUD operations
- PostgreSQL database
- Persistent storage using PVC
- React frontend
- Node.js Express backend
- Kubernetes Deployments
- Kubernetes Services
- ConfigMaps
- Secrets
- Resource Requests & Limits
- Liveness & Readiness Probes
- Dockerized applications

---

## 🛠 Tech Stack

Frontend
- React
- Axios
- Tailwind CSS
- Vite

Backend
- Node.js
- Express
- PostgreSQL

DevOps
- Docker
- Kubernetes (Kind)
- kubectl

---

## 🏗 Architecture

Browser
    │
    ▼
Frontend Service
    │
    ▼
Frontend Pods
    │
    ▼
Backend Service
    │
    ▼
Backend Pods
    │
    ▼
PostgreSQL Service
    │
    ▼
PostgreSQL Pod
    │
    ▼
Persistent Volume Claim

---

## 📸 Screenshots

- Dashboard: ![Dashboard](screenshots/app-dashboard.png)

- Employee List: ![Employee List](screenshots/employee-list.png)

- Edit Employee: ![Edit Employee](screenshots/edit-employee.png)

- Search Employee: ![Search Employee](screenshots/search-employee.png)

---

## 🚀 Run

### Build Images

docker build ...

### Load into Kind

kind load docker-image ...

### Deploy

kubectl apply -f ...

---

## 📚 Kubernetes Concepts Covered

- Pods
- ReplicaSets
- Deployments
- Services
- ConfigMaps
- Secrets
- Persistent Volumes
- Persistent Volume Claims
- Resource Management
- Health Probes
- Rolling Updates
- StatefulSet for PostgreSQL
- Ingress Controller

---

## 🔮 Future Improvements

- HTTPS / TLS
- Horizontal Pod Autoscaler
- GitHub Actions CI/CD
- Helm Charts
- Monitoring with Prometheus & Grafana

---

## 👨‍💻 Author

Muhammad Saad Nawaz