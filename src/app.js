import { AppHelpers } from "./utils";
import Renderer from "./render";
import { ShipFactory, GameboardFactory } from "./factories";

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
// 4. ---
// 5. ---
// 6. ---
// 7. Get data from initial gameboard to playergameboard
// 8. Refactor / clean up code --> New list

const Controller = (() => {
  const playerGameboard = GameboardFactory();

  const shipTypes = [
    { type: "carrier", length: 5 },
    { type: "battleship", length: 4 },
    { type: "destroyer", length: 3 },
    { type: "submarine", length: 3 },
    { type: "patrol boat", length: 2 },
  ];

  let currentShipIndex = 0;
  let shipPlacementMode = true;
  let isVertical = false;

  const shipPlacementHandler = (e) => {
    if (shipPlacementMode) {
      const square = e.target;
      const startRow = parseInt(square.dataset.row, 10);
      const startCol = parseInt(square.dataset.col, 10);
      const { length } = shipTypes[currentShipIndex];

      const shipCoordinates = Array.from({ length }, (_, i) => {
        const row = isVertical ? startRow + i : startRow;
        const col = isVertical ? startCol : startCol + i;
        return [row, col];
      });

      const ship = ShipFactory(length);
      const placed = playerGameboard.placeShip(ship, shipCoordinates);

      if (placed) {
        square.classList.add("placed");
        shipCoordinates.forEach(([row, col]) => {
          const placedSquare = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
          );
          placedSquare.classList.add("placed");
        });

        currentShipIndex += 1;

        if (currentShipIndex === shipTypes.length) {
          shipPlacementMode = false;
          setTimeout(() => {
            AppHelpers.toggleModal(
              document.querySelector(".modal.initial"),
              "hide"
            );
            console.log("Placed ships:");
            const ships = playerGameboard.getShips();
            ships.forEach((addedShip, index) => {
              console.log(`Ship ${index + 1} - Length: ${addedShip.length}`);
              const shipsCoordinates =
                playerGameboard.getShipCoordinates(addedShip);
              console.log("Coordinates:", shipsCoordinates);
            });
          }, 1000);
        } else {
          const nextShipType = shipTypes[currentShipIndex].type;
          document.querySelector(".ship-type").textContent = nextShipType;
        }
      }
    }
  };

  const gameboardHoverHandler = (e) => {
    if (shipPlacementMode) {
      const square = e.target;
      const startRow = parseInt(square.dataset.row, 10);
      const startCol = parseInt(square.dataset.col, 10);
      const { length } = shipTypes[currentShipIndex];

      const hoveredSquares = Array.from({ length }, (_, i) => {
        const row = isVertical ? startRow + i : startRow;
        const col = isVertical ? startCol : startCol + i;
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      });

      hoveredSquares.forEach((hoveredSquare) => {
        if (hoveredSquare) {
          hoveredSquare.classList.add("hovered");
        }
      });
    }
  };

  const gameboardMouseLeaveHandler = () => {
    const hoveredSquares = document.querySelectorAll(".gameboard .hovered");
    hoveredSquares.forEach((hoveredSquare) => {
      hoveredSquare.classList.remove("hovered");
    });
  };

  const rotateShips = () => {
    isVertical = !isVertical;
  };

  const eventListeners = [
    { eventType: "mouseover", handler: gameboardHoverHandler },
    { eventType: "mouseleave", handler: gameboardMouseLeaveHandler },
    { eventType: "click", handler: shipPlacementHandler },
  ];

  const init = () => {
    AppHelpers.toggleModal(document.querySelector(".modal.endgame"), "hide");
    Renderer.renderGameboard(".gameboard.initial", eventListeners);
    const rotateBtn = document.querySelector("#rotateBtn");
    rotateBtn.addEventListener("click", rotateShips);
  };

  return {
    init,
  };
})();

Controller.init();
