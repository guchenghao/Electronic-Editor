"use strict";

const {
	app
	//icpMain
} = require("electron");


const EditorWindow = require("./windows/controllor/Editor");


app.setName("Electronic Editor");

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

class ElectronicEditor {
	constructor() {
		//constructor
		this.editorWindow = null;
	}

	init() {
		this.initApp();
		// this.initIPC();
	}

	initApp() {
		app.on("ready", () => {
			this.createEditorWindow();

			this.editorWindow.loadURL(`file://${__dirname}/windows/view/Editor.html`);

			// console.log(`file://${__dirname}/windows/view/Editor.html`);
		});



		// This is another place to handle events after all windows are closed
		app.on('will-quit', function () {

			this.editorWindow = null;
		});




	}

	// initIPC() {
	//
	// }


	createEditorWindow() {
		this.editorWindow = new EditorWindow();
	}
}

new ElectronicEditor()
	.init();
