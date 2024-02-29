import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { scoreboardDisplay } from "./renderScoreBoard";
import { scoreboardValueDisplay } from "./renderScoreBoard";
import { infoGUI } from "./infoGUI";

// import { StartNewGame } from "./Game_Logic/newGameDataStructure";
const handleStartGame = (advancedTexture) => {
  advancedTexture.dispose();
  scoreboardDisplay.isVisible = true;
  scoreboardValueDisplay.isVisible = true;
};

const handleExitGame = (advancedTexture) => {
  window.close();
};

const handleInfo = (scene) => {
  infoGUI(scene);
};

export async function startMenuGUI(scene) {
  // Create the advanced texture
  let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "GUI",
    true,
    scene
  );

  // Load the GUI from the snippet asynchronously
  try {
    await advancedTexture.parseFromSnippetAsync("#7Q01P8#12");
    console.log("GUI loaded successfully");
  } catch (error) {
    console.error("Error loading GUI:", error);
  }

  // Get the buttons from the GUI
  let startGameButton = advancedTexture.getControlByName("startButton");
  let exitGameButton = advancedTexture.getControlByName("exitButton");
  let infoButton = advancedTexture.getControlByName("InfoButton");

  // Add event handlers to the buttons
  startGameButton.onPointerClickObservable.add(function () {
    handleStartGame(advancedTexture);
  });

  exitGameButton.onPointerClickObservable.add(function () {
    handleExitGame(advancedTexture);
  });

  infoButton.onPointerClickObservable.add(function () {
    handleInfo(scene);
  });

  // Return the advanced texture
  return advancedTexture;
}
