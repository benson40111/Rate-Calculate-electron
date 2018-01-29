const nodemailer = require('nodemailer')
const path = require('path')

let data

const notify = (data_in) =>{
	data = data_in
	let myNotification = new Notification('日幣匯率', {
		body: '當前日幣匯率為：' + data,
		icon: path.join(__dirname, '../static/icon.icns')
	})

	myNotification.onclick = () =>{
		console.log('click OK')
	}
}

const send = (data_in) => {
	data = data_in
	nodemailer.createTestAccount((err) => {
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: 'benson40111@gmail.com',
				pass: 'egajqpcdayzaxtpm'
			}
		})

		let mailOptions = {
			from: '"Test" <benson40111@gmail.com>',
			to: 'B10417018@yuntech.org.tw',
			subject: 'Hello',
			text: `JPY rate is ${data} now`,
		}

		transporter.sendMail(mailOptions, (error) => {
			if (error) console.log(error)
		})
	})
}

exports.notify = notify
exports.send = send


