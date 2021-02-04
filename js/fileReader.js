let takein = document.getElementById("select-files");

function readJSON(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = function () {
      resolve(fr.result);
    };
    fr.readAsText(file);
  });
}

export function returnJSON() {
  takein.click();
  return new Promise((resolve, reject) => {
    takein.addEventListener("change", () => {
      var files = document.getElementById("select-files").files;
      console.log(files);
      if (files.length <= 0) {
        reject;
      }
      readJSON(files[0]).then((result) => {
        resolve(JSON.parse(result));
      });
    });
  });
}
