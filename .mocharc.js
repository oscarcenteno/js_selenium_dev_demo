module.exports = {
  spec: './specs/**/*.spec.js',
  require: 'chai/register-expect.js',
  reporter: 'mochawesome',
  timeout: 10000 // Your application ideal timeout here
};
