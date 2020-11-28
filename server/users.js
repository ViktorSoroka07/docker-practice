const users = [
  {
    userName: 'john-doe@gmail.com',
    password: '$2a$10$dg.E5kVRdYMKTtHe6yHlUu1R.iFjB/FAxR4a21WXVnb1FQCMD78GC', // password
  },
  {
    userName: 'rino-gatuso@gmail.com',
    password: '$2a$10$iwxu1iTHujba5Qo0m2sWFufk.oBPVvH5EIOLZ/wH6/1o2CuaNfGKa', // Welcome123
  },
];

module.exports.findByUserName = userName => users.find(user => user.userName === userName);
