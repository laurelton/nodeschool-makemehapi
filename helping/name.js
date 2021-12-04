/* eslint-disable semi */
module.exports = function(context) {
    const { name, suffix } = context.data.root.query
    return name + suffix
}
