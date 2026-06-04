# IDLGS

The digital textbook platform.

# Installation instructions

You need to have docker installed on your system. Your local PostgreSQL instance has to be disabled (port 5432).

Don't forget to set up .env file with all of the required keys, as laid out in .env.example.

```
# 1. Clone repository
git clone git@github.com:gyarab/2025-3e-IDLGS.git

# 2. Install dependencies
npm install

# 3. Run project
npm run dev:all
```

# Hosting

Compile using

```
npm run build
```

Then start the Node server according to the SvelteKit documentation.
https://svelte.dev/docs/kit/adapter-node

# Error checking

```
npm run check
npm run lint
npm run format
```

# Authors

Martin Bykov, Ali Yunussov, Kira Stepanova

# Additions

IDLGS Mobile (Android client)
https://github.com/gyarab/2025-3e-IDLGS-Mobile
