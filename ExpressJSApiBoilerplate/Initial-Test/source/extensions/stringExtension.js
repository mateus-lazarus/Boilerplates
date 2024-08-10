/**
 * @param {String} stringObject
 * @returns {boolean}
 */
export function isEmptyOrNull(stringObject, stringName) {
  {
    switch (stringObject) {
      case typeof stringObject === "string" && stringObject.length === 0:
        console.log(`The string is empty. String \'${stringName}\'.`);
        return true;
      case stringObject === null:
        console.log(`The string is null. String \'${stringName}\'.`);
        return true;
      default:
        console.log(`The string is not empty or null. String \'${stringName}\'.`);
        return false;
    }
  }
}