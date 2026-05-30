// ApiResponse.js
// 1. Create a common success response format
// 2. Store statusCode
// 3. Store message
// 4. Store data
// 5. Store success=true
// This keeps all API success responses similar.
class ApiResponse {
    constructor(statusCode, message, data) {
        console.log("[ApiResponse.js] ApiResponse constructor entered because a controller is preparing a success response.");
        console.log("[ApiResponse.js] Incoming response data:", { statusCode, message, data });
        console.log("[ApiResponse.js] Next step: store response fields in one common JSON shape.");
        // Example: 200 or 201.
        this.statusCode = statusCode;
        // Example: "Login successful".
        this.message = message;
        // Actual response data, like user or token.
        this.data = data;
        // success true tells frontend request worked.
        this.success = true;
        console.log("[ApiResponse.js] ApiResponse object created. Data going out to res.json():", this);
    }
}

export { ApiResponse };
