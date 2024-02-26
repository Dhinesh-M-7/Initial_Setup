import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas);

const createScene = async function () {
  const scene = new BABYLON.Scene(engine);

  // scene.createDefaultLight();
  // //const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0,5,-10), scene)
  // const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene)
  // camera.attachControl(true);
  // camera.setPosition(new BABYLON.Vector3(0, 0, -20));

  // camera.lowerBetaLimit = Math.PI / 4;
  // camera.upperBetaLimit = Math.PI / 2;

  //scene.createDefaultCameraOrLight(true, false, true);
  //scene.createDefaultCamera();
  // const box = new BABYLON.MeshBuilder.CreateBox('myBox',{
  //   width: 0.5,
  //   height: 0.5,
  //   depth:0.5,
  //   faceColors: [
  //     new BABYLON.Color4(1,0,0,1),
  //     new BABYLON.Color4(0,1,0,1),
  //     new BABYLON.Color4(0,0,1,1),
  //     new BABYLON.Color4(1,0,0,1),
  //     new BABYLON.Color4(0,1,0,1),
  //     new BABYLON.Color4(0,0,1,1)
  //   ]
  // });

  // const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {
  //   segments: 50,
  //   diameter:0.3,
  //   //diameterY: 0.4
  // }, scene);

  // const sphereMaterial = new BABYLON.StandardMaterial();
  // sphere.material = sphereMaterial;

  

  //sphereMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
  // sphereMaterial.specularColor = new BABYLON.Color3(1, 0, 0)

  // sphereMaterial.ambientColor = new BABYLON.Color3(0, 1, 1)
  // scene.ambientColor = new BABYLON.Color3(0, 1, 1)

  //sphereMaterial.emissiveColor = new BABYLON.Color3(0,1,0)
  // const ground = new BABYLON.MeshBuilder.CreateGround('myGround',{
  //   height: 1,
  //   width: 1,
  //   subdivisions: 30
  // });

  // ground.material = new BABYLON.StandardMaterial();
  // ground.material.wireframe = true;

  //sphereMaterial.alpha = 0.3
  //sphereMaterial.wireframe = true;

  // const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap('','/Images/heightmap.png',{
  //   height: 3,
  //   width: 3,
  //   subdivisions: 100,
  //   maxHeight:0.5
  // });
  // groundFromHM.material = new BABYLON.StandardMaterial();
  // groundFromHM.material.wireframe = true;

  // const fontData = await(await fetch('/Fonts/Roboto_Regular.json')).json()
  // const text =  new BABYLON.MeshBuilder.CreateText('', 'Dhinesh',fontData,{
  //   size: 1,
  //   depth: 0.1,
  // })

  //scene.createDefaultCameraOrLight(true, false, true);

  scene.createDefaultLight();
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);


  // const sphere = new BABYLON.MeshBuilder.CreateSphere('mySphere', {
  //   diameter: 2,
  // }, scene)

  // const sphereMaterial = new BABYLON.StandardMaterial();
  // sphere.material = sphereMaterial;

  // sphereMaterial.diffuseColor = new BABYLON.Color3(1,0,0)

  const box = new BABYLON.MeshBuilder.CreateBox();

  box.rotation.y = Math.PI / 4;

  // const sound = new BABYLON.Sound("sound", "sounds/cellolong.wav", scene, null, {
  //   loop:true,
  //   autoplay:true
  // })
  

  const ground = new BABYLON.MeshBuilder.CreateGround('myGround', {
    height: 10,
    width: 10,
  }, scene);

  ground.position.y = -0.5;

  const groundMaterial = new BABYLON.StandardMaterial();
  ground.material =  groundMaterial;

  groundMaterial.diffuseColor = new BABYLON.Color3(0.688,0.294,0)

  

  return scene;
};

const scene = await createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
})
