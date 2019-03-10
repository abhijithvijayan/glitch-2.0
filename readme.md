# Glitch-2.0

An online game build on Node.JS

## Add Questions/Levels/Answers

You must be an admin to make changes to the game.
To make yourself an admin
- Sign In with your Google Account
- Use any mongodb client to edit the document saved under `User` collection
- Update `permission` field to value `20` for the account.

Done, You can now see options to edit the game in the dashboard.

## Delete Data

If you have previously loaded in this data, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```