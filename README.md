# OSYNCO

## Environment Setup

### Install Prerequisites

- [DevTunnels CLI for port forwarding](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started)
- [Raycast for visual backend testing & internal actions](https://www.raycast.com/download)
- [Turborepo for monorepo management](https://turbo.build/repo/docs/getting-started/installation)
- [pnpm for managing dependencies](https://pnpm.io/installation)

### Configure Tunnel

> [!NOTE]
> Depending on the available devtunnel IDs, you may need to change the ID and find/replace within your version of the codebase. After running the following commands, a tunnel is automatically served when the dev server is started.

- `devtunnel user login`
- `devtunnel port create -p 6462`
- `devtunnel tunnel create osynco`

### Project Setup

- [ ] Adjust Raycast environment config in `apps/launcher/src/config/environment.ts` (not set up to consume .env - public extension)
- [ ] Set the dev and prod URLs in `.env`
- [ ] Generate an auth secret at https://generate-secret.vercel.app/32 and set in `.env`
- [ ] Get Google id/secret from Google Cloud Console and set in `.env`
- [ ] Get database connection string from Supabase and set in `.env`
- [ ] Copy `example.env` to `.env` and set the values

### Optional Customizations

- [ ] Replace `apps/launcher/assets/icon.png` with a rounded icon for the Raycast extension (if desired)

### CI & Production Deployment

- [ ] Connect a domain for production in Vercel settings
- [ ] Get Turbo team/token from Vercel (see Turbo docs) and set for CI actions in GitHub environment settings
- [ ] Set env vars in Vercel (use same auth secret as local)

## Dev Commands

- `pnpm dev` - Start the dev server
- `pnpm dev:ray` - Start the packages required for Raycast development
- `pnpm ci:fix` - Run the CI checks and fix any issues
- `pnpm db:push` - Push the database schema
- `pnpm db:studio` - Open the database viewer/editor
- `pnpm clean:workspaces` - Remove temp files and all package files
