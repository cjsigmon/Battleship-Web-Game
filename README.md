Watch video demo at https://youtu.be/3vpfmnwZBDo

<img width="1081" height="548" alt="Screenshot 2025-09-13 204306" src="https://github.com/user-attachments/assets/8936bd78-606d-4455-a12e-eda3443baa10" />


To set up everything on a local server, just run 
```
cd server
npm install
npm run start

```

Alternatively, to run the server and client separately, do the following:

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
