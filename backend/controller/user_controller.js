const User_model = require("../models/User_model");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    let imageUrl;
    if(req.file){
        imageUrl = req.file.path;
    }else{
        imageUrl = "https://res.cloudinary.com/dempyh9cj/image/upload/v1721107625/image_vikjmz.png";
    }
    const user = await User_model.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists", success: false });
    } else {
      const newUser = new User_model({
        name,
        email,
        password,
        role,
        profilePicture: imageUrl
      });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully", success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" }); // Respond with an error
  }
};


const loginUser = async (req, res) => {

  const {email, password} = req.body;
  const user = await User_model.findOne({email});
  if(user){
      const isPassChecked = await user.matchPassword(password)
      
      if(isPassChecked){
          const token = user.generateToken();
          // res.cookie('token', token, localCookieConfig);
          // res.cookie('token', token, productionCookieConfig);
          return res.status(200).json({ success: true, message: "You are logged In", token });
      }else{
          return res.status(401).json({error: 'Password does not match'});
      }
  }else{
      return res.status(404).json({error: 'Email Not Found!'});
  }
 
}

const getUsers = async (req, res) => {
  try{
    const users = await User_model.find();
    if(!users){
      return res.status(404).json({message: "No users found", success: false});
    }else{
      return res.status(200).json({users, message: "Users Fetched", success: true});
    }
  }catch(error) {

  }
}
module.exports = { registerUser, loginUser, getUsers };
