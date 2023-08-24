from queries.pool import pool
from typing import List, Optional
from pydantic import BaseModel
from datetime import date
from pydantic import condecimal


class CategoryOut(BaseModel):
    expense_category_id: int
    name: str


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
    def create_expense(self, data: ExpenseIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                INSERT INTO expenses (expense_amount, date, description, user_id, expense_category_id)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                    [
                        data.expense_amount,
                        data.date,
                        data.description,
                        data.user_id,
                        data.category,
                    ],
                )
                new_id = cur.fetchone()[0]

                expense = ExpenseOut(
                    id=new_id,
                    expense_amount=data.expense_amount,
                    date=data.date,
                    category=data.category,
                    category_name="",
                    description=data.description,
                    user_id=data.user_id,
                )

                return expense   
            
    def get_all_expenses_for_user(self, user_id):
        with pool.connection() as conn:  
            with conn.cursor() as cur:

                query = """
                    SELECT 
                        id,
                        expense_amount,
                        date,
                        description,
                        user_id
                    FROM expenses  
                    WHERE user_id = %s
                """

                cur.execute(query, (user_id,))
                
                results = []

                for row in cur.fetchall():
                    
                    expense = ExpenseOut(
                        id=row[0],
                        expense_amount=row[1], 
                        date=row[2],
                        description=row[3],
                        category_name="category name",
                        user_id=row[4] 
                    )

                    results.append(expense)

                return results

    def update_expense(
        self,
        expense_id,
        expense_update
    ):

        set_parts = []
        update_data = expense_update.dict(exclude_unset=True)
        for field in update_data:
            set_parts.append(f"{field} = %s")

        set_clause = ", ".join(set_parts)

        query = f"""
            UPDATE expenses 
            SET {set_clause}
            WHERE id = %s
            RETURNING id
        """

        values = list(update_data.values())
        values.append(expense_id)

        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(query, values)
                updated_id = cur.fetchone()[0]
    
        return {"updated": updated_id}

    def delete_expense(self, expense_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM expenses 
                    WHERE id = %s
                    RETURNING id
                """, (expense_id,))

                deleted_id = cur.fetchone()

                if deleted_id is None:
                    raise ValueError("Expense not found")
      
                return {"deleted": deleted_id[0]}

