import * as BABYLON from "@babylonjs/core"
import { GUI3DManager } from "@babylonjs/gui/3D/gui3DManager";
import { Button3D } from "@babylonjs/gui";
import { TextBlock } from "@babylonjs/gui";



const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = () => {
    var scene = new BABYLON.Scene(engine);
    //var donut =new BABYLON.MeshBuilder.CreateSphere("donut", scene);
    var anchor = new BABYLON.AbstractMesh("anchor", scene);

    scene.createDefaultCameraOrLight(true, false, true);

    // Create the 3D UI manager
    var manager = new GUI3DManager(scene);

    // Let's add a button
    var button = new Button3D("reset");
    manager.addControl(button);
    button.linkToTransformNode(anchor);
    button.position.x = -3.5;


    
    var text1 = new TextBlock();
    text1.text = "reset";
    text1.color = "white";
    text1.fontSize = 24;
    button.content = text1;

  

  return scene;
};




const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
})
