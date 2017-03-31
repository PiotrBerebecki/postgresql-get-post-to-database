const _pipe = (f, g) => (...args) => g(f(...args));

const pipe = (...funs) => funs.reduce(_pipe);

module.exports = pipe;
