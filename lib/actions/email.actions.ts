"use server";

import nodemailer from "nodemailer"


export interface ContactFormProps {

        name: string;
        email: string;
        subject:string;
        message: string

  
}

const email = process.env.MAILADRESS
const password = process.env.MAILADRESS2




let transporter = nodemailer.createTransport({
  
    host: "smtp.office365.com",
    secure: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
      
    },
    auth: {
      user: email,
      pass: password,
    },
    debug: true,
    logger: true,
  });


  export async function submitEmail(values: ContactFormProps) {

    try {
        const mailOptions: Object = {
            from: email,
            to: email,
            subject: `New Website Message from ${values.name}`, 
            text: `${values.message} - Reply to the message on the email address ${values.email}`,
            html: `<h3>We recieved this message from the website</h3><br/><h1>${values.subject}</h1><br/><p>${values.message}</p><br/><p>The senders email adress is</p><br/><h4>${values.email}</h4>`
        }

        const info = await transporter.sendMail(mailOptions)


        if (info) {
            return { message: "Email sent successfully" };
        }
    }

    catch(error){
        console.log(error)
        return {message: "Error occured while sending email", error}
    }
  }