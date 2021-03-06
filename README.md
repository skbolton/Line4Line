# Line After Line

Welcome to Line After Line, a place where the stories never go how you expect! Playing the game involves taking turns adding a line to an unfolding story, only knowing the line that was written before you. Once completed the story is printed out for all players to see. You can even upvote and share popular stories with your friends. Gather around and let hilarity ensue!

##Tech
- Node
- Express
- React
- Mongo
- Socket.io

##Features not yet implemented
- Use Socket to display to the user how many turns they still have to wait.
- Allow users to create private stories that only their friends can join.
- Invite your friends from Facebook.
- Share stories on Facebook.

#Starting It Up

```
npm install
```

Start up the Express server on port 3000 with `npm start`.

##Facebook Auth
You will need to create an app at developers.facebook.com for Facebook authentication to work. Add all of your team members as developers to this app. Facebook will generate an App ID and App Secret for you.

Create a file named `secretsecrets.js` and save it in the `server` folder. Make sure this file is in your `.gitignore`. This file should have the following:

```
module.exports = {
 appId : your-fb-app-id,
 appSecret : 'your-fb-secret',
 secret : 'your-secret'
}
```
The `appId` will be a number. `appSecret` and `secret` should be strings. The `secret` can be whatever you want as long as it is a string.


##Starting up MongoDB
We recommend creating a folder on your desktop with the name of your db. Then cd to your desktop and run:
```
mongod --dbpath=./your-db-name --port=51707
```

The `models/config.js` calls for an environment variable that is a pathway to your database. Run this line in the terminal:
```
export DBPATH='mongodb://localhost:51707/lineafterline'
```

From there you can open a new terminal tab and run:

```
mongo
```
The you can type `show dbs` to see all your databases. Then type `use line4line`.

##Webpack
```
npm run webpack
```
Running  `npm run webpack` will create a bundle in the `dist` folder. This folder is what gets served to the web browser. Unfortunately, you will have to run this command every time you update a React component then restart your Express server with `npm start`. Webpack does come with a dev-server that you can run with `npm run dev`. The webpack dev server quickly rebundles for you every time you save an edit. However, this dev server runs on port 8080 and will give you CORS errors when you try to login with Facebook. There is a way to get the Express server and webpack dev server to play together but we did not figure it out.
