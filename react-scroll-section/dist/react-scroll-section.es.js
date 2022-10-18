import Le, { createContext as fr, useState as ke, useEffect as $e, useCallback as De, useMemo as Be, createRef as dr, useContext as ue } from "react";
const vr = (u, S) => {
  let f = null;
  return (...R) => {
    f !== null && (clearTimeout(f), f = null), f = setTimeout(() => u(...R), S);
  };
}, pr = {
  registerRef: () => null,
  unregisterRef: () => {
  },
  scrollTo: () => {
  },
  sections: {},
  selected: ""
}, H = fr(pr), { Consumer: _r, Provider: gr } = H;
var We = { exports: {} };
(function(u, S) {
  (function() {
    function f() {
      var a = window, R = document;
      if ("scrollBehavior" in R.documentElement.style && a.__forceSmoothScrollPolyfill__ !== !0)
        return;
      var g = a.HTMLElement || a.Element, h = 468, l = {
        scroll: a.scroll || a.scrollTo,
        scrollBy: a.scrollBy,
        elementScroll: g.prototype.scroll || w,
        scrollIntoView: g.prototype.scrollIntoView
      }, m = a.performance && a.performance.now ? a.performance.now.bind(a.performance) : Date.now;
      function E(n) {
        var b = ["MSIE ", "Trident/", "Edge/"];
        return new RegExp(b.join("|")).test(n);
      }
      var c = E(a.navigator.userAgent) ? 1 : 0;
      function w(n, b) {
        this.scrollLeft = n, this.scrollTop = b;
      }
      function T(n) {
        return 0.5 * (1 - Math.cos(Math.PI * n));
      }
      function P(n) {
        if (n === null || typeof n != "object" || n.behavior === void 0 || n.behavior === "auto" || n.behavior === "instant")
          return !0;
        if (typeof n == "object" && n.behavior === "smooth")
          return !1;
        throw new TypeError(
          "behavior member of ScrollOptions " + n.behavior + " is not a valid value for enumeration ScrollBehavior."
        );
      }
      function C(n, b) {
        if (b === "Y")
          return n.clientHeight + c < n.scrollHeight;
        if (b === "X")
          return n.clientWidth + c < n.scrollWidth;
      }
      function x(n, b) {
        var j = a.getComputedStyle(n, null)["overflow" + b];
        return j === "auto" || j === "scroll";
      }
      function Y(n) {
        var b = C(n, "Y") && x(n, "Y"), j = C(n, "X") && x(n, "X");
        return b || j;
      }
      function L(n) {
        for (; n !== R.body && Y(n) === !1; )
          n = n.parentNode || n.host;
        return n;
      }
      function W(n) {
        var b = m(), j, D, _, A = (b - n.startTime) / h;
        A = A > 1 ? 1 : A, j = T(A), D = n.startX + (n.x - n.startX) * j, _ = n.startY + (n.y - n.startY) * j, n.method.call(n.scrollable, D, _), (D !== n.x || _ !== n.y) && a.requestAnimationFrame(W.bind(a, n));
      }
      function d(n, b, j) {
        var D, _, A, M, K = m();
        n === R.body ? (D = a, _ = a.scrollX || a.pageXOffset, A = a.scrollY || a.pageYOffset, M = l.scroll) : (D = n, _ = n.scrollLeft, A = n.scrollTop, M = w), W({
          scrollable: D,
          method: M,
          startTime: K,
          startX: _,
          startY: A,
          x: b,
          y: j
        });
      }
      a.scroll = a.scrollTo = function() {
        if (arguments[0] !== void 0) {
          if (P(arguments[0]) === !0) {
            l.scroll.call(
              a,
              arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : a.scrollX || a.pageXOffset,
              arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : a.scrollY || a.pageYOffset
            );
            return;
          }
          d.call(
            a,
            R.body,
            arguments[0].left !== void 0 ? ~~arguments[0].left : a.scrollX || a.pageXOffset,
            arguments[0].top !== void 0 ? ~~arguments[0].top : a.scrollY || a.pageYOffset
          );
        }
      }, a.scrollBy = function() {
        if (arguments[0] !== void 0) {
          if (P(arguments[0])) {
            l.scrollBy.call(
              a,
              arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : 0,
              arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0
            );
            return;
          }
          d.call(
            a,
            R.body,
            ~~arguments[0].left + (a.scrollX || a.pageXOffset),
            ~~arguments[0].top + (a.scrollY || a.pageYOffset)
          );
        }
      }, g.prototype.scroll = g.prototype.scrollTo = function() {
        if (arguments[0] !== void 0) {
          if (P(arguments[0]) === !0) {
            if (typeof arguments[0] == "number" && arguments[1] === void 0)
              throw new SyntaxError("Value could not be converted");
            l.elementScroll.call(
              this,
              arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] != "object" ? ~~arguments[0] : this.scrollLeft,
              arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop
            );
            return;
          }
          var n = arguments[0].left, b = arguments[0].top;
          d.call(
            this,
            this,
            typeof n > "u" ? this.scrollLeft : ~~n,
            typeof b > "u" ? this.scrollTop : ~~b
          );
        }
      }, g.prototype.scrollBy = function() {
        if (arguments[0] !== void 0) {
          if (P(arguments[0]) === !0) {
            l.elementScroll.call(
              this,
              arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft,
              arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
            );
            return;
          }
          this.scroll({
            left: ~~arguments[0].left + this.scrollLeft,
            top: ~~arguments[0].top + this.scrollTop,
            behavior: arguments[0].behavior
          });
        }
      }, g.prototype.scrollIntoView = function() {
        if (P(arguments[0]) === !0) {
          l.scrollIntoView.call(
            this,
            arguments[0] === void 0 ? !0 : arguments[0]
          );
          return;
        }
        var n = L(this), b = n.getBoundingClientRect(), j = this.getBoundingClientRect();
        n !== R.body ? (d.call(
          this,
          n,
          n.scrollLeft + j.left - b.left,
          n.scrollTop + j.top - b.top
        ), a.getComputedStyle(n).position !== "fixed" && a.scrollBy({
          left: b.left,
          top: b.top,
          behavior: "smooth"
        })) : a.scrollBy({
          left: j.left,
          top: j.top,
          behavior: "smooth"
        });
      };
    }
    u.exports = { polyfill: f };
  })();
})(We);
const mr = We.exports;
var Ve = { exports: {} }, N = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ie, Ye;
function Fe() {
  if (Ye)
    return ie;
  Ye = 1;
  var u = Object.getOwnPropertySymbols, S = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
  function a(g) {
    if (g == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(g);
  }
  function R() {
    try {
      if (!Object.assign)
        return !1;
      var g = new String("abc");
      if (g[5] = "de", Object.getOwnPropertyNames(g)[0] === "5")
        return !1;
      for (var h = {}, l = 0; l < 10; l++)
        h["_" + String.fromCharCode(l)] = l;
      var m = Object.getOwnPropertyNames(h).map(function(c) {
        return h[c];
      });
      if (m.join("") !== "0123456789")
        return !1;
      var E = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(c) {
        E[c] = c;
      }), Object.keys(Object.assign({}, E)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ie = R() ? Object.assign : function(g, h) {
    for (var l, m = a(g), E, c = 1; c < arguments.length; c++) {
      l = Object(arguments[c]);
      for (var w in l)
        S.call(l, w) && (m[w] = l[w]);
      if (u) {
        E = u(l);
        for (var T = 0; T < E.length; T++)
          f.call(l, E[T]) && (m[E[T]] = l[E[T]]);
      }
    }
    return m;
  }, ie;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae;
function hr() {
  if (Ae)
    return N;
  Ae = 1, Fe();
  var u = Le, S = 60103;
  if (N.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var f = Symbol.for;
    S = f("react.element"), N.Fragment = f("react.fragment");
  }
  var a = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, R = Object.prototype.hasOwnProperty, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(l, m, E) {
    var c, w = {}, T = null, P = null;
    E !== void 0 && (T = "" + E), m.key !== void 0 && (T = "" + m.key), m.ref !== void 0 && (P = m.ref);
    for (c in m)
      R.call(m, c) && !g.hasOwnProperty(c) && (w[c] = m[c]);
    if (l && l.defaultProps)
      for (c in m = l.defaultProps, m)
        w[c] === void 0 && (w[c] = m[c]);
    return { $$typeof: S, type: l, key: T, ref: P, props: w, _owner: a.current };
  }
  return N.jsx = h, N.jsxs = h, N;
}
var se = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ie;
function br() {
  return Ie || (Ie = 1, function(u) {
    process.env.NODE_ENV !== "production" && function() {
      var S = Le, f = Fe(), a = 60103, R = 60106;
      u.Fragment = 60107;
      var g = 60108, h = 60114, l = 60109, m = 60110, E = 60112, c = 60113, w = 60120, T = 60115, P = 60116, C = 60121, x = 60122, Y = 60117, L = 60129, W = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var d = Symbol.for;
        a = d("react.element"), R = d("react.portal"), u.Fragment = d("react.fragment"), g = d("react.strict_mode"), h = d("react.profiler"), l = d("react.provider"), m = d("react.context"), E = d("react.forward_ref"), c = d("react.suspense"), w = d("react.suspense_list"), T = d("react.memo"), P = d("react.lazy"), C = d("react.block"), x = d("react.server.block"), Y = d("react.fundamental"), d("react.scope"), d("react.opaque.id"), L = d("react.debug_trace_mode"), d("react.offscreen"), W = d("react.legacy_hidden");
      }
      var n = typeof Symbol == "function" && Symbol.iterator, b = "@@iterator";
      function j(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = n && e[n] || e[b];
        return typeof r == "function" ? r : null;
      }
      var D = S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function _(e) {
        {
          for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            t[o - 1] = arguments[o];
          A("error", e, t);
        }
      }
      function A(e, r, t) {
        {
          var o = D.ReactDebugCurrentFrame, v = o.getStackAddendum();
          v !== "" && (r += "%s", t = t.concat([v]));
          var p = t.map(function(s) {
            return "" + s;
          });
          p.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, p);
        }
      }
      var M = !1;
      function K(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === u.Fragment || e === h || e === L || e === g || e === c || e === w || e === W || M || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === T || e.$$typeof === l || e.$$typeof === m || e.$$typeof === E || e.$$typeof === Y || e.$$typeof === C || e[0] === x));
      }
      function Me(e, r, t) {
        var o = r.displayName || r.name || "";
        return e.displayName || (o !== "" ? t + "(" + o + ")" : t);
      }
      function le(e) {
        return e.displayName || "Context";
      }
      function I(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && _("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case u.Fragment:
            return "Fragment";
          case R:
            return "Portal";
          case h:
            return "Profiler";
          case g:
            return "StrictMode";
          case c:
            return "Suspense";
          case w:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case m:
              var r = e;
              return le(r) + ".Consumer";
            case l:
              var t = e;
              return le(t._context) + ".Provider";
            case E:
              return Me(e, e.render, "ForwardRef");
            case T:
              return I(e.type);
            case C:
              return I(e._render);
            case P: {
              var o = e, v = o._payload, p = o._init;
              try {
                return I(p(v));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var X = 0, ce, fe, de, ve, pe, ge, me;
      function he() {
      }
      he.__reactDisabledLog = !0;
      function Xe() {
        {
          if (X === 0) {
            ce = console.log, fe = console.info, de = console.warn, ve = console.error, pe = console.group, ge = console.groupCollapsed, me = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: he,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          X++;
        }
      }
      function Ue() {
        {
          if (X--, X === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: f({}, e, {
                value: ce
              }),
              info: f({}, e, {
                value: fe
              }),
              warn: f({}, e, {
                value: de
              }),
              error: f({}, e, {
                value: ve
              }),
              group: f({}, e, {
                value: pe
              }),
              groupCollapsed: f({}, e, {
                value: ge
              }),
              groupEnd: f({}, e, {
                value: me
              })
            });
          }
          X < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Z = D.ReactCurrentDispatcher, Q;
      function q(e, r, t) {
        {
          if (Q === void 0)
            try {
              throw Error();
            } catch (v) {
              var o = v.stack.trim().match(/\n( *(at )?)/);
              Q = o && o[1] || "";
            }
          return `
` + Q + e;
        }
      }
      var ee = !1, G;
      {
        var qe = typeof WeakMap == "function" ? WeakMap : Map;
        G = new qe();
      }
      function be(e, r) {
        if (!e || ee)
          return "";
        {
          var t = G.get(e);
          if (t !== void 0)
            return t;
        }
        var o;
        ee = !0;
        var v = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var p;
        p = Z.current, Z.current = null, Xe();
        try {
          if (r) {
            var s = function() {
              throw Error();
            };
            if (Object.defineProperty(s.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(s, []);
              } catch (B) {
                o = B;
              }
              Reflect.construct(e, [], s);
            } else {
              try {
                s.call();
              } catch (B) {
                o = B;
              }
              e.call(s.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (B) {
              o = B;
            }
            e();
          }
        } catch (B) {
          if (B && o && typeof B.stack == "string") {
            for (var i = B.stack.split(`
`), k = o.stack.split(`
`), y = i.length - 1, O = k.length - 1; y >= 1 && O >= 0 && i[y] !== k[O]; )
              O--;
            for (; y >= 1 && O >= 0; y--, O--)
              if (i[y] !== k[O]) {
                if (y !== 1 || O !== 1)
                  do
                    if (y--, O--, O < 0 || i[y] !== k[O]) {
                      var $ = `
` + i[y].replace(" at new ", " at ");
                      return typeof e == "function" && G.set(e, $), $;
                    }
                  while (y >= 1 && O >= 0);
                break;
              }
          }
        } finally {
          ee = !1, Z.current = p, Ue(), Error.prepareStackTrace = v;
        }
        var F = e ? e.displayName || e.name : "", xe = F ? q(F) : "";
        return typeof e == "function" && G.set(e, xe), xe;
      }
      function Ee(e, r, t) {
        return be(e, !1);
      }
      function Ge(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function J(e, r, t) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return be(e, Ge(e));
        if (typeof e == "string")
          return q(e);
        switch (e) {
          case c:
            return q("Suspense");
          case w:
            return q("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case E:
              return Ee(e.render);
            case T:
              return J(e.type, r, t);
            case C:
              return Ee(e._render);
            case P: {
              var o = e, v = o._payload, p = o._init;
              try {
                return J(p(v), r, t);
              } catch {
              }
            }
          }
        return "";
      }
      var _e = {}, Re = D.ReactDebugCurrentFrame;
      function z(e) {
        if (e) {
          var r = e._owner, t = J(e.type, e._source, r ? r.type : null);
          Re.setExtraStackFrame(t);
        } else
          Re.setExtraStackFrame(null);
      }
      function Je(e, r, t, o, v) {
        {
          var p = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var s in e)
            if (p(e, s)) {
              var i = void 0;
              try {
                if (typeof e[s] != "function") {
                  var k = Error((o || "React class") + ": " + t + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw k.name = "Invariant Violation", k;
                }
                i = e[s](r, s, o, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (y) {
                i = y;
              }
              i && !(i instanceof Error) && (z(v), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", t, s, typeof i), z(null)), i instanceof Error && !(i.message in _e) && (_e[i.message] = !0, z(v), _("Failed %s type: %s", t, i.message), z(null));
            }
        }
      }
      var U = D.ReactCurrentOwner, re = Object.prototype.hasOwnProperty, ze = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, ye, Oe, te;
      te = {};
      function He(e) {
        if (re.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Ke(e) {
        if (re.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Ze(e, r) {
        if (typeof e.ref == "string" && U.current && r && U.current.stateNode !== r) {
          var t = I(U.current.type);
          te[t] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(U.current.type), e.ref), te[t] = !0);
        }
      }
      function Qe(e, r) {
        {
          var t = function() {
            ye || (ye = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
          };
          t.isReactWarning = !0, Object.defineProperty(e, "key", {
            get: t,
            configurable: !0
          });
        }
      }
      function er(e, r) {
        {
          var t = function() {
            Oe || (Oe = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
          };
          t.isReactWarning = !0, Object.defineProperty(e, "ref", {
            get: t,
            configurable: !0
          });
        }
      }
      var rr = function(e, r, t, o, v, p, s) {
        var i = {
          $$typeof: a,
          type: e,
          key: r,
          ref: t,
          props: s,
          _owner: p
        };
        return i._store = {}, Object.defineProperty(i._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(i, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: o
        }), Object.defineProperty(i, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: v
        }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
      };
      function tr(e, r, t, o, v) {
        {
          var p, s = {}, i = null, k = null;
          t !== void 0 && (i = "" + t), Ke(r) && (i = "" + r.key), He(r) && (k = r.ref, Ze(r, v));
          for (p in r)
            re.call(r, p) && !ze.hasOwnProperty(p) && (s[p] = r[p]);
          if (e && e.defaultProps) {
            var y = e.defaultProps;
            for (p in y)
              s[p] === void 0 && (s[p] = y[p]);
          }
          if (i || k) {
            var O = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
            i && Qe(s, O), k && er(s, O);
          }
          return rr(e, i, k, v, o, U.current, s);
        }
      }
      var ne = D.ReactCurrentOwner, Te = D.ReactDebugCurrentFrame;
      function V(e) {
        if (e) {
          var r = e._owner, t = J(e.type, e._source, r ? r.type : null);
          Te.setExtraStackFrame(t);
        } else
          Te.setExtraStackFrame(null);
      }
      var ae;
      ae = !1;
      function oe(e) {
        return typeof e == "object" && e !== null && e.$$typeof === a;
      }
      function we() {
        {
          if (ne.current) {
            var e = I(ne.current.type);
            if (e)
              return `

Check the render method of \`` + e + "`.";
          }
          return "";
        }
      }
      function nr(e) {
        {
          if (e !== void 0) {
            var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
            return `

Check your code at ` + r + ":" + t + ".";
          }
          return "";
        }
      }
      var Se = {};
      function ar(e) {
        {
          var r = we();
          if (!r) {
            var t = typeof e == "string" ? e : e.displayName || e.name;
            t && (r = `

Check the top-level render call using <` + t + ">.");
          }
          return r;
        }
      }
      function Ce(e, r) {
        {
          if (!e._store || e._store.validated || e.key != null)
            return;
          e._store.validated = !0;
          var t = ar(r);
          if (Se[t])
            return;
          Se[t] = !0;
          var o = "";
          e && e._owner && e._owner !== ne.current && (o = " It was passed a child from " + I(e._owner.type) + "."), V(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, o), V(null);
        }
      }
      function je(e, r) {
        {
          if (typeof e != "object")
            return;
          if (Array.isArray(e))
            for (var t = 0; t < e.length; t++) {
              var o = e[t];
              oe(o) && Ce(o, r);
            }
          else if (oe(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var v = j(e);
            if (typeof v == "function" && v !== e.entries)
              for (var p = v.call(e), s; !(s = p.next()).done; )
                oe(s.value) && Ce(s.value, r);
          }
        }
      }
      function or(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var t;
          if (typeof r == "function")
            t = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === E || r.$$typeof === T))
            t = r.propTypes;
          else
            return;
          if (t) {
            var o = I(r);
            Je(t, e.props, "prop", o, e);
          } else if (r.PropTypes !== void 0 && !ae) {
            ae = !0;
            var v = I(r);
            _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", v || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function ir(e) {
        {
          for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
            var o = r[t];
            if (o !== "children" && o !== "key") {
              V(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), V(null);
              break;
            }
          }
          e.ref !== null && (V(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), V(null));
        }
      }
      function Pe(e, r, t, o, v, p) {
        {
          var s = K(e);
          if (!s) {
            var i = "";
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var k = nr(v);
            k ? i += k : i += we();
            var y;
            e === null ? y = "null" : Array.isArray(e) ? y = "array" : e !== void 0 && e.$$typeof === a ? (y = "<" + (I(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : y = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, i);
          }
          var O = tr(e, r, t, v, p);
          if (O == null)
            return O;
          if (s) {
            var $ = r.children;
            if ($ !== void 0)
              if (o)
                if (Array.isArray($)) {
                  for (var F = 0; F < $.length; F++)
                    je($[F], e);
                  Object.freeze && Object.freeze($);
                } else
                  _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                je($, e);
          }
          return e === u.Fragment ? ir(O) : or(O), O;
        }
      }
      function sr(e, r, t) {
        return Pe(e, r, t, !0);
      }
      function ur(e, r, t) {
        return Pe(e, r, t, !1);
      }
      var lr = ur, cr = sr;
      u.jsx = lr, u.jsxs = cr;
    }();
  }(se)), se;
}
(function(u) {
  process.env.NODE_ENV === "production" ? u.exports = hr() : u.exports = br();
})(Ve);
const Ne = Ve.exports.jsx;
typeof window < "u" && mr.polyfill();
const Rr = ({
  debounceDelay: u = 50,
  scrollBehavior: S = "smooth",
  offset: f = 0,
  children: a
}) => {
  const [R, g] = ke(""), [h, l] = ke({});
  $e(() => (document.addEventListener("scroll", E, !0), m(), () => {
    document.removeEventListener("scroll", E, !0);
  }), [h]);
  const m = De(() => {
    const C = Object.keys(h).reduce((x, Y) => {
      const L = h[Y].ref.current;
      if (!L)
        return {
          id: Y,
          differenceFromTop: 0
        };
      const {
        top: W
      } = L.getBoundingClientRect(), d = Math.abs(W);
      return d >= x.differenceFromTop ? x : {
        id: Y,
        differenceFromTop: d
      };
    }, {
      id: "",
      differenceFromTop: 9999
    });
    R !== C.id && g(C.id);
  }, [h]), E = vr(m, u), c = ({
    id: C,
    meta: x
  }) => {
    const Y = dr();
    return l((L) => ({
      ...L,
      [C]: {
        ref: Y,
        meta: x
      }
    })), Y;
  }, w = (C) => {
    l(({
      [C]: x,
      ...Y
    }) => Y);
  }, T = De((C) => {
    const x = h[C];
    if (!x)
      return console.warn("Section ID not recognized!");
    g(C), x.ref.current && window.scrollTo({
      top: x.ref.current.offsetTop + f,
      behavior: S
    });
  }, [h]), P = Be(() => ({
    registerRef: c,
    unregisterRef: w,
    scrollTo: T,
    sections: h,
    selected: R
  }), [R, h]);
  return /* @__PURE__ */ Ne(gr, {
    value: P,
    children: a
  });
}, yr = ({
  id: u,
  children: S,
  meta: f,
  ...a
}) => {
  const {
    registerRef: R,
    unregisterRef: g
  } = ue(H), h = Be(() => R({
    id: u,
    meta: f
  }), [u]);
  return $e(() => function() {
    g(u);
  }, []), /* @__PURE__ */ Ne("section", {
    ...a,
    ref: h,
    id: u,
    children: S
  });
}, Or = (u) => {
  const { scrollTo: S, selected: f } = ue(H);
  return { onClick: () => S(u), selected: f === u };
}, Tr = () => {
  const {
    scrollTo: u,
    selected: S,
    sections: f
  } = ue(H);
  return Object.keys(f).map((a) => ({
    id: a,
    meta: f[a].meta,
    onClick: () => u(a),
    selected: S === a
  }));
};
export {
  H as ScrollContext,
  Rr as ScrollingProvider,
  yr as Section,
  Or as useScrollSection,
  Tr as useScrollSections
};
//# sourceMappingURL=react-scroll-section.es.js.map
