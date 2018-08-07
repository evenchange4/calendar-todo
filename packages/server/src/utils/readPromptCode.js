// @flow
import readline from 'readline';

const readPromptCode = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', code => {
      rl.close();
      if (!code) reject(new Error('code required'));
      resolve(code);
    });
  });

export default readPromptCode;
