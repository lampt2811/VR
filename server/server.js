const cors = require("cors");
const bcrypt = require("bcryptjs");
const express = require("express");
const nodemailer = require("nodemailer");
const { userCollection } = require("./mongo");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/myaccount", async (req, res) => {
  try {
    const email = req.body.cookieVal;
    const check = await userCollection.findOne({ email: email });
    res.json(check.name);
  } catch (error) {
    res.json("fail");
  }
});

app.post("/sendEmail", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.OTP;

    const check = await userCollection.findOne({ email: email });

    if (check) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lamtestnodemailer@gmail.com",
          pass: "kgnuiudabebmvtzl",
        },
      });

      const mailOptions = {
        from: "lamtestnodemaile@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `The code to create a new password for the demo Ecommerce website is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json("fail");
        } else {
          res.json("pass");
        }
      });
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/resetPassword", async (req, res) => {
  const cookieVal = req.body.cookieVal;
  const password = req.body.password;
  try {
    const newPass = password;
    await userCollection.updateOne(
      { email: cookieVal },
      { $set: { password: newPass } }
    );
    res.json("pass");
  } catch (e) {
    res.json("fail");
  }
});

app.post("/login", async (req, res) => {
  const form = req.body.form;
  try {
    const check = await userCollection.findOne({ email: form.email });
    if (check) {
      check.password == form.password
        ? res.json("loginPass")
        : res.json("loginFail");
    } else {
      res.json("nouser");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/register", async (req, res) => {
  const form = req.body.form;
  const data = {
    name: form.name,
    email: form.email,
    password: form.password,
  };
  try {
    const check = await userCollection.findOne({ email: form.email });
    if (check) {
      res.json("exists");
    } else {
      res.json("notexist");
      await userCollection.insertMany(data);
    }
  } catch (e) {
    res.json("failed");
  }
});

app.listen(PORT, () => {
  console.log("port connected");
});
