const amqp = require('amqplib');
const queueNames=require('../../../api-gateway/Rabbitmq/Queue.json')
const  publishToQueue =  require('../../../api-gateway/SendingToQueue/publishToQueue.cjs');
exports.Admin_Login_Controller = async (req, res) => {
try
{  const queues = queueNames.Auth_user;

  const data = req.query;

  if(data.username==undefined || data.password==undefined)
  { 
    res.status(500).json({ message: 'Empty Field' });

  }
  await publishToQueue(queues.Admin_Login, JSON.stringify(data));
  res.status(200).json({ message: 'Login successful' });
}
catch(c)
{
  res.status(400).json({ message: 'Login ussuccessful' });
 
}
};
