steps = [
    [
        ## Create the table
        """
        CREATE TABLE expenses (
            id SERIAL PRIMARY KEY NOT NULL,
            expense_amount NUMERIC(10,2) NOT NULL,
            date DATE NOT NULL,
            description TEXT,
            user_id INTEGER NOT NULL,
            expense_category_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (expense_category_id) REFERENCES category(id) ON DELETE CASCADE
            );
        """,
        ## Drop the table
        """
        DROP TABLE expenses;
        """,
    ]
]
