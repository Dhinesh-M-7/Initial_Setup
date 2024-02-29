import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { scoreboardDisplay } from "./renderScoreBoard";
import { scoreboardValueDisplay } from "./renderScoreBoard";

// import { StartNewGame } from "./Game_Logic/newGameDataStructure";
const handleStartGame = (advancedTexture, game) => {
  advancedTexture.dispose();
  scoreboardDisplay.isVisible = true;
  scoreboardValueDisplay.isVisible = true;
  game.initializeFrames();
  game.initializePins();
  console.log(game);
};

// const handleExitGame = (advancedTexture) => {
//   // advancedTexture.dispose();
//   scoreboardValueDisplay.updateText(10);
// };

export async function startMenuGUI(scene, game) {
  // Create the advanced texture
  let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "GUI",
    true,
    scene
  );

  // Load the GUI from the snippet asynchronously
  try {
    await advancedTexture.parseFromSnippetAsync("#7Q01P8#10");
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
    handleStartGame(advancedTexture, game);
  });

  exitGameButton.onPointerClickObservable.add(function () {
    handleExitGame(advancedTexture);
  });

  infoButton.onPointerClickObservable.add(function () {
    console.log("Info button clicked");
  });

  // Return the advanced texture
  return advancedTexture;
}
