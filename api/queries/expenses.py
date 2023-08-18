import os
from queries.pool import pool
from typing import List, Optional
from pydantic import BaseModel
from datetime import date

class CategoryOut(BaseModel):
    expense_category_id: int
    name: str


class ExpenseOut(BaseModel):
    id: int
    expense_amount: float
    date: date
    category: CategoryOut
    username: str
    description: Optional[str]

class ExpenseListOut(BaseModel):
    expenses: List[ExpenseOut]

class ExpenseIn(BaseModel):
    expense_amount: float
    date: date
    category: CategoryOut
    username: str
    description: Optional[str]

class ExpenseQueries:

    def get_all_expenses(self) -> ExpenseListOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                """
                SELECT
                    e.id, e.amount, e.date, e.description,
                    c.id as expense_category_id,
                FROM expenses e
                JOIN categories c ON e.expense_category_id = c.id
                ORDER BY date DESC
            """
                )

                results=[]
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(ExpenseListOut(**record))

                return ExpenseListOut(**record)


    def create_expense(self, data: ExpenseIn):


    def delete_expense(self, expense_id):
