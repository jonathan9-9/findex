import os
from queries.pool import pool
from typing import List
from pydantic import BaseModel

class CategoryOut(BaseModel):
    id: int
    name: str


class ExpenseOut(BaseModel):
    id: int
    amount: float
    date: date
    category: CategoryOut
    username: str

class ExpenseListOut(BaseModel):
    expenses: List[ExpenseOut]

class ExpenseIn(BaseModel):
    amount: float
    date: date
    category_id: int
    username: str

class ExpenseQueries:

    def get_all_expenses(self) -> ExpenseListOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                """
                SELECT
                    e.id, e.amount, e.date,
                    c.id as category_id, c.name as category_name
                FROM expenses e
                JOIN categories c ON e.category_id = c.id
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
