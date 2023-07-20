/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lonely-if */
import { AppHelpers, FactoryHelpers } from "./utils";
import Renderer from "./render";
import { ShipFactory, GameboardFactory, PlayerFactory } from "./factories";

// 1. ---
// 2. ---
// 3. ---
// 4. Make the computer try adjacent locations if getting a hit
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
    for (const shipType of AppHelpers.shipTypes) {
      const { length } = shipType;
      const ship = ShipFactory(length);

      const gridSize = 10;
      let coordinates;
      let placed = false;

      while (!placed) {
        // Generate random startRow and startCol within the grid boundaries
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);

        // Randomly choose whether the ship will be placed vertically or horizontally
        isVertical = Math.random() < 0.5;

        if (isVertical && startRow + length <= gridSize) {
          // Generate the coordinates for a vertically placed ship
          coordinates = Array.from({ length }, (_, i) => [
            startRow + i,
            startCol,
          ]);
        } else if (!isVertical && startCol + length <= gridSize) {
          // Generate the coordinates for a horizontally placed ship
          coordinates = Array.from({ length }, (_, i) => [
            startRow,
            startCol + i,
          ]);
        }

        if (coordinates) {
          // Check if the ship can be placed at the generated coordinates
          placed = computerGameboard.placeShip(ship, coordinates);
        }
      }

      // Get the ship coordinates
      const coordinate = computerGameboard.getShipCoordinates(ship);

      // Loop through them and add a placed class
      for (const [row, col] of coordinate) {
        const convertedCoordinate = FactoryHelpers.convertToAlphanumeric([
          row,
          col,
        ]);
        const placedSquare = document.querySelector(
          `.gameboard.computer [data-coordinate="${convertedCoordinate}"]`
        );
        placedSquare.classList.add("placed");
      }
    }
  };

  const shipPlacementHandler = (e) => {
    if (shipPlacementMode) {
      const square = e.target;
      const { coordinate } = square.dataset;
      const { length } = AppHelpers.shipTypes[currentShipIndex];

      const [startRow, startCol] = FactoryHelpers.convertToIndices(coordinate);

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
          const placedSquare = document.querySelector(
            `[data-coordinate="${FactoryHelpers.convertToAlphanumeric([
              row,
              col,
            ])}"]`
          );
          placedSquare.classList.add("placed");
          const initialSquare = document.querySelector(
            `.gameboard.initial [data-coordinate="${FactoryHelpers.convertToAlphanumeric(
              [row, col]
            )}"]`
          );
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
      const square = e.target;
      // eslint-disable-next-line prefer-destructuring
      const coordinate = square.dataset.coordinate;
      const { length } = AppHelpers.shipTypes[currentShipIndex]; // Get the length of the ship

      const [startRow, startCol] = FactoryHelpers.convertToIndices(coordinate);
      // Generate an array of hovered squares based on the ship length
      const hoveredSquares = Array.from({ length }, (_, i) => {
        // Calculate the row coordinate based on vertical or horizontal placement
        const row = isVertical ? startRow + i : startRow;
        // Calculate the column coordinate based on vertical or horizontal placement
        const col = isVertical ? startCol : startCol + i;
        return {
          initialSquare: document.querySelector(
            `.gameboard.initial [data-coordinate="${FactoryHelpers.convertToAlphanumeric(
              [row, col]
            )}"]`
          ),
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
      const coordinate = computer.attack(
        playerGameboard,
        computer.lastHitCoordinate,
        computer.currentDirection
      );
      // Receive the attack on the player's gameboard and get the attacked ship (if any)
      const attackedShip = playerGameboard.receiveAttack(coordinate);

      console.log(`computerAttack() at: ${coordinate}`);

      const square = document.querySelector(
        `.gameboard.player [data-coordinate="${coordinate}"]`
      ); // Get the corresponding square element on the player's gameboard

      if (attackedShip) {
        square.classList.add("hit");
        // If there was a hit, update the lastHitCoordinate and currentDirection
        computer.lastHitCoordinate = coordinate;
        // To keep the computer's attack consistent, set the currentDirection initially to "up"
        if (computer.currentDirection === null) {
          computer.currentDirection = "up";
        }
      } else if (!attackedShip && computer.lastHitCoordinate) {
        square.classList.add("miss");
      } else if (!attackedShip && !computer.lastHitCoordinate) {
        square.classList.add("miss");
        // If there was a miss, reset the lastHitCoordinate and currentDirection
        computer.lastHitCoordinate = null;
        computer.currentDirection = null;
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
      // eslint-disable-next-line prefer-destructuring
      const coordinate = square.dataset.coordinate;
      // Convert the row and column indices to an alphanumeric coordinate

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
