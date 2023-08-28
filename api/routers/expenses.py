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
    result = queries.create_expense(expense)
    # if result is None:
    #     raise HTTPException(status_code=404, detail="Could not create expense")
    # elif result.user_id != user_data["user_id"]:
    #     raise HTTPException(
    #         status_code=403,
    #         detail="Unauthorized - current user id cannot create expense",
    #     )
    # else:
    return result


@router.get("/api/expenses/{user_id}", response_model=ExpenseListOut)
def get_all_expenses(
    user_id: int,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    expenses = queries.get_all_expenses_for_user(user_id)

    if not expenses:
        raise HTTPException(404, "No expenses found for user")

    return ExpenseListOut(expenses=expenses)


@router.put("/expenses/{expense_id}", response_model=dict)
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_data["id"]
    update_data = expense.dict()
    return queries.update_expense(expense_id, user_id, update_data, expense)


@router.delete("/api/expenses/{user_id}/{expense_id}")
def delete_expense(
    expense_id: int,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    expense = queries.get_all_expenses_for_user(expense_id)

    try:
        deleted = queries.delete_expense(user_data["id"], expense_id)
        return {"deleted": deleted}
    except Exception as e:
        print(e)
        return "could not delete expense"
