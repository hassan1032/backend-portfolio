// export const generateToken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   res
//     .status(statusCode)
//     .cookie("token1", token, {
//       expire: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
    sameSite: 'Strict',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message,
    user,
  });
};
