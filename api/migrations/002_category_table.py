steps = [
    [
        ## Create the table
        """
        CREATE TABLE category (
            id SERIAL PRIMARY KEY NOT NULL,
            expense_category_name VARCHAR(50) NOT NULL
            );
        """,
        ## Drop the table
        """
        DROP TABLE category;
        """,
    ]
]
