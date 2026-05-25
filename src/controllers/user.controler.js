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

  const {usename,email,password}=req.body
  console.log("user",username);
  

};