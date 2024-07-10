const express = require('express');
const {registerUser,authUser} = require('../controllers/userControllers');
const router = express.Router();

router.route('/').post(registerUser);
router.post('/login',authUser)

// router.get('/check', (req, res) => {
//     res.send('server is running...');
//   });

module.exports = router;