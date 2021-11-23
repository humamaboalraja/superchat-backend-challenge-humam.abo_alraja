import seed from './seed';

seed()
  .then(() => {
    console.log('seeded successfully');
    process.exit(0);
  })
  .catch(e => {
    console.log('error seeding', e);
    process.exit(1);
  });
