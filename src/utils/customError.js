// This custom error is used to show a message to the user without exposing the error message
// "messageShownToUser" is handled by the failureHandler middleware
class CustomError extends Error {
    constructor(userMessage, status = 500) {
      super();
      this.message = userMessage;
      this.status = status;
  
      Error.captureStackTrace(this, this.constructor);
    }
  };
  
  module.exports = CustomError;