// eslint-disable-next-line no-unused-vars
import { AppHelpers, FactoryHelpers } from "./utils";
import Renderer from "./render";
import { ShipFactory, GameboardFactory, PlayerFactory } from "./factories";

// 1. ---
// 2. ---
// 3. ---
// 4. ---
// 5. ---
// 6. ---
// 7. handle winner
// 8. display winner

const Controller = (() => {
  const playerGameboard = GameboardFactory();
  const computerGameboard = GameboardFactory();

  const computer = PlayerFactory("computer");

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

  const placeComputerShips = () => {
    const computerShips = shipTypes.map((shipType) => {
      const { length } = shipType;
      let coordinates = [];
      let placed = false;

      while (!placed) {
        const startRow = Math.floor(Math.random() * 10);
        const startCol = Math.floor(Math.random() * 10);
        isVertical = Math.random() < 0.5;
        coordinates = [];

        if (isVertical) {
          // Check if there is enough space vertically
          if (startRow + length - 1 < 10) {
            coordinates = Array.from({ length }, (_, i) => [
              startRow + i,
              startCol,
            ]);
          }
        } else {
          // Check if there is enough space horizontally
          // eslint-disable-next-line no-lonely-if
          if (startCol + length - 1 < 10) {
            coordinates = Array.from({ length }, (_, i) => [
              startRow,
              startCol + i,
            ]);
          }
        }

        if (coordinates.length > 0) {
          placed = computerGameboard.placeShip(
            ShipFactory(length),
            coordinates
          );
        }
      }

      coordinates.forEach(([row, col]) => {
        const placedSquare = document.querySelector(
          `.gameboard.computer [data-row="${row}"][data-col="${col}"]`
        );
        placedSquare.classList.add("placed");
      });

      return { type: shipType.type, coordinates };
    });

    console.log("Computer ships:", computerShips);
  };

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
          const initialSquare = document.querySelector(
            `.gameboard.initial [data-row="${row}"][data-col="${col}"]`
          );
          initialSquare.classList.add("placed");
        });

        currentShipIndex += 1;

        if (currentShipIndex === shipTypes.length) {
          shipPlacementMode = false;
          placeComputerShips();
          setTimeout(() => {
            AppHelpers.toggleModal(
              document.querySelector(".modal.initial"),
              "hide"
            );
          }, 500);
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
        return {
          initialSquare: document.querySelector(
            `.gameboard.initial [data-row="${row}"][data-col="${col}"]`
          ),
        };
      });

      hoveredSquares.forEach(({ initialSquare }) => {
        if (initialSquare) {
          initialSquare.classList.add("hovered");
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

  const computerAttack = () => {
    if (!shipPlacementMode) {
      const coordinate = computer.attack(playerGameboard);
      const attackedShip = playerGameboard.receiveAttack(coordinate);

      const row = parseInt(coordinate.slice(1), 10) - 1;
      const col = coordinate.charCodeAt(0) - 65;

      const square = document.querySelector(
        `.gameboard.player [data-row="${row}"][data-col="${col}"]`
      );

      if (attackedShip) {
        square.classList.add("hit");

        if (attackedShip.isSunk()) {
          console.log(`Computer sank the ${attackedShip.length}-unit ship!`);
        }
      } else {
        square.classList.add("miss");
      }

      if (playerGameboard.allShipsSunk()) {
        console.log("Computer wins!");
      }
    }
  };

  const playerAttack = (e) => {
    if (!shipPlacementMode) {
      const square = e.target;
      const row = parseInt(square.dataset.row, 10);
      const col = parseInt(square.dataset.col, 10);
      const coordinate = FactoryHelpers.convertToAlphanumeric([row, col]);

      if (!computerGameboard.getAttackedCoordinates().includes(coordinate)) {
        const attackedShip = computerGameboard.receiveAttack(coordinate);

        if (attackedShip) {
          square.classList.add("hit");

          if (attackedShip.isSunk()) {
            console.log(`Player sank the ${attackedShip.length}-unit ship!`);
          }
        } else {
          square.classList.add("miss");
        }

        if (computerGameboard.allShipsSunk()) {
          console.log("Player wins!");
        }

        computerAttack();
      }
    }
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
    Renderer.renderGameboard(".gameboard.initial");
    Renderer.renderGameboard(".gameboard.player");
    Renderer.renderGameboard(".gameboard.computer");
    Renderer.attachEventListeners(".gameboard.initial", eventListeners);

    const computerSquares = document.querySelectorAll(
      ".gameboard.computer .square"
    );
    computerSquares.forEach((square) => {
      square.addEventListener("click", playerAttack);
    });

    const rotateBtn = document.querySelector("#rotateBtn");
    rotateBtn.addEventListener("click", rotateShips);
  };

  return {
    init,
  };
})();

Controller.init();
