import { AppHelpers, FactoryHelpers } from "./utils";
import Renderer from "./render";
import { ShipFactory, GameboardFactory, PlayerFactory } from "./factories";

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
  let winner = null;

  const placeComputerShips = () => {
    const computerShips = [];

    for (let i = 0; i < shipTypes.length; i += 1) {
      const { type, length } = shipTypes[i];
      let coordinates = [];
      let placed = false;

      while (!placed) {
        const startRow = Math.floor(Math.random() * 10);
        const startCol = Math.floor(Math.random() * 10);
        isVertical = Math.random() < 0.5;
        coordinates = [];

        if (isVertical) {
          if (startRow + length - 1 < 10) {
            coordinates = Array.from({ length }, (_, j) => [
              startRow + j,
              startCol,
            ]);
          }
        } else if (startCol + length - 1 < 10) {
          coordinates = Array.from({ length }, (_, j) => [
            startRow,
            startCol + j,
          ]);
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

      computerShips.push({ type, coordinates });
    }
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
      const col = coordinate[0].charCodeAt(0) - 65;

      const square = document.querySelector(
        `.gameboard.player [data-row="${row}"][data-col="${col}"]`
      );

      if (attackedShip) {
        square.classList.add("hit");
        console.log(`Computer hit Player at: ${coordinate}`);

        if (attackedShip.isSunk()) {
          console.log(`Computer sank Player's ${attackedShip}!`);
        }
      } else {
        square.classList.add("miss");
        console.log(`Computer missed at: ${coordinate}`);
      }

      if (playerGameboard.allShipsSunk()) {
        winner = "The computer";
        Renderer.setWinnerHeading(winner);
        AppHelpers.toggleModal(
          document.querySelector(".modal.endgame"),
          "show"
        );
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
        console.log(attackedShip);
        if (attackedShip) {
          square.classList.add("hit");
          console.log(`Player hit Computer at: ${coordinate}`);

          if (attackedShip.isSunk()) {
            console.log(`Player sank Computer's ${attackedShip}!`);
          }
        } else {
          square.classList.add("miss");
          console.log(`Player missed at: ${coordinate}`);
        }

        if (computerGameboard.allShipsSunk()) {
          winner = "You";
          Renderer.setWinnerHeading(winner);
          AppHelpers.toggleModal(
            document.querySelector(".modal.endgame"),
            "show"
          );
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

  const resetGame = () => {
    // Reset game-related variables
    currentShipIndex = 0;
    shipPlacementMode = true;
    isVertical = false;
    winner = null;

    // Reset gameboard objects
    playerGameboard.reset();
    computerGameboard.reset();

    // Clear player objects attackedCoordinates set
    computer.clearSet();

    // Remove hit and miss classes from all squares
    Renderer.clearGameboard(".gameboard.initial");
    Renderer.clearGameboard(".gameboard.player");
    Renderer.clearGameboard(".gameboard.computer");

    // Reset shipTypes
    document.querySelector(".ship-type").textContent = shipTypes[0].type;
  };

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

    const playAgainButton = document.querySelector("#newGame");
    playAgainButton.addEventListener("click", () => {
      resetGame();
      AppHelpers.toggleModal(document.querySelector(".modal.endgame"), "hide");
      AppHelpers.toggleModal(document.querySelector(".modal.initial"), "show");
    });
  };

  return {
    init,
  };
})();

Controller.init();
