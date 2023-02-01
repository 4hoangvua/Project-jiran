export const checkObject = (object) => {
  if (object && typeof object === "object" && !Array.isArray(object)) {
    return true;
  } else {
    return false;
  }
};
export const checkArray = (array) => {
  if (array && typeof array === "object" && Array.isArray(array)) {
    return true;
  } else {
    return false;
  }
};
