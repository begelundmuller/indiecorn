# Indiecorn: an enterprise-ready SaaS business boilerplate

## Criteria

- It should support both a managed and self-hosted offering
- It should support geo-distributed data for latency _and_ compliance
- It should use dependencies that you can self-host or buy as a managed service

## Roadmap

- [x] Setup web stack consisting of [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Prisma](https://www.prisma.io)
- [x] Add authentication using [Next Auth](https://next-auth.js.org)
- [ ] Add workspace and groups administration
- [ ] Add highly configurable authorization management using [SpiceDB](https://authzed.com/spicedb/)
- [ ] Add SSO and SAML support using [Work OS](https://workos.com)
- [ ] Add billing, subscription and tax management with support for usage-based pricing using [Stripe](https://stripe.com/) or [Paddle](https://paddle.com)
- [ ] Add option for real-time/collaborative features using [Soketi](https://soketi.app) and [Automerge](https://automerge.org)
- [ ] Add deployment documentation for Postgres and [CockroachDB])(https://www.cockroachlabs.com)
- [ ] Add configuration of geo-affinity for workspaces that gets passed through to dependent services
- [ ] Add support for user and workspace deletion
- [ ] Add data export functionality
- [ ] Add instrumentation with [getanalytics.io](https://getanalytics.io), [Next.js Analytics](https://nextjs.org/docs/advanced-features/measuring-performance), and [Grafana](https://grafana.com)
- [ ] Add terms of service and privacy policy
- [ ] Add audit logging
- [ ] Add guides for setting up managed versions of dependencies
- [ ] Add contributing docs
- [ ] Add docs with Docusaurus exposed on `/docs`
- [ ] Add BI with [Airbyte](https://airbyte.com), [BigQuery](https://cloud.google.com/bigquery), [dbt](https://www.getdbt.com), and [Metabase](https://www.metabase.com)
- [ ] Add Docker dev containers and Docker Compose for local development with all dependencies set up
- [ ] Add Docker image builds using Github CI/CD
- [ ] Add guidelines for building a landing page with [webflow](https://webflow.com)
- [ ] Add [Temporal](https://temporal.io) for advanced workflows
- [ ] Add customer lifecycle emails (welcome, getting started, etc.) using customer.io or Sendgrid
- [ ] Add customer support with Chatwoot
- [ ] Add status page with Atlassian Statuspage
- [ ] Add search with https://typesense.org
- [ ] Add an admin/support page
- [ ] Ensure codebase preparedness for compliance with [Vanta](https://www.vanta.com)
