# Flowboard

Flowboard is a modern, full-stack team management application designed to streamline project tracking and task collaboration. Built with a robust Java/Spring Boot backend and a dynamic React frontend, Flowboard provides a premium user experience for managing teams and projects.

## 📸 Visual Overview

### 🎨 Beautiful Landing Page
<img width="1910" height="912" alt="Screenshot 2026-05-01 191922" src="https://github.com/user-attachments/assets/930a46eb-cd28-4003-aa88-2ded39583f00" />


### 📊 Deep Analytics & Kanban
<img width="1911" height="918" alt="Screenshot 2026-05-01 192220" src="https://github.com/user-attachments/assets/bf362c01-0d89-4c55-bb60-a2a6c58215ea" />


### 📂 Project Management
<img width="1910" height="917" alt="Screenshot 2026-05-01 192126" src="https://github.com/user-attachments/assets/00aafc2e-dfaa-4b14-91a0-1281d05c4cd8" />


### 📈 Dynamic Dashboard
<img width="1909" height="915" alt="Screenshot 2026-05-01 192030" src="https://github.com/user-attachments/assets/a76141e7-49bd-4020-8b30-129eb5365f45" />


## 🚀 Features

- **Project Management**: Create, update, and manage projects with ease.
- **Task Tracking**: Detailed task management with priorities, statuses, and assignments.
- **Team Collaboration**: Add members to projects and assign roles.
- **Secure Authentication**: JWT-based authentication for secure access.
- **Responsive UI**: A beautiful, responsive interface built with React and Tailwind CSS.
- **Real-time Updates**: Dynamic dashboard for quick overview of project progress.

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.5
- **Security**: Spring Security 6 with JWT
- **Database**: MySQL
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Hooks / Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## ⚙️ Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL Database

### Backend Setup
1. Navigate to the `flowboard-backend` directory.
2. Create a `.env` file based on `.env.example`.
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `flowboard-frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

The project is configured for deployment on **Railway**. Ensure you set the following environment variables on the backend:
- `MYSQL_URL`
- `JWT_SECRET`
- `PORT`

## 📄 License

This project is for educational purposes.
