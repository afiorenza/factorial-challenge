# Challenge

## Requirements

* Docker

## How to run

* Clone this repository with `git clone git@github.com:afiorenza/factorial-challenge.git`
* `cd` into the project's root folder
* Create `.env` files with `cp ./frontend/.env.example ./frontend/.env` and `cp ./backend/.env.example ./backend/.env`.
* Run `docker compose -f "docker-compose.yml" up -d --build`
* Open the challenge in [http://localhost:8080](http://localhost:8080)
* Enjoy :)

Inside each component you will find instructions to run standalone.

### Project structure and boilerplate

The following document is intended to explain the use of different technologies and libraries for the development of the project. To better structure the text, I am going to separate the document into the three layers of the project which are frontend, backend and database and then the use of docker.

**Frontend**

React was a requirement of the challenge, so I think it makes no sense to give it any further explanation.

I used Typescript for static typing, which substantially improves error detection and makes it possible to write more robust code. Combined with Visual Studio's autocompletion, it also improves the development experience and makes it easier to detect if an error is being made. In cases such as passing parameters. A tradeoff is that by not using it in the past, except as a test, the development was slower than what I am used to and it was difficult to create the interfaces in certain cases.

Redux for state management in the frontend seems to be overkill for a project of this magnitude, where there is global data such as type but there is not a considerable amount of data mutation nor shared states between the different components. React Context would have been sufficient for this project.

Tailwind for styling was quite convenient since the predefined classes increase the productivity, it also improves consistency as classes are already predefined. In the case of components, I think that it was not very relevant to create them from scratch since it requires a lot of time and in general the interfaces tend to always be the same, but it is something to evaluate depending on the UX/UI of the project that must be developed.

Vite as a build tool was the best choice since it is considerably faster than others like Parcel or Webpack and have a lot of support within the community. It also provides extra features such as the development server, ES6 modules, Hot Module Replacement, CSS import, among others.

**Backend**

For the backend I used NodeJS since there was no requirement to use a specific language and it is the one I know best.

I decided to use a Prisma ORM for DB management since schema modelling improves maintainability and integrates very well with TypeScript. It also provides methods for reading and writing data so you don't have to embed queries in the code. The tradeoff I had to use a raw query because couldn’t make the subquery with the aggregate method. Also that the library has a bug in the management of dates (https://github.com/prisma/prisma/issues/3084) and therefore I had to format them to be able to filter by date.

**Database**

I chose SQLite since it is a serverless database, which does not require any complex installation as you work directly with the file. Also it complies with the SQL standards, which is the technology you use in Factorial from what I spoke about in the interview with Roger. Since I was using docker in the project I could have used a more complete database like MySQL or Postgre but I think SQLite has the necessary features given the project.

**Docker**

I chose Docker for two reasons, the first is that using it in conjunction with docker-compose it is extremely easy to run the project for any user/developer who has docker installed on their computer. And second, to leave both projects dockerized and be able to use any tool such as K8s, Heroku or Digital Ocean Apps to be able to deploy easily.

### Requirements

The initial requirements sent by Roger were the following 

> We need a Frontend + Backend application that allows you to post and visualize metrics. Each metric will have: Timestamp, name, and value. The metrics will be shown in a timeline and must show averages per minute/hour/day The metrics will be persisted in the database.

What I understood from reading the requirements is that the application should be able to allow the user to:

* Add metrics with the fields timestamp, name or type that is used to classify the metric and the value of the metric. I chose humidity and temperature to give some examples.

* Filter by type and date.

* Display a timeseries chart with the results and averages per minute, hour and day.

On a technical level:

* The application had to persist the data in a database, I chose a relational database since it is the standard used in factorial.

* The frontend had to be developed in React.

* I was free to choose the programming language to write the backend.
