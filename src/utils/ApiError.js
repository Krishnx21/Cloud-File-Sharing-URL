// ApiError.js
// 1. Create a custom error class
// 2. Store statusCode like 400, 401, 500
// 3. Store message like "User already exists"
// 4. Store success=false
// 5. Throw this error inside controllers when something is wrong
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Internal Server Error",
        errors = [],
        stack = " "
    ) {
        console.log("[ApiError.js] ApiError constructor entered because a controller is throwing an error response.");
        console.log("[ApiError.js] Incoming error data:", { statusCode, message, errors, stack });
        console.log("[ApiError.js] Next step: store these values on the Error object for Express/error handling.");
        // Error parent class stores the message.
        super(message);
        // HTTP status code for response.
        this.statusCode = statusCode;
        // Extra error details if needed.
        this.errors = errors;
        // No data is returned when error happens.
        this.data = null;
        // Stack helps debug where error came from.
        this.stack = stack;
        // success false tells frontend request failed.
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            // Capture stack trace automatically.
            Error.captureStackTrace(this, this.constructor);
        }
        console.log("[ApiError.js] ApiError object created. Data going out:", this);
    }
}

export { ApiError };
