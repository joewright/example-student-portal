# Example app

This is a web app that shows a list of assignments, each with a detail page.

## Dependencies

- Node 10+

## Getting started

After cloning the project, install dependencies via
```bash
npm install
```

Then run the server with
```bash
# fron the project root
APP_ENV=dev npm start
```

On your first run, you'll want to build the front-end assets.

In another terminal, build front-end assets by doing
```bash
cd frontend/
npm install
npm run build
```

See the [frontend README](./frontend) for more development info.