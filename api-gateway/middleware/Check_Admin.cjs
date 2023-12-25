const jwt=require('jsonwebtoken');
function CheckAdmin(req,res,next){
    try{
const token=req.headers.authorization.split(" ")[1];
const decodedtoken=jwt.verify(token,"secret");
console.log(decodedtoken);
req.userdata=decodedtoken;
next();

    }
    catch(error)
    {
return res.status(401).json({
    'message':"Invalid token",
    'error':error
})
    }
}
module.exports={
    CheckAdmin:CheckAdmin
}