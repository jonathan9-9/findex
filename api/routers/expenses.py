from authenticator import authenticator
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.pool import pool
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from typing import Optional
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
def create_expense(
    expense: ExpenseIn,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_expense(expense)


# @router.get("/expenses/{user_id}", response_model=ExpenseListOut)
# def get_expenses(user_id: int, queries: ExpenseQueries = Depends()):
#     try:
#         expenses = queries.get_all_expenses(user_id)

#     except Exception:
#         raise HTTPException(500, "Database error")

#     if not expenses:
#         raise HTTPException(404, f"No expenses found for user {user_id}")

#     return ExpenseListOut(expenses=expenses)

# @router.get("/api/expenses", response_model=ExpenseListOut)
# def get_all_expenses(queries: ExpenseQueries = Depends()):

#     expenses = queries.get_all_expenses()

#     if not expenses:
#         raise HTTPException(404, "No expenses found")
#     return ExpenseListOut(expenses=expenses)

# @router.get("/api/expenses/{user_id}", response_model=ExpenseListOut)
# def get_all_expenses(user_id: int, queries: ExpenseQueries = Depends()):

#     expenses = queries.get_all_expenses_for_user(user_id)

#     if not expenses:
#         raise HTTPException(404, "No expenses found for user")
  
#     return ExpenseListOut(expenses=expenses)

# @router.get("/api/expenses/{user_id}", response_model=ExpenseListOut)
# def get_all_expenses(user_id: int, queries: ExpenseQueries = Depends()):

#     expenses = queries.get_all_expenses_for_user(user_id)

#     if not expenses:
#         raise HTTPException(404, "No expenses found for user")

#     return expenses

# @router.get("/expenses/{user_id}", response_model=ExpenseListOut)
# def get_expenses(user_id: int, queries: ExpenseQueries = Depends()):
#     user_data: dict = Depends(authenticator.get_current_account_data),
#     try:
#         expenses = queries.get_all_expenses(user_id)

#     except Exception:
#         raise HTTPException(500, "Database error")

#     if not expenses:
#         raise HTTPException(404, f"No expenses found for user {user_id}")

#     return ExpenseListOut(expenses=expenses)

@router.get("/expenses/{user_id}", response_model=ExpenseListOut)
def get_expenses(
    user_id: int,  
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data)  
):

    if user_id != user_data["id"]:
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")

    try:
        expenses = queries.get_all_expenses(user_id)

    except Exception:
        raise HTTPException(500, "Database error")


@router.put("/expenses/{expense_id}", response_model=dict)
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.update_expense(expense_id, expense)


@router.delete("/expenses/{expense_id}", response_model=dict) 
def delete_expense(
    expense_id: int, 
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data)
):

    expense = queries.get_expense(expense_id)

    if expense.user_id != user_data["id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this expense") 

    queries.delete_expense(expense_id)

    return {"deleted": expense_id}