from app import app
from routes.auth import router as AuthRouter

from routes.user import router as UserRouter


app.include_router(AuthRouter)
app.include_router(UserRouter)
