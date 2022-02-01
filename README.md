# jogging-tracker

jogging tracker is a RESTful API app made to track jogging times.

## Task analysis
[Task analysis Document](https://docs.google.com/document/d/1-WKfhCvalxrdFs6z2xB3c3flaH6CB459EaxrNzpO9DI/edit?usp=sharing)

## Database design
[Database design schema](https://dbdesigner.page.link/ecDVLVaKY7yVTMBY9)

## ERD
![](https://cdn.discordapp.com/attachments/936033307542560809/937873374376501269/ERD.jpg)

## API Documentation
Run the server on development mode then go to the link bellow
```
http://localhost:<port>/docs
```

## Local Setup

1. Install [Node.js](https://nodejs.org/en/download/)

2. Install [MongoDB](mongodb.com/try/download/community)

3. Install [git](https://git-scm.com/downloads)

4. Clone the repository
```
$ git clone https://github.com/IslamGoher/jogging-tracker.git
```
5. `cd` to the repository directory
```
$ cd jogging-tracker
```
6. Install dependencies

```
$ npm install
```
7. Create `.env` file, and add [Environment Variables](#environment-variables) to it using `nano`:
```
$ nano .env
```
9. Run the server

for development environment
```
$ npm run dev
```
for production environment
```
$ npm run build && npm start
```
## Environment Variables

1. `PORT` = ${port number that server will running on}, example: `3000`
2. `JWT_SECRET` = any string secret, example: `my secret`
3. `PG_USER` = username of postgres server, example: `postgres`
4. `PG_PASSWORD` = user password of postgres server, example: `123456`
5. `PG_HOST` = domain name of postgres server, example: `localhost`
6. `PG_PORT` = the port that postgres server running on, example: `5432`
7. `PG_DB` = database name that wanted to connect with, example: `postgres`
