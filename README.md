To start the server on port 3000, the api at port 7777, and set up the database type in:
```
cd server
npm install --production=false
npm run devStart

```

Next open another terminal - without closing the first - and run:
```
cd client
npm install --production=false
npm run start

```

You should now have a page running on http://localhost:8080. 
Open this again in another tab or browser of your choice to begin your two player game of battleship!