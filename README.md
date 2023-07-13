# How to run

This project is set up as a monorepo using yarn workspaces. For this reason, and since I use a DB in the backend, I was not able to make it work on Glitch. Please download the code thand execute it locally.

There are two yarn workspaces set up:

- `frontend` containing the code for the frontend app. It has been developed using React.
- `backend` containing the code for the API. It has been developed using Express and TypeORM.

To launch the project, you need first to run the postgres DB (the backend needs it). This can be done by doing:

```
cd packages/backend
docker-compose up
```

Install all the dependencies by doing:

```
yarn install
```

You can start the frontend and the backend by doing:

```
yarn workspaces frontend start
```

and

```
yarn workspaces backend start
```

respectively.

The frontend does not work in chrome because of CORS issues, since [I'm making a POST request to localhost](https://stackoverflow.com/questions/66534759/cors-error-on-request-to-localhost-dev-server-from-remote-site). Please test it in Firefox/Edge/Safari.
