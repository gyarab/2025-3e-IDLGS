# IDLGS
The digital textbook platform.

# Installation instructions
You need to have docker installed on your system. Your local PostgreSQL instance has to be disabled (port 5432).

Don't forget to set up .env file with all of the required keys, as laid out in .env.example.

```
git clone git@github.com:gyarab/2025-3e-idlgs.git
npm install
npm run db:start
in a separate terminal: npm run dev
```

# Hosting
Compile using
```
npm run build
```
Then start the Node server according to the SvelteKit documentation.

# Error checking
```
npm run check
npm run lint
npm run format
```

# Authors
Ali Yunussov, Martin Bykov, Kira Stepanova