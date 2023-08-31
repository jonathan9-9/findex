from fastapi.testclient import TestClient
from main import app
from queries.users import UserQueries, UserIn


client = TestClient(app)


class EmptyUserQueries:
    def get_users(self):
        return []


def test_get_users():
    # Arrange
    app.dependency_overrides[UserQueries] = EmptyUserQueries

    # Act

    response = client.get("/api/users")

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == {"users": []}


# class CreateUserQueries:
#     def create_user(self, user: UserIn, hashed_password: str):
#         result = {
#             "user": {
#                 "id": 20,
#                 "first_name": "mark",
#                 "last_name": "lor",
#                 "email": "string@example.com",
#                 "username": "mp",
#             },
#         }
#         result.update(user, hashed_password)
#         return result


# def test_create_user():
#     # Arrange
#     app.dependency_overrides[UserQueries] = CreateUserQueries
#     # Act
#     json = {
#         "user": {
#             "id": 20,
#             "first_name": "mark",
#             "last_name": "lor",
#             "email": "string@example.com",
#             "username": "mp",
#             "password": "mp1",
#         }
#     }

#     expected = {
#         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjkwODU4OC05ODk1LTRhZTMtOWQyNi0zM2I3MzM2MjJkODkiLCJleHAiOjE2OTMzMzY5MDcsInN1YiI6Im1wIiwiYWNjb3VudCI6eyJpZCI6MjAsImZpcnN0X25hbWUiOiJtYXJrIiwibGFzdF9uYW1lIjoibG9yIiwiZW1haWwiOiJzdHJpbmdAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6Im1wIn19.9fV-QbbO9Qk70k384_E53-oH_72ndkjczfqlLl8z3sY",
#         "token_type": "Bearer",
#         "user": {
#             "id": 20,
#             "first_name": "mark",
#             "last_name": "lor",
#             "email": "string@example.com",
#             "username": "mp",
#         },
#     }

#     response = client.post("/api/users", json=json)

#     app.dependency_overrides = {}

#     # Assert

#     assert response.status_code == 200
#     assert response.json() == expected
