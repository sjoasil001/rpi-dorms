import {
  require_react
} from "./chunk-UNLUE3XC.js";
import {
  __commonJS
} from "./chunk-5WRI5ZAA.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/react-simple-typewriter/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-simple-typewriter/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var e = require_jsx_runtime();
    var t = require_react();
    var r = function() {
      return r = Object.assign || function(e2) {
        for (var t2, r2 = 1, o2 = arguments.length; r2 < o2; r2++) for (var n2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
        return e2;
      }, r.apply(this, arguments);
    };
    function o(e2, t2) {
      var o2, n2;
      switch (t2.type) {
        case "TYPE":
          return r(r({}, e2), { speed: t2.speed, text: null === (o2 = t2.payload) || void 0 === o2 ? void 0 : o2.substring(0, e2.text.length + 1) });
        case "DELAY":
          return r(r({}, e2), { speed: t2.payload });
        case "DELETE":
          return r(r({}, e2), { speed: t2.speed, text: null === (n2 = t2.payload) || void 0 === n2 ? void 0 : n2.substring(0, e2.text.length - 1) });
        case "COUNT":
          return r(r({}, e2), { count: e2.count + 1 });
        default:
          return e2;
      }
    }
    var n = function(e2) {
      var r2 = e2.words, n2 = void 0 === r2 ? ["Hello World!", "This is", "a simple Typewriter"] : r2, i2 = e2.loop, s2 = void 0 === i2 ? 1 : i2, u2 = e2.typeSpeed, l = void 0 === u2 ? 80 : u2, c = e2.deleteSpeed, d = void 0 === c ? 50 : c, a = e2.delaySpeed, p = void 0 === a ? 1500 : a, y = e2.onLoopDone, f = e2.onType, v = e2.onDelete, m = e2.onDelay, h = t.useReducer(o, { speed: l, text: "", count: 0 }), T = h[0], g = T.speed, _ = T.text, x = T.count, D = h[1], C = t.useRef(0), E = t.useRef(false), S = t.useRef(false), b = t.useRef(false), k = t.useRef(false), w = t.useCallback((function() {
        var e3 = x % n2.length, t2 = n2[e3];
        S.current ? (D({ type: "DELETE", payload: t2, speed: d }), "" === _ && (S.current = false, D({ type: "COUNT" }))) : (D({ type: "TYPE", payload: t2, speed: l }), b.current = true, _ === t2 && (D({ type: "DELAY", payload: p }), b.current = false, k.current = true, setTimeout((function() {
          k.current = false, S.current = true;
        }), p), s2 > 0 && (C.current += 1, C.current / n2.length === s2 && (k.current = false, E.current = true)))), b.current && f && f(C.current), S.current && v && v(), k.current && m && m();
      }), [x, p, d, s2, l, n2, _, f, v, m]);
      return t.useEffect((function() {
        var e3 = setTimeout(w, g);
        return E.current && clearTimeout(e3), function() {
          return clearTimeout(e3);
        };
      }), [w, g]), t.useEffect((function() {
        y && E.current && y();
      }), [y]), [_, { isType: b.current, isDelay: k.current, isDelete: S.current, isDone: E.current }];
    };
    var i = "styles-module_blinkingCursor__yugAC";
    var s = "styles-module_blinking__9VXRT";
    !(function(e2, t2) {
      void 0 === t2 && (t2 = {});
      var r2 = t2.insertAt;
      if (e2 && "undefined" != typeof document) {
        var o2 = document.head || document.getElementsByTagName("head")[0], n2 = document.createElement("style");
        n2.type = "text/css", "top" === r2 && o2.firstChild ? o2.insertBefore(n2, o2.firstChild) : o2.appendChild(n2), n2.styleSheet ? n2.styleSheet.cssText = e2 : n2.appendChild(document.createTextNode(e2));
      }
    })(".styles-module_blinkingCursor__yugAC{color:inherit;font:inherit;left:3px;line-height:inherit;opacity:1;position:relative;top:0}.styles-module_blinking__9VXRT{animation-duration:.8s;animation-iteration-count:infinite;animation-name:styles-module_blink__rqfaf}@keyframes styles-module_blink__rqfaf{0%{opacity:1}to{opacity:0}}");
    var u = t.memo((function(t2) {
      var o2 = t2.cursorBlinking, n2 = void 0 === o2 || o2, u2 = t2.cursorStyle, l = void 0 === u2 ? "|" : u2, c = t2.cursorColor, d = void 0 === c ? "inherit" : c;
      return e.jsx("span", r({ style: { color: d }, className: "".concat(i, " ").concat(n2 ? s : "") }, { children: l }));
    }));
    exports.Cursor = u, exports.Typewriter = function(t2) {
      var r2 = t2.words, o2 = void 0 === r2 ? ["Hello World!", "This is", "a simple Typewriter"] : r2, i2 = t2.loop, s2 = void 0 === i2 ? 1 : i2, l = t2.typeSpeed, c = void 0 === l ? 80 : l, d = t2.deleteSpeed, a = void 0 === d ? 50 : d, p = t2.delaySpeed, y = void 0 === p ? 1500 : p, f = t2.cursor, v = void 0 !== f && f, m = t2.cursorStyle, h = void 0 === m ? "|" : m, T = t2.cursorColor, g = void 0 === T ? "inherit" : T, _ = t2.cursorBlinking, x = void 0 === _ || _, D = t2.onLoopDone, C = t2.onType, E = t2.onDelay, S = t2.onDelete, b = n({ words: o2, loop: s2, typeSpeed: c, deleteSpeed: a, delaySpeed: y, onLoopDone: D, onType: C, onDelay: E, onDelete: S })[0];
      return e.jsxs(e.Fragment, { children: [e.jsx("span", { children: b }), v && e.jsx(u, { cursorStyle: h, cursorColor: g, cursorBlinking: x })] });
    }, exports.useTypewriter = n;
  }
});
export default require_dist();
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-simple-typewriter.js.map
