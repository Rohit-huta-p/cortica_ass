const User_model = require("../models/User_model");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    
    // let imageUrl;
    // if(req.file){
    //     imageUrl = req.file.path;
    // }else{
    //     imageUrl = "https://res.cloudinary.com/dempyh9cj/image/upload/v1721107625/image_vikjmz.png";
    // }
    // const user = await User_model.findOne({ email });
    // if (user) {
    //   return res.status(400).json({ message: "User already exists" });
    // } else {
    //   const newUser = new User_model({
    //     name,
    //     email,
    //     password,
    //     role,
    //     profilePicture: imageUrl
    //   });
    //   await newUser.save();
    //   return res.status(201).json({ message: "User created successfully" });
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" }); // Respond with an error
  }
};

module.exports = { registerUser };
