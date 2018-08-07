// @flow
import { join } from 'path';
import dotenv from 'dotenv-safe';

dotenv.load({
  sample: join(__dirname, '../../.env.example'),
});
