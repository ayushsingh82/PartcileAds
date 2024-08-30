"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _wagmi = require("wagmi");
var _Wagmi = require("./Wagmi");
var _AdWrapper = require("./AdWrapper");
var _reactQuery = require("@tanstack/react-query");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AdBaseProvider = function AdBaseProvider(_ref) {
  var region = _ref.region,
    dev_wallet_address = _ref.dev_wallet_address,
    children = _ref.children;
  var queryClient = new _reactQuery.QueryClient();
  return /*#__PURE__*/_react["default"].createElement(_reactQuery.QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/_react["default"].createElement(_wagmi.WagmiProvider, {
    config: _Wagmi.config
  }, /*#__PURE__*/_react["default"].createElement(_AdWrapper.AdWrapper, {
    region: region,
    dev_wallet_address: dev_wallet_address,
    children: children
  })));
};
var _default = exports["default"] = AdBaseProvider;