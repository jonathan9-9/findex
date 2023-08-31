from authenticator import authenticator
from fastapi import APIRouter, Depends
from fastapi.testclient import TestClient
from fastapi.exceptions import HTTPException
from main import app
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


@router.put("/api/expenses/{user_id}/{expense_id}", response_model=ExpenseOut)
def update_expense(
    expense_id: int,
    user_id: int,
    expense_update: ExpenseUpdate,
    queries: ExpenseQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    # user_id = user_data["id"]
    updated_expense = queries.update_expense(
        expense_id, user_id, expense_update
    )
    return updated_expense


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


client = TestClient(app)


def test_update_expense():
    response = client.put(
        "/expenses/1/1",
        json={"expense_amount": 99.99}
    )
    assert response.status_code == 200
    assert response.json()["expense_amount"] == 99.99
