from pydantic import BaseModel
from queries.pool import pool
from typing import List, Literal, Union


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    expense_category_name: str


class CategoryOut(BaseModel):
    id: int
    expense_category_name: str


class CategoryQueries:
    def get_all(self) -> [List[CategoryOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id, expense_category_name
                        FROM category
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_category_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all categories"}

    def create(self, category: CategoryIn) -> Union[CategoryOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO category
                            (expense_category_name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [category.expense_category_name],
                    )
                    id = result.fetchone()[0]
                    return self.category_in_to_out(id, category)
        except Exception as e:
            print(e)
            return {"message": "Couldn't create category"}

    def delete(self, category_id: int) -> Literal[True, False]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as curr:
                    curr.execute(
                        """
                        DELETE FROM category
                        WHERE id = %s
                        """,
                        [category_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def category_in_to_out(self, id: int, category: CategoryIn):
        return CategoryOut(id=id, **category.dict())

    def record_to_category_out(self, record):
        return CategoryOut(
            id=record[0],
            expense_category_name=record[1],
        )
