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
    password: str


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
                        email, username, password
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

    def get_user(self, id) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name,
                        email, username, password
                    FROM users
                    WHERE id = %s
                """,
                    [id],
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return UserOut(**record)

    def create_user(self, data) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.username,
                    data.password,
                ]
                cur.execute(
                    """
                    INSERT INTO users (first_name, last_name, email, username, password)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, email, username, password
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return UserOut(**record)

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
