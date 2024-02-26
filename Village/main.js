import * as BABYLON from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,5,-10))
  camera.attachControl(canvas);
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(0.1,0.1,0.1);

  camera.minZ = 0.3;
  camera.speed = 0.1;
  camera.angularSensibility = 4000




  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0))
  light.intensity = 1.5


  const framesPerSecond = 60;
  const gravity = -9.81;
  scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0);
  scene.collisionsEnabled = true;

  const ground = buildGround();
  ground.checkCollisions = true

  const houses = buildAllHouses();

  houses.map((house) => {
    house.checkCollisions = true;
  })

  const sound = new BABYLON.Sound("sound", "", scene, null, {
    autoplay:true,
    loop:true
  })


  scene.onKeyboardObservable.add((kbInfo) => {
    switch(kbInfo.type){
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        if(kbInfo.event.key == 'S' || kbInfo.event.key == 's'){
          scene.activeCamera.useAutoRotationBehavior = false;
          console.log('Stopped the rotation')
        }
        if(kbInfo.event.key == 'R' || kbInfo.event.key == 'r'){
          scene.activeCamera.useAutoRotationBehavior = true;
          console.log('Started the rotation')
        }
        break;
    }
  })

  // const shadowGenerator = new BABYLON.ShadowGenerator(1024,light);
  // shadowGenerator.addShadowCaster(houses[0]);
  // ground.receiveShadows = true

  return scene;
};



const buildGround = () => {
  const ground = new BABYLON.MeshBuilder.CreateGround("ground", {
    height: 20,
    width: 20,
  });

  const groundMaterial = new BABYLON.StandardMaterial("groundMat");
  ground.material =  groundMaterial;
  groundMaterial.diffuseColor = new BABYLON.Color3(0,1,0);

  return ground;
}


const buildBox = (width) => {
  const boxMaterial = new BABYLON.StandardMaterial("boxMat");
  const faceUV = [];
  if(width == 2){
    boxMaterial.diffuseTexture = new BABYLON.Texture('Images/semihouse.png');

    faceUV[0] = new BABYLON.Vector4(0.6, 0, 1, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 0.4, 1);
    faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1);
    faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1);
  }else{
    boxMaterial.diffuseTexture = new BABYLON.Texture('Images/cubehouse.png');

    faceUV[0] = new BABYLON.Vector4(0.5, 0, 0.75, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 0.25, 1);
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1);
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1, 1);
  }

  const box = new BABYLON.MeshBuilder.CreateBox("box", {
    width: width,
    faceUV: faceUV,
    wrap: true
  })

  box.position.y = 0.5;
  box.material = boxMaterial;
  return box;
}


const buildRoof = (width) => {
  const roofMaterial = new BABYLON.StandardMaterial("roofMat");
  roofMaterial.diffuseTexture = new BABYLON.Texture('Images/roof.jpg');

  const roof = new BABYLON.MeshBuilder.CreateCylinder("roof",{
    diameter: 1.3,
    height: 1.2,
    tessellation: 3
  })
  roof.material = roofMaterial;
  roof.position.y = 1.22
  roof.scaling.x = 0.75
  roof.scaling.y = width
  roof.rotation.z =  Math.PI / 2

  return roof;
}


const buildHouse = (width) => {
  const box = buildBox(width);
  const roof = buildRoof(width);

  return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}



const buildAllHouses = () => {
  const small_house = buildHouse(1);
  small_house.rotation.y = 11*Math.PI /  12
  small_house.position.x = -4
  small_house.position.z = -3.5


  const large_house = buildHouse(2);
  large_house.rotation.y = 11*Math.PI / 12
  large_house.position.x =  -6.3
  large_house.position.z = -4

  const places = [];
  places.push([2, 11*Math.PI /12, -6.3, -4])
  places.push([1, 11*Math.PI / 12, -4, -3.5])
  places.push([2, 11*Math.PI /12, -1.8, -3])
  places.push([1, -2*Math.PI / 3, 0.5, -4])
  places.push([2, -2*Math.PI / 3, 1.7, -6.2])
  places.push([2, -Math.PI / 12, -6.3, 0])
  places.push([2, -Math.PI / 12, -3.4, 0.8])
  places.push([1, -Math.PI / 12, -1.2, 1.5])
  places.push([2, -Math.PI / 3, 0.4, 3.4])
  places.push([2, -Math.PI / 3, 1.8, 6])
  places.push([2, Math.PI / 3, 5.5, -6.2])
  places.push([1, Math.PI / 3, 4.4, -4.2])
  places.push([2, Math.PI / 3, 3.2, -2])
  places.push([2, 2*Math.PI / 3, 3.2, 1])
  places.push([2, 2*Math.PI / 3, 4.6, 3.4])
  places.push([2, 2*Math.PI / 3, 6, 5.8])



  const houses =  [];
  for(let i = 0; i < places.length; i++){


    if(places[i][0] == 1){
      houses[i] = small_house.createInstance("house"+i)
    }
    else{
      houses[i] = large_house.createInstance("house"+i)
    }
    houses[i].rotation.y = places[i][1];
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }

  return houses;
}


const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function(){
  engine.resize();
})
