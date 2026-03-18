## NPM Dependencies

### Runtime

| Layers                          | Dependency                                                                 | Role                                      | Categories                                                               | Usage                                                                                                              |
|---------------------------------|----------------------------------------------------------------------------|-------------------------------------------|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| ![BP](dep-layers/BE-orange.svg) | **[express](https://www.npmjs.com/package/express)**                       | Web framework                             | ![Web](dep-categories/Web-blue.svg)                                      | -                                                                                                                  |
| ![BP](dep-layers/BE-orange.svg) | **[morgan](https://www.npmjs.com/package/morgan)**                         | Logging middleware                        | ![Web](dep-categories/Web-blue.svg)                                      | log every HTTP request to console (skipped during tests)                                                           |
| ![BP](dep-layers/BE-orange.svg) | **[zod](https://www.npmjs.com/package/zod)**                               | Runtime TS validation                     | ![Val](dep-categories/Val-green.svg)                                     | -                                                                                                                  |
| ![BP](dep-layers/BE-orange.svg) | **[drizzle-zod](https://www.npmjs.com/package/drizzle-zod)**               | Runtime Drizzle-ORM TS schema integration | ![Val](dep-categories/Val-green.svg) ![DB](dep-categories/DB-orange.svg) | Auto-generates Zod insert/select schemas from Drizzle-ORM table definitions                                        |
| ![BP](dep-layers/BE-orange.svg) | **[cors](https://www.npmjs.com/package/cors)**                             | CORS security middleware                  | ![Sec](dep-categories/Sec-yellow.svg)                                    | -                                                                                                                  |
| ![BP](dep-layers/BE-orange.svg) | **[jose](https://www.npmjs.com/package/jose)**                             | JWT                                       | ![Sec](dep-categories/Sec-yellow.svg)                                    | -                                                                                                                  |
| ![BP](dep-layers/BE-orange.svg) | **[helmet](https://www.npmjs.com/package/helmet)**                         | General security middleware               | ![Sec](dep-categories/Sec-yellow.svg)                                    | -                                                                                                                  |
| ![BP](dep-layers/BE-orange.svg) | **[bcrypt](https://www.npmjs.com/package/bcrypt)**                         | Authentication security                   | ![Sec](dep-categories/Sec-yellow.svg)                                    | Signup/login encryption & decryption                                                                               |
| ![BP](dep-layers/BE-orange.svg) | **[pg](https://www.npmjs.com/package/pg)**                                 | PostgreSQL DB                             | ![DB](dep-categories/DB-orange.svg)                                      | -                                                                                                                  |
| ![BP](dep-layers/BE-orange.svg) | **[drizzle-orm](https://www.npmjs.com/package/drizzle-orm)**               | PostgreSQL ORM                            | ![DB](dep-categories/DB-orange.svg)                                      | Define ORM tables & relations in `schema.ts`, used for type-safe DB queries (insert, update, delete, transactions) |
| ![BP](dep-layers/BE-orange.svg) | **[custom-env](https://www.npmjs.com/package/custom-env)**                 | .env file loading                         | ![Util](dep-categories/Util-grey.svg)                                    | Loads `.env` (prod), `.env.dev` (dev) or `.env.test` (test) in `env.ts` based on var `APP_STAGE`                   |
| ![BP](dep-layers/BE-orange.svg) | **[@epic-web/remember](https://www.npmjs.com/package/@epic-web/remember)** | Memorization utility                      | ![Util](dep-categories/Util-grey.svg)                                    | In testing/dev, reuse the same db connection pool across reloads to avoid exhausting PG connections                |

### Development

| Layers                          | Dependency                                                   | Role                   | Categories                              | Usage                                                                                     |
|---------------------------------|--------------------------------------------------------------|------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------|
| ![BP](dep-layers/BE-orange.svg) | **[typescript](https://www.npmjs.com/package/typescript)**   | TS Language tooling    | ![Val](dep-categories/Val-green.svg)    | -                                                                                         |
| ![BP](dep-layers/BE-orange.svg) | **[@types/*](https://www.npmjs.com/package/@types/express)** | TS Type declarations   | ![Val](dep-categories/Val-green.svg)    | -                                                                                         |
| ![BP](dep-layers/BE-orange.svg) | **[drizzle-kit](https://www.npmjs.com/package/drizzle-kit)** | Database tooling       | ![DB](dep-categories/DB-orange.svg)     | Access DB through `drizzle-kit studio`, generate SQL migrations & pushes schema to the DB |
| ![BP](dep-layers/BE-orange.svg) | **[vitest](https://www.npmjs.com/package/vitest)**           | Test runner            | ![Test](dep-categories/Test-purple.svg) | Runs all integration tests under `tests/`                                                 |
| ![BP](dep-layers/BE-orange.svg) | **[supertest](https://www.npmjs.com/package/supertest)**     | HTTP testing           | ![Test](dep-categories/Test-purple.svg) | Test HTTP requests through Vite without starting a live Express server                    |
| ![BP](dep-layers/BE-orange.svg) | **[tsx](https://www.npmjs.com/package/tsx)**                 | Node with TS execution | ![Util](dep-categories/Util-grey.svg)   | -                                                                                         |
| ![BP](dep-layers/BE-orange.svg) | **[cross-env](https://www.npmjs.com/package/cross-env)**     | Environment tooling    | ![Util](dep-categories/Util-grey.svg)   | Ensures env vars work consistently across OS's.                                           |

---

## Legend

### Layers

- ![BP](dep-layers/BE-orange.svg) **Back-end** (TS Node.js)
- ![FE](dep-layers/FE-blue.svg) **Front-end** (TS React)

### Categories

- ![Web](dep-categories/Web-blue.svg) Building **web** applications
- ![Val](dep-categories/Val-green.svg) **Validating** data types, formats & constraints
- ![Sec](dep-categories/Sec-yellow.svg) General **security**, authentication & authorization
- ![DB](dep-categories/DB-orange.svg) **Database** interactions, including drivers, schema's and ORMs
- ![Test](dep-categories/Test-purple.svg) E2E, integration and unit **testing** tools & libraries
- ![Util](dep-categories/Util-grey.svg) General **utilities**, such as: env config, logging, memorization, etc.
