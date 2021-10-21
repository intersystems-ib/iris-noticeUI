// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  /** navbar info **/
  name: 'live',
  description: '[local-live]',
  tooltip: 'LIVE',

  /** local storage key used to store the credentials */
  authLocalStorageKey: 'pubsub-live-auth',

  /** REST API base URL */
  urlBase: 'http://es-ibserver2.iscinternal.com/api/not/pubsub/v1',

};