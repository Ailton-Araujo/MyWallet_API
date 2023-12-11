This a project for the API of a Financial Manager App - MyWallet.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a MongoDB database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file

5. Run the command to sync the database

```bash
npm dev:generate
```

6. Run the API in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```

## How to Manually Test the API

1. Use this URL for the API Deploy Link

```bash
https://mywallet-api-u99i.onrender.com
```

2. Use this Documentation on Postman

```bash
https://documenter.getpostman.com/view/31711518/2s9Ykhg4aL
```

3. Use the ThunderClient Collection MyWallet_API on this Repository to test locally
