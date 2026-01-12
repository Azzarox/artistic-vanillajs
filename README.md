# Artistic

Small Front-End project which is a Single Page Application and uses Firebase for authentication and database.

## How to use

Go to: https://fir-project-39721.web.app/

Email: `test@test.com`

Password: `tester`

## Project overview:

1. Sign-Up
2. Sign-In
3. View all created photos from other users and you respectively
4. Create a photo
5. Edit a photo
6. Delete a photo
7. Comment a photo
8. Like a photo
9. Search photo
10. View your profile
11. Edit your profile
12. View your created photos in the profile page

- 1, 2, 3 and 9 - Can be done with guest account
- 5 and 6 - Can be done only if **YOU ARE** the creator of the photo
- 7 and 8 - Can be done only if you are **NOT** the creator of the photo

***The Project is responsive***

***Price functionality is currently not working due to restrictions in the back-end***

## Developing Instructions

1. Run `npm start` to start the lite-server for dynamic changes while developing.
2. Run `npm run watch` to update the `dist` on every change in the code.
3. Run `firebase deploy` to deploy changes. 

### Notes about Developing

1. If want to add a new `.css` file. After creating it, it needs to be added to the `app.js` as an import so the webpack sees it.
2. `npm run build` builds the project with optimizations and minifying
3. Other commands can be found under `scripts` in the `package.json` file.

### Dependencies and packages used

1. Webpack as a module bundler.
2. Firebase as a backend as a service
   - Firebase Authentication
   - Firebase Firestore Database
   - Algolia Search (instantsearch.js) Extension to Firestore for a searching functionality
3. `lit-html` as a templating engine.
4. `page.js` as a router.
5. Other dependencies and plugins for webpack which could be found in the `package.json` file.
