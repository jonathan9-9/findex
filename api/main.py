from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, expenses, category, income
from authenticator import authenticator
import os


app = FastAPI()


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        "https://liquidators.gitlab.io/Findex",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authenticator.router)

app.include_router(users.router)
app.include_router(income.router)
app.include_router(expenses.router)
app.include_router(category.router)
