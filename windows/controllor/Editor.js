"use strict";
/**
 * Create by guchenghao
 * 编辑器的主窗体，也是应用程序主要工作窗口
 */
const {
	BrowserWindow
} = require("electron");
const Common = require("../../common");


class EditorWindow {
	constructor() {

		this.netWork = 0;
		this.mode = Common.MODE_TXT;
		this.createWindow();
	}

	createWindow() {

		this.editorWindow = new BrowserWindow({
			width: 800,
			height: 600,
			resizable: true,
			title: "Sakura",
			icon: "../../assets/icon.icns",
			titleBarStyle: "default",
			// frame: false,
			webPreferences: {
				webSecurity: false
			}
		});

		//如果是调试模式，打开开发者工具
		if (Common.DEBUG_MODE) {
			this.editorWindow.webContents.openDevTools();
		}


	}

	show() {
		this.editorWindow.show();
	}


	loadURL(url) {
		this.editorWindow.loadURL(url);
	}
}



module.exports = EditorWindow;
