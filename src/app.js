// eslint-disable-next-line no-unused-vars
import { AppHelpers, FactoryHelpers } from "./utils";
import Renderer from "./render";
import { ShipFactory, GameboardFactory, PlayerFactory } from "./factories";

// 1. ---
// 2. make the computer choose between vertial or horizontal randomly without breaking the
//    code. The isVertical = Math.random() < 0.5; causes errors
// 3. handle player attacks
// 4. display player attacks
// 5. handle computer attacks
// 6. display computer attacks
// 7. handle winner
// 8. display winner

const Controller = (() => {
  const playerGameboard = GameboardFactory();
  const computerGameboard = GameboardFactory();

  // eslint-disable-next-line no-unused-vars
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
        // isVertical = Math.random() < 0.5;
        // eslint-disable-next-line no-loop-func
        coordinates = Array.from({ length }, (_, i) => {
          const row = isVertical ? startRow + i : startRow;
          const col = isVertical ? startCol : startCol + i;
          return [row, col];
        });

        placed = computerGameboard.placeShip(ShipFactory(length), coordinates);
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

  // const computerGameboardClickHandler = (e) => {
  //   if (!shipPlacementMode) {
  //     const square = e.target;
  //     const row = parseInt(square.dataset.row, 10);
  //     const col = parseInt(square.dataset.col, 10);
  //     const coordinate = FactoryHelpers.convertToAlphanumeric([row, col]);

  //     if (!computerGameboard.getAttackedCoordinates().includes(coordinate)) {
  //       computerGameboard.receiveAttack(coordinate);
  //       square.classList.add("attacked");
  //       console.log("computerGameboard attacked");

  //       const ships = computerGameboard.getShips();
  //       const attackedShip = ships.find((ship) =>
  //         computerGameboard.getShipCoordinates(ship).includes(coordinate)
  //       );

  //       if (attackedShip) {
  //         const shipCoordinates =
  //           computerGameboard.getShipCoordinates(attackedShip);
  //         shipCoordinates.forEach(([r, c]) => {
  //           const attackedSquare = document.querySelector(
  //             `.gameboard.computer [data-row="${r}"][data-col="${c}"]`
  //           );

  //           if (attackedSquare) {
  //             attackedSquare.classList.add("hit");
  //             console.log("computer ship hit");
  //           }
  //         });

  //         if (attackedShip.isSunk()) {
  //           if (computerGameboard.allShipsSunk()) {
  //             console.log("Player wins!");
  //           } else {
  //             console.log(`Player sank the ${attackedShip.length}-unit ship!`);
  //           }
  //         } else {
  //           console.log("Player hit a ship!");
  //         }
  //       } else {
  //         console.log("Player missed!");
  //       }
  //     }
  //   }
  // };

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

    // const computerSquares = document.querySelectorAll(
    //   ".gameboard.computer .square"
    // );
    // computerSquares.forEach((square) => {
    //   square.addEventListener("click", computerGameboardClickHandler);
    // });

    const rotateBtn = document.querySelector("#rotateBtn");
    rotateBtn.addEventListener("click", rotateShips);
  };

  return {
    init,
  };
})();

Controller.init();

// // Perform the computer's turn
// computer.attack(playerGameboard);

// const missedAttacks = computerGameboard.getMissedAttacks();
// missedAttacks.forEach((missedAttack) => {
//   const missedSquare = document.querySelector(
//     `.gameboard.computer [data-coordinate="${missedAttack}"]`
//   );
//   missedSquare.classList.add("miss");
// });

// const computerAttackedCoordinates =
//   computerGameboard.getAttackedCoordinates();
// const lastCoordinate =
//   computerAttackedCoordinates[computerAttackedCoordinates.length - 1];
// const attackedShipOnComputer = playerGameboard
//   .getShips()
//   .find((ship) =>
//     computerGameboard.getShipCoordinates(ship).includes(lastCoordinate)
//   );

// if (attackedShipOnComputer) {
//   const shipCoordinates = computerGameboard.getShipCoordinates(
//     attackedShipOnComputer
//   );
//   shipCoordinates.forEach((coord) => {
//     const attackedSquare = document.querySelector(
//       `.gameboard.computer [data-coordinate="${coord}"]`
//     );
//     attackedSquare.classList.add("hit");
//   });

//   if (attackedShipOnComputer.isSunk()) {
//     if (computerGameboard.allShipsSunk()) {
//       console.log("Computer wins!");
//     } else {
//       console.log(
//         `Computer sank the ${attackedShipOnComputer.length}-unit ship!`
//       );
//     }
//   } else {
//     console.log("Computer hit a ship!");
//   }
// } else {
//   console.log("Computer missed!");
// }
