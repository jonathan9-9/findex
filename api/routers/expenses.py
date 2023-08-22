from fastapi import APIRouter, Depends
from authenticator import authenticator
from queries.expenses import (
    ExpenseOut,
    ExpenseIn,
    ExpenseListOut,
    ExpenseQueries,
)

router = APIRouter()


@router.post("/api/expenses/{user_id}", response_model=ExpenseOut)
def create_expense(
    expense: ExpenseIn,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_expense(expense)


@router.get("/expenses/{user_id}", response_model=ExpenseListOut)
def get_expenses(user_id: int, queries: ExpenseQueries = Depends()):
    try:
        expenses = queries.get_all_expenses(user_id)

    except Exception:
        raise HTTPException(500, "Database error")

    if not expenses:
        raise HTTPException(404, f"No expenses found for user {user_id}")

    return ExpenseListOut(expenses=expenses)
