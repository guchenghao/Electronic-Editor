"use strict";

const {
	remote
} = require("electron");
const fs = require("fs");
const Common = require("../../common");
const Codeditor = require("./codeditor");
const Menu = remote.Menu;
const dialog = remote.dialog;
const app = remote.app;
const BrowserWindow = remote.BrowserWindow;
const path = require("path");



var template = [
	{
		label: "File",
		submenu: [
			{
				label: "New Window",
				accelerator: "CmdOrCtrl+shift+N",
				click: function () {
					var windows = new BrowserWindow({
						width: 800,
						height: 600,
						resizable: true,
						title: "Sakura",
						titleBarStyle: "default",
						webPreferences: {
							webSecurity: false
						}
					});
					windows.loadURL("file://" + path.resolve(__dirname,"../view/Editor.html"));
				}
			},
			{
				label: "Open File...",
				accelerator: "CmdOrCtrl+O",
				click: function () {
					dialog.showOpenDialog({
						filters: [
							{
								name: 'javascript',
								extensions: ['js']
							},
							{
								name: 'markdown',
								extensions: ['md']
							},
							{
								name: "css",
								extensions: ["css"]
							},
							{
								name: "html",
								extensions: ["html"]
							}
            ]
					}, function (fileNames) {
						if (fileNames === undefined) {
							return;
						}
						var fileName = fileNames[0];
						fs.readFile(fileName, 'utf-8', function (err, data) {
							document.getElementById("textEditor")
								.value = data;
						});
					});
				}
			},
			{
				label: "Save File...",
				accelerator: "CmdOrCtrl+S",
				click: function () {

					const code = document.getElementById("CodeEditor")
						.value;

					dialog.showSaveDialog({
						filters: [
							{
								name: 'javascript',
								extensions: ['js']
							},
							{
								name: 'markdown',
								extensions: ['md']
							}
            ]
					}, function (fileName) {
						if (fileName === undefined) {
							return;
						}


						fs.writeFile(fileName, code, function (err) {
							if (err) {
								console.log(err);
							}

							dialog.showMessageBox({
								message: "The Codefile has been saved!^_^",
								buttons: ["OK"]
							});
						});


					});

				}
			}
		]
}, {
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo'
      },
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo'
      },
			{
				type: 'separator'
      },
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut'
      },
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
      },
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
      },
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectall'
      }
    ]
}, {
		label: 'View',
		submenu: [
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function (item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.reload();
					}
				}
      },
			{
				label: 'Toggle Full Screen',
				accelerator: (function () {
					if (process.platform == 'darwin') {
						return 'Ctrl+Command+F';
					} else {
						return 'F11';
					}
				})(),
				click: function (item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				}
      },
			{
				label: 'Toggle Developer Tools',
				accelerator: (function () {
					if (process.platform == 'darwin') {
						return 'Alt+Command+I';
					} else {
						return 'Ctrl+Shift+I';
					}
				})(),
				click: function (item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.toggleDevTools();
					}
				}
      }
    ]
}, {
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
      },
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
      }
    ]
}, {
		label: 'Help',
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click: function () {
					require('electron')
						.shell.openExternal("https://github.com/guchenghao/Electronic-Editor");
				}
      },
			{
				label: "Author",
				click: function () {
					var authorWindow = new BrowserWindow({
						width: 1000,
						height: 800,
						resizable: true,
						title: "guchenghao",
						// frame: false,
						titleBarStyle: "hidden-inset",
						webPreferences: {
							webSecurity: false
						}
					});

					authorWindow.loadURL("file://" + path.resolve(__dirname,"../view/author.html"));

				}
			}
    ]
}
];

/*

if (Common.EDITOR_MODE === "Code") {
	template.splice(5, 0, {
		label: "Sel&Find",
		submenu: [
			{
				label: "go to a line",
				accelerator: "CmdOrCtrl+G"
					// click:
			},
			{
				label: "find and replace",
				accelerator: "CmdOrCtrl+F"
			}
		]
	});
}

*/
if (process.platform == 'darwin') {
	var name = require('electron')
		.remote.app.getName();
	template.unshift({
		label: name,
		submenu: [
			{
				label: 'About ' + name,
				role: 'about'
      },
			{
				type: 'separator'
      },
			{
				label: 'Services',
				role: 'services',
				submenu: []
      },
			{
				label: "preference..",
				accelerator: "Cmd+,"
			},
			{
				type: 'separator'
      },
			{
				label: 'Hide ' + name,
				accelerator: 'Command+H',
				role: 'hide'
      },
			{
				label: 'Hide Others',
				accelerator: 'Command+Alt+H',
				role: 'hideothers'
      },
			{
				label: 'Show All',
				role: 'unhide'
      },
			{
				type: 'separator'
      },
			{
				label: 'Quit',
				accelerator: 'Cmd+Q',
				click: function () {
					app.quit();
				}
      }
    ]
	});
	// Window menu.
	template[4].submenu.push({
		type: 'separator'
	}, {
		label: 'Bring All to Front',
		role: 'front'
	});
}

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
