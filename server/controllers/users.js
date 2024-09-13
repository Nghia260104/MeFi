import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import google from 'googleapis';
dotenv.config();

const OAuth2Client = new google.auth.OAuth2(
    process.env.SEND_MAIL_CLIENT_ID,
    process.env.SEND_MAIL_CLIENT_SECRET,
    process.env.SEND_MAIL_REDIRECT_URL
);

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await users.findOne({email});
        if (!existingUser){
            return res.status(404).json({message: 'User does not exist!'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid credentials!'});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET);
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const signUp = async (req, res) => {
    const {email, password, name, dob} = req.body;
    try {
        const existingUser = await users.findOne({email});
        if (existingUser){
            return res.status(404).json({message: 'User already existed'});
        }

        const salt = await bcrypt.genSaltSync();
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await users.create({email, password: hashedPassword, name, DateOfBirth: dob});

        const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET);
        res.status(200).json({user: result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

const generate6DigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendCode = async (req, res) => {
    const {email} = req.body;
    try {
        const User = await users.findOne({email});
        if (!User){
            return res.status(404).json({message: 'User does not exist!'});
        }

        const verificationCode = generate6DigitCode();
        const expiredMins = 10;
        const verificationCodeExpires = Date.now() + 1000 * 60 * expiredMins;

        User.verificationCode = verificationCode;
        User.verificationCodeExpires = verificationCodeExpires;
        await User.save();

        const accessToken = await OAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.SEND_MAIL_CLIENT_ID,
                clientSecret: process.env.SEND_MAIL_CLIENT_SECRET,
                refreshToken: process.env.SEND_MAIL_REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const message = {
            from: 'Memorii <' + process.env.EMAIL_USER + '>',
            to: User.email,
            subject: 'Verify gmail users',
            text: 'Your verification code for Memorii app is ${verificationCode}. This code will be expired after ${expiredMin} minutes',
        };
        await transporter.sendMail(message);
        res.status(200).json({user: User});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};

export const verify = async (req, res) => {
    const {email, verifiedCode} = req.body;
    try {
        const User = await users.findOne({email});
        if (!User){
            return res.status(404).json({message: 'User does not exist!'});
        }

        const generatedCode = User.verificationCode;
        let verified = false;
        if (generatedCode === verifiedCode){
            verified = true;
        }

        res.status(200).json({user: User, verified});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};
