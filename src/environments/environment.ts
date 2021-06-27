// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  geoapiUrl: 'https://api.geoapify.com/v1/geocode/search?',
  geoapiKey: '959e02afa2ac4a01bb1bc0ed9f261073',
  openweatherapiUrl: 'https://api.openweathermap.org/data/2.5/onecall?',
  openweatherapiKey: '38f87b6348faa7a3f6e3d55c3e385e69'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
