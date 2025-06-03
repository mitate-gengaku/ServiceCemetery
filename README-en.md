# RIPro
### A service that carefully preserves records and lessons from completed projects. Whether successful or failed, all experiences are inherited as organizational assets and applied to next-generation projects. Let's share to learn from the past and create the future.

<table>
	<thead>
    	<tr>
      		<th style="text-align:center">English</th>
      		<th style="text-align:center"><a href="README.md">日本語</a></th>
    	</tr>
  	</thead>
</table>

## Background
I wanted to create something like a memorial site for projects that ended without seeing the light of day - projects where services were launched but not used by users, or where motivation was lost and development was abandoned midway. This targets public repositories.

## Top Screen
I implemented a simple, game-style graveyard UI.

![Top Screen](/top.jpg)

## Technology Stack
This uses what's called the T3 Stack configuration.

The main technologies used are:
- Next.js
- NextAuth(Auth.js)
- PostgreSQL(Neon)
- Redis(Upstash)
- tRPC
- TailwindCSS
- shadcn/ui
- Three.js
- @react-three/fiber
- @react-three/drei

## Project Structure
- `src/` - Next.js application source code
- `docker-compose.yml` - Docker container configuration
- `Dockerfile` - Application Docker image definition

## Getting Started
This project is configured to manage the Next.js application within Docker containers. Please follow the steps below to get started.

### Prerequisites
- Docker
- Docker Compose

### Startup Instructions
1. Clone the repository
```bash
git clone https://github.com/mitate-gengaku/cemetery-app

cd cemetery-app