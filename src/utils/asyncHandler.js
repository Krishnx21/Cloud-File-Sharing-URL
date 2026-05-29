// asyncHandler.js
// 1. Controllers use async/await
// 2. Async code can throw errors
// 3. This wrapper catches errors automatically
// 4. It sends error to Express next(err)
// 5. This avoids writing try/catch in every controller
const asyncHandler = (requestHandler) => {
    // Return a new Express middleware function.
    return (req, res, next) => {
        // Run controller and catch any error.
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };
