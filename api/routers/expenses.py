from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.pool import pool
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from typing import Optional
from psycopg import Error as psycopgError
from queries.expenses import (
    ExpenseOut,
    ExpenseIn,
    ExpenseListOut,
    ExpenseQueries,
    ExpenseUpdate,
    CategoryOut,
)

router = APIRouter()


@router.post("/api/expenses/{user_id}", response_model=ExpenseOut)
def create_expense(expense: ExpenseIn, queries: ExpenseQueries = Depends(), ):
    return queries.create_expense(expense)


@router.get("/expenses/{user_id}", response_model=ExpenseListOut)
def get_expenses(user_id: int, queries: ExpenseQueries = Depends()):
    try:
        expenses = queries.get_all_expenses(user_id)

    except psycopgError:
        raise HTTPException(500, "Database error")

    if not expenses:
        raise HTTPException(404, f"No expenses found for user {user_id}")

    return ExpenseListOut(expenses=expenses)


@router.put("/expenses/{expense_id}", response_model=dict)
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    queries: ExpenseQueries = Depends()
):
    return queries.update_expense(expense_id, expense)


@router.delete("/expenses/{expense_id}", response_model=dict)
def delete_expense(
    expense_id: int,
    queries: ExpenseQueries = Depends()
):
    return queries.delete_expense(expense_id)
