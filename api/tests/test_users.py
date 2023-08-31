from fastapi.testclient import TestClient
from main import app
from queries.users import UserQueries, UserIn


client = TestClient(app)


class EmptyUserQueries:
    def get_all_users(self):
        return []


def test_get_all_users():
    # Arrange
    app.dependency_overrides[UserQueries] = EmptyUserQueries

    # Act

    response = client.get("/api/users")

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == {"users": []}
