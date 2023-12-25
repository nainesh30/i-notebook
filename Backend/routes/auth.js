const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');

const JWT_secret = "NaineshLovestoSolveCube"
//ROUTE 1
//Create a user using post "/api/auth/createuser" doesnt require auth
//yaha pe post req bheji bcoz get se url me data ajata hai 
router.post('/createuser', [

    // Express validator to valid fields here only
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),

], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });

    }
    try {
        const salt = await bcrypt.genSalt(10);
        SecPass = await bcrypt.hash(req.body.password, salt);
        //Create user if validation is passed 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: SecPass

        })

        //usig id bcoz id is indexed in DB there retrivng is fast
        const data = {
            user: {
                id: user.id
            }
        }

        //Generating auth token using sign method using jwt secreassign above
        //sending auth token as json 
        //futher use this auth token for login
        const authtoken = jwt.sign(data, JWT_secret);
        res.json({ authtoken })


    } catch (error) {
        console.error(error);
        res.status(500).send("Some Error occured")
    }

})

//ROUTE 2
//Authenticate a user "/api/auth/login" (NO LOGIN REQUIRED)
router.post('/login', [

    // Express validator to valid fields here only
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists({ min: 5 }),

], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });

    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Enter Correct Credentials" })
        }

        const passcompare = await bcrypt.compare(password, user.password);
        if (!passcompare) {
            return res.status(400).json({ error: "Enter Correct Credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        res.json({ authtoken })
    } catch (error) {
        console.error(error);
        res.status(500).send(" Internal Server Error occured")
    }
})


//ROUTE 3
// Get logged in user details using
// post :  /api/auth/getuser.     (LOGIN REQUIRED)

router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")// .select se sabkuch select hoga  - passwords
        res.send(user)

    } catch (error) {
        console.error(error);
        res.status(500).send(" Internal Server Error occured")
    }
})
module.exports = router