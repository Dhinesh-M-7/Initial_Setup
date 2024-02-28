/* import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { startMenuGUI } from "./startMenuGUI";


const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

async function createScene() {
  const scene = new BABYLON.Scene(engine);

  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 30, -110)
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, -10)
  );
  light.intensity = 0.7;
  light.lightmapMode = BABYLON.Light.FALLOFF_PHYSICAL;

  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);

  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_pin.glb"
  );

  createBowlingBall();
  createEnvironment();
  createBowlingLane();

  const bowlingPin = result.meshes[1];
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
    const pinAggregate = new BABYLON.PhysicsAggregate(
      pin,
      BABYLON.PhysicsShapeType.CONVEX_HULL,
      { mass: 1, restitution: 0.1, friction: 1.6 },
      scene
    );
    return pin;
  });
  
  const bowling_ball = createBowlingBall();
  // // Create a new instance of StartGame with generalPins -- need gui to be added
  // const game = new StartGame(setPins, scene);

  createAnimations(camera, scene);
  return scene;
}

const createBowlingBall = async () => {
  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_ball.glb"
  );
  const bowling_ball = result.meshes[1];
  bowling_ball.scaling = new BABYLON.Vector3(1, 1, 1);
  bowling_ball.position.y = 4;
  bowling_ball.position.z = -67;

  const bowling_ballAggregate = new BABYLON.PhysicsAggregate(
    bowling_ball,
    BABYLON.PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.45, friction: 0.75 }
  );

  //bowling_ballAggregate.body.applyImpulse(new BABYLON.Vector3(0, 0, 40), bowling_ball.getAbsolutePosition());
};

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
    depth: 170,
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

const createAnimations = (camera, scene) => {
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
      startMenuGUI(scene);
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


class StartGame {
  constructor(generalPins, scene) {
    this.frames = [];
    this.currentFrameIndex = 0;
    this.ballIsRolled = false;
    this.generalPins = generalPins;
    this.pinsArray = [];
    this.initializeFrames();
    this.intializePinsArray();
  }

  // Function to initialize frames
  initializeFrames() {
    for (let i = 0; i < 10; i++) {
      this.frames.push({ downPins: [], score: 0, bonus: null });
    }
  }
  intializePinsArray(){
    this.pinsArray = this.generalPins.map((pin, pinId) => {
      return {pinId: pinId, pinPosition: pin.position, isHit: false}
    });
  }
}
 */

import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
 
 
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);
 
async function createScene() {
  const scene = new BABYLON.Scene(engine);
 
 
  const havokInstance = await HavokPhysics();
  const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
 
  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 30, -110)
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(true);
 
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, -10)
  );
  light.intensity = 0.7;
  light.lightmapMode = BABYLON.Light.FALLOFF_PHYSICAL;
 
  scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), havokPlugin);
 
  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_pin.glb");
 
  const bowling_ball = createBowlingBall();
  createEnvironment();
  const lane = createBowlingLane();
  // createProjection();
 
 
  const bowlingPin = result.meshes[1];
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
 
  // // Create a new instance of StartGame with generalPins -- need gui to be added
  // const game = new StartGame(setPins, scene);
 
  //createAnimations(camera, scene);

  const game = new StartGame(setPins);
  havokPlugin.onCollisionEndedObservable.add((ev) => collisionHandler(ev, game));
  // console.log(game);
  return scene;
}
 
const createBowlingBall = async () => {
  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "Models/",
    "bowling_ball.glb"
  );
  const bowling_ball = result.meshes[1];
  console.log(bowling_ball);
  bowling_ball.scaling = new BABYLON.Vector3(1, 1, 1);
  bowling_ball.position.y = 4;
  bowling_ball.position.z = -67;
 
  const bowling_ballAggregate = new BABYLON.PhysicsAggregate(bowling_ball, BABYLON.PhysicsShapeType.SPHERE, { mass: 1, restitution: 0.45,friction:0.75 });
 
  bowling_ballAggregate.body.applyImpulse(new BABYLON.Vector3(1, 0, 40), bowling_ball.getAbsolutePosition());
  bowling_ballAggregate.body.setCollisionCallbackEnabled(true);
  return bowling_ball;
};
 
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
 
  const laneAggregate = new BABYLON.PhysicsAggregate(lane, BABYLON.PhysicsShapeType.BOX, { mass: 0 });
  const laneLeftAggregate = new BABYLON.PhysicsAggregate(laneLeft, BABYLON.PhysicsShapeType.BOX, { mass: 0 });
  const laneRightAggregate = new BABYLON.PhysicsAggregate(laneRight, BABYLON.PhysicsShapeType.BOX, { mass: 0});
  laneAggregate.body.setCollisionCallbackEnabled(false);
  laneLeftAggregate.body.setCollisionCallbackEnabled(false);
  laneRightAggregate.body.setCollisionCallbackEnabled(false);
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
 
 
const createAnimations = (camera, scene) => {
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
      startMenuGUI(scene);
    }
  );
};
 
class StartGame {
  constructor(generalPins) {
      this.frames = [];
      this.currentFrameIndex = 0;
      this.ballIsRolled = false;
      this.generalPins = generalPins;
      this.pinsArray = [];
      this.initializeFrames();
      this.initializePins();
  }
  initializeFrames() {
      for (let i = 0; i < 10; i++) {
      this.frames.push({ downPins: [], score: 0, bonus: null });
      }
  }
  initializePins(){
      this.pinsArray = this.generalPins.map((pin, pinId) => {
          console.log(pin.id);
          return {pinId: pin.id, pinPosition: pin.position, isHit: false}
      });
  }
}

const collisionHandler = (ev, game) => {
  const pin = ev.collidedAgainst.transformNode;
  if(pin.name == 'lane' || pin.name == 'bowlingBall' || pin.name == 'cube'){
      return;
  }
  const pinVpin = ev.collider.transformNode;
  if(pinVpin.name =='lane' || pinVpin.name == 'bowlingBall' || pinVpin == 'cube'){
      return;
  }
  // console.log(pin.name, pinVpin.name);
  // Find the index of the collided pins in pinsArray
  // console.log(pin, pin.id);
  const pinIndex = game.pinsArray.findIndex((it) => it.pinId === pin.id);
  const pinVpinIndex = game.pinsArray.findIndex((it) => it.pinId === pinVpin.id);

  // Update the isHit property directly without iterating over pinsArray
  if (pinIndex !== -1) {
      game.pinsArray[pinIndex].isHit = true;
  }
  if (pinVpinIndex !== -1) {
      game.pinsArray[pinVpinIndex].isHit = true;
  }
  console.log(pin.id, pinVpin.id, 'is hit and stored in ', pinIndex, pinVpinIndex);
  // console.log(pin.id===pinIndex, pinVpin===pinVpinIndex);
}

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
