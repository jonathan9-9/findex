from fastapi.testclient import TestClient
from main import app

# from queries.income import IncomeQueries

client = TestClient(app)


def test_init():
    assert 1 == 1


# class EmptyIncomeQueries:
