/*

 sizeof.js

 A function to calculate the approximate memory usage of objects

 Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
 the terms of the CC0 1.0 Universal legal code:

 http://creativecommons.org/publicdomain/zero/1.0/legalcode

 */

/* Returns the approximate memory usage, in bytes, of the specified object. The
 * parameter is:
 *
 * object - the object whose size should be determined
 */
module.exports = function (object){

  // initialise the list of objects and size
  var objects = [object];
  var size    = 0;

  // loop over the objects
  for (var index = 0; index < objects.length; index ++){

    // determine the type of the object
    switch (typeof objects[index]){

      // the object is a boolean
      case "boolean" : size += 4; break;

      // the object is a number
      case "number": size += 8; break;

      // the object is a string
      case "string": size += 2 * objects[index].length; break;

      // the object is a generic object
      case "object":

        // if the object is not an array, add the sizes of the keys
        if (Object.prototype.toString.call(objects[index]) != "[object Array]"){
          for (var key in objects[index]) {
            if (objects[index].hasOwnProperty(key)) {
              size += 2 * key.length;
            }
          }
        }

        // loop over the keys
        for (var key1 in objects[index]){
          if (objects[index].hasOwnProperty(key1)) {
            // determine whether the value has already been processed
            var processed = false;
            for (var search = 0; search < objects.length; search ++){
              if (objects[search] === objects[index][key1]){
                processed = true;
                break;
              }
            }

            // queue the value to be processed if appropriate
            if (!processed) {
              objects.push(objects[index][key1]);
            }
          }
        }
    }
  }

  // return the calculated size
  return size;
};
