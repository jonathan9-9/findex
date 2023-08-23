from pydantic import BaseModel, condecimal
from typing import Union, List, Optional
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class IncomeIn(BaseModel):
    income_title: Optional[str]
    income_amount: condecimal(max_digits=10, decimal_places=2)
    date: date
    description: Optional[str]


class IncomeOut(BaseModel):
    id: int
    income_title: Optional[str]
    income_amount: condecimal(max_digits=10, decimal_places=2)
    date: date  # List[int]  # List[date.month, date.year]  # T E S T ##
    description: Optional[str]


class IncomeQueries(BaseModel):
    # CREATE
    def create(self, income: IncomeIn, user_id: int) -> IncomeOut:
        # connect
        try:
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO income
                            (income_title, income_amount, date, description, user_id)
                        VALUES
                            (%s,%s,%s,%s,%s)
                        RETURNING ID;
                        """,
                        [
                            income.income_title,
                            income.income_amount,
                            income.date,
                            income.description,
                            user_id,
                        ],
                    )
                    try:
                        id = result.fetchone()[0]
                        print("GENERATED ID:", id)
                    except Exception as e:
                        print("Error fetching ID:", e)
                        return {"error": "failed to get id"}

                    return self.income_in_to_out(id, income)

        except Exception as e:
            print(e)
            return {"message": "could not create income"}

    def income_in_to_out(self, id: int, income: IncomeIn):
        old_data = income.dict()
        return IncomeOut(id=id, **old_data)

    # READ
    def get_all(self, user_id: int) -> Union[Error, List[IncomeOut]]:
        try:
            # connect
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as cur:
                    # Select
                    cur.execute(
                        """
                        SELECT id, income_title, income_amount, date, description
                        FROM income
                        WHERE user_id = %s
                        ORDER BY date;
                        """,
                        (user_id,),
                    )
                    # map & filter list comprehension
                    return [
                        IncomeOut(
                            id=value[0],
                            income_title=value[1],
                            income_amount=value[2],
                            date=value[
                                3
                            ],  # date=[value[3].month, value[3].year],
                            description=value[4],
                        )
                        for value in cur
                    ]

        except Exception as e:
            print(e)
            return {"message": "could not get incomes"}

    # UPDATE
    def update(
        self, income_id: int, income: IncomeIn
    ) -> Union[IncomeOut, Error]:
        try:
            # connect
            with pool.connection() as conn:
                # cursor
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE income
                        SET income_title = %s
                        , income_amount = %s
                        , date = %s
                        , description = %s
                        WHERE id = %s
                        """,
                        [
                            income.income_title,
                            income.income_amount,
                            income.date,
                            income.description,
                            income_id,
                        ],
                    )
                    updated_data = income.dict()
                    return IncomeOut(id=income_id, **updated_data)
        except Exception as e:
            print(e)
            return {"message": "could not update that income"}

    def delete(self, income_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM income
                        WHERE id = %s
                        """,
                        [income_id],
                    )
        except Exception as e:
            print(e)
            return {"message": "could not delete income"}
