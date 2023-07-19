/* eslint-disable no-lonely-if */
import { AppHelpers, FactoryHelpers } from "./utils";
import Renderer from "./render";
import { ShipFactory, GameboardFactory, PlayerFactory } from "./factories";

// 1. ---
// 2. ---
// 3. Fix bug so that ship placement and class-adding works next to all grid borders
// 4. Style => Modals
// 5. Push to gh-pages and add readme

const Controller = (() => {
  const playerGameboard = GameboardFactory();
  const computerGameboard = GameboardFactory();

  const computer = PlayerFactory("computer");

  let currentShipIndex = 0;
  let shipPlacementMode = true;
  let isVertical = false;
  let winner = null;

  const placeComputerShips = () => {
    const computerShips = [];

    for (let i = 0; i < AppHelpers.shipTypes.length; i += 1) {
      // Loop through shipTypes array
      const { type, length } = AppHelpers.shipTypes[i]; // Get ship type and length
      let coordinates = [];
      let placed = false; // Flag to track if ship placement is successful

      while (!placed) {
        // Loop until ship is placed
        const startRow = Math.floor(Math.random() * 10); // Generate a random start row (0 to 9)
        const startCol = Math.floor(Math.random() * 10); // Generate a random start column (0 to 9)
        isVertical = Math.random() < 0.5; // Randomly determine if ship should be placed vertically

        coordinates = []; // Reset coordinates array

        if (isVertical) {
          // If ship is vertical
          if (startRow + length - 1 < 10) {
            // Check if ship can fit vertically within the gameboard boundaries
            coordinates = Array.from({ length }, (_, j) => [
              startRow + j,
              startCol,
            ]);
          }
        } else {
          // If ship is horizontal
          if (startCol + length - 1 < 10) {
            // Check if ship can fit horizontally within the gameboard boundaries
            coordinates = Array.from({ length }, (_, j) => [
              startRow,
              startCol + j,
            ]);
          }
        }

        if (coordinates.length > 0) {
          // If valid ship coordinates are generated
          placed = computerGameboard.placeShip(
            ShipFactory(length),
            coordinates
          ); // Attempt to place the ship on the computer gameboard
        }
      }
      computerShips.push({ type, coordinates });
    }
  };

  const shipPlacementHandler = (e) => {
    if (shipPlacementMode) {
      const square = e.target; // Get the clicked square element
      const startRow = parseInt(square.dataset.row, 10); // Get the starting row
      const startCol = parseInt(square.dataset.col, 10); // Get the starting column
      const { length } = AppHelpers.shipTypes[currentShipIndex]; // Get the length of the ship

      // Generate an array of ship coordinates based on the ship length
      const shipCoordinates = Array.from({ length }, (_, i) => {
        // Calculate the row coordinate based on vertical or horizontal placement
        const row = isVertical ? startRow + i : startRow;
        // Calculate the column coordinate based on vertical or horizontal placement
        const col = isVertical ? startCol : startCol + i;
        return [row, col]; // Return the coordinate pair
      });

      // Attempt to place the ship on the player gameboard
      const ship = ShipFactory(length);
      const placed = playerGameboard.placeShip(ship, shipCoordinates);

      if (placed) {
        // If ship placement is successful
        square.classList.add("placed");
        shipCoordinates.forEach(([row, col]) => {
          // Iterate over the ship coordinates
          const placedSquare = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
          ); // Get the corresponding square element on the gameboard UI
          placedSquare.classList.add("placed");
          const initialSquare = document.querySelector(
            `.gameboard.initial [data-row="${row}"][data-col="${col}"]`
          ); // Get the corresponding square element on the initial ship placement UI
          initialSquare.classList.add("placed");
        });

        currentShipIndex += 1; // Increment the currentShipIndex to move to the next ship

        if (currentShipIndex === AppHelpers.shipTypes.length) {
          // If all ships have been placed
          shipPlacementMode = false; // Disable ship placement mode
          placeComputerShips(); // Place the computer's ships
          setTimeout(() => {
            // Set a timeout to delay hiding the initial ship placement modal
            AppHelpers.toggleModal(
              document.querySelector(".modal.initial"),
              "hide"
            );
          }, 500);
        } else {
          // If there are still ships to be placed
          // Get the type of the next ship based on the currentShipIndex
          const nextShipType = AppHelpers.shipTypes[currentShipIndex].type;
          // Update the ship type text on the UI
          document.querySelector(".ship-type").textContent = nextShipType;
        }
      }
    }
  };

  const gameboardHoverHandler = (e) => {
    if (shipPlacementMode) {
      // Check if ship placement mode is active
      const square = e.target; // Get the hovered square element
      const startRow = parseInt(square.dataset.row, 10); // Get the starting row
      const startCol = parseInt(square.dataset.col, 10); // Get the starting column
      const { length } = AppHelpers.shipTypes[currentShipIndex]; // Get the length of the ship

      // Generate an array of hovered squares based on the ship length
      const hoveredSquares = Array.from({ length }, (_, i) => {
        // Calculate the row coordinate based on vertical or horizontal placement
        const row = isVertical ? startRow + i : startRow;
        // Calculate the column coordinate based on vertical or horizontal placement
        const col = isVertical ? startCol : startCol + i;
        return {
          initialSquare: document.querySelector(
            `.gameboard.initial [data-row="${row}"][data-col="${col}"]`
          ), // Get the corresponding square element on the initial ship placement UI
        };
      });

      hoveredSquares.forEach(({ initialSquare }) => {
        // Iterate over the hovered squares
        if (initialSquare) {
          // Check if the initial square exists
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
      // Perform a computer attack and get the coordinate
      const coordinate = computer.attack(playerGameboard);
      // Receive the attack on the player's gameboard and get the attacked ship (if any)
      const attackedShip = playerGameboard.receiveAttack(coordinate);
      // Extract the row number from the coordinate and convert it to an index
      const row = parseInt(coordinate.slice(1), 10) - 1;
      // Extract the column letter from the coordinate and convert it to a column index
      const col = coordinate[0].charCodeAt(0) - 65;

      const square = document.querySelector(
        `.gameboard.player [data-row="${row}"][data-col="${col}"]`
      ); // Get the corresponding square element on the player's gameboard

      if (attackedShip) {
        square.classList.add("hit");
      } else {
        square.classList.add("miss");
      }

      if (playerGameboard.allShipsSunk()) {
        winner = "The computer";
        Renderer.setWinnerHeading(winner);
        AppHelpers.toggleModal(
          document.querySelector(".modal.endgame"),
          "show"
        );
      }
    }
  };

  const playerAttack = (e) => {
    if (!shipPlacementMode) {
      const square = e.target; // Get the clicked square element
      const row = parseInt(square.dataset.row, 10); // Extract the row index
      const col = parseInt(square.dataset.col, 10); // Extract the column index
      // Convert the row and column indices to an alphanumeric coordinate
      const coordinate = FactoryHelpers.convertToAlphanumeric([row, col]);

      // Check if the coordinate has not been previously attacked
      if (!computerGameboard.getAttackedCoordinates().includes(coordinate)) {
        // Receive the attack on the computer's gameboard and get the attacked ship (if any)
        const attackedShip = computerGameboard.receiveAttack(coordinate);

        if (attackedShip) {
          square.classList.add("hit");
        } else {
          square.classList.add("miss");
        }

        if (computerGameboard.allShipsSunk()) {
          winner = "You";
          Renderer.setWinnerHeading(winner);
          AppHelpers.toggleModal(
            document.querySelector(".modal.endgame"),
            "show"
          );
        }

        computerAttack(); // Perform the computer's attack
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

    // Clear computers attackedCoordinates set
    computer.clearSet();

    // Remove hit and miss classes from all squares
    Renderer.clearGameboard(".gameboard.initial");
    Renderer.clearGameboard(".gameboard.player");
    Renderer.clearGameboard(".gameboard.computer");

    // Reset shipTypes
    document.querySelector(".ship-type").textContent =
      AppHelpers.shipTypes[0].type;
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
