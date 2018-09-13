'use strict';

const concat = function(context) {
    const message = context.data.root.query.name +
          context.data.root.query.suffix;
    return message;
}
module.exports = concat;
