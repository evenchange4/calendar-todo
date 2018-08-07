/* eslint no-console: 0 */
// @flow
import fs from 'fs-extra';
import chalk from 'chalk';
import log from './log';
import readPromptCode from './readPromptCode';
import { SCOPES, TOKEN_PATH } from './configs';

async function getAccessToken(oAuth2Client: Object): Object {
  /**
   * 1. Try to read from cache file
   */
  if (await fs.pathExists(TOKEN_PATH)) {
    const tokens = await fs.readJson(TOKEN_PATH);
    log(chalk.blue(`Use cached AccessToken from ${TOKEN_PATH}`));

    if (tokens) return tokens;
  }

  /**
   * 2. Create a new one
   */
  try {
    log(chalk.blue('Create a new accessToken'));
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log(
      chalk.blue(`Authorize this app by visiting this url:
==========================================================
${authUrl}
==========================================================
`),
    );
    const code = await readPromptCode();
    const { tokens } = await oAuth2Client.getToken(code);

    /* Note: cache it */
    fs.writeJson(TOKEN_PATH, tokens);
    log(chalk.blue(`AccessToken stored to ${TOKEN_PATH}`));

    return tokens;
  } catch (error) {
    log(chalk.red('getAccessToken error', error));
  }

  return '';
}

export default getAccessToken;
