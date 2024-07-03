import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/formdata',  async (req, res)=>{
    const {name, email, message} = req.body;

    let transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const html = `
        <h1>New Email</h1>
        <h3>message from: ${name}</h3>
        <h3>email: ${email}</h3>
        <p>${message}</p>
    `

    let mailOptions = {
        from : `PortfolioWebSite <${email}>`,
        to: process.env.EMAIL,
        subject: 'New Message from',
        html:html
    }
    
    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({"message":"email sent successfully"});
    } catch (err) {
        console.log("error has occured");
        res.status(404).json({"message":"something went wrong"});
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`)
})

