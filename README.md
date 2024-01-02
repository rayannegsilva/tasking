# <img src='public/logo-indigo.svg' with='30'  heigh='30' /> Tasking

This application is for project management. Where, the user can register with google, create workspaces and boards.

# ⚒ Technologies and tools

- [NextJs 14](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Stripe](https://stripe.com)
- [Unsplash](https://unsplash.com/pt-br)
- [Clerk](https://clerk.com/)
- [shadcnUI](https://ui.shadcn.com/)
- [Tailwindcss](https://tailwindcss.com/)

# Pre requisites

You need [Nodejs](https://nodejs.org/en) 18.x.x > version. This project brings a dockerfile, where you can run a database on your machine. You must have docker installed, and MySQL! Run docker compose up to upload the container.

# Features
- [x] Auth with clerk.
- [x] Creating workspaces
- [x] Creation of tables, lists and cards.
- [x] Drag and Drop between lists and cards
- [x] Board limit per workspace.
- [x] Subscription with Stripe.
- [x] Copy list.
- [x] Copy board.

# To add

- [] Night mode
- [] Add members to card
- [] Copy board.
- [] Archive items

# Run

To run the stripe, you need to register and create an account for the project. With that, install the Stripe CLI. In API Keys, copy the secret key in the .env file, in STRIPE_API_KEY. In webhooks, with Stripe CLI installed, copy and paste the commands into the terminal.


