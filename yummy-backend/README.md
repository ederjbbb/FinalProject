# [Yummy](https://yummy.fyi) - Backend

## Dependencies 
It was validated using `node v14.2.0` and `Maria DB`, but MySQL also should work just importing the dependency.

## Available Scripts

In the project directory, you can run:

### `npm start`
It will start the development server on [http://localhost:3001](http://localhost:3001).

### `npm start-watch`
It will start the development server like `npm start` but it will run using pm2 and it will watch for file changes and reload the server automatically.

### `npx sequelize-cli db:migrate --env=production`
Creates all tables for a specific database environment.

### `npx sequelize-cli db:seed:all --env=production`
Creates some sample data, like users, restaurants and meals.
