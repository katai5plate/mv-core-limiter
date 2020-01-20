import * as fs from "fs";
const [title, form, ok, cancel] = [
  document.getElementById("title") as HTMLInputElement,
  document.getElementById("form") as HTMLInputElement,
  document.getElementById("ok") as HTMLButtonElement,
  document.getElementById("cancel") as HTMLButtonElement
];

enum Scene {
  error = -1,
  findPath = 0,
  ready,
  convert,
  done
}

let currentScene = Scene.findPath;

const process = () => {
  switch (currentScene) {
    case Scene.findPath:
      title.innerText = "プロジェクトのパスを入力してください";
      form.value = "";
      ok.innerText = "決定";
      cancel.hidden = true;
      ok.onclick = () => {
        currentScene = Scene.ready;
        process();
      };
      return;
    case Scene.ready:
      title.innerText = "バックアップは取りましたか？";
      form.value = "";
      ok.innerText = "開始します";
      cancel.hidden = false;
      cancel.innerText = "やっぱりやめます";
      ok.onclick = () => {
        currentScene = Scene.convert;
        process();
      };
      return;
    default:
      return;
  }
};

process();
