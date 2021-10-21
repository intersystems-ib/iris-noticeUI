// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /** navbar info **/
  name: 'base',
  description: '[local-base]',
  tooltip: 'BASE',

  /** local storage key used to store the credentials */
  authLocalStorageKey: 'pubsub-base-auth',

  /** REST API base URL */
  urlBase: 'http://es-ibserver2.iscinternal.com:39080/api/not/pubsub/v1',
  urlBaseForms: 'http://es-ibserver2.iscinternal.com:39080/forms/notice/form',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
