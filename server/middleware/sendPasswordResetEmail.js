import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = (token, email, name) => {
	const html = `
    <html>
    <body>
    <h3>Dear ${name},</h3>
    <p>Please click on the link below to reset your password</p>
    <a href="http://localhost:3000/password-reset/${token}">Click here</a>
    </body>
    </html>
    `;

	const transportert = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'lemocream@gmail.com',
			pass: 'aepp wozw hgna woyc',
		},
	});

	const mailOptions = {
		from: 'lemocream@gmail.com',
		to: email,
		subject: 'Tech lines: Reset your password request',
		html: html,
	};

	transportert.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent to ' + email);
			console.log(info.response);
		}
	});
};
