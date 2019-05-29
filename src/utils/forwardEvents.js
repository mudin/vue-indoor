/**
 * forwards any event from src to desc
 * @param {*} src
 * @param {*} dest
 * @param {*} filterFn
 */
export default function forwardEmitter (src, dest, filterFn) {
  // If no filter is passed, forward all events.
  if (typeof filterFn !== 'function') {
    filterFn = function () { return true; };
  }

  function __forward_emitter_newListener (eventName, event) {
    if (filterFn(eventName, event)) {
      process.nextTick(() => {
        dest.$emit(eventName, event || src);
      });
    }
  }

  src.onAny(__forward_emitter_newListener);
};
