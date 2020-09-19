// lib.js
var counter = {
    num: 3
};
function incCounter() {
    counter.num++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};
