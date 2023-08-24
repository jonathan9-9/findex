steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE income (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            income_title VARCHAR(100),
            income_amount NUMERIC(10,2) NOT NULL,
            date DATE NOT NULL,
            description TEXT,
            user_id INTEGER REFERENCES users(id)
    );
        """,
        # "Down" SQL statement
        """
        DROP TABLE IF EXISTS income;
        """,
    ],
]
