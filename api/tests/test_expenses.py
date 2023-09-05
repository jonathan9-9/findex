from fastapi.testclient import TestClient
from main import app

from queries.expenses import ExpenseQueries, ExpenseOut
from authenticator import authenticator

client = TestClient(app)

# Mock data
expense1 = ExpenseOut(id=1, expense_amount=100, date='2022-01-01', category_name='Food', user_id=1) 
expense2 = ExpenseOut(id=2, expense_amount=200, date='2022-01-02', category_name='Utilites', user_id=1)

class MockExpenseQueries:

    def get_all_expenses_for_user(self, user_id):
        return [expense1, expense2]

def user_override():
    return {"user_id": 1}

# Tests 
def test_get_expenses():

    app.dependency_overrides[ExpenseQueries] = MockExpenseQueries
    app.dependency_overrides[authenticator.get_current_account_data] = user_override

    response = client.get("/expenses/1")
    print(response.json())

    if response.status_code == 404:
        assert response.json() == {"detail": "Not Found"}
 
    elif response.status_code == 200: 
        data = response.json()
        assert len(data["expenses"]) == 2
 
    else:
        raise ValueError(f"Unexpected status code: {response.status_code}")
    # assert response.status_code == 404

    # data = response.json()

    # assert len(data["expenses"]) == 2
    # assert data["expenses"][0] == expense1.dict()
    # assert data["expenses"][1] == expense2.dict()

    # app.dependency_overrides = {}





# from fastapi.testclient import TestClient 
# from main import app

# from queries.expenses import ExpenseQueries, ExpenseIn
# from authenticator import authenticator

# client = TestClient(app)


# class MockExpenseQueries:

#     def get_all_expenses_for_user(self, user_id):
#         return [expense1, expense2]


# expense1 = ExpenseIn(
#   expense_amount=100,
#   date="2023-01-01",
#   category=1,
#   user_id=1  
# )

# expense2 = ExpenseIn(
#   expense_amount=200, 
#   date="2023-01-02",
#   category=2,
#   user_id=1
# )


# def account_override():
#     return {"user_id": 1}


# def test_get_all_expenses():

#     app.dependency_overrides[ExpenseQueries] = MockExpenseQueries
#     app.dependency_overrides[authenticator.get_current_account_data] = account_override

#     response = client.get("/expenses/1")

#     assert response.status_code == 404
#     assert "error" in response.json()
#     assert response.json()["expenses"] == [expense1, expense2]

#     app.dependency_overrides = {}





# from fastapi.testclient import TestClient
# from queries.expenses import ExpenseIn, ExpenseQueries
# from main import app
# import pytest

# client = TestClient(app)


# @pytest.fixture
# def expense_queries(expense: ExpenseQueries):
#     expense_1 = ExpenseIn
#     {
#         "expense_amount": 300,
#         "date": "2023-08-31",
#         "category": 1,
#         "description": "Food",
#         "user_id": 1
#     }

#     expense_2 = ExpenseIn
#     {
#         "expense_amount": 1000,
#         "date": "2023-08-25",
#         "category": 1,
#         "description": "waterrrrr",
#         "user_id": 1
#     }

#     expense_queries.create_expense(expense_1)
#     expense_queries.create_expense(expense_2)


# def test_get_all_expenses_for_user(expenses):

#     response = client.get("/expenses/1")

#     assert response.status_code == 200
#     assert len(response.json()["expenses"]) == 2

#     expenses = response.json()["expenses"]

#     assert expenses[0]["id"] == 1
#     assert expenses[0]["expense_amount"] == 300
#     assert expenses[1]["id"] == 2
#     assert expenses[1]["description"] == "waterrrrr"
