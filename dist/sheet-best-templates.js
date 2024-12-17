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
    });

    // Replace the text
    return text.replace(/{{([^{}]*)}}/g, (match, key) => object[key.trim()]);
  });

  // Re-add it to the HTML
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NoZWV0QmVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TaGVldEJlc3QvLi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTaGVldEJlc3QiLCJpbnB1dCIsImZvcm0iLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJzZXRFbmFibGVkIiwiZW5hYmxlZCIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJsZW5ndGgiLCJlbGVtZW50IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJlbnRyaWVzIiwiQXJyYXkiLCJmcm9tIiwiZGF0YSIsImZvckVhY2giLCJrIiwidiIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInIiLCJqc29uIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwib3V0cHV0IiwidGV4dCIsImlubmVySFRNTCIsImlzQXJyYXkiLCJyZXBsYWNlbWVudCIsIm1hcCIsIm9iamVjdCIsIk9iamVjdCIsImtleXMiLCJ0cmltIiwicmVwbGFjZSIsIm1hdGNoIiwia2V5Iiwiam9pbiIsInNldHVwIiwiZG9jdW1lbnQiLCJwcm9taXNlcyIsInRhZ05hbWUiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVB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QUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsUUFBUSxDQUFDRyxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO0lBQ3hDLE1BQU1FLE9BQU8sR0FBR0osUUFBUSxDQUFDRSxDQUFDLENBQUM7SUFDM0IsSUFBSUUsT0FBTyxDQUFDNkMsT0FBTyxLQUFLLE1BQU0sRUFBRTtNQUM5QnhELFNBQVMsQ0FBQ0MsS0FBSyxDQUFDVSxPQUFPLENBQUM7SUFDMUIsQ0FBQyxNQUFNO01BQ0w0QyxRQUFRLENBQUNFLElBQUksQ0FBQ3pELFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQzVCLE9BQU8sQ0FBQyxDQUFDO0lBQzFDO0VBQ0Y7RUFFQSxPQUFPK0MsT0FBTyxDQUFDQyxHQUFHLENBQUNKLFFBQVEsQ0FBQztBQUM5QixDQUFDO0FBRURELFFBQVEsQ0FBQ3hDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFZCxTQUFTLENBQUNxRCxLQUFLLENBQUM7QUFFOURPLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHN0QsU0FBUyxDIiwiZmlsZSI6InNoZWV0LWJlc3QtdGVtcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2hlZXRCZXN0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNoZWV0QmVzdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJjb25zdCBTaGVldEJlc3QgPSB7fTtcblxuU2hlZXRCZXN0LmlucHV0ID0gKGZvcm0pID0+IHtcbiAgLy8gWFhYOiBOb3QgeWV0IHRlc3RlZFxuICBjb25zdCB1cmwgPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1zaGVldC1iZXN0Jyk7XG5cbiAgY29uc3Qgc2V0RW5hYmxlZCA9IChlbmFibGVkKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPXN1Ym1pdF0nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcbiAgICBzZXRFbmFibGVkKGZhbHNlKTtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICBjb25zdCBlbnRyaWVzID0gQXJyYXkuZnJvbShmb3JtRGF0YSk7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGVudHJpZXMuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG4gICAgICBkYXRhW2tdID0gdjtcbiAgICB9KTtcblxuICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9c3VibWl0XScpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFtkYXRhXSksXG4gICAgfSkudGhlbigocikgPT4gci5qc29uKCkpO1xuXG4gICAgZm9ybS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3VibWl0LWZpbmlzaGVkJywge1xuICAgICAgcmVzcG9uc2UsXG4gICAgfSkpO1xuXG4gICAgc2V0RW5hYmxlZCh0cnVlKTtcbiAgfSk7XG59O1xuXG5TaGVldEJlc3Qub3V0cHV0ID0gYXN5bmMgKGVsZW1lbnQpID0+IHtcbiAgLy8gRXh0cmFjdCBzb21lIGRhdGEsIGZyb20gdGhlIGVsZW1lbnRcbiAgY29uc3QgdXJsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hlZXQtYmVzdCcpO1xuICBjb25zdCB0ZXh0ID0gZWxlbWVudC5pbm5lckhUTUw7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cbiAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4oKHIpID0+IHIuanNvbigpKTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICBkYXRhID0gW2RhdGFdO1xuICB9XG5cbiAgY29uc3QgcmVwbGFjZW1lbnQgPSBkYXRhLm1hcCgob2JqZWN0KSA9PiB7XG4gICAgLy8gVHJpbSBhbGwgYXR0cmlidXRlcyBvbiB0aGUgb2JqZWN0XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBvYmplY3Rbay50cmltKCldID0gb2JqZWN0W2tdO1xuICAgIH0pO1xuXG4gICAgLy8gUmVwbGFjZSB0aGUgdGV4dFxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL3t7KFtee31dKil9fS9nLCAobWF0Y2gsIGtleSkgPT4gb2JqZWN0W2tleS50cmltKCldKTtcbiAgfSk7XG5cbiAgLy8gUmUtYWRkIGl0IHRvIHRoZSBIVE1MXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gcmVwbGFjZW1lbnQuam9pbignJyk7XG59O1xuXG5TaGVldEJlc3Quc2V0dXAgPSBhc3luYyAoKSA9PiB7XG4gIC8vIFJ1biBhbGwgdGhlIG5lY2Vzc2FyeSBzY3JpcHRzIGZvciBhbGwgW2RhdGEtc2hlZXQtYmVzdF1cbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaGVldC1iZXN0XScpO1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdGT1JNJykge1xuICAgICAgU2hlZXRCZXN0LmlucHV0KGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlcy5wdXNoKFNoZWV0QmVzdC5vdXRwdXQoZWxlbWVudCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgU2hlZXRCZXN0LnNldHVwKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGVldEJlc3Q7XG4iXSwic291cmNlUm9vdCI6IiJ9