class ErrorHandler extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.status = err.status || 500;
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400, "Bad Request");
  }
  if (err.name === "jsonWebTokenError") {
    err = new ErrorHandler("Invalid Token", 401, "Unauthorized");
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `json Web Token Is Expired. Try To Login`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "CasrError") {
    const message = `invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.value(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;
  res.status(err.status).json({
    error: errorMessage,
    status: err.status,
  }); 
};

export default ErrorHandler;
