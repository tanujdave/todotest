# Todo app

Todo listing
![alt text](https://image.prntscr.com/image/SkHijpq9QCSL33c1dyU57w.png)

Add new Todo
![alt text](https://image.prntscr.com/image/xX3ySqTDQI2Y3qBuBFu1-A.png)

Update existing Todo
![alt text](https://image.prntscr.com/image/--KwYL4YQ2W2VwGAnplDYg.png)


## Requirements

- Node
- yarn >= 1.19
- MySql 5.7.24
- Docker (optional)

## Installation

Clone the project from `https://github.com/tanujdave/todotest.git` using SSH or HTTPS.

```sh
todotest
- server (todo app api backend)
- web (todo app frontend)
docker-compose.yml
README.md
```

## Setup server (backend) - There are two ways to setup server (Manual and Docker)

### **Manual setup**

1. First install serer dependencies
```sh
cd ./server && yarn install
```

2. Setup mysql environment

Update .env file with working mysql credentials (start your mysql instance)

```sh
Add your local/remote mysql credentials
MYSQL_HOST="127.0.0.1"
MYSQL_PORT=3306
MYSQL_USER="root"
MYSQL_PASSWORD=""
MYSQL_DATABASE="tododb"
```

3. Start api server
```sh
cd ./server && yarn dev
```

Note: Just hit `http://localhost:3001/api/v1/todos` and test the api is running or not.

### **Docker setup**

1. First run below command to start with docker that install node and mysql services and setup environment variables.
```sh
cd ./todotest && docker-compose up
```

docker-compose shows the below logs on successfully container creation.
```sh
local-mysql-db    | 2020-09-01T06:38:21.342951Z 0 [Note] mysqld: ready for connections.
local-mysql-db    | Version: '5.7.24'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
todo-server_1     | yarn run v1.22.4
todo-server_1     | $ nodemon
todo-server_1     | [nodemon] 2.0.4
todo-server_1     | [nodemon] to restart at any time, enter `rs`
todo-server_1     | [nodemon] watching path(s): src/**/*
todo-server_1     | [nodemon] watching extensions: ts
todo-server_1     | [nodemon] starting `ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --no-notify ./src/index.ts`
todo-server_1     | Using ts-node version 8.10.2, typescript version 3.9.5
todo-server_1     | server is listening on port 3001 in development mode

```

Note: Just hit `http://localhost:3001/api/v1/todos` and test the api is running or not.

## Setup web (frontend)

1. First run below command to install all frontend dependencies.
```sh
cd ./web && yarn
```

2. Start/run frontend web
```sh
cd ./web && yarn start
```

3. Open web address into browser `http://localhost:3000`


## Testing server apis
1. To test server api use below command
```sh
cd ./server && yarn test
```

Note: To test server apis first stop api/server. That can be conflict with testing server.