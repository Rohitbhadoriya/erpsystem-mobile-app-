// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };




module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',   // ← Yeh line sabse LAST mein honi chahiye
  ],
};