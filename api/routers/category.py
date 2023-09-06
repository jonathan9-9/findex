from authenticator import authenticator
from fastapi import APIRouter, Depends, HTTPException
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
    result = repo.create(category)
    if "message" in result:
        raise HTTPException(status_code=400, detail=result["message"])
    return result


@router.get(
    "/api/category/{user_id}", response_model=Union[List[CategoryOut], Error]
)
def get_all_categories(
    user_id: int,
    repo: CategoryQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.get_all()

    if "message" in result:
        raise HTTPException(status_code=400, detail=result["message"])

    return result


@router.delete("/api/category/{user_id}", response_model=Literal[True, False])
def delete_category(
    category_id: int,
    repo: CategoryQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        result = repo.delete(category_id)
        if (
            "message" in result
            and result["message"] == "Category successfully deleted"
        ):
            return True
        else:
            return False
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
