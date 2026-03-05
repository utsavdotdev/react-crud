# React + Django Todo App

A full-stack Todo app with:

- Frontend: React + Vite + Tailwind CSS (hosted on Vercel)
- Backend: Django + Django REST Framework (deploy-ready for Railway)
- Database: PostgreSQL on Railway

## Local Development

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
npm install
npm run dev
```

## Railway Deployment (Django + PostgreSQL)

1. Push this repo to GitHub.
2. In Railway, create a new project.
3. Add two services:
- `PostgreSQL`
- `GitHub Repo` service for this project
4. Set backend service **root directory** to `backend`.
5. Railway will use `Procfile` (`web: ./start.sh`) to start the app.
6. Add environment variables from `backend/.env.example`.
7. Ensure these values are set:
- `DJANGO_DEBUG=false`
- `DJANGO_SECRET_KEY=<strong-secret>`
- `DJANGO_ALLOWED_HOSTS=.railway.app,<your-backend-domain>`
- `DJANGO_CORS_ALLOWED_ORIGINS=https://react-todo.utsavbhattarai.info.np`
- `DJANGO_CSRF_TRUSTED_ORIGINS=https://react-todo.utsavbhattarai.info.np`
8. Railway PostgreSQL provides `DATABASE_URL`; keep it attached to the Django service.

`start.sh` automatically runs:

- `python manage.py migrate --noinput`
- `python manage.py collectstatic --noinput`
- `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`

## Vercel Frontend Configuration

In your Vercel project, set:

```bash
VITE_API_BASE_URL=https://<your-backend-domain>/api
```

Then redeploy the frontend.

## API Endpoints

- `GET /api/todos/`
- `POST /api/todos/`
- `GET /api/todos/<id>/`
- `PATCH /api/todos/<id>/`
- `DELETE /api/todos/<id>/`

## Validation

```bash
cd backend && .venv/bin/python manage.py test
backend/.venv/bin/python backend/manage.py check
npm run build
```
