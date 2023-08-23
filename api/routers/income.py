from fastapi import APIRouter, Depends, Response
from pydantic import ValidationError
from typing import Union, List
from queries.income import IncomeIn, IncomeOut, IncomeQueries, Error

router = APIRouter()


# CRUD


@router.post("/api/incomes/{user_id}", response_model=Union[IncomeOut, Error])
def create_income(
    income: IncomeIn,
    user_id: int,
    # response: Response,
    repo: IncomeQueries = Depends(),
):
    # response.status_code = 400
    return repo.create(income, user_id)


@router.get(
    "/api/incomes/{user_id}", response_model=Union[List[IncomeOut], Error]
)
def get_all(
    repo: IncomeQueries = Depends(),
    user_id=int,
):
    return repo.get_all(user_id=user_id)


@router.put(
    "/api/incomes/{user_id}/{income_id}",
    response_model=Union[IncomeOut, Error],
)
def update_income(
    income_id: int,
    income: IncomeIn,
    repo: IncomeQueries = Depends(),
) -> Union[Error, IncomeOut]:
    return repo.update(income_id, income)


@router.delete("/api/incomes/{user_id}/{income_id}", response_model=bool)
def delete_income(
    income_id: int,
    repo: IncomeQueries = Depends(),
) -> bool:
    return repo.delete(income_id)
