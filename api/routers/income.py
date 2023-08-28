from authenticator import authenticator
from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.income import (
    IncomeIn,
    IncomeOut,
    IncomeQueries,
    Error,
    IncomeListOut,
)

router = APIRouter()


# CRUD


@router.post("/api/incomes/{user_id}", response_model=Union[IncomeOut, Error])
def create_income(
    income: IncomeIn,
    user_id: int,
    # response: Response,
    repo: IncomeQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    # response.status_code = 400
    return repo.create(income, user_id)


@router.get(
    "/api/incomes/{user_id}", response_model=Union[IncomeListOut, Error]
)
def get_all_incomes(
    repo: IncomeQueries = Depends(),
    user_id=int,
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    # return repo.get_all(user_id=user_id)
    return {"incomes": repo.get_all(user_id=user_id)}


@router.put(
    "/api/incomes/{user_id}/{income_id}",
    response_model=Union[IncomeOut, Error],
)
def update_income(
    income_id: int,
    income: IncomeIn,
    repo: IncomeQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, IncomeOut]:
    return repo.update(income_id, income)


@router.delete("/api/incomes/{user_id}/{income_id}", response_model=bool)
def delete_income(
    income_id: int,
    repo: IncomeQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, bool]:
    return repo.delete(income_id)
