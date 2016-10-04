// Commonly needed functions (e.g. Schema validation) are recommended to be placed here.

// Ensure that important fields are not empty:
module.exports.isNotEmpty = function(str) {
    return str && str.length;
};
