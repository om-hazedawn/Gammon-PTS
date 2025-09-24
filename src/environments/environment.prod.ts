export const environment = {
  production: true,
  apiUrl: 'https://app-gammon-pts-dev-backend.azurewebsites.net/api',
  msalConfig: {
    clientId: 'ce82a460-db03-4e9d-a0c4-2a062dd9c5ed',
    authority: 'https://login.microsoftonline.com/668c53aa-445f-4661-a18d-d9e542601f44',
    redirectUri: 'https://gammon-pts.vercel.app/auth/callback',
  },
};
