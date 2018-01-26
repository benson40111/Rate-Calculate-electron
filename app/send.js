const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'B10417018@yuntech.org.tw',
		pass: 'lkk54321i'
	}
})

let data

const send = () =>{
	let mailOptions = {
		from: '"Test" <B10417018@yuntech.edu.tw>',
		to: 'benson40111@gmail.com',
		subject: '該買日幣啦', 
		text: '日幣匯率為' + data 
	}
	transporter.sendMail(mailOptions, (error, info) =>{
		if (error)
			return console.log(error)
		else {
			console.log(`Message sent: ${info.response}`)
		}
	})
}

const notify = (data_in) =>{
	data = data_in
	let myNotification = new Notification('日幣匯率', {
		body: '當前日幣匯率為：' + data
	})

	myNotification.onclick = () =>{
		console.log('click OK')
	}
}

exports.send = send
exports.notify = notify


