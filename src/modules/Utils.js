export default {
  capitalize: str => str.charAt(0).toUpperCase() + str.substr(1),
  rand: (min, max) => min + (max - min) * Math.random(),
};
