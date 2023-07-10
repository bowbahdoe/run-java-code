/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./AdvancedOptionsMenu.tsx":
/*!*********************************!*\
  !*** ./AdvancedOptionsMenu.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _ConfigElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigElement */ "./ConfigElement.tsx");
/* harmony import */ var _MenuGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuGroup */ "./MenuGroup.tsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









const AdvancedOptionsMenu = () => {
  const isEditionDefault = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.isEditionDefault);
  const edition = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.edition);
  const isBacktraceSet = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.getBacktraceSet);
  const backtrace = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.backtrace);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const changeEdition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeEdition(e)), [dispatch]);
  const changeBacktrace = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(b => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeBacktrace(b)), [dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Advanced options",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_ConfigElement__WEBPACK_IMPORTED_MODULE_3__.Select, {
      name: "Edition",
      value: edition,
      isNotDefault: !isEditionDefault,
      onChange: changeEdition,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
        value: _types__WEBPACK_IMPORTED_MODULE_6__.Edition.Rust2015,
        children: "2015"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
        value: _types__WEBPACK_IMPORTED_MODULE_6__.Edition.Rust2018,
        children: "2018"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("option", {
        value: _types__WEBPACK_IMPORTED_MODULE_6__.Edition.Rust2021,
        children: "2021"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_3__.Either, {
      id: "backtrace",
      name: "Backtrace",
      a: _types__WEBPACK_IMPORTED_MODULE_6__.Backtrace.Disabled,
      b: _types__WEBPACK_IMPORTED_MODULE_6__.Backtrace.Enabled,
      value: backtrace,
      isNotDefault: isBacktraceSet,
      onChange: changeBacktrace
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvancedOptionsMenu);

/***/ }),

/***/ "./BuildMenu.tsx":
/*!***********************!*\
  !*** ./BuildMenu.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./configureStore */ "./configureStore.ts");
/* harmony import */ var _ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ButtonMenuItem */ "./ButtonMenuItem.tsx");
/* harmony import */ var _MenuGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuGroup */ "./MenuGroup.tsx");
/* harmony import */ var _MenuAside__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MenuAside */ "./MenuAside.tsx");
/* harmony import */ var _BuildMenu_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BuildMenu.module.css */ "./BuildMenu.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");











const useDispatchAndClose = (action, close) => {
  const dispatch = (0,_configureStore__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch(action());
    close();
  }, [action, close, dispatch]);
};
const BuildMenu = props => {
  const isHirAvailable = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_3__.isHirAvailable);
  const isWasmAvailable = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_3__.isWasmAvailable);
  const compile = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performCompile, props.close);
  const compileToAssembly = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performCompileToAssembly, props.close);
  const compileToLLVM = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performCompileToLLVM, props.close);
  const compileToMir = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performCompileToMir, props.close);
  const compileToHir = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performCompileToNightlyHir, props.close);
  const compileToWasm = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performCompileToNightlyWasm, props.close);
  const execute = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performExecute, props.close);
  const test = useDispatchAndClose(_actions__WEBPACK_IMPORTED_MODULE_2__.performTest, props.close);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: "What do you want to do?",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "Run",
      onClick: execute,
      children: ["Build and run the code, showing the output. Equivalent to ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("code", {
        className: _BuildMenu_module_css__WEBPACK_IMPORTED_MODULE_8__["default"].code,
        children: "cargo run"
      }), "."]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "Build",
      onClick: compile,
      children: ["Build the code without running it. Equivalent to ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("code", {
        className: _BuildMenu_module_css__WEBPACK_IMPORTED_MODULE_8__["default"].code,
        children: "cargo build"
      }), "."]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "Test",
      onClick: test,
      children: ["Build the code and run all the tests. Equivalent to ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("code", {
        className: _BuildMenu_module_css__WEBPACK_IMPORTED_MODULE_8__["default"].code,
        children: "cargo test"
      }), "."]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "ASM",
      onClick: compileToAssembly,
      children: "Build and show the resulting assembly code."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "LLVM IR",
      onClick: compileToLLVM,
      children: "Build and show the resulting LLVM IR, LLVM\u2019s intermediate representation."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "MIR",
      onClick: compileToMir,
      children: "Build and show the resulting MIR, Rust\u2019s control-flow-based intermediate representation."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "HIR",
      onClick: compileToHir,
      children: ["Build and show the resulting HIR, Rust\u2019s syntax-based intermediate representation.", !isHirAvailable && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(HirAside, {})]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: "WASM",
      onClick: compileToWasm,
      children: ["Build a WebAssembly module for web browsers, in the .WAT textual representation.", !isWasmAvailable && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(WasmAside, {})]
    })]
  });
};
const HirAside = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_MenuAside__WEBPACK_IMPORTED_MODULE_7__["default"], {
  children: "Note: HIR currently requires using the Nightly channel, selecting this option will switch to Nightly."
});
const WasmAside = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_MenuAside__WEBPACK_IMPORTED_MODULE_7__["default"], {
  children: "Note: WASM currently requires using the Nightly channel, selecting this option will switch to Nightly."
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BuildMenu);

/***/ }),

/***/ "./ButtonMenuItem.tsx":
/*!****************************!*\
  !*** ./ButtonMenuItem.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./MenuItem.tsx");
/* harmony import */ var _ButtonMenuItem_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonMenuItem.module.css */ "./ButtonMenuItem.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["name", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const ButtonMenuItem = _ref => {
  let {
      name,
      children
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", _objectSpread(_objectSpread({
      className: _ButtonMenuItem_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].container
    }, props), {}, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: _ButtonMenuItem_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].name,
        "data-test-id": "button-menu-item__name",
        children: name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: _ButtonMenuItem_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].description,
        children: children
      })]
    }))
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonMenuItem);

/***/ }),

/***/ "./ChannelMenu.tsx":
/*!*************************!*\
  !*** ./ChannelMenu.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MenuGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuGroup */ "./MenuGroup.tsx");
/* harmony import */ var _SelectOne__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectOne */ "./SelectOne.tsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _ChannelMenu_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ChannelMenu.module.css */ "./ChannelMenu.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










const ChannelMenu = props => {
  const channel = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.channel);
  const stableVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.stableVersionText);
  const betaVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.betaVersionText);
  const nightlyVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.nightlyVersionText);
  const java19Version = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.java19VersionText);
  const betaVersionDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.betaVersionDetailsText);
  const nightlyVersionDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.nightlyVersionDetailsText);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const changeChannel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(channel => {
    dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeChannel(channel));
    props.close();
  }, [dispatch, props]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Channel \u2014 Choose the rust version",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_SelectOne__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "Stable channel",
        currentValue: channel,
        thisValue: _types__WEBPACK_IMPORTED_MODULE_6__.Channel.Stable,
        changeValue: changeChannel,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Desc, {
          children: ["Build using the Stable version: ", stableVersion]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_SelectOne__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "Beta channel",
        currentValue: channel,
        thisValue: _types__WEBPACK_IMPORTED_MODULE_6__.Channel.Beta,
        changeValue: changeChannel,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Desc, {
          children: ["Build using the Beta version: ", betaVersion]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Desc, {
          children: ["(", betaVersionDetails, ")"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_SelectOne__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "Nightly channel",
        currentValue: channel,
        thisValue: _types__WEBPACK_IMPORTED_MODULE_6__.Channel.Nightly,
        changeValue: changeChannel,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Desc, {
          children: ["Build using the Nightly version: ", nightlyVersion]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Desc, {
          children: ["(", nightlyVersionDetails, ")"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_SelectOne__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "Java 19",
        currentValue: channel,
        thisValue: _types__WEBPACK_IMPORTED_MODULE_6__.Channel.Java19,
        changeValue: changeChannel,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Desc, {
          children: "Build using Java 19"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(Desc, {
          children: ["(", java19Version, ")"]
        })]
      })]
    })
  });
};
const Desc = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
    className: _ChannelMenu_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].description,
    children: children
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChannelMenu);

/***/ }),

/***/ "./ConfigElement.tsx":
/*!***************************!*\
  !*** ./ConfigElement.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Either: () => (/* binding */ Either),
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./MenuItem.tsx");
/* harmony import */ var _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigElement.module.css */ "./ConfigElement.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["id", "a", "b", "aLabel", "bLabel", "value", "onChange"],
  _excluded2 = ["value", "onChange", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const Either = _ref => {
  let {
      id,
      a,
      b,
      aLabel = a,
      bLabel = b,
      value,
      onChange
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(ConfigElement, _objectSpread(_objectSpread({}, rest), {}, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].toggle,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
        id: `${id}-a`,
        name: id,
        value: a,
        type: "radio",
        checked: value === a,
        onChange: () => onChange(a)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        htmlFor: `${id}-a`,
        children: aLabel
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
        id: `${id}-b`,
        name: id,
        value: b,
        type: "radio",
        checked: value === b,
        onChange: () => onChange(b)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        htmlFor: `${id}-b`,
        children: bLabel
      })]
    })
  }));
};
const Select = _ref2 => {
  let {
      value,
      onChange,
      children
    } = _ref2,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(ConfigElement, _objectSpread(_objectSpread({}, rest), {}, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("select", {
      className: _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].select,
      value: value,
      onChange: e => onChange(e.target.value),
      children: children
    })
  }));
};
const ConfigElement = _ref3 => {
  let {
    name,
    isNotDefault,
    aside,
    children
  } = _ref3;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].container,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: isNotDefault ? _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].notDefault : _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].name,
        children: name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: _ConfigElement_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].value,
        children: children
      })]
    }), aside]
  });
};

/***/ }),

/***/ "./ConfigMenu.tsx":
/*!************************!*\
  !*** ./ConfigMenu.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ConfigElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigElement */ "./ConfigElement.tsx");
/* harmony import */ var _MenuGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuGroup */ "./MenuGroup.tsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* global ACE_KEYBINDINGS:false, ACE_THEMES:false */








const MONACO_THEMES = ['vs', 'vs-dark', 'vscode-dark-plus'];
const ConfigMenu = () => {
  const keybinding = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.ace.keybinding);
  const aceTheme = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.ace.theme);
  const monacoTheme = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.monaco.theme);
  const orientation = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.orientation);
  const editorStyle = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.editor);
  const pairCharacters = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.ace.pairCharacters);
  const assemblyFlavor = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.assemblyFlavor);
  const demangleAssembly = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.demangleAssembly);
  const processAssembly = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.processAssembly);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const changeAceTheme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(t => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeAceTheme(t)), [dispatch]);
  const changeMonacoTheme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(t => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeMonacoTheme(t)), [dispatch]);
  const changeKeybinding = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(k => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeKeybinding(k)), [dispatch]);
  const changeOrientation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(o => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeOrientation(o)), [dispatch]);
  const changeEditorStyle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeEditor(e)), [dispatch]);
  const changeAssemblyFlavor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(a => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeAssemblyFlavor(a)), [dispatch]);
  const changePairCharacters = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(p => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changePairCharacters(p)), [dispatch]);
  const changeProcessAssembly = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(p => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeProcessAssembly(p)), [dispatch]);
  const changeDemangleAssembly = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(d => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeDemangleAssembly(d)), [dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Editor",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Select, {
        name: "Editor",
        value: editorStyle,
        onChange: changeEditorStyle,
        children: [_types__WEBPACK_IMPORTED_MODULE_5__.Editor.Simple, _types__WEBPACK_IMPORTED_MODULE_5__.Editor.Ace, _types__WEBPACK_IMPORTED_MODULE_5__.Editor.Monaco].map(k => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
          value: k,
          children: k
        }, k))
      }), editorStyle === _types__WEBPACK_IMPORTED_MODULE_5__.Editor.Ace && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Select, {
          name: "Keybinding",
          value: keybinding,
          onChange: changeKeybinding,
          children: ["ace","emacs","sublime","vim","vscode"].map(k => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
            value: k,
            children: k
          }, k))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Select, {
          name: "Theme",
          value: aceTheme,
          onChange: changeAceTheme,
          children: ["xcode","vibrant_ink","twilight","tomorrow_night_eighties","tomorrow_night_bright","tomorrow_night_blue","tomorrow_night","tomorrow","textmate","terminal","sqlserver","solarized_light","solarized_dark","pastel_on_dark","one_dark","nord_dark","monokai","mono_industrial","merbivore_soft","merbivore","kuroir","kr_theme","katzenmilch","iplastic","idle_fingers","gruvbox_light_hard","gruvbox_dark_hard","gruvbox","gob","github_dark","github","eclipse","dreamweaver","dracula","dawn","crimson_editor","cobalt","clouds_midnight","clouds","cloud9_night_low_color","cloud9_night","cloud9_day","chrome","chaos","ambiance"].map(t => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
            value: t,
            children: t
          }, t))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Either, {
          id: "editor-pair-characters",
          name: "Pair Characters",
          a: _types__WEBPACK_IMPORTED_MODULE_5__.PairCharacters.Enabled,
          b: _types__WEBPACK_IMPORTED_MODULE_5__.PairCharacters.Disabled,
          value: pairCharacters,
          onChange: changePairCharacters
        })]
      }), editorStyle === _types__WEBPACK_IMPORTED_MODULE_5__.Editor.Monaco && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Select, {
          name: "Theme",
          value: monacoTheme,
          onChange: changeMonacoTheme,
          children: MONACO_THEMES.map(t => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
            value: t,
            children: t
          }, t))
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_MenuGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "UI",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Select, {
        name: "Orientation",
        value: orientation,
        onChange: changeOrientation,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
          value: _types__WEBPACK_IMPORTED_MODULE_5__.Orientation.Automatic,
          children: "Automatic"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
          value: _types__WEBPACK_IMPORTED_MODULE_5__.Orientation.Horizontal,
          children: "Horizontal"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
          value: _types__WEBPACK_IMPORTED_MODULE_5__.Orientation.Vertical,
          children: "Vertical"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Assembly",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Either, {
        id: "assembly-flavor",
        name: "Flavor",
        a: _types__WEBPACK_IMPORTED_MODULE_5__.AssemblyFlavor.Att,
        b: _types__WEBPACK_IMPORTED_MODULE_5__.AssemblyFlavor.Intel,
        aLabel: "AT&T",
        bLabel: "Intel",
        value: assemblyFlavor,
        onChange: changeAssemblyFlavor
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Either, {
        id: "assembly-symbols",
        name: "Symbol Demangling",
        a: _types__WEBPACK_IMPORTED_MODULE_5__.DemangleAssembly.Demangle,
        b: _types__WEBPACK_IMPORTED_MODULE_5__.DemangleAssembly.Mangle,
        aLabel: "On",
        bLabel: "Off",
        value: demangleAssembly,
        onChange: changeDemangleAssembly
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ConfigElement__WEBPACK_IMPORTED_MODULE_2__.Either, {
        id: "assembly-view",
        name: "Name Filtering",
        a: _types__WEBPACK_IMPORTED_MODULE_5__.ProcessAssembly.Filter,
        b: _types__WEBPACK_IMPORTED_MODULE_5__.ProcessAssembly.Raw,
        aLabel: "On",
        bLabel: "Off",
        value: processAssembly,
        onChange: changeProcessAssembly
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfigMenu);

/***/ }),

/***/ "./Header.tsx":
/*!********************!*\
  !*** ./Header.tsx ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _AdvancedOptionsMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdvancedOptionsMenu */ "./AdvancedOptionsMenu.tsx");
/* harmony import */ var _BuildMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BuildMenu */ "./BuildMenu.tsx");
/* harmony import */ var _ChannelMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChannelMenu */ "./ChannelMenu.tsx");
/* harmony import */ var _ConfigMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConfigMenu */ "./ConfigMenu.tsx");
/* harmony import */ var _HeaderButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HeaderButton */ "./HeaderButton.tsx");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Icon */ "./Icon.tsx");
/* harmony import */ var _ModeMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ModeMenu */ "./ModeMenu.tsx");
/* harmony import */ var _PopButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PopButton */ "./PopButton.tsx");
/* harmony import */ var _SegmentedButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SegmentedButton */ "./SegmentedButton.tsx");
/* harmony import */ var _ToolsMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ToolsMenu */ "./ToolsMenu.tsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./configureStore */ "./configureStore.ts");
/* harmony import */ var _reducers_output_gist__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reducers/output/gist */ "./reducers/output/gist.ts");
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Header.module.css */ "./Header.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



















const Header = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
  "data-test-id": "header",
  className: _Header_module_css__WEBPACK_IMPORTED_MODULE_16__["default"].container,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HeaderSet, {
    id: "build",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButtonSet, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ExecuteButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(BuildMenuButton, {})]
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HeaderSet, {
    id: "channel-mode",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButtonSet, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ModeMenuButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ChannelMenuButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(AdvancedOptionsMenuButton, {})]
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HeaderSet, {
    id: "share",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButtonSet, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ShareButton, {})
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HeaderSet, {
    id: "tools",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButtonSet, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ToolsMenuButton, {})
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HeaderSet, {
    id: "config",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButtonSet, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ConfigMenuButton, {})
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HeaderSet, {
    id: "help",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButtonSet, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(HelpButton, {})
    })
  })]
});
const HeaderSet = _ref => {
  let {
    id,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
    className: id == 'channel-mode' ? _Header_module_css__WEBPACK_IMPORTED_MODULE_16__["default"].setChannelMode : _Header_module_css__WEBPACK_IMPORTED_MODULE_16__["default"].set,
    children: children
  });
};
const ExecuteButton = () => {
  const executionLabel = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_13__.getExecutionLabel);
  const dispatch = (0,_configureStore__WEBPACK_IMPORTED_MODULE_14__.useAppDispatch)();
  const execute = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_12__.performPrimaryAction()), [dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
    isBuild: true,
    onClick: execute,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
      bold: true,
      rightIcon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_7__.BuildIcon, {}),
      children: executionLabel
    })
  });
};
const BuildMenuButton = () => {
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref2, ref) => {
    let {
      toggle
    } = _ref2;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
      title: "Select what to build",
      ref: ref,
      onClick: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_7__.MoreOptionsIcon, {})
      })
    });
  });
  Button.displayName = 'BuildMenuButton.Button';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_PopButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    Button: Button,
    Menu: _BuildMenu__WEBPACK_IMPORTED_MODULE_3__["default"]
  });
};
const ModeMenuButton = () => {
  const label = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_13__.getModeLabel);
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref3, ref) => {
    let {
      toggle
    } = _ref3;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
      title: "Mode \u2014 Choose the optimization level",
      ref: ref,
      onClick: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isExpandable: true,
        children: label
      })
    });
  });
  Button.displayName = 'ModeMenuButton.Button';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_PopButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    Button: Button,
    Menu: _ModeMenu__WEBPACK_IMPORTED_MODULE_8__["default"]
  });
};
const ChannelMenuButton = () => {
  const label = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_13__.getChannelLabel);
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref4, ref) => {
    let {
      toggle
    } = _ref4;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
      title: "Channel \u2014 Choose the Rust version",
      ref: ref,
      onClick: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isExpandable: true,
        children: label
      })
    });
  });
  Button.displayName = 'ChannelMenuButton.Button';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_PopButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    Button: Button,
    Menu: _ChannelMenu__WEBPACK_IMPORTED_MODULE_4__["default"]
  });
};
const AdvancedOptionsMenuButton = () => {
  const advancedOptionsSet = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_13__.getAdvancedOptionsSet);
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref5, ref) => {
    let {
      toggle
    } = _ref5;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
      title: "Advanced compilation flags",
      ref: ref,
      onClick: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        icon: advancedOptionsSet ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_7__.MoreOptionsActiveIcon, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_7__.MoreOptionsIcon, {})
      })
    });
  });
  Button.displayName = 'AdvancedOptionsMenuButton.Button';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_PopButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    Button: Button,
    Menu: _AdvancedOptionsMenu__WEBPACK_IMPORTED_MODULE_2__["default"]
  });
};
const ShareButton = () => {
  const dispatch = (0,_configureStore__WEBPACK_IMPORTED_MODULE_14__.useAppDispatch)();
  const gistSave = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch((0,_reducers_output_gist__WEBPACK_IMPORTED_MODULE_15__.performGistSave)()), [dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
    title: "Create shareable links to this code",
    onClick: gistSave,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
      children: "Share"
    })
  });
};
const ToolsMenuButton = () => {
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref6, ref) => {
    let {
      toggle
    } = _ref6;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
      title: "Run extra tools on the source code",
      ref: ref,
      onClick: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isExpandable: true,
        children: "Tools"
      })
    });
  });
  Button.displayName = 'ToolsMenuButton.Button';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_PopButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    Button: Button,
    Menu: _ToolsMenu__WEBPACK_IMPORTED_MODULE_11__["default"]
  });
};
const ConfigMenuButton = () => {
  const Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref7, ref) => {
    let {
      toggle
    } = _ref7;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedButton, {
      title: "Show the configuration options",
      ref: ref,
      onClick: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_7__.ConfigIcon, {}),
        isExpandable: true,
        children: "Config"
      })
    });
  });
  Button.displayName = 'ConfigMenuButton.Button';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_PopButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    Button: Button,
    Menu: _ConfigMenu__WEBPACK_IMPORTED_MODULE_5__["default"]
  });
};
const HelpButton = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_SegmentedButton__WEBPACK_IMPORTED_MODULE_10__.SegmentedLink, {
  title: "View help",
  action: _actions__WEBPACK_IMPORTED_MODULE_12__.navigateToHelp,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_HeaderButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_7__.HelpIcon, {})
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./HeaderButton.tsx":
/*!**************************!*\
  !*** ./HeaderButton.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./Icon.tsx");
/* harmony import */ var _HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HeaderButton.module.css */ "./HeaderButton.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const HeaderButton = _ref => {
  let {
    bold,
    icon,
    rightIcon,
    isExpandable,
    children
  } = _ref;
  const c = [_HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].container];
  if (bold) {
    c.push(_HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].bold);
  }
  if (icon) {
    c.push(_HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].hasLeftIcon);
  }
  if (rightIcon) {
    c.push(_HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].hasRightIcon);
  }
  if (isExpandable) {
    c.push(_HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].expandable);
  }
  if ((icon || rightIcon) && !isExpandable && !children) {
    c.push(_HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].iconOnly);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: c.join(' '),
    children: [icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: _HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].leftIcon,
      children: icon
    }), children, rightIcon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: _HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].rightIcon,
      children: rightIcon
    }), isExpandable && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: _HeaderButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].drop,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__.ExpandableIcon, {})
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderButton);

/***/ }),

/***/ "./Help.tsx":
/*!******************!*\
  !*** ./Help.tsx ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _HelpExample__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HelpExample */ "./HelpExample.tsx");
/* harmony import */ var _uss_router_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uss-router/Link */ "./uss-router/Link.tsx");
/* harmony import */ var _Help_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Help.module.css */ "./Help.module.css");
/* harmony import */ var _assets_integer32_logo_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/integer32-logo.svg */ "./assets/integer32-logo.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








const ACE_URL = 'https://github.com/ajaxorg/ace';
const CLIPPY_URL = 'https://github.com/Manishearth/rust-clippy';
const MIRI_URL = 'https://github.com/rust-lang/miri';
const CRATES_IO_URL = 'https://crates.io/';
const RUST_COOKBOOK_URL = 'https://rust-lang-nursery.github.io/rust-cookbook/';
const CRATES_URL = 'https://github.com/rust-lang/rust-playground/blob/main/compiler/base/Cargo.toml';
const GIST_URL = 'https://gist.github.com/';
const I32_URL = 'http://integer32.com/';
const LOCALSTORAGE_URL = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API';
const ORIGINAL_PLAYGROUND_URL = 'https://github.com/rust-lang/rust-playpen';
const REPO_URL = 'https://github.com/rust-lang/rust-playground';
const RUSTFMT_URL = 'https://github.com/rust-lang-nursery/rustfmt';
const SHEPMASTER_URL = 'https://github.com/shepmaster/';
const CRATE_EXAMPLE = `extern crate rand;
use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    println!("{}", rng.gen::<u8>());
}`;
const CLIPPY_EXAMPLE = `fn main() {
    match true {
        true => println!("true"),
        false => println!("false"),
    }
}`;
const MIRI_EXAMPLE = `fn main() {
    let mut a: [u8; 0] = [];
    unsafe {
        *a.get_unchecked_mut(1) = 1;
    }
}`;
const RUSTFMT_EXAMPLE = `// wow, this is ugly!
fn main ()
{ struct Foo { a: u8, b: String, }
match 4 {2=>{},_=>{}} }`;
const LINK_EXAMPLE = 'https://play.integer32.com/?code=fn main() { println!("hello world!"); }';
const TEST_EXAMPLE = `#[test]
fn test_something() {
    assert_ne!(42, 0);
}`;
const LIBRARY_EXAMPLE = `#![crate_type="lib"]

pub fn library_fn() -> u8 {
    42
}`;
const OUTPUT_EXAMPLE = `#[inline(never)]
pub fn a_loop() -> i32 {
    let mut sum = 0;
    for i in 0..100 {
        sum += i;
    }
    sum
}

fn main() {
    println!("{}", a_loop());
}`;
const Help = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("section", {
    className: _Help_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
      children: "The Rust Playground"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_uss_router_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      action: _actions__WEBPACK_IMPORTED_MODULE_1__.navigateToIndex,
      children: "Return to the playground"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
      id: "about",
      header: "About",
      level: "h2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
        children: ["The playground is an ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: REPO_URL,
          children: "open source project"
        }), ". If you have any suggestions for features, issues with the implementation, or just want to read the code for yourself, you are invited to participate!"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
        children: ["This playground is modeled after the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: ORIGINAL_PLAYGROUND_URL,
          children: "original Rust playground"
        }), ", and we owe a great debt to every contributor to that project."]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
        children: ["This playground was created by ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: SHEPMASTER_URL,
          children: "Jake Goulding"
        }), ", part of ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: I32_URL,
          children: "Integer 32"
        }), "."]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        className: _Help_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].logo,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: I32_URL,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
            src: _assets_integer32_logo_svg__WEBPACK_IMPORTED_MODULE_5__,
            alt: "Integer 32 Logo"
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
      id: "features",
      header: "Features",
      level: "h2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-crates",
        header: "Crates",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["The playground provides the top 100 most downloaded crates from ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: CRATES_IO_URL,
            children: "crates.io"
          }), ", the crates from the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: RUST_COOKBOOK_URL,
            children: "Rust Cookbook"
          }), ", and all of their dependencies. To use a crate, add the appropriate", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "extern crate foo"
          }), " line to the code."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: CRATE_EXAMPLE
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["See the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: CRATES_URL,
            children: "complete list of crates"
          }), " to know what\u2019s available."]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-formatting",
        header: "Formatting code",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: RUSTFMT_URL,
            children: "rustfmt"
          }), " is a tool for formatting Rust code according to the Rust style guidelines. Click on the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Format"
          }), ' ', "button in the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Tools"
          }), " menu to automatically reformat your code."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: RUSTFMT_EXAMPLE
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-linting",
        header: "Linting code",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: CLIPPY_URL,
            children: "Clippy"
          }), " is a collection of lints to catch common mistakes and improve your Rust code. Click on the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Clippy"
          }), ' ', "button in the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Tools"
          }), " menu to see possible improvements to your code."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: CLIPPY_EXAMPLE
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-miri",
        header: "Checking code for undefined behavior",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: MIRI_URL,
            children: "Miri"
          }), " is an interpreter for Rust\u2019s mid-level intermediate representation (MIR) and can be used to detect certain kinds of undefined behavior in your unsafe Rust code. Click on the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Miri"
          }), " button in the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Tools"
          }), " menu to check."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: MIRI_EXAMPLE
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(LinkableSection, {
        id: "features-sharing",
        header: "Sharing code",
        level: "h3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["Once you have some code worth saving or sharing, click on the", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Share"
          }), " button. This will create a", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: GIST_URL,
            children: "GitHub Gist"
          }), ". You will also be provided with a URL to load that Gist back into the playground."]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-linking",
        header: "Linking to the playground with initial code",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["If you have a web page with Rust code that you\u2019d like to show in action, you can link to the playground with the Rust code in the query parameter ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "code"
          }), ". Make sure to escape any special characters. Keep the code short, as URLs have limitations on the maximum length."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("pre", {
          className: _Help_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].code,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("code", {
            children: LINK_EXAMPLE
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-tests",
        header: "Executing tests",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["If your code contains the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "#[test]"
          }), " attribute and does not contain a ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "main"
          }), " method, ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "cargo test"
          }), " will be executed instead of ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "cargo run"
          }), "."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: TEST_EXAMPLE
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-library",
        header: "Compiling as a library",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["If your code contains the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "#![crate_type=\"lib\"]"
          }), " attribute,", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "cargo build"
          }), " will be executed instead of ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Code, {
            children: "cargo run"
          }), "."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: LIBRARY_EXAMPLE
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-output-formats",
        header: "Output formats",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["Instead of executing the code, you can also see intermediate output of the compiler as x86_64 assembly, LLVM IR, Rust MIR, or WebAssembly. This is often used in conjunction with the", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: "#features-modes",
            children: "mode"
          }), " set to \u201CRelease\u201D to see how the compiler has chosen to optimize some specific piece of code."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpExample__WEBPACK_IMPORTED_MODULE_2__["default"], {
          code: OUTPUT_EXAMPLE
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-modes",
        header: "Compilation modes",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["Rust has two primary compilation modes: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Debug"
          }), " and", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Release"
          }), ". Debug compiles code faster while Release performs more aggressive optimizations."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["You can choose which mode to compile in using the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Mode"
          }), ' ', "menu."]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-channels",
        header: "Rust channels",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["Rust releases new ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "stable"
          }), " versions every 6 weeks. Between these stable releases, ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "beta"
          }), " versions of the next stable release are made available. In addition, builds containing experimental features are produced ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "nightly"
          }), "."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["You can choose which channel to compile with using the", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Channel"
          }), " menu."]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-customization",
        header: "Customization",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["The ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: ACE_URL,
            children: "Ajax.org Cloud9 Editor (Ace)"
          }), " is used to provide a better interface for editing code. Ace comes with several keybinding options (such as Emacs and Vim) as well as many themes."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          children: "You may also disable Ace completely, falling back to a simple HTML text area."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["These options can be configured via the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: "Config"
          }), " menu."]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
        id: "features-persistence",
        header: "Persistence",
        level: "h3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: ["The most recently entered code will be automatically saved in your browser\u2019s", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            href: LOCALSTORAGE_URL,
            children: "local storage"
          }), ". This allows you to recover your last work even if you close the browser."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          children: "Local storage is a singleton resource, so if you use multiple windows, only the most recently saved code will be persisted."
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinkableSection, {
      id: "limitations",
      header: "Limitations",
      level: "h2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        children: "To prevent the playground from being used to attack other computers and to ensure it is available for everyone to use, some limitations are enforced."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("dl", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dt", {
          children: "Network"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dd", {
          children: "There is no network connection available during compilation or execution of user-submitted code."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dt", {
          children: "Memory"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dd", {
          children: "The amount of memory the compiler and resulting executable use is limited."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dt", {
          children: "Execution Time"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dd", {
          children: "The total compilation and execution time is limited."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dt", {
          children: "Disk"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("dd", {
          children: "The total disk space available to the compiler and resulting executable is limited."
        })]
      })]
    })]
  });
};
const LinkableSection = _ref => {
  let {
    id,
    header,
    level: Level,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    id: id,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Level, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: _Help_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].header,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          className: _Help_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].headerLink,
          href: `#${id}`,
          children: header
        })
      })
    }), children]
  });
};
const Code = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("code", {
    className: _Help_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].code,
    children: children
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Help);

/***/ }),

/***/ "./HelpExample.tsx":
/*!*************************!*\
  !*** ./HelpExample.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_shadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-shadow */ "./node_modules/react-shadow/react-shadow.esm.js");
/* harmony import */ var prismjs_components_prism_rust_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs/components/prism-rust.min */ "./node_modules/prismjs/components/prism-rust.min.js");
/* harmony import */ var prismjs_components_prism_rust_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_rust_min__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_prism__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-prism */ "./node_modules/react-prism/lib/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configureStore */ "./configureStore.ts");
/* harmony import */ var _HelpExample_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HelpExample.module.css */ "./HelpExample.module.css");
/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.css */ "./node_modules/prismjs/themes/prism-okaidia.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










const HelpExample = _ref => {
  let {
    code
  } = _ref;
  const dispatch = (0,_configureStore__WEBPACK_IMPORTED_MODULE_5__.useAppDispatch)();
  const showExample = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.showExample(code)), [dispatch, code]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: _HelpExample_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
      className: _HelpExample_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].loadExample,
      onClick: showExample,
      children: "Load in playground"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_shadow__WEBPACK_IMPORTED_MODULE_1__["default"].div, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("link", {
        href: prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_7__,
        rel: "stylesheet"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("pre", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_prism__WEBPACK_IMPORTED_MODULE_3__.PrismCode, {
          className: "language-rust",
          children: code
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpExample);

/***/ }),

/***/ "./Icon.tsx":
/*!******************!*\
  !*** ./Icon.tsx ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BuildIcon: () => (/* binding */ BuildIcon),
/* harmony export */   CheckmarkIcon: () => (/* binding */ CheckmarkIcon),
/* harmony export */   ClipboardIcon: () => (/* binding */ ClipboardIcon),
/* harmony export */   Close: () => (/* binding */ Close),
/* harmony export */   ConfigIcon: () => (/* binding */ ConfigIcon),
/* harmony export */   ExpandableIcon: () => (/* binding */ ExpandableIcon),
/* harmony export */   HelpIcon: () => (/* binding */ HelpIcon),
/* harmony export */   MoreOptionsActiveIcon: () => (/* binding */ MoreOptionsActiveIcon),
/* harmony export */   MoreOptionsIcon: () => (/* binding */ MoreOptionsIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.module.css */ "./Icon.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


/* eslint-disable max-len */
// These icons came from Material Design originally
// https://material.io/tools/icons/?icon=assignment&style=outline
// M.D. 'play_arrow'


const BuildIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "14",
  viewBox: "8 4 10 16",
  width: "12",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M8 5v14l11-7z"
  })
});
// M.D. 'keyboard_arrow_down'
const ExpandableIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "10",
  viewBox: "6 8 12 8",
  width: "10",
  opacity: "0.5",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  })
});
// M.D. 'more_horiz'
const MoreOptionsIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "18",
  viewBox: "0 0 24 24",
  width: "18",
  opacity: "0.5",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  })
});
const MoreOptionsActiveIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "18",
  viewBox: "0 0 24 24",
  width: "18",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    fillRule: "evenodd",
    fill: "#428bca",
    d: "M4,5 h16 a3,3 0 0,1 3,3 v8 a3,3 0 0,1 -3,3 h-16 a3,3 0 0,1 -3,-3 v-8 a3,3 0 0,1 3,-3 Z M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  })
});
// M.D. 'settings',
const ConfigIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "15",
  viewBox: "0 0 24 24",
  width: "15",
  opacity: "0.5",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
  })
});
// M.D. 'help_outline'
const HelpIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "18",
  viewBox: "0 0 24 24",
  width: "18",
  opacity: "0.5",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
  })
});
const CheckmarkIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "18",
  viewBox: "2 2 22 22",
  width: "18",
  opacity: "0.5",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
  })
});
// M.D. 'assignment' (outline)
const ClipboardIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  height: "18",
  width: "18",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
    x: "7",
    y: "15",
    width: "7",
    height: "2"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
    x: "7",
    y: "11",
    width: "10",
    height: "2"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
    x: "7",
    y: "7",
    width: "10",
    height: "2"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M19,3L19,3h-4.18C14.4,1.84,13.3,1,12,1c-1.3,0-2.4,0.84-2.82,2H5h0C4.86,3,4.73,3.01,4.6,3.04 C4.21,3.12,3.86,3.32,3.59,3.59c-0.18,0.18-0.33,0.4-0.43,0.64C3.06,4.46,3,4.72,3,5v14c0,0.27,0.06,0.54,0.16,0.78 c0.1,0.24,0.25,0.45,0.43,0.64c0.27,0.27,0.62,0.47,1.01,0.55C4.73,20.99,4.86,21,5,21h0h14h0c1.1,0,2-0.9,2-2V5 C21,3.9,20.1,3,19,3z M12,2.75c0.41,0,0.75,0.34,0.75,0.75c0,0.41-0.34,0.75-0.75,0.75c-0.41,0-0.75-0.34-0.75-0.75 C11.25,3.09,11.59,2.75,12,2.75z M19,19H5V5h14V19z"
  })]
});
// M.D. 'close'
const Close = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
  className: _Icon_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].icon,
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41z"
  })
});

/***/ }),

/***/ "./Loader.tsx":
/*!********************!*\
  !*** ./Loader.tsx ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Loader_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader.module.css */ "./Loader.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const Loader = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
    className: _Loader_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].dot,
    children: "\u2B24"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
    className: _Loader_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].dot,
    children: "\u2B24"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
    className: _Loader_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].dot,
    children: "\u2B24"
  })]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./MenuAside.tsx":
/*!***********************!*\
  !*** ./MenuAside.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuAside_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuAside.module.css */ "./MenuAside.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



const MenuAside = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
    className: _MenuAside_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].aside,
    children: children
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuAside);

/***/ }),

/***/ "./MenuGroup.tsx":
/*!***********************!*\
  !*** ./MenuGroup.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuGroup_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuGroup.module.css */ "./MenuGroup.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const MenuGroup = _ref => {
  let {
    title,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: _MenuGroup_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1", {
      className: _MenuGroup_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].title,
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: _MenuGroup_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].content,
      children: children
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuGroup);

/***/ }),

/***/ "./MenuItem.tsx":
/*!**********************!*\
  !*** ./MenuItem.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuItem_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem.module.css */ "./MenuItem.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



const MenuItem = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: _MenuItem_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].container,
    children: children
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuItem);

/***/ }),

/***/ "./ModeMenu.tsx":
/*!**********************!*\
  !*** ./ModeMenu.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MenuGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuGroup */ "./MenuGroup.tsx");
/* harmony import */ var _SelectOne__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectOne */ "./SelectOne.tsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








const ModeMenu = props => {
  const mode = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.mode);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const changeMode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(mode => {
    dispatch(_actions__WEBPACK_IMPORTED_MODULE_4__.changeMode(mode));
    props.close();
  }, [dispatch, props]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Mode \u2014 Choose optimization level",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SelectOne__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "Debug",
        currentValue: mode,
        thisValue: _types__WEBPACK_IMPORTED_MODULE_5__.Mode.Debug,
        changeValue: changeMode,
        children: "Build with debug information, without optimizations."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SelectOne__WEBPACK_IMPORTED_MODULE_3__["default"], {
        name: "Release",
        currentValue: mode,
        thisValue: _types__WEBPACK_IMPORTED_MODULE_5__.Mode.Release,
        changeValue: changeMode,
        children: "Build with optimizations turned on."
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModeMenu);

/***/ }),

/***/ "./Notifications.tsx":
/*!***************************!*\
  !*** ./Notifications.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_portal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-portal */ "./node_modules/react-portal/es/PortalCompat.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./Icon.tsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _Notifications_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Notifications.module.css */ "./Notifications.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









const SURVEY_URL = 'https://blog.rust-lang.org/2022/12/05/survey-launch.html';
const Notifications = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_portal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: _Notifications_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].container,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(RustSurvey2022Notification, {})
    })
  });
};
const RustSurvey2022Notification = () => {
  const showRustSurvey2022 = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_4__.showRustSurvey2022Selector);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const seenRustSurvey2021 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_3__.seenRustSurvey2022()), [dispatch]);
  return showRustSurvey2022 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(Notification, {
    onClose: seenRustSurvey2021,
    children: ["Please help us take a look at who the Rust community is composed of, how the Rust project is doing, and how we can improve the Rust programming experience by completing the ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
      href: SURVEY_URL,
      children: "2022 State of Rust Survey"
    }), ". Whether or not you use Rust today, we want to know your opinions."]
  }) : null;
};
const Notification = _ref => {
  let {
    onClose,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: _Notifications_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].notification,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: _Notifications_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].notificationContent,
      children: children
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
      className: _Notifications_module_css__WEBPACK_IMPORTED_MODULE_5__["default"].close,
      onClick: onClose,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__.Close, {})
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notifications);

/***/ }),

/***/ "./Output.tsx":
/*!********************!*\
  !*** ./Output.tsx ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _Output_Execute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Output/Execute */ "./Output/Execute.tsx");
/* harmony import */ var _Output_Gist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Output/Gist */ "./Output/Gist.tsx");
/* harmony import */ var _Output_Section__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Output/Section */ "./Output/Section.tsx");
/* harmony import */ var _Output_SimplePane__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Output/SimplePane */ "./Output/SimplePane.tsx");
/* harmony import */ var _Output_PaneWithMir__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Output/PaneWithMir */ "./Output/PaneWithMir.tsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _Output_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Output.module.css */ "./Output.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["code"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }













const Tab = _ref => {
  let {
    kind,
    focus,
    label,
    onClick,
    tabProps
  } = _ref;
  if (_selectors__WEBPACK_IMPORTED_MODULE_9__.hasProperties(tabProps)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("button", {
      className: focus === kind ? _Output_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].tabSelected : _Output_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].tab,
      onClick: onClick,
      children: label
    });
  } else {
    return null;
  }
};
const PaneWithCode = _ref2 => {
  let {
      code
    } = _ref2,
    rest = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_SimplePane__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread(_objectSpread({}, rest), {}, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_Section__WEBPACK_IMPORTED_MODULE_6__["default"], {
      kind: "code",
      label: "Result",
      children: code
    })
  }));
};
const Output = () => {
  const somethingToShow = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_9__.getSomethingToShow);
  const {
    meta: {
      focus
    },
    execute,
    format,
    clippy,
    miri,
    macroExpansion,
    assembly,
    llvmIr,
    mir,
    hir,
    wasm,
    gist
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.output);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const focusClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus()), [dispatch]);
  const focusExecute = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Execute)), [dispatch]);
  const focusFormat = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Format)), [dispatch]);
  const focusClippy = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Clippy)), [dispatch]);
  const focusMiri = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Miri)), [dispatch]);
  const focusMacroExpansion = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.MacroExpansion)), [dispatch]);
  const focusAssembly = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Asm)), [dispatch]);
  const focusLlvmIr = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.LlvmIr)), [dispatch]);
  const focusMir = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Mir)), [dispatch]);
  const focusHir = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Hir)), [dispatch]);
  const focusWasm = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Wasm)), [dispatch]);
  const focusGist = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.changeFocus(_types__WEBPACK_IMPORTED_MODULE_3__.Focus.Gist)), [dispatch]);
  if (!somethingToShow) {
    return null;
  }
  let close = null;
  let body = null;
  if (focus) {
    close = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("button", {
      className: _Output_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].tabClose,
      onClick: focusClose,
      children: "Close"
    });
    body = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: _Output_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].body,
      children: [focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Execute && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_Execute__WEBPACK_IMPORTED_MODULE_4__["default"], {}), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Format && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_SimplePane__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread(_objectSpread({}, format), {}, {
        kind: "format"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Clippy && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_SimplePane__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread(_objectSpread({}, clippy), {}, {
        kind: "clippy"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Miri && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_SimplePane__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread(_objectSpread({}, miri), {}, {
        kind: "miri"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.MacroExpansion && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_SimplePane__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread(_objectSpread({}, macroExpansion), {}, {
        kind: "macro-expansion"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Asm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(PaneWithCode, _objectSpread(_objectSpread({}, assembly), {}, {
        kind: "asm"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.LlvmIr && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(PaneWithCode, _objectSpread(_objectSpread({}, llvmIr), {}, {
        kind: "llvm-ir"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Mir && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_PaneWithMir__WEBPACK_IMPORTED_MODULE_8__["default"], _objectSpread(_objectSpread({}, mir), {}, {
        kind: "mir"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Hir && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_PaneWithMir__WEBPACK_IMPORTED_MODULE_8__["default"], _objectSpread(_objectSpread({}, hir), {}, {
        kind: "hir"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Wasm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(PaneWithCode, _objectSpread(_objectSpread({}, wasm), {}, {
        kind: "wasm"
      })), focus === _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Gist && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output_Gist__WEBPACK_IMPORTED_MODULE_5__["default"], {})]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: _Output_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].container,
    "data-test-id": "output",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: _Output_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].tabs,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Execute,
        focus: focus,
        label: "Execution",
        onClick: focusExecute,
        tabProps: execute
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Format,
        focus: focus,
        label: "Format",
        onClick: focusFormat,
        tabProps: format
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Clippy,
        focus: focus,
        label: "Clippy",
        onClick: focusClippy,
        tabProps: clippy
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Miri,
        focus: focus,
        label: "Miri",
        onClick: focusMiri,
        tabProps: miri
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.MacroExpansion,
        focus: focus,
        label: "Macro expansion",
        onClick: focusMacroExpansion,
        tabProps: macroExpansion
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Asm,
        focus: focus,
        label: "ASM",
        onClick: focusAssembly,
        tabProps: assembly
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.LlvmIr,
        focus: focus,
        label: "LLVM IR",
        onClick: focusLlvmIr,
        tabProps: llvmIr
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Mir,
        focus: focus,
        label: "MIR",
        onClick: focusMir,
        tabProps: mir
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Hir,
        focus: focus,
        label: "HIR",
        onClick: focusHir,
        tabProps: hir
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Wasm,
        focus: focus,
        label: "WASM",
        onClick: focusWasm,
        tabProps: wasm
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Tab, {
        kind: _types__WEBPACK_IMPORTED_MODULE_3__.Focus.Gist,
        focus: focus,
        label: "Share",
        onClick: focusGist,
        tabProps: gist
      }), close]
    }), body]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Output);

/***/ }),

/***/ "./Output/Execute.tsx":
/*!****************************!*\
  !*** ./Output/Execute.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selectors */ "./selectors/index.ts");
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Section */ "./Output/Section.tsx");
/* harmony import */ var _SimplePane__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SimplePane */ "./Output/SimplePane.tsx");
/* harmony import */ var _Execute_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Execute.module.css */ "./Output/Execute.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }









const Execute = () => {
  const details = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.output.execute);
  const isAutoBuild = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_3__.isAutoBuildSelector);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const addMainFunction = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.addMainFunction()), [dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_SimplePane__WEBPACK_IMPORTED_MODULE_5__["default"], _objectSpread(_objectSpread({}, details), {}, {
    kind: "execute",
    children: isAutoBuild && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Warning, {
      addMainFunction: addMainFunction
    })
  }));
};
const Warning = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_Section__WEBPACK_IMPORTED_MODULE_4__["default"], {
  kind: "warning",
  label: "Warnings",
  children: ["No main function was detected, so your code was compiled", '\n', "but not run. If you\u2019d like to execute your code, please", '\n', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
    className: _Execute_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].addMain,
    onClick: props.addMainFunction,
    children: "add a main function"
  }), "."]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Execute);

/***/ }),

/***/ "./Output/Gist.tsx":
/*!*************************!*\
  !*** ./Output/Gist.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-copy-to-clipboard */ "./node_modules/react-copy-to-clipboard/lib/index.js");
/* harmony import */ var react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Icon */ "./Icon.tsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../selectors */ "./selectors/index.ts");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Loader */ "./Output/Loader.tsx");
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Section */ "./Output/Section.tsx");
/* harmony import */ var _Gist_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Gist.module.css */ "./Output/Gist.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }










const Gist = () => {
  const showLoader = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_4__.showGistLoaderSelector);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    children: showLoader ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Links, {})
  });
};
class Copied extends (react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent) {
  constructor(props) {
    super(props);
    _defineProperty(this, "copied", () => {
      this.setState({
        copied: true
      });
      setTimeout(() => {
        this.setState({
          copied: false
        });
      }, 1000);
    });
    this.state = {
      copied: false
    };
  }
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("p", {
      className: this.state.copied ? _Gist_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].active : _Gist_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].container,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
        href: this.props.href,
        children: this.props.children
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_1__.CopyToClipboard, {
        text: this.props.href,
        onCopy: this.copied,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
          className: _Gist_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].button,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_3__.ClipboardIcon, {})
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        className: _Gist_module_css__WEBPACK_IMPORTED_MODULE_7__["default"].text,
        children: "Copied!"
      })]
    });
  }
}
const Links = () => {
  const codeUrl = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_4__.codeUrlSelector);
  const gistUrl = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.output.gist.url);
  const permalink = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_4__.permalinkSelector);
  const urloUrl = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_4__.urloUrlSelector);
  const textChanged = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_4__.textChangedSinceShareSelector);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Copied, {
      href: permalink,
      children: "Permalink to the playground"
    }), gistUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Copied, {
      href: gistUrl,
      children: "Direct link to the gist"
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Copied, {
      href: codeUrl,
      children: "Embedded code in link"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(NewWindow, {
      href: urloUrl,
      children: "Open a new thread in the Rust user forum"
    }), textChanged ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Section__WEBPACK_IMPORTED_MODULE_6__["default"], {
      kind: "warning",
      label: "Code changed",
      children: "Source code has been changed since gist was saved"
    }) : null]
  });
};
const NewWindow = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
    href: props.href,
    target: "_blank",
    rel: "noopener noreferrer",
    children: props.children
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gist);

/***/ }),

/***/ "./Output/Header.tsx":
/*!***************************!*\
  !*** ./Output/Header.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.module.css */ "./Output/Header.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



const Header = _ref => {
  let {
    label
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].container,
    children: label
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./Output/Loader.tsx":
/*!***************************!*\
  !*** ./Output/Loader.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Loader */ "./Loader.tsx");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ "./Output/Header.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const Loader = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    label: "Progress"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {})]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./Output/OutputPrism.tsx":
/*!********************************!*\
  !*** ./Output/OutputPrism.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_prism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-prism */ "./node_modules/react-prism/lib/index.js");
/* harmony import */ var _OutputPrism_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OutputPrism.module.css */ "./Output/OutputPrism.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const OutputPrism = _ref => {
  let {
    languageCode,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("pre", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_prism__WEBPACK_IMPORTED_MODULE_1__.PrismCode, {
      className: `${_OutputPrism_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].container} ${languageCode}`,
      children: children
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OutputPrism);

/***/ }),

/***/ "./Output/PaneWithMir.tsx":
/*!********************************!*\
  !*** ./Output/PaneWithMir.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ "./Output/Header.tsx");
/* harmony import */ var _SimplePane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SimplePane */ "./Output/SimplePane.tsx");
/* harmony import */ var _OutputPrism__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OutputPrism */ "./Output/OutputPrism.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["code"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






const PaneWithMir = _ref => {
  let {
      code
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SimplePane__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread(_objectSpread({}, rest), {}, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      "data-test-id": "output-result",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
        label: "Result"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_OutputPrism__WEBPACK_IMPORTED_MODULE_3__["default"], {
        languageCode: "language-rust_mir",
        children: code
      })]
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaneWithMir);

/***/ }),

/***/ "./Output/Section.tsx":
/*!****************************!*\
  !*** ./Output/Section.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ "./Output/Header.tsx");
/* harmony import */ var _Section_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Section.module.css */ "./Output/Section.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const Section = _ref => {
  let {
    kind,
    label,
    children
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_0___default().Children.count(children) === 0 ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    "data-test-id": `output-${kind}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("pre", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("code", {
        className: _Section_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].code,
        children: children
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Section);

/***/ }),

/***/ "./Output/SimplePane.tsx":
/*!*******************************!*\
  !*** ./Output/SimplePane.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ "./Output/Header.tsx");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loader */ "./Output/Loader.tsx");
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Section */ "./Output/Section.tsx");
/* harmony import */ var _OutputPrism__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OutputPrism */ "./Output/OutputPrism.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







const HighlightErrors = _ref => {
  let {
    label,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    "data-test-id": "output-stderr",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_OutputPrism__WEBPACK_IMPORTED_MODULE_4__["default"], {
      languageCode: "language-rust_errors",
      children: children
    })]
  });
};
const SimplePane = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
  "data-test-id": `output-${props.kind}`,
  children: [props.requestsInProgress > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Section__WEBPACK_IMPORTED_MODULE_3__["default"], {
    kind: "error",
    label: "Errors",
    children: props.error
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(HighlightErrors, {
    label: "Standard Error",
    children: props.stderr
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Section__WEBPACK_IMPORTED_MODULE_3__["default"], {
    kind: "stdout",
    label: "Standard Output",
    children: props.stdout
  }), props.children]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimplePane);

/***/ }),

/***/ "./PageSwitcher.tsx":
/*!**************************!*\
  !*** ./PageSwitcher.tsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Help__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Help */ "./Help.tsx");
/* harmony import */ var _Playground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Playground */ "./Playground.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const PageSwitcher = () => {
  const page = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.page);
  switch (page) {
    case 'index':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Playground__WEBPACK_IMPORTED_MODULE_3__["default"], {});
    case 'help':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Help__WEBPACK_IMPORTED_MODULE_2__["default"], {});
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageSwitcher);

/***/ }),

/***/ "./Playground.tsx":
/*!************************!*\
  !*** ./Playground.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var split_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! split-grid */ "./node_modules/split-grid/dist/split-grid.mjs");
/* harmony import */ var _editor_Editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor/Editor */ "./editor/Editor.tsx");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Header */ "./Header.tsx");
/* harmony import */ var _Notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Notifications */ "./Notifications.tsx");
/* harmony import */ var _Output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Output */ "./Output.tsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Playground.module.css */ "./Playground.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");














const TRACK_OPTION_NAME = {
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Horizontal]: 'rowGutters',
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Vertical]: 'columnGutters'
};
const FOCUSED_GRID_STYLE = {
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Horizontal]: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].resizeableAreaRowOutputFocused,
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Vertical]: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].resizeableAreaColumnOutputFocused
};
const UNFOCUSED_GRID_STYLE = {
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Horizontal]: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].resizeableAreaRowOutputUnfocused,
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Vertical]: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].resizeableAreaColumnOutputUnfocused
};
const HANDLE_STYLES = {
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Horizontal]: [_Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].splitRowsGutter, _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].splitRowsGutterHandle],
  [_types__WEBPACK_IMPORTED_MODULE_8__.Orientation.Vertical]: [_Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].splitColumnsGutter, '']
};
// We drop down to lower-level split-grid code and use some hooks
// because we want to reduce the number of times that the Editor
// component is remounted. Each time it's remounted, we see a flicker and
// lose state (like undo history).
const ResizableArea = () => {
  const somethingToShow = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_7__.getSomethingToShow);
  const isFocused = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_7__.isOutputFocused);
  const orientation = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_7__.orientation);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const resizeComplete = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_9__.splitRatioChanged()), [dispatch]);
  const grid = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const dragHandle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  // Reset styles left on the grid from split-grid when we change orientation or focus.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (grid.current) {
      grid.current.style.removeProperty('grid-template-columns');
      grid.current.style.removeProperty('grid-template-rows');
    }
    resizeComplete();
  }, [orientation, isFocused, resizeComplete]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const split = (0,split_grid__WEBPACK_IMPORTED_MODULE_2__["default"])({
      minSize: 100,
      [TRACK_OPTION_NAME[orientation]]: [{
        track: 1,
        element: dragHandle.current
      }],
      onDragEnd: resizeComplete
    });
    return () => split.destroy();
  }, [orientation, isFocused, somethingToShow, resizeComplete]);
  const gridStyles = isFocused ? FOCUSED_GRID_STYLE : UNFOCUSED_GRID_STYLE;
  const gridStyle = gridStyles[orientation];
  const [handleOuterStyle, handleInnerStyle] = HANDLE_STYLES[orientation];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    ref: grid,
    className: gridStyle,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].editor,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_editor_Editor__WEBPACK_IMPORTED_MODULE_3__["default"], {})
    }), isFocused && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      ref: dragHandle,
      className: handleOuterStyle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
        className: handleInnerStyle,
        children: "\u28FF"
      })
    }), somethingToShow && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].output,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Output__WEBPACK_IMPORTED_MODULE_6__["default"], {})
    })]
  });
};
const WebSocketStatus = () => {
  const enabled = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_7__.websocketFeatureFlagEnabled);
  const status = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_7__.websocketStatusSelector);
  if (!enabled) {
    return null;
  }
  const style = {
    position: 'absolute',
    left: '1em',
    bottom: '1em',
    zIndex: '1'
  };
  switch (status.state) {
    case 'connected':
      style.color = 'green';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        style: style,
        children: "\u2B24"
      });
    case 'disconnected':
      style.color = 'grey';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        style: style,
        children: "\u2B24"
      });
    case 'error':
      style.color = 'red';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        style: style,
        title: status.error,
        children: "\u2B24"
      });
  }
};
const Playground = () => {
  const showNotifications = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_7__.anyNotificationsToShowSelector);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: _Playground_module_css__WEBPACK_IMPORTED_MODULE_10__["default"].container,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(WebSocketStatus, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(ResizableArea, {})]
    }), showNotifications && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Notifications__WEBPACK_IMPORTED_MODULE_5__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playground);

/***/ }),

/***/ "./PopButton.tsx":
/*!***********************!*\
  !*** ./PopButton.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @floating-ui/react */ "./node_modules/@floating-ui/react/dist/floating-ui.react.esm.js");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @floating-ui/react */ "./node_modules/@floating-ui/core/dist/floating-ui.core.browser.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @floating-ui/react */ "./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @floating-ui/react */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PopButton_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopButton.module.css */ "./PopButton.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






const PopButton = _ref => {
  let {
    Button,
    Menu
  } = _ref;
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const toggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setIsOpen(v => !v), []);
  const close = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setIsOpen(false), []);
  const arrowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    x,
    y,
    refs,
    strategy,
    context
  } = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.useFloating)({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.offset)(10), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.flip)(), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.shift)(), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_5__.arrow)({
      element: arrowRef
    })],
    whileElementsMounted: _floating_ui_react__WEBPACK_IMPORTED_MODULE_6__.autoUpdate
  });
  const click = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.useClick)(context);
  const dismiss = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.useDismiss)(context);
  const role = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.useRole)(context);
  const {
    getReferenceProps,
    getFloatingProps
  } = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.useInteractions)([click, dismiss, role]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Button, _objectSpread({
      toggle: toggle,
      ref: refs.setReference
    }, getReferenceProps())), isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.FloatingFocusManager, {
      context: context,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", _objectSpread(_objectSpread({
        ref: refs.setFloating,
        className: _PopButton_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].container,
        style: {
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content'
        }
      }, getFloatingProps()), {}, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.FloatingArrow, {
          ref: arrowRef,
          context: context,
          height: 10,
          width: 20,
          fill: "white"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: _PopButton_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].content,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Menu, {
            close: close
          })
        })]
      }))
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopButton);

/***/ }),

/***/ "./Router.tsx":
/*!********************!*\
  !*** ./Router.tsx ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! history */ "./node_modules/history/index.js");
/* harmony import */ var _uss_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uss-router */ "./uss-router/index.ts");
/* harmony import */ var _uss_router_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uss-router/Router */ "./uss-router/Router.tsx");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var route_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! route-parser */ "./node_modules/route-parser/index.js");
/* harmony import */ var route_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(route_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }








const homeRoute = new (route_parser__WEBPACK_IMPORTED_MODULE_4___default())('/');
const helpRoute = new (route_parser__WEBPACK_IMPORTED_MODULE_4___default())('/help');
const stateSelector = _ref => {
  let {
    page,
    configuration: {
      channel,
      mode,
      edition
    },
    output
  } = _ref;
  return {
    page,
    configuration: {
      channel,
      mode,
      edition
    },
    output: {
      gist: {
        id: output.gist.id
      }
    }
  };
};
const stateToLocation = _ref2 => {
  let {
    page,
    configuration,
    output
  } = _ref2;
  switch (page) {
    case 'help':
      {
        return {
          pathname: '/help'
        };
      }
    default:
      {
        const query = {
          version: configuration.channel,
          mode: configuration.mode,
          edition: configuration.edition,
          gist: output.gist.id
        };
        return {
          pathname: `/?${qs__WEBPACK_IMPORTED_MODULE_3___default().stringify(query)}`
        };
      }
  }
};
const locationToAction = location => {
  const matchedHelp = helpRoute.match(location.pathname);
  if (matchedHelp) {
    return _actions__WEBPACK_IMPORTED_MODULE_5__.helpPageLoad();
  }
  const matched = homeRoute.match(location.pathname);
  if (matched) {
    return _actions__WEBPACK_IMPORTED_MODULE_5__.indexPageLoad(qs__WEBPACK_IMPORTED_MODULE_3___default().parse(location.search.slice(1)));
  }
  return null;
};
class Router extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props);
    _defineProperty(this, "router", void 0);
    const history = (0,history__WEBPACK_IMPORTED_MODULE_7__.createBrowserHistory)();
    const {
      store,
      reducer
    } = props;
    this.router = (0,_uss_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
      store,
      reducer,
      history,
      stateSelector,
      locationToAction,
      stateToLocation
    });
  }
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_uss_router_Router__WEBPACK_IMPORTED_MODULE_2__["default"], {
      router: this.router,
      children: this.props.children
    });
  }
}

/***/ }),

/***/ "./SegmentedButton.tsx":
/*!*****************************!*\
  !*** ./SegmentedButton.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SegmentedButton: () => (/* binding */ SegmentedButton),
/* harmony export */   SegmentedButtonSet: () => (/* binding */ SegmentedButtonSet),
/* harmony export */   SegmentedLink: () => (/* binding */ SegmentedLink)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _uss_router_Link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uss-router/Link */ "./uss-router/Link.tsx");
/* harmony import */ var _SegmentedButton_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SegmentedButton.module.css */ "./SegmentedButton.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["isBuild", "children"],
  _excluded2 = ["children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const SegmentedButtonSet = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: _SegmentedButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].container,
    children: children
  });
};
const SegmentedButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref2, ref) => {
  let {
      isBuild,
      children
    } = _ref2,
    props = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", _objectSpread(_objectSpread({
    ref: ref
  }, props), {}, {
    className: isBuild ? _SegmentedButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].buttonBuild : _SegmentedButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].button,
    children: children
  }));
});
SegmentedButton.displayName = 'SegmentedButton';
const SegmentedLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef((_ref3, ref) => {
  let {
      children
    } = _ref3,
    props = _objectWithoutProperties(_ref3, _excluded2);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_uss_router_Link__WEBPACK_IMPORTED_MODULE_1__["default"], _objectSpread(_objectSpread({
    ref: ref
  }, props), {}, {
    className: _SegmentedButton_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].button,
    children: children
  }));
});
SegmentedLink.displayName = 'SegmentedLink';

/***/ }),

/***/ "./SelectOne.tsx":
/*!***********************!*\
  !*** ./SelectOne.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SelectOne)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectableMenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectableMenuItem */ "./SelectableMenuItem.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class SelectOne extends (react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent) {
  render() {
    const {
      name,
      currentValue,
      thisValue,
      children,
      changeValue
    } = this.props;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_SelectableMenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
      name: name,
      selected: currentValue === thisValue,
      onClick: () => changeValue(thisValue),
      children: children
    });
  }
}

/***/ }),

/***/ "./SelectableMenuItem.tsx":
/*!********************************!*\
  !*** ./SelectableMenuItem.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./Icon.tsx");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuItem */ "./MenuItem.tsx");
/* harmony import */ var _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableMenuItem.module.css */ "./SelectableMenuItem.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["name", "selected", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






const SelectableMenuItem = _ref => {
  let {
      name,
      selected,
      children
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_MenuItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", _objectSpread(_objectSpread({
      className: selected ? _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].selected : _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].container
    }, props), {}, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].header,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          className: _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].checkmark,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__.CheckmarkIcon, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          className: _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].name,
          children: name
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: _SelectableMenuItem_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].description,
        children: children
      })]
    }))
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectableMenuItem);

/***/ }),

/***/ "./ToolsMenu.tsx":
/*!***********************!*\
  !*** ./ToolsMenu.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ButtonMenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ButtonMenuItem */ "./ButtonMenuItem.tsx");
/* harmony import */ var _MenuGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuGroup */ "./MenuGroup.tsx");
/* harmony import */ var _MenuAside__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuAside */ "./MenuAside.tsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./configureStore */ "./configureStore.ts");
/* harmony import */ var _reducers_output_format__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reducers/output/format */ "./reducers/output/format.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");











const ToolsMenu = props => {
  const rustfmtVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.rustfmtVersionText);
  const rustfmtVersionDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.rustfmtVersionDetailsText);
  const clippyVersionDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.clippyVersionDetailsText);
  const clippyVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.clippyVersionText);
  const miriVersionDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.miriVersionDetailsText);
  const miriVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.miriVersionText);
  const nightlyVersion = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.nightlyVersionText);
  const nightlyVersionDetails = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_5__.nightlyVersionDetailsText);
  const dispatch = (0,_configureStore__WEBPACK_IMPORTED_MODULE_7__.useAppDispatch)();
  const clippy = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch(_actions__WEBPACK_IMPORTED_MODULE_6__.performClippy());
    props.close();
  }, [dispatch, props]);
  const miri = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch(_actions__WEBPACK_IMPORTED_MODULE_6__.performMiri());
    props.close();
  }, [dispatch, props]);
  const format = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch((0,_reducers_output_format__WEBPACK_IMPORTED_MODULE_8__.performFormat)());
    props.close();
  }, [dispatch, props]);
  const expandMacros = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch(_actions__WEBPACK_IMPORTED_MODULE_6__.performMacroExpansion());
    props.close();
  }, [dispatch, props]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_MenuGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Tools",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "Rustfmt",
      onClick: format,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        children: "Format this code with Rustfmt."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_MenuAside__WEBPACK_IMPORTED_MODULE_4__["default"], {
        children: [rustfmtVersion, " (", rustfmtVersionDetails, ")"]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "Clippy",
      onClick: clippy,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        children: "Catch common mistakes and improve the code using the Clippy linter."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_MenuAside__WEBPACK_IMPORTED_MODULE_4__["default"], {
        children: [clippyVersion, " (", clippyVersionDetails, ")"]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "Miri",
      onClick: miri,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        children: "Execute this program in the Miri interpreter to detect certain cases of undefined behavior (like out-of-bounds memory access)."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_MenuAside__WEBPACK_IMPORTED_MODULE_4__["default"], {
        children: [miriVersion, " (", miriVersionDetails, ")"]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_ButtonMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "Expand macros",
      onClick: expandMacros,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        children: "Expand macros in code using the nightly compiler."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_MenuAside__WEBPACK_IMPORTED_MODULE_4__["default"], {
        children: [nightlyVersion, " (", nightlyVersionDetails, ")"]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolsMenu);

/***/ }),

/***/ "./actions.ts":
/*!********************!*\
  !*** ./actions.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionType: () => (/* binding */ ActionType),
/* harmony export */   adaptFetchError: () => (/* binding */ adaptFetchError),
/* harmony export */   addImport: () => (/* binding */ addImport),
/* harmony export */   addMainFunction: () => (/* binding */ addMainFunction),
/* harmony export */   browserWidthChanged: () => (/* binding */ browserWidthChanged),
/* harmony export */   changeAceTheme: () => (/* binding */ changeAceTheme),
/* harmony export */   changeAssemblyFlavor: () => (/* binding */ changeAssemblyFlavor),
/* harmony export */   changeBacktrace: () => (/* binding */ changeBacktrace),
/* harmony export */   changeChannel: () => (/* binding */ changeChannel),
/* harmony export */   changeDemangleAssembly: () => (/* binding */ changeDemangleAssembly),
/* harmony export */   changeEdition: () => (/* binding */ changeEdition),
/* harmony export */   changeEditor: () => (/* binding */ changeEditor),
/* harmony export */   changeFocus: () => (/* binding */ changeFocus),
/* harmony export */   changeKeybinding: () => (/* binding */ changeKeybinding),
/* harmony export */   changeMode: () => (/* binding */ changeMode),
/* harmony export */   changeMonacoTheme: () => (/* binding */ changeMonacoTheme),
/* harmony export */   changeOrientation: () => (/* binding */ changeOrientation),
/* harmony export */   changePairCharacters: () => (/* binding */ changePairCharacters),
/* harmony export */   changeProcessAssembly: () => (/* binding */ changeProcessAssembly),
/* harmony export */   disableSyncChangesToStorage: () => (/* binding */ disableSyncChangesToStorage),
/* harmony export */   editCode: () => (/* binding */ editCode),
/* harmony export */   enableFeatureGate: () => (/* binding */ enableFeatureGate),
/* harmony export */   gotoPosition: () => (/* binding */ gotoPosition),
/* harmony export */   helpPageLoad: () => (/* binding */ helpPageLoad),
/* harmony export */   indexPageLoad: () => (/* binding */ indexPageLoad),
/* harmony export */   initializeApplication: () => (/* binding */ initializeApplication),
/* harmony export */   jsonGet: () => (/* binding */ jsonGet),
/* harmony export */   jsonPost: () => (/* binding */ jsonPost),
/* harmony export */   navigateToHelp: () => (/* binding */ navigateToHelp),
/* harmony export */   navigateToIndex: () => (/* binding */ navigateToIndex),
/* harmony export */   performClippy: () => (/* binding */ performClippy),
/* harmony export */   performCompile: () => (/* binding */ performCompile),
/* harmony export */   performCompileToAssembly: () => (/* binding */ performCompileToAssembly),
/* harmony export */   performCompileToLLVM: () => (/* binding */ performCompileToLLVM),
/* harmony export */   performCompileToMir: () => (/* binding */ performCompileToMir),
/* harmony export */   performCompileToNightlyHir: () => (/* binding */ performCompileToNightlyHir),
/* harmony export */   performCompileToNightlyWasm: () => (/* binding */ performCompileToNightlyWasm),
/* harmony export */   performCratesLoad: () => (/* binding */ performCratesLoad),
/* harmony export */   performExecute: () => (/* binding */ performExecute),
/* harmony export */   performMacroExpansion: () => (/* binding */ performMacroExpansion),
/* harmony export */   performMiri: () => (/* binding */ performMiri),
/* harmony export */   performPrimaryAction: () => (/* binding */ performPrimaryAction),
/* harmony export */   performTest: () => (/* binding */ performTest),
/* harmony export */   performVersionsLoad: () => (/* binding */ performVersionsLoad),
/* harmony export */   reExecuteWithBacktrace: () => (/* binding */ reExecuteWithBacktrace),
/* harmony export */   routes: () => (/* binding */ routes),
/* harmony export */   seenRustSurvey2022: () => (/* binding */ seenRustSurvey2022),
/* harmony export */   selectText: () => (/* binding */ selectText),
/* harmony export */   showExample: () => (/* binding */ showExample),
/* harmony export */   splitRatioChanged: () => (/* binding */ splitRatioChanged)
/* harmony export */ });
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _reducers_output_execute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducers/output/execute */ "./reducers/output/execute.ts");
/* harmony import */ var _reducers_output_gist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers/output/gist */ "./reducers/output/gist.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





const routes = {
  compile: '/compile',
  execute: '/execute',
  format: '/format',
  clippy: '/clippy',
  miri: '/miri',
  macroExpansion: '/macro-expansion',
  meta: {
    crates: '/meta/crates',
    version: {
      stable: '/meta/version/stable',
      beta: '/meta/version/beta',
      nightly: '/meta/version/nightly',
      rustfmt: '/meta/version/rustfmt',
      clippy: '/meta/version/clippy',
      miri: '/meta/version/miri',
      java19: '/meta/version/java19_'
    },
    gistSave: '/meta/gist',
    gistLoad: '/meta/gist/id'
  }
};
const createAction = (type, props) => Object.assign({
  type
}, props);
var ActionType;
(function (ActionType) {
  ActionType["InitializeApplication"] = "INITIALIZE_APPLICATION";
  ActionType["DisableSyncChangesToStorage"] = "DISABLE_SYNC_CHANGES_TO_STORAGE";
  ActionType["SetPage"] = "SET_PAGE";
  ActionType["ChangeEditor"] = "CHANGE_EDITOR";
  ActionType["ChangeKeybinding"] = "CHANGE_KEYBINDING";
  ActionType["ChangeAceTheme"] = "CHANGE_ACE_THEME";
  ActionType["ChangeMonacoTheme"] = "CHANGE_MONACO_THEME";
  ActionType["ChangePairCharacters"] = "CHANGE_PAIR_CHARACTERS";
  ActionType["ChangeOrientation"] = "CHANGE_ORIENTATION";
  ActionType["ChangeAssemblyFlavor"] = "CHANGE_ASSEMBLY_FLAVOR";
  ActionType["ChangePrimaryAction"] = "CHANGE_PRIMARY_ACTION";
  ActionType["ChangeChannel"] = "CHANGE_CHANNEL";
  ActionType["ChangeDemangleAssembly"] = "CHANGE_DEMANGLE_ASSEMBLY";
  ActionType["ChangeProcessAssembly"] = "CHANGE_PROCESS_ASSEMBLY";
  ActionType["ChangeMode"] = "CHANGE_MODE";
  ActionType["ChangeEdition"] = "CHANGE_EDITION";
  ActionType["ChangeBacktrace"] = "CHANGE_BACKTRACE";
  ActionType["ChangeFocus"] = "CHANGE_FOCUS";
  ActionType["CompileAssemblyRequest"] = "COMPILE_ASSEMBLY_REQUEST";
  ActionType["CompileAssemblySucceeded"] = "COMPILE_ASSEMBLY_SUCCEEDED";
  ActionType["CompileAssemblyFailed"] = "COMPILE_ASSEMBLY_FAILED";
  ActionType["CompileLlvmIrRequest"] = "COMPILE_LLVM_IR_REQUEST";
  ActionType["CompileLlvmIrSucceeded"] = "COMPILE_LLVM_IR_SUCCEEDED";
  ActionType["CompileLlvmIrFailed"] = "COMPILE_LLVM_IR_FAILED";
  ActionType["CompileHirRequest"] = "COMPILE_HIR_REQUEST";
  ActionType["CompileHirSucceeded"] = "COMPILE_HIR_SUCCEEDED";
  ActionType["CompileHirFailed"] = "COMPILE_HIR_FAILED";
  ActionType["CompileMirRequest"] = "COMPILE_MIR_REQUEST";
  ActionType["CompileMirSucceeded"] = "COMPILE_MIR_SUCCEEDED";
  ActionType["CompileMirFailed"] = "COMPILE_MIR_FAILED";
  ActionType["CompileWasmRequest"] = "COMPILE_WASM_REQUEST";
  ActionType["CompileWasmSucceeded"] = "COMPILE_WASM_SUCCEEDED";
  ActionType["CompileWasmFailed"] = "COMPILE_WASM_FAILED";
  ActionType["EditCode"] = "EDIT_CODE";
  ActionType["AddMainFunction"] = "ADD_MAIN_FUNCTION";
  ActionType["AddImport"] = "ADD_IMPORT";
  ActionType["EnableFeatureGate"] = "ENABLE_FEATURE_GATE";
  ActionType["GotoPosition"] = "GOTO_POSITION";
  ActionType["SelectText"] = "SELECT_TEXT";
  ActionType["RequestClippy"] = "REQUEST_CLIPPY";
  ActionType["ClippySucceeded"] = "CLIPPY_SUCCEEDED";
  ActionType["ClippyFailed"] = "CLIPPY_FAILED";
  ActionType["RequestMiri"] = "REQUEST_MIRI";
  ActionType["MiriSucceeded"] = "MIRI_SUCCEEDED";
  ActionType["MiriFailed"] = "MIRI_FAILED";
  ActionType["RequestMacroExpansion"] = "REQUEST_MACRO_EXPANSION";
  ActionType["MacroExpansionSucceeded"] = "MACRO_EXPANSION_SUCCEEDED";
  ActionType["MacroExpansionFailed"] = "MACRO_EXPANSION_FAILED";
  ActionType["RequestCratesLoad"] = "REQUEST_CRATES_LOAD";
  ActionType["CratesLoadSucceeded"] = "CRATES_LOAD_SUCCEEDED";
  ActionType["RequestVersionsLoad"] = "REQUEST_VERSIONS_LOAD";
  ActionType["VersionsLoadSucceeded"] = "VERSIONS_LOAD_SUCCEEDED";
  ActionType["NotificationSeen"] = "NOTIFICATION_SEEN";
  ActionType["BrowserWidthChanged"] = "BROWSER_WIDTH_CHANGED";
  ActionType["SplitRatioChanged"] = "SPLIT_RATIO_CHANGED";
})(ActionType || (ActionType = {}));
const initializeApplication = () => createAction(ActionType.InitializeApplication);
const disableSyncChangesToStorage = () => createAction(ActionType.DisableSyncChangesToStorage);
const setPage = page => createAction(ActionType.SetPage, {
  page
});
const navigateToIndex = () => setPage('index');
const navigateToHelp = () => setPage('help');
const changeEditor = editor => createAction(ActionType.ChangeEditor, {
  editor
});
const changeKeybinding = keybinding => createAction(ActionType.ChangeKeybinding, {
  keybinding
});
const changeAceTheme = theme => createAction(ActionType.ChangeAceTheme, {
  theme
});
const changeMonacoTheme = theme => createAction(ActionType.ChangeMonacoTheme, {
  theme
});
const changePairCharacters = pairCharacters => createAction(ActionType.ChangePairCharacters, {
  pairCharacters
});
const changeOrientation = orientation => createAction(ActionType.ChangeOrientation, {
  orientation
});
const changeAssemblyFlavor = assemblyFlavor => createAction(ActionType.ChangeAssemblyFlavor, {
  assemblyFlavor
});
const changeDemangleAssembly = demangleAssembly => createAction(ActionType.ChangeDemangleAssembly, {
  demangleAssembly
});
const changeProcessAssembly = processAssembly => createAction(ActionType.ChangeProcessAssembly, {
  processAssembly
});
const changePrimaryAction = primaryAction => createAction(ActionType.ChangePrimaryAction, {
  primaryAction
});
const changeChannel = channel => createAction(ActionType.ChangeChannel, {
  channel
});
const changeMode = mode => createAction(ActionType.ChangeMode, {
  mode
});
const changeEdition = edition => createAction(ActionType.ChangeEdition, {
  edition
});
const changeBacktrace = backtrace => createAction(ActionType.ChangeBacktrace, {
  backtrace
});
const reExecuteWithBacktrace = () => dispatch => {
  dispatch(changeBacktrace(_types__WEBPACK_IMPORTED_MODULE_2__.Backtrace.Enabled));
  dispatch(performExecuteOnly());
};
const changeFocus = focus => createAction(ActionType.ChangeFocus, {
  focus
});
function jsonGet(url) {
  return fetchJson(url, {
    method: 'get'
  });
}
function jsonPost(url, body) {
  return fetchJson(url, {
    method: 'post',
    body: JSON.stringify(body)
  });
}
async function fetchJson(url, args) {
  const headers = new Headers(args.headers);
  headers.set('Content-Type', 'application/json');
  let response;
  try {
    response = await isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0___default()(url, _objectSpread(_objectSpread({}, args), {}, {
      headers
    }));
  } catch (networkError) {
    // e.g. server unreachable
    if (networkError instanceof Error) {
      throw {
        error: `Network error: ${networkError.toString()}`
      };
    } else {
      throw {
        error: 'Unknown error while fetching JSON'
      };
    }
  }
  let body;
  try {
    body = await response.json();
  } catch (convertError) {
    if (convertError instanceof Error) {
      throw {
        error: `Response was not JSON: ${convertError.toString()}`
      };
    } else {
      throw {
        error: 'Unknown error while converting JSON'
      };
    }
  }
  if (response.ok) {
    // HTTP 2xx
    return body;
  } else {
    // HTTP 4xx, 5xx (e.g. malformed JSON request)
    throw body;
  }
}
// We made some strange decisions with how the `fetchJson` function
// communicates errors, so we untwist those here to fit better with
// redux-toolkit's ideas.
const adaptFetchError = async cb => {
  let result;
  try {
    result = await cb();
  } catch (e) {
    if (e && typeof e === 'object' && 'error' in e && typeof e.error === 'string') {
      throw new Error(e.error);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
  if (result && typeof result === 'object' && 'error' in result && typeof result.error === 'string') {
    throw new Error(result.error);
  }
  return result;
};
function performAutoOnly() {
  return function (dispatch, getState) {
    const state = getState();
    const crateType = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.getCrateType)(state);
    const tests = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.runAsTest)(state);
    return dispatch((0,_reducers_output_execute__WEBPACK_IMPORTED_MODULE_3__.performCommonExecute)(crateType, tests));
  };
}
const performExecuteOnly = () => (0,_reducers_output_execute__WEBPACK_IMPORTED_MODULE_3__.performCommonExecute)('bin', false);
const performCompileOnly = () => (0,_reducers_output_execute__WEBPACK_IMPORTED_MODULE_3__.performCommonExecute)('lib', false);
const performTestOnly = () => (0,_reducers_output_execute__WEBPACK_IMPORTED_MODULE_3__.performCommonExecute)('lib', true);
function performCompileShow(target, _ref) {
  let {
    request,
    success,
    failure
  } = _ref;
  // TODO: Check a cache
  return function (dispatch, getState) {
    dispatch(request());
    const state = getState();
    const code = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.codeSelector)(state);
    const {
      configuration: {
        channel,
        mode,
        edition,
        assemblyFlavor,
        demangleAssembly,
        processAssembly
      }
    } = state;
    const crateType = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.getCrateType)(state);
    const tests = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.runAsTest)(state);
    const backtrace = state.configuration.backtrace === _types__WEBPACK_IMPORTED_MODULE_2__.Backtrace.Enabled;
    const body = {
      channel,
      mode,
      edition,
      crateType,
      tests,
      code,
      target,
      assemblyFlavor,
      demangleAssembly,
      processAssembly,
      backtrace
    };
    return jsonPost(routes.compile, body).then(json => dispatch(success(json))).catch(json => dispatch(failure(json)));
  };
}
const requestCompileAssembly = () => createAction(ActionType.CompileAssemblyRequest);
const receiveCompileAssemblySuccess = _ref2 => {
  let {
    code,
    stdout,
    stderr
  } = _ref2;
  return createAction(ActionType.CompileAssemblySucceeded, {
    code,
    stdout,
    stderr
  });
};
const receiveCompileAssemblyFailure = _ref3 => {
  let {
    error
  } = _ref3;
  return createAction(ActionType.CompileAssemblyFailed, {
    error
  });
};
const performCompileToAssemblyOnly = () => performCompileShow('asm', {
  request: requestCompileAssembly,
  success: receiveCompileAssemblySuccess,
  failure: receiveCompileAssemblyFailure
});
const requestCompileLlvmIr = () => createAction(ActionType.CompileLlvmIrRequest);
const receiveCompileLlvmIrSuccess = _ref4 => {
  let {
    code,
    stdout,
    stderr
  } = _ref4;
  return createAction(ActionType.CompileLlvmIrSucceeded, {
    code,
    stdout,
    stderr
  });
};
const receiveCompileLlvmIrFailure = _ref5 => {
  let {
    error
  } = _ref5;
  return createAction(ActionType.CompileLlvmIrFailed, {
    error
  });
};
const performCompileToLLVMOnly = () => performCompileShow('llvm-ir', {
  request: requestCompileLlvmIr,
  success: receiveCompileLlvmIrSuccess,
  failure: receiveCompileLlvmIrFailure
});
const requestCompileHir = () => createAction(ActionType.CompileHirRequest);
const receiveCompileHirSuccess = _ref6 => {
  let {
    code,
    stdout,
    stderr
  } = _ref6;
  return createAction(ActionType.CompileHirSucceeded, {
    code,
    stdout,
    stderr
  });
};
const receiveCompileHirFailure = _ref7 => {
  let {
    error
  } = _ref7;
  return createAction(ActionType.CompileHirFailed, {
    error
  });
};
const performCompileToHirOnly = () => performCompileShow('hir', {
  request: requestCompileHir,
  success: receiveCompileHirSuccess,
  failure: receiveCompileHirFailure
});
const performCompileToNightlyHirOnly = () => dispatch => {
  dispatch(changeChannel(_types__WEBPACK_IMPORTED_MODULE_2__.Channel.Nightly));
  dispatch(performCompileToHirOnly());
};
const requestCompileMir = () => createAction(ActionType.CompileMirRequest);
const receiveCompileMirSuccess = _ref8 => {
  let {
    code,
    stdout,
    stderr
  } = _ref8;
  return createAction(ActionType.CompileMirSucceeded, {
    code,
    stdout,
    stderr
  });
};
const receiveCompileMirFailure = _ref9 => {
  let {
    error
  } = _ref9;
  return createAction(ActionType.CompileMirFailed, {
    error
  });
};
const performCompileToMirOnly = () => performCompileShow('mir', {
  request: requestCompileMir,
  success: receiveCompileMirSuccess,
  failure: receiveCompileMirFailure
});
const requestCompileWasm = () => createAction(ActionType.CompileWasmRequest);
const receiveCompileWasmSuccess = _ref10 => {
  let {
    code,
    stdout,
    stderr
  } = _ref10;
  return createAction(ActionType.CompileWasmSucceeded, {
    code,
    stdout,
    stderr
  });
};
const receiveCompileWasmFailure = _ref11 => {
  let {
    error
  } = _ref11;
  return createAction(ActionType.CompileWasmFailed, {
    error
  });
};
const performCompileToWasm = () => performCompileShow('wasm', {
  request: requestCompileWasm,
  success: receiveCompileWasmSuccess,
  failure: receiveCompileWasmFailure
});
const performCompileToNightlyWasmOnly = () => dispatch => {
  dispatch(changeChannel(_types__WEBPACK_IMPORTED_MODULE_2__.Channel.Nightly));
  dispatch(performCompileToWasm());
};
const PRIMARY_ACTIONS = {
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Asm]: performCompileToAssemblyOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Compile]: performCompileOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Execute]: performExecuteOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Test]: performTestOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionAuto.Auto]: performAutoOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.LlvmIr]: performCompileToLLVMOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Hir]: performCompileToHirOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Mir]: performCompileToMirOnly,
  [_types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Wasm]: performCompileToNightlyWasmOnly
};
const performPrimaryAction = () => (dispatch, getState) => {
  const state = getState();
  const primaryAction = PRIMARY_ACTIONS[state.configuration.primaryAction];
  dispatch(primaryAction());
};
const performAndSwitchPrimaryAction = (inner, id) => () => dispatch => {
  dispatch(changePrimaryAction(id));
  dispatch(inner());
};
const performExecute = performAndSwitchPrimaryAction(performExecuteOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Execute);
const performCompile = performAndSwitchPrimaryAction(performCompileOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Compile);
const performTest = performAndSwitchPrimaryAction(performTestOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Test);
const performCompileToAssembly = performAndSwitchPrimaryAction(performCompileToAssemblyOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Asm);
const performCompileToLLVM = performAndSwitchPrimaryAction(performCompileToLLVMOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.LlvmIr);
const performCompileToMir = performAndSwitchPrimaryAction(performCompileToMirOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Mir);
const performCompileToNightlyHir = performAndSwitchPrimaryAction(performCompileToNightlyHirOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Hir);
const performCompileToNightlyWasm = performAndSwitchPrimaryAction(performCompileToNightlyWasmOnly, _types__WEBPACK_IMPORTED_MODULE_2__.PrimaryActionCore.Wasm);
const editCode = code => createAction(ActionType.EditCode, {
  code
});
const addMainFunction = () => createAction(ActionType.AddMainFunction);
const addImport = code => createAction(ActionType.AddImport, {
  code
});
const enableFeatureGate = featureGate => createAction(ActionType.EnableFeatureGate, {
  featureGate
});
const gotoPosition = (line, column) => createAction(ActionType.GotoPosition, (0,_types__WEBPACK_IMPORTED_MODULE_2__.makePosition)(line, column));
const selectText = (start, end) => createAction(ActionType.SelectText, {
  start,
  end
});
const requestClippy = () => createAction(ActionType.RequestClippy);
const receiveClippySuccess = _ref12 => {
  let {
    stdout,
    stderr
  } = _ref12;
  return createAction(ActionType.ClippySucceeded, {
    stdout,
    stderr
  });
};
const receiveClippyFailure = _ref13 => {
  let {
    error
  } = _ref13;
  return createAction(ActionType.ClippyFailed, {
    error
  });
};
function performClippy() {
  // TODO: Check a cache
  return function (dispatch, getState) {
    dispatch(requestClippy());
    const body = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.clippyRequestSelector)(getState());
    return jsonPost(routes.clippy, body).then(json => dispatch(receiveClippySuccess(json))).catch(json => dispatch(receiveClippyFailure(json)));
  };
}
const requestMiri = () => createAction(ActionType.RequestMiri);
const receiveMiriSuccess = _ref14 => {
  let {
    stdout,
    stderr
  } = _ref14;
  return createAction(ActionType.MiriSucceeded, {
    stdout,
    stderr
  });
};
const receiveMiriFailure = _ref15 => {
  let {
    error
  } = _ref15;
  return createAction(ActionType.MiriFailed, {
    error
  });
};
function performMiri() {
  // TODO: Check a cache
  return function (dispatch, getState) {
    dispatch(requestMiri());
    const state = getState();
    const code = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.codeSelector)(state);
    const {
      configuration: {
        edition
      }
    } = state;
    const body = {
      code,
      edition
    };
    return jsonPost(routes.miri, body).then(json => dispatch(receiveMiriSuccess(json))).catch(json => dispatch(receiveMiriFailure(json)));
  };
}
const requestMacroExpansion = () => createAction(ActionType.RequestMacroExpansion);
const receiveMacroExpansionSuccess = _ref16 => {
  let {
    stdout,
    stderr
  } = _ref16;
  return createAction(ActionType.MacroExpansionSucceeded, {
    stdout,
    stderr
  });
};
const receiveMacroExpansionFailure = _ref17 => {
  let {
    error
  } = _ref17;
  return createAction(ActionType.MacroExpansionFailed, {
    error
  });
};
function performMacroExpansion() {
  // TODO: Check a cache
  return function (dispatch, getState) {
    dispatch(requestMacroExpansion());
    const state = getState();
    const code = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.codeSelector)(state);
    const {
      configuration: {
        edition
      }
    } = state;
    const body = {
      code,
      edition
    };
    return jsonPost(routes.macroExpansion, body).then(json => dispatch(receiveMacroExpansionSuccess(json))).catch(json => dispatch(receiveMacroExpansionFailure(json)));
  };
}
const requestCratesLoad = () => createAction(ActionType.RequestCratesLoad);
const receiveCratesLoadSuccess = _ref18 => {
  let {
    crates
  } = _ref18;
  return createAction(ActionType.CratesLoadSucceeded, {
    crates
  });
};
function performCratesLoad() {
  return function (dispatch) {
    dispatch(requestCratesLoad());
    return jsonGet(routes.meta.crates).then(json => dispatch(receiveCratesLoadSuccess(json)));
    // TODO: Failure case
  };
}

const requestVersionsLoad = () => createAction(ActionType.RequestVersionsLoad);
const receiveVersionsLoadSuccess = _ref19 => {
  let {
    stable,
    beta,
    nightly,
    java19,
    rustfmt,
    clippy,
    miri
  } = _ref19;
  return createAction(ActionType.VersionsLoadSucceeded, {
    stable,
    beta,
    nightly,
    java19,
    rustfmt,
    clippy,
    miri
  });
};
function performVersionsLoad() {
  return function (dispatch) {
    dispatch(requestVersionsLoad());
    const stable = jsonGet(routes.meta.version.stable);
    const beta = jsonGet(routes.meta.version.beta);
    const nightly = jsonGet(routes.meta.version.nightly);
    const java19 = jsonGet(routes.meta.version.java19);
    const rustfmt = jsonGet(routes.meta.version.rustfmt);
    const clippy = jsonGet(routes.meta.version.clippy);
    const miri = jsonGet(routes.meta.version.miri);
    const all = Promise.all([stable, beta, nightly, java19, rustfmt, clippy, miri]);
    return all.then(_ref20 => {
      let [stable, beta, nightly, java19, rustfmt, clippy, miri] = _ref20;
      return dispatch(receiveVersionsLoadSuccess({
        stable,
        beta,
        nightly,
        java19,
        rustfmt,
        clippy,
        miri
      }));
    });
    // TODO: Failure case
  };
}

const notificationSeen = notification => createAction(ActionType.NotificationSeen, {
  notification
});
const seenRustSurvey2022 = () => notificationSeen(_types__WEBPACK_IMPORTED_MODULE_2__.Notification.RustSurvey2022);
const browserWidthChanged = isSmall => createAction(ActionType.BrowserWidthChanged, {
  isSmall
});
const splitRatioChanged = () => createAction(ActionType.SplitRatioChanged);
function parseChannel(s) {
  switch (s) {
    case 'stable':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Channel.Stable;
    case 'beta':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Channel.Beta;
    case 'nightly':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Channel.Nightly;
    default:
      return null;
  }
}
function parseMode(s) {
  switch (s) {
    case 'debug':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Mode.Debug;
    case 'release':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Mode.Release;
    default:
      return null;
  }
}
function parseEdition(s) {
  switch (s) {
    case '2015':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Edition.Rust2015;
    case '2018':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Edition.Rust2018;
    case '2021':
      return _types__WEBPACK_IMPORTED_MODULE_2__.Edition.Rust2021;
    default:
      return null;
  }
}
function indexPageLoad(_ref21) {
  let {
    code,
    gist,
    version,
    mode: modeString,
    edition: editionString
  } = _ref21;
  return function (dispatch) {
    const channel = parseChannel(version) || _types__WEBPACK_IMPORTED_MODULE_2__.Channel.Stable;
    const mode = parseMode(modeString) || _types__WEBPACK_IMPORTED_MODULE_2__.Mode.Debug;
    let maybeEdition = parseEdition(editionString);
    dispatch(navigateToIndex());
    if (code || gist) {
      // We need to ensure that any links that predate the existence
      // of editions will *forever* pick 2015. However, if we aren't
      // loading code, then allow the edition to remain the default.
      if (!maybeEdition) {
        maybeEdition = _types__WEBPACK_IMPORTED_MODULE_2__.Edition.Rust2015;
      }
    }
    const edition = maybeEdition || _types__WEBPACK_IMPORTED_MODULE_2__.Edition.Rust2021;
    if (code) {
      dispatch(editCode(code));
    } else if (gist) {
      dispatch((0,_reducers_output_gist__WEBPACK_IMPORTED_MODULE_4__.performGistLoad)({
        id: gist,
        channel,
        mode,
        edition
      }));
    }
    dispatch(changeChannel(channel));
    dispatch(changeMode(mode));
    dispatch(changeEdition(edition));
  };
}
function helpPageLoad() {
  return navigateToHelp();
}
function showExample(code) {
  return function (dispatch) {
    dispatch(navigateToIndex());
    dispatch(editCode(code));
  };
}

/***/ }),

/***/ "./configureStore.ts":
/*!***************************!*\
  !*** ./configureStore.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ configureStore),
/* harmony export */   useAppDispatch: () => (/* binding */ useAppDispatch)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/merge.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local_storage */ "./local_storage.ts");
/* harmony import */ var _session_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./session_storage */ "./session_storage.ts");
/* harmony import */ var _websocketMiddleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./websocketMiddleware */ "./websocketMiddleware.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reducers */ "./reducers/index.ts");









function configureStore(window) {
  const baseUrl = new URL('/', window.location.href).href;
  const websocket = (0,_websocketMiddleware__WEBPACK_IMPORTED_MODULE_4__.websocketMiddleware)(window);
  const initialGlobalState = {
    globalConfiguration: {
      baseUrl
    }
  };
  const initialAppState = (0,_reducers__WEBPACK_IMPORTED_MODULE_5__["default"])(undefined, (0,_actions__WEBPACK_IMPORTED_MODULE_1__.initializeApplication)());
  const localStorage = (0,_local_storage__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const sessionStorage = (0,_session_storage__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const preloadedState = (0,immer__WEBPACK_IMPORTED_MODULE_6__.produce)(initialAppState, initialAppState => (0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(initialAppState, initialGlobalState, localStorage.initialState, sessionStorage.initialState));
  const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__.configureStore)({
    reducer: _reducers__WEBPACK_IMPORTED_MODULE_5__["default"],
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(websocket)
  });
  store.subscribe(() => {
    const state = store.getState();
    // Some automated tests run fast enough that the following interleaving is possible:
    //
    // 1. RSpec test finishes, local/session storage cleared
    // 2. WebSocket connects, the state updates, and the local/session storage is saved
    // 3. Subsequent RSpec test starts and local/session storage has been preserved
    //
    // We allow the tests to stop saving to sidestep that.
    if (state.globalConfiguration.syncChangesToStorage) {
      localStorage.saveChanges(state);
      sessionStorage.saveChanges(state);
    }
  });
  return store;
}
const useAppDispatch = () => (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();

/***/ }),

/***/ "./editor/AceEditor.tsx":
/*!******************************!*\
  !*** ./editor/AceEditor.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var suspend_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! suspend-react */ "./node_modules/suspend-react/index.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../selectors */ "./selectors/index.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







const AceEditorDependencies = _ref => {
  let {
    keybinding,
    theme
  } = _ref;
  (0,suspend_react__WEBPACK_IMPORTED_MODULE_4__.suspend)(async (keybinding, theme) => {
    const {
      importKeybinding,
      importTheme
    } = await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_ace-builds_src-noconflict_ace_js-node_modules_ace-builds_src-noconflict_-bbd52e"), __webpack_require__.e("editor_AceEditorCore_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./AceEditorCore */ "./editor/AceEditorCore.tsx"));
    await Promise.allSettled([importKeybinding(keybinding), importTheme(theme)]);
  }, [keybinding, theme, 'AceEditorDependencies']);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {});
};
const AceEditorLazy = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_ace-builds_src-noconflict_ace_js-node_modules_ace-builds_src-noconflict_-bbd52e"), __webpack_require__.e("editor_AceEditorCore_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./AceEditorCore */ "./editor/AceEditorCore.tsx")));
// The ACE editor weighs in at ~250K. Adding all of the themes and the
// (surprisingly chunky) keybindings, it's not that far off from 500K!
//
// To give better initial load performance, we split the editor into a
// separate chunk. As you usually only want one of each theme and
// keybinding, they can also be split, reducing the total size
// transferred.
//
// This also has some benefit if you choose to use the simple editor,
// as ACE should never be loaded.
//
// Themes and keybindings can be changed at runtime.
const AceEditorAsync = props => {
  const resizeKey = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_2__.aceResizeKey);
  const autocompleteOnUse = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_2__.offerCrateAutocompleteOnUse);
  const keybinding = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_2__.aceKeybinding);
  const pairCharacters = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_2__.acePairCharacters);
  const theme = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_2__.aceTheme);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: 'Loading the ACE editor...',
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(AceEditorDependencies, {
      keybinding: keybinding,
      theme: theme
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(AceEditorLazy, _objectSpread(_objectSpread({}, props), {}, {
      autocompleteOnUse: autocompleteOnUse,
      keybinding: keybinding,
      pairCharacters: pairCharacters,
      resizeKey: resizeKey,
      theme: theme
    }))]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AceEditorAsync);

/***/ }),

/***/ "./editor/Editor.tsx":
/*!***************************!*\
  !*** ./editor/Editor.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./actions.ts");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../configureStore */ "./configureStore.ts");
/* harmony import */ var _AceEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AceEditor */ "./editor/AceEditor.tsx");
/* harmony import */ var _SimpleEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SimpleEditor */ "./editor/SimpleEditor.tsx");
/* harmony import */ var _MonacoEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MonacoEditor */ "./editor/MonacoEditor.tsx");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../types */ "./types.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../selectors */ "./selectors/index.ts");
/* harmony import */ var _Editor_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Editor.module.css */ "./editor/Editor.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");











const editorMap = {
  [_types__WEBPACK_IMPORTED_MODULE_7__.Editor.Simple]: _SimpleEditor__WEBPACK_IMPORTED_MODULE_5__["default"],
  [_types__WEBPACK_IMPORTED_MODULE_7__.Editor.Ace]: _AceEditor__WEBPACK_IMPORTED_MODULE_4__["default"],
  [_types__WEBPACK_IMPORTED_MODULE_7__.Editor.Monaco]: _MonacoEditor__WEBPACK_IMPORTED_MODULE_6__["default"]
};
const Editor = () => {
  const code = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_8__.codeSelector);
  const editor = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.configuration.editor);
  const position = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_8__.positionSelector);
  const selection = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(_selectors__WEBPACK_IMPORTED_MODULE_8__.selectionSelector);
  const crates = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.crates);
  const dispatch = (0,_configureStore__WEBPACK_IMPORTED_MODULE_3__.useAppDispatch)();
  const execute = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.performPrimaryAction()), [dispatch]);
  const onEditCode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(c => dispatch(_actions__WEBPACK_IMPORTED_MODULE_2__.editCode(c)), [dispatch]);
  const SelectedEditor = editorMap[editor];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_9__["default"].container,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(SelectedEditor, {
      code: code,
      position: position,
      selection: selection,
      crates: crates,
      onEditCode: onEditCode,
      execute: execute
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

/***/ }),

/***/ "./editor/MonacoEditor.tsx":
/*!*********************************!*\
  !*** ./editor/MonacoEditor.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


const MonacoEditorLazy = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-monaco-editor_lib_index_js"), __webpack_require__.e("editor_MonacoEditorCore_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./MonacoEditorCore */ "./editor/MonacoEditorCore.tsx")));
const MonacoEditor = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
  fallback: 'Loading',
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MonacoEditorLazy, _objectSpread({}, props))
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MonacoEditor);

/***/ }),

/***/ "./editor/SimpleEditor.tsx":
/*!*********************************!*\
  !*** ./editor/SimpleEditor.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/isEqual.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor.module.css */ "./editor/Editor.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class CodeByteOffsets {
  constructor(code) {
    _defineProperty(this, "code", void 0);
    _defineProperty(this, "lines", void 0);
    this.code = code;
    this.lines = code.split('\n');
  }
  lineToOffsets(line) {
    const precedingBytes = this.bytesBeforeLine(line);
    const highlightedLine = this.lines[line];
    const highlightedBytes = highlightedLine.length;
    return [precedingBytes, precedingBytes + highlightedBytes];
  }
  rangeToOffsets(start, end) {
    const startBytes = this.positionToBytes(start);
    const endBytes = this.positionToBytes(end);
    return [startBytes, endBytes];
  }
  positionToBytes(position) {
    // Subtract one as this logic is zero-based and the columns are one-based
    return this.bytesBeforeLine(position.line) + position.column - 1;
  }
  bytesBeforeLine(line) {
    // Subtract one as this logic is zero-based and the lines are one-based
    line -= 1;
    const precedingLines = this.lines.slice(0, line);
    // Add one to account for the newline we split on and removed
    return precedingLines.map(l => l.length + 1).reduce((a, b) => a + b);
  }
}
class SimpleEditor extends (react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent) {
  constructor() {
    super(...arguments);
    _defineProperty(this, "_editor", null);
    _defineProperty(this, "onChange", e => this.props.onEditCode(e.target.value));
    _defineProperty(this, "trackEditor", component => this._editor = component);
    _defineProperty(this, "onKeyDown", e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        this.props.execute();
      }
    });
  }
  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("textarea", {
      ref: this.trackEditor,
      className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].simple,
      name: "editor-simple",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: false,
      value: this.props.code,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    });
  }
  componentDidUpdate(prevProps) {
    this.gotoPosition(prevProps.position, this.props.position);
    this.setSelection(prevProps.selection, this.props.selection);
  }
  gotoPosition(oldPosition, newPosition) {
    const editor = this._editor;
    if (!newPosition || !editor) {
      return;
    }
    if ((0,lodash_es__WEBPACK_IMPORTED_MODULE_3__["default"])(newPosition, oldPosition)) {
      return;
    }
    const offsets = new CodeByteOffsets(this.props.code);
    const [startBytes, endBytes] = offsets.lineToOffsets(newPosition.line);
    editor.focus();
    editor.setSelectionRange(startBytes, endBytes);
  }
  setSelection(oldSelection, newSelection) {
    const editor = this._editor;
    if (!newSelection || !newSelection.start || !newSelection.end || !editor) {
      return;
    }
    if ((0,lodash_es__WEBPACK_IMPORTED_MODULE_3__["default"])(newSelection, oldSelection)) {
      return;
    }
    const offsets = new CodeByteOffsets(this.props.code);
    const [startBytes, endBytes] = offsets.rangeToOffsets(newSelection.start, newSelection.end);
    editor.focus();
    editor.setSelectionRange(startBytes, endBytes);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimpleEditor);

/***/ }),

/***/ "./highlighting.ts":
/*!*************************!*\
  !*** ./highlighting.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configureRustErrors: () => (/* binding */ configureRustErrors)
/* harmony export */ });
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./types.ts");


function configureRustErrors(_ref) {
  let {
    enableFeatureGate,
    getChannel,
    gotoPosition,
    selectText,
    addImport,
    reExecuteWithBacktrace
  } = _ref;
  (prismjs__WEBPACK_IMPORTED_MODULE_0___default().languages).rust_errors = {
    'warning': {
      pattern: /^warning(\[E\d+\])?:.*$/m,
      inside: {
        'error-explanation': /\[E\d+\]/
      }
    },
    'error': {
      pattern: /^error(\[E\d+\])?:.*$/m,
      inside: {
        'error-explanation': /\[E\d+\]/
      }
    },
    'note': {
      pattern: /^\s*=\s*note:.*$/m,
      inside: {
        'see-issue': /see .*rust-lang\/rust\/issues\/\d+>/
      }
    },
    'error-location': /-->\s+(\/playground\/)?src\/.*\n/,
    'import-suggestion-outer': {
      pattern: /\+\s+use\s+([^;]+);/,
      inside: {
        'import-suggestion': /use\s+.*/
      }
    },
    'rust-errors-help': {
      pattern: /help:.*\n/,
      inside: {
        'feature-gate': /add `#\!\[feature\(.+?\)\]`/
      }
    },
    'backtrace': {
      pattern: /at \.\/src\/.*\n/,
      inside: {
        'backtrace-location': /src\/main.rs:(\d+)/
      }
    },
    'backtrace-enable': /Run with `RUST_BACKTRACE=1` environment variable to display a backtrace/i
  };
  (prismjs__WEBPACK_IMPORTED_MODULE_0___default().languages).rust_mir = {
    'mir-source': /src\/[A-Za-z0-9_.\-]+\.rs:\d+:\d+: \d+:\d+/
  };
  prismjs__WEBPACK_IMPORTED_MODULE_0___default().hooks.add('wrap', env => {
    if (env.type === 'error-explanation') {
      const errorMatch = /E\d+/.exec(env.content);
      if (errorMatch) {
        const [errorCode] = errorMatch;
        env.tag = 'a';
        env.attributes.href = `https://doc.rust-lang.org/${getChannel()}/error_codes/${errorCode}.html`;
        env.attributes.target = '_blank';
      }
    }
    if (env.type === 'see-issue') {
      const errorMatch = /\d+/.exec(env.content);
      if (errorMatch) {
        const [errorCode] = errorMatch;
        env.tag = 'a';
        env.attributes.href = `https://github.com/rust-lang/rust/issues/${errorCode}`;
        env.attributes.target = '_blank';
      }
    }
    if (env.type === 'error-location') {
      let line;
      let col;
      const errorMatchFull = /(\d+):(\d+)/.exec(env.content);
      if (errorMatchFull) {
        line = errorMatchFull[1];
        col = errorMatchFull[2];
      } else {
        const errorMatchShort = /:(\d+)/.exec(env.content);
        if (errorMatchShort) {
          line = errorMatchShort[1];
          col = '1';
        }
      }
      env.tag = 'a';
      env.attributes.href = '#';
      if (line && col) {
        env.attributes['data-line'] = line;
        env.attributes['data-col'] = col;
      }
    }
    if (env.type === 'import-suggestion') {
      env.tag = 'a';
      env.attributes.href = '#';
      env.attributes['data-suggestion'] = env.content;
    }
    if (env.type === 'feature-gate') {
      const featureMatch = /feature\((.*?)\)/.exec(env.content);
      if (featureMatch) {
        const [_, featureGate] = featureMatch;
        env.tag = 'a';
        env.attributes.href = '#';
        env.attributes['data-feature-gate'] = featureGate;
      }
    }
    if (env.type === 'backtrace-enable') {
      env.tag = 'a';
      env.attributes.href = '#';
      env.attributes['data-backtrace-enable'] = 'true';
    }
    if (env.type === 'backtrace-location') {
      const errorMatch = /:(\d+)/.exec(env.content);
      if (errorMatch) {
        const [_, line] = errorMatch;
        env.tag = 'a';
        env.attributes.href = '#';
        env.attributes['data-line'] = line;
        env.attributes['data-col'] = '1';
      }
    }
    if (env.type === 'mir-source') {
      const lineMatch = /(\d+):(\d+): (\d+):(\d+)/.exec(env.content);
      if (lineMatch) {
        const [_, startLine, startCol, endLine, endCol] = lineMatch;
        env.tag = 'a';
        env.attributes.href = '#';
        env.attributes['data-start-line'] = startLine;
        env.attributes['data-start-col'] = startCol;
        env.attributes['data-end-line'] = endLine;
        env.attributes['data-end-col'] = endCol;
      }
    }
  });
  prismjs__WEBPACK_IMPORTED_MODULE_0___default().hooks.add('after-highlight', env => {
    const links = env.element.querySelectorAll('.error-location, .backtrace-location');
    Array.from(links).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        const {
          line,
          col
        } = link.dataset;
        link.onclick = e => {
          e.preventDefault();
          if (line && col) {
            gotoPosition(line, col);
          }
        };
      }
    });
    const importSuggestions = env.element.querySelectorAll('.import-suggestion');
    Array.from(importSuggestions).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        const {
          suggestion
        } = link.dataset;
        link.onclick = e => {
          e.preventDefault();
          addImport(suggestion + '\n');
        };
      }
    });
    const featureGateEnablers = env.element.querySelectorAll('.feature-gate');
    Array.from(featureGateEnablers).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        link.onclick = e => {
          e.preventDefault();
          if (link.dataset.featureGate) {
            enableFeatureGate(link.dataset.featureGate);
            gotoPosition(1, 1);
          }
        };
      }
    });
    const backtraceEnablers = env.element.querySelectorAll('.backtrace-enable');
    Array.from(backtraceEnablers).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        link.onclick = e => {
          e.preventDefault();
          reExecuteWithBacktrace();
        };
      }
    });
    const mirSourceLinks = env.element.querySelectorAll('.mir-source');
    Array.from(mirSourceLinks).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        const {
          startLine,
          startCol,
          endLine,
          endCol
        } = link.dataset;
        if (startLine && startCol && endLine && endCol) {
          const start = (0,_types__WEBPACK_IMPORTED_MODULE_1__.makePosition)(startLine, startCol);
          const end = (0,_types__WEBPACK_IMPORTED_MODULE_1__.makePosition)(endLine, endCol);
          link.onclick = e => {
            e.preventDefault();
            selectText(start, end);
          };
        }
      }
    });
  });
}

/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_esnext_array_last_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.array.last-index.js */ "./node_modules/core-js/modules/esnext.array.last-index.js");
/* harmony import */ var core_js_modules_esnext_array_last_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_array_last_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_array_last_item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/esnext.array.last-item.js */ "./node_modules/core-js/modules/esnext.array.last-item.js");
/* harmony import */ var core_js_modules_esnext_array_last_item_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_array_last_item_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_composite_key_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/esnext.composite-key.js */ "./node_modules/core-js/modules/esnext.composite-key.js");
/* harmony import */ var core_js_modules_esnext_composite_key_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_composite_key_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_composite_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/esnext.composite-symbol.js */ "./node_modules/core-js/modules/esnext.composite-symbol.js");
/* harmony import */ var core_js_modules_esnext_composite_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_composite_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/esnext.map.delete-all.js */ "./node_modules/core-js/modules/esnext.map.delete-all.js");
/* harmony import */ var core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_delete_all_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/esnext.map.every.js */ "./node_modules/core-js/modules/esnext.map.every.js");
/* harmony import */ var core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_every_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/esnext.map.filter.js */ "./node_modules/core-js/modules/esnext.map.filter.js");
/* harmony import */ var core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_filter_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/esnext.map.find.js */ "./node_modules/core-js/modules/esnext.map.find.js");
/* harmony import */ var core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/esnext.map.find-key.js */ "./node_modules/core-js/modules/esnext.map.find-key.js");
/* harmony import */ var core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_find_key_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_esnext_map_from_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/esnext.map.from.js */ "./node_modules/core-js/modules/esnext.map.from.js");
/* harmony import */ var core_js_modules_esnext_map_from_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_from_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_esnext_map_group_by_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/esnext.map.group-by.js */ "./node_modules/core-js/modules/esnext.map.group-by.js");
/* harmony import */ var core_js_modules_esnext_map_group_by_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_group_by_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/esnext.map.includes.js */ "./node_modules/core-js/modules/esnext.map.includes.js");
/* harmony import */ var core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_includes_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_esnext_map_key_by_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/esnext.map.key-by.js */ "./node_modules/core-js/modules/esnext.map.key-by.js");
/* harmony import */ var core_js_modules_esnext_map_key_by_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_by_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/esnext.map.key-of.js */ "./node_modules/core-js/modules/esnext.map.key-of.js");
/* harmony import */ var core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_key_of_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/esnext.map.map-keys.js */ "./node_modules/core-js/modules/esnext.map.map-keys.js");
/* harmony import */ var core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_keys_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/esnext.map.map-values.js */ "./node_modules/core-js/modules/esnext.map.map-values.js");
/* harmony import */ var core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_map_values_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/esnext.map.merge.js */ "./node_modules/core-js/modules/esnext.map.merge.js");
/* harmony import */ var core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_merge_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_esnext_map_of_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/esnext.map.of.js */ "./node_modules/core-js/modules/esnext.map.of.js");
/* harmony import */ var core_js_modules_esnext_map_of_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_of_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/esnext.map.reduce.js */ "./node_modules/core-js/modules/esnext.map.reduce.js");
/* harmony import */ var core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_reduce_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/esnext.map.some.js */ "./node_modules/core-js/modules/esnext.map.some.js");
/* harmony import */ var core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_some_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/esnext.map.update.js */ "./node_modules/core-js/modules/esnext.map.update.js");
/* harmony import */ var core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_map_update_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_esnext_math_clamp_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/esnext.math.clamp.js */ "./node_modules/core-js/modules/esnext.math.clamp.js");
/* harmony import */ var core_js_modules_esnext_math_clamp_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_clamp_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_esnext_math_deg_per_rad_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/esnext.math.deg-per-rad.js */ "./node_modules/core-js/modules/esnext.math.deg-per-rad.js");
/* harmony import */ var core_js_modules_esnext_math_deg_per_rad_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_deg_per_rad_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_esnext_math_degrees_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/esnext.math.degrees.js */ "./node_modules/core-js/modules/esnext.math.degrees.js");
/* harmony import */ var core_js_modules_esnext_math_degrees_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_degrees_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_esnext_math_fscale_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/esnext.math.fscale.js */ "./node_modules/core-js/modules/esnext.math.fscale.js");
/* harmony import */ var core_js_modules_esnext_math_fscale_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_fscale_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_esnext_math_iaddh_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/esnext.math.iaddh.js */ "./node_modules/core-js/modules/esnext.math.iaddh.js");
/* harmony import */ var core_js_modules_esnext_math_iaddh_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_iaddh_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_esnext_math_imulh_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/esnext.math.imulh.js */ "./node_modules/core-js/modules/esnext.math.imulh.js");
/* harmony import */ var core_js_modules_esnext_math_imulh_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_imulh_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_esnext_math_isubh_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/esnext.math.isubh.js */ "./node_modules/core-js/modules/esnext.math.isubh.js");
/* harmony import */ var core_js_modules_esnext_math_isubh_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_isubh_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_esnext_math_rad_per_deg_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/esnext.math.rad-per-deg.js */ "./node_modules/core-js/modules/esnext.math.rad-per-deg.js");
/* harmony import */ var core_js_modules_esnext_math_rad_per_deg_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_rad_per_deg_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_esnext_math_radians_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/esnext.math.radians.js */ "./node_modules/core-js/modules/esnext.math.radians.js");
/* harmony import */ var core_js_modules_esnext_math_radians_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_radians_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_esnext_math_scale_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/esnext.math.scale.js */ "./node_modules/core-js/modules/esnext.math.scale.js");
/* harmony import */ var core_js_modules_esnext_math_scale_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_scale_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_esnext_math_seeded_prng_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/esnext.math.seeded-prng.js */ "./node_modules/core-js/modules/esnext.math.seeded-prng.js");
/* harmony import */ var core_js_modules_esnext_math_seeded_prng_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_seeded_prng_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_esnext_math_signbit_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/esnext.math.signbit.js */ "./node_modules/core-js/modules/esnext.math.signbit.js");
/* harmony import */ var core_js_modules_esnext_math_signbit_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_signbit_js__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_esnext_math_umulh_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/esnext.math.umulh.js */ "./node_modules/core-js/modules/esnext.math.umulh.js");
/* harmony import */ var core_js_modules_esnext_math_umulh_js__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_math_umulh_js__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var core_js_modules_esnext_number_from_string_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! core-js/modules/esnext.number.from-string.js */ "./node_modules/core-js/modules/esnext.number.from-string.js");
/* harmony import */ var core_js_modules_esnext_number_from_string_js__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_number_from_string_js__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var core_js_modules_esnext_observable_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! core-js/modules/esnext.observable.js */ "./node_modules/core-js/modules/esnext.observable.js");
/* harmony import */ var core_js_modules_esnext_observable_js__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_observable_js__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var core_js_modules_esnext_promise_try_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! core-js/modules/esnext.promise.try.js */ "./node_modules/core-js/modules/esnext.promise.try.js");
/* harmony import */ var core_js_modules_esnext_promise_try_js__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_promise_try_js__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var core_js_modules_esnext_reflect_define_metadata_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! core-js/modules/esnext.reflect.define-metadata.js */ "./node_modules/core-js/modules/esnext.reflect.define-metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_define_metadata_js__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_define_metadata_js__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var core_js_modules_esnext_reflect_delete_metadata_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! core-js/modules/esnext.reflect.delete-metadata.js */ "./node_modules/core-js/modules/esnext.reflect.delete-metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_delete_metadata_js__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_delete_metadata_js__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var core_js_modules_esnext_reflect_get_metadata_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-metadata.js */ "./node_modules/core-js/modules/esnext.reflect.get-metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_get_metadata_js__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_metadata_js__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var core_js_modules_esnext_reflect_get_metadata_keys_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-metadata-keys.js */ "./node_modules/core-js/modules/esnext.reflect.get-metadata-keys.js");
/* harmony import */ var core_js_modules_esnext_reflect_get_metadata_keys_js__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_metadata_keys_js__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-own-metadata.js */ "./node_modules/core-js/modules/esnext.reflect.get-own-metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata_js__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_own_metadata_js__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata_keys_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! core-js/modules/esnext.reflect.get-own-metadata-keys.js */ "./node_modules/core-js/modules/esnext.reflect.get-own-metadata-keys.js");
/* harmony import */ var core_js_modules_esnext_reflect_get_own_metadata_keys_js__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_get_own_metadata_keys_js__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var core_js_modules_esnext_reflect_has_metadata_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! core-js/modules/esnext.reflect.has-metadata.js */ "./node_modules/core-js/modules/esnext.reflect.has-metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_has_metadata_js__WEBPACK_IMPORTED_MODULE_43___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_has_metadata_js__WEBPACK_IMPORTED_MODULE_43__);
/* harmony import */ var core_js_modules_esnext_reflect_has_own_metadata_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! core-js/modules/esnext.reflect.has-own-metadata.js */ "./node_modules/core-js/modules/esnext.reflect.has-own-metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_has_own_metadata_js__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_has_own_metadata_js__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var core_js_modules_esnext_reflect_metadata_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! core-js/modules/esnext.reflect.metadata.js */ "./node_modules/core-js/modules/esnext.reflect.metadata.js");
/* harmony import */ var core_js_modules_esnext_reflect_metadata_js__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_reflect_metadata_js__WEBPACK_IMPORTED_MODULE_45__);
/* harmony import */ var core_js_modules_esnext_set_add_all_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! core-js/modules/esnext.set.add-all.js */ "./node_modules/core-js/modules/esnext.set.add-all.js");
/* harmony import */ var core_js_modules_esnext_set_add_all_js__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_add_all_js__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var core_js_modules_esnext_set_delete_all_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! core-js/modules/esnext.set.delete-all.js */ "./node_modules/core-js/modules/esnext.set.delete-all.js");
/* harmony import */ var core_js_modules_esnext_set_delete_all_js__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_delete_all_js__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var core_js_modules_esnext_set_difference_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! core-js/modules/esnext.set.difference.js */ "./node_modules/core-js/modules/esnext.set.difference.js");
/* harmony import */ var core_js_modules_esnext_set_difference_js__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_difference_js__WEBPACK_IMPORTED_MODULE_48__);
/* harmony import */ var core_js_modules_esnext_set_every_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! core-js/modules/esnext.set.every.js */ "./node_modules/core-js/modules/esnext.set.every.js");
/* harmony import */ var core_js_modules_esnext_set_every_js__WEBPACK_IMPORTED_MODULE_49___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_every_js__WEBPACK_IMPORTED_MODULE_49__);
/* harmony import */ var core_js_modules_esnext_set_filter_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! core-js/modules/esnext.set.filter.js */ "./node_modules/core-js/modules/esnext.set.filter.js");
/* harmony import */ var core_js_modules_esnext_set_filter_js__WEBPACK_IMPORTED_MODULE_50___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_filter_js__WEBPACK_IMPORTED_MODULE_50__);
/* harmony import */ var core_js_modules_esnext_set_find_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! core-js/modules/esnext.set.find.js */ "./node_modules/core-js/modules/esnext.set.find.js");
/* harmony import */ var core_js_modules_esnext_set_find_js__WEBPACK_IMPORTED_MODULE_51___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_find_js__WEBPACK_IMPORTED_MODULE_51__);
/* harmony import */ var core_js_modules_esnext_set_from_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! core-js/modules/esnext.set.from.js */ "./node_modules/core-js/modules/esnext.set.from.js");
/* harmony import */ var core_js_modules_esnext_set_from_js__WEBPACK_IMPORTED_MODULE_52___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_from_js__WEBPACK_IMPORTED_MODULE_52__);
/* harmony import */ var core_js_modules_esnext_set_intersection_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! core-js/modules/esnext.set.intersection.js */ "./node_modules/core-js/modules/esnext.set.intersection.js");
/* harmony import */ var core_js_modules_esnext_set_intersection_js__WEBPACK_IMPORTED_MODULE_53___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_intersection_js__WEBPACK_IMPORTED_MODULE_53__);
/* harmony import */ var core_js_modules_esnext_set_is_disjoint_from_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! core-js/modules/esnext.set.is-disjoint-from.js */ "./node_modules/core-js/modules/esnext.set.is-disjoint-from.js");
/* harmony import */ var core_js_modules_esnext_set_is_disjoint_from_js__WEBPACK_IMPORTED_MODULE_54___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_disjoint_from_js__WEBPACK_IMPORTED_MODULE_54__);
/* harmony import */ var core_js_modules_esnext_set_is_subset_of_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! core-js/modules/esnext.set.is-subset-of.js */ "./node_modules/core-js/modules/esnext.set.is-subset-of.js");
/* harmony import */ var core_js_modules_esnext_set_is_subset_of_js__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_subset_of_js__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var core_js_modules_esnext_set_is_superset_of_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! core-js/modules/esnext.set.is-superset-of.js */ "./node_modules/core-js/modules/esnext.set.is-superset-of.js");
/* harmony import */ var core_js_modules_esnext_set_is_superset_of_js__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_is_superset_of_js__WEBPACK_IMPORTED_MODULE_56__);
/* harmony import */ var core_js_modules_esnext_set_join_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! core-js/modules/esnext.set.join.js */ "./node_modules/core-js/modules/esnext.set.join.js");
/* harmony import */ var core_js_modules_esnext_set_join_js__WEBPACK_IMPORTED_MODULE_57___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_join_js__WEBPACK_IMPORTED_MODULE_57__);
/* harmony import */ var core_js_modules_esnext_set_map_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! core-js/modules/esnext.set.map.js */ "./node_modules/core-js/modules/esnext.set.map.js");
/* harmony import */ var core_js_modules_esnext_set_map_js__WEBPACK_IMPORTED_MODULE_58___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_map_js__WEBPACK_IMPORTED_MODULE_58__);
/* harmony import */ var core_js_modules_esnext_set_of_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! core-js/modules/esnext.set.of.js */ "./node_modules/core-js/modules/esnext.set.of.js");
/* harmony import */ var core_js_modules_esnext_set_of_js__WEBPACK_IMPORTED_MODULE_59___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_of_js__WEBPACK_IMPORTED_MODULE_59__);
/* harmony import */ var core_js_modules_esnext_set_reduce_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! core-js/modules/esnext.set.reduce.js */ "./node_modules/core-js/modules/esnext.set.reduce.js");
/* harmony import */ var core_js_modules_esnext_set_reduce_js__WEBPACK_IMPORTED_MODULE_60___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_reduce_js__WEBPACK_IMPORTED_MODULE_60__);
/* harmony import */ var core_js_modules_esnext_set_some_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! core-js/modules/esnext.set.some.js */ "./node_modules/core-js/modules/esnext.set.some.js");
/* harmony import */ var core_js_modules_esnext_set_some_js__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_some_js__WEBPACK_IMPORTED_MODULE_61__);
/* harmony import */ var core_js_modules_esnext_set_symmetric_difference_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! core-js/modules/esnext.set.symmetric-difference.js */ "./node_modules/core-js/modules/esnext.set.symmetric-difference.js");
/* harmony import */ var core_js_modules_esnext_set_symmetric_difference_js__WEBPACK_IMPORTED_MODULE_62___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_symmetric_difference_js__WEBPACK_IMPORTED_MODULE_62__);
/* harmony import */ var core_js_modules_esnext_set_union_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! core-js/modules/esnext.set.union.js */ "./node_modules/core-js/modules/esnext.set.union.js");
/* harmony import */ var core_js_modules_esnext_set_union_js__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_set_union_js__WEBPACK_IMPORTED_MODULE_63__);
/* harmony import */ var core_js_modules_esnext_string_at_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! core-js/modules/esnext.string.at.js */ "./node_modules/core-js/modules/esnext.string.at.js");
/* harmony import */ var core_js_modules_esnext_string_at_js__WEBPACK_IMPORTED_MODULE_64___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_at_js__WEBPACK_IMPORTED_MODULE_64__);
/* harmony import */ var core_js_modules_esnext_string_code_points_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! core-js/modules/esnext.string.code-points.js */ "./node_modules/core-js/modules/esnext.string.code-points.js");
/* harmony import */ var core_js_modules_esnext_string_code_points_js__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_code_points_js__WEBPACK_IMPORTED_MODULE_65__);
/* harmony import */ var core_js_modules_esnext_symbol_dispose_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! core-js/modules/esnext.symbol.dispose.js */ "./node_modules/core-js/modules/esnext.symbol.dispose.js");
/* harmony import */ var core_js_modules_esnext_symbol_dispose_js__WEBPACK_IMPORTED_MODULE_66___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_symbol_dispose_js__WEBPACK_IMPORTED_MODULE_66__);
/* harmony import */ var core_js_modules_esnext_symbol_observable_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! core-js/modules/esnext.symbol.observable.js */ "./node_modules/core-js/modules/esnext.symbol.observable.js");
/* harmony import */ var core_js_modules_esnext_symbol_observable_js__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_symbol_observable_js__WEBPACK_IMPORTED_MODULE_67__);
/* harmony import */ var core_js_modules_esnext_symbol_pattern_match_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! core-js/modules/esnext.symbol.pattern-match.js */ "./node_modules/core-js/modules/esnext.symbol.pattern-match.js");
/* harmony import */ var core_js_modules_esnext_symbol_pattern_match_js__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_symbol_pattern_match_js__WEBPACK_IMPORTED_MODULE_68__);
/* harmony import */ var core_js_modules_esnext_weak_map_delete_all_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! core-js/modules/esnext.weak-map.delete-all.js */ "./node_modules/core-js/modules/esnext.weak-map.delete-all.js");
/* harmony import */ var core_js_modules_esnext_weak_map_delete_all_js__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_map_delete_all_js__WEBPACK_IMPORTED_MODULE_69__);
/* harmony import */ var core_js_modules_esnext_weak_map_from_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! core-js/modules/esnext.weak-map.from.js */ "./node_modules/core-js/modules/esnext.weak-map.from.js");
/* harmony import */ var core_js_modules_esnext_weak_map_from_js__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_map_from_js__WEBPACK_IMPORTED_MODULE_70__);
/* harmony import */ var core_js_modules_esnext_weak_map_of_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! core-js/modules/esnext.weak-map.of.js */ "./node_modules/core-js/modules/esnext.weak-map.of.js");
/* harmony import */ var core_js_modules_esnext_weak_map_of_js__WEBPACK_IMPORTED_MODULE_71___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_map_of_js__WEBPACK_IMPORTED_MODULE_71__);
/* harmony import */ var core_js_modules_esnext_weak_set_add_all_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.add-all.js */ "./node_modules/core-js/modules/esnext.weak-set.add-all.js");
/* harmony import */ var core_js_modules_esnext_weak_set_add_all_js__WEBPACK_IMPORTED_MODULE_72___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_add_all_js__WEBPACK_IMPORTED_MODULE_72__);
/* harmony import */ var core_js_modules_esnext_weak_set_delete_all_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.delete-all.js */ "./node_modules/core-js/modules/esnext.weak-set.delete-all.js");
/* harmony import */ var core_js_modules_esnext_weak_set_delete_all_js__WEBPACK_IMPORTED_MODULE_73___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_delete_all_js__WEBPACK_IMPORTED_MODULE_73__);
/* harmony import */ var core_js_modules_esnext_weak_set_from_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.from.js */ "./node_modules/core-js/modules/esnext.weak-set.from.js");
/* harmony import */ var core_js_modules_esnext_weak_set_from_js__WEBPACK_IMPORTED_MODULE_74___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_from_js__WEBPACK_IMPORTED_MODULE_74__);
/* harmony import */ var core_js_modules_esnext_weak_set_of_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! core-js/modules/esnext.weak-set.of.js */ "./node_modules/core-js/modules/esnext.weak-set.of.js");
/* harmony import */ var core_js_modules_esnext_weak_set_of_js__WEBPACK_IMPORTED_MODULE_75___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_weak_set_of_js__WEBPACK_IMPORTED_MODULE_75__);
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! core-js/modules/web.immediate.js */ "./node_modules/core-js/modules/web.immediate.js");
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_76___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_76__);
/* harmony import */ var normalize_css_normalize_css__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! normalize.css/normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./index.module.css */ "./index.module.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./actions */ "./actions.ts");
/* harmony import */ var _highlighting__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./highlighting */ "./highlighting.ts");
/* harmony import */ var _PageSwitcher__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./PageSwitcher */ "./PageSwitcher.tsx");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./reducers */ "./reducers/index.ts");
/* harmony import */ var _reducers_websocket__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./reducers/websocket */ "./reducers/websocket.ts");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./Router */ "./Router.tsx");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./configureStore */ "./configureStore.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


























































































const store = (0,_configureStore__WEBPACK_IMPORTED_MODULE_88__["default"])(window);
const params = new URLSearchParams(window.location.search);
if (params.has('websocket')) {
  store.dispatch((0,_reducers_websocket__WEBPACK_IMPORTED_MODULE_86__.websocketFeatureFlagEnabled)());
}
const whenBrowserWidthChanged = evt => store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.browserWidthChanged)(evt.matches));
const maxWidthMediaQuery = window.matchMedia('(max-width: 1600px)');
whenBrowserWidthChanged(maxWidthMediaQuery);
maxWidthMediaQuery.addEventListener('change', whenBrowserWidthChanged);
(0,_highlighting__WEBPACK_IMPORTED_MODULE_83__.configureRustErrors)({
  enableFeatureGate: featureGate => store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.enableFeatureGate)(featureGate)),
  gotoPosition: (line, col) => store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.gotoPosition)(line, col)),
  selectText: (start, end) => store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.selectText)(start, end)),
  addImport: code => store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.addImport)(code)),
  reExecuteWithBacktrace: () => store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.reExecuteWithBacktrace)()),
  getChannel: () => store.getState().configuration.channel
});
store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.performCratesLoad)());
store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.performVersionsLoad)());
window.rustPlayground = {
  setCode: code => {
    store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.editCode)(code));
  },
  disableSyncChangesToStorage: () => {
    store.dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_82__.disableSyncChangesToStorage)());
  }
};
const container = document.getElementById('playground');
if (container) {
  const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_80__.createRoot)(container);
  root.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_89__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_81__.Provider, {
    store: store,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_89__.jsx)(_Router__WEBPACK_IMPORTED_MODULE_87__["default"], {
      store: store,
      reducer: _reducers__WEBPACK_IMPORTED_MODULE_85__["default"],
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_89__.jsx)(_PageSwitcher__WEBPACK_IMPORTED_MODULE_84__["default"], {})
    })
  }));
}

/***/ }),

/***/ "./local_storage.ts":
/*!**************************!*\
  !*** ./local_storage.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   deserialize: () => (/* binding */ deserialize),
/* harmony export */   serialize: () => (/* binding */ serialize)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./storage.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
const _excluded = ["editor", "theme", "keybinding", "pairCharacters"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// This is used to store "long-term" values; those which we want to be
// preserved between completely independent sessions of the
// playground.



const CURRENT_VERSION = 2;
function serialize(state) {
  const code = (0,_selectors__WEBPACK_IMPORTED_MODULE_2__.codeSelector)(state);
  const conf = {
    version: CURRENT_VERSION,
    configuration: {
      editor: state.configuration.editor,
      ace: {
        keybinding: state.configuration.ace.keybinding,
        theme: state.configuration.ace.theme,
        pairCharacters: state.configuration.ace.pairCharacters
      },
      monaco: {
        theme: state.configuration.monaco.theme
      },
      orientation: state.configuration.orientation,
      assemblyFlavor: state.configuration.assemblyFlavor,
      demangleAssembly: state.configuration.demangleAssembly,
      processAssembly: state.configuration.processAssembly
    },
    code,
    notifications: state.notifications
  };
  return JSON.stringify(conf);
}
function migrateV1(state) {
  const _state$configuration = state.configuration,
    {
      editor,
      theme,
      keybinding,
      pairCharacters
    } = _state$configuration,
    configuration = _objectWithoutProperties(_state$configuration, _excluded);
  const step = _objectSpread(_objectSpread({}, state), {}, {
    configuration: _objectSpread(_objectSpread({}, configuration), {}, {
      ace: {
        theme,
        keybinding,
        pairCharacters
      },
      monaco: {
        theme: 'vscode-dark-plus'
      },
      editor: editor === 'advanced' ? _types__WEBPACK_IMPORTED_MODULE_1__.Editor.Ace : _types__WEBPACK_IMPORTED_MODULE_1__.Editor.Simple
    }),
    version: 2
  });
  return migrateV2(step);
}
function migrateV2(state) {
  return state;
}
function migrate(state) {
  switch (state.version) {
    case 1:
      return migrateV1(state);
    case 2:
      return migrateV2(state);
    default:
      return undefined;
  }
}
function deserialize(savedState) {
  if (!savedState) {
    return undefined;
  }
  const parsedState = JSON.parse(savedState);
  if (!parsedState) {
    return undefined;
  }
  const result = migrate(parsedState);
  if (!result) {
    return undefined;
  }
  return (0,_storage__WEBPACK_IMPORTED_MODULE_0__.removeVersion)(result);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_storage__WEBPACK_IMPORTED_MODULE_0__.initializeStorage)({
  storageFactory: () => localStorage,
  serialize,
  deserialize
}));

/***/ }),

/***/ "./reducers/browser.ts":
/*!*****************************!*\
  !*** ./reducers/browser.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ code)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const DEFAULT = {
  isSmall: true,
  ratioGeneration: 0
};
function code() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.BrowserWidthChanged:
      return _objectSpread(_objectSpread({}, state), {}, {
        isSmall: action.isSmall
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.SplitRatioChanged:
      {
        let {
          ratioGeneration
        } = state;
        ratioGeneration++;
        return _objectSpread(_objectSpread({}, state), {}, {
          ratioGeneration
        });
      }
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/code.ts":
/*!**************************!*\
  !*** ./reducers/code.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ code)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
/* harmony import */ var _output_gist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./output/gist */ "./reducers/output/gist.ts");
/* harmony import */ var _output_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./output/format */ "./reducers/output/format.ts");



const DEFAULT = `fn main() {
    println!("Hello, world!");
}`;
function code() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.EditCode:
      return action.code;
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.AddMainFunction:
      return `${state}\n\n${DEFAULT}`;
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.AddImport:
      return action.code + state;
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.EnableFeatureGate:
      return `#![feature(${action.featureGate})]\n${state}`;
    default:
      {
        if (_output_gist__WEBPACK_IMPORTED_MODULE_1__.performGistLoad.pending.match(action)) {
          return '';
        } else if (_output_gist__WEBPACK_IMPORTED_MODULE_1__.performGistLoad.fulfilled.match(action)) {
          return action.payload.code;
        } else if (_output_format__WEBPACK_IMPORTED_MODULE_2__.performFormat.fulfilled.match(action)) {
          return action.payload.code;
        } else {
          return state;
        }
      }
  }
}

/***/ }),

/***/ "./reducers/configuration.ts":
/*!***********************************!*\
  !*** ./reducers/configuration.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ configuration)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./types.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


const DEFAULT = {
  editor: _types__WEBPACK_IMPORTED_MODULE_1__.Editor.Ace,
  ace: {
    keybinding: 'ace',
    theme: 'github',
    pairCharacters: _types__WEBPACK_IMPORTED_MODULE_1__.PairCharacters.Enabled
  },
  monaco: {
    theme: 'vscode-dark-plus'
  },
  orientation: _types__WEBPACK_IMPORTED_MODULE_1__.Orientation.Automatic,
  assemblyFlavor: _types__WEBPACK_IMPORTED_MODULE_1__.AssemblyFlavor.Att,
  demangleAssembly: _types__WEBPACK_IMPORTED_MODULE_1__.DemangleAssembly.Demangle,
  processAssembly: _types__WEBPACK_IMPORTED_MODULE_1__.ProcessAssembly.Filter,
  primaryAction: _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionAuto.Auto,
  channel: _types__WEBPACK_IMPORTED_MODULE_1__.Channel.Stable,
  mode: _types__WEBPACK_IMPORTED_MODULE_1__.Mode.Debug,
  edition: _types__WEBPACK_IMPORTED_MODULE_1__.Edition.Rust2021,
  backtrace: _types__WEBPACK_IMPORTED_MODULE_1__.Backtrace.Disabled
};
function configuration() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeEditor:
      return _objectSpread(_objectSpread({}, state), {}, {
        editor: action.editor
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeKeybinding:
      {
        const {
          ace
        } = state;
        return _objectSpread(_objectSpread({}, state), {}, {
          ace: _objectSpread(_objectSpread({}, ace), {}, {
            keybinding: action.keybinding
          })
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeAceTheme:
      {
        const {
          ace
        } = state;
        return _objectSpread(_objectSpread({}, state), {}, {
          ace: _objectSpread(_objectSpread({}, ace), {}, {
            theme: action.theme
          })
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangePairCharacters:
      {
        const {
          ace
        } = state;
        return _objectSpread(_objectSpread({}, state), {}, {
          ace: _objectSpread(_objectSpread({}, ace), {}, {
            pairCharacters: action.pairCharacters
          })
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeMonacoTheme:
      {
        const {
          monaco
        } = state;
        return _objectSpread(_objectSpread({}, state), {}, {
          monaco: _objectSpread(_objectSpread({}, monaco), {}, {
            theme: action.theme
          })
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeOrientation:
      return _objectSpread(_objectSpread({}, state), {}, {
        orientation: action.orientation
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeAssemblyFlavor:
      return _objectSpread(_objectSpread({}, state), {}, {
        assemblyFlavor: action.assemblyFlavor
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeDemangleAssembly:
      return _objectSpread(_objectSpread({}, state), {}, {
        demangleAssembly: action.demangleAssembly
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeProcessAssembly:
      return _objectSpread(_objectSpread({}, state), {}, {
        processAssembly: action.processAssembly
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangePrimaryAction:
      return _objectSpread(_objectSpread({}, state), {}, {
        primaryAction: action.primaryAction
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeChannel:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          channel: action.channel
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeMode:
      return _objectSpread(_objectSpread({}, state), {}, {
        mode: action.mode
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeEdition:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          edition: action.edition
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeBacktrace:
      return _objectSpread(_objectSpread({}, state), {}, {
        backtrace: action.backtrace
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/crates.ts":
/*!****************************!*\
  !*** ./reducers/crates.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ crates)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/sortBy.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");


const DEFAULT = [];
function crates() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CratesLoadSucceeded:
      return (0,lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"])(action.crates, c => c.name);
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/globalConfiguration.ts":
/*!*****************************************!*\
  !*** ./reducers/globalConfiguration.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ globalConfiguration)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const DEFAULT = {
  baseUrl: '',
  syncChangesToStorage: true
};
function globalConfiguration() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.DisableSyncChangesToStorage:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          syncChangesToStorage: false
        });
      }
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/index.ts":
/*!***************************!*\
  !*** ./reducers/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./reducers/browser.ts");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code */ "./reducers/code.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration */ "./reducers/configuration.ts");
/* harmony import */ var _crates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crates */ "./reducers/crates.ts");
/* harmony import */ var _globalConfiguration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./globalConfiguration */ "./reducers/globalConfiguration.ts");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications */ "./reducers/notifications.ts");
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./output */ "./reducers/output/index.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./page */ "./reducers/page.ts");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./position */ "./reducers/position.ts");
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./selection */ "./reducers/selection.ts");
/* harmony import */ var _versions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./versions */ "./reducers/versions.ts");
/* harmony import */ var _websocket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./websocket */ "./reducers/websocket.ts");













const playgroundApp = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_12__.combineReducers)({
  browser: _browser__WEBPACK_IMPORTED_MODULE_0__["default"],
  code: _code__WEBPACK_IMPORTED_MODULE_1__["default"],
  configuration: _configuration__WEBPACK_IMPORTED_MODULE_2__["default"],
  crates: _crates__WEBPACK_IMPORTED_MODULE_3__["default"],
  globalConfiguration: _globalConfiguration__WEBPACK_IMPORTED_MODULE_4__["default"],
  notifications: _notifications__WEBPACK_IMPORTED_MODULE_5__["default"],
  output: _output__WEBPACK_IMPORTED_MODULE_6__["default"],
  page: _page__WEBPACK_IMPORTED_MODULE_7__["default"],
  position: _position__WEBPACK_IMPORTED_MODULE_8__["default"],
  selection: _selection__WEBPACK_IMPORTED_MODULE_9__["default"],
  versions: _versions__WEBPACK_IMPORTED_MODULE_10__["default"],
  websocket: _websocket__WEBPACK_IMPORTED_MODULE_11__["default"]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playgroundApp);

/***/ }),

/***/ "./reducers/notifications.ts":
/*!***********************************!*\
  !*** ./reducers/notifications.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ notifications)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./types.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


const DEFAULT = {
  seenRustSurvey2018: true,
  seenRust2018IsDefault: true,
  seenRustSurvey2020: true,
  seenRust2021IsDefault: true,
  seenRustSurvey2021: true,
  seenMonacoEditorAvailable: true,
  seenRustSurvey2022: false
};
function notifications() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.NotificationSeen:
      {
        switch (action.notification) {
          case _types__WEBPACK_IMPORTED_MODULE_1__.Notification.RustSurvey2022:
            {
              return _objectSpread(_objectSpread({}, state), {}, {
                seenRustSurvey2022: true
              });
            }
        }
      }
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/assembly.ts":
/*!*************************************!*\
  !*** ./reducers/output/assembly.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ assembly)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function assembly() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileAssemblyRequest:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileAssemblySucceeded:
      {
        const {
          code = '',
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          code,
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileAssemblyFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/clippy.ts":
/*!***********************************!*\
  !*** ./reducers/output/clippy.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clippy)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function clippy() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.RequestClippy:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ClippySucceeded:
      {
        const {
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ClippyFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/execute.ts":
/*!************************************!*\
  !*** ./reducers/output/execute.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   performCommonExecute: () => (/* binding */ performCommonExecute),
/* harmony export */   performExecute: () => (/* binding */ performExecute),
/* harmony export */   wsExecuteRequest: () => (/* binding */ wsExecuteRequest),
/* harmony export */   wsExecuteResponseSchema: () => (/* binding */ wsExecuteResponseSchema)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ "./node_modules/zod/lib/index.mjs");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors */ "./selectors/index.ts");
/* harmony import */ var _websocketActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../websocketActions */ "./websocketActions.ts");





const initialState = {
  requestsInProgress: 0
};
const wsExecuteResponsePayloadSchema = zod__WEBPACK_IMPORTED_MODULE_3__.object({
  success: zod__WEBPACK_IMPORTED_MODULE_3__.boolean(),
  stdout: zod__WEBPACK_IMPORTED_MODULE_3__.string(),
  stderr: zod__WEBPACK_IMPORTED_MODULE_3__.string()
});
const wsExecuteResponse = (0,_websocketActions__WEBPACK_IMPORTED_MODULE_2__.createWebsocketResponseAction)('output/execute/wsExecuteResponse');
const sliceName = 'output/execute';
const performExecute = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__.createAsyncThunk)(sliceName, async payload => (0,_actions__WEBPACK_IMPORTED_MODULE_0__.adaptFetchError)(() => (0,_actions__WEBPACK_IMPORTED_MODULE_0__.jsonPost)(_actions__WEBPACK_IMPORTED_MODULE_0__.routes.execute, payload)));
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__.createSlice)({
  name: 'output/execute',
  initialState,
  reducers: {
    wsExecuteRequest: {
      reducer: (state, action) => {
        const {
          sequenceNumber
        } = action.meta;
        if (sequenceNumber >= (state.sequenceNumber ?? 0)) {
          state.sequenceNumber = sequenceNumber;
          state.requestsInProgress = 1; // Only tracking one request
        }
      },

      prepare: payload => ({
        payload,
        meta: (0,_websocketActions__WEBPACK_IMPORTED_MODULE_2__.makeWebSocketMeta)()
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(performExecute.pending, state => {
      state.requestsInProgress += 1;
    }).addCase(performExecute.fulfilled, (state, action) => {
      const {
        stdout,
        stderr
      } = action.payload;
      Object.assign(state, {
        stdout,
        stderr
      });
      state.requestsInProgress -= 1;
    }).addCase(performExecute.rejected, (state, action) => {
      if (action.payload) {} else {
        state.error = action.error.message;
      }
      state.requestsInProgress -= 1;
    }).addCase(wsExecuteResponse, (state, action) => {
      const {
        payload: {
          stdout,
          stderr
        },
        meta: {
          sequenceNumber
        }
      } = action;
      if (sequenceNumber >= (state.sequenceNumber ?? 0)) {
        Object.assign(state, {
          stdout,
          stderr
        });
        state.requestsInProgress = 0; // Only tracking one request
      }
    });
  }
});

const {
  wsExecuteRequest
} = slice.actions;
const performCommonExecute = (crateType, tests) => (dispatch, getState) => {
  const state = getState();
  const body = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.executeRequestPayloadSelector)(state, {
    crateType,
    tests
  });
  const useWebSocket = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.useWebsocketSelector)(state);
  if (useWebSocket) {
    dispatch(wsExecuteRequest(body));
  } else {
    dispatch(performExecute(body));
  }
};
const wsExecuteResponseSchema = (0,_websocketActions__WEBPACK_IMPORTED_MODULE_2__.createWebsocketResponseSchema)(wsExecuteResponse, wsExecuteResponsePayloadSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);

/***/ }),

/***/ "./reducers/output/format.ts":
/*!***********************************!*\
  !*** ./reducers/output/format.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   performFormat: () => (/* binding */ performFormat)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors */ "./selectors/index.ts");



const sliceName = 'output/format';
const initialState = {
  requestsInProgress: 0
};
const performFormat = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createAsyncThunk)(sliceName, async (_arg, _ref) => {
  let {
    getState
  } = _ref;
  const body = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.formatRequestSelector)(getState());
  return (0,_actions__WEBPACK_IMPORTED_MODULE_0__.adaptFetchError)(() => (0,_actions__WEBPACK_IMPORTED_MODULE_0__.jsonPost)(_actions__WEBPACK_IMPORTED_MODULE_0__.routes.format, body));
});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSlice)({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(performFormat.pending, state => {
      state.requestsInProgress += 1;
    }).addCase(performFormat.fulfilled, (state, action) => {
      state.requestsInProgress -= 1;
      Object.assign(state, action.payload);
    }).addCase(performFormat.rejected, state => {
      state.requestsInProgress -= 1;
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);

/***/ }),

/***/ "./reducers/output/gist.ts":
/*!*********************************!*\
  !*** ./reducers/output/gist.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   performGistLoad: () => (/* binding */ performGistLoad),
/* harmony export */   performGistSave: () => (/* binding */ performGistSave)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors */ "./selectors/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



const sliceName = 'output/gist';
const initialState = {
  requestsInProgress: 0
};
const performGistLoad = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createAsyncThunk)(`${sliceName}/load`, async (_ref, _ref2) => {
  let {
    id,
    channel,
    mode,
    edition
  } = _ref;
  let {
    getState
  } = _ref2;
  const state = getState();
  const baseUrl = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.baseUrlSelector)(state);
  const gistUrl = new URL(_actions__WEBPACK_IMPORTED_MODULE_0__.routes.meta.gistLoad, baseUrl);
  const u = new URL(id, gistUrl);
  const gist = await (0,_actions__WEBPACK_IMPORTED_MODULE_0__.jsonGet)(u);
  return _objectSpread({
    channel,
    mode,
    edition
  }, gist);
});
const performGistSave = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createAsyncThunk)(`${sliceName}/save`, async (_arg, _ref3) => {
  let {
    getState
  } = _ref3;
  const state = getState();
  const code = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.codeSelector)(state);
  const {
    configuration: {
      channel,
      mode,
      edition
    },
    output: {
      execute: {
        stdout = '',
        stderr = ''
      }
    }
  } = state;
  const json = await (0,_actions__WEBPACK_IMPORTED_MODULE_0__.jsonPost)(_actions__WEBPACK_IMPORTED_MODULE_0__.routes.meta.gistSave, {
    code
  });
  return _objectSpread(_objectSpread({}, json), {}, {
    code,
    stdout,
    stderr,
    channel,
    mode,
    edition
  });
});
const pending = state => {
  state.requestsInProgress += 1;
};
const fulfilled = (state, action) => {
  state.requestsInProgress -= 1;
  Object.assign(state, action.payload);
};
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSlice)({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(performGistLoad.pending, pending).addCase(performGistLoad.fulfilled, fulfilled).addCase(performGistSave.pending, pending).addCase(performGistSave.fulfilled, fulfilled);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);

/***/ }),

/***/ "./reducers/output/hir.ts":
/*!********************************!*\
  !*** ./reducers/output/hir.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hir)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function hir() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileHirRequest:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileHirSucceeded:
      {
        const {
          code = '',
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          code,
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileHirFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/index.ts":
/*!**********************************!*\
  !*** ./reducers/output/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _assembly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assembly */ "./reducers/output/assembly.ts");
/* harmony import */ var _clippy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clippy */ "./reducers/output/clippy.ts");
/* harmony import */ var _execute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./execute */ "./reducers/output/execute.ts");
/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./format */ "./reducers/output/format.ts");
/* harmony import */ var _gist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gist */ "./reducers/output/gist.ts");
/* harmony import */ var _hir__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hir */ "./reducers/output/hir.ts");
/* harmony import */ var _llvmIr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./llvmIr */ "./reducers/output/llvmIr.ts");
/* harmony import */ var _macroExpansion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./macroExpansion */ "./reducers/output/macroExpansion.ts");
/* harmony import */ var _meta__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./meta */ "./reducers/output/meta.ts");
/* harmony import */ var _mir__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mir */ "./reducers/output/mir.ts");
/* harmony import */ var _miri__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./miri */ "./reducers/output/miri.ts");
/* harmony import */ var _wasm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./wasm */ "./reducers/output/wasm.ts");













const output = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_12__.combineReducers)({
  meta: _meta__WEBPACK_IMPORTED_MODULE_8__["default"],
  format: _format__WEBPACK_IMPORTED_MODULE_3__["default"],
  clippy: _clippy__WEBPACK_IMPORTED_MODULE_1__["default"],
  miri: _miri__WEBPACK_IMPORTED_MODULE_10__["default"],
  macroExpansion: _macroExpansion__WEBPACK_IMPORTED_MODULE_7__["default"],
  assembly: _assembly__WEBPACK_IMPORTED_MODULE_0__["default"],
  llvmIr: _llvmIr__WEBPACK_IMPORTED_MODULE_6__["default"],
  mir: _mir__WEBPACK_IMPORTED_MODULE_9__["default"],
  hir: _hir__WEBPACK_IMPORTED_MODULE_5__["default"],
  wasm: _wasm__WEBPACK_IMPORTED_MODULE_11__["default"],
  execute: _execute__WEBPACK_IMPORTED_MODULE_2__["default"],
  gist: _gist__WEBPACK_IMPORTED_MODULE_4__["default"]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (output);

/***/ }),

/***/ "./reducers/output/llvmIr.ts":
/*!***********************************!*\
  !*** ./reducers/output/llvmIr.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ llvmIr)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function llvmIr() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileLlvmIrRequest:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileLlvmIrSucceeded:
      {
        const {
          code = '',
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          code,
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileLlvmIrFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/macroExpansion.ts":
/*!*******************************************!*\
  !*** ./reducers/output/macroExpansion.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ macroExpansion)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function macroExpansion() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.RequestMacroExpansion:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.MacroExpansionSucceeded:
      {
        const {
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.MacroExpansionFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/meta.ts":
/*!*********************************!*\
  !*** ./reducers/output/meta.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ meta)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types */ "./types.ts");
/* harmony import */ var _gist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gist */ "./reducers/output/gist.ts");
/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./format */ "./reducers/output/format.ts");
/* harmony import */ var _execute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./execute */ "./reducers/output/execute.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





const DEFAULT = {};
function meta() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.ChangeFocus:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: action.focus
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.RequestClippy:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Clippy
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.RequestMiri:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Miri
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.RequestMacroExpansion:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.MacroExpansion
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileLlvmIrRequest:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.LlvmIr
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileMirRequest:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Mir
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileHirRequest:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Hir
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileWasmRequest:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Wasm
      });
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileAssemblyRequest:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Asm
      });
    case _execute__WEBPACK_IMPORTED_MODULE_4__.performExecute.pending.type:
    case _execute__WEBPACK_IMPORTED_MODULE_4__.wsExecuteRequest.type:
      return _objectSpread(_objectSpread({}, state), {}, {
        focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Execute
      });
    default:
      {
        if (_gist__WEBPACK_IMPORTED_MODULE_2__.performGistLoad.pending.match(action) || _gist__WEBPACK_IMPORTED_MODULE_2__.performGistSave.pending.match(action)) {
          return _objectSpread(_objectSpread({}, state), {}, {
            focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Gist
          });
        } else if (_format__WEBPACK_IMPORTED_MODULE_3__.performFormat.pending.match(action)) {
          return _objectSpread(_objectSpread({}, state), {}, {
            focus: _types__WEBPACK_IMPORTED_MODULE_1__.Focus.Format
          });
        } else if (_format__WEBPACK_IMPORTED_MODULE_3__.performFormat.fulfilled.match(action)) {
          return _objectSpread(_objectSpread({}, state), {}, {
            focus: undefined
          });
        } else {
          return state;
        }
      }
  }
}

/***/ }),

/***/ "./reducers/output/mir.ts":
/*!********************************!*\
  !*** ./reducers/output/mir.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mir)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function mir() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileMirRequest:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileMirSucceeded:
      {
        const {
          code = '',
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          code,
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileMirFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/miri.ts":
/*!*********************************!*\
  !*** ./reducers/output/miri.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ miri)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function miri() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.RequestMiri:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.MiriSucceeded:
      {
        const {
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.MiriFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/output/sharedStateManagement.ts":
/*!**************************************************!*\
  !*** ./reducers/output/sharedStateManagement.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   finish: () => (/* binding */ finish),
/* harmony export */   start: () => (/* binding */ start)
/* harmony export */ });
function start(zeroState, state) {
  const {
    requestsInProgress = 0
  } = state;
  return Object.assign({}, zeroState, {
    requestsInProgress: requestsInProgress + 1
  });
}
function finish(state, newState) {
  const {
    requestsInProgress = 0
  } = state;
  return Object.assign({}, state, newState, {
    requestsInProgress: requestsInProgress - 1
  });
}

/***/ }),

/***/ "./reducers/output/wasm.ts":
/*!*********************************!*\
  !*** ./reducers/output/wasm.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ wasm)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions */ "./actions.ts");
/* harmony import */ var _sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sharedStateManagement */ "./reducers/output/sharedStateManagement.ts");


const DEFAULT = {
  requestsInProgress: 0
};
function wasm() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileWasmRequest:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.start)(DEFAULT, state);
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileWasmSucceeded:
      {
        const {
          code = '',
          stdout = '',
          stderr = ''
        } = action;
        return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
          code,
          stdout,
          stderr
        });
      }
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.CompileWasmFailed:
      return (0,_sharedStateManagement__WEBPACK_IMPORTED_MODULE_1__.finish)(state, {
        error: action.error
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/page.ts":
/*!**************************!*\
  !*** ./reducers/page.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ page)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");

function page() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.SetPage:
      return action.page;
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/position.ts":
/*!******************************!*\
  !*** ./reducers/position.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ position)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const DEFAULT = {
  line: 0,
  column: 0
};
function position() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.GotoPosition:
      {
        const {
          line,
          column
        } = action;
        return _objectSpread(_objectSpread({}, state), {}, {
          line,
          column
        });
      }
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/selection.ts":
/*!*******************************!*\
  !*** ./reducers/selection.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ position)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

const DEFAULT = {};
function position() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.SelectText:
      {
        const {
          start,
          end
        } = action;
        return _objectSpread(_objectSpread({}, state), {}, {
          start,
          end
        });
      }
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/versions.ts":
/*!******************************!*\
  !*** ./reducers/versions.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ crates)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ "./actions.ts");

const DEFAULT = {};
function crates() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__.ActionType.VersionsLoadSucceeded:
      {
        const {
          stable,
          beta,
          nightly,
          java19,
          rustfmt,
          clippy,
          miri
        } = action;
        return {
          stable,
          beta,
          nightly,
          java19,
          rustfmt,
          clippy,
          miri
        };
      }
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/websocket.ts":
/*!*******************************!*\
  !*** ./reducers/websocket.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   websocketConnected: () => (/* binding */ websocketConnected),
/* harmony export */   websocketConnectedSchema: () => (/* binding */ websocketConnectedSchema),
/* harmony export */   websocketDisconnected: () => (/* binding */ websocketDisconnected),
/* harmony export */   websocketError: () => (/* binding */ websocketError),
/* harmony export */   websocketErrorSchema: () => (/* binding */ websocketErrorSchema),
/* harmony export */   websocketFeatureFlagEnabled: () => (/* binding */ websocketFeatureFlagEnabled)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ "./node_modules/zod/lib/index.mjs");
/* harmony import */ var _websocketActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../websocketActions */ "./websocketActions.ts");



const initialState = {
  connected: false,
  featureFlagEnabled: false
};
const websocketConnectedPayloadSchema = zod__WEBPACK_IMPORTED_MODULE_1__["default"].object({
  iAcceptThisIsAnUnsupportedApi: zod__WEBPACK_IMPORTED_MODULE_1__["default"].boolean()
});
const websocketErrorPayloadSchema = zod__WEBPACK_IMPORTED_MODULE_1__["default"].object({
  error: zod__WEBPACK_IMPORTED_MODULE_1__["default"].string()
});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSlice)({
  name: 'websocket',
  initialState,
  reducers: {
    connected: {
      reducer: (state, _action) => {
        state.connected = true;
        delete state.error;
      },
      prepare: () => ({
        payload: {
          iAcceptThisIsAnUnsupportedApi: true
        },
        meta: (0,_websocketActions__WEBPACK_IMPORTED_MODULE_0__.makeWebSocketMeta)()
      })
    },
    disconnected: state => {
      state.connected = false;
    },
    error: (state, action) => {
      state.error = action.payload.error;
    },
    featureFlagEnabled: state => {
      state.featureFlagEnabled = true;
    }
  }
});
const {
  connected: websocketConnected,
  disconnected: websocketDisconnected,
  error: websocketError,
  featureFlagEnabled: websocketFeatureFlagEnabled
} = slice.actions;
const websocketConnectedSchema = (0,_websocketActions__WEBPACK_IMPORTED_MODULE_0__.createWebsocketResponseSchema)(websocketConnected, websocketConnectedPayloadSchema);
const websocketErrorSchema = (0,_websocketActions__WEBPACK_IMPORTED_MODULE_0__.createWebsocketResponseSchema)(websocketError, websocketErrorPayloadSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);

/***/ }),

/***/ "./selectors/index.ts":
/*!****************************!*\
  !*** ./selectors/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   aceKeybinding: () => (/* binding */ aceKeybinding),
/* harmony export */   acePairCharacters: () => (/* binding */ acePairCharacters),
/* harmony export */   aceResizeKey: () => (/* binding */ aceResizeKey),
/* harmony export */   aceTheme: () => (/* binding */ aceTheme),
/* harmony export */   anyNotificationsToShowSelector: () => (/* binding */ anyNotificationsToShowSelector),
/* harmony export */   baseUrlSelector: () => (/* binding */ baseUrlSelector),
/* harmony export */   betaVersionDetailsText: () => (/* binding */ betaVersionDetailsText),
/* harmony export */   betaVersionText: () => (/* binding */ betaVersionText),
/* harmony export */   clippyRequestSelector: () => (/* binding */ clippyRequestSelector),
/* harmony export */   clippyVersionDetailsText: () => (/* binding */ clippyVersionDetailsText),
/* harmony export */   clippyVersionText: () => (/* binding */ clippyVersionText),
/* harmony export */   codeSelector: () => (/* binding */ codeSelector),
/* harmony export */   codeUrlSelector: () => (/* binding */ codeUrlSelector),
/* harmony export */   crateTypeSelector: () => (/* binding */ crateTypeSelector),
/* harmony export */   executeRequestPayloadSelector: () => (/* binding */ executeRequestPayloadSelector),
/* harmony export */   formatRequestSelector: () => (/* binding */ formatRequestSelector),
/* harmony export */   getAdvancedOptionsSet: () => (/* binding */ getAdvancedOptionsSet),
/* harmony export */   getBacktraceSet: () => (/* binding */ getBacktraceSet),
/* harmony export */   getChannelLabel: () => (/* binding */ getChannelLabel),
/* harmony export */   getCrateType: () => (/* binding */ getCrateType),
/* harmony export */   getExecutionLabel: () => (/* binding */ getExecutionLabel),
/* harmony export */   getModeLabel: () => (/* binding */ getModeLabel),
/* harmony export */   getSomethingToShow: () => (/* binding */ getSomethingToShow),
/* harmony export */   hasMainFunctionSelector: () => (/* binding */ hasMainFunctionSelector),
/* harmony export */   hasProperties: () => (/* binding */ hasProperties),
/* harmony export */   hasTestsSelector: () => (/* binding */ hasTestsSelector),
/* harmony export */   isAutoBuildSelector: () => (/* binding */ isAutoBuildSelector),
/* harmony export */   isEditionDefault: () => (/* binding */ isEditionDefault),
/* harmony export */   isHirAvailable: () => (/* binding */ isHirAvailable),
/* harmony export */   isNightlyChannel: () => (/* binding */ isNightlyChannel),
/* harmony export */   isOutputFocused: () => (/* binding */ isOutputFocused),
/* harmony export */   isWasmAvailable: () => (/* binding */ isWasmAvailable),
/* harmony export */   java19VersionText: () => (/* binding */ java19VersionText),
/* harmony export */   miriVersionDetailsText: () => (/* binding */ miriVersionDetailsText),
/* harmony export */   miriVersionText: () => (/* binding */ miriVersionText),
/* harmony export */   nightlyVersionDetailsText: () => (/* binding */ nightlyVersionDetailsText),
/* harmony export */   nightlyVersionText: () => (/* binding */ nightlyVersionText),
/* harmony export */   offerCrateAutocompleteOnUse: () => (/* binding */ offerCrateAutocompleteOnUse),
/* harmony export */   orientation: () => (/* binding */ orientation),
/* harmony export */   permalinkSelector: () => (/* binding */ permalinkSelector),
/* harmony export */   positionSelector: () => (/* binding */ positionSelector),
/* harmony export */   runAsTest: () => (/* binding */ runAsTest),
/* harmony export */   rustfmtVersionDetailsText: () => (/* binding */ rustfmtVersionDetailsText),
/* harmony export */   rustfmtVersionText: () => (/* binding */ rustfmtVersionText),
/* harmony export */   selectionSelector: () => (/* binding */ selectionSelector),
/* harmony export */   showGistLoaderSelector: () => (/* binding */ showGistLoaderSelector),
/* harmony export */   showRustSurvey2022Selector: () => (/* binding */ showRustSurvey2022Selector),
/* harmony export */   stableVersionText: () => (/* binding */ stableVersionText),
/* harmony export */   textChangedSinceShareSelector: () => (/* binding */ textChangedSinceShareSelector),
/* harmony export */   urloUrlSelector: () => (/* binding */ urloUrlSelector),
/* harmony export */   useWebsocketSelector: () => (/* binding */ useWebsocketSelector),
/* harmony export */   websocketFeatureFlagEnabled: () => (/* binding */ websocketFeatureFlagEnabled),
/* harmony export */   websocketStatusSelector: () => (/* binding */ websocketStatusSelector)
/* harmony export */ });
/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common-tags */ "./node_modules/common-tags/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/reselect/es/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./types.ts");



const codeSelector = state => state.code;
const positionSelector = state => state.position;
const selectionSelector = state => state.selection;
const HAS_TESTS_RE = /^\s*#\s*\[\s*test\s*([^"]*)]/m;
const hasTestsSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, code => !!code.match(HAS_TESTS_RE));
const HAS_MAIN_FUNCTION_RE = /^\s*(pub\s+)?\s*(const\s+)?\s*(async\s+)?\s*fn\s+main\s*\(\s*\)/m;
const hasMainFunctionSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, code => !!code.match(HAS_MAIN_FUNCTION_RE));
const CRATE_TYPE_RE = /^\s*#!\s*\[\s*crate_type\s*=\s*"([^"]*)"\s*]/m;
const crateTypeSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, code => (code.match(CRATE_TYPE_RE) || [])[1]);
const autoPrimaryActionSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(crateTypeSelector, hasTestsSelector, hasMainFunctionSelector, (crateType, hasTests, hasMainFunction) => {
  if (crateType && crateType !== 'proc-macro') {
    if (crateType === 'bin') {
      return _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Execute;
    } else {
      return _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Compile;
    }
  } else {
    if (hasTests) {
      return _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Test;
    } else if (hasMainFunction) {
      return _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Execute;
    } else {
      return _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Compile;
    }
  }
});
const runAsTest = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(autoPrimaryActionSelector, primaryAction => primaryAction === _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Test);
const getCrateType = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(crateTypeSelector, autoPrimaryActionSelector, (crateType, primaryAction) => {
  if (crateType) {
    return crateType;
  } else if (primaryAction === _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Execute) {
    return 'bin';
  } else {
    return 'lib';
  }
});
const rawPrimaryActionSelector = state => state.configuration.primaryAction;
const isAutoBuildSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(rawPrimaryActionSelector, autoPrimaryActionSelector, (primaryAction, autoPrimaryAction) => primaryAction === _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionAuto.Auto && autoPrimaryAction === _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Compile);
const primaryActionSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(rawPrimaryActionSelector, autoPrimaryActionSelector, (primaryAction, autoPrimaryAction) => primaryAction === _types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionAuto.Auto ? autoPrimaryAction : primaryAction);
const LABELS = {
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Asm]: 'Show Assembly',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Compile]: 'Build',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Execute]: 'Run',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.LlvmIr]: 'Show LLVM IR',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Hir]: 'Show HIR',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Mir]: 'Show MIR',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Test]: 'Test',
  [_types__WEBPACK_IMPORTED_MODULE_1__.PrimaryActionCore.Wasm]: 'Show WASM'
};
const getExecutionLabel = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(primaryActionSelector, primaryAction => LABELS[primaryAction]);
const getStable = state => state.versions?.stable;
const getBeta = state => state.versions?.beta;
const getNightly = state => state.versions?.nightly;
const getJava19 = state => state.versions?.java19;
const getRustfmt = state => state.versions?.rustfmt;
const getClippy = state => state.versions?.clippy;
const getMiri = state => state.versions?.miri;
const versionNumber = v => v ? v.version : '';
const stableVersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getStable, versionNumber);
const betaVersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getBeta, versionNumber);
const nightlyVersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getNightly, versionNumber);
const java19VersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getJava19, versionNumber);
const clippyVersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getClippy, versionNumber);
const rustfmtVersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getRustfmt, versionNumber);
const miriVersionText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getMiri, versionNumber);
const versionDetails = v => v ? `${v.date} ${v.hash.slice(0, 20)}` : '';
const betaVersionDetailsText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getBeta, versionDetails);
const nightlyVersionDetailsText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getNightly, versionDetails);
const clippyVersionDetailsText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getClippy, versionDetails);
const rustfmtVersionDetailsText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getRustfmt, versionDetails);
const miriVersionDetailsText = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getMiri, versionDetails);
const editionSelector = state => state.configuration.edition;
const isNightlyChannel = state => state.configuration.channel === _types__WEBPACK_IMPORTED_MODULE_1__.Channel.Nightly;
const isWasmAvailable = isNightlyChannel;
const isHirAvailable = isNightlyChannel;
const getModeLabel = state => {
  const {
    configuration: {
      mode
    }
  } = state;
  return `${mode}`;
};
const getChannelLabel = state => {
  const {
    configuration: {
      channel
    }
  } = state;
  return `${channel}`;
};
const isEditionDefault = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(editionSelector, edition => edition == _types__WEBPACK_IMPORTED_MODULE_1__.Edition.Rust2021);
const getBacktraceSet = state => state.configuration.backtrace !== _types__WEBPACK_IMPORTED_MODULE_1__.Backtrace.Disabled;
const getAdvancedOptionsSet = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(isEditionDefault, getBacktraceSet, (editionDefault, backtraceSet) => !editionDefault || backtraceSet);
const hasProperties = obj => Object.values(obj).some(val => !!val);
const getOutputs = state => [state.output.assembly, state.output.clippy, state.output.execute, state.output.format, state.output.gist, state.output.llvmIr, state.output.mir, state.output.hir, state.output.miri, state.output.macroExpansion, state.output.wasm];
const getSomethingToShow = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(getOutputs, a => a.some(hasProperties));
const baseUrlSelector = state => state.globalConfiguration.baseUrl;
const gistSelector = state => state.output.gist;
// Selects url.query of build configs.
const urlQuerySelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(gistSelector, gist => {
  const res = new URLSearchParams();
  if (gist.channel) {
    res.set('version', gist.channel);
  }
  if (gist.mode) {
    res.set('mode', gist.mode);
  }
  if (gist.edition) {
    res.set('edition', gist.edition);
  }
  return res;
});
const showGistLoaderSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(gistSelector, gist => gist.requestsInProgress > 0);
const permalinkSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(baseUrlSelector, urlQuerySelector, gistSelector, (baseUrl, originalQuery, gist) => {
  const u = new URL(baseUrl);
  const query = new URLSearchParams(originalQuery);
  if (gist.id) {
    query.set('gist', gist.id);
  }
  u.search = query.toString();
  return u.href;
});
const textChangedSinceShareSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, gistSelector, (code, gist) => code !== gist.code);
const codeBlock = function (code) {
  let language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return '```' + language + `\n${code}\n` + '```';
};
const maybeOutput = (code, whenPresent) => {
  if (code && code.length !== 0) {
    whenPresent(code);
  }
};
const snippetSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(gistSelector, permalinkSelector, (gist, permalink) => {
  let snippet = '';
  maybeOutput(gist.code, code => {
    snippet += (0,common_tags__WEBPACK_IMPORTED_MODULE_0__.source)`
        ${codeBlock(code, 'rust')}

        ([Playground](${permalink}))
      `;
  });
  maybeOutput(gist.stdout, stdout => {
    snippet += '\n\n';
    snippet += (0,common_tags__WEBPACK_IMPORTED_MODULE_0__.source)`
          Output:

          ${codeBlock(stdout)}
        `;
  });
  maybeOutput(gist.stderr, stderr => {
    snippet += '\n\n';
    snippet += (0,common_tags__WEBPACK_IMPORTED_MODULE_0__.source)`
          Errors:

          ${codeBlock(stderr)}
        `;
  });
  return snippet;
});
const urloUrlSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(snippetSelector, snippet => {
  const newUsersPostUrl = new URL('https://users.rust-lang.org/new-topic');
  newUsersPostUrl.searchParams.set('body', snippet);
  return newUsersPostUrl.href;
});
const codeUrlSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(baseUrlSelector, urlQuerySelector, gistSelector, (baseUrl, originalQuery, gist) => {
  const u = new URL(baseUrl);
  const query = new URLSearchParams(originalQuery);
  if (gist.code) {
    query.set('code', gist.code);
  }
  u.search = new URLSearchParams(query).toString();
  return u.href;
});
const notificationsSelector = state => state.notifications;
const NOW = new Date();
const RUST_SURVEY_2022_END = new Date('2022-12-19T00:00:00Z');
const RUST_SURVEY_2022_OPEN = NOW <= RUST_SURVEY_2022_END;
const showRustSurvey2022Selector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(notificationsSelector, notifications => RUST_SURVEY_2022_OPEN && !notifications.seenRustSurvey2022);
const anyNotificationsToShowSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(showRustSurvey2022Selector, function () {
  for (var _len = arguments.length, allNotifications = new Array(_len), _key = 0; _key < _len; _key++) {
    allNotifications[_key] = arguments[_key];
  }
  return allNotifications.some(n => n);
});
const clippyRequestSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, editionSelector, getCrateType, (code, edition, crateType) => ({
  code,
  edition,
  crateType
}));
const formatRequestSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, editionSelector, (code, edition) => ({
  code,
  edition
}));
const focus = state => state.output.meta.focus;
const isOutputFocused = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(focus, focus => !!focus);
const orientationConfig = state => state.configuration.orientation;
const browserWidthIsSmall = state => state.browser.isSmall;
const orientation = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(orientationConfig, browserWidthIsSmall, (orientation, widthIsSmall) => {
  if (orientation == _types__WEBPACK_IMPORTED_MODULE_1__.Orientation.Automatic) {
    if (widthIsSmall) {
      return _types__WEBPACK_IMPORTED_MODULE_1__.Orientation.Horizontal;
    } else {
      return _types__WEBPACK_IMPORTED_MODULE_1__.Orientation.Vertical;
    }
  } else {
    return orientation;
  }
});
const ratioGeneration = state => state.browser.ratioGeneration;
const aceResizeKey = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(focus, ratioGeneration, (focus, ratioGeneration) => [focus, ratioGeneration]);
const aceConfig = s => s.configuration.ace;
const aceKeybinding = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(aceConfig, c => c.keybinding);
const acePairCharacters = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(aceConfig, c => c.pairCharacters);
const aceTheme = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(aceConfig, c => c.theme);
const offerCrateAutocompleteOnUse = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(editionSelector, edition => edition !== _types__WEBPACK_IMPORTED_MODULE_1__.Edition.Rust2015);
const websocket = state => state.websocket;
const websocketFeatureFlagEnabled = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(websocket, ws => ws.featureFlagEnabled);
const useWebsocketSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(websocket, ws => ws.connected && ws.featureFlagEnabled);
const websocketStatusSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(websocket, ws => {
  if (ws.error) {
    return {
      state: 'error',
      error: ws.error
    };
  }
  if (ws.connected) {
    return {
      state: 'connected'
    };
  }
  return {
    state: 'disconnected'
  };
});
const executeRequestPayloadSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createSelector)(codeSelector, state => state.configuration, (_state, _ref) => {
  let {
    crateType,
    tests
  } = _ref;
  return {
    crateType,
    tests
  };
}, (code, configuration, _ref2) => {
  let {
    crateType,
    tests
  } = _ref2;
  return {
    channel: configuration.channel,
    mode: configuration.mode,
    edition: configuration.edition,
    crateType,
    tests,
    code,
    backtrace: configuration.backtrace === _types__WEBPACK_IMPORTED_MODULE_1__.Backtrace.Enabled
  };
});

/***/ }),

/***/ "./session_storage.ts":
/*!****************************!*\
  !*** ./session_storage.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   deserialize: () => (/* binding */ deserialize),
/* harmony export */   serialize: () => (/* binding */ serialize)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./storage.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectors */ "./selectors/index.ts");
// This is used to store "short-term" values; those which we want to
// be preserved between the same sessions of the playground, such as
// when we reopen a closed tab.


const CURRENT_VERSION = 1;
function serialize(state) {
  const code = (0,_selectors__WEBPACK_IMPORTED_MODULE_1__.codeSelector)(state);
  return JSON.stringify({
    version: CURRENT_VERSION,
    configuration: {
      primaryAction: state.configuration.primaryAction
    },
    code
  });
}
function deserialize(savedState) {
  if (!savedState) {
    return undefined;
  }
  const parsedState = JSON.parse(savedState);
  if (!parsedState) {
    return undefined;
  }
  if (parsedState.version !== CURRENT_VERSION) {
    return undefined;
  }
  // This assumes that the keys we serialize with match the keys in the
  // live state. If that's no longer true, an additional renaming step
  // needs to be added.
  return (0,_storage__WEBPACK_IMPORTED_MODULE_0__.removeVersion)(parsedState);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_storage__WEBPACK_IMPORTED_MODULE_0__.initializeStorage)({
  storageFactory: () => sessionStorage,
  serialize,
  deserialize
}));

/***/ }),

/***/ "./storage.ts":
/*!********************!*\
  !*** ./storage.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InMemoryStorage: () => (/* binding */ InMemoryStorage),
/* harmony export */   initializeStorage: () => (/* binding */ initializeStorage),
/* harmony export */   removeVersion: () => (/* binding */ removeVersion)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function removeVersion(data) {
  const munged = _objectSpread({}, data);
  delete munged.version;
  return munged;
}
class InMemoryStorage {
  constructor() {
    _defineProperty(this, "data", {});
  }
  getItem(name) {
    return this.data[name];
  }
  setItem(name, value) {
    this.data[name] = value;
  }
}
const KEY = 'redux';
function initializeStorage(config) {
  return () => {
    const {
      storageFactory,
      serialize,
      deserialize
    } = config;
    const storage = validateStorage(storageFactory);
    const serializedState = storage.getItem(KEY);
    const initialState = serializedState ? deserialize(serializedState) : undefined;
    const saveChanges = state => {
      const serializedState = serialize(state);
      storage.setItem(KEY, serializedState);
    };
    return {
      initialState,
      saveChanges
    };
  };
}
// Attempt to use the storage to see if security settings are
// preventing it. Falls back to dummy in-memory storage if needed.
function validateStorage(storageFactory) {
  try {
    const storage = storageFactory();
    const current = storage.getItem(KEY);
    storage.setItem(KEY, current || '');
    return storage;
  } catch (e) {
    console.warn('Unable to store configuration, falling back to non-persistent in-memory storage');
    return new InMemoryStorage();
  }
}

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssemblyFlavor: () => (/* binding */ AssemblyFlavor),
/* harmony export */   Backtrace: () => (/* binding */ Backtrace),
/* harmony export */   Channel: () => (/* binding */ Channel),
/* harmony export */   DemangleAssembly: () => (/* binding */ DemangleAssembly),
/* harmony export */   Edition: () => (/* binding */ Edition),
/* harmony export */   Editor: () => (/* binding */ Editor),
/* harmony export */   Focus: () => (/* binding */ Focus),
/* harmony export */   Mode: () => (/* binding */ Mode),
/* harmony export */   Notification: () => (/* binding */ Notification),
/* harmony export */   Orientation: () => (/* binding */ Orientation),
/* harmony export */   PairCharacters: () => (/* binding */ PairCharacters),
/* harmony export */   PrimaryActionAuto: () => (/* binding */ PrimaryActionAuto),
/* harmony export */   PrimaryActionCore: () => (/* binding */ PrimaryActionCore),
/* harmony export */   ProcessAssembly: () => (/* binding */ ProcessAssembly),
/* harmony export */   makePosition: () => (/* binding */ makePosition)
/* harmony export */ });
const makePosition = (line, column) => ({
  line: +line,
  column: +column
});
var Editor;
(function (Editor) {
  Editor["Simple"] = "simple";
  Editor["Ace"] = "ace";
  Editor["Monaco"] = "monaco";
})(Editor || (Editor = {}));
var PairCharacters;
(function (PairCharacters) {
  PairCharacters["Enabled"] = "enabled";
  PairCharacters["Disabled"] = "disabled";
})(PairCharacters || (PairCharacters = {}));
var Orientation;
(function (Orientation) {
  Orientation["Automatic"] = "automatic";
  Orientation["Horizontal"] = "horizontal";
  Orientation["Vertical"] = "vertical";
})(Orientation || (Orientation = {}));
var AssemblyFlavor;
(function (AssemblyFlavor) {
  AssemblyFlavor["Att"] = "att";
  AssemblyFlavor["Intel"] = "intel";
})(AssemblyFlavor || (AssemblyFlavor = {}));
var DemangleAssembly;
(function (DemangleAssembly) {
  DemangleAssembly["Demangle"] = "demangle";
  DemangleAssembly["Mangle"] = "mangle";
})(DemangleAssembly || (DemangleAssembly = {}));
var ProcessAssembly;
(function (ProcessAssembly) {
  ProcessAssembly["Filter"] = "filter";
  ProcessAssembly["Raw"] = "raw";
})(ProcessAssembly || (ProcessAssembly = {}));
var PrimaryActionAuto;
(function (PrimaryActionAuto) {
  PrimaryActionAuto["Auto"] = "auto";
})(PrimaryActionAuto || (PrimaryActionAuto = {}));
var PrimaryActionCore;
(function (PrimaryActionCore) {
  PrimaryActionCore["Asm"] = "asm";
  PrimaryActionCore["Compile"] = "compile";
  PrimaryActionCore["Execute"] = "execute";
  PrimaryActionCore["LlvmIr"] = "llvm-ir";
  PrimaryActionCore["Hir"] = "hir";
  PrimaryActionCore["Mir"] = "mir";
  PrimaryActionCore["Test"] = "test";
  PrimaryActionCore["Wasm"] = "wasm";
})(PrimaryActionCore || (PrimaryActionCore = {}));
var Channel;
(function (Channel) {
  Channel["Stable"] = "stable";
  Channel["Beta"] = "beta";
  Channel["Nightly"] = "nightly";
  Channel["Java19"] = "java19";
})(Channel || (Channel = {}));
var Mode;
(function (Mode) {
  Mode["Debug"] = "debug";
  Mode["Release"] = "release";
})(Mode || (Mode = {}));
var Edition;
(function (Edition) {
  Edition["Rust2015"] = "2015";
  Edition["Rust2018"] = "2018";
  Edition["Rust2021"] = "2021";
})(Edition || (Edition = {}));
var Backtrace;
(function (Backtrace) {
  Backtrace["Disabled"] = "disabled";
  Backtrace["Enabled"] = "enabled";
})(Backtrace || (Backtrace = {}));
var Focus;
(function (Focus) {
  Focus["Clippy"] = "clippy";
  Focus["Miri"] = "miri";
  Focus["MacroExpansion"] = "macro-expansion";
  Focus["LlvmIr"] = "llvm-ir";
  Focus["Mir"] = "mir";
  Focus["Hir"] = "hir";
  Focus["Wasm"] = "wasm";
  Focus["Asm"] = "asm";
  Focus["Execute"] = "execute";
  Focus["Format"] = "format";
  Focus["Gist"] = "gist";
})(Focus || (Focus = {}));
var Notification;
(function (Notification) {
  Notification["RustSurvey2022"] = "rust-survey-2022";
})(Notification || (Notification = {}));

/***/ }),

/***/ "./uss-router/Link.tsx":
/*!*****************************!*\
  !*** ./uss-router/Link.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Router */ "./uss-router/Router.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
const _excluded = ["action", "onClick", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const Link = props => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const router = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Router__WEBPACK_IMPORTED_MODULE_2__.Context);
  const {
      action,
      onClick,
      children
    } = props,
    anchorProps = _objectWithoutProperties(props, _excluded);
  const realOnClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    if (onClick) {
      onClick();
    } else if (action) {
      dispatch(action());
    }
    e.preventDefault();
  }, [action, dispatch, onClick]);
  if (!router) {
    return null;
  }
  const location = router.provisionalLocation(action);
  const href = location.pathname;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", _objectSpread(_objectSpread({}, anchorProps), {}, {
    href: href,
    onClick: realOnClick,
    children: children
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Link);

/***/ }),

/***/ "./uss-router/Router.tsx":
/*!*******************************!*\
  !*** ./uss-router/Router.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Context: () => (/* binding */ Context),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


const Context = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
const Router = _ref => {
  let {
    router,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Context.Provider, {
    value: router,
    children: children
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./uss-router/index.ts":
/*!*****************************!*\
  !*** ./uss-router/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRouter: () => (/* binding */ createRouter)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/isEqual.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");


function createRouter(_ref) {
  let {
    store,
    reducer,
    history,
    stateSelector,
    stateToLocation,
    locationToAction
  } = _ref;
  let interestingPrevState;
  // Watch changes to the Redux state
  store.subscribe(() => {
    const nextState = store.getState();
    // It's only worth checking if our state subset has changed.
    const interestingNextState = stateSelector(nextState);
    if ((0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(interestingNextState, interestingPrevState)) {
      return;
    }
    interestingPrevState = interestingNextState;
    // If our next location matches where we already are, leave the
    // history stack as-is.
    const nextLocation = stateToLocation(nextState);
    if (pathsEqualEnough(history, history.location, nextLocation)) {
      return;
    }
    history.push(nextLocation);
  });
  const dispatchBrowserLocationChange = nextLocation => {
    const action = locationToAction(nextLocation);
    if (action) {
      store.dispatch(action);
    }
  };
  // Watch changes to the browser state
  history.listen(_ref2 => {
    let {
      action,
      location
    } = _ref2;
    if (action === 'POP') {
      dispatchBrowserLocationChange(location);
    }
  });
  // Load initial browser state
  dispatchBrowserLocationChange(history.location);
  return {
    provisionalLocation: makeAction => {
      const state = store.getState();
      const tempStore = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.configureStore)({
        reducer,
        // This is a hack -- we know that our fully-constructed state is
        // valid as a "preloaded" state for a brand new store!
        preloadedState: state,
        devTools: false
      });
      const action = makeAction();
      tempStore.dispatch(action);
      const maybeState = tempStore.getState();
      return stateToLocation(maybeState);
    }
  };
}
function pathsEqualEnough(history, a, b) {
  const aHref = history.createHref(a);
  const bHref = history.createHref(b);
  return aHref === bHref;
}

/***/ }),

/***/ "./websocketActions.ts":
/*!*****************************!*\
  !*** ./websocketActions.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWebsocketResponseAction: () => (/* binding */ createWebsocketResponseAction),
/* harmony export */   createWebsocketResponseSchema: () => (/* binding */ createWebsocketResponseSchema),
/* harmony export */   makeWebSocketMeta: () => (/* binding */ makeWebSocketMeta)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ "./node_modules/zod/lib/index.mjs");

const createWebsocketResponseAction = type => {
  function actionCreator() {
    throw 'Should never be executed by JS';
  }
  actionCreator.type = type;
  actionCreator.toString = () => type;
  // TODO: Add .match() ?
  return actionCreator;
};
const createWebsocketResponseSchema = (creator, payload) => zod__WEBPACK_IMPORTED_MODULE_0__["default"].object({
  type: zod__WEBPACK_IMPORTED_MODULE_0__["default"].literal(creator.type),
  payload,
  meta: zod__WEBPACK_IMPORTED_MODULE_0__["default"].object({
    // deliberately omitting `websocket` to avoid sending the server's
    // responses back to the server infinitely
    sequenceNumber: zod__WEBPACK_IMPORTED_MODULE_0__["default"].number()
  })
});
const nextSequenceNumber = (() => {
  let sequenceNumber = 0;
  return () => sequenceNumber++;
})();
const makeWebSocketMeta = () => ({
  websocket: true,
  sequenceNumber: nextSequenceNumber()
});

/***/ }),

/***/ "./websocketMiddleware.ts":
/*!********************************!*\
  !*** ./websocketMiddleware.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   websocketMiddleware: () => (/* binding */ websocketMiddleware)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ "./node_modules/zod/lib/index.mjs");
/* harmony import */ var _reducers_output_execute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers/output/execute */ "./reducers/output/execute.ts");
/* harmony import */ var _reducers_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers/websocket */ "./reducers/websocket.ts");



const WSMessageResponse = zod__WEBPACK_IMPORTED_MODULE_2__.z.discriminatedUnion('type', [_reducers_websocket__WEBPACK_IMPORTED_MODULE_1__.websocketConnectedSchema, _reducers_websocket__WEBPACK_IMPORTED_MODULE_1__.websocketErrorSchema, _reducers_output_execute__WEBPACK_IMPORTED_MODULE_0__.wsExecuteResponseSchema]);
const reportWebSocketError = (() => {
  let lastReport;
  let lastReportTime = 0;
  return async error => {
    // Don't worry about reporting the same thing again.
    if (lastReport === error) {
      return;
    }
    lastReport = error;
    // Don't worry about spamming the server with reports.
    const now = Date.now();
    if (now - lastReportTime < 1000) {
      return;
    }
    lastReportTime = now;
    try {
      await fetch('/nowebsocket', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error
        })
      });
    } catch (reportError) {
      console.log('Unable to report WebSocket error', error, reportError);
    }
  };
})();
const openWebSocket = currentLocation => {
  try {
    const wsProtocol = currentLocation.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUri = [wsProtocol, currentLocation.host, '/websocket'].join('');
    return new WebSocket(wsUri);
  } catch (e) {
    // WebSocket URL error or WebSocket is not supported by browser.
    // Assume it's the second case since URL error is easy to notice.
    const detail = e instanceof Error ? e.toString() : 'An unknown error occurred';
    reportWebSocketError(`Could not create the WebSocket: ${detail}`);
    return null;
  }
};
// https://exponentialbackoffcalculator.com
const backoffMs = n => Math.min(100 * Math.pow(2, n), 10000);
const idleTimeoutMs = 60 * 60 * 1000;
const websocketMiddleware = window => store => {
  let socket = null;
  let wasConnected = false;
  let reconnectAttempt = 0;
  let timeout = null;
  const resetTimeout = () => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      if (!socket) {
        return;
      }
      socket.close();
    }, idleTimeoutMs);
  };
  const connect = () => {
    socket = openWebSocket(window.location);
    if (socket) {
      resetTimeout();
      socket.addEventListener('open', () => {
        if (socket) {
          socket.send(JSON.stringify((0,_reducers_websocket__WEBPACK_IMPORTED_MODULE_1__.websocketConnected)()));
        }
      });
      socket.addEventListener('close', event => {
        store.dispatch((0,_reducers_websocket__WEBPACK_IMPORTED_MODULE_1__.websocketDisconnected)());
        // Reconnect if we've previously connected
        if (wasConnected && !event.wasClean) {
          reconnect();
        }
      });
      socket.addEventListener('error', () => {
        // We cannot get detailed information about the failure
        // https://stackoverflow.com/a/31003057/155423
        const error = 'Generic WebSocket Error';
        store.dispatch((0,_reducers_websocket__WEBPACK_IMPORTED_MODULE_1__.websocketError)({
          error
        }));
        reportWebSocketError(error);
      });
      socket.addEventListener('message', event => {
        try {
          const rawMessage = JSON.parse(event.data);
          const message = WSMessageResponse.parse(rawMessage);
          if (_reducers_websocket__WEBPACK_IMPORTED_MODULE_1__.websocketConnected.match(message)) {
            wasConnected = true;
            reconnectAttempt = 0;
          }
          store.dispatch(message);
          resetTimeout();
        } catch (e) {
          console.log('Unable to parse WebSocket message', event.data, e);
        }
      });
    }
  };
  const reconnect = () => {
    const delay = backoffMs(reconnectAttempt);
    reconnectAttempt += 1;
    window.setTimeout(connect, delay);
  };
  connect();
  return next => action => {
    if (socket && socket.readyState == socket.OPEN && sendActionOnWebsocket(action)) {
      const message = JSON.stringify(action);
      socket.send(message);
      resetTimeout();
    }
    next(action);
  };
};
const sendActionOnWebsocket = action => action?.meta?.websocket;

/***/ }),

/***/ "./BuildMenu.module.css":
/*!******************************!*\
  !*** ./BuildMenu.module.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"code":"BuildMenu-module__code--HcCVc3DEOJ483zlAdFgw"});

/***/ }),

/***/ "./ButtonMenuItem.module.css":
/*!***********************************!*\
  !*** ./ButtonMenuItem.module.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"ButtonMenuItem-module__container--ZBsIUMTsEHWlcJGPERwt shared-module__-menuItemFullButton--lBz1gSS85WZ6qqIt9Cco shared-module__-buttonReset--PejGgtkj000mm2SKywBY","name":"ButtonMenuItem-module__name--U3eu8DZRzKgoWmI9wWBx shared-module__-menuItemTitle--HicpIY2li9fAT1ZzESTQ","description":"ButtonMenuItem-module__description--Fk9BAvzLbfjngFiF95EV"});

/***/ }),

/***/ "./ChannelMenu.module.css":
/*!********************************!*\
  !*** ./ChannelMenu.module.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"description":"ChannelMenu-module__description--KO1OiJLCsxcx4SwuS4d0"});

/***/ }),

/***/ "./ConfigElement.module.css":
/*!**********************************!*\
  !*** ./ConfigElement.module.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"ConfigElement-module__container--DAq9FuR0GnDMGBkcIjPS","name":"ConfigElement-module__name--UZGeICHemsqfQETsxb4B","notDefault":"ConfigElement-module__notDefault--wA5S9VYguQB3d2LdMv_m ConfigElement-module__name--UZGeICHemsqfQETsxb4B","value":"ConfigElement-module__value--YDb9s81ZyjXlOK_wF9nK","select":"ConfigElement-module__select--ANyTfRVnRJ3XSk8CPrEK","toggle":"ConfigElement-module__toggle--ZFx9yjD0LVODp6xZkQfF"});

/***/ }),

/***/ "./Header.module.css":
/*!***************************!*\
  !*** ./Header.module.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Header-module__container--QKslz1Vt3XLi5Hw8l3Xn","set":"Header-module__set--KAPchH0wdU0P0tfPquj8","setChannelMode":"Header-module__setChannelMode--ypeoxYxEzniEfISV88d3"});

/***/ }),

/***/ "./HeaderButton.module.css":
/*!*********************************!*\
  !*** ./HeaderButton.module.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"HeaderButton-module__container--soEOc7tmJJHUc6EnMVc2","bold":"HeaderButton-module__bold--SbMUq6_2TUMg4ViUKYKo","expandable":"HeaderButton-module__expandable--SKvbB7FiH_mJ7TvEUOwa HeaderButton-module__container--soEOc7tmJJHUc6EnMVc2","hasLeftIcon":"HeaderButton-module__hasLeftIcon--PI2Azx9lvN4zwlGWqwM4 HeaderButton-module__container--soEOc7tmJJHUc6EnMVc2","hasRightIcon":"HeaderButton-module__hasRightIcon--COw1rNNZvv5S9PEK_Z_f HeaderButton-module__container--soEOc7tmJJHUc6EnMVc2","iconOnly":"HeaderButton-module__iconOnly--Y4lsg97PJQt5C2Z_eGVy HeaderButton-module__container--soEOc7tmJJHUc6EnMVc2","leftIcon":"HeaderButton-module__leftIcon--Qc_BVM1gYQguual4TMwH","drop":"HeaderButton-module__drop--U8eI2H3SnhTTd020St2y","rightIcon":"HeaderButton-module__rightIcon--ljZQQv5NlJvTyPVPkGJv"});

/***/ }),

/***/ "./Help.module.css":
/*!*************************!*\
  !*** ./Help.module.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Help-module__container--OwsEEdjsVbpKDgh93A9A","code":"Help-module__code--kkvSsGLjue7oz32nRQns","logo":"Help-module__logo--ErSdx8bvJPa1hmI48SHf","header":"Help-module__header--G3kNKxeiQ2bzvpzrRmiK","headerLink":"Help-module__headerLink--DeecMfOHV8JXP_bMAj5A"});

/***/ }),

/***/ "./HelpExample.module.css":
/*!********************************!*\
  !*** ./HelpExample.module.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"HelpExample-module__container--xdp20MtL6nShnq6JxSA5","loadExample":"HelpExample-module__loadExample--rFtxqICp0qHRL2PWL9vX"});

/***/ }),

/***/ "./Icon.module.css":
/*!*************************!*\
  !*** ./Icon.module.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"icon":"Icon-module__icon--bwriTBp9mt3lT3cYfTnK"});

/***/ }),

/***/ "./Loader.module.css":
/*!***************************!*\
  !*** ./Loader.module.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"dot":"Loader-module__dot--mfy80lScepjSSx4cM8yd","loader-fade":"Loader-module__loader-fade--oYWgnPpBY4Q7N11LIl6H"});

/***/ }),

/***/ "./MenuAside.module.css":
/*!******************************!*\
  !*** ./MenuAside.module.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"aside":"MenuAside-module__aside--aJ2F4WDK9goc4Ta1_16D"});

/***/ }),

/***/ "./MenuGroup.module.css":
/*!******************************!*\
  !*** ./MenuGroup.module.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"MenuGroup-module__container--cvPY9O51OvPnCPcYDMX9","title":"MenuGroup-module__title--Tv6w7AHNAWZ0VBCI36os","content":"MenuGroup-module__content--rI4p4UgbssyyLmtqzk76"});

/***/ }),

/***/ "./MenuItem.module.css":
/*!*****************************!*\
  !*** ./MenuItem.module.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"MenuItem-module__container--qQQRRXyLzTu6JHvHGMQx"});

/***/ }),

/***/ "./Notifications.module.css":
/*!**********************************!*\
  !*** ./Notifications.module.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Notifications-module__container--LBC0qJPeimWoQ7397D9k","notification":"Notifications-module__notification--pqPkQfbJ9C4DmfuUxyx9","notificationContent":"Notifications-module__notificationContent--jzQ2SPIoFblsWQuldbL8","close":"Notifications-module__close--lFs_eSV6qPVCVlVtuIOT shared-module__-buttonReset--PejGgtkj000mm2SKywBY"});

/***/ }),

/***/ "./Output.module.css":
/*!***************************!*\
  !*** ./Output.module.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Output-module__container--b_JxsoWvy1O6mnQxpOu1","tabs":"Output-module__tabs--ZKaG84C0njlCcUOPfWke","tab":"Output-module__tab--hBPeCwvLPAYW7BmO5fma","tabSelected":"Output-module__tabSelected--rqSU_up47fiEji4d8T3W Output-module__tab--hBPeCwvLPAYW7BmO5fma","tabClose":"Output-module__tabClose--CZsPIs2NbtVOHL_S5jM8 Output-module__tab--hBPeCwvLPAYW7BmO5fma","body":"Output-module__body--KY1sicBGfwv3aWkbHCS1"});

/***/ }),

/***/ "./Output/Execute.module.css":
/*!***********************************!*\
  !*** ./Output/Execute.module.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"addMain":"Output-Execute-module__addMain--lc6FiVCXrxM7p0C5a9X6 shared-module__-buttonAsLink--aKZpJgmywQijXbVJVIIq shared-module__-buttonReset--PejGgtkj000mm2SKywBY"});

/***/ }),

/***/ "./Output/Gist.module.css":
/*!********************************!*\
  !*** ./Output/Gist.module.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Output-Gist-module__container--GMYhco7Lx4QIu6PnERwg","button":"Output-Gist-module__button--wvvAP_UDqtz70AsVgDZW shared-module__-buttonReset--PejGgtkj000mm2SKywBY","text":"Output-Gist-module__text--SdHB7g2C4Yp3_tyDpDTs","active":"Output-Gist-module__active--FL6pF81DGf2PiaKWw4wj Output-Gist-module__container--GMYhco7Lx4QIu6PnERwg"});

/***/ }),

/***/ "./Output/Header.module.css":
/*!**********************************!*\
  !*** ./Output/Header.module.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Output-Header-module__container--t8simowvs7SVfaj9NoU6"});

/***/ }),

/***/ "./Output/OutputPrism.module.css":
/*!***************************************!*\
  !*** ./Output/OutputPrism.module.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Output-OutputPrism-module__container--hG7gaiXUHSHwDNYhJsb8 shared-module__-bodyMonospace--GtOBiXh6TX6MRcPpfiv5"});

/***/ }),

/***/ "./Output/Section.module.css":
/*!***********************************!*\
  !*** ./Output/Section.module.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"code":"Output-Section-module__code--mzFQw6qCl6QiKVO3jUC8 shared-module__-bodyMonospace--GtOBiXh6TX6MRcPpfiv5"});

/***/ }),

/***/ "./Playground.module.css":
/*!*******************************!*\
  !*** ./Playground.module.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"Playground-module__container--SkID_M2W7gSrOhRFjLaJ","-resizeableArea":"Playground-module__-resizeableArea--XXxoVrXS5Mej_pFk_PHy shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","resizeableAreaRowOutputUnfocused":"Playground-module__resizeableAreaRowOutputUnfocused--yN1wHalw0EpHKBuXaRg8 Playground-module__-resizeableArea--XXxoVrXS5Mej_pFk_PHy shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","resizeableAreaRowOutputFocused":"Playground-module__resizeableAreaRowOutputFocused--DWx8hJ46arhcnnk1ueWe Playground-module__-resizeableArea--XXxoVrXS5Mej_pFk_PHy shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","resizeableAreaColumnOutputUnfocused":"Playground-module__resizeableAreaColumnOutputUnfocused--t_ueFC9K6Oc3NZT5h04M Playground-module__-resizeableArea--XXxoVrXS5Mej_pFk_PHy shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","resizeableAreaColumnOutputFocused":"Playground-module__resizeableAreaColumnOutputFocused--sXdFiBuISx83JpkbtDnJ Playground-module__-resizeableArea--XXxoVrXS5Mej_pFk_PHy shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","-gutter":"Playground-module__-gutter--kBagNtDt7oP_4fkJdcEW","splitRowsGutter":"Playground-module__splitRowsGutter--VZcRbdE2eGGMYxslV2hu Playground-module__-gutter--kBagNtDt7oP_4fkJdcEW","splitRowsGutterHandle":"Playground-module__splitRowsGutterHandle--itUwheGe7_3wc2_OBp8z","splitColumnsGutter":"Playground-module__splitColumnsGutter--CbcPYrWysCA40uLCP7cg Playground-module__-gutter--kBagNtDt7oP_4fkJdcEW","editor":"Playground-module__editor--qcUzBu2Yp9XaUlE7qqMj shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","output":"Playground-module__output--MUsB4Icg2vMUeu3FkDJP shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA"});

/***/ }),

/***/ "./PopButton.module.css":
/*!******************************!*\
  !*** ./PopButton.module.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"PopButton-module__container--f03XebbWseUsZ5_ekiaR","content":"PopButton-module__content--kmvyt8WNV3ZxpHzMfgFb"});

/***/ }),

/***/ "./SegmentedButton.module.css":
/*!************************************!*\
  !*** ./SegmentedButton.module.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"SegmentedButton-module__container--YjGHtG8Gm4FuhNLmEyTh","button":"SegmentedButton-module__button--cB6xmdtmCri5h1xUl0Og shared-module__-buttonReset--PejGgtkj000mm2SKywBY","buttonBuild":"SegmentedButton-module__buttonBuild--jDtgRDRhly512xl2nuBb SegmentedButton-module__button--cB6xmdtmCri5h1xUl0Og shared-module__-buttonReset--PejGgtkj000mm2SKywBY"});

/***/ }),

/***/ "./SelectableMenuItem.module.css":
/*!***************************************!*\
  !*** ./SelectableMenuItem.module.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"SelectableMenuItem-module__container--pDTYH95tmF9IhDo_o5lV shared-module__-menuItemFullButton--lBz1gSS85WZ6qqIt9Cco shared-module__-buttonReset--PejGgtkj000mm2SKywBY","selected":"SelectableMenuItem-module__selected--FXUme88Y7h51jLstTjAr SelectableMenuItem-module__container--pDTYH95tmF9IhDo_o5lV shared-module__-menuItemFullButton--lBz1gSS85WZ6qqIt9Cco shared-module__-buttonReset--PejGgtkj000mm2SKywBY","header":"SelectableMenuItem-module__header--sgIY00Gh0NPiztzKrM8r","name":"SelectableMenuItem-module__name--gsZOZLE4mCHfNR54FOcS shared-module__-menuItemTitle--HicpIY2li9fAT1ZzESTQ","description":"SelectableMenuItem-module__description--iAHpLAzmDpalenTDsDBy","checkmark":"SelectableMenuItem-module__checkmark--yUhK5WH0jSkJuVJzKalp"});

/***/ }),

/***/ "./editor/Editor.module.css":
/*!**********************************!*\
  !*** ./editor/Editor.module.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"container":"editor-Editor-module__container--e4W4wpvo1y9F4ag5QJj6 shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","-advanced":"editor-Editor-module__-advanced--KzIAWyeqeADNnSbMKJKU shared-module__-bodyMonospace--GtOBiXh6TX6MRcPpfiv5 shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","ace":"editor-Editor-module__ace--za9ERySo77fujpkadp5K editor-Editor-module__-advanced--KzIAWyeqeADNnSbMKJKU shared-module__-bodyMonospace--GtOBiXh6TX6MRcPpfiv5 shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","monaco":"editor-Editor-module__monaco--E7VjWkpKwrMzr_qq4CFb editor-Editor-module__-advanced--KzIAWyeqeADNnSbMKJKU shared-module__-bodyMonospace--GtOBiXh6TX6MRcPpfiv5 shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA","simple":"editor-Editor-module__simple--eARrBepneI1lIWqGdY2g editor-Editor-module__-advanced--KzIAWyeqeADNnSbMKJKU shared-module__-bodyMonospace--GtOBiXh6TX6MRcPpfiv5 shared-module__-autoSize--j7UJjOJI8cVCDvKDj1NA"});

/***/ }),

/***/ "./index.module.css":
/*!**************************!*\
  !*** ./index.module.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./assets/integer32-logo.svg":
/*!***********************************!*\
  !*** ./assets/integer32-logo.svg ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2MCA1NjAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAyODkuMjAwMDEgNDguNzAwMDAxIiBoZWlnaHQ9IjQ4LjciIHdpZHRoPSIyODkuMiIgdmVyc2lvbj0iMS4xIiB5PSIwcHgiIHg9IjBweCIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48bWV0YWRhdGE+PHJkZjpSREY+PGNjOldvcmsgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PHBvbHlnb24gcG9pbnRzPSIzMzYuNiAyNTcgMzc2LjcgMjU3IDM3Ni43IDI5Mi4zIDM1Ni42IDMwMC43IDMzNi42IDI5Mi4zIiBmaWxsPSIjMzU0YzlmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzM0LjksLTI1NS42KSIvPjxwb2x5Z29uIHBvaW50cz0iMzU2LjIgMzAwLjcgMzYyLjkgMjk4LjEgMzYxLjkgMjg0LjkgMzU1LjIgMjY2LjcgMzQ4LjEgMjU3LjggMzM3LjMgMjU4LjQgMzM3LjggMjc2LjQgMzQyLjYgMjk0LjgiIGZpbGw9IiNhN2QyZWUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzQuOSwtMjU1LjYpIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTM4LjggMS4zaC03LjdjLTUuMSAyLjgtMTAuNSAxMS45LTEwLjUgMTEuOWwzLjMgNi42YzAuMi0wLjQgMC4zIDEgMC41IDAuNmwyLjkgMTAuM2M1LTE0LjIgMTMuOS0xNi42IDEzLjktMTYuNmwwLjMtMTAuN2MtMC44IDAuNC0xLjktMi41LTIuNy0yLjF6Ii8+PHBhdGggZmlsbD0iIzM1NGM5ZiIgZD0ibTguNCAzOC43aC0yLjRjMC0xMS45LTUuNS0xNi45LTUuNi0xN2wxLjYtMS44YzAuMyAwLjIgNi40IDUuOSA2LjQgMTguOHoiLz48cGF0aCBmaWxsPSIjMzU0ZDlmIiBkPSJtMCAwdjM4LjFsMjEuNyA5LjIgMjEuNy05LjJ2LTM4LjFoLTQzLjR6bTI2LjcgNDEuNS00IDEuN2MwLjYtMjAuMS0xMC40LTMzLjktMTYuMy0zOS44aDVjMi42IDIuNiA3LjggOC40IDExLjQgMTcuMSAyLjUgNS43IDQuMSAxMi44IDMuOSAyMXptLTIzLjMtMzcuOGM1LjIgNC43IDE3LjUgMTguMiAxNi43IDM5LjJsLTQuNi0xLjljLTAuMS0xNy43LTguNi0yNy4yLTEyLjEtMzAuNHYtNi45em0yNi42LTAuM2g3LjNjLTYuNiA0LjctMTAuOSAxMC42LTEzIDE0LjEtMC44LTEuNy0xLjYtMy4zLTIuNC00LjggMC41LTEuMyAyLjctNS41IDguMS05LjN6bS05LjcgNi43Yy0xLjktMi45LTMuOC01LjEtNS4zLTYuOGgxMC45Yy0zLjEgMi42LTQuNyA1LjEtNS42IDYuOHptNS4yIDEwLjJjMS4xLTIuMSA1LjYtMTAgMTQuNi0xNS45djhjLTYuNCA0LjQtMTAuNiAxMS4xLTEyLjYgMTQuOS0wLjUtMi42LTEuMi00LjktMi03em0tMjIuMS02LjJjMy42IDMuOSA5LjMgMTIuMiA5LjYgMjUuOWwtOS42LTQuMXYtMjEuOHptMjUuMiAyNi42YzAuMi0zLjMgMC02LjQtMC4zLTkuNCAwLTAuMSA0LjEtMTAgMTEuOS0xNnYyMC41bC0xMS42IDQuOXoiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzM0LjksLTI1NS42KSI+PGcgZmlsbD0iIzNlNDU1NSI+PHBhdGggZD0ibTM5NC4yIDI2MS43Yy0wLjctMC43LTEtMS41LTEtMi41czAuMy0xLjggMS0yLjUgMS41LTEgMi41LTEgMS44IDAuMyAyLjUgMSAxIDEuNSAxIDIuNS0wLjMgMS44LTEgMi41LTEuNSAxLTIuNSAxLTEuOC0wLjMtMi41LTF6bTUuMiAzMS44aC01LjZ2LTI2LjVoNS42djI2LjV6Ii8+PHBhdGggZD0ibTQxMS41IDI3OS4ydjE0LjRoLTUuNnYtMjYuNmg1LjZ2NC44YzAuOS0xLjYgMi4xLTIuOSAzLjctMy44czMuMy0xLjQgNS4xLTEuNGMzIDAgNS40IDAuOSA3LjMgMi43IDEuOCAxLjggMi44IDQuNSAyLjggNy45djE2LjNoLTUuNnYtMTQuNWMwLTQuOS0yLTcuMy02LjEtNy4zLTEuOSAwLTMuNiAwLjYtNSAxLjktMS41IDEuMi0yLjIgMy4xLTIuMiA1LjZ6Ii8+PHBhdGggZD0ibTQ0Mi4yIDI3MS41djEzLjVjMCAxLjMgMC4zIDIuMyAxIDNzMS42IDEuMSAyLjggMS4xIDIuMy0wLjYgMy40LTEuN2wyLjMgMy45Yy0yIDEuOC00LjEgMi42LTYuNSAyLjZzLTQuNC0wLjgtNi4xLTIuNWMtMS43LTEuNi0yLjUtMy45LTIuNS02Ljd2LTEzLjNoLTMuM3YtNC40aDMuM3YtOC4zaDUuNnY4LjNoN3Y0LjVoLTd6Ii8+PHBhdGggZD0ibTQ3OS4zIDI4Mi43aC0yMC44YzAuMSAxLjkgMSAzLjUgMi42IDQuN3MzLjUgMS44IDUuNiAxLjhjMy4zIDAgNS45LTEgNy42LTMuMWwzLjIgMy41Yy0yLjkgMy02LjYgNC40LTExLjIgNC40LTMuNyAwLTYuOS0xLjItOS41LTMuN3MtMy45LTUuOC0zLjktMTAgMS4zLTcuNSA0LTEwIDUuOC0zLjcgOS40LTMuNyA2LjcgMS4xIDkuMiAzLjMgMy44IDUuMiAzLjggOXYzLjh6bS0yMC44LTQuNGgxNS4yYzAtMi4yLTAuNy0zLjktMi4xLTUuMXMtMy4xLTEuOC01LjItMS44Yy0yIDAtMy45IDAuNi01LjUgMS45LTEuNiAxLjItMi40IDIuOS0yLjQgNXoiLz48cGF0aCBkPSJtNTA4LjcgMjY3djIzLjJjMCA0LjctMS4zIDguMi0zLjggMTAuNnMtNS44IDMuNS05LjggMy41LTcuNi0xLjItMTAuOC0zLjdsMi42LTQuMmMyLjYgMiA1LjIgMi45IDcuOSAyLjlzNC43LTAuNyA2LjMtMmMxLjUtMS40IDIuMy0zLjUgMi4zLTYuNXYtMy40Yy0wLjggMS42LTIgMi44LTMuNiAzLjdzLTMuMyAxLjQtNS4yIDEuNGMtMy41IDAtNi40LTEuMi04LjctMy43cy0zLjQtNS41LTMuNC05LjIgMS4xLTYuNyAzLjQtOS4yIDUuMi0zLjcgOC43LTMuNyA2LjQgMS40IDguNiA0LjN2LTRoNS41em0tMjAuNyAxMi4yYzAgMi4yIDAuNyA0LjEgMiA1LjYgMS4zIDEuNiAzLjIgMi40IDUuNCAyLjQgMi4zIDAgNC4xLTAuOCA1LjUtMi4zczIuMS0zLjQgMi4xLTUuNy0wLjctNC4yLTIuMS01LjgtMy4zLTIuNC01LjUtMi40Yy0yLjMgMC00LjEgMC44LTUuNCAyLjQtMS4zIDEuNy0yIDMuNy0yIDUuOHoiLz48cGF0aCBkPSJtNTM4LjggMjgyLjdoLTIwLjhjMC4xIDEuOSAxIDMuNSAyLjYgNC43czMuNSAxLjggNS42IDEuOGMzLjMgMCA1LjktMSA3LjYtMy4xbDMuMiAzLjVjLTIuOSAzLTYuNiA0LjQtMTEuMiA0LjQtMy43IDAtNi45LTEuMi05LjUtMy43cy0zLjktNS44LTMuOS0xMCAxLjMtNy41IDQtMTAgNS44LTMuNyA5LjQtMy43IDYuNyAxLjEgOS4yIDMuMyAzLjggNS4yIDMuOCA5djMuOHptLTIwLjgtNC40aDE1LjJjMC0yLjItMC43LTMuOS0yLjEtNS4xcy0zLjEtMS44LTUuMi0xLjhjLTIgMC0zLjkgMC42LTUuNSAxLjktMS42IDEuMi0yLjQgMi45LTIuNCA1eiIvPjxwYXRoIGQ9Im01NTcgMjcyLjJjLTIuOCAwLTQuOCAwLjktNi4yIDIuN3MtMi4xIDQuMi0yLjEgNy4ydjExLjRoLTUuNnYtMjYuNWg1LjZ2NS4zYzAuOS0xLjcgMi4xLTMgMy43LTQuMXMzLjItMS42IDQuOS0xLjZsMC4xIDUuNmgtMC40eiIvPjxwYXRoIGQ9Im01NzQgMjYzLjl2LTUuMmgyMC40djQuNmwtOC40IDkuNGMzLjIgMC4xIDUuNyAxLjEgNy41IDNzMi43IDQuMiAyLjcgNi45YzAgMy42LTEuMiA2LjQtMy42IDguNHMtNS41IDMtOS4zIDMtNy41LTEuMi0xMS4xLTMuNmwyLjUtNC43YzIuOSAyIDUuOSAzIDkgMyAyIDAgMy43LTAuNSA1LTEuNHMyLTIuMyAyLTQuMS0wLjctMy4yLTIuMi00LjMtMy41LTEuNi02LjEtMS42Yy0xLjMgMC0yLjUgMC4yLTMuNyAwLjV2LTQuNWw4LjEtOS40aC0xMi44eiIvPjxwYXRoIGQ9Im02MTUuNyAyNzIuM2MxLTEuNCAxLjUtMi43IDEuNS00LjFzLTAuNS0yLjYtMS42LTMuNi0yLjQtMS41LTQtMS41Yy0yLjkgMC01LjIgMS41LTcuMSA0LjRsLTQuNy0yLjdjMS41LTIuMyAzLjItNCA1LjEtNS4yIDEuOC0xLjIgNC4yLTEuNyA3LjEtMS43czUuNSAwLjkgNy43IDIuOGMyLjIgMS44IDMuMyA0LjQgMy4zIDcuNiAwIDEuOC0wLjUgMy41LTEuNCA1LjFzLTIuNiAzLjctNS4xIDYuM2wtOC4yIDguM2gxNS44djUuNmgtMjMuOXYtNWwxMC42LTEwLjZjMi4yLTIuNSAzLjktNC40IDQuOS01Ljd6Ii8+PC9nPjwvZz48L3N2Zz4K";

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "-" + {"vendors-node_modules_ace-builds_src-noconflict_ace_js-node_modules_ace-builds_src-noconflict_-bbd52e":"9e7738c1648b2b65f09e","editor_AceEditorCore_tsx":"539d52d3154fcdd01637","vendors-node_modules_react-monaco-editor_lib_index_js":"a9bd8bc76c2b89764535","editor_MonacoEditorCore_tsx":"71c4de5164d1956d26d2","ace-keybinding-emacs":"ccd93216f87549ee0144","ace-keybinding-sublime":"7c72643a56a23681782c","ace-keybinding-vim":"a64602f4a9f0178457ed","ace-keybinding-vscode":"da9e7d48b97821893fe9","ace-theme-ambiance":"02e11e1f2fcedcb8063c","ace-theme-ambiance-css":"dd95333db024b010b0bd","ace-theme-chaos":"8e5255673e0ffde74c62","ace-theme-chaos-css":"038529822f9e68a4fc07","ace-theme-chrome":"d54296cd4620dfd25457","ace-theme-chrome-css":"727a4b4dec138f9354ab","ace-theme-cloud9_day":"2aafa05187822b11fe77","ace-theme-cloud9_day-css":"031f723c02db640e9ebd","ace-theme-cloud9_night":"9536a66051abb2976071","ace-theme-cloud9_night-css":"88c7376b98a5ba7e8c52","ace-theme-cloud9_night_low_color":"cdbddfccc420c4ccfbb3","ace-theme-cloud9_night_low_color-css":"b8f7622d172ca0cb39b4","ace-theme-clouds":"06256d94ed7d38a3ca2b","ace-theme-clouds-css":"3952cb96c414fe0c3dce","ace-theme-clouds_midnight":"1cde9c1da79b90c52eae","ace-theme-clouds_midnight-css":"e35997f213bae6e8fa62","ace-theme-cobalt":"2df17f94a5e54853203b","ace-theme-cobalt-css":"4814fd61a94f5ed53780","ace-theme-crimson_editor":"cdc8193eafa2c41fcb29","ace-theme-crimson_editor-css":"1af8f42e0578619dffa5","ace-theme-dawn":"1bcc34fde6f376651c92","ace-theme-dawn-css":"d83c681520695d3100f1","ace-theme-dracula":"41113af31317cb97077c","ace-theme-dracula-css":"feead4c83c3c956d8b5a","ace-theme-dreamweaver":"76baa2fde35b296ae287","ace-theme-dreamweaver-css":"e4cb57e194227bb3aa83","ace-theme-eclipse":"9201d2a0076398745db4","ace-theme-eclipse-css":"52d1372d4710a0f99da6","ace-theme-github":"2031fa166b09f87781ae","ace-theme-github-css":"e21889aa5a1d9d64d37d","ace-theme-github_dark":"ffcea2ab5e5197253a3a","ace-theme-github_dark-css":"3ab120216a5edf50df75","ace-theme-gob":"7923a29afa0c4542828e","ace-theme-gob-css":"66d0bc1499b5a566999c","ace-theme-gruvbox":"998b67b4ffa48c242a60","ace-theme-gruvbox-css":"fa79a634e49f552bb0b1","ace-theme-gruvbox_dark_hard":"3dbaf9d99236e66d7ff7","ace-theme-gruvbox_dark_hard-css":"8d5c323aca9cad827677","ace-theme-gruvbox_light_hard":"04cd17a8be6d94607e5c","ace-theme-gruvbox_light_hard-css":"b057e65a181de764d5ee","ace-theme-idle_fingers":"a6fdaab9b784e3122113","ace-theme-idle_fingers-css":"d2bd061e30b8ced14f44","ace-theme-iplastic":"31bf07eff16fac5fcf89","ace-theme-iplastic-css":"4ae253fb8c02a30f0d8e","ace-theme-katzenmilch":"c562ad6382373a73de85","ace-theme-katzenmilch-css":"35b24b764ffaf6c942bc","ace-theme-kr_theme":"0107546c826cc8aad49a","ace-theme-kr_theme-css":"7245af5ffc872d19e867","ace-theme-kuroir":"f8272111ba19b9e25c69","ace-theme-kuroir-css":"84c4eb79623cf8b23d52","ace-theme-merbivore":"b4896735af76a072d193","ace-theme-merbivore-css":"def533de99bcecb13ecf","ace-theme-merbivore_soft":"88a7768633cb246d0c27","ace-theme-merbivore_soft-css":"a818912fdb28bfb7bd31","ace-theme-mono_industrial":"35df9319305c3746d6e4","ace-theme-mono_industrial-css":"54c10d30211dfbc16581","ace-theme-monokai":"ea1773d0b55b5a06c3f7","ace-theme-monokai-css":"c377ba1606e13488e3a2","ace-theme-nord_dark":"d1f5eeddbe5d693c7699","ace-theme-nord_dark-css":"e07ffb8daa5c9a936517","ace-theme-one_dark":"e103e14940c1ea5fe6c4","ace-theme-one_dark-css":"5c64d958fb46ac1227a3","ace-theme-pastel_on_dark":"c40e6da18d6f1f4b7ce7","ace-theme-pastel_on_dark-css":"ddee56a0e64fee017985","ace-theme-solarized_dark":"7e4071d637096a2b361a","ace-theme-solarized_dark-css":"9998e05923e4d130c685","ace-theme-solarized_light":"4794af2dbfc3a9f72a34","ace-theme-solarized_light-css":"c36a8606ccbb2a2d9beb","ace-theme-sqlserver":"cb65d8c5cf7e0e828634","ace-theme-sqlserver-css":"dbaffc19f3f415054629","ace-theme-terminal":"c8c2b849608cc8a0abe9","ace-theme-terminal-css":"4269e454746d8378c3f8","ace-theme-textmate":"82eb89d4b296371282de","ace-theme-textmate-css":"2f88fd05f87b4e22a085","ace-theme-tomorrow":"f1f3335a76127aed8a58","ace-theme-tomorrow-css":"fa52ac08903d7cadbb61","ace-theme-tomorrow_night":"adec1e088be2d6be8e2e","ace-theme-tomorrow_night-css":"1cf62deeec5de87cd294","ace-theme-tomorrow_night_blue":"73cdb831d8ebb43e2125","ace-theme-tomorrow_night_blue-css":"97e80d10b1af0bce0986","ace-theme-tomorrow_night_bright":"b64405906640da4c9f3a","ace-theme-tomorrow_night_bright-css":"0fa0b0d53c85c054a22f","ace-theme-tomorrow_night_eighties":"78abb601288618fd3f7f","ace-theme-tomorrow_night_eighties-css":"ad6f6705c732a081bf4b","ace-theme-twilight":"436f9de34d77122d2d03","ace-theme-twilight-css":"2f4c782ad3eb6860d103","ace-theme-vibrant_ink":"b50894eccedaaf8cb4e1","ace-theme-vibrant_ink-css":"7597dfe0332ebf90d498","ace-theme-xcode":"aa9e6dff8129e5c5dcef","ace-theme-xcode-css":"4211a0ec8246016b7e75"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "-" + "a9bd8bc76c2b89764535" + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "ui:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "assets/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"vendors-node_modules_react-monaco-editor_lib_index_js":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkui"] = self["webpackChunkui"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_floating-ui_react_dist_floating-ui_react_esm_js-node_modules_reduxjs_too-40f092"], () => (__webpack_require__("./index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7O1dBRUE7V0FDQSxrQkFBa0I7V0FDbEI7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBOztXQUVBOzs7OztXQ3hFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDOztXQUVqQztXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0wsZUFBZTtXQUNmO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRXZGQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdWkvLi9BZHZhbmNlZE9wdGlvbnNNZW51LnRzeCIsIndlYnBhY2s6Ly91aS8uL0J1aWxkTWVudS50c3giLCJ3ZWJwYWNrOi8vdWkvLi9CdXR0b25NZW51SXRlbS50c3giLCJ3ZWJwYWNrOi8vdWkvLi9DaGFubmVsTWVudS50c3giLCJ3ZWJwYWNrOi8vdWkvLi9Db25maWdFbGVtZW50LnRzeCIsIndlYnBhY2s6Ly91aS8uL0NvbmZpZ01lbnUudHN4Iiwid2VicGFjazovL3VpLy4vSGVhZGVyLnRzeCIsIndlYnBhY2s6Ly91aS8uL0hlYWRlckJ1dHRvbi50c3giLCJ3ZWJwYWNrOi8vdWkvLi9IZWxwLnRzeCIsIndlYnBhY2s6Ly91aS8uL0hlbHBFeGFtcGxlLnRzeCIsIndlYnBhY2s6Ly91aS8uL0ljb24udHN4Iiwid2VicGFjazovL3VpLy4vTG9hZGVyLnRzeCIsIndlYnBhY2s6Ly91aS8uL01lbnVBc2lkZS50c3giLCJ3ZWJwYWNrOi8vdWkvLi9NZW51R3JvdXAudHN4Iiwid2VicGFjazovL3VpLy4vTWVudUl0ZW0udHN4Iiwid2VicGFjazovL3VpLy4vTW9kZU1lbnUudHN4Iiwid2VicGFjazovL3VpLy4vTm90aWZpY2F0aW9ucy50c3giLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQudHN4Iiwid2VicGFjazovL3VpLy4vT3V0cHV0L0V4ZWN1dGUudHN4Iiwid2VicGFjazovL3VpLy4vT3V0cHV0L0dpc3QudHN4Iiwid2VicGFjazovL3VpLy4vT3V0cHV0L0hlYWRlci50c3giLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQvTG9hZGVyLnRzeCIsIndlYnBhY2s6Ly91aS8uL091dHB1dC9PdXRwdXRQcmlzbS50c3giLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQvUGFuZVdpdGhNaXIudHN4Iiwid2VicGFjazovL3VpLy4vT3V0cHV0L1NlY3Rpb24udHN4Iiwid2VicGFjazovL3VpLy4vT3V0cHV0L1NpbXBsZVBhbmUudHN4Iiwid2VicGFjazovL3VpLy4vUGFnZVN3aXRjaGVyLnRzeCIsIndlYnBhY2s6Ly91aS8uL1BsYXlncm91bmQudHN4Iiwid2VicGFjazovL3VpLy4vUG9wQnV0dG9uLnRzeCIsIndlYnBhY2s6Ly91aS8uL1JvdXRlci50c3giLCJ3ZWJwYWNrOi8vdWkvLi9TZWdtZW50ZWRCdXR0b24udHN4Iiwid2VicGFjazovL3VpLy4vU2VsZWN0T25lLnRzeCIsIndlYnBhY2s6Ly91aS8uL1NlbGVjdGFibGVNZW51SXRlbS50c3giLCJ3ZWJwYWNrOi8vdWkvLi9Ub29sc01lbnUudHN4Iiwid2VicGFjazovL3VpLy4vYWN0aW9ucy50cyIsIndlYnBhY2s6Ly91aS8uL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovL3VpLy4vZWRpdG9yL0FjZUVkaXRvci50c3giLCJ3ZWJwYWNrOi8vdWkvLi9lZGl0b3IvRWRpdG9yLnRzeCIsIndlYnBhY2s6Ly91aS8uL2VkaXRvci9Nb25hY29FZGl0b3IudHN4Iiwid2VicGFjazovL3VpLy4vZWRpdG9yL1NpbXBsZUVkaXRvci50c3giLCJ3ZWJwYWNrOi8vdWkvLi9oaWdobGlnaHRpbmcudHMiLCJ3ZWJwYWNrOi8vdWkvLi9pbmRleC50c3giLCJ3ZWJwYWNrOi8vdWkvLi9sb2NhbF9zdG9yYWdlLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvYnJvd3Nlci50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL2NvZGUudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9jb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvY3JhdGVzLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvZ2xvYmFsQ29uZmlndXJhdGlvbi50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL2luZGV4LnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvbm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL291dHB1dC9hc3NlbWJseS50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL291dHB1dC9jbGlwcHkudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9vdXRwdXQvZXhlY3V0ZS50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL291dHB1dC9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9vdXRwdXQvZ2lzdC50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL291dHB1dC9oaXIudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9vdXRwdXQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9vdXRwdXQvbGx2bUlyLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvb3V0cHV0L21hY3JvRXhwYW5zaW9uLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvb3V0cHV0L21ldGEudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9vdXRwdXQvbWlyLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvb3V0cHV0L21pcmkudHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9vdXRwdXQvc2hhcmVkU3RhdGVNYW5hZ2VtZW50LnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvb3V0cHV0L3dhc20udHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9wYWdlLnRzIiwid2VicGFjazovL3VpLy4vcmVkdWNlcnMvcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy9zZWxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vdWkvLi9yZWR1Y2Vycy92ZXJzaW9ucy50cyIsIndlYnBhY2s6Ly91aS8uL3JlZHVjZXJzL3dlYnNvY2tldC50cyIsIndlYnBhY2s6Ly91aS8uL3NlbGVjdG9ycy9pbmRleC50cyIsIndlYnBhY2s6Ly91aS8uL3Nlc3Npb25fc3RvcmFnZS50cyIsIndlYnBhY2s6Ly91aS8uL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vdWkvLi90eXBlcy50cyIsIndlYnBhY2s6Ly91aS8uL3Vzcy1yb3V0ZXIvTGluay50c3giLCJ3ZWJwYWNrOi8vdWkvLi91c3Mtcm91dGVyL1JvdXRlci50c3giLCJ3ZWJwYWNrOi8vdWkvLi91c3Mtcm91dGVyL2luZGV4LnRzIiwid2VicGFjazovL3VpLy4vd2Vic29ja2V0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly91aS8uL3dlYnNvY2tldE1pZGRsZXdhcmUudHMiLCJ3ZWJwYWNrOi8vdWkvLi9CdWlsZE1lbnUubW9kdWxlLmNzcz82YjliIiwid2VicGFjazovL3VpLy4vQnV0dG9uTWVudUl0ZW0ubW9kdWxlLmNzcz9hN2UyIiwid2VicGFjazovL3VpLy4vQ2hhbm5lbE1lbnUubW9kdWxlLmNzcz9jZjA1Iiwid2VicGFjazovL3VpLy4vQ29uZmlnRWxlbWVudC5tb2R1bGUuY3NzPzUyNzMiLCJ3ZWJwYWNrOi8vdWkvLi9IZWFkZXIubW9kdWxlLmNzcz9iYmZiIiwid2VicGFjazovL3VpLy4vSGVhZGVyQnV0dG9uLm1vZHVsZS5jc3M/YzkzZSIsIndlYnBhY2s6Ly91aS8uL0hlbHAubW9kdWxlLmNzcz8wYjkzIiwid2VicGFjazovL3VpLy4vSGVscEV4YW1wbGUubW9kdWxlLmNzcz9kNTVjIiwid2VicGFjazovL3VpLy4vSWNvbi5tb2R1bGUuY3NzPzk5NTIiLCJ3ZWJwYWNrOi8vdWkvLi9Mb2FkZXIubW9kdWxlLmNzcz9kMmJhIiwid2VicGFjazovL3VpLy4vTWVudUFzaWRlLm1vZHVsZS5jc3M/NjZkZSIsIndlYnBhY2s6Ly91aS8uL01lbnVHcm91cC5tb2R1bGUuY3NzPzlkODciLCJ3ZWJwYWNrOi8vdWkvLi9NZW51SXRlbS5tb2R1bGUuY3NzPzNjYWUiLCJ3ZWJwYWNrOi8vdWkvLi9Ob3RpZmljYXRpb25zLm1vZHVsZS5jc3M/YmM0MSIsIndlYnBhY2s6Ly91aS8uL091dHB1dC5tb2R1bGUuY3NzPzUwNGYiLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQvRXhlY3V0ZS5tb2R1bGUuY3NzP2JjNmUiLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQvR2lzdC5tb2R1bGUuY3NzPzEzZmEiLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQvSGVhZGVyLm1vZHVsZS5jc3M/OTYxMSIsIndlYnBhY2s6Ly91aS8uL091dHB1dC9PdXRwdXRQcmlzbS5tb2R1bGUuY3NzPzlhMWQiLCJ3ZWJwYWNrOi8vdWkvLi9PdXRwdXQvU2VjdGlvbi5tb2R1bGUuY3NzPzIxMmMiLCJ3ZWJwYWNrOi8vdWkvLi9QbGF5Z3JvdW5kLm1vZHVsZS5jc3M/NzYxZCIsIndlYnBhY2s6Ly91aS8uL1BvcEJ1dHRvbi5tb2R1bGUuY3NzPzY5ZTMiLCJ3ZWJwYWNrOi8vdWkvLi9TZWdtZW50ZWRCdXR0b24ubW9kdWxlLmNzcz9lZmNlIiwid2VicGFjazovL3VpLy4vU2VsZWN0YWJsZU1lbnVJdGVtLm1vZHVsZS5jc3M/ZjBkZSIsIndlYnBhY2s6Ly91aS8uL2VkaXRvci9FZGl0b3IubW9kdWxlLmNzcz85MDQzIiwid2VicGFjazovL3VpLy4vaW5kZXgubW9kdWxlLmNzcz9hZTA1Iiwid2VicGFjazovL3VpL2lnbm9yZWR8L1VzZXJzL21hY2Jvb2twcm8vamF2YS1wbGF5Z3JvdW5kL3VpL2Zyb250ZW5kL25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdHwuL3V0aWwuaW5zcGVjdCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvYW1kIGRlZmluZSIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvYW1kIG9wdGlvbnMiLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3VpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3VpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly91aS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdWkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yLCB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgRWl0aGVyIGFzIEVpdGhlckNvbmZpZywgU2VsZWN0IGFzIFNlbGVjdENvbmZpZyB9IGZyb20gJy4vQ29uZmlnRWxlbWVudCc7XG5pbXBvcnQgTWVudUdyb3VwIGZyb20gJy4vTWVudUdyb3VwJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgKiBhcyBzZWxlY3RvcnMgZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0IHsgQmFja3RyYWNlLCBFZGl0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IEFkdmFuY2VkT3B0aW9uc01lbnU6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBpc0VkaXRpb25EZWZhdWx0ID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLmlzRWRpdGlvbkRlZmF1bHQpO1xuICBjb25zdCBlZGl0aW9uID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuY29uZmlndXJhdGlvbi5lZGl0aW9uKTtcbiAgY29uc3QgaXNCYWNrdHJhY2VTZXQgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuZ2V0QmFja3RyYWNlU2V0KTtcbiAgY29uc3QgYmFja3RyYWNlID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuY29uZmlndXJhdGlvbi5iYWNrdHJhY2UpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICBjb25zdCBjaGFuZ2VFZGl0aW9uID0gdXNlQ2FsbGJhY2soKGU6IEVkaXRpb24pID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlRWRpdGlvbihlKSksIFtkaXNwYXRjaF0pO1xuICBjb25zdCBjaGFuZ2VCYWNrdHJhY2UgPSB1c2VDYWxsYmFjaygoYjogQmFja3RyYWNlKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUJhY2t0cmFjZShiKSksIFtkaXNwYXRjaF0pO1xuXG4gIHJldHVybiAoXG4gICAgPE1lbnVHcm91cCB0aXRsZT1cIkFkdmFuY2VkIG9wdGlvbnNcIj5cbiAgICAgIDxTZWxlY3RDb25maWdcbiAgICAgICAgbmFtZT1cIkVkaXRpb25cIlxuICAgICAgICB2YWx1ZT17ZWRpdGlvbn1cbiAgICAgICAgaXNOb3REZWZhdWx0PXshaXNFZGl0aW9uRGVmYXVsdH1cbiAgICAgICAgb25DaGFuZ2U9e2NoYW5nZUVkaXRpb259XG4gICAgICA+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9e0VkaXRpb24uUnVzdDIwMTV9PjIwMTU8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT17RWRpdGlvbi5SdXN0MjAxOH0+MjAxODwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPXtFZGl0aW9uLlJ1c3QyMDIxfT4yMDIxPC9vcHRpb24+XG4gICAgICA8L1NlbGVjdENvbmZpZz5cblxuICAgICAgPEVpdGhlckNvbmZpZ1xuICAgICAgICBpZD1cImJhY2t0cmFjZVwiXG4gICAgICAgIG5hbWU9XCJCYWNrdHJhY2VcIlxuICAgICAgICBhPXtCYWNrdHJhY2UuRGlzYWJsZWR9XG4gICAgICAgIGI9e0JhY2t0cmFjZS5FbmFibGVkfVxuICAgICAgICB2YWx1ZT17YmFja3RyYWNlfVxuICAgICAgICBpc05vdERlZmF1bHQ9e2lzQmFja3RyYWNlU2V0fVxuICAgICAgICBvbkNoYW5nZT17Y2hhbmdlQmFja3RyYWNlfSAvPlxuICAgIDwvTWVudUdyb3VwPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWR2YW5jZWRPcHRpb25zTWVudTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBzZWxlY3RvcnMgZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0IHsgdXNlQXBwRGlzcGF0Y2ggfSBmcm9tICcuL2NvbmZpZ3VyZVN0b3JlJztcblxuaW1wb3J0IEJ1dHRvbk1lbnVJdGVtIGZyb20gJy4vQnV0dG9uTWVudUl0ZW0nO1xuaW1wb3J0IE1lbnVHcm91cCBmcm9tICcuL01lbnVHcm91cCc7XG5pbXBvcnQgTWVudUFzaWRlIGZyb20gJy4vTWVudUFzaWRlJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0J1aWxkTWVudS5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIEJ1aWxkTWVudVByb3BzIHtcbiAgY2xvc2U6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IHVzZURpc3BhdGNoQW5kQ2xvc2UgPSAoYWN0aW9uOiAoKSA9PiBhY3Rpb25zLlRodW5rQWN0aW9uLCBjbG9zZTogKCkgPT4gdm9pZCkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG5cbiAgcmV0dXJuIHVzZUNhbGxiYWNrKFxuICAgICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGFjdGlvbigpKTtcbiAgICAgIGNsb3NlKCk7XG4gICAgfSxcbiAgICBbYWN0aW9uLCBjbG9zZSwgZGlzcGF0Y2hdXG4gICk7XG59XG5cbmNvbnN0IEJ1aWxkTWVudTogUmVhY3QuRkM8QnVpbGRNZW51UHJvcHM+ID0gcHJvcHMgPT4ge1xuICBjb25zdCBpc0hpckF2YWlsYWJsZSA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5pc0hpckF2YWlsYWJsZSk7XG4gIGNvbnN0IGlzV2FzbUF2YWlsYWJsZSA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5pc1dhc21BdmFpbGFibGUpO1xuXG4gIGNvbnN0IGNvbXBpbGUgPSB1c2VEaXNwYXRjaEFuZENsb3NlKGFjdGlvbnMucGVyZm9ybUNvbXBpbGUsIHByb3BzLmNsb3NlKTtcbiAgY29uc3QgY29tcGlsZVRvQXNzZW1ibHkgPSB1c2VEaXNwYXRjaEFuZENsb3NlKGFjdGlvbnMucGVyZm9ybUNvbXBpbGVUb0Fzc2VtYmx5LCBwcm9wcy5jbG9zZSk7XG4gIGNvbnN0IGNvbXBpbGVUb0xMVk0gPSB1c2VEaXNwYXRjaEFuZENsb3NlKGFjdGlvbnMucGVyZm9ybUNvbXBpbGVUb0xMVk0sIHByb3BzLmNsb3NlKTtcbiAgY29uc3QgY29tcGlsZVRvTWlyID0gdXNlRGlzcGF0Y2hBbmRDbG9zZShhY3Rpb25zLnBlcmZvcm1Db21waWxlVG9NaXIsIHByb3BzLmNsb3NlKTtcbiAgY29uc3QgY29tcGlsZVRvSGlyID0gdXNlRGlzcGF0Y2hBbmRDbG9zZShhY3Rpb25zLnBlcmZvcm1Db21waWxlVG9OaWdodGx5SGlyLCBwcm9wcy5jbG9zZSk7XG4gIGNvbnN0IGNvbXBpbGVUb1dhc20gPSB1c2VEaXNwYXRjaEFuZENsb3NlKGFjdGlvbnMucGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlXYXNtLCBwcm9wcy5jbG9zZSk7XG4gIGNvbnN0IGV4ZWN1dGUgPSB1c2VEaXNwYXRjaEFuZENsb3NlKGFjdGlvbnMucGVyZm9ybUV4ZWN1dGUsIHByb3BzLmNsb3NlKTtcbiAgY29uc3QgdGVzdCA9IHVzZURpc3BhdGNoQW5kQ2xvc2UoYWN0aW9ucy5wZXJmb3JtVGVzdCwgcHJvcHMuY2xvc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPE1lbnVHcm91cCB0aXRsZT1cIldoYXQgZG8geW91IHdhbnQgdG8gZG8/XCI+XG4gICAgICA8QnV0dG9uTWVudUl0ZW0gbmFtZT1cIlJ1blwiIG9uQ2xpY2s9e2V4ZWN1dGV9PlxuICAgICAgICBCdWlsZCBhbmQgcnVuIHRoZSBjb2RlLCBzaG93aW5nIHRoZSBvdXRwdXQuXG4gICAgICAgIEVxdWl2YWxlbnQgdG8gPGNvZGUgY2xhc3NOYW1lPXtzdHlsZXMuY29kZX0+Y2FyZ28gcnVuPC9jb2RlPi5cbiAgICAgIDwvQnV0dG9uTWVudUl0ZW0+XG4gICAgICA8QnV0dG9uTWVudUl0ZW0gbmFtZT1cIkJ1aWxkXCIgb25DbGljaz17Y29tcGlsZX0+XG4gICAgICAgIEJ1aWxkIHRoZSBjb2RlIHdpdGhvdXQgcnVubmluZyBpdC5cbiAgICAgICAgRXF1aXZhbGVudCB0byA8Y29kZSBjbGFzc05hbWU9e3N0eWxlcy5jb2RlfT5jYXJnbyBidWlsZDwvY29kZT4uXG4gICAgICA8L0J1dHRvbk1lbnVJdGVtPlxuICAgICAgPEJ1dHRvbk1lbnVJdGVtIG5hbWU9XCJUZXN0XCIgb25DbGljaz17dGVzdH0+XG4gICAgICAgIEJ1aWxkIHRoZSBjb2RlIGFuZCBydW4gYWxsIHRoZSB0ZXN0cy5cbiAgICAgICAgRXF1aXZhbGVudCB0byA8Y29kZSBjbGFzc05hbWU9e3N0eWxlcy5jb2RlfT5jYXJnbyB0ZXN0PC9jb2RlPi5cbiAgICAgIDwvQnV0dG9uTWVudUl0ZW0+XG4gICAgICA8QnV0dG9uTWVudUl0ZW0gbmFtZT1cIkFTTVwiIG9uQ2xpY2s9e2NvbXBpbGVUb0Fzc2VtYmx5fT5cbiAgICAgICAgQnVpbGQgYW5kIHNob3cgdGhlIHJlc3VsdGluZyBhc3NlbWJseSBjb2RlLlxuICAgICAgPC9CdXR0b25NZW51SXRlbT5cbiAgICAgIDxCdXR0b25NZW51SXRlbSBuYW1lPVwiTExWTSBJUlwiIG9uQ2xpY2s9e2NvbXBpbGVUb0xMVk19PlxuICAgICAgICBCdWlsZCBhbmQgc2hvdyB0aGUgcmVzdWx0aW5nIExMVk0gSVIsIExMVk3igJlzIGludGVybWVkaWF0ZSByZXByZXNlbnRhdGlvbi5cbiAgICAgIDwvQnV0dG9uTWVudUl0ZW0+XG4gICAgICA8QnV0dG9uTWVudUl0ZW0gbmFtZT1cIk1JUlwiIG9uQ2xpY2s9e2NvbXBpbGVUb01pcn0+XG4gICAgICAgIEJ1aWxkIGFuZCBzaG93IHRoZSByZXN1bHRpbmcgTUlSLCBSdXN04oCZcyBjb250cm9sLWZsb3ctYmFzZWQgaW50ZXJtZWRpYXRlIHJlcHJlc2VudGF0aW9uLlxuICAgICAgPC9CdXR0b25NZW51SXRlbT5cbiAgICAgIDxCdXR0b25NZW51SXRlbSBuYW1lPVwiSElSXCIgb25DbGljaz17Y29tcGlsZVRvSGlyfT5cbiAgICAgICAgQnVpbGQgYW5kIHNob3cgdGhlIHJlc3VsdGluZyBISVIsIFJ1c3TigJlzIHN5bnRheC1iYXNlZCBpbnRlcm1lZGlhdGUgcmVwcmVzZW50YXRpb24uXG4gICAgICAgIHshaXNIaXJBdmFpbGFibGUgJiYgPEhpckFzaWRlIC8+fVxuICAgICAgPC9CdXR0b25NZW51SXRlbT5cbiAgICAgIDxCdXR0b25NZW51SXRlbSBuYW1lPVwiV0FTTVwiIG9uQ2xpY2s9e2NvbXBpbGVUb1dhc219PlxuICAgICAgICBCdWlsZCBhIFdlYkFzc2VtYmx5IG1vZHVsZSBmb3Igd2ViIGJyb3dzZXJzLCBpbiB0aGUgLldBVCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uLlxuICAgICAgICB7IWlzV2FzbUF2YWlsYWJsZSAmJiA8V2FzbUFzaWRlIC8+fVxuICAgICAgPC9CdXR0b25NZW51SXRlbT5cbiAgICA8L01lbnVHcm91cD5cbiAgKTtcbn07XG5cbmNvbnN0IEhpckFzaWRlOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPE1lbnVBc2lkZT5cbiAgICBOb3RlOiBISVIgY3VycmVudGx5IHJlcXVpcmVzIHVzaW5nIHRoZSBOaWdodGx5IGNoYW5uZWwsIHNlbGVjdGluZyB0aGlzXG4gICAgb3B0aW9uIHdpbGwgc3dpdGNoIHRvIE5pZ2h0bHkuXG4gIDwvTWVudUFzaWRlPlxuKTtcblxuY29uc3QgV2FzbUFzaWRlOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPE1lbnVBc2lkZT5cbiAgICBOb3RlOiBXQVNNIGN1cnJlbnRseSByZXF1aXJlcyB1c2luZyB0aGUgTmlnaHRseSBjaGFubmVsLCBzZWxlY3RpbmcgdGhpc1xuICAgIG9wdGlvbiB3aWxsIHN3aXRjaCB0byBOaWdodGx5LlxuICA8L01lbnVBc2lkZT5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEJ1aWxkTWVudTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBNZW51SXRlbSBmcm9tICcuL01lbnVJdGVtJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0J1dHRvbk1lbnVJdGVtLm1vZHVsZS5jc3MnO1xuXG50eXBlIEJ1dHRvbiA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snYnV0dG9uJ107XG5cbmludGVyZmFjZSBCdXR0b25NZW51SXRlbVByb3BzIGV4dGVuZHMgQnV0dG9uIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5jb25zdCBCdXR0b25NZW51SXRlbTogUmVhY3QuRkM8QnV0dG9uTWVudUl0ZW1Qcm9wcz4gPSAoeyBuYW1lLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4gKFxuICA8TWVudUl0ZW0+XG4gICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9IHsuLi5wcm9wc30+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm5hbWV9IGRhdGEtdGVzdC1pZD1cImJ1dHRvbi1tZW51LWl0ZW1fX25hbWVcIj57bmFtZX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGVzY3JpcHRpb259PntjaGlsZHJlbn08L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgPC9NZW51SXRlbT5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbk1lbnVJdGVtO1xuIiwiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yLCB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IE1lbnVHcm91cCBmcm9tICcuL01lbnVHcm91cCc7XG5pbXBvcnQgU2VsZWN0T25lIGZyb20gJy4vU2VsZWN0T25lJztcblxuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4vc2VsZWN0b3JzJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IENoYW5uZWwgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0NoYW5uZWxNZW51Lm1vZHVsZS5jc3MnO1xuXG5pbnRlcmZhY2UgQ2hhbm5lbE1lbnVQcm9wcyB7XG4gIGNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBDaGFubmVsTWVudTogUmVhY3QuRkM8Q2hhbm5lbE1lbnVQcm9wcz4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IGNoYW5uZWwgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jb25maWd1cmF0aW9uLmNoYW5uZWwpO1xuICBjb25zdCBzdGFibGVWZXJzaW9uID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLnN0YWJsZVZlcnNpb25UZXh0KTtcbiAgY29uc3QgYmV0YVZlcnNpb24gPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuYmV0YVZlcnNpb25UZXh0KTtcbiAgY29uc3QgbmlnaHRseVZlcnNpb24gPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMubmlnaHRseVZlcnNpb25UZXh0KTtcbiAgY29uc3QgamF2YTE5VmVyc2lvbiA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5qYXZhMTlWZXJzaW9uVGV4dCk7XG4gIGNvbnN0IGJldGFWZXJzaW9uRGV0YWlscyA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5iZXRhVmVyc2lvbkRldGFpbHNUZXh0KTtcbiAgY29uc3QgbmlnaHRseVZlcnNpb25EZXRhaWxzID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLm5pZ2h0bHlWZXJzaW9uRGV0YWlsc1RleHQpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgY29uc3QgY2hhbmdlQ2hhbm5lbCA9IHVzZUNhbGxiYWNrKChjaGFubmVsOiBDaGFubmVsKSA9PiB7XG4gICAgZGlzcGF0Y2goYWN0aW9ucy5jaGFuZ2VDaGFubmVsKGNoYW5uZWwpKTtcbiAgICBwcm9wcy5jbG9zZSgpO1xuICB9LCBbZGlzcGF0Y2gsIHByb3BzXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8TWVudUdyb3VwIHRpdGxlPVwiQ2hhbm5lbCAmbWRhc2g7IENob29zZSB0aGUgcnVzdCB2ZXJzaW9uXCI+XG4gICAgICAgIDxTZWxlY3RPbmVcbiAgICAgICAgICBuYW1lPVwiU3RhYmxlIGNoYW5uZWxcIlxuICAgICAgICAgIGN1cnJlbnRWYWx1ZT17Y2hhbm5lbH1cbiAgICAgICAgICB0aGlzVmFsdWU9e0NoYW5uZWwuU3RhYmxlfVxuICAgICAgICAgIGNoYW5nZVZhbHVlPXtjaGFuZ2VDaGFubmVsfVxuICAgICAgICA+XG4gICAgICAgICAgPERlc2M+QnVpbGQgdXNpbmcgdGhlIFN0YWJsZSB2ZXJzaW9uOiB7c3RhYmxlVmVyc2lvbn08L0Rlc2M+XG4gICAgICAgIDwvU2VsZWN0T25lPlxuICAgICAgICA8U2VsZWN0T25lXG4gICAgICAgICAgbmFtZT1cIkJldGEgY2hhbm5lbFwiXG4gICAgICAgICAgY3VycmVudFZhbHVlPXtjaGFubmVsfVxuICAgICAgICAgIHRoaXNWYWx1ZT17Q2hhbm5lbC5CZXRhfVxuICAgICAgICAgIGNoYW5nZVZhbHVlPXtjaGFuZ2VDaGFubmVsfVxuICAgICAgICA+XG4gICAgICAgICAgPERlc2M+QnVpbGQgdXNpbmcgdGhlIEJldGEgdmVyc2lvbjoge2JldGFWZXJzaW9ufTwvRGVzYz5cbiAgICAgICAgICA8RGVzYz4oe2JldGFWZXJzaW9uRGV0YWlsc30pPC9EZXNjPlxuICAgICAgICA8L1NlbGVjdE9uZT5cbiAgICAgICAgPFNlbGVjdE9uZVxuICAgICAgICAgIG5hbWU9XCJOaWdodGx5IGNoYW5uZWxcIlxuICAgICAgICAgIGN1cnJlbnRWYWx1ZT17Y2hhbm5lbH1cbiAgICAgICAgICB0aGlzVmFsdWU9e0NoYW5uZWwuTmlnaHRseX1cbiAgICAgICAgICBjaGFuZ2VWYWx1ZT17Y2hhbmdlQ2hhbm5lbH1cbiAgICAgICAgPlxuICAgICAgICAgIDxEZXNjPkJ1aWxkIHVzaW5nIHRoZSBOaWdodGx5IHZlcnNpb246IHtuaWdodGx5VmVyc2lvbn08L0Rlc2M+XG4gICAgICAgICAgPERlc2M+KHtuaWdodGx5VmVyc2lvbkRldGFpbHN9KTwvRGVzYz5cbiAgICAgICAgPC9TZWxlY3RPbmU+XG4gICAgICAgIDxTZWxlY3RPbmVcbiAgICAgICAgICBuYW1lPVwiSmF2YSAxOVwiXG4gICAgICAgICAgY3VycmVudFZhbHVlPXtjaGFubmVsfVxuICAgICAgICAgIHRoaXNWYWx1ZT17Q2hhbm5lbC5KYXZhMTl9XG4gICAgICAgICAgY2hhbmdlVmFsdWU9e2NoYW5nZUNoYW5uZWx9XG4gICAgICAgID5cbiAgICAgICAgICA8RGVzYz5CdWlsZCB1c2luZyBKYXZhIDE5PC9EZXNjPlxuICAgICAgICAgIDxEZXNjPih7amF2YTE5VmVyc2lvbn0pPC9EZXNjPlxuICAgICAgICA8L1NlbGVjdE9uZT5cbiAgICAgIDwvTWVudUdyb3VwPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5jb25zdCBEZXNjOiBSZWFjdC5GQzxSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx1bmtub3duPj4gPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxwIGNsYXNzTmFtZT17c3R5bGVzLmRlc2NyaXB0aW9ufT57Y2hpbGRyZW59PC9wPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbE1lbnU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgTWVudUl0ZW0gZnJvbSAnLi9NZW51SXRlbSc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9Db25maWdFbGVtZW50Lm1vZHVsZS5jc3MnO1xuXG5pbnRlcmZhY2UgRWl0aGVyUHJvcHM8VCBleHRlbmRzIHN0cmluZz4gZXh0ZW5kcyBDb25maWdFbGVtZW50UHJvcHMge1xuICBpZDogc3RyaW5nO1xuICBhOiBzdHJpbmc7XG4gIGI6IHN0cmluZztcbiAgYUxhYmVsPzogc3RyaW5nO1xuICBiTGFiZWw/OiBzdHJpbmc7XG4gIHZhbHVlOiBUO1xuICBvbkNoYW5nZTogKF86IFQpID0+IGFueTtcbn1cblxuZXhwb3J0IGNvbnN0IEVpdGhlciA9XG4gIDxUIGV4dGVuZHMgc3RyaW5nLD4oeyBpZCwgYSwgYiwgYUxhYmVsID0gYSwgYkxhYmVsID0gYiwgdmFsdWUsIG9uQ2hhbmdlLCAuLi5yZXN0IH06IEVpdGhlclByb3BzPFQ+KSA9PiAoXG4gICAgPENvbmZpZ0VsZW1lbnQgey4uLnJlc3R9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50b2dnbGV9PlxuICAgICAgICA8aW5wdXQgaWQ9e2Ake2lkfS1hYH1cbiAgICAgICAgICBuYW1lPXtpZH1cbiAgICAgICAgICB2YWx1ZT17YX1cbiAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlID09PSBhfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBvbkNoYW5nZShhIGFzIFQpfSAvPlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7aWR9LWFgfT57YUxhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBpZD17YCR7aWR9LWJgfVxuICAgICAgICAgIG5hbWU9e2lkfVxuICAgICAgICAgIHZhbHVlPXtifVxuICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgY2hlY2tlZD17dmFsdWUgPT09IGJ9XG4gICAgICAgICAgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlKGIgYXMgVCl9IC8+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtpZH0tYmB9PntiTGFiZWx9PC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvQ29uZmlnRWxlbWVudD5cbiAgKTtcblxuaW50ZXJmYWNlIFNlbGVjdFByb3BzPFQgZXh0ZW5kcyBzdHJpbmc+IGV4dGVuZHMgQ29uZmlnRWxlbWVudFByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgdmFsdWU6IFQ7XG4gIG9uQ2hhbmdlOiAoXzogVCkgPT4gYW55O1xufVxuXG5leHBvcnQgY29uc3QgU2VsZWN0ID0gPFQgZXh0ZW5kcyBzdHJpbmcsPih7IHZhbHVlLCBvbkNoYW5nZSwgY2hpbGRyZW4sIC4uLnJlc3QgfTogU2VsZWN0UHJvcHM8VD4pID0+IChcbiAgPENvbmZpZ0VsZW1lbnQgey4uLnJlc3R9PlxuICAgIDxzZWxlY3QgY2xhc3NOYW1lPXtzdHlsZXMuc2VsZWN0fSB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXtlID0+IG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlIGFzIFQpfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3NlbGVjdD5cbiAgPC9Db25maWdFbGVtZW50PlxuKTtcblxuaW50ZXJmYWNlIENvbmZpZ0VsZW1lbnRQcm9wcyB7XG4gIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xuICBuYW1lOiBzdHJpbmc7XG4gIGlzTm90RGVmYXVsdD86IGJvb2xlYW47XG4gIGFzaWRlPzogSlNYLkVsZW1lbnQsXG59XG5cbmNvbnN0IENvbmZpZ0VsZW1lbnQ6IFJlYWN0LkZDPENvbmZpZ0VsZW1lbnRQcm9wcz4gPSAoeyBuYW1lLCBpc05vdERlZmF1bHQsIGFzaWRlLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxNZW51SXRlbT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2lzTm90RGVmYXVsdCA/IHN0eWxlcy5ub3REZWZhdWx0IDogc3R5bGVzLm5hbWV9PntuYW1lfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudmFsdWV9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICB7YXNpZGV9XG4gIDwvTWVudUl0ZW0+XG4pO1xuIiwiLyogZ2xvYmFsIEFDRV9LRVlCSU5ESU5HUzpmYWxzZSwgQUNFX1RIRU1FUzpmYWxzZSAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgRnJhZ21lbnQsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBFaXRoZXIgYXMgRWl0aGVyQ29uZmlnLCBTZWxlY3QgYXMgU2VsZWN0Q29uZmlnIH0gZnJvbSAnLi9Db25maWdFbGVtZW50JztcbmltcG9ydCBNZW51R3JvdXAgZnJvbSAnLi9NZW51R3JvdXAnO1xuXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge1xuICBBc3NlbWJseUZsYXZvcixcbiAgRGVtYW5nbGVBc3NlbWJseSxcbiAgRWRpdG9yLFxuICBPcmllbnRhdGlvbixcbiAgUGFpckNoYXJhY3RlcnMsXG4gIFByb2Nlc3NBc3NlbWJseSxcbn0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IE1PTkFDT19USEVNRVMgPSBbXG4gICd2cycsICd2cy1kYXJrJywgJ3ZzY29kZS1kYXJrLXBsdXMnLFxuXTtcblxuY29uc3QgQ29uZmlnTWVudTogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGtleWJpbmRpbmcgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jb25maWd1cmF0aW9uLmFjZS5rZXliaW5kaW5nKTtcbiAgY29uc3QgYWNlVGhlbWUgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jb25maWd1cmF0aW9uLmFjZS50aGVtZSk7XG4gIGNvbnN0IG1vbmFjb1RoZW1lID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuY29uZmlndXJhdGlvbi5tb25hY28udGhlbWUpO1xuICBjb25zdCBvcmllbnRhdGlvbiA9IHVzZVNlbGVjdG9yKChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24pO1xuICBjb25zdCBlZGl0b3JTdHlsZSA9IHVzZVNlbGVjdG9yKChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbmZpZ3VyYXRpb24uZWRpdG9yKTtcbiAgY29uc3QgcGFpckNoYXJhY3RlcnMgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jb25maWd1cmF0aW9uLmFjZS5wYWlyQ2hhcmFjdGVycyk7XG4gIGNvbnN0IGFzc2VtYmx5Rmxhdm9yID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuY29uZmlndXJhdGlvbi5hc3NlbWJseUZsYXZvcik7XG4gIGNvbnN0IGRlbWFuZ2xlQXNzZW1ibHkgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jb25maWd1cmF0aW9uLmRlbWFuZ2xlQXNzZW1ibHkpO1xuICBjb25zdCBwcm9jZXNzQXNzZW1ibHkgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jb25maWd1cmF0aW9uLnByb2Nlc3NBc3NlbWJseSk7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBjaGFuZ2VBY2VUaGVtZSA9IHVzZUNhbGxiYWNrKCh0OiBzdHJpbmcpID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlQWNlVGhlbWUodCkpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgY2hhbmdlTW9uYWNvVGhlbWUgPSB1c2VDYWxsYmFjaygodDogc3RyaW5nKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZU1vbmFjb1RoZW1lKHQpKSwgW2Rpc3BhdGNoXSk7XG4gIGNvbnN0IGNoYW5nZUtleWJpbmRpbmcgPSB1c2VDYWxsYmFjaygoazogc3RyaW5nKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUtleWJpbmRpbmcoaykpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgY2hhbmdlT3JpZW50YXRpb24gPSB1c2VDYWxsYmFjaygobzogT3JpZW50YXRpb24pID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlT3JpZW50YXRpb24obykpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgY2hhbmdlRWRpdG9yU3R5bGUgPSB1c2VDYWxsYmFjaygoZTogRWRpdG9yKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUVkaXRvcihlKSksIFtkaXNwYXRjaF0pO1xuICBjb25zdCBjaGFuZ2VBc3NlbWJseUZsYXZvciA9XG4gICAgdXNlQ2FsbGJhY2soKGE6IEFzc2VtYmx5Rmxhdm9yKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUFzc2VtYmx5Rmxhdm9yKGEpKSwgW2Rpc3BhdGNoXSk7XG4gIGNvbnN0IGNoYW5nZVBhaXJDaGFyYWN0ZXJzID1cbiAgICB1c2VDYWxsYmFjaygocDogUGFpckNoYXJhY3RlcnMpID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlUGFpckNoYXJhY3RlcnMocCkpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgY2hhbmdlUHJvY2Vzc0Fzc2VtYmx5ID1cbiAgICB1c2VDYWxsYmFjaygocDogUHJvY2Vzc0Fzc2VtYmx5KSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZVByb2Nlc3NBc3NlbWJseShwKSksIFtkaXNwYXRjaF0pO1xuICBjb25zdCBjaGFuZ2VEZW1hbmdsZUFzc2VtYmx5ID1cbiAgICB1c2VDYWxsYmFjaygoZDogRGVtYW5nbGVBc3NlbWJseSkgPT4gZGlzcGF0Y2goYWN0aW9ucy5jaGFuZ2VEZW1hbmdsZUFzc2VtYmx5KGQpKSwgW2Rpc3BhdGNoXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8TWVudUdyb3VwIHRpdGxlPVwiRWRpdG9yXCI+XG4gICAgICAgIDxTZWxlY3RDb25maWdcbiAgICAgICAgICBuYW1lPVwiRWRpdG9yXCJcbiAgICAgICAgICB2YWx1ZT17ZWRpdG9yU3R5bGV9XG4gICAgICAgICAgb25DaGFuZ2U9e2NoYW5nZUVkaXRvclN0eWxlfVxuICAgICAgICA+XG4gICAgICAgICAge1tFZGl0b3IuU2ltcGxlLCBFZGl0b3IuQWNlLCBFZGl0b3IuTW9uYWNvXVxuICAgICAgICAgICAgLm1hcChrID0+IDxvcHRpb24ga2V5PXtrfSB2YWx1ZT17a30+e2t9PC9vcHRpb24+KX1cbiAgICAgICAgPC9TZWxlY3RDb25maWc+XG4gICAgICAgIHtlZGl0b3JTdHlsZSA9PT0gRWRpdG9yLkFjZSAmJiAoXG4gICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgPFNlbGVjdENvbmZpZ1xuICAgICAgICAgICAgICBuYW1lPVwiS2V5YmluZGluZ1wiXG4gICAgICAgICAgICAgIHZhbHVlPXtrZXliaW5kaW5nfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17Y2hhbmdlS2V5YmluZGluZ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0FDRV9LRVlCSU5ESU5HUy5tYXAoayA9PiA8b3B0aW9uIGtleT17a30gdmFsdWU9e2t9PntrfTwvb3B0aW9uPil9XG4gICAgICAgICAgICA8L1NlbGVjdENvbmZpZz5cblxuICAgICAgICAgICAgPFNlbGVjdENvbmZpZ1xuICAgICAgICAgICAgICBuYW1lPVwiVGhlbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17YWNlVGhlbWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtjaGFuZ2VBY2VUaGVtZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0FDRV9USEVNRVMubWFwKHQgPT4gPG9wdGlvbiBrZXk9e3R9IHZhbHVlPXt0fT57dH08L29wdGlvbj4pfVxuICAgICAgICAgICAgPC9TZWxlY3RDb25maWc+XG5cbiAgICAgICAgICAgIDxFaXRoZXJDb25maWdcbiAgICAgICAgICAgICAgaWQ9XCJlZGl0b3ItcGFpci1jaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgbmFtZT1cIlBhaXIgQ2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgIGE9e1BhaXJDaGFyYWN0ZXJzLkVuYWJsZWR9XG4gICAgICAgICAgICAgIGI9e1BhaXJDaGFyYWN0ZXJzLkRpc2FibGVkfVxuICAgICAgICAgICAgICB2YWx1ZT17cGFpckNoYXJhY3RlcnN9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtjaGFuZ2VQYWlyQ2hhcmFjdGVyc30gLz5cbiAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICApfVxuICAgICAgICB7ZWRpdG9yU3R5bGUgPT09IEVkaXRvci5Nb25hY28gJiYgKFxuICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgIDxTZWxlY3RDb25maWdcbiAgICAgICAgICAgICAgbmFtZT1cIlRoZW1lXCJcbiAgICAgICAgICAgICAgdmFsdWU9e21vbmFjb1RoZW1lfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17Y2hhbmdlTW9uYWNvVGhlbWV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtNT05BQ09fVEhFTUVTLm1hcCh0ID0+IDxvcHRpb24ga2V5PXt0fSB2YWx1ZT17dH0+e3R9PC9vcHRpb24+KX1cbiAgICAgICAgICAgIDwvU2VsZWN0Q29uZmlnPlxuICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICl9XG4gICAgICA8L01lbnVHcm91cD5cblxuICAgICAgPE1lbnVHcm91cCB0aXRsZT1cIlVJXCI+XG4gICAgICAgIDxTZWxlY3RDb25maWdcbiAgICAgICAgICBuYW1lPVwiT3JpZW50YXRpb25cIlxuICAgICAgICAgIHZhbHVlPXtvcmllbnRhdGlvbn1cbiAgICAgICAgICBvbkNoYW5nZT17Y2hhbmdlT3JpZW50YXRpb259XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtPcmllbnRhdGlvbi5BdXRvbWF0aWN9PkF1dG9tYXRpYzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9e09yaWVudGF0aW9uLkhvcml6b250YWx9Pkhvcml6b250YWw8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtPcmllbnRhdGlvbi5WZXJ0aWNhbH0+VmVydGljYWw8L29wdGlvbj5cbiAgICAgICAgPC9TZWxlY3RDb25maWc+XG4gICAgICA8L01lbnVHcm91cD5cblxuICAgICAgPE1lbnVHcm91cCB0aXRsZT1cIkFzc2VtYmx5XCI+XG4gICAgICAgIDxFaXRoZXJDb25maWdcbiAgICAgICAgICBpZD1cImFzc2VtYmx5LWZsYXZvclwiXG4gICAgICAgICAgbmFtZT1cIkZsYXZvclwiXG4gICAgICAgICAgYT17QXNzZW1ibHlGbGF2b3IuQXR0fVxuICAgICAgICAgIGI9e0Fzc2VtYmx5Rmxhdm9yLkludGVsfVxuICAgICAgICAgIGFMYWJlbD1cIkFUJlRcIlxuICAgICAgICAgIGJMYWJlbD1cIkludGVsXCJcbiAgICAgICAgICB2YWx1ZT17YXNzZW1ibHlGbGF2b3J9XG4gICAgICAgICAgb25DaGFuZ2U9e2NoYW5nZUFzc2VtYmx5Rmxhdm9yfSAvPlxuXG4gICAgICAgIDxFaXRoZXJDb25maWdcbiAgICAgICAgICBpZD1cImFzc2VtYmx5LXN5bWJvbHNcIlxuICAgICAgICAgIG5hbWU9XCJTeW1ib2wgRGVtYW5nbGluZ1wiXG4gICAgICAgICAgYT17RGVtYW5nbGVBc3NlbWJseS5EZW1hbmdsZX1cbiAgICAgICAgICBiPXtEZW1hbmdsZUFzc2VtYmx5Lk1hbmdsZX1cbiAgICAgICAgICBhTGFiZWw9XCJPblwiXG4gICAgICAgICAgYkxhYmVsPVwiT2ZmXCJcbiAgICAgICAgICB2YWx1ZT17ZGVtYW5nbGVBc3NlbWJseX1cbiAgICAgICAgICBvbkNoYW5nZT17Y2hhbmdlRGVtYW5nbGVBc3NlbWJseX1cbiAgICAgICAgLz5cblxuICAgICAgICA8RWl0aGVyQ29uZmlnXG4gICAgICAgICAgaWQ9XCJhc3NlbWJseS12aWV3XCJcbiAgICAgICAgICBuYW1lPVwiTmFtZSBGaWx0ZXJpbmdcIlxuICAgICAgICAgIGE9e1Byb2Nlc3NBc3NlbWJseS5GaWx0ZXJ9XG4gICAgICAgICAgYj17UHJvY2Vzc0Fzc2VtYmx5LlJhd31cbiAgICAgICAgICBhTGFiZWw9XCJPblwiXG4gICAgICAgICAgYkxhYmVsPVwiT2ZmXCJcbiAgICAgICAgICB2YWx1ZT17cHJvY2Vzc0Fzc2VtYmx5fVxuICAgICAgICAgIG9uQ2hhbmdlPXtjaGFuZ2VQcm9jZXNzQXNzZW1ibHl9XG4gICAgICAgIC8+XG4gICAgICA8L01lbnVHcm91cD5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnTWVudTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQWR2YW5jZWRPcHRpb25zTWVudSBmcm9tICcuL0FkdmFuY2VkT3B0aW9uc01lbnUnO1xuaW1wb3J0IEJ1aWxkTWVudSBmcm9tICcuL0J1aWxkTWVudSc7XG5pbXBvcnQgQ2hhbm5lbE1lbnUgZnJvbSAnLi9DaGFubmVsTWVudSc7XG5pbXBvcnQgQ29uZmlnTWVudSBmcm9tICcuL0NvbmZpZ01lbnUnO1xuaW1wb3J0IEhlYWRlckJ1dHRvbiBmcm9tICcuL0hlYWRlckJ1dHRvbic7XG5pbXBvcnQgeyBCdWlsZEljb24sIENvbmZpZ0ljb24sIEhlbHBJY29uLCBNb3JlT3B0aW9uc0FjdGl2ZUljb24sIE1vcmVPcHRpb25zSWNvbiB9IGZyb20gJy4vSWNvbic7XG5pbXBvcnQgTW9kZU1lbnUgZnJvbSAnLi9Nb2RlTWVudSc7XG5pbXBvcnQgUG9wQnV0dG9uIGZyb20gJy4vUG9wQnV0dG9uJztcbmltcG9ydCB7IFNlZ21lbnRlZEJ1dHRvbiwgU2VnbWVudGVkQnV0dG9uU2V0LCBTZWdtZW50ZWRMaW5rIH0gZnJvbSAnLi9TZWdtZW50ZWRCdXR0b24nO1xuaW1wb3J0IFRvb2xzTWVudSBmcm9tICcuL1Rvb2xzTWVudSc7XG5cbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyB1c2VBcHBEaXNwYXRjaCB9IGZyb20gJy4vY29uZmlndXJlU3RvcmUnO1xuaW1wb3J0IHsgcGVyZm9ybUdpc3RTYXZlIH0gZnJvbSAnLi9yZWR1Y2Vycy9vdXRwdXQvZ2lzdCc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9IZWFkZXIubW9kdWxlLmNzcyc7XG5cbmNvbnN0IEhlYWRlcjogUmVhY3QuRkMgPSAoKSA9PiAoXG4gIDxkaXYgZGF0YS10ZXN0LWlkPVwiaGVhZGVyXCIgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICA8SGVhZGVyU2V0IGlkPVwiYnVpbGRcIj5cbiAgICAgIDxTZWdtZW50ZWRCdXR0b25TZXQ+XG4gICAgICAgIDxFeGVjdXRlQnV0dG9uIC8+XG4gICAgICAgIDxCdWlsZE1lbnVCdXR0b24gLz5cbiAgICAgIDwvU2VnbWVudGVkQnV0dG9uU2V0PlxuICAgIDwvSGVhZGVyU2V0PlxuICAgIDxIZWFkZXJTZXQgaWQ9XCJjaGFubmVsLW1vZGVcIj5cbiAgICAgIDxTZWdtZW50ZWRCdXR0b25TZXQ+XG4gICAgICAgIDxNb2RlTWVudUJ1dHRvbiAvPlxuICAgICAgICA8Q2hhbm5lbE1lbnVCdXR0b24gLz5cbiAgICAgICAgPEFkdmFuY2VkT3B0aW9uc01lbnVCdXR0b24gLz5cbiAgICAgIDwvU2VnbWVudGVkQnV0dG9uU2V0PlxuICAgIDwvSGVhZGVyU2V0PlxuICAgIDxIZWFkZXJTZXQgaWQ9XCJzaGFyZVwiPlxuICAgICAgPFNlZ21lbnRlZEJ1dHRvblNldD5cbiAgICAgICAgPFNoYXJlQnV0dG9uIC8+XG4gICAgICA8L1NlZ21lbnRlZEJ1dHRvblNldD5cbiAgICA8L0hlYWRlclNldD5cbiAgICA8SGVhZGVyU2V0IGlkPVwidG9vbHNcIj5cbiAgICAgIDxTZWdtZW50ZWRCdXR0b25TZXQ+XG4gICAgICAgIDxUb29sc01lbnVCdXR0b24gLz5cbiAgICAgIDwvU2VnbWVudGVkQnV0dG9uU2V0PlxuICAgIDwvSGVhZGVyU2V0PlxuICAgIDxIZWFkZXJTZXQgaWQ9XCJjb25maWdcIj5cbiAgICAgIDxTZWdtZW50ZWRCdXR0b25TZXQ+XG4gICAgICAgIDxDb25maWdNZW51QnV0dG9uIC8+XG4gICAgICA8L1NlZ21lbnRlZEJ1dHRvblNldD5cbiAgICA8L0hlYWRlclNldD5cbiAgICA8SGVhZGVyU2V0IGlkPVwiaGVscFwiPlxuICAgICAgPFNlZ21lbnRlZEJ1dHRvblNldD5cbiAgICAgICAgPEhlbHBCdXR0b24gLz5cbiAgICAgIDwvU2VnbWVudGVkQnV0dG9uU2V0PlxuICAgIDwvSGVhZGVyU2V0PlxuICA8L2Rpdj5cbik7XG5cbmludGVyZmFjZSBIZWFkZXJTZXRQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGlkOiBzdHJpbmc7XG59XG5cbmNvbnN0IEhlYWRlclNldDogUmVhY3QuRkM8SGVhZGVyU2V0UHJvcHM+ID0gKHsgaWQsIGNoaWxkcmVuIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2lkID09ICdjaGFubmVsLW1vZGUnID8gc3R5bGVzLnNldENoYW5uZWxNb2RlIDogc3R5bGVzLnNldH0+e2NoaWxkcmVufTwvZGl2PlxuKTtcblxuY29uc3QgRXhlY3V0ZUJ1dHRvbjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGV4ZWN1dGlvbkxhYmVsID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLmdldEV4ZWN1dGlvbkxhYmVsKTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG4gIGNvbnN0IGV4ZWN1dGUgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLnBlcmZvcm1QcmltYXJ5QWN0aW9uKCkpLCBbZGlzcGF0Y2hdKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWdtZW50ZWRCdXR0b24gaXNCdWlsZCBvbkNsaWNrPXtleGVjdXRlfT5cbiAgICAgIDxIZWFkZXJCdXR0b24gYm9sZCByaWdodEljb249ezxCdWlsZEljb24gLz59PlxuICAgICAgICB7ZXhlY3V0aW9uTGFiZWx9XG4gICAgICA8L0hlYWRlckJ1dHRvbj5cbiAgICA8L1NlZ21lbnRlZEJ1dHRvbj5cbiAgKTtcbn07XG5cbmNvbnN0IEJ1aWxkTWVudUJ1dHRvbjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQsIHsgdG9nZ2xlOiAoKSA9PiB2b2lkIH0+KCh7IHRvZ2dsZSB9LCByZWYpID0+IChcbiAgICA8U2VnbWVudGVkQnV0dG9uIHRpdGxlPVwiU2VsZWN0IHdoYXQgdG8gYnVpbGRcIiByZWY9e3JlZn0gb25DbGljaz17dG9nZ2xlfT5cbiAgICAgIDxIZWFkZXJCdXR0b24gaWNvbj17PE1vcmVPcHRpb25zSWNvbiAvPn0gLz5cbiAgICA8L1NlZ21lbnRlZEJ1dHRvbj5cbiAgKSk7XG4gIEJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdCdWlsZE1lbnVCdXR0b24uQnV0dG9uJztcblxuICByZXR1cm4gPFBvcEJ1dHRvbiBCdXR0b249e0J1dHRvbn0gTWVudT17QnVpbGRNZW51fSAvPjtcbn07XG5cbmNvbnN0IE1vZGVNZW51QnV0dG9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgbGFiZWwgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuZ2V0TW9kZUxhYmVsKTtcblxuICBjb25zdCBCdXR0b24gPSBSZWFjdC5mb3J3YXJkUmVmPEhUTUxCdXR0b25FbGVtZW50LCB7IHRvZ2dsZTogKCkgPT4gdm9pZCB9PigoeyB0b2dnbGUgfSwgcmVmKSA9PiAoXG4gICAgPFNlZ21lbnRlZEJ1dHRvbiB0aXRsZT1cIk1vZGUgJm1kYXNoOyBDaG9vc2UgdGhlIG9wdGltaXphdGlvbiBsZXZlbFwiIHJlZj17cmVmfSBvbkNsaWNrPXt0b2dnbGV9PlxuICAgICAgPEhlYWRlckJ1dHRvbiBpc0V4cGFuZGFibGU+e2xhYmVsfTwvSGVhZGVyQnV0dG9uPlxuICAgIDwvU2VnbWVudGVkQnV0dG9uPlxuICApKTtcbiAgQnV0dG9uLmRpc3BsYXlOYW1lID0gJ01vZGVNZW51QnV0dG9uLkJ1dHRvbic7XG5cbiAgcmV0dXJuIDxQb3BCdXR0b24gQnV0dG9uPXtCdXR0b259IE1lbnU9e01vZGVNZW51fSAvPjtcbn07XG5cbmNvbnN0IENoYW5uZWxNZW51QnV0dG9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgbGFiZWwgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuZ2V0Q2hhbm5lbExhYmVsKTtcblxuICBjb25zdCBCdXR0b24gPSBSZWFjdC5mb3J3YXJkUmVmPEhUTUxCdXR0b25FbGVtZW50LCB7IHRvZ2dsZTogKCkgPT4gdm9pZCB9PigoeyB0b2dnbGUgfSwgcmVmKSA9PiAoXG4gICAgPFNlZ21lbnRlZEJ1dHRvbiB0aXRsZT1cIkNoYW5uZWwgJm1kYXNoOyBDaG9vc2UgdGhlIFJ1c3QgdmVyc2lvblwiIHJlZj17cmVmfSBvbkNsaWNrPXt0b2dnbGV9PlxuICAgICAgPEhlYWRlckJ1dHRvbiBpc0V4cGFuZGFibGU+e2xhYmVsfTwvSGVhZGVyQnV0dG9uPlxuICAgIDwvU2VnbWVudGVkQnV0dG9uPlxuICApKTtcbiAgQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0NoYW5uZWxNZW51QnV0dG9uLkJ1dHRvbic7XG5cbiAgcmV0dXJuIDxQb3BCdXR0b24gQnV0dG9uPXtCdXR0b259IE1lbnU9e0NoYW5uZWxNZW51fSAvPjtcbn1cblxuY29uc3QgQWR2YW5jZWRPcHRpb25zTWVudUJ1dHRvbjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGFkdmFuY2VkT3B0aW9uc1NldCA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5nZXRBZHZhbmNlZE9wdGlvbnNTZXQpO1xuXG4gIGNvbnN0IEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQsIHsgdG9nZ2xlOiAoKSA9PiB2b2lkIH0+KCh7IHRvZ2dsZSB9LCByZWYpID0+IChcbiAgICA8U2VnbWVudGVkQnV0dG9uIHRpdGxlPVwiQWR2YW5jZWQgY29tcGlsYXRpb24gZmxhZ3NcIiByZWY9e3JlZn0gb25DbGljaz17dG9nZ2xlfT5cbiAgICAgIDxIZWFkZXJCdXR0b24gaWNvbj17YWR2YW5jZWRPcHRpb25zU2V0ID8gPE1vcmVPcHRpb25zQWN0aXZlSWNvbiAvPiA6IDxNb3JlT3B0aW9uc0ljb24gLz59IC8+XG4gICAgPC9TZWdtZW50ZWRCdXR0b24+XG4gICkpO1xuICBCdXR0b24uZGlzcGxheU5hbWUgPSAnQWR2YW5jZWRPcHRpb25zTWVudUJ1dHRvbi5CdXR0b24nO1xuXG4gIHJldHVybiA8UG9wQnV0dG9uIEJ1dHRvbj17QnV0dG9ufSBNZW51PXtBZHZhbmNlZE9wdGlvbnNNZW51fSAvPjtcbn1cblxuY29uc3QgU2hhcmVCdXR0b246IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG4gIGNvbnN0IGdpc3RTYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gocGVyZm9ybUdpc3RTYXZlKCkpLCBbZGlzcGF0Y2hdKTtcblxuICByZXR1cm4gKFxuICAgIDxTZWdtZW50ZWRCdXR0b24gdGl0bGU9XCJDcmVhdGUgc2hhcmVhYmxlIGxpbmtzIHRvIHRoaXMgY29kZVwiIG9uQ2xpY2s9e2dpc3RTYXZlfT5cbiAgICAgIDxIZWFkZXJCdXR0b24+U2hhcmU8L0hlYWRlckJ1dHRvbj5cbiAgICA8L1NlZ21lbnRlZEJ1dHRvbj5cbiAgKTtcbn07XG5cblxuY29uc3QgVG9vbHNNZW51QnV0dG9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgQnV0dG9uID0gUmVhY3QuZm9yd2FyZFJlZjxIVE1MQnV0dG9uRWxlbWVudCwgeyB0b2dnbGU6ICgpID0+IHZvaWQgfT4oKHsgdG9nZ2xlIH0sIHJlZikgPT4gKFxuICAgIDxTZWdtZW50ZWRCdXR0b24gdGl0bGU9XCJSdW4gZXh0cmEgdG9vbHMgb24gdGhlIHNvdXJjZSBjb2RlXCIgcmVmPXtyZWZ9IG9uQ2xpY2s9e3RvZ2dsZX0+XG4gICAgICA8SGVhZGVyQnV0dG9uIGlzRXhwYW5kYWJsZT5Ub29sczwvSGVhZGVyQnV0dG9uPlxuICAgIDwvU2VnbWVudGVkQnV0dG9uPlxuICApKTtcbiAgQnV0dG9uLmRpc3BsYXlOYW1lID0gJ1Rvb2xzTWVudUJ1dHRvbi5CdXR0b24nO1xuXG4gIHJldHVybiA8UG9wQnV0dG9uIEJ1dHRvbj17QnV0dG9ufSBNZW51PXtUb29sc01lbnV9IC8+O1xufTtcblxuY29uc3QgQ29uZmlnTWVudUJ1dHRvbjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQsIHsgdG9nZ2xlOiAoKSA9PiB2b2lkIH0+KCh7IHRvZ2dsZSB9LCByZWYpID0+IChcbiAgICA8U2VnbWVudGVkQnV0dG9uIHRpdGxlPVwiU2hvdyB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zXCIgcmVmPXtyZWZ9IG9uQ2xpY2s9e3RvZ2dsZX0+XG4gICAgICA8SGVhZGVyQnV0dG9uIGljb249ezxDb25maWdJY29uIC8+fSBpc0V4cGFuZGFibGU+Q29uZmlnPC9IZWFkZXJCdXR0b24+XG4gICAgPC9TZWdtZW50ZWRCdXR0b24+XG4gICkpO1xuICBCdXR0b24uZGlzcGxheU5hbWUgPSAnQ29uZmlnTWVudUJ1dHRvbi5CdXR0b24nO1xuXG4gIHJldHVybiA8UG9wQnV0dG9uIEJ1dHRvbj17QnV0dG9ufSBNZW51PXtDb25maWdNZW51fSAvPjtcbn07XG5cbmNvbnN0IEhlbHBCdXR0b246IFJlYWN0LkZDID0gKCkgPT4gKFxuICA8U2VnbWVudGVkTGluayB0aXRsZT1cIlZpZXcgaGVscFwiIGFjdGlvbj17YWN0aW9ucy5uYXZpZ2F0ZVRvSGVscH0+XG4gICAgPEhlYWRlckJ1dHRvbiBpY29uPXs8SGVscEljb24gLz59IC8+XG4gIDwvU2VnbWVudGVkTGluaz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEV4cGFuZGFibGVJY29uIH0gZnJvbSAnLi9JY29uJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0hlYWRlckJ1dHRvbi5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIEhlYWRlckJ1dHRvblByb3BzIHtcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIGJvbGQ/OiBib29sZWFuO1xuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICByaWdodEljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIGlzRXhwYW5kYWJsZT86IGJvb2xlYW47XG59XG5cbmNvbnN0IEhlYWRlckJ1dHRvbjogUmVhY3QuRkM8SGVhZGVyQnV0dG9uUHJvcHM+ID0gKHsgYm9sZCwgaWNvbiwgcmlnaHRJY29uLCBpc0V4cGFuZGFibGUsIGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgYyA9IFtzdHlsZXMuY29udGFpbmVyXTtcblxuICBpZiAoYm9sZCkgeyBjLnB1c2goc3R5bGVzLmJvbGQpOyB9XG4gIGlmIChpY29uKSB7IGMucHVzaChzdHlsZXMuaGFzTGVmdEljb24pOyB9XG4gIGlmIChyaWdodEljb24pIHsgYy5wdXNoKHN0eWxlcy5oYXNSaWdodEljb24pOyB9XG4gIGlmIChpc0V4cGFuZGFibGUpIHsgYy5wdXNoKHN0eWxlcy5leHBhbmRhYmxlKTsgfVxuICBpZiAoKGljb24gfHwgcmlnaHRJY29uKSAmJiAhaXNFeHBhbmRhYmxlICYmICFjaGlsZHJlbikgeyBjLnB1c2goc3R5bGVzLmljb25Pbmx5KTsgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Muam9pbignICcpfT5cbiAgICAgIHtpY29uICYmIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubGVmdEljb259PntpY29ufTwvZGl2Pn1cbiAgICAgIHsgY2hpbGRyZW59XG4gICAgICB7IHJpZ2h0SWNvbiAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJpZ2h0SWNvbn0+e3JpZ2h0SWNvbn08L2Rpdj59XG4gICAgICB7IGlzRXhwYW5kYWJsZSAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmRyb3B9PjxFeHBhbmRhYmxlSWNvbiAvPjwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckJ1dHRvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBFeGFtcGxlIGZyb20gJy4vSGVscEV4YW1wbGUnO1xuaW1wb3J0IExpbmsgZnJvbSAnLi91c3Mtcm91dGVyL0xpbmsnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vSGVscC5tb2R1bGUuY3NzJztcblxuaW1wb3J0IGludGVnZXIzMkxvZ28gZnJvbSAnLi9hc3NldHMvaW50ZWdlcjMyLWxvZ28uc3ZnJztcblxuY29uc3QgQUNFX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vYWpheG9yZy9hY2UnO1xuY29uc3QgQ0xJUFBZX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vTWFuaXNoZWFydGgvcnVzdC1jbGlwcHknO1xuY29uc3QgTUlSSV9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL3J1c3QtbGFuZy9taXJpJztcbmNvbnN0IENSQVRFU19JT19VUkwgPSAnaHR0cHM6Ly9jcmF0ZXMuaW8vJztcbmNvbnN0IFJVU1RfQ09PS0JPT0tfVVJMID0gJ2h0dHBzOi8vcnVzdC1sYW5nLW51cnNlcnkuZ2l0aHViLmlvL3J1c3QtY29va2Jvb2svJztcbmNvbnN0IENSQVRFU19VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL3J1c3QtbGFuZy9ydXN0LXBsYXlncm91bmQvYmxvYi9tYWluL2NvbXBpbGVyL2Jhc2UvQ2FyZ28udG9tbCc7XG5jb25zdCBHSVNUX1VSTCA9ICdodHRwczovL2dpc3QuZ2l0aHViLmNvbS8nO1xuY29uc3QgSTMyX1VSTCA9ICdodHRwOi8vaW50ZWdlcjMyLmNvbS8nO1xuY29uc3QgTE9DQUxTVE9SQUdFX1VSTCA9ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1N0b3JhZ2VfQVBJJztcbmNvbnN0IE9SSUdJTkFMX1BMQVlHUk9VTkRfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9ydXN0LWxhbmcvcnVzdC1wbGF5cGVuJztcbmNvbnN0IFJFUE9fVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9ydXN0LWxhbmcvcnVzdC1wbGF5Z3JvdW5kJztcbmNvbnN0IFJVU1RGTVRfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9ydXN0LWxhbmctbnVyc2VyeS9ydXN0Zm10JztcbmNvbnN0IFNIRVBNQVNURVJfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaGVwbWFzdGVyLyc7XG5cbmNvbnN0IENSQVRFX0VYQU1QTEUgPSBgZXh0ZXJuIGNyYXRlIHJhbmQ7XG51c2UgcmFuZDo6Um5nO1xuXG5mbiBtYWluKCkge1xuICAgIGxldCBtdXQgcm5nID0gcmFuZDo6dGhyZWFkX3JuZygpO1xuICAgIHByaW50bG4hKFwie31cIiwgcm5nLmdlbjo6PHU4PigpKTtcbn1gO1xuXG5jb25zdCBDTElQUFlfRVhBTVBMRSA9IGBmbiBtYWluKCkge1xuICAgIG1hdGNoIHRydWUge1xuICAgICAgICB0cnVlID0+IHByaW50bG4hKFwidHJ1ZVwiKSxcbiAgICAgICAgZmFsc2UgPT4gcHJpbnRsbiEoXCJmYWxzZVwiKSxcbiAgICB9XG59YDtcblxuY29uc3QgTUlSSV9FWEFNUExFID0gYGZuIG1haW4oKSB7XG4gICAgbGV0IG11dCBhOiBbdTg7IDBdID0gW107XG4gICAgdW5zYWZlIHtcbiAgICAgICAgKmEuZ2V0X3VuY2hlY2tlZF9tdXQoMSkgPSAxO1xuICAgIH1cbn1gO1xuXG5jb25zdCBSVVNURk1UX0VYQU1QTEUgPSBgLy8gd293LCB0aGlzIGlzIHVnbHkhXG5mbiBtYWluICgpXG57IHN0cnVjdCBGb28geyBhOiB1OCwgYjogU3RyaW5nLCB9XG5tYXRjaCA0IHsyPT57fSxfPT57fX0gfWA7XG5cbmNvbnN0IExJTktfRVhBTVBMRSA9ICdodHRwczovL3BsYXkuaW50ZWdlcjMyLmNvbS8/Y29kZT1mbiBtYWluKCkgeyBwcmludGxuIShcImhlbGxvIHdvcmxkIVwiKTsgfSc7XG5cbmNvbnN0IFRFU1RfRVhBTVBMRSA9IGAjW3Rlc3RdXG5mbiB0ZXN0X3NvbWV0aGluZygpIHtcbiAgICBhc3NlcnRfbmUhKDQyLCAwKTtcbn1gO1xuXG5jb25zdCBMSUJSQVJZX0VYQU1QTEUgPSBgIyFbY3JhdGVfdHlwZT1cImxpYlwiXVxuXG5wdWIgZm4gbGlicmFyeV9mbigpIC0+IHU4IHtcbiAgICA0MlxufWA7XG5cbmNvbnN0IE9VVFBVVF9FWEFNUExFID0gYCNbaW5saW5lKG5ldmVyKV1cbnB1YiBmbiBhX2xvb3AoKSAtPiBpMzIge1xuICAgIGxldCBtdXQgc3VtID0gMDtcbiAgICBmb3IgaSBpbiAwLi4xMDAge1xuICAgICAgICBzdW0gKz0gaTtcbiAgICB9XG4gICAgc3VtXG59XG5cbmZuIG1haW4oKSB7XG4gICAgcHJpbnRsbiEoXCJ7fVwiLCBhX2xvb3AoKSk7XG59YDtcblxuY29uc3QgSGVscDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgIDxoMT5UaGUgUnVzdCBQbGF5Z3JvdW5kPC9oMT5cbiAgICAgIDxMaW5rIGFjdGlvbj17YWN0aW9ucy5uYXZpZ2F0ZVRvSW5kZXh9PlJldHVybiB0byB0aGUgcGxheWdyb3VuZDwvTGluaz5cblxuICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImFib3V0XCIgaGVhZGVyPVwiQWJvdXRcIiBsZXZlbD1cImgyXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFRoZSBwbGF5Z3JvdW5kIGlzIGFuIDxhIGhyZWY9e1JFUE9fVVJMfT5vcGVuIHNvdXJjZSBwcm9qZWN0PC9hPi5cbiAgICAgICAgICBJZiB5b3UgaGF2ZSBhbnkgc3VnZ2VzdGlvbnMgZm9yIGZlYXR1cmVzLCBpc3N1ZXMgd2l0aCB0aGVcbiAgICAgICAgICBpbXBsZW1lbnRhdGlvbiwgb3IganVzdCB3YW50IHRvIHJlYWQgdGhlIGNvZGUgZm9yIHlvdXJzZWxmLFxuICAgICAgICAgIHlvdSBhcmUgaW52aXRlZCB0byBwYXJ0aWNpcGF0ZSFcbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxwPlxuICAgICAgICAgIFRoaXMgcGxheWdyb3VuZCBpcyBtb2RlbGVkIGFmdGVyIHRoZSA8YSBocmVmPXtPUklHSU5BTF9QTEFZR1JPVU5EX1VSTH0+b3JpZ2luYWxcbiAgICAgICAgUnVzdCBwbGF5Z3JvdW5kPC9hPiwgYW5kIHdlIG93ZSBhIGdyZWF0IGRlYnQgdG8gZXZlcnkgY29udHJpYnV0b3IgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCBwcm9qZWN0LlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPHA+XG4gICAgICAgICAgVGhpcyBwbGF5Z3JvdW5kIHdhcyBjcmVhdGVkIGJ5IDxhIGhyZWY9e1NIRVBNQVNURVJfVVJMfT5KYWtlIEdvdWxkaW5nPC9hPixcbiAgICAgICAgcGFydCBvZiA8YSBocmVmPXtJMzJfVVJMfT5JbnRlZ2VyIDMyPC9hPi5cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLmxvZ299PlxuICAgICAgICAgIDxhIGhyZWY9e0kzMl9VUkx9PlxuICAgICAgICAgICAgPGltZyBzcmM9e2ludGVnZXIzMkxvZ299IGFsdD1cIkludGVnZXIgMzIgTG9nb1wiIC8+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L3A+XG4gICAgICA8L0xpbmthYmxlU2VjdGlvbj5cblxuICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzXCIgaGVhZGVyPVwiRmVhdHVyZXNcIiBsZXZlbD1cImgyXCI+XG4gICAgICAgIDxMaW5rYWJsZVNlY3Rpb24gaWQ9XCJmZWF0dXJlcy1jcmF0ZXNcIiBoZWFkZXI9XCJDcmF0ZXNcIiBsZXZlbD1cImgzXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBUaGUgcGxheWdyb3VuZCBwcm92aWRlcyB0aGUgdG9wIDEwMCBtb3N0IGRvd25sb2FkZWQgY3JhdGVzXG4gICAgICAgICAgZnJvbSA8YSBocmVmPXtDUkFURVNfSU9fVVJMfT5jcmF0ZXMuaW88L2E+LCB0aGUgY3JhdGVzIGZyb21cbiAgICAgICAgICB0aGUgPGEgaHJlZj17UlVTVF9DT09LQk9PS19VUkx9PlJ1c3QgQ29va2Jvb2s8L2E+LCBhbmQgYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlaXIgZGVwZW5kZW5jaWVzLiBUbyB1c2UgYSBjcmF0ZSwgYWRkIHRoZSBhcHByb3ByaWF0ZVxuICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgIDxDb2RlPmV4dGVybiBjcmF0ZSBmb288L0NvZGU+IGxpbmUgdG8gdGhlIGNvZGUuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPEV4YW1wbGUgY29kZT17Q1JBVEVfRVhBTVBMRX0gLz5cblxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgU2VlIHRoZSA8YSBocmVmPXtDUkFURVNfVVJMfT5jb21wbGV0ZSBsaXN0IG9mIGNyYXRlczwvYT4gdG8ga25vd1xuICAgICAgICAgICAgd2hhdOKAmXMgYXZhaWxhYmxlLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG5cbiAgICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzLWZvcm1hdHRpbmdcIiBoZWFkZXI9XCJGb3JtYXR0aW5nIGNvZGVcIiBsZXZlbD1cImgzXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8YSBocmVmPXtSVVNURk1UX1VSTH0+cnVzdGZtdDwvYT4gaXMgYSB0b29sIGZvciBmb3JtYXR0aW5nIFJ1c3QgY29kZVxuICAgICAgICAgIGFjY29yZGluZyB0byB0aGUgUnVzdCBzdHlsZSBndWlkZWxpbmVzLiBDbGljayBvbiB0aGUgPHN0cm9uZz5Gb3JtYXQ8L3N0cm9uZz5cbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICBidXR0b24gaW4gdGhlIDxzdHJvbmc+VG9vbHM8L3N0cm9uZz4gbWVudSB0byBhdXRvbWF0aWNhbGx5IHJlZm9ybWF0IHlvdXIgY29kZS5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8RXhhbXBsZSBjb2RlPXtSVVNURk1UX0VYQU1QTEV9IC8+XG4gICAgICAgIDwvTGlua2FibGVTZWN0aW9uPlxuXG4gICAgICAgIDxMaW5rYWJsZVNlY3Rpb24gaWQ9XCJmZWF0dXJlcy1saW50aW5nXCIgaGVhZGVyPVwiTGludGluZyBjb2RlXCIgbGV2ZWw9XCJoM1wiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgPGEgaHJlZj17Q0xJUFBZX1VSTH0+Q2xpcHB5PC9hPiBpcyBhIGNvbGxlY3Rpb24gb2YgbGludHMgdG8gY2F0Y2ggY29tbW9uXG4gICAgICAgICAgbWlzdGFrZXMgYW5kIGltcHJvdmUgeW91ciBSdXN0IGNvZGUuIENsaWNrIG9uIHRoZSA8c3Ryb25nPkNsaXBweTwvc3Ryb25nPlxuICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgIGJ1dHRvbiBpbiB0aGUgPHN0cm9uZz5Ub29sczwvc3Ryb25nPiBtZW51IHRvIHNlZSBwb3NzaWJsZSBpbXByb3ZlbWVudHMgdG8geW91clxuICAgICAgICAgICAgY29kZS5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8RXhhbXBsZSBjb2RlPXtDTElQUFlfRVhBTVBMRX0gLz5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG5cbiAgICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzLW1pcmlcIiBoZWFkZXI9XCJDaGVja2luZyBjb2RlIGZvciB1bmRlZmluZWQgYmVoYXZpb3JcIiBsZXZlbD1cImgzXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8YSBocmVmPXtNSVJJX1VSTH0+TWlyaTwvYT4gaXMgYW4gaW50ZXJwcmV0ZXIgZm9yIFJ1c3TigJlzIG1pZC1sZXZlbCBpbnRlcm1lZGlhdGVcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uIChNSVIpIGFuZCBjYW4gYmUgdXNlZCB0byBkZXRlY3QgY2VydGFpbiBraW5kcyBvZiB1bmRlZmluZWQgYmVoYXZpb3JcbiAgICAgICAgICBpbiB5b3VyIHVuc2FmZSBSdXN0IGNvZGUuIENsaWNrIG9uIHRoZSA8c3Ryb25nPk1pcmk8L3N0cm9uZz4gYnV0dG9uIGluXG4gICAgICAgICAgdGhlIDxzdHJvbmc+VG9vbHM8L3N0cm9uZz4gbWVudSB0byBjaGVjay5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8RXhhbXBsZSBjb2RlPXtNSVJJX0VYQU1QTEV9IC8+XG4gICAgICAgIDwvTGlua2FibGVTZWN0aW9uPlxuXG4gICAgICAgIDxMaW5rYWJsZVNlY3Rpb24gaWQ9XCJmZWF0dXJlcy1zaGFyaW5nXCIgaGVhZGVyPVwiU2hhcmluZyBjb2RlXCIgbGV2ZWw9XCJoM1wiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgT25jZSB5b3UgaGF2ZSBzb21lIGNvZGUgd29ydGggc2F2aW5nIG9yIHNoYXJpbmcsIGNsaWNrIG9uIHRoZVxuICAgICAgICAgICAgeycgJ31cbiAgICAgICAgICAgIDxzdHJvbmc+U2hhcmU8L3N0cm9uZz4gYnV0dG9uLiBUaGlzIHdpbGwgY3JlYXRlIGFcbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICA8YSBocmVmPXtHSVNUX1VSTH0+R2l0SHViIEdpc3Q8L2E+LiBZb3Ugd2lsbCBhbHNvIGJlIHByb3ZpZGVkIHdpdGhcbiAgICAgICAgICAgIGEgVVJMIHRvIGxvYWQgdGhhdCBHaXN0IGJhY2sgaW50byB0aGUgcGxheWdyb3VuZC5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvTGlua2FibGVTZWN0aW9uPlxuXG4gICAgICAgIDxMaW5rYWJsZVNlY3Rpb24gaWQ9XCJmZWF0dXJlcy1saW5raW5nXCIgaGVhZGVyPVwiTGlua2luZyB0byB0aGUgcGxheWdyb3VuZCB3aXRoIGluaXRpYWwgY29kZVwiIGxldmVsPVwiaDNcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIElmIHlvdSBoYXZlIGEgd2ViIHBhZ2Ugd2l0aCBSdXN0IGNvZGUgdGhhdCB5b3XigJlkIGxpa2UgdG9cbiAgICAgICAgICAgIHNob3cgaW4gYWN0aW9uLCB5b3UgY2FuIGxpbmsgdG8gdGhlIHBsYXlncm91bmQgd2l0aCB0aGVcbiAgICAgICAgICBSdXN0IGNvZGUgaW4gdGhlIHF1ZXJ5IHBhcmFtZXRlciA8Q29kZT5jb2RlPC9Db2RlPi4gTWFrZSBzdXJlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlIGFueSBzcGVjaWFsIGNoYXJhY3RlcnMuIEtlZXAgdGhlIGNvZGUgc2hvcnQsIGFzIFVSTHMgaGF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0YXRpb25zIG9uIHRoZSBtYXhpbXVtIGxlbmd0aC5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8cHJlIGNsYXNzTmFtZT17c3R5bGVzLmNvZGV9Pjxjb2RlPntMSU5LX0VYQU1QTEV9PC9jb2RlPjwvcHJlPlxuICAgICAgICA8L0xpbmthYmxlU2VjdGlvbj5cblxuICAgICAgICA8TGlua2FibGVTZWN0aW9uIGlkPVwiZmVhdHVyZXMtdGVzdHNcIiBoZWFkZXI9XCJFeGVjdXRpbmcgdGVzdHNcIiBsZXZlbD1cImgzXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBJZiB5b3VyIGNvZGUgY29udGFpbnMgdGhlIDxDb2RlPiNbdGVzdF08L0NvZGU+IGF0dHJpYnV0ZSBhbmQgZG9lcyBub3RcbiAgICAgICAgICBjb250YWluIGEgPENvZGU+bWFpbjwvQ29kZT4gbWV0aG9kLCA8Q29kZT5jYXJnbyB0ZXN0PC9Db2RlPiB3aWxsIGJlXG4gICAgICAgICAgZXhlY3V0ZWQgaW5zdGVhZCBvZiA8Q29kZT5jYXJnbyBydW48L0NvZGU+LlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxFeGFtcGxlIGNvZGU9e1RFU1RfRVhBTVBMRX0gLz5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG5cbiAgICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzLWxpYnJhcnlcIiBoZWFkZXI9XCJDb21waWxpbmcgYXMgYSBsaWJyYXJ5XCIgbGV2ZWw9XCJoM1wiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgSWYgeW91ciBjb2RlIGNvbnRhaW5zIHRoZSA8Q29kZT4jIVtjcmF0ZV90eXBlPSZxdW90O2xpYiZxdW90O108L0NvZGU+IGF0dHJpYnV0ZSxcbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICA8Q29kZT5jYXJnbyBidWlsZDwvQ29kZT4gd2lsbCBiZSBleGVjdXRlZCBpbnN0ZWFkIG9mIDxDb2RlPmNhcmdvXG4gICAgICAgICAgcnVuPC9Db2RlPi5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8RXhhbXBsZSBjb2RlPXtMSUJSQVJZX0VYQU1QTEV9IC8+XG4gICAgICAgIDwvTGlua2FibGVTZWN0aW9uPlxuXG4gICAgICAgIDxMaW5rYWJsZVNlY3Rpb24gaWQ9XCJmZWF0dXJlcy1vdXRwdXQtZm9ybWF0c1wiIGhlYWRlcj1cIk91dHB1dCBmb3JtYXRzXCIgbGV2ZWw9XCJoM1wiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgSW5zdGVhZCBvZiBleGVjdXRpbmcgdGhlIGNvZGUsIHlvdSBjYW4gYWxzbyBzZWUgaW50ZXJtZWRpYXRlXG4gICAgICAgICAgICBvdXRwdXQgb2YgdGhlIGNvbXBpbGVyIGFzIHg4Nl82NCBhc3NlbWJseSwgTExWTSBJUiwgUnVzdCBNSVIsIG9yXG4gICAgICAgICAgICBXZWJBc3NlbWJseS4gVGhpcyBpcyBvZnRlbiB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gICAgICAgICAgICB7JyAnfVxuICAgICAgICAgICAgPGEgaHJlZj1cIiNmZWF0dXJlcy1tb2Rlc1wiPm1vZGU8L2E+IHNldCB0byDigJxSZWxlYXNl4oCdIHRvIHNlZSBob3cgdGhlXG4gICAgICAgICAgICBjb21waWxlciBoYXMgY2hvc2VuIHRvIG9wdGltaXplIHNvbWUgc3BlY2lmaWMgcGllY2Ugb2YgY29kZS5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8RXhhbXBsZSBjb2RlPXtPVVRQVVRfRVhBTVBMRX0gLz5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG5cbiAgICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzLW1vZGVzXCIgaGVhZGVyPVwiQ29tcGlsYXRpb24gbW9kZXNcIiBsZXZlbD1cImgzXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBSdXN0IGhhcyB0d28gcHJpbWFyeSBjb21waWxhdGlvbiBtb2RlczogPHN0cm9uZz5EZWJ1Zzwvc3Ryb25nPiBhbmRcbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICA8c3Ryb25nPlJlbGVhc2U8L3N0cm9uZz4uIERlYnVnIGNvbXBpbGVzIGNvZGUgZmFzdGVyIHdoaWxlIFJlbGVhc2VcbiAgICAgICAgICAgIHBlcmZvcm1zIG1vcmUgYWdncmVzc2l2ZSBvcHRpbWl6YXRpb25zLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgWW91IGNhbiBjaG9vc2Ugd2hpY2ggbW9kZSB0byBjb21waWxlIGluIHVzaW5nIHRoZSA8c3Ryb25nPk1vZGU8L3N0cm9uZz5cbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICBtZW51LlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG5cbiAgICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzLWNoYW5uZWxzXCIgaGVhZGVyPVwiUnVzdCBjaGFubmVsc1wiIGxldmVsPVwiaDNcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFJ1c3QgcmVsZWFzZXMgbmV3IDxzdHJvbmc+c3RhYmxlPC9zdHJvbmc+IHZlcnNpb25zIGV2ZXJ5IDZcbiAgICAgICAgICB3ZWVrcy4gQmV0d2VlbiB0aGVzZSBzdGFibGUgcmVsZWFzZXMsIDxzdHJvbmc+YmV0YTwvc3Ryb25nPiB2ZXJzaW9ucyBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0IHN0YWJsZSByZWxlYXNlIGFyZSBtYWRlIGF2YWlsYWJsZS4gSW4gYWRkaXRpb24sIGJ1aWxkcyBjb250YWluaW5nXG4gICAgICAgICAgZXhwZXJpbWVudGFsIGZlYXR1cmVzIGFyZSBwcm9kdWNlZCA8c3Ryb25nPm5pZ2h0bHk8L3N0cm9uZz4uXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBZb3UgY2FuIGNob29zZSB3aGljaCBjaGFubmVsIHRvIGNvbXBpbGUgd2l0aCB1c2luZyB0aGVcbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICA8c3Ryb25nPkNoYW5uZWw8L3N0cm9uZz4gbWVudS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvTGlua2FibGVTZWN0aW9uPlxuXG4gICAgICAgIDxMaW5rYWJsZVNlY3Rpb24gaWQ9XCJmZWF0dXJlcy1jdXN0b21pemF0aW9uXCIgaGVhZGVyPVwiQ3VzdG9taXphdGlvblwiIGxldmVsPVwiaDNcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFRoZSA8YSBocmVmPXtBQ0VfVVJMfT5BamF4Lm9yZyBDbG91ZDkgRWRpdG9yIChBY2UpPC9hPiBpcyB1c2VkIHRvXG4gICAgICAgICAgICBwcm92aWRlIGEgYmV0dGVyIGludGVyZmFjZSBmb3IgZWRpdGluZyBjb2RlLiBBY2UgY29tZXMgd2l0aFxuICAgICAgICAgICAgc2V2ZXJhbCBrZXliaW5kaW5nIG9wdGlvbnMgKHN1Y2ggYXMgRW1hY3MgYW5kIFZpbSkgYXMgd2VsbCBhcyBtYW55XG4gICAgICAgICAgICB0aGVtZXMuXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBZb3UgbWF5IGFsc28gZGlzYWJsZSBBY2UgY29tcGxldGVseSwgZmFsbGluZyBiYWNrIHRvIGFcbiAgICAgICAgICAgIHNpbXBsZSBIVE1MIHRleHQgYXJlYS5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFRoZXNlIG9wdGlvbnMgY2FuIGJlIGNvbmZpZ3VyZWQgdmlhIHRoZSA8c3Ryb25nPkNvbmZpZzwvc3Ryb25nPiBtZW51LlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG5cbiAgICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImZlYXR1cmVzLXBlcnNpc3RlbmNlXCIgaGVhZGVyPVwiUGVyc2lzdGVuY2VcIiBsZXZlbD1cImgzXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBUaGUgbW9zdCByZWNlbnRseSBlbnRlcmVkIGNvZGUgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHNhdmVkIGluIHlvdXIgYnJvd3NlcuKAmXNcbiAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICA8YSBocmVmPXtMT0NBTFNUT1JBR0VfVVJMfT5sb2NhbCBzdG9yYWdlPC9hPi4gVGhpcyBhbGxvd3MgeW91IHRvIHJlY292ZXJcbiAgICAgICAgICAgIHlvdXIgbGFzdCB3b3JrIGV2ZW4gaWYgeW91IGNsb3NlIHRoZSBicm93c2VyLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgTG9jYWwgc3RvcmFnZSBpcyBhIHNpbmdsZXRvbiByZXNvdXJjZSwgc28gaWYgeW91IHVzZSBtdWx0aXBsZSB3aW5kb3dzLFxuICAgICAgICAgICAgb25seSB0aGUgbW9zdCByZWNlbnRseSBzYXZlZCBjb2RlIHdpbGwgYmUgcGVyc2lzdGVkLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9MaW5rYWJsZVNlY3Rpb24+XG4gICAgICA8L0xpbmthYmxlU2VjdGlvbj5cblxuICAgICAgPExpbmthYmxlU2VjdGlvbiBpZD1cImxpbWl0YXRpb25zXCIgaGVhZGVyPVwiTGltaXRhdGlvbnNcIiBsZXZlbD1cImgyXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFRvIHByZXZlbnQgdGhlIHBsYXlncm91bmQgZnJvbSBiZWluZyB1c2VkIHRvIGF0dGFjayBvdGhlciBjb21wdXRlcnMgYW5kXG4gICAgICAgICAgdG8gZW5zdXJlIGl0IGlzIGF2YWlsYWJsZSBmb3IgZXZlcnlvbmUgdG8gdXNlLCBzb21lIGxpbWl0YXRpb25zXG4gICAgICAgICAgYXJlIGVuZm9yY2VkLlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPGRsPlxuICAgICAgICAgIDxkdD5OZXR3b3JrPC9kdD5cbiAgICAgICAgICA8ZGQ+XG4gICAgICAgICAgICBUaGVyZSBpcyBubyBuZXR3b3JrIGNvbm5lY3Rpb24gYXZhaWxhYmxlIGR1cmluZyBjb21waWxhdGlvbiBvclxuICAgICAgICAgICAgZXhlY3V0aW9uIG9mIHVzZXItc3VibWl0dGVkIGNvZGUuXG4gICAgICAgICAgPC9kZD5cblxuICAgICAgICAgIDxkdD5NZW1vcnk8L2R0PlxuICAgICAgICAgIDxkZD5cbiAgICAgICAgICAgIFRoZSBhbW91bnQgb2YgbWVtb3J5IHRoZSBjb21waWxlciBhbmQgcmVzdWx0aW5nIGV4ZWN1dGFibGUgdXNlIGlzXG4gICAgICAgICAgICBsaW1pdGVkLlxuICAgICAgICAgIDwvZGQ+XG5cbiAgICAgICAgICA8ZHQ+RXhlY3V0aW9uIFRpbWU8L2R0PlxuICAgICAgICAgIDxkZD5cbiAgICAgICAgICAgIFRoZSB0b3RhbCBjb21waWxhdGlvbiBhbmQgZXhlY3V0aW9uIHRpbWUgaXMgbGltaXRlZC5cbiAgICAgICAgICA8L2RkPlxuXG4gICAgICAgICAgPGR0PkRpc2s8L2R0PlxuICAgICAgICAgIDxkZD5cbiAgICAgICAgICAgIFRoZSB0b3RhbCBkaXNrIHNwYWNlIGF2YWlsYWJsZSB0byB0aGUgY29tcGlsZXIgYW5kIHJlc3VsdGluZ1xuICAgICAgICAgICAgZXhlY3V0YWJsZSBpcyBsaW1pdGVkLlxuICAgICAgICAgIDwvZGQ+XG4gICAgICAgIDwvZGw+XG4gICAgICA8L0xpbmthYmxlU2VjdGlvbj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5jb25zdCBMaW5rYWJsZVNlY3Rpb246IFJlYWN0LkZDPExpbmthYmxlU2VjdGlvblByb3BzPiA9ICh7XG4gIGlkLCBoZWFkZXIsIGxldmVsOiBMZXZlbCwgY2hpbGRyZW4sXG59KSA9PiAoXG4gIDxkaXYgaWQ9e2lkfT5cbiAgICA8TGV2ZWw+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxuICAgICAgICA8YSBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJMaW5rfSBocmVmPXtgIyR7aWR9YH0+e2hlYWRlcn08L2E+XG4gICAgICA8L3NwYW4+XG4gICAgPC9MZXZlbD5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuaW50ZXJmYWNlIExpbmthYmxlU2VjdGlvblByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgaWQ6IHN0cmluZztcbiAgaGVhZGVyOiBzdHJpbmc7XG4gIGxldmVsOiBSZWFjdC5FbGVtZW50VHlwZTtcbn1cblxuY29uc3QgQ29kZTogUmVhY3QuRkM8UmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48dW5rbm93bj4+ID0gKHsgY2hpbGRyZW4gfSkgPT4gKFxuICA8Y29kZSBjbGFzc05hbWU9e3N0eWxlcy5jb2RlfT57Y2hpbGRyZW59PC9jb2RlPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgSGVscDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCByb290IGZyb20gJ3JlYWN0LXNoYWRvdyc7XG5cbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1c3QubWluJztcbmltcG9ydCB7IFByaXNtQ29kZSB9IGZyb20gJ3JlYWN0LXByaXNtJztcblxuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgdXNlQXBwRGlzcGF0Y2ggfSBmcm9tICcuL2NvbmZpZ3VyZVN0b3JlJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0hlbHBFeGFtcGxlLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHByaXNtVGhlbWUgZnJvbSAncHJpc21qcy90aGVtZXMvcHJpc20tb2thaWRpYS5jc3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlbHBFeGFtcGxlUHJvcHMge1xuICBjb2RlOiBzdHJpbmc7XG59XG5cbmNvbnN0IEhlbHBFeGFtcGxlOiBSZWFjdC5GQzxIZWxwRXhhbXBsZVByb3BzPiA9ICh7IGNvZGUgfSkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG4gIGNvbnN0IHNob3dFeGFtcGxlID0gdXNlQ2FsbGJhY2soXG4gICAgKCkgPT4gZGlzcGF0Y2goYWN0aW9ucy5zaG93RXhhbXBsZShjb2RlKSksXG4gICAgW2Rpc3BhdGNoLCBjb2RlXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5sb2FkRXhhbXBsZX0gb25DbGljaz17c2hvd0V4YW1wbGV9PlxuICAgICAgICBMb2FkIGluIHBsYXlncm91bmRcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPHJvb3QuZGl2PlxuICAgICAgICA8bGluayBocmVmPXtwcmlzbVRoZW1lfSByZWw9XCJzdHlsZXNoZWV0XCIgLz5cblxuICAgICAgICA8cHJlPlxuICAgICAgICAgIDxQcmlzbUNvZGUgY2xhc3NOYW1lPVwibGFuZ3VhZ2UtcnVzdFwiPlxuICAgICAgICAgICAge2NvZGV9XG4gICAgICAgICAgPC9QcmlzbUNvZGU+XG4gICAgICAgIDwvcHJlPlxuICAgICAgPC9yb290LmRpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlbHBFeGFtcGxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vSWNvbi5tb2R1bGUuY3NzJztcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG4vLyBUaGVzZSBpY29ucyBjYW1lIGZyb20gTWF0ZXJpYWwgRGVzaWduIG9yaWdpbmFsbHlcbi8vIGh0dHBzOi8vbWF0ZXJpYWwuaW8vdG9vbHMvaWNvbnMvP2ljb249YXNzaWdubWVudCZzdHlsZT1vdXRsaW5lXG5cbi8vIE0uRC4gJ3BsYXlfYXJyb3cnXG5leHBvcnQgY29uc3QgQnVpbGRJY29uID0gKCkgPT4gKFxuICA8c3ZnIGNsYXNzTmFtZT17c3R5bGVzLmljb259IGhlaWdodD1cIjE0XCIgdmlld0JveD1cIjggNCAxMCAxNlwiIHdpZHRoPVwiMTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgPHBhdGggZD1cIk04IDV2MTRsMTEtN3pcIiAvPlxuICA8L3N2Zz5cbik7XG5cbi8vIE0uRC4gJ2tleWJvYXJkX2Fycm93X2Rvd24nXG5leHBvcnQgY29uc3QgRXhwYW5kYWJsZUljb24gPSAoKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0gaGVpZ2h0PVwiMTBcIiB2aWV3Qm94PVwiNiA4IDEyIDhcIiB3aWR0aD1cIjEwXCIgb3BhY2l0eT1cIjAuNVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cGF0aCBkPVwiTTE2LjU5IDguNTlMMTIgMTMuMTcgNy40MSA4LjU5IDYgMTBsNiA2IDYtNnpcIiAvPlxuICA8L3N2Zz5cbik7XG5cbi8vIE0uRC4gJ21vcmVfaG9yaXonXG5leHBvcnQgY29uc3QgTW9yZU9wdGlvbnNJY29uID0gKCkgPT4gKFxuICA8c3ZnIGNsYXNzTmFtZT17c3R5bGVzLmljb259IGhlaWdodD1cIjE4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMThcIiBvcGFjaXR5PVwiMC41XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgIDxwYXRoIGQ9XCJNNiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bTEyIDBjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem0tNiAwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnpcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBjb25zdCBNb3JlT3B0aW9uc0FjdGl2ZUljb24gPSAoKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0gaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIxOFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICB7LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLXVua25vd24tcHJvcGVydHkgKi99XG4gICAgPHBhdGggZmlsbFJ1bGU9XCJldmVub2RkXCIgZmlsbD1cIiM0MjhiY2FcIiBkPVwiTTQsNSBoMTYgYTMsMyAwIDAsMSAzLDMgdjggYTMsMyAwIDAsMSAtMywzIGgtMTYgYTMsMyAwIDAsMSAtMywtMyB2LTggYTMsMyAwIDAsMSAzLC0zIFogTTYgMTBjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem0xMiAwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnptLTYgMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG4vLyBNLkQuICdzZXR0aW5ncycsXG5leHBvcnQgY29uc3QgQ29uZmlnSWNvbiA9ICgpID0+IChcbiAgPHN2ZyBjbGFzc05hbWU9e3N0eWxlcy5pY29ufSBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjE1XCIgb3BhY2l0eT1cIjAuNVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cGF0aCBkPVwiTTE5LjQzIDEyLjk4Yy4wNC0uMzIuMDctLjY0LjA3LS45OHMtLjAzLS42Ni0uMDctLjk4bDIuMTEtMS42NWMuMTktLjE1LjI0LS40Mi4xMi0uNjRsLTItMy40NmMtLjEyLS4yMi0uMzktLjMtLjYxLS4yMmwtMi40OSAxYy0uNTItLjQtMS4wOC0uNzMtMS42OS0uOThsLS4zOC0yLjY1QzE0LjQ2IDIuMTggMTQuMjUgMiAxNCAyaC00Yy0uMjUgMC0uNDYuMTgtLjQ5LjQybC0uMzggMi42NWMtLjYxLjI1LTEuMTcuNTktMS42OS45OGwtMi40OS0xYy0uMjMtLjA5LS40OSAwLS42MS4yMmwtMiAzLjQ2Yy0uMTMuMjItLjA3LjQ5LjEyLjY0bDIuMTEgMS42NWMtLjA0LjMyLS4wNy42NS0uMDcuOThzLjAzLjY2LjA3Ljk4bC0yLjExIDEuNjVjLS4xOS4xNS0uMjQuNDItLjEyLjY0bDIgMy40NmMuMTIuMjIuMzkuMy42MS4yMmwyLjQ5LTFjLjUyLjQgMS4wOC43MyAxLjY5Ljk4bC4zOCAyLjY1Yy4wMy4yNC4yNC40Mi40OS40Mmg0Yy4yNSAwIC40Ni0uMTguNDktLjQybC4zOC0yLjY1Yy42MS0uMjUgMS4xNy0uNTkgMS42OS0uOThsMi40OSAxYy4yMy4wOS40OSAwIC42MS0uMjJsMi0zLjQ2Yy4xMi0uMjIuMDctLjQ5LS4xMi0uNjRsLTIuMTEtMS42NXpNMTIgMTUuNWMtMS45MyAwLTMuNS0xLjU3LTMuNS0zLjVzMS41Ny0zLjUgMy41LTMuNSAzLjUgMS41NyAzLjUgMy41LTEuNTcgMy41LTMuNSAzLjV6XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG4vLyBNLkQuICdoZWxwX291dGxpbmUnXG5leHBvcnQgY29uc3QgSGVscEljb24gPSAoKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0gaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIxOFwiIG9wYWNpdHk9XCIwLjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgPHBhdGggZD1cIk0xMSAxOGgydi0yaC0ydjJ6bTEtMTZDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0wLTE0Yy0yLjIxIDAtNCAxLjc5LTQgNGgyYzAtMS4xLjktMiAyLTJzMiAuOSAyIDJjMCAyLTMgMS43NS0zIDVoMmMwLTIuMjUgMy0yLjUgMy01IDAtMi4yMS0xLjc5LTQtNC00elwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuZXhwb3J0IGNvbnN0IENoZWNrbWFya0ljb24gPSAoKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0gaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMiAyIDIyIDIyXCIgd2lkdGg9XCIxOFwiIG9wYWNpdHk9XCIwLjVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgPHBhdGggZD1cIk05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXpcIiAvPlxuICA8L3N2Zz5cbik7XG5cbi8vIE0uRC4gJ2Fzc2lnbm1lbnQnIChvdXRsaW5lKVxuZXhwb3J0IGNvbnN0IENsaXBib2FyZEljb24gPSAoKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0gaGVpZ2h0PVwiMThcIiB3aWR0aD1cIjE4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cmVjdCB4PVwiN1wiIHk9XCIxNVwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIiAvPlxuICAgIDxyZWN0IHg9XCI3XCIgeT1cIjExXCIgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjJcIiAvPlxuICAgIDxyZWN0IHg9XCI3XCIgeT1cIjdcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMlwiIC8+XG4gICAgPHBhdGggZD1cIk0xOSwzTDE5LDNoLTQuMThDMTQuNCwxLjg0LDEzLjMsMSwxMiwxYy0xLjMsMC0yLjQsMC44NC0yLjgyLDJINWgwQzQuODYsMyw0LjczLDMuMDEsNC42LDMuMDQgQzQuMjEsMy4xMiwzLjg2LDMuMzIsMy41OSwzLjU5Yy0wLjE4LDAuMTgtMC4zMywwLjQtMC40MywwLjY0QzMuMDYsNC40NiwzLDQuNzIsMyw1djE0YzAsMC4yNywwLjA2LDAuNTQsMC4xNiwwLjc4IGMwLjEsMC4yNCwwLjI1LDAuNDUsMC40MywwLjY0YzAuMjcsMC4yNywwLjYyLDAuNDcsMS4wMSwwLjU1QzQuNzMsMjAuOTksNC44NiwyMSw1LDIxaDBoMTRoMGMxLjEsMCwyLTAuOSwyLTJWNSBDMjEsMy45LDIwLjEsMywxOSwzeiBNMTIsMi43NWMwLjQxLDAsMC43NSwwLjM0LDAuNzUsMC43NWMwLDAuNDEtMC4zNCwwLjc1LTAuNzUsMC43NWMtMC40MSwwLTAuNzUtMC4zNC0wLjc1LTAuNzUgQzExLjI1LDMuMDksMTEuNTksMi43NSwxMiwyLjc1eiBNMTksMTlINVY1aDE0VjE5elwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuLy8gTS5ELiAnY2xvc2UnXG5leHBvcnQgY29uc3QgQ2xvc2UgPSAoKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0gd2lkdGg9XCIyNHB4XCIgaGVpZ2h0PVwiMjRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICA8cGF0aCBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxelwiIC8+XG4gIDwvc3ZnPlxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9Mb2FkZXIubW9kdWxlLmNzcyc7XG5cbmNvbnN0IExvYWRlcjogUmVhY3QuRkMgPSAoKSA9PiAoXG4gIDxkaXY+XG4gICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZG90fT7irKQ8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZG90fT7irKQ8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZG90fT7irKQ8L3NwYW4+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL01lbnVBc2lkZS5tb2R1bGUuY3NzJztcblxuY29uc3QgTWVudUFzaWRlOiBSZWFjdC5GQzxSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx1bmtub3duPj4gPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxwIGNsYXNzTmFtZT17c3R5bGVzLmFzaWRlfT5cbiAgICB7Y2hpbGRyZW59XG4gIDwvcD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IE1lbnVBc2lkZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9NZW51R3JvdXAubW9kdWxlLmNzcyc7XG5cbmludGVyZmFjZSBNZW51R3JvdXBQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIHRpdGxlOiBzdHJpbmc7XG59XG5cbmNvbnN0IE1lbnVHcm91cDogUmVhY3QuRkM8TWVudUdyb3VwUHJvcHM+ID0gKHsgdGl0bGUsIGNoaWxkcmVuIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgIDxoMSBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+e3RpdGxlfTwvaDE+XG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250ZW50fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBNZW51R3JvdXA7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vTWVudUl0ZW0ubW9kdWxlLmNzcyc7XG5cbmNvbnN0IE1lbnVJdGVtOiBSZWFjdC5GQzxSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx1bmtub3duPj4gPSAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT57Y2hpbGRyZW59PC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBNZW51SXRlbTtcbiIsImltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBNZW51R3JvdXAgZnJvbSAnLi9NZW51R3JvdXAnO1xuaW1wb3J0IFNlbGVjdE9uZSBmcm9tICcuL1NlbGVjdE9uZSc7XG5cbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IE1vZGUgfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIE1vZGVNZW51UHJvcHMge1xuICBjbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgTW9kZU1lbnU6IFJlYWN0LkZDPE1vZGVNZW51UHJvcHM+ID0gcHJvcHMgPT4ge1xuICBjb25zdCBtb2RlID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuY29uZmlndXJhdGlvbi5tb2RlKTtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBjaGFuZ2VNb2RlID0gdXNlQ2FsbGJhY2soKG1vZGU6IE1vZGUpID0+IHtcbiAgICBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZU1vZGUobW9kZSkpO1xuICAgIHByb3BzLmNsb3NlKCk7XG4gIH0sIFtkaXNwYXRjaCwgcHJvcHNdXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8TWVudUdyb3VwIHRpdGxlPVwiTW9kZSAmbWRhc2g7IENob29zZSBvcHRpbWl6YXRpb24gbGV2ZWxcIj5cbiAgICAgICAgPFNlbGVjdE9uZVxuICAgICAgICAgIG5hbWU9XCJEZWJ1Z1wiXG4gICAgICAgICAgY3VycmVudFZhbHVlPXttb2RlfVxuICAgICAgICAgIHRoaXNWYWx1ZT17TW9kZS5EZWJ1Z31cbiAgICAgICAgICBjaGFuZ2VWYWx1ZT17Y2hhbmdlTW9kZX1cbiAgICAgICAgPlxuICAgICAgICAgIEJ1aWxkIHdpdGggZGVidWcgaW5mb3JtYXRpb24sIHdpdGhvdXQgb3B0aW1pemF0aW9ucy5cbiAgICAgICAgPC9TZWxlY3RPbmU+XG4gICAgICAgIDxTZWxlY3RPbmVcbiAgICAgICAgICBuYW1lPVwiUmVsZWFzZVwiXG4gICAgICAgICAgY3VycmVudFZhbHVlPXttb2RlfVxuICAgICAgICAgIHRoaXNWYWx1ZT17TW9kZS5SZWxlYXNlfVxuICAgICAgICAgIGNoYW5nZVZhbHVlPXtjaGFuZ2VNb2RlfVxuICAgICAgICA+XG4gICAgICAgICAgQnVpbGQgd2l0aCBvcHRpbWl6YXRpb25zIHR1cm5lZCBvbi5cbiAgICAgICAgPC9TZWxlY3RPbmU+XG4gICAgICA8L01lbnVHcm91cD5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kZU1lbnU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQb3J0YWwgfSBmcm9tICdyZWFjdC1wb3J0YWwnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDbG9zZSB9IGZyb20gJy4vSWNvbic7XG5cbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycyc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9Ob3RpZmljYXRpb25zLm1vZHVsZS5jc3MnO1xuXG5jb25zdCBTVVJWRVlfVVJMID0gJ2h0dHBzOi8vYmxvZy5ydXN0LWxhbmcub3JnLzIwMjIvMTIvMDUvc3VydmV5LWxhdW5jaC5odG1sJztcblxuY29uc3QgTm90aWZpY2F0aW9uczogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFBvcnRhbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgPFJ1c3RTdXJ2ZXkyMDIyTm90aWZpY2F0aW9uIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L1BvcnRhbD5cbiAgKTtcbn07XG5cbmNvbnN0IFJ1c3RTdXJ2ZXkyMDIyTm90aWZpY2F0aW9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3Qgc2hvd1J1c3RTdXJ2ZXkyMDIyID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLnNob3dSdXN0U3VydmV5MjAyMlNlbGVjdG9yKTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gIGNvbnN0IHNlZW5SdXN0U3VydmV5MjAyMSA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKGFjdGlvbnMuc2VlblJ1c3RTdXJ2ZXkyMDIyKCkpLCBbZGlzcGF0Y2hdKTtcblxuICByZXR1cm4gc2hvd1J1c3RTdXJ2ZXkyMDIyID8gKFxuICAgIDxOb3RpZmljYXRpb24gb25DbG9zZT17c2VlblJ1c3RTdXJ2ZXkyMDIxfT5cbiAgICAgIFBsZWFzZSBoZWxwIHVzIHRha2UgYSBsb29rIGF0IHdobyB0aGUgUnVzdCBjb21tdW5pdHkgaXNcbiAgICAgIGNvbXBvc2VkIG9mLCBob3cgdGhlIFJ1c3QgcHJvamVjdCBpcyBkb2luZywgYW5kIGhvdyB3ZSBjYW5cbiAgICAgIGltcHJvdmUgdGhlIFJ1c3QgcHJvZ3JhbW1pbmcgZXhwZXJpZW5jZSBieSBjb21wbGV0aW5nIHRoZSA8YVxuICAgICAgICBocmVmPXtTVVJWRVlfVVJMfT4yMDIyIFN0YXRlIG9mIFJ1c3QgU3VydmV5PC9hPi4gV2hldGhlciBvclxuICAgICAgbm90IHlvdSB1c2UgUnVzdCB0b2RheSwgd2Ugd2FudCB0byBrbm93IHlvdXIgb3BpbmlvbnMuXG4gICAgPC9Ob3RpZmljYXRpb24+XG4gICkgOiBudWxsO1xufTtcblxuaW50ZXJmYWNlIE5vdGlmaWNhdGlvblByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgTm90aWZpY2F0aW9uOiBSZWFjdC5GQzxOb3RpZmljYXRpb25Qcm9wcz4gPSAoeyBvbkNsb3NlLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubm90aWZpY2F0aW9ufT5cbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm5vdGlmaWNhdGlvbkNvbnRlbnR9PntjaGlsZHJlbn08L2Rpdj5cbiAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmNsb3NlfSBvbkNsaWNrPXtvbkNsb3NlfT48Q2xvc2UgLz48L2J1dHRvbj5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25zO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMnO1xuaW1wb3J0IHsgRm9jdXMgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IEV4ZWN1dGUgZnJvbSAnLi9PdXRwdXQvRXhlY3V0ZSc7XG5pbXBvcnQgR2lzdCBmcm9tICcuL091dHB1dC9HaXN0JztcbmltcG9ydCBTZWN0aW9uIGZyb20gJy4vT3V0cHV0L1NlY3Rpb24nO1xuaW1wb3J0IFNpbXBsZVBhbmUsIHsgU2ltcGxlUGFuZVByb3BzIH0gZnJvbSAnLi9PdXRwdXQvU2ltcGxlUGFuZSc7XG5pbXBvcnQgUGFuZVdpdGhNaXIgZnJvbSAnLi9PdXRwdXQvUGFuZVdpdGhNaXInO1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4vc2VsZWN0b3JzJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL091dHB1dC5tb2R1bGUuY3NzJztcblxuY29uc3QgVGFiOiBSZWFjdC5GQzxUYWJQcm9wcz4gPSAoeyBraW5kLCBmb2N1cywgbGFiZWwsIG9uQ2xpY2ssIHRhYlByb3BzIH0pID0+IHtcbiAgaWYgKHNlbGVjdG9ycy5oYXNQcm9wZXJ0aWVzKHRhYlByb3BzKSkge1xuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT17Zm9jdXMgPT09IGtpbmQgPyBzdHlsZXMudGFiU2VsZWN0ZWQgOiBzdHlsZXMudGFifVxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuaW50ZXJmYWNlIFRhYlByb3BzIHtcbiAga2luZDogRm9jdXM7XG4gIGZvY3VzPzogRm9jdXM7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9uQ2xpY2s6ICgpID0+IGFueTtcbiAgdGFiUHJvcHM6IG9iamVjdDtcbn1cblxuY29uc3QgUGFuZVdpdGhDb2RlOiBSZWFjdC5GQzxQYW5lV2l0aENvZGVQcm9wcz4gPSAoeyBjb2RlLCAuLi5yZXN0IH0pID0+IChcbiAgPFNpbXBsZVBhbmUgey4uLnJlc3R9PlxuICAgIDxTZWN0aW9uIGtpbmQ9XCJjb2RlXCIgbGFiZWw9XCJSZXN1bHRcIj57Y29kZX08L1NlY3Rpb24+XG4gIDwvU2ltcGxlUGFuZT5cbik7XG5cbmludGVyZmFjZSBQYW5lV2l0aENvZGVQcm9wcyBleHRlbmRzIFNpbXBsZVBhbmVQcm9wcyB7XG4gIGNvZGU/OiBzdHJpbmc7XG59XG5cbmNvbnN0IE91dHB1dDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IHNvbWV0aGluZ1RvU2hvdyA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5nZXRTb21ldGhpbmdUb1Nob3cpO1xuICBjb25zdCB7IG1ldGE6IHsgZm9jdXMgfSwgZXhlY3V0ZSwgZm9ybWF0LCBjbGlwcHksIG1pcmksIG1hY3JvRXhwYW5zaW9uLCBhc3NlbWJseSwgbGx2bUlyLCBtaXIsIGhpciwgd2FzbSwgZ2lzdCB9ID1cbiAgICB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5vdXRwdXQpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgY29uc3QgZm9jdXNDbG9zZSA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlRm9jdXMoKSksIFtkaXNwYXRjaF0pO1xuICBjb25zdCBmb2N1c0V4ZWN1dGUgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUZvY3VzKEZvY3VzLkV4ZWN1dGUpKSwgW2Rpc3BhdGNoXSk7XG4gIGNvbnN0IGZvY3VzRm9ybWF0ID0gdXNlQ2FsbGJhY2soKCkgPT4gZGlzcGF0Y2goYWN0aW9ucy5jaGFuZ2VGb2N1cyhGb2N1cy5Gb3JtYXQpKSwgW2Rpc3BhdGNoXSk7XG4gIGNvbnN0IGZvY3VzQ2xpcHB5ID0gdXNlQ2FsbGJhY2soKCkgPT4gZGlzcGF0Y2goYWN0aW9ucy5jaGFuZ2VGb2N1cyhGb2N1cy5DbGlwcHkpKSwgW2Rpc3BhdGNoXSk7XG4gIGNvbnN0IGZvY3VzTWlyaSA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlRm9jdXMoRm9jdXMuTWlyaSkpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgZm9jdXNNYWNyb0V4cGFuc2lvbiA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKGFjdGlvbnMuY2hhbmdlRm9jdXMoRm9jdXMuTWFjcm9FeHBhbnNpb24pKSwgW2Rpc3BhdGNoXSk7XG4gIGNvbnN0IGZvY3VzQXNzZW1ibHkgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUZvY3VzKEZvY3VzLkFzbSkpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgZm9jdXNMbHZtSXIgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUZvY3VzKEZvY3VzLkxsdm1JcikpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgZm9jdXNNaXIgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUZvY3VzKEZvY3VzLk1pcikpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgZm9jdXNIaXIgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUZvY3VzKEZvY3VzLkhpcikpLCBbZGlzcGF0Y2hdKTtcbiAgY29uc3QgZm9jdXNXYXNtID0gdXNlQ2FsbGJhY2soKCkgPT4gZGlzcGF0Y2goYWN0aW9ucy5jaGFuZ2VGb2N1cyhGb2N1cy5XYXNtKSksIFtkaXNwYXRjaF0pO1xuICBjb25zdCBmb2N1c0dpc3QgPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmNoYW5nZUZvY3VzKEZvY3VzLkdpc3QpKSwgW2Rpc3BhdGNoXSk7XG5cbiAgaWYgKCFzb21ldGhpbmdUb1Nob3cpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxldCBjbG9zZTogUmVhY3QuUmVhY3RFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIGxldCBib2R5OiBSZWFjdC5SZWFjdEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgaWYgKGZvY3VzKSB7XG4gICAgY2xvc2UgPSA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLnRhYkNsb3NlfSBvbkNsaWNrPXtmb2N1c0Nsb3NlfT5DbG9zZTwvYnV0dG9uPjtcblxuICAgIGJvZHkgPSAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJvZHl9PlxuICAgICAgICB7Zm9jdXMgPT09IEZvY3VzLkV4ZWN1dGUgJiYgPEV4ZWN1dGUgLz59XG4gICAgICAgIHtmb2N1cyA9PT0gRm9jdXMuRm9ybWF0ICYmIDxTaW1wbGVQYW5lIHsuLi5mb3JtYXR9IGtpbmQ9XCJmb3JtYXRcIiAvPn1cbiAgICAgICAge2ZvY3VzID09PSBGb2N1cy5DbGlwcHkgJiYgPFNpbXBsZVBhbmUgey4uLmNsaXBweX0ga2luZD1cImNsaXBweVwiIC8+fVxuICAgICAgICB7Zm9jdXMgPT09IEZvY3VzLk1pcmkgJiYgPFNpbXBsZVBhbmUgey4uLm1pcml9IGtpbmQ9XCJtaXJpXCIgLz59XG4gICAgICAgIHtmb2N1cyA9PT0gRm9jdXMuTWFjcm9FeHBhbnNpb24gJiYgPFNpbXBsZVBhbmUgey4uLm1hY3JvRXhwYW5zaW9ufSBraW5kPVwibWFjcm8tZXhwYW5zaW9uXCIgLz59XG4gICAgICAgIHtmb2N1cyA9PT0gRm9jdXMuQXNtICYmIDxQYW5lV2l0aENvZGUgey4uLmFzc2VtYmx5fSBraW5kPVwiYXNtXCIgLz59XG4gICAgICAgIHtmb2N1cyA9PT0gRm9jdXMuTGx2bUlyICYmIDxQYW5lV2l0aENvZGUgey4uLmxsdm1Jcn0ga2luZD1cImxsdm0taXJcIiAvPn1cbiAgICAgICAge2ZvY3VzID09PSBGb2N1cy5NaXIgJiYgPFBhbmVXaXRoTWlyIHsuLi5taXJ9IGtpbmQ9XCJtaXJcIiAvPn1cbiAgICAgICAge2ZvY3VzID09PSBGb2N1cy5IaXIgJiYgPFBhbmVXaXRoTWlyIHsuLi5oaXJ9IGtpbmQ9XCJoaXJcIiAvPn1cbiAgICAgICAge2ZvY3VzID09PSBGb2N1cy5XYXNtICYmIDxQYW5lV2l0aENvZGUgey4uLndhc219IGtpbmQ9XCJ3YXNtXCIgLz59XG4gICAgICAgIHtmb2N1cyA9PT0gRm9jdXMuR2lzdCAmJiA8R2lzdCAvPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfSBkYXRhLXRlc3QtaWQ9XCJvdXRwdXRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGFic30+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuRXhlY3V0ZX0gZm9jdXM9e2ZvY3VzfVxuICAgICAgICAgIGxhYmVsPVwiRXhlY3V0aW9uXCJcbiAgICAgICAgICBvbkNsaWNrPXtmb2N1c0V4ZWN1dGV9XG4gICAgICAgICAgdGFiUHJvcHM9e2V4ZWN1dGV9IC8+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuRm9ybWF0fSBmb2N1cz17Zm9jdXN9XG4gICAgICAgICAgbGFiZWw9XCJGb3JtYXRcIlxuICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzRm9ybWF0fVxuICAgICAgICAgIHRhYlByb3BzPXtmb3JtYXR9IC8+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuQ2xpcHB5fSBmb2N1cz17Zm9jdXN9XG4gICAgICAgICAgbGFiZWw9XCJDbGlwcHlcIlxuICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzQ2xpcHB5fVxuICAgICAgICAgIHRhYlByb3BzPXtjbGlwcHl9IC8+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuTWlyaX0gZm9jdXM9e2ZvY3VzfVxuICAgICAgICAgIGxhYmVsPVwiTWlyaVwiXG4gICAgICAgICAgb25DbGljaz17Zm9jdXNNaXJpfVxuICAgICAgICAgIHRhYlByb3BzPXttaXJpfSAvPlxuICAgICAgICA8VGFiIGtpbmQ9e0ZvY3VzLk1hY3JvRXhwYW5zaW9ufSBmb2N1cz17Zm9jdXN9XG4gICAgICAgICAgbGFiZWw9XCJNYWNybyBleHBhbnNpb25cIlxuICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzTWFjcm9FeHBhbnNpb259XG4gICAgICAgICAgdGFiUHJvcHM9e21hY3JvRXhwYW5zaW9ufSAvPlxuICAgICAgICA8VGFiIGtpbmQ9e0ZvY3VzLkFzbX0gZm9jdXM9e2ZvY3VzfVxuICAgICAgICAgIGxhYmVsPVwiQVNNXCJcbiAgICAgICAgICBvbkNsaWNrPXtmb2N1c0Fzc2VtYmx5fVxuICAgICAgICAgIHRhYlByb3BzPXthc3NlbWJseX0gLz5cbiAgICAgICAgPFRhYiBraW5kPXtGb2N1cy5MbHZtSXJ9IGZvY3VzPXtmb2N1c31cbiAgICAgICAgICBsYWJlbD1cIkxMVk0gSVJcIlxuICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzTGx2bUlyfVxuICAgICAgICAgIHRhYlByb3BzPXtsbHZtSXJ9IC8+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuTWlyfSBmb2N1cz17Zm9jdXN9XG4gICAgICAgICAgbGFiZWw9XCJNSVJcIlxuICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzTWlyfVxuICAgICAgICAgIHRhYlByb3BzPXttaXJ9IC8+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuSGlyfSBmb2N1cz17Zm9jdXN9XG4gICAgICAgICAgbGFiZWw9XCJISVJcIlxuICAgICAgICAgIG9uQ2xpY2s9e2ZvY3VzSGlyfVxuICAgICAgICAgIHRhYlByb3BzPXtoaXJ9IC8+XG4gICAgICAgIDxUYWIga2luZD17Rm9jdXMuV2FzbX0gZm9jdXM9e2ZvY3VzfVxuICAgICAgICAgIGxhYmVsPVwiV0FTTVwiXG4gICAgICAgICAgb25DbGljaz17Zm9jdXNXYXNtfVxuICAgICAgICAgIHRhYlByb3BzPXt3YXNtfSAvPlxuICAgICAgICA8VGFiIGtpbmQ9e0ZvY3VzLkdpc3R9IGZvY3VzPXtmb2N1c31cbiAgICAgICAgICBsYWJlbD1cIlNoYXJlXCJcbiAgICAgICAgICBvbkNsaWNrPXtmb2N1c0dpc3R9XG4gICAgICAgICAgdGFiUHJvcHM9e2dpc3R9IC8+XG4gICAgICAgIHtjbG9zZX1cbiAgICAgIDwvZGl2PlxuICAgICAgeyBib2R5fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3V0cHV0O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4uL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uL3JlZHVjZXJzJztcblxuaW1wb3J0IFNlY3Rpb24gZnJvbSAnLi9TZWN0aW9uJztcbmltcG9ydCBTaW1wbGVQYW5lIGZyb20gJy4vU2ltcGxlUGFuZSc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGVjdXRlLm1vZHVsZS5jc3MnO1xuXG5jb25zdCBFeGVjdXRlOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgZGV0YWlscyA9IHVzZVNlbGVjdG9yKChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLm91dHB1dC5leGVjdXRlKTtcbiAgY29uc3QgaXNBdXRvQnVpbGQgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuaXNBdXRvQnVpbGRTZWxlY3Rvcik7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBhZGRNYWluRnVuY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaChhY3Rpb25zLmFkZE1haW5GdW5jdGlvbigpKSwgW2Rpc3BhdGNoXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2ltcGxlUGFuZSB7Li4uZGV0YWlsc30ga2luZD1cImV4ZWN1dGVcIj5cbiAgICAgIHtpc0F1dG9CdWlsZCAmJiA8V2FybmluZyBhZGRNYWluRnVuY3Rpb249e2FkZE1haW5GdW5jdGlvbn0gLz59XG4gICAgPC9TaW1wbGVQYW5lPlxuXG4gICk7XG59O1xuXG5pbnRlcmZhY2UgV2FybmluZ1Byb3BzIHtcbiAgYWRkTWFpbkZ1bmN0aW9uOiAoKSA9PiBhbnk7XG59XG5cbmNvbnN0IFdhcm5pbmc6IFJlYWN0LkZDPFdhcm5pbmdQcm9wcz4gPSBwcm9wcyA9PiAoXG4gIDxTZWN0aW9uIGtpbmQ9XCJ3YXJuaW5nXCIgbGFiZWw9XCJXYXJuaW5nc1wiPlxuICAgIE5vIG1haW4gZnVuY3Rpb24gd2FzIGRldGVjdGVkLCBzbyB5b3VyIGNvZGUgd2FzIGNvbXBpbGVkXG4gICAgeydcXG4nfVxuICAgIGJ1dCBub3QgcnVuLiBJZiB5b3XigJlkIGxpa2UgdG8gZXhlY3V0ZSB5b3VyIGNvZGUsIHBsZWFzZVxuICAgIHsnXFxuJ31cbiAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmFkZE1haW59IG9uQ2xpY2s9e3Byb3BzLmFkZE1haW5GdW5jdGlvbn0+XG4gICAgICBhZGQgYSBtYWluIGZ1bmN0aW9uXG4gICAgPC9idXR0b24+XG4gICAgLlxuICA8L1NlY3Rpb24+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBFeGVjdXRlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ29weVRvQ2xpcGJvYXJkIH0gZnJvbSAncmVhY3QtY29weS10by1jbGlwYm9hcmQnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IENsaXBib2FyZEljb24gfSBmcm9tICcuLi9JY29uJztcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi4vcmVkdWNlcnMnO1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4uL3NlbGVjdG9ycyc7XG5cbmltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSAnLi9TZWN0aW9uJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0dpc3QubW9kdWxlLmNzcyc7XG5cbmNvbnN0IEdpc3Q6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBzaG93TG9hZGVyID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLnNob3dHaXN0TG9hZGVyU2VsZWN0b3IpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIHsgc2hvd0xvYWRlciA/IDxMb2FkZXIgLz4gOiA8TGlua3MgLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5pbnRlcmZhY2UgQ29waWVkUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBocmVmOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBDb3BpZWRTdGF0ZSB7XG4gIGNvcGllZDogYm9vbGVhbjtcbn1cblxuY2xhc3MgQ29waWVkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxDb3BpZWRQcm9wcywgQ29waWVkU3RhdGU+IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByb3BzOiBDb3BpZWRQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBjb3BpZWQ6IGZhbHNlIH07XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9e3RoaXMuc3RhdGUuY29waWVkID8gc3R5bGVzLmFjdGl2ZSA6IHN0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICA8YSBocmVmPXt0aGlzLnByb3BzLmhyZWZ9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvYT5cbiAgICAgICAgPENvcHlUb0NsaXBib2FyZCB0ZXh0PXt0aGlzLnByb3BzLmhyZWZ9IG9uQ29weT17dGhpcy5jb3BpZWR9PlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9ufT48Q2xpcGJvYXJkSWNvbiAvPjwvYnV0dG9uPlxuICAgICAgICA8L0NvcHlUb0NsaXBib2FyZD5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMudGV4dH0+Q29waWVkITwvc3Bhbj5cbiAgICAgIDwvcD5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjb3BpZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvcGllZDogdHJ1ZSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zZXRTdGF0ZSh7IGNvcGllZDogZmFsc2UgfSk7IH0sIDEwMDApO1xuICB9XG59XG5cbmNvbnN0IExpbmtzOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgY29kZVVybCA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5jb2RlVXJsU2VsZWN0b3IpO1xuICBjb25zdCBnaXN0VXJsID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUub3V0cHV0Lmdpc3QudXJsKTtcbiAgY29uc3QgcGVybWFsaW5rID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLnBlcm1hbGlua1NlbGVjdG9yKTtcbiAgY29uc3QgdXJsb1VybCA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy51cmxvVXJsU2VsZWN0b3IpO1xuICBjb25zdCB0ZXh0Q2hhbmdlZCA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy50ZXh0Q2hhbmdlZFNpbmNlU2hhcmVTZWxlY3Rvcik7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8Q29waWVkIGhyZWY9e3Blcm1hbGlua30+UGVybWFsaW5rIHRvIHRoZSBwbGF5Z3JvdW5kPC9Db3BpZWQ+XG4gICAgICB7IGdpc3RVcmwgPyA8Q29waWVkIGhyZWY9e2dpc3RVcmx9PkRpcmVjdCBsaW5rIHRvIHRoZSBnaXN0PC9Db3BpZWQ+IDogbnVsbCB9XG4gICAgICA8Q29waWVkIGhyZWY9e2NvZGVVcmx9PkVtYmVkZGVkIGNvZGUgaW4gbGluazwvQ29waWVkPlxuICAgICAgPE5ld1dpbmRvdyBocmVmPXt1cmxvVXJsfT5PcGVuIGEgbmV3IHRocmVhZCBpbiB0aGUgUnVzdCB1c2VyIGZvcnVtPC9OZXdXaW5kb3c+XG4gICAgICB7dGV4dENoYW5nZWQgPyA8U2VjdGlvbiBraW5kPVwid2FybmluZ1wiIGxhYmVsPVwiQ29kZSBjaGFuZ2VkXCI+XG4gICAgICAgIFNvdXJjZSBjb2RlIGhhcyBiZWVuIGNoYW5nZWQgc2luY2UgZ2lzdCB3YXMgc2F2ZWRcbiAgICAgIDwvU2VjdGlvbj46IG51bGwgfVxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5pbnRlcmZhY2UgTmV3V2luZG93UHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBocmVmOiBzdHJpbmc7XG59XG5cbmNvbnN0IE5ld1dpbmRvdzogUmVhY3QuRkM8TmV3V2luZG93UHJvcHM+ID0gcHJvcHMgPT4gKFxuICA8cD5cbiAgICA8YSBocmVmPXtwcm9wcy5ocmVmfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+e3Byb3BzLmNoaWxkcmVufTwvYT5cbiAgPC9wPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgR2lzdDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9IZWFkZXIubW9kdWxlLmNzcyc7XG5cbmludGVyZmFjZSBIZWFkZXJQcm9wcyB7XG4gIGxhYmVsOiBzdHJpbmc7XG59XG5cbmNvbnN0IEhlYWRlcjogUmVhY3QuRkM8SGVhZGVyUHJvcHM+ID0gKHsgbGFiZWwgfSkgPT4gKFxuICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PntsYWJlbH08L3NwYW4+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgR2VuZXJpY0xvYWRlciBmcm9tICcuLi9Mb2FkZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5cbmNvbnN0IExvYWRlcjogUmVhY3QuRkMgPSAoKSA9PiAoXG4gIDxkaXY+XG4gICAgPEhlYWRlciBsYWJlbD1cIlByb2dyZXNzXCIgLz5cbiAgICA8R2VuZXJpY0xvYWRlciAvPlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQcmlzbUNvZGUgfSBmcm9tICdyZWFjdC1wcmlzbSc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9PdXRwdXRQcmlzbS5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIE91dHB1dFByaXNtUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBsYW5ndWFnZUNvZGU6ICdsYW5ndWFnZS1ydXN0X21pcicgfCAnbGFuZ3VhZ2UtcnVzdF9lcnJvcnMnO1xufVxuXG5jb25zdCBPdXRwdXRQcmlzbTogUmVhY3QuRkM8T3V0cHV0UHJpc21Qcm9wcz4gPSAoeyBsYW5ndWFnZUNvZGUsIGNoaWxkcmVuIH0pID0+IChcbiAgPHByZT5cbiAgICA8UHJpc21Db2RlIGNsYXNzTmFtZT17YCR7c3R5bGVzLmNvbnRhaW5lcn0gJHtsYW5ndWFnZUNvZGV9YH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9QcmlzbUNvZGU+XG4gIDwvcHJlPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgT3V0cHV0UHJpc207XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcbmltcG9ydCBTaW1wbGVQYW5lLCB7IFNpbXBsZVBhbmVQcm9wcyB9IGZyb20gJy4vU2ltcGxlUGFuZSc7XG5pbXBvcnQgT3V0cHV0UHJpc20gZnJvbSAnLi9PdXRwdXRQcmlzbSc7XG5cbmludGVyZmFjZSBQYW5lV2l0aE1pclByb3BzIGV4dGVuZHMgU2ltcGxlUGFuZVByb3BzIHtcbiAgY29kZT86IHN0cmluZztcbn1cblxuY29uc3QgUGFuZVdpdGhNaXI6IFJlYWN0LkZDPFBhbmVXaXRoTWlyUHJvcHM+ID0gKHsgY29kZSwgLi4ucmVzdCB9KSA9PiAoXG4gIDxTaW1wbGVQYW5lIHsuLi5yZXN0fT5cbiAgICA8ZGl2IGRhdGEtdGVzdC1pZD1cIm91dHB1dC1yZXN1bHRcIj5cbiAgICAgIDxIZWFkZXIgbGFiZWw9XCJSZXN1bHRcIiAvPlxuICAgICAgPE91dHB1dFByaXNtIGxhbmd1YWdlQ29kZT1cImxhbmd1YWdlLXJ1c3RfbWlyXCI+XG4gICAgICAgIHtjb2RlfVxuICAgICAgPC9PdXRwdXRQcmlzbT5cbiAgICA8L2Rpdj5cbiAgPC9TaW1wbGVQYW5lPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgUGFuZVdpdGhNaXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1NlY3Rpb24ubW9kdWxlLmNzcyc7XG5cbmludGVyZmFjZSBTZWN0aW9uUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBraW5kOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG59XG5cbmNvbnN0IFNlY3Rpb246IFJlYWN0LkZDPFNlY3Rpb25Qcm9wcz4gPSAoeyBraW5kLCBsYWJlbCwgY2hpbGRyZW4gfSkgPT4gKFxuICBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPT09IDAgPyBudWxsIDogKFxuICAgIDxkaXYgZGF0YS10ZXN0LWlkPXtgb3V0cHV0LSR7a2luZH1gfT5cbiAgICAgIDxIZWFkZXIgbGFiZWw9e2xhYmVsfSAvPlxuICAgICAgPHByZT48Y29kZSBjbGFzc05hbWU9e3N0eWxlcy5jb2RlfT57Y2hpbGRyZW59PC9jb2RlPjwvcHJlPlxuICAgIDwvZGl2PlxuICApXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5pbXBvcnQgTG9hZGVyIGZyb20gJy4vTG9hZGVyJztcbmltcG9ydCBTZWN0aW9uIGZyb20gJy4vU2VjdGlvbic7XG5pbXBvcnQgT3V0cHV0UHJpc20gZnJvbSAnLi9PdXRwdXRQcmlzbSc7XG5cbmludGVyZmFjZSBIaWdobGlnaHRFcnJvcnNQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGxhYmVsOiBzdHJpbmc7XG59XG5cbmNvbnN0IEhpZ2hsaWdodEVycm9yczogUmVhY3QuRkM8SGlnaGxpZ2h0RXJyb3JzUHJvcHM+ID0gKHsgbGFiZWwsIGNoaWxkcmVuIH0pID0+IChcbiAgPGRpdiBkYXRhLXRlc3QtaWQ9XCJvdXRwdXQtc3RkZXJyXCI+XG4gICAgPEhlYWRlciBsYWJlbD17bGFiZWx9IC8+XG4gICAgPE91dHB1dFByaXNtIGxhbmd1YWdlQ29kZT1cImxhbmd1YWdlLXJ1c3RfZXJyb3JzXCI+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9PdXRwdXRQcmlzbT5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZVBhbmVQcm9wcyBleHRlbmRzIFJlYWxseVNpbXBsZVBhbmVQcm9wcyB7XG4gIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xuICBraW5kOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhbGx5U2ltcGxlUGFuZVByb3BzIHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiBudW1iZXI7XG4gIHN0ZG91dD86IHN0cmluZztcbiAgc3RkZXJyPzogc3RyaW5nO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuY29uc3QgU2ltcGxlUGFuZTogUmVhY3QuRkM8U2ltcGxlUGFuZVByb3BzPiA9IHByb3BzID0+IChcbiAgPGRpdiBkYXRhLXRlc3QtaWQ9e2BvdXRwdXQtJHtwcm9wcy5raW5kfWB9PlxuICAgIHsocHJvcHMucmVxdWVzdHNJblByb2dyZXNzID4gMCkgJiYgPExvYWRlciAvPn1cbiAgICA8U2VjdGlvbiBraW5kPVwiZXJyb3JcIiBsYWJlbD1cIkVycm9yc1wiPntwcm9wcy5lcnJvcn08L1NlY3Rpb24+XG4gICAgPEhpZ2hsaWdodEVycm9ycyBsYWJlbD1cIlN0YW5kYXJkIEVycm9yXCI+e3Byb3BzLnN0ZGVycn08L0hpZ2hsaWdodEVycm9ycz5cbiAgICA8U2VjdGlvbiBraW5kPVwic3Rkb3V0XCIgbGFiZWw9XCJTdGFuZGFyZCBPdXRwdXRcIj57cHJvcHMuc3Rkb3V0fTwvU2VjdGlvbj5cbiAgICB7cHJvcHMuY2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlUGFuZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IEhlbHAgZnJvbSAnLi9IZWxwJztcbmltcG9ydCBQbGF5Z3JvdW5kIGZyb20gJy4vUGxheWdyb3VuZCc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5jb25zdCBQYWdlU3dpdGNoZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBwYWdlID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUucGFnZSk7XG5cbiAgc3dpdGNoIChwYWdlKSB7XG4gICAgY2FzZSAnaW5kZXgnOlxuICAgICAgcmV0dXJuIDxQbGF5Z3JvdW5kIC8+O1xuICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgcmV0dXJuIDxIZWxwIC8+O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VTd2l0Y2hlcjtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgU3BsaXQgZnJvbSAnc3BsaXQtZ3JpZCc7XG5cbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3IvRWRpdG9yJztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9IZWFkZXInO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi9Ob3RpZmljYXRpb25zJztcbmltcG9ydCBPdXRwdXQgZnJvbSAnLi9PdXRwdXQnO1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4vc2VsZWN0b3JzJztcbmltcG9ydCB7IE9yaWVudGF0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9QbGF5Z3JvdW5kLm1vZHVsZS5jc3MnO1xuXG5jb25zdCBUUkFDS19PUFRJT05fTkFNRSA9IHtcbiAgW09yaWVudGF0aW9uLkhvcml6b250YWxdOiAncm93R3V0dGVycycsXG4gIFtPcmllbnRhdGlvbi5WZXJ0aWNhbF06ICdjb2x1bW5HdXR0ZXJzJyxcbn1cblxuY29uc3QgRk9DVVNFRF9HUklEX1NUWUxFID0ge1xuICBbT3JpZW50YXRpb24uSG9yaXpvbnRhbF06IHN0eWxlcy5yZXNpemVhYmxlQXJlYVJvd091dHB1dEZvY3VzZWQsXG4gIFtPcmllbnRhdGlvbi5WZXJ0aWNhbF06IHN0eWxlcy5yZXNpemVhYmxlQXJlYUNvbHVtbk91dHB1dEZvY3VzZWQsXG59XG5cbmNvbnN0IFVORk9DVVNFRF9HUklEX1NUWUxFID0ge1xuICBbT3JpZW50YXRpb24uSG9yaXpvbnRhbF06IHN0eWxlcy5yZXNpemVhYmxlQXJlYVJvd091dHB1dFVuZm9jdXNlZCxcbiAgW09yaWVudGF0aW9uLlZlcnRpY2FsXTogc3R5bGVzLnJlc2l6ZWFibGVBcmVhQ29sdW1uT3V0cHV0VW5mb2N1c2VkLFxufVxuXG5jb25zdCBIQU5ETEVfU1RZTEVTID0ge1xuICBbT3JpZW50YXRpb24uSG9yaXpvbnRhbF06IFtzdHlsZXMuc3BsaXRSb3dzR3V0dGVyLCBzdHlsZXMuc3BsaXRSb3dzR3V0dGVySGFuZGxlXSxcbiAgW09yaWVudGF0aW9uLlZlcnRpY2FsXTogW3N0eWxlcy5zcGxpdENvbHVtbnNHdXR0ZXIsICcnXSxcbn1cblxuLy8gV2UgZHJvcCBkb3duIHRvIGxvd2VyLWxldmVsIHNwbGl0LWdyaWQgY29kZSBhbmQgdXNlIHNvbWUgaG9va3Ncbi8vIGJlY2F1c2Ugd2Ugd2FudCB0byByZWR1Y2UgdGhlIG51bWJlciBvZiB0aW1lcyB0aGF0IHRoZSBFZGl0b3Jcbi8vIGNvbXBvbmVudCBpcyByZW1vdW50ZWQuIEVhY2ggdGltZSBpdCdzIHJlbW91bnRlZCwgd2Ugc2VlIGEgZmxpY2tlciBhbmRcbi8vIGxvc2Ugc3RhdGUgKGxpa2UgdW5kbyBoaXN0b3J5KS5cbmNvbnN0IFJlc2l6YWJsZUFyZWE6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBzb21ldGhpbmdUb1Nob3cgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuZ2V0U29tZXRoaW5nVG9TaG93KTtcbiAgY29uc3QgaXNGb2N1c2VkID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLmlzT3V0cHV0Rm9jdXNlZCk7XG4gIGNvbnN0IG9yaWVudGF0aW9uID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLm9yaWVudGF0aW9uKTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gIGNvbnN0IHJlc2l6ZUNvbXBsZXRlID0gdXNlQ2FsbGJhY2soKCkgPT4gZGlzcGF0Y2goYWN0aW9ucy5zcGxpdFJhdGlvQ2hhbmdlZCgpKSwgW2Rpc3BhdGNoXSk7XG5cbiAgY29uc3QgZ3JpZCA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBkcmFnSGFuZGxlID0gdXNlUmVmKG51bGwpO1xuXG4gIC8vIFJlc2V0IHN0eWxlcyBsZWZ0IG9uIHRoZSBncmlkIGZyb20gc3BsaXQtZ3JpZCB3aGVuIHdlIGNoYW5nZSBvcmllbnRhdGlvbiBvciBmb2N1cy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZ3JpZC5jdXJyZW50KSB7XG4gICAgICBncmlkLmN1cnJlbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycpO1xuICAgICAgZ3JpZC5jdXJyZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdncmlkLXRlbXBsYXRlLXJvd3MnKTtcbiAgICB9XG5cbiAgICByZXNpemVDb21wbGV0ZSgpO1xuICB9LCBbb3JpZW50YXRpb24sIGlzRm9jdXNlZCwgcmVzaXplQ29tcGxldGVdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc3BsaXQgPSBTcGxpdCh7XG4gICAgICBtaW5TaXplOiAxMDAsXG4gICAgICBbVFJBQ0tfT1BUSU9OX05BTUVbb3JpZW50YXRpb25dXTogW3tcbiAgICAgICAgdHJhY2s6IDEsXG4gICAgICAgIGVsZW1lbnQ6IGRyYWdIYW5kbGUuY3VycmVudCxcbiAgICAgIH1dLFxuICAgICAgb25EcmFnRW5kOiByZXNpemVDb21wbGV0ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiBzcGxpdC5kZXN0cm95KCk7XG4gIH0sIFtvcmllbnRhdGlvbiwgaXNGb2N1c2VkLCBzb21ldGhpbmdUb1Nob3csIHJlc2l6ZUNvbXBsZXRlXSlcblxuICBjb25zdCBncmlkU3R5bGVzID0gaXNGb2N1c2VkID8gRk9DVVNFRF9HUklEX1NUWUxFIDogVU5GT0NVU0VEX0dSSURfU1RZTEU7XG4gIGNvbnN0IGdyaWRTdHlsZSA9IGdyaWRTdHlsZXNbb3JpZW50YXRpb25dO1xuICBjb25zdCBbaGFuZGxlT3V0ZXJTdHlsZSwgaGFuZGxlSW5uZXJTdHlsZV0gPSBIQU5ETEVfU1RZTEVTW29yaWVudGF0aW9uXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgcmVmPXtncmlkfSBjbGFzc05hbWU9e2dyaWRTdHlsZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmVkaXRvcn0+PEVkaXRvciAvPjwvZGl2PlxuICAgICAgeyBpc0ZvY3VzZWQgJiZcbiAgICAgICAgPGRpdiByZWY9e2RyYWdIYW5kbGV9IGNsYXNzTmFtZT17aGFuZGxlT3V0ZXJTdHlsZX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtoYW5kbGVJbm5lclN0eWxlfT7io788L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgICAgeyBzb21ldGhpbmdUb1Nob3cgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5vdXRwdXR9PjxPdXRwdXQgLz48L2Rpdj59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5cbmNvbnN0IFdlYlNvY2tldFN0YXR1czogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGVuYWJsZWQgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMud2Vic29ja2V0RmVhdHVyZUZsYWdFbmFibGVkKTtcbiAgY29uc3Qgc3RhdHVzID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLndlYnNvY2tldFN0YXR1c1NlbGVjdG9yKTtcblxuICBpZiAoIWVuYWJsZWQpIHsgcmV0dXJuIG51bGw7IH1cblxuICBjb25zdCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICBsZWZ0OiAnMWVtJyxcbiAgICBib3R0b206ICcxZW0nLFxuICAgIHpJbmRleDogJzEnLFxuICB9O1xuXG4gIHN3aXRjaCAoc3RhdHVzLnN0YXRlKSB7XG4gICAgY2FzZSAnY29ubmVjdGVkJzpcbiAgICAgIHN0eWxlLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZX0+4qykPC9kaXY+O1xuICAgIGNhc2UgJ2Rpc2Nvbm5lY3RlZCc6XG4gICAgICBzdHlsZS5jb2xvciA9ICdncmV5JztcbiAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZX0+4qykPC9kaXY+O1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGV9IHRpdGxlPXtzdGF0dXMuZXJyb3J9PuKspDwvZGl2PjtcbiAgfVxufVxuXG5jb25zdCBQbGF5Z3JvdW5kOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3Qgc2hvd05vdGlmaWNhdGlvbnMgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuYW55Tm90aWZpY2F0aW9uc1RvU2hvd1NlbGVjdG9yKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgIDxXZWJTb2NrZXRTdGF0dXMgLz5cbiAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICA8UmVzaXphYmxlQXJlYSAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7IHNob3dOb3RpZmljYXRpb25zICYmIDxOb3RpZmljYXRpb25zIC8+fVxuICAgIDwvPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5Z3JvdW5kO1xuIiwiaW1wb3J0IHtcbiAgRmxvYXRpbmdBcnJvdyxcbiAgRmxvYXRpbmdGb2N1c01hbmFnZXIsXG4gIGFycm93LFxuICBhdXRvVXBkYXRlLFxuICBmbGlwLFxuICBvZmZzZXQsXG4gIHNoaWZ0LFxuICB1c2VDbGljayxcbiAgdXNlRGlzbWlzcyxcbiAgdXNlRmxvYXRpbmcsXG4gIHVzZUludGVyYWN0aW9ucyxcbiAgdXNlUm9sZSxcbn0gZnJvbSAnQGZsb2F0aW5nLXVpL3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1BvcEJ1dHRvbi5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIE5ld1BvcFByb3BzIHtcbiAgQnV0dG9uOiBSZWFjdC5Db21wb25lbnRUeXBlPFxuICAgIHtcbiAgICAgIHRvZ2dsZTogKCkgPT4gdm9pZDtcbiAgICB9ICYgUmVhY3QuUmVmQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD5cbiAgPjtcbiAgTWVudTogUmVhY3QuQ29tcG9uZW50VHlwZTx7IGNsb3NlOiAoKSA9PiB2b2lkIH0+O1xufVxuXG5jb25zdCBQb3BCdXR0b246IFJlYWN0LkZDPE5ld1BvcFByb3BzPiA9ICh7IEJ1dHRvbiwgTWVudSB9KSA9PiB7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHRvZ2dsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHNldElzT3BlbigodikgPT4gIXYpLCBbXSk7XG4gIGNvbnN0IGNsb3NlID0gdXNlQ2FsbGJhY2soKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSwgW10pO1xuXG4gIGNvbnN0IGFycm93UmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IHsgeCwgeSwgcmVmcywgc3RyYXRlZ3ksIGNvbnRleHQgfSA9IHVzZUZsb2F0aW5nKHtcbiAgICBvcGVuOiBpc09wZW4sXG4gICAgb25PcGVuQ2hhbmdlOiBzZXRJc09wZW4sXG4gICAgbWlkZGxld2FyZTogW29mZnNldCgxMCksIGZsaXAoKSwgc2hpZnQoKSwgYXJyb3coeyBlbGVtZW50OiBhcnJvd1JlZiB9KV0sXG4gICAgd2hpbGVFbGVtZW50c01vdW50ZWQ6IGF1dG9VcGRhdGUsXG4gIH0pO1xuXG4gIGNvbnN0IGNsaWNrID0gdXNlQ2xpY2soY29udGV4dCk7XG4gIGNvbnN0IGRpc21pc3MgPSB1c2VEaXNtaXNzKGNvbnRleHQpO1xuICBjb25zdCByb2xlID0gdXNlUm9sZShjb250ZXh0KTtcblxuICBjb25zdCB7IGdldFJlZmVyZW5jZVByb3BzLCBnZXRGbG9hdGluZ1Byb3BzIH0gPSB1c2VJbnRlcmFjdGlvbnMoW2NsaWNrLCBkaXNtaXNzLCByb2xlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEJ1dHRvbiB0b2dnbGU9e3RvZ2dsZX0gcmVmPXtyZWZzLnNldFJlZmVyZW5jZX0gey4uLmdldFJlZmVyZW5jZVByb3BzKCl9IC8+XG5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8RmxvYXRpbmdGb2N1c01hbmFnZXIgY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXtyZWZzLnNldEZsb2F0aW5nfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246IHN0cmF0ZWd5LFxuICAgICAgICAgICAgICB0b3A6IHkgPz8gMCxcbiAgICAgICAgICAgICAgbGVmdDogeCA/PyAwLFxuICAgICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB7Li4uZ2V0RmxvYXRpbmdQcm9wcygpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGbG9hdGluZ0Fycm93IHJlZj17YXJyb3dSZWZ9IGNvbnRleHQ9e2NvbnRleHR9IGhlaWdodD17MTB9IHdpZHRoPXsyMH0gZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGVudH0+XG4gICAgICAgICAgICAgIDxNZW51IGNsb3NlPXtjbG9zZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zsb2F0aW5nRm9jdXNNYW5hZ2VyPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBvcEJ1dHRvbjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5IGFzIGNyZWF0ZUhpc3RvcnksIFBhdGgsIExvY2F0aW9uIH0gZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgeyBjcmVhdGVSb3V0ZXIsIFBsYWluT3JUaHVuayB9IGZyb20gJy4vdXNzLXJvdXRlcic7XG5pbXBvcnQgVXNzUm91dGVyIGZyb20gJy4vdXNzLXJvdXRlci9Sb3V0ZXInO1xuXG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuaW1wb3J0IFJvdXRlIGZyb20gJ3JvdXRlLXBhcnNlcic7XG5cbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IENoYW5uZWwsIEVkaXRpb24sIE1vZGUsIFBhZ2UgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgaG9tZVJvdXRlID0gbmV3IFJvdXRlKCcvJyk7XG5jb25zdCBoZWxwUm91dGUgPSBuZXcgUm91dGUoJy9oZWxwJyk7XG5cbmludGVyZmFjZSBTdWJzdGF0ZSB7XG4gIHBhZ2U6IFBhZ2U7XG4gIGNvbmZpZ3VyYXRpb246IHtcbiAgICBjaGFubmVsOiBDaGFubmVsO1xuICAgIG1vZGU6IE1vZGU7XG4gICAgZWRpdGlvbjogRWRpdGlvbjtcbiAgfTtcbiAgb3V0cHV0OiB7XG4gICAgZ2lzdDoge1xuICAgICAgaWQ/OiBzdHJpbmc7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHN0YXRlU2VsZWN0b3IgPSAoeyBwYWdlLCBjb25maWd1cmF0aW9uOiB7IGNoYW5uZWwsIG1vZGUsIGVkaXRpb259LCBvdXRwdXQgfTogU3RhdGUpOiBTdWJzdGF0ZSA9PiAoe1xuICBwYWdlLFxuICBjb25maWd1cmF0aW9uOiB7XG4gICAgY2hhbm5lbCxcbiAgICBtb2RlLFxuICAgIGVkaXRpb24sXG4gIH0sXG4gIG91dHB1dDoge1xuICAgIGdpc3Q6IHtcbiAgICAgIGlkOiBvdXRwdXQuZ2lzdC5pZCxcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IHN0YXRlVG9Mb2NhdGlvbiA9ICh7IHBhZ2UsIGNvbmZpZ3VyYXRpb24sIG91dHB1dCB9OiBTdWJzdGF0ZSk6IFBhcnRpYWw8UGF0aD4gPT4ge1xuICBzd2l0Y2ggKHBhZ2UpIHtcbiAgICBjYXNlICdoZWxwJzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aG5hbWU6ICcvaGVscCcsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICB2ZXJzaW9uOiBjb25maWd1cmF0aW9uLmNoYW5uZWwsXG4gICAgICAgIG1vZGU6IGNvbmZpZ3VyYXRpb24ubW9kZSxcbiAgICAgICAgZWRpdGlvbjogY29uZmlndXJhdGlvbi5lZGl0aW9uLFxuICAgICAgICBnaXN0OiBvdXRwdXQuZ2lzdC5pZCxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogYC8/JHtxcy5zdHJpbmdpZnkocXVlcnkpfWAsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgbG9jYXRpb25Ub0FjdGlvbiA9IChsb2NhdGlvbjogTG9jYXRpb24pOiBQbGFpbk9yVGh1bms8U3RhdGUsIGFjdGlvbnMuQWN0aW9uPiB8IG51bGwgPT4ge1xuICBjb25zdCBtYXRjaGVkSGVscCA9IGhlbHBSb3V0ZS5tYXRjaChsb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgaWYgKG1hdGNoZWRIZWxwKSB7XG4gICAgcmV0dXJuIGFjdGlvbnMuaGVscFBhZ2VMb2FkKCk7XG4gIH1cblxuICBjb25zdCBtYXRjaGVkID0gaG9tZVJvdXRlLm1hdGNoKGxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICBpZiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBhY3Rpb25zLmluZGV4UGFnZUxvYWQocXMucGFyc2UobG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpKSk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSb3V0ZXJQcm9wcz4ge1xuICBwcml2YXRlIHJvdXRlcjogYW55O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm9wczogUm91dGVyUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICBjb25zdCBoaXN0b3J5ID0gY3JlYXRlSGlzdG9yeSgpO1xuXG4gICAgY29uc3QgeyBzdG9yZSwgcmVkdWNlciB9ID0gcHJvcHM7XG5cbiAgICB0aGlzLnJvdXRlciA9IGNyZWF0ZVJvdXRlcih7XG4gICAgICBzdG9yZSwgcmVkdWNlcixcbiAgICAgIGhpc3RvcnksIHN0YXRlU2VsZWN0b3IsIGxvY2F0aW9uVG9BY3Rpb24sIHN0YXRlVG9Mb2NhdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxVc3NSb3V0ZXIgcm91dGVyPXt0aGlzLnJvdXRlcn0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9Vc3NSb3V0ZXI+O1xuICB9XG59XG5cbmludGVyZmFjZSBSb3V0ZXJQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIHN0b3JlOiBhbnk7XG4gIHJlZHVjZXI6IGFueTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMaW5rLCB7IExpbmtQcm9wcyB9IGZyb20gJy4vdXNzLXJvdXRlci9MaW5rJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1NlZ21lbnRlZEJ1dHRvbi5tb2R1bGUuY3NzJztcblxuZXhwb3J0IGNvbnN0IFNlZ21lbnRlZEJ1dHRvblNldDogUmVhY3QuRkM8UmVhY3QuUHJvcHNXaXRoQ2hpbGRyZW48dW5rbm93bj4+ID0gKHsgY2hpbGRyZW4gfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+e2NoaWxkcmVufTwvZGl2PlxuKTtcblxudHlwZSBCdXR0b24gPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ2J1dHRvbiddO1xuXG5pbnRlcmZhY2UgU2VnbWVudGVkQnV0dG9uUHJvcHMgZXh0ZW5kcyBCdXR0b24ge1xuICBpc0J1aWxkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IFNlZ21lbnRlZEJ1dHRvbiA9IFJlYWN0LmZvcndhcmRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQsIFNlZ21lbnRlZEJ1dHRvblByb3BzPihcbiAgKHsgaXNCdWlsZCwgY2hpbGRyZW4sIC4uLnByb3BzIH0sIHJlZikgPT4gKFxuICAgIDxidXR0b25cbiAgICAgIHJlZj17cmVmfVxuICAgICAgey4uLnByb3BzfVxuICAgICAgY2xhc3NOYW1lPXtpc0J1aWxkID8gc3R5bGVzLmJ1dHRvbkJ1aWxkIDogc3R5bGVzLmJ1dHRvbn1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9idXR0b24+XG4gIClcbik7XG5TZWdtZW50ZWRCdXR0b24uZGlzcGxheU5hbWUgPSAnU2VnbWVudGVkQnV0dG9uJztcblxuZXhwb3J0IGNvbnN0IFNlZ21lbnRlZExpbmsgPSBSZWFjdC5mb3J3YXJkUmVmPEhUTUxBbmNob3JFbGVtZW50LCBMaW5rUHJvcHM+KFxuICAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoXG4gICAgPExpbmtcbiAgICAgIHJlZj17cmVmfVxuICAgICAgey4uLnByb3BzfVxuICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYnV0dG9ufVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0xpbms+XG4gIClcbik7XG5TZWdtZW50ZWRMaW5rLmRpc3BsYXlOYW1lID0gJ1NlZ21lbnRlZExpbmsnO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFNlbGVjdGFibGVNZW51SXRlbSBmcm9tICcuL1NlbGVjdGFibGVNZW51SXRlbSc7XG5cbmludGVyZmFjZSBTZWxlY3RPbmVQcm9wczxUPiB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIG5hbWU6IHN0cmluZztcbiAgY3VycmVudFZhbHVlOiBUO1xuICB0aGlzVmFsdWU6IFQ7XG4gIGNoYW5nZVZhbHVlOiAoXzogVCkgPT4gYW55O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RPbmU8VD4gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFNlbGVjdE9uZVByb3BzPFQ+PiB7XG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBuYW1lLCBjdXJyZW50VmFsdWUsIHRoaXNWYWx1ZSwgY2hpbGRyZW4sIGNoYW5nZVZhbHVlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTZWxlY3RhYmxlTWVudUl0ZW1cbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgc2VsZWN0ZWQ9e2N1cnJlbnRWYWx1ZSA9PT0gdGhpc1ZhbHVlfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBjaGFuZ2VWYWx1ZSh0aGlzVmFsdWUpfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9TZWxlY3RhYmxlTWVudUl0ZW0+XG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ2hlY2ttYXJrSWNvbiB9IGZyb20gJy4vSWNvbic7XG5pbXBvcnQgTWVudUl0ZW0gZnJvbSAnLi9NZW51SXRlbSc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9TZWxlY3RhYmxlTWVudUl0ZW0ubW9kdWxlLmNzcyc7XG5cbnR5cGUgQnV0dG9uID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydidXR0b24nXTtcblxuaW50ZXJmYWNlIFNlbGVjdGFibGVNZW51SXRlbVByb3BzIGV4dGVuZHMgQnV0dG9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgU2VsZWN0YWJsZU1lbnVJdGVtOiBSZWFjdC5GQzxTZWxlY3RhYmxlTWVudUl0ZW1Qcm9wcz4gPSAoeyBuYW1lLCBzZWxlY3RlZCwgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IChcbiAgPE1lbnVJdGVtPlxuICAgIDxidXR0b24gY2xhc3NOYW1lPXtzZWxlY3RlZCA/IHN0eWxlcy5zZWxlY3RlZCA6IHN0eWxlcy5jb250YWluZXJ9IHsuLi5wcm9wc30+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlcn0+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmNoZWNrbWFya30+XG4gICAgICAgICAgPENoZWNrbWFya0ljb24gLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5uYW1lfT57bmFtZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGVzY3JpcHRpb259PntjaGlsZHJlbn08L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgPC9NZW51SXRlbT5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGFibGVNZW51SXRlbTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQnV0dG9uTWVudUl0ZW0gZnJvbSAnLi9CdXR0b25NZW51SXRlbSc7XG5pbXBvcnQgTWVudUdyb3VwIGZyb20gJy4vTWVudUdyb3VwJztcbmltcG9ydCBNZW51QXNpZGUgZnJvbSAnLi9NZW51QXNpZGUnO1xuXG5pbXBvcnQgKiBhcyBzZWxlY3RvcnMgZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgdXNlQXBwRGlzcGF0Y2ggfSBmcm9tICcuL2NvbmZpZ3VyZVN0b3JlJztcbmltcG9ydCB7IHBlcmZvcm1Gb3JtYXQgfSBmcm9tICcuL3JlZHVjZXJzL291dHB1dC9mb3JtYXQnO1xuXG5pbnRlcmZhY2UgVG9vbHNNZW51UHJvcHMge1xuICBjbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgVG9vbHNNZW51OiBSZWFjdC5GQzxUb29sc01lbnVQcm9wcz4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHJ1c3RmbXRWZXJzaW9uID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLnJ1c3RmbXRWZXJzaW9uVGV4dCk7XG4gIGNvbnN0IHJ1c3RmbXRWZXJzaW9uRGV0YWlscyA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5ydXN0Zm10VmVyc2lvbkRldGFpbHNUZXh0KTtcbiAgY29uc3QgY2xpcHB5VmVyc2lvbkRldGFpbHMgPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMuY2xpcHB5VmVyc2lvbkRldGFpbHNUZXh0KTtcbiAgY29uc3QgY2xpcHB5VmVyc2lvbiA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5jbGlwcHlWZXJzaW9uVGV4dCk7XG4gIGNvbnN0IG1pcmlWZXJzaW9uRGV0YWlscyA9IHVzZVNlbGVjdG9yKHNlbGVjdG9ycy5taXJpVmVyc2lvbkRldGFpbHNUZXh0KTtcbiAgY29uc3QgbWlyaVZlcnNpb24gPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMubWlyaVZlcnNpb25UZXh0KTtcbiAgY29uc3QgbmlnaHRseVZlcnNpb24gPSB1c2VTZWxlY3RvcihzZWxlY3RvcnMubmlnaHRseVZlcnNpb25UZXh0KTtcbiAgY29uc3QgbmlnaHRseVZlcnNpb25EZXRhaWxzID0gdXNlU2VsZWN0b3Ioc2VsZWN0b3JzLm5pZ2h0bHlWZXJzaW9uRGV0YWlsc1RleHQpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlQXBwRGlzcGF0Y2goKTtcbiAgY29uc3QgY2xpcHB5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGRpc3BhdGNoKGFjdGlvbnMucGVyZm9ybUNsaXBweSgpKTtcbiAgICBwcm9wcy5jbG9zZSgpO1xuICB9LCBbZGlzcGF0Y2gsIHByb3BzXSk7XG4gIGNvbnN0IG1pcmkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgZGlzcGF0Y2goYWN0aW9ucy5wZXJmb3JtTWlyaSgpKTtcbiAgICBwcm9wcy5jbG9zZSgpO1xuICB9LCBbZGlzcGF0Y2gsIHByb3BzXSk7XG4gIGNvbnN0IGZvcm1hdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBkaXNwYXRjaChwZXJmb3JtRm9ybWF0KCkpO1xuICAgIHByb3BzLmNsb3NlKCk7XG4gIH0sIFtkaXNwYXRjaCwgcHJvcHNdKTtcbiAgY29uc3QgZXhwYW5kTWFjcm9zID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGRpc3BhdGNoKGFjdGlvbnMucGVyZm9ybU1hY3JvRXhwYW5zaW9uKCkpO1xuICAgIHByb3BzLmNsb3NlKCk7XG4gIH0sIFtkaXNwYXRjaCwgcHJvcHNdKTtcblxuICByZXR1cm4gKFxuICAgIDxNZW51R3JvdXAgdGl0bGU9XCJUb29sc1wiPlxuICAgICAgPEJ1dHRvbk1lbnVJdGVtXG4gICAgICAgIG5hbWU9XCJSdXN0Zm10XCJcbiAgICAgICAgb25DbGljaz17Zm9ybWF0fT5cbiAgICAgICAgPGRpdj5Gb3JtYXQgdGhpcyBjb2RlIHdpdGggUnVzdGZtdC48L2Rpdj5cbiAgICAgICAgPE1lbnVBc2lkZT57cnVzdGZtdFZlcnNpb259ICh7cnVzdGZtdFZlcnNpb25EZXRhaWxzfSk8L01lbnVBc2lkZT5cbiAgICAgIDwvQnV0dG9uTWVudUl0ZW0+XG4gICAgICA8QnV0dG9uTWVudUl0ZW1cbiAgICAgICAgbmFtZT1cIkNsaXBweVwiXG4gICAgICAgIG9uQ2xpY2s9e2NsaXBweX0+XG4gICAgICAgIDxkaXY+Q2F0Y2ggY29tbW9uIG1pc3Rha2VzIGFuZCBpbXByb3ZlIHRoZSBjb2RlIHVzaW5nIHRoZSBDbGlwcHkgbGludGVyLjwvZGl2PlxuICAgICAgICA8TWVudUFzaWRlPntjbGlwcHlWZXJzaW9ufSAoe2NsaXBweVZlcnNpb25EZXRhaWxzfSk8L01lbnVBc2lkZT5cbiAgICAgIDwvQnV0dG9uTWVudUl0ZW0+XG4gICAgICA8QnV0dG9uTWVudUl0ZW1cbiAgICAgICAgbmFtZT1cIk1pcmlcIlxuICAgICAgICBvbkNsaWNrPXttaXJpfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBFeGVjdXRlIHRoaXMgcHJvZ3JhbSBpbiB0aGUgTWlyaSBpbnRlcnByZXRlciB0byBkZXRlY3QgY2VydGFpblxuICAgICAgICAgIGNhc2VzIG9mIHVuZGVmaW5lZCBiZWhhdmlvciAobGlrZSBvdXQtb2YtYm91bmRzIG1lbW9yeSBhY2Nlc3MpLlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPE1lbnVBc2lkZT57bWlyaVZlcnNpb259ICh7bWlyaVZlcnNpb25EZXRhaWxzfSk8L01lbnVBc2lkZT5cbiAgICAgIDwvQnV0dG9uTWVudUl0ZW0+XG4gICAgICA8QnV0dG9uTWVudUl0ZW1cbiAgICAgICAgbmFtZT1cIkV4cGFuZCBtYWNyb3NcIlxuICAgICAgICBvbkNsaWNrPXtleHBhbmRNYWNyb3N9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIEV4cGFuZCBtYWNyb3MgaW4gY29kZSB1c2luZyB0aGUgbmlnaHRseSBjb21waWxlci5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxNZW51QXNpZGU+e25pZ2h0bHlWZXJzaW9ufSAoe25pZ2h0bHlWZXJzaW9uRGV0YWlsc30pPC9NZW51QXNpZGU+XG4gICAgICA8L0J1dHRvbk1lbnVJdGVtPlxuICAgIDwvTWVudUdyb3VwPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbHNNZW51O1xuIiwiaW1wb3J0IGZldGNoIGZyb20gJ2lzb21vcnBoaWMtZmV0Y2gnO1xuaW1wb3J0IHsgVGh1bmtBY3Rpb24gYXMgUmVkdXhUaHVua0FjdGlvbiwgQW55QWN0aW9uIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmltcG9ydCB7XG4gIGNvZGVTZWxlY3RvcixcbiAgY2xpcHB5UmVxdWVzdFNlbGVjdG9yLFxuICBnZXRDcmF0ZVR5cGUsXG4gIHJ1bkFzVGVzdCxcbn0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtcbiAgQXNzZW1ibHlGbGF2b3IsXG4gIEJhY2t0cmFjZSxcbiAgQ2hhbm5lbCxcbiAgRGVtYW5nbGVBc3NlbWJseSxcbiAgRWRpdGlvbixcbiAgRWRpdG9yLFxuICBGb2N1cyxcbiAgTW9kZSxcbiAgTm90aWZpY2F0aW9uLFxuICBPcmllbnRhdGlvbixcbiAgUGFnZSxcbiAgUGFpckNoYXJhY3RlcnMsXG4gIFByaW1hcnlBY3Rpb24sXG4gIFByaW1hcnlBY3Rpb25BdXRvLFxuICBQcmltYXJ5QWN0aW9uQ29yZSxcbiAgUHJvY2Vzc0Fzc2VtYmx5LFxuICBQb3NpdGlvbixcbiAgbWFrZVBvc2l0aW9uLFxuICBWZXJzaW9uLFxuICBDcmF0ZSxcbn0gZnJvbSAnLi90eXBlcyc7XG5cbmltcG9ydCB7IEV4ZWN1dGVSZXF1ZXN0Qm9keSwgcGVyZm9ybUNvbW1vbkV4ZWN1dGUsIHdzRXhlY3V0ZVJlcXVlc3QgfSBmcm9tICcuL3JlZHVjZXJzL291dHB1dC9leGVjdXRlJztcbmltcG9ydCB7IHBlcmZvcm1HaXN0TG9hZCB9IGZyb20gJy4vcmVkdWNlcnMvb3V0cHV0L2dpc3QnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0ge1xuICBjb21waWxlOiAnL2NvbXBpbGUnLFxuICBleGVjdXRlOiAnL2V4ZWN1dGUnLFxuICBmb3JtYXQ6ICcvZm9ybWF0JyxcbiAgY2xpcHB5OiAnL2NsaXBweScsXG4gIG1pcmk6ICcvbWlyaScsXG4gIG1hY3JvRXhwYW5zaW9uOiAnL21hY3JvLWV4cGFuc2lvbicsXG4gIG1ldGE6IHtcbiAgICBjcmF0ZXM6ICcvbWV0YS9jcmF0ZXMnLFxuICAgIHZlcnNpb246IHtcbiAgICAgIHN0YWJsZTogJy9tZXRhL3ZlcnNpb24vc3RhYmxlJyxcbiAgICAgIGJldGE6ICcvbWV0YS92ZXJzaW9uL2JldGEnLFxuICAgICAgbmlnaHRseTogJy9tZXRhL3ZlcnNpb24vbmlnaHRseScsXG4gICAgICBydXN0Zm10OiAnL21ldGEvdmVyc2lvbi9ydXN0Zm10JyxcbiAgICAgIGNsaXBweTogJy9tZXRhL3ZlcnNpb24vY2xpcHB5JyxcbiAgICAgIG1pcmk6ICcvbWV0YS92ZXJzaW9uL21pcmknLFxuICAgICAgamF2YTE5OiAnL21ldGEvdmVyc2lvbi9qYXZhMTlfJyxcbiAgICB9LFxuICAgIGdpc3RTYXZlOiAnL21ldGEvZ2lzdCcsXG4gICAgZ2lzdExvYWQ6ICcvbWV0YS9naXN0L2lkJyxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFRodW5rQWN0aW9uPFQgPSB2b2lkPiA9IFJlZHV4VGh1bmtBY3Rpb248VCwgU3RhdGUsIHt9LCBBY3Rpb24+O1xuZXhwb3J0IHR5cGUgU2ltcGxlVGh1bmtBY3Rpb248VCA9IHZvaWQ+ID0gUmVkdXhUaHVua0FjdGlvbjxULCBTdGF0ZSwge30sIEFueUFjdGlvbj47XG5cbmNvbnN0IGNyZWF0ZUFjdGlvbiA9IDxUIGV4dGVuZHMgc3RyaW5nLCBQIGV4dGVuZHMge30+KHR5cGU6IFQsIHByb3BzPzogUCkgPT4gKFxuICBPYmplY3QuYXNzaWduKHsgdHlwZSB9LCBwcm9wcylcbik7XG5cbmV4cG9ydCBlbnVtIEFjdGlvblR5cGUge1xuICBJbml0aWFsaXplQXBwbGljYXRpb24gPSAnSU5JVElBTElaRV9BUFBMSUNBVElPTicsXG4gIERpc2FibGVTeW5jQ2hhbmdlc1RvU3RvcmFnZSA9ICdESVNBQkxFX1NZTkNfQ0hBTkdFU19UT19TVE9SQUdFJyxcbiAgU2V0UGFnZSA9ICdTRVRfUEFHRScsXG4gIENoYW5nZUVkaXRvciA9ICdDSEFOR0VfRURJVE9SJyxcbiAgQ2hhbmdlS2V5YmluZGluZyA9ICdDSEFOR0VfS0VZQklORElORycsXG4gIENoYW5nZUFjZVRoZW1lID0gJ0NIQU5HRV9BQ0VfVEhFTUUnLFxuICBDaGFuZ2VNb25hY29UaGVtZSA9ICdDSEFOR0VfTU9OQUNPX1RIRU1FJyxcbiAgQ2hhbmdlUGFpckNoYXJhY3RlcnMgPSAnQ0hBTkdFX1BBSVJfQ0hBUkFDVEVSUycsXG4gIENoYW5nZU9yaWVudGF0aW9uID0gJ0NIQU5HRV9PUklFTlRBVElPTicsXG4gIENoYW5nZUFzc2VtYmx5Rmxhdm9yID0gJ0NIQU5HRV9BU1NFTUJMWV9GTEFWT1InLFxuICBDaGFuZ2VQcmltYXJ5QWN0aW9uID0gJ0NIQU5HRV9QUklNQVJZX0FDVElPTicsXG4gIENoYW5nZUNoYW5uZWwgPSAnQ0hBTkdFX0NIQU5ORUwnLFxuICBDaGFuZ2VEZW1hbmdsZUFzc2VtYmx5ID0gJ0NIQU5HRV9ERU1BTkdMRV9BU1NFTUJMWScsXG4gIENoYW5nZVByb2Nlc3NBc3NlbWJseSA9ICdDSEFOR0VfUFJPQ0VTU19BU1NFTUJMWScsXG4gIENoYW5nZU1vZGUgPSAnQ0hBTkdFX01PREUnLFxuICBDaGFuZ2VFZGl0aW9uID0gJ0NIQU5HRV9FRElUSU9OJyxcbiAgQ2hhbmdlQmFja3RyYWNlID0gJ0NIQU5HRV9CQUNLVFJBQ0UnLFxuICBDaGFuZ2VGb2N1cyA9ICdDSEFOR0VfRk9DVVMnLFxuICBDb21waWxlQXNzZW1ibHlSZXF1ZXN0ID0gJ0NPTVBJTEVfQVNTRU1CTFlfUkVRVUVTVCcsXG4gIENvbXBpbGVBc3NlbWJseVN1Y2NlZWRlZCA9ICdDT01QSUxFX0FTU0VNQkxZX1NVQ0NFRURFRCcsXG4gIENvbXBpbGVBc3NlbWJseUZhaWxlZCA9ICdDT01QSUxFX0FTU0VNQkxZX0ZBSUxFRCcsXG4gIENvbXBpbGVMbHZtSXJSZXF1ZXN0ID0gJ0NPTVBJTEVfTExWTV9JUl9SRVFVRVNUJyxcbiAgQ29tcGlsZUxsdm1JclN1Y2NlZWRlZCA9ICdDT01QSUxFX0xMVk1fSVJfU1VDQ0VFREVEJyxcbiAgQ29tcGlsZUxsdm1JckZhaWxlZCA9ICdDT01QSUxFX0xMVk1fSVJfRkFJTEVEJyxcbiAgQ29tcGlsZUhpclJlcXVlc3QgPSAnQ09NUElMRV9ISVJfUkVRVUVTVCcsXG4gIENvbXBpbGVIaXJTdWNjZWVkZWQgPSAnQ09NUElMRV9ISVJfU1VDQ0VFREVEJyxcbiAgQ29tcGlsZUhpckZhaWxlZCA9ICdDT01QSUxFX0hJUl9GQUlMRUQnLFxuICBDb21waWxlTWlyUmVxdWVzdCA9ICdDT01QSUxFX01JUl9SRVFVRVNUJyxcbiAgQ29tcGlsZU1pclN1Y2NlZWRlZCA9ICdDT01QSUxFX01JUl9TVUNDRUVERUQnLFxuICBDb21waWxlTWlyRmFpbGVkID0gJ0NPTVBJTEVfTUlSX0ZBSUxFRCcsXG4gIENvbXBpbGVXYXNtUmVxdWVzdCA9ICdDT01QSUxFX1dBU01fUkVRVUVTVCcsXG4gIENvbXBpbGVXYXNtU3VjY2VlZGVkID0gJ0NPTVBJTEVfV0FTTV9TVUNDRUVERUQnLFxuICBDb21waWxlV2FzbUZhaWxlZCA9ICdDT01QSUxFX1dBU01fRkFJTEVEJyxcbiAgRWRpdENvZGUgPSAnRURJVF9DT0RFJyxcbiAgQWRkTWFpbkZ1bmN0aW9uID0gJ0FERF9NQUlOX0ZVTkNUSU9OJyxcbiAgQWRkSW1wb3J0ID0gJ0FERF9JTVBPUlQnLFxuICBFbmFibGVGZWF0dXJlR2F0ZSA9ICdFTkFCTEVfRkVBVFVSRV9HQVRFJyxcbiAgR290b1Bvc2l0aW9uID0gJ0dPVE9fUE9TSVRJT04nLFxuICBTZWxlY3RUZXh0ID0gJ1NFTEVDVF9URVhUJyxcbiAgUmVxdWVzdENsaXBweSA9ICdSRVFVRVNUX0NMSVBQWScsXG4gIENsaXBweVN1Y2NlZWRlZCA9ICdDTElQUFlfU1VDQ0VFREVEJyxcbiAgQ2xpcHB5RmFpbGVkID0gJ0NMSVBQWV9GQUlMRUQnLFxuICBSZXF1ZXN0TWlyaSA9ICdSRVFVRVNUX01JUkknLFxuICBNaXJpU3VjY2VlZGVkID0gJ01JUklfU1VDQ0VFREVEJyxcbiAgTWlyaUZhaWxlZCA9ICdNSVJJX0ZBSUxFRCcsXG4gIFJlcXVlc3RNYWNyb0V4cGFuc2lvbiA9ICdSRVFVRVNUX01BQ1JPX0VYUEFOU0lPTicsXG4gIE1hY3JvRXhwYW5zaW9uU3VjY2VlZGVkID0gJ01BQ1JPX0VYUEFOU0lPTl9TVUNDRUVERUQnLFxuICBNYWNyb0V4cGFuc2lvbkZhaWxlZCA9ICdNQUNST19FWFBBTlNJT05fRkFJTEVEJyxcbiAgUmVxdWVzdENyYXRlc0xvYWQgPSAnUkVRVUVTVF9DUkFURVNfTE9BRCcsXG4gIENyYXRlc0xvYWRTdWNjZWVkZWQgPSAnQ1JBVEVTX0xPQURfU1VDQ0VFREVEJyxcbiAgUmVxdWVzdFZlcnNpb25zTG9hZCA9ICdSRVFVRVNUX1ZFUlNJT05TX0xPQUQnLFxuICBWZXJzaW9uc0xvYWRTdWNjZWVkZWQgPSAnVkVSU0lPTlNfTE9BRF9TVUNDRUVERUQnLFxuICBOb3RpZmljYXRpb25TZWVuID0gJ05PVElGSUNBVElPTl9TRUVOJyxcbiAgQnJvd3NlcldpZHRoQ2hhbmdlZCA9ICdCUk9XU0VSX1dJRFRIX0NIQU5HRUQnLFxuICBTcGxpdFJhdGlvQ2hhbmdlZCA9ICdTUExJVF9SQVRJT19DSEFOR0VEJyxcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVBcHBsaWNhdGlvbiA9ICgpID0+IGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkluaXRpYWxpemVBcHBsaWNhdGlvbik7XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlU3luY0NoYW5nZXNUb1N0b3JhZ2UgPSAoKSA9PiBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5EaXNhYmxlU3luY0NoYW5nZXNUb1N0b3JhZ2UpO1xuXG5jb25zdCBzZXRQYWdlID0gKHBhZ2U6IFBhZ2UpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLlNldFBhZ2UsIHsgcGFnZSB9KTtcblxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9JbmRleCA9ICgpID0+IHNldFBhZ2UoJ2luZGV4Jyk7XG5leHBvcnQgY29uc3QgbmF2aWdhdGVUb0hlbHAgPSAoKSA9PiBzZXRQYWdlKCdoZWxwJyk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VFZGl0b3IgPSAoZWRpdG9yOiBFZGl0b3IpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNoYW5nZUVkaXRvciwgeyBlZGl0b3IgfSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VLZXliaW5kaW5nID0gKGtleWJpbmRpbmc6IHN0cmluZykgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ2hhbmdlS2V5YmluZGluZywgeyBrZXliaW5kaW5nIH0pO1xuXG5leHBvcnQgY29uc3QgY2hhbmdlQWNlVGhlbWUgPSAodGhlbWU6IHN0cmluZykgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ2hhbmdlQWNlVGhlbWUsIHsgdGhlbWUgfSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VNb25hY29UaGVtZSA9ICh0aGVtZTogc3RyaW5nKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5DaGFuZ2VNb25hY29UaGVtZSwgeyB0aGVtZSB9KTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVBhaXJDaGFyYWN0ZXJzID0gKHBhaXJDaGFyYWN0ZXJzOiBQYWlyQ2hhcmFjdGVycykgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ2hhbmdlUGFpckNoYXJhY3RlcnMsIHsgcGFpckNoYXJhY3RlcnMgfSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VPcmllbnRhdGlvbiA9IChvcmllbnRhdGlvbjogT3JpZW50YXRpb24pID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNoYW5nZU9yaWVudGF0aW9uLCB7IG9yaWVudGF0aW9uIH0pO1xuXG5leHBvcnQgY29uc3QgY2hhbmdlQXNzZW1ibHlGbGF2b3IgPSAoYXNzZW1ibHlGbGF2b3I6IEFzc2VtYmx5Rmxhdm9yKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5DaGFuZ2VBc3NlbWJseUZsYXZvciwgeyBhc3NlbWJseUZsYXZvciB9KTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZURlbWFuZ2xlQXNzZW1ibHkgPSAoZGVtYW5nbGVBc3NlbWJseTogRGVtYW5nbGVBc3NlbWJseSkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ2hhbmdlRGVtYW5nbGVBc3NlbWJseSwgeyBkZW1hbmdsZUFzc2VtYmx5IH0pO1xuXG5leHBvcnQgY29uc3QgY2hhbmdlUHJvY2Vzc0Fzc2VtYmx5ID0gKHByb2Nlc3NBc3NlbWJseTogUHJvY2Vzc0Fzc2VtYmx5KSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5DaGFuZ2VQcm9jZXNzQXNzZW1ibHksIHsgcHJvY2Vzc0Fzc2VtYmx5IH0pO1xuXG5jb25zdCBjaGFuZ2VQcmltYXJ5QWN0aW9uID0gKHByaW1hcnlBY3Rpb246IFByaW1hcnlBY3Rpb24pID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNoYW5nZVByaW1hcnlBY3Rpb24sIHsgcHJpbWFyeUFjdGlvbiB9KTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZUNoYW5uZWwgPSAoY2hhbm5lbDogQ2hhbm5lbCkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ2hhbmdlQ2hhbm5lbCwgeyBjaGFubmVsIH0pO1xuXG5leHBvcnQgY29uc3QgY2hhbmdlTW9kZSA9IChtb2RlOiBNb2RlKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5DaGFuZ2VNb2RlLCB7IG1vZGUgfSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VFZGl0aW9uID0gKGVkaXRpb246IEVkaXRpb24pID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNoYW5nZUVkaXRpb24sIHsgZWRpdGlvbiB9KTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZUJhY2t0cmFjZSA9IChiYWNrdHJhY2U6IEJhY2t0cmFjZSkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ2hhbmdlQmFja3RyYWNlLCB7IGJhY2t0cmFjZSB9KTtcblxuZXhwb3J0IGNvbnN0IHJlRXhlY3V0ZVdpdGhCYWNrdHJhY2UgPSAoKTogVGh1bmtBY3Rpb24gPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaChjaGFuZ2VCYWNrdHJhY2UoQmFja3RyYWNlLkVuYWJsZWQpKTtcbiAgZGlzcGF0Y2gocGVyZm9ybUV4ZWN1dGVPbmx5KCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZUZvY3VzID0gKGZvY3VzPzogRm9jdXMpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNoYW5nZUZvY3VzLCB7IGZvY3VzIH0pO1xuXG50eXBlIEZldGNoQXJnID0gUGFyYW1ldGVyczx0eXBlb2YgZmV0Y2g+WzBdO1xuXG5leHBvcnQgZnVuY3Rpb24ganNvbkdldCh1cmw6IEZldGNoQXJnKSB7XG4gIHJldHVybiBmZXRjaEpzb24odXJsLCB7XG4gICAgbWV0aG9kOiAnZ2V0JyxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uUG9zdDxUPih1cmw6IEZldGNoQXJnLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogUHJvbWlzZTxUPiB7XG4gIHJldHVybiBmZXRjaEpzb24odXJsLCB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEpzb24odXJsOiBGZXRjaEFyZywgYXJnczogUmVxdWVzdEluaXQpIHtcbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKGFyZ3MuaGVhZGVycyk7XG4gIGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gIGxldCByZXNwb25zZTtcbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyAuLi5hcmdzLCBoZWFkZXJzIH0pO1xuICB9IGNhdGNoIChuZXR3b3JrRXJyb3IpIHtcbiAgICAvLyBlLmcuIHNlcnZlciB1bnJlYWNoYWJsZVxuICAgIGlmIChuZXR3b3JrRXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdGhyb3cgKHtcbiAgICAgICAgZXJyb3I6IGBOZXR3b3JrIGVycm9yOiAke25ldHdvcmtFcnJvci50b1N0cmluZygpfWAsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgKHtcbiAgICAgICAgZXJyb3I6ICdVbmtub3duIGVycm9yIHdoaWxlIGZldGNoaW5nIEpTT04nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGJvZHk7XG4gIHRyeSB7XG4gICAgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoY29udmVydEVycm9yKSB7XG4gICAgaWYgKGNvbnZlcnRFcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyAoe1xuICAgICAgICBlcnJvcjogYFJlc3BvbnNlIHdhcyBub3QgSlNPTjogJHtjb252ZXJ0RXJyb3IudG9TdHJpbmcoKX1gLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICh7XG4gICAgICAgIGVycm9yOiAnVW5rbm93biBlcnJvciB3aGlsZSBjb252ZXJ0aW5nIEpTT04nLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgLy8gSFRUUCAyeHhcbiAgICByZXR1cm4gYm9keTtcbiAgfSBlbHNlIHtcbiAgICAvLyBIVFRQIDR4eCwgNXh4IChlLmcuIG1hbGZvcm1lZCBKU09OIHJlcXVlc3QpXG4gICAgdGhyb3cgYm9keTtcbiAgfVxufVxuXG4vLyBXZSBtYWRlIHNvbWUgc3RyYW5nZSBkZWNpc2lvbnMgd2l0aCBob3cgdGhlIGBmZXRjaEpzb25gIGZ1bmN0aW9uXG4vLyBjb21tdW5pY2F0ZXMgZXJyb3JzLCBzbyB3ZSB1bnR3aXN0IHRob3NlIGhlcmUgdG8gZml0IGJldHRlciB3aXRoXG4vLyByZWR1eC10b29sa2l0J3MgaWRlYXMuXG5leHBvcnQgY29uc3QgYWRhcHRGZXRjaEVycm9yID0gYXN5bmMgPFI+KGNiOiAoKSA9PiBQcm9taXNlPFI+KTogUHJvbWlzZTxSPiA9PiB7XG4gIGxldCByZXN1bHQ7XG5cbiAgdHJ5IHtcbiAgICByZXN1bHQgPSBhd2FpdCBjYigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgJiYgdHlwZW9mIGUgPT09ICdvYmplY3QnICYmICdlcnJvcicgaW4gZSAmJiB0eXBlb2YgZS5lcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlLmVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyAmJiAnZXJyb3InIGluIHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LmVycm9yID09PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gcGVyZm9ybUF1dG9Pbmx5KCk6IFRodW5rQWN0aW9uIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRpc3BhdGNoLCBnZXRTdGF0ZSkge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjcmF0ZVR5cGUgPSBnZXRDcmF0ZVR5cGUoc3RhdGUpO1xuICAgIGNvbnN0IHRlc3RzID0gcnVuQXNUZXN0KHN0YXRlKTtcblxuICAgIHJldHVybiBkaXNwYXRjaChwZXJmb3JtQ29tbW9uRXhlY3V0ZShjcmF0ZVR5cGUsIHRlc3RzKSk7XG4gIH07XG59XG5cbmNvbnN0IHBlcmZvcm1FeGVjdXRlT25seSA9ICgpOiBUaHVua0FjdGlvbiA9PiBwZXJmb3JtQ29tbW9uRXhlY3V0ZSgnYmluJywgZmFsc2UpO1xuY29uc3QgcGVyZm9ybUNvbXBpbGVPbmx5ID0gKCk6IFRodW5rQWN0aW9uID0+IHBlcmZvcm1Db21tb25FeGVjdXRlKCdsaWInLCBmYWxzZSk7XG5jb25zdCBwZXJmb3JtVGVzdE9ubHkgPSAoKTogVGh1bmtBY3Rpb24gPT4gcGVyZm9ybUNvbW1vbkV4ZWN1dGUoJ2xpYicsIHRydWUpO1xuXG5pbnRlcmZhY2UgQ29tcGlsZVJlcXVlc3RCb2R5IGV4dGVuZHMgRXhlY3V0ZVJlcXVlc3RCb2R5IHtcbiAgdGFyZ2V0OiBzdHJpbmc7XG4gIGFzc2VtYmx5Rmxhdm9yOiBzdHJpbmc7XG4gIGRlbWFuZ2xlQXNzZW1ibHk6IHN0cmluZztcbiAgcHJvY2Vzc0Fzc2VtYmx5OiBzdHJpbmc7XG59XG5cbnR5cGUgQ29tcGlsZVJlc3BvbnNlQm9keSA9IENvbXBpbGVTdWNjZXNzO1xuXG5pbnRlcmZhY2UgQ29tcGlsZVN1Y2Nlc3Mge1xuICBjb2RlOiBzdHJpbmc7XG4gIHN0ZG91dDogc3RyaW5nO1xuICBzdGRlcnI6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIENvbXBpbGVGYWlsdXJlIHtcbiAgZXJyb3I6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gcGVyZm9ybUNvbXBpbGVTaG93KFxuICB0YXJnZXQ6IHN0cmluZyxcbiAgeyByZXF1ZXN0LCBzdWNjZXNzLCBmYWlsdXJlIH06IHtcbiAgICByZXF1ZXN0OiAoKSA9PiBBY3Rpb24sXG4gICAgc3VjY2VzczogKGJvZHk6IENvbXBpbGVSZXNwb25zZUJvZHkpID0+IEFjdGlvbixcbiAgICBmYWlsdXJlOiAoZjogQ29tcGlsZUZhaWx1cmUpID0+IEFjdGlvbixcbiAgfSk6IFRodW5rQWN0aW9uIHtcbiAgLy8gVE9ETzogQ2hlY2sgYSBjYWNoZVxuICByZXR1cm4gZnVuY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlKSB7XG4gICAgZGlzcGF0Y2gocmVxdWVzdCgpKTtcblxuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2RlID0gY29kZVNlbGVjdG9yKHN0YXRlKTtcbiAgICBjb25zdCB7IGNvbmZpZ3VyYXRpb246IHtcbiAgICAgIGNoYW5uZWwsXG4gICAgICBtb2RlLFxuICAgICAgZWRpdGlvbixcbiAgICAgIGFzc2VtYmx5Rmxhdm9yLFxuICAgICAgZGVtYW5nbGVBc3NlbWJseSxcbiAgICAgIHByb2Nlc3NBc3NlbWJseSxcbiAgICB9IH0gPSBzdGF0ZTtcbiAgICBjb25zdCBjcmF0ZVR5cGUgPSBnZXRDcmF0ZVR5cGUoc3RhdGUpO1xuICAgIGNvbnN0IHRlc3RzID0gcnVuQXNUZXN0KHN0YXRlKTtcbiAgICBjb25zdCBiYWNrdHJhY2UgPSBzdGF0ZS5jb25maWd1cmF0aW9uLmJhY2t0cmFjZSA9PT0gQmFja3RyYWNlLkVuYWJsZWQ7XG4gICAgY29uc3QgYm9keTogQ29tcGlsZVJlcXVlc3RCb2R5ID0ge1xuICAgICAgY2hhbm5lbCxcbiAgICAgIG1vZGUsXG4gICAgICBlZGl0aW9uLFxuICAgICAgY3JhdGVUeXBlLFxuICAgICAgdGVzdHMsXG4gICAgICBjb2RlLFxuICAgICAgdGFyZ2V0LFxuICAgICAgYXNzZW1ibHlGbGF2b3IsXG4gICAgICBkZW1hbmdsZUFzc2VtYmx5LFxuICAgICAgcHJvY2Vzc0Fzc2VtYmx5LFxuICAgICAgYmFja3RyYWNlLFxuICAgIH07XG5cbiAgICByZXR1cm4ganNvblBvc3Q8Q29tcGlsZVJlc3BvbnNlQm9keT4ocm91dGVzLmNvbXBpbGUsIGJvZHkpXG4gICAgICAudGhlbihqc29uID0+IGRpc3BhdGNoKHN1Y2Nlc3MoanNvbikpKVxuICAgICAgLmNhdGNoKGpzb24gPT4gZGlzcGF0Y2goZmFpbHVyZShqc29uKSkpO1xuICB9O1xufVxuXG5jb25zdCByZXF1ZXN0Q29tcGlsZUFzc2VtYmx5ID0gKCkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ29tcGlsZUFzc2VtYmx5UmVxdWVzdCk7XG5cbmNvbnN0IHJlY2VpdmVDb21waWxlQXNzZW1ibHlTdWNjZXNzID0gKHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfTogQ29tcGlsZVN1Y2Nlc3MpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNvbXBpbGVBc3NlbWJseVN1Y2NlZWRlZCwgeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9KTtcblxuY29uc3QgcmVjZWl2ZUNvbXBpbGVBc3NlbWJseUZhaWx1cmUgPSAoeyBlcnJvciB9OiBDb21waWxlRmFpbHVyZSkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ29tcGlsZUFzc2VtYmx5RmFpbGVkLCB7IGVycm9yIH0pO1xuXG5jb25zdCBwZXJmb3JtQ29tcGlsZVRvQXNzZW1ibHlPbmx5ID0gKCkgPT5cbiAgcGVyZm9ybUNvbXBpbGVTaG93KCdhc20nLCB7XG4gICAgcmVxdWVzdDogcmVxdWVzdENvbXBpbGVBc3NlbWJseSxcbiAgICBzdWNjZXNzOiByZWNlaXZlQ29tcGlsZUFzc2VtYmx5U3VjY2VzcyxcbiAgICBmYWlsdXJlOiByZWNlaXZlQ29tcGlsZUFzc2VtYmx5RmFpbHVyZSxcbiAgfSk7XG5cbmNvbnN0IHJlcXVlc3RDb21waWxlTGx2bUlyID0gKCkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ29tcGlsZUxsdm1JclJlcXVlc3QpO1xuXG5jb25zdCByZWNlaXZlQ29tcGlsZUxsdm1JclN1Y2Nlc3MgPSAoeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9OiBDb21waWxlU3VjY2VzcykgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ29tcGlsZUxsdm1JclN1Y2NlZWRlZCwgeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9KTtcblxuY29uc3QgcmVjZWl2ZUNvbXBpbGVMbHZtSXJGYWlsdXJlID0gKHsgZXJyb3IgfTogQ29tcGlsZUZhaWx1cmUpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNvbXBpbGVMbHZtSXJGYWlsZWQsIHsgZXJyb3IgfSk7XG5cbmNvbnN0IHBlcmZvcm1Db21waWxlVG9MTFZNT25seSA9ICgpID0+XG4gIHBlcmZvcm1Db21waWxlU2hvdygnbGx2bS1pcicsIHtcbiAgICByZXF1ZXN0OiByZXF1ZXN0Q29tcGlsZUxsdm1JcixcbiAgICBzdWNjZXNzOiByZWNlaXZlQ29tcGlsZUxsdm1JclN1Y2Nlc3MsXG4gICAgZmFpbHVyZTogcmVjZWl2ZUNvbXBpbGVMbHZtSXJGYWlsdXJlLFxuICB9KTtcblxuY29uc3QgcmVxdWVzdENvbXBpbGVIaXIgPSAoKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5Db21waWxlSGlyUmVxdWVzdCk7XG5cbmNvbnN0IHJlY2VpdmVDb21waWxlSGlyU3VjY2VzcyA9ICh7IGNvZGUsIHN0ZG91dCwgc3RkZXJyIH06IENvbXBpbGVTdWNjZXNzKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5Db21waWxlSGlyU3VjY2VlZGVkLCB7IGNvZGUsIHN0ZG91dCwgc3RkZXJyIH0pO1xuXG5jb25zdCByZWNlaXZlQ29tcGlsZUhpckZhaWx1cmUgPSAoeyBlcnJvciB9OiBDb21waWxlRmFpbHVyZSkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ29tcGlsZUhpckZhaWxlZCwgeyBlcnJvciB9KTtcblxuY29uc3QgcGVyZm9ybUNvbXBpbGVUb0hpck9ubHkgPSAoKSA9PlxuICBwZXJmb3JtQ29tcGlsZVNob3coJ2hpcicsIHtcbiAgICByZXF1ZXN0OiByZXF1ZXN0Q29tcGlsZUhpcixcbiAgICBzdWNjZXNzOiByZWNlaXZlQ29tcGlsZUhpclN1Y2Nlc3MsXG4gICAgZmFpbHVyZTogcmVjZWl2ZUNvbXBpbGVIaXJGYWlsdXJlLFxuICB9KTtcblxuY29uc3QgcGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlIaXJPbmx5ID0gKCk6IFRodW5rQWN0aW9uID0+IGRpc3BhdGNoID0+IHtcbiAgZGlzcGF0Y2goY2hhbmdlQ2hhbm5lbChDaGFubmVsLk5pZ2h0bHkpKTtcbiAgZGlzcGF0Y2gocGVyZm9ybUNvbXBpbGVUb0hpck9ubHkoKSk7XG59O1xuXG5jb25zdCByZXF1ZXN0Q29tcGlsZU1pciA9ICgpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNvbXBpbGVNaXJSZXF1ZXN0KTtcblxuY29uc3QgcmVjZWl2ZUNvbXBpbGVNaXJTdWNjZXNzID0gKHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfTogQ29tcGlsZVN1Y2Nlc3MpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNvbXBpbGVNaXJTdWNjZWVkZWQsIHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfSk7XG5cbmNvbnN0IHJlY2VpdmVDb21waWxlTWlyRmFpbHVyZSA9ICh7IGVycm9yIH06IENvbXBpbGVGYWlsdXJlKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5Db21waWxlTWlyRmFpbGVkLCB7IGVycm9yIH0pO1xuXG5jb25zdCBwZXJmb3JtQ29tcGlsZVRvTWlyT25seSA9ICgpID0+XG4gIHBlcmZvcm1Db21waWxlU2hvdygnbWlyJywge1xuICAgIHJlcXVlc3Q6IHJlcXVlc3RDb21waWxlTWlyLFxuICAgIHN1Y2Nlc3M6IHJlY2VpdmVDb21waWxlTWlyU3VjY2VzcyxcbiAgICBmYWlsdXJlOiByZWNlaXZlQ29tcGlsZU1pckZhaWx1cmUsXG4gIH0pO1xuXG5jb25zdCByZXF1ZXN0Q29tcGlsZVdhc20gPSAoKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5Db21waWxlV2FzbVJlcXVlc3QpO1xuXG5jb25zdCByZWNlaXZlQ29tcGlsZVdhc21TdWNjZXNzID0gKHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfTogQ29tcGlsZVN1Y2Nlc3MpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNvbXBpbGVXYXNtU3VjY2VlZGVkLCB7IGNvZGUsIHN0ZG91dCwgc3RkZXJyIH0pO1xuXG5jb25zdCByZWNlaXZlQ29tcGlsZVdhc21GYWlsdXJlID0gKHsgZXJyb3IgfTogQ29tcGlsZUZhaWx1cmUpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNvbXBpbGVXYXNtRmFpbGVkLCB7IGVycm9yIH0pO1xuXG5jb25zdCBwZXJmb3JtQ29tcGlsZVRvV2FzbSA9ICgpID0+XG4gIHBlcmZvcm1Db21waWxlU2hvdygnd2FzbScsIHtcbiAgICByZXF1ZXN0OiByZXF1ZXN0Q29tcGlsZVdhc20sXG4gICAgc3VjY2VzczogcmVjZWl2ZUNvbXBpbGVXYXNtU3VjY2VzcyxcbiAgICBmYWlsdXJlOiByZWNlaXZlQ29tcGlsZVdhc21GYWlsdXJlLFxuICB9KTtcblxuY29uc3QgcGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlXYXNtT25seSA9ICgpOiBUaHVua0FjdGlvbiA9PiBkaXNwYXRjaCA9PiB7XG4gIGRpc3BhdGNoKGNoYW5nZUNoYW5uZWwoQ2hhbm5lbC5OaWdodGx5KSk7XG4gIGRpc3BhdGNoKHBlcmZvcm1Db21waWxlVG9XYXNtKCkpO1xufTtcblxuY29uc3QgUFJJTUFSWV9BQ1RJT05TOiB7IFtpbmRleCBpbiBQcmltYXJ5QWN0aW9uXTogKCkgPT4gVGh1bmtBY3Rpb24gfSA9IHtcbiAgW1ByaW1hcnlBY3Rpb25Db3JlLkFzbV06IHBlcmZvcm1Db21waWxlVG9Bc3NlbWJseU9ubHksXG4gIFtQcmltYXJ5QWN0aW9uQ29yZS5Db21waWxlXTogcGVyZm9ybUNvbXBpbGVPbmx5LFxuICBbUHJpbWFyeUFjdGlvbkNvcmUuRXhlY3V0ZV06IHBlcmZvcm1FeGVjdXRlT25seSxcbiAgW1ByaW1hcnlBY3Rpb25Db3JlLlRlc3RdOiBwZXJmb3JtVGVzdE9ubHksXG4gIFtQcmltYXJ5QWN0aW9uQXV0by5BdXRvXTogcGVyZm9ybUF1dG9Pbmx5LFxuICBbUHJpbWFyeUFjdGlvbkNvcmUuTGx2bUlyXTogcGVyZm9ybUNvbXBpbGVUb0xMVk1Pbmx5LFxuICBbUHJpbWFyeUFjdGlvbkNvcmUuSGlyXTogcGVyZm9ybUNvbXBpbGVUb0hpck9ubHksXG4gIFtQcmltYXJ5QWN0aW9uQ29yZS5NaXJdOiBwZXJmb3JtQ29tcGlsZVRvTWlyT25seSxcbiAgW1ByaW1hcnlBY3Rpb25Db3JlLldhc21dOiBwZXJmb3JtQ29tcGlsZVRvTmlnaHRseVdhc21Pbmx5LFxufTtcblxuZXhwb3J0IGNvbnN0IHBlcmZvcm1QcmltYXJ5QWN0aW9uID0gKCk6IFRodW5rQWN0aW9uID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuICBjb25zdCBwcmltYXJ5QWN0aW9uID0gUFJJTUFSWV9BQ1RJT05TW3N0YXRlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUFjdGlvbl07XG4gIGRpc3BhdGNoKHByaW1hcnlBY3Rpb24oKSk7XG59O1xuXG5jb25zdCBwZXJmb3JtQW5kU3dpdGNoUHJpbWFyeUFjdGlvbiA9IChpbm5lcjogKCkgPT4gVGh1bmtBY3Rpb24sIGlkOiBQcmltYXJ5QWN0aW9uKSA9PiAoKTogVGh1bmtBY3Rpb24gPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaChjaGFuZ2VQcmltYXJ5QWN0aW9uKGlkKSk7XG4gIGRpc3BhdGNoKGlubmVyKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHBlcmZvcm1FeGVjdXRlID1cbiAgcGVyZm9ybUFuZFN3aXRjaFByaW1hcnlBY3Rpb24ocGVyZm9ybUV4ZWN1dGVPbmx5LCBQcmltYXJ5QWN0aW9uQ29yZS5FeGVjdXRlKTtcbmV4cG9ydCBjb25zdCBwZXJmb3JtQ29tcGlsZSA9XG4gIHBlcmZvcm1BbmRTd2l0Y2hQcmltYXJ5QWN0aW9uKHBlcmZvcm1Db21waWxlT25seSwgUHJpbWFyeUFjdGlvbkNvcmUuQ29tcGlsZSk7XG5leHBvcnQgY29uc3QgcGVyZm9ybVRlc3QgPVxuICBwZXJmb3JtQW5kU3dpdGNoUHJpbWFyeUFjdGlvbihwZXJmb3JtVGVzdE9ubHksIFByaW1hcnlBY3Rpb25Db3JlLlRlc3QpO1xuZXhwb3J0IGNvbnN0IHBlcmZvcm1Db21waWxlVG9Bc3NlbWJseSA9XG4gIHBlcmZvcm1BbmRTd2l0Y2hQcmltYXJ5QWN0aW9uKHBlcmZvcm1Db21waWxlVG9Bc3NlbWJseU9ubHksIFByaW1hcnlBY3Rpb25Db3JlLkFzbSk7XG5leHBvcnQgY29uc3QgcGVyZm9ybUNvbXBpbGVUb0xMVk0gPVxuICBwZXJmb3JtQW5kU3dpdGNoUHJpbWFyeUFjdGlvbihwZXJmb3JtQ29tcGlsZVRvTExWTU9ubHksIFByaW1hcnlBY3Rpb25Db3JlLkxsdm1Jcik7XG5leHBvcnQgY29uc3QgcGVyZm9ybUNvbXBpbGVUb01pciA9XG4gIHBlcmZvcm1BbmRTd2l0Y2hQcmltYXJ5QWN0aW9uKHBlcmZvcm1Db21waWxlVG9NaXJPbmx5LCBQcmltYXJ5QWN0aW9uQ29yZS5NaXIpO1xuZXhwb3J0IGNvbnN0IHBlcmZvcm1Db21waWxlVG9OaWdodGx5SGlyID1cbiAgcGVyZm9ybUFuZFN3aXRjaFByaW1hcnlBY3Rpb24ocGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlIaXJPbmx5LCBQcmltYXJ5QWN0aW9uQ29yZS5IaXIpO1xuZXhwb3J0IGNvbnN0IHBlcmZvcm1Db21waWxlVG9OaWdodGx5V2FzbSA9XG4gIHBlcmZvcm1BbmRTd2l0Y2hQcmltYXJ5QWN0aW9uKHBlcmZvcm1Db21waWxlVG9OaWdodGx5V2FzbU9ubHksIFByaW1hcnlBY3Rpb25Db3JlLldhc20pO1xuXG5leHBvcnQgY29uc3QgZWRpdENvZGUgPSAoY29kZTogc3RyaW5nKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5FZGl0Q29kZSwgeyBjb2RlIH0pO1xuXG5leHBvcnQgY29uc3QgYWRkTWFpbkZ1bmN0aW9uID0gKCkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQWRkTWFpbkZ1bmN0aW9uKTtcblxuZXhwb3J0IGNvbnN0IGFkZEltcG9ydCA9IChjb2RlOiBzdHJpbmcpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkFkZEltcG9ydCwgeyBjb2RlIH0pO1xuXG5leHBvcnQgY29uc3QgZW5hYmxlRmVhdHVyZUdhdGUgPSAoZmVhdHVyZUdhdGU6IHN0cmluZykgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuRW5hYmxlRmVhdHVyZUdhdGUsIHsgZmVhdHVyZUdhdGUgfSk7XG5cbmV4cG9ydCBjb25zdCBnb3RvUG9zaXRpb24gPSAobGluZTogc3RyaW5nIHwgbnVtYmVyLCBjb2x1bW46IHN0cmluZyB8IG51bWJlcikgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuR290b1Bvc2l0aW9uLCBtYWtlUG9zaXRpb24obGluZSwgY29sdW1uKSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RUZXh0ID0gKHN0YXJ0OiBQb3NpdGlvbiwgZW5kOiBQb3NpdGlvbikgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuU2VsZWN0VGV4dCwgeyBzdGFydCwgZW5kIH0pO1xuXG5pbnRlcmZhY2UgR2VuZXJhbFN1Y2Nlc3Mge1xuICBzdGRvdXQ6IHN0cmluZztcbiAgc3RkZXJyOiBzdHJpbmc7XG59XG5cbmNvbnN0IHJlcXVlc3RDbGlwcHkgPSAoKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5SZXF1ZXN0Q2xpcHB5KTtcblxuaW50ZXJmYWNlIENsaXBweVJlcXVlc3RCb2R5IHtcbiAgY29kZTogc3RyaW5nO1xuICBlZGl0aW9uOiBzdHJpbmc7XG4gIGNyYXRlVHlwZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgQ2xpcHB5UmVzcG9uc2VCb2R5IHtcbiAgc3VjY2VzczogYm9vbGVhbjtcbiAgc3Rkb3V0OiBzdHJpbmc7XG4gIHN0ZGVycjogc3RyaW5nO1xufVxuXG50eXBlIENsaXBweVN1Y2Nlc3MgPSBHZW5lcmFsU3VjY2VzcztcblxuY29uc3QgcmVjZWl2ZUNsaXBweVN1Y2Nlc3MgPSAoeyBzdGRvdXQsIHN0ZGVyciB9OiBDbGlwcHlTdWNjZXNzKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5DbGlwcHlTdWNjZWVkZWQsIHsgc3Rkb3V0LCBzdGRlcnIgfSk7XG5cbmNvbnN0IHJlY2VpdmVDbGlwcHlGYWlsdXJlID0gKHsgZXJyb3IgfTogQ29tcGlsZUZhaWx1cmUpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLkNsaXBweUZhaWxlZCwgeyBlcnJvciB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1DbGlwcHkoKTogVGh1bmtBY3Rpb24ge1xuICAvLyBUT0RPOiBDaGVjayBhIGNhY2hlXG4gIHJldHVybiBmdW5jdGlvbihkaXNwYXRjaCwgZ2V0U3RhdGUpIHtcbiAgICBkaXNwYXRjaChyZXF1ZXN0Q2xpcHB5KCkpO1xuXG4gICAgY29uc3QgYm9keTogQ2xpcHB5UmVxdWVzdEJvZHkgPSBjbGlwcHlSZXF1ZXN0U2VsZWN0b3IoZ2V0U3RhdGUoKSk7XG5cbiAgICByZXR1cm4ganNvblBvc3Q8Q2xpcHB5UmVzcG9uc2VCb2R5Pihyb3V0ZXMuY2xpcHB5LCBib2R5KVxuICAgICAgLnRoZW4oanNvbiA9PiBkaXNwYXRjaChyZWNlaXZlQ2xpcHB5U3VjY2Vzcyhqc29uKSkpXG4gICAgICAuY2F0Y2goanNvbiA9PiBkaXNwYXRjaChyZWNlaXZlQ2xpcHB5RmFpbHVyZShqc29uKSkpO1xuICB9O1xufVxuXG5jb25zdCByZXF1ZXN0TWlyaSA9ICgpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLlJlcXVlc3RNaXJpKTtcblxuaW50ZXJmYWNlIE1pcmlSZXF1ZXN0Qm9keSB7XG4gIGNvZGU6IHN0cmluZztcbiAgZWRpdGlvbjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTWlyaVJlc3BvbnNlQm9keSB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIHN0ZG91dDogc3RyaW5nO1xuICBzdGRlcnI6IHN0cmluZztcbn1cblxudHlwZSBNaXJpU3VjY2VzcyA9IEdlbmVyYWxTdWNjZXNzO1xuXG5jb25zdCByZWNlaXZlTWlyaVN1Y2Nlc3MgPSAoeyBzdGRvdXQsIHN0ZGVyciB9OiBNaXJpU3VjY2VzcykgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuTWlyaVN1Y2NlZWRlZCwgeyBzdGRvdXQsIHN0ZGVyciB9KTtcblxuY29uc3QgcmVjZWl2ZU1pcmlGYWlsdXJlID0gKHsgZXJyb3IgfTogQ29tcGlsZUZhaWx1cmUpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLk1pcmlGYWlsZWQsIHsgZXJyb3IgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJmb3JtTWlyaSgpOiBUaHVua0FjdGlvbiB7XG4gIC8vIFRPRE86IENoZWNrIGEgY2FjaGVcbiAgcmV0dXJuIGZ1bmN0aW9uKGRpc3BhdGNoLCBnZXRTdGF0ZSkge1xuICAgIGRpc3BhdGNoKHJlcXVlc3RNaXJpKCkpO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuICAgIGNvbnN0IGNvZGUgPSBjb2RlU2VsZWN0b3Ioc3RhdGUpO1xuICAgIGNvbnN0IHsgY29uZmlndXJhdGlvbjoge1xuICAgICAgZWRpdGlvbixcbiAgICB9IH0gPSBzdGF0ZTtcbiAgICBjb25zdCBib2R5OiBNaXJpUmVxdWVzdEJvZHkgPSB7IGNvZGUsIGVkaXRpb24gfTtcblxuICAgIHJldHVybiBqc29uUG9zdDxNaXJpUmVzcG9uc2VCb2R5Pihyb3V0ZXMubWlyaSwgYm9keSlcbiAgICAgIC50aGVuKGpzb24gPT4gZGlzcGF0Y2gocmVjZWl2ZU1pcmlTdWNjZXNzKGpzb24pKSlcbiAgICAgIC5jYXRjaChqc29uID0+IGRpc3BhdGNoKHJlY2VpdmVNaXJpRmFpbHVyZShqc29uKSkpO1xuICB9O1xufVxuXG5jb25zdCByZXF1ZXN0TWFjcm9FeHBhbnNpb24gPSAoKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5SZXF1ZXN0TWFjcm9FeHBhbnNpb24pO1xuXG5pbnRlcmZhY2UgTWFjcm9FeHBhbnNpb25SZXF1ZXN0Qm9keSB7XG4gIGNvZGU6IHN0cmluZztcbiAgZWRpdGlvbjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTWFjcm9FeHBhbnNpb25SZXNwb25zZUJvZHkge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBzdGRvdXQ6IHN0cmluZztcbiAgc3RkZXJyOiBzdHJpbmc7XG59XG5cbnR5cGUgTWFjcm9FeHBhbnNpb25TdWNjZXNzID0gR2VuZXJhbFN1Y2Nlc3M7XG5cbmNvbnN0IHJlY2VpdmVNYWNyb0V4cGFuc2lvblN1Y2Nlc3MgPSAoeyBzdGRvdXQsIHN0ZGVyciB9OiBNYWNyb0V4cGFuc2lvblN1Y2Nlc3MpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLk1hY3JvRXhwYW5zaW9uU3VjY2VlZGVkLCB7IHN0ZG91dCwgc3RkZXJyIH0pO1xuXG5jb25zdCByZWNlaXZlTWFjcm9FeHBhbnNpb25GYWlsdXJlID0gKHsgZXJyb3IgfTogQ29tcGlsZUZhaWx1cmUpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLk1hY3JvRXhwYW5zaW9uRmFpbGVkLCB7IGVycm9yIH0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcGVyZm9ybU1hY3JvRXhwYW5zaW9uKCk6IFRodW5rQWN0aW9uIHtcbiAgLy8gVE9ETzogQ2hlY2sgYSBjYWNoZVxuICByZXR1cm4gZnVuY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlKSB7XG4gICAgZGlzcGF0Y2gocmVxdWVzdE1hY3JvRXhwYW5zaW9uKCkpO1xuXG4gICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuICAgIGNvbnN0IGNvZGUgPSBjb2RlU2VsZWN0b3Ioc3RhdGUpO1xuICAgIGNvbnN0IHsgY29uZmlndXJhdGlvbjoge1xuICAgICAgZWRpdGlvbixcbiAgICB9IH0gPSBzdGF0ZTtcbiAgICBjb25zdCBib2R5OiBNYWNyb0V4cGFuc2lvblJlcXVlc3RCb2R5ID0geyBjb2RlLCBlZGl0aW9uIH07XG5cbiAgICByZXR1cm4ganNvblBvc3Q8TWFjcm9FeHBhbnNpb25SZXNwb25zZUJvZHk+KHJvdXRlcy5tYWNyb0V4cGFuc2lvbiwgYm9keSlcbiAgICAgIC50aGVuKGpzb24gPT4gZGlzcGF0Y2gocmVjZWl2ZU1hY3JvRXhwYW5zaW9uU3VjY2Vzcyhqc29uKSkpXG4gICAgICAuY2F0Y2goanNvbiA9PiBkaXNwYXRjaChyZWNlaXZlTWFjcm9FeHBhbnNpb25GYWlsdXJlKGpzb24pKSk7XG4gIH07XG59XG5cbmNvbnN0IHJlcXVlc3RDcmF0ZXNMb2FkID0gKCkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuUmVxdWVzdENyYXRlc0xvYWQpO1xuXG5jb25zdCByZWNlaXZlQ3JhdGVzTG9hZFN1Y2Nlc3MgPSAoeyBjcmF0ZXMgfTogeyBjcmF0ZXM6IENyYXRlW10gfSkgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQ3JhdGVzTG9hZFN1Y2NlZWRlZCwgeyBjcmF0ZXMgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJmb3JtQ3JhdGVzTG9hZCgpOiBUaHVua0FjdGlvbiB7XG4gIHJldHVybiBmdW5jdGlvbihkaXNwYXRjaCkge1xuICAgIGRpc3BhdGNoKHJlcXVlc3RDcmF0ZXNMb2FkKCkpO1xuXG4gICAgcmV0dXJuIGpzb25HZXQocm91dGVzLm1ldGEuY3JhdGVzKVxuICAgICAgLnRoZW4oanNvbiA9PiBkaXNwYXRjaChyZWNlaXZlQ3JhdGVzTG9hZFN1Y2Nlc3MoanNvbikpKTtcbiAgICAvLyBUT0RPOiBGYWlsdXJlIGNhc2VcbiAgfTtcbn1cblxuY29uc3QgcmVxdWVzdFZlcnNpb25zTG9hZCA9ICgpID0+XG4gIGNyZWF0ZUFjdGlvbihBY3Rpb25UeXBlLlJlcXVlc3RWZXJzaW9uc0xvYWQpO1xuXG5jb25zdCByZWNlaXZlVmVyc2lvbnNMb2FkU3VjY2VzcyA9ICh7XG4gIHN0YWJsZSwgYmV0YSwgbmlnaHRseSwgamF2YTE5LCBydXN0Zm10LCBjbGlwcHksIG1pcmksXG59OiB7XG4gIHN0YWJsZTogVmVyc2lvbiwgYmV0YTogVmVyc2lvbiwgbmlnaHRseTogVmVyc2lvbiwgamF2YTE5OiBWZXJzaW9uLCBydXN0Zm10OiBWZXJzaW9uLCBjbGlwcHk6IFZlcnNpb24sIG1pcmk6IFZlcnNpb24sXG59KSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5WZXJzaW9uc0xvYWRTdWNjZWVkZWQsIHsgc3RhYmxlLCBiZXRhLCBuaWdodGx5LCBqYXZhMTksIHJ1c3RmbXQsIGNsaXBweSwgbWlyaSB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1WZXJzaW9uc0xvYWQoKTogVGh1bmtBY3Rpb24ge1xuICByZXR1cm4gZnVuY3Rpb24oZGlzcGF0Y2gpIHtcbiAgICBkaXNwYXRjaChyZXF1ZXN0VmVyc2lvbnNMb2FkKCkpO1xuXG4gICAgY29uc3Qgc3RhYmxlID0ganNvbkdldChyb3V0ZXMubWV0YS52ZXJzaW9uLnN0YWJsZSk7XG4gICAgY29uc3QgYmV0YSA9IGpzb25HZXQocm91dGVzLm1ldGEudmVyc2lvbi5iZXRhKTtcbiAgICBjb25zdCBuaWdodGx5ID0ganNvbkdldChyb3V0ZXMubWV0YS52ZXJzaW9uLm5pZ2h0bHkpO1xuICAgIGNvbnN0IGphdmExOSA9IGpzb25HZXQocm91dGVzLm1ldGEudmVyc2lvbi5qYXZhMTkpO1xuICAgIGNvbnN0IHJ1c3RmbXQgPSBqc29uR2V0KHJvdXRlcy5tZXRhLnZlcnNpb24ucnVzdGZtdCk7XG4gICAgY29uc3QgY2xpcHB5ID0ganNvbkdldChyb3V0ZXMubWV0YS52ZXJzaW9uLmNsaXBweSk7XG4gICAgY29uc3QgbWlyaSA9IGpzb25HZXQocm91dGVzLm1ldGEudmVyc2lvbi5taXJpKTtcblxuICAgIGNvbnN0IGFsbCA9IFByb21pc2UuYWxsKFtzdGFibGUsIGJldGEsIG5pZ2h0bHksIGphdmExOSwgcnVzdGZtdCwgY2xpcHB5LCBtaXJpXSk7XG5cbiAgICByZXR1cm4gYWxsXG4gICAgICAudGhlbigoW3N0YWJsZSwgYmV0YSwgbmlnaHRseSwgamF2YTE5LCBydXN0Zm10LCBjbGlwcHksIG1pcmldKSA9PiBkaXNwYXRjaChyZWNlaXZlVmVyc2lvbnNMb2FkU3VjY2Vzcyh7XG4gICAgICAgIHN0YWJsZSxcbiAgICAgICAgYmV0YSxcbiAgICAgICAgbmlnaHRseSxcbiAgICAgICAgamF2YTE5LFxuICAgICAgICBydXN0Zm10LFxuICAgICAgICBjbGlwcHksXG4gICAgICAgIG1pcmksXG4gICAgICB9KSkpO1xuICAgIC8vIFRPRE86IEZhaWx1cmUgY2FzZVxuICB9O1xufVxuXG5jb25zdCBub3RpZmljYXRpb25TZWVuID0gKG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5Ob3RpZmljYXRpb25TZWVuLCB7IG5vdGlmaWNhdGlvbiB9KTtcblxuZXhwb3J0IGNvbnN0IHNlZW5SdXN0U3VydmV5MjAyMiA9ICgpID0+IG5vdGlmaWNhdGlvblNlZW4oTm90aWZpY2F0aW9uLlJ1c3RTdXJ2ZXkyMDIyKTtcblxuZXhwb3J0IGNvbnN0IGJyb3dzZXJXaWR0aENoYW5nZWQgPSAoaXNTbWFsbDogYm9vbGVhbikgPT5cbiAgY3JlYXRlQWN0aW9uKEFjdGlvblR5cGUuQnJvd3NlcldpZHRoQ2hhbmdlZCwgeyBpc1NtYWxsIH0pO1xuXG5leHBvcnQgY29uc3Qgc3BsaXRSYXRpb0NoYW5nZWQgPSAoKSA9PlxuICBjcmVhdGVBY3Rpb24oQWN0aW9uVHlwZS5TcGxpdFJhdGlvQ2hhbmdlZCk7XG5cbmZ1bmN0aW9uIHBhcnNlQ2hhbm5lbChzPzogc3RyaW5nKTogQ2hhbm5lbCB8IG51bGwge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlICdzdGFibGUnOlxuICAgICAgcmV0dXJuIENoYW5uZWwuU3RhYmxlO1xuICAgIGNhc2UgJ2JldGEnOlxuICAgICAgcmV0dXJuIENoYW5uZWwuQmV0YTtcbiAgICBjYXNlICduaWdodGx5JzpcbiAgICAgIHJldHVybiBDaGFubmVsLk5pZ2h0bHk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlTW9kZShzPzogc3RyaW5nKTogTW9kZSB8IG51bGwge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlICdkZWJ1Zyc6XG4gICAgICByZXR1cm4gTW9kZS5EZWJ1ZztcbiAgICBjYXNlICdyZWxlYXNlJzpcbiAgICAgIHJldHVybiBNb2RlLlJlbGVhc2U7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRWRpdGlvbihzPzogc3RyaW5nKTogRWRpdGlvbiB8IG51bGwge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlICcyMDE1JzpcbiAgICAgIHJldHVybiBFZGl0aW9uLlJ1c3QyMDE1O1xuICAgIGNhc2UgJzIwMTgnOlxuICAgICAgcmV0dXJuIEVkaXRpb24uUnVzdDIwMTg7XG4gICAgY2FzZSAnMjAyMSc6XG4gICAgICByZXR1cm4gRWRpdGlvbi5SdXN0MjAyMTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGV4UGFnZUxvYWQoe1xuICBjb2RlLFxuICBnaXN0LFxuICB2ZXJzaW9uLFxuICBtb2RlOiBtb2RlU3RyaW5nLFxuICBlZGl0aW9uOiBlZGl0aW9uU3RyaW5nLFxufTogeyBjb2RlPzogc3RyaW5nLCBnaXN0Pzogc3RyaW5nLCB2ZXJzaW9uPzogc3RyaW5nLCBtb2RlPzogc3RyaW5nLCBlZGl0aW9uPzogc3RyaW5nIH0pOiBUaHVua0FjdGlvbiB7XG4gIHJldHVybiBmdW5jdGlvbihkaXNwYXRjaCkge1xuICAgIGNvbnN0IGNoYW5uZWwgPSBwYXJzZUNoYW5uZWwodmVyc2lvbikgfHwgQ2hhbm5lbC5TdGFibGU7XG4gICAgY29uc3QgbW9kZSA9IHBhcnNlTW9kZShtb2RlU3RyaW5nKSB8fCBNb2RlLkRlYnVnO1xuICAgIGxldCBtYXliZUVkaXRpb24gPSBwYXJzZUVkaXRpb24oZWRpdGlvblN0cmluZyk7XG5cbiAgICBkaXNwYXRjaChuYXZpZ2F0ZVRvSW5kZXgoKSk7XG5cbiAgICBpZiAoY29kZSB8fCBnaXN0KSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGVuc3VyZSB0aGF0IGFueSBsaW5rcyB0aGF0IHByZWRhdGUgdGhlIGV4aXN0ZW5jZVxuICAgICAgLy8gb2YgZWRpdGlvbnMgd2lsbCAqZm9yZXZlciogcGljayAyMDE1LiBIb3dldmVyLCBpZiB3ZSBhcmVuJ3RcbiAgICAgIC8vIGxvYWRpbmcgY29kZSwgdGhlbiBhbGxvdyB0aGUgZWRpdGlvbiB0byByZW1haW4gdGhlIGRlZmF1bHQuXG4gICAgICBpZiAoIW1heWJlRWRpdGlvbikge1xuICAgICAgICBtYXliZUVkaXRpb24gPSBFZGl0aW9uLlJ1c3QyMDE1O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVkaXRpb24gPSBtYXliZUVkaXRpb24gfHwgRWRpdGlvbi5SdXN0MjAyMTtcblxuICAgIGlmIChjb2RlKSB7XG4gICAgICBkaXNwYXRjaChlZGl0Q29kZShjb2RlKSk7XG4gICAgfSBlbHNlIGlmIChnaXN0KSB7XG4gICAgICBkaXNwYXRjaChwZXJmb3JtR2lzdExvYWQoeyBpZDogZ2lzdCwgY2hhbm5lbCwgbW9kZSwgZWRpdGlvbiB9KSk7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2goY2hhbmdlQ2hhbm5lbChjaGFubmVsKSk7XG4gICAgZGlzcGF0Y2goY2hhbmdlTW9kZShtb2RlKSk7XG4gICAgZGlzcGF0Y2goY2hhbmdlRWRpdGlvbihlZGl0aW9uKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWxwUGFnZUxvYWQoKSB7XG4gIHJldHVybiBuYXZpZ2F0ZVRvSGVscCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0V4YW1wbGUoY29kZTogc3RyaW5nKTogVGh1bmtBY3Rpb24ge1xuICByZXR1cm4gZnVuY3Rpb24oZGlzcGF0Y2gpIHtcbiAgICBkaXNwYXRjaChuYXZpZ2F0ZVRvSW5kZXgoKSk7XG4gICAgZGlzcGF0Y2goZWRpdENvZGUoY29kZSkpO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb24gPVxuICB8IFJldHVyblR5cGU8dHlwZW9mIGluaXRpYWxpemVBcHBsaWNhdGlvbj5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBkaXNhYmxlU3luY0NoYW5nZXNUb1N0b3JhZ2U+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0UGFnZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VQYWlyQ2hhcmFjdGVycz5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VBc3NlbWJseUZsYXZvcj5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VCYWNrdHJhY2U+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgY2hhbmdlQ2hhbm5lbD5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VEZW1hbmdsZUFzc2VtYmx5PlxuICB8IFJldHVyblR5cGU8dHlwZW9mIGNoYW5nZUVkaXRpb24+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgY2hhbmdlRWRpdG9yPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIGNoYW5nZUZvY3VzPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIGNoYW5nZUtleWJpbmRpbmc+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgY2hhbmdlTW9kZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VPcmllbnRhdGlvbj5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VQcmltYXJ5QWN0aW9uPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIGNoYW5nZVByb2Nlc3NBc3NlbWJseT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VBY2VUaGVtZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VNb25hY29UaGVtZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZXF1ZXN0Q29tcGlsZUFzc2VtYmx5PlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDb21waWxlQXNzZW1ibHlTdWNjZXNzPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDb21waWxlQXNzZW1ibHlGYWlsdXJlPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlcXVlc3RDb21waWxlTGx2bUlyPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDb21waWxlTGx2bUlyU3VjY2Vzcz5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZWNlaXZlQ29tcGlsZUxsdm1JckZhaWx1cmU+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgcmVxdWVzdENvbXBpbGVNaXI+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgcmVjZWl2ZUNvbXBpbGVNaXJTdWNjZXNzPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDb21waWxlTWlyRmFpbHVyZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZXF1ZXN0Q29tcGlsZUhpcj5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZWNlaXZlQ29tcGlsZUhpclN1Y2Nlc3M+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgcmVjZWl2ZUNvbXBpbGVIaXJGYWlsdXJlPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlcXVlc3RDb21waWxlV2FzbT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZWNlaXZlQ29tcGlsZVdhc21TdWNjZXNzPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDb21waWxlV2FzbUZhaWx1cmU+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgZWRpdENvZGU+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgYWRkTWFpbkZ1bmN0aW9uPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIGFkZEltcG9ydD5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBlbmFibGVGZWF0dXJlR2F0ZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBnb3RvUG9zaXRpb24+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2VsZWN0VGV4dD5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZXF1ZXN0Q2xpcHB5PlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDbGlwcHlTdWNjZXNzPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVDbGlwcHlGYWlsdXJlPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlcXVlc3RNaXJpPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVNaXJpU3VjY2Vzcz5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZWNlaXZlTWlyaUZhaWx1cmU+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgcmVxdWVzdE1hY3JvRXhwYW5zaW9uPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIHJlY2VpdmVNYWNyb0V4cGFuc2lvblN1Y2Nlc3M+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgcmVjZWl2ZU1hY3JvRXhwYW5zaW9uRmFpbHVyZT5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZXF1ZXN0Q3JhdGVzTG9hZD5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZWNlaXZlQ3JhdGVzTG9hZFN1Y2Nlc3M+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2YgcmVxdWVzdFZlcnNpb25zTG9hZD5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiByZWNlaXZlVmVyc2lvbnNMb2FkU3VjY2Vzcz5cbiAgfCBSZXR1cm5UeXBlPHR5cGVvZiBub3RpZmljYXRpb25TZWVuPlxuICB8IFJldHVyblR5cGU8dHlwZW9mIGJyb3dzZXJXaWR0aENoYW5nZWQ+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc3BsaXRSYXRpb0NoYW5nZWQ+XG4gIHwgUmV0dXJuVHlwZTx0eXBlb2Ygd3NFeGVjdXRlUmVxdWVzdD5cbiAgO1xuIiwiaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBjb25maWd1cmVTdG9yZSBhcyByZWR1eENvbmZpZ3VyZVN0b3JlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQgeyBwcm9kdWNlIH0gZnJvbSAnaW1tZXInO1xuaW1wb3J0IHR5cGUge30gZnJvbSAncmVkdXgtdGh1bmsvZXh0ZW5kLXJlZHV4JztcblxuaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcGxpY2F0aW9uIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCBpbml0aWFsaXplTG9jYWxTdG9yYWdlIGZyb20gJy4vbG9jYWxfc3RvcmFnZSc7XG5pbXBvcnQgaW5pdGlhbGl6ZVNlc3Npb25TdG9yYWdlIGZyb20gJy4vc2Vzc2lvbl9zdG9yYWdlJztcbmltcG9ydCB7IHdlYnNvY2tldE1pZGRsZXdhcmUgfSBmcm9tICcuL3dlYnNvY2tldE1pZGRsZXdhcmUnO1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKHdpbmRvdzogV2luZG93KSB7XG4gIGNvbnN0IGJhc2VVcmwgPSBuZXcgVVJMKCcvJywgd2luZG93LmxvY2F0aW9uLmhyZWYpLmhyZWY7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHdlYnNvY2tldE1pZGRsZXdhcmUod2luZG93KTtcblxuICBjb25zdCBpbml0aWFsR2xvYmFsU3RhdGUgPSB7XG4gICAgZ2xvYmFsQ29uZmlndXJhdGlvbjoge1xuICAgICAgYmFzZVVybCxcbiAgICB9LFxuICB9O1xuICBjb25zdCBpbml0aWFsQXBwU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgaW5pdGlhbGl6ZUFwcGxpY2F0aW9uKCkpO1xuXG4gIGNvbnN0IGxvY2FsU3RvcmFnZSA9IGluaXRpYWxpemVMb2NhbFN0b3JhZ2UoKTtcbiAgY29uc3Qgc2Vzc2lvblN0b3JhZ2UgPSBpbml0aWFsaXplU2Vzc2lvblN0b3JhZ2UoKTtcblxuICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHByb2R1Y2UoaW5pdGlhbEFwcFN0YXRlLCAoaW5pdGlhbEFwcFN0YXRlKSA9PiBtZXJnZShcbiAgICBpbml0aWFsQXBwU3RhdGUsXG4gICAgaW5pdGlhbEdsb2JhbFN0YXRlLFxuICAgIGxvY2FsU3RvcmFnZS5pbml0aWFsU3RhdGUsXG4gICAgc2Vzc2lvblN0b3JhZ2UuaW5pdGlhbFN0YXRlLFxuICApKTtcblxuICBjb25zdCBzdG9yZSA9IHJlZHV4Q29uZmlndXJlU3RvcmUoe1xuICAgIHJlZHVjZXIsXG4gICAgcHJlbG9hZGVkU3RhdGUsXG4gICAgbWlkZGxld2FyZTogKGdldERlZmF1bHRNaWRkbGV3YXJlKSA9PiBnZXREZWZhdWx0TWlkZGxld2FyZSgpLmNvbmNhdCh3ZWJzb2NrZXQpLFxuICB9KVxuXG4gIHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgLy8gU29tZSBhdXRvbWF0ZWQgdGVzdHMgcnVuIGZhc3QgZW5vdWdoIHRoYXQgdGhlIGZvbGxvd2luZyBpbnRlcmxlYXZpbmcgaXMgcG9zc2libGU6XG4gICAgLy9cbiAgICAvLyAxLiBSU3BlYyB0ZXN0IGZpbmlzaGVzLCBsb2NhbC9zZXNzaW9uIHN0b3JhZ2UgY2xlYXJlZFxuICAgIC8vIDIuIFdlYlNvY2tldCBjb25uZWN0cywgdGhlIHN0YXRlIHVwZGF0ZXMsIGFuZCB0aGUgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGlzIHNhdmVkXG4gICAgLy8gMy4gU3Vic2VxdWVudCBSU3BlYyB0ZXN0IHN0YXJ0cyBhbmQgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlIGhhcyBiZWVuIHByZXNlcnZlZFxuICAgIC8vXG4gICAgLy8gV2UgYWxsb3cgdGhlIHRlc3RzIHRvIHN0b3Agc2F2aW5nIHRvIHNpZGVzdGVwIHRoYXQuXG4gICAgaWYgKHN0YXRlLmdsb2JhbENvbmZpZ3VyYXRpb24uc3luY0NoYW5nZXNUb1N0b3JhZ2UpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zYXZlQ2hhbmdlcyhzdGF0ZSk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zYXZlQ2hhbmdlcyhzdGF0ZSk7XG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBzdG9yZTtcbn1cblxuZXhwb3J0IHR5cGUgQXBwRGlzcGF0Y2ggPSBSZXR1cm5UeXBlPHR5cGVvZiBjb25maWd1cmVTdG9yZT5bJ2Rpc3BhdGNoJ107XG5leHBvcnQgY29uc3QgdXNlQXBwRGlzcGF0Y2ggPSAoKSA9PiB1c2VEaXNwYXRjaDxBcHBEaXNwYXRjaD4oKVxuIiwiaW1wb3J0IFJlYWN0LCB7IFN1c3BlbnNlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBzdXNwZW5kIH0gZnJvbSAnc3VzcGVuZC1yZWFjdCc7XG5cbmltcG9ydCB7XG4gIGFjZUtleWJpbmRpbmcsXG4gIGFjZVBhaXJDaGFyYWN0ZXJzLFxuICBhY2VSZXNpemVLZXksXG4gIGFjZVRoZW1lLFxuICBvZmZlckNyYXRlQXV0b2NvbXBsZXRlT25Vc2UsXG59IGZyb20gJy4uL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBDb21tb25FZGl0b3JQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgQWNlRWRpdG9yRGVwZW5kZW5jaWVzOiBSZWFjdC5GQzx7XG4gIGtleWJpbmRpbmc6IHN0cmluZztcbiAgdGhlbWU6IHN0cmluZztcbn0+ID0gKHsga2V5YmluZGluZywgdGhlbWUgfSkgPT4ge1xuICBzdXNwZW5kKFxuICAgIGFzeW5jIChrZXliaW5kaW5nLCB0aGVtZSkgPT4ge1xuICAgICAgY29uc3QgeyBpbXBvcnRLZXliaW5kaW5nLCBpbXBvcnRUaGVtZSB9ID0gYXdhaXQgaW1wb3J0KCcuL0FjZUVkaXRvckNvcmUnKTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbaW1wb3J0S2V5YmluZGluZyhrZXliaW5kaW5nKSwgaW1wb3J0VGhlbWUodGhlbWUpXSk7XG4gICAgfSxcbiAgICBba2V5YmluZGluZywgdGhlbWUsICdBY2VFZGl0b3JEZXBlbmRlbmNpZXMnXSxcbiAgKTtcblxuICByZXR1cm4gPD48Lz47XG59O1xuXG5jb25zdCBBY2VFZGl0b3JMYXp5ID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoJy4vQWNlRWRpdG9yQ29yZScpKTtcblxuLy8gVGhlIEFDRSBlZGl0b3Igd2VpZ2hzIGluIGF0IH4yNTBLLiBBZGRpbmcgYWxsIG9mIHRoZSB0aGVtZXMgYW5kIHRoZVxuLy8gKHN1cnByaXNpbmdseSBjaHVua3kpIGtleWJpbmRpbmdzLCBpdCdzIG5vdCB0aGF0IGZhciBvZmYgZnJvbSA1MDBLIVxuLy9cbi8vIFRvIGdpdmUgYmV0dGVyIGluaXRpYWwgbG9hZCBwZXJmb3JtYW5jZSwgd2Ugc3BsaXQgdGhlIGVkaXRvciBpbnRvIGFcbi8vIHNlcGFyYXRlIGNodW5rLiBBcyB5b3UgdXN1YWxseSBvbmx5IHdhbnQgb25lIG9mIGVhY2ggdGhlbWUgYW5kXG4vLyBrZXliaW5kaW5nLCB0aGV5IGNhbiBhbHNvIGJlIHNwbGl0LCByZWR1Y2luZyB0aGUgdG90YWwgc2l6ZVxuLy8gdHJhbnNmZXJyZWQuXG4vL1xuLy8gVGhpcyBhbHNvIGhhcyBzb21lIGJlbmVmaXQgaWYgeW91IGNob29zZSB0byB1c2UgdGhlIHNpbXBsZSBlZGl0b3IsXG4vLyBhcyBBQ0Ugc2hvdWxkIG5ldmVyIGJlIGxvYWRlZC5cbi8vXG4vLyBUaGVtZXMgYW5kIGtleWJpbmRpbmdzIGNhbiBiZSBjaGFuZ2VkIGF0IHJ1bnRpbWUuXG5jb25zdCBBY2VFZGl0b3JBc3luYzogUmVhY3QuRkM8Q29tbW9uRWRpdG9yUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHJlc2l6ZUtleSA9IHVzZVNlbGVjdG9yKGFjZVJlc2l6ZUtleSk7XG4gIGNvbnN0IGF1dG9jb21wbGV0ZU9uVXNlID0gdXNlU2VsZWN0b3Iob2ZmZXJDcmF0ZUF1dG9jb21wbGV0ZU9uVXNlKTtcbiAgY29uc3Qga2V5YmluZGluZyA9IHVzZVNlbGVjdG9yKGFjZUtleWJpbmRpbmcpO1xuICBjb25zdCBwYWlyQ2hhcmFjdGVycyA9IHVzZVNlbGVjdG9yKGFjZVBhaXJDaGFyYWN0ZXJzKTtcbiAgY29uc3QgdGhlbWUgPSB1c2VTZWxlY3RvcihhY2VUaGVtZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3VzcGVuc2UgZmFsbGJhY2s9eydMb2FkaW5nIHRoZSBBQ0UgZWRpdG9yLi4uJ30+XG4gICAgICA8QWNlRWRpdG9yRGVwZW5kZW5jaWVzIGtleWJpbmRpbmc9e2tleWJpbmRpbmd9IHRoZW1lPXt0aGVtZX0gLz5cbiAgICAgIDxBY2VFZGl0b3JMYXp5XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgYXV0b2NvbXBsZXRlT25Vc2U9e2F1dG9jb21wbGV0ZU9uVXNlfVxuICAgICAgICBrZXliaW5kaW5nPXtrZXliaW5kaW5nfVxuICAgICAgICBwYWlyQ2hhcmFjdGVycz17cGFpckNoYXJhY3RlcnN9XG4gICAgICAgIHJlc2l6ZUtleT17cmVzaXplS2V5fVxuICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAvPlxuICAgIDwvU3VzcGVuc2U+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY2VFZGl0b3JBc3luYztcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgdXNlQXBwRGlzcGF0Y2ggfSBmcm9tICcuLi9jb25maWd1cmVTdG9yZSc7XG5cbmltcG9ydCBBY2VFZGl0b3IgZnJvbSAnLi9BY2VFZGl0b3InO1xuaW1wb3J0IFNpbXBsZUVkaXRvciBmcm9tICcuL1NpbXBsZUVkaXRvcic7XG5pbXBvcnQgTW9uYWNvRWRpdG9yIGZyb20gJy4vTW9uYWNvRWRpdG9yJztcbmltcG9ydCB7IEVkaXRvciBhcyBFZGl0b3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY29kZVNlbGVjdG9yLCBwb3NpdGlvblNlbGVjdG9yLCBzZWxlY3Rpb25TZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uL3JlZHVjZXJzJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0VkaXRvci5tb2R1bGUuY3NzJztcblxuY29uc3QgZWRpdG9yTWFwID0ge1xuICBbRWRpdG9yVHlwZS5TaW1wbGVdOiBTaW1wbGVFZGl0b3IsXG4gIFtFZGl0b3JUeXBlLkFjZV06IEFjZUVkaXRvcixcbiAgW0VkaXRvclR5cGUuTW9uYWNvXTogTW9uYWNvRWRpdG9yLFxufTtcblxuY29uc3QgRWRpdG9yOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgY29kZSA9IHVzZVNlbGVjdG9yKGNvZGVTZWxlY3Rvcik7XG4gIGNvbnN0IGVkaXRvciA9IHVzZVNlbGVjdG9yKChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbmZpZ3VyYXRpb24uZWRpdG9yKTtcbiAgY29uc3QgcG9zaXRpb24gPSB1c2VTZWxlY3Rvcihwb3NpdGlvblNlbGVjdG9yKTtcbiAgY29uc3Qgc2VsZWN0aW9uID0gdXNlU2VsZWN0b3Ioc2VsZWN0aW9uU2VsZWN0b3IpO1xuICBjb25zdCBjcmF0ZXMgPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5jcmF0ZXMpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlQXBwRGlzcGF0Y2goKTtcbiAgY29uc3QgZXhlY3V0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKGFjdGlvbnMucGVyZm9ybVByaW1hcnlBY3Rpb24oKSksIFtkaXNwYXRjaF0pO1xuICBjb25zdCBvbkVkaXRDb2RlID0gdXNlQ2FsbGJhY2soKGM6IHN0cmluZykgPT4gZGlzcGF0Y2goYWN0aW9ucy5lZGl0Q29kZShjKSksIFtkaXNwYXRjaF0pO1xuXG4gIGNvbnN0IFNlbGVjdGVkRWRpdG9yID0gZWRpdG9yTWFwW2VkaXRvcl07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICA8U2VsZWN0ZWRFZGl0b3IgY29kZT17Y29kZX1cbiAgICAgICAgcG9zaXRpb249e3Bvc2l0aW9ufVxuICAgICAgICBzZWxlY3Rpb249e3NlbGVjdGlvbn1cbiAgICAgICAgY3JhdGVzPXtjcmF0ZXN9XG4gICAgICAgIG9uRWRpdENvZGU9e29uRWRpdENvZGV9XG4gICAgICAgIGV4ZWN1dGU9e2V4ZWN1dGV9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3I7XG4iLCJpbXBvcnQgUmVhY3QsIHsgU3VzcGVuc2UgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENvbW1vbkVkaXRvclByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBNb25hY29FZGl0b3JMYXp5ID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoJy4vTW9uYWNvRWRpdG9yQ29yZScpKTtcblxuY29uc3QgTW9uYWNvRWRpdG9yOiBSZWFjdC5GQzxDb21tb25FZGl0b3JQcm9wcz4gPSBwcm9wcyA9PiAoXG4gIDxTdXNwZW5zZSBmYWxsYmFjaz17J0xvYWRpbmcnfT5cbiAgICA8TW9uYWNvRWRpdG9yTGF6eSB7Li4ucHJvcHN9IC8+XG4gIDwvU3VzcGVuc2U+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE1vbmFjb0VkaXRvcjtcbiIsImltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ29tbW9uRWRpdG9yUHJvcHMsIFBvc2l0aW9uLCBTZWxlY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FZGl0b3IubW9kdWxlLmNzcyc7XG5cbmNsYXNzIENvZGVCeXRlT2Zmc2V0cyB7XG4gIHJlYWRvbmx5IGNvZGU6IHN0cmluZztcbiAgcmVhZG9ubHkgbGluZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGNvZGU6IHN0cmluZykge1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgdGhpcy5saW5lcyA9IGNvZGUuc3BsaXQoJ1xcbicpO1xuICB9XG5cbiAgcHVibGljIGxpbmVUb09mZnNldHMobGluZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcHJlY2VkaW5nQnl0ZXMgPSB0aGlzLmJ5dGVzQmVmb3JlTGluZShsaW5lKTtcblxuICAgIGNvbnN0IGhpZ2hsaWdodGVkTGluZSA9IHRoaXMubGluZXNbbGluZV07XG4gICAgY29uc3QgaGlnaGxpZ2h0ZWRCeXRlcyA9IGhpZ2hsaWdodGVkTGluZS5sZW5ndGg7XG5cbiAgICByZXR1cm4gW3ByZWNlZGluZ0J5dGVzLCBwcmVjZWRpbmdCeXRlcyArIGhpZ2hsaWdodGVkQnl0ZXNdO1xuICB9XG5cbiAgcHVibGljIHJhbmdlVG9PZmZzZXRzKHN0YXJ0OiBQb3NpdGlvbiwgZW5kOiBQb3NpdGlvbikge1xuICAgIGNvbnN0IHN0YXJ0Qnl0ZXMgPSB0aGlzLnBvc2l0aW9uVG9CeXRlcyhzdGFydCk7XG4gICAgY29uc3QgZW5kQnl0ZXMgPSB0aGlzLnBvc2l0aW9uVG9CeXRlcyhlbmQpO1xuICAgIHJldHVybiBbc3RhcnRCeXRlcywgZW5kQnl0ZXNdO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvblRvQnl0ZXMocG9zaXRpb246IFBvc2l0aW9uKSB7XG4gICAgLy8gU3VidHJhY3Qgb25lIGFzIHRoaXMgbG9naWMgaXMgemVyby1iYXNlZCBhbmQgdGhlIGNvbHVtbnMgYXJlIG9uZS1iYXNlZFxuICAgIHJldHVybiB0aGlzLmJ5dGVzQmVmb3JlTGluZShwb3NpdGlvbi5saW5lKSArIHBvc2l0aW9uLmNvbHVtbiAtIDE7XG4gIH1cblxuICBwcml2YXRlIGJ5dGVzQmVmb3JlTGluZShsaW5lOiBudW1iZXIpIHtcbiAgICAvLyBTdWJ0cmFjdCBvbmUgYXMgdGhpcyBsb2dpYyBpcyB6ZXJvLWJhc2VkIGFuZCB0aGUgbGluZXMgYXJlIG9uZS1iYXNlZFxuICAgIGxpbmUgLT0gMTtcblxuICAgIGNvbnN0IHByZWNlZGluZ0xpbmVzID0gdGhpcy5saW5lcy5zbGljZSgwLCBsaW5lKTtcblxuICAgIC8vIEFkZCBvbmUgdG8gYWNjb3VudCBmb3IgdGhlIG5ld2xpbmUgd2Ugc3BsaXQgb24gYW5kIHJlbW92ZWRcbiAgICByZXR1cm4gcHJlY2VkaW5nTGluZXMubWFwKChsKSA9PiBsLmxlbmd0aCArIDEpLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuICB9XG59XG5cbmNsYXNzIFNpbXBsZUVkaXRvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8Q29tbW9uRWRpdG9yUHJvcHM+IHtcbiAgcHJpdmF0ZSBfZWRpdG9yOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZTogUmVhY3QuQ2hhbmdlRXZlbnRIYW5kbGVyPEhUTUxUZXh0QXJlYUVsZW1lbnQ+ID0gKGUpID0+XG4gICAgdGhpcy5wcm9wcy5vbkVkaXRDb2RlKGUudGFyZ2V0LnZhbHVlKTtcbiAgcHJpdmF0ZSB0cmFja0VkaXRvcjogUmVhY3QuUmVmQ2FsbGJhY2s8SFRNTFRleHRBcmVhRWxlbWVudD4gPSAoY29tcG9uZW50KSA9PlxuICAgICh0aGlzLl9lZGl0b3IgPSBjb21wb25lbnQpO1xuICBwcml2YXRlIG9uS2V5RG93bjogUmVhY3QuS2V5Ym9hcmRFdmVudEhhbmRsZXI8SFRNTFRleHRBcmVhRWxlbWVudD4gPSAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHtcbiAgICAgIHRoaXMucHJvcHMuZXhlY3V0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgcmVmPXt0aGlzLnRyYWNrRWRpdG9yfVxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5zaW1wbGV9XG4gICAgICAgIG5hbWU9XCJlZGl0b3Itc2ltcGxlXCJcbiAgICAgICAgYXV0b0NhcGl0YWxpemU9XCJub25lXCJcbiAgICAgICAgYXV0b0NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgYXV0b0NvcnJlY3Q9XCJvZmZcIlxuICAgICAgICBzcGVsbENoZWNrPXtmYWxzZX1cbiAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY29kZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5vbktleURvd259XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogQ29tbW9uRWRpdG9yUHJvcHMpIHtcbiAgICB0aGlzLmdvdG9Qb3NpdGlvbihwcmV2UHJvcHMucG9zaXRpb24sIHRoaXMucHJvcHMucG9zaXRpb24pO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9uKHByZXZQcm9wcy5zZWxlY3Rpb24sIHRoaXMucHJvcHMuc2VsZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ290b1Bvc2l0aW9uKG9sZFBvc2l0aW9uOiBQb3NpdGlvbiwgbmV3UG9zaXRpb246IFBvc2l0aW9uKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuXG4gICAgaWYgKCFuZXdQb3NpdGlvbiB8fCAhZWRpdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0VxdWFsKG5ld1Bvc2l0aW9uLCBvbGRQb3NpdGlvbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXRzID0gbmV3IENvZGVCeXRlT2Zmc2V0cyh0aGlzLnByb3BzLmNvZGUpO1xuICAgIGNvbnN0IFtzdGFydEJ5dGVzLCBlbmRCeXRlc10gPSBvZmZzZXRzLmxpbmVUb09mZnNldHMobmV3UG9zaXRpb24ubGluZSk7XG5cbiAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICBlZGl0b3Iuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnRCeXRlcywgZW5kQnl0ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTZWxlY3Rpb24ob2xkU2VsZWN0aW9uOiBTZWxlY3Rpb24sIG5ld1NlbGVjdGlvbjogU2VsZWN0aW9uKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuXG4gICAgaWYgKCFuZXdTZWxlY3Rpb24gfHwgIW5ld1NlbGVjdGlvbi5zdGFydCB8fCAhbmV3U2VsZWN0aW9uLmVuZCB8fCAhZWRpdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0VxdWFsKG5ld1NlbGVjdGlvbiwgb2xkU2VsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9mZnNldHMgPSBuZXcgQ29kZUJ5dGVPZmZzZXRzKHRoaXMucHJvcHMuY29kZSk7XG4gICAgY29uc3QgW3N0YXJ0Qnl0ZXMsIGVuZEJ5dGVzXSA9IG9mZnNldHMucmFuZ2VUb09mZnNldHMobmV3U2VsZWN0aW9uLnN0YXJ0LCBuZXdTZWxlY3Rpb24uZW5kKTtcblxuICAgIGVkaXRvci5mb2N1cygpO1xuICAgIGVkaXRvci5zZXRTZWxlY3Rpb25SYW5nZShzdGFydEJ5dGVzLCBlbmRCeXRlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlRWRpdG9yO1xuIiwiaW1wb3J0IFByaXNtIGZyb20gJ3ByaXNtanMnO1xuaW1wb3J0IHsgQ2hhbm5lbCwgbWFrZVBvc2l0aW9uLCBQb3NpdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgQ29uZmlndXJlUnVzdEVycm9yc0FyZ3Mge1xuICBlbmFibGVGZWF0dXJlR2F0ZTogKGZlYXR1cmU6IHN0cmluZykgPT4gdm9pZDtcbiAgZ2V0Q2hhbm5lbDogKCkgPT4gQ2hhbm5lbDtcbiAgZ290b1Bvc2l0aW9uOiAobGluZTogc3RyaW5nIHwgbnVtYmVyLCBjb2x1bW46IHN0cmluZyB8IG51bWJlcikgPT4gdm9pZDtcbiAgc2VsZWN0VGV4dDogKHN0YXJ0OiBQb3NpdGlvbiwgZW5kOiBQb3NpdGlvbikgPT4gdm9pZDtcbiAgYWRkSW1wb3J0OiAoY29kZTogc3RyaW5nKSA9PiB2b2lkO1xuICByZUV4ZWN1dGVXaXRoQmFja3RyYWNlOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlUnVzdEVycm9ycyh7XG4gIGVuYWJsZUZlYXR1cmVHYXRlLFxuICBnZXRDaGFubmVsLFxuICBnb3RvUG9zaXRpb24sXG4gIHNlbGVjdFRleHQsXG4gIGFkZEltcG9ydCxcbiAgcmVFeGVjdXRlV2l0aEJhY2t0cmFjZSxcbn06IENvbmZpZ3VyZVJ1c3RFcnJvcnNBcmdzKSB7XG4gIFByaXNtLmxhbmd1YWdlcy5ydXN0X2Vycm9ycyA9IHtcbiAgICAnd2FybmluZyc6IHtcbiAgICAgIHBhdHRlcm46IC9ed2FybmluZyhcXFtFXFxkK1xcXSk/Oi4qJC9tLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdlcnJvci1leHBsYW5hdGlvbic6IC9cXFtFXFxkK1xcXS8sXG4gICAgICB9LFxuICAgIH0sXG4gICAgJ2Vycm9yJzoge1xuICAgICAgcGF0dGVybjogL15lcnJvcihcXFtFXFxkK1xcXSk/Oi4qJC9tLFxuICAgICAgaW5zaWRlOiB7XG4gICAgICAgICdlcnJvci1leHBsYW5hdGlvbic6IC9cXFtFXFxkK1xcXS8sXG4gICAgICB9LFxuICAgIH0sXG4gICAgJ25vdGUnOiB7XG4gICAgICBwYXR0ZXJuOiAvXlxccyo9XFxzKm5vdGU6LiokL20sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ3NlZS1pc3N1ZSc6IC9zZWUgLipydXN0LWxhbmdcXC9ydXN0XFwvaXNzdWVzXFwvXFxkKz4vLFxuICAgICAgfSxcbiAgICB9LFxuICAgICdlcnJvci1sb2NhdGlvbic6IC8tLT5cXHMrKFxcL3BsYXlncm91bmRcXC8pP3NyY1xcLy4qXFxuLyxcbiAgICAnaW1wb3J0LXN1Z2dlc3Rpb24tb3V0ZXInOiB7XG4gICAgICBwYXR0ZXJuOiAvXFwrXFxzK3VzZVxccysoW147XSspOy8sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2ltcG9ydC1zdWdnZXN0aW9uJzogL3VzZVxccysuKi8sXG4gICAgICB9LFxuICAgIH0sXG4gICAgJ3J1c3QtZXJyb3JzLWhlbHAnOiB7XG4gICAgICBwYXR0ZXJuOiAvaGVscDouKlxcbi8sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2ZlYXR1cmUtZ2F0ZSc6IC9hZGQgYCNcXCFcXFtmZWF0dXJlXFwoLis/XFwpXFxdYC8sXG4gICAgICB9LFxuICAgIH0sXG4gICAgJ2JhY2t0cmFjZSc6IHtcbiAgICAgIHBhdHRlcm46IC9hdCBcXC5cXC9zcmNcXC8uKlxcbi8sXG4gICAgICBpbnNpZGU6IHtcbiAgICAgICAgJ2JhY2t0cmFjZS1sb2NhdGlvbic6IC9zcmNcXC9tYWluLnJzOihcXGQrKS8sXG4gICAgICB9LFxuICAgIH0sXG4gICAgJ2JhY2t0cmFjZS1lbmFibGUnOiAvUnVuIHdpdGggYFJVU1RfQkFDS1RSQUNFPTFgIGVudmlyb25tZW50IHZhcmlhYmxlIHRvIGRpc3BsYXkgYSBiYWNrdHJhY2UvaSxcbiAgfTtcblxuICBQcmlzbS5sYW5ndWFnZXMucnVzdF9taXIgPSB7XG4gICAgJ21pci1zb3VyY2UnOiAvc3JjXFwvW0EtWmEtejAtOV8uXFwtXStcXC5yczpcXGQrOlxcZCs6IFxcZCs6XFxkKy8sXG4gIH1cblxuICBQcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBlbnYgPT4ge1xuICAgIGlmIChlbnYudHlwZSA9PT0gJ2Vycm9yLWV4cGxhbmF0aW9uJykge1xuICAgICAgY29uc3QgZXJyb3JNYXRjaCA9IC9FXFxkKy8uZXhlYyhlbnYuY29udGVudCk7XG4gICAgICBpZiAoZXJyb3JNYXRjaCkge1xuICAgICAgICBjb25zdCBbZXJyb3JDb2RlXSA9IGVycm9yTWF0Y2g7XG4gICAgICAgIGVudi50YWcgPSAnYSc7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzLmhyZWYgPSBgaHR0cHM6Ly9kb2MucnVzdC1sYW5nLm9yZy8ke2dldENoYW5uZWwoKX0vZXJyb3JfY29kZXMvJHtlcnJvckNvZGV9Lmh0bWxgO1xuICAgICAgICBlbnYuYXR0cmlidXRlcy50YXJnZXQgPSAnX2JsYW5rJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVudi50eXBlID09PSAnc2VlLWlzc3VlJykge1xuICAgICAgY29uc3QgZXJyb3JNYXRjaCA9IC9cXGQrLy5leGVjKGVudi5jb250ZW50KTtcbiAgICAgIGlmIChlcnJvck1hdGNoKSB7XG4gICAgICAgIGNvbnN0IFtlcnJvckNvZGVdID0gZXJyb3JNYXRjaDtcbiAgICAgICAgZW52LnRhZyA9ICdhJztcbiAgICAgICAgZW52LmF0dHJpYnV0ZXMuaHJlZiA9IGBodHRwczovL2dpdGh1Yi5jb20vcnVzdC1sYW5nL3J1c3QvaXNzdWVzLyR7ZXJyb3JDb2RlfWA7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW52LnR5cGUgPT09ICdlcnJvci1sb2NhdGlvbicpIHtcbiAgICAgIGxldCBsaW5lO1xuICAgICAgbGV0IGNvbDtcbiAgICAgIGNvbnN0IGVycm9yTWF0Y2hGdWxsID0gLyhcXGQrKTooXFxkKykvLmV4ZWMoZW52LmNvbnRlbnQpO1xuICAgICAgaWYgKGVycm9yTWF0Y2hGdWxsKSB7XG4gICAgICAgIGxpbmUgPSBlcnJvck1hdGNoRnVsbFsxXTtcbiAgICAgICAgY29sID0gZXJyb3JNYXRjaEZ1bGxbMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvck1hdGNoU2hvcnQgPSAvOihcXGQrKS8uZXhlYyhlbnYuY29udGVudCk7XG4gICAgICAgIGlmIChlcnJvck1hdGNoU2hvcnQpIHtcbiAgICAgICAgICBsaW5lID0gZXJyb3JNYXRjaFNob3J0WzFdO1xuICAgICAgICAgIGNvbCA9ICcxJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZW52LnRhZyA9ICdhJztcbiAgICAgIGVudi5hdHRyaWJ1dGVzLmhyZWYgPSAnIyc7XG4gICAgICBpZiAobGluZSAmJiBjb2wpIHtcbiAgICAgICAgZW52LmF0dHJpYnV0ZXNbJ2RhdGEtbGluZSddID0gbGluZTtcbiAgICAgICAgZW52LmF0dHJpYnV0ZXNbJ2RhdGEtY29sJ10gPSBjb2w7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbnYudHlwZSA9PT0gJ2ltcG9ydC1zdWdnZXN0aW9uJykge1xuICAgICAgZW52LnRhZyA9ICdhJztcbiAgICAgIGVudi5hdHRyaWJ1dGVzLmhyZWYgPSAnIyc7XG4gICAgICBlbnYuYXR0cmlidXRlc1snZGF0YS1zdWdnZXN0aW9uJ10gPSBlbnYuY29udGVudDtcbiAgICB9XG4gICAgaWYgKGVudi50eXBlID09PSAnZmVhdHVyZS1nYXRlJykge1xuICAgICAgY29uc3QgZmVhdHVyZU1hdGNoID0gL2ZlYXR1cmVcXCgoLio/KVxcKS8uZXhlYyhlbnYuY29udGVudCk7XG4gICAgICBpZiAoZmVhdHVyZU1hdGNoKSB7XG4gICAgICAgIGNvbnN0IFtfLCBmZWF0dXJlR2F0ZV0gPSBmZWF0dXJlTWF0Y2g7XG4gICAgICAgIGVudi50YWcgPSAnYSc7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzLmhyZWYgPSAnIyc7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzWydkYXRhLWZlYXR1cmUtZ2F0ZSddID0gZmVhdHVyZUdhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbnYudHlwZSA9PT0gJ2JhY2t0cmFjZS1lbmFibGUnKSB7XG4gICAgICBlbnYudGFnID0gJ2EnO1xuICAgICAgZW52LmF0dHJpYnV0ZXMuaHJlZiA9ICcjJztcbiAgICAgIGVudi5hdHRyaWJ1dGVzWydkYXRhLWJhY2t0cmFjZS1lbmFibGUnXSA9ICd0cnVlJztcbiAgICB9XG4gICAgaWYgKGVudi50eXBlID09PSAnYmFja3RyYWNlLWxvY2F0aW9uJykge1xuICAgICAgY29uc3QgZXJyb3JNYXRjaCA9IC86KFxcZCspLy5leGVjKGVudi5jb250ZW50KTtcbiAgICAgIGlmIChlcnJvck1hdGNoKSB7XG4gICAgICAgIGNvbnN0IFtfLCBsaW5lXSA9IGVycm9yTWF0Y2g7XG4gICAgICAgIGVudi50YWcgPSAnYSc7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzLmhyZWYgPSAnIyc7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzWydkYXRhLWxpbmUnXSA9IGxpbmU7XG4gICAgICAgIGVudi5hdHRyaWJ1dGVzWydkYXRhLWNvbCddID0gJzEnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW52LnR5cGUgPT09ICdtaXItc291cmNlJykge1xuICAgICAgY29uc3QgbGluZU1hdGNoID0gLyhcXGQrKTooXFxkKyk6IChcXGQrKTooXFxkKykvLmV4ZWMoZW52LmNvbnRlbnQpO1xuICAgICAgaWYgKGxpbmVNYXRjaCkge1xuICAgICAgICBjb25zdCBbXywgc3RhcnRMaW5lLCBzdGFydENvbCwgZW5kTGluZSwgZW5kQ29sXSA9IGxpbmVNYXRjaDtcbiAgICAgICAgZW52LnRhZyA9ICdhJztcbiAgICAgICAgZW52LmF0dHJpYnV0ZXMuaHJlZiA9ICcjJztcbiAgICAgICAgZW52LmF0dHJpYnV0ZXNbJ2RhdGEtc3RhcnQtbGluZSddID0gc3RhcnRMaW5lO1xuICAgICAgICBlbnYuYXR0cmlidXRlc1snZGF0YS1zdGFydC1jb2wnXSA9IHN0YXJ0Q29sO1xuICAgICAgICBlbnYuYXR0cmlidXRlc1snZGF0YS1lbmQtbGluZSddID0gZW5kTGluZTtcbiAgICAgICAgZW52LmF0dHJpYnV0ZXNbJ2RhdGEtZW5kLWNvbCddID0gZW5kQ29sO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgUHJpc20uaG9va3MuYWRkKCdhZnRlci1oaWdobGlnaHQnLCBlbnYgPT4ge1xuICAgIGNvbnN0IGxpbmtzID0gZW52LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVycm9yLWxvY2F0aW9uLCAuYmFja3RyYWNlLWxvY2F0aW9uJyk7XG4gICAgQXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGlmIChsaW5rIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgeyBsaW5lLCBjb2wgfSA9IGxpbmsuZGF0YXNldDtcbiAgICAgICAgbGluay5vbmNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChsaW5lICYmIGNvbCkge1xuICAgICAgICAgICAgZ290b1Bvc2l0aW9uKGxpbmUsIGNvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgaW1wb3J0U3VnZ2VzdGlvbnMgPSBlbnYuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW1wb3J0LXN1Z2dlc3Rpb24nKTtcbiAgICBBcnJheS5mcm9tKGltcG9ydFN1Z2dlc3Rpb25zKS5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgaWYgKGxpbmsgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkge1xuICAgICAgICBjb25zdCB7IHN1Z2dlc3Rpb24gfSA9IGxpbmsuZGF0YXNldDtcbiAgICAgICAgbGluay5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgYWRkSW1wb3J0KHN1Z2dlc3Rpb24gKyAnXFxuJyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBmZWF0dXJlR2F0ZUVuYWJsZXJzID0gZW52LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmUtZ2F0ZScpO1xuICAgIEFycmF5LmZyb20oZmVhdHVyZUdhdGVFbmFibGVycykuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGlmIChsaW5rIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcbiAgICAgICAgbGluay5vbmNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChsaW5rLmRhdGFzZXQuZmVhdHVyZUdhdGUpIHtcbiAgICAgICAgICAgIGVuYWJsZUZlYXR1cmVHYXRlKGxpbmsuZGF0YXNldC5mZWF0dXJlR2F0ZSk7XG4gICAgICAgICAgICBnb3RvUG9zaXRpb24oMSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYmFja3RyYWNlRW5hYmxlcnMgPSBlbnYuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja3RyYWNlLWVuYWJsZScpO1xuICAgIEFycmF5LmZyb20oYmFja3RyYWNlRW5hYmxlcnMpLmZvckVhY2gobGluayA9PiB7XG4gICAgICBpZiAobGluayBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSB7XG4gICAgICAgIGxpbmsub25jbGljayA9IGUgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZUV4ZWN1dGVXaXRoQmFja3RyYWNlKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtaXJTb3VyY2VMaW5rcyA9IGVudi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5taXItc291cmNlJyk7XG4gICAgQXJyYXkuZnJvbShtaXJTb3VyY2VMaW5rcykuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGlmIChsaW5rIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgeyBzdGFydExpbmUsIHN0YXJ0Q29sLCBlbmRMaW5lLCBlbmRDb2wgfSA9IGxpbmsuZGF0YXNldDtcbiAgICAgICAgaWYgKHN0YXJ0TGluZSAmJiBzdGFydENvbCAmJiBlbmRMaW5lICYmIGVuZENvbCkge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbWFrZVBvc2l0aW9uKHN0YXJ0TGluZSwgc3RhcnRDb2wpO1xuICAgICAgICAgIGNvbnN0IGVuZCA9IG1ha2VQb3NpdGlvbihlbmRMaW5lLCBlbmRDb2wpO1xuXG4gICAgICAgICAgbGluay5vbmNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZWxlY3RUZXh0KHN0YXJ0LCBlbmQpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgJ2NvcmUtanMnO1xuaW1wb3J0ICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnO1xuXG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJy4vaW5kZXgubW9kdWxlLmNzcyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHtcbiAgZWRpdENvZGUsXG4gIGRpc2FibGVTeW5jQ2hhbmdlc1RvU3RvcmFnZSxcbiAgZW5hYmxlRmVhdHVyZUdhdGUsXG4gIGdvdG9Qb3NpdGlvbixcbiAgc2VsZWN0VGV4dCxcbiAgYWRkSW1wb3J0LFxuICBwZXJmb3JtQ3JhdGVzTG9hZCxcbiAgcGVyZm9ybVZlcnNpb25zTG9hZCxcbiAgcmVFeGVjdXRlV2l0aEJhY2t0cmFjZSxcbiAgYnJvd3NlcldpZHRoQ2hhbmdlZCxcbn0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IGNvbmZpZ3VyZVJ1c3RFcnJvcnMgfSBmcm9tICcuL2hpZ2hsaWdodGluZyc7XG5pbXBvcnQgUGFnZVN3aXRjaGVyIGZyb20gJy4vUGFnZVN3aXRjaGVyJztcbmltcG9ydCBwbGF5Z3JvdW5kQXBwIGZyb20gJy4vcmVkdWNlcnMnO1xuaW1wb3J0IHsgd2Vic29ja2V0RmVhdHVyZUZsYWdFbmFibGVkIH0gZnJvbSAnLi9yZWR1Y2Vycy93ZWJzb2NrZXQnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL1JvdXRlcic7XG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9jb25maWd1cmVTdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUod2luZG93KTtcblxuY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbmlmIChwYXJhbXMuaGFzKCd3ZWJzb2NrZXQnKSkge1xuICBzdG9yZS5kaXNwYXRjaCh3ZWJzb2NrZXRGZWF0dXJlRmxhZ0VuYWJsZWQoKSk7XG59XG5cbmNvbnN0IHdoZW5Ccm93c2VyV2lkdGhDaGFuZ2VkID0gKGV2dDogTWVkaWFRdWVyeUxpc3QgfCBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PlxuICBzdG9yZS5kaXNwYXRjaChicm93c2VyV2lkdGhDaGFuZ2VkKGV2dC5tYXRjaGVzKSk7XG5jb25zdCBtYXhXaWR0aE1lZGlhUXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogMTYwMHB4KScpO1xuXG53aGVuQnJvd3NlcldpZHRoQ2hhbmdlZChtYXhXaWR0aE1lZGlhUXVlcnkpO1xubWF4V2lkdGhNZWRpYVF1ZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHdoZW5Ccm93c2VyV2lkdGhDaGFuZ2VkKTtcblxuY29uZmlndXJlUnVzdEVycm9ycyh7XG4gIGVuYWJsZUZlYXR1cmVHYXRlOiBmZWF0dXJlR2F0ZSA9PiBzdG9yZS5kaXNwYXRjaChlbmFibGVGZWF0dXJlR2F0ZShmZWF0dXJlR2F0ZSkpLFxuICBnb3RvUG9zaXRpb246IChsaW5lLCBjb2wpID0+IHN0b3JlLmRpc3BhdGNoKGdvdG9Qb3NpdGlvbihsaW5lLCBjb2wpKSxcbiAgc2VsZWN0VGV4dDogKHN0YXJ0LCBlbmQpID0+IHN0b3JlLmRpc3BhdGNoKHNlbGVjdFRleHQoc3RhcnQsIGVuZCkpLFxuICBhZGRJbXBvcnQ6IChjb2RlKSA9PiBzdG9yZS5kaXNwYXRjaChhZGRJbXBvcnQoY29kZSkpLFxuICByZUV4ZWN1dGVXaXRoQmFja3RyYWNlOiAoKSA9PiBzdG9yZS5kaXNwYXRjaChyZUV4ZWN1dGVXaXRoQmFja3RyYWNlKCkpLFxuICBnZXRDaGFubmVsOiAoKSA9PiBzdG9yZS5nZXRTdGF0ZSgpLmNvbmZpZ3VyYXRpb24uY2hhbm5lbCxcbn0pO1xuXG5zdG9yZS5kaXNwYXRjaChwZXJmb3JtQ3JhdGVzTG9hZCgpKTtcbnN0b3JlLmRpc3BhdGNoKHBlcmZvcm1WZXJzaW9uc0xvYWQoKSk7XG5cbndpbmRvdy5ydXN0UGxheWdyb3VuZCA9IHtcbiAgc2V0Q29kZTogY29kZSA9PiB7XG4gICAgc3RvcmUuZGlzcGF0Y2goZWRpdENvZGUoY29kZSkpO1xuICB9LFxuICBkaXNhYmxlU3luY0NoYW5nZXNUb1N0b3JhZ2U6ICgpID0+IHtcbiAgICBzdG9yZS5kaXNwYXRjaChkaXNhYmxlU3luY0NoYW5nZXNUb1N0b3JhZ2UoKSk7XG4gIH0sXG59O1xuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWdyb3VuZCcpO1xuaWYgKGNvbnRhaW5lcikge1xuICBjb25zdCByb290ID0gY3JlYXRlUm9vdChjb250YWluZXIpO1xuICByb290LnJlbmRlcihcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxSb3V0ZXIgc3RvcmU9e3N0b3JlfSByZWR1Y2VyPXtwbGF5Z3JvdW5kQXBwfT5cbiAgICAgICAgPFBhZ2VTd2l0Y2hlciAvPlxuICAgICAgPC9Sb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj4sXG4gICk7XG59XG4iLCIvLyBUaGlzIGlzIHVzZWQgdG8gc3RvcmUgXCJsb25nLXRlcm1cIiB2YWx1ZXM7IHRob3NlIHdoaWNoIHdlIHdhbnQgdG8gYmVcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNvbXBsZXRlbHkgaW5kZXBlbmRlbnQgc2Vzc2lvbnMgb2YgdGhlXG4vLyBwbGF5Z3JvdW5kLlxuXG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge3JlbW92ZVZlcnNpb24sIGluaXRpYWxpemVTdG9yYWdlLCBQYXJ0aWFsU3RhdGV9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgeyBBc3NlbWJseUZsYXZvciwgRGVtYW5nbGVBc3NlbWJseSwgRWRpdG9yLCBPcmllbnRhdGlvbiwgUGFpckNoYXJhY3RlcnMsIFByb2Nlc3NBc3NlbWJseSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgY29kZVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5jb25zdCBDVVJSRU5UX1ZFUlNJT04gPSAyO1xuXG5pbnRlcmZhY2UgVjJDb25maWd1cmF0aW9uIHtcbiAgdmVyc2lvbjogMjtcbiAgY29uZmlndXJhdGlvbjoge1xuICAgIGVkaXRvcjogRWRpdG9yO1xuICAgIGFjZToge1xuICAgICAga2V5YmluZGluZzogc3RyaW5nO1xuICAgICAgdGhlbWU6IHN0cmluZztcbiAgICAgIHBhaXJDaGFyYWN0ZXJzOiBQYWlyQ2hhcmFjdGVycztcbiAgICB9O1xuICAgIG1vbmFjbzoge1xuICAgICAgdGhlbWU6IHN0cmluZztcbiAgICB9O1xuICAgIG9yaWVudGF0aW9uOiBPcmllbnRhdGlvbjtcbiAgICBhc3NlbWJseUZsYXZvcjogQXNzZW1ibHlGbGF2b3I7XG4gICAgZGVtYW5nbGVBc3NlbWJseTogRGVtYW5nbGVBc3NlbWJseTtcbiAgICBwcm9jZXNzQXNzZW1ibHk6IFByb2Nlc3NBc3NlbWJseTtcbiAgfTtcbiAgY29kZTogc3RyaW5nO1xuICBub3RpZmljYXRpb25zOiBhbnk7XG59XG5cbmludGVyZmFjZSBWMUNvbmZpZ3VyYXRpb24ge1xuICB2ZXJzaW9uOiAxO1xuICBjb25maWd1cmF0aW9uOiB7XG4gICAgZWRpdG9yOiAnc2ltcGxlJyB8ICdhZHZhbmNlZCc7XG4gICAga2V5YmluZGluZzogc3RyaW5nO1xuICAgIHRoZW1lOiBzdHJpbmc7XG4gICAgcGFpckNoYXJhY3RlcnM6IFBhaXJDaGFyYWN0ZXJzO1xuICAgIG9yaWVudGF0aW9uOiBPcmllbnRhdGlvbjtcbiAgICBhc3NlbWJseUZsYXZvcjogQXNzZW1ibHlGbGF2b3I7XG4gICAgZGVtYW5nbGVBc3NlbWJseTogRGVtYW5nbGVBc3NlbWJseTtcbiAgICBwcm9jZXNzQXNzZW1ibHk6IFByb2Nlc3NBc3NlbWJseTtcbiAgfTtcbiAgY29kZTogc3RyaW5nO1xuICBub3RpZmljYXRpb25zOiBhbnk7XG59XG5cbnR5cGUgQ3VycmVudENvbmZpZ3VyYXRpb24gPSBWMkNvbmZpZ3VyYXRpb247XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoc3RhdGU6IFN0YXRlKTogc3RyaW5nIHtcbiAgY29uc3QgY29kZSA9IGNvZGVTZWxlY3RvcihzdGF0ZSk7XG4gIGNvbnN0IGNvbmY6IEN1cnJlbnRDb25maWd1cmF0aW9uID0ge1xuICAgIHZlcnNpb246IENVUlJFTlRfVkVSU0lPTixcbiAgICBjb25maWd1cmF0aW9uOiB7XG4gICAgICBlZGl0b3I6IHN0YXRlLmNvbmZpZ3VyYXRpb24uZWRpdG9yLFxuICAgICAgYWNlOiB7XG4gICAgICAgIGtleWJpbmRpbmc6IHN0YXRlLmNvbmZpZ3VyYXRpb24uYWNlLmtleWJpbmRpbmcsXG4gICAgICAgIHRoZW1lOiBzdGF0ZS5jb25maWd1cmF0aW9uLmFjZS50aGVtZSxcbiAgICAgICAgcGFpckNoYXJhY3RlcnM6IHN0YXRlLmNvbmZpZ3VyYXRpb24uYWNlLnBhaXJDaGFyYWN0ZXJzLFxuICAgICAgfSxcbiAgICAgIG1vbmFjbzoge1xuICAgICAgICB0aGVtZTogc3RhdGUuY29uZmlndXJhdGlvbi5tb25hY28udGhlbWUsXG4gICAgICB9LFxuICAgICAgb3JpZW50YXRpb246IHN0YXRlLmNvbmZpZ3VyYXRpb24ub3JpZW50YXRpb24sXG4gICAgICBhc3NlbWJseUZsYXZvcjogc3RhdGUuY29uZmlndXJhdGlvbi5hc3NlbWJseUZsYXZvcixcbiAgICAgIGRlbWFuZ2xlQXNzZW1ibHk6IHN0YXRlLmNvbmZpZ3VyYXRpb24uZGVtYW5nbGVBc3NlbWJseSxcbiAgICAgIHByb2Nlc3NBc3NlbWJseTogc3RhdGUuY29uZmlndXJhdGlvbi5wcm9jZXNzQXNzZW1ibHksXG4gICAgfSxcbiAgICBjb2RlLFxuICAgIG5vdGlmaWNhdGlvbnM6IHN0YXRlLm5vdGlmaWNhdGlvbnMsXG4gIH07XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShjb25mKTtcbn1cblxuZnVuY3Rpb24gbWlncmF0ZVYxKHN0YXRlOiBWMUNvbmZpZ3VyYXRpb24pOiBDdXJyZW50Q29uZmlndXJhdGlvbiB7XG4gIGNvbnN0IHsgZWRpdG9yLCB0aGVtZSwga2V5YmluZGluZywgcGFpckNoYXJhY3RlcnMsIC4uLmNvbmZpZ3VyYXRpb24gfSA9IHN0YXRlLmNvbmZpZ3VyYXRpb247XG4gIGNvbnN0IHN0ZXA6IFYyQ29uZmlndXJhdGlvbiA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBjb25maWd1cmF0aW9uOiB7XG4gICAgICAuLi5jb25maWd1cmF0aW9uLFxuICAgICAgYWNlOiB7IHRoZW1lLCBrZXliaW5kaW5nLCBwYWlyQ2hhcmFjdGVycyB9LFxuICAgICAgbW9uYWNvOiB7IHRoZW1lOiAndnNjb2RlLWRhcmstcGx1cycgfSxcbiAgICAgIGVkaXRvcjogZWRpdG9yID09PSAnYWR2YW5jZWQnID8gRWRpdG9yLkFjZSA6IEVkaXRvci5TaW1wbGUsXG4gICAgfSxcbiAgICB2ZXJzaW9uOiAyLFxuICB9O1xuICByZXR1cm4gbWlncmF0ZVYyKHN0ZXApO1xufVxuXG5mdW5jdGlvbiBtaWdyYXRlVjIoc3RhdGU6IFYyQ29uZmlndXJhdGlvbik6IEN1cnJlbnRDb25maWd1cmF0aW9uIHtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBtaWdyYXRlKHN0YXRlOiBWMUNvbmZpZ3VyYXRpb24gfCBWMkNvbmZpZ3VyYXRpb24pOiBDdXJyZW50Q29uZmlndXJhdGlvbiB8IHVuZGVmaW5lZCB7XG4gIHN3aXRjaCAoc3RhdGUudmVyc2lvbikge1xuICAgIGNhc2UgMTogcmV0dXJuIG1pZ3JhdGVWMShzdGF0ZSk7XG4gICAgY2FzZSAyOiByZXR1cm4gbWlncmF0ZVYyKHN0YXRlKTtcbiAgICBkZWZhdWx0OiByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplKHNhdmVkU3RhdGU6IHN0cmluZyk6IFBhcnRpYWxTdGF0ZSB7XG4gIGlmICghc2F2ZWRTdGF0ZSkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG5cbiAgY29uc3QgcGFyc2VkU3RhdGUgPSBKU09OLnBhcnNlKHNhdmVkU3RhdGUpO1xuICBpZiAoIXBhcnNlZFN0YXRlKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICBjb25zdCByZXN1bHQgPSBtaWdyYXRlKHBhcnNlZFN0YXRlKTtcbiAgaWYgKCFyZXN1bHQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gIHJldHVybiByZW1vdmVWZXJzaW9uKHJlc3VsdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVTdG9yYWdlKHtcbiAgc3RvcmFnZUZhY3Rvcnk6ICgpID0+IGxvY2FsU3RvcmFnZSxcbiAgc2VyaWFsaXplLFxuICBkZXNlcmlhbGl6ZSxcbn0pO1xuIiwiaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cbmNvbnN0IERFRkFVTFQ6IFN0YXRlID0ge1xuICBpc1NtYWxsOiB0cnVlLFxuICByYXRpb0dlbmVyYXRpb246IDAsXG59O1xuXG5leHBvcnQgdHlwZSBTdGF0ZSA9IHtcbiAgaXNTbWFsbDogYm9vbGVhbjtcbiAgcmF0aW9HZW5lcmF0aW9uOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2RlKHN0YXRlID0gREVGQVVMVCwgYWN0aW9uOiBBY3Rpb24pOiBTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuQnJvd3NlcldpZHRoQ2hhbmdlZDpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBpc1NtYWxsOiBhY3Rpb24uaXNTbWFsbCB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5TcGxpdFJhdGlvQ2hhbmdlZDoge1xuICAgICAgbGV0IHsgcmF0aW9HZW5lcmF0aW9uIH0gPSBzdGF0ZTtcbiAgICAgIHJhdGlvR2VuZXJhdGlvbisrO1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHJhdGlvR2VuZXJhdGlvbiB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgcGVyZm9ybUdpc3RMb2FkIH0gZnJvbSAnLi9vdXRwdXQvZ2lzdCdcbmltcG9ydCB7IHBlcmZvcm1Gb3JtYXQgfSBmcm9tICcuL291dHB1dC9mb3JtYXQnXG5cbmNvbnN0IERFRkFVTFQ6IFN0YXRlID0gYGZuIG1haW4oKSB7XG4gICAgcHJpbnRsbiEoXCJIZWxsbywgd29ybGQhXCIpO1xufWA7XG5cbmV4cG9ydCB0eXBlIFN0YXRlID0gc3RyaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2RlKHN0YXRlID0gREVGQVVMVCwgYWN0aW9uOiBBY3Rpb24pOiBTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuRWRpdENvZGU6XG4gICAgICByZXR1cm4gYWN0aW9uLmNvZGU7XG5cbiAgICBjYXNlIEFjdGlvblR5cGUuQWRkTWFpbkZ1bmN0aW9uOlxuICAgICAgcmV0dXJuIGAke3N0YXRlfVxcblxcbiR7REVGQVVMVH1gO1xuXG4gICAgY2FzZSBBY3Rpb25UeXBlLkFkZEltcG9ydDpcbiAgICAgIHJldHVybiBhY3Rpb24uY29kZSArIHN0YXRlO1xuXG4gICAgY2FzZSBBY3Rpb25UeXBlLkVuYWJsZUZlYXR1cmVHYXRlOlxuICAgICAgcmV0dXJuIGAjIVtmZWF0dXJlKCR7YWN0aW9uLmZlYXR1cmVHYXRlfSldXFxuJHtzdGF0ZX1gO1xuXG4gICAgZGVmYXVsdDoge1xuICAgICAgaWYgKHBlcmZvcm1HaXN0TG9hZC5wZW5kaW5nLm1hdGNoKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChwZXJmb3JtR2lzdExvYWQuZnVsZmlsbGVkLm1hdGNoKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLmNvZGU7XG4gICAgICB9IGVsc2UgaWYgKHBlcmZvcm1Gb3JtYXQuZnVsZmlsbGVkLm1hdGNoKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLmNvZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblR5cGUgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7XG4gIEFzc2VtYmx5Rmxhdm9yLFxuICBCYWNrdHJhY2UsXG4gIENoYW5uZWwsXG4gIERlbWFuZ2xlQXNzZW1ibHksXG4gIEVkaXRpb24sXG4gIEVkaXRvcixcbiAgTW9kZSxcbiAgT3JpZW50YXRpb24sXG4gIFBhaXJDaGFyYWN0ZXJzLFxuICBQcmltYXJ5QWN0aW9uLFxuICBQcmltYXJ5QWN0aW9uQXV0byxcbiAgUHJvY2Vzc0Fzc2VtYmx5LFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBlZGl0b3I6IEVkaXRvcjtcbiAgYWNlOiB7XG4gICAga2V5YmluZGluZzogc3RyaW5nO1xuICAgIHRoZW1lOiBzdHJpbmc7XG4gICAgcGFpckNoYXJhY3RlcnM6IFBhaXJDaGFyYWN0ZXJzO1xuICB9O1xuICBtb25hY286IHtcbiAgICB0aGVtZTogc3RyaW5nO1xuICB9O1xuICBvcmllbnRhdGlvbjogT3JpZW50YXRpb247XG4gIGFzc2VtYmx5Rmxhdm9yOiBBc3NlbWJseUZsYXZvcjtcbiAgZGVtYW5nbGVBc3NlbWJseTogRGVtYW5nbGVBc3NlbWJseTtcbiAgcHJvY2Vzc0Fzc2VtYmx5OiBQcm9jZXNzQXNzZW1ibHk7XG4gIHByaW1hcnlBY3Rpb246IFByaW1hcnlBY3Rpb247XG4gIGNoYW5uZWw6IENoYW5uZWw7XG4gIG1vZGU6IE1vZGU7XG4gIGVkaXRpb246IEVkaXRpb247XG4gIGJhY2t0cmFjZTogQmFja3RyYWNlO1xufVxuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbiAgZWRpdG9yOiBFZGl0b3IuQWNlLFxuICBhY2U6IHtcbiAgICBrZXliaW5kaW5nOiAnYWNlJyxcbiAgICB0aGVtZTogJ2dpdGh1YicsXG4gICAgcGFpckNoYXJhY3RlcnM6IFBhaXJDaGFyYWN0ZXJzLkVuYWJsZWQsXG4gIH0sXG4gIG1vbmFjbzoge1xuICAgIHRoZW1lOiAndnNjb2RlLWRhcmstcGx1cycsXG4gIH0sXG4gIG9yaWVudGF0aW9uOiBPcmllbnRhdGlvbi5BdXRvbWF0aWMsXG4gIGFzc2VtYmx5Rmxhdm9yOiBBc3NlbWJseUZsYXZvci5BdHQsXG4gIGRlbWFuZ2xlQXNzZW1ibHk6IERlbWFuZ2xlQXNzZW1ibHkuRGVtYW5nbGUsXG4gIHByb2Nlc3NBc3NlbWJseTogUHJvY2Vzc0Fzc2VtYmx5LkZpbHRlcixcbiAgcHJpbWFyeUFjdGlvbjogUHJpbWFyeUFjdGlvbkF1dG8uQXV0byxcbiAgY2hhbm5lbDogQ2hhbm5lbC5TdGFibGUsXG4gIG1vZGU6IE1vZGUuRGVidWcsXG4gIGVkaXRpb246IEVkaXRpb24uUnVzdDIwMjEsXG4gIGJhY2t0cmFjZTogQmFja3RyYWNlLkRpc2FibGVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJhdGlvbihzdGF0ZSA9IERFRkFVTFQsIGFjdGlvbjogQWN0aW9uKTogU3RhdGUge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNoYW5nZUVkaXRvcjpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBlZGl0b3I6IGFjdGlvbi5lZGl0b3IgfTtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ2hhbmdlS2V5YmluZGluZzoge1xuICAgICAgY29uc3QgeyBhY2UgfSA9IHN0YXRlO1xuXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgYWNlOiB7IC4uLmFjZSwga2V5YmluZGluZzogYWN0aW9uLmtleWJpbmRpbmcgfSB9O1xuICAgIH1cbiAgICBjYXNlIEFjdGlvblR5cGUuQ2hhbmdlQWNlVGhlbWU6IHtcbiAgICAgIGNvbnN0IHsgYWNlIH0gPSBzdGF0ZTtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBhY2U6IHsgLi4uYWNlLCB0aGVtZTogYWN0aW9uLnRoZW1lIH0gfTtcbiAgICB9XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNoYW5nZVBhaXJDaGFyYWN0ZXJzOiB7XG4gICAgICBjb25zdCB7IGFjZSB9ID0gc3RhdGU7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgYWNlOiB7IC4uLmFjZSwgcGFpckNoYXJhY3RlcnM6IGFjdGlvbi5wYWlyQ2hhcmFjdGVycyB9IH07XG4gICAgfVxuICAgIGNhc2UgQWN0aW9uVHlwZS5DaGFuZ2VNb25hY29UaGVtZToge1xuICAgICAgY29uc3QgeyBtb25hY28gfSA9IHN0YXRlO1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIG1vbmFjbzogeyAuLi5tb25hY28sIHRoZW1lOiBhY3Rpb24udGhlbWUgfSB9O1xuICAgIH1cbiAgICBjYXNlIEFjdGlvblR5cGUuQ2hhbmdlT3JpZW50YXRpb246XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgb3JpZW50YXRpb246IGFjdGlvbi5vcmllbnRhdGlvbiB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5DaGFuZ2VBc3NlbWJseUZsYXZvcjpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBhc3NlbWJseUZsYXZvcjogYWN0aW9uLmFzc2VtYmx5Rmxhdm9yIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNoYW5nZURlbWFuZ2xlQXNzZW1ibHk6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZGVtYW5nbGVBc3NlbWJseTogYWN0aW9uLmRlbWFuZ2xlQXNzZW1ibHkgfTtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ2hhbmdlUHJvY2Vzc0Fzc2VtYmx5OlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHByb2Nlc3NBc3NlbWJseTogYWN0aW9uLnByb2Nlc3NBc3NlbWJseSB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5DaGFuZ2VQcmltYXJ5QWN0aW9uOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHByaW1hcnlBY3Rpb246IGFjdGlvbi5wcmltYXJ5QWN0aW9uIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNoYW5nZUNoYW5uZWw6IHtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBjaGFubmVsOiBhY3Rpb24uY2hhbm5lbCB9O1xuICAgIH1cbiAgICBjYXNlIEFjdGlvblR5cGUuQ2hhbmdlTW9kZTpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBtb2RlOiBhY3Rpb24ubW9kZSB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5DaGFuZ2VFZGl0aW9uOiB7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZWRpdGlvbjogYWN0aW9uLmVkaXRpb24gfTtcbiAgICB9XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNoYW5nZUJhY2t0cmFjZTpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBiYWNrdHJhY2U6IGFjdGlvbi5iYWNrdHJhY2UgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzb3J0QnkgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblR5cGUgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IENyYXRlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IFtdO1xuXG5leHBvcnQgdHlwZSBTdGF0ZSA9IENyYXRlW107XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyYXRlcyhzdGF0ZSA9IERFRkFVTFQsIGFjdGlvbjogQWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ3JhdGVzTG9hZFN1Y2NlZWRlZDpcbiAgICAgIHJldHVybiBzb3J0QnkoYWN0aW9uLmNyYXRlcywgYyA9PiBjLm5hbWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2FjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgYmFzZVVybDogc3RyaW5nO1xuICBzeW5jQ2hhbmdlc1RvU3RvcmFnZTogYm9vbGVhbjtcbn1cblxuY29uc3QgREVGQVVMVDogU3RhdGUgPSB7XG4gIGJhc2VVcmw6ICcnLFxuICBzeW5jQ2hhbmdlc1RvU3RvcmFnZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdsb2JhbENvbmZpZ3VyYXRpb24oc3RhdGUgPSBERUZBVUxULCBhY3Rpb246IEFjdGlvbik6IFN0YXRlIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZS5EaXNhYmxlU3luY0NoYW5nZXNUb1N0b3JhZ2U6IHtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBzeW5jQ2hhbmdlc1RvU3RvcmFnZTogZmFsc2UgfTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmltcG9ydCBicm93c2VyIGZyb20gJy4vYnJvd3Nlcic7XG5pbXBvcnQgY29kZSBmcm9tICcuL2NvZGUnO1xuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCBjcmF0ZXMgZnJvbSAnLi9jcmF0ZXMnO1xuaW1wb3J0IGdsb2JhbENvbmZpZ3VyYXRpb24gZnJvbSAnLi9nbG9iYWxDb25maWd1cmF0aW9uJztcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gJy4vbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgb3V0cHV0IGZyb20gJy4vb3V0cHV0JztcbmltcG9ydCBwYWdlIGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgcG9zaXRpb24gZnJvbSAnLi9wb3NpdGlvbic7XG5pbXBvcnQgc2VsZWN0aW9uIGZyb20gJy4vc2VsZWN0aW9uJztcbmltcG9ydCB2ZXJzaW9ucyBmcm9tICcuL3ZlcnNpb25zJztcbmltcG9ydCB3ZWJzb2NrZXQgZnJvbSAnLi93ZWJzb2NrZXQnO1xuXG5jb25zdCBwbGF5Z3JvdW5kQXBwID0gY29tYmluZVJlZHVjZXJzKHtcbiAgYnJvd3NlcixcbiAgY29kZSxcbiAgY29uZmlndXJhdGlvbixcbiAgY3JhdGVzLFxuICBnbG9iYWxDb25maWd1cmF0aW9uLFxuICBub3RpZmljYXRpb25zLFxuICBvdXRwdXQsXG4gIHBhZ2UsXG4gIHBvc2l0aW9uLFxuICBzZWxlY3Rpb24sXG4gIHZlcnNpb25zLFxuICB3ZWJzb2NrZXQsXG59KTtcblxuZXhwb3J0IHR5cGUgU3RhdGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBwbGF5Z3JvdW5kQXBwPjtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWdyb3VuZEFwcDtcbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgU3RhdGUge1xuICBzZWVuUnVzdFN1cnZleTIwMTg6IGJvb2xlYW47IC8vIGV4cGlyZWRcbiAgc2VlblJ1c3QyMDE4SXNEZWZhdWx0OiBib29sZWFuOyAvLyBleHBpcmVkXG4gIHNlZW5SdXN0U3VydmV5MjAyMDogYm9vbGVhbjsgLy8gZXhwaXJlZFxuICBzZWVuUnVzdDIwMjFJc0RlZmF1bHQ6IGJvb2xlYW47IC8vIGV4cGlyZWRcbiAgc2VlblJ1c3RTdXJ2ZXkyMDIxOiBib29sZWFuOyAvLyBleHBpcmVkXG4gIHNlZW5Nb25hY29FZGl0b3JBdmFpbGFibGU6IGJvb2xlYW47IC8vIGV4cGlyZWRcbiAgc2VlblJ1c3RTdXJ2ZXkyMDIyOiBib29sZWFuO1xufVxuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbiAgc2VlblJ1c3RTdXJ2ZXkyMDE4OiB0cnVlLFxuICBzZWVuUnVzdDIwMThJc0RlZmF1bHQ6IHRydWUsXG4gIHNlZW5SdXN0U3VydmV5MjAyMDogdHJ1ZSxcbiAgc2VlblJ1c3QyMDIxSXNEZWZhdWx0OiB0cnVlLFxuICBzZWVuUnVzdFN1cnZleTIwMjE6IHRydWUsXG4gIHNlZW5Nb25hY29FZGl0b3JBdmFpbGFibGU6IHRydWUsXG4gIHNlZW5SdXN0U3VydmV5MjAyMjogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3RpZmljYXRpb25zKHN0YXRlID0gREVGQVVMVCwgYWN0aW9uOiBBY3Rpb24pOiBTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuTm90aWZpY2F0aW9uU2Vlbjoge1xuICAgICAgc3dpdGNoIChhY3Rpb24ubm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlJ1c3RTdXJ2ZXkyMDIyOiB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHNlZW5SdXN0U3VydmV5MjAyMjogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZmluaXNoLCBzdGFydCB9IGZyb20gJy4vc2hhcmVkU3RhdGVNYW5hZ2VtZW50JztcblxuY29uc3QgREVGQVVMVDogU3RhdGUgPSB7XG4gIHJlcXVlc3RzSW5Qcm9ncmVzczogMCxcbn07XG5cbmludGVyZmFjZSBTdGF0ZSB7XG4gIHJlcXVlc3RzSW5Qcm9ncmVzczogbnVtYmVyO1xuICBjb2RlPzogc3RyaW5nO1xuICBzdGRvdXQ/OiBzdHJpbmc7XG4gIHN0ZGVycj86IHN0cmluZztcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2VtYmx5KHN0YXRlID0gREVGQVVMVCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlQXNzZW1ibHlSZXF1ZXN0OlxuICAgICAgcmV0dXJuIHN0YXJ0KERFRkFVTFQsIHN0YXRlKTtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZUFzc2VtYmx5U3VjY2VlZGVkOiB7XG4gICAgICBjb25zdCB7IGNvZGUgPSAnJywgc3Rkb3V0ID0gJycsIHN0ZGVyciA9ICcnIH0gPSBhY3Rpb247XG4gICAgICByZXR1cm4gZmluaXNoKHN0YXRlLCB7IGNvZGUsIHN0ZG91dCwgc3RkZXJyIH0pO1xuICAgIH1cbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZUFzc2VtYmx5RmFpbGVkOlxuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBlcnJvcjogYWN0aW9uLmVycm9yIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZmluaXNoLCBzdGFydCB9IGZyb20gJy4vc2hhcmVkU3RhdGVNYW5hZ2VtZW50JztcblxuY29uc3QgREVGQVVMVDogU3RhdGUgPSB7XG4gIHJlcXVlc3RzSW5Qcm9ncmVzczogMCxcbn07XG5cbmludGVyZmFjZSBTdGF0ZSB7XG4gIHJlcXVlc3RzSW5Qcm9ncmVzczogbnVtYmVyO1xuICBzdGRvdXQ/OiBzdHJpbmc7XG4gIHN0ZGVycj86IHN0cmluZztcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsaXBweShzdGF0ZSA9IERFRkFVTFQsIGFjdGlvbjogQWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuUmVxdWVzdENsaXBweTpcbiAgICAgIHJldHVybiBzdGFydChERUZBVUxULCBzdGF0ZSk7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNsaXBweVN1Y2NlZWRlZDoge1xuICAgICAgY29uc3QgeyBzdGRvdXQgPSAnJywgc3RkZXJyID0gJycgfSA9IGFjdGlvbjtcbiAgICAgIHJldHVybiBmaW5pc2goc3RhdGUsIHsgc3Rkb3V0LCBzdGRlcnIgfSk7XG4gICAgfVxuICAgIGNhc2UgQWN0aW9uVHlwZS5DbGlwcHlGYWlsZWQ6XG4gICAgICByZXR1cm4gZmluaXNoKHN0YXRlLCB7IGVycm9yOiBhY3Rpb24uZXJyb3IgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlQXN5bmNUaHVuaywgY3JlYXRlU2xpY2UgfSBmcm9tICdAcmVkdXhqcy90b29sa2l0JztcbmltcG9ydCAqIGFzIHogZnJvbSAnem9kJztcblxuaW1wb3J0IHsgU2ltcGxlVGh1bmtBY3Rpb24sIGFkYXB0RmV0Y2hFcnJvciwganNvblBvc3QsIHJvdXRlcyB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZXhlY3V0ZVJlcXVlc3RQYXlsb2FkU2VsZWN0b3IsIHVzZVdlYnNvY2tldFNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vc2VsZWN0b3JzJztcbmltcG9ydCB7IENoYW5uZWwsIEVkaXRpb24sIE1vZGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQge1xuICBXc1BheWxvYWRBY3Rpb24sXG4gIGNyZWF0ZVdlYnNvY2tldFJlc3BvbnNlQWN0aW9uLFxuICBjcmVhdGVXZWJzb2NrZXRSZXNwb25zZVNjaGVtYSxcbiAgbWFrZVdlYlNvY2tldE1ldGEsXG59IGZyb20gJy4uLy4uL3dlYnNvY2tldEFjdGlvbnMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0ge1xuICByZXF1ZXN0c0luUHJvZ3Jlc3M6IDAsXG59O1xuXG5pbnRlcmZhY2UgU3RhdGUge1xuICBzZXF1ZW5jZU51bWJlcj86IG51bWJlcjtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiBudW1iZXI7XG4gIHN0ZG91dD86IHN0cmluZztcbiAgc3RkZXJyPzogc3RyaW5nO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuY29uc3Qgd3NFeGVjdXRlUmVzcG9uc2VQYXlsb2FkU2NoZW1hID0gei5vYmplY3Qoe1xuICBzdWNjZXNzOiB6LmJvb2xlYW4oKSxcbiAgc3Rkb3V0OiB6LnN0cmluZygpLFxuICBzdGRlcnI6IHouc3RyaW5nKCksXG59KTtcbnR5cGUgd3NFeGVjdXRlUmVzcG9uc2VQYXlsb2FkID0gei5pbmZlcjx0eXBlb2Ygd3NFeGVjdXRlUmVzcG9uc2VQYXlsb2FkU2NoZW1hPjtcblxudHlwZSB3c0V4ZWN1dGVSZXF1ZXN0UGF5bG9hZCA9IHtcbiAgY2hhbm5lbDogQ2hhbm5lbDtcbiAgbW9kZTogTW9kZTtcbiAgZWRpdGlvbjogRWRpdGlvbjtcbiAgY3JhdGVUeXBlOiBzdHJpbmc7XG4gIHRlc3RzOiBib29sZWFuO1xuICBjb2RlOiBzdHJpbmc7XG4gIGJhY2t0cmFjZTogYm9vbGVhbjtcbn07XG5cbmNvbnN0IHdzRXhlY3V0ZVJlc3BvbnNlID0gY3JlYXRlV2Vic29ja2V0UmVzcG9uc2VBY3Rpb248d3NFeGVjdXRlUmVzcG9uc2VQYXlsb2FkPihcbiAgJ291dHB1dC9leGVjdXRlL3dzRXhlY3V0ZVJlc3BvbnNlJyxcbik7XG5cbmNvbnN0IHNsaWNlTmFtZSA9ICdvdXRwdXQvZXhlY3V0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0ZVJlcXVlc3RCb2R5IHtcbiAgY2hhbm5lbDogc3RyaW5nO1xuICBtb2RlOiBzdHJpbmc7XG4gIGNyYXRlVHlwZTogc3RyaW5nO1xuICB0ZXN0czogYm9vbGVhbjtcbiAgY29kZTogc3RyaW5nO1xuICBlZGl0aW9uOiBzdHJpbmc7XG4gIGJhY2t0cmFjZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIEV4ZWN1dGVSZXNwb25zZUJvZHkge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBzdGRvdXQ6IHN0cmluZztcbiAgc3RkZXJyOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBwZXJmb3JtRXhlY3V0ZSA9IGNyZWF0ZUFzeW5jVGh1bmsoc2xpY2VOYW1lLCBhc3luYyAocGF5bG9hZDogRXhlY3V0ZVJlcXVlc3RCb2R5KSA9PlxuICBhZGFwdEZldGNoRXJyb3IoKCkgPT4ganNvblBvc3Q8RXhlY3V0ZVJlc3BvbnNlQm9keT4ocm91dGVzLmV4ZWN1dGUsIHBheWxvYWQpKSxcbik7XG5cbmNvbnN0IHNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiAnb3V0cHV0L2V4ZWN1dGUnLFxuICBpbml0aWFsU3RhdGUsXG4gIHJlZHVjZXJzOiB7XG4gICAgd3NFeGVjdXRlUmVxdWVzdDoge1xuICAgICAgcmVkdWNlcjogKHN0YXRlLCBhY3Rpb246IFdzUGF5bG9hZEFjdGlvbjx3c0V4ZWN1dGVSZXF1ZXN0UGF5bG9hZD4pID0+IHtcbiAgICAgICAgY29uc3QgeyBzZXF1ZW5jZU51bWJlciB9ID0gYWN0aW9uLm1ldGE7XG4gICAgICAgIGlmIChzZXF1ZW5jZU51bWJlciA+PSAoc3RhdGUuc2VxdWVuY2VOdW1iZXIgPz8gMCkpIHtcbiAgICAgICAgICBzdGF0ZS5zZXF1ZW5jZU51bWJlciA9IHNlcXVlbmNlTnVtYmVyO1xuICAgICAgICAgIHN0YXRlLnJlcXVlc3RzSW5Qcm9ncmVzcyA9IDE7IC8vIE9ubHkgdHJhY2tpbmcgb25lIHJlcXVlc3RcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcHJlcGFyZTogKHBheWxvYWQ6IHdzRXhlY3V0ZVJlcXVlc3RQYXlsb2FkKSA9PiAoe1xuICAgICAgICBwYXlsb2FkLFxuICAgICAgICBtZXRhOiBtYWtlV2ViU29ja2V0TWV0YSgpLFxuICAgICAgfSksXG4gICAgfSxcbiAgfSxcbiAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcbiAgICBidWlsZGVyXG4gICAgICAuYWRkQ2FzZShwZXJmb3JtRXhlY3V0ZS5wZW5kaW5nLCAoc3RhdGUpID0+IHtcbiAgICAgICAgc3RhdGUucmVxdWVzdHNJblByb2dyZXNzICs9IDE7XG4gICAgICB9KVxuICAgICAgLmFkZENhc2UocGVyZm9ybUV4ZWN1dGUuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCB7IHN0ZG91dCwgc3RkZXJyIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgeyBzdGRvdXQsIHN0ZGVyciB9KTtcbiAgICAgICAgc3RhdGUucmVxdWVzdHNJblByb2dyZXNzIC09IDE7XG4gICAgICB9KVxuICAgICAgLmFkZENhc2UocGVyZm9ybUV4ZWN1dGUucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLmVycm9yID0gYWN0aW9uLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUucmVxdWVzdHNJblByb2dyZXNzIC09IDE7XG4gICAgICB9KVxuICAgICAgLmFkZENhc2Uod3NFeGVjdXRlUmVzcG9uc2UsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXlsb2FkOiB7IHN0ZG91dCwgc3RkZXJyIH0sXG4gICAgICAgICAgbWV0YTogeyBzZXF1ZW5jZU51bWJlciB9LFxuICAgICAgICB9ID0gYWN0aW9uO1xuXG4gICAgICAgIGlmIChzZXF1ZW5jZU51bWJlciA+PSAoc3RhdGUuc2VxdWVuY2VOdW1iZXIgPz8gMCkpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7IHN0ZG91dCwgc3RkZXJyIH0pO1xuICAgICAgICAgIHN0YXRlLnJlcXVlc3RzSW5Qcm9ncmVzcyA9IDA7IC8vIE9ubHkgdHJhY2tpbmcgb25lIHJlcXVlc3RcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IHsgd3NFeGVjdXRlUmVxdWVzdCB9ID0gc2xpY2UuYWN0aW9ucztcblxuZXhwb3J0IGNvbnN0IHBlcmZvcm1Db21tb25FeGVjdXRlID1cbiAgKGNyYXRlVHlwZTogc3RyaW5nLCB0ZXN0czogYm9vbGVhbik6IFNpbXBsZVRodW5rQWN0aW9uID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG4gICAgY29uc3QgYm9keSA9IGV4ZWN1dGVSZXF1ZXN0UGF5bG9hZFNlbGVjdG9yKHN0YXRlLCB7IGNyYXRlVHlwZSwgdGVzdHMgfSk7XG4gICAgY29uc3QgdXNlV2ViU29ja2V0ID0gdXNlV2Vic29ja2V0U2VsZWN0b3Ioc3RhdGUpO1xuXG4gICAgaWYgKHVzZVdlYlNvY2tldCkge1xuICAgICAgZGlzcGF0Y2god3NFeGVjdXRlUmVxdWVzdChib2R5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHBlcmZvcm1FeGVjdXRlKGJvZHkpKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCB3c0V4ZWN1dGVSZXNwb25zZVNjaGVtYSA9IGNyZWF0ZVdlYnNvY2tldFJlc3BvbnNlU2NoZW1hKFxuICB3c0V4ZWN1dGVSZXNwb25zZSxcbiAgd3NFeGVjdXRlUmVzcG9uc2VQYXlsb2FkU2NoZW1hLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpY2UucmVkdWNlcjtcbiIsImltcG9ydCB7IGNyZWF0ZUFzeW5jVGh1bmssIGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmltcG9ydCB7IGFkYXB0RmV0Y2hFcnJvciwganNvblBvc3QsIHJvdXRlcyB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZm9ybWF0UmVxdWVzdFNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vc2VsZWN0b3JzJztcbmltcG9ydCBSb290U3RhdGUgZnJvbSAnLi4vLi4vc3RhdGUnO1xuXG5jb25zdCBzbGljZU5hbWUgPSAnb3V0cHV0L2Zvcm1hdCc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIHJlcXVlc3RzSW5Qcm9ncmVzczogMCxcbn07XG5cbmludGVyZmFjZSBTdGF0ZSB7XG4gIHJlcXVlc3RzSW5Qcm9ncmVzczogbnVtYmVyO1xuICBzdGRvdXQ/OiBzdHJpbmc7XG4gIHN0ZGVycj86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEZvcm1hdFJlcXVlc3RCb2R5IHtcbiAgY29kZTogc3RyaW5nO1xuICBlZGl0aW9uOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBGb3JtYXRSZXNwb25zZUJvZHkge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBjb2RlOiBzdHJpbmc7XG4gIHN0ZG91dDogc3RyaW5nO1xuICBzdGRlcnI6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHBlcmZvcm1Gb3JtYXQgPSBjcmVhdGVBc3luY1RodW5rPEZvcm1hdFJlc3BvbnNlQm9keSwgdm9pZCwgeyBzdGF0ZTogUm9vdFN0YXRlIH0+KFxuICBzbGljZU5hbWUsXG4gIGFzeW5jIChfYXJnOiB2b2lkLCB7IGdldFN0YXRlIH0pID0+IHtcbiAgICBjb25zdCBib2R5OiBGb3JtYXRSZXF1ZXN0Qm9keSA9IGZvcm1hdFJlcXVlc3RTZWxlY3RvcihnZXRTdGF0ZSgpKTtcblxuICAgIHJldHVybiBhZGFwdEZldGNoRXJyb3IoKCkgPT4ganNvblBvc3Q8Rm9ybWF0UmVzcG9uc2VCb2R5Pihyb3V0ZXMuZm9ybWF0LCBib2R5KSk7XG4gIH0sXG4pO1xuXG5jb25zdCBzbGljZSA9IGNyZWF0ZVNsaWNlKHtcbiAgbmFtZTogc2xpY2VOYW1lLFxuICBpbml0aWFsU3RhdGUsXG4gIHJlZHVjZXJzOiB7fSxcbiAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcbiAgICBidWlsZGVyXG4gICAgICAuYWRkQ2FzZShwZXJmb3JtRm9ybWF0LnBlbmRpbmcsIChzdGF0ZSkgPT4ge1xuICAgICAgICBzdGF0ZS5yZXF1ZXN0c0luUHJvZ3Jlc3MgKz0gMTtcbiAgICAgIH0pXG4gICAgICAuYWRkQ2FzZShwZXJmb3JtRm9ybWF0LmZ1bGZpbGxlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUucmVxdWVzdHNJblByb2dyZXNzIC09IDE7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIH0pXG4gICAgICAuYWRkQ2FzZShwZXJmb3JtRm9ybWF0LnJlamVjdGVkLCAoc3RhdGUpID0+IHtcbiAgICAgICAgc3RhdGUucmVxdWVzdHNJblByb2dyZXNzIC09IDE7XG4gICAgICB9KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzbGljZS5yZWR1Y2VyO1xuIiwiaW1wb3J0IHsgRHJhZnQsIFBheWxvYWRBY3Rpb24sIGNyZWF0ZUFzeW5jVGh1bmssIGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmltcG9ydCB7IGpzb25HZXQsIGpzb25Qb3N0LCByb3V0ZXMgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCB7IGJhc2VVcmxTZWxlY3RvciwgY29kZVNlbGVjdG9yIH0gZnJvbSAnLi4vLi4vc2VsZWN0b3JzJztcbmltcG9ydCBSb290U3RhdGUgZnJvbSAnLi4vLi4vc3RhdGUnO1xuaW1wb3J0IHsgQ2hhbm5lbCwgRWRpdGlvbiwgTW9kZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IFJlcXVlc3RzSW5Qcm9ncmVzcyB9IGZyb20gJy4vc2hhcmVkU3RhdGVNYW5hZ2VtZW50JztcblxuY29uc3Qgc2xpY2VOYW1lID0gJ291dHB1dC9naXN0JztcblxuY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiAwLFxufTtcblxuaW50ZXJmYWNlIFN0YXRlIGV4dGVuZHMgUmVxdWVzdHNJblByb2dyZXNzIHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgY29kZT86IHN0cmluZztcbiAgc3Rkb3V0Pzogc3RyaW5nO1xuICBzdGRlcnI/OiBzdHJpbmc7XG4gIGNoYW5uZWw/OiBDaGFubmVsO1xuICBtb2RlPzogTW9kZTtcbiAgZWRpdGlvbj86IEVkaXRpb247XG59XG5cbmludGVyZmFjZSBTdWNjZXNzUHJvcHMge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBzdGRvdXQ6IHN0cmluZztcbiAgc3RkZXJyOiBzdHJpbmc7XG4gIGNoYW5uZWw6IENoYW5uZWw7XG4gIG1vZGU6IE1vZGU7XG4gIGVkaXRpb246IEVkaXRpb247XG59XG5cbnR5cGUgUGVyZm9ybUdpc3RMb2FkUHJvcHMgPSBQaWNrPFxuICBTdWNjZXNzUHJvcHMsXG4gIEV4Y2x1ZGU8a2V5b2YgU3VjY2Vzc1Byb3BzLCAndXJsJyB8ICdjb2RlJyB8ICdzdGRvdXQnIHwgJ3N0ZGVycic+XG4+O1xuXG5pbnRlcmZhY2UgR2lzdFJlc3BvbnNlQm9keSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBwZXJmb3JtR2lzdExvYWQgPSBjcmVhdGVBc3luY1RodW5rPFxuICBTdWNjZXNzUHJvcHMsXG4gIFBlcmZvcm1HaXN0TG9hZFByb3BzLFxuICB7IHN0YXRlOiBSb290U3RhdGUgfVxuPihgJHtzbGljZU5hbWV9L2xvYWRgLCBhc3luYyAoeyBpZCwgY2hhbm5lbCwgbW9kZSwgZWRpdGlvbiB9LCB7IGdldFN0YXRlIH0pID0+IHtcbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuICBjb25zdCBiYXNlVXJsID0gYmFzZVVybFNlbGVjdG9yKHN0YXRlKTtcbiAgY29uc3QgZ2lzdFVybCA9IG5ldyBVUkwocm91dGVzLm1ldGEuZ2lzdExvYWQsIGJhc2VVcmwpO1xuICBjb25zdCB1ID0gbmV3IFVSTChpZCwgZ2lzdFVybCk7XG5cbiAgY29uc3QgZ2lzdCA9IGF3YWl0IGpzb25HZXQodSk7XG4gIHJldHVybiB7IGNoYW5uZWwsIG1vZGUsIGVkaXRpb24sIC4uLmdpc3QgfTtcbn0pO1xuXG5leHBvcnQgY29uc3QgcGVyZm9ybUdpc3RTYXZlID0gY3JlYXRlQXN5bmNUaHVuazxTdWNjZXNzUHJvcHMsIHZvaWQsIHsgc3RhdGU6IFJvb3RTdGF0ZSB9PihcbiAgYCR7c2xpY2VOYW1lfS9zYXZlYCxcbiAgYXN5bmMgKF9hcmcsIHsgZ2V0U3RhdGUgfSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2RlID0gY29kZVNlbGVjdG9yKHN0YXRlKTtcbiAgICBjb25zdCB7XG4gICAgICBjb25maWd1cmF0aW9uOiB7IGNoYW5uZWwsIG1vZGUsIGVkaXRpb24gfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBleGVjdXRlOiB7IHN0ZG91dCA9ICcnLCBzdGRlcnIgPSAnJyB9LFxuICAgICAgfSxcbiAgICB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCBqc29uID0gYXdhaXQganNvblBvc3Q8R2lzdFJlc3BvbnNlQm9keT4ocm91dGVzLm1ldGEuZ2lzdFNhdmUsIHsgY29kZSB9KTtcbiAgICByZXR1cm4geyAuLi5qc29uLCBjb2RlLCBzdGRvdXQsIHN0ZGVyciwgY2hhbm5lbCwgbW9kZSwgZWRpdGlvbiB9O1xuICB9LFxuKTtcblxuY29uc3QgcGVuZGluZyA9IChzdGF0ZTogRHJhZnQ8U3RhdGU+KSA9PiB7XG4gIHN0YXRlLnJlcXVlc3RzSW5Qcm9ncmVzcyArPSAxO1xufTtcblxuY29uc3QgZnVsZmlsbGVkID0gKHN0YXRlOiBEcmFmdDxTdGF0ZT4sIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxTdWNjZXNzUHJvcHM+KSA9PiB7XG4gIHN0YXRlLnJlcXVlc3RzSW5Qcm9ncmVzcyAtPSAxO1xuICBPYmplY3QuYXNzaWduKHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG59O1xuXG5jb25zdCBzbGljZSA9IGNyZWF0ZVNsaWNlKHtcbiAgbmFtZTogc2xpY2VOYW1lLFxuICBpbml0aWFsU3RhdGUsXG4gIHJlZHVjZXJzOiB7fSxcbiAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcbiAgICBidWlsZGVyXG4gICAgICAuYWRkQ2FzZShwZXJmb3JtR2lzdExvYWQucGVuZGluZywgcGVuZGluZylcbiAgICAgIC5hZGRDYXNlKHBlcmZvcm1HaXN0TG9hZC5mdWxmaWxsZWQsIGZ1bGZpbGxlZClcbiAgICAgIC5hZGRDYXNlKHBlcmZvcm1HaXN0U2F2ZS5wZW5kaW5nLCBwZW5kaW5nKVxuICAgICAgLmFkZENhc2UocGVyZm9ybUdpc3RTYXZlLmZ1bGZpbGxlZCwgZnVsZmlsbGVkKTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzbGljZS5yZWR1Y2VyO1xuIiwiaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBmaW5pc2gsIHN0YXJ0IH0gZnJvbSAnLi9zaGFyZWRTdGF0ZU1hbmFnZW1lbnQnO1xuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiAwLFxufTtcblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiBudW1iZXI7XG4gIGNvZGU/OiBzdHJpbmc7XG4gIHN0ZG91dD86IHN0cmluZztcbiAgc3RkZXJyPzogc3RyaW5nO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGlyKHN0YXRlID0gREVGQVVMVCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlSGlyUmVxdWVzdDpcbiAgICAgIHJldHVybiBzdGFydChERUZBVUxULCBzdGF0ZSk7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbXBpbGVIaXJTdWNjZWVkZWQ6IHtcbiAgICAgIGNvbnN0IHsgY29kZSA9ICcnLCBzdGRvdXQgPSAnJywgc3RkZXJyID0gJycgfSA9IGFjdGlvbjtcbiAgICAgIHJldHVybiBmaW5pc2goc3RhdGUsIHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfSk7XG4gICAgfVxuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlSGlyRmFpbGVkOlxuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBlcnJvcjogYWN0aW9uLmVycm9yIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xuXG5pbXBvcnQgYXNzZW1ibHkgZnJvbSAnLi9hc3NlbWJseSc7XG5pbXBvcnQgY2xpcHB5IGZyb20gJy4vY2xpcHB5JztcbmltcG9ydCBleGVjdXRlIGZyb20gJy4vZXhlY3V0ZSc7XG5pbXBvcnQgZm9ybWF0IGZyb20gJy4vZm9ybWF0JztcbmltcG9ydCBnaXN0IGZyb20gJy4vZ2lzdCc7XG5pbXBvcnQgaGlyIGZyb20gJy4vaGlyJztcbmltcG9ydCBsbHZtSXIgZnJvbSAnLi9sbHZtSXInO1xuaW1wb3J0IG1hY3JvRXhwYW5zaW9uIGZyb20gJy4vbWFjcm9FeHBhbnNpb24nO1xuaW1wb3J0IG1ldGEgZnJvbSAnLi9tZXRhJztcbmltcG9ydCBtaXIgZnJvbSAnLi9taXInO1xuaW1wb3J0IG1pcmkgZnJvbSAnLi9taXJpJztcbmltcG9ydCB3YXNtIGZyb20gJy4vd2FzbSc7XG5cbmNvbnN0IG91dHB1dCA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIG1ldGEsXG4gIGZvcm1hdCxcbiAgY2xpcHB5LFxuICBtaXJpLFxuICBtYWNyb0V4cGFuc2lvbixcbiAgYXNzZW1ibHksXG4gIGxsdm1JcixcbiAgbWlyLFxuICBoaXIsXG4gIHdhc20sXG4gIGV4ZWN1dGUsXG4gIGdpc3QsXG59KTtcblxuZXhwb3J0IHR5cGUgU3RhdGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBvdXRwdXQ+O1xuXG5leHBvcnQgZGVmYXVsdCBvdXRwdXQ7XG4iLCJpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblR5cGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCB7IGZpbmlzaCwgc3RhcnQgfSBmcm9tICcuL3NoYXJlZFN0YXRlTWFuYWdlbWVudCc7XG5cbmNvbnN0IERFRkFVTFQ6IFN0YXRlID0ge1xuICByZXF1ZXN0c0luUHJvZ3Jlc3M6IDAsXG59O1xuXG5pbnRlcmZhY2UgU3RhdGUge1xuICByZXF1ZXN0c0luUHJvZ3Jlc3M6IG51bWJlcjtcbiAgY29kZT86IHN0cmluZztcbiAgc3Rkb3V0Pzogc3RyaW5nO1xuICBzdGRlcnI/OiBzdHJpbmc7XG4gIGVycm9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsbHZtSXIoc3RhdGUgPSBERUZBVUxULCBhY3Rpb246IEFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbXBpbGVMbHZtSXJSZXF1ZXN0OlxuICAgICAgcmV0dXJuIHN0YXJ0KERFRkFVTFQsIHN0YXRlKTtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZUxsdm1JclN1Y2NlZWRlZDoge1xuICAgICAgY29uc3QgeyBjb2RlID0gJycsIHN0ZG91dCA9ICcnLCBzdGRlcnIgPSAnJyB9ID0gYWN0aW9uO1xuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9KTtcbiAgICB9XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbXBpbGVMbHZtSXJGYWlsZWQ6XG4gICAgICByZXR1cm4gZmluaXNoKHN0YXRlLCB7IGVycm9yOiBhY3Rpb24uZXJyb3IgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBmaW5pc2gsIHN0YXJ0IH0gZnJvbSAnLi9zaGFyZWRTdGF0ZU1hbmFnZW1lbnQnO1xuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiAwLFxufTtcblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiBudW1iZXI7XG4gIHN0ZG91dD86IHN0cmluZztcbiAgc3RkZXJyPzogc3RyaW5nO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFjcm9FeHBhbnNpb24oc3RhdGUgPSBERUZBVUxULCBhY3Rpb246IEFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLlJlcXVlc3RNYWNyb0V4cGFuc2lvbjpcbiAgICAgIHJldHVybiBzdGFydChERUZBVUxULCBzdGF0ZSk7XG4gICAgY2FzZSBBY3Rpb25UeXBlLk1hY3JvRXhwYW5zaW9uU3VjY2VlZGVkOiB7XG4gICAgICBjb25zdCB7IHN0ZG91dCA9ICcnLCBzdGRlcnIgPSAnJyB9ID0gYWN0aW9uO1xuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBzdGRvdXQsIHN0ZGVyciB9KTtcbiAgICB9XG4gICAgY2FzZSBBY3Rpb25UeXBlLk1hY3JvRXhwYW5zaW9uRmFpbGVkOlxuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBlcnJvcjogYWN0aW9uLmVycm9yIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgRm9jdXMgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBwZXJmb3JtR2lzdExvYWQsIHBlcmZvcm1HaXN0U2F2ZSB9IGZyb20gJy4vZ2lzdCc7XG5pbXBvcnQgeyBwZXJmb3JtRm9ybWF0IH0gZnJvbSAnLi9mb3JtYXQnO1xuaW1wb3J0IHsgcGVyZm9ybUV4ZWN1dGUsIHdzRXhlY3V0ZVJlcXVlc3QgfSBmcm9tICcuL2V4ZWN1dGUnO1xuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbn07XG5cbmludGVyZmFjZSBTdGF0ZSB7XG4gIGZvY3VzPzogRm9jdXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ldGEoc3RhdGUgPSBERUZBVUxULCBhY3Rpb246IEFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNoYW5nZUZvY3VzOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGZvY3VzOiBhY3Rpb24uZm9jdXMgfTtcblxuICAgIGNhc2UgQWN0aW9uVHlwZS5SZXF1ZXN0Q2xpcHB5OlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGZvY3VzOiBGb2N1cy5DbGlwcHkgfTtcblxuICAgIGNhc2UgQWN0aW9uVHlwZS5SZXF1ZXN0TWlyaTpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBmb2N1czogRm9jdXMuTWlyaSB9O1xuXG4gICAgY2FzZSBBY3Rpb25UeXBlLlJlcXVlc3RNYWNyb0V4cGFuc2lvbjpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBmb2N1czogRm9jdXMuTWFjcm9FeHBhbnNpb24gfTtcblxuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlTGx2bUlyUmVxdWVzdDpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBmb2N1czogRm9jdXMuTGx2bUlyIH07XG5cbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZU1pclJlcXVlc3Q6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZm9jdXM6IEZvY3VzLk1pciB9O1xuXG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbXBpbGVIaXJSZXF1ZXN0OlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGZvY3VzOiBGb2N1cy5IaXIgfTtcblxuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlV2FzbVJlcXVlc3Q6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZm9jdXM6IEZvY3VzLldhc20gfTtcblxuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlQXNzZW1ibHlSZXF1ZXN0OlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGZvY3VzOiBGb2N1cy5Bc20gfTtcblxuICAgIGNhc2UgcGVyZm9ybUV4ZWN1dGUucGVuZGluZy50eXBlOlxuICAgIGNhc2Ugd3NFeGVjdXRlUmVxdWVzdC50eXBlOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGZvY3VzOiBGb2N1cy5FeGVjdXRlIH07XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICBpZiAocGVyZm9ybUdpc3RMb2FkLnBlbmRpbmcubWF0Y2goYWN0aW9uKSB8fCBwZXJmb3JtR2lzdFNhdmUucGVuZGluZy5tYXRjaChhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBmb2N1czogRm9jdXMuR2lzdCB9O1xuICAgICAgfSBlbHNlIGlmIChwZXJmb3JtRm9ybWF0LnBlbmRpbmcubWF0Y2goYWN0aW9uKSkge1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZm9jdXM6IEZvY3VzLkZvcm1hdCB9O1xuICAgICAgfSBlbHNlIGlmIChwZXJmb3JtRm9ybWF0LmZ1bGZpbGxlZC5tYXRjaChhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBmb2N1czogdW5kZWZpbmVkIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblR5cGUgfSBmcm9tICcuLi8uLi9hY3Rpb25zJztcbmltcG9ydCB7IGZpbmlzaCwgc3RhcnQgfSBmcm9tICcuL3NoYXJlZFN0YXRlTWFuYWdlbWVudCc7XG5cbmNvbnN0IERFRkFVTFQ6IFN0YXRlID0ge1xuICByZXF1ZXN0c0luUHJvZ3Jlc3M6IDAsXG59O1xuXG5pbnRlcmZhY2UgU3RhdGUge1xuICByZXF1ZXN0c0luUHJvZ3Jlc3M6IG51bWJlcjtcbiAgY29kZT86IHN0cmluZztcbiAgc3Rkb3V0Pzogc3RyaW5nO1xuICBzdGRlcnI/OiBzdHJpbmc7XG4gIGVycm9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaXIoc3RhdGUgPSBERUZBVUxULCBhY3Rpb246IEFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbXBpbGVNaXJSZXF1ZXN0OlxuICAgICAgcmV0dXJuIHN0YXJ0KERFRkFVTFQsIHN0YXRlKTtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZU1pclN1Y2NlZWRlZDoge1xuICAgICAgY29uc3QgeyBjb2RlID0gJycsIHN0ZG91dCA9ICcnLCBzdGRlcnIgPSAnJyB9ID0gYWN0aW9uO1xuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBjb2RlLCBzdGRvdXQsIHN0ZGVyciB9KTtcbiAgICB9XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbXBpbGVNaXJGYWlsZWQ6XG4gICAgICByZXR1cm4gZmluaXNoKHN0YXRlLCB7IGVycm9yOiBhY3Rpb24uZXJyb3IgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBmaW5pc2gsIHN0YXJ0IH0gZnJvbSAnLi9zaGFyZWRTdGF0ZU1hbmFnZW1lbnQnO1xuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiAwLFxufTtcblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiBudW1iZXI7XG4gIHN0ZG91dD86IHN0cmluZztcbiAgc3RkZXJyPzogc3RyaW5nO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWlyaShzdGF0ZSA9IERFRkFVTFQsIGFjdGlvbjogQWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuUmVxdWVzdE1pcmk6XG4gICAgICByZXR1cm4gc3RhcnQoREVGQVVMVCwgc3RhdGUpO1xuICAgIGNhc2UgQWN0aW9uVHlwZS5NaXJpU3VjY2VlZGVkOiB7XG4gICAgICBjb25zdCB7IHN0ZG91dCA9ICcnLCBzdGRlcnIgPSAnJyB9ID0gYWN0aW9uO1xuICAgICAgcmV0dXJuIGZpbmlzaChzdGF0ZSwgeyBzdGRvdXQsIHN0ZGVyciB9KTtcbiAgICB9XG4gICAgY2FzZSBBY3Rpb25UeXBlLk1pcmlGYWlsZWQ6XG4gICAgICByZXR1cm4gZmluaXNoKHN0YXRlLCB7IGVycm9yOiBhY3Rpb24uZXJyb3IgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0c0luUHJvZ3Jlc3Mge1xuICByZXF1ZXN0c0luUHJvZ3Jlc3M6IG51bWJlcjtcbn1cblxudHlwZSBXaXRob3V0UmVxdWVzdHM8Uz4gPSBQaWNrPFMsIEV4Y2x1ZGU8a2V5b2YgUywga2V5b2YgUmVxdWVzdHNJblByb2dyZXNzPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydDxTIGV4dGVuZHMgUmVxdWVzdHNJblByb2dyZXNzPihcbiAgemVyb1N0YXRlOiBTLFxuICBzdGF0ZTogUyxcbik6IFMge1xuICBjb25zdCB7IHJlcXVlc3RzSW5Qcm9ncmVzcyA9IDAgfSA9IHN0YXRlO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgemVyb1N0YXRlLCB7IHJlcXVlc3RzSW5Qcm9ncmVzczogcmVxdWVzdHNJblByb2dyZXNzICsgMSB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmlzaDxTIGV4dGVuZHMgUmVxdWVzdHNJblByb2dyZXNzPihcbiAgc3RhdGU6IFMsXG4gIG5ld1N0YXRlPzogV2l0aG91dFJlcXVlc3RzPFM+LFxuKTogUyB7XG4gIGNvbnN0IHsgcmVxdWVzdHNJblByb2dyZXNzID0gMCB9ID0gc3RhdGU7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUsIHsgcmVxdWVzdHNJblByb2dyZXNzOiByZXF1ZXN0c0luUHJvZ3Jlc3MgLSAxIH0pO1xufVxuIiwiaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBmaW5pc2gsIHN0YXJ0IH0gZnJvbSAnLi9zaGFyZWRTdGF0ZU1hbmFnZW1lbnQnO1xuXG5jb25zdCBERUZBVUxUOiBTdGF0ZSA9IHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiAwLFxufTtcblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcmVxdWVzdHNJblByb2dyZXNzOiBudW1iZXI7XG4gIGNvZGU/OiBzdHJpbmc7XG4gIHN0ZG91dD86IHN0cmluZztcbiAgc3RkZXJyPzogc3RyaW5nO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FzbShzdGF0ZSA9IERFRkFVTFQsIGFjdGlvbjogQWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZVdhc21SZXF1ZXN0OlxuICAgICAgcmV0dXJuIHN0YXJ0KERFRkFVTFQsIHN0YXRlKTtcbiAgICBjYXNlIEFjdGlvblR5cGUuQ29tcGlsZVdhc21TdWNjZWVkZWQ6IHtcbiAgICAgIGNvbnN0IHsgY29kZSA9ICcnLCBzdGRvdXQgPSAnJywgc3RkZXJyID0gJycgfSA9IGFjdGlvbjtcbiAgICAgIHJldHVybiBmaW5pc2goc3RhdGUsIHsgY29kZSwgc3Rkb3V0LCBzdGRlcnIgfSk7XG4gICAgfVxuICAgIGNhc2UgQWN0aW9uVHlwZS5Db21waWxlV2FzbUZhaWxlZDpcbiAgICAgIHJldHVybiBmaW5pc2goc3RhdGUsIHsgZXJyb3I6IGFjdGlvbi5lcnJvciB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblR5cGUgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFN0YXRlID0gUGFnZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFnZShzdGF0ZTogU3RhdGUgPSAnaW5kZXgnLCBhY3Rpb246IEFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLlNldFBhZ2U6XG4gICAgICByZXR1cm4gYWN0aW9uLnBhZ2U7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgREVGQVVMVDogUG9zaXRpb24gPSB7XG4gIGxpbmU6IDAsXG4gIGNvbHVtbjogMCxcbn07XG5cbmV4cG9ydCB0eXBlIFN0YXRlID0gUG9zaXRpb247XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc2l0aW9uKHN0YXRlID0gREVGQVVMVCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZS5Hb3RvUG9zaXRpb246IHtcbiAgICAgIGNvbnN0IHsgbGluZSwgY29sdW1uIH0gPSBhY3Rpb247XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgbGluZSwgY29sdW1uIH07XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjdGlvbiwgQWN0aW9uVHlwZSB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBERUZBVUxUOiBTZWxlY3Rpb24gPSB7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb3NpdGlvbihzdGF0ZSA9IERFRkFVTFQsIGFjdGlvbjogQWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjdGlvblR5cGUuU2VsZWN0VGV4dDoge1xuICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBhY3Rpb247XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgc3RhcnQsIGVuZCB9O1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblR5cGUgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbmNvbnN0IERFRkFVTFQ6IFN0YXRlID0ge1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIHN0YWJsZT86IFZlcnNpb247XG4gIGJldGE/OiBWZXJzaW9uO1xuICBuaWdodGx5PzogVmVyc2lvbjtcbiAgamF2YTE5PzogVmVyc2lvbjtcbiAgcnVzdGZtdD86IFZlcnNpb247XG4gIGNsaXBweT86IFZlcnNpb247XG4gIG1pcmk/OiBWZXJzaW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmF0ZXMoc3RhdGUgPSBERUZBVUxULCBhY3Rpb246IEFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLlZlcnNpb25zTG9hZFN1Y2NlZWRlZDoge1xuICAgICAgY29uc3QgeyBzdGFibGUsIGJldGEsIG5pZ2h0bHksIGphdmExOSwgcnVzdGZtdCwgY2xpcHB5LCBtaXJpIH0gPSBhY3Rpb247XG4gICAgICByZXR1cm4geyBzdGFibGUsIGJldGEsIG5pZ2h0bHksIGphdmExOSwgcnVzdGZtdCwgY2xpcHB5LCBtaXJpIH07XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheWxvYWRBY3Rpb24sIGNyZWF0ZVNsaWNlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQgeiBmcm9tICd6b2QnO1xuXG5pbXBvcnQgeyBjcmVhdGVXZWJzb2NrZXRSZXNwb25zZVNjaGVtYSwgbWFrZVdlYlNvY2tldE1ldGEgfSBmcm9tICcuLi93ZWJzb2NrZXRBY3Rpb25zJztcblxuZXhwb3J0IHR5cGUgU3RhdGUgPSB7XG4gIGNvbm5lY3RlZDogYm9vbGVhbjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIGZlYXR1cmVGbGFnRW5hYmxlZDogYm9vbGVhbjtcbn07XG5cbmNvbnN0IGluaXRpYWxTdGF0ZTogU3RhdGUgPSB7XG4gIGNvbm5lY3RlZDogZmFsc2UsXG4gIGZlYXR1cmVGbGFnRW5hYmxlZDogZmFsc2UsXG59O1xuXG5jb25zdCB3ZWJzb2NrZXRDb25uZWN0ZWRQYXlsb2FkU2NoZW1hID0gei5vYmplY3Qoe1xuICBpQWNjZXB0VGhpc0lzQW5VbnN1cHBvcnRlZEFwaTogei5ib29sZWFuKCksXG59KTtcbnR5cGUgd2Vic29ja2V0Q29ubmVjdGVkUGF5bG9hZCA9IHouaW5mZXI8dHlwZW9mIHdlYnNvY2tldENvbm5lY3RlZFBheWxvYWRTY2hlbWE+O1xuXG5jb25zdCB3ZWJzb2NrZXRFcnJvclBheWxvYWRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGVycm9yOiB6LnN0cmluZygpLFxufSk7XG50eXBlIHdlYnNvY2tldEVycm9yUGF5bG9hZCA9IHouaW5mZXI8dHlwZW9mIHdlYnNvY2tldEVycm9yUGF5bG9hZFNjaGVtYT47XG5cbmNvbnN0IHNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiAnd2Vic29ja2V0JyxcbiAgaW5pdGlhbFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIGNvbm5lY3RlZDoge1xuICAgICAgcmVkdWNlcjogKHN0YXRlLCBfYWN0aW9uOiBQYXlsb2FkQWN0aW9uPHdlYnNvY2tldENvbm5lY3RlZFBheWxvYWQ+KSA9PiB7XG4gICAgICAgIHN0YXRlLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIGRlbGV0ZSBzdGF0ZS5lcnJvcjtcbiAgICAgIH0sXG5cbiAgICAgIHByZXBhcmU6ICgpID0+ICh7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBpQWNjZXB0VGhpc0lzQW5VbnN1cHBvcnRlZEFwaTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0YTogbWFrZVdlYlNvY2tldE1ldGEoKSxcbiAgICAgIH0pLFxuICAgIH0sXG5cbiAgICBkaXNjb25uZWN0ZWQ6IChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgfSxcblxuICAgIGVycm9yOiAoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjx3ZWJzb2NrZXRFcnJvclBheWxvYWQ+KSA9PiB7XG4gICAgICBzdGF0ZS5lcnJvciA9IGFjdGlvbi5wYXlsb2FkLmVycm9yO1xuICAgIH0sXG5cbiAgICBmZWF0dXJlRmxhZ0VuYWJsZWQ6IChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUuZmVhdHVyZUZsYWdFbmFibGVkID0gdHJ1ZTtcbiAgICB9LFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCB7XG4gIGNvbm5lY3RlZDogd2Vic29ja2V0Q29ubmVjdGVkLFxuICBkaXNjb25uZWN0ZWQ6IHdlYnNvY2tldERpc2Nvbm5lY3RlZCxcbiAgZXJyb3I6IHdlYnNvY2tldEVycm9yLFxuICBmZWF0dXJlRmxhZ0VuYWJsZWQ6IHdlYnNvY2tldEZlYXR1cmVGbGFnRW5hYmxlZCxcbn0gPSBzbGljZS5hY3Rpb25zO1xuXG5leHBvcnQgY29uc3Qgd2Vic29ja2V0Q29ubmVjdGVkU2NoZW1hID0gY3JlYXRlV2Vic29ja2V0UmVzcG9uc2VTY2hlbWEoXG4gIHdlYnNvY2tldENvbm5lY3RlZCxcbiAgd2Vic29ja2V0Q29ubmVjdGVkUGF5bG9hZFNjaGVtYSxcbik7XG5cbmV4cG9ydCBjb25zdCB3ZWJzb2NrZXRFcnJvclNjaGVtYSA9IGNyZWF0ZVdlYnNvY2tldFJlc3BvbnNlU2NoZW1hKFxuICB3ZWJzb2NrZXRFcnJvcixcbiAgd2Vic29ja2V0RXJyb3JQYXlsb2FkU2NoZW1hLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpY2UucmVkdWNlcjtcbiIsImltcG9ydCB7IHNvdXJjZSB9IGZyb20gJ2NvbW1vbi10YWdzJztcbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5cbmltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi4vcmVkdWNlcnMnO1xuaW1wb3J0IHtcbiAgQWNlUmVzaXplS2V5LFxuICBCYWNrdHJhY2UsXG4gIENoYW5uZWwsXG4gIEVkaXRpb24sXG4gIE9yaWVudGF0aW9uLFxuICBQcmltYXJ5QWN0aW9uQXV0byxcbiAgUHJpbWFyeUFjdGlvbkNvcmUsXG4gIFZlcnNpb24sXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGNvZGVTZWxlY3RvciA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvZGU7XG5leHBvcnQgY29uc3QgcG9zaXRpb25TZWxlY3RvciA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLnBvc2l0aW9uO1xuZXhwb3J0IGNvbnN0IHNlbGVjdGlvblNlbGVjdG9yID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuc2VsZWN0aW9uO1xuXG5jb25zdCBIQVNfVEVTVFNfUkUgPSAvXlxccyojXFxzKlxcW1xccyp0ZXN0XFxzKihbXlwiXSopXS9tO1xuZXhwb3J0IGNvbnN0IGhhc1Rlc3RzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcihjb2RlU2VsZWN0b3IsIGNvZGUgPT4gISFjb2RlLm1hdGNoKEhBU19URVNUU19SRSkpO1xuXG5jb25zdCBIQVNfTUFJTl9GVU5DVElPTl9SRSA9IC9eXFxzKihwdWJcXHMrKT9cXHMqKGNvbnN0XFxzKyk/XFxzKihhc3luY1xccyspP1xccypmblxccyttYWluXFxzKlxcKFxccypcXCkvbTtcbmV4cG9ydCBjb25zdCBoYXNNYWluRnVuY3Rpb25TZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKGNvZGVTZWxlY3RvciwgY29kZSA9PiAhIWNvZGUubWF0Y2goSEFTX01BSU5fRlVOQ1RJT05fUkUpKTtcblxuY29uc3QgQ1JBVEVfVFlQRV9SRSA9IC9eXFxzKiMhXFxzKlxcW1xccypjcmF0ZV90eXBlXFxzKj1cXHMqXCIoW15cIl0qKVwiXFxzKl0vbTtcbmV4cG9ydCBjb25zdCBjcmF0ZVR5cGVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKGNvZGVTZWxlY3RvciwgY29kZSA9PiAoY29kZS5tYXRjaChDUkFURV9UWVBFX1JFKSB8fCBbXSlbMV0pO1xuXG5jb25zdCBhdXRvUHJpbWFyeUFjdGlvblNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGNyYXRlVHlwZVNlbGVjdG9yLFxuICBoYXNUZXN0c1NlbGVjdG9yLFxuICBoYXNNYWluRnVuY3Rpb25TZWxlY3RvcixcbiAgKGNyYXRlVHlwZSwgaGFzVGVzdHMsIGhhc01haW5GdW5jdGlvbikgPT4ge1xuICAgIGlmIChjcmF0ZVR5cGUgJiYgY3JhdGVUeXBlICE9PSAncHJvYy1tYWNybycpIHtcbiAgICAgIGlmIChjcmF0ZVR5cGUgPT09ICdiaW4nKSB7XG4gICAgICAgIHJldHVybiBQcmltYXJ5QWN0aW9uQ29yZS5FeGVjdXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByaW1hcnlBY3Rpb25Db3JlLkNvbXBpbGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXNUZXN0cykge1xuICAgICAgICByZXR1cm4gUHJpbWFyeUFjdGlvbkNvcmUuVGVzdDtcbiAgICAgIH0gZWxzZSBpZiAoaGFzTWFpbkZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBQcmltYXJ5QWN0aW9uQ29yZS5FeGVjdXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByaW1hcnlBY3Rpb25Db3JlLkNvbXBpbGU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IHJ1bkFzVGVzdCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBhdXRvUHJpbWFyeUFjdGlvblNlbGVjdG9yLFxuICBwcmltYXJ5QWN0aW9uID0+IHByaW1hcnlBY3Rpb24gPT09IFByaW1hcnlBY3Rpb25Db3JlLlRlc3QsXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3JhdGVUeXBlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGNyYXRlVHlwZVNlbGVjdG9yLFxuICBhdXRvUHJpbWFyeUFjdGlvblNlbGVjdG9yLFxuICAoY3JhdGVUeXBlLCBwcmltYXJ5QWN0aW9uKSA9PiB7XG4gICAgaWYgKGNyYXRlVHlwZSkge1xuICAgICAgcmV0dXJuIGNyYXRlVHlwZTtcbiAgICB9IGVsc2UgaWYgKHByaW1hcnlBY3Rpb24gPT09IFByaW1hcnlBY3Rpb25Db3JlLkV4ZWN1dGUpIHtcbiAgICAgIHJldHVybiAnYmluJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdsaWInO1xuICAgIH1cbiAgfSxcbik7XG5cbmNvbnN0IHJhd1ByaW1hcnlBY3Rpb25TZWxlY3RvciA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUFjdGlvbjtcblxuZXhwb3J0IGNvbnN0IGlzQXV0b0J1aWxkU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgcmF3UHJpbWFyeUFjdGlvblNlbGVjdG9yLFxuICBhdXRvUHJpbWFyeUFjdGlvblNlbGVjdG9yLFxuICAocHJpbWFyeUFjdGlvbiwgYXV0b1ByaW1hcnlBY3Rpb24pID0+IChcbiAgICBwcmltYXJ5QWN0aW9uID09PSBQcmltYXJ5QWN0aW9uQXV0by5BdXRvICYmIGF1dG9QcmltYXJ5QWN0aW9uID09PSBQcmltYXJ5QWN0aW9uQ29yZS5Db21waWxlXG4gICksXG4pO1xuXG5jb25zdCBwcmltYXJ5QWN0aW9uU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgcmF3UHJpbWFyeUFjdGlvblNlbGVjdG9yLFxuICBhdXRvUHJpbWFyeUFjdGlvblNlbGVjdG9yLFxuICAocHJpbWFyeUFjdGlvbiwgYXV0b1ByaW1hcnlBY3Rpb24pOiBQcmltYXJ5QWN0aW9uQ29yZSA9PiAoXG4gICAgcHJpbWFyeUFjdGlvbiA9PT0gUHJpbWFyeUFjdGlvbkF1dG8uQXV0byA/IGF1dG9QcmltYXJ5QWN0aW9uIDogcHJpbWFyeUFjdGlvblxuICApLFxuKTtcblxuY29uc3QgTEFCRUxTOiB7IFtpbmRleCBpbiBQcmltYXJ5QWN0aW9uQ29yZV06IHN0cmluZyB9ID0ge1xuICBbUHJpbWFyeUFjdGlvbkNvcmUuQXNtXTogJ1Nob3cgQXNzZW1ibHknLFxuICBbUHJpbWFyeUFjdGlvbkNvcmUuQ29tcGlsZV06ICdCdWlsZCcsXG4gIFtQcmltYXJ5QWN0aW9uQ29yZS5FeGVjdXRlXTogJ1J1bicsXG4gIFtQcmltYXJ5QWN0aW9uQ29yZS5MbHZtSXJdOiAnU2hvdyBMTFZNIElSJyxcbiAgW1ByaW1hcnlBY3Rpb25Db3JlLkhpcl06ICdTaG93IEhJUicsXG4gIFtQcmltYXJ5QWN0aW9uQ29yZS5NaXJdOiAnU2hvdyBNSVInLFxuICBbUHJpbWFyeUFjdGlvbkNvcmUuVGVzdF06ICdUZXN0JyxcbiAgW1ByaW1hcnlBY3Rpb25Db3JlLldhc21dOiAnU2hvdyBXQVNNJyxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFeGVjdXRpb25MYWJlbCA9IGNyZWF0ZVNlbGVjdG9yKHByaW1hcnlBY3Rpb25TZWxlY3RvciwgcHJpbWFyeUFjdGlvbiA9PiBMQUJFTFNbcHJpbWFyeUFjdGlvbl0pO1xuXG5jb25zdCBnZXRTdGFibGUgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS52ZXJzaW9ucz8uc3RhYmxlO1xuY29uc3QgZ2V0QmV0YSA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLnZlcnNpb25zPy5iZXRhO1xuY29uc3QgZ2V0TmlnaHRseSA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLnZlcnNpb25zPy5uaWdodGx5O1xuXG5jb25zdCBnZXRKYXZhMTkgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS52ZXJzaW9ucz8uamF2YTE5O1xuY29uc3QgZ2V0UnVzdGZtdCA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLnZlcnNpb25zPy5ydXN0Zm10O1xuY29uc3QgZ2V0Q2xpcHB5ID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUudmVyc2lvbnM/LmNsaXBweTtcbmNvbnN0IGdldE1pcmkgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS52ZXJzaW9ucz8ubWlyaTtcblxuY29uc3QgdmVyc2lvbk51bWJlciA9ICh2OiBWZXJzaW9uIHwgdW5kZWZpbmVkKSA9PiB2ID8gdi52ZXJzaW9uIDogJyc7XG5leHBvcnQgY29uc3Qgc3RhYmxlVmVyc2lvblRleHQgPSBjcmVhdGVTZWxlY3RvcihnZXRTdGFibGUsIHZlcnNpb25OdW1iZXIpO1xuZXhwb3J0IGNvbnN0IGJldGFWZXJzaW9uVGV4dCA9IGNyZWF0ZVNlbGVjdG9yKGdldEJldGEsIHZlcnNpb25OdW1iZXIpO1xuZXhwb3J0IGNvbnN0IG5pZ2h0bHlWZXJzaW9uVGV4dCA9IGNyZWF0ZVNlbGVjdG9yKGdldE5pZ2h0bHksIHZlcnNpb25OdW1iZXIpO1xuZXhwb3J0IGNvbnN0IGphdmExOVZlcnNpb25UZXh0ID0gY3JlYXRlU2VsZWN0b3IoZ2V0SmF2YTE5LCB2ZXJzaW9uTnVtYmVyKTtcbmV4cG9ydCBjb25zdCBjbGlwcHlWZXJzaW9uVGV4dCA9IGNyZWF0ZVNlbGVjdG9yKGdldENsaXBweSwgdmVyc2lvbk51bWJlcik7XG5leHBvcnQgY29uc3QgcnVzdGZtdFZlcnNpb25UZXh0ID0gY3JlYXRlU2VsZWN0b3IoZ2V0UnVzdGZtdCwgdmVyc2lvbk51bWJlcik7XG5leHBvcnQgY29uc3QgbWlyaVZlcnNpb25UZXh0ID0gY3JlYXRlU2VsZWN0b3IoZ2V0TWlyaSwgdmVyc2lvbk51bWJlcik7XG5cbmNvbnN0IHZlcnNpb25EZXRhaWxzID0gKHY6IFZlcnNpb24gfCB1bmRlZmluZWQpID0+IHYgPyBgJHt2LmRhdGV9ICR7di5oYXNoLnNsaWNlKDAsIDIwKX1gIDogJyc7XG5leHBvcnQgY29uc3QgYmV0YVZlcnNpb25EZXRhaWxzVGV4dCA9IGNyZWF0ZVNlbGVjdG9yKGdldEJldGEsIHZlcnNpb25EZXRhaWxzKTtcbmV4cG9ydCBjb25zdCBuaWdodGx5VmVyc2lvbkRldGFpbHNUZXh0ID0gY3JlYXRlU2VsZWN0b3IoZ2V0TmlnaHRseSwgdmVyc2lvbkRldGFpbHMpO1xuZXhwb3J0IGNvbnN0IGNsaXBweVZlcnNpb25EZXRhaWxzVGV4dCA9IGNyZWF0ZVNlbGVjdG9yKGdldENsaXBweSwgdmVyc2lvbkRldGFpbHMpO1xuZXhwb3J0IGNvbnN0IHJ1c3RmbXRWZXJzaW9uRGV0YWlsc1RleHQgPSBjcmVhdGVTZWxlY3RvcihnZXRSdXN0Zm10LCB2ZXJzaW9uRGV0YWlscyk7XG5leHBvcnQgY29uc3QgbWlyaVZlcnNpb25EZXRhaWxzVGV4dCA9IGNyZWF0ZVNlbGVjdG9yKGdldE1pcmksIHZlcnNpb25EZXRhaWxzKTtcblxuY29uc3QgZWRpdGlvblNlbGVjdG9yID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuY29uZmlndXJhdGlvbi5lZGl0aW9uO1xuXG5leHBvcnQgY29uc3QgaXNOaWdodGx5Q2hhbm5lbCA9IChzdGF0ZTogU3RhdGUpID0+IChcbiAgc3RhdGUuY29uZmlndXJhdGlvbi5jaGFubmVsID09PSBDaGFubmVsLk5pZ2h0bHlcbik7XG5leHBvcnQgY29uc3QgaXNXYXNtQXZhaWxhYmxlID0gaXNOaWdodGx5Q2hhbm5lbDtcbmV4cG9ydCBjb25zdCBpc0hpckF2YWlsYWJsZSA9IGlzTmlnaHRseUNoYW5uZWw7XG5cbmV4cG9ydCBjb25zdCBnZXRNb2RlTGFiZWwgPSAoc3RhdGU6IFN0YXRlKSA9PiB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbjogeyBtb2RlIH0gfSA9IHN0YXRlO1xuICByZXR1cm4gYCR7bW9kZX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENoYW5uZWxMYWJlbCA9IChzdGF0ZTogU3RhdGUpID0+IHtcbiAgY29uc3QgeyBjb25maWd1cmF0aW9uOiB7IGNoYW5uZWwgfSB9ID0gc3RhdGU7XG4gIHJldHVybiBgJHtjaGFubmVsfWA7XG59O1xuXG5leHBvcnQgY29uc3QgaXNFZGl0aW9uRGVmYXVsdCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBlZGl0aW9uU2VsZWN0b3IsXG4gIGVkaXRpb24gPT4gZWRpdGlvbiA9PSBFZGl0aW9uLlJ1c3QyMDIxLFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEJhY2t0cmFjZVNldCA9IChzdGF0ZTogU3RhdGUpID0+IChcbiAgc3RhdGUuY29uZmlndXJhdGlvbi5iYWNrdHJhY2UgIT09IEJhY2t0cmFjZS5EaXNhYmxlZFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEFkdmFuY2VkT3B0aW9uc1NldCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBpc0VkaXRpb25EZWZhdWx0LCBnZXRCYWNrdHJhY2VTZXQsXG4gIChlZGl0aW9uRGVmYXVsdCwgYmFja3RyYWNlU2V0KSA9PiAoXG4gICAgIWVkaXRpb25EZWZhdWx0IHx8IGJhY2t0cmFjZVNldFxuICApLFxuKTtcblxuZXhwb3J0IGNvbnN0IGhhc1Byb3BlcnRpZXMgPSAob2JqOiB7fSkgPT4gT2JqZWN0LnZhbHVlcyhvYmopLnNvbWUodmFsID0+ICEhdmFsKTtcblxuY29uc3QgZ2V0T3V0cHV0cyA9IChzdGF0ZTogU3RhdGUpID0+IFtcbiAgc3RhdGUub3V0cHV0LmFzc2VtYmx5LFxuICBzdGF0ZS5vdXRwdXQuY2xpcHB5LFxuICBzdGF0ZS5vdXRwdXQuZXhlY3V0ZSxcbiAgc3RhdGUub3V0cHV0LmZvcm1hdCxcbiAgc3RhdGUub3V0cHV0Lmdpc3QsXG4gIHN0YXRlLm91dHB1dC5sbHZtSXIsXG4gIHN0YXRlLm91dHB1dC5taXIsXG4gIHN0YXRlLm91dHB1dC5oaXIsXG4gIHN0YXRlLm91dHB1dC5taXJpLFxuICBzdGF0ZS5vdXRwdXQubWFjcm9FeHBhbnNpb24sXG4gIHN0YXRlLm91dHB1dC53YXNtLFxuXTtcblxuZXhwb3J0IGNvbnN0IGdldFNvbWV0aGluZ1RvU2hvdyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRPdXRwdXRzLFxuICBhID0+IGEuc29tZShoYXNQcm9wZXJ0aWVzKSxcbik7XG5cbmV4cG9ydCBjb25zdCBiYXNlVXJsU2VsZWN0b3IgPSAoc3RhdGU6IFN0YXRlKSA9PlxuICBzdGF0ZS5nbG9iYWxDb25maWd1cmF0aW9uLmJhc2VVcmw7XG5cbmNvbnN0IGdpc3RTZWxlY3RvciA9IChzdGF0ZTogU3RhdGUpID0+XG4gIHN0YXRlLm91dHB1dC5naXN0O1xuXG4vLyBTZWxlY3RzIHVybC5xdWVyeSBvZiBidWlsZCBjb25maWdzLlxuY29uc3QgdXJsUXVlcnlTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnaXN0U2VsZWN0b3IsXG4gIGdpc3QgPT4ge1xuICAgIGNvbnN0IHJlcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBpZiAoZ2lzdC5jaGFubmVsKSB7IHJlcy5zZXQoJ3ZlcnNpb24nLCBnaXN0LmNoYW5uZWwpIH1cbiAgICBpZiAoZ2lzdC5tb2RlKSB7IHJlcy5zZXQoJ21vZGUnLCBnaXN0Lm1vZGUpIH1cbiAgICBpZiAoZ2lzdC5lZGl0aW9uKSB7IHJlcy5zZXQoJ2VkaXRpb24nLCBnaXN0LmVkaXRpb24pIH1cbiAgICByZXR1cm4gcmVzO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IHNob3dHaXN0TG9hZGVyU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2lzdFNlbGVjdG9yLFxuICBnaXN0ID0+IGdpc3QucmVxdWVzdHNJblByb2dyZXNzID4gMCxcbik7XG5cbmV4cG9ydCBjb25zdCBwZXJtYWxpbmtTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBiYXNlVXJsU2VsZWN0b3IsIHVybFF1ZXJ5U2VsZWN0b3IsIGdpc3RTZWxlY3RvcixcbiAgKGJhc2VVcmwsIG9yaWdpbmFsUXVlcnksIGdpc3QpID0+IHtcbiAgICBjb25zdCB1ID0gbmV3IFVSTChiYXNlVXJsKTtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3JpZ2luYWxRdWVyeSk7XG4gICAgaWYgKGdpc3QuaWQpIHsgcXVlcnkuc2V0KCdnaXN0JywgZ2lzdC5pZCkgfVxuICAgIHUuc2VhcmNoID0gcXVlcnkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gdS5ocmVmO1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IHRleHRDaGFuZ2VkU2luY2VTaGFyZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGNvZGVTZWxlY3RvciwgZ2lzdFNlbGVjdG9yLFxuICAoY29kZSwgZ2lzdCkgPT4gY29kZSAhPT0gZ2lzdC5jb2RlXG4pXG5cbmNvbnN0IGNvZGVCbG9jayA9IChjb2RlOiBzdHJpbmcsIGxhbmd1YWdlID0gJycpID0+XG4gICdgYGAnICsgbGFuZ3VhZ2UgKyBgXFxuJHtjb2RlfVxcbmAgKyAnYGBgJztcblxuY29uc3QgbWF5YmVPdXRwdXQgPSAoY29kZTogc3RyaW5nIHwgdW5kZWZpbmVkLCB3aGVuUHJlc2VudDogKF86IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICBpZiAoY29kZSAmJiBjb2RlLmxlbmd0aCAhPT0gMCkgeyB3aGVuUHJlc2VudChjb2RlKTsgfVxufTtcblxuY29uc3Qgc25pcHBldFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdpc3RTZWxlY3RvciwgcGVybWFsaW5rU2VsZWN0b3IsXG4gIChnaXN0LCBwZXJtYWxpbmspID0+IHtcbiAgICBsZXQgc25pcHBldCA9ICcnO1xuXG4gICAgbWF5YmVPdXRwdXQoZ2lzdC5jb2RlLCBjb2RlID0+IHtcbiAgICAgIHNuaXBwZXQgKz0gc291cmNlYFxuICAgICAgICAke2NvZGVCbG9jayhjb2RlLCAncnVzdCcpfVxuXG4gICAgICAgIChbUGxheWdyb3VuZF0oJHtwZXJtYWxpbmt9KSlcbiAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBtYXliZU91dHB1dChnaXN0LnN0ZG91dCwgc3Rkb3V0ID0+IHtcbiAgICAgIHNuaXBwZXQgKz0gJ1xcblxcbic7XG4gICAgICBzbmlwcGV0ICs9XG4gICAgICAgIHNvdXJjZWBcbiAgICAgICAgICBPdXRwdXQ6XG5cbiAgICAgICAgICAke2NvZGVCbG9jayhzdGRvdXQpfVxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgbWF5YmVPdXRwdXQoZ2lzdC5zdGRlcnIsIHN0ZGVyciA9PiB7XG4gICAgICBzbmlwcGV0ICs9ICdcXG5cXG4nO1xuICAgICAgc25pcHBldCArPVxuICAgICAgICBzb3VyY2VgXG4gICAgICAgICAgRXJyb3JzOlxuXG4gICAgICAgICAgJHtjb2RlQmxvY2soc3RkZXJyKX1cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIHJldHVybiBzbmlwcGV0O1xuICB9LFxuKTtcblxuZXhwb3J0IGNvbnN0IHVybG9VcmxTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBzbmlwcGV0U2VsZWN0b3IsXG4gIHNuaXBwZXQgPT4ge1xuICAgIGNvbnN0IG5ld1VzZXJzUG9zdFVybCA9IG5ldyBVUkwoJ2h0dHBzOi8vdXNlcnMucnVzdC1sYW5nLm9yZy9uZXctdG9waWMnKTtcbiAgICBuZXdVc2Vyc1Bvc3RVcmwuc2VhcmNoUGFyYW1zLnNldCgnYm9keScsIHNuaXBwZXQpO1xuICAgIHJldHVybiBuZXdVc2Vyc1Bvc3RVcmwuaHJlZjtcbiAgfSxcbik7XG5cbmV4cG9ydCBjb25zdCBjb2RlVXJsU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgYmFzZVVybFNlbGVjdG9yLCB1cmxRdWVyeVNlbGVjdG9yLCBnaXN0U2VsZWN0b3IsXG4gIChiYXNlVXJsLCBvcmlnaW5hbFF1ZXJ5LCBnaXN0KSA9PiB7XG4gICAgY29uc3QgdSA9IG5ldyBVUkwoYmFzZVVybCk7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKG9yaWdpbmFsUXVlcnkpO1xuICAgIGlmIChnaXN0LmNvZGUpIHsgcXVlcnkuc2V0KCdjb2RlJywgZ2lzdC5jb2RlKSB9XG4gICAgdS5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KS50b1N0cmluZygpO1xuICAgIHJldHVybiB1LmhyZWY7XG4gIH0sXG4pO1xuXG5jb25zdCBub3RpZmljYXRpb25zU2VsZWN0b3IgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5ub3RpZmljYXRpb25zO1xuXG5jb25zdCBOT1cgPSBuZXcgRGF0ZSgpO1xuXG5jb25zdCBSVVNUX1NVUlZFWV8yMDIyX0VORCA9IG5ldyBEYXRlKCcyMDIyLTEyLTE5VDAwOjAwOjAwWicpO1xuY29uc3QgUlVTVF9TVVJWRVlfMjAyMl9PUEVOID0gTk9XIDw9IFJVU1RfU1VSVkVZXzIwMjJfRU5EO1xuZXhwb3J0IGNvbnN0IHNob3dSdXN0U3VydmV5MjAyMlNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIG5vdGlmaWNhdGlvbnNTZWxlY3RvcixcbiAgbm90aWZpY2F0aW9ucyA9PiBSVVNUX1NVUlZFWV8yMDIyX09QRU4gJiYgIW5vdGlmaWNhdGlvbnMuc2VlblJ1c3RTdXJ2ZXkyMDIyLFxuKTtcblxuZXhwb3J0IGNvbnN0IGFueU5vdGlmaWNhdGlvbnNUb1Nob3dTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBzaG93UnVzdFN1cnZleTIwMjJTZWxlY3RvcixcbiAgKC4uLmFsbE5vdGlmaWNhdGlvbnMpID0+IGFsbE5vdGlmaWNhdGlvbnMuc29tZShuID0+IG4pLFxuKTtcblxuZXhwb3J0IGNvbnN0IGNsaXBweVJlcXVlc3RTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBjb2RlU2VsZWN0b3IsXG4gIGVkaXRpb25TZWxlY3RvcixcbiAgZ2V0Q3JhdGVUeXBlLFxuICAoY29kZSwgZWRpdGlvbiwgY3JhdGVUeXBlKSA9PiAoeyBjb2RlLCBlZGl0aW9uLCBjcmF0ZVR5cGUgfSksXG4pO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0UmVxdWVzdFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGNvZGVTZWxlY3RvcixcbiAgZWRpdGlvblNlbGVjdG9yLFxuICAoY29kZSwgZWRpdGlvbikgPT4gKHsgY29kZSwgZWRpdGlvbiB9KSxcbik7XG5cbmNvbnN0IGZvY3VzID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUub3V0cHV0Lm1ldGEuZm9jdXM7XG5leHBvcnQgY29uc3QgaXNPdXRwdXRGb2N1c2VkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGZvY3VzLFxuICAoZm9jdXMpID0+ICEhZm9jdXMsXG4pO1xuXG5jb25zdCBvcmllbnRhdGlvbkNvbmZpZyA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbmZpZ3VyYXRpb24ub3JpZW50YXRpb247XG5jb25zdCBicm93c2VyV2lkdGhJc1NtYWxsID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUuYnJvd3Nlci5pc1NtYWxsO1xuXG5leHBvcnQgY29uc3Qgb3JpZW50YXRpb24gPSBjcmVhdGVTZWxlY3RvcihcbiAgb3JpZW50YXRpb25Db25maWcsXG4gIGJyb3dzZXJXaWR0aElzU21hbGwsXG4gIChvcmllbnRhdGlvbiwgd2lkdGhJc1NtYWxsKSA9PiB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09IE9yaWVudGF0aW9uLkF1dG9tYXRpYykge1xuICAgICAgaWYgKHdpZHRoSXNTbWFsbCkgeyByZXR1cm4gT3JpZW50YXRpb24uSG9yaXpvbnRhbCB9IGVsc2UgeyByZXR1cm4gT3JpZW50YXRpb24uVmVydGljYWwgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZW50YXRpb247XG4gICAgfVxuICB9XG4pXG5cbmNvbnN0IHJhdGlvR2VuZXJhdGlvbiA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmJyb3dzZXIucmF0aW9HZW5lcmF0aW9uO1xuXG5leHBvcnQgY29uc3QgYWNlUmVzaXplS2V5ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGZvY3VzLFxuICByYXRpb0dlbmVyYXRpb24sXG4gIChmb2N1cywgcmF0aW9HZW5lcmF0aW9uKTogQWNlUmVzaXplS2V5ID0+IFtmb2N1cywgcmF0aW9HZW5lcmF0aW9uXSxcbilcblxuY29uc3QgYWNlQ29uZmlnID0gKHM6IFN0YXRlKSA9PiBzLmNvbmZpZ3VyYXRpb24uYWNlO1xuZXhwb3J0IGNvbnN0IGFjZUtleWJpbmRpbmcgPSBjcmVhdGVTZWxlY3RvcihhY2VDb25maWcsIGMgPT4gYy5rZXliaW5kaW5nKTtcbmV4cG9ydCBjb25zdCBhY2VQYWlyQ2hhcmFjdGVycyA9IGNyZWF0ZVNlbGVjdG9yKGFjZUNvbmZpZywgYyA9PiBjLnBhaXJDaGFyYWN0ZXJzKTtcbmV4cG9ydCBjb25zdCBhY2VUaGVtZSA9IGNyZWF0ZVNlbGVjdG9yKGFjZUNvbmZpZywgYyA9PiBjLnRoZW1lKTtcblxuZXhwb3J0IGNvbnN0IG9mZmVyQ3JhdGVBdXRvY29tcGxldGVPblVzZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBlZGl0aW9uU2VsZWN0b3IsXG4gIChlZGl0aW9uKSA9PiBlZGl0aW9uICE9PSBFZGl0aW9uLlJ1c3QyMDE1LFxuKTtcblxuY29uc3Qgd2Vic29ja2V0ID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUud2Vic29ja2V0O1xuXG5leHBvcnQgY29uc3Qgd2Vic29ja2V0RmVhdHVyZUZsYWdFbmFibGVkID0gY3JlYXRlU2VsZWN0b3Iod2Vic29ja2V0LCAod3MpID0+IHdzLmZlYXR1cmVGbGFnRW5hYmxlZCk7XG5cbmV4cG9ydCBjb25zdCB1c2VXZWJzb2NrZXRTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICB3ZWJzb2NrZXQsXG4gICh3cykgPT4gd3MuY29ubmVjdGVkICYmIHdzLmZlYXR1cmVGbGFnRW5hYmxlZCxcbik7XG5cbmV4cG9ydCB0eXBlIFdlYlNvY2tldFN0YXR1cyA9XG4gIHsgc3RhdGU6ICdkaXNjb25uZWN0ZWQnIH0gfFxuICB7IHN0YXRlOiAnY29ubmVjdGVkJyB9IHxcbiAgeyBzdGF0ZTogJ2Vycm9yJywgZXJyb3I6IHN0cmluZyB9O1xuXG5leHBvcnQgY29uc3Qgd2Vic29ja2V0U3RhdHVzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgd2Vic29ja2V0LFxuICAod3MpOiBXZWJTb2NrZXRTdGF0dXMgPT4ge1xuICAgIGlmICh3cy5lcnJvcikgeyByZXR1cm4geyBzdGF0ZTogJ2Vycm9yJywgZXJyb3I6IHdzLmVycm9yIH07IH1cbiAgICBpZiAod3MuY29ubmVjdGVkKSB7IHJldHVybiB7IHN0YXRlOiAnY29ubmVjdGVkJyB9OyB9XG4gICAgcmV0dXJuIHsgc3RhdGU6ICdkaXNjb25uZWN0ZWQnIH07XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBleGVjdXRlUmVxdWVzdFBheWxvYWRTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBjb2RlU2VsZWN0b3IsXG4gIChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbmZpZ3VyYXRpb24sXG4gIChfc3RhdGU6IFN0YXRlLCB7IGNyYXRlVHlwZSwgdGVzdHMgfTogeyBjcmF0ZVR5cGU6IHN0cmluZywgdGVzdHM6IGJvb2xlYW4gfSkgPT4gKHsgY3JhdGVUeXBlLCB0ZXN0cyB9KSxcbiAgKGNvZGUsIGNvbmZpZ3VyYXRpb24sIHsgY3JhdGVUeXBlLCB0ZXN0cyB9KSA9PiAoe1xuICAgIGNoYW5uZWw6IGNvbmZpZ3VyYXRpb24uY2hhbm5lbCxcbiAgICBtb2RlOiBjb25maWd1cmF0aW9uLm1vZGUsXG4gICAgZWRpdGlvbjogY29uZmlndXJhdGlvbi5lZGl0aW9uLFxuICAgIGNyYXRlVHlwZSxcbiAgICB0ZXN0cyxcbiAgICBjb2RlLFxuICAgIGJhY2t0cmFjZTogY29uZmlndXJhdGlvbi5iYWNrdHJhY2UgPT09IEJhY2t0cmFjZS5FbmFibGVkLFxuICB9KSxcbik7XG4iLCIvLyBUaGlzIGlzIHVzZWQgdG8gc3RvcmUgXCJzaG9ydC10ZXJtXCIgdmFsdWVzOyB0aG9zZSB3aGljaCB3ZSB3YW50IHRvXG4vLyBiZSBwcmVzZXJ2ZWQgYmV0d2VlbiB0aGUgc2FtZSBzZXNzaW9ucyBvZiB0aGUgcGxheWdyb3VuZCwgc3VjaCBhc1xuLy8gd2hlbiB3ZSByZW9wZW4gYSBjbG9zZWQgdGFiLlxuXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMnO1xuaW1wb3J0IHtyZW1vdmVWZXJzaW9uLCBpbml0aWFsaXplU3RvcmFnZSwgUGFydGlhbFN0YXRlfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29kZVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5jb25zdCBDVVJSRU5UX1ZFUlNJT04gPSAxO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKHN0YXRlOiBTdGF0ZSk6IHN0cmluZyB7XG4gIGNvbnN0IGNvZGUgPSBjb2RlU2VsZWN0b3Ioc3RhdGUpO1xuXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgdmVyc2lvbjogQ1VSUkVOVF9WRVJTSU9OLFxuICAgIGNvbmZpZ3VyYXRpb246IHtcbiAgICAgIHByaW1hcnlBY3Rpb246IHN0YXRlLmNvbmZpZ3VyYXRpb24ucHJpbWFyeUFjdGlvbixcbiAgICB9LFxuICAgIGNvZGUsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemUoc2F2ZWRTdGF0ZTogc3RyaW5nKTogUGFydGlhbFN0YXRlIHtcbiAgaWYgKCFzYXZlZFN0YXRlKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICBjb25zdCBwYXJzZWRTdGF0ZSA9IEpTT04ucGFyc2Uoc2F2ZWRTdGF0ZSk7XG4gIGlmICghcGFyc2VkU3RhdGUpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gIGlmIChwYXJzZWRTdGF0ZS52ZXJzaW9uICE9PSBDVVJSRU5UX1ZFUlNJT04pIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gIC8vIFRoaXMgYXNzdW1lcyB0aGF0IHRoZSBrZXlzIHdlIHNlcmlhbGl6ZSB3aXRoIG1hdGNoIHRoZSBrZXlzIGluIHRoZVxuICAvLyBsaXZlIHN0YXRlLiBJZiB0aGF0J3Mgbm8gbG9uZ2VyIHRydWUsIGFuIGFkZGl0aW9uYWwgcmVuYW1pbmcgc3RlcFxuICAvLyBuZWVkcyB0byBiZSBhZGRlZC5cblxuICByZXR1cm4gcmVtb3ZlVmVyc2lvbihwYXJzZWRTdGF0ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVTdG9yYWdlKHtcbiAgc3RvcmFnZUZhY3Rvcnk6ICgpID0+IHNlc3Npb25TdG9yYWdlLFxuICBzZXJpYWxpemUsXG4gIGRlc2VyaWFsaXplLFxufSk7XG4iLCJpbXBvcnQgeyBEZWVwUGFydGlhbCB9IGZyb20gJ3RzLWVzc2VudGlhbHMnO1xuXG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5cbnR5cGUgU2ltcGxlU3RvcmFnZSA9IFBpY2s8U3RvcmFnZSwgJ2dldEl0ZW0nIHwgJ3NldEl0ZW0nPjtcblxuZXhwb3J0IHR5cGUgUGFydGlhbFN0YXRlID0gRGVlcFBhcnRpYWw8U3RhdGU+IHwgdW5kZWZpbmVkO1xuXG50eXBlIFN0b3JhZ2VGYWN0b3J5ID0gKCkgPT4gU2ltcGxlU3RvcmFnZTtcblxuaW50ZXJmYWNlIENvbmZpZyB7XG4gIHN0b3JhZ2VGYWN0b3J5OiBTdG9yYWdlRmFjdG9yeTtcbiAgc2VyaWFsaXplOiAoc3RhdGU6IFN0YXRlKSA9PiBzdHJpbmc7XG4gIGRlc2VyaWFsaXplOiAoc3RhdGU6IHN0cmluZykgPT4gUGFydGlhbFN0YXRlO1xufVxuXG5pbnRlcmZhY2UgSW5pdGlhbGl6ZWRTdG9yYWdlIHtcbiAgaW5pdGlhbFN0YXRlOiBQYXJ0aWFsU3RhdGU7XG4gIHNhdmVDaGFuZ2VzOiAoc3RhdGU6IFN0YXRlKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVmVyc2lvbjxUIGV4dGVuZHMgeyB2ZXJzaW9uOiB1bmtub3duIH0+KGRhdGE6IFQpOiBPbWl0PFQsICd2ZXJzaW9uJz4ge1xuICBjb25zdCBtdW5nZWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0gey4uLmRhdGF9O1xuICBkZWxldGUgbXVuZ2VkLnZlcnNpb247XG4gIHJldHVybiBtdW5nZWQgYXMgT21pdDxULCAndmVyc2lvbic+XG59XG5cbmV4cG9ydCBjbGFzcyBJbk1lbW9yeVN0b3JhZ2Uge1xuICBwcml2YXRlIGRhdGE6IHsgW3M6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgcHVibGljIGdldEl0ZW0obmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW25hbWVdO1xuICB9XG5cbiAgcHVibGljIHNldEl0ZW0obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kYXRhW25hbWVdID0gdmFsdWU7XG4gIH1cbn1cblxuY29uc3QgS0VZID0gJ3JlZHV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVTdG9yYWdlKGNvbmZpZzogQ29uZmlnKSB7XG4gIHJldHVybiAoKTogSW5pdGlhbGl6ZWRTdG9yYWdlID0+IHtcbiAgICBjb25zdCB7IHN0b3JhZ2VGYWN0b3J5LCBzZXJpYWxpemUsIGRlc2VyaWFsaXplIH0gPSBjb25maWc7XG5cbiAgICBjb25zdCBzdG9yYWdlID0gdmFsaWRhdGVTdG9yYWdlKHN0b3JhZ2VGYWN0b3J5KTtcbiAgICBjb25zdCBzZXJpYWxpemVkU3RhdGUgPSBzdG9yYWdlLmdldEl0ZW0oS0VZKTtcbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSBzZXJpYWxpemVkU3RhdGUgPyBkZXNlcmlhbGl6ZShzZXJpYWxpemVkU3RhdGUpIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgc2F2ZUNoYW5nZXMgPSAoc3RhdGU6IFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCBzZXJpYWxpemVkU3RhdGUgPSBzZXJpYWxpemUoc3RhdGUpO1xuICAgICAgc3RvcmFnZS5zZXRJdGVtKEtFWSwgc2VyaWFsaXplZFN0YXRlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgaW5pdGlhbFN0YXRlLCBzYXZlQ2hhbmdlcyB9XG4gIH1cbn1cblxuLy8gQXR0ZW1wdCB0byB1c2UgdGhlIHN0b3JhZ2UgdG8gc2VlIGlmIHNlY3VyaXR5IHNldHRpbmdzIGFyZVxuLy8gcHJldmVudGluZyBpdC4gRmFsbHMgYmFjayB0byBkdW1teSBpbi1tZW1vcnkgc3RvcmFnZSBpZiBuZWVkZWQuXG5mdW5jdGlvbiB2YWxpZGF0ZVN0b3JhZ2Uoc3RvcmFnZUZhY3Rvcnk6IFN0b3JhZ2VGYWN0b3J5KTogU2ltcGxlU3RvcmFnZSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IHN0b3JhZ2VGYWN0b3J5KCk7XG4gICAgY29uc3QgY3VycmVudCA9IHN0b3JhZ2UuZ2V0SXRlbShLRVkpO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbShLRVksIGN1cnJlbnQgfHwgJycpO1xuICAgIHJldHVybiBzdG9yYWdlO1xuXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBzdG9yZSBjb25maWd1cmF0aW9uLCBmYWxsaW5nIGJhY2sgdG8gbm9uLXBlcnNpc3RlbnQgaW4tbWVtb3J5IHN0b3JhZ2UnKTtcbiAgICByZXR1cm4gbmV3IEluTWVtb3J5U3RvcmFnZSgpO1xuICB9XG59XG4iLCJleHBvcnQgdHlwZSBQYWdlID0gJ2luZGV4JyB8ICdoZWxwJztcblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbiB7XG4gIGxpbmU6IG51bWJlcjtcbiAgY29sdW1uOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlUG9zaXRpb24gPSAobGluZTogc3RyaW5nIHwgbnVtYmVyLCBjb2x1bW46IHN0cmluZyB8IG51bWJlcik6IFBvc2l0aW9uID0+XG4gICh7IGxpbmU6ICtsaW5lLCBjb2x1bW46ICtjb2x1bW4gfSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0aW9uIHtcbiAgc3RhcnQ/OiBQb3NpdGlvbjtcbiAgZW5kPzogUG9zaXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JhdGUge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzaW9uIHtcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBoYXNoOiBzdHJpbmc7XG4gIGRhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tb25FZGl0b3JQcm9wcyB7XG4gIGNvZGU6IHN0cmluZztcbiAgZXhlY3V0ZTogKCkgPT4gYW55O1xuICBvbkVkaXRDb2RlOiAoXzogc3RyaW5nKSA9PiBhbnk7XG4gIHBvc2l0aW9uOiBQb3NpdGlvbjtcbiAgc2VsZWN0aW9uOiBTZWxlY3Rpb247XG4gIGNyYXRlczogQ3JhdGVbXTtcbn1cblxuZXhwb3J0IGVudW0gRWRpdG9yIHtcbiAgU2ltcGxlID0gJ3NpbXBsZScsXG4gIEFjZSA9ICdhY2UnLFxuICBNb25hY28gPSAnbW9uYWNvJyxcbn1cblxuZXhwb3J0IGVudW0gUGFpckNoYXJhY3RlcnMge1xuICBFbmFibGVkID0gJ2VuYWJsZWQnLFxuICBEaXNhYmxlZCA9ICdkaXNhYmxlZCcsXG59XG5cbmV4cG9ydCBlbnVtIE9yaWVudGF0aW9uIHtcbiAgQXV0b21hdGljID0gJ2F1dG9tYXRpYycsXG4gIEhvcml6b250YWwgPSAnaG9yaXpvbnRhbCcsXG4gIFZlcnRpY2FsID0gJ3ZlcnRpY2FsJyxcbn1cblxuZXhwb3J0IGVudW0gQXNzZW1ibHlGbGF2b3Ige1xuICBBdHQgPSAnYXR0JyxcbiAgSW50ZWwgPSAnaW50ZWwnLFxufVxuXG5leHBvcnQgZW51bSBEZW1hbmdsZUFzc2VtYmx5IHtcbiAgRGVtYW5nbGUgPSAnZGVtYW5nbGUnLFxuICBNYW5nbGUgPSAnbWFuZ2xlJyxcbn1cblxuZXhwb3J0IGVudW0gUHJvY2Vzc0Fzc2VtYmx5IHtcbiAgRmlsdGVyID0gJ2ZpbHRlcicsXG4gIFJhdyA9ICdyYXcnLFxufVxuXG5leHBvcnQgZW51bSBQcmltYXJ5QWN0aW9uQXV0byB7XG4gIEF1dG8gPSAnYXV0bycsXG59XG5cbmV4cG9ydCBlbnVtIFByaW1hcnlBY3Rpb25Db3JlIHtcbiAgQXNtID0gJ2FzbScsXG4gIENvbXBpbGUgPSAnY29tcGlsZScsXG4gIEV4ZWN1dGUgPSAnZXhlY3V0ZScsXG4gIExsdm1JciA9ICdsbHZtLWlyJyxcbiAgSGlyID0gJ2hpcicsXG4gIE1pciA9ICdtaXInLFxuICBUZXN0ID0gJ3Rlc3QnLFxuICBXYXNtID0gJ3dhc20nLFxufVxuXG5leHBvcnQgdHlwZSBQcmltYXJ5QWN0aW9uID0gUHJpbWFyeUFjdGlvbkNvcmUgfCBQcmltYXJ5QWN0aW9uQXV0bztcblxuZXhwb3J0IGVudW0gQ2hhbm5lbCB7XG4gIFN0YWJsZSA9ICdzdGFibGUnLFxuICBCZXRhID0gJ2JldGEnLFxuICBOaWdodGx5ID0gJ25pZ2h0bHknLFxuICBKYXZhMTkgPSAnamF2YTE5J1xufVxuXG5leHBvcnQgZW51bSBNb2RlIHtcbiAgRGVidWcgPSAnZGVidWcnLFxuICBSZWxlYXNlID0gJ3JlbGVhc2UnLFxufVxuXG5leHBvcnQgZW51bSBFZGl0aW9uIHtcbiAgUnVzdDIwMTUgPSAnMjAxNScsXG4gIFJ1c3QyMDE4ID0gJzIwMTgnLFxuICBSdXN0MjAyMSA9ICcyMDIxJyxcbn1cblxuZXhwb3J0IGVudW0gQmFja3RyYWNlIHtcbiAgRGlzYWJsZWQgPSAnZGlzYWJsZWQnLFxuICBFbmFibGVkID0gJ2VuYWJsZWQnLFxufVxuXG5leHBvcnQgZW51bSBGb2N1cyB7XG4gIENsaXBweSA9ICdjbGlwcHknLFxuICBNaXJpID0gJ21pcmknLFxuICBNYWNyb0V4cGFuc2lvbiA9ICdtYWNyby1leHBhbnNpb24nLFxuICBMbHZtSXIgPSAnbGx2bS1pcicsXG4gIE1pciA9ICdtaXInLFxuICBIaXIgPSAnaGlyJyxcbiAgV2FzbSA9ICd3YXNtJyxcbiAgQXNtID0gJ2FzbScsXG4gIEV4ZWN1dGUgPSAnZXhlY3V0ZScsXG4gIEZvcm1hdCA9ICdmb3JtYXQnLFxuICBHaXN0ID0gJ2dpc3QnLFxufVxuXG5leHBvcnQgZW51bSBOb3RpZmljYXRpb24ge1xuICBSdXN0U3VydmV5MjAyMiA9ICdydXN0LXN1cnZleS0yMDIyJyxcbn1cblxuZXhwb3J0IHR5cGUgQWNlUmVzaXplS2V5ID0gW0ZvY3VzIHwgdW5kZWZpbmVkLCBudW1iZXJdO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUNvbnRleHQsIHVzZUNhbGxiYWNrLCBNb3VzZUV2ZW50SGFuZGxlciB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9Sb3V0ZXInO1xuXG50eXBlIEFuY2hvciA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snYSddO1xudHlwZSBTbGltQW5jaG9yID0gT21pdDxBbmNob3IsICdhY3Rpb24nIHwgJ29uQ2xpY2snPjtcblxuZXhwb3J0IGludGVyZmFjZSBMaW5rUHJvcHMgZXh0ZW5kcyBTbGltQW5jaG9yIHtcbiAgYWN0aW9uPzogKCkgPT4gYW55O1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgTGluazogUmVhY3QuRkM8TGlua1Byb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZUNvbnRleHQoQ29udGV4dCk7XG4gIGNvbnN0IHsgYWN0aW9uLCBvbkNsaWNrLCBjaGlsZHJlbiwgLi4uYW5jaG9yUHJvcHMgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHJlYWxPbkNsaWNrOiBNb3VzZUV2ZW50SGFuZGxlcjxIVE1MQW5jaG9yRWxlbWVudD4gPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKGFjdGlvbigpKTtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LCBbYWN0aW9uLCBkaXNwYXRjaCwgb25DbGlja10pO1xuXG4gIGlmICghcm91dGVyKSB7IHJldHVybiBudWxsOyB9XG5cbiAgY29uc3QgbG9jYXRpb24gPSByb3V0ZXIucHJvdmlzaW9uYWxMb2NhdGlvbihhY3Rpb24pO1xuICBjb25zdCBocmVmID0gbG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgcmV0dXJuIChcbiAgICA8YSB7Li4uYW5jaG9yUHJvcHN9IGhyZWY9e2hyZWZ9IG9uQ2xpY2s9e3JlYWxPbkNsaWNrfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2E+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFJvdXRlck9iamVjdCB9IGZyb20gJy4nO1xuXG5leHBvcnQgY29uc3QgQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyT2JqZWN0IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG5pbnRlcmZhY2UgUm91dGVyUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICByb3V0ZXI6IFJvdXRlck9iamVjdDtcbn1cblxuY29uc3QgUm91dGVyOiBSZWFjdC5GQzxSb3V0ZXJQcm9wcz4gPSAoe3JvdXRlciwgY2hpbGRyZW59KSA9PiAoXG4gIDxDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtyb3V0ZXJ9PlxuICAgIHtjaGlsZHJlbn1cbiAgPC9Db250ZXh0LlByb3ZpZGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyO1xuIiwiaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBjb25maWd1cmVTdG9yZSwgQ29tYmluZWRTdGF0ZSwgVGh1bmtBY3Rpb24sIFJlZHVjZXIsIFN0b3JlLCBBY3Rpb24sIFByZWxvYWRlZFN0YXRlIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQgeyBCcm93c2VySGlzdG9yeSwgTG9jYXRpb24sIFBhdGggfSBmcm9tICdoaXN0b3J5JztcblxuZXhwb3J0IHR5cGUgUGxhaW5PclRodW5rPFN0LCBBIGV4dGVuZHMgQWN0aW9uPGFueT4+ID0gQSB8IFRodW5rQWN0aW9uPHZvaWQsIFN0LCB7fSwgQT47XG5cbi8vIFRoaXMgaXMgYS4uLiBkZW5zZS4uLiBhdHRlbXB0IGF0IHNheWluZyBcIndlIGFjY2VwdCBhbnkgc3RvcmUgd2l0aFxuLy8gYW55IGRpc3BhdGNoIHNvIGxvbmcgYXMgaXQgY2FuIGhhbmRsZSB0aGUgYWN0aW9ucyB5b3UgY3JlYXRlXCIuIEl0J3Ncbi8vIHByb2JhYmx5IG92ZXJseSBjb21wbGljYXRlZCwgcmVzdHJpY3RpdmUsIGFuZCBicm9hZCBhbGwgYXQgdGhlIHNhbWVcbi8vIHRpbWUuXG5pbnRlcmZhY2UgQ3JlYXRlUm91dGVyQXJnPFN0LCBTdWJTdCwgQSBleHRlbmRzIEFjdGlvbjxhbnk+PiB7XG4gIHN0b3JlOiBTdG9yZTxTdCwgQT4gJiB7IGRpc3BhdGNoOiAoYTogUGxhaW5PclRodW5rPFN0LCBBPikgPT4gdm9pZCB9OyAvLyAgfFxuICByZWR1Y2VyOiBSZWR1Y2VyPFN0PjtcbiAgaGlzdG9yeTogQnJvd3Nlckhpc3Rvcnk7XG4gIHN0YXRlU2VsZWN0b3I6IChzdGF0ZTogU3QpID0+IFN1YlN0O1xuICBzdGF0ZVRvTG9jYXRpb246IChzdWJzdGF0ZTogU3QpID0+IFBhcnRpYWw8UGF0aD47XG4gIGxvY2F0aW9uVG9BY3Rpb246IChsb2NhdGlvbjogTG9jYXRpb24pID0+IFBsYWluT3JUaHVuazxTdCwgQT4gfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlck9iamVjdCB7XG4gIHByb3Zpc2lvbmFsTG9jYXRpb246IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcjxTdCwgU3ViU3QsIEEgZXh0ZW5kcyBBY3Rpb248YW55Pj4oe1xuICBzdG9yZSxcbiAgcmVkdWNlcixcbiAgaGlzdG9yeSxcbiAgc3RhdGVTZWxlY3RvcixcbiAgc3RhdGVUb0xvY2F0aW9uLFxuICBsb2NhdGlvblRvQWN0aW9uLFxufTogQ3JlYXRlUm91dGVyQXJnPFN0LCBTdWJTdCwgQT4pOiBSb3V0ZXJPYmplY3Qge1xuICBsZXQgaW50ZXJlc3RpbmdQcmV2U3RhdGU6IFN1YlN0O1xuXG4gIC8vIFdhdGNoIGNoYW5nZXMgdG8gdGhlIFJlZHV4IHN0YXRlXG4gIHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgIC8vIEl0J3Mgb25seSB3b3J0aCBjaGVja2luZyBpZiBvdXIgc3RhdGUgc3Vic2V0IGhhcyBjaGFuZ2VkLlxuICAgIGNvbnN0IGludGVyZXN0aW5nTmV4dFN0YXRlID0gc3RhdGVTZWxlY3RvcihuZXh0U3RhdGUpO1xuICAgIGlmIChpc0VxdWFsKGludGVyZXN0aW5nTmV4dFN0YXRlLCBpbnRlcmVzdGluZ1ByZXZTdGF0ZSkpIHsgcmV0dXJuOyB9XG4gICAgaW50ZXJlc3RpbmdQcmV2U3RhdGUgPSBpbnRlcmVzdGluZ05leHRTdGF0ZTtcblxuICAgIC8vIElmIG91ciBuZXh0IGxvY2F0aW9uIG1hdGNoZXMgd2hlcmUgd2UgYWxyZWFkeSBhcmUsIGxlYXZlIHRoZVxuICAgIC8vIGhpc3Rvcnkgc3RhY2sgYXMtaXMuXG4gICAgY29uc3QgbmV4dExvY2F0aW9uID0gc3RhdGVUb0xvY2F0aW9uKG5leHRTdGF0ZSk7XG4gICAgaWYgKHBhdGhzRXF1YWxFbm91Z2goaGlzdG9yeSwgaGlzdG9yeS5sb2NhdGlvbiwgbmV4dExvY2F0aW9uKSkgeyByZXR1cm47IH1cbiAgICBoaXN0b3J5LnB1c2gobmV4dExvY2F0aW9uKTtcbiAgfSk7XG5cbiAgY29uc3QgZGlzcGF0Y2hCcm93c2VyTG9jYXRpb25DaGFuZ2UgPSAobmV4dExvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgIGNvbnN0IGFjdGlvbiA9IGxvY2F0aW9uVG9BY3Rpb24obmV4dExvY2F0aW9uKTtcbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICAvLyBXYXRjaCBjaGFuZ2VzIHRvIHRoZSBicm93c2VyIHN0YXRlXG4gIGhpc3RvcnkubGlzdGVuKCh7IGFjdGlvbiwgbG9jYXRpb24gfSkgPT4ge1xuICAgIGlmIChhY3Rpb24gPT09ICdQT1AnKSB7XG4gICAgICBkaXNwYXRjaEJyb3dzZXJMb2NhdGlvbkNoYW5nZShsb2NhdGlvbik7XG4gICAgfVxuICB9KTtcblxuICAvLyBMb2FkIGluaXRpYWwgYnJvd3NlciBzdGF0ZVxuICBkaXNwYXRjaEJyb3dzZXJMb2NhdGlvbkNoYW5nZShoaXN0b3J5LmxvY2F0aW9uKTtcblxuICByZXR1cm4ge1xuICAgIHByb3Zpc2lvbmFsTG9jYXRpb246IChtYWtlQWN0aW9uOiAoKSA9PiBBKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgIGNvbnN0IHRlbXBTdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHtcbiAgICAgICAgcmVkdWNlcixcbiAgICAgICAgLy8gVGhpcyBpcyBhIGhhY2sgLS0gd2Uga25vdyB0aGF0IG91ciBmdWxseS1jb25zdHJ1Y3RlZCBzdGF0ZSBpc1xuICAgICAgICAvLyB2YWxpZCBhcyBhIFwicHJlbG9hZGVkXCIgc3RhdGUgZm9yIGEgYnJhbmQgbmV3IHN0b3JlIVxuICAgICAgICBwcmVsb2FkZWRTdGF0ZTogc3RhdGUgYXMgUHJlbG9hZGVkU3RhdGU8Q29tYmluZWRTdGF0ZTxTdD4+LFxuICAgICAgICBkZXZUb29sczogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYWN0aW9uID0gbWFrZUFjdGlvbigpO1xuICAgICAgdGVtcFN0b3JlLmRpc3BhdGNoKGFjdGlvbik7XG4gICAgICBjb25zdCBtYXliZVN0YXRlID0gdGVtcFN0b3JlLmdldFN0YXRlKCk7XG4gICAgICByZXR1cm4gc3RhdGVUb0xvY2F0aW9uKG1heWJlU3RhdGUpO1xuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhdGhzRXF1YWxFbm91Z2goaGlzdG9yeTogQnJvd3Nlckhpc3RvcnksIGE6IFBhcnRpYWw8UGF0aD4sIGI6IFBhcnRpYWw8UGF0aD4pOiBib29sZWFuIHtcbiAgY29uc3QgYUhyZWYgPSBoaXN0b3J5LmNyZWF0ZUhyZWYoYSk7XG4gIGNvbnN0IGJIcmVmID0gaGlzdG9yeS5jcmVhdGVIcmVmKGIpO1xuXG4gIHJldHVybiBhSHJlZiA9PT0gYkhyZWY7XG59XG4iLCJpbXBvcnQgeyBQYXlsb2FkQWN0aW9uIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQgeiBmcm9tICd6b2QnO1xuXG5leHBvcnQgdHlwZSBXc1BheWxvYWRBY3Rpb248UCA9IHZvaWQsIFQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+ID0gUGF5bG9hZEFjdGlvbjxcbiAgUCxcbiAgVCxcbiAgeyBzZXF1ZW5jZU51bWJlcjogbnVtYmVyIH1cbj47XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJzb2NrZXRSZXNwb25zZUFjdGlvbiA9IDxQLCBUIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPih0eXBlOiBUKSA9PiB7XG4gIGZ1bmN0aW9uIGFjdGlvbkNyZWF0b3IoKTogV3NQYXlsb2FkQWN0aW9uPFA+IHtcbiAgICB0aHJvdyAnU2hvdWxkIG5ldmVyIGJlIGV4ZWN1dGVkIGJ5IEpTJztcbiAgfVxuICBhY3Rpb25DcmVhdG9yLnR5cGUgPSB0eXBlO1xuICBhY3Rpb25DcmVhdG9yLnRvU3RyaW5nID0gKCkgPT4gdHlwZTtcbiAgLy8gVE9ETzogQWRkIC5tYXRjaCgpID9cblxuICByZXR1cm4gYWN0aW9uQ3JlYXRvcjtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVXZWJzb2NrZXRSZXNwb25zZVNjaGVtYSA9IDxQIGV4dGVuZHMgei5ab2RUeXBlQW55LCBUIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPihcbiAgY3JlYXRvcjogeyB0eXBlOiBUIH0sXG4gIHBheWxvYWQ6IFAsXG4pID0+XG4gIHoub2JqZWN0KHtcbiAgICB0eXBlOiB6LmxpdGVyYWwoY3JlYXRvci50eXBlKSxcbiAgICBwYXlsb2FkLFxuICAgIG1ldGE6IHoub2JqZWN0KHtcbiAgICAgIC8vIGRlbGliZXJhdGVseSBvbWl0dGluZyBgd2Vic29ja2V0YCB0byBhdm9pZCBzZW5kaW5nIHRoZSBzZXJ2ZXInc1xuICAgICAgLy8gcmVzcG9uc2VzIGJhY2sgdG8gdGhlIHNlcnZlciBpbmZpbml0ZWx5XG4gICAgICBzZXF1ZW5jZU51bWJlcjogei5udW1iZXIoKSxcbiAgICB9KSxcbiAgfSk7XG5cbmNvbnN0IG5leHRTZXF1ZW5jZU51bWJlciA9ICgoKSA9PiB7XG4gIGxldCBzZXF1ZW5jZU51bWJlciA9IDA7XG4gIHJldHVybiAoKSA9PiBzZXF1ZW5jZU51bWJlcisrO1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IG1ha2VXZWJTb2NrZXRNZXRhID0gKCkgPT4gKHtcbiAgd2Vic29ja2V0OiB0cnVlLFxuICBzZXF1ZW5jZU51bWJlcjogbmV4dFNlcXVlbmNlTnVtYmVyKCksXG59KTtcbiIsImltcG9ydCB7IEFueUFjdGlvbiwgTWlkZGxld2FyZSB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5cbmltcG9ydCB7IHdzRXhlY3V0ZVJlc3BvbnNlU2NoZW1hIH0gZnJvbSAnLi9yZWR1Y2Vycy9vdXRwdXQvZXhlY3V0ZSc7XG5pbXBvcnQge1xuICB3ZWJzb2NrZXRDb25uZWN0ZWQsXG4gIHdlYnNvY2tldENvbm5lY3RlZFNjaGVtYSxcbiAgd2Vic29ja2V0RGlzY29ubmVjdGVkLFxuICB3ZWJzb2NrZXRFcnJvcixcbiAgd2Vic29ja2V0RXJyb3JTY2hlbWEsXG59IGZyb20gJy4vcmVkdWNlcnMvd2Vic29ja2V0JztcblxuY29uc3QgV1NNZXNzYWdlUmVzcG9uc2UgPSB6LmRpc2NyaW1pbmF0ZWRVbmlvbigndHlwZScsIFtcbiAgd2Vic29ja2V0Q29ubmVjdGVkU2NoZW1hLFxuICB3ZWJzb2NrZXRFcnJvclNjaGVtYSxcbiAgd3NFeGVjdXRlUmVzcG9uc2VTY2hlbWEsXG5dKTtcblxuY29uc3QgcmVwb3J0V2ViU29ja2V0RXJyb3IgPSAoKCkgPT4ge1xuICBsZXQgbGFzdFJlcG9ydDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBsZXQgbGFzdFJlcG9ydFRpbWUgPSAwO1xuXG4gIHJldHVybiBhc3luYyAoZXJyb3I6IHN0cmluZykgPT4ge1xuICAgIC8vIERvbid0IHdvcnJ5IGFib3V0IHJlcG9ydGluZyB0aGUgc2FtZSB0aGluZyBhZ2Fpbi5cbiAgICBpZiAobGFzdFJlcG9ydCA9PT0gZXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGFzdFJlcG9ydCA9IGVycm9yO1xuXG4gICAgLy8gRG9uJ3Qgd29ycnkgYWJvdXQgc3BhbW1pbmcgdGhlIHNlcnZlciB3aXRoIHJlcG9ydHMuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAobm93IC0gbGFzdFJlcG9ydFRpbWUgPCAxMDAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxhc3RSZXBvcnRUaW1lID0gbm93O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoKCcvbm93ZWJzb2NrZXQnLCB7XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlcnJvciB9KSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKHJlcG9ydEVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnVW5hYmxlIHRvIHJlcG9ydCBXZWJTb2NrZXQgZXJyb3InLCBlcnJvciwgcmVwb3J0RXJyb3IpO1xuICAgIH1cbiAgfTtcbn0pKCk7XG5cbmNvbnN0IG9wZW5XZWJTb2NrZXQgPSAoY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHdzUHJvdG9jb2wgPSBjdXJyZW50TG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonID8gJ3dzczovLycgOiAnd3M6Ly8nO1xuICAgIGNvbnN0IHdzVXJpID0gW3dzUHJvdG9jb2wsIGN1cnJlbnRMb2NhdGlvbi5ob3N0LCAnL3dlYnNvY2tldCddLmpvaW4oJycpO1xuICAgIHJldHVybiBuZXcgV2ViU29ja2V0KHdzVXJpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFdlYlNvY2tldCBVUkwgZXJyb3Igb3IgV2ViU29ja2V0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgYnJvd3Nlci5cbiAgICAvLyBBc3N1bWUgaXQncyB0aGUgc2Vjb25kIGNhc2Ugc2luY2UgVVJMIGVycm9yIGlzIGVhc3kgdG8gbm90aWNlLlxuICAgIGNvbnN0IGRldGFpbCA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUudG9TdHJpbmcoKSA6ICdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkJztcbiAgICByZXBvcnRXZWJTb2NrZXRFcnJvcihgQ291bGQgbm90IGNyZWF0ZSB0aGUgV2ViU29ja2V0OiAke2RldGFpbH1gKTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG4vLyBodHRwczovL2V4cG9uZW50aWFsYmFja29mZmNhbGN1bGF0b3IuY29tXG5jb25zdCBiYWNrb2ZmTXMgPSAobjogbnVtYmVyKSA9PiBNYXRoLm1pbigxMDAgKiBNYXRoLnBvdygyLCBuKSwgMTAwMDApO1xuXG5jb25zdCBpZGxlVGltZW91dE1zID0gNjAgKiA2MCAqIDEwMDA7XG5cbmV4cG9ydCBjb25zdCB3ZWJzb2NrZXRNaWRkbGV3YXJlID1cbiAgKHdpbmRvdzogV2luZG93KTogTWlkZGxld2FyZSA9PlxuICAoc3RvcmUpID0+IHtcbiAgICBsZXQgc29ja2V0OiBXZWJTb2NrZXQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgd2FzQ29ubmVjdGVkID0gZmFsc2U7XG4gICAgbGV0IHJlY29ubmVjdEF0dGVtcHQgPSAwO1xuXG4gICAgbGV0IHRpbWVvdXQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHJlc2V0VGltZW91dCA9ICgpID0+IHtcbiAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghc29ja2V0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICB9LCBpZGxlVGltZW91dE1zKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29ubmVjdCA9ICgpID0+IHtcbiAgICAgIHNvY2tldCA9IG9wZW5XZWJTb2NrZXQod2luZG93LmxvY2F0aW9uKTtcbiAgICAgIGlmIChzb2NrZXQpIHtcbiAgICAgICAgcmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKHNvY2tldCkge1xuICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkod2Vic29ja2V0Q29ubmVjdGVkKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldmVudCkgPT4ge1xuICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHdlYnNvY2tldERpc2Nvbm5lY3RlZCgpKTtcblxuICAgICAgICAgIC8vIFJlY29ubmVjdCBpZiB3ZSd2ZSBwcmV2aW91c2x5IGNvbm5lY3RlZFxuICAgICAgICAgIGlmICh3YXNDb25uZWN0ZWQgJiYgIWV2ZW50Lndhc0NsZWFuKSB7XG4gICAgICAgICAgICByZWNvbm5lY3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAvLyBXZSBjYW5ub3QgZ2V0IGRldGFpbGVkIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmYWlsdXJlXG4gICAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMxMDAzMDU3LzE1NTQyM1xuICAgICAgICAgIGNvbnN0IGVycm9yID0gJ0dlbmVyaWMgV2ViU29ja2V0IEVycm9yJztcbiAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh3ZWJzb2NrZXRFcnJvcih7IGVycm9yIH0pKTtcbiAgICAgICAgICByZXBvcnRXZWJTb2NrZXRFcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJhd01lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IFdTTWVzc2FnZVJlc3BvbnNlLnBhcnNlKHJhd01lc3NhZ2UpO1xuXG4gICAgICAgICAgICBpZiAod2Vic29ja2V0Q29ubmVjdGVkLm1hdGNoKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgIHdhc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHJlY29ubmVjdEF0dGVtcHQgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlc2V0VGltZW91dCgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmFibGUgdG8gcGFyc2UgV2ViU29ja2V0IG1lc3NhZ2UnLCBldmVudC5kYXRhLCBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZWNvbm5lY3QgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkZWxheSA9IGJhY2tvZmZNcyhyZWNvbm5lY3RBdHRlbXB0KTtcbiAgICAgIHJlY29ubmVjdEF0dGVtcHQgKz0gMTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoY29ubmVjdCwgZGVsYXkpO1xuICAgIH07XG5cbiAgICBjb25uZWN0KCk7XG5cbiAgICByZXR1cm4gKG5leHQpID0+IChhY3Rpb24pID0+IHtcbiAgICAgIGlmIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT0gc29ja2V0Lk9QRU4gJiYgc2VuZEFjdGlvbk9uV2Vic29ja2V0KGFjdGlvbikpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgICAgIHNvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICByZXNldFRpbWVvdXQoKTtcbiAgICAgIH1cblxuICAgICAgbmV4dChhY3Rpb24pO1xuICAgIH07XG4gIH07XG5cbmNvbnN0IHNlbmRBY3Rpb25PbldlYnNvY2tldCA9IChhY3Rpb246IEFueUFjdGlvbik6IGJvb2xlYW4gPT4gYWN0aW9uPy5tZXRhPy53ZWJzb2NrZXQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvZGVcIjpcIkJ1aWxkTWVudS1tb2R1bGVfX2NvZGUtLUhjQ1ZjM0RFT0o0ODN6bEFkRmd3XCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiY29udGFpbmVyXCI6XCJCdXR0b25NZW51SXRlbS1tb2R1bGVfX2NvbnRhaW5lci0tWkJzSVVNVHNFSFdsY0pHUEVSd3Qgc2hhcmVkLW1vZHVsZV9fLW1lbnVJdGVtRnVsbEJ1dHRvbi0tbEJ6MWdTUzg1V1o2cXFJdDlDY28gc2hhcmVkLW1vZHVsZV9fLWJ1dHRvblJlc2V0LS1QZWpHZ3RrajAwMG1tMlNLeXdCWVwiLFwibmFtZVwiOlwiQnV0dG9uTWVudUl0ZW0tbW9kdWxlX19uYW1lLS1VM2V1OERaUnpLZ29XbUk5d1dCeCBzaGFyZWQtbW9kdWxlX18tbWVudUl0ZW1UaXRsZS0tSGljcElZMmxpOWZBVDFaekVTVFFcIixcImRlc2NyaXB0aW9uXCI6XCJCdXR0b25NZW51SXRlbS1tb2R1bGVfX2Rlc2NyaXB0aW9uLS1GazlCQXZ6TGJmam5nRmlGOTVFVlwifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImRlc2NyaXB0aW9uXCI6XCJDaGFubmVsTWVudS1tb2R1bGVfX2Rlc2NyaXB0aW9uLS1LTzFPaUpMQ3N4Y3g0U3d1UzRkMFwifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiQ29uZmlnRWxlbWVudC1tb2R1bGVfX2NvbnRhaW5lci0tREFxOUZ1UjBHbkRNR0JrY0lqUFNcIixcIm5hbWVcIjpcIkNvbmZpZ0VsZW1lbnQtbW9kdWxlX19uYW1lLS1VWkdlSUNIZW1zcWZRRVRzeGI0QlwiLFwibm90RGVmYXVsdFwiOlwiQ29uZmlnRWxlbWVudC1tb2R1bGVfX25vdERlZmF1bHQtLXdBNVM5VllndVFCM2QyTGRNdl9tIENvbmZpZ0VsZW1lbnQtbW9kdWxlX19uYW1lLS1VWkdlSUNIZW1zcWZRRVRzeGI0QlwiLFwidmFsdWVcIjpcIkNvbmZpZ0VsZW1lbnQtbW9kdWxlX192YWx1ZS0tWURiOXM4MVp5alhsT0tfd0Y5bktcIixcInNlbGVjdFwiOlwiQ29uZmlnRWxlbWVudC1tb2R1bGVfX3NlbGVjdC0tQU55VGZSVm5SSjNYU2s4Q1ByRUtcIixcInRvZ2dsZVwiOlwiQ29uZmlnRWxlbWVudC1tb2R1bGVfX3RvZ2dsZS0tWkZ4OXlqRDBMVk9EcDZ4WmtRZkZcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIkhlYWRlci1tb2R1bGVfX2NvbnRhaW5lci0tUUtzbHoxVnQzWExpNUh3OGwzWG5cIixcInNldFwiOlwiSGVhZGVyLW1vZHVsZV9fc2V0LS1LQVBjaEgwd2RVMFAwdGZQcXVqOFwiLFwic2V0Q2hhbm5lbE1vZGVcIjpcIkhlYWRlci1tb2R1bGVfX3NldENoYW5uZWxNb2RlLS15cGVveFl4RXpuaUVmSVNWODhkM1wifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiSGVhZGVyQnV0dG9uLW1vZHVsZV9fY29udGFpbmVyLS1zb0VPYzd0bUpKSFVjNkVuTVZjMlwiLFwiYm9sZFwiOlwiSGVhZGVyQnV0dG9uLW1vZHVsZV9fYm9sZC0tU2JNVXE2XzJUVU1nNFZpVUtZS29cIixcImV4cGFuZGFibGVcIjpcIkhlYWRlckJ1dHRvbi1tb2R1bGVfX2V4cGFuZGFibGUtLVNLdmJCN0ZpSF9tSjdUdkVVT3dhIEhlYWRlckJ1dHRvbi1tb2R1bGVfX2NvbnRhaW5lci0tc29FT2M3dG1KSkhVYzZFbk1WYzJcIixcImhhc0xlZnRJY29uXCI6XCJIZWFkZXJCdXR0b24tbW9kdWxlX19oYXNMZWZ0SWNvbi0tUEkyQXp4OWx2TjR6d2xHV3F3TTQgSGVhZGVyQnV0dG9uLW1vZHVsZV9fY29udGFpbmVyLS1zb0VPYzd0bUpKSFVjNkVuTVZjMlwiLFwiaGFzUmlnaHRJY29uXCI6XCJIZWFkZXJCdXR0b24tbW9kdWxlX19oYXNSaWdodEljb24tLUNPdzFyTk5adnY1UzlQRUtfWl9mIEhlYWRlckJ1dHRvbi1tb2R1bGVfX2NvbnRhaW5lci0tc29FT2M3dG1KSkhVYzZFbk1WYzJcIixcImljb25Pbmx5XCI6XCJIZWFkZXJCdXR0b24tbW9kdWxlX19pY29uT25seS0tWTRsc2c5N1BKUXQ1QzJaX2VHVnkgSGVhZGVyQnV0dG9uLW1vZHVsZV9fY29udGFpbmVyLS1zb0VPYzd0bUpKSFVjNkVuTVZjMlwiLFwibGVmdEljb25cIjpcIkhlYWRlckJ1dHRvbi1tb2R1bGVfX2xlZnRJY29uLS1RY19CVk0xZ1lRZ3V1YWw0VE13SFwiLFwiZHJvcFwiOlwiSGVhZGVyQnV0dG9uLW1vZHVsZV9fZHJvcC0tVThlSTJIM1NuaFRUZDAyMFN0MnlcIixcInJpZ2h0SWNvblwiOlwiSGVhZGVyQnV0dG9uLW1vZHVsZV9fcmlnaHRJY29uLS1salpRUXY1TmxKdlR5UFZQa0dKdlwifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiSGVscC1tb2R1bGVfX2NvbnRhaW5lci0tT3dzRUVkanNWYnBLRGdoOTNBOUFcIixcImNvZGVcIjpcIkhlbHAtbW9kdWxlX19jb2RlLS1ra3ZTc0dManVlN296MzJuUlFuc1wiLFwibG9nb1wiOlwiSGVscC1tb2R1bGVfX2xvZ28tLUVyU2R4OGJ2SlBhMWhtSTQ4U0hmXCIsXCJoZWFkZXJcIjpcIkhlbHAtbW9kdWxlX19oZWFkZXItLUcza05LeGVpUTJienZwenJSbWlLXCIsXCJoZWFkZXJMaW5rXCI6XCJIZWxwLW1vZHVsZV9faGVhZGVyTGluay0tRGVlY01mT0hWOEpYUF9iTUFqNUFcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIkhlbHBFeGFtcGxlLW1vZHVsZV9fY29udGFpbmVyLS14ZHAyME10TDZuU2hucTZKeFNBNVwiLFwibG9hZEV4YW1wbGVcIjpcIkhlbHBFeGFtcGxlLW1vZHVsZV9fbG9hZEV4YW1wbGUtLXJGdHhxSUNwMHFIUkwyUFdMOXZYXCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiaWNvblwiOlwiSWNvbi1tb2R1bGVfX2ljb24tLWJ3cmlUQnA5bXQzbFQzY1lmVG5LXCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiZG90XCI6XCJMb2FkZXItbW9kdWxlX19kb3QtLW1meTgwbFNjZXBqU1N4NGNNOHlkXCIsXCJsb2FkZXItZmFkZVwiOlwiTG9hZGVyLW1vZHVsZV9fbG9hZGVyLWZhZGUtLW9ZV2duUHBCWTRRN04xMUxJbDZIXCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiYXNpZGVcIjpcIk1lbnVBc2lkZS1tb2R1bGVfX2FzaWRlLS1hSjJGNFdESzlnb2M0VGExXzE2RFwifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiTWVudUdyb3VwLW1vZHVsZV9fY29udGFpbmVyLS1jdlBZOU81MU92UG5DUGNZRE1YOVwiLFwidGl0bGVcIjpcIk1lbnVHcm91cC1tb2R1bGVfX3RpdGxlLS1UdjZ3N0FITkFXWjBWQkNJMzZvc1wiLFwiY29udGVudFwiOlwiTWVudUdyb3VwLW1vZHVsZV9fY29udGVudC0tckk0cDRVZ2Jzc3l5TG10cXprNzZcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIk1lbnVJdGVtLW1vZHVsZV9fY29udGFpbmVyLS1xUVFSUlh5THpUdTZKSHZIR01ReFwifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiTm90aWZpY2F0aW9ucy1tb2R1bGVfX2NvbnRhaW5lci0tTEJDMHFKUGVpbVdvUTczOTdEOWtcIixcIm5vdGlmaWNhdGlvblwiOlwiTm90aWZpY2F0aW9ucy1tb2R1bGVfX25vdGlmaWNhdGlvbi0tcHFQa1FmYko5QzREbWZ1VXh5eDlcIixcIm5vdGlmaWNhdGlvbkNvbnRlbnRcIjpcIk5vdGlmaWNhdGlvbnMtbW9kdWxlX19ub3RpZmljYXRpb25Db250ZW50LS1qelEyU1BJb0ZibHNXUXVsZGJMOFwiLFwiY2xvc2VcIjpcIk5vdGlmaWNhdGlvbnMtbW9kdWxlX19jbG9zZS0tbEZzX2VTVjZxUFZDVmxWdHVJT1Qgc2hhcmVkLW1vZHVsZV9fLWJ1dHRvblJlc2V0LS1QZWpHZ3RrajAwMG1tMlNLeXdCWVwifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiT3V0cHV0LW1vZHVsZV9fY29udGFpbmVyLS1iX0p4c29XdnkxTzZtblF4cE91MVwiLFwidGFic1wiOlwiT3V0cHV0LW1vZHVsZV9fdGFicy0tWkthRzg0QzBuamxDY1VPUGZXa2VcIixcInRhYlwiOlwiT3V0cHV0LW1vZHVsZV9fdGFiLS1oQlBlQ3d2TFBBWVc3Qm1PNWZtYVwiLFwidGFiU2VsZWN0ZWRcIjpcIk91dHB1dC1tb2R1bGVfX3RhYlNlbGVjdGVkLS1ycVNVX3VwNDdmaUVqaTRkOFQzVyBPdXRwdXQtbW9kdWxlX190YWItLWhCUGVDd3ZMUEFZVzdCbU81Zm1hXCIsXCJ0YWJDbG9zZVwiOlwiT3V0cHV0LW1vZHVsZV9fdGFiQ2xvc2UtLUNac1BJczJOYnRWT0hMX1M1ak04IE91dHB1dC1tb2R1bGVfX3RhYi0taEJQZUN3dkxQQVlXN0JtTzVmbWFcIixcImJvZHlcIjpcIk91dHB1dC1tb2R1bGVfX2JvZHktLUtZMXNpY0JHZnd2M2FXa2JIQ1MxXCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiYWRkTWFpblwiOlwiT3V0cHV0LUV4ZWN1dGUtbW9kdWxlX19hZGRNYWluLS1sYzZGaVZDWHJ4TTdwMEM1YTlYNiBzaGFyZWQtbW9kdWxlX18tYnV0dG9uQXNMaW5rLS1hS1pwSmdteXdRaWpYYlZKVklJcSBzaGFyZWQtbW9kdWxlX18tYnV0dG9uUmVzZXQtLVBlakdndGtqMDAwbW0yU0t5d0JZXCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiY29udGFpbmVyXCI6XCJPdXRwdXQtR2lzdC1tb2R1bGVfX2NvbnRhaW5lci0tR01ZaGNvN0x4NFFJdTZQbkVSd2dcIixcImJ1dHRvblwiOlwiT3V0cHV0LUdpc3QtbW9kdWxlX19idXR0b24tLXd2dkFQX1VEcXR6NzBBc1ZnRFpXIHNoYXJlZC1tb2R1bGVfXy1idXR0b25SZXNldC0tUGVqR2d0a2owMDBtbTJTS3l3QllcIixcInRleHRcIjpcIk91dHB1dC1HaXN0LW1vZHVsZV9fdGV4dC0tU2RIQjdnMkM0WXAzX3R5RHBEVHNcIixcImFjdGl2ZVwiOlwiT3V0cHV0LUdpc3QtbW9kdWxlX19hY3RpdmUtLUZMNnBGODFER2YyUGlhS1d3NHdqIE91dHB1dC1HaXN0LW1vZHVsZV9fY29udGFpbmVyLS1HTVloY283THg0UUl1NlBuRVJ3Z1wifTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCBkZWZhdWx0IHtcImNvbnRhaW5lclwiOlwiT3V0cHV0LUhlYWRlci1tb2R1bGVfX2NvbnRhaW5lci0tdDhzaW1vd3ZzN1NWZmFqOU5vVTZcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIk91dHB1dC1PdXRwdXRQcmlzbS1tb2R1bGVfX2NvbnRhaW5lci0taEc3Z2FpWFVIU0h3RE5ZaEpzYjggc2hhcmVkLW1vZHVsZV9fLWJvZHlNb25vc3BhY2UtLUd0T0JpWGg2VFg2TVJjUHBmaXY1XCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiY29kZVwiOlwiT3V0cHV0LVNlY3Rpb24tbW9kdWxlX19jb2RlLS1tekZRdzZxQ2w2UWlLVk8zalVDOCBzaGFyZWQtbW9kdWxlX18tYm9keU1vbm9zcGFjZS0tR3RPQmlYaDZUWDZNUmNQcGZpdjVcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIlBsYXlncm91bmQtbW9kdWxlX19jb250YWluZXItLVNrSURfTTJXN2dTck9oUkZqTGFKXCIsXCItcmVzaXplYWJsZUFyZWFcIjpcIlBsYXlncm91bmQtbW9kdWxlX18tcmVzaXplYWJsZUFyZWEtLVhYeG9WclhTNU1lal9wRmtfUEh5IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIixcInJlc2l6ZWFibGVBcmVhUm93T3V0cHV0VW5mb2N1c2VkXCI6XCJQbGF5Z3JvdW5kLW1vZHVsZV9fcmVzaXplYWJsZUFyZWFSb3dPdXRwdXRVbmZvY3VzZWQtLXlOMXdIYWx3MEVwSEtCdVhhUmc4IFBsYXlncm91bmQtbW9kdWxlX18tcmVzaXplYWJsZUFyZWEtLVhYeG9WclhTNU1lal9wRmtfUEh5IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIixcInJlc2l6ZWFibGVBcmVhUm93T3V0cHV0Rm9jdXNlZFwiOlwiUGxheWdyb3VuZC1tb2R1bGVfX3Jlc2l6ZWFibGVBcmVhUm93T3V0cHV0Rm9jdXNlZC0tRFd4OGhKNDZhcmhjbm5rMXVlV2UgUGxheWdyb3VuZC1tb2R1bGVfXy1yZXNpemVhYmxlQXJlYS0tWFh4b1ZyWFM1TWVqX3BGa19QSHkgc2hhcmVkLW1vZHVsZV9fLWF1dG9TaXplLS1qN1VKak9KSThjVkNEdktEajFOQVwiLFwicmVzaXplYWJsZUFyZWFDb2x1bW5PdXRwdXRVbmZvY3VzZWRcIjpcIlBsYXlncm91bmQtbW9kdWxlX19yZXNpemVhYmxlQXJlYUNvbHVtbk91dHB1dFVuZm9jdXNlZC0tdF91ZUZDOUs2T2MzTlpUNWgwNE0gUGxheWdyb3VuZC1tb2R1bGVfXy1yZXNpemVhYmxlQXJlYS0tWFh4b1ZyWFM1TWVqX3BGa19QSHkgc2hhcmVkLW1vZHVsZV9fLWF1dG9TaXplLS1qN1VKak9KSThjVkNEdktEajFOQVwiLFwicmVzaXplYWJsZUFyZWFDb2x1bW5PdXRwdXRGb2N1c2VkXCI6XCJQbGF5Z3JvdW5kLW1vZHVsZV9fcmVzaXplYWJsZUFyZWFDb2x1bW5PdXRwdXRGb2N1c2VkLS1zWGRGaUJ1SVN4ODNKcGtidERuSiBQbGF5Z3JvdW5kLW1vZHVsZV9fLXJlc2l6ZWFibGVBcmVhLS1YWHhvVnJYUzVNZWpfcEZrX1BIeSBzaGFyZWQtbW9kdWxlX18tYXV0b1NpemUtLWo3VUpqT0pJOGNWQ0R2S0RqMU5BXCIsXCItZ3V0dGVyXCI6XCJQbGF5Z3JvdW5kLW1vZHVsZV9fLWd1dHRlci0ta0JhZ050RHQ3b1BfNGZrSmRjRVdcIixcInNwbGl0Um93c0d1dHRlclwiOlwiUGxheWdyb3VuZC1tb2R1bGVfX3NwbGl0Um93c0d1dHRlci0tVlpjUmJkRTJlR0dNWXhzbFYyaHUgUGxheWdyb3VuZC1tb2R1bGVfXy1ndXR0ZXItLWtCYWdOdER0N29QXzRma0pkY0VXXCIsXCJzcGxpdFJvd3NHdXR0ZXJIYW5kbGVcIjpcIlBsYXlncm91bmQtbW9kdWxlX19zcGxpdFJvd3NHdXR0ZXJIYW5kbGUtLWl0VXdoZUdlN18zd2MyX09CcDh6XCIsXCJzcGxpdENvbHVtbnNHdXR0ZXJcIjpcIlBsYXlncm91bmQtbW9kdWxlX19zcGxpdENvbHVtbnNHdXR0ZXItLUNiY1BZcld5c0NBNDB1TENQN2NnIFBsYXlncm91bmQtbW9kdWxlX18tZ3V0dGVyLS1rQmFnTnREdDdvUF80ZmtKZGNFV1wiLFwiZWRpdG9yXCI6XCJQbGF5Z3JvdW5kLW1vZHVsZV9fZWRpdG9yLS1xY1V6QnUyWXA5WGFVbEU3cXFNaiBzaGFyZWQtbW9kdWxlX18tYXV0b1NpemUtLWo3VUpqT0pJOGNWQ0R2S0RqMU5BXCIsXCJvdXRwdXRcIjpcIlBsYXlncm91bmQtbW9kdWxlX19vdXRwdXQtLU1Vc0I0SWNnMnZNVWV1M0ZrREpQIHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIlBvcEJ1dHRvbi1tb2R1bGVfX2NvbnRhaW5lci0tZjAzWGViYldzZVVzWjVfZWtpYVJcIixcImNvbnRlbnRcIjpcIlBvcEJ1dHRvbi1tb2R1bGVfX2NvbnRlbnQtLWttdnl0OFdOVjNaeHBIek1mZ0ZiXCJ9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge1wiY29udGFpbmVyXCI6XCJTZWdtZW50ZWRCdXR0b24tbW9kdWxlX19jb250YWluZXItLVlqR0h0RzhHbTRGdWhOTG1FeVRoXCIsXCJidXR0b25cIjpcIlNlZ21lbnRlZEJ1dHRvbi1tb2R1bGVfX2J1dHRvbi0tY0I2eG1kdG1Dcmk1aDF4VWwwT2cgc2hhcmVkLW1vZHVsZV9fLWJ1dHRvblJlc2V0LS1QZWpHZ3RrajAwMG1tMlNLeXdCWVwiLFwiYnV0dG9uQnVpbGRcIjpcIlNlZ21lbnRlZEJ1dHRvbi1tb2R1bGVfX2J1dHRvbkJ1aWxkLS1qRHRnUkRSaGx5NTEyeGwybnVCYiBTZWdtZW50ZWRCdXR0b24tbW9kdWxlX19idXR0b24tLWNCNnhtZHRtQ3JpNWgxeFVsME9nIHNoYXJlZC1tb2R1bGVfXy1idXR0b25SZXNldC0tUGVqR2d0a2owMDBtbTJTS3l3QllcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcIlNlbGVjdGFibGVNZW51SXRlbS1tb2R1bGVfX2NvbnRhaW5lci0tcERUWUg5NXRtRjlJaERvX281bFYgc2hhcmVkLW1vZHVsZV9fLW1lbnVJdGVtRnVsbEJ1dHRvbi0tbEJ6MWdTUzg1V1o2cXFJdDlDY28gc2hhcmVkLW1vZHVsZV9fLWJ1dHRvblJlc2V0LS1QZWpHZ3RrajAwMG1tMlNLeXdCWVwiLFwic2VsZWN0ZWRcIjpcIlNlbGVjdGFibGVNZW51SXRlbS1tb2R1bGVfX3NlbGVjdGVkLS1GWFVtZTg4WTdoNTFqTHN0VGpBciBTZWxlY3RhYmxlTWVudUl0ZW0tbW9kdWxlX19jb250YWluZXItLXBEVFlIOTV0bUY5SWhEb19vNWxWIHNoYXJlZC1tb2R1bGVfXy1tZW51SXRlbUZ1bGxCdXR0b24tLWxCejFnU1M4NVdaNnFxSXQ5Q2NvIHNoYXJlZC1tb2R1bGVfXy1idXR0b25SZXNldC0tUGVqR2d0a2owMDBtbTJTS3l3QllcIixcImhlYWRlclwiOlwiU2VsZWN0YWJsZU1lbnVJdGVtLW1vZHVsZV9faGVhZGVyLS1zZ0lZMDBHaDBOUGl6dHpLck04clwiLFwibmFtZVwiOlwiU2VsZWN0YWJsZU1lbnVJdGVtLW1vZHVsZV9fbmFtZS0tZ3NaT1pMRTRtQ0hmTlI1NEZPY1Mgc2hhcmVkLW1vZHVsZV9fLW1lbnVJdGVtVGl0bGUtLUhpY3BJWTJsaTlmQVQxWnpFU1RRXCIsXCJkZXNjcmlwdGlvblwiOlwiU2VsZWN0YWJsZU1lbnVJdGVtLW1vZHVsZV9fZGVzY3JpcHRpb24tLWlBSHBMQXptRHBhbGVuVERzREJ5XCIsXCJjaGVja21hcmtcIjpcIlNlbGVjdGFibGVNZW51SXRlbS1tb2R1bGVfX2NoZWNrbWFyay0teVVoSzVXSDBqU2tKdVZKekthbHBcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7XCJjb250YWluZXJcIjpcImVkaXRvci1FZGl0b3ItbW9kdWxlX19jb250YWluZXItLWU0VzR3cHZvMXk5RjRhZzVRSmo2IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIixcIi1hZHZhbmNlZFwiOlwiZWRpdG9yLUVkaXRvci1tb2R1bGVfXy1hZHZhbmNlZC0tS3pJQVd5ZXFlQUROblNiTUtKS1Ugc2hhcmVkLW1vZHVsZV9fLWJvZHlNb25vc3BhY2UtLUd0T0JpWGg2VFg2TVJjUHBmaXY1IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIixcImFjZVwiOlwiZWRpdG9yLUVkaXRvci1tb2R1bGVfX2FjZS0temE5RVJ5U283N2Z1anBrYWRwNUsgZWRpdG9yLUVkaXRvci1tb2R1bGVfXy1hZHZhbmNlZC0tS3pJQVd5ZXFlQUROblNiTUtKS1Ugc2hhcmVkLW1vZHVsZV9fLWJvZHlNb25vc3BhY2UtLUd0T0JpWGg2VFg2TVJjUHBmaXY1IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIixcIm1vbmFjb1wiOlwiZWRpdG9yLUVkaXRvci1tb2R1bGVfX21vbmFjby0tRTdWaldrcEt3ck16cl9xcTRDRmIgZWRpdG9yLUVkaXRvci1tb2R1bGVfXy1hZHZhbmNlZC0tS3pJQVd5ZXFlQUROblNiTUtKS1Ugc2hhcmVkLW1vZHVsZV9fLWJvZHlNb25vc3BhY2UtLUd0T0JpWGg2VFg2TVJjUHBmaXY1IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIixcInNpbXBsZVwiOlwiZWRpdG9yLUVkaXRvci1tb2R1bGVfX3NpbXBsZS0tZUFSckJlcG5lSTFsSVdxR2RZMmcgZWRpdG9yLUVkaXRvci1tb2R1bGVfXy1hZHZhbmNlZC0tS3pJQVd5ZXFlQUROblNiTUtKS1Ugc2hhcmVkLW1vZHVsZV9fLWJvZHlNb25vc3BhY2UtLUd0T0JpWGg2VFg2TVJjUHBmaXY1IHNoYXJlZC1tb2R1bGVfXy1hdXRvU2l6ZS0tajdVSmpPSkk4Y1ZDRHZLRGoxTkFcIn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQgZGVmYXVsdCB7fTsiLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5hbWREID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoJ2RlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdCcpO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmFtZE8gPSB7fTsiLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLVwiICsge1widmVuZG9ycy1ub2RlX21vZHVsZXNfYWNlLWJ1aWxkc19zcmMtbm9jb25mbGljdF9hY2VfanMtbm9kZV9tb2R1bGVzX2FjZS1idWlsZHNfc3JjLW5vY29uZmxpY3RfLWJiZDUyZVwiOlwiOWU3NzM4YzE2NDhiMmI2NWYwOWVcIixcImVkaXRvcl9BY2VFZGl0b3JDb3JlX3RzeFwiOlwiNTM5ZDUyZDMxNTRmY2RkMDE2MzdcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3JlYWN0LW1vbmFjby1lZGl0b3JfbGliX2luZGV4X2pzXCI6XCJhOWJkOGJjNzZjMmI4OTc2NDUzNVwiLFwiZWRpdG9yX01vbmFjb0VkaXRvckNvcmVfdHN4XCI6XCI3MWM0ZGU1MTY0ZDE5NTZkMjZkMlwiLFwiYWNlLWtleWJpbmRpbmctZW1hY3NcIjpcImNjZDkzMjE2Zjg3NTQ5ZWUwMTQ0XCIsXCJhY2Uta2V5YmluZGluZy1zdWJsaW1lXCI6XCI3YzcyNjQzYTU2YTIzNjgxNzgyY1wiLFwiYWNlLWtleWJpbmRpbmctdmltXCI6XCJhNjQ2MDJmNGE5ZjAxNzg0NTdlZFwiLFwiYWNlLWtleWJpbmRpbmctdnNjb2RlXCI6XCJkYTllN2Q0OGI5NzgyMTg5M2ZlOVwiLFwiYWNlLXRoZW1lLWFtYmlhbmNlXCI6XCIwMmUxMWUxZjJmY2VkY2I4MDYzY1wiLFwiYWNlLXRoZW1lLWFtYmlhbmNlLWNzc1wiOlwiZGQ5NTMzM2RiMDI0YjAxMGIwYmRcIixcImFjZS10aGVtZS1jaGFvc1wiOlwiOGU1MjU1NjczZTBmZmRlNzRjNjJcIixcImFjZS10aGVtZS1jaGFvcy1jc3NcIjpcIjAzODUyOTgyMmY5ZTY4YTRmYzA3XCIsXCJhY2UtdGhlbWUtY2hyb21lXCI6XCJkNTQyOTZjZDQ2MjBkZmQyNTQ1N1wiLFwiYWNlLXRoZW1lLWNocm9tZS1jc3NcIjpcIjcyN2E0YjRkZWMxMzhmOTM1NGFiXCIsXCJhY2UtdGhlbWUtY2xvdWQ5X2RheVwiOlwiMmFhZmEwNTE4NzgyMmIxMWZlNzdcIixcImFjZS10aGVtZS1jbG91ZDlfZGF5LWNzc1wiOlwiMDMxZjcyM2MwMmRiNjQwZTllYmRcIixcImFjZS10aGVtZS1jbG91ZDlfbmlnaHRcIjpcIjk1MzZhNjYwNTFhYmIyOTc2MDcxXCIsXCJhY2UtdGhlbWUtY2xvdWQ5X25pZ2h0LWNzc1wiOlwiODhjNzM3NmI5OGE1YmE3ZThjNTJcIixcImFjZS10aGVtZS1jbG91ZDlfbmlnaHRfbG93X2NvbG9yXCI6XCJjZGJkZGZjY2M0MjBjNGNjZmJiM1wiLFwiYWNlLXRoZW1lLWNsb3VkOV9uaWdodF9sb3dfY29sb3ItY3NzXCI6XCJiOGY3NjIyZDE3MmNhMGNiMzliNFwiLFwiYWNlLXRoZW1lLWNsb3Vkc1wiOlwiMDYyNTZkOTRlZDdkMzhhM2NhMmJcIixcImFjZS10aGVtZS1jbG91ZHMtY3NzXCI6XCIzOTUyY2I5NmM0MTRmZTBjM2RjZVwiLFwiYWNlLXRoZW1lLWNsb3Vkc19taWRuaWdodFwiOlwiMWNkZTljMWRhNzliOTBjNTJlYWVcIixcImFjZS10aGVtZS1jbG91ZHNfbWlkbmlnaHQtY3NzXCI6XCJlMzU5OTdmMjEzYmFlNmU4ZmE2MlwiLFwiYWNlLXRoZW1lLWNvYmFsdFwiOlwiMmRmMTdmOTRhNWU1NDg1MzIwM2JcIixcImFjZS10aGVtZS1jb2JhbHQtY3NzXCI6XCI0ODE0ZmQ2MWE5NGY1ZWQ1Mzc4MFwiLFwiYWNlLXRoZW1lLWNyaW1zb25fZWRpdG9yXCI6XCJjZGM4MTkzZWFmYTJjNDFmY2IyOVwiLFwiYWNlLXRoZW1lLWNyaW1zb25fZWRpdG9yLWNzc1wiOlwiMWFmOGY0MmUwNTc4NjE5ZGZmYTVcIixcImFjZS10aGVtZS1kYXduXCI6XCIxYmNjMzRmZGU2ZjM3NjY1MWM5MlwiLFwiYWNlLXRoZW1lLWRhd24tY3NzXCI6XCJkODNjNjgxNTIwNjk1ZDMxMDBmMVwiLFwiYWNlLXRoZW1lLWRyYWN1bGFcIjpcIjQxMTEzYWYzMTMxN2NiOTcwNzdjXCIsXCJhY2UtdGhlbWUtZHJhY3VsYS1jc3NcIjpcImZlZWFkNGM4M2MzYzk1NmQ4YjVhXCIsXCJhY2UtdGhlbWUtZHJlYW13ZWF2ZXJcIjpcIjc2YmFhMmZkZTM1YjI5NmFlMjg3XCIsXCJhY2UtdGhlbWUtZHJlYW13ZWF2ZXItY3NzXCI6XCJlNGNiNTdlMTk0MjI3YmIzYWE4M1wiLFwiYWNlLXRoZW1lLWVjbGlwc2VcIjpcIjkyMDFkMmEwMDc2Mzk4NzQ1ZGI0XCIsXCJhY2UtdGhlbWUtZWNsaXBzZS1jc3NcIjpcIjUyZDEzNzJkNDcxMGEwZjk5ZGE2XCIsXCJhY2UtdGhlbWUtZ2l0aHViXCI6XCIyMDMxZmExNjZiMDlmODc3ODFhZVwiLFwiYWNlLXRoZW1lLWdpdGh1Yi1jc3NcIjpcImUyMTg4OWFhNWExZDlkNjRkMzdkXCIsXCJhY2UtdGhlbWUtZ2l0aHViX2RhcmtcIjpcImZmY2VhMmFiNWU1MTk3MjUzYTNhXCIsXCJhY2UtdGhlbWUtZ2l0aHViX2RhcmstY3NzXCI6XCIzYWIxMjAyMTZhNWVkZjUwZGY3NVwiLFwiYWNlLXRoZW1lLWdvYlwiOlwiNzkyM2EyOWFmYTBjNDU0MjgyOGVcIixcImFjZS10aGVtZS1nb2ItY3NzXCI6XCI2NmQwYmMxNDk5YjVhNTY2OTk5Y1wiLFwiYWNlLXRoZW1lLWdydXZib3hcIjpcIjk5OGI2N2I0ZmZhNDhjMjQyYTYwXCIsXCJhY2UtdGhlbWUtZ3J1dmJveC1jc3NcIjpcImZhNzlhNjM0ZTQ5ZjU1MmJiMGIxXCIsXCJhY2UtdGhlbWUtZ3J1dmJveF9kYXJrX2hhcmRcIjpcIjNkYmFmOWQ5OTIzNmU2NmQ3ZmY3XCIsXCJhY2UtdGhlbWUtZ3J1dmJveF9kYXJrX2hhcmQtY3NzXCI6XCI4ZDVjMzIzYWNhOWNhZDgyNzY3N1wiLFwiYWNlLXRoZW1lLWdydXZib3hfbGlnaHRfaGFyZFwiOlwiMDRjZDE3YThiZTZkOTQ2MDdlNWNcIixcImFjZS10aGVtZS1ncnV2Ym94X2xpZ2h0X2hhcmQtY3NzXCI6XCJiMDU3ZTY1YTE4MWRlNzY0ZDVlZVwiLFwiYWNlLXRoZW1lLWlkbGVfZmluZ2Vyc1wiOlwiYTZmZGFhYjliNzg0ZTMxMjIxMTNcIixcImFjZS10aGVtZS1pZGxlX2ZpbmdlcnMtY3NzXCI6XCJkMmJkMDYxZTMwYjhjZWQxNGY0NFwiLFwiYWNlLXRoZW1lLWlwbGFzdGljXCI6XCIzMWJmMDdlZmYxNmZhYzVmY2Y4OVwiLFwiYWNlLXRoZW1lLWlwbGFzdGljLWNzc1wiOlwiNGFlMjUzZmI4YzAyYTMwZjBkOGVcIixcImFjZS10aGVtZS1rYXR6ZW5taWxjaFwiOlwiYzU2MmFkNjM4MjM3M2E3M2RlODVcIixcImFjZS10aGVtZS1rYXR6ZW5taWxjaC1jc3NcIjpcIjM1YjI0Yjc2NGZmYWY2Yzk0MmJjXCIsXCJhY2UtdGhlbWUta3JfdGhlbWVcIjpcIjAxMDc1NDZjODI2Y2M4YWFkNDlhXCIsXCJhY2UtdGhlbWUta3JfdGhlbWUtY3NzXCI6XCI3MjQ1YWY1ZmZjODcyZDE5ZTg2N1wiLFwiYWNlLXRoZW1lLWt1cm9pclwiOlwiZjgyNzIxMTFiYTE5YjllMjVjNjlcIixcImFjZS10aGVtZS1rdXJvaXItY3NzXCI6XCI4NGM0ZWI3OTYyM2NmOGIyM2Q1MlwiLFwiYWNlLXRoZW1lLW1lcmJpdm9yZVwiOlwiYjQ4OTY3MzVhZjc2YTA3MmQxOTNcIixcImFjZS10aGVtZS1tZXJiaXZvcmUtY3NzXCI6XCJkZWY1MzNkZTk5YmNlY2IxM2VjZlwiLFwiYWNlLXRoZW1lLW1lcmJpdm9yZV9zb2Z0XCI6XCI4OGE3NzY4NjMzY2IyNDZkMGMyN1wiLFwiYWNlLXRoZW1lLW1lcmJpdm9yZV9zb2Z0LWNzc1wiOlwiYTgxODkxMmZkYjI4YmZiN2JkMzFcIixcImFjZS10aGVtZS1tb25vX2luZHVzdHJpYWxcIjpcIjM1ZGY5MzE5MzA1YzM3NDZkNmU0XCIsXCJhY2UtdGhlbWUtbW9ub19pbmR1c3RyaWFsLWNzc1wiOlwiNTRjMTBkMzAyMTFkZmJjMTY1ODFcIixcImFjZS10aGVtZS1tb25va2FpXCI6XCJlYTE3NzNkMGI1NWI1YTA2YzNmN1wiLFwiYWNlLXRoZW1lLW1vbm9rYWktY3NzXCI6XCJjMzc3YmExNjA2ZTEzNDg4ZTNhMlwiLFwiYWNlLXRoZW1lLW5vcmRfZGFya1wiOlwiZDFmNWVlZGRiZTVkNjkzYzc2OTlcIixcImFjZS10aGVtZS1ub3JkX2RhcmstY3NzXCI6XCJlMDdmZmI4ZGFhNWM5YTkzNjUxN1wiLFwiYWNlLXRoZW1lLW9uZV9kYXJrXCI6XCJlMTAzZTE0OTQwYzFlYTVmZTZjNFwiLFwiYWNlLXRoZW1lLW9uZV9kYXJrLWNzc1wiOlwiNWM2NGQ5NThmYjQ2YWMxMjI3YTNcIixcImFjZS10aGVtZS1wYXN0ZWxfb25fZGFya1wiOlwiYzQwZTZkYTE4ZDZmMWY0YjdjZTdcIixcImFjZS10aGVtZS1wYXN0ZWxfb25fZGFyay1jc3NcIjpcImRkZWU1NmEwZTY0ZmVlMDE3OTg1XCIsXCJhY2UtdGhlbWUtc29sYXJpemVkX2RhcmtcIjpcIjdlNDA3MWQ2MzcwOTZhMmIzNjFhXCIsXCJhY2UtdGhlbWUtc29sYXJpemVkX2RhcmstY3NzXCI6XCI5OTk4ZTA1OTIzZTRkMTMwYzY4NVwiLFwiYWNlLXRoZW1lLXNvbGFyaXplZF9saWdodFwiOlwiNDc5NGFmMmRiZmMzYTlmNzJhMzRcIixcImFjZS10aGVtZS1zb2xhcml6ZWRfbGlnaHQtY3NzXCI6XCJjMzZhODYwNmNjYmIyYTJkOWJlYlwiLFwiYWNlLXRoZW1lLXNxbHNlcnZlclwiOlwiY2I2NWQ4YzVjZjdlMGU4Mjg2MzRcIixcImFjZS10aGVtZS1zcWxzZXJ2ZXItY3NzXCI6XCJkYmFmZmMxOWYzZjQxNTA1NDYyOVwiLFwiYWNlLXRoZW1lLXRlcm1pbmFsXCI6XCJjOGMyYjg0OTYwOGNjOGEwYWJlOVwiLFwiYWNlLXRoZW1lLXRlcm1pbmFsLWNzc1wiOlwiNDI2OWU0NTQ3NDZkODM3OGMzZjhcIixcImFjZS10aGVtZS10ZXh0bWF0ZVwiOlwiODJlYjg5ZDRiMjk2MzcxMjgyZGVcIixcImFjZS10aGVtZS10ZXh0bWF0ZS1jc3NcIjpcIjJmODhmZDA1Zjg3YjRlMjJhMDg1XCIsXCJhY2UtdGhlbWUtdG9tb3Jyb3dcIjpcImYxZjMzMzVhNzYxMjdhZWQ4YTU4XCIsXCJhY2UtdGhlbWUtdG9tb3Jyb3ctY3NzXCI6XCJmYTUyYWMwODkwM2Q3Y2FkYmI2MVwiLFwiYWNlLXRoZW1lLXRvbW9ycm93X25pZ2h0XCI6XCJhZGVjMWUwODhiZTJkNmJlOGUyZVwiLFwiYWNlLXRoZW1lLXRvbW9ycm93X25pZ2h0LWNzc1wiOlwiMWNmNjJkZWVlYzVkZTg3Y2QyOTRcIixcImFjZS10aGVtZS10b21vcnJvd19uaWdodF9ibHVlXCI6XCI3M2NkYjgzMWQ4ZWJiNDNlMjEyNVwiLFwiYWNlLXRoZW1lLXRvbW9ycm93X25pZ2h0X2JsdWUtY3NzXCI6XCI5N2U4MGQxMGIxYWYwYmNlMDk4NlwiLFwiYWNlLXRoZW1lLXRvbW9ycm93X25pZ2h0X2JyaWdodFwiOlwiYjY0NDA1OTA2NjQwZGE0YzlmM2FcIixcImFjZS10aGVtZS10b21vcnJvd19uaWdodF9icmlnaHQtY3NzXCI6XCIwZmEwYjBkNTNjODVjMDU0YTIyZlwiLFwiYWNlLXRoZW1lLXRvbW9ycm93X25pZ2h0X2VpZ2h0aWVzXCI6XCI3OGFiYjYwMTI4ODYxOGZkM2Y3ZlwiLFwiYWNlLXRoZW1lLXRvbW9ycm93X25pZ2h0X2VpZ2h0aWVzLWNzc1wiOlwiYWQ2ZjY3MDVjNzMyYTA4MWJmNGJcIixcImFjZS10aGVtZS10d2lsaWdodFwiOlwiNDM2ZjlkZTM0ZDc3MTIyZDJkMDNcIixcImFjZS10aGVtZS10d2lsaWdodC1jc3NcIjpcIjJmNGM3ODJhZDNlYjY4NjBkMTAzXCIsXCJhY2UtdGhlbWUtdmlicmFudF9pbmtcIjpcImI1MDg5NGVjY2VkYWFmOGNiNGUxXCIsXCJhY2UtdGhlbWUtdmlicmFudF9pbmstY3NzXCI6XCI3NTk3ZGZlMDMzMmViZjkwZDQ5OFwiLFwiYWNlLXRoZW1lLXhjb2RlXCI6XCJhYTllNmRmZjgxMjllNWM1ZGNlZlwiLFwiYWNlLXRoZW1lLXhjb2RlLWNzc1wiOlwiNDIxMWEwZWM4MjQ2MDE2YjdlNzVcIn1bY2h1bmtJZF0gKyBcIi5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCItXCIgKyBcImE5YmQ4YmM3NmMyYjg5NzY0NTM1XCIgKyBcIi5jc3NcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidWk6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJhc3NldHMvXCI7IiwiaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xudmFyIGNyZWF0ZVN0eWxlc2hlZXQgPSAoY2h1bmtJZCwgZnVsbGhyZWYsIG9sZFRhZywgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR2YXIgb25MaW5rQ29tcGxldGUgPSAoZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MuXG5cdFx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBudWxsO1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbG9hZCcpIHtcblx0XHRcdHJlc29sdmUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdHZhciByZWFsSHJlZiA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaHJlZiB8fCBmdWxsaHJlZjtcblx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgcmVhbEhyZWYgKyBcIilcIik7XG5cdFx0XHRlcnIuY29kZSA9IFwiQ1NTX0NIVU5LX0xPQURfRkFJTEVEXCI7XG5cdFx0XHRlcnIudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdGVyci5yZXF1ZXN0ID0gcmVhbEhyZWY7XG5cdFx0XHRpZiAobGlua1RhZy5wYXJlbnROb2RlKSBsaW5rVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlua1RhZylcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fVxuXHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG9uTGlua0NvbXBsZXRlO1xuXHRsaW5rVGFnLmhyZWYgPSBmdWxsaHJlZjtcblxuXHRpZiAob2xkVGFnKSB7XG5cdFx0b2xkVGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmtUYWcsIG9sZFRhZy5uZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblx0fVxuXHRyZXR1cm4gbGlua1RhZztcbn07XG52YXIgZmluZFN0eWxlc2hlZXQgPSAoaHJlZiwgZnVsbGhyZWYpID0+IHtcblx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHRhZztcblx0fVxuXHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcblx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiB0YWc7XG5cdH1cbn07XG52YXIgbG9hZFN0eWxlc2hlZXQgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdGlmKGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcblx0XHRjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBudWxsLCByZXNvbHZlLCByZWplY3QpO1xuXHR9KTtcbn1cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgQ1NTIGNodW5rc1xudmFyIGluc3RhbGxlZENzc0NodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5taW5pQ3NzID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdHZhciBjc3NDaHVua3MgPSB7XCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19yZWFjdC1tb25hY28tZWRpdG9yX2xpYl9pbmRleF9qc1wiOjF9O1xuXHRpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0pIHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ3NzQ2h1bmtzW2NodW5rSWRdKTtcblx0ZWxzZSBpZihpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gIT09IDAgJiYgY3NzQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF0gPSBsb2FkU3R5bGVzaGVldChjaHVua0lkKS50aGVuKCgpID0+IHtcblx0XHRcdGluc3RhbGxlZENzc0NodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0fSwgKGUpID0+IHtcblx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRDc3NDaHVua3NbY2h1bmtJZF07XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pKTtcblx0fVxufTtcblxuLy8gbm8gaG1yIiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1aVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1aVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfZmxvYXRpbmctdWlfcmVhY3RfZGlzdF9mbG9hdGluZy11aV9yZWFjdF9lc21fanMtbm9kZV9tb2R1bGVzX3JlZHV4anNfdG9vLTQwZjA5MlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlQ2FsbGJhY2siLCJ1c2VTZWxlY3RvciIsInVzZURpc3BhdGNoIiwiYWN0aW9ucyIsIkVpdGhlciIsIkVpdGhlckNvbmZpZyIsIlNlbGVjdCIsIlNlbGVjdENvbmZpZyIsIk1lbnVHcm91cCIsInNlbGVjdG9ycyIsIkJhY2t0cmFjZSIsIkVkaXRpb24iLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiQWR2YW5jZWRPcHRpb25zTWVudSIsImlzRWRpdGlvbkRlZmF1bHQiLCJlZGl0aW9uIiwic3RhdGUiLCJjb25maWd1cmF0aW9uIiwiaXNCYWNrdHJhY2VTZXQiLCJnZXRCYWNrdHJhY2VTZXQiLCJiYWNrdHJhY2UiLCJkaXNwYXRjaCIsImNoYW5nZUVkaXRpb24iLCJlIiwiY2hhbmdlQmFja3RyYWNlIiwiYiIsInRpdGxlIiwiY2hpbGRyZW4iLCJuYW1lIiwidmFsdWUiLCJpc05vdERlZmF1bHQiLCJvbkNoYW5nZSIsIlJ1c3QyMDE1IiwiUnVzdDIwMTgiLCJSdXN0MjAyMSIsImlkIiwiYSIsIkRpc2FibGVkIiwiRW5hYmxlZCIsInVzZUFwcERpc3BhdGNoIiwiQnV0dG9uTWVudUl0ZW0iLCJNZW51QXNpZGUiLCJzdHlsZXMiLCJ1c2VEaXNwYXRjaEFuZENsb3NlIiwiYWN0aW9uIiwiY2xvc2UiLCJCdWlsZE1lbnUiLCJwcm9wcyIsImlzSGlyQXZhaWxhYmxlIiwiaXNXYXNtQXZhaWxhYmxlIiwiY29tcGlsZSIsInBlcmZvcm1Db21waWxlIiwiY29tcGlsZVRvQXNzZW1ibHkiLCJwZXJmb3JtQ29tcGlsZVRvQXNzZW1ibHkiLCJjb21waWxlVG9MTFZNIiwicGVyZm9ybUNvbXBpbGVUb0xMVk0iLCJjb21waWxlVG9NaXIiLCJwZXJmb3JtQ29tcGlsZVRvTWlyIiwiY29tcGlsZVRvSGlyIiwicGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlIaXIiLCJjb21waWxlVG9XYXNtIiwicGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlXYXNtIiwiZXhlY3V0ZSIsInBlcmZvcm1FeGVjdXRlIiwidGVzdCIsInBlcmZvcm1UZXN0Iiwib25DbGljayIsImNsYXNzTmFtZSIsImNvZGUiLCJIaXJBc2lkZSIsIldhc21Bc2lkZSIsIk1lbnVJdGVtIiwiX3JlZiIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIl9vYmplY3RTcHJlYWQiLCJjb250YWluZXIiLCJkZXNjcmlwdGlvbiIsIkZyYWdtZW50IiwiU2VsZWN0T25lIiwiQ2hhbm5lbCIsIkNoYW5uZWxNZW51IiwiY2hhbm5lbCIsInN0YWJsZVZlcnNpb24iLCJzdGFibGVWZXJzaW9uVGV4dCIsImJldGFWZXJzaW9uIiwiYmV0YVZlcnNpb25UZXh0IiwibmlnaHRseVZlcnNpb24iLCJuaWdodGx5VmVyc2lvblRleHQiLCJqYXZhMTlWZXJzaW9uIiwiamF2YTE5VmVyc2lvblRleHQiLCJiZXRhVmVyc2lvbkRldGFpbHMiLCJiZXRhVmVyc2lvbkRldGFpbHNUZXh0IiwibmlnaHRseVZlcnNpb25EZXRhaWxzIiwibmlnaHRseVZlcnNpb25EZXRhaWxzVGV4dCIsImNoYW5nZUNoYW5uZWwiLCJjdXJyZW50VmFsdWUiLCJ0aGlzVmFsdWUiLCJTdGFibGUiLCJjaGFuZ2VWYWx1ZSIsIkRlc2MiLCJCZXRhIiwiTmlnaHRseSIsIkphdmExOSIsImFMYWJlbCIsImJMYWJlbCIsInJlc3QiLCJDb25maWdFbGVtZW50IiwidG9nZ2xlIiwidHlwZSIsImNoZWNrZWQiLCJodG1sRm9yIiwiX3JlZjIiLCJfZXhjbHVkZWQyIiwic2VsZWN0IiwidGFyZ2V0IiwiX3JlZjMiLCJhc2lkZSIsIm5vdERlZmF1bHQiLCJBc3NlbWJseUZsYXZvciIsIkRlbWFuZ2xlQXNzZW1ibHkiLCJFZGl0b3IiLCJPcmllbnRhdGlvbiIsIlBhaXJDaGFyYWN0ZXJzIiwiUHJvY2Vzc0Fzc2VtYmx5IiwiTU9OQUNPX1RIRU1FUyIsIkNvbmZpZ01lbnUiLCJrZXliaW5kaW5nIiwiYWNlIiwiYWNlVGhlbWUiLCJ0aGVtZSIsIm1vbmFjb1RoZW1lIiwibW9uYWNvIiwib3JpZW50YXRpb24iLCJlZGl0b3JTdHlsZSIsImVkaXRvciIsInBhaXJDaGFyYWN0ZXJzIiwiYXNzZW1ibHlGbGF2b3IiLCJkZW1hbmdsZUFzc2VtYmx5IiwicHJvY2Vzc0Fzc2VtYmx5IiwiY2hhbmdlQWNlVGhlbWUiLCJ0IiwiY2hhbmdlTW9uYWNvVGhlbWUiLCJjaGFuZ2VLZXliaW5kaW5nIiwiayIsImNoYW5nZU9yaWVudGF0aW9uIiwibyIsImNoYW5nZUVkaXRvclN0eWxlIiwiY2hhbmdlRWRpdG9yIiwiY2hhbmdlQXNzZW1ibHlGbGF2b3IiLCJjaGFuZ2VQYWlyQ2hhcmFjdGVycyIsInAiLCJjaGFuZ2VQcm9jZXNzQXNzZW1ibHkiLCJjaGFuZ2VEZW1hbmdsZUFzc2VtYmx5IiwiZCIsIlNpbXBsZSIsIkFjZSIsIk1vbmFjbyIsIm1hcCIsIkFDRV9LRVlCSU5ESU5HUyIsIkFDRV9USEVNRVMiLCJBdXRvbWF0aWMiLCJIb3Jpem9udGFsIiwiVmVydGljYWwiLCJBdHQiLCJJbnRlbCIsIkRlbWFuZ2xlIiwiTWFuZ2xlIiwiRmlsdGVyIiwiUmF3IiwiSGVhZGVyQnV0dG9uIiwiQnVpbGRJY29uIiwiQ29uZmlnSWNvbiIsIkhlbHBJY29uIiwiTW9yZU9wdGlvbnNBY3RpdmVJY29uIiwiTW9yZU9wdGlvbnNJY29uIiwiTW9kZU1lbnUiLCJQb3BCdXR0b24iLCJTZWdtZW50ZWRCdXR0b24iLCJTZWdtZW50ZWRCdXR0b25TZXQiLCJTZWdtZW50ZWRMaW5rIiwiVG9vbHNNZW51IiwicGVyZm9ybUdpc3RTYXZlIiwiSGVhZGVyIiwiSGVhZGVyU2V0IiwiRXhlY3V0ZUJ1dHRvbiIsIkJ1aWxkTWVudUJ1dHRvbiIsIk1vZGVNZW51QnV0dG9uIiwiQ2hhbm5lbE1lbnVCdXR0b24iLCJBZHZhbmNlZE9wdGlvbnNNZW51QnV0dG9uIiwiU2hhcmVCdXR0b24iLCJUb29sc01lbnVCdXR0b24iLCJDb25maWdNZW51QnV0dG9uIiwiSGVscEJ1dHRvbiIsInNldENoYW5uZWxNb2RlIiwic2V0IiwiZXhlY3V0aW9uTGFiZWwiLCJnZXRFeGVjdXRpb25MYWJlbCIsInBlcmZvcm1QcmltYXJ5QWN0aW9uIiwiaXNCdWlsZCIsImJvbGQiLCJyaWdodEljb24iLCJCdXR0b24iLCJmb3J3YXJkUmVmIiwicmVmIiwiaWNvbiIsImRpc3BsYXlOYW1lIiwiTWVudSIsImxhYmVsIiwiZ2V0TW9kZUxhYmVsIiwiaXNFeHBhbmRhYmxlIiwiZ2V0Q2hhbm5lbExhYmVsIiwiX3JlZjQiLCJhZHZhbmNlZE9wdGlvbnNTZXQiLCJnZXRBZHZhbmNlZE9wdGlvbnNTZXQiLCJfcmVmNSIsImdpc3RTYXZlIiwiX3JlZjYiLCJfcmVmNyIsIm5hdmlnYXRlVG9IZWxwIiwiRXhwYW5kYWJsZUljb24iLCJjIiwicHVzaCIsImhhc0xlZnRJY29uIiwiaGFzUmlnaHRJY29uIiwiZXhwYW5kYWJsZSIsImljb25Pbmx5Iiwiam9pbiIsImxlZnRJY29uIiwiZHJvcCIsIkV4YW1wbGUiLCJMaW5rIiwiaW50ZWdlcjMyTG9nbyIsIkFDRV9VUkwiLCJDTElQUFlfVVJMIiwiTUlSSV9VUkwiLCJDUkFURVNfSU9fVVJMIiwiUlVTVF9DT09LQk9PS19VUkwiLCJDUkFURVNfVVJMIiwiR0lTVF9VUkwiLCJJMzJfVVJMIiwiTE9DQUxTVE9SQUdFX1VSTCIsIk9SSUdJTkFMX1BMQVlHUk9VTkRfVVJMIiwiUkVQT19VUkwiLCJSVVNURk1UX1VSTCIsIlNIRVBNQVNURVJfVVJMIiwiQ1JBVEVfRVhBTVBMRSIsIkNMSVBQWV9FWEFNUExFIiwiTUlSSV9FWEFNUExFIiwiUlVTVEZNVF9FWEFNUExFIiwiTElOS19FWEFNUExFIiwiVEVTVF9FWEFNUExFIiwiTElCUkFSWV9FWEFNUExFIiwiT1VUUFVUX0VYQU1QTEUiLCJIZWxwIiwibmF2aWdhdGVUb0luZGV4IiwiTGlua2FibGVTZWN0aW9uIiwiaGVhZGVyIiwibGV2ZWwiLCJocmVmIiwibG9nbyIsInNyYyIsImFsdCIsIkNvZGUiLCJMZXZlbCIsImhlYWRlckxpbmsiLCJyb290IiwiUHJpc21Db2RlIiwicHJpc21UaGVtZSIsIkhlbHBFeGFtcGxlIiwic2hvd0V4YW1wbGUiLCJsb2FkRXhhbXBsZSIsImRpdiIsInJlbCIsImhlaWdodCIsInZpZXdCb3giLCJ3aWR0aCIsInhtbG5zIiwib3BhY2l0eSIsImZpbGxSdWxlIiwiZmlsbCIsIkNoZWNrbWFya0ljb24iLCJDbGlwYm9hcmRJY29uIiwieCIsInkiLCJDbG9zZSIsIkxvYWRlciIsImRvdCIsImNvbnRlbnQiLCJNb2RlIiwibW9kZSIsImNoYW5nZU1vZGUiLCJEZWJ1ZyIsIlJlbGVhc2UiLCJQb3J0YWwiLCJTVVJWRVlfVVJMIiwiTm90aWZpY2F0aW9ucyIsIlJ1c3RTdXJ2ZXkyMDIyTm90aWZpY2F0aW9uIiwic2hvd1J1c3RTdXJ2ZXkyMDIyIiwic2hvd1J1c3RTdXJ2ZXkyMDIyU2VsZWN0b3IiLCJzZWVuUnVzdFN1cnZleTIwMjEiLCJzZWVuUnVzdFN1cnZleTIwMjIiLCJOb3RpZmljYXRpb24iLCJvbkNsb3NlIiwibm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uQ29udGVudCIsIkZvY3VzIiwiRXhlY3V0ZSIsIkdpc3QiLCJTZWN0aW9uIiwiU2ltcGxlUGFuZSIsIlBhbmVXaXRoTWlyIiwiVGFiIiwia2luZCIsImZvY3VzIiwidGFiUHJvcHMiLCJoYXNQcm9wZXJ0aWVzIiwidGFiU2VsZWN0ZWQiLCJ0YWIiLCJQYW5lV2l0aENvZGUiLCJPdXRwdXQiLCJzb21ldGhpbmdUb1Nob3ciLCJnZXRTb21ldGhpbmdUb1Nob3ciLCJtZXRhIiwiZm9ybWF0IiwiY2xpcHB5IiwibWlyaSIsIm1hY3JvRXhwYW5zaW9uIiwiYXNzZW1ibHkiLCJsbHZtSXIiLCJtaXIiLCJoaXIiLCJ3YXNtIiwiZ2lzdCIsIm91dHB1dCIsImZvY3VzQ2xvc2UiLCJjaGFuZ2VGb2N1cyIsImZvY3VzRXhlY3V0ZSIsImZvY3VzRm9ybWF0IiwiRm9ybWF0IiwiZm9jdXNDbGlwcHkiLCJDbGlwcHkiLCJmb2N1c01pcmkiLCJNaXJpIiwiZm9jdXNNYWNyb0V4cGFuc2lvbiIsIk1hY3JvRXhwYW5zaW9uIiwiZm9jdXNBc3NlbWJseSIsIkFzbSIsImZvY3VzTGx2bUlyIiwiTGx2bUlyIiwiZm9jdXNNaXIiLCJNaXIiLCJmb2N1c0hpciIsIkhpciIsImZvY3VzV2FzbSIsIldhc20iLCJmb2N1c0dpc3QiLCJib2R5IiwidGFiQ2xvc2UiLCJ0YWJzIiwiZGV0YWlscyIsImlzQXV0b0J1aWxkIiwiaXNBdXRvQnVpbGRTZWxlY3RvciIsImFkZE1haW5GdW5jdGlvbiIsIldhcm5pbmciLCJhZGRNYWluIiwiQ29weVRvQ2xpcGJvYXJkIiwic2hvd0xvYWRlciIsInNob3dHaXN0TG9hZGVyU2VsZWN0b3IiLCJMaW5rcyIsIkNvcGllZCIsIlB1cmVDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsIl9kZWZpbmVQcm9wZXJ0eSIsInNldFN0YXRlIiwiY29waWVkIiwic2V0VGltZW91dCIsInJlbmRlciIsImFjdGl2ZSIsInRleHQiLCJvbkNvcHkiLCJidXR0b24iLCJjb2RlVXJsIiwiY29kZVVybFNlbGVjdG9yIiwiZ2lzdFVybCIsInVybCIsInBlcm1hbGluayIsInBlcm1hbGlua1NlbGVjdG9yIiwidXJsb1VybCIsInVybG9VcmxTZWxlY3RvciIsInRleHRDaGFuZ2VkIiwidGV4dENoYW5nZWRTaW5jZVNoYXJlU2VsZWN0b3IiLCJOZXdXaW5kb3ciLCJHZW5lcmljTG9hZGVyIiwiT3V0cHV0UHJpc20iLCJsYW5ndWFnZUNvZGUiLCJDaGlsZHJlbiIsImNvdW50IiwiSGlnaGxpZ2h0RXJyb3JzIiwicmVxdWVzdHNJblByb2dyZXNzIiwiZXJyb3IiLCJzdGRlcnIiLCJzdGRvdXQiLCJQbGF5Z3JvdW5kIiwiUGFnZVN3aXRjaGVyIiwicGFnZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIlNwbGl0IiwiX0ZyYWdtZW50IiwiVFJBQ0tfT1BUSU9OX05BTUUiLCJGT0NVU0VEX0dSSURfU1RZTEUiLCJyZXNpemVhYmxlQXJlYVJvd091dHB1dEZvY3VzZWQiLCJyZXNpemVhYmxlQXJlYUNvbHVtbk91dHB1dEZvY3VzZWQiLCJVTkZPQ1VTRURfR1JJRF9TVFlMRSIsInJlc2l6ZWFibGVBcmVhUm93T3V0cHV0VW5mb2N1c2VkIiwicmVzaXplYWJsZUFyZWFDb2x1bW5PdXRwdXRVbmZvY3VzZWQiLCJIQU5ETEVfU1RZTEVTIiwic3BsaXRSb3dzR3V0dGVyIiwic3BsaXRSb3dzR3V0dGVySGFuZGxlIiwic3BsaXRDb2x1bW5zR3V0dGVyIiwiUmVzaXphYmxlQXJlYSIsImlzRm9jdXNlZCIsImlzT3V0cHV0Rm9jdXNlZCIsInJlc2l6ZUNvbXBsZXRlIiwic3BsaXRSYXRpb0NoYW5nZWQiLCJncmlkIiwiZHJhZ0hhbmRsZSIsImN1cnJlbnQiLCJzdHlsZSIsInJlbW92ZVByb3BlcnR5Iiwic3BsaXQiLCJtaW5TaXplIiwidHJhY2siLCJlbGVtZW50Iiwib25EcmFnRW5kIiwiZGVzdHJveSIsImdyaWRTdHlsZXMiLCJncmlkU3R5bGUiLCJoYW5kbGVPdXRlclN0eWxlIiwiaGFuZGxlSW5uZXJTdHlsZSIsIldlYlNvY2tldFN0YXR1cyIsImVuYWJsZWQiLCJ3ZWJzb2NrZXRGZWF0dXJlRmxhZ0VuYWJsZWQiLCJzdGF0dXMiLCJ3ZWJzb2NrZXRTdGF0dXNTZWxlY3RvciIsInBvc2l0aW9uIiwibGVmdCIsImJvdHRvbSIsInpJbmRleCIsImNvbG9yIiwic2hvd05vdGlmaWNhdGlvbnMiLCJhbnlOb3RpZmljYXRpb25zVG9TaG93U2VsZWN0b3IiLCJGbG9hdGluZ0Fycm93IiwiRmxvYXRpbmdGb2N1c01hbmFnZXIiLCJhcnJvdyIsImF1dG9VcGRhdGUiLCJmbGlwIiwib2Zmc2V0Iiwic2hpZnQiLCJ1c2VDbGljayIsInVzZURpc21pc3MiLCJ1c2VGbG9hdGluZyIsInVzZUludGVyYWN0aW9ucyIsInVzZVJvbGUiLCJ1c2VTdGF0ZSIsImlzT3BlbiIsInNldElzT3BlbiIsInYiLCJhcnJvd1JlZiIsInJlZnMiLCJzdHJhdGVneSIsImNvbnRleHQiLCJvcGVuIiwib25PcGVuQ2hhbmdlIiwibWlkZGxld2FyZSIsIndoaWxlRWxlbWVudHNNb3VudGVkIiwiY2xpY2siLCJkaXNtaXNzIiwicm9sZSIsImdldFJlZmVyZW5jZVByb3BzIiwiZ2V0RmxvYXRpbmdQcm9wcyIsInNldFJlZmVyZW5jZSIsInNldEZsb2F0aW5nIiwidG9wIiwiY3JlYXRlQnJvd3Nlckhpc3RvcnkiLCJjcmVhdGVIaXN0b3J5IiwiY3JlYXRlUm91dGVyIiwiVXNzUm91dGVyIiwicXMiLCJSb3V0ZSIsImhvbWVSb3V0ZSIsImhlbHBSb3V0ZSIsInN0YXRlU2VsZWN0b3IiLCJzdGF0ZVRvTG9jYXRpb24iLCJwYXRobmFtZSIsInF1ZXJ5IiwidmVyc2lvbiIsInN0cmluZ2lmeSIsImxvY2F0aW9uVG9BY3Rpb24iLCJsb2NhdGlvbiIsIm1hdGNoZWRIZWxwIiwibWF0Y2giLCJoZWxwUGFnZUxvYWQiLCJtYXRjaGVkIiwiaW5kZXhQYWdlTG9hZCIsInBhcnNlIiwic2VhcmNoIiwic2xpY2UiLCJSb3V0ZXIiLCJDb21wb25lbnQiLCJoaXN0b3J5Iiwic3RvcmUiLCJyZWR1Y2VyIiwicm91dGVyIiwiYnV0dG9uQnVpbGQiLCJTZWxlY3RhYmxlTWVudUl0ZW0iLCJzZWxlY3RlZCIsImNoZWNrbWFyayIsInBlcmZvcm1Gb3JtYXQiLCJydXN0Zm10VmVyc2lvbiIsInJ1c3RmbXRWZXJzaW9uVGV4dCIsInJ1c3RmbXRWZXJzaW9uRGV0YWlscyIsInJ1c3RmbXRWZXJzaW9uRGV0YWlsc1RleHQiLCJjbGlwcHlWZXJzaW9uRGV0YWlscyIsImNsaXBweVZlcnNpb25EZXRhaWxzVGV4dCIsImNsaXBweVZlcnNpb24iLCJjbGlwcHlWZXJzaW9uVGV4dCIsIm1pcmlWZXJzaW9uRGV0YWlscyIsIm1pcmlWZXJzaW9uRGV0YWlsc1RleHQiLCJtaXJpVmVyc2lvbiIsIm1pcmlWZXJzaW9uVGV4dCIsInBlcmZvcm1DbGlwcHkiLCJwZXJmb3JtTWlyaSIsImV4cGFuZE1hY3JvcyIsInBlcmZvcm1NYWNyb0V4cGFuc2lvbiIsImZldGNoIiwiY29kZVNlbGVjdG9yIiwiY2xpcHB5UmVxdWVzdFNlbGVjdG9yIiwiZ2V0Q3JhdGVUeXBlIiwicnVuQXNUZXN0IiwiUHJpbWFyeUFjdGlvbkF1dG8iLCJQcmltYXJ5QWN0aW9uQ29yZSIsIm1ha2VQb3NpdGlvbiIsInBlcmZvcm1Db21tb25FeGVjdXRlIiwicGVyZm9ybUdpc3RMb2FkIiwicm91dGVzIiwiY3JhdGVzIiwic3RhYmxlIiwiYmV0YSIsIm5pZ2h0bHkiLCJydXN0Zm10IiwiamF2YTE5IiwiZ2lzdExvYWQiLCJjcmVhdGVBY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJBY3Rpb25UeXBlIiwiaW5pdGlhbGl6ZUFwcGxpY2F0aW9uIiwiSW5pdGlhbGl6ZUFwcGxpY2F0aW9uIiwiZGlzYWJsZVN5bmNDaGFuZ2VzVG9TdG9yYWdlIiwiRGlzYWJsZVN5bmNDaGFuZ2VzVG9TdG9yYWdlIiwic2V0UGFnZSIsIlNldFBhZ2UiLCJDaGFuZ2VFZGl0b3IiLCJDaGFuZ2VLZXliaW5kaW5nIiwiQ2hhbmdlQWNlVGhlbWUiLCJDaGFuZ2VNb25hY29UaGVtZSIsIkNoYW5nZVBhaXJDaGFyYWN0ZXJzIiwiQ2hhbmdlT3JpZW50YXRpb24iLCJDaGFuZ2VBc3NlbWJseUZsYXZvciIsIkNoYW5nZURlbWFuZ2xlQXNzZW1ibHkiLCJDaGFuZ2VQcm9jZXNzQXNzZW1ibHkiLCJjaGFuZ2VQcmltYXJ5QWN0aW9uIiwicHJpbWFyeUFjdGlvbiIsIkNoYW5nZVByaW1hcnlBY3Rpb24iLCJDaGFuZ2VDaGFubmVsIiwiQ2hhbmdlTW9kZSIsIkNoYW5nZUVkaXRpb24iLCJDaGFuZ2VCYWNrdHJhY2UiLCJyZUV4ZWN1dGVXaXRoQmFja3RyYWNlIiwicGVyZm9ybUV4ZWN1dGVPbmx5IiwiQ2hhbmdlRm9jdXMiLCJqc29uR2V0IiwiZmV0Y2hKc29uIiwibWV0aG9kIiwianNvblBvc3QiLCJKU09OIiwiYXJncyIsImhlYWRlcnMiLCJIZWFkZXJzIiwicmVzcG9uc2UiLCJuZXR3b3JrRXJyb3IiLCJFcnJvciIsInRvU3RyaW5nIiwianNvbiIsImNvbnZlcnRFcnJvciIsIm9rIiwiYWRhcHRGZXRjaEVycm9yIiwiY2IiLCJyZXN1bHQiLCJwZXJmb3JtQXV0b09ubHkiLCJnZXRTdGF0ZSIsImNyYXRlVHlwZSIsInRlc3RzIiwicGVyZm9ybUNvbXBpbGVPbmx5IiwicGVyZm9ybVRlc3RPbmx5IiwicGVyZm9ybUNvbXBpbGVTaG93IiwicmVxdWVzdCIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwidGhlbiIsImNhdGNoIiwicmVxdWVzdENvbXBpbGVBc3NlbWJseSIsIkNvbXBpbGVBc3NlbWJseVJlcXVlc3QiLCJyZWNlaXZlQ29tcGlsZUFzc2VtYmx5U3VjY2VzcyIsIkNvbXBpbGVBc3NlbWJseVN1Y2NlZWRlZCIsInJlY2VpdmVDb21waWxlQXNzZW1ibHlGYWlsdXJlIiwiQ29tcGlsZUFzc2VtYmx5RmFpbGVkIiwicGVyZm9ybUNvbXBpbGVUb0Fzc2VtYmx5T25seSIsInJlcXVlc3RDb21waWxlTGx2bUlyIiwiQ29tcGlsZUxsdm1JclJlcXVlc3QiLCJyZWNlaXZlQ29tcGlsZUxsdm1JclN1Y2Nlc3MiLCJDb21waWxlTGx2bUlyU3VjY2VlZGVkIiwicmVjZWl2ZUNvbXBpbGVMbHZtSXJGYWlsdXJlIiwiQ29tcGlsZUxsdm1JckZhaWxlZCIsInBlcmZvcm1Db21waWxlVG9MTFZNT25seSIsInJlcXVlc3RDb21waWxlSGlyIiwiQ29tcGlsZUhpclJlcXVlc3QiLCJyZWNlaXZlQ29tcGlsZUhpclN1Y2Nlc3MiLCJDb21waWxlSGlyU3VjY2VlZGVkIiwicmVjZWl2ZUNvbXBpbGVIaXJGYWlsdXJlIiwiQ29tcGlsZUhpckZhaWxlZCIsInBlcmZvcm1Db21waWxlVG9IaXJPbmx5IiwicGVyZm9ybUNvbXBpbGVUb05pZ2h0bHlIaXJPbmx5IiwicmVxdWVzdENvbXBpbGVNaXIiLCJDb21waWxlTWlyUmVxdWVzdCIsInJlY2VpdmVDb21waWxlTWlyU3VjY2VzcyIsIl9yZWY4IiwiQ29tcGlsZU1pclN1Y2NlZWRlZCIsInJlY2VpdmVDb21waWxlTWlyRmFpbHVyZSIsIl9yZWY5IiwiQ29tcGlsZU1pckZhaWxlZCIsInBlcmZvcm1Db21waWxlVG9NaXJPbmx5IiwicmVxdWVzdENvbXBpbGVXYXNtIiwiQ29tcGlsZVdhc21SZXF1ZXN0IiwicmVjZWl2ZUNvbXBpbGVXYXNtU3VjY2VzcyIsIl9yZWYxMCIsIkNvbXBpbGVXYXNtU3VjY2VlZGVkIiwicmVjZWl2ZUNvbXBpbGVXYXNtRmFpbHVyZSIsIl9yZWYxMSIsIkNvbXBpbGVXYXNtRmFpbGVkIiwicGVyZm9ybUNvbXBpbGVUb1dhc20iLCJwZXJmb3JtQ29tcGlsZVRvTmlnaHRseVdhc21Pbmx5IiwiUFJJTUFSWV9BQ1RJT05TIiwiQ29tcGlsZSIsIlRlc3QiLCJBdXRvIiwicGVyZm9ybUFuZFN3aXRjaFByaW1hcnlBY3Rpb24iLCJpbm5lciIsImVkaXRDb2RlIiwiRWRpdENvZGUiLCJBZGRNYWluRnVuY3Rpb24iLCJhZGRJbXBvcnQiLCJBZGRJbXBvcnQiLCJlbmFibGVGZWF0dXJlR2F0ZSIsImZlYXR1cmVHYXRlIiwiRW5hYmxlRmVhdHVyZUdhdGUiLCJnb3RvUG9zaXRpb24iLCJsaW5lIiwiY29sdW1uIiwiR290b1Bvc2l0aW9uIiwic2VsZWN0VGV4dCIsInN0YXJ0IiwiZW5kIiwiU2VsZWN0VGV4dCIsInJlcXVlc3RDbGlwcHkiLCJSZXF1ZXN0Q2xpcHB5IiwicmVjZWl2ZUNsaXBweVN1Y2Nlc3MiLCJfcmVmMTIiLCJDbGlwcHlTdWNjZWVkZWQiLCJyZWNlaXZlQ2xpcHB5RmFpbHVyZSIsIl9yZWYxMyIsIkNsaXBweUZhaWxlZCIsInJlcXVlc3RNaXJpIiwiUmVxdWVzdE1pcmkiLCJyZWNlaXZlTWlyaVN1Y2Nlc3MiLCJfcmVmMTQiLCJNaXJpU3VjY2VlZGVkIiwicmVjZWl2ZU1pcmlGYWlsdXJlIiwiX3JlZjE1IiwiTWlyaUZhaWxlZCIsInJlcXVlc3RNYWNyb0V4cGFuc2lvbiIsIlJlcXVlc3RNYWNyb0V4cGFuc2lvbiIsInJlY2VpdmVNYWNyb0V4cGFuc2lvblN1Y2Nlc3MiLCJfcmVmMTYiLCJNYWNyb0V4cGFuc2lvblN1Y2NlZWRlZCIsInJlY2VpdmVNYWNyb0V4cGFuc2lvbkZhaWx1cmUiLCJfcmVmMTciLCJNYWNyb0V4cGFuc2lvbkZhaWxlZCIsInJlcXVlc3RDcmF0ZXNMb2FkIiwiUmVxdWVzdENyYXRlc0xvYWQiLCJyZWNlaXZlQ3JhdGVzTG9hZFN1Y2Nlc3MiLCJfcmVmMTgiLCJDcmF0ZXNMb2FkU3VjY2VlZGVkIiwicGVyZm9ybUNyYXRlc0xvYWQiLCJyZXF1ZXN0VmVyc2lvbnNMb2FkIiwiUmVxdWVzdFZlcnNpb25zTG9hZCIsInJlY2VpdmVWZXJzaW9uc0xvYWRTdWNjZXNzIiwiX3JlZjE5IiwiVmVyc2lvbnNMb2FkU3VjY2VlZGVkIiwicGVyZm9ybVZlcnNpb25zTG9hZCIsImFsbCIsIlByb21pc2UiLCJfcmVmMjAiLCJub3RpZmljYXRpb25TZWVuIiwiTm90aWZpY2F0aW9uU2VlbiIsIlJ1c3RTdXJ2ZXkyMDIyIiwiYnJvd3NlcldpZHRoQ2hhbmdlZCIsImlzU21hbGwiLCJCcm93c2VyV2lkdGhDaGFuZ2VkIiwiU3BsaXRSYXRpb0NoYW5nZWQiLCJwYXJzZUNoYW5uZWwiLCJzIiwicGFyc2VNb2RlIiwicGFyc2VFZGl0aW9uIiwiX3JlZjIxIiwibW9kZVN0cmluZyIsImVkaXRpb25TdHJpbmciLCJtYXliZUVkaXRpb24iLCJtZXJnZSIsImNvbmZpZ3VyZVN0b3JlIiwicmVkdXhDb25maWd1cmVTdG9yZSIsInByb2R1Y2UiLCJpbml0aWFsaXplTG9jYWxTdG9yYWdlIiwiaW5pdGlhbGl6ZVNlc3Npb25TdG9yYWdlIiwid2Vic29ja2V0TWlkZGxld2FyZSIsIndpbmRvdyIsImJhc2VVcmwiLCJVUkwiLCJ3ZWJzb2NrZXQiLCJpbml0aWFsR2xvYmFsU3RhdGUiLCJnbG9iYWxDb25maWd1cmF0aW9uIiwiaW5pdGlhbEFwcFN0YXRlIiwidW5kZWZpbmVkIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJwcmVsb2FkZWRTdGF0ZSIsImluaXRpYWxTdGF0ZSIsImdldERlZmF1bHRNaWRkbGV3YXJlIiwiY29uY2F0Iiwic3Vic2NyaWJlIiwic3luY0NoYW5nZXNUb1N0b3JhZ2UiLCJzYXZlQ2hhbmdlcyIsIlN1c3BlbnNlIiwic3VzcGVuZCIsImFjZUtleWJpbmRpbmciLCJhY2VQYWlyQ2hhcmFjdGVycyIsImFjZVJlc2l6ZUtleSIsIm9mZmVyQ3JhdGVBdXRvY29tcGxldGVPblVzZSIsIkFjZUVkaXRvckRlcGVuZGVuY2llcyIsImltcG9ydEtleWJpbmRpbmciLCJpbXBvcnRUaGVtZSIsImFsbFNldHRsZWQiLCJBY2VFZGl0b3JMYXp5IiwibGF6eSIsIkFjZUVkaXRvckFzeW5jIiwicmVzaXplS2V5IiwiYXV0b2NvbXBsZXRlT25Vc2UiLCJmYWxsYmFjayIsIkFjZUVkaXRvciIsIlNpbXBsZUVkaXRvciIsIk1vbmFjb0VkaXRvciIsIkVkaXRvclR5cGUiLCJwb3NpdGlvblNlbGVjdG9yIiwic2VsZWN0aW9uU2VsZWN0b3IiLCJlZGl0b3JNYXAiLCJzZWxlY3Rpb24iLCJvbkVkaXRDb2RlIiwiU2VsZWN0ZWRFZGl0b3IiLCJNb25hY29FZGl0b3JMYXp5IiwiaXNFcXVhbCIsIkNvZGVCeXRlT2Zmc2V0cyIsImxpbmVzIiwibGluZVRvT2Zmc2V0cyIsInByZWNlZGluZ0J5dGVzIiwiYnl0ZXNCZWZvcmVMaW5lIiwiaGlnaGxpZ2h0ZWRMaW5lIiwiaGlnaGxpZ2h0ZWRCeXRlcyIsImxlbmd0aCIsInJhbmdlVG9PZmZzZXRzIiwic3RhcnRCeXRlcyIsInBvc2l0aW9uVG9CeXRlcyIsImVuZEJ5dGVzIiwicHJlY2VkaW5nTGluZXMiLCJsIiwicmVkdWNlIiwiYXJndW1lbnRzIiwiY29tcG9uZW50IiwiX2VkaXRvciIsImtleSIsImN0cmxLZXkiLCJtZXRhS2V5IiwidHJhY2tFZGl0b3IiLCJzaW1wbGUiLCJhdXRvQ2FwaXRhbGl6ZSIsImF1dG9Db21wbGV0ZSIsImF1dG9Db3JyZWN0Iiwic3BlbGxDaGVjayIsIm9uS2V5RG93biIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInNldFNlbGVjdGlvbiIsIm9sZFBvc2l0aW9uIiwibmV3UG9zaXRpb24iLCJvZmZzZXRzIiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJvbGRTZWxlY3Rpb24iLCJuZXdTZWxlY3Rpb24iLCJQcmlzbSIsImNvbmZpZ3VyZVJ1c3RFcnJvcnMiLCJnZXRDaGFubmVsIiwibGFuZ3VhZ2VzIiwicnVzdF9lcnJvcnMiLCJwYXR0ZXJuIiwiaW5zaWRlIiwicnVzdF9taXIiLCJob29rcyIsImFkZCIsImVudiIsImVycm9yTWF0Y2giLCJleGVjIiwiZXJyb3JDb2RlIiwidGFnIiwiYXR0cmlidXRlcyIsImNvbCIsImVycm9yTWF0Y2hGdWxsIiwiZXJyb3JNYXRjaFNob3J0IiwiZmVhdHVyZU1hdGNoIiwiXyIsImxpbmVNYXRjaCIsInN0YXJ0TGluZSIsInN0YXJ0Q29sIiwiZW5kTGluZSIsImVuZENvbCIsImxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJsaW5rIiwiSFRNTEFuY2hvckVsZW1lbnQiLCJkYXRhc2V0Iiwib25jbGljayIsInByZXZlbnREZWZhdWx0IiwiaW1wb3J0U3VnZ2VzdGlvbnMiLCJzdWdnZXN0aW9uIiwiZmVhdHVyZUdhdGVFbmFibGVycyIsImJhY2t0cmFjZUVuYWJsZXJzIiwibWlyU291cmNlTGlua3MiLCJjcmVhdGVSb290IiwiUHJvdmlkZXIiLCJwbGF5Z3JvdW5kQXBwIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiaGFzIiwid2hlbkJyb3dzZXJXaWR0aENoYW5nZWQiLCJldnQiLCJtYXRjaGVzIiwibWF4V2lkdGhNZWRpYVF1ZXJ5IiwibWF0Y2hNZWRpYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJydXN0UGxheWdyb3VuZCIsInNldENvZGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlVmVyc2lvbiIsImluaXRpYWxpemVTdG9yYWdlIiwiQ1VSUkVOVF9WRVJTSU9OIiwic2VyaWFsaXplIiwiY29uZiIsIm5vdGlmaWNhdGlvbnMiLCJtaWdyYXRlVjEiLCJfc3RhdGUkY29uZmlndXJhdGlvbiIsInN0ZXAiLCJtaWdyYXRlVjIiLCJtaWdyYXRlIiwiZGVzZXJpYWxpemUiLCJzYXZlZFN0YXRlIiwicGFyc2VkU3RhdGUiLCJzdG9yYWdlRmFjdG9yeSIsIkRFRkFVTFQiLCJyYXRpb0dlbmVyYXRpb24iLCJwZW5kaW5nIiwiZnVsZmlsbGVkIiwicGF5bG9hZCIsInNvcnRCeSIsImNvbWJpbmVSZWR1Y2VycyIsImJyb3dzZXIiLCJ2ZXJzaW9ucyIsInNlZW5SdXN0U3VydmV5MjAxOCIsInNlZW5SdXN0MjAxOElzRGVmYXVsdCIsInNlZW5SdXN0U3VydmV5MjAyMCIsInNlZW5SdXN0MjAyMUlzRGVmYXVsdCIsInNlZW5Nb25hY29FZGl0b3JBdmFpbGFibGUiLCJmaW5pc2giLCJjcmVhdGVBc3luY1RodW5rIiwiY3JlYXRlU2xpY2UiLCJ6IiwiZXhlY3V0ZVJlcXVlc3RQYXlsb2FkU2VsZWN0b3IiLCJ1c2VXZWJzb2NrZXRTZWxlY3RvciIsImNyZWF0ZVdlYnNvY2tldFJlc3BvbnNlQWN0aW9uIiwiY3JlYXRlV2Vic29ja2V0UmVzcG9uc2VTY2hlbWEiLCJtYWtlV2ViU29ja2V0TWV0YSIsIndzRXhlY3V0ZVJlc3BvbnNlUGF5bG9hZFNjaGVtYSIsIm9iamVjdCIsImJvb2xlYW4iLCJzdHJpbmciLCJ3c0V4ZWN1dGVSZXNwb25zZSIsInNsaWNlTmFtZSIsInJlZHVjZXJzIiwid3NFeGVjdXRlUmVxdWVzdCIsInNlcXVlbmNlTnVtYmVyIiwicHJlcGFyZSIsImV4dHJhUmVkdWNlcnMiLCJidWlsZGVyIiwiYWRkQ2FzZSIsInJlamVjdGVkIiwibWVzc2FnZSIsInVzZVdlYlNvY2tldCIsIndzRXhlY3V0ZVJlc3BvbnNlU2NoZW1hIiwiZm9ybWF0UmVxdWVzdFNlbGVjdG9yIiwiX2FyZyIsImJhc2VVcmxTZWxlY3RvciIsInUiLCJ6ZXJvU3RhdGUiLCJuZXdTdGF0ZSIsImNvbm5lY3RlZCIsImZlYXR1cmVGbGFnRW5hYmxlZCIsIndlYnNvY2tldENvbm5lY3RlZFBheWxvYWRTY2hlbWEiLCJpQWNjZXB0VGhpc0lzQW5VbnN1cHBvcnRlZEFwaSIsIndlYnNvY2tldEVycm9yUGF5bG9hZFNjaGVtYSIsIl9hY3Rpb24iLCJkaXNjb25uZWN0ZWQiLCJ3ZWJzb2NrZXRDb25uZWN0ZWQiLCJ3ZWJzb2NrZXREaXNjb25uZWN0ZWQiLCJ3ZWJzb2NrZXRFcnJvciIsIndlYnNvY2tldENvbm5lY3RlZFNjaGVtYSIsIndlYnNvY2tldEVycm9yU2NoZW1hIiwic291cmNlIiwiY3JlYXRlU2VsZWN0b3IiLCJIQVNfVEVTVFNfUkUiLCJoYXNUZXN0c1NlbGVjdG9yIiwiSEFTX01BSU5fRlVOQ1RJT05fUkUiLCJoYXNNYWluRnVuY3Rpb25TZWxlY3RvciIsIkNSQVRFX1RZUEVfUkUiLCJjcmF0ZVR5cGVTZWxlY3RvciIsImF1dG9QcmltYXJ5QWN0aW9uU2VsZWN0b3IiLCJoYXNUZXN0cyIsImhhc01haW5GdW5jdGlvbiIsInJhd1ByaW1hcnlBY3Rpb25TZWxlY3RvciIsImF1dG9QcmltYXJ5QWN0aW9uIiwicHJpbWFyeUFjdGlvblNlbGVjdG9yIiwiTEFCRUxTIiwiZ2V0U3RhYmxlIiwiZ2V0QmV0YSIsImdldE5pZ2h0bHkiLCJnZXRKYXZhMTkiLCJnZXRSdXN0Zm10IiwiZ2V0Q2xpcHB5IiwiZ2V0TWlyaSIsInZlcnNpb25OdW1iZXIiLCJ2ZXJzaW9uRGV0YWlscyIsImRhdGUiLCJoYXNoIiwiZWRpdGlvblNlbGVjdG9yIiwiaXNOaWdodGx5Q2hhbm5lbCIsImVkaXRpb25EZWZhdWx0IiwiYmFja3RyYWNlU2V0Iiwib2JqIiwidmFsdWVzIiwic29tZSIsInZhbCIsImdldE91dHB1dHMiLCJnaXN0U2VsZWN0b3IiLCJ1cmxRdWVyeVNlbGVjdG9yIiwicmVzIiwib3JpZ2luYWxRdWVyeSIsImNvZGVCbG9jayIsImxhbmd1YWdlIiwibWF5YmVPdXRwdXQiLCJ3aGVuUHJlc2VudCIsInNuaXBwZXRTZWxlY3RvciIsInNuaXBwZXQiLCJuZXdVc2Vyc1Bvc3RVcmwiLCJzZWFyY2hQYXJhbXMiLCJub3RpZmljYXRpb25zU2VsZWN0b3IiLCJOT1ciLCJEYXRlIiwiUlVTVF9TVVJWRVlfMjAyMl9FTkQiLCJSVVNUX1NVUlZFWV8yMDIyX09QRU4iLCJfbGVuIiwiYWxsTm90aWZpY2F0aW9ucyIsIl9rZXkiLCJuIiwib3JpZW50YXRpb25Db25maWciLCJicm93c2VyV2lkdGhJc1NtYWxsIiwid2lkdGhJc1NtYWxsIiwiYWNlQ29uZmlnIiwid3MiLCJfc3RhdGUiLCJkYXRhIiwibXVuZ2VkIiwiSW5NZW1vcnlTdG9yYWdlIiwiZ2V0SXRlbSIsInNldEl0ZW0iLCJLRVkiLCJjb25maWciLCJzdG9yYWdlIiwidmFsaWRhdGVTdG9yYWdlIiwic2VyaWFsaXplZFN0YXRlIiwiY29uc29sZSIsIndhcm4iLCJ1c2VDb250ZXh0IiwiQ29udGV4dCIsImFuY2hvclByb3BzIiwicmVhbE9uQ2xpY2siLCJwcm92aXNpb25hbExvY2F0aW9uIiwiY3JlYXRlQ29udGV4dCIsImludGVyZXN0aW5nUHJldlN0YXRlIiwibmV4dFN0YXRlIiwiaW50ZXJlc3RpbmdOZXh0U3RhdGUiLCJuZXh0TG9jYXRpb24iLCJwYXRoc0VxdWFsRW5vdWdoIiwiZGlzcGF0Y2hCcm93c2VyTG9jYXRpb25DaGFuZ2UiLCJsaXN0ZW4iLCJtYWtlQWN0aW9uIiwidGVtcFN0b3JlIiwiZGV2VG9vbHMiLCJtYXliZVN0YXRlIiwiYUhyZWYiLCJjcmVhdGVIcmVmIiwiYkhyZWYiLCJhY3Rpb25DcmVhdG9yIiwiY3JlYXRvciIsImxpdGVyYWwiLCJudW1iZXIiLCJuZXh0U2VxdWVuY2VOdW1iZXIiLCJXU01lc3NhZ2VSZXNwb25zZSIsImRpc2NyaW1pbmF0ZWRVbmlvbiIsInJlcG9ydFdlYlNvY2tldEVycm9yIiwibGFzdFJlcG9ydCIsImxhc3RSZXBvcnRUaW1lIiwibm93IiwicmVwb3J0RXJyb3IiLCJsb2ciLCJvcGVuV2ViU29ja2V0IiwiY3VycmVudExvY2F0aW9uIiwid3NQcm90b2NvbCIsInByb3RvY29sIiwid3NVcmkiLCJob3N0IiwiV2ViU29ja2V0IiwiZGV0YWlsIiwiYmFja29mZk1zIiwiTWF0aCIsIm1pbiIsInBvdyIsImlkbGVUaW1lb3V0TXMiLCJzb2NrZXQiLCJ3YXNDb25uZWN0ZWQiLCJyZWNvbm5lY3RBdHRlbXB0IiwidGltZW91dCIsInJlc2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImNvbm5lY3QiLCJzZW5kIiwiZXZlbnQiLCJ3YXNDbGVhbiIsInJlY29ubmVjdCIsInJhd01lc3NhZ2UiLCJkZWxheSIsIm5leHQiLCJyZWFkeVN0YXRlIiwiT1BFTiIsInNlbmRBY3Rpb25PbldlYnNvY2tldCJdLCJzb3VyY2VSb290IjoiIn0=