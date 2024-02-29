import { scoreBoardGUI } from "./scoreBoard";
export let scoreboardDisplay;
export let scoreboardValueDisplay;

export function renderScoreBoard(scene) {
  let scoreBoardpositionCoordinates = [-32.5, 7.5, 100];
  scoreboardDisplay = scoreBoardGUI(
    scene,
    scoreBoardpositionCoordinates,
    false,
    "ScoreBoard"
  );

  let scoreBoardValuepositionCoordinates = [32.5, 7.5, 100];
  scoreboardValueDisplay = scoreBoardGUI(
    scene,
    scoreBoardValuepositionCoordinates,
    false,
    0
  );
}
