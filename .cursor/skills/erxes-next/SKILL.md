---
name: erxes-next
description: >-
  Operate erxes (erxes XOS / erxes-next) through its live GraphQL API using
  confidential OAuth device-flow auth. Covers core workflows (contacts,
  companies, products, tags, documents, brands, automations, org structure, team
  members), the block plugin (projects, buildings, zonings, units, opportunities,
  payment plans, contracts, offers, invoices), and the operation plugin (projects,
  tasks, triage, teams, cycles, milestones). Use when the user mentions erxes,
  erxes-next, XOS, or asks to read/list/search/group/create/update/delete erxes
  records, or to diagnose erxes OAuth/session issues.
---

# erxes-next

Operate erxes through the live GraphQL API. This is **not** a generic CRM integration — stay strictly inside erxes.

## Hard Anti-Hallucination Rules

- Stay inside erxes. Never fall back to HubSpot, Salesforce, generic OAuth, generic CRM schemas, invented REST endpoints, or guessed GraphQL operations when an erxes lookup fails.
- Use only evidence from this skill's reference files, the live erxes API response, or user-provided details. If none contain the answer, say what is missing and ask for it.
- Before any API work, ensure the task has `ERXES_BASE_URL`. If missing, ask for the gateway URL and stop.
- Never invent record IDs, statuses, users, teams, projects, buildings, units, dates, prices, or permissions.
- If the user gives a name instead of an `_id`, search/list likely matches first, then ask which exact record to use.
- If a reference file does not contain the operation, do not fabricate one. Try GraphQL introspection only if available; otherwise ask for the schema/operation name.
- Never claim a mutation succeeded unless the live API response confirms it.
- Never expose `accessToken`, `refreshToken`, raw session JSON, auth headers, API keys, cookies, or `.env` values.
- If authentication/permissions/scope/session state is unclear, diagnose OAuth/session first before any business mutation.

## Required Configuration

erxes uses confidential OAuth only. Collect these before doing erxes work:

```txt
ERXES_BASE_URL=https://<subdomain>.next.erxes.io/gateway   # or http://localhost:4000
ERXES_CLIENT_ID=<confidential-oauth-client-id>             # erxes Settings > OAuth Clients
ERXES_CLIENT_SECRET=<confidential-oauth-client-secret>     # shown once at client creation
```

Also confirm: target workflow (core / block / operation / unknown), intended action (read/list/search/group/create/update/delete/convert/publish/unpublish), and exact identifiers for any risky or write action.

## Authentication

Log in with the helper (opens the browser, waits for approval, prints session JSON to stdout):

```bash
ERXES_BASE_URL=<url> ERXES_CLIENT_ID=<client-id> ERXES_CLIENT_SECRET=<client-secret> bash scripts/login.sh
```

- All three env vars are required; do not use a default client id. Missing/wrong secret produces `invalid_client`.
- OAuth endpoints must NOT send the `erxes-subdomain` header — let the gateway infer the tenant from the host, then use the returned `subdomain` for GraphQL calls.
- Device codes expire after 10 minutes. Confidential clients should return `expiresIn: 28800` (~8h); if lower, report a backend/client config mismatch with the sanitized OAuth response.
- Never store tokens in project files or ask the user to copy tokens manually.

Refresh an expired access token (refresh tokens rotate — replace both in-memory tokens after success, never reuse the old refresh token):

```bash
ERXES_BASE_URL=<url> ERXES_CLIENT_ID=<client-id> ERXES_CLIENT_SECRET=<client-secret> ERXES_REFRESH_TOKEN=<refresh-token> bash scripts/refresh-token.sh
```

## Making API Calls

- Read `accessToken` from the login JSON, then send `Authorization: Bearer <accessToken>` and `erxes-subdomain: <subdomain>` headers on GraphQL calls.
- Reuse the active in-memory session for every request in the same conversation; do not restart device login per question.
- On `Unauthorized` / `invalid_grant` / expired token / GraphQL auth error: refresh once, retry the failed **read** once. For **writes**, do not silently retry — verify whether the write happened or ask the user. If refresh fails, run device login again.
- If GraphQL rejects a call for a missing scope/permission, report the missing scope and ask the user to update the OAuth client. Do not rerun OAuth until they confirm scopes changed.
- Assume owner-mode access for discovered workflows; only mention access problems if the live API actually rejects the request.

## Safe Action Rules

- Read, list, search, filter, group, and summarize can run directly. To group, fetch the matching list first, then group the returned records.
- For create/update, if the target record or required fields are unclear, summarize the planned change and ask only for the missing information.
- For **delete, remove, deactivate, publish, unpublish, end, transfer, or convert**, always identify the exact record and ask for explicit confirmation before sending the mutation.

### Risky-mutation warnings

- `blockDeleteBuilding` fails if the building still has zonings.
- `blockDeleteBuildingZoning` fails if the zoning still has units.
- `blockUpdateUnit` can fail if the unit already has a signed contract.
- `blockOpptyConvertToContract` needs both a target unit and a payment plan.
- `operationConvertTriageToTask` may need a valid team-specific status type.

## Reference Files

Read these only when needed (progressive disclosure):

- [erxes-app-token-auth.md](erxes-app-token-auth.md) — quick confidential OAuth login reference.
- [erxes-graphql-api.md](erxes-graphql-api.md) — core erxes GraphQL queries and mutations.
- [block-api.md](block-api.md) — block plugin workflows and exact GraphQL operations (projects, buildings, zonings, units, opportunities, payment plans, contracts, offers, invoices).
- [operation-api.md](operation-api.md) — operation plugin workflows and exact GraphQL operations (projects, tasks, triage, teams, cycles, milestones, templates).

Scripts to **execute** (not read):

- `scripts/login.sh` — browser login helper.
- `scripts/refresh-token.sh` — token refresh helper.
