import { FactoryHelpers } from "./utils";

const Renderer = (() => {
  const renderGameboard = (containerElement) => {
    const container = document.querySelector(containerElement);

    container.textContent = "";

    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        const coordinate = FactoryHelpers.convertToAlphanumeric([row, col]);
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.coordinate = coordinate;

        container.appendChild(square);
      }
    }
  };

  const attachEventListeners = (containerElement, eventListeners) => {
    const container = document.querySelector(containerElement);

    container.querySelectorAll(".square").forEach((square) => {
      eventListeners.forEach((listener) => {
        square.addEventListener(listener.eventType, listener.handler);
      });
    });
  };

  const setWinnerHeading = (winner) => {
    const winnerHeading = document.querySelector("#winner");
    winnerHeading.textContent = `${winner} won!`;
  };

  const clearGameboard = (containerElement) => {
    const container = document.querySelector(containerElement);
    const squares = container.querySelectorAll(".square");

    squares.forEach((square) => {
      const resetSquare = square;
      resetSquare.className = "square"; // Reset the className to remove all classes
    });
  };

  return {
    renderGameboard,
    attachEventListeners,
    setWinnerHeading,
    clearGameboard,
  };
})();

export default Renderer;
