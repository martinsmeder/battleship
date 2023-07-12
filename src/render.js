// This module can be responsible for rendering content on the page.
// It can include functions to update the DOM elements representing the
// game boards, ships, attacks, messages, and other UI components. It should
// encapsulate the DOM manipulation code and provide a clean interface for
// updating the UI based on the game state. It can be the bridge between the
// game logic and the actual DOM manipulation.

const Renderer = (() => {
  const renderGameboard = (containerElement, eventListeners) => {
    const container = document.querySelector(`${containerElement}`);

    container.textContent = "";

    // Create the 10x10 grid
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = row;
        square.dataset.col = col;

        // Attach event listeners to each square
        eventListeners.forEach((listener) => {
          square.addEventListener(listener.eventType, listener.handler);
        });

        container.appendChild(square);
      }
    }
  };

  return {
    renderGameboard,
  };
})();

export default Renderer;
