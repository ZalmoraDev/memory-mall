## NPM Dependencies

### Runtime

| Layers                               | Dependency                                                                 | Role                                      | Categories                                                              | Usage                                                                                                              |
|--------------------------------------|----------------------------------------------------------------------------|-------------------------------------------|-------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| ![BP](dependency-icons/BE-layer.svg) | **[express](https://www.npmjs.com/package/express)**                       | Web framework                             | ![Web](dependency-icons/Web-cat.svg)                                    | -                                                                                                                  |
| ![BP](dependency-icons/BE-layer.svg) | **[morgan](https://www.npmjs.com/package/morgan)**                         | Logging middleware                        | ![Web](dependency-icons/Web-cat.svg)                                    | log every HTTP request to console (skipped during tests)                                                           |
| ![BP](dependency-icons/BE-layer.svg) | **[zod](https://www.npmjs.com/package/zod)**                               | Runtime TS validation                     | ![Val](dependency-icons/Val-cat.svg)                                    | -                                                                                                                  |
| ![BP](dependency-icons/BE-layer.svg) | **[drizzle-zod](https://www.npmjs.com/package/drizzle-zod)**               | Runtime Drizzle-ORM TS schema integration | ![Val](dependency-icons/Val-cat.svg) ![DB](dependency-icons/DB-cat.svg) | Auto-generates Zod insert/select schemas from Drizzle-ORM table definitions                                        |
| ![BP](dependency-icons/BE-layer.svg) | **[cors](https://www.npmjs.com/package/cors)**                             | CORS security middleware                  | ![Sec](dependency-icons/Sec-cat.svg)                                    | -                                                                                                                  |
| ![BP](dependency-icons/BE-layer.svg) | **[jose](https://www.npmjs.com/package/jose)**                             | JWT                                       | ![Sec](dependency-icons/Sec-cat.svg)                                    | -                                                                                                                  |
| ![BP](dependency-icons/BE-layer.svg) | **[helmet](https://www.npmjs.com/package/helmet)**                         | General security middleware               | ![Sec](dependency-icons/Sec-cat.svg)                                    | -                                                                                                                  |
| ![BP](dependency-icons/BE-layer.svg) | **[bcrypt](https://www.npmjs.com/package/bcrypt)**                         | Authentication security                   | ![Sec](dependency-icons/Sec-cat.svg)                                    | Signup/login encryption & decryption                                                                               |
| ![BP](dependency-icons/BE-layer.svg) | **[pg](https://www.npmjs.com/package/pg)**                                 | PostgreSQL DB                             | ![DB](dependency-icons/DB-cat.svg)                                      | -                                                                                                                  |
| ![BP](dependency-icons/BE-layer.svg) | **[drizzle-orm](https://www.npmjs.com/package/drizzle-orm)**               | PostgreSQL ORM                            | ![DB](dependency-icons/DB-cat.svg)                                      | Define ORM tables & relations in `schema.ts`, used for type-safe DB queries (insert, update, delete, transactions) |
| ![BP](dependency-icons/BE-layer.svg) | **[sharp](https://www.npmjs.com/package/sharp)**                           | image reformatter and resizer             | ![Util](dependency-icons/Util-cat.svg)                                  | Used to change user/business given "listingImages" to `.png` format                                                |
| ![BP](dependency-icons/BE-layer.svg) | **[custom-env](https://www.npmjs.com/package/custom-env)**                 | .env file loading                         | ![Util](dependency-icons/Util-cat.svg)                                  | Loads `.env` (prod), `.env.dev` (dev) or `.env.test` (test) in `env.ts` based on var `APP_STAGE`                   |
| ![BP](dependency-icons/BE-layer.svg) | **[@epic-web/remember](https://www.npmjs.com/package/@epic-web/remember)** | Memorization utility                      | ![Util](dependency-icons/Util-cat.svg)                                  | In testing/dev, reuse the same db connection pool across reloads to avoid exhausting PG connections                |

### Development

| Layers                               | Dependency                                                   | Role                   | Categories                             | Usage                                                                                     |
|--------------------------------------|--------------------------------------------------------------|------------------------|----------------------------------------|-------------------------------------------------------------------------------------------|
| ![BP](dependency-icons/BE-layer.svg) | **[typescript](https://www.npmjs.com/package/typescript)**   | TS Language tooling    | ![Val](dependency-icons/Val-cat.svg)   | -                                                                                         |
| ![BP](dependency-icons/BE-layer.svg) | **[@types/*](https://www.npmjs.com/package/@types/express)** | TS Type declarations   | ![Val](dependency-icons/Val-cat.svg)   | -                                                                                         |
| ![BP](dependency-icons/BE-layer.svg) | **[drizzle-kit](https://www.npmjs.com/package/drizzle-kit)** | Database tooling       | ![DB](dependency-icons/DB-cat.svg)     | Access DB through `drizzle-kit studio`, generate SQL migrations & pushes schema to the DB |
| ![BP](dependency-icons/BE-layer.svg) | **[vitest](https://www.npmjs.com/package/vitest)**           | Test runner            | ![Test](dependency-icons/Test-cat.svg) | Runs all integration tests under `tests/`                                                 |
| ![BP](dependency-icons/BE-layer.svg) | **[supertest](https://www.npmjs.com/package/supertest)**     | HTTP testing           | ![Test](dependency-icons/Test-cat.svg) | Test HTTP requests through Vite without starting a live Express server                    |
| ![BP](dependency-icons/BE-layer.svg) | **[tsx](https://www.npmjs.com/package/tsx)**                 | Node with TS execution | ![Util](dependency-icons/Util-cat.svg) | -                                                                                         |
| ![BP](dependency-icons/BE-layer.svg) | **[cross-env](https://www.npmjs.com/package/cross-env)**     | Environment tooling    | ![Util](dependency-icons/Util-cat.svg) | Ensures env vars work consistently across OS's.                                           |

---

## Legend

### Layers

- ![BP](dependency-icons/BE-layer.svg) **Back-end** (TS Node.js)
- ![FE](dependency-icons/FE-layer.svg) **Front-end** (TS React)

### Categories

- ![Web](dependency-icons/Web-cat.svg) Building **web** applications
- ![Val](dependency-icons/Val-cat.svg) **Validating** data types, formats & constraints
- ![Sec](dependency-icons/Sec-cat.svg) General **security**, authentication & authorization
- ![DB](dependency-icons/DB-cat.svg) **Database** interactions, including drivers, schema's and ORMs
- ![Test](dependency-icons/Test-cat.svg) E2E, integration and unit **testing** tools & libraries
- ![Util](dependency-icons/Util-cat.svg) General **utilities**, such as: env config, logging, memorization, etc.
