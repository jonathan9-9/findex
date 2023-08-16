from fastapi import APIRouter, Depends, Response, HTTPException
from pydantic import BaseModel
from typing import Optional
from queries.users import UserQueries, UserListOut, UserOut, UserIn


router = APIRouter()


# Implement the following endpoints
# 1. get a user with a specific id
@router.get("/api/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    queries: UserQueries = Depends(),
):
    record = queries.get_user(user_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Could not get a specific user with id {}".format(user_id))
    else:
        return record

# 2. get all users


@router.get("/api/users", response_model=UserListOut)
def get_users(
    queries: UserQueries = Depends()
):
    return {"users": queries.get_all_users()}
# 3. create a user


@router.post("/api/users", response_model=UserOut)
def create_user(
    user: UserIn,
    queries: UserQueries = Depends(),
):
    return queries.create_user(user)
# 4. delete a user


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
):
    queries.delete_user(user_id)
    return True
