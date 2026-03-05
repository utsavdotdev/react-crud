# React + Django Todo App

A full-stack Todo app with:

- Frontend: React + Vite + Tailwind CSS
- Backend: Django + Django REST Framework

## Features

- Create todo
- Edit todo
- Toggle completed status
- Delete todo
- Persistent storage with SQLite through Django API

## Project Structure

- `src/` - React frontend
- `backend/` - Django backend

## 1) Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend URL:

- `http://127.0.0.1:8000`

## 2) Frontend Setup

Open a new terminal in project root:

```bash
npm install
npm run dev
```

Frontend URL:

- `http://127.0.0.1:5173`

## Environment Variables

Copy from `.env.example` and adjust values if needed.

Frontend env used by Vite:

- `VITE_API_BASE_URL` (default: `http://127.0.0.1:8000/api`)

Backend env used by Django:

- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DJANGO_CORS_ALLOWED_ORIGINS`
- `DJANGO_SECRET_KEY`

## API Endpoints

- `GET /api/todos/`
- `POST /api/todos/`
- `GET /api/todos/<id>/`
- `PATCH /api/todos/<id>/`
- `DELETE /api/todos/<id>/`

## Validation Commands

```bash
cd backend && .venv/bin/python manage.py test
npm run build
```
