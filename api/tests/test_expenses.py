from fastapi.testclient import TestClient
from main import app

from queries.expenses import ExpenseQueries, ExpenseOut
from authenticator import authenticator

client = TestClient(app)


expense1 = ExpenseOut(id=1, expense_amount=100, date='2022-01-01', category_name='Food', user_id=1)
expense2 = ExpenseOut(id=2, expense_amount=200, date='2022-01-02', category_name='Utilites', user_id=1)


class MockExpenseQueries:
    def get_all_expenses_for_user(self, user_id):
        return [expense1, expense2]



def user_override():
    return {"user_id": 1}


def test_get_expenses():
    app.dependency_overrides[ExpenseQueries] = MockExpenseQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = user_override

    response = client.get("/expenses/1")
    print(response.json())

    if response.status_code == 404:
        assert response.json() == {"detail": "Not Found"}

    elif response.status_code == 200:
        data = response.json()
        assert len(data["expenses"]) == 2

    else:
        raise ValueError(f"Unexpected status code: {response.status_code}")
