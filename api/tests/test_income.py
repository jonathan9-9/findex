# from fastapi.testclient import TestClient
# from main import app

# client = TestClient(app)

# from queries.income import IncomeQueries


# class EmptyIncomeQueries:
#     def get_all(self, user_id: int):
#         result = {
#             "incomes": [
#                 {
#                     "id": 3,
#                     "income_title": "onetwothree",
#                     "income_amount": 123,
#                     "date": "2023-08-31",
#                     "description": "onetwothree",
#                 }
#             ]
#         }
#         return result


# def test_get_all():
#     app.dependency_overrides[IncomeQueries] = EmptyIncomeQueries
#     # Arrange
#     token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNjk4MTY2Ni03MmU4LTQ3NzEtODJjZi02M2ZiYmI3NjkyNGYiLCJleHAiOjE2OTM1MjIwNjgsInN1YiI6InN0cmluZyIsImFjY291bnQiOnsiaWQiOjEsImZpcnN0X25hbWUiOiJzdHJpbmciLCJsYXN0X25hbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsInVzZXJuYW1lIjoic3RyaW5nIn19.HHB6UWVVSn_bpwYLfcRS0KASiK9P5ocitJoaLZDV6ls"
#     headers = {"Authorization": f"Bearer {token}"}

#     # Act
#     response = client.get("/api/incomes/{user_id}", headers=headers)

#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     expected_response = {
#         "incomes": [
#             {
#                 "id": 3,
#                 "income_title": "onetwothree",
#                 "income_amount": 123,
#                 "date": "2023-08-31",
#                 "description": "onetwothree",
#                 "user_id": 1,
#             }
#         ]
#     }
#     assert response.json() == expected_response


# ###### sanity test


# # def test_init():
# #     assert 1 == 1
