// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCkWz0ZptZUVnikM66diQEGJrDRz4k68XU",
    authDomain: "voa-mobileapp-push-auth.firebaseapp.com",
    databaseURL: "https://voa-mobileapp-push-auth.firebaseio.com",
    projectId: "voa-mobileapp-push-auth",
    storageBucket: "voa-mobileapp-push-auth.appspot.com",
    messagingSenderId: "256726183248"
 }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
