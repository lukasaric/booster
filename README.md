# Booster

## :page_with_curl: Dependencies

<!-- ENGINES-LIST:START - Do NOT remove or modify this section -->
- **node** (>= 10.17.0)
- **npm** (>= 6.11.0)
- **postgres** (>= 9.4)
<!-- ENGINES-LIST:END -->

Check `engines` field in [`package.json`](package.json)

## :computer: Installation

### Prerequisites

- [Node.js & npm](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)
- Clone this repo

### Setup

- Run `npm install` in the repo directory
- Create database in PostgreSQL
- App is configured via environment variables contained in a file named `.env`.
  Use the `.env.example` file as a template: `cp .env.example .env` and enter configuration details.
- Run `npm run db:seed` to load vehicle dataset from `vehicle.json` file, if any error run `npm run db:reset` and then `npm run db:seed`.
- You can create admin/learner user by running `npm run user:add`
- For other scripts run `npm run`

## :rocket: Launch

### Development

- Server: `npm run dev:server`
- Client: `npm run dev:client`

### Production

- Bundle client by issuing `npm run build`
- `npm run start`
