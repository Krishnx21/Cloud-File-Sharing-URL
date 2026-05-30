// asyncHandler.js
// 1. Controllers use async/await
// 2. Async code can throw errors
// 3. This wrapper catches errors automatically
// 4. It sends error to Express next(err)
// 5. This avoids writing try/catch in every controller
const asyncHandler = (requestHandler) => {
    console.log("[asyncHandler.js] asyncHandler called while a controller is being wrapped for a route.");
    console.log("[asyncHandler.js] Incoming data: controller function to protect from async errors:", requestHandler?.name || "anonymous controller");
    console.log("[asyncHandler.js] Data going out: a new Express middleware function is returned to the route.");
    // Return a new Express middleware function.
    return (req, res, next) => {
        console.log("[asyncHandler.js] Wrapped controller is running for this request.");
        console.log("[asyncHandler.js] Incoming request data:", { method: req.method, url: req.originalUrl, body: req.body });
        console.log("[asyncHandler.js] Next function: actual controller will execute now.");
        // Run controller and catch any error.
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            console.log("[asyncHandler.js] Error caught from controller. Data going out to Express next(err):", err);
            next(err);
        });
    };
};

export { asyncHandler };
