# 🧊 TonIce Clicker Game 🎮

## Overview
✨ Stay updated with the latest news and updates: [Join Clicker Game News / Updates](https://t.me/clicker_game_news) ✨

## Environment Variables
You'll need the following environment variables in your `.env` file:

```env
DATABASE_URL="your MongoDB database URL"
BOT_TOKEN="your Telegram bot token"  # Optional if BYPASS_TELEGRAM_AUTH is true
BYPASS_TELEGRAM_AUTH=true  # Set to true during tests
```

And these variables in your `.env.local` file:

```env
NEXT_PUBLIC_BYPASS_TELEGRAM_AUTH=true  # Set to true during tests
NEXT_PUBLIC_BOT_USERNAME="yout Telegram bot username like MyBot_bot" 
NEXT_PUBLIC_APP_URL_SHORT_NAME="your app short name" # the short name of your app, which you provide to BotFather when creating a Telegram mini app, is given last
```

## Getting Started 🚀

Follow these steps to see the app in test mode on your local machine:

1. **Navigate to the project directory**
   ```sh
   cd your-project-directory
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up your environment variables**
   ```env
   # In .env
   DATABASE_URL="your MongoDB database URL"
   BYPASS_TELEGRAM_AUTH=true  # For tests

   # In .env.local
   NEXT_PUBLIC_BYPASS_TELEGRAM_AUTH=true  # For tests
   ```

4. **Generate Prisma schema**
   ```sh
   npx prisma generate
   ```

5. **Seed the database with test data**
   ```sh
   npx prisma db seed
   ```

6. **Run the app**
   ```sh
   npm run dev
   ```

7. **Check and customize the code**
   - Files to review: `prisma/seed.ts`, `utils/tasks-data.ts`, `utils/game-mechanics.ts`, `utils/consts.ts`

## Video Instructions 🎥

📺 **Instruction Video Released!** Check out the detailed video on my YouTube channel where I walk you through:
- Running the code on Vercel
- Creating a Telegram Mini App

👉 Watch the video now and get started: [YouTube Instructions Video](https://youtu.be/OYcqPL1HSTo?si=MjVNFBSAV-W0pz57)

## Env Variables for Vercel Deployment 🚀

You need to provide only the following environment variables while deploying to Vercel:
```env
DATABASE_URL
BOT_TOKEN
NEXT_PUBLIC_BOT_USERNAME
NEXT_PUBLIC_APP_URL_SHORT_NAME
```