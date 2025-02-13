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

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module) => {

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
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
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlZXQtYmVzdC10ZW1wbGF0ZXMuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7OztBQ1ZBLE1BQU1BLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFcEJBLFNBQVMsQ0FBQ0MsS0FBSyxHQUFJQyxJQUFJLElBQUs7RUFDMUIsTUFBTUMsR0FBRyxHQUFHRCxJQUFJLENBQUNFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUVoRCxNQUFNQyxVQUFVLEdBQUlDLE9BQU8sSUFBSztJQUM5QixNQUFNQyxRQUFRLEdBQUdMLElBQUksQ0FBQ00sZ0JBQWdCLENBQUMsZUFBZSxDQUFDO0lBQ3ZELEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixRQUFRLENBQUNHLE1BQU0sRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDeEMsTUFBTUUsT0FBTyxHQUFHSixRQUFRLENBQUNFLENBQUMsQ0FBQztNQUMzQixJQUFJSCxPQUFPLEVBQUU7UUFDWEssT0FBTyxDQUFDQyxlQUFlLENBQUMsVUFBVSxDQUFDO01BQ3JDLENBQUMsTUFBTTtRQUNMRCxPQUFPLENBQUNFLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO01BQzlDO0lBQ0Y7RUFDRixDQUFDO0VBRURYLElBQUksQ0FBQ1ksZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU9DLENBQUMsSUFBSztJQUMzQ1YsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUVqQlUsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNsQixNQUFNQyxRQUFRLEdBQUcsSUFBSUMsUUFBUSxDQUFDaEIsSUFBSSxDQUFDO0lBQ25DLE1BQU1pQixPQUFPLEdBQUdDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDSixRQUFRLENBQUM7SUFDcEMsTUFBTUssSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNmSCxPQUFPLENBQUNJLE9BQU8sQ0FBQyxDQUFDLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEtBQUs7TUFDMUJILElBQUksQ0FBQ0UsQ0FBQyxDQUFDLEdBQUdDLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRnZCLElBQUksQ0FBQ00sZ0JBQWdCLENBQUMsZUFBZSxDQUFDO0lBRXRDLE1BQU1rQixRQUFRLEdBQUcsTUFBTUMsS0FBSyxDQUFDeEIsR0FBRyxFQUFFO01BQ2hDeUIsTUFBTSxFQUFFLE1BQU07TUFDZEMsSUFBSSxFQUFFLE1BQU07TUFDWkMsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFO01BQ2xCLENBQUM7TUFDREMsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDWCxJQUFJLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUNZLElBQUksQ0FBRUMsQ0FBQyxJQUFLQSxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEJsQyxJQUFJLENBQUNtQyxhQUFhLENBQUMsSUFBSUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO01BQzlDWjtJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUhyQixVQUFVLENBQUMsSUFBSSxDQUFDO0VBQ2xCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFREwsU0FBUyxDQUFDdUMsTUFBTSxHQUFHLE1BQU81QixPQUFPLElBQUs7RUFDcEMsTUFBTVIsR0FBRyxHQUFHUSxPQUFPLENBQUNQLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUNuRCxNQUFNb0MsSUFBSSxHQUFHN0IsT0FBTyxDQUFDOEIsU0FBUztFQUM5QjlCLE9BQU8sQ0FBQzhCLFNBQVMsR0FBRyxFQUFFO0VBRXRCLElBQUluQixJQUFJLEdBQUcsTUFBTUssS0FBSyxDQUFDeEIsR0FBRyxDQUFDLENBQUMrQixJQUFJLENBQUVDLENBQUMsSUFBSztJQUN0QyxJQUFJLENBQUNBLENBQUMsQ0FBQ08sRUFBRSxFQUFFO01BQ1QvQixPQUFPLENBQUMwQixhQUFhLENBQUMsSUFBSU0sV0FBVyxDQUFDLHVCQUF1QixFQUFFO1FBQUVDLE1BQU0sRUFBRTtVQUFFQyxNQUFNLEVBQUVWLENBQUMsQ0FBQ1U7UUFBTztNQUFFLENBQUMsQ0FBQyxDQUFDO01BQ2pHLE9BQU8sRUFBRTtJQUNYO0lBRUEsT0FBT1YsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQztFQUNqQixDQUFDLENBQUM7RUFFRixJQUFJLENBQUNoQixLQUFLLENBQUMwQixPQUFPLENBQUN4QixJQUFJLENBQUMsRUFBRTtJQUN4QkEsSUFBSSxHQUFHLENBQUNBLElBQUksQ0FBQztFQUNmO0VBRUEsTUFBTXlCLFdBQVcsR0FBR3pCLElBQUksQ0FBQzBCLEdBQUcsQ0FBRUMsTUFBTSxJQUFLO0lBQ3ZDQyxNQUFNLENBQUNDLElBQUksQ0FBQ0YsTUFBTSxDQUFDLENBQUMxQixPQUFPLENBQUVDLENBQUMsSUFBSztNQUNqQ3lCLE1BQU0sQ0FBQ3pCLENBQUMsQ0FBQzRCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBR0gsTUFBTSxDQUFDekIsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztJQUVGLE9BQU9nQixJQUFJLENBQUNhLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQ0MsTUFBTSxFQUFFQyxHQUFHLEtBQUtOLE1BQU0sQ0FBQ00sR0FBRyxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0UsQ0FBQyxDQUFDO0VBRUZ6QyxPQUFPLENBQUM4QixTQUFTLEdBQUdNLFdBQVcsQ0FBQ1MsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUMxQyxDQUFDO0FBRUR4RCxTQUFTLENBQUN5RCxLQUFLLEdBQUcsWUFBWTtFQUM1QixNQUFNbEQsUUFBUSxHQUFHbUQsUUFBUSxDQUFDbEQsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7RUFDL0QsTUFBTW1ELFFBQVEsR0FBRyxFQUFFO0VBRW5CLEtBQUssSUFBSWxELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsUUFBUSxDQUFDRyxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO0lBQ3hDLE1BQU1FLE9BQU8sR0FBR0osUUFBUSxDQUFDRSxDQUFDLENBQUM7SUFDM0IsSUFBSUUsT0FBTyxDQUFDaUQsT0FBTyxLQUFLLE1BQU0sRUFBRTtNQUM5QjVELFNBQVMsQ0FBQ0MsS0FBSyxDQUFDVSxPQUFPLENBQUM7SUFDMUIsQ0FBQyxNQUFNO01BQ0xnRCxRQUFRLENBQUNFLElBQUksQ0FBQzdELFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQzVCLE9BQU8sQ0FBQyxDQUFDO0lBQzFDO0VBQ0Y7RUFFQSxNQUFNbUQsT0FBTyxDQUFDQyxHQUFHLENBQUNKLFFBQVEsQ0FBQztFQUUzQkQsUUFBUSxDQUFDckIsYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFFRG9CLFFBQVEsQ0FBQzVDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFZCxTQUFTLENBQUN5RCxLQUFLLENBQUM7QUFFOURPLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHakUsU0FBUzs7Ozs7O1VDaEcxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU2hlZXRCZXN0L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TaGVldEJlc3QvLi9pbmRleC5qcyIsIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2hlZXRCZXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vU2hlZXRCZXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9TaGVldEJlc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNoZWV0QmVzdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTaGVldEJlc3RcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiY29uc3QgU2hlZXRCZXN0ID0ge307XG5cblNoZWV0QmVzdC5pbnB1dCA9IChmb3JtKSA9PiB7XG4gIGNvbnN0IHVybCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXNoZWV0LWJlc3QnKTtcblxuICBjb25zdCBzZXRFbmFibGVkID0gKGVuYWJsZWQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9c3VibWl0XScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcbiAgICBzZXRFbmFibGVkKGZhbHNlKTtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICBjb25zdCBlbnRyaWVzID0gQXJyYXkuZnJvbShmb3JtRGF0YSk7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGVudHJpZXMuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG4gICAgICBkYXRhW2tdID0gdjtcbiAgICB9KTtcblxuICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9c3VibWl0XScpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFtkYXRhXSksXG4gICAgfSkudGhlbigocikgPT4gci5qc29uKCkpO1xuXG4gICAgZm9ybS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3VibWl0LWZpbmlzaGVkJywge1xuICAgICAgcmVzcG9uc2UsXG4gICAgfSkpO1xuXG4gICAgc2V0RW5hYmxlZCh0cnVlKTtcbiAgfSk7XG59O1xuXG5TaGVldEJlc3Qub3V0cHV0ID0gYXN5bmMgKGVsZW1lbnQpID0+IHtcbiAgY29uc3QgdXJsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hlZXQtYmVzdCcpO1xuICBjb25zdCB0ZXh0ID0gZWxlbWVudC5pbm5lckhUTUw7XG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cbiAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4oKHIpID0+IHtcbiAgICBpZiAoIXIub2spIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NoZWV0YmVzdC1sb2FkLWZhaWxlZCcsIHsgZGV0YWlsOiB7IHN0YXR1czogci5zdGF0dXMgfSB9KSk7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIHIuanNvbigpO1xuICB9KTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICBkYXRhID0gW2RhdGFdO1xuICB9XG5cbiAgY29uc3QgcmVwbGFjZW1lbnQgPSBkYXRhLm1hcCgob2JqZWN0KSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBvYmplY3Rbay50cmltKCldID0gb2JqZWN0W2tdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgve3soW157fV0qKX19L2csIChfbWF0Y2gsIGtleSkgPT4gb2JqZWN0W2tleS50cmltKCldKTtcbiAgfSk7XG5cbiAgZWxlbWVudC5pbm5lckhUTUwgPSByZXBsYWNlbWVudC5qb2luKCcnKTtcbn07XG5cblNoZWV0QmVzdC5zZXR1cCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaGVldC1iZXN0XScpO1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0ZPUk0nKSB7XG4gICAgICBTaGVldEJlc3QuaW5wdXQoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2VzLnB1c2goU2hlZXRCZXN0Lm91dHB1dChlbGVtZW50KSk7XG4gICAgfVxuICB9XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdzaGVldGJlc3QtbG9hZC1jb21wbGV0ZScpKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBTaGVldEJlc3Quc2V0dXApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoZWV0QmVzdDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIlNoZWV0QmVzdCIsImlucHV0IiwiZm9ybSIsInVybCIsImdldEF0dHJpYnV0ZSIsInNldEVuYWJsZWQiLCJlbmFibGVkIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbmd0aCIsImVsZW1lbnQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImVudHJpZXMiLCJBcnJheSIsImZyb20iLCJkYXRhIiwiZm9yRWFjaCIsImsiLCJ2IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsIm1vZGUiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwiciIsImpzb24iLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJvdXRwdXQiLCJ0ZXh0IiwiaW5uZXJIVE1MIiwib2siLCJDdXN0b21FdmVudCIsImRldGFpbCIsInN0YXR1cyIsImlzQXJyYXkiLCJyZXBsYWNlbWVudCIsIm1hcCIsIm9iamVjdCIsIk9iamVjdCIsImtleXMiLCJ0cmltIiwicmVwbGFjZSIsIl9tYXRjaCIsImtleSIsImpvaW4iLCJzZXR1cCIsImRvY3VtZW50IiwicHJvbWlzZXMiLCJ0YWdOYW1lIiwicHVzaCIsIlByb21pc2UiLCJhbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==