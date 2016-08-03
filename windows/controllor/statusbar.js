function gotoLine(n) {
	aceEditor.goToLine(n);
}


function getLines() {
  var lineNum = document.getElementById("Cnum");
  lineNum.innerHTML = aceEditor.getLength();
}
