function getMinMax(str) {
  let arrayOfNumbers = str
    .split(" ")
    .map((item) => +item)
    .filter((item) => !Number.isNaN(item));
  return {
    min: Math.min(...arrayOfNumbers),
    max: Math.max(...arrayOfNumbers),
  };
}
