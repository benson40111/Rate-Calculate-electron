const request = require('request')
const cheerio = require('cheerio')
const send = require('./send')
const { ipcRenderer } = require('electron')

let refresh_btn = document.getElementById('refresh-btn')
let transport_btn = document.getElementById('transport-btn') 
let quit_btn = document.getElementById('quit-btn')
let data
let date = new Date()

refresh_btn.addEventListener('click', () =>{ crawl_coin() })
transport_btn.addEventListener('click', () =>{ calc_rate() })
quit_btn.addEventListener('click', () => { quit_app() })

const crawl_coin = () =>{
	request({
		url: 'http://rate.bot.com.tw/xrt?Lang=zh-TW',
		method: 'GET'
	}, (error, response, body) => {
		let $ = cheerio.load(body)
		data = $('tbody tr').eq(7).children('.rate-content-cash').eq(0).text()
		document.getElementById('current-rate').innerHTML = data
		send.notify(data)
		send.send(data)
	})
}

const calc_rate = () =>{
	let money = document.getElementById('money').value

	if (data) {
		if (document.getElementById('to_TWD').checked) {
			document.getElementById('transport-rate').innerHTML = money * data
			document.getElementById('money-type').innerHTML = '臺幣'
		}
		if (document.getElementById('to_JPY').checked) {
			document.getElementById('transport-rate').innerHTML = money / data
			document.getElementById('money-type').innerHTML = '日幣'
		}
	}

	else {
		document.getElementById('transport-rate').innerHTML = 'Input Error!'
	}
}

const quit_app = () =>{ ipcRenderer.send('quit-app') }

const checkDate = () =>{ if (date.getHours() == 8) crawl_coin() }
setInterval(() => { checkDate() }, 60 * 1000 * 30)

