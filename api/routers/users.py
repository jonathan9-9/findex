from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from queries.users import (
    UserQueries,
    UserListOut,
    UserOut,
    UserIn,
    DuplicateAccountError,
)


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()

# Getting tokens from HTTP-only cookies (for the front-end auth)


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


# 1. get a user with a specific id
@router.get("/api/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: int,
    # response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.get_user(user_id)
    if record is None:
        raise HTTPException(
            status_code=404,
            detail="Could not get a specific user with id {}".format(user_id),
        )
    else:
        return record


# 2. get all users


@router.get("/api/users", response_model=UserListOut)
def get_users(queries: UserQueries = Depends()):
    return {"users": queries.get_all_users()}


# 3. create a user


@router.post("/api/users", response_model=UserToken | HttpError)
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(user.password)
    print("HASHED PASSWORD:", hashed_password)
    try:
        # check that create_user method is correct
        user_out = queries.create_user(user, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )
    # print((user))
    form = UserForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(user=user_out, **token.dict())
    # return queries.create_user(user)


# 4. delete a user


@router.delete("/api/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
):
    queries.delete_user(user_id)
    return True
