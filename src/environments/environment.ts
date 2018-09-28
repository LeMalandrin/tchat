// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  //Configuration Firebase
  firebase: {
    apiKey: "AIzaSyCK6WXUvrg7kUwRAisSWbY6EVWawwkP-jk",
    authDomain: "tchat-76322.firebaseapp.com",
    databaseURL: "https://tchat-76322.firebaseio.com",
    projectId: "tchat-76322",
    storageBucket: "tchat-76322.appspot.com",
    messagingSenderId: "844196796784"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
