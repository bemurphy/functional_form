import faker from 'faker';

let submissions = {};

function generateSubmissions() {
  let s = [];

  for (let i=1; i<10; i++) {
    s.push({
      id: i,
      email: faker.internet.email().toLowerCase(),
      avatar: faker.internet.avatar(),
      name: faker.name.findName(),
      phone_number: faker.phone.phoneNumber(),
      bio: faker.lorem.sentence()
    });
  }

  return s;
}

module.exports = function(formId, callback) {
  console.log('getting submissions for formId', formId);

  if (submissions[formId]) {
    callback(null, submissions[formId]);
  } else {
    $.get(`http://localhost:9393/submissions/${formId}`, function(data){
      submissions[formId] = data;
      callback(null, data);
    });
  }
};
