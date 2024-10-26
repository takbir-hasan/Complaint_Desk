import jwt from 'jsonwebtoken';

export const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authentication failed. You Can`t Hack!🕵️‍♂️' });
  }

  try {
    const token = authorization.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using the secret key

    req.user = decoded; // Attach the decoded user data to the request object for use in other routes
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};


 export const AdminLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authentication failed. You Can`t Hack!🕵️‍♂️' });
  }

  try {
    const token = authorization.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using the secret key

    req.user = decoded; // Attach the decoded user data to the request object for use in other routes
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};



export const TeacherLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authentication failed. You Can`t Hack!🕵️‍♂️' });
  }

  try {
    const token = authorization.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token using the secret key

    req.user = decoded; // Attach the decoded user data to the request object for use in other routes
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};
