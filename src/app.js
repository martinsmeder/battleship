import { AppHelpers } from "./utils";
import Renderer from "./render";

// This module can handle the game loop and coordinate the overall flow of
// the game. It can create instances of players and gameboards, manage turns,
// and determine when the game ends. It should primarily focus on the game
// logic and orchestration rather than directly interacting with the DOM.

// Event Listeners: You can have event listeners in a separate module or
// directly within app.js, depending on your preference and the complexity
// of the interactions. If you have a large number of event listeners or
// complex event handling, it might be beneficial to separate them into a
// dedicated module to keep the code organized. The event listeners should
// call appropriate functions in app.js or render.js to trigger the
// corresponding actions and UI updates.

// 1. ---
// 2. ---
// 3. ---
// 4. Make "place your..." responsive
// 5. Implement drag and drop for each ship type
// 6. Implement rotate button
// 7. Hide initial modal when all ships are placed

const Controller = (() => {
  const shipHoverHandler = (e) => {
    const square = e.target;
    square.classList.add("hovered");
  };

  const shipPlacementHandler = (e) => {
    const square = e.target;
    square.classList.add("placed");
  };

  const eventListeners = [
    { eventType: "mouseover", handler: shipHoverHandler },
    { eventType: "click", handler: shipPlacementHandler },
  ];

  const init = () => {
    AppHelpers.toggleModal(document.querySelector(".modal.endgame"), "hide");
    Renderer.renderGameboard(".gameboard.initial", eventListeners);
  };

  return {
    init,
  };
})();

Controller.init();
