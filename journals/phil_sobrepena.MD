## August 7, 2023

First day of project ideation. The team shared ideas and decided on a project to present.
Our current idea is an application that suggests a coffee drink to users.

## August 8, 2023

Second day of ideation. We have all agreed on a new project idea - an expense tracking application.

## August 9, 2023

We have started to work on basic wireframes and drawing out how the project works. We have an MVP for review.

## August 10, 2023

We have requested our MVP be reviewed by an instructor and are working on our API endpoint design.

## August 11, 2023

Our MVP was approved and we are working on table designs

## Break

## August 14, 2023

Our API design and Table designs are ready for review. Jonathan started the docker-compose file and started building endpoints over the weekend. We will spend the next couple days catching up and getting Tawain, Rafael, and myself set caught up with the project.

## August 15, 2023

We are discussing how to use FASTAPI with the database and its relationship to Beekeeper or pgAdmin. First merge request was made by Jonathan and approved by Tawain

## August 16, 2023

Tawain started working on Expenses, we worked on his expense table together, and he started working on his expense endpoints. I was assigned to work on Incomes.

## August 17, 2023

I wrote my first line of code in this project in income.py for routers and queries. Jonathan wrote the table for income so will have to test my queries against it and possible make adjustments.

## August 18, 2023

Today I hosted a zoom session to continue working on the project.
We made progress on income endpoints, and expenses. Tawain and i both got stuck with validating then user as a part of our post requests.

## BREAK

## August 21, 2023

Tawain and I solved the user issue. I optimized the SQL on the migration table for condecimal using NUMERIC type, and properly formatted the user section of the table. By EOD I completed all endpoints for CRUD operations in the income section. Jonathan tried to set up backend auth over the weekend and ran into issues, he went through a long debugging session with instructors and they were able to get it working for us. Rafael and Tawain will be completing Expenses and Category endpoints by tomorrow.

## August 22, 2023

Today we are doing merge requests to update our local repos with the backend Auth code Jonathan completed with instructors yesterday. Then we can all protect the endpoints we are working on and send our own merge requests. Tawain and Rafael will also be completing their endpoints today.

## August 23, 2023

More merge requests today, spent most of our time with merge requests and the rest of the team catching up with their endpoints.

# August 24, 2023

More Merge requests today, and protected endpoints with auth, front end auth register / signup complete. Helped out a teammate with some git flow issues.

# August 25, 2023

We finished the expense delete endpoint,i approved the merge request from Rafael. We also started working on some front end auth together.

## BREAK

# August 28, 2023

Today we worked on getting merge requests done in the correct order so that everyone has functioning front end auth.

# August 29, 2023

Today we all tried working on our own assigned tasks, it was a slow day and some of use seemed pretty drained. Tomorrow we will reconvene and see where we are at in the project.

# August 30, 2023

Today i was presented with an id issue regarding front end. We were unable to access user id to use at the end of our fetch path in order to gather data. I got myself caught up with the front end and started working on get all incomes to show. It took some time but i was able to use a fetch from username declared in LoginForm, store it into a variable, and push it to App.js through props. From there app passes the variable to the other routes so they can access user information. Will send merge request tonight so tomorrow morning it can be reviewed.
