import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,1,0))

  const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 10, 0))
  cameraz


  return scene;
};




const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
})
