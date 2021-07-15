**What?**

SQL benchmark. Process raw text and get all the nodes (Concepts) of a graph and the relations between them (with "statement", "context" and "timeline" properties)

Install npm moduels with `yarn` in the root folder.

### Create database

```sh
yarn start:dev:db
```

This will create a docker instance with PostgreSQL needed for a successuful start of the server.
Make sure your docker is up and running.

### Run migrations

```sh
yarn typeorm:migration:run
```

This will execute migrations based on the models defined in `src/models`. For now it will create 4 tables: User, Context, Statement and migrations(not application related table, to keep track of the migrations).

### Check the database access

(Optional) If we are using PostreSQL, we can connect to it directly via Terminal to verify the tables that have been created:

```sh
docker exec -it my_database_server psql -U postgres
```

Then, once in Docker, run:

`\list` to list all the databases
`\c my_database` to change to the database called `my_database`
`\dt` or `\d+` to list the tables
`SELECT * FROM table_name;` to get all the rows of a table


### Start the server in the watch mode

```
yarn start:dev
```

This will start nestjs server.

### Try it out

Get all of the current user from database:

```sh
curl localhost:3000/user
```

Should return empty `[]` as there is no users in the database yet.

Create a new user:

```sj
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"user": {"username":"testuser"}}' \
  http://localhost:3000/user
```

Check if it has been created:

```sh
curl localhost:3000/user
```

Should return something like:

```js
[{"id":"c5dcf587-b164-4565-98a5-819283369e01","username":"testuser"}]
```
