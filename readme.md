# Glitch-2.0
![GitHub](https://img.shields.io/github/license/abhijithvijayan/glitch-2.0.svg)

An online game build on Node.JS

# Getting Started

## Authentication
Uses [google-oauth 2.0](http://www.passportjs.org/packages/passport-google-oauth20/) with [passport.js](http://www.passportjs.org/)

## Add/Modify Levels & Answers

You must be an admin to make changes to the game.
To make yourself an admin
- Sign In with your Google Account
- Use any mongodb client to edit the document saved under `User` collection
- Update `permission` field to value `20` for the account.

Done, You can now see options to edit the game in the dashboard.


## Add Questions
Edit the `/views/mixins/_question.pug` file to your need.


## Store Assets
- Save your `svg's` under `/public/images/icons/`
- Save your `images` under `/public/images/photos`

<hr />

# Development

- Copy contents from `variables.env.sample` to `variables.env`
- Fill in with your credentials (Generate google API key from console)
- `npm run dev` launches express at PORT 7777
- Visit `localhost:7777` in your browser to load the game

# Production
- Run `npm run minify` to minify `JS` and `CSS`
- Update `PORT=80` and `NODE_ENV=production`  in `variables.env` file
- Then run `npm start` to launch the server

<hr />

## Delete Data

If you have previously loaded data to your DB, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```
Also delete all the other `collections` manually with `MongoDB Compass`

## Assets Used

- Text Scramble Effect : [Pen](https://codepen.io/soulwire/pen/mErPAK) by [@soulwire](https://codepen.io/soulwire/)
- Parallax Star background : [Pen](https://codepen.io/saransh/pen/BKJun) by [@saransh](https://codepen.io/saransh/)

## ToDo
- [ ] Fix Push Notification (service-worker registration)
- [ ] Ban Users Feature
- [ ] T&C Page
- [ ] Time Lag issue on Some browsers
- [ ] Instructions and Rules Page
- [ ] Refactor Leaderboard Page

## Licence
This project is licenced under [MIT](LICENCE)