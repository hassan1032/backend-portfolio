
export const generateToken = (user, message, statusCode, res) => {
    const token = user.getJwtToken();
    res
      .status(statusCode)
      .cookie("token", token, {
        expire: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  };
  