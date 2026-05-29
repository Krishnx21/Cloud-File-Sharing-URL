// ApiResponse.js
// 1. Create a common success response format
// 2. Store statusCode
// 3. Store message
// 4. Store data
// 5. Store success=true
// This keeps all API success responses similar.
class ApiResponse {
    constructor(statusCode, message, data) {
        // Example: 200 or 201.
        this.statusCode = statusCode;
        // Example: "Login successful".
        this.message = message;
        // Actual response data, like user or token.
        this.data = data;
        // success true tells frontend request worked.
        this.success = true;
    }
}

export { ApiResponse };
