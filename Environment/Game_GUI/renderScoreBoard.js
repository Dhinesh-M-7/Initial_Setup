import { scoreBoardGUI } from "./scoreBoard";
export let overallScoreBoardDisplay;
export let currentRollScoreBoardDisplay;

export function renderScoreBoard(scene) {
  let scoreBoardpositionCoordinates = [-32.5, 7.5, 100];
  overallScoreBoardDisplay = scoreBoardGUI(
    scene,
    scoreBoardpositionCoordinates,
    false,
    "ScoreBoard"
  );

  let scoreBoardValuepositionCoordinates = [32.5, 7.5, 100];
  currentRollScoreBoardDisplay = scoreBoardGUI(
    scene,
    scoreBoardValuepositionCoordinates,
    false,
    "Current Score"
  );
}
