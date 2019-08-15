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
  // XXX: Not yet tested
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
  // Extract some data, from the element
  const url = element.getAttribute('data-sheet-best');
  const text = element.innerHTML;
  element.innerHTML = '';
  let data = await fetch(url).then(r => r.json());

  if (!Array.isArray(data)) {
    data = [data];
  }

  const replacement = data.map(object => {
    // Trim all attributes on the object
    Object.keys(object).forEach(k => {
      object[k.trim()] = object[k];
    }); // Replace the text

    return text.replace(/{{([^{}]*)}}/g, (match, key) => object[key.trim()]);
  }); // Re-add it to the HTML

  element.innerHTML = replacement.join('');
};

SheetBest.setup = async () => {
  // Run all the necessary scripts for all [data-sheet-best]
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

  return Promise.all(promises);
};

document.addEventListener('DOMContentLoaded', SheetBest.setup);
module.exports = SheetBest;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NoZWV0QmVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TaGVldEJlc3QvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTaGVldEJlc3QiLCJpbnB1dCIsImZvcm0iLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJzZXRFbmFibGVkIiwiZW5hYmxlZCIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJlbGVtZW50IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJlbnRyaWVzIiwiQXJyYXkiLCJmcm9tIiwiZGF0YSIsImZvckVhY2giLCJrIiwidiIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInIiLCJqc29uIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwib3V0cHV0IiwidGV4dCIsImlubmVySFRNTCIsImlzQXJyYXkiLCJyZXBsYWNlbWVudCIsIm1hcCIsIm9iamVjdCIsIk9iamVjdCIsImtleXMiLCJ0cmltIiwicmVwbGFjZSIsIm1hdGNoIiwia2V5Iiwiam9pbiIsInNldHVwIiwiZG9jdW1lbnQiLCJwcm9taXNlcyIsInRhZ05hbWUiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVB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LEVBQWdCQSxDQUFDLEdBQUdGLFFBQVEsQ0FBQ0csTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDeEMsVUFBTUUsT0FBTyxHQUFHSixRQUFRLENBQUNFLENBQUQsQ0FBeEI7O0FBQ0EsUUFBSUUsT0FBTyxDQUFDNkMsT0FBUixLQUFvQixNQUF4QixFQUFnQztBQUM5QnhELGVBQVMsQ0FBQ0MsS0FBVixDQUFnQlUsT0FBaEI7QUFDRCxLQUZELE1BRU87QUFDTDRDLGNBQVEsQ0FBQ0UsSUFBVCxDQUFjekQsU0FBUyxDQUFDdUMsTUFBVixDQUFpQjVCLE9BQWpCLENBQWQ7QUFDRDtBQUNGOztBQUVELFNBQU8rQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUosUUFBWixDQUFQO0FBQ0QsQ0FkRDs7QUFnQkFELFFBQVEsQ0FBQ3hDLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q2QsU0FBUyxDQUFDcUQsS0FBeEQ7QUFFQU8sTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0QsU0FBakIsQyIsImZpbGUiOiJzaGVldC1iZXN0LXRlbXBsYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNoZWV0QmVzdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaGVldEJlc3RcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiY29uc3QgU2hlZXRCZXN0ID0ge307XG5cblNoZWV0QmVzdC5pbnB1dCA9IChmb3JtKSA9PiB7XG4gIC8vIFhYWDogTm90IHlldCB0ZXN0ZWRcbiAgY29uc3QgdXJsID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hlZXQtYmVzdCcpO1xuXG4gIGNvbnN0IHNldEVuYWJsZWQgPSAoZW5hYmxlZCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChlKSA9PiB7XG4gICAgc2V0RW5hYmxlZChmYWxzZSk7XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgY29uc3QgZW50cmllcyA9IEFycmF5LmZyb20oZm9ybURhdGEpO1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBlbnRyaWVzLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgZGF0YVtrXSA9IHY7XG4gICAgfSk7XG5cbiAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPXN1Ym1pdF0nKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShbZGF0YV0pLFxuICAgIH0pLnRoZW4oKHIpID0+IHIuanNvbigpKTtcblxuICAgIGZvcm0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3N1Ym1pdC1maW5pc2hlZCcsIHtcbiAgICAgIHJlc3BvbnNlLFxuICAgIH0pKTtcblxuICAgIHNldEVuYWJsZWQodHJ1ZSk7XG4gIH0pO1xufTtcblxuU2hlZXRCZXN0Lm91dHB1dCA9IGFzeW5jIChlbGVtZW50KSA9PiB7XG4gIC8vIEV4dHJhY3Qgc29tZSBkYXRhLCBmcm9tIHRoZSBlbGVtZW50XG4gIGNvbnN0IHVybCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNoZWV0LWJlc3QnKTtcbiAgY29uc3QgdGV4dCA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gIGxldCBkYXRhID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKChyKSA9PiByLmpzb24oKSk7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgZGF0YSA9IFtkYXRhXTtcbiAgfVxuXG4gIGNvbnN0IHJlcGxhY2VtZW50ID0gZGF0YS5tYXAoKG9iamVjdCkgPT4ge1xuICAgIC8vIFRyaW0gYWxsIGF0dHJpYnV0ZXMgb24gdGhlIG9iamVjdFxuICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgb2JqZWN0W2sudHJpbSgpXSA9IG9iamVjdFtrXTtcbiAgICB9KTtcblxuICAgIC8vIFJlcGxhY2UgdGhlIHRleHRcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC97eyhbXnt9XSopfX0vZywgKG1hdGNoLCBrZXkpID0+IG9iamVjdFtrZXkudHJpbSgpXSk7XG4gIH0pO1xuXG4gIC8vIFJlLWFkZCBpdCB0byB0aGUgSFRNTFxuICBlbGVtZW50LmlubmVySFRNTCA9IHJlcGxhY2VtZW50LmpvaW4oJycpO1xufTtcblxuU2hlZXRCZXN0LnNldHVwID0gYXN5bmMgKCkgPT4ge1xuICAvLyBSdW4gYWxsIHRoZSBuZWNlc3Nhcnkgc2NyaXB0cyBmb3IgYWxsIFtkYXRhLXNoZWV0LWJlc3RdXG4gIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2hlZXQtYmVzdF0nKTtcbiAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnRk9STScpIHtcbiAgICAgIFNoZWV0QmVzdC5pbnB1dChlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZXMucHVzaChTaGVldEJlc3Qub3V0cHV0KGVsZW1lbnQpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFNoZWV0QmVzdC5zZXR1cCk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hlZXRCZXN0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==