import reset from './reset';

reset()
  .then(() => {
    console.log('reset db data successfully');
    process.exit(0);
  })
  .catch(e => {
    console.log('error resetting db data', e);
    process.exit(1);
  });
