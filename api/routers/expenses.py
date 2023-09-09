from authenticator import authenticator
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from queries.expenses import (
    ExpenseOut,
    ExpenseIn,
    ExpenseListOut,
    ExpenseQueries,
    ExpenseUpdate,
)

router = APIRouter()


@router.post("/api/expenses/{user_id}", response_model=ExpenseOut)
def create_expense(
    expense: ExpenseIn,
    user_id: int,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data["id"] != user_id:
        raise HTTPException(status_code=403, detail="Operation not allowed")

    try:
        result = queries.create_expense(expense)
        return result
    except HTTPException as e:
        raise e


@router.get("/api/expenses/{user_id}", response_model=ExpenseListOut)
def get_all_expenses(
    user_id: int,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data["id"] != user_id:
        raise HTTPException(status_code=403, detail="Operation not allowed")

    try:
        expenses = queries.get_all_expenses_for_user(user_id)
        if not expenses:
            raise HTTPException(404, "No expenses found for user")
        return ExpenseListOut(expenses=expenses)
    except HTTPException as e:
        raise e


@router.get("/api/expenses/{user_id}/{expense_id}", response_model=ExpenseOut)
def get_single_expense(
    user_id: int,
    expense_id: int,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data["id"] != user_id:
        raise HTTPException(status_code=403, detail="Operation not allowed")

    try:
        expense = queries.get_single_expense_for_user(user_id, expense_id)
        if not expense:
            raise HTTPException(status_code=404, detail="Expense not found")
        return expense
    except HTTPException as e:
        raise e


@router.put("/api/expenses/{user_id}/{expense_id}", response_model=ExpenseOut)
def update_expense(
    expense_id: int,
    user_id: int,
    expense_update: ExpenseUpdate,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data["id"] != user_id:
        raise HTTPException(status_code=403, detail="Operation not allowed")

    try:
        updated_expense = queries.update_expense(
            expense_id, user_id, expense_update
        )
        return updated_expense
    except HTTPException as e:
        raise e


@router.delete("/api/expenses/{user_id}/{expense_id}")
def delete_expense(
    expense_id: int,
    user_id: int,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    queries.get_all_expenses_for_user(expense_id)

    try:
        deleted = queries.delete_expense(user_data["id"], expense_id)
        return {"deleted": deleted}
    except Exception as e:
        print(e)
        return "could not delete expense"
