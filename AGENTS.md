# Repository Guidelines

## Project Structure & Module Organization
- `backend/` hosts a Spring Boot service (Java 17) with Gradle wrapper; source lives under `backend/src/main/java`, integration tests under `backend/src/test/java`, and build output in `backend/build/`.
- `frontend/` is a React + TypeScript Vite app; UI components and hooks sit in `frontend/src/`, static assets live in `frontend/public/`, and Vite config plus Tailwind settings are in the repo root of that package.
- `build/` and `node_modules/` are generated artifacts; do not edit them. Shared npm scripts in the repo root orchestrate both stacks and the supporting MySQL container defined in `docker-compose.yml`.

## Build, Test, and Development Commands
- `npm run dev` – runs `dev:backend` (Gradle `bootRun`) and `dev:frontend` (Vite dev server) in parallel; ideal for full-stack work.
- `npm run mysql` / `npm run mysql:stop` – starts or stops the Dockerized MySQL dependency.
- Backend: `cd backend && ./gradlew build` compiles and runs the Spring test suite; add `bootRun` for API smoke tests.
- Frontend: `cd frontend && npm run build` emits optimized assets, `npm run lint` checks ESLint/TypeScript rules, `npm run dev` previews the Vite app locally.

## Coding Style & Naming Conventions
- Java: stick to standard Spring conventions (PascalCase classes, camelCase methods/fields, Lombok annotations where already used); format with the IDE’s Google Style profile and keep REST controllers under `controller` packages.
- TypeScript/React: use functional components, hooks, and PascalCase for components. Align on 2-space indentation, Tailwind utility classes for styling, and colocate Zustand stores under `src/stores/`.
- Run ESLint before committing frontend code; favor descriptive file names like `EditorPane.tsx` for clarity.

## Testing Guidelines
- Backend tests rely on JUnit 5 via `./gradlew test`; ensure new endpoints have controller + service coverage and mock external resources.
- Frontend currently lacks an automated test suite; when adding tests, follow the `*.test.tsx` naming pattern and place them alongside components to simplify imports.
- Aim for meaningful coverage on critical editor and collaboration flows; document manual test notes in PRs until automated cases exist.

## Commit & Pull Request Guidelines
- Commit messages follow the present-tense, capitalized style seen in history (e.g., `Add websocket session guard`). Group related backend and frontend changes separately when possible.
- Every PR should describe the change, include reproduction or verification steps (`npm run dev`, curl samples, screenshots), and link the relevant issue. Confirm lint/tests pass and note any DB migrations or config toggles.
