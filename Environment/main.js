import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

async function createScene() {
  const scene = new BABYLON.Scene(engine);

  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 10, -75)
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0)
  );
  light.intensity = 0.7;

  createEnvironment();

  createBowlingLane();

  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), havokPlugin);

  //const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, {mass: 0});

  return scene;
}



const createBowlingLane = () => {
  const lane = BABYLON.MeshBuilder.CreateGround("lane", {
    width: 25,
    height: 120
  })
  lane.position.y = 5
  lane.position.z = 40
}


const createEnvironment = () => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 200,
  });

  const leftWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  leftWall.position.x = -50;
  leftWall.position.y = 25;
  leftWall.rotation.y = -Math.PI / 2;

  const rightWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  rightWall.position.x = 50;
  rightWall.position.y = 25;
  rightWall.rotation.y = Math.PI / 2;

  const backWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 100,
  });
  backWall.position.y = 25;
  backWall.position.z = 100;
};

createScene().then((scene) => {
  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });
});
window.addEventListener("resize", function () {
  engine.resize();
});
