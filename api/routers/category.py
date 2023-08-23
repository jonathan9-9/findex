from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.pool import pool
from queries.category import Error, CategoryIn, CategoryOut, CategoryQueries
from typing import List, Union, Literal


router = APIRouter()


@router.post(
    "/api/category/{user_id}", response_model=Union[CategoryOut, Error]
)
def create_category(
    category: CategoryIn,
    repo: CategoryQueries = Depends(),
):
    return repo.create(category)


@router.get(
    "/api/category/{user_id}", response_model=Union[List[CategoryOut], Error]
)
def get_all_categories(
    repo: CategoryQueries = Depends(),
):
    return repo.get_all()


@router.delete("/category/{user_id}", response_model=Literal[True, False])
def delete_category(
    category_id: int,
    repo: CategoryQueries = Depends(),
) -> bool:
    return repo.delete(category_id)
