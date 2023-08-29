from authenticator import authenticator
from fastapi import APIRouter, Depends
from queries.category import Error, CategoryIn, CategoryOut, CategoryQueries
from typing import List, Union, Literal


router = APIRouter()


@router.post(
    "/api/category/{user_id}", response_model=Union[CategoryOut, Error]
)
def create_category(
    category: CategoryIn,
    user_id: int,
    repo: CategoryQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(category)


@router.get(
    "/api/category/{user_id}", response_model=Union[List[CategoryOut], Error]
)
def get_all_categories(
    user_id: int,
    repo: CategoryQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all()


@router.delete("/api/category/{user_id}", response_model=Literal[True, False])
def delete_category(
    category_id: int,
    user_id: int,
    repo: CategoryQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(category_id)
