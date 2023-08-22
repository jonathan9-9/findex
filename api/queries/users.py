import os
from psycopg_pool import ConnectionPool
from typing import List, Literal
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class UserListOut(BaseModel):
    users: list[UserOut]


class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str


class UserQueries:
    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name,
                        email, username, hashed_password
                    FROM users
                    ORDER BY last_name, first_name
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(UserOut(**record))
                return results

    def get_user(self, username: str) -> UserOutWithPassword | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name,
                        email, username, hashed_password
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )

                record = None
                row = cur.fetchone()
                if row is None:
                    raise Exception("No user found")
                else:
                    try:
                        if row is not None:
                            record = {}
                            for i, column in enumerate(cur.description):
                                record[column.name] = row[i]
                            return UserOutWithPassword(**record)
                    except Exception as e:
                        raise Exception("Error:", e)

    def create_user(
        self, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users
                        (username, hashed_password, first_name, last_name, email)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.username,
                            hashed_password,
                            user.first_name,
                            user.last_name,
                            user.email,
                        ],
                    )
                    pk = result.fetchone()[0]

                    return UserOutWithPassword(
                        id=pk,
                        username=user.username,
                        hashed_password=hashed_password,
                        first_name=user.first_name,
                        last_name=user.last_name,
                        email=user.email,
                    )

        except Exception as e:
            return {"error": "could not return user" + str(e)}

    def delete_user(self, user_id) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s
                    """,
                    [user_id],
                )
