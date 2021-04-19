# 서드파티 라이브러리
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

#로컬 라이브러리
from database import database, models
from routers.user import router as user_router

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)