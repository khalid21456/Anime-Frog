const scanner = require('sonarqube-scanner').default || require('sonarqube-scanner');
scanner({
  serverUrl: 'http://sonarqube:9000',
  token: 'squ_80f6c8176d559996c13e0553f46a659acfaa2b9c',
  options: {

  }
}, () => {});
