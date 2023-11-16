# Challenge backend

## Requirements

- NodeJS v20.7.0
- Yarn
- NPX

## How to run

- cd into `/backend` folder
- Create `.env` file with `cp .env.example .env`
- Run `yarn` to install dependencies
- Run `npx prisma migrate dev --name init` to create the SQLite database
- Run `yarn dev`
- The server will be running in [http://localhost:3000](http://localhost:3000)
