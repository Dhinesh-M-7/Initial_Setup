import * as BABYLON from "@babylonjs/core"
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import { startMenuGUI } from "./startMenuGUI";

//handling the close button click
const handleCloseButton = (informationPlane, buttonPlane, scene, game) => {
    informationPlane.dispose();
    buttonPlane.dispose();
    startMenuGUI(scene, game)
};

export function infoGUI(scene, game) {
    //creating a plane for displaying the rules and regulations
    const informationPlane = new BABYLON.MeshBuilder.CreatePlane("infoPlane",{
        height: 10,
        width:20
    });
    informationPlane.position = new BABYLON.Vector3(0, 22, -75)

    const informationPlaneMat = new BABYLON.StandardMaterial();
    informationPlaneMat.diffuseTexture = new BABYLON.Texture("Images/Info.jpg");
    informationPlane.material = informationPlaneMat;

    //creating a gui plane for placing the close button
    const buttonPlane = new BABYLON.MeshBuilder.CreatePlane("buttonPlane",{
        height: 1,
        width:3
    });
    buttonPlane.position = new BABYLON.Vector3(0, 16, -75)
    buttonPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(buttonPlane);

    const closeButton = Button.CreateSimpleButton("close-button", "CLOSE");
    closeButton.width = 3;
    closeButton.height = 1;
    closeButton.color = "white";
    closeButton.fontSize = 250;
    closeButton.background = "red";
    closeButton.thickness = 2
    closeButton.onPointerUpObservable.add(function() {
        handleCloseButton(informationPlane, buttonPlane, scene, game);
    });
    advancedTexture.addControl(closeButton);
}
