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
  const lane = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 30,
    height: 0.5,
    depth: 170
  })
  lane.position.y = 0.25
  lane.position.z = 15

  const laneMat = new BABYLON.StandardMaterial();
  laneMat.diffuseTexture = new BABYLON.Texture("Images/bowling_floor.jpg");
  lane.material = laneMat;


  const laneLeft = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 1,
    height: 5,
    depth: 170
  })
  laneLeft.position.x = -15.5
  laneLeft.position.y = 0.25;
  laneLeft.position.z = 15;

  const laneRight = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 1,
    height: 5,
    depth: 170
  })
  laneRight.position.x = 15.5
  laneRight.position.y = 0.25;
  laneRight.position.z = 15;
}


const createEnvironment = () => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 200,
  });
  const groundMat = new BABYLON.StandardMaterial('ground-mat');
  groundMat.diffuseTexture = new BABYLON.Texture('images/floor.jpg');
  ground.material = groundMat;
  
  const leftWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  leftWall.position.x = -50;
  leftWall.position.y = 25;
  leftWall.rotation.y = -Math.PI / 2;

  const leftWallMat = new BABYLON.StandardMaterial();
  leftWallMat.diffuseTexture = new BABYLON.Texture("Images/Sidewalls2.jpg");
  leftWallMat.diffuseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  leftWallMat.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;

  leftWallMat.diffuseTexture.uScale = 2;
  leftWallMat.diffuseTexture.vScale = 2;

  leftWall.material = leftWallMat;






  const rightWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  rightWall.position.x = 50;
  rightWall.position.y = 25;
  rightWall.rotation.y = Math.PI / 2;

//Wall right behind the pins(left as a black screen)
  const backWall1 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 10,
    width: 30,
  });
  backWall1.position.y = 5;
  backWall1.position.z = 100;

//Wall where the texture has to be applied
  const backWall2 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 40,
    width: 100,
  });
  backWall2.position.y = 30;
  backWall2.position.z = 100;
  
//Walls on sides of backWall1(No texture needed only color)
  const backWall3 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 10,
    width: 40,
  });
  backWall3.position.x = -30
  backWall3.position.y = 5;
  backWall3.position.z = 100;

  const backWall4 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 10,
    width: 40,
  });
  backWall4.position.x = 30
  backWall4.position.y = 5;
  backWall4.position.z = 100;
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
