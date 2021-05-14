const AWS = require('aws-sdk');
const {isDev} = require('../constants/environment');

AWS.config.update({
  region: 'eu-west-1',
});

const attributes = {
  attributes: {
    'DefaultSMSType': 'Transactional', // highest reliability 
  }
};

const SNSservice = new AWS.SNS({ apiVersion: '2010-03-31' });

const awsService = {
  sendSMS(phone, msg) {
    if (isDev)
      return new Promise(resolve => resolve());
      
    SNSservice.setSMSAttributes(attributes);
    return SNSservice.publish({
      Message: msg,
      PhoneNumber: phone
    }).promise();
  }
}

module.exports = awsService;