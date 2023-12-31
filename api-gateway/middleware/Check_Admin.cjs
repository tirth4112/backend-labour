// const jwt = require('jsonwebtoken');

// function CheckAdmin(req, res, next) {
//     try {
//         // Extract the token from the Authorization header
//         const token = req.headers.authorization.split(" ")[1];
        
//         // Verify the token using the secret key ("secret" in this case)
//         const decodedToken = jwt.verify(token, "secret");
        
//         console.log(decodedToken);
        
//         // Attach the decoded user data to the request object for further use
//         req.userdata = decodedToken;
        
//         // Call the next middleware or route handler
//         next();
//     } catch (error) {
//         // If the token is not valid or has expired, return a 401 Unauthorized response
//         return res.status(401).json({
//             message: "Invalid token",
//             error: error.message  // Include the error message for debugging purposes
//         });
//     }
// }
// module.exports = {
//     CheckAdmin: CheckAdmin
// };















const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function CheckAdmin(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request for further use
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token', error: error.message });
  }
}

// Function to extract token from the request
function extractToken(req) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.slice(7); // Remove 'Bearer ' to get the actual token
  }

  return null;
}

module.exports = {
    CheckAdmin: CheckAdmin,
};
