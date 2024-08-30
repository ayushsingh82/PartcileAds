"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdContext = exports.AdWrapper = void 0;
var _react = _interopRequireWildcard(require("react"));
var _walletSdk = require("@coinbase/wallet-sdk");
var _CreateWallet = require("./CreateWallet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var defaultAdContext = {
  region: "",
  address: "",
  dev_wallet_address: ""
};
var AdContext = /*#__PURE__*/(0, _react.createContext)(defaultAdContext);
var AdWrapper = exports.AdWrapper = function AdWrapper(_ref) {
  var region = _ref.region,
    dev_wallet_address = _ref.dev_wallet_address,
    children = _ref.children;
  var sdk = new _walletSdk.CoinbaseWalletSDK({
    appName: "Adbase",
    appChainIds: [8453],
    appLogoUrl: ""
  });
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    context_value = _useState2[0],
    setContext_value = _useState2[1];
  var handleSuccess = function handleSuccess(address) {
    setContext_value({
      region: region,
      address: address,
      dev_wallet_address: dev_wallet_address
    });
  };
  var handleError = function handleError(error) {
    console.log(error);
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, context_value ? /*#__PURE__*/_react["default"].createElement(AdContext.Provider, {
    value: context_value
  }, children) : /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_CreateWallet.BlackCreateWalletButton, {
    height: 66,
    width: 200,
    handleSuccess: handleSuccess,
    handleError: handleError
  })));
};
var useAdContext = exports.useAdContext = function useAdContext() {
  return (0, _react.useContext)(AdContext);
};