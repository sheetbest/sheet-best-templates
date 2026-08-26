(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SheetBest"] = factory();
	else
		root["SheetBest"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js"
/*!******************!*\
  !*** ./index.js ***!
  \******************/
(module) {

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

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFDM0IsSUFBSUUsT0FBTyxDQUFDaUQsT0FBTyxLQUFLLE1BQU0sRUFBRTtNQUM5QjVELFNBQVMsQ0FBQ0MsS0FBSyxDQUFDVSxPQUFPLENBQUM7SUFDMUIsQ0FBQyxNQUFNO01BQ0xnRCxRQUFRLENBQUNFLElBQUksQ0FBQzdELFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQzVCLE9BQU8sQ0FBQyxDQUFDO0lBQzFDO0VBQ0Y7RUFFQSxNQUFNbUQsT0FBTyxDQUFDQyxHQUFHLENBQUNKLFFBQVEsQ0FBQztFQUUzQkQsUUFBUSxDQUFDckIsYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFFRG9CLFFBQVEsQ0FBQzVDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFZCxTQUFTLENBQUN5RCxLQUFLLENBQUM7QUFFOURPLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHakUsU0FBUyxDOzs7Ozs7VUNoRzFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUU1QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NoZWV0QmVzdC8uL2luZGV4LmpzIiwid2VicGFjazovL1NoZWV0QmVzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL1NoZWV0QmVzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2hlZXRCZXN0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNoZWV0QmVzdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJjb25zdCBTaGVldEJlc3QgPSB7fTtcblxuU2hlZXRCZXN0LmlucHV0ID0gKGZvcm0pID0+IHtcbiAgY29uc3QgdXJsID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hlZXQtYmVzdCcpO1xuXG4gIGNvbnN0IHNldEVuYWJsZWQgPSAoZW5hYmxlZCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xuICAgIHNldEVuYWJsZWQoZmFsc2UpO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKGZvcm1EYXRhKTtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgZW50cmllcy5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgIGRhdGFba10gPSB2O1xuICAgIH0pO1xuXG4gICAgZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1zdWJtaXRdJyk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoW2RhdGFdKSxcbiAgICB9KS50aGVuKChyKSA9PiByLmpzb24oKSk7XG5cbiAgICBmb3JtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzdWJtaXQtZmluaXNoZWQnLCB7XG4gICAgICByZXNwb25zZSxcbiAgICB9KSk7XG5cbiAgICBzZXRFbmFibGVkKHRydWUpO1xuICB9KTtcbn07XG5cblNoZWV0QmVzdC5vdXRwdXQgPSBhc3luYyAoZWxlbWVudCkgPT4ge1xuICBjb25zdCB1cmwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zaGVldC1iZXN0Jyk7XG4gIGNvbnN0IHRleHQgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblxuICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKHVybCkudGhlbigocikgPT4ge1xuICAgIGlmICghci5vaykge1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2hlZXRiZXN0LWxvYWQtZmFpbGVkJywgeyBkZXRhaWw6IHsgc3RhdHVzOiByLnN0YXR1cyB9IH0pKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gci5qc29uKCk7XG4gIH0pO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIGRhdGEgPSBbZGF0YV07XG4gIH1cblxuICBjb25zdCByZXBsYWNlbWVudCA9IGRhdGEubWFwKChvYmplY3QpID0+IHtcbiAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goKGspID0+IHtcbiAgICAgIG9iamVjdFtrLnRyaW0oKV0gPSBvYmplY3Rba107XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC97eyhbXnt9XSopfX0vZywgKF9tYXRjaCwga2V5KSA9PiBvYmplY3Rba2V5LnRyaW0oKV0pO1xuICB9KTtcblxuICBlbGVtZW50LmlubmVySFRNTCA9IHJlcGxhY2VtZW50LmpvaW4oJycpO1xufTtcblxuU2hlZXRCZXN0LnNldHVwID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNoZWV0LWJlc3RdJyk7XG4gIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnRk9STScpIHtcbiAgICAgIFNoZWV0QmVzdC5pbnB1dChlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZXMucHVzaChTaGVldEJlc3Qub3V0cHV0KGVsZW1lbnQpKTtcbiAgICB9XG4gIH1cblxuICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3NoZWV0YmVzdC1sb2FkLWNvbXBsZXRlJykpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFNoZWV0QmVzdC5zZXR1cCk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hlZXRCZXN0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5sZXQgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIlNoZWV0QmVzdCIsImlucHV0IiwiZm9ybSIsInVybCIsImdldEF0dHJpYnV0ZSIsInNldEVuYWJsZWQiLCJlbmFibGVkIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbmd0aCIsImVsZW1lbnQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImVudHJpZXMiLCJBcnJheSIsImZyb20iLCJkYXRhIiwiZm9yRWFjaCIsImsiLCJ2IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsIm1vZGUiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwiciIsImpzb24iLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJvdXRwdXQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwib2siLCJDdXN0b21FdmVudCIsImRldGFpbCIsInN0YXR1cyIsImlzQXJyYXkiLCJyZXBsYWNlbWVudCIsIm1hcCIsIm9iamVjdCIsIk9iamVjdCIsImtleXMiLCJ0cmltIiwicmVwbGFjZSIsIl9tYXRjaCIsImtleSIsImpvaW4iLCJzZXR1cCIsImRvY3VtZW50IiwicHJvbWlzZXMiLCJ0YWdOYW1lIiwicHVzaCIsIlByb21pc2UiLCJhbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==