/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/demo.ts":
/*!*********************!*\
  !*** ./src/demo.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");
/* harmony import */ var _plugins_mention__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/mention */ "./src/plugins/mention.ts");


window.onload = function () {
    var root = document.getElementById('editor');
    var editor = document.getElementById('editor-content');
    if (!root || !editor)
        return;
    var febo = new _index__WEBPACK_IMPORTED_MODULE_0__["default"](root, editor);
    febo.startWriting();
    febo.registerPlugin(new _plugins_mention__WEBPACK_IMPORTED_MODULE_1__["default"]());
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: FeboEvent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeboEvent", function() { return FeboEvent; });
var Febo = (function () {
    function Febo(root, editor) {
        this.plugins = [];
        this.root = root;
        this.editor = editor;
        this.configListeners();
    }
    Febo.prototype.startWriting = function () {
        this.editor.setAttribute('contenteditable', 'true');
        return this;
    };
    Febo.prototype.stopWriting = function () {
        this.editor.setAttribute('contenteditable', 'false');
        return this;
    };
    Febo.prototype.registerPlugin = function (plugin) {
        var p = plugin;
        p.root = this.root;
        p.editor = this.editor;
        this.plugins.push(p);
    };
    Febo.prototype.getEventHandlers = function (event) {
        return this.plugins.map(function (plugin) { return plugin[event]; });
    };
    Febo.prototype.configListeners = function () {
        this.inputHandle();
    };
    Febo.prototype.inputHandle = function () {
        var _this = this;
        this.editor.addEventListener('input', function (event) {
            console.log(event);
            var ev = new CustomEvent('content', {
                bubbles: true,
                detail: { content: _this.editor.innerHTML }
            });
            _this.root.dispatchEvent(ev);
            _this.getEventHandlers(FeboEvent.INPUT).map(function (fn) {
                if (fn) {
                    fn(event);
                }
            });
        });
    };
    return Febo;
}());
var FeboEvent;
(function (FeboEvent) {
    FeboEvent["INPUT"] = "onInput";
})(FeboEvent || (FeboEvent = {}));
/* harmony default export */ __webpack_exports__["default"] = (Febo);


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");
/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demo */ "./src/demo.ts");




/***/ }),

/***/ "./src/plugins/index.ts":
/*!******************************!*\
  !*** ./src/plugins/index.ts ***!
  \******************************/
/*! exports provided: FeboPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeboPlugin", function() { return FeboPlugin; });
var FeboPlugin = (function () {
    function FeboPlugin() {
        this.root = document.createElement('div');
        this.editor = document.createElement('div');
    }
    return FeboPlugin;
}());



/***/ }),

/***/ "./src/plugins/mention.ts":
/*!********************************!*\
  !*** ./src/plugins/mention.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/plugins/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Mention = (function (_super) {
    __extends(Mention, _super);
    function Mention() {
        return _super.call(this) || this;
    }
    Mention.prototype.onInput = function () {
        console.log('Menção consolando');
    };
    return Mention;
}(_index__WEBPACK_IMPORTED_MODULE_0__["FeboPlugin"]));
/* harmony default export */ __webpack_exports__["default"] = (Mention);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map