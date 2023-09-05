from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union
from psycopg.errors import OperationalError, UniqueViolation, IntegrityError
import logging


logging.basicConfig(level=logging.INFO)


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    expense_category_name: str


class CategoryOut(BaseModel):
    id: int
    expense_category_name: str


class CategoryQueries:
    def get_all(self) -> List[CategoryOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT id, expense_category_name FROM category ORDER BY id;"
                    )
                    result = cur.fetchall()
                    return [
                        self.record_to_category_out(record)
                        for record in result
                    ]
        except OperationalError as e:
            logging.error(f"Operational error: {e}")
            return {"message": "Could not get all categories"}
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            return {"message": "Could not get all categories"}

    def create(self, category: CategoryIn) -> Union[CategoryOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    # Check if a category with the given name already exists
                    cur.execute(
                        "SELECT COUNT(*) FROM category WHERE expense_category_name = %s;",
                        [category.expense_category_name],
                    )
                    if cur.fetchone()[0] > 0:
                        return {"message": "Category already exists"}

                    # Insert new category
                    cur.execute(
                        "INSERT INTO category (expense_category_name) VALUES (%s) RETURNING id;",
                        [category.expense_category_name],
                    )
                    id = cur.fetchone()[0]
                    return self.category_in_to_out(id, category)

        except UniqueViolation as e:
            logging.error(f"Unique constraint violation: {e}")
            return {"message": "Category already exists"}
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            return {"message": "Couldn't create category"}

    def delete(self, category_id: int) -> dict:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "DELETE FROM category WHERE id = %s", [category_id]
                    )
                    return {"message": "Category successfully deleted"}
        except IntegrityError:
            logging.error(
                "Integrity error: Cannot delete category associated with expenses"
            )
            return {
                "message": "Cannot delete category associated with expenses"
            }
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            return {"message": "Could not delete category"}

    def category_in_to_out(self, id: int, category: CategoryIn) -> CategoryOut:
        return CategoryOut(id=id, **category.dict())

    def record_to_category_out(self, record) -> CategoryOut:
        return CategoryOut(id=record[0], expense_category_name=record[1])
