import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { overallScoreBoardDisplay, currentRollScoreBoardDisplay } from "./renderScoreBoard";
import { infoGUI } from "./infoGUI";
import { StartNewGame } from "./Game_Logic/newGameDataStructure";



// import { StartNewGame } from "./Game_Logic/newGameDataStructure";
const handleStartGame = (advancedTexture, game) => {
  // game = new StartNewGame(game.generalPins); //won't work as it creates a new instance instead of altering the current one
  const newGame = new StartNewGame(game.generalPins);
  game.updateToNewGame(newGame);
  // game.initializeFrames();
  advancedTexture.dispose();
  overallScoreBoardDisplay.updateText('Overall\nScore: 0');
  currentRollScoreBoardDisplay.updateText('Current\nScore: 0');
  overallScoreBoardDisplay.isVisible = true;
  currentRollScoreBoardDisplay.isVisible = true;

};

const handleExitGame = (advancedTexture) => {
  var customWindow = window.open('', '_self', '');
  customWindow.close();
};

const handleInfo = (scene) => {
  infoGUI(scene);
};

export async function startMenuGUI(scene, game) {
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
    handleStartGame(advancedTexture, game);
  });

  exitGameButton.onPointerClickObservable.add(function () {
    handleExitGame();
  });

  infoButton.onPointerClickObservable.add(function () {
    handleInfo(scene);
  });



  // Return the advanced texture
  return advancedTexture;
}
