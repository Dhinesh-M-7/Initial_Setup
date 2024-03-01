import * as BABYLON from "@babylonjs/core";

//defining the position of main lane and side lanes
const position = [
  new BABYLON.Vector3(0, 0.25, 15),
  new BABYLON.Vector3(-15.5, 0.25, 15),
  new BABYLON.Vector3(15.5, 0.25, 15),
];

//bowling lane creation

export const createBowlingLane = () => {
  //main lane creation and physics
  const lane = BABYLON.MeshBuilder.CreateBox("lane", {
    width: 30,
    height: 0.5,
    depth: 170,
  });
  lane.position = position[0];
  const laneMat = new BABYLON.StandardMaterial("lane-material");
  laneMat.diffuseTexture = new BABYLON.Texture("Images/Neon-bowling-floor.jpg");
  lane.material = laneMat;

  const laneAggregate = new BABYLON.PhysicsAggregate(
    lane,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0 }
  );


  //creating side lanes
  const laneLeft = BABYLON.MeshBuilder.CreateBox("sideLane", {
    width: 1,
    height: 5,
    depth: 170,
  });

  laneLeft.position = position[1];

  const laneLeftMat = new BABYLON.StandardMaterial("lane-material");
  laneLeftMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  laneLeft.material = laneLeftMat;

  const laneRight = BABYLON.MeshBuilder.CreateBox("sideLane", {
    width: 1,
    height: 5,
    depth: 170,
  });

  laneRight.position = position[2];

  const laneRightMat = new BABYLON.StandardMaterial("lane-material");
  laneRightMat.diffuseTexture = new BABYLON.Texture("Images/Neon-floor.jpg");
  laneRight.material = laneRightMat;

  return lane;
};
