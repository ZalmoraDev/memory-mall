<div align="center">
<h1 style="margin-top: 0; padding: 0;">
   <img src="frontend/public/icons/web/logo/logo-FFF.svg" style="height: 48px; width: auto; vertical-align: middle; margin-bottom: 12px;">
   Memory Mall
</h1>
</div>

[//]: # (TODO: Verify README.md before delivering project)

[//]: # (TODO: Add screenshot of the website)
<!-- ![Edit Project View](docs/edit.png)) -->
![TypeScript](https://img.shields.io/badge/ts-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-0db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-35495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Nuxt](https://img.shields.io/badge/nuxt-080f1e.svg?style=for-the-badge&logo=nuxt&logoColor=00DC82)
![Express](https://img.shields.io/badge/express-000000.svg?style=for-the-badge&logo=express&logoColor=white)    
![Zod](https://img.shields.io/badge/zod-408AFF.svg?style=for-the-badge&logo=zod&logoColor=white)
![Drizzle](https://img.shields.io/badge/drizzle-1d1c21.svg?style=for-the-badge&logo=drizzle&logoColor=C5F74F)
![Vitest](https://img.shields.io/badge/vitest-1c1d22.svg?style=for-the-badge&logo=vitest&logoColor=00FF74)
![Drizzle](https://img.shields.io/badge/sharp-242e22.svg?style=for-the-badge&logo=sharp&logoColor=99CC00)   
🖥 2004-2013 themed tech marketplace Web Application 🌐Express.js, Nuxt.js & TypeScript

[//]: # (TODO: Replace first table with screenshot of the website)

<table>
  <tr>
    <td><img src="/docs/readme/screenshot.png" alt="Screenshot of Memory Mall"></td>
    <td><img src="/docs/readme/ERD.png" alt="Entity Relation Diagram"></td>
  </tr>
</table>

## Prerequisites

- **Docker CLI** & **Docker Compose** installed on your system

## Build and Run

1. Clone the repository.
2. Navigate to the project directory in your terminal.
3. Start the project:
    ```bash
   docker compose up -d
    ```
## Stop / Cleanup

* Stop containers:
    ```bash
   docker compose -p memory-mall stop
    ```

* Remove containers, used volumes, images & networks:
    ```bash
    docker compose -p memory-mall down -v --rmi local
    ```

## Usage

- Website: http://localhost:3001
- pgAdmin: http://localhost:8080, use credentials found in `compose.yml -> pgadmin`:
    - Site login:
        - **Email Address:** admin@local.dev
        - **Password:** admin123
    - Server connection (Project->MemoryMallDB:
        - **Password:** database123

## Technologies Used

[//]: # (TODO: Finalize dependencies)

- Docker
    - npm
        - tailwindcss: ^4
- PostgreSQL: ^16
    - pgadmin: ^9

test
test
test