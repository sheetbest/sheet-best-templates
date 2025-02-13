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
SheetBest.input = form => {
  const url = form.getAttribute('data-sheet-best');
  const setEnabled = enabled => {
    const elements = form.querySelectorAll('[type=submit]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (enabled) {
        element.removeAttribute('disabled');
      } else {
        element.setAttribute('disabled', 'disabled');
      }
    }
  };
  form.addEventListener('submit', async e => {
    setEnabled(false);
    e.preventDefault();
    const formData = new FormData(form);
    const entries = Array.from(formData);
    const data = {};
    entries.forEach(([k, v]) => {
      data[k] = v;
    });
    form.querySelectorAll('[type=submit]');
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([data])
    }).then(r => r.json());
    form.dispatchEvent(new Event('submit-finished', {
      response
    }));
    setEnabled(true);
  });
};
SheetBest.output = async element => {
  const url = element.getAttribute('data-sheet-best');
  const text = element.innerHTML;
  element.innerHTML = '';
  let data = await fetch(url).then(r => {
    if (!r.ok) {
      element.dispatchEvent(new CustomEvent('sheetbest-load-failed', {
        detail: {
          status: r.status
        }
      }));
      return [];
    }
    return r.json();
  });
  if (!Array.isArray(data)) {
    data = [data];
  }
  const replacement = data.map(object => {
    Object.keys(object).forEach(k => {
      object[k.trim()] = object[k];
    });
    return text.replace(/{{([^{}]*)}}/g, (_match, key) => object[key.trim()]);
  });
  element.innerHTML = replacement.join('');
};
SheetBest.setup = async () => {
  const elements = document.querySelectorAll('[data-sheet-best]');
  const promises = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.tagName === 'FORM') {
      SheetBest.input(element);
    } else {
      promises.push(SheetBest.output(element));
    }
  }
  await Promise.all(promises);
  document.dispatchEvent(new Event('sheetbest-load-complete'));
};
document.addEventListener('DOMContentLoaded', SheetBest.setup);
module.exports = SheetBest;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NoZWV0QmVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TaGVldEJlc3QvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTaGVldEJlc3QiLCJpbnB1dCIsImZvcm0iLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJzZXRFbmFibGVkIiwiZW5hYmxlZCIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJlbGVtZW50IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJlbnRyaWVzIiwiQXJyYXkiLCJmcm9tIiwiZGF0YSIsImZvckVhY2giLCJrIiwidiIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInIiLCJqc29uIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwib3V0cHV0IiwidGV4dCIsImlubmVySFRNTCIsIm9rIiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJzdGF0dXMiLCJpc0FycmF5IiwicmVwbGFjZW1lbnQiLCJtYXAiLCJvYmplY3QiLCJPYmplY3QiLCJrZXlzIiwidHJpbSIsInJlcGxhY2UiLCJfbWF0Y2giLCJrZXkiLCJqb2luIiwic2V0dXAiLCJkb2N1bWVudCIsInByb21pc2VzIiwidGFnTmFtZSIsInB1c2giLCJQcm9taXNlIiwiYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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ekMsT0FBTyxDQUFDOEIsU0FBUyxHQUFHTSxXQUFXLENBQUNTLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDMUMsQ0FBQztBQUVEeEQsU0FBUyxDQUFDeUQsS0FBSyxHQUFHLFlBQVk7RUFDNUIsTUFBTWxELFFBQVEsR0FBR21ELFFBQVEsQ0FBQ2xELGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO0VBQy9ELE1BQU1tRCxRQUFRLEdBQUcsRUFBRTtFQUVuQixLQUFLLElBQUlsRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdGLFFBQVEsQ0FBQ0csTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtJQUN4QyxNQUFNRSxPQUFPLEdBQUdKLFFBQVEsQ0FBQ0UsQ0FBQyxDQUFDO0lBQzNCLElBQUlFLE9BQU8sQ0FBQ2lELE9BQU8sS0FBSyxNQUFNLEVBQUU7TUFDOUI1RCxTQUFTLENBQUNDLEtBQUssQ0FBQ1UsT0FBTyxDQUFDO0lBQzFCLENBQUMsTUFBTTtNQUNMZ0QsUUFBUSxDQUFDRSxJQUFJLENBQUM3RCxTQUFTLENBQUN1QyxNQUFNLENBQUM1QixPQUFPLENBQUMsQ0FBQztJQUMxQztFQUNGO0VBRUEsTUFBTW1ELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSixRQUFRLENBQUM7RUFFM0JELFFBQVEsQ0FBQ3JCLGFBQWEsQ0FBQyxJQUFJQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRURvQixRQUFRLENBQUM1QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRWQsU0FBUyxDQUFDeUQsS0FBSyxDQUFDO0FBRTlETyxNQUFNLENBQUNDLE9BQU8sR0FBR2pFLFNBQVMsQyIsImZpbGUiOiJzaGVldC1iZXN0LXRlbXBsYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNoZWV0QmVzdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaGVldEJlc3RcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgU2hlZXRCZXN0ID0ge307XG5cblNoZWV0QmVzdC5pbnB1dCA9IChmb3JtKSA9PiB7XG4gIGNvbnN0IHVybCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXNoZWV0LWJlc3QnKTtcblxuICBjb25zdCBzZXRFbmFibGVkID0gKGVuYWJsZWQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9c3VibWl0XScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcbiAgICBzZXRFbmFibGVkKGZhbHNlKTtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICBjb25zdCBlbnRyaWVzID0gQXJyYXkuZnJvbShmb3JtRGF0YSk7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGVudHJpZXMuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG4gICAgICBkYXRhW2tdID0gdjtcbiAgICB9KTtcblxuICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9c3VibWl0XScpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFtkYXRhXSksXG4gICAgfSkudGhlbigocikgPT4gci5qc29uKCkpO1xuXG4gICAgZm9ybS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3VibWl0LWZpbmlzaGVkJywge1xuICAgICAgcmVzcG9uc2UsXG4gICAgfSkpO1xuXG4gICAgc2V0RW5hYmxlZCh0cnVlKTtcbiAgfSk7XG59O1xuXG5TaGVldEJlc3Qub3V0cHV0ID0gYXN5bmMgKGVsZW1lbnQpID0+IHtcbiAgY29uc3QgdXJsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hlZXQtYmVzdCcpO1xuICBjb25zdCB0ZXh0ID0gZWxlbWVudC5pbm5lckhUTUw7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cbiAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4oKHIpID0+IHtcbiAgICBpZiAoIXIub2spIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NoZWV0YmVzdC1sb2FkLWZhaWxlZCcsIHsgZGV0YWlsOiB7IHN0YXR1czogci5zdGF0dXMgfSB9KSk7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIHIuanNvbigpO1xuICB9KTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICBkYXRhID0gW2RhdGFdO1xuICB9XG5cbiAgY29uc3QgcmVwbGFjZW1lbnQgPSBkYXRhLm1hcCgob2JqZWN0KSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBvYmplY3Rbay50cmltKCldID0gb2JqZWN0W2tdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgve3soW157fV0qKX19L2csIChfbWF0Y2gsIGtleSkgPT4gb2JqZWN0W2tleS50cmltKCldKTtcbiAgfSk7XG5cbiAgZWxlbWVudC5pbm5lckhUTUwgPSByZXBsYWNlbWVudC5qb2luKCcnKTtcbn07XG5cblNoZWV0QmVzdC5zZXR1cCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaGVldC1iZXN0XScpO1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0ZPUk0nKSB7XG4gICAgICBTaGVldEJlc3QuaW5wdXQoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2VzLnB1c2goU2hlZXRCZXN0Lm91dHB1dChlbGVtZW50KSk7XG4gICAgfVxuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzaGVldGJlc3QtbG9hZC1jb21wbGV0ZScpKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBTaGVldEJlc3Quc2V0dXApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoZWV0QmVzdDtcbiJdLCJzb3VyY2VSb290IjoiIn0=