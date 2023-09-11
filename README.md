# Findex

- Phil Sobrepena
- Jonathan Cornejo
- Tawain Lanon
- Rafael Guadron

## Design
Endpoints:

1. Root
2. Get Token
3. Login
4. Logout
5. Get User
6. Get Users
7. Create User
8. Delete User
9. Get All Incomes
10. Create Income
11. Update Income
12. Delete Income
13. Get All Expenses
14. Create Expense
15. Get Single Expense
16. Update Expense
17. Delete Expense
18. Get All Categories
19. Create Category
20. Delete Category

Root
- Endpoint path: /
- Endpoint method: GET
- Response: Message affirming you hit the root path
- Response shape (JSON):
  {}

Get Token
- Endpoint path: /token
- Enpoint method: GET
- Response: Access token and user credentials
- Response shape (JSON):
{
  "access_token": "string",
  "token_type": "Bearer",
  "user": {
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string"
  }
}

Login
- Endpoint path: /token
- Endpoint method: POST
- Request shape (form):
  -username: string
  -password: string
- Response: Account information and a token
- Response shape (JSON):
{
  "access_token": "string",
  "token_type": "Bearer"
}

Logout
- Endpoint path: /token
- Enpoint method: DELETE
- Response: True
- Response shape (JSON):
true

Get User
- Endpoint path: /api/users/{username}
- Endpoint method: GET
- Request shape (form):
  -username: string
- Response: User id, name, email, and username
- Response shape (JSON):
{
  "id": 0,
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string"
}

Get Users
- Endpoint path: /api/users
- Endpoint method: GET
- Response: User id, name, email, and username for all users
- Response shape (JSON):
{
  "users": [
    {
      "id": 0,
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "username": "string"
    }
  ]
}

Create User
- Endpoint path: /api/users
- Enpoint method: POST
- Request shape (form):
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}
- Response: Created user
- Response shape (JSON):
{
  "access_token": "string",
  "token_type": "Bearer",
  "user": {
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string"
  }
}

Delete User
- Endpoint path: /api/users/{user_id}
- Endpoint method: DELETE
- Request shape (form):
  -user_id: integer
- Response: true
- Response shape (JSON):
true

Get All Incomes
- Endpoint path: /api/incomes/{user_id}
- Endpoint method: GET
- Request shape (form):
 -user_id: integer
- Response: All incomes for user
- Response shape (JSON):
{
  "incomes": [
    {
      "id": 0,
      "income_title": "string",
      "income_amount": 0,
      "date": "2023-09-11",
      "description": "string"
    }
  ]
}

Create Income
- Endpoint path: /api/incomes/{user_id}
- Endpoint method: POST
- Request shape (form):
 -user_id: integer
- Response: Creates income for user
- Response shape (JSON):
{
  "id": 0,
  "income_title": "string",
  "income_amount": 0,
  "date": "2023-09-11",
  "description": "string"
}

Update Income
- Endpoint path: /api/incomes/{user_id}/{income_id}
- Endpoint method: PUT
- Request shape (form):
 -income_id: integer
- Response: Updates income for user
- Response shape (JSON):
{
  "id": 0,
  "income_title": "string",
  "income_amount": 0,
  "date": "2023-09-11",
  "description": "string"
}

Delete Income
- Endpoint path: /api/incomes/{user_id}/{income_id}
- Endpoint method: DELETE
- Request shape (form):
  -income_id: integer
- Response: Deletes income for user
- Response shape (JSON):
true

Get All Expenses
- Endpoint path: /api/expenses/{user_id}
- Endpoint method: GET
- Request shape (form):
  -user_id: integer
- Response: Gets all expenses for user
- Response shape (JSON):
{
  "expenses": [
    {
      "id": 0,
      "expense_amount": 0,
      "date": "2023-09-11",
      "category_name": "string",
      "description": "string",
      "user_id": 0
    }
  ]
}

Create Expense
- Endpoint path: /api/expenses/{user_id}
- Endpoint method: POST
- Request shape (form):
  -user_id: integer
- Response: Creates expenses for user
- Response shape (JSON):
{
  "id": 0,
  "expense_amount": 0,
  "date": "2023-09-11",
  "category_name": "string",
  "description": "string",
  "user_id": 0
}

Get Single Expense
- Endpoint path: /api/expenses/{user_id}/{expense_id}
- Endpoint method: GET
- Request shape (form):
  -user_id: integer
  -expense_id: integer
- Response: Gets single expense for user
- Response shape (JSON):
{
  "id": 0,
  "expense_amount": 0,
  "date": "2023-09-11",
  "category_name": "string",
  "description": "string",
  "user_id": 0
}

Update Expense
- Endpoint path: /api/expenses/{user_id}/{expense_id}
- Endpoint method: PUT
- Request shape (form):
  -expense_id: integer
  -user_id: integer
- Response: Updates expense for user
- Response shape (JSON):
{
  "id": 0,
  "expense_amount": 0,
  "date": "2023-09-11",
  "category_name": "string",
  "description": "string",
  "user_id": 0
}

Delete Expense
- Endpoint path: /api/expenses/{user_id}/{expense_id}
- Endpoint method: DELETE
- Request shape (form):
  -expense_id: integer
  -user_id: integer
- Response: Deletes an expense for user
- Response shape (JSON):
"string"

Get All Categories
- Endpoint path: /api/category/{user_id}
- Endpoint method: GET
- Request shape (form):
  -user_id: integer
- Response: Gets all expense categories for user
- Response shape (JSON):
{
  "categories": [
    {
      "id": 0,
      "expense_category_name": "string"
    }
  ]
}

Create Category
- Endpoint path: /api/category/{user_id}
- Endpoint method: POST
- Request shape (form):
  -user_id: integer
- Response: Creates a category for user
- Response shape (JSON):
{
  "id": 0,
  "expense_category_name": "string"
}

Delete Category
- Endpoint path: /api/category/{user_id}/{category_id}
- Endpoint method: DELETE
- Request shape (form):
  -user_id: integer
  -category_id: integer
- Response: Deletes a category for user
- Response shape (JSON):
true

## Intended Market

Our audience is all potential investors and clients that desire financial stability who are looking for a system that gives the opportunity to track their finances.

## Functionality

- Users to the site can add their incomes for each month period and can add as many income sources as needed
- Users can navigate to the income analyzer that displays data in real-time of incomes of each month period as a way of visualizing all of their incomes in one view.
- Users can view their income information through a line chart and bar chart as well as a doughnut chart to understand income patterns
- User can add expenses by categories. i.e A user can add an expense for travel or entertainment with a specific date for that expense
- Expense page for a list view of all expenses with their respective categories and income list view in the form of a table
- Users can add new expenses and an expense graph to understand spending patterns
- Users can log in or sign up into their account to get started on building financial literacy

## Project Initialization

To understand how the application is configured, please follow these steps:

1. Clone the repository to your local machine
2. Use the CD command to switch to the clone repo
3. Run docker `docker volume create findex`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run the application on localhost:3000 and view the application through this port

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
- [ ] GitLab issue board is setup and in use (or project management tool of choice)
- [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `api`, are services, that
you can start building off of.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `api` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `api` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to CapRover. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.
- `.env.sample`: This file is a template to copy when
  creating environment variables for your team. Create a
  copy called `.env` and put your own passwords in here
  without fear of it being committed to git (see `.env`
  listed in `.gitignore`). You can also put team related
  environment variables in here, things like api and signing
  keys that shouldn't be committed; these should be
  duplicated in your deployed environments.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - REACT_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the REACT_APP_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
