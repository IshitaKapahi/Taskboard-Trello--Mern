const express = require('express');
const { loginController, registerController, userVerification } = require('../controllers/authController')


//router object
const router = express.Router()

//routing

//REGISTER || METHOD  POST
router.post('/auth/register', registerController)

//LOGIN || METHOD POST
router.post('/auth/login', loginController)

//USER VERIFICATION || METHOD POST
router.post('/auth', userVerification)




module.exports = router;