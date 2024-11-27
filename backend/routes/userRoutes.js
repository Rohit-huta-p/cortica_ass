/**
 * USER ROUTES
 * register - 
 *      POST -> /api/user/register
 *      GET -> /api/users
 *      PATCH -> /api/user/update
 *      DELETE -> /api/user/delete
 */

const router = require("express").Router();
const multerUploads = require('../utils/config/multer');

const { registerUser } = require("../controller/user_controller");

router.post('/register', multerUploads.single('profilePicture', registerUser))



module.exports = router;