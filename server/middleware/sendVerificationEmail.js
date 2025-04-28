import nodemailer from 'nodemailer';
// aepp wozw hgna woyc
// lemocream@gmail.com
export const sendVerificationEmail = (token, email, name) => {
	const html = `
    <html>
    <body>
    <h3>Dear ${name},</h3>
    <p>Thanks for signing up at Tech Lines</p>
    <p>Use the link below to verify the email</p>
    <a href="http://localhost:3000/email-verify/${token}">Click here</a>
    </body>
    </html>
    `;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'lemocream@gmail.com',
			pass: 'aepp wozw hgna woyc',
		},
	});

	const mailOptions = {
		from: 'lemocream@gmail.com',
		to: email,
		subject: 'Verify your email address',
		html: html,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent to ' + email);
			console.log(info.response);
		}
	});
};
