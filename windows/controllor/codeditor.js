"use strict";

const editor = ace.edit("CodeEditor");
const Common = require("../../common");



class AceEditor {
	constructor() {


	}

	static create() {
		ace.require("ace/ext/language_tools");


		ace.config.loadModule("ace/ext/keybinding_menu", function (module) {
			module.init(editor);
		});

		editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true,
			autoScrollEditorIntoView: false
		});

		var StatusBar = ace.require("ace/ext/statusbar")
			.StatusBar;
		// create a simple selection status indicator
		var statusBar = new StatusBar(editor, document.getElementById("pos"));

		editor.setTheme(Common.EDITOR_THEME);
		editor.getSession()
			.setMode(Common.LANGUAGE_MODE);

		editor.session.getTextRange(editor.getSelectionRange());
		editor.getSession()
			.setUseSoftTabs(true);
		editor.getSession()
			.setTabSize(2);
		editor.getSession()
			.setUseWrapMode(true);
		editor.setHighlightActiveLine(true);

	}


	static changeTheme(theme) {
		if (theme === "tomorrow_night") {
			Common.EDITOR_THEME = "ace/theme/tomorrow_night";
		}

		if (theme === "tomorrow") {
			Common.EDITOR_THEME = "ace/theme/tomorrow";
		}
	}

	static changeLang(lang) {
		if (lang === "javascript") {
			return;
		}

		if (lang === "html") {
			Common.LANGUAGE_MODE = "ace/mode/html";
		}

		if (lang === "css") {
			Common.LANGUAGE_MODE = "ace/mode/css";
		}

		if (lang === "markdown") {
			Common.LANGUAGE_MODE = "ace/mode/markdown";
		}
	}

	static getLength() {
		return editor.session.getLength();
	}



	static goToLine(Num) {
		editor.gotoLine(Num);
	}


}




module.exports = AceEditor;
