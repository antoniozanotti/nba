# nba

Vue Challenge for Frontend position at T4tech.

![Alt text](./tests/players-test.ts-snapshots/Players-should-display-elements-1-lg-linux.png?raw=true "NBA Players")

## Features

- List of NBA Players
- Order Players by name
- Filter Players by name
- Pagination
- Edit Player
- Delete Player

It's being used [balldontlie API](https://www.balldontlie.io/) to get players data. Changes are being stored in Local Storage.

## Get Started

```bash
git clone git@github.com:antoniozanotti/nba.git
cd nba
cp .env.example .env
# change .env file with your api key
npm i
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Development Server

Start server locally at `http://localhost:5173`:

```bash
# npm
npm run dev
```

## Tests

To run end to end tests, first make sure development server is runing, so:

```bash
# npm
npm run test
```

## What are tecnologies that I used?

- Vue.js 3.5
- Vite 6
- TypeScript
- Tailwind CSS
- shadcn-vue as component library
- Axios for data fetching
- Pinia for state management
- Zod for form validation
- Playwright for end-to-end tests.
- ESLint
- Vercel
