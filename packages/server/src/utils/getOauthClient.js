// @flow
import { google } from 'googleapis';
import getAccessToken from './getAccessToken';
import { type Tokens } from './type.flow';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} = process.env;

async function getOauthClient() {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL,
  );
  const tokens: Tokens = await getAccessToken(oAuth2Client);
  oAuth2Client.setCredentials(tokens);

  return oAuth2Client;
}

export default getOauthClient;
