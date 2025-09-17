import { Configuration, RedirectRequest, PopupRequest } from '@azure/msal-browser';
import { environment } from '../../../environments/environment';

// MSAL Configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.msalConfig.clientId,
    authority: environment.msalConfig.authority,
    redirectUri: environment.msalConfig.redirectUri,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0: // LogLevel.Error
            console.error(message);
            return;
          case 1: // LogLevel.Warning
            console.warn(message);
            return;
          case 2: // LogLevel.Info
            console.info(message);
            return;
          case 3: // LogLevel.Verbose
            console.debug(message);
            return;
        }
      },
    },
  },
};

// Scopes for API access
export const loginRequest: RedirectRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
  redirectUri: environment.msalConfig.redirectUri,
};

export const graphScopes: PopupRequest = {
  scopes: ['User.Read', 'Mail.Read'],
};

// API Scopes for PTS Backend
export const ptsApiScopes: RedirectRequest = {
  scopes: [`api://${environment.msalConfig.clientId}/user_impersonation`],
  redirectUri: environment.msalConfig.redirectUri,
};
