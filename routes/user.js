const router = require("express").Router();
//const User = require("../model/User.js");
const UserCred = require("../model/UserCred.js");
const UserDetail = require("../model/UserDetail.js");
const { registerValidation, loginValidation } = require("../validation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verify } = require("./verifytoken");
var fs = require("fs");
var path = require("path");
//multer image handling
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

//var upload =multer({dest:__dirname+'/uploads/'})

//Registration
router.post("/register", upload.single("profilePic"), async (req, res) => {
  //console.log(req.file);
  let reply = [];
  let obj = JSON.parse(req.body.data);
  //console.log(typeof obj);
  //console.log(obj);
  req.body = { ...req.body, ...obj };
  //console.log(req.body);
  // Let's validate the date before move further
  /* 
   //const validation = registerValidation(req.body);
    const { error } = registerValidation(req.body);
    //res.send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);
    */

  //Checking if the user is already in the database
  const emailExist = await UserCred.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //userCredential
  const userCred = new UserCred({
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await userCred.save();
    // res.send(savedUser);

    reply.push(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }

  //userDetail
  const userDetail = new UserDetail({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    dob: req.body.dob,
    phone: req.body.phone,
    yoe: req.body.yoe, //yearofexp
    profilePic: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
    qualificationDetails: req.body.qualificationDetails,
    skills: req.body.skills,
    workExperience: req.body.workExperience,
    projectDetails: req.body.projectDetails,
    certifications: req.body.certifications,
    awardsAndAchievement: req.body.awardsAndAchievement,
    others: req.body.others,
  });

  try {
    const savedUser = await userDetail.save();
    // res.send(savedUser);
    reply.push(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
  // res.send(reply);
  // res.render('page to be renderd afer registration');
  res.status(200).send("registerd successfully");
});

//Login
router.get("/login", (req, res) => {
  res.render("userSignIn.ejs");
});

router.post("/login", async (req, res) => {
  // Let's validate the date before move further
  //const validation = registerValidation(req.body);
  /* const { error } = loginValidation(req.body);
  //res.send(error.details[0].message);
  if (error) return res.status(400).send(error.details[0].message);
  */
  //Checking if the user is already in the database
  const user = await UserCred.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");
  //Password is Correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid password");
  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  //res.header('auth-token',token).send(`login success with token: ${token}`);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: process.env.TOKEN_AGE * 1000,
  });
  const userdetail = await UserDetail.findOne({ email: req.body.email });
  res.status(200).json({ user: user._id, userd: userdetail });

  //res.render('page to be rendered after login');
});

//logout
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logout successfully");
});

// Update user credentials
router.post("updateCred/:id", verify, (req, res) => {
  const { email, password } = req.body;
  let updatedParams = [];
  UserCred.findOne({ _id: req.params.id }, (doc) => {
    if (email) {
      doc.email = email;
      updatedParams.push("Email");
    }
    if (password) {
      doc.password = password;
      updatedParams.push("Password");
    }
    doc.save();
    res.send(updatedParams + " updated successfully.");
  });
  // let errors=[];
  // if (!name || !email || !password) {
  //     errors.push({ msg: 'Please fill in all fields' });
  // }
  //   //check pass length
  // if (password.length < 6) {
  //     errors.push({ msg: 'Password should be at least 6 characters' });
  // }
  // if (errors.length > 0) {
  //     res.status(400).send('error in updation. enter correct data');
  // }else{
  //     User.findOne({_id:req.params.id },(err,doc)=>{
  //         doc.name=name;
  //         doc.email=email;
  //         doc.password=password;
  //         doc.save();
  //     });
  // }
  // res.send('Successfully updated');
});

// Update user details
router.post("updateDetails/:id", verify, (req, res) => {
  let updatedParams = [];
  UserDetail.findOne({ _id: req.params.id }, (doc) => {
    if (req.body.email) {
      doc.email = req.body.email;
      updatedParams.push("Email");
    }
    if (req.body.firstName) {
      doc.firstName = req.body.firstName;
      updatedParams.push("firstName");
    }
    if (req.body.lastName) {
      doc.lastName = req.body.lastName;
      updatedParams.push("lastName");
    }
    if (req.body.gender) {
      doc.gender = req.body.gender;
      updatedParams.push("gender");
    }
    if (req.body.dob) {
      doc.dob = req.body.dob;
      updatedParams.push("dob");
    }
    if (req.body.phone) {
      doc.phone = req.body.phone;
      updatedParams.push("phone");
    }
    if (req.body.yoe) {
      doc.yoe = req.body.yoe;
      updatedParams.push("yoe");
    }
    if (req.body.profilePic) {
      doc.profilePic = req.body.profilePic;
      updatedParams.push("profilePic");
    }
    if (req.body.qualificationDetails) {
      doc.qualificationDetails = req.body.qualificationDetails;
      updatedParams.push("qualificationDetails");
    }
    if (req.body.skills) {
      doc.skills = req.body.skills;
      updatedParams.push("skills");
    }
    if (req.body.workExperience) {
      doc.workExperience = req.body.workExperience;
      updatedParams.push("workExperience");
    }
    if (req.body.projectDetails) {
      doc.projectDetails = req.body.projectDetails;
      updatedParams.push("projectDetails");
    }
    if (req.body.certifications) {
      doc.certifications = req.body.certifications;
      updatedParams.push("certifications");
    }
    if (req.body.lastName) {
      doc.lastName = req.body.lastName;
      updatedParams.push("lastName");
    }
    if (req.body.awardsAndAchievement) {
      doc.awardsAndAchievement = req.body.awardsAndAchievement;
      updatedParams.push("awardsAndAchievement");
    }
    if (req.body.others) {
      doc.others = req.body.others;
      updatedParams.push("others");
    }

    doc.save();
    res.send(updatedParams + " updated successfully.");
  });
});

module.exports = router;
