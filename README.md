# Flowboard

Flowboard is a modern, full-stack team management application designed to streamline project tracking and task collaboration. Built with a robust Java/Spring Boot backend and a dynamic React frontend, Flowboard provides a premium user experience for managing teams and projects.

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
