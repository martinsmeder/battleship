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

    const playerShips = playerGameboard.getShips();
    playerShips.forEach((ship, index) => {
      const coordinates = playerGameboard.getShipCoordinates(ship);
      console.log(
        `Player's ${shipTypes[index].type} coordinates: ${coordinates.join(
          ", "
        )}`
      );
    });

    const sortedComputerShips = computerShips.sort(
      (a, b) =>
        shipTypes.findIndex((s) => s.type === a.type) -
        shipTypes.findIndex((s) => s.type === b.type)
    );

    sortedComputerShips.forEach((ship) => {
      const coordinates = ship.coordinates.map(([row, col]) =>
        FactoryHelpers.convertToAlphanumeric([row, col])
      );
      console.log(
        `Computer's ${ship.type} coordinates: ${coordinates.join(", ")}`
      );
    });
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
      console.log(coordinate);
      // ATTACKEDSHIP = NULL
      // ISSUE IS WHEN SHIPS GET PLACED ON THE BOTTOM ROW

      // const attackedShip = playerGameboard.receiveAttack(coordinate);
      //   const row = parseInt(coordinate[1], 10) - 1;
      //   const col = coordinate[0].charCodeAt(0) - 65;

      //   const square = document.querySelector(
      //     `.gameboard.player [data-row="${row}"][data-col="${col}"]`
      //   );

      //   if (attackedShip) {
      //     square.classList.add("hit");
      //     console.log(`Computer hit Player at: ${coordinate}`);

      //     if (attackedShip.isSunk()) {
      //       console.log(`Computer sank Player's ${attackedShip}!`);
      //     }
      //   } else {
      //     square.classList.add("miss");
      //     console.log(`Computer missed at: ${coordinate}`);
      //   }

      //   if (playerGameboard.allShipsSunk()) {
      //     console.log("Computer wins!");
      //   }
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
          console.log(`Player hit Computer at: ${coordinate}`);

          if (attackedShip.isSunk()) {
            console.log(`Player sank Computer's ${attackedShip}!`);
          }
        } else {
          square.classList.add("miss");
          console.log(`Player missed at: ${coordinate}`);
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
