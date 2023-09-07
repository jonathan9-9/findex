from fastapi.testclient import TestClient
from main import app
from queries.category import (
    CategoryQueries,
    CategoryOut,
)
from authenticator import (
    authenticator,
)

client = TestClient(app)

# Mock data
category1 = CategoryOut(id=1, expense_category_name="Food")
category2 = CategoryOut(id=2, expense_category_name="Utilities")


class MockCategoryQueries:
    def get_all(self):
        return [category1, category2]


def user_override():
    return {"user_id": 1}


# Tests
def test_get_categories():
    app.dependency_overrides[CategoryQueries] = MockCategoryQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = user_override

    response = client.get("/api/category/1")
    print(response.json())

    if response.status_code == 404:
        assert response.json() == {"detail": "Not Found"}
    elif response.status_code == 200:
        data = response.json()
        assert len(data["categories"]) == 2
    else:
        raise ValueError(f"Unexpected status code: {response.status_code}")
