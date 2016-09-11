"use strict";

function gotoLine(n) {
	aceEditor.goToLine(n);
}



function change() {

	setMode();
	setTheme();
	setFontSize();

}

//计算当前代码文件的行数
function getCodeLine() {
	var codeLines = document.getElementById("cnum");
	var rowNum = ace.edit("CodeEditor")
		.session.getLength();

	codeLines.value = rowNum;
}





function setTheme() {
	//修改编辑器的样式
	var selectTheme = document.getElementById("theme");
	var indexTheme = selectTheme.selectedIndex;
	// var text = selectTheme.options[indexLang].text;
	var valueTheme = selectTheme.options[indexTheme].value;

	aceEditor.changeTheme(valueTheme);
	ace.edit("CodeEditor")
		.setTheme(Common.EDITOR_THEME);
}


function setMode() {
	var aText = document.getElementById("lang");
	var mdView = $("#preview");
	var codeditor = $("#CodeEditor");

	//修改编辑器的语言模式
	var selectLang = document.getElementById("language");
	var indexLang = selectLang.selectedIndex;
	// var text = selectLang.options[indexLang].text;
	var valueLang = selectLang.options[indexLang].value;


	aText.innerHTML = valueLang;

	aceEditor.changeLang(valueLang);
	ace.edit("CodeEditor")
		.getSession()
		.setMode(Common.LANGUAGE_MODE);

  //实现一个实时预览的markdown编辑器
	if (Common.LANGUAGE_MODE === "ace/mode/markdown") {

		mdView.addClass("pull-right");
		codeditor.addClass("pull-left");
		codeditor.css('width', '49.5%');
		mdView.css('display', 'block');
		mdView.css('width', '50%');
		mdView.css('height', '100%');

		$("#CodeEditor")
			.keyup(function () {
				$("#preview")
					.html(marked(ace.edit("CodeEditor")
						.getValue()));
			});
	}

}


function setFontSize() {
	//设置编辑器的字体
	var selectSize = document.getElementById("fontSize");
	var indexSize = selectSize.selectedIndex;
	// var text = selectTheme.options[indexLang].text;
	var valueSize = selectSize.options[indexSize].value;

	Common.FONT_SIZE = valueSize;

	document.getElementById("CodeEditor")
		.style.fontSize = Common.FONT_SIZE;

}
