steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE income (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            income_amount FLOAT NOT NULL,
            date DATE NOT NULL,
            income_title VARCHAR(100),
            user_id INTEGER NOT NULL REFERENCES users(id)
    );
        """,
        # "Down" SQL statement
        """
        DROP TABLE income;
        """,
    ],
]
