/**
 * USER ROUTES
 *   Register -
 *      POST -> /api/user/register
 *   Login -
 *      POST -> /api/user/login
 *   GET -> /api/user
 *   PATCH -> /api/user/update
 *   DELETE -> /api/user/delete
 */

const router = require("express").Router();
const multerUploads = require('../utils/config/multer');

const { registerUser, loginUser, getUsers } = require("../controller/user_controller");


router.get('/', getUsers);
router.post('/register', multerUploads.single('profilePicture'), registerUser);
router.post('/login', loginUser);




module.exports = router;