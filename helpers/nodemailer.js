const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "angelservice.cs@gmail.com",
        pass: "sandisandi"
    }
});

const sendEmail = (toEmail, data)=>{
    const mailOptions = {
        from: "angelservice.cs@gmail.com",
        to: toEmail, 
        subject: 'Success to create todo',
        html: `
        <p>You have successfully created a todo with the following data :</p>
        <table>
            <tr><td>Title</td><td>: ${data.title}</td></tr>
            <tr><td>Title</td><td>: ${data.description}</td></tr>
            <tr><td>Title</td><td>: ${data.due_date}</td></tr>
        </table>
        `
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log(response);
        }
    });
}

module.exports = sendEmail