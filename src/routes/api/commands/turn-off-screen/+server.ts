import type { RequestHandler } from './$types';
import { execSync } from 'node:child_process';

export const GET: RequestHandler = async () => {
  try {
    const stdout = execSync('~/bin/turnoffscreen.sh');
    console.log(stdout.toString());
  } catch (error) {
    console.error(`Error: ${error}`);
  }

  return new Response();
};
