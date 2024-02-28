
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import {startMenuGUI} from "./startMenuGUI";
import { rollCollisionHandler } from "./Game_Logic/gameCollisionHandler";
import { StartNewGame } from "./Game_Logic/newGameDataStructure";
import { circleOfConfusionPixelShader } from "@babylonjs/core/Shaders/circleOfConfusion.fragment";


const canvas = document.getElementById("renderCanvas");
export let engine = new BABYLON.Engine(canvas);
export let scene; 
async function createScene() {
  scene = new BABYLON.Scene(engine);
  
 
  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
 
  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 30, -110)
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(true);
  camera.inputs.clear();
 
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, -10)
  );
  light.intensity = 0.7;
  light.lightmapMode = BABYLON.Light.FALLOFF_PHYSICAL;
 
  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);
 
  const bowlingPinResult = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_pin.glb"
  );

  const bowlingBallResult = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_ball.glb"
  );


  const aim = createAim();
  aim.isVisible = false;
  let [bowling_ball, bowlingAggregate] = createBowlingBall(bowlingBallResult);
  aim.parent = bowling_ball;

  createEnvironment();
  const lane = createBowlingLane();

  const bowlingPin = bowlingPinResult.meshes[1];
  bowlingPin.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
  bowlingPin.isVisible = false;

  const originalPinPositions = [
    new BABYLON.Vector3(-10, 0.5, 98),
    new BABYLON.Vector3(-4, 0.5, 98),
    new BABYLON.Vector3(4, 0.5, 98),
    new BABYLON.Vector3(10, 0.5, 98),

    new BABYLON.Vector3(0, 0.5, 94),
    new BABYLON.Vector3(-7, 0.5, 94),
    new BABYLON.Vector3(7, 0.5, 94),

    new BABYLON.Vector3(-3.5, 0.5, 90),
    new BABYLON.Vector3(3.5, 0.5, 90),

    new BABYLON.Vector3(0, 0.5, 86),
  ];


  const pinPositions = [
    new BABYLON.Vector3(-10, 0.5, 98),
    new BABYLON.Vector3(-4, 0.5, 98),
    new BABYLON.Vector3(4, 0.5, 98),
    new BABYLON.Vector3(10, 0.5, 98),

    new BABYLON.Vector3(0, 0.5, 94),
    new BABYLON.Vector3(-7, 0.5, 94),
    new BABYLON.Vector3(7, 0.5, 94),

    new BABYLON.Vector3(-3.5, 0.5, 90),
    new BABYLON.Vector3(3.5, 0.5, 90),

    new BABYLON.Vector3(0, 0.5, 86),
  ];

  let setPins = pinPositions.map(function (position, idx) {
    const pin = new BABYLON.InstancedMesh("pin-" + idx, bowlingPin);
    pin.position = position;
    const pinAggregate = new BABYLON.PhysicsAggregate(
      pin,
      BABYLON.PhysicsShapeType.CONVEX_HULL,
      { mass: 1, restitution: 0.1, friction: 1.6 },
      scene
    );
    return pin;
  });

  let startingPoint;
  let currentMesh;

  const getLanePosition = () => {
      const pickinfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => { return mesh == lane; });
      if (pickinfo.hit) {
          return pickinfo.pickedPoint;
      }
      return null;
  }

  const pointerDown = (mesh) => {
      currentMesh = mesh;
      aim.isVisible = true;
      startingPoint = getLanePosition();
      if (startingPoint) { // we need to disconnect camera from canvas
          setTimeout(() => {
              camera.detachControl(canvas);
          }, 0);
      }
  }

  const pointerUp = (bowlingBallResult, bowlingPinResult) => {
      aim.isVisible = false;
      const bowlingBallPosition = bowling_ball.absolutePosition;
      if (startingPoint) {
        const ballSpeed= (-(bowlingBallPosition.z)-6)*10;
        if(bowlingBallPosition.z < -63)
          bowlingAggregate.body.applyImpulse(new BABYLON.Vector3(-(aim.rotation.y)*550 , 0, ballSpeed), bowling_ball.getAbsolutePosition());
        camera.attachControl(canvas, true);
        startingPoint = null;
        setTimeout(() => {
          setPins = setPins.map((pin, pinIndex) => {
            pin.position = originalPinPositions[pinIndex];
            pin.rotation = new BABYLON.Vector3(0, 0, 0);
            return pin;
          });
          bowlingAggregate.body.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
          bowlingAggregate.body.setAngularVelocity(new BABYLON.Vector3(0, 0, 0));
          bowling_ball.rotation = new BABYLON.Vector3(0, 0, 0);
          bowling_ball.position = new BABYLON.Vector3(0, 4, -62);
          // viewPositionSetPins(setPins);
        }, 3000);
        return;
      }
  }
  const viewPositionSetPins = (setPins) => {
    setPins.forEach((pin) => {
      console.log(pin.id, pin.position);
    })
  }
  const pointerMove = () => {
      if (!startingPoint) {
          return;
      }
      const current = getLanePosition();
      if (!current) {
          return;
      }

      let aimAngle = (current.x)*0.1;

      if(aimAngle > 0.15)
        aimAngle = 0.15;
      else if(aimAngle < -0.15)
        aimAngle = -0.15;

      aim.rotation.y = aimAngle;

      const diff = current.subtract(startingPoint);
      diff.x = 0;

      // Define the limits for z movement
      const minZ = -67;  // Minimum z value
      const maxZ = -62;  // Maximum z value

      const newZ = currentMesh.position.z + diff.z;

      // Check if the new position exceeds the limits
      if (newZ < minZ) {
          diff.z = minZ - currentMesh.position.z;
      } else if (newZ > maxZ) {
          diff.z = maxZ - currentMesh.position.z;
      }

      currentMesh.position.addInPlace(diff);

      startingPoint = current;

  }

  scene.onPointerObservable.add((pointerInfo) => {      		
      switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh == bowling_ball) {
          pointerDown(pointerInfo.pickInfo.pickedMesh)
        }
        break;
      case BABYLON.PointerEventTypes.POINTERUP:
        pointerUp();
          break;
      case BABYLON.PointerEventTypes.POINTERMOVE:          
        pointerMove();
          break;
      }
  });

  // // Create a new instance of StartGame with generalPins -- need gui to be added
  // const game = new StartGame(setPins, scene);

  //createAnimations(camera, scene);
  return scene;
}

const createBowlingBall = (bowlingBallResult) => {
  const bowling_ball = bowlingBallResult.meshes[1];
  bowling_ball.scaling = new BABYLON.Vector3(1, 1, 1);
  bowling_ball.position.y = 4;
  bowling_ball.position.z = -62;

  const bowling_aggregator = new BABYLON.PhysicsAggregate(
    bowling_ball,
    BABYLON.PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.45, friction: 0.75}, scene
  )
  bowling_aggregator.body.disablePreStep = false;
  console.log(bowling_aggregator);
  return [bowling_ball, bowling_aggregator];
};

const createAim = () => {
  const projection = BABYLON.MeshBuilder.CreateBox("projection", {height: 0.1, width: 1, depth: 80});
  projection.position.z = 42;
  const pbrMaterial = new BABYLON.PBRMaterial("pbrMaterial", scene);
  pbrMaterial.albedoColor = new BABYLON.Color3(1, 1, 1); 
  // Set other PBR properties
  pbrMaterial.metallic = 0.5; // Low metallicness
  pbrMaterial.roughness = 0.3; // Low roughness
  pbrMaterial.alpha = 0.1;

  const arrow = BABYLON.MeshBuilder.CreateCylinder("sphere", {height: 0.1, diameter: 7, tessellation: 3}); //{height: 0.01, diameter: 0, diameterTop: 1, diameterBottom: 1, tessellation: 3}
  arrow.rotation.y = -Math.PI / 2;
  arrow.position.z = 85;

  arrow.material = pbrMaterial;

  const Aim = BABYLON.Mesh.MergeMeshes([arrow, projection]);

  Aim.position.y = 0.4;
  Aim.position = new BABYLON.Vector3(0,0,0);
  return Aim;
}

const createBowlingPins = (bowlingPinResult) => {
  const bowlingPin = bowlingPinResult.meshes[1];
  bowlingPin.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
  bowlingPin.isVisible = false;
 
  const pinPositions = [
    new BABYLON.Vector3(-10, 0.5, 98),
    new BABYLON.Vector3(-4, 0.5, 98),
    new BABYLON.Vector3(4, 0.5, 98),
    new BABYLON.Vector3(10, 0.5, 98),
 
    new BABYLON.Vector3(0, 0.5, 94),
    new BABYLON.Vector3(-7, 0.5, 94),
    new BABYLON.Vector3(7, 0.5, 94),
 
    new BABYLON.Vector3(-3.5, 0.5, 90),
    new BABYLON.Vector3(3.5, 0.5, 90),
 
    new BABYLON.Vector3(0, 0.5, 86),
  ];
 
  const setPins = pinPositions.map(function (position, idx) {
    const pin = new BABYLON.InstancedMesh("pin-" + idx, bowlingPin);
    pin.position = position;
    const pinAggregate = new BABYLON.PhysicsAggregate(pin, BABYLON.PhysicsShapeType.CONVEX_HULL, { mass: 1, restitution: 0.1,friction:1.6 }, scene);
    pinAggregate.body.setCollisionCallbackEnabled(true);
    return pin;
  });
  return setPins;
}

const createBowlingLane = () => {
  const lane = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 30,
    height: 0.5,
    depth: 170,
  });
  lane.position.y = 0.25;
  lane.position.z = 15;
 
  const laneMat = new BABYLON.StandardMaterial("lane-material");
  laneMat.diffuseTexture = new BABYLON.Texture("Images/Neon-bowling-floor.jpg");
  lane.material = laneMat;
 
  const laneLeft = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 1,
    height: 5,
    depth: 170
  });
 
 
  laneLeft.position.x = -15.5;
  laneLeft.position.y = 0.25;
  laneLeft.position.z = 15;
 
  const laneLeftMat = new BABYLON.StandardMaterial("lane-material");
  laneLeftMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  laneLeft.material = laneLeftMat;
 
  const laneRight = BABYLON.MeshBuilder.CreateBox("cube", {
    width: 1,
    height: 5,
    depth: 170,
  });
  laneRight.position.x = 15.5;
  laneRight.position.y = 0.25;
  laneRight.position.z = 15;
 
  const laneRightMat = new BABYLON.StandardMaterial("lane-material");
  laneRightMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  laneRight.material = laneRightMat;

  const laneAggregate = new BABYLON.PhysicsAggregate(
    lane,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0 }
  );
  const laneLeftAggregate = new BABYLON.PhysicsAggregate(
    laneLeft,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0 }
  );
  const laneRightAggregate = new BABYLON.PhysicsAggregate(
    laneRight,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0 }
  );

  return lane;
};
 
const createEnvironment = () => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 100,
    height: 200,
  });
  const groundMat = new BABYLON.StandardMaterial("ground-mat");
  groundMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  ground.material = groundMat;
 
  const leftWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  leftWall.position.x = -50;
  leftWall.position.y = 25;
  leftWall.rotation.y = -Math.PI / 2;
  const leftWallMat = new BABYLON.StandardMaterial("back-wall-material");
  leftWallMat.diffuseTexture = new BABYLON.Texture("Images/Neon-sidewall.jpg");
  leftWall.material = leftWallMat;
 
  const rightWall = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 50,
    width: 200,
  });
  rightWall.position.x = 50;
  rightWall.position.y = 25;
  rightWall.rotation.y = Math.PI / 2;
  const rightWallMat = new BABYLON.StandardMaterial("back-wall-material");
  rightWallMat.diffuseTexture = new BABYLON.Texture("Images/Neon-sidewall.jpg");
  rightWall.material = rightWallMat;
 
  //Wall right behind the pins(left as a black screen)
  const backWall1 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 15,
    width: 30,
  });
  backWall1.position.y = 7.5;
  backWall1.position.z = 100;
  const backWall1Mat = new BABYLON.StandardMaterial();
  backWall1Mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  backWall1.material = backWall1Mat;
 
  //Wall where the texture has to be applied
  const backWall2 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 35,
    width: 100,
  });
  backWall2.position.y = 32.5;
  backWall2.position.z = 100;
  const backWall2Mat = new BABYLON.StandardMaterial();
  backWall2Mat.diffuseTexture = new BABYLON.Texture("Images/Backwall.jpg");
  backWall2.material = backWall2Mat;
 
  //Walls on sides of backWall1(No texture needed only color)
  const backWall3 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 15,
    width: 35,
  });
  backWall3.position.x = -32.5;
  backWall3.position.y = 7.5;
  backWall3.position.z = 100;
  const backWall3Mat = new BABYLON.StandardMaterial();
  backWall3Mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  backWall3.material = backWall3Mat;
 
  const backWall4 = new BABYLON.MeshBuilder.CreatePlane("plane", {
    height: 15,
    width: 35,
  });
  backWall4.position.x = 32.5;
  backWall4.position.y = 7.5;
  backWall4.position.z = 100;
  const backWall4Mat = new BABYLON.StandardMaterial();
  backWall4Mat.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
  backWall4.material = backWall4Mat;
};
 
const createAnimations = (camera, scene, game) => {
  const frameRate = 60;
 
  const movement = new BABYLON.Animation(
    "movement",
    "position",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    true
  );
  const movement_keys = [];
 
  movement_keys.push({
    frame: 0,
    value: new BABYLON.Vector3(0, 20, -120),
  });
 
  movement_keys.push({
    frame: 1 * frameRate,
    value: new BABYLON.Vector3(0, 10, -100),
  });
 
  movement_keys.push({
    frame: 5 * frameRate,
    value: new BABYLON.Vector3(0, 10, 60),
  });
 
  movement_keys.push({
    frame: 6 * frameRate,
    value: new BABYLON.Vector3(0, 30, 50),
  });
 
  movement_keys.push({
    frame: 13 * frameRate,
    value: new BABYLON.Vector3(0, 30, -100),
  });
 
  movement_keys.push({
    frame: 14 * frameRate,
    value: new BABYLON.Vector3(0, 30, -110),
  });
 
  movement.setKeys(movement_keys);
 
  const rotation = new BABYLON.Animation(
    "rotate",
    "rotation.y",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    true
  );
  const rotate_keys = [];
 
  rotate_keys.push({
    frame: 0,
    value: 0,
  });
  rotate_keys.push({
    frame: 5 * frameRate,
    value: 0,
  });
  rotate_keys.push({
    frame: 9 * frameRate,
    value: Math.PI,
  });
  rotate_keys.push({
    frame: 13 * frameRate,
    value: 2 * Math.PI,
  });
 
  rotation.setKeys(rotate_keys);
  scene.beginDirectAnimation(
    camera,
    [movement, rotation],
    0,
    14 * frameRate,
    false,
    1,
    () => {
      startMenuGUI(scene, game);
    }
  );
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
 