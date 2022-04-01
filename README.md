# Indiecorn: an enterprise-ready SaaS business boilerplate

## Criteria

- It should support both a managed and self-hosted offering
- It should support geo-distributed data for latency _and_ compliance
- It should use dependencies that you can self-host or buy as a managed service

## Roadmap

- [x] Setup web stack consisting of [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Prisma](https://www.prisma.io)
- [x] Add authentication using [Next Auth](https://next-auth.js.org)
- [x] Add support for user and workspace deletion
- [x] Add monorepo setup with NX
- [x] Add good testing facilities, incl. end to end testing
- [x] Add Docker dev containers and Docker Compose for local development with all dependencies set up
- [x] Add docs with Docusaurus
- [ ] Add highly configurable authorization management
- [ ] Add workspace and groups administration
- [ ] Add SSO and SAML support using [Work OS](https://workos.com) or [BoxyHQ](https://boxyhq.com)
- [ ] Add billing, subscription and tax management with support for usage-based pricing using [Stripe](https://stripe.com/) or [Paddle](https://paddle.com)
- [ ] Add Docker image builds using Github CI/CD
- [ ] Add deployment documentation for Postgres and [CockroachDB])(https://www.cockroachlabs.com)
- [ ] Add guides for setting up managed versions of dependencies
- [ ] Add contributing docs
- [ ] Add terms of service and privacy policy
- [ ] Add an admin/support page
- [ ] Add options for rate limiting on a public and authenticated basis
- [ ] Add a quota and usage management and billing framework
- [ ] Add option for real-time/collaborative features using [Soketi](https://soketi.app) and [Automerge](https://automerge.org)
- [ ] Add instrumentation with [getanalytics.io](https://getanalytics.io), [Next.js Analytics](https://nextjs.org/docs/advanced-features/measuring-performance), and [Grafana](https://grafana.com)
- [ ] Add configuration of geo-affinity for workspaces that gets passed through to dependent services
- [ ] Add data export functionality
- [ ] Add audit logging
- [ ] Ensure codebase preparedness for compliance with [Vanta](https://www.vanta.com)
- [ ] Add BI with [Airbyte](https://airbyte.com), [BigQuery](https://cloud.google.com/bigquery), [dbt](https://www.getdbt.com), and [Metabase](https://www.metabase.com)
- [ ] Add guidelines for building a landing page with [webflow](https://webflow.com)
- [ ] Add [Temporal](https://temporal.io) for advanced workflows
- [ ] Add customer lifecycle emails (welcome, getting started, etc.) using [customer.io](https://customer.io) or [Sendgrid](https://sendgrid.com)
- [ ] Add customer support with Chatwoot
- [ ] Add status page with Atlassian Statuspage
- [ ] Add search with https://typesense.org


## Set up a development environment

Complete the following steps to set up a development environment

1. Copy `.env.example` into `.env` (ignored by Git) and populate the settings. For development purposes, it is sufficient to specify one authentication provider. You can use [Ethereal](ethereal.email) to quickly configure email authentication.
2. Install Docker if you don't already have it installed
2. Spin up a development container in VS Code by running the "Remote-Containers: Reopen in Container" command
3. Install dependencies by running `yarn install`
4. Run migrations with `yarn migrate`
5. Run `yarn start` to start the site on `localhost:3000`
6. Run `yarn docs:start` to start the docs site on `localhost:3001`

## Using `nx`

This project uses `nx` for monorepo management:

- Run `nx g @nrwl/TYPE:lib my-lib` to generate a library (replace `TYPE` with e.g. `next` or `workspace`)
- Run `nx e2e frontend` or `nx affected:e2e frontend` to run end-to-end tests
- Run `nx graph` to see a diagram of the project dependencies
