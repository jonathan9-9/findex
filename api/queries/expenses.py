from queries.pool import pool
from queries.category import CategoryOut
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from pydantic import condecimal
from psycopg.errors import OperationalError
from fastapi import HTTPException
import logging


logging.basicConfig(level=logging.INFO)


class ExpenseOut(BaseModel):
    id: int
    expense_amount: condecimal(max_digits=10, decimal_places=2)
    date: date
    category_name: str
    description: Optional[str] = None
    user_id: int


class ExpenseListOut(BaseModel):
    expenses: List[ExpenseOut]


class ExpenseIn(BaseModel):
    expense_amount: condecimal(max_digits=10, decimal_places=2)
    date: date
    category: int
    user_id: int
    description: Optional[str]


class ExpenseUpdate(BaseModel):
    expense_amount: condecimal(max_digits=10, decimal_places=2)
    date: Optional[date]
    expense_category_id: Optional[int]
    description: Optional[str]


class ExpenseQueries:
    def create_expense(self, expense: ExpenseIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO expenses (expense_amount, date, expense_category_id, description, user_id)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        (
                            expense.expense_amount,
                            expense.date,
                            expense.category,
                            expense.description,
                            expense.user_id,
                        ),
                    )
                    expense_id = cur.fetchone()[0]
                    cur.execute(
                        "SELECT id, expense_category_name FROM category WHERE id = %s",
                        (expense.category,),
                    )
                    category_tuple = cur.fetchone()
                    category_dict = {
                        "id": category_tuple[0],
                        "expense_category_name": category_tuple[1],
                    }
                    category = CategoryOut(**category_dict)
                    return ExpenseOut(
                        id=expense_id,
                        expense_amount=expense.expense_amount,
                        category_name=category.expense_category_name,
                        date=expense.date,
                        user_id=expense.user_id,
                        description=expense.description,
                    )
        except OperationalError as e:
            logging.error(f"Operational error: {e}")
            raise HTTPException(
                status_code=400, detail="Could not create expense"
            )
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            raise HTTPException(
                status_code=500, detail="Could not create expense"
            )

    def update_expense(
        self, expense_id: int, user_id: int, expense_update: ExpenseUpdate
    ):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    set_clause = ",".join(
                        f"{field}=%s"
                        for field in expense_update.dict(exclude_unset=True)
                    )
                    values = [
                        expense_update.dict(exclude_unset=True)[f]
                        for f in expense_update.dict(exclude_unset=True)
                    ]
                    values.append(expense_id)
                    cur.execute(
                        f"UPDATE expenses SET {set_clause} WHERE id = %s RETURNING id",
                        values,
                    )
                    cur.execute(
                        "SELECT e.id, e.expense_amount, e.date, c.expense_category_name, e.description, e.user_id FROM expenses e LEFT JOIN category c ON e.expense_category_id = c.id WHERE e.id = %s",
                        (expense_id,),
                    )
                    row = cur.fetchone()
                    return ExpenseOut(
                        id=row[0],
                        expense_amount=row[1],
                        date=row[2],
                        category_name=row[3],
                        description=row[4],
                        user_id=row[5],
                    )
        except OperationalError as e:
            logging.error(f"Operational error: {e}")
            raise HTTPException(
                status_code=400, detail="Could not update expense"
            )
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            raise HTTPException(
                status_code=500, detail="Could not update expense"
            )

    def get_all_expenses_for_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT e.id, e.expense_amount, e.date, e.description, e.user_id, c.expense_category_name FROM expenses e LEFT JOIN category c ON e.expense_category_id = c.id WHERE e.user_id = %s",
                        (user_id,),
                    )
                    results = []
                    for row in cur.fetchall():
                        expense = ExpenseOut(
                            id=row[0],
                            expense_amount=row[1],
                            date=row[2],
                            description=row[3],
                            user_id=row[4],
                            category_name=row[5],
                        )
                        results.append(expense)
                    return results
        except OperationalError as e:
            logging.error(f"Operational error: {e}")
            raise HTTPException(
                status_code=400, detail="Could not get expenses for user"
            )
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            raise HTTPException(
                status_code=500, detail="Could not get expenses for user"
            )

    def execute_query(self, query, values):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(query, values)
                updated_id = cur.fetchone()[0]

        return {"updated": updated_id}

    def delete_expense(self, user_id, expense_id):
        query = """
            DELETE FROM expenses
            WHERE id = %s AND user_id = %s
            RETURNING id
        """

        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(query, (expense_id, user_id))
                deleted_id = cur.fetchone()

                if deleted_id is None:
                    raise ValueError("Expense not found")

                return {"deleted": deleted_id[0]}
