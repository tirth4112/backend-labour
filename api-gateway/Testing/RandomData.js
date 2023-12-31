// generate-values.js
const faker = require('faker');
const fs = require('fs');

const RandomData = () => {
  const values = {
    Contact: faker.phone.phoneNumber(),
    password: faker.internet.password(),
  };

  fs.writeFileSync('generated-values.json', JSON.stringify(values, null, 2));
};

RandomData();
