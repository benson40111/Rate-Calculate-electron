const request = require('request')
const cheerio = require('cheerio')
const send = require('./send')

let refresh_btn = document.getElementById('refresh-btn')
let transport_btn = document.getElementById('transport-btn') 
let quit_btn = document.getElementById('quit-btn')
let data
let date = new Date()

refresh_btn.addEventListener('click', () =>{ crawl_coin() })
transport_btn.addEventListener('click', () =>{ calc_rate() })
quit_btn.addEventListener('click', () => { app_quit() })

const crawl_coin = () =>{
	request({
		url: 'http://rate.bot.com.tw/xrt?Lang=zh-TW',
		method: 'GET'
	}, (error, response, body) => {
		let $ = cheerio.load(body)
		data = $('tbody tr').eq(7).children('.rate-content-cash').eq(0).text()
		document.getElementById('current-rate').innerHTML = data
		send.notify(data)
	})
}

const calc_rate = () =>{
	let twd = document.getElementById('TWD').value
	document.getElementById('transport-rate').innerHTML = twd / data
}

const checkDate = () =>{ if (date.getHours() == 9) crawl_coin() }
checkDate()
