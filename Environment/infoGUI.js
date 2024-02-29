import { AdvancedDynamicTexture } from "@babylonjs/gui";

const handleCloseButton = (infoAdvancedTexture) => {
  infoAdvancedTexture.dispose();
};
export async function infoGUI(scene) {
  let infoAdvancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "GUI",
    true,
    scene
  );

  // Load the GUI from the snippet asynchronously
  try {
    await infoAdvancedTexture.parseFromSnippetAsync("8RIKCR#10");
    console.log("INFOGUI loaded successfully");
  } catch (error) {
    console.error("Error loading GUI:", error);
  }

  // Get the buttons from the GUI
  let closeButton = infoAdvancedTexture.getControlByName("closeButton");

  // Add event handlers to the buttons
  closeButton.onPointerClickObservable.add(function () {
    handleCloseButton(infoAdvancedTexture);
  });

  // Return the advanced texture
  return infoAdvancedTexture;
}
