from fastapi.testclient import TestClient
from main import app
from queries.income import (
    IncomeQueries,
    IncomeOut,
)
from authenticator import authenticator

client = TestClient(app)

# Mock data
income1 = IncomeOut(
    id=1,
    income_title="Salary",
    income_amount=1000.0,
    date="2023-09-07",
    description="Monthly salary",
)
income2 = IncomeOut(
    id=2,
    income_title="Freelance",
    income_amount=500.0,
    date="2023-09-08",
    description="Freelance income",
)


class MockIncomeQueries:
    def get_all(self, user_id):
        return [income1, income2]


def user_override():
    return {"user_id": 1}


# Tests
def test_get_all_incomes():
    app.dependency_overrides[IncomeQueries] = MockIncomeQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = user_override

    response = client.get("/api/incomes/1")
    print(response.json())

    if response.status_code == 404:
        assert response.json() == {"detail": "Not Found"}
    elif response.status_code == 200:
        data = response.json()
        assert len(data["incomes"]) == 2
    else:
        raise ValueError(f"Unexpected status code: {response.status_code}")


# Run the test
test_get_all_incomes()
