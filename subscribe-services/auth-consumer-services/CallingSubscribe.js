import consumeQueueAndPostToDatabase from './Subscriber/Registration-subscribe.js'
import Admin_Login_Successful_subscribe from './Subscriber/Admin_Login_Successful_subscribe.js'
import Admin_Login_unSuccessful_subscribe from './Subscriber/Admin_Login_unSuccessful_subscribe.js'
import Admin_ForgetPassword from './Subscriber/Admin_ForgetPassword_subscribe.js'

//  function () 
 const CallingSubscribe = () =>{
    consumeQueueAndPostToDatabase();
    Admin_Login_unSuccessful_subscribe();
    Admin_Login_Successful_subscribe();
    Admin_ForgetPassword();
  }
  export default CallingSubscribe;