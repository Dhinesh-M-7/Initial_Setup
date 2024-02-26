import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

async function  createScene(){
  const scene = new BABYLON.Scene(engine);

  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);


  const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10));
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
  light.intensity = 0.7;

  const sphere = new BABYLON.MeshBuilder.CreateSphere("sphere", {
    diameter: 2,
    segments: 32
  });

  sphere.position.y = 4;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10
  })

  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), havokPlugin);

  const sphereAggregate = new BABYLON.PhysicsAggregate(sphere, BABYLON.PhysicsShapeType.SPHERE, {
    mass: 1,
    restitution: 0.75
  });

  const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, {mass: 0});

  return scene;
};




createScene().then((scene) => {
  engine.runRenderLoop(function() {
    if(scene) {
      scene.render();
    }
  })
})
window.addEventListener('resize', function(){
  engine.resize();
})
