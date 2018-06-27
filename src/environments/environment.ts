// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  functions: {
    sendPushNotification: 'sendPushNotificationDev',
  },
  firebase: {
    apiKey: 'AIzaSyD5g0T6cf3qmw_siihBRk8F_GtiOFeOtRQ',
    authDomain: 'voa-admin-dashboard.firebaseapp.com',
    databaseURL: 'https://voa-admin-dashboard.firebaseio.com',
    projectId: 'voa-admin-dashboard',
    storageBucket: 'voa-admin-dashboard.appspot.com',
    messagingSenderId: '240913753196',
  },
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
