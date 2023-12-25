import consumeQueueAndPostToDatabase from './Subscriber/login-subscribe.js'
import Admin_Login_Successful_subscribe from './Subscriber/Admin_Login_Successful_subscribe.js'
import Admin_Login_unSuccessful_subscribe from './Subscriber/Admin_Login_unSuccessful_subscribe.js'

//  function () 
 const CallingSubscribe = () =>{
    consumeQueueAndPostToDatabase();
    Admin_Login_unSuccessful_subscribe();
    Admin_Login_Successful_subscribe();
  }
  export default CallingSubscribe;