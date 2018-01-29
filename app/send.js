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

exports.notify = notify


