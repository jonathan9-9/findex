## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

## August 23, 2023

I tested all the endpoints for a couple of teammates. I reviewed a teammates merge request and approved of it after checking that everything works on my end. Then I pulled from main branch and resolved all possible merge conflicts. I worked on front-end auth and set up the sign up form.

## August 22, 2023
I helped teammates with getting the endpoints protected and fixing an issue with the get specific user endpoint.

## August 21, 2023
Today, I completed the back-end authentication and finalized the login, logout and token endpoints. I debugged an issue I had with the user form and changed users to users_out since this is a slightly different output from the second call to my create_users method of the queries. This second call outputs the hashed password and is used to ultimately log a user in and create a token.

## August 17, 2023
I created the income migration table in PGAdmin and everything seems to be working and I made migrations. Then assisted teammates to create expense and category table and testing it out on PGAdmin.

## August 16, 2023
I created a second issue because I updated the users table to include the password property. We also re-tested all of the CRUD endpoints to ensure that we can create a user, get a list of users, get a specific user, and delete a user. Then I created foreign key relationships between the users table and the expenses/incomes table.

## August 15, 2023
Today, I worked on making my first issue/feature on Gitlab of completing the docker compose yml file and I demoed the workflow for creating an issue and creating a feature branch to create my first merge request. The merge request was reviewed and approved by
Tawain after pulling it and testing my branch. Everything successfully worked and was approved by him and I proceeded with finalizing the merge request. Then my teammates pulled those changes from the main branch. The testing involved accessing certain
local host ports to ensure that they are working properly after configuring the docker file.


## August 14, 2023

Today, I worked on completing the database schema with Phil and Tawain. Then the same day I installed a Visual Studio Code
extension called Code Spell Checker and black to format python code. I then got the docker containers up and running. To test
that the development server and localhost ports are working I tested them out on the web browser and opened up the FastAPI docs
to test out the users endpoints including the GET, POST and DELETE.
