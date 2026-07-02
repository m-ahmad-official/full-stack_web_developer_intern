# FlowBoard — Full Stack Task Management System

## Setup

### Backend (Terminal 1)

cd backend
npm install
cp .env.example .env # fill MONGODB_URI, JWT_SECRET, CLIENT_URL
npm run dev # runs on port 5001

### Frontend (Terminal 2)

cd frontend
npm install
npm install socket.io-client
cp .env.local.example .env.local
npm run dev # runs on port 3000

## Open

http://localhost:3000

## Features

- JWT auth with roles (Admin / Member)
- Create projects with custom colors
- Kanban board (Board view + List view)
- Task CRUD with priority, status, assignee, due date, tags
- Real-time updates via Socket.io
- Stats dashboard with progress bars
- Filters by priority and assignee
- Search tasks
- Mobile responsive
