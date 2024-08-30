"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoinbaseWalletLogo = CoinbaseWalletLogo;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var defaultContainerStyles = {
  paddingTop: 2
};
function CoinbaseWalletLogo(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 26 : _ref$size,
    _ref$containerStyles = _ref.containerStyles,
    containerStyles = _ref$containerStyles === void 0 ? defaultContainerStyles : _ref$containerStyles;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyles
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M2.66675 15.9998C2.66675 23.3628 8.63712 29.3332 16.0001 29.3332C23.363 29.3332 29.3334 23.3628 29.3334 15.9998C29.3334 8.63687 23.363 2.6665 16.0001 2.6665C8.63712 2.6665 2.66675 8.63687 2.66675 15.9998ZM12.5927 11.7035H19.4075C19.9001 11.7035 20.2964 12.0998 20.2964 12.5924V19.4072C20.2964 19.8998 19.9001 20.2961 19.4075 20.2961H12.5927C12.1001 20.2961 11.7038 19.8998 11.7038 19.4072V12.5924C11.7038 12.0998 12.1001 11.7035 12.5927 11.7035Z",
    fill: "white"
  })));
}