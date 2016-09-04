// full page drop zone
var dropZone = document.getElementById("dropZone"),
    inputFile = document.getElementById("openProject");

// disable dropZone on aborting action or dropping a file
function disableDropZone() {
  dropZone.style.visibility = 'hidden';
  dropZone.className = '';
  inputFile.style.top = '-100px';
  inputFile.style.left = '-100px';
}
document.addEventListener("mouseout", disableDropZone, true);
dropZone.addEventListener("drop", disableDropZone, true);

document.addEventListener("dragover", function (e) {
  dropZone.style.visibility = 'visible';
}, true);

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
  e.stopPropagation();
  // display dropZone
  dropZone.clasName = 'drag';
  // make input[type='file'] follow the mouse cursor
  inputFile.style.top = (e.pageY - 10) + 'px';
  inputFile.style.left = (e.pageX - 100) + 'px';
}, true);
