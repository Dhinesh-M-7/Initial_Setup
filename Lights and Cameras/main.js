import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,0,0));


  const box = new BABYLON.MeshBuilder.CreateBox();

  const camera = new BABYLON.ArcRotateCamera("camera", Math.PI, Math.PI, 15, new BABYLON.Vector3(0,0,0));
  camera.position.z = -1
  camera.attachControl(canvas, true);

  box.actionManager = new BABYLON.ActionManager();

  box.actionManager.registerAction(
    new BABYLON.SetValueAction(
      BABYLON.ActionManager.OnPickDownTrigger,
      box,
      "scaling",
      new BABYLON.Vector3(2,2,2),
    )
  ).then(
    new BABYLON.SetValueAction(
      BABYLON.ActionManager.NothingTrigger,
      box,
      "scaling",
      new BABYLON.Vector3(1,1,1)
    )
  )

  scene.actionManager = new BABYLON.ActionManager();
  scene.actionManager.registerAction(
    new BABYLON.IncrementValueAction(
      BABYLON.ActionManager.OnEveryFrameTrigger,
      box,
      "rotation.x",
      0.01
    )
  )

  return scene;
};




const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
})
