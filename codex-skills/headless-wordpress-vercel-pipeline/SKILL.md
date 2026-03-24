---
name: headless-wordpress-vercel-pipeline
description: "Use when a user wants to scan a Next.js frontend and convert it into a headless WordPress workflow: audit the project, propose CPT/taxonomy/Secure Custom Fields, generate default WordPress import artifacts after approval, refactor the frontend to fetch from WordPress, then verify build and prepare Vercel deployment."
---

# Headless WordPress Vercel Pipeline

## When to use

Use this skill when the user asks to:

- scan a Next.js project that will use headless WordPress
- propose a WordPress backend structure from sample frontend data
- prepare WordPress import files after structure approval
- wire the frontend to WordPress and deploy to Vercel

## Core workflow

1. Audit the project
   - inspect routes, page types, reusable sections, metadata, env files, and hardcoded data
   - look for arrays/objects that represent content entities
   - verify whether the folder is the real Git repo
   - verify whether dependencies are installed and buildable
   - check for encoding problems before extracting content

2. Propose the WordPress model
   - convert repeated frontend content into reusable entities
   - propose CPTs, custom taxonomies, and Secure Custom Fields
   - favor semantic field names over CSS-driven fields
   - ensure every entity needed by the frontend has a stable slug and route mapping

3. Wait for structure approval
   - do not generate import files until the user approves the model
   - lock SCF field names only after approval

4. Generate import artifacts
   - use WordPress WXR XML as the default format because it works with the default WordPress importer flow
   - include:
     - native pages
     - CPT posts
     - taxonomy terms and term assignments
     - post meta for SCF fields
   - keep slugs stable and deterministic

5. Refactor the Next.js frontend
   - create a dedicated data layer, preferably under `src/lib/wordpress/`
   - default to WordPress REST API unless the project already standardizes on GraphQL
   - map raw WordPress responses into frontend-friendly objects
   - replace hardcoded arrays progressively, starting with route-critical pages

6. Verify and prepare deployment
   - update site URL and API env vars
   - run the repo's build command
   - fix blocking runtime or type issues
   - commit and push only if the workspace is the actual Git repo

7. Learn from the project
   - update this skill with new schema conventions, import edge cases, and verification steps

## Output checklist

For each project, produce:

- a short audit summary
- a proposed WordPress content model
- a route-to-data mapping
- an implementation plan
- import artifacts after approval
- a short knowledge update back into the skill or its references

## Guardrails

- Prefer WordPress REST API to minimize plugin assumptions.
- For headless use, ensure CPTs, taxonomies, and required meta are exposed to REST.
- Avoid storing raw Tailwind classes in WordPress unless there is a hard requirement.
- Normalize sample content encoding before import generation.
- If the folder is not a Git repo, say so clearly and stop before commit/push steps.
- If dependencies are missing, say so clearly and stop before claiming build success.

## References

- For a project-specific example, read `docs/headless-wordpress-audit.md` in the repo when available.
- For the current execution order, read `docs/vercel-deploy-workflow.md` in the repo when available.
