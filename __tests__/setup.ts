import server from './server';

export default async function setup(): Promise<void> {
  try {
    await server.start();
  } catch (e) {
    throw new Error('Issue setting up test');
  }
}
