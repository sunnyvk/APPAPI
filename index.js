const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());



var cors = require('cors')
app.use(cors())

// define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: String,
        required: true
      }
      });
  const User = mongoose.model('User', userSchema);
  
  // define the API endpoint for user registration
  app.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword, mobileNumber } = req.body;
  
    // check if required fields are missing
    if (!name || !email || !password || !confirmPassword || !mobileNumber) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }
  
    // check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    // check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
  
    // create a new user object
    const newUser = new User({
      name,
      email,
      password,
      mobileNumber
    });
  
    // save the new user to the database
    try {
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to register user' });
    }
  });

// // define the API endpoint for user login
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     // app.post('/login', (req, res) => {
//     //     // Insert Login Code Here
//     //     let username = req.body.username;
//     //     let password = req.body.password;
//     //     res.send(`Username: ${username} Password: ${password}`);
//     //   });
//     // check if required fields are missing
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please provide email and password' });
//     }
  
//     // check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
  
//     // check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
  
//     // create a JSON Web Token for authentication
//     const token = jwt.sign({ id: user._id }, 'secret-key');
  
//     // return the token to the client
//     res.json({ token });
//   });



  app.post("/login", async(req, res)=> {
    const { email, password} = req.body


    const user= await User.findOne({ email: email})
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successful"})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }

    })

    app.get('/register',async(req,res)=>{
        try{
            const  user= await  User.find({});
            res.status(200).json( user);
        }catch(error){
            res.status(5009).json({message:error.message})
        }
    })
















mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:Sunny2798@sunnyapi.kndypoa.mongodb.net/appapi?retryWrites=true&w=majority')
        .then(() => {
            console.log('connected to MongoDB')
            app.listen(4000, () => {
                console.log('Node api is running on port 4000')
            })
        }).catch((error) => {
            console.log(error)
        })