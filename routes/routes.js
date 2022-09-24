const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken: process.env.PASSWORD
    }
});


router.get("/", (req, res) => {
    res.status(200).render("../index.html");
});


router.get("/home", (req, res) => {
    res.status(200).render("../index.html");
});


router.post("/contact", (req, res) => {
    message = {
        from: `${req.body.email}`,
        to: "amankhanak063@gmail.com",
        subject: `Portfolio Message From - ${req.body.name}`,
        text: `Message : ${req.body.message} \nfrom : ${req.body.email}`
    };

    // Sending the Mail
    transport.sendMail(message, (err, info) => {
        if (err) {
            console.log("Failed to send Message.");
        }
    });

    res.status(200).redirect("/");
});


module.exports = router;