const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = {
  transformer: {},
  resolver: {},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
