import * as BABYLON  from "@babylonjs/core"

export const createBowlingLane = () => {
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
  
    
    



    const creatingPhysicsAggregate = (Mesh) => {
      return new BABYLON.PhysicsAggregate(Mesh, BABYLON.PhysicsShapeType.BOX, { mass: 0 });
    };

    const laneAggregate=creatingPhysicsAggregate(lane);
    const laneLeftAggregate=creatingPhysicsAggregate(laneLeft);
    const laneRightAggregate=creatingPhysicsAggregate(laneRight);
  
    return lane;
  };