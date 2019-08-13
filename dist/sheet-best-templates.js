(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SheetBest"] = factory();
	else
		root["SheetBest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

const SheetBest = {};

SheetBest.input = element => {
  var url = element.getAttribute("data-sheet-best"); // TODO
};

SheetBest.output = element => {
  // Extract some data, from the element
  var url = element.getAttribute("data-sheet-best");
  var text = element.innerHTML;
  element.innerHTML = "";
  fetch(url).then(r => r.json()).then(data => {
    var replacement = data.map(object => {
      // Trim all attributes on the object
      Object.keys(object).forEach(k => {
        object[k.trim()] = object[k];
      }); // Replace the text

      return text.replace(/{{([^{}]*)}}/g, (match, key) => {
        return object[key.trim()];
      });
    }); // Re-add it to the HTML

    element.innerHTML = replacement.join("");
  });
};

SheetBest.setup = () => {
  // Run all the necessary scripts for all [data-sheet-best]
  var elements = document.querySelectorAll("[data-sheet-best]");

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.tagName === "FORM") {
      input(element);
    } else {
      output(element);
    }
  }
};

document.addEventListener("DOMContentLoaded", setup);
module.exports = SheetBest;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NoZWV0QmVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TaGVldEJlc3QvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTaGVldEJlc3QiLCJpbnB1dCIsImVsZW1lbnQiLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJvdXRwdXQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwiZmV0Y2giLCJ0aGVuIiwiciIsImpzb24iLCJkYXRhIiwicmVwbGFjZW1lbnQiLCJtYXAiLCJvYmplY3QiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJ0cmltIiwicmVwbGFjZSIsIm1hdGNoIiwia2V5Iiwiam9pbiIsInNldHVwIiwiZWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwidGFnTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQU1BLFNBQVMsR0FBRyxFQUFsQjs7QUFFQUEsU0FBUyxDQUFDQyxLQUFWLEdBQW1CQyxPQUFELElBQWE7QUFDN0IsTUFBSUMsR0FBRyxHQUFHRCxPQUFPLENBQUNFLFlBQVIsQ0FBcUIsaUJBQXJCLENBQVYsQ0FENkIsQ0FFN0I7QUFDRCxDQUhEOztBQUtBSixTQUFTLENBQUNLLE1BQVYsR0FBb0JILE9BQUQsSUFBYTtBQUM5QjtBQUNBLE1BQUlDLEdBQUcsR0FBR0QsT0FBTyxDQUFDRSxZQUFSLENBQXFCLGlCQUFyQixDQUFWO0FBQ0EsTUFBSUUsSUFBSSxHQUFHSixPQUFPLENBQUNLLFNBQW5CO0FBQ0FMLFNBQU8sQ0FBQ0ssU0FBUixHQUFvQixFQUFwQjtBQUVBQyxPQUFLLENBQUNMLEdBQUQsQ0FBTCxDQUFXTSxJQUFYLENBQWdCQyxDQUFDLElBQUlBLENBQUMsQ0FBQ0MsSUFBRixFQUFyQixFQUErQkYsSUFBL0IsQ0FBb0NHLElBQUksSUFBSTtBQUMxQyxRQUFJQyxXQUFXLEdBQUdELElBQUksQ0FBQ0UsR0FBTCxDQUFTQyxNQUFNLElBQUk7QUFDbkM7QUFDQUMsWUFBTSxDQUFDQyxJQUFQLENBQVlGLE1BQVosRUFBb0JHLE9BQXBCLENBQTRCQyxDQUFDLElBQUk7QUFDL0JKLGNBQU0sQ0FBQ0ksQ0FBQyxDQUFDQyxJQUFGLEVBQUQsQ0FBTixHQUFtQkwsTUFBTSxDQUFDSSxDQUFELENBQXpCO0FBQ0QsT0FGRCxFQUZtQyxDQU1uQzs7QUFDQSxhQUFPYixJQUFJLENBQUNlLE9BQUwsQ0FBYSxlQUFiLEVBQThCLENBQUNDLEtBQUQsRUFBUUMsR0FBUixLQUFnQjtBQUNuRCxlQUFPUixNQUFNLENBQUNRLEdBQUcsQ0FBQ0gsSUFBSixFQUFELENBQWI7QUFDRCxPQUZNLENBQVA7QUFHRCxLQVZpQixDQUFsQixDQUQwQyxDQWExQzs7QUFDQWxCLFdBQU8sQ0FBQ0ssU0FBUixHQUFvQk0sV0FBVyxDQUFDVyxJQUFaLENBQWlCLEVBQWpCLENBQXBCO0FBQ0QsR0FmRDtBQWdCRCxDQXRCRDs7QUF3QkF4QixTQUFTLENBQUN5QixLQUFWLEdBQWtCLE1BQU07QUFDdEI7QUFDQSxNQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQWY7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxRQUFRLENBQUNJLE1BQTdCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQTBDO0FBQ3hDLFFBQUkzQixPQUFPLEdBQUd3QixRQUFRLENBQUNHLENBQUQsQ0FBdEI7O0FBQ0EsUUFBSTNCLE9BQU8sQ0FBQzZCLE9BQVIsS0FBb0IsTUFBeEIsRUFBZ0M7QUFDOUI5QixXQUFLLENBQUNDLE9BQUQsQ0FBTDtBQUNELEtBRkQsTUFFTztBQUNMRyxZQUFNLENBQUNILE9BQUQsQ0FBTjtBQUNEO0FBQ0Y7QUFDRixDQVhEOztBQWFBeUIsUUFBUSxDQUFDSyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENQLEtBQTlDO0FBRUFRLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxDLFNBQWpCLEMiLCJmaWxlIjoic2hlZXQtYmVzdC10ZW1wbGF0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTaGVldEJlc3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2hlZXRCZXN0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImNvbnN0IFNoZWV0QmVzdCA9IHt9O1xuXG5TaGVldEJlc3QuaW5wdXQgPSAoZWxlbWVudCkgPT4ge1xuICB2YXIgdXJsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNoZWV0LWJlc3RcIik7XG4gIC8vIFRPRE9cbn1cblxuU2hlZXRCZXN0Lm91dHB1dCA9IChlbGVtZW50KSA9PiB7XG4gIC8vIEV4dHJhY3Qgc29tZSBkYXRhLCBmcm9tIHRoZSBlbGVtZW50XG4gIHZhciB1cmwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtc2hlZXQtYmVzdFwiKTtcbiAgdmFyIHRleHQgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGZldGNoKHVybCkudGhlbihyID0+IHIuanNvbigpKS50aGVuKGRhdGEgPT4ge1xuICAgIHZhciByZXBsYWNlbWVudCA9IGRhdGEubWFwKG9iamVjdCA9PiB7XG4gICAgICAvLyBUcmltIGFsbCBhdHRyaWJ1dGVzIG9uIHRoZSBvYmplY3RcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChrID0+IHtcbiAgICAgICAgb2JqZWN0W2sudHJpbSgpXSA9IG9iamVjdFtrXTtcbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlcGxhY2UgdGhlIHRleHRcbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL3t7KFtee31dKil9fS9nLCAobWF0Y2gsIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gb2JqZWN0W2tleS50cmltKCldO1xuICAgICAgfSlcbiAgICB9KTtcblxuICAgIC8vIFJlLWFkZCBpdCB0byB0aGUgSFRNTFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gcmVwbGFjZW1lbnQuam9pbihcIlwiKTtcbiAgfSk7XG59XG5cblNoZWV0QmVzdC5zZXR1cCA9ICgpID0+IHtcbiAgLy8gUnVuIGFsbCB0aGUgbmVjZXNzYXJ5IHNjcmlwdHMgZm9yIGFsbCBbZGF0YS1zaGVldC1iZXN0XVxuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtc2hlZXQtYmVzdF1cIik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiRk9STVwiKSB7XG4gICAgICBpbnB1dChlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0KGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBzZXR1cCk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hlZXRCZXN0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==