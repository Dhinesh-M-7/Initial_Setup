import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.UniversalCamera(
    "camera",
    new BABYLON.Vector3(0, 3, -30)
  );

  const light1 = new BABYLON.DirectionalLight(
    "light1",
    new BABYLON.Vector3(0, -1, 0)
  );
  const light2 = new BABYLON.HemisphericLight(
    "light2",
    new BABYLON.Vector3(0, 1, -1)
  );
  light1.intensity = 0.25;
  light2.intensity = 0.5;

  createGround();
  createHouse();

  const door = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 2,
    height: 4,
    depth: 0.1,
  });
  const hinge = new BABYLON.MeshBuilder.CreateBox("hinge");
  hinge.isVisible = false;
  door.parent = hinge;
  hinge.position.y = 2;
  door.position.x = -1;

  const frameRate = 10;

  const rotate = new BABYLON.Animation(
    "rotate",
    "rotation.y",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  const rotate_keys = [];

  rotate_keys.push({
    frame: 0,
    value: 0,
  });
  rotate_keys.push({
    frame: 9 * frameRate,
    value: 0,
  });
  rotate_keys.push({
    frame: 14 * frameRate,
    value: Math.PI,
  });
  rotate.setKeys(rotate_keys);

  const movein = new BABYLON.Animation(
    "movein",
    "position",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  const movein_keys = [];

  movein_keys.push({
    frame: 0,
    value: new BABYLON.Vector3(0, 5, -30),
  });

  movein_keys.push({
    frame: 3 * frameRate,
    value: new BABYLON.Vector3(0, 2, -10),
  });

  movein_keys.push({
    frame: 5 * frameRate,
    value: new BABYLON.Vector3(0, 2, -10),
  });

  movein_keys.push({
    frame: 8 * frameRate,
    value: new BABYLON.Vector3(-2, 2, 3),
  });

  movein.setKeys(movein_keys);

  const sweep = new BABYLON.Animation(
    "sweep",
    "rotation.y",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  const sweep_keys = [];

  sweep_keys.push({
    frame: 0,
    value: 0,
  });

  sweep_keys.push({
    frame: 3 * frameRate,
    value: 0,
  });

  sweep_keys.push({
    frame: 5 * frameRate,
    value: Math.PI / 3,
  });

  sweep_keys.push({
    frame: 13 * frameRate,
    value: Math.PI / 3,
  });

  sweep_keys.push({
    frame: 15 * frameRate,
    value: 0,
  });

  sweep.setKeys(sweep_keys);

  scene.beginDirectAnimation(
    camera,
    [movein, rotate],
    0,
    25 * frameRate,
    false
  );
  scene.beginDirectAnimation(hinge, [sweep], 0, 25 * frameRate, false);

  return scene;
};

const createGround = () => {
  const ground = new BABYLON.MeshBuilder.CreateGround("ground", {
    width: 50,
    height: 50,
  });
  const groundMat = new BABYLON.StandardMaterial();
  groundMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
  ground.material = groundMat;
};

const createHouse = () => {
  const wall1 = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 8,
    height: 6,
    depth: 0.1,
  });
  wall1.position.x = -6;
  wall1.position.y = 3;

  const wall2 = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 4,
    height: 6,
    depth: 0.1,
  });
  wall2.position.x = 2;
  wall2.position.y = 3;

  const wall3 = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 2,
    height: 2,
    depth: 0.1,
  });
  wall3.position.x = -1;
  wall3.position.y = 5;

  const wall4 = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 14,
    height: 6,
    depth: 0.1,
  });
  wall4.position.x = -3;
  wall4.position.y = 3;
  wall4.position.z = 7;

  const wall5 = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 7,
    height: 6,
    depth: 0.1,
  });
  wall5.position.x = -10;
  wall5.position.y = 3;
  wall5.position.z = 3.5;
  wall5.rotation.y = Math.PI / 2;

  const wall6 = new BABYLON.MeshBuilder.CreateBox("door", {
    width: 7,
    height: 6,
    depth: 0.1,
  });
  wall6.position.x = 4;
  wall6.position.y = 3;
  wall6.position.z = 3.5;
  wall6.rotation.y = Math.PI / 2;

  const roof = new BABYLON.MeshBuilder.CreateCylinder("roof", {
    tessellation: 3,
    diameter: 9,
    height: 15,
  });
  roof.position.x = -3;
  roof.position.y = 8;
  roof.position.z = 3.5;
  roof.rotation.z = Math.PI / 2;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
