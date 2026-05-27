 //Route = “where to go” Controller = “what to do”

 
export const userController = (req, res) => {


  
//1. Get data from frontend (req.body)
//2. Validate fields
//    - empty?
//    - valid email?
//    - password length?
// 3.Check if user already exists
//    - email
//    - username
// 4.Hash password
// 5. Create user in database
// 6. Check if user created successfully]
// 7. Send response

// 1. Get file from frontend
// 2. Validate file
// 3. Upload to cloud
// 4. Save file URL in DB
// 5. Generate shareable link
// 6. Send response

  const {username,email,password}=req.body
  console.log("user",username);
  

};