# Categories

- ![Web](badges/Web-blue.svg) Building web applications
- ![Val](badges/Val-green.svg) Validating data types, formats & constraints
- ![Sec](badges/Sec-yellow.svg) General security, authentication & authorization
- ![DB](badges/DB-orange.svg) Database interactions, including drivers, schema's and ORMs
- ![Test](badges/Test-purple.svg) E2E, integration and unit testing tools & libraries
- ![Util](badges/Util-grey.svg) General **utilities**, such as: env config, logging, memorization, etc.

# NPM Dependencies

## Runtime

| Dependency             | Role                                      | Categories                                               | Usage                                                                                                              |
|------------------------|-------------------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **express**            | Web framework                             | ![Web](badges/Web-blue.svg)                              | -                                                                                                                  |
| **morgan**             | Logging middleware                        | ![Web](badges/Web-blue.svg)                              | log every HTTP request to console (skipped during tests)                                                           |
| **zod**                | Runtime TS validation                     | ![Val](badges/Val-green.svg)                             | -                                                                                                                  |
| **drizzle-zod**        | Runtime Drizzle-ORM TS schema integration | ![Val](badges/Val-green.svg) ![DB](badges/DB-orange.svg) | Auto-generates Zod insert/select schemas from Drizzle-ORM table definitions                                        |
| **cors**               | CORS security middleware                  | ![Sec](badges/Sec-yellow.svg)                            | -                                                                                                                  |
| **jose**               | JWT                                       | ![Sec](badges/Sec-yellow.svg)                            | -                                                                                                                  |
| **helmet**             | General security middleware               | ![Sec](badges/Sec-yellow.svg)                            | -                                                                                                                  |
| **bcrypt**             | Authentication security                   | ![Sec](badges/Sec-yellow.svg)                            | Signup/login encryption & decryption                                                                               |
| **pg**                 | PostgreSQL DB                             | ![DB](badges/DB-orange.svg)                              | -                                                                                                                  |
| **drizzle-orm**        | PostgreSQL ORM                            | ![DB](badges/DB-orange.svg)                              | Define ORM tables & relations in `schema.ts`, used for type-safe DB queries (insert, update, delete, transactions) |
| **custom-env**         | .env file loading                         | ![Util](badges/Util-grey.svg)                            | Loads `.env` (prod), `.env.dev` (dev) or `.env.test` (test) in `env.ts` based on var `APP_STAGE`                   |
| **@epic-web/remember** | Memorization utility                      | ![Util](badges/Util-grey.svg)                            | In testing/dev, reuse the same db connection pool across reloads to avoid exhausting PG connections                |

## Development

| Dependency      | Role                   | Categories                      | Usage                                                                                     |
|-----------------|------------------------|---------------------------------|-------------------------------------------------------------------------------------------|
| **typescript**  | TS Language tooling    | ![Val](badges/Val-green.svg)    | -                                                                                         |
| **@types/***    | TS Type declarations   | ![Val](badges/Val-green.svg)    | -                                                                                         |
| **drizzle-kit** | Database tooling       | ![DB](badges/DB-orange.svg)     | Access DB through `drizzle-kit studio`, generate SQL migrations & pushes schema to the DB |
| **vitest**      | Test runner            | ![Test](badges/Test-purple.svg) | Runs all integration tests under `tests/`                                                 |
| **supertest**   | HTTP testing           | ![Test](badges/Test-purple.svg) | Test HTTP requests through Vite without starting a live Express server                    |
| **tsx**         | Node with TS execution | ![Util](badges/Util-grey.svg)   | -                                                                                         |
| **cross-env**   | Environment tooling    | ![Util](badges/Util-grey.svg)   | Ensures env vars work consistently across OS's.                                           |