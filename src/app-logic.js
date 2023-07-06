// eslint-disable-next-line import/prefer-default-export
export const ShipFactory = (length) => {
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits >= length; // Return true if hits is equal to or greater than length

  return {
    length,
    hit,
    isSunk,
    // Getter function for hits. Using function declaration to ensure it has access to the
    // `hits` variable dynamically, since function declarations are hoisted and can be used
    //  before they are defined. This allows accessing the current value of `hits` even before
    // calling the `hit` function
    get hits() {
      return hits;
    },
  };
};
