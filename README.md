# Bank Customer Statement Processor front-end

This is a front-end of a bank customer statement processor app. It allows to upload a statement record file in .xml or .csv format and gets as a response a final pdf report based on the uploaded record which opens in a new tab in the browser. 

The application is using a project starter template for a React application using Vite, TailwindCSS, and TypeScript.
Uses circleci for autmated deployments to heroku.

## Features

- Vite for a modern and fast development experience
- React for building user interfaces
- TailwindCSS for rapid style development
- TypeScript for type safety

## Scripts Available

To install and run this project, use the following steps:

In the project directory run the following commands:

### Install the dependencies:

```
npm install
```
### Run the project:

```
npm run dev
```
This runs the project locally connected to already deployed backend.

If you want to make request to the local backend api, you need to change the `BASE_URL` in `constants.ts` file to the local backend url.