const { AsyncLocalStorage } = require("node:async_hooks");

const als = new AsyncLocalStorage();

/**
 * Returns the current request context from AsyncLocalStorage.
 * Safe to call anywhere — returns {} if no context is active.
 */
const getContext = () => als.getStore() || {};

module.exports = { als, getContext };
