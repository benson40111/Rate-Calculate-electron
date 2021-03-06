const { electron, app, Tray, BrowserWindow, powerSaveBlocker, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
require('electron-reload')(__dirname)

const iconDirectory = path.join(__dirname, 'static')
let id = powerSaveBlocker.start('prevent-app-suspension')
let mainWindow = undefined
let tray = undefined
let clickBool = false

app.on('ready', () =>{
	createWindow()
	createTray()

	global.app = app
})

const createWindow = () =>{
	//This function just for osx
	app.dock.hide()

	mainWindow = new BrowserWindow({
		width: 400, 
		height: 170,
		show: false,
		frame: false,
		resizable: false,
	})

	mainWindow.loadURL(`file://${__dirname}/app/index.html`)
	mainWindow.on('closed', function () {
		mainWindow = null
	})
	mainWindow.on('blur', () =>{
		mainWindow.hide()
	})
}

const createTray = () =>{
	tray = new Tray(path.join(iconDirectory, 'logo.png'))

	tray.on('right-click', () =>{ toggleWindow() })
	tray.on('double-click', () =>{ toggleWindow() })
	tray.on('click', () =>{ toggleWindow() })
}

const toggleWindow = () =>{
	if (clickBool) {
		mainWindow.hide()
		clickBool = false
	}
	else {
		showWindow()
		clickBool = true
	}
}

const showWindow = () =>{
	const position = getPosition()
	mainWindow.setPosition(position.x, position.y)
	mainWindow.show()
	mainWindow.focus()
	mainWindow.openDevTools({ mode: 'detach' })
}

//This function is copy from https://github.com/kevinsawicki/tray-example
const getPosition = () =>{
	const windowBounds = mainWindow.getBounds()
	const trayBounds = tray.getBounds()
	const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
	const y = Math.round(trayBounds.y + trayBounds.height + 4)
	return {x: x, y: y}
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		powerSaveBlocker.stop(id)
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})

ipcMain.on('quit-app', () => {
	tray.destroy()
	app.quit()
})
