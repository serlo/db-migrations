"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/fp-ts/lib/function.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.dual = exports2.getEndomorphismMonoid = exports2.not = exports2.SK = exports2.hole = exports2.pipe = exports2.untupled = exports2.tupled = exports2.absurd = exports2.decrement = exports2.increment = exports2.tuple = exports2.flow = exports2.flip = exports2.constVoid = exports2.constUndefined = exports2.constNull = exports2.constFalse = exports2.constTrue = exports2.constant = exports2.unsafeCoerce = exports2.identity = exports2.apply = exports2.getRing = exports2.getSemiring = exports2.getMonoid = exports2.getSemigroup = exports2.getBooleanAlgebra = void 0;
    var getBooleanAlgebra = function(B) {
      return function() {
        return {
          meet: function(x, y) {
            return function(a) {
              return B.meet(x(a), y(a));
            };
          },
          join: function(x, y) {
            return function(a) {
              return B.join(x(a), y(a));
            };
          },
          zero: function() {
            return B.zero;
          },
          one: function() {
            return B.one;
          },
          implies: function(x, y) {
            return function(a) {
              return B.implies(x(a), y(a));
            };
          },
          not: function(x) {
            return function(a) {
              return B.not(x(a));
            };
          }
        };
      };
    };
    exports2.getBooleanAlgebra = getBooleanAlgebra;
    var getSemigroup = function(S) {
      return function() {
        return {
          concat: function(f, g) {
            return function(a) {
              return S.concat(f(a), g(a));
            };
          }
        };
      };
    };
    exports2.getSemigroup = getSemigroup;
    var getMonoid = function(M) {
      var getSemigroupM = (0, exports2.getSemigroup)(M);
      return function() {
        return {
          concat: getSemigroupM().concat,
          empty: function() {
            return M.empty;
          }
        };
      };
    };
    exports2.getMonoid = getMonoid;
    var getSemiring = function(S) {
      return {
        add: function(f, g) {
          return function(x) {
            return S.add(f(x), g(x));
          };
        },
        zero: function() {
          return S.zero;
        },
        mul: function(f, g) {
          return function(x) {
            return S.mul(f(x), g(x));
          };
        },
        one: function() {
          return S.one;
        }
      };
    };
    exports2.getSemiring = getSemiring;
    var getRing = function(R) {
      var S = (0, exports2.getSemiring)(R);
      return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function(f, g) {
          return function(x) {
            return R.sub(f(x), g(x));
          };
        }
      };
    };
    exports2.getRing = getRing;
    var apply = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports2.apply = apply;
    function identity(a) {
      return a;
    }
    exports2.identity = identity;
    exports2.unsafeCoerce = identity;
    function constant(a) {
      return function() {
        return a;
      };
    }
    exports2.constant = constant;
    exports2.constTrue = constant(true);
    exports2.constFalse = constant(false);
    exports2.constNull = constant(null);
    exports2.constUndefined = constant(void 0);
    exports2.constVoid = exports2.constUndefined;
    function flip(f) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (args.length > 1) {
          return f(args[1], args[0]);
        }
        return function(a) {
          return f(a)(args[0]);
        };
      };
    }
    exports2.flip = flip;
    function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
        case 1:
          return ab;
        case 2:
          return function() {
            return bc(ab.apply(this, arguments));
          };
        case 3:
          return function() {
            return cd(bc(ab.apply(this, arguments)));
          };
        case 4:
          return function() {
            return de(cd(bc(ab.apply(this, arguments))));
          };
        case 5:
          return function() {
            return ef(de(cd(bc(ab.apply(this, arguments)))));
          };
        case 6:
          return function() {
            return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
          };
        case 7:
          return function() {
            return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
          };
        case 8:
          return function() {
            return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
          };
        case 9:
          return function() {
            return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
          };
      }
      return;
    }
    exports2.flow = flow;
    function tuple() {
      var t3 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t3[_i] = arguments[_i];
      }
      return t3;
    }
    exports2.tuple = tuple;
    function increment(n) {
      return n + 1;
    }
    exports2.increment = increment;
    function decrement(n) {
      return n - 1;
    }
    exports2.decrement = decrement;
    function absurd(_) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    exports2.absurd = absurd;
    function tupled(f) {
      return function(a) {
        return f.apply(void 0, a);
      };
    }
    exports2.tupled = tupled;
    function untupled(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return f(a);
      };
    }
    exports2.untupled = untupled;
    function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
      switch (arguments.length) {
        case 1:
          return a;
        case 2:
          return ab(a);
        case 3:
          return bc(ab(a));
        case 4:
          return cd(bc(ab(a)));
        case 5:
          return de(cd(bc(ab(a))));
        case 6:
          return ef(de(cd(bc(ab(a)))));
        case 7:
          return fg(ef(de(cd(bc(ab(a))))));
        case 8:
          return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
          return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default: {
          var ret = arguments[0];
          for (var i = 1; i < arguments.length; i++) {
            ret = arguments[i](ret);
          }
          return ret;
        }
      }
    }
    exports2.pipe = pipe;
    exports2.hole = absurd;
    var SK = function(_, b) {
      return b;
    };
    exports2.SK = SK;
    function not(predicate) {
      return function(a) {
        return !predicate(a);
      };
    }
    exports2.not = not;
    var getEndomorphismMonoid = function() {
      return {
        concat: function(first, second) {
          return flow(first, second);
        },
        empty: identity
      };
    };
    exports2.getEndomorphismMonoid = getEndomorphismMonoid;
    var dual = function(arity, body) {
      var isDataFirst = typeof arity === "number" ? function(args) {
        return args.length >= arity;
      } : arity;
      return function() {
        var args = Array.from(arguments);
        if (isDataFirst(arguments)) {
          return body.apply(this, args);
        }
        return function(self) {
          return body.apply(void 0, __spreadArray([self], args, false));
        };
      };
    };
    exports2.dual = dual;
  }
});

// node_modules/fp-ts/lib/internal.js
var require_internal = __commonJS({
  "node_modules/fp-ts/lib/internal.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.flatMapReader = exports2.flatMapTask = exports2.flatMapIO = exports2.flatMapEither = exports2.flatMapOption = exports2.flatMapNullable = exports2.liftOption = exports2.liftNullable = exports2.fromReadonlyNonEmptyArray = exports2.has = exports2.emptyRecord = exports2.emptyReadonlyArray = exports2.tail = exports2.head = exports2.isNonEmpty = exports2.singleton = exports2.right = exports2.left = exports2.isRight = exports2.isLeft = exports2.some = exports2.none = exports2.isSome = exports2.isNone = void 0;
    var function_1 = require_function();
    var isNone = function(fa) {
      return fa._tag === "None";
    };
    exports2.isNone = isNone;
    var isSome = function(fa) {
      return fa._tag === "Some";
    };
    exports2.isSome = isSome;
    exports2.none = { _tag: "None" };
    var some = function(a) {
      return { _tag: "Some", value: a };
    };
    exports2.some = some;
    var isLeft = function(ma) {
      return ma._tag === "Left";
    };
    exports2.isLeft = isLeft;
    var isRight = function(ma) {
      return ma._tag === "Right";
    };
    exports2.isRight = isRight;
    var left = function(e) {
      return { _tag: "Left", left: e };
    };
    exports2.left = left;
    var right = function(a) {
      return { _tag: "Right", right: a };
    };
    exports2.right = right;
    var singleton = function(a) {
      return [a];
    };
    exports2.singleton = singleton;
    var isNonEmpty = function(as) {
      return as.length > 0;
    };
    exports2.isNonEmpty = isNonEmpty;
    var head = function(as) {
      return as[0];
    };
    exports2.head = head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports2.tail = tail;
    exports2.emptyReadonlyArray = [];
    exports2.emptyRecord = {};
    exports2.has = Object.prototype.hasOwnProperty;
    var fromReadonlyNonEmptyArray = function(as) {
      return __spreadArray([as[0]], as.slice(1), true);
    };
    exports2.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
    var liftNullable = function(F) {
      return function(f, onNullable) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither(o == null ? (0, exports2.left)(onNullable.apply(void 0, a)) : (0, exports2.right)(o));
        };
      };
    };
    exports2.liftNullable = liftNullable;
    var liftOption = function(F) {
      return function(f, onNone) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither((0, exports2.isNone)(o) ? (0, exports2.left)(onNone.apply(void 0, a)) : (0, exports2.right)(o.value));
        };
      };
    };
    exports2.liftOption = liftOption;
    var flatMapNullable = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(3, function(self, f, onNullable) {
        return M.flatMap(self, (0, exports2.liftNullable)(F)(f, onNullable));
      });
    };
    exports2.flatMapNullable = flatMapNullable;
    var flatMapOption = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(3, function(self, f, onNone) {
        return M.flatMap(self, (0, exports2.liftOption)(F)(f, onNone));
      });
    };
    exports2.flatMapOption = flatMapOption;
    var flatMapEither = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromEither(f(a));
        });
      });
    };
    exports2.flatMapEither = flatMapEither;
    var flatMapIO = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromIO(f(a));
        });
      });
    };
    exports2.flatMapIO = flatMapIO;
    var flatMapTask = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromTask(f(a));
        });
      });
    };
    exports2.flatMapTask = flatMapTask;
    var flatMapReader = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromReader(f(a));
        });
      });
    };
    exports2.flatMapReader = flatMapReader;
  }
});

// node_modules/fp-ts/lib/Apply.js
var require_Apply = __commonJS({
  "node_modules/fp-ts/lib/Apply.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sequenceS = exports2.sequenceT = exports2.getApplySemigroup = exports2.apS = exports2.apSecond = exports2.apFirst = exports2.ap = void 0;
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    function ap(F, G) {
      return function(fa) {
        return function(fab) {
          return F.ap(F.map(fab, function(gab) {
            return function(ga) {
              return G.ap(gab, ga);
            };
          }), fa);
        };
      };
    }
    exports2.ap = ap;
    function apFirst(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function(a) {
            return function() {
              return a;
            };
          }), second);
        };
      };
    }
    exports2.apFirst = apFirst;
    function apSecond(A) {
      return function(second) {
        return function(first) {
          return A.ap(A.map(first, function() {
            return function(b) {
              return b;
            };
          }), second);
        };
      };
    }
    exports2.apSecond = apSecond;
    function apS(F) {
      return function(name, fb) {
        return function(fa) {
          return F.ap(F.map(fa, function(a) {
            return function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            };
          }), fb);
        };
      };
    }
    exports2.apS = apS;
    function getApplySemigroup(F) {
      return function(S) {
        return {
          concat: function(first, second) {
            return F.ap(F.map(first, function(x) {
              return function(y) {
                return S.concat(x, y);
              };
            }), second);
          }
        };
      };
    }
    exports2.getApplySemigroup = getApplySemigroup;
    function curried(f, n, acc) {
      return function(x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
          combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
      };
    }
    var tupleConstructors = {
      1: function(a) {
        return [a];
      },
      2: function(a) {
        return function(b) {
          return [a, b];
        };
      },
      3: function(a) {
        return function(b) {
          return function(c) {
            return [a, b, c];
          };
        };
      },
      4: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return [a, b, c, d];
            };
          };
        };
      },
      5: function(a) {
        return function(b) {
          return function(c) {
            return function(d) {
              return function(e) {
                return [a, b, c, d, e];
              };
            };
          };
        };
      }
    };
    function getTupleConstructor(len) {
      if (!_.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
      }
      return tupleConstructors[len];
    }
    function sequenceT(F) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
          fas = F.ap(fas, args[i]);
        }
        return fas;
      };
    }
    exports2.sequenceT = sequenceT;
    function getRecordConstructor(keys4) {
      var len = keys4.length;
      switch (len) {
        case 1:
          return function(a) {
            var _a;
            return _a = {}, _a[keys4[0]] = a, _a;
          };
        case 2:
          return function(a) {
            return function(b) {
              var _a;
              return _a = {}, _a[keys4[0]] = a, _a[keys4[1]] = b, _a;
            };
          };
        case 3:
          return function(a) {
            return function(b) {
              return function(c) {
                var _a;
                return _a = {}, _a[keys4[0]] = a, _a[keys4[1]] = b, _a[keys4[2]] = c, _a;
              };
            };
          };
        case 4:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  var _a;
                  return _a = {}, _a[keys4[0]] = a, _a[keys4[1]] = b, _a[keys4[2]] = c, _a[keys4[3]] = d, _a;
                };
              };
            };
          };
        case 5:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  return function(e) {
                    var _a;
                    return _a = {}, _a[keys4[0]] = a, _a[keys4[1]] = b, _a[keys4[2]] = c, _a[keys4[3]] = d, _a[keys4[4]] = e, _a;
                  };
                };
              };
            };
          };
        default:
          return curried(function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var r = {};
            for (var i = 0; i < len; i++) {
              r[keys4[i]] = args[i];
            }
            return r;
          }, len - 1, []);
      }
    }
    function sequenceS(F) {
      return function(r) {
        var keys4 = Object.keys(r);
        var len = keys4.length;
        var f = getRecordConstructor(keys4);
        var fr = F.map(r[keys4[0]], f);
        for (var i = 1; i < len; i++) {
          fr = F.ap(fr, r[keys4[i]]);
        }
        return fr;
      };
    }
    exports2.sequenceS = sequenceS;
  }
});

// node_modules/fp-ts/lib/Functor.js
var require_Functor = __commonJS({
  "node_modules/fp-ts/lib/Functor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.asUnit = exports2.as = exports2.getFunctorComposition = exports2.let = exports2.bindTo = exports2.flap = exports2.map = void 0;
    var function_1 = require_function();
    function map(F, G) {
      return function(f) {
        return function(fa) {
          return F.map(fa, function(ga) {
            return G.map(ga, f);
          });
        };
      };
    }
    exports2.map = map;
    function flap(F) {
      return function(a) {
        return function(fab) {
          return F.map(fab, function(f) {
            return f(a);
          });
        };
      };
    }
    exports2.flap = flap;
    function bindTo(F) {
      return function(name) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return _a = {}, _a[name] = a, _a;
          });
        };
      };
    }
    exports2.bindTo = bindTo;
    function let_(F) {
      return function(name, f) {
        return function(fa) {
          return F.map(fa, function(a) {
            var _a;
            return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
          });
        };
      };
    }
    exports2.let = let_;
    function getFunctorComposition(F, G) {
      var _map = map(F, G);
      return {
        map: function(fga, f) {
          return (0, function_1.pipe)(fga, _map(f));
        }
      };
    }
    exports2.getFunctorComposition = getFunctorComposition;
    function as(F) {
      return function(self, b) {
        return F.map(self, function() {
          return b;
        });
      };
    }
    exports2.as = as;
    function asUnit(F) {
      var asM = as(F);
      return function(self) {
        return asM(self, void 0);
      };
    }
    exports2.asUnit = asUnit;
  }
});

// node_modules/fp-ts/lib/Applicative.js
var require_Applicative = __commonJS({
  "node_modules/fp-ts/lib/Applicative.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getApplicativeComposition = exports2.getApplicativeMonoid = void 0;
    var Apply_1 = require_Apply();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    function getApplicativeMonoid(F) {
      var f = (0, Apply_1.getApplySemigroup)(F);
      return function(M) {
        return {
          concat: f(M).concat,
          empty: F.of(M.empty)
        };
      };
    }
    exports2.getApplicativeMonoid = getApplicativeMonoid;
    function getApplicativeComposition(F, G) {
      var map = (0, Functor_1.getFunctorComposition)(F, G).map;
      var _ap = (0, Apply_1.ap)(F, G);
      return {
        map,
        of: function(a) {
          return F.of(G.of(a));
        },
        ap: function(fgab, fga) {
          return (0, function_1.pipe)(fgab, _ap(fga));
        }
      };
    }
    exports2.getApplicativeComposition = getApplicativeComposition;
  }
});

// node_modules/fp-ts/lib/Chain.js
var require_Chain = __commonJS({
  "node_modules/fp-ts/lib/Chain.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bind = exports2.tap = exports2.chainFirst = void 0;
    function chainFirst(M) {
      var tapM = tap(M);
      return function(f) {
        return function(first) {
          return tapM(first, f);
        };
      };
    }
    exports2.chainFirst = chainFirst;
    function tap(M) {
      return function(first, f) {
        return M.chain(first, function(a) {
          return M.map(f(a), function() {
            return a;
          });
        });
      };
    }
    exports2.tap = tap;
    function bind(M) {
      return function(name, f) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return M.map(f(a), function(b) {
              var _a;
              return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            });
          });
        };
      };
    }
    exports2.bind = bind;
  }
});

// node_modules/fp-ts/lib/ChainRec.js
var require_ChainRec = __commonJS({
  "node_modules/fp-ts/lib/ChainRec.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tailRec = void 0;
    var tailRec = function(startWith, f) {
      var ab = f(startWith);
      while (ab._tag === "Left") {
        ab = f(ab.left);
      }
      return ab.right;
    };
    exports2.tailRec = tailRec;
  }
});

// node_modules/fp-ts/lib/FromEither.js
var require_FromEither = __commonJS({
  "node_modules/fp-ts/lib/FromEither.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tapEither = exports2.filterOrElse = exports2.chainFirstEitherK = exports2.chainEitherK = exports2.fromEitherK = exports2.chainOptionK = exports2.fromOptionK = exports2.fromPredicate = exports2.fromOption = void 0;
    var Chain_1 = require_Chain();
    var function_1 = require_function();
    var _ = __importStar(require_internal());
    function fromOption(F) {
      return function(onNone) {
        return function(ma) {
          return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value));
        };
      };
    }
    exports2.fromOption = fromOption;
    function fromPredicate(F) {
      return function(predicate, onFalse) {
        return function(a) {
          return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
      };
    }
    exports2.fromPredicate = fromPredicate;
    function fromOptionK(F) {
      var fromOptionF = fromOption(F);
      return function(onNone) {
        var from = fromOptionF(onNone);
        return function(f) {
          return (0, function_1.flow)(f, from);
        };
      };
    }
    exports2.fromOptionK = fromOptionK;
    function chainOptionK(F, M) {
      var fromOptionKF = fromOptionK(F);
      return function(onNone) {
        var from = fromOptionKF(onNone);
        return function(f) {
          return function(ma) {
            return M.chain(ma, from(f));
          };
        };
      };
    }
    exports2.chainOptionK = chainOptionK;
    function fromEitherK(F) {
      return function(f) {
        return (0, function_1.flow)(f, F.fromEither);
      };
    }
    exports2.fromEitherK = fromEitherK;
    function chainEitherK(F, M) {
      var fromEitherKF = fromEitherK(F);
      return function(f) {
        return function(ma) {
          return M.chain(ma, fromEitherKF(f));
        };
      };
    }
    exports2.chainEitherK = chainEitherK;
    function chainFirstEitherK(F, M) {
      var tapEitherM = tapEither(F, M);
      return function(f) {
        return function(ma) {
          return tapEitherM(ma, f);
        };
      };
    }
    exports2.chainFirstEitherK = chainFirstEitherK;
    function filterOrElse(F, M) {
      return function(predicate, onFalse) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
          });
        };
      };
    }
    exports2.filterOrElse = filterOrElse;
    function tapEither(F, M) {
      var fromEither = fromEitherK(F);
      var tapM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return tapM(self, fromEither(f));
      };
    }
    exports2.tapEither = tapEither;
  }
});

// node_modules/fp-ts/lib/Separated.js
var require_Separated = __commonJS({
  "node_modules/fp-ts/lib/Separated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.right = exports2.left = exports2.flap = exports2.Functor = exports2.Bifunctor = exports2.URI = exports2.bimap = exports2.mapLeft = exports2.map = exports2.separated = void 0;
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var separated = function(left2, right2) {
      return { left: left2, right: right2 };
    };
    exports2.separated = separated;
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.map)(f));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.mapLeft)(f));
    };
    var _bimap = function(fa, g, f) {
      return (0, function_1.pipe)(fa, (0, exports2.bimap)(g, f));
    };
    var map = function(f) {
      return function(fa) {
        return (0, exports2.separated)((0, exports2.left)(fa), f((0, exports2.right)(fa)));
      };
    };
    exports2.map = map;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports2.separated)(f((0, exports2.left)(fa)), (0, exports2.right)(fa));
      };
    };
    exports2.mapLeft = mapLeft;
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports2.separated)(f((0, exports2.left)(fa)), g((0, exports2.right)(fa)));
      };
    };
    exports2.bimap = bimap;
    exports2.URI = "Separated";
    exports2.Bifunctor = {
      URI: exports2.URI,
      mapLeft: _mapLeft,
      bimap: _bimap
    };
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    var left = function(s) {
      return s.left;
    };
    exports2.left = left;
    var right = function(s) {
      return s.right;
    };
    exports2.right = right;
  }
});

// node_modules/fp-ts/lib/Witherable.js
var require_Witherable = __commonJS({
  "node_modules/fp-ts/lib/Witherable.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.filterE = exports2.witherDefault = exports2.wiltDefault = void 0;
    var _ = __importStar(require_internal());
    function wiltDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.separate);
        };
      };
    }
    exports2.wiltDefault = wiltDefault;
    function witherDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.compact);
        };
      };
    }
    exports2.witherDefault = witherDefault;
    function filterE(W) {
      return function(F) {
        var witherF = W.wither(F);
        return function(predicate) {
          return function(ga) {
            return witherF(ga, function(a) {
              return F.map(predicate(a), function(b) {
                return b ? _.some(a) : _.none;
              });
            });
          };
        };
      };
    }
    exports2.filterE = filterE;
  }
});

// node_modules/fp-ts/lib/Either.js
var require_Either = __commonJS({
  "node_modules/fp-ts/lib/Either.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.match = exports2.foldW = exports2.matchW = exports2.isRight = exports2.isLeft = exports2.fromOption = exports2.fromPredicate = exports2.FromEither = exports2.MonadThrow = exports2.throwError = exports2.ChainRec = exports2.Extend = exports2.extend = exports2.Alt = exports2.alt = exports2.altW = exports2.Bifunctor = exports2.mapLeft = exports2.bimap = exports2.Traversable = exports2.sequence = exports2.traverse = exports2.Foldable = exports2.reduceRight = exports2.foldMap = exports2.reduce = exports2.Monad = exports2.Chain = exports2.Applicative = exports2.Apply = exports2.ap = exports2.apW = exports2.Pointed = exports2.of = exports2.asUnit = exports2.as = exports2.Functor = exports2.map = exports2.getAltValidation = exports2.getApplicativeValidation = exports2.getWitherable = exports2.getFilterable = exports2.getCompactable = exports2.getSemigroup = exports2.getEq = exports2.getShow = exports2.URI = exports2.flatMap = exports2.right = exports2.left = void 0;
    exports2.chainFirstW = exports2.chainFirst = exports2.chain = exports2.chainW = exports2.sequenceArray = exports2.traverseArray = exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex = exports2.traverseReadonlyNonEmptyArrayWithIndex = exports2.ApT = exports2.apSW = exports2.apS = exports2.bindW = exports2.bind = exports2.let = exports2.bindTo = exports2.Do = exports2.exists = exports2.elem = exports2.toError = exports2.toUnion = exports2.chainNullableK = exports2.fromNullableK = exports2.tryCatchK = exports2.tryCatch = exports2.fromNullable = exports2.orElse = exports2.orElseW = exports2.swap = exports2.filterOrElseW = exports2.filterOrElse = exports2.flatMapOption = exports2.flatMapNullable = exports2.liftOption = exports2.liftNullable = exports2.chainOptionKW = exports2.chainOptionK = exports2.fromOptionK = exports2.duplicate = exports2.flatten = exports2.flattenW = exports2.tap = exports2.apSecondW = exports2.apSecond = exports2.apFirstW = exports2.apFirst = exports2.flap = exports2.getOrElse = exports2.getOrElseW = exports2.fold = void 0;
    exports2.getValidation = exports2.getValidationMonoid = exports2.getValidationSemigroup = exports2.getApplyMonoid = exports2.getApplySemigroup = exports2.either = exports2.stringifyJSON = exports2.parseJSON = void 0;
    var Applicative_1 = require_Applicative();
    var Apply_1 = require_Apply();
    var chainable = __importStar(require_Chain());
    var ChainRec_1 = require_ChainRec();
    var FromEither_1 = require_FromEither();
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var _ = __importStar(require_internal());
    var Separated_1 = require_Separated();
    var Witherable_1 = require_Witherable();
    exports2.left = _.left;
    exports2.right = _.right;
    exports2.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, exports2.isLeft)(ma) ? ma : f(ma.right);
    });
    var _map = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.map)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports2.ap)(fa));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports2.reduce)(b, f));
    };
    var _foldMap = function(M) {
      return function(fa, f) {
        var foldMapM = (0, exports2.foldMap)(M);
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports2.reduceRight)(b, f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports2.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _bimap = function(fa, f, g) {
      return (0, function_1.pipe)(fa, (0, exports2.bimap)(f, g));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports2.mapLeft)(f));
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports2.alt)(that));
    };
    var _extend = function(wa, f) {
      return (0, function_1.pipe)(wa, (0, exports2.extend)(f));
    };
    var _chainRec = function(a, f) {
      return (0, ChainRec_1.tailRec)(f(a), function(e) {
        return (0, exports2.isLeft)(e) ? (0, exports2.right)((0, exports2.left)(e.left)) : (0, exports2.isLeft)(e.right) ? (0, exports2.left)(f(e.right.left)) : (0, exports2.right)((0, exports2.right)(e.right.right));
      });
    };
    exports2.URI = "Either";
    var getShow = function(SE, SA) {
      return {
        show: function(ma) {
          return (0, exports2.isLeft)(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")");
        }
      };
    };
    exports2.getShow = getShow;
    var getEq = function(EL, EA) {
      return {
        equals: function(x, y) {
          return x === y || ((0, exports2.isLeft)(x) ? (0, exports2.isLeft)(y) && EL.equals(x.left, y.left) : (0, exports2.isRight)(y) && EA.equals(x.right, y.right));
        }
      };
    };
    exports2.getEq = getEq;
    var getSemigroup = function(S) {
      return {
        concat: function(x, y) {
          return (0, exports2.isLeft)(y) ? x : (0, exports2.isLeft)(x) ? y : (0, exports2.right)(S.concat(x.right, y.right));
        }
      };
    };
    exports2.getSemigroup = getSemigroup;
    var getCompactable = function(M) {
      var empty = (0, exports2.left)(M.empty);
      return {
        URI: exports2.URI,
        _E: void 0,
        compact: function(ma) {
          return (0, exports2.isLeft)(ma) ? ma : ma.right._tag === "None" ? empty : (0, exports2.right)(ma.right.value);
        },
        separate: function(ma) {
          return (0, exports2.isLeft)(ma) ? (0, Separated_1.separated)(ma, ma) : (0, exports2.isLeft)(ma.right) ? (0, Separated_1.separated)((0, exports2.right)(ma.right.left), empty) : (0, Separated_1.separated)(empty, (0, exports2.right)(ma.right.right));
        }
      };
    };
    exports2.getCompactable = getCompactable;
    var getFilterable = function(M) {
      var empty = (0, exports2.left)(M.empty);
      var _a = (0, exports2.getCompactable)(M), compact = _a.compact, separate = _a.separate;
      var filter = function(ma, predicate) {
        return (0, exports2.isLeft)(ma) ? ma : predicate(ma.right) ? ma : empty;
      };
      var partition = function(ma, p) {
        return (0, exports2.isLeft)(ma) ? (0, Separated_1.separated)(ma, ma) : p(ma.right) ? (0, Separated_1.separated)(empty, (0, exports2.right)(ma.right)) : (0, Separated_1.separated)((0, exports2.right)(ma.right), empty);
      };
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        compact,
        separate,
        filter,
        filterMap: function(ma, f) {
          if ((0, exports2.isLeft)(ma)) {
            return ma;
          }
          var ob = f(ma.right);
          return ob._tag === "None" ? empty : (0, exports2.right)(ob.value);
        },
        partition,
        partitionMap: function(ma, f) {
          if ((0, exports2.isLeft)(ma)) {
            return (0, Separated_1.separated)(ma, ma);
          }
          var e = f(ma.right);
          return (0, exports2.isLeft)(e) ? (0, Separated_1.separated)((0, exports2.right)(e.left), empty) : (0, Separated_1.separated)(empty, (0, exports2.right)(e.right));
        }
      };
    };
    exports2.getFilterable = getFilterable;
    var getWitherable = function(M) {
      var F_ = (0, exports2.getFilterable)(M);
      var C = (0, exports2.getCompactable)(M);
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: exports2.sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: (0, Witherable_1.witherDefault)(exports2.Traversable, C),
        wilt: (0, Witherable_1.wiltDefault)(exports2.Traversable, C)
      };
    };
    exports2.getWitherable = getWitherable;
    var getApplicativeValidation = function(SE) {
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        ap: function(fab, fa) {
          return (0, exports2.isLeft)(fab) ? (0, exports2.isLeft)(fa) ? (0, exports2.left)(SE.concat(fab.left, fa.left)) : fab : (0, exports2.isLeft)(fa) ? fa : (0, exports2.right)(fab.right(fa.right));
        },
        of: exports2.of
      };
    };
    exports2.getApplicativeValidation = getApplicativeValidation;
    var getAltValidation = function(SE) {
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        alt: function(me, that) {
          if ((0, exports2.isRight)(me)) {
            return me;
          }
          var ea = that();
          return (0, exports2.isLeft)(ea) ? (0, exports2.left)(SE.concat(me.left, ea.left)) : ea;
        }
      };
    };
    exports2.getAltValidation = getAltValidation;
    var map = function(f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? fa : (0, exports2.right)(f(fa.right));
      };
    };
    exports2.map = map;
    exports2.Functor = {
      URI: exports2.URI,
      map: _map
    };
    exports2.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports2.Functor));
    exports2.asUnit = (0, Functor_1.asUnit)(exports2.Functor);
    exports2.of = exports2.right;
    exports2.Pointed = {
      URI: exports2.URI,
      of: exports2.of
    };
    var apW = function(fa) {
      return function(fab) {
        return (0, exports2.isLeft)(fab) ? fab : (0, exports2.isLeft)(fa) ? fa : (0, exports2.right)(fab.right(fa.right));
      };
    };
    exports2.apW = apW;
    exports2.ap = exports2.apW;
    exports2.Apply = {
      URI: exports2.URI,
      map: _map,
      ap: _ap
    };
    exports2.Applicative = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of
    };
    exports2.Chain = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      chain: exports2.flatMap
    };
    exports2.Monad = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of,
      chain: exports2.flatMap
    };
    var reduce = function(b, f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? b : f(b, fa.right);
      };
    };
    exports2.reduce = reduce;
    var foldMap = function(M) {
      return function(f) {
        return function(fa) {
          return (0, exports2.isLeft)(fa) ? M.empty : f(fa.right);
        };
      };
    };
    exports2.foldMap = foldMap;
    var reduceRight = function(b, f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? b : f(fa.right, b);
      };
    };
    exports2.reduceRight = reduceRight;
    exports2.Foldable = {
      URI: exports2.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    var traverse = function(F) {
      return function(f) {
        return function(ta) {
          return (0, exports2.isLeft)(ta) ? F.of((0, exports2.left)(ta.left)) : F.map(f(ta.right), exports2.right);
        };
      };
    };
    exports2.traverse = traverse;
    var sequence = function(F) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? F.of((0, exports2.left)(ma.left)) : F.map(ma.right, exports2.right);
      };
    };
    exports2.sequence = sequence;
    exports2.Traversable = {
      URI: exports2.URI,
      map: _map,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports2.sequence
    };
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? (0, exports2.left)(f(fa.left)) : (0, exports2.right)(g(fa.right));
      };
    };
    exports2.bimap = bimap;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? (0, exports2.left)(f(fa.left)) : fa;
      };
    };
    exports2.mapLeft = mapLeft;
    exports2.Bifunctor = {
      URI: exports2.URI,
      bimap: _bimap,
      mapLeft: _mapLeft
    };
    var altW = function(that) {
      return function(fa) {
        return (0, exports2.isLeft)(fa) ? that() : fa;
      };
    };
    exports2.altW = altW;
    exports2.alt = exports2.altW;
    exports2.Alt = {
      URI: exports2.URI,
      map: _map,
      alt: _alt
    };
    var extend = function(f) {
      return function(wa) {
        return (0, exports2.isLeft)(wa) ? wa : (0, exports2.right)(f(wa));
      };
    };
    exports2.extend = extend;
    exports2.Extend = {
      URI: exports2.URI,
      map: _map,
      extend: _extend
    };
    exports2.ChainRec = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      chain: exports2.flatMap,
      chainRec: _chainRec
    };
    exports2.throwError = exports2.left;
    exports2.MonadThrow = {
      URI: exports2.URI,
      map: _map,
      ap: _ap,
      of: exports2.of,
      chain: exports2.flatMap,
      throwError: exports2.throwError
    };
    exports2.FromEither = {
      URI: exports2.URI,
      fromEither: function_1.identity
    };
    exports2.fromPredicate = (0, FromEither_1.fromPredicate)(exports2.FromEither);
    exports2.fromOption = /* @__PURE__ */ (0, FromEither_1.fromOption)(exports2.FromEither);
    exports2.isLeft = _.isLeft;
    exports2.isRight = _.isRight;
    var matchW = function(onLeft, onRight) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? onLeft(ma.left) : onRight(ma.right);
      };
    };
    exports2.matchW = matchW;
    exports2.foldW = exports2.matchW;
    exports2.match = exports2.matchW;
    exports2.fold = exports2.match;
    var getOrElseW = function(onLeft) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? onLeft(ma.left) : ma.right;
      };
    };
    exports2.getOrElseW = getOrElseW;
    exports2.getOrElse = exports2.getOrElseW;
    exports2.flap = (0, Functor_1.flap)(exports2.Functor);
    exports2.apFirst = (0, Apply_1.apFirst)(exports2.Apply);
    exports2.apFirstW = exports2.apFirst;
    exports2.apSecond = (0, Apply_1.apSecond)(exports2.Apply);
    exports2.apSecondW = exports2.apSecond;
    exports2.tap = (0, function_1.dual)(2, chainable.tap(exports2.Chain));
    exports2.flattenW = /* @__PURE__ */ (0, exports2.flatMap)(function_1.identity);
    exports2.flatten = exports2.flattenW;
    exports2.duplicate = (0, exports2.extend)(function_1.identity);
    exports2.fromOptionK = /* @__PURE__ */ (0, FromEither_1.fromOptionK)(exports2.FromEither);
    exports2.chainOptionK = (0, FromEither_1.chainOptionK)(exports2.FromEither, exports2.Chain);
    exports2.chainOptionKW = exports2.chainOptionK;
    var _FromEither = {
      fromEither: exports2.FromEither.fromEither
    };
    exports2.liftNullable = _.liftNullable(_FromEither);
    exports2.liftOption = _.liftOption(_FromEither);
    var _FlatMap = {
      flatMap: exports2.flatMap
    };
    exports2.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
    exports2.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
    exports2.filterOrElse = (0, FromEither_1.filterOrElse)(exports2.FromEither, exports2.Chain);
    exports2.filterOrElseW = exports2.filterOrElse;
    var swap = function(ma) {
      return (0, exports2.isLeft)(ma) ? (0, exports2.right)(ma.left) : (0, exports2.left)(ma.right);
    };
    exports2.swap = swap;
    var orElseW = function(onLeft) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? onLeft(ma.left) : ma;
      };
    };
    exports2.orElseW = orElseW;
    exports2.orElse = exports2.orElseW;
    var fromNullable = function(e) {
      return function(a) {
        return a == null ? (0, exports2.left)(e) : (0, exports2.right)(a);
      };
    };
    exports2.fromNullable = fromNullable;
    var tryCatch = function(f, onThrow) {
      try {
        return (0, exports2.right)(f());
      } catch (e) {
        return (0, exports2.left)(onThrow(e));
      }
    };
    exports2.tryCatch = tryCatch;
    var tryCatchK = function(f, onThrow) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports2.tryCatch)(function() {
          return f.apply(void 0, a);
        }, onThrow);
      };
    };
    exports2.tryCatchK = tryCatchK;
    var fromNullableK = function(e) {
      var from = (0, exports2.fromNullable)(e);
      return function(f) {
        return (0, function_1.flow)(f, from);
      };
    };
    exports2.fromNullableK = fromNullableK;
    var chainNullableK = function(e) {
      var from = (0, exports2.fromNullableK)(e);
      return function(f) {
        return (0, exports2.flatMap)(from(f));
      };
    };
    exports2.chainNullableK = chainNullableK;
    exports2.toUnion = (0, exports2.foldW)(function_1.identity, function_1.identity);
    function toError(e) {
      return e instanceof Error ? e : new Error(String(e));
    }
    exports2.toError = toError;
    function elem(E) {
      return function(a, ma) {
        if (ma === void 0) {
          var elemE_1 = elem(E);
          return function(ma2) {
            return elemE_1(a, ma2);
          };
        }
        return (0, exports2.isLeft)(ma) ? false : E.equals(a, ma.right);
      };
    }
    exports2.elem = elem;
    var exists = function(predicate) {
      return function(ma) {
        return (0, exports2.isLeft)(ma) ? false : predicate(ma.right);
      };
    };
    exports2.exists = exists;
    exports2.Do = (0, exports2.of)(_.emptyRecord);
    exports2.bindTo = (0, Functor_1.bindTo)(exports2.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports2.Functor);
    exports2.let = let_;
    exports2.bind = chainable.bind(exports2.Chain);
    exports2.bindW = exports2.bind;
    exports2.apS = (0, Apply_1.apS)(exports2.Apply);
    exports2.apSW = exports2.apS;
    exports2.ApT = (0, exports2.of)(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return function(as) {
        var e = f(0, _.head(as));
        if ((0, exports2.isLeft)(e)) {
          return e;
        }
        var out = [e.right];
        for (var i = 1; i < as.length; i++) {
          var e_1 = f(i, as[i]);
          if ((0, exports2.isLeft)(e_1)) {
            return e_1;
          }
          out.push(e_1.right);
        }
        return (0, exports2.right)(out);
      };
    };
    exports2.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
    var traverseReadonlyArrayWithIndex = function(f) {
      var g = (0, exports2.traverseReadonlyNonEmptyArrayWithIndex)(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports2.ApT;
      };
    };
    exports2.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
    exports2.traverseArrayWithIndex = exports2.traverseReadonlyArrayWithIndex;
    var traverseArray = function(f) {
      return (0, exports2.traverseReadonlyArrayWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports2.traverseArray = traverseArray;
    exports2.sequenceArray = /* @__PURE__ */ (0, exports2.traverseArray)(function_1.identity);
    exports2.chainW = exports2.flatMap;
    exports2.chain = exports2.flatMap;
    exports2.chainFirst = exports2.tap;
    exports2.chainFirstW = exports2.tap;
    function parseJSON(s, onError) {
      return (0, exports2.tryCatch)(function() {
        return JSON.parse(s);
      }, onError);
    }
    exports2.parseJSON = parseJSON;
    var stringifyJSON = function(u, onError) {
      return (0, exports2.tryCatch)(function() {
        var s = JSON.stringify(u);
        if (typeof s !== "string") {
          throw new Error("Converting unsupported structure to JSON");
        }
        return s;
      }, onError);
    };
    exports2.stringifyJSON = stringifyJSON;
    exports2.either = {
      URI: exports2.URI,
      map: _map,
      of: exports2.of,
      ap: _ap,
      chain: exports2.flatMap,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports2.sequence,
      bimap: _bimap,
      mapLeft: _mapLeft,
      alt: _alt,
      extend: _extend,
      chainRec: _chainRec,
      throwError: exports2.throwError
    };
    exports2.getApplySemigroup = /* @__PURE__ */ (0, Apply_1.getApplySemigroup)(exports2.Apply);
    exports2.getApplyMonoid = /* @__PURE__ */ (0, Applicative_1.getApplicativeMonoid)(exports2.Applicative);
    var getValidationSemigroup = function(SE, SA) {
      return (0, Apply_1.getApplySemigroup)((0, exports2.getApplicativeValidation)(SE))(SA);
    };
    exports2.getValidationSemigroup = getValidationSemigroup;
    var getValidationMonoid = function(SE, MA) {
      return (0, Applicative_1.getApplicativeMonoid)((0, exports2.getApplicativeValidation)(SE))(MA);
    };
    exports2.getValidationMonoid = getValidationMonoid;
    function getValidation(SE) {
      var ap = (0, exports2.getApplicativeValidation)(SE).ap;
      var alt = (0, exports2.getAltValidation)(SE).alt;
      return {
        URI: exports2.URI,
        _E: void 0,
        map: _map,
        of: exports2.of,
        chain: exports2.flatMap,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: exports2.sequence,
        chainRec: _chainRec,
        throwError: exports2.throwError,
        ap,
        alt
      };
    }
    exports2.getValidation = getValidation;
  }
});

// node_modules/io-ts/lib/index.js
var require_lib = __commonJS({
  "node_modules/io-ts/lib/index.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t3) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t3[p] = s[p];
        }
        return t3;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.partial = exports2.PartialType = exports2.type = exports2.InterfaceType = exports2.array = exports2.ArrayType = exports2.recursion = exports2.RecursiveType = exports2.Int = exports2.brand = exports2.RefinementType = exports2.keyof = exports2.KeyofType = exports2.literal = exports2.LiteralType = exports2.void = exports2.undefined = exports2.null = exports2.UnknownRecord = exports2.AnyDictionaryType = exports2.UnknownArray = exports2.AnyArrayType = exports2.boolean = exports2.BooleanType = exports2.bigint = exports2.BigIntType = exports2.number = exports2.NumberType = exports2.string = exports2.StringType = exports2.unknown = exports2.UnknownType = exports2.voidType = exports2.VoidType = exports2.UndefinedType = exports2.nullType = exports2.NullType = exports2.getIndex = exports2.getTags = exports2.emptyTags = exports2.mergeAll = exports2.getDomainKeys = exports2.appendContext = exports2.getContextEntry = exports2.getFunctionName = exports2.identity = exports2.Type = exports2.success = exports2.failure = exports2.failures = void 0;
    exports2.alias = exports2.clean = exports2.StrictType = exports2.dictionary = exports2.object = exports2.ObjectType = exports2.Dictionary = exports2.getDefaultContext = exports2.getValidationError = exports2.interface = exports2.Array = exports2.taggedUnion = exports2.TaggedUnionType = exports2.Integer = exports2.refinement = exports2.any = exports2.AnyType = exports2.never = exports2.NeverType = exports2.Function = exports2.FunctionType = exports2.exact = exports2.ExactType = exports2.strict = exports2.readonlyArray = exports2.ReadonlyArrayType = exports2.readonly = exports2.ReadonlyType = exports2.tuple = exports2.TupleType = exports2.intersection = exports2.IntersectionType = exports2.union = exports2.UnionType = exports2.record = exports2.DictionaryType = void 0;
    var Either_1 = require_Either();
    exports2.failures = Either_1.left;
    var failure = function(value, context, message) {
      return (0, exports2.failures)([{ value, context, message }]);
    };
    exports2.failure = failure;
    exports2.success = Either_1.right;
    var Type = (
      /** @class */
      function() {
        function Type2(name, is, validate, encode) {
          this.name = name;
          this.is = is;
          this.validate = validate;
          this.encode = encode;
          this.decode = this.decode.bind(this);
        }
        Type2.prototype.pipe = function(ab, name) {
          var _this = this;
          if (name === void 0) {
            name = "pipe(".concat(this.name, ", ").concat(ab.name, ")");
          }
          return new Type2(name, ab.is, function(i, c) {
            var e = _this.validate(i, c);
            if ((0, Either_1.isLeft)(e)) {
              return e;
            }
            return ab.validate(e.right, c);
          }, this.encode === exports2.identity && ab.encode === exports2.identity ? exports2.identity : function(b) {
            return _this.encode(ab.encode(b));
          });
        };
        Type2.prototype.asDecoder = function() {
          return this;
        };
        Type2.prototype.asEncoder = function() {
          return this;
        };
        Type2.prototype.decode = function(i) {
          return this.validate(i, [{ key: "", type: this, actual: i }]);
        };
        return Type2;
      }()
    );
    exports2.Type = Type;
    var identity = function(a) {
      return a;
    };
    exports2.identity = identity;
    function getFunctionName(f) {
      return f.displayName || f.name || "<function".concat(f.length, ">");
    }
    exports2.getFunctionName = getFunctionName;
    function getContextEntry(key, decoder) {
      return { key, type: decoder };
    }
    exports2.getContextEntry = getContextEntry;
    function appendContext(c, key, decoder, actual) {
      var len = c.length;
      var r = Array(len + 1);
      for (var i = 0; i < len; i++) {
        r[i] = c[i];
      }
      r[len] = { key, type: decoder, actual };
      return r;
    }
    exports2.appendContext = appendContext;
    function pushAll(xs, ys) {
      var l = ys.length;
      for (var i = 0; i < l; i++) {
        xs.push(ys[i]);
      }
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function getNameFromProps(props) {
      return Object.keys(props).map(function(k) {
        return "".concat(k, ": ").concat(props[k].name);
      }).join(", ");
    }
    function useIdentity(codecs) {
      for (var i = 0; i < codecs.length; i++) {
        if (codecs[i].encode !== exports2.identity) {
          return false;
        }
      }
      return true;
    }
    function getInterfaceTypeName(props) {
      return "{ ".concat(getNameFromProps(props), " }");
    }
    function getPartialTypeName(inner) {
      return "Partial<".concat(inner, ">");
    }
    function enumerableRecord(keys4, domain, codomain, name) {
      if (name === void 0) {
        name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }");
      }
      var len = keys4.length;
      var props = {};
      for (var i = 0; i < len; i++) {
        props[keys4[i]] = codomain;
      }
      var exactCodec = (0, exports2.strict)(props, name);
      return new DictionaryType(name, function(u) {
        return exactCodec.is(u);
      }, exactCodec.validate, exactCodec.encode, domain, codomain);
    }
    function getDomainKeys(domain) {
      var _a;
      if (isLiteralC(domain)) {
        var literal_1 = domain.value;
        if (exports2.string.is(literal_1)) {
          return _a = {}, _a[literal_1] = null, _a;
        }
      } else if (isKeyofC(domain)) {
        return domain.keys;
      } else if (isUnionC(domain)) {
        var keys4 = domain.types.map(function(type4) {
          return getDomainKeys(type4);
        });
        return keys4.some(undefinedType.is) ? void 0 : Object.assign.apply(Object, __spreadArray([{}], keys4, false));
      }
      return void 0;
    }
    exports2.getDomainKeys = getDomainKeys;
    function stripNonDomainKeys(o, domain) {
      var keys4 = Object.keys(o);
      var len = keys4.length;
      var shouldStrip = false;
      var r = {};
      for (var i = 0; i < len; i++) {
        var k = keys4[i];
        if (domain.is(k)) {
          r[k] = o[k];
        } else {
          shouldStrip = true;
        }
      }
      return shouldStrip ? r : o;
    }
    function nonEnumerableRecord(domain, codomain, name) {
      if (name === void 0) {
        name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }");
      }
      return new DictionaryType(name, function(u) {
        if (exports2.UnknownRecord.is(u)) {
          return Object.keys(u).every(function(k) {
            return !domain.is(k) || codomain.is(u[k]);
          });
        }
        return isAnyC(codomain) && Array.isArray(u);
      }, function(u, c) {
        if (exports2.UnknownRecord.is(u)) {
          var a = {};
          var errors = [];
          var keys4 = Object.keys(u);
          var len = keys4.length;
          var changed = false;
          for (var i = 0; i < len; i++) {
            var k = keys4[i];
            var ok = u[k];
            var domainResult = domain.validate(k, appendContext(c, k, domain, k));
            if ((0, Either_1.isLeft)(domainResult)) {
              changed = true;
            } else {
              var vk = domainResult.right;
              changed = changed || vk !== k;
              k = vk;
              var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
              if ((0, Either_1.isLeft)(codomainResult)) {
                pushAll(errors, codomainResult.left);
              } else {
                var vok = codomainResult.right;
                changed = changed || vok !== ok;
                a[k] = vok;
              }
            }
          }
          return errors.length > 0 ? (0, exports2.failures)(errors) : (0, exports2.success)(changed ? a : u);
        }
        if (isAnyC(codomain) && Array.isArray(u)) {
          return (0, exports2.success)(u);
        }
        return (0, exports2.failure)(u, c);
      }, domain.encode === exports2.identity && codomain.encode === exports2.identity ? function(a) {
        return stripNonDomainKeys(a, domain);
      } : function(a) {
        var s = {};
        var keys4 = Object.keys(stripNonDomainKeys(a, domain));
        var len = keys4.length;
        for (var i = 0; i < len; i++) {
          var k = keys4[i];
          s[String(domain.encode(k))] = codomain.encode(a[k]);
        }
        return s;
      }, domain, codomain);
    }
    function getUnionName(codecs) {
      return "(" + codecs.map(function(type4) {
        return type4.name;
      }).join(" | ") + ")";
    }
    function mergeAll(base, us) {
      var equal = true;
      var primitive = true;
      var baseIsNotADictionary = !exports2.UnknownRecord.is(base);
      for (var _i = 0, us_1 = us; _i < us_1.length; _i++) {
        var u = us_1[_i];
        if (u !== base) {
          equal = false;
        }
        if (exports2.UnknownRecord.is(u)) {
          primitive = false;
        }
      }
      if (equal) {
        return base;
      } else if (primitive) {
        return us[us.length - 1];
      }
      var r = {};
      for (var _a = 0, us_2 = us; _a < us_2.length; _a++) {
        var u = us_2[_a];
        for (var k in u) {
          if (!hasOwnProperty.call(r, k) || baseIsNotADictionary || u[k] !== base[k]) {
            r[k] = u[k];
          }
        }
      }
      return r;
    }
    exports2.mergeAll = mergeAll;
    function getProps(codec) {
      switch (codec._tag) {
        case "RefinementType":
        case "ReadonlyType":
          return getProps(codec.type);
        case "InterfaceType":
        case "StrictType":
        case "PartialType":
          return codec.props;
        case "IntersectionType":
          return codec.types.reduce(function(props, type4) {
            return Object.assign(props, getProps(type4));
          }, {});
      }
    }
    function stripKeys(o, props) {
      var keys4 = Object.getOwnPropertyNames(o);
      var shouldStrip = false;
      var r = {};
      for (var i = 0; i < keys4.length; i++) {
        var key = keys4[i];
        if (!hasOwnProperty.call(props, key)) {
          shouldStrip = true;
        } else {
          r[key] = o[key];
        }
      }
      return shouldStrip ? r : o;
    }
    function getExactTypeName(codec) {
      if (isTypeC(codec)) {
        return "{| ".concat(getNameFromProps(codec.props), " |}");
      } else if (isPartialC(codec)) {
        return getPartialTypeName("{| ".concat(getNameFromProps(codec.props), " |}"));
      }
      return "Exact<".concat(codec.name, ">");
    }
    function isNonEmpty(as) {
      return as.length > 0;
    }
    exports2.emptyTags = {};
    function intersect(a, b) {
      var r = [];
      for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var v = a_1[_i];
        if (b.indexOf(v) !== -1) {
          r.push(v);
        }
      }
      return r;
    }
    function mergeTags(a, b) {
      if (a === exports2.emptyTags) {
        return b;
      }
      if (b === exports2.emptyTags) {
        return a;
      }
      var r = Object.assign({}, a);
      for (var k in b) {
        if (hasOwnProperty.call(a, k)) {
          var intersection_1 = intersect(a[k], b[k]);
          if (isNonEmpty(intersection_1)) {
            r[k] = intersection_1;
          } else {
            r = exports2.emptyTags;
            break;
          }
        } else {
          r[k] = b[k];
        }
      }
      return r;
    }
    function intersectTags(a, b) {
      if (a === exports2.emptyTags || b === exports2.emptyTags) {
        return exports2.emptyTags;
      }
      var r = exports2.emptyTags;
      for (var k in a) {
        if (hasOwnProperty.call(b, k)) {
          var intersection_2 = intersect(a[k], b[k]);
          if (intersection_2.length === 0) {
            if (r === exports2.emptyTags) {
              r = {};
            }
            r[k] = a[k].concat(b[k]);
          }
        }
      }
      return r;
    }
    function isAnyC(codec) {
      return codec._tag === "AnyType";
    }
    function isLiteralC(codec) {
      return codec._tag === "LiteralType";
    }
    function isKeyofC(codec) {
      return codec._tag === "KeyofType";
    }
    function isTypeC(codec) {
      return codec._tag === "InterfaceType";
    }
    function isPartialC(codec) {
      return codec._tag === "PartialType";
    }
    function isStrictC(codec) {
      return codec._tag === "StrictType";
    }
    function isExactC(codec) {
      return codec._tag === "ExactType";
    }
    function isRefinementC(codec) {
      return codec._tag === "RefinementType";
    }
    function isIntersectionC(codec) {
      return codec._tag === "IntersectionType";
    }
    function isUnionC(codec) {
      return codec._tag === "UnionType";
    }
    function isRecursiveC(codec) {
      return codec._tag === "RecursiveType";
    }
    var lazyCodecs = [];
    function getTags(codec) {
      if (lazyCodecs.indexOf(codec) !== -1) {
        return exports2.emptyTags;
      }
      if (isTypeC(codec) || isStrictC(codec)) {
        var index = exports2.emptyTags;
        for (var k in codec.props) {
          var prop = codec.props[k];
          if (isLiteralC(prop)) {
            if (index === exports2.emptyTags) {
              index = {};
            }
            index[k] = [prop.value];
          }
        }
        return index;
      } else if (isExactC(codec) || isRefinementC(codec)) {
        return getTags(codec.type);
      } else if (isIntersectionC(codec)) {
        return codec.types.reduce(function(tags2, codec2) {
          return mergeTags(tags2, getTags(codec2));
        }, exports2.emptyTags);
      } else if (isUnionC(codec)) {
        return codec.types.slice(1).reduce(function(tags2, codec2) {
          return intersectTags(tags2, getTags(codec2));
        }, getTags(codec.types[0]));
      } else if (isRecursiveC(codec)) {
        lazyCodecs.push(codec);
        var tags = getTags(codec.type);
        lazyCodecs.pop();
        return tags;
      }
      return exports2.emptyTags;
    }
    exports2.getTags = getTags;
    function getIndex(codecs) {
      var tags = getTags(codecs[0]);
      var keys4 = Object.keys(tags);
      var len = codecs.length;
      var _loop_1 = function(k2) {
        var all = tags[k2].slice();
        var index = [tags[k2]];
        for (var i = 1; i < len; i++) {
          var codec = codecs[i];
          var ctags = getTags(codec);
          var values = ctags[k2];
          if (values === void 0) {
            return "continue-keys";
          } else {
            if (values.some(function(v) {
              return all.indexOf(v) !== -1;
            })) {
              return "continue-keys";
            } else {
              all.push.apply(all, values);
              index.push(values);
            }
          }
        }
        return { value: [k2, index] };
      };
      keys:
        for (var _i = 0, keys_1 = keys4; _i < keys_1.length; _i++) {
          var k = keys_1[_i];
          var state_1 = _loop_1(k);
          if (typeof state_1 === "object")
            return state_1.value;
          switch (state_1) {
            case "continue-keys":
              continue keys;
          }
        }
      return void 0;
    }
    exports2.getIndex = getIndex;
    var NullType = (
      /** @class */
      function(_super) {
        __extends(NullType2, _super);
        function NullType2() {
          var _this = _super.call(this, "null", function(u) {
            return u === null;
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "NullType";
          return _this;
        }
        return NullType2;
      }(Type)
    );
    exports2.NullType = NullType;
    exports2.nullType = new NullType();
    exports2.null = exports2.nullType;
    var UndefinedType = (
      /** @class */
      function(_super) {
        __extends(UndefinedType2, _super);
        function UndefinedType2() {
          var _this = _super.call(this, "undefined", function(u) {
            return u === void 0;
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "UndefinedType";
          return _this;
        }
        return UndefinedType2;
      }(Type)
    );
    exports2.UndefinedType = UndefinedType;
    var undefinedType = new UndefinedType();
    exports2.undefined = undefinedType;
    var VoidType = (
      /** @class */
      function(_super) {
        __extends(VoidType2, _super);
        function VoidType2() {
          var _this = _super.call(this, "void", undefinedType.is, undefinedType.validate, exports2.identity) || this;
          _this._tag = "VoidType";
          return _this;
        }
        return VoidType2;
      }(Type)
    );
    exports2.VoidType = VoidType;
    exports2.voidType = new VoidType();
    exports2.void = exports2.voidType;
    var UnknownType = (
      /** @class */
      function(_super) {
        __extends(UnknownType2, _super);
        function UnknownType2() {
          var _this = _super.call(this, "unknown", function(_) {
            return true;
          }, exports2.success, exports2.identity) || this;
          _this._tag = "UnknownType";
          return _this;
        }
        return UnknownType2;
      }(Type)
    );
    exports2.UnknownType = UnknownType;
    exports2.unknown = new UnknownType();
    var StringType = (
      /** @class */
      function(_super) {
        __extends(StringType2, _super);
        function StringType2() {
          var _this = _super.call(this, "string", function(u) {
            return typeof u === "string";
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "StringType";
          return _this;
        }
        return StringType2;
      }(Type)
    );
    exports2.StringType = StringType;
    exports2.string = new StringType();
    var NumberType = (
      /** @class */
      function(_super) {
        __extends(NumberType2, _super);
        function NumberType2() {
          var _this = _super.call(this, "number", function(u) {
            return typeof u === "number";
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "NumberType";
          return _this;
        }
        return NumberType2;
      }(Type)
    );
    exports2.NumberType = NumberType;
    exports2.number = new NumberType();
    var BigIntType = (
      /** @class */
      function(_super) {
        __extends(BigIntType2, _super);
        function BigIntType2() {
          var _this = _super.call(
            this,
            "bigint",
            // tslint:disable-next-line: valid-typeof
            function(u) {
              return typeof u === "bigint";
            },
            function(u, c) {
              return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
            },
            exports2.identity
          ) || this;
          _this._tag = "BigIntType";
          return _this;
        }
        return BigIntType2;
      }(Type)
    );
    exports2.BigIntType = BigIntType;
    exports2.bigint = new BigIntType();
    var BooleanType = (
      /** @class */
      function(_super) {
        __extends(BooleanType2, _super);
        function BooleanType2() {
          var _this = _super.call(this, "boolean", function(u) {
            return typeof u === "boolean";
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "BooleanType";
          return _this;
        }
        return BooleanType2;
      }(Type)
    );
    exports2.BooleanType = BooleanType;
    exports2.boolean = new BooleanType();
    var AnyArrayType = (
      /** @class */
      function(_super) {
        __extends(AnyArrayType2, _super);
        function AnyArrayType2() {
          var _this = _super.call(this, "UnknownArray", Array.isArray, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "AnyArrayType";
          return _this;
        }
        return AnyArrayType2;
      }(Type)
    );
    exports2.AnyArrayType = AnyArrayType;
    exports2.UnknownArray = new AnyArrayType();
    exports2.Array = exports2.UnknownArray;
    var AnyDictionaryType = (
      /** @class */
      function(_super) {
        __extends(AnyDictionaryType2, _super);
        function AnyDictionaryType2() {
          var _this = _super.call(this, "UnknownRecord", function(u) {
            return u !== null && typeof u === "object" && !Array.isArray(u);
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "AnyDictionaryType";
          return _this;
        }
        return AnyDictionaryType2;
      }(Type)
    );
    exports2.AnyDictionaryType = AnyDictionaryType;
    exports2.UnknownRecord = new AnyDictionaryType();
    var LiteralType = (
      /** @class */
      function(_super) {
        __extends(LiteralType2, _super);
        function LiteralType2(name, is, validate, encode, value) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.value = value;
          _this._tag = "LiteralType";
          return _this;
        }
        return LiteralType2;
      }(Type)
    );
    exports2.LiteralType = LiteralType;
    function literal2(value, name) {
      if (name === void 0) {
        name = JSON.stringify(value);
      }
      var is = function(u) {
        return u === value;
      };
      return new LiteralType(name, is, function(u, c) {
        return is(u) ? (0, exports2.success)(value) : (0, exports2.failure)(u, c);
      }, exports2.identity, value);
    }
    exports2.literal = literal2;
    var KeyofType = (
      /** @class */
      function(_super) {
        __extends(KeyofType2, _super);
        function KeyofType2(name, is, validate, encode, keys4) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.keys = keys4;
          _this._tag = "KeyofType";
          return _this;
        }
        return KeyofType2;
      }(Type)
    );
    exports2.KeyofType = KeyofType;
    function keyof(keys4, name) {
      if (name === void 0) {
        name = Object.keys(keys4).map(function(k) {
          return JSON.stringify(k);
        }).join(" | ");
      }
      var is = function(u) {
        return exports2.string.is(u) && hasOwnProperty.call(keys4, u);
      };
      return new KeyofType(name, is, function(u, c) {
        return is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
      }, exports2.identity, keys4);
    }
    exports2.keyof = keyof;
    var RefinementType = (
      /** @class */
      function(_super) {
        __extends(RefinementType2, _super);
        function RefinementType2(name, is, validate, encode, type4, predicate) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type4;
          _this.predicate = predicate;
          _this._tag = "RefinementType";
          return _this;
        }
        return RefinementType2;
      }(Type)
    );
    exports2.RefinementType = RefinementType;
    function brand(codec, predicate, name) {
      return refinement(codec, predicate, name);
    }
    exports2.brand = brand;
    exports2.Int = brand(exports2.number, function(n) {
      return Number.isInteger(n);
    }, "Int");
    var RecursiveType = (
      /** @class */
      function(_super) {
        __extends(RecursiveType2, _super);
        function RecursiveType2(name, is, validate, encode, runDefinition) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.runDefinition = runDefinition;
          _this._tag = "RecursiveType";
          return _this;
        }
        return RecursiveType2;
      }(Type)
    );
    exports2.RecursiveType = RecursiveType;
    Object.defineProperty(RecursiveType.prototype, "type", {
      get: function() {
        return this.runDefinition();
      },
      enumerable: true,
      configurable: true
    });
    function recursion(name, definition) {
      var cache;
      var runDefinition = function() {
        if (!cache) {
          cache = definition(Self);
          cache.name = name;
        }
        return cache;
      };
      var Self = new RecursiveType(name, function(u) {
        return runDefinition().is(u);
      }, function(u, c) {
        return runDefinition().validate(u, c);
      }, function(a) {
        return runDefinition().encode(a);
      }, runDefinition);
      return Self;
    }
    exports2.recursion = recursion;
    var ArrayType = (
      /** @class */
      function(_super) {
        __extends(ArrayType2, _super);
        function ArrayType2(name, is, validate, encode, type4) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type4;
          _this._tag = "ArrayType";
          return _this;
        }
        return ArrayType2;
      }(Type)
    );
    exports2.ArrayType = ArrayType;
    function array(item, name) {
      if (name === void 0) {
        name = "Array<".concat(item.name, ">");
      }
      return new ArrayType(name, function(u) {
        return exports2.UnknownArray.is(u) && u.every(item.is);
      }, function(u, c) {
        var e = exports2.UnknownArray.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var us = e.right;
        var len = us.length;
        var as = us;
        var errors = [];
        for (var i = 0; i < len; i++) {
          var ui = us[i];
          var result = item.validate(ui, appendContext(c, String(i), item, ui));
          if ((0, Either_1.isLeft)(result)) {
            pushAll(errors, result.left);
          } else {
            var ai = result.right;
            if (ai !== ui) {
              if (as === us) {
                as = us.slice();
              }
              as[i] = ai;
            }
          }
        }
        return errors.length > 0 ? (0, exports2.failures)(errors) : (0, exports2.success)(as);
      }, item.encode === exports2.identity ? exports2.identity : function(a) {
        return a.map(item.encode);
      }, item);
    }
    exports2.array = array;
    var InterfaceType = (
      /** @class */
      function(_super) {
        __extends(InterfaceType2, _super);
        function InterfaceType2(name, is, validate, encode, props) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.props = props;
          _this._tag = "InterfaceType";
          return _this;
        }
        return InterfaceType2;
      }(Type)
    );
    exports2.InterfaceType = InterfaceType;
    function type3(props, name) {
      if (name === void 0) {
        name = getInterfaceTypeName(props);
      }
      var keys4 = Object.keys(props);
      var types = keys4.map(function(key) {
        return props[key];
      });
      var len = keys4.length;
      return new InterfaceType(name, function(u) {
        if (exports2.UnknownRecord.is(u)) {
          for (var i = 0; i < len; i++) {
            var k = keys4[i];
            var uk = u[k];
            if (uk === void 0 && !hasOwnProperty.call(u, k) || !types[i].is(uk)) {
              return false;
            }
          }
          return true;
        }
        return false;
      }, function(u, c) {
        var e = exports2.UnknownRecord.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var o = e.right;
        var a = o;
        var errors = [];
        for (var i = 0; i < len; i++) {
          var k = keys4[i];
          var ak = a[k];
          var type_1 = types[i];
          var result = type_1.validate(ak, appendContext(c, k, type_1, ak));
          if ((0, Either_1.isLeft)(result)) {
            pushAll(errors, result.left);
          } else {
            var vak = result.right;
            if (vak !== ak || vak === void 0 && !hasOwnProperty.call(a, k)) {
              if (a === o) {
                a = __assign({}, o);
              }
              a[k] = vak;
            }
          }
        }
        return errors.length > 0 ? (0, exports2.failures)(errors) : (0, exports2.success)(a);
      }, useIdentity(types) ? exports2.identity : function(a) {
        var s = __assign({}, a);
        for (var i = 0; i < len; i++) {
          var k = keys4[i];
          var encode = types[i].encode;
          if (encode !== exports2.identity) {
            s[k] = encode(a[k]);
          }
        }
        return s;
      }, props);
    }
    exports2.type = type3;
    exports2.interface = type3;
    var PartialType = (
      /** @class */
      function(_super) {
        __extends(PartialType2, _super);
        function PartialType2(name, is, validate, encode, props) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.props = props;
          _this._tag = "PartialType";
          return _this;
        }
        return PartialType2;
      }(Type)
    );
    exports2.PartialType = PartialType;
    function partial(props, name) {
      if (name === void 0) {
        name = getPartialTypeName(getInterfaceTypeName(props));
      }
      var keys4 = Object.keys(props);
      var types = keys4.map(function(key) {
        return props[key];
      });
      var len = keys4.length;
      return new PartialType(name, function(u) {
        if (exports2.UnknownRecord.is(u)) {
          for (var i = 0; i < len; i++) {
            var k = keys4[i];
            var uk = u[k];
            if (uk !== void 0 && !props[k].is(uk)) {
              return false;
            }
          }
          return true;
        }
        return false;
      }, function(u, c) {
        var e = exports2.UnknownRecord.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var o = e.right;
        var a = o;
        var errors = [];
        for (var i = 0; i < len; i++) {
          var k = keys4[i];
          var ak = a[k];
          var type_2 = props[k];
          var result = type_2.validate(ak, appendContext(c, k, type_2, ak));
          if ((0, Either_1.isLeft)(result)) {
            if (ak !== void 0) {
              pushAll(errors, result.left);
            }
          } else {
            var vak = result.right;
            if (vak !== ak) {
              if (a === o) {
                a = __assign({}, o);
              }
              a[k] = vak;
            }
          }
        }
        return errors.length > 0 ? (0, exports2.failures)(errors) : (0, exports2.success)(a);
      }, useIdentity(types) ? exports2.identity : function(a) {
        var s = __assign({}, a);
        for (var i = 0; i < len; i++) {
          var k = keys4[i];
          var ak = a[k];
          if (ak !== void 0) {
            s[k] = types[i].encode(ak);
          }
        }
        return s;
      }, props);
    }
    exports2.partial = partial;
    var DictionaryType = (
      /** @class */
      function(_super) {
        __extends(DictionaryType2, _super);
        function DictionaryType2(name, is, validate, encode, domain, codomain) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.domain = domain;
          _this.codomain = codomain;
          _this._tag = "DictionaryType";
          return _this;
        }
        return DictionaryType2;
      }(Type)
    );
    exports2.DictionaryType = DictionaryType;
    function record(domain, codomain, name) {
      var keys4 = getDomainKeys(domain);
      return keys4 ? enumerableRecord(Object.keys(keys4), domain, codomain, name) : nonEnumerableRecord(domain, codomain, name);
    }
    exports2.record = record;
    var UnionType = (
      /** @class */
      function(_super) {
        __extends(UnionType2, _super);
        function UnionType2(name, is, validate, encode, types) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.types = types;
          _this._tag = "UnionType";
          return _this;
        }
        return UnionType2;
      }(Type)
    );
    exports2.UnionType = UnionType;
    function union(codecs, name) {
      if (name === void 0) {
        name = getUnionName(codecs);
      }
      var index = getIndex(codecs);
      if (index !== void 0 && codecs.length > 0) {
        var tag_1 = index[0], groups_1 = index[1];
        var len_1 = groups_1.length;
        var find_1 = function(value) {
          for (var i = 0; i < len_1; i++) {
            if (groups_1[i].indexOf(value) !== -1) {
              return i;
            }
          }
          return void 0;
        };
        return new TaggedUnionType(name, function(u) {
          if (exports2.UnknownRecord.is(u)) {
            var i = find_1(u[tag_1]);
            return i !== void 0 ? codecs[i].is(u) : false;
          }
          return false;
        }, function(u, c) {
          var e = exports2.UnknownRecord.validate(u, c);
          if ((0, Either_1.isLeft)(e)) {
            return e;
          }
          var r = e.right;
          var i = find_1(r[tag_1]);
          if (i === void 0) {
            return (0, exports2.failure)(u, c);
          }
          var codec = codecs[i];
          return codec.validate(r, appendContext(c, String(i), codec, r));
        }, useIdentity(codecs) ? exports2.identity : function(a) {
          var i = find_1(a[tag_1]);
          if (i === void 0) {
            throw new Error("no codec found to encode value in union codec ".concat(name));
          } else {
            return codecs[i].encode(a);
          }
        }, codecs, tag_1);
      } else {
        return new UnionType(name, function(u) {
          return codecs.some(function(type4) {
            return type4.is(u);
          });
        }, function(u, c) {
          var errors = [];
          for (var i = 0; i < codecs.length; i++) {
            var codec = codecs[i];
            var result = codec.validate(u, appendContext(c, String(i), codec, u));
            if ((0, Either_1.isLeft)(result)) {
              pushAll(errors, result.left);
            } else {
              return (0, exports2.success)(result.right);
            }
          }
          return (0, exports2.failures)(errors);
        }, useIdentity(codecs) ? exports2.identity : function(a) {
          for (var _i = 0, codecs_1 = codecs; _i < codecs_1.length; _i++) {
            var codec = codecs_1[_i];
            if (codec.is(a)) {
              return codec.encode(a);
            }
          }
          throw new Error("no codec found to encode value in union type ".concat(name));
        }, codecs);
      }
    }
    exports2.union = union;
    var IntersectionType = (
      /** @class */
      function(_super) {
        __extends(IntersectionType2, _super);
        function IntersectionType2(name, is, validate, encode, types) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.types = types;
          _this._tag = "IntersectionType";
          return _this;
        }
        return IntersectionType2;
      }(Type)
    );
    exports2.IntersectionType = IntersectionType;
    function intersection(codecs, name) {
      if (name === void 0) {
        name = "(".concat(codecs.map(function(type4) {
          return type4.name;
        }).join(" & "), ")");
      }
      var len = codecs.length;
      return new IntersectionType(name, function(u) {
        return codecs.every(function(type4) {
          return type4.is(u);
        });
      }, codecs.length === 0 ? exports2.success : function(u, c) {
        var us = [];
        var errors = [];
        for (var i = 0; i < len; i++) {
          var codec = codecs[i];
          var result = codec.validate(u, appendContext(c, String(i), codec, u));
          if ((0, Either_1.isLeft)(result)) {
            pushAll(errors, result.left);
          } else {
            us.push(result.right);
          }
        }
        return errors.length > 0 ? (0, exports2.failures)(errors) : (0, exports2.success)(mergeAll(u, us));
      }, codecs.length === 0 ? exports2.identity : function(a) {
        return mergeAll(a, codecs.map(function(codec) {
          return codec.encode(a);
        }));
      }, codecs);
    }
    exports2.intersection = intersection;
    var TupleType = (
      /** @class */
      function(_super) {
        __extends(TupleType2, _super);
        function TupleType2(name, is, validate, encode, types) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.types = types;
          _this._tag = "TupleType";
          return _this;
        }
        return TupleType2;
      }(Type)
    );
    exports2.TupleType = TupleType;
    function tuple(codecs, name) {
      if (name === void 0) {
        name = "[".concat(codecs.map(function(type4) {
          return type4.name;
        }).join(", "), "]");
      }
      var len = codecs.length;
      return new TupleType(name, function(u) {
        return exports2.UnknownArray.is(u) && u.length === len && codecs.every(function(type4, i) {
          return type4.is(u[i]);
        });
      }, function(u, c) {
        var e = exports2.UnknownArray.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var us = e.right;
        var as = us.length > len ? us.slice(0, len) : us;
        var errors = [];
        for (var i = 0; i < len; i++) {
          var a = us[i];
          var type_3 = codecs[i];
          var result = type_3.validate(a, appendContext(c, String(i), type_3, a));
          if ((0, Either_1.isLeft)(result)) {
            pushAll(errors, result.left);
          } else {
            var va = result.right;
            if (va !== a) {
              if (as === us) {
                as = us.slice();
              }
              as[i] = va;
            }
          }
        }
        return errors.length > 0 ? (0, exports2.failures)(errors) : (0, exports2.success)(as);
      }, useIdentity(codecs) ? exports2.identity : function(a) {
        return codecs.map(function(type4, i) {
          return type4.encode(a[i]);
        });
      }, codecs);
    }
    exports2.tuple = tuple;
    var ReadonlyType = (
      /** @class */
      function(_super) {
        __extends(ReadonlyType2, _super);
        function ReadonlyType2(name, is, validate, encode, type4) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type4;
          _this._tag = "ReadonlyType";
          return _this;
        }
        return ReadonlyType2;
      }(Type)
    );
    exports2.ReadonlyType = ReadonlyType;
    function readonly(codec, name) {
      if (name === void 0) {
        name = "Readonly<".concat(codec.name, ">");
      }
      return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
    }
    exports2.readonly = readonly;
    var ReadonlyArrayType = (
      /** @class */
      function(_super) {
        __extends(ReadonlyArrayType2, _super);
        function ReadonlyArrayType2(name, is, validate, encode, type4) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type4;
          _this._tag = "ReadonlyArrayType";
          return _this;
        }
        return ReadonlyArrayType2;
      }(Type)
    );
    exports2.ReadonlyArrayType = ReadonlyArrayType;
    function readonlyArray(item, name) {
      if (name === void 0) {
        name = "ReadonlyArray<".concat(item.name, ">");
      }
      var codec = array(item);
      return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
    }
    exports2.readonlyArray = readonlyArray;
    var strict = function(props, name) {
      return exact(type3(props), name);
    };
    exports2.strict = strict;
    var ExactType = (
      /** @class */
      function(_super) {
        __extends(ExactType2, _super);
        function ExactType2(name, is, validate, encode, type4) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type4;
          _this._tag = "ExactType";
          return _this;
        }
        return ExactType2;
      }(Type)
    );
    exports2.ExactType = ExactType;
    function exact(codec, name) {
      if (name === void 0) {
        name = getExactTypeName(codec);
      }
      var props = getProps(codec);
      return new ExactType(name, codec.is, function(u, c) {
        var e = exports2.UnknownRecord.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var ce = codec.validate(u, c);
        if ((0, Either_1.isLeft)(ce)) {
          return ce;
        }
        return (0, Either_1.right)(stripKeys(ce.right, props));
      }, function(a) {
        return codec.encode(stripKeys(a, props));
      }, codec);
    }
    exports2.exact = exact;
    var FunctionType = (
      /** @class */
      function(_super) {
        __extends(FunctionType2, _super);
        function FunctionType2() {
          var _this = _super.call(
            this,
            "Function",
            // tslint:disable-next-line:strict-type-predicates
            function(u) {
              return typeof u === "function";
            },
            function(u, c) {
              return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
            },
            exports2.identity
          ) || this;
          _this._tag = "FunctionType";
          return _this;
        }
        return FunctionType2;
      }(Type)
    );
    exports2.FunctionType = FunctionType;
    exports2.Function = new FunctionType();
    var NeverType = (
      /** @class */
      function(_super) {
        __extends(NeverType2, _super);
        function NeverType2() {
          var _this = _super.call(
            this,
            "never",
            function(_) {
              return false;
            },
            function(u, c) {
              return (0, exports2.failure)(u, c);
            },
            /* istanbul ignore next */
            function() {
              throw new Error("cannot encode never");
            }
          ) || this;
          _this._tag = "NeverType";
          return _this;
        }
        return NeverType2;
      }(Type)
    );
    exports2.NeverType = NeverType;
    exports2.never = new NeverType();
    var AnyType = (
      /** @class */
      function(_super) {
        __extends(AnyType2, _super);
        function AnyType2() {
          var _this = _super.call(this, "any", function(_) {
            return true;
          }, exports2.success, exports2.identity) || this;
          _this._tag = "AnyType";
          return _this;
        }
        return AnyType2;
      }(Type)
    );
    exports2.AnyType = AnyType;
    exports2.any = new AnyType();
    function refinement(codec, predicate, name) {
      if (name === void 0) {
        name = "(".concat(codec.name, " | ").concat(getFunctionName(predicate), ")");
      }
      return new RefinementType(name, function(u) {
        return codec.is(u) && predicate(u);
      }, function(i, c) {
        var e = codec.validate(i, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var a = e.right;
        return predicate(a) ? (0, exports2.success)(a) : (0, exports2.failure)(a, c);
      }, codec.encode, codec, predicate);
    }
    exports2.refinement = refinement;
    exports2.Integer = refinement(exports2.number, Number.isInteger, "Integer");
    var TaggedUnionType = (
      /** @class */
      function(_super) {
        __extends(TaggedUnionType2, _super);
        function TaggedUnionType2(name, is, validate, encode, codecs, tag) {
          var _this = _super.call(this, name, is, validate, encode, codecs) || this;
          _this.tag = tag;
          return _this;
        }
        return TaggedUnionType2;
      }(UnionType)
    );
    exports2.TaggedUnionType = TaggedUnionType;
    var taggedUnion = function(tag, codecs, name) {
      if (name === void 0) {
        name = getUnionName(codecs);
      }
      var U = union(codecs, name);
      if (U instanceof TaggedUnionType) {
        return U;
      } else {
        console.warn("[io-ts] Cannot build a tagged union for ".concat(name, ", returning a de-optimized union"));
        return new TaggedUnionType(name, U.is, U.validate, U.encode, codecs, tag);
      }
    };
    exports2.taggedUnion = taggedUnion;
    var getValidationError = function(value, context) {
      return {
        value,
        context
      };
    };
    exports2.getValidationError = getValidationError;
    var getDefaultContext = function(decoder) {
      return [
        { key: "", type: decoder }
      ];
    };
    exports2.getDefaultContext = getDefaultContext;
    exports2.Dictionary = exports2.UnknownRecord;
    var ObjectType = (
      /** @class */
      function(_super) {
        __extends(ObjectType2, _super);
        function ObjectType2() {
          var _this = _super.call(this, "object", function(u) {
            return u !== null && typeof u === "object";
          }, function(u, c) {
            return _this.is(u) ? (0, exports2.success)(u) : (0, exports2.failure)(u, c);
          }, exports2.identity) || this;
          _this._tag = "ObjectType";
          return _this;
        }
        return ObjectType2;
      }(Type)
    );
    exports2.ObjectType = ObjectType;
    exports2.object = new ObjectType();
    exports2.dictionary = record;
    var StrictType = (
      /** @class */
      function(_super) {
        __extends(StrictType2, _super);
        function StrictType2(name, is, validate, encode, props) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.props = props;
          _this._tag = "StrictType";
          return _this;
        }
        return StrictType2;
      }(Type)
    );
    exports2.StrictType = StrictType;
    function clean(codec) {
      return codec;
    }
    exports2.clean = clean;
    function alias(codec) {
      return function() {
        return codec;
      };
    }
    exports2.alias = alias;
  }
});

// node_modules/@ioredis/commands/built/commands.json
var require_commands = __commonJS({
  "node_modules/@ioredis/commands/built/commands.json"(exports2, module2) {
    module2.exports = {
      acl: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      append: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      asking: {
        arity: 1,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      auth: {
        arity: -2,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bgrewriteaof: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bgsave: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bitcount: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitfield: {
        arity: -2,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitfield_ro: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitop: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 2,
        keyStop: -1,
        step: 1
      },
      bitpos: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      blmove: {
        arity: 6,
        flags: [
          "write",
          "denyoom",
          "noscript",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      blmpop: {
        arity: -5,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      blpop: {
        arity: -3,
        flags: [
          "write",
          "noscript",
          "blocking"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      brpop: {
        arity: -3,
        flags: [
          "write",
          "noscript",
          "blocking"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      brpoplpush: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "noscript",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      bzmpop: {
        arity: -5,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bzpopmax: {
        arity: -3,
        flags: [
          "write",
          "noscript",
          "blocking",
          "fast"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      bzpopmin: {
        arity: -3,
        flags: [
          "write",
          "noscript",
          "blocking",
          "fast"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      client: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      cluster: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      command: {
        arity: -1,
        flags: [
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      config: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      copy: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      dbsize: {
        arity: 1,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      debug: {
        arity: -2,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      decr: {
        arity: 2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      decrby: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      del: {
        arity: -2,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      discard: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      dump: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      echo: {
        arity: 2,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      eval: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      eval_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      evalsha: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      evalsha_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      exec: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "skip_slowlog"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      exists: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      expire: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      expireat: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      expiretime: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      failover: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      fcall: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      fcall_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      flushall: {
        arity: -1,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      flushdb: {
        arity: -1,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      function: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      geoadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geodist: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geohash: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geopos: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadius: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadius_ro: {
        arity: -6,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadiusbymember: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadiusbymember_ro: {
        arity: -5,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geosearch: {
        arity: -7,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geosearchstore: {
        arity: -8,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      get: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getbit: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getdel: {
        arity: 2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getex: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getset: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hdel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hello: {
        arity: -1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      hexists: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hget: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetall: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hincrby: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hincrbyfloat: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hkeys: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hmget: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hmset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hrandfield: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hsetnx: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hstrlen: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hvals: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incr: {
        arity: 2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incrby: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incrbyfloat: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      info: {
        arity: -1,
        flags: [
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      keys: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lastsave: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      latency: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lcs: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lindex: {
        arity: 3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      linsert: {
        arity: 5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      llen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lmove: {
        arity: 5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lmpop: {
        arity: -4,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lolwut: {
        arity: -1,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lpop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpos: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpush: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpushx: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lrem: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lset: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ltrim: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      memory: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      mget: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      migrate: {
        arity: -6,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 3,
        keyStop: 3,
        step: 1
      },
      module: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      monitor: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      move: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      mset: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 2
      },
      msetnx: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 2
      },
      multi: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      object: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      persist: {
        arity: 2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpire: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpireat: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpiretime: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pfadd: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pfcount: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      pfdebug: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "admin"
        ],
        keyStart: 2,
        keyStop: 2,
        step: 1
      },
      pfmerge: {
        arity: -2,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      pfselftest: {
        arity: 1,
        flags: [
          "admin"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      ping: {
        arity: -1,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      psetex: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      psubscribe: {
        arity: -2,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      psync: {
        arity: -3,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      pttl: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      publish: {
        arity: 3,
        flags: [
          "pubsub",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      pubsub: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      punsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      quit: {
        arity: -1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      randomkey: {
        arity: 1,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      readonly: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      readwrite: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      rename: {
        arity: 3,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      renamenx: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      replconf: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      replicaof: {
        arity: 3,
        flags: [
          "admin",
          "noscript",
          "stale",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      reset: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      restore: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      "restore-asking": {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "asking"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      role: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      rpop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      rpoplpush: {
        arity: 3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      rpush: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      rpushx: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sadd: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      save: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      scan: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      scard: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      script: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sdiff: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sdiffstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      select: {
        arity: 2,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      set: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setbit: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setex: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setnx: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setrange: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      shutdown: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale",
          "no_multi",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sinter: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sintercard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sinterstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sismember: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      slaveof: {
        arity: 3,
        flags: [
          "admin",
          "noscript",
          "stale",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      slowlog: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      smembers: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      smismember: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      smove: {
        arity: 4,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      sort: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sort_ro: {
        arity: -2,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      spop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      spublish: {
        arity: 3,
        flags: [
          "pubsub",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      srandmember: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      srem: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ssubscribe: {
        arity: -2,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      strlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      subscribe: {
        arity: -2,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      substr: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sunion: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sunionstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sunsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      swapdb: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sync: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      time: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      touch: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      ttl: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      type: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      unlink: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      unsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      unwatch: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      wait: {
        arity: 3,
        flags: [
          "noscript"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      watch: {
        arity: -2,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      xack: {
        arity: -4,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xautoclaim: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xclaim: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xdel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xgroup: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xinfo: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xpending: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xread: {
        arity: -4,
        flags: [
          "readonly",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xreadgroup: {
        arity: -7,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xrevrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xsetid: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xtrim: {
        arity: -4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zadd: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zcard: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zcount: {
        arity: 4,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zdiff: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zdiffstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zincrby: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zinter: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zintercard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zinterstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zlexcount: {
        arity: 4,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zmpop: {
        arity: -4,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zmscore: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zpopmax: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zpopmin: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrandmember: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangebylex: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangebyscore: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangestore: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      zrank: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrem: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebylex: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebyrank: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebyscore: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrangebylex: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrangebyscore: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrank: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zscore: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zunion: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zunionstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      }
    };
  }
});

// node_modules/@ioredis/commands/built/index.js
var require_built = __commonJS({
  "node_modules/@ioredis/commands/built/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getKeyIndexes = exports2.hasFlag = exports2.exists = exports2.list = void 0;
    var commands_json_1 = __importDefault(require_commands());
    exports2.list = Object.keys(commands_json_1.default);
    var flags = {};
    exports2.list.forEach((commandName) => {
      flags[commandName] = commands_json_1.default[commandName].flags.reduce(function(flags2, flag) {
        flags2[flag] = true;
        return flags2;
      }, {});
    });
    function exists(commandName) {
      return Boolean(commands_json_1.default[commandName]);
    }
    exports2.exists = exists;
    function hasFlag(commandName, flag) {
      if (!flags[commandName]) {
        throw new Error("Unknown command " + commandName);
      }
      return Boolean(flags[commandName][flag]);
    }
    exports2.hasFlag = hasFlag;
    function getKeyIndexes(commandName, args, options) {
      const command = commands_json_1.default[commandName];
      if (!command) {
        throw new Error("Unknown command " + commandName);
      }
      if (!Array.isArray(args)) {
        throw new Error("Expect args to be an array");
      }
      const keys4 = [];
      const parseExternalKey = Boolean(options && options.parseExternalKey);
      const takeDynamicKeys = (args2, startIndex) => {
        const keys5 = [];
        const keyStop = Number(args2[startIndex]);
        for (let i = 0; i < keyStop; i++) {
          keys5.push(i + startIndex + 1);
        }
        return keys5;
      };
      const takeKeyAfterToken = (args2, startIndex, token) => {
        for (let i = startIndex; i < args2.length - 1; i += 1) {
          if (String(args2[i]).toLowerCase() === token.toLowerCase()) {
            return i + 1;
          }
        }
        return null;
      };
      switch (commandName) {
        case "zunionstore":
        case "zinterstore":
        case "zdiffstore":
          keys4.push(0, ...takeDynamicKeys(args, 1));
          break;
        case "eval":
        case "evalsha":
        case "eval_ro":
        case "evalsha_ro":
        case "fcall":
        case "fcall_ro":
        case "blmpop":
        case "bzmpop":
          keys4.push(...takeDynamicKeys(args, 1));
          break;
        case "sintercard":
        case "lmpop":
        case "zunion":
        case "zinter":
        case "zmpop":
        case "zintercard":
        case "zdiff": {
          keys4.push(...takeDynamicKeys(args, 0));
          break;
        }
        case "georadius": {
          keys4.push(0);
          const storeKey = takeKeyAfterToken(args, 5, "STORE");
          if (storeKey)
            keys4.push(storeKey);
          const distKey = takeKeyAfterToken(args, 5, "STOREDIST");
          if (distKey)
            keys4.push(distKey);
          break;
        }
        case "georadiusbymember": {
          keys4.push(0);
          const storeKey = takeKeyAfterToken(args, 4, "STORE");
          if (storeKey)
            keys4.push(storeKey);
          const distKey = takeKeyAfterToken(args, 4, "STOREDIST");
          if (distKey)
            keys4.push(distKey);
          break;
        }
        case "sort":
        case "sort_ro":
          keys4.push(0);
          for (let i = 1; i < args.length - 1; i++) {
            let arg = args[i];
            if (typeof arg !== "string") {
              continue;
            }
            const directive = arg.toUpperCase();
            if (directive === "GET") {
              i += 1;
              arg = args[i];
              if (arg !== "#") {
                if (parseExternalKey) {
                  keys4.push([i, getExternalKeyNameLength(arg)]);
                } else {
                  keys4.push(i);
                }
              }
            } else if (directive === "BY") {
              i += 1;
              if (parseExternalKey) {
                keys4.push([i, getExternalKeyNameLength(args[i])]);
              } else {
                keys4.push(i);
              }
            } else if (directive === "STORE") {
              i += 1;
              keys4.push(i);
            }
          }
          break;
        case "migrate":
          if (args[2] === "") {
            for (let i = 5; i < args.length - 1; i++) {
              const arg = args[i];
              if (typeof arg === "string" && arg.toUpperCase() === "KEYS") {
                for (let j = i + 1; j < args.length; j++) {
                  keys4.push(j);
                }
                break;
              }
            }
          } else {
            keys4.push(2);
          }
          break;
        case "xreadgroup":
        case "xread":
          for (let i = commandName === "xread" ? 0 : 3; i < args.length - 1; i++) {
            if (String(args[i]).toUpperCase() === "STREAMS") {
              for (let j = i + 1; j <= i + (args.length - 1 - i) / 2; j++) {
                keys4.push(j);
              }
              break;
            }
          }
          break;
        default:
          if (command.step > 0) {
            const keyStart = command.keyStart - 1;
            const keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1;
            for (let i = keyStart; i < keyStop; i += command.step) {
              keys4.push(i);
            }
          }
          break;
      }
      return keys4;
    }
    exports2.getKeyIndexes = getKeyIndexes;
    function getExternalKeyNameLength(key) {
      if (typeof key !== "string") {
        key = String(key);
      }
      const hashPos = key.indexOf("->");
      return hashPos === -1 ? key.length : hashPos;
    }
  }
});

// node_modules/standard-as-callback/built/utils.js
var require_utils = __commonJS({
  "node_modules/standard-as-callback/built/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tryCatch = exports2.errorObj = void 0;
    exports2.errorObj = { e: {} };
    var tryCatchTarget;
    function tryCatcher(err, val) {
      try {
        const target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
      } catch (e) {
        exports2.errorObj.e = e;
        return exports2.errorObj;
      }
    }
    function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
    }
    exports2.tryCatch = tryCatch;
  }
});

// node_modules/standard-as-callback/built/index.js
var require_built2 = __commonJS({
  "node_modules/standard-as-callback/built/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    function throwLater(e) {
      setTimeout(function() {
        throw e;
      }, 0);
    }
    function asCallback(promise, nodeback, options) {
      if (typeof nodeback === "function") {
        promise.then((val) => {
          let ret;
          if (options !== void 0 && Object(options).spread && Array.isArray(val)) {
            ret = utils_1.tryCatch(nodeback).apply(void 0, [null].concat(val));
          } else {
            ret = val === void 0 ? utils_1.tryCatch(nodeback)(null) : utils_1.tryCatch(nodeback)(null, val);
          }
          if (ret === utils_1.errorObj) {
            throwLater(ret.e);
          }
        }, (cause) => {
          if (!cause) {
            const newReason = new Error(cause + "");
            Object.assign(newReason, { cause });
            cause = newReason;
          }
          const ret = utils_1.tryCatch(nodeback)(cause);
          if (ret === utils_1.errorObj) {
            throwLater(ret.e);
          }
        });
      }
      return promise;
    }
    exports2.default = asCallback;
  }
});

// node_modules/redis-errors/lib/old.js
var require_old = __commonJS({
  "node_modules/redis-errors/lib/old.js"(exports2, module2) {
    "use strict";
    var assert = require("assert");
    var util = require("util");
    function RedisError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(RedisError, Error);
    Object.defineProperty(RedisError.prototype, "name", {
      value: "RedisError",
      configurable: true,
      writable: true
    });
    function ParserError(message, buffer, offset) {
      assert(buffer);
      assert.strictEqual(typeof offset, "number");
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
      this.offset = offset;
      this.buffer = buffer;
    }
    util.inherits(ParserError, RedisError);
    Object.defineProperty(ParserError.prototype, "name", {
      value: "ParserError",
      configurable: true,
      writable: true
    });
    function ReplyError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
    }
    util.inherits(ReplyError, RedisError);
    Object.defineProperty(ReplyError.prototype, "name", {
      value: "ReplyError",
      configurable: true,
      writable: true
    });
    function AbortError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(AbortError, RedisError);
    Object.defineProperty(AbortError.prototype, "name", {
      value: "AbortError",
      configurable: true,
      writable: true
    });
    function InterruptError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(InterruptError, AbortError);
    Object.defineProperty(InterruptError.prototype, "name", {
      value: "InterruptError",
      configurable: true,
      writable: true
    });
    module2.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError,
      InterruptError
    };
  }
});

// node_modules/redis-errors/lib/modern.js
var require_modern = __commonJS({
  "node_modules/redis-errors/lib/modern.js"(exports2, module2) {
    "use strict";
    var assert = require("assert");
    var RedisError = class extends Error {
      get name() {
        return this.constructor.name;
      }
    };
    var ParserError = class extends RedisError {
      constructor(message, buffer, offset) {
        assert(buffer);
        assert.strictEqual(typeof offset, "number");
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
        this.offset = offset;
        this.buffer = buffer;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var ReplyError = class extends RedisError {
      constructor(message) {
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var AbortError = class extends RedisError {
      get name() {
        return this.constructor.name;
      }
    };
    var InterruptError = class extends AbortError {
      get name() {
        return this.constructor.name;
      }
    };
    module2.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError,
      InterruptError
    };
  }
});

// node_modules/redis-errors/index.js
var require_redis_errors = __commonJS({
  "node_modules/redis-errors/index.js"(exports2, module2) {
    "use strict";
    var Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? require_old() : require_modern();
    module2.exports = Errors;
  }
});

// node_modules/cluster-key-slot/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/cluster-key-slot/lib/index.js"(exports2, module2) {
    var lookup = [
      0,
      4129,
      8258,
      12387,
      16516,
      20645,
      24774,
      28903,
      33032,
      37161,
      41290,
      45419,
      49548,
      53677,
      57806,
      61935,
      4657,
      528,
      12915,
      8786,
      21173,
      17044,
      29431,
      25302,
      37689,
      33560,
      45947,
      41818,
      54205,
      50076,
      62463,
      58334,
      9314,
      13379,
      1056,
      5121,
      25830,
      29895,
      17572,
      21637,
      42346,
      46411,
      34088,
      38153,
      58862,
      62927,
      50604,
      54669,
      13907,
      9842,
      5649,
      1584,
      30423,
      26358,
      22165,
      18100,
      46939,
      42874,
      38681,
      34616,
      63455,
      59390,
      55197,
      51132,
      18628,
      22757,
      26758,
      30887,
      2112,
      6241,
      10242,
      14371,
      51660,
      55789,
      59790,
      63919,
      35144,
      39273,
      43274,
      47403,
      23285,
      19156,
      31415,
      27286,
      6769,
      2640,
      14899,
      10770,
      56317,
      52188,
      64447,
      60318,
      39801,
      35672,
      47931,
      43802,
      27814,
      31879,
      19684,
      23749,
      11298,
      15363,
      3168,
      7233,
      60846,
      64911,
      52716,
      56781,
      44330,
      48395,
      36200,
      40265,
      32407,
      28342,
      24277,
      20212,
      15891,
      11826,
      7761,
      3696,
      65439,
      61374,
      57309,
      53244,
      48923,
      44858,
      40793,
      36728,
      37256,
      33193,
      45514,
      41451,
      53516,
      49453,
      61774,
      57711,
      4224,
      161,
      12482,
      8419,
      20484,
      16421,
      28742,
      24679,
      33721,
      37784,
      41979,
      46042,
      49981,
      54044,
      58239,
      62302,
      689,
      4752,
      8947,
      13010,
      16949,
      21012,
      25207,
      29270,
      46570,
      42443,
      38312,
      34185,
      62830,
      58703,
      54572,
      50445,
      13538,
      9411,
      5280,
      1153,
      29798,
      25671,
      21540,
      17413,
      42971,
      47098,
      34713,
      38840,
      59231,
      63358,
      50973,
      55100,
      9939,
      14066,
      1681,
      5808,
      26199,
      30326,
      17941,
      22068,
      55628,
      51565,
      63758,
      59695,
      39368,
      35305,
      47498,
      43435,
      22596,
      18533,
      30726,
      26663,
      6336,
      2273,
      14466,
      10403,
      52093,
      56156,
      60223,
      64286,
      35833,
      39896,
      43963,
      48026,
      19061,
      23124,
      27191,
      31254,
      2801,
      6864,
      10931,
      14994,
      64814,
      60687,
      56684,
      52557,
      48554,
      44427,
      40424,
      36297,
      31782,
      27655,
      23652,
      19525,
      15522,
      11395,
      7392,
      3265,
      61215,
      65342,
      53085,
      57212,
      44955,
      49082,
      36825,
      40952,
      28183,
      32310,
      20053,
      24180,
      11923,
      16050,
      3793,
      7920
    ];
    var toUTF8Array = function toUTF8Array2(str) {
      var char;
      var i = 0;
      var p = 0;
      var utf8 = [];
      var len = str.length;
      for (; i < len; i++) {
        char = str.charCodeAt(i);
        if (char < 128) {
          utf8[p++] = char;
        } else if (char < 2048) {
          utf8[p++] = char >> 6 | 192;
          utf8[p++] = char & 63 | 128;
        } else if ((char & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
          char = 65536 + ((char & 1023) << 10) + (str.charCodeAt(++i) & 1023);
          utf8[p++] = char >> 18 | 240;
          utf8[p++] = char >> 12 & 63 | 128;
          utf8[p++] = char >> 6 & 63 | 128;
          utf8[p++] = char & 63 | 128;
        } else {
          utf8[p++] = char >> 12 | 224;
          utf8[p++] = char >> 6 & 63 | 128;
          utf8[p++] = char & 63 | 128;
        }
      }
      return utf8;
    };
    var generate = module2.exports = function generate2(str) {
      var char;
      var i = 0;
      var start = -1;
      var result = 0;
      var resultHash = 0;
      var utf8 = typeof str === "string" ? toUTF8Array(str) : str;
      var len = utf8.length;
      while (i < len) {
        char = utf8[i++];
        if (start === -1) {
          if (char === 123) {
            start = i;
          }
        } else if (char !== 125) {
          resultHash = lookup[(char ^ resultHash >> 8) & 255] ^ resultHash << 8;
        } else if (i - 1 !== start) {
          return resultHash & 16383;
        }
        result = lookup[(char ^ result >> 8) & 255] ^ result << 8;
      }
      return result & 16383;
    };
    module2.exports.generateMulti = function generateMulti(keys4) {
      var i = 1;
      var len = keys4.length;
      var base = generate(keys4[0]);
      while (i < len) {
        if (generate(keys4[i++]) !== base)
          return -1;
      }
      return base;
    };
  }
});

// node_modules/lodash.defaults/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.defaults/index.js"(exports2, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignInDefaults(objValue, srcValue, key, object) {
      if (objValue === void 0 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
        return srcValue;
      }
      return objValue;
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseRest(func, start) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        assignValue(object, key, newValue === void 0 ? source[key] : newValue);
      }
      return object;
    }
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type3 = typeof index;
      if (type3 == "number" ? isArrayLike(object) && isIndex(index, object.length) : type3 == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type3 = typeof value;
      return !!value && (type3 == "object" || type3 == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });
    var defaults = baseRest(function(args) {
      args.push(void 0, assignInDefaults);
      return apply(assignInWith, void 0, args);
    });
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    module2.exports = defaults;
  }
});

// node_modules/lodash.isarguments/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.isarguments/index.js"(exports2, module2) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type3 = typeof value;
      return !!value && (type3 == "object" || type3 == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    module2.exports = isArguments;
  }
});

// node_modules/ioredis/built/utils/lodash.js
var require_lodash3 = __commonJS({
  "node_modules/ioredis/built/utils/lodash.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isArguments = exports2.defaults = exports2.noop = void 0;
    var defaults = require_lodash();
    exports2.defaults = defaults;
    var isArguments = require_lodash2();
    exports2.isArguments = isArguments;
    function noop() {
    }
    exports2.noop = noop;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type3 = typeof val;
      if (type3 === "string" && val.length > 0) {
        return parse(val);
      } else if (type3 === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type3 = (match[2] || "ms").toLowerCase();
      switch (type3) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys4 = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys4.length; i++) {
        debug.inspectOpts[keys4[i]] = exports2.inspectOpts[keys4[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/ioredis/built/utils/debug.js
var require_debug = __commonJS({
  "node_modules/ioredis/built/utils/debug.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.genRedactedString = exports2.getStringValue = exports2.MAX_ARGUMENT_LENGTH = void 0;
    var debug_1 = require_src();
    var MAX_ARGUMENT_LENGTH = 200;
    exports2.MAX_ARGUMENT_LENGTH = MAX_ARGUMENT_LENGTH;
    var NAMESPACE_PREFIX = "ioredis";
    function getStringValue(v) {
      if (v === null) {
        return;
      }
      switch (typeof v) {
        case "boolean":
          return;
        case "number":
          return;
        case "object":
          if (Buffer.isBuffer(v)) {
            return v.toString("hex");
          }
          if (Array.isArray(v)) {
            return v.join(",");
          }
          try {
            return JSON.stringify(v);
          } catch (e) {
            return;
          }
        case "string":
          return v;
      }
    }
    exports2.getStringValue = getStringValue;
    function genRedactedString(str, maxLen) {
      const { length } = str;
      return length <= maxLen ? str : str.slice(0, maxLen) + ' ... <REDACTED full-length="' + length + '">';
    }
    exports2.genRedactedString = genRedactedString;
    function genDebugFunction(namespace) {
      const fn = (0, debug_1.default)(`${NAMESPACE_PREFIX}:${namespace}`);
      function wrappedDebug(...args) {
        if (!fn.enabled) {
          return;
        }
        for (let i = 1; i < args.length; i++) {
          const str = getStringValue(args[i]);
          if (typeof str === "string" && str.length > MAX_ARGUMENT_LENGTH) {
            args[i] = genRedactedString(str, MAX_ARGUMENT_LENGTH);
          }
        }
        return fn.apply(null, args);
      }
      Object.defineProperties(wrappedDebug, {
        namespace: {
          get() {
            return fn.namespace;
          }
        },
        enabled: {
          get() {
            return fn.enabled;
          }
        },
        destroy: {
          get() {
            return fn.destroy;
          }
        },
        log: {
          get() {
            return fn.log;
          },
          set(l) {
            fn.log = l;
          }
        }
      });
      return wrappedDebug;
    }
    exports2.default = genDebugFunction;
  }
});

// node_modules/ioredis/built/constants/TLSProfiles.js
var require_TLSProfiles = __commonJS({
  "node_modules/ioredis/built/constants/TLSProfiles.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var RedisCloudCA = `-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;
    var TLSProfiles = {
      RedisCloudFixed: { ca: RedisCloudCA },
      RedisCloudFlexible: { ca: RedisCloudCA }
    };
    exports2.default = TLSProfiles;
  }
});

// node_modules/ioredis/built/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/ioredis/built/utils/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.noop = exports2.defaults = exports2.Debug = exports2.zipMap = exports2.CONNECTION_CLOSED_ERROR_MSG = exports2.shuffle = exports2.sample = exports2.resolveTLSProfile = exports2.parseURL = exports2.optimizeErrorStack = exports2.toArg = exports2.convertMapToArray = exports2.convertObjectToArray = exports2.timeout = exports2.packObject = exports2.isInt = exports2.wrapMultiResult = exports2.convertBufferToString = void 0;
    var url_1 = require("url");
    var lodash_1 = require_lodash3();
    Object.defineProperty(exports2, "defaults", { enumerable: true, get: function() {
      return lodash_1.defaults;
    } });
    Object.defineProperty(exports2, "noop", { enumerable: true, get: function() {
      return lodash_1.noop;
    } });
    var debug_1 = require_debug();
    exports2.Debug = debug_1.default;
    var TLSProfiles_1 = require_TLSProfiles();
    function convertBufferToString(value, encoding) {
      if (value instanceof Buffer) {
        return value.toString(encoding);
      }
      if (Array.isArray(value)) {
        const length = value.length;
        const res = Array(length);
        for (let i = 0; i < length; ++i) {
          res[i] = value[i] instanceof Buffer && encoding === "utf8" ? value[i].toString() : convertBufferToString(value[i], encoding);
        }
        return res;
      }
      return value;
    }
    exports2.convertBufferToString = convertBufferToString;
    function wrapMultiResult(arr) {
      if (!arr) {
        return null;
      }
      const result = [];
      const length = arr.length;
      for (let i = 0; i < length; ++i) {
        const item = arr[i];
        if (item instanceof Error) {
          result.push([item]);
        } else {
          result.push([null, item]);
        }
      }
      return result;
    }
    exports2.wrapMultiResult = wrapMultiResult;
    function isInt(value) {
      const x = parseFloat(value);
      return !isNaN(value) && (x | 0) === x;
    }
    exports2.isInt = isInt;
    function packObject(array) {
      const result = {};
      const length = array.length;
      for (let i = 1; i < length; i += 2) {
        result[array[i - 1]] = array[i];
      }
      return result;
    }
    exports2.packObject = packObject;
    function timeout(callback, timeout2) {
      let timer = null;
      const run = function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
          callback.apply(this, arguments);
        }
      };
      timer = setTimeout(run, timeout2, new Error("timeout"));
      return run;
    }
    exports2.timeout = timeout;
    function convertObjectToArray(obj) {
      const result = [];
      const keys4 = Object.keys(obj);
      for (let i = 0, l = keys4.length; i < l; i++) {
        result.push(keys4[i], obj[keys4[i]]);
      }
      return result;
    }
    exports2.convertObjectToArray = convertObjectToArray;
    function convertMapToArray(map) {
      const result = [];
      let pos = 0;
      map.forEach(function(value, key) {
        result[pos] = key;
        result[pos + 1] = value;
        pos += 2;
      });
      return result;
    }
    exports2.convertMapToArray = convertMapToArray;
    function toArg(arg) {
      if (arg === null || typeof arg === "undefined") {
        return "";
      }
      return String(arg);
    }
    exports2.toArg = toArg;
    function optimizeErrorStack(error, friendlyStack, filterPath) {
      const stacks = friendlyStack.split("\n");
      let lines = "";
      let i;
      for (i = 1; i < stacks.length; ++i) {
        if (stacks[i].indexOf(filterPath) === -1) {
          break;
        }
      }
      for (let j = i; j < stacks.length; ++j) {
        lines += "\n" + stacks[j];
      }
      if (error.stack) {
        const pos = error.stack.indexOf("\n");
        error.stack = error.stack.slice(0, pos) + lines;
      }
      return error;
    }
    exports2.optimizeErrorStack = optimizeErrorStack;
    function parseURL(url) {
      if (isInt(url)) {
        return { port: url };
      }
      let parsed = (0, url_1.parse)(url, true, true);
      if (!parsed.slashes && url[0] !== "/") {
        url = "//" + url;
        parsed = (0, url_1.parse)(url, true, true);
      }
      const options = parsed.query || {};
      const result = {};
      if (parsed.auth) {
        const index = parsed.auth.indexOf(":");
        result.username = index === -1 ? parsed.auth : parsed.auth.slice(0, index);
        result.password = index === -1 ? "" : parsed.auth.slice(index + 1);
      }
      if (parsed.pathname) {
        if (parsed.protocol === "redis:" || parsed.protocol === "rediss:") {
          if (parsed.pathname.length > 1) {
            result.db = parsed.pathname.slice(1);
          }
        } else {
          result.path = parsed.pathname;
        }
      }
      if (parsed.host) {
        result.host = parsed.hostname;
      }
      if (parsed.port) {
        result.port = parsed.port;
      }
      if (typeof options.family === "string") {
        const intFamily = Number.parseInt(options.family, 10);
        if (!Number.isNaN(intFamily)) {
          result.family = intFamily;
        }
      }
      (0, lodash_1.defaults)(result, options);
      return result;
    }
    exports2.parseURL = parseURL;
    function resolveTLSProfile(options) {
      let tls = options === null || options === void 0 ? void 0 : options.tls;
      if (typeof tls === "string")
        tls = { profile: tls };
      const profile = TLSProfiles_1.default[tls === null || tls === void 0 ? void 0 : tls.profile];
      if (profile) {
        tls = Object.assign({}, profile, tls);
        delete tls.profile;
        options = Object.assign({}, options, { tls });
      }
      return options;
    }
    exports2.resolveTLSProfile = resolveTLSProfile;
    function sample(array, from = 0) {
      const length = array.length;
      if (from >= length) {
        return null;
      }
      return array[from + Math.floor(Math.random() * (length - from))];
    }
    exports2.sample = sample;
    function shuffle(array) {
      let counter = array.length;
      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        [array[counter], array[index]] = [array[index], array[counter]];
      }
      return array;
    }
    exports2.shuffle = shuffle;
    exports2.CONNECTION_CLOSED_ERROR_MSG = "Connection is closed.";
    function zipMap(keys4, values) {
      const map = /* @__PURE__ */ new Map();
      keys4.forEach((key, index) => {
        map.set(key, values[index]);
      });
      return map;
    }
    exports2.zipMap = zipMap;
  }
});

// node_modules/ioredis/built/Command.js
var require_Command = __commonJS({
  "node_modules/ioredis/built/Command.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var commands_1 = require_built();
    var calculateSlot = require_lib2();
    var standard_as_callback_1 = require_built2();
    var utils_1 = require_utils2();
    var Command = class _Command {
      /**
       * Creates an instance of Command.
       * @param name Command name
       * @param args An array of command arguments
       * @param options
       * @param callback The callback that handles the response.
       * If omit, the response will be handled via Promise
       */
      constructor(name, args = [], options = {}, callback) {
        this.name = name;
        this.inTransaction = false;
        this.isResolved = false;
        this.transformed = false;
        this.replyEncoding = options.replyEncoding;
        this.errorStack = options.errorStack;
        this.args = args.flat();
        this.callback = callback;
        this.initPromise();
        if (options.keyPrefix) {
          const isBufferKeyPrefix = options.keyPrefix instanceof Buffer;
          let keyPrefixBuffer = isBufferKeyPrefix ? options.keyPrefix : null;
          this._iterateKeys((key) => {
            if (key instanceof Buffer) {
              if (keyPrefixBuffer === null) {
                keyPrefixBuffer = Buffer.from(options.keyPrefix);
              }
              return Buffer.concat([keyPrefixBuffer, key]);
            } else if (isBufferKeyPrefix) {
              return Buffer.concat([options.keyPrefix, Buffer.from(String(key))]);
            }
            return options.keyPrefix + key;
          });
        }
        if (options.readOnly) {
          this.isReadOnly = true;
        }
      }
      /**
       * Check whether the command has the flag
       */
      static checkFlag(flagName, commandName) {
        return !!this.getFlagMap()[flagName][commandName];
      }
      static setArgumentTransformer(name, func) {
        this._transformer.argument[name] = func;
      }
      static setReplyTransformer(name, func) {
        this._transformer.reply[name] = func;
      }
      static getFlagMap() {
        if (!this.flagMap) {
          this.flagMap = Object.keys(_Command.FLAGS).reduce((map, flagName) => {
            map[flagName] = {};
            _Command.FLAGS[flagName].forEach((commandName) => {
              map[flagName][commandName] = true;
            });
            return map;
          }, {});
        }
        return this.flagMap;
      }
      getSlot() {
        if (typeof this.slot === "undefined") {
          const key = this.getKeys()[0];
          this.slot = key == null ? null : calculateSlot(key);
        }
        return this.slot;
      }
      getKeys() {
        return this._iterateKeys();
      }
      /**
       * Convert command to writable buffer or string
       */
      toWritable(_socket) {
        let result;
        const commandStr = "*" + (this.args.length + 1) + "\r\n$" + Buffer.byteLength(this.name) + "\r\n" + this.name + "\r\n";
        if (this.bufferMode) {
          const buffers = new MixedBuffers();
          buffers.push(commandStr);
          for (let i = 0; i < this.args.length; ++i) {
            const arg = this.args[i];
            if (arg instanceof Buffer) {
              if (arg.length === 0) {
                buffers.push("$0\r\n\r\n");
              } else {
                buffers.push("$" + arg.length + "\r\n");
                buffers.push(arg);
                buffers.push("\r\n");
              }
            } else {
              buffers.push("$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n");
            }
          }
          result = buffers.toBuffer();
        } else {
          result = commandStr;
          for (let i = 0; i < this.args.length; ++i) {
            const arg = this.args[i];
            result += "$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n";
          }
        }
        return result;
      }
      stringifyArguments() {
        for (let i = 0; i < this.args.length; ++i) {
          const arg = this.args[i];
          if (typeof arg === "string") {
          } else if (arg instanceof Buffer) {
            this.bufferMode = true;
          } else {
            this.args[i] = (0, utils_1.toArg)(arg);
          }
        }
      }
      /**
       * Convert buffer/buffer[] to string/string[],
       * and apply reply transformer.
       */
      transformReply(result) {
        if (this.replyEncoding) {
          result = (0, utils_1.convertBufferToString)(result, this.replyEncoding);
        }
        const transformer = _Command._transformer.reply[this.name];
        if (transformer) {
          result = transformer(result);
        }
        return result;
      }
      /**
       * Set the wait time before terminating the attempt to execute a command
       * and generating an error.
       */
      setTimeout(ms) {
        if (!this._commandTimeoutTimer) {
          this._commandTimeoutTimer = setTimeout(() => {
            if (!this.isResolved) {
              this.reject(new Error("Command timed out"));
            }
          }, ms);
        }
      }
      initPromise() {
        const promise = new Promise((resolve, reject) => {
          if (!this.transformed) {
            this.transformed = true;
            const transformer = _Command._transformer.argument[this.name];
            if (transformer) {
              this.args = transformer(this.args);
            }
            this.stringifyArguments();
          }
          this.resolve = this._convertValue(resolve);
          if (this.errorStack) {
            this.reject = (err) => {
              reject((0, utils_1.optimizeErrorStack)(err, this.errorStack.stack, __dirname));
            };
          } else {
            this.reject = reject;
          }
        });
        this.promise = (0, standard_as_callback_1.default)(promise, this.callback);
      }
      /**
       * Iterate through the command arguments that are considered keys.
       */
      _iterateKeys(transform = (key) => key) {
        if (typeof this.keys === "undefined") {
          this.keys = [];
          if ((0, commands_1.exists)(this.name)) {
            const keyIndexes = (0, commands_1.getKeyIndexes)(this.name, this.args);
            for (const index of keyIndexes) {
              this.args[index] = transform(this.args[index]);
              this.keys.push(this.args[index]);
            }
          }
        }
        return this.keys;
      }
      /**
       * Convert the value from buffer to the target encoding.
       */
      _convertValue(resolve) {
        return (value) => {
          try {
            const existingTimer = this._commandTimeoutTimer;
            if (existingTimer) {
              clearTimeout(existingTimer);
              delete this._commandTimeoutTimer;
            }
            resolve(this.transformReply(value));
            this.isResolved = true;
          } catch (err) {
            this.reject(err);
          }
          return this.promise;
        };
      }
    };
    exports2.default = Command;
    Command.FLAGS = {
      VALID_IN_SUBSCRIBER_MODE: [
        "subscribe",
        "psubscribe",
        "unsubscribe",
        "punsubscribe",
        "ssubscribe",
        "sunsubscribe",
        "ping",
        "quit"
      ],
      VALID_IN_MONITOR_MODE: ["monitor", "auth"],
      ENTER_SUBSCRIBER_MODE: ["subscribe", "psubscribe", "ssubscribe"],
      EXIT_SUBSCRIBER_MODE: ["unsubscribe", "punsubscribe", "sunsubscribe"],
      WILL_DISCONNECT: ["quit"]
    };
    Command._transformer = {
      argument: {},
      reply: {}
    };
    var msetArgumentTransformer = function(args) {
      if (args.length === 1) {
        if (args[0] instanceof Map) {
          return (0, utils_1.convertMapToArray)(args[0]);
        }
        if (typeof args[0] === "object" && args[0] !== null) {
          return (0, utils_1.convertObjectToArray)(args[0]);
        }
      }
      return args;
    };
    var hsetArgumentTransformer = function(args) {
      if (args.length === 2) {
        if (args[1] instanceof Map) {
          return [args[0]].concat((0, utils_1.convertMapToArray)(args[1]));
        }
        if (typeof args[1] === "object" && args[1] !== null) {
          return [args[0]].concat((0, utils_1.convertObjectToArray)(args[1]));
        }
      }
      return args;
    };
    Command.setArgumentTransformer("mset", msetArgumentTransformer);
    Command.setArgumentTransformer("msetnx", msetArgumentTransformer);
    Command.setArgumentTransformer("hset", hsetArgumentTransformer);
    Command.setArgumentTransformer("hmset", hsetArgumentTransformer);
    Command.setReplyTransformer("hgetall", function(result) {
      if (Array.isArray(result)) {
        const obj = {};
        for (let i = 0; i < result.length; i += 2) {
          const key = result[i];
          const value = result[i + 1];
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
        }
        return obj;
      }
      return result;
    });
    var MixedBuffers = class {
      constructor() {
        this.length = 0;
        this.items = [];
      }
      push(x) {
        this.length += Buffer.byteLength(x);
        this.items.push(x);
      }
      toBuffer() {
        const result = Buffer.allocUnsafe(this.length);
        let offset = 0;
        for (const item of this.items) {
          const length = Buffer.byteLength(item);
          Buffer.isBuffer(item) ? item.copy(result, offset) : result.write(item, offset, length);
          offset += length;
        }
        return result;
      }
    };
  }
});

// node_modules/ioredis/built/errors/ClusterAllFailedError.js
var require_ClusterAllFailedError = __commonJS({
  "node_modules/ioredis/built/errors/ClusterAllFailedError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var redis_errors_1 = require_redis_errors();
    var ClusterAllFailedError = class extends redis_errors_1.RedisError {
      constructor(message, lastNodeError) {
        super(message);
        this.lastNodeError = lastNodeError;
        Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
    };
    exports2.default = ClusterAllFailedError;
    ClusterAllFailedError.defaultMessage = "Failed to refresh slots cache.";
  }
});

// node_modules/ioredis/built/ScanStream.js
var require_ScanStream = __commonJS({
  "node_modules/ioredis/built/ScanStream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var stream_1 = require("stream");
    var ScanStream = class extends stream_1.Readable {
      constructor(opt) {
        super(opt);
        this.opt = opt;
        this._redisCursor = "0";
        this._redisDrained = false;
      }
      _read() {
        if (this._redisDrained) {
          this.push(null);
          return;
        }
        const args = [this._redisCursor];
        if (this.opt.key) {
          args.unshift(this.opt.key);
        }
        if (this.opt.match) {
          args.push("MATCH", this.opt.match);
        }
        if (this.opt.type) {
          args.push("TYPE", this.opt.type);
        }
        if (this.opt.count) {
          args.push("COUNT", String(this.opt.count));
        }
        this.opt.redis[this.opt.command](args, (err, res) => {
          if (err) {
            this.emit("error", err);
            return;
          }
          this._redisCursor = res[0] instanceof Buffer ? res[0].toString() : res[0];
          if (this._redisCursor === "0") {
            this._redisDrained = true;
          }
          this.push(res[1]);
        });
      }
      close() {
        this._redisDrained = true;
      }
    };
    exports2.default = ScanStream;
  }
});

// node_modules/ioredis/built/autoPipelining.js
var require_autoPipelining = __commonJS({
  "node_modules/ioredis/built/autoPipelining.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.executeWithAutoPipelining = exports2.getFirstValueInFlattenedArray = exports2.shouldUseAutoPipelining = exports2.notAllowedAutoPipelineCommands = exports2.kCallbacks = exports2.kExec = void 0;
    var lodash_1 = require_lodash3();
    var calculateSlot = require_lib2();
    var standard_as_callback_1 = require_built2();
    exports2.kExec = Symbol("exec");
    exports2.kCallbacks = Symbol("callbacks");
    exports2.notAllowedAutoPipelineCommands = [
      "auth",
      "info",
      "script",
      "quit",
      "cluster",
      "pipeline",
      "multi",
      "subscribe",
      "psubscribe",
      "unsubscribe",
      "unpsubscribe",
      "select"
    ];
    function executeAutoPipeline(client, slotKey) {
      if (client._runningAutoPipelines.has(slotKey)) {
        return;
      }
      if (!client._autoPipelines.has(slotKey)) {
        return;
      }
      client._runningAutoPipelines.add(slotKey);
      const pipeline = client._autoPipelines.get(slotKey);
      client._autoPipelines.delete(slotKey);
      const callbacks = pipeline[exports2.kCallbacks];
      pipeline[exports2.kCallbacks] = null;
      pipeline.exec(function(err, results) {
        client._runningAutoPipelines.delete(slotKey);
        if (err) {
          for (let i = 0; i < callbacks.length; i++) {
            process.nextTick(callbacks[i], err);
          }
        } else {
          for (let i = 0; i < callbacks.length; i++) {
            process.nextTick(callbacks[i], ...results[i]);
          }
        }
        if (client._autoPipelines.has(slotKey)) {
          executeAutoPipeline(client, slotKey);
        }
      });
    }
    function shouldUseAutoPipelining(client, functionName, commandName) {
      return functionName && client.options.enableAutoPipelining && !client.isPipeline && !exports2.notAllowedAutoPipelineCommands.includes(commandName) && !client.options.autoPipeliningIgnoredCommands.includes(commandName);
    }
    exports2.shouldUseAutoPipelining = shouldUseAutoPipelining;
    function getFirstValueInFlattenedArray(args) {
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (typeof arg === "string") {
          return arg;
        } else if (Array.isArray(arg) || (0, lodash_1.isArguments)(arg)) {
          if (arg.length === 0) {
            continue;
          }
          return arg[0];
        }
        const flattened = [arg].flat();
        if (flattened.length > 0) {
          return flattened[0];
        }
      }
      return void 0;
    }
    exports2.getFirstValueInFlattenedArray = getFirstValueInFlattenedArray;
    function executeWithAutoPipelining(client, functionName, commandName, args, callback) {
      if (client.isCluster && !client.slots.length) {
        if (client.status === "wait")
          client.connect().catch(lodash_1.noop);
        return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
          client.delayUntilReady((err) => {
            if (err) {
              reject(err);
              return;
            }
            executeWithAutoPipelining(client, functionName, commandName, args, null).then(resolve, reject);
          });
        }), callback);
      }
      const prefix = client.options.keyPrefix || "";
      const slotKey = client.isCluster ? client.slots[calculateSlot(`${prefix}${getFirstValueInFlattenedArray(args)}`)].join(",") : "main";
      if (!client._autoPipelines.has(slotKey)) {
        const pipeline2 = client.pipeline();
        pipeline2[exports2.kExec] = false;
        pipeline2[exports2.kCallbacks] = [];
        client._autoPipelines.set(slotKey, pipeline2);
      }
      const pipeline = client._autoPipelines.get(slotKey);
      if (!pipeline[exports2.kExec]) {
        pipeline[exports2.kExec] = true;
        setImmediate(executeAutoPipeline, client, slotKey);
      }
      const autoPipelinePromise = new Promise(function(resolve, reject) {
        pipeline[exports2.kCallbacks].push(function(err, value) {
          if (err) {
            reject(err);
            return;
          }
          resolve(value);
        });
        if (functionName === "call") {
          args.unshift(commandName);
        }
        pipeline[functionName](...args);
      });
      return (0, standard_as_callback_1.default)(autoPipelinePromise, callback);
    }
    exports2.executeWithAutoPipelining = executeWithAutoPipelining;
  }
});

// node_modules/ioredis/built/Script.js
var require_Script = __commonJS({
  "node_modules/ioredis/built/Script.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var Command_1 = require_Command();
    var standard_as_callback_1 = require_built2();
    var Script = class {
      constructor(lua, numberOfKeys = null, keyPrefix = "", readOnly = false) {
        this.lua = lua;
        this.numberOfKeys = numberOfKeys;
        this.keyPrefix = keyPrefix;
        this.readOnly = readOnly;
        this.sha = (0, crypto_1.createHash)("sha1").update(lua).digest("hex");
        const sha = this.sha;
        const socketHasScriptLoaded = /* @__PURE__ */ new WeakSet();
        this.Command = class CustomScriptCommand extends Command_1.default {
          toWritable(socket) {
            const origReject = this.reject;
            this.reject = (err) => {
              if (err.message.indexOf("NOSCRIPT") !== -1) {
                socketHasScriptLoaded.delete(socket);
              }
              origReject.call(this, err);
            };
            if (!socketHasScriptLoaded.has(socket)) {
              socketHasScriptLoaded.add(socket);
              this.name = "eval";
              this.args[0] = lua;
            } else if (this.name === "eval") {
              this.name = "evalsha";
              this.args[0] = sha;
            }
            return super.toWritable(socket);
          }
        };
      }
      execute(container, args, options, callback) {
        if (typeof this.numberOfKeys === "number") {
          args.unshift(this.numberOfKeys);
        }
        if (this.keyPrefix) {
          options.keyPrefix = this.keyPrefix;
        }
        if (this.readOnly) {
          options.readOnly = true;
        }
        const evalsha = new this.Command("evalsha", [this.sha, ...args], options);
        evalsha.promise = evalsha.promise.catch((err) => {
          if (err.message.indexOf("NOSCRIPT") === -1) {
            throw err;
          }
          const resend = new this.Command("evalsha", [this.sha, ...args], options);
          const client = container.isPipeline ? container.redis : container;
          return client.sendCommand(resend);
        });
        (0, standard_as_callback_1.default)(evalsha.promise, callback);
        return container.sendCommand(evalsha);
      }
    };
    exports2.default = Script;
  }
});

// node_modules/ioredis/built/utils/Commander.js
var require_Commander = __commonJS({
  "node_modules/ioredis/built/utils/Commander.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var commands_1 = require_built();
    var autoPipelining_1 = require_autoPipelining();
    var Command_1 = require_Command();
    var Script_1 = require_Script();
    var Commander = class {
      constructor() {
        this.options = {};
        this.scriptsSet = {};
        this.addedBuiltinSet = /* @__PURE__ */ new Set();
      }
      /**
       * Return supported builtin commands
       */
      getBuiltinCommands() {
        return commands.slice(0);
      }
      /**
       * Create a builtin command
       */
      createBuiltinCommand(commandName) {
        return {
          string: generateFunction(null, commandName, "utf8"),
          buffer: generateFunction(null, commandName, null)
        };
      }
      /**
       * Create add builtin command
       */
      addBuiltinCommand(commandName) {
        this.addedBuiltinSet.add(commandName);
        this[commandName] = generateFunction(commandName, commandName, "utf8");
        this[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
      }
      /**
       * Define a custom command using lua script
       */
      defineCommand(name, definition) {
        const script = new Script_1.default(definition.lua, definition.numberOfKeys, this.options.keyPrefix, definition.readOnly);
        this.scriptsSet[name] = script;
        this[name] = generateScriptingFunction(name, name, script, "utf8");
        this[name + "Buffer"] = generateScriptingFunction(name + "Buffer", name, script, null);
      }
      /**
       * @ignore
       */
      sendCommand(command, stream, node) {
        throw new Error('"sendCommand" is not implemented');
      }
    };
    var commands = commands_1.list.filter((command) => command !== "monitor");
    commands.push("sentinel");
    commands.forEach(function(commandName) {
      Commander.prototype[commandName] = generateFunction(commandName, commandName, "utf8");
      Commander.prototype[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
    });
    Commander.prototype.call = generateFunction("call", "utf8");
    Commander.prototype.callBuffer = generateFunction("callBuffer", null);
    Commander.prototype.send_command = Commander.prototype.call;
    function generateFunction(functionName, _commandName, _encoding) {
      if (typeof _encoding === "undefined") {
        _encoding = _commandName;
        _commandName = null;
      }
      return function(...args) {
        const commandName = _commandName || args.shift();
        let callback = args[args.length - 1];
        if (typeof callback === "function") {
          args.pop();
        } else {
          callback = void 0;
        }
        const options = {
          errorStack: this.options.showFriendlyErrorStack ? new Error() : void 0,
          keyPrefix: this.options.keyPrefix,
          replyEncoding: _encoding
        };
        if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
          return this.sendCommand(
            // @ts-expect-error
            new Command_1.default(commandName, args, options, callback)
          );
        }
        return (0, autoPipelining_1.executeWithAutoPipelining)(
          this,
          functionName,
          commandName,
          // @ts-expect-error
          args,
          callback
        );
      };
    }
    function generateScriptingFunction(functionName, commandName, script, encoding) {
      return function(...args) {
        const callback = typeof args[args.length - 1] === "function" ? args.pop() : void 0;
        const options = {
          replyEncoding: encoding
        };
        if (this.options.showFriendlyErrorStack) {
          options.errorStack = new Error();
        }
        if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
          return script.execute(this, args, options, callback);
        }
        return (0, autoPipelining_1.executeWithAutoPipelining)(this, functionName, commandName, args, callback);
      };
    }
    exports2.default = Commander;
  }
});

// node_modules/ioredis/built/Pipeline.js
var require_Pipeline = __commonJS({
  "node_modules/ioredis/built/Pipeline.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var calculateSlot = require_lib2();
    var commands_1 = require_built();
    var standard_as_callback_1 = require_built2();
    var util_1 = require("util");
    var Command_1 = require_Command();
    var utils_1 = require_utils2();
    var Commander_1 = require_Commander();
    function generateMultiWithNodes(redis, keys4) {
      const slot = calculateSlot(keys4[0]);
      const target = redis._groupsBySlot[slot];
      for (let i = 1; i < keys4.length; i++) {
        if (redis._groupsBySlot[calculateSlot(keys4[i])] !== target) {
          return -1;
        }
      }
      return slot;
    }
    var Pipeline = class extends Commander_1.default {
      constructor(redis) {
        super();
        this.redis = redis;
        this.isPipeline = true;
        this.replyPending = 0;
        this._queue = [];
        this._result = [];
        this._transactions = 0;
        this._shaToScript = {};
        this.isCluster = this.redis.constructor.name === "Cluster" || this.redis.isCluster;
        this.options = redis.options;
        Object.keys(redis.scriptsSet).forEach((name) => {
          const script = redis.scriptsSet[name];
          this._shaToScript[script.sha] = script;
          this[name] = redis[name];
          this[name + "Buffer"] = redis[name + "Buffer"];
        });
        redis.addedBuiltinSet.forEach((name) => {
          this[name] = redis[name];
          this[name + "Buffer"] = redis[name + "Buffer"];
        });
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        const _this = this;
        Object.defineProperty(this, "length", {
          get: function() {
            return _this._queue.length;
          }
        });
      }
      fillResult(value, position) {
        if (this._queue[position].name === "exec" && Array.isArray(value[1])) {
          const execLength = value[1].length;
          for (let i = 0; i < execLength; i++) {
            if (value[1][i] instanceof Error) {
              continue;
            }
            const cmd = this._queue[position - (execLength - i)];
            try {
              value[1][i] = cmd.transformReply(value[1][i]);
            } catch (err) {
              value[1][i] = err;
            }
          }
        }
        this._result[position] = value;
        if (--this.replyPending) {
          return;
        }
        if (this.isCluster) {
          let retriable = true;
          let commonError;
          for (let i = 0; i < this._result.length; ++i) {
            const error = this._result[i][0];
            const command = this._queue[i];
            if (error) {
              if (command.name === "exec" && error.message === "EXECABORT Transaction discarded because of previous errors.") {
                continue;
              }
              if (!commonError) {
                commonError = {
                  name: error.name,
                  message: error.message
                };
              } else if (commonError.name !== error.name || commonError.message !== error.message) {
                retriable = false;
                break;
              }
            } else if (!command.inTransaction) {
              const isReadOnly = (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "readonly");
              if (!isReadOnly) {
                retriable = false;
                break;
              }
            }
          }
          if (commonError && retriable) {
            const _this = this;
            const errv = commonError.message.split(" ");
            const queue = this._queue;
            let inTransaction = false;
            this._queue = [];
            for (let i = 0; i < queue.length; ++i) {
              if (errv[0] === "ASK" && !inTransaction && queue[i].name !== "asking" && (!queue[i - 1] || queue[i - 1].name !== "asking")) {
                const asking = new Command_1.default("asking");
                asking.ignore = true;
                this.sendCommand(asking);
              }
              queue[i].initPromise();
              this.sendCommand(queue[i]);
              inTransaction = queue[i].inTransaction;
            }
            let matched = true;
            if (typeof this.leftRedirections === "undefined") {
              this.leftRedirections = {};
            }
            const exec = function() {
              _this.exec();
            };
            const cluster = this.redis;
            cluster.handleError(commonError, this.leftRedirections, {
              moved: function(_slot, key) {
                _this.preferKey = key;
                cluster.slots[errv[1]] = [key];
                cluster._groupsBySlot[errv[1]] = cluster._groupsIds[cluster.slots[errv[1]].join(";")];
                cluster.refreshSlotsCache();
                _this.exec();
              },
              ask: function(_slot, key) {
                _this.preferKey = key;
                _this.exec();
              },
              tryagain: exec,
              clusterDown: exec,
              connectionClosed: exec,
              maxRedirections: () => {
                matched = false;
              },
              defaults: () => {
                matched = false;
              }
            });
            if (matched) {
              return;
            }
          }
        }
        let ignoredCount = 0;
        for (let i = 0; i < this._queue.length - ignoredCount; ++i) {
          if (this._queue[i + ignoredCount].ignore) {
            ignoredCount += 1;
          }
          this._result[i] = this._result[i + ignoredCount];
        }
        this.resolve(this._result.slice(0, this._result.length - ignoredCount));
      }
      sendCommand(command) {
        if (this._transactions > 0) {
          command.inTransaction = true;
        }
        const position = this._queue.length;
        command.pipelineIndex = position;
        command.promise.then((result) => {
          this.fillResult([null, result], position);
        }).catch((error) => {
          this.fillResult([error], position);
        });
        this._queue.push(command);
        return this;
      }
      addBatch(commands) {
        let command, commandName, args;
        for (let i = 0; i < commands.length; ++i) {
          command = commands[i];
          commandName = command[0];
          args = command.slice(1);
          this[commandName].apply(this, args);
        }
        return this;
      }
    };
    exports2.default = Pipeline;
    var multi = Pipeline.prototype.multi;
    Pipeline.prototype.multi = function() {
      this._transactions += 1;
      return multi.apply(this, arguments);
    };
    var execBuffer = Pipeline.prototype.execBuffer;
    Pipeline.prototype.execBuffer = (0, util_1.deprecate)(function() {
      if (this._transactions > 0) {
        this._transactions -= 1;
      }
      return execBuffer.apply(this, arguments);
    }, "Pipeline#execBuffer: Use Pipeline#exec instead");
    Pipeline.prototype.exec = function(callback) {
      if (this.isCluster && !this.redis.slots.length) {
        if (this.redis.status === "wait")
          this.redis.connect().catch(utils_1.noop);
        if (callback && !this.nodeifiedPromise) {
          this.nodeifiedPromise = true;
          (0, standard_as_callback_1.default)(this.promise, callback);
        }
        this.redis.delayUntilReady((err) => {
          if (err) {
            this.reject(err);
            return;
          }
          this.exec(callback);
        });
        return this.promise;
      }
      if (this._transactions > 0) {
        this._transactions -= 1;
        return execBuffer.apply(this, arguments);
      }
      if (!this.nodeifiedPromise) {
        this.nodeifiedPromise = true;
        (0, standard_as_callback_1.default)(this.promise, callback);
      }
      if (!this._queue.length) {
        this.resolve([]);
      }
      let pipelineSlot;
      if (this.isCluster) {
        const sampleKeys = [];
        for (let i = 0; i < this._queue.length; i++) {
          const keys4 = this._queue[i].getKeys();
          if (keys4.length) {
            sampleKeys.push(keys4[0]);
          }
          if (keys4.length && calculateSlot.generateMulti(keys4) < 0) {
            this.reject(new Error("All the keys in a pipeline command should belong to the same slot"));
            return this.promise;
          }
        }
        if (sampleKeys.length) {
          pipelineSlot = generateMultiWithNodes(this.redis, sampleKeys);
          if (pipelineSlot < 0) {
            this.reject(new Error("All keys in the pipeline should belong to the same slots allocation group"));
            return this.promise;
          }
        } else {
          pipelineSlot = Math.random() * 16384 | 0;
        }
      }
      const _this = this;
      execPipeline();
      return this.promise;
      function execPipeline() {
        let writePending = _this.replyPending = _this._queue.length;
        let node;
        if (_this.isCluster) {
          node = {
            slot: pipelineSlot,
            redis: _this.redis.connectionPool.nodes.all[_this.preferKey]
          };
        }
        let data = "";
        let buffers;
        const stream = {
          isPipeline: true,
          destination: _this.isCluster ? node : { redis: _this.redis },
          write(writable) {
            if (typeof writable !== "string") {
              if (!buffers) {
                buffers = [];
              }
              if (data) {
                buffers.push(Buffer.from(data, "utf8"));
                data = "";
              }
              buffers.push(writable);
            } else {
              data += writable;
            }
            if (!--writePending) {
              if (buffers) {
                if (data) {
                  buffers.push(Buffer.from(data, "utf8"));
                }
                stream.destination.redis.stream.write(Buffer.concat(buffers));
              } else {
                stream.destination.redis.stream.write(data);
              }
              writePending = _this._queue.length;
              data = "";
              buffers = void 0;
            }
          }
        };
        for (let i = 0; i < _this._queue.length; ++i) {
          _this.redis.sendCommand(_this._queue[i], stream, node);
        }
        return _this.promise;
      }
    };
  }
});

// node_modules/ioredis/built/transaction.js
var require_transaction = __commonJS({
  "node_modules/ioredis/built/transaction.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addTransactionSupport = void 0;
    var utils_1 = require_utils2();
    var standard_as_callback_1 = require_built2();
    var Pipeline_1 = require_Pipeline();
    function addTransactionSupport(redis) {
      redis.pipeline = function(commands) {
        const pipeline = new Pipeline_1.default(this);
        if (Array.isArray(commands)) {
          pipeline.addBatch(commands);
        }
        return pipeline;
      };
      const { multi } = redis;
      redis.multi = function(commands, options) {
        if (typeof options === "undefined" && !Array.isArray(commands)) {
          options = commands;
          commands = null;
        }
        if (options && options.pipeline === false) {
          return multi.call(this);
        }
        const pipeline = new Pipeline_1.default(this);
        pipeline.multi();
        if (Array.isArray(commands)) {
          pipeline.addBatch(commands);
        }
        const exec2 = pipeline.exec;
        pipeline.exec = function(callback) {
          if (this.isCluster && !this.redis.slots.length) {
            if (this.redis.status === "wait")
              this.redis.connect().catch(utils_1.noop);
            return (0, standard_as_callback_1.default)(new Promise((resolve, reject) => {
              this.redis.delayUntilReady((err) => {
                if (err) {
                  reject(err);
                  return;
                }
                this.exec(pipeline).then(resolve, reject);
              });
            }), callback);
          }
          if (this._transactions > 0) {
            exec2.call(pipeline);
          }
          if (this.nodeifiedPromise) {
            return exec2.call(pipeline);
          }
          const promise = exec2.call(pipeline);
          return (0, standard_as_callback_1.default)(promise.then(function(result) {
            const execResult = result[result.length - 1];
            if (typeof execResult === "undefined") {
              throw new Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");
            }
            if (execResult[0]) {
              execResult[0].previousErrors = [];
              for (let i = 0; i < result.length - 1; ++i) {
                if (result[i][0]) {
                  execResult[0].previousErrors.push(result[i][0]);
                }
              }
              throw execResult[0];
            }
            return (0, utils_1.wrapMultiResult)(execResult[1]);
          }), callback);
        };
        const { execBuffer } = pipeline;
        pipeline.execBuffer = function(callback) {
          if (this._transactions > 0) {
            execBuffer.call(pipeline);
          }
          return pipeline.exec(callback);
        };
        return pipeline;
      };
      const { exec } = redis;
      redis.exec = function(callback) {
        return (0, standard_as_callback_1.default)(exec.call(this).then(function(results) {
          if (Array.isArray(results)) {
            results = (0, utils_1.wrapMultiResult)(results);
          }
          return results;
        }), callback);
      };
    }
    exports2.addTransactionSupport = addTransactionSupport;
  }
});

// node_modules/ioredis/built/utils/applyMixin.js
var require_applyMixin = __commonJS({
  "node_modules/ioredis/built/utils/applyMixin.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function applyMixin(derivedConstructor, mixinConstructor) {
      Object.getOwnPropertyNames(mixinConstructor.prototype).forEach((name) => {
        Object.defineProperty(derivedConstructor.prototype, name, Object.getOwnPropertyDescriptor(mixinConstructor.prototype, name));
      });
    }
    exports2.default = applyMixin;
  }
});

// node_modules/ioredis/built/cluster/ClusterOptions.js
var require_ClusterOptions = __commonJS({
  "node_modules/ioredis/built/cluster/ClusterOptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DEFAULT_CLUSTER_OPTIONS = void 0;
    var dns_1 = require("dns");
    exports2.DEFAULT_CLUSTER_OPTIONS = {
      clusterRetryStrategy: (times) => Math.min(100 + times * 2, 2e3),
      enableOfflineQueue: true,
      enableReadyCheck: true,
      scaleReads: "master",
      maxRedirections: 16,
      retryDelayOnMoved: 0,
      retryDelayOnFailover: 100,
      retryDelayOnClusterDown: 100,
      retryDelayOnTryAgain: 100,
      slotsRefreshTimeout: 1e3,
      useSRVRecords: false,
      resolveSrv: dns_1.resolveSrv,
      dnsLookup: dns_1.lookup,
      enableAutoPipelining: false,
      autoPipeliningIgnoredCommands: []
    };
  }
});

// node_modules/ioredis/built/cluster/util.js
var require_util = __commonJS({
  "node_modules/ioredis/built/cluster/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getConnectionName = exports2.weightSrvRecords = exports2.groupSrvRecords = exports2.getUniqueHostnamesFromOptions = exports2.normalizeNodeOptions = exports2.nodeKeyToRedisOptions = exports2.getNodeKey = void 0;
    var utils_1 = require_utils2();
    var net_1 = require("net");
    function getNodeKey(node) {
      node.port = node.port || 6379;
      node.host = node.host || "127.0.0.1";
      return node.host + ":" + node.port;
    }
    exports2.getNodeKey = getNodeKey;
    function nodeKeyToRedisOptions(nodeKey) {
      const portIndex = nodeKey.lastIndexOf(":");
      if (portIndex === -1) {
        throw new Error(`Invalid node key ${nodeKey}`);
      }
      return {
        host: nodeKey.slice(0, portIndex),
        port: Number(nodeKey.slice(portIndex + 1))
      };
    }
    exports2.nodeKeyToRedisOptions = nodeKeyToRedisOptions;
    function normalizeNodeOptions(nodes) {
      return nodes.map((node) => {
        const options = {};
        if (typeof node === "object") {
          Object.assign(options, node);
        } else if (typeof node === "string") {
          Object.assign(options, (0, utils_1.parseURL)(node));
        } else if (typeof node === "number") {
          options.port = node;
        } else {
          throw new Error("Invalid argument " + node);
        }
        if (typeof options.port === "string") {
          options.port = parseInt(options.port, 10);
        }
        delete options.db;
        if (!options.port) {
          options.port = 6379;
        }
        if (!options.host) {
          options.host = "127.0.0.1";
        }
        return (0, utils_1.resolveTLSProfile)(options);
      });
    }
    exports2.normalizeNodeOptions = normalizeNodeOptions;
    function getUniqueHostnamesFromOptions(nodes) {
      const uniqueHostsMap = {};
      nodes.forEach((node) => {
        uniqueHostsMap[node.host] = true;
      });
      return Object.keys(uniqueHostsMap).filter((host) => !(0, net_1.isIP)(host));
    }
    exports2.getUniqueHostnamesFromOptions = getUniqueHostnamesFromOptions;
    function groupSrvRecords(records) {
      const recordsByPriority = {};
      for (const record of records) {
        if (!recordsByPriority.hasOwnProperty(record.priority)) {
          recordsByPriority[record.priority] = {
            totalWeight: record.weight,
            records: [record]
          };
        } else {
          recordsByPriority[record.priority].totalWeight += record.weight;
          recordsByPriority[record.priority].records.push(record);
        }
      }
      return recordsByPriority;
    }
    exports2.groupSrvRecords = groupSrvRecords;
    function weightSrvRecords(recordsGroup) {
      if (recordsGroup.records.length === 1) {
        recordsGroup.totalWeight = 0;
        return recordsGroup.records.shift();
      }
      const random = Math.floor(Math.random() * (recordsGroup.totalWeight + recordsGroup.records.length));
      let total = 0;
      for (const [i, record] of recordsGroup.records.entries()) {
        total += 1 + record.weight;
        if (total > random) {
          recordsGroup.totalWeight -= record.weight;
          recordsGroup.records.splice(i, 1);
          return record;
        }
      }
    }
    exports2.weightSrvRecords = weightSrvRecords;
    function getConnectionName(component, nodeConnectionName) {
      const prefix = `ioredis-cluster(${component})`;
      return nodeConnectionName ? `${prefix}:${nodeConnectionName}` : prefix;
    }
    exports2.getConnectionName = getConnectionName;
  }
});

// node_modules/ioredis/built/cluster/ClusterSubscriber.js
var require_ClusterSubscriber = __commonJS({
  "node_modules/ioredis/built/cluster/ClusterSubscriber.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var utils_1 = require_utils2();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:subscriber");
    var ClusterSubscriber = class {
      constructor(connectionPool, emitter) {
        this.connectionPool = connectionPool;
        this.emitter = emitter;
        this.started = false;
        this.subscriber = null;
        this.onSubscriberEnd = () => {
          if (!this.started) {
            debug("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");
            return;
          }
          debug("subscriber has disconnected, selecting a new one...");
          this.selectSubscriber();
        };
        this.connectionPool.on("-node", (_, key) => {
          if (!this.started || !this.subscriber) {
            return;
          }
          if ((0, util_1.getNodeKey)(this.subscriber.options) === key) {
            debug("subscriber has left, selecting a new one...");
            this.selectSubscriber();
          }
        });
        this.connectionPool.on("+node", () => {
          if (!this.started || this.subscriber) {
            return;
          }
          debug("a new node is discovered and there is no subscriber, selecting a new one...");
          this.selectSubscriber();
        });
      }
      getInstance() {
        return this.subscriber;
      }
      start() {
        this.started = true;
        this.selectSubscriber();
        debug("started");
      }
      stop() {
        this.started = false;
        if (this.subscriber) {
          this.subscriber.disconnect();
          this.subscriber = null;
        }
        debug("stopped");
      }
      selectSubscriber() {
        const lastActiveSubscriber = this.lastActiveSubscriber;
        if (lastActiveSubscriber) {
          lastActiveSubscriber.off("end", this.onSubscriberEnd);
          lastActiveSubscriber.disconnect();
        }
        if (this.subscriber) {
          this.subscriber.off("end", this.onSubscriberEnd);
          this.subscriber.disconnect();
        }
        const sampleNode = (0, utils_1.sample)(this.connectionPool.getNodes());
        if (!sampleNode) {
          debug("selecting subscriber failed since there is no node discovered in the cluster yet");
          this.subscriber = null;
          return;
        }
        const { options } = sampleNode;
        debug("selected a subscriber %s:%s", options.host, options.port);
        this.subscriber = new Redis_1.default({
          port: options.port,
          host: options.host,
          username: options.username,
          password: options.password,
          enableReadyCheck: true,
          connectionName: (0, util_1.getConnectionName)("subscriber", options.connectionName),
          lazyConnect: true,
          tls: options.tls,
          // Don't try to reconnect the subscriber connection. If the connection fails
          // we will get an end event (handled below), at which point we'll pick a new
          // node from the pool and try to connect to that as the subscriber connection.
          retryStrategy: null
        });
        this.subscriber.on("error", utils_1.noop);
        this.subscriber.once("end", this.onSubscriberEnd);
        const previousChannels = { subscribe: [], psubscribe: [], ssubscribe: [] };
        if (lastActiveSubscriber) {
          const condition = lastActiveSubscriber.condition || lastActiveSubscriber.prevCondition;
          if (condition && condition.subscriber) {
            previousChannels.subscribe = condition.subscriber.channels("subscribe");
            previousChannels.psubscribe = condition.subscriber.channels("psubscribe");
            previousChannels.ssubscribe = condition.subscriber.channels("ssubscribe");
          }
        }
        if (previousChannels.subscribe.length || previousChannels.psubscribe.length || previousChannels.ssubscribe.length) {
          let pending = 0;
          for (const type3 of ["subscribe", "psubscribe", "ssubscribe"]) {
            const channels = previousChannels[type3];
            if (channels.length) {
              pending += 1;
              debug("%s %d channels", type3, channels.length);
              this.subscriber[type3](channels).then(() => {
                if (!--pending) {
                  this.lastActiveSubscriber = this.subscriber;
                }
              }).catch(() => {
                debug("failed to %s %d channels", type3, channels.length);
              });
            }
          }
        } else {
          this.lastActiveSubscriber = this.subscriber;
        }
        for (const event of [
          "message",
          "messageBuffer",
          "smessage",
          "smessageBuffer"
        ]) {
          this.subscriber.on(event, (arg1, arg2) => {
            this.emitter.emit(event, arg1, arg2);
          });
        }
        for (const event of ["pmessage", "pmessageBuffer"]) {
          this.subscriber.on(event, (arg1, arg2, arg3) => {
            this.emitter.emit(event, arg1, arg2, arg3);
          });
        }
      }
    };
    exports2.default = ClusterSubscriber;
  }
});

// node_modules/ioredis/built/cluster/ConnectionPool.js
var require_ConnectionPool = __commonJS({
  "node_modules/ioredis/built/cluster/ConnectionPool.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var events_1 = require("events");
    var utils_1 = require_utils2();
    var util_1 = require_util();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:connectionPool");
    var ConnectionPool = class extends events_1.EventEmitter {
      constructor(redisOptions) {
        super();
        this.redisOptions = redisOptions;
        this.nodes = {
          all: {},
          master: {},
          slave: {}
        };
        this.specifiedOptions = {};
      }
      getNodes(role = "all") {
        const nodes = this.nodes[role];
        return Object.keys(nodes).map((key) => nodes[key]);
      }
      getInstanceByKey(key) {
        return this.nodes.all[key];
      }
      getSampleInstance(role) {
        const keys4 = Object.keys(this.nodes[role]);
        const sampleKey = (0, utils_1.sample)(keys4);
        return this.nodes[role][sampleKey];
      }
      /**
       * Find or create a connection to the node
       */
      findOrCreate(node, readOnly = false) {
        const key = (0, util_1.getNodeKey)(node);
        readOnly = Boolean(readOnly);
        if (this.specifiedOptions[key]) {
          Object.assign(node, this.specifiedOptions[key]);
        } else {
          this.specifiedOptions[key] = node;
        }
        let redis;
        if (this.nodes.all[key]) {
          redis = this.nodes.all[key];
          if (redis.options.readOnly !== readOnly) {
            redis.options.readOnly = readOnly;
            debug("Change role of %s to %s", key, readOnly ? "slave" : "master");
            redis[readOnly ? "readonly" : "readwrite"]().catch(utils_1.noop);
            if (readOnly) {
              delete this.nodes.master[key];
              this.nodes.slave[key] = redis;
            } else {
              delete this.nodes.slave[key];
              this.nodes.master[key] = redis;
            }
          }
        } else {
          debug("Connecting to %s as %s", key, readOnly ? "slave" : "master");
          redis = new Redis_1.default((0, utils_1.defaults)({
            // Never try to reconnect when a node is lose,
            // instead, waiting for a `MOVED` error and
            // fetch the slots again.
            retryStrategy: null,
            // Offline queue should be enabled so that
            // we don't need to wait for the `ready` event
            // before sending commands to the node.
            enableOfflineQueue: true,
            readOnly
          }, node, this.redisOptions, { lazyConnect: true }));
          this.nodes.all[key] = redis;
          this.nodes[readOnly ? "slave" : "master"][key] = redis;
          redis.once("end", () => {
            this.removeNode(key);
            this.emit("-node", redis, key);
            if (!Object.keys(this.nodes.all).length) {
              this.emit("drain");
            }
          });
          this.emit("+node", redis, key);
          redis.on("error", function(error) {
            this.emit("nodeError", error, key);
          });
        }
        return redis;
      }
      /**
       * Reset the pool with a set of nodes.
       * The old node will be removed.
       */
      reset(nodes) {
        debug("Reset with %O", nodes);
        const newNodes = {};
        nodes.forEach((node) => {
          const key = (0, util_1.getNodeKey)(node);
          if (!(node.readOnly && newNodes[key])) {
            newNodes[key] = node;
          }
        });
        Object.keys(this.nodes.all).forEach((key) => {
          if (!newNodes[key]) {
            debug("Disconnect %s because the node does not hold any slot", key);
            this.nodes.all[key].disconnect();
            this.removeNode(key);
          }
        });
        Object.keys(newNodes).forEach((key) => {
          const node = newNodes[key];
          this.findOrCreate(node, node.readOnly);
        });
      }
      /**
       * Remove a node from the pool.
       */
      removeNode(key) {
        const { nodes } = this;
        if (nodes.all[key]) {
          debug("Remove %s from the pool", key);
          delete nodes.all[key];
        }
        delete nodes.master[key];
        delete nodes.slave[key];
      }
    };
    exports2.default = ConnectionPool;
  }
});

// node_modules/denque/index.js
var require_denque = __commonJS({
  "node_modules/denque/index.js"(exports2, module2) {
    "use strict";
    function Denque(array, options) {
      var options = options || {};
      this._capacity = options.capacity;
      this._head = 0;
      this._tail = 0;
      if (Array.isArray(array)) {
        this._fromArray(array);
      } else {
        this._capacityMask = 3;
        this._list = new Array(4);
      }
    }
    Denque.prototype.peekAt = function peekAt(index) {
      var i = index;
      if (i !== (i | 0)) {
        return void 0;
      }
      var len = this.size();
      if (i >= len || i < -len)
        return void 0;
      if (i < 0)
        i += len;
      i = this._head + i & this._capacityMask;
      return this._list[i];
    };
    Denque.prototype.get = function get(i) {
      return this.peekAt(i);
    };
    Denque.prototype.peek = function peek() {
      if (this._head === this._tail)
        return void 0;
      return this._list[this._head];
    };
    Denque.prototype.peekFront = function peekFront() {
      return this.peek();
    };
    Denque.prototype.peekBack = function peekBack() {
      return this.peekAt(-1);
    };
    Object.defineProperty(Denque.prototype, "length", {
      get: function length() {
        return this.size();
      }
    });
    Denque.prototype.size = function size() {
      if (this._head === this._tail)
        return 0;
      if (this._head < this._tail)
        return this._tail - this._head;
      else
        return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.unshift = function unshift(item) {
      if (arguments.length === 0)
        return this.size();
      var len = this._list.length;
      this._head = this._head - 1 + len & this._capacityMask;
      this._list[this._head] = item;
      if (this._tail === this._head)
        this._growArray();
      if (this._capacity && this.size() > this._capacity)
        this.pop();
      if (this._head < this._tail)
        return this._tail - this._head;
      else
        return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.shift = function shift() {
      var head = this._head;
      if (head === this._tail)
        return void 0;
      var item = this._list[head];
      this._list[head] = void 0;
      this._head = head + 1 & this._capacityMask;
      if (head < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2)
        this._shrinkArray();
      return item;
    };
    Denque.prototype.push = function push(item) {
      if (arguments.length === 0)
        return this.size();
      var tail = this._tail;
      this._list[tail] = item;
      this._tail = tail + 1 & this._capacityMask;
      if (this._tail === this._head) {
        this._growArray();
      }
      if (this._capacity && this.size() > this._capacity) {
        this.shift();
      }
      if (this._head < this._tail)
        return this._tail - this._head;
      else
        return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.pop = function pop() {
      var tail = this._tail;
      if (tail === this._head)
        return void 0;
      var len = this._list.length;
      this._tail = tail - 1 + len & this._capacityMask;
      var item = this._list[this._tail];
      this._list[this._tail] = void 0;
      if (this._head < 2 && tail > 1e4 && tail <= len >>> 2)
        this._shrinkArray();
      return item;
    };
    Denque.prototype.removeOne = function removeOne(index) {
      var i = index;
      if (i !== (i | 0)) {
        return void 0;
      }
      if (this._head === this._tail)
        return void 0;
      var size = this.size();
      var len = this._list.length;
      if (i >= size || i < -size)
        return void 0;
      if (i < 0)
        i += size;
      i = this._head + i & this._capacityMask;
      var item = this._list[i];
      var k;
      if (index < size / 2) {
        for (k = index; k > 0; k--) {
          this._list[i] = this._list[i = i - 1 + len & this._capacityMask];
        }
        this._list[i] = void 0;
        this._head = this._head + 1 + len & this._capacityMask;
      } else {
        for (k = size - 1 - index; k > 0; k--) {
          this._list[i] = this._list[i = i + 1 + len & this._capacityMask];
        }
        this._list[i] = void 0;
        this._tail = this._tail - 1 + len & this._capacityMask;
      }
      return item;
    };
    Denque.prototype.remove = function remove(index, count) {
      var i = index;
      var removed;
      var del_count = count;
      if (i !== (i | 0)) {
        return void 0;
      }
      if (this._head === this._tail)
        return void 0;
      var size = this.size();
      var len = this._list.length;
      if (i >= size || i < -size || count < 1)
        return void 0;
      if (i < 0)
        i += size;
      if (count === 1 || !count) {
        removed = new Array(1);
        removed[0] = this.removeOne(i);
        return removed;
      }
      if (i === 0 && i + count >= size) {
        removed = this.toArray();
        this.clear();
        return removed;
      }
      if (i + count > size)
        count = size - i;
      var k;
      removed = new Array(count);
      for (k = 0; k < count; k++) {
        removed[k] = this._list[this._head + i + k & this._capacityMask];
      }
      i = this._head + i & this._capacityMask;
      if (index + count === size) {
        this._tail = this._tail - count + len & this._capacityMask;
        for (k = count; k > 0; k--) {
          this._list[i = i + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
      }
      if (index === 0) {
        this._head = this._head + count + len & this._capacityMask;
        for (k = count - 1; k > 0; k--) {
          this._list[i = i + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
      }
      if (i < size / 2) {
        this._head = this._head + index + count + len & this._capacityMask;
        for (k = index; k > 0; k--) {
          this.unshift(this._list[i = i - 1 + len & this._capacityMask]);
        }
        i = this._head - 1 + len & this._capacityMask;
        while (del_count > 0) {
          this._list[i = i - 1 + len & this._capacityMask] = void 0;
          del_count--;
        }
        if (index < 0)
          this._tail = i;
      } else {
        this._tail = i;
        i = i + count + len & this._capacityMask;
        for (k = size - (count + index); k > 0; k--) {
          this.push(this._list[i++]);
        }
        i = this._tail;
        while (del_count > 0) {
          this._list[i = i + 1 + len & this._capacityMask] = void 0;
          del_count--;
        }
      }
      if (this._head < 2 && this._tail > 1e4 && this._tail <= len >>> 2)
        this._shrinkArray();
      return removed;
    };
    Denque.prototype.splice = function splice(index, count) {
      var i = index;
      if (i !== (i | 0)) {
        return void 0;
      }
      var size = this.size();
      if (i < 0)
        i += size;
      if (i > size)
        return void 0;
      if (arguments.length > 2) {
        var k;
        var temp;
        var removed;
        var arg_len = arguments.length;
        var len = this._list.length;
        var arguments_index = 2;
        if (!size || i < size / 2) {
          temp = new Array(i);
          for (k = 0; k < i; k++) {
            temp[k] = this._list[this._head + k & this._capacityMask];
          }
          if (count === 0) {
            removed = [];
            if (i > 0) {
              this._head = this._head + i + len & this._capacityMask;
            }
          } else {
            removed = this.remove(i, count);
            this._head = this._head + i + len & this._capacityMask;
          }
          while (arg_len > arguments_index) {
            this.unshift(arguments[--arg_len]);
          }
          for (k = i; k > 0; k--) {
            this.unshift(temp[k - 1]);
          }
        } else {
          temp = new Array(size - (i + count));
          var leng = temp.length;
          for (k = 0; k < leng; k++) {
            temp[k] = this._list[this._head + i + count + k & this._capacityMask];
          }
          if (count === 0) {
            removed = [];
            if (i != size) {
              this._tail = this._head + i + len & this._capacityMask;
            }
          } else {
            removed = this.remove(i, count);
            this._tail = this._tail - leng + len & this._capacityMask;
          }
          while (arguments_index < arg_len) {
            this.push(arguments[arguments_index++]);
          }
          for (k = 0; k < leng; k++) {
            this.push(temp[k]);
          }
        }
        return removed;
      } else {
        return this.remove(i, count);
      }
    };
    Denque.prototype.clear = function clear() {
      this._list = new Array(this._list.length);
      this._head = 0;
      this._tail = 0;
    };
    Denque.prototype.isEmpty = function isEmpty() {
      return this._head === this._tail;
    };
    Denque.prototype.toArray = function toArray() {
      return this._copyArray(false);
    };
    Denque.prototype._fromArray = function _fromArray(array) {
      var length = array.length;
      var capacity = this._nextPowerOf2(length);
      this._list = new Array(capacity);
      this._capacityMask = capacity - 1;
      this._tail = length;
      for (var i = 0; i < length; i++)
        this._list[i] = array[i];
    };
    Denque.prototype._copyArray = function _copyArray(fullCopy, size) {
      var src = this._list;
      var capacity = src.length;
      var length = this.length;
      size = size | length;
      if (size == length && this._head < this._tail) {
        return this._list.slice(this._head, this._tail);
      }
      var dest = new Array(size);
      var k = 0;
      var i;
      if (fullCopy || this._head > this._tail) {
        for (i = this._head; i < capacity; i++)
          dest[k++] = src[i];
        for (i = 0; i < this._tail; i++)
          dest[k++] = src[i];
      } else {
        for (i = this._head; i < this._tail; i++)
          dest[k++] = src[i];
      }
      return dest;
    };
    Denque.prototype._growArray = function _growArray() {
      if (this._head != 0) {
        var newList = this._copyArray(true, this._list.length << 1);
        this._tail = this._list.length;
        this._head = 0;
        this._list = newList;
      } else {
        this._tail = this._list.length;
        this._list.length <<= 1;
      }
      this._capacityMask = this._capacityMask << 1 | 1;
    };
    Denque.prototype._shrinkArray = function _shrinkArray() {
      this._list.length >>>= 1;
      this._capacityMask >>>= 1;
    };
    Denque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {
      var log2 = Math.log(num) / Math.log(2);
      var nextPow2 = 1 << log2 + 1;
      return Math.max(nextPow2, 4);
    };
    module2.exports = Denque;
  }
});

// node_modules/ioredis/built/cluster/DelayQueue.js
var require_DelayQueue = __commonJS({
  "node_modules/ioredis/built/cluster/DelayQueue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("delayqueue");
    var DelayQueue = class {
      constructor() {
        this.queues = {};
        this.timeouts = {};
      }
      /**
       * Add a new item to the queue
       *
       * @param bucket bucket name
       * @param item function that will run later
       * @param options
       */
      push(bucket, item, options) {
        const callback = options.callback || process.nextTick;
        if (!this.queues[bucket]) {
          this.queues[bucket] = new Deque();
        }
        const queue = this.queues[bucket];
        queue.push(item);
        if (!this.timeouts[bucket]) {
          this.timeouts[bucket] = setTimeout(() => {
            callback(() => {
              this.timeouts[bucket] = null;
              this.execute(bucket);
            });
          }, options.timeout);
        }
      }
      execute(bucket) {
        const queue = this.queues[bucket];
        if (!queue) {
          return;
        }
        const { length } = queue;
        if (!length) {
          return;
        }
        debug("send %d commands in %s queue", length, bucket);
        this.queues[bucket] = null;
        while (queue.length > 0) {
          queue.shift()();
        }
      }
    };
    exports2.default = DelayQueue;
  }
});

// node_modules/ioredis/built/cluster/index.js
var require_cluster = __commonJS({
  "node_modules/ioredis/built/cluster/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var commands_1 = require_built();
    var events_1 = require("events");
    var redis_errors_1 = require_redis_errors();
    var standard_as_callback_1 = require_built2();
    var Command_1 = require_Command();
    var ClusterAllFailedError_1 = require_ClusterAllFailedError();
    var Redis_1 = require_Redis();
    var ScanStream_1 = require_ScanStream();
    var transaction_1 = require_transaction();
    var utils_1 = require_utils2();
    var applyMixin_1 = require_applyMixin();
    var Commander_1 = require_Commander();
    var ClusterOptions_1 = require_ClusterOptions();
    var ClusterSubscriber_1 = require_ClusterSubscriber();
    var ConnectionPool_1 = require_ConnectionPool();
    var DelayQueue_1 = require_DelayQueue();
    var util_1 = require_util();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("cluster");
    var REJECT_OVERWRITTEN_COMMANDS = /* @__PURE__ */ new WeakSet();
    var Cluster = class _Cluster extends Commander_1.default {
      /**
       * Creates an instance of Cluster.
       */
      constructor(startupNodes, options = {}) {
        super();
        this.slots = [];
        this._groupsIds = {};
        this._groupsBySlot = Array(16384);
        this.isCluster = true;
        this.retryAttempts = 0;
        this.delayQueue = new DelayQueue_1.default();
        this.offlineQueue = new Deque();
        this.isRefreshing = false;
        this._autoPipelines = /* @__PURE__ */ new Map();
        this._runningAutoPipelines = /* @__PURE__ */ new Set();
        this._readyDelayedCallbacks = [];
        this.connectionEpoch = 0;
        events_1.EventEmitter.call(this);
        this.startupNodes = startupNodes;
        this.options = (0, utils_1.defaults)({}, options, ClusterOptions_1.DEFAULT_CLUSTER_OPTIONS, this.options);
        if (this.options.redisOptions && this.options.redisOptions.keyPrefix && !this.options.keyPrefix) {
          this.options.keyPrefix = this.options.redisOptions.keyPrefix;
        }
        if (typeof this.options.scaleReads !== "function" && ["all", "master", "slave"].indexOf(this.options.scaleReads) === -1) {
          throw new Error('Invalid option scaleReads "' + this.options.scaleReads + '". Expected "all", "master", "slave" or a custom function');
        }
        this.connectionPool = new ConnectionPool_1.default(this.options.redisOptions);
        this.connectionPool.on("-node", (redis, key) => {
          this.emit("-node", redis);
        });
        this.connectionPool.on("+node", (redis) => {
          this.emit("+node", redis);
        });
        this.connectionPool.on("drain", () => {
          this.setStatus("close");
        });
        this.connectionPool.on("nodeError", (error, key) => {
          this.emit("node error", error, key);
        });
        this.subscriber = new ClusterSubscriber_1.default(this.connectionPool, this);
        if (this.options.scripts) {
          Object.entries(this.options.scripts).forEach(([name, definition]) => {
            this.defineCommand(name, definition);
          });
        }
        if (this.options.lazyConnect) {
          this.setStatus("wait");
        } else {
          this.connect().catch((err) => {
            debug("connecting failed: %s", err);
          });
        }
      }
      /**
       * Connect to a cluster
       */
      connect() {
        return new Promise((resolve, reject) => {
          if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
            reject(new Error("Redis is already connecting/connected"));
            return;
          }
          const epoch = ++this.connectionEpoch;
          this.setStatus("connecting");
          this.resolveStartupNodeHostnames().then((nodes) => {
            if (this.connectionEpoch !== epoch) {
              debug("discard connecting after resolving startup nodes because epoch not match: %d != %d", epoch, this.connectionEpoch);
              reject(new redis_errors_1.RedisError("Connection is discarded because a new connection is made"));
              return;
            }
            if (this.status !== "connecting") {
              debug("discard connecting after resolving startup nodes because the status changed to %s", this.status);
              reject(new redis_errors_1.RedisError("Connection is aborted"));
              return;
            }
            this.connectionPool.reset(nodes);
            const readyHandler = () => {
              this.setStatus("ready");
              this.retryAttempts = 0;
              this.executeOfflineCommands();
              this.resetNodesRefreshInterval();
              resolve();
            };
            let closeListener = void 0;
            const refreshListener = () => {
              this.invokeReadyDelayedCallbacks(void 0);
              this.removeListener("close", closeListener);
              this.manuallyClosing = false;
              this.setStatus("connect");
              if (this.options.enableReadyCheck) {
                this.readyCheck((err, fail) => {
                  if (err || fail) {
                    debug("Ready check failed (%s). Reconnecting...", err || fail);
                    if (this.status === "connect") {
                      this.disconnect(true);
                    }
                  } else {
                    readyHandler();
                  }
                });
              } else {
                readyHandler();
              }
            };
            closeListener = () => {
              const error = new Error("None of startup nodes is available");
              this.removeListener("refresh", refreshListener);
              this.invokeReadyDelayedCallbacks(error);
              reject(error);
            };
            this.once("refresh", refreshListener);
            this.once("close", closeListener);
            this.once("close", this.handleCloseEvent.bind(this));
            this.refreshSlotsCache((err) => {
              if (err && err.message === ClusterAllFailedError_1.default.defaultMessage) {
                Redis_1.default.prototype.silentEmit.call(this, "error", err);
                this.connectionPool.reset([]);
              }
            });
            this.subscriber.start();
          }).catch((err) => {
            this.setStatus("close");
            this.handleCloseEvent(err);
            this.invokeReadyDelayedCallbacks(err);
            reject(err);
          });
        });
      }
      /**
       * Disconnect from every node in the cluster.
       */
      disconnect(reconnect = false) {
        const status = this.status;
        this.setStatus("disconnecting");
        if (!reconnect) {
          this.manuallyClosing = true;
        }
        if (this.reconnectTimeout && !reconnect) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
          debug("Canceled reconnecting attempts");
        }
        this.clearNodesRefreshInterval();
        this.subscriber.stop();
        if (status === "wait") {
          this.setStatus("close");
          this.handleCloseEvent();
        } else {
          this.connectionPool.reset([]);
        }
      }
      /**
       * Quit the cluster gracefully.
       */
      quit(callback) {
        const status = this.status;
        this.setStatus("disconnecting");
        this.manuallyClosing = true;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        this.clearNodesRefreshInterval();
        this.subscriber.stop();
        if (status === "wait") {
          const ret = (0, standard_as_callback_1.default)(Promise.resolve("OK"), callback);
          setImmediate(function() {
            this.setStatus("close");
            this.handleCloseEvent();
          }.bind(this));
          return ret;
        }
        return (0, standard_as_callback_1.default)(Promise.all(this.nodes().map((node) => node.quit().catch((err) => {
          if (err.message === utils_1.CONNECTION_CLOSED_ERROR_MSG) {
            return "OK";
          }
          throw err;
        }))).then(() => "OK"), callback);
      }
      /**
       * Create a new instance with the same startup nodes and options as the current one.
       *
       * @example
       * ```js
       * var cluster = new Redis.Cluster([{ host: "127.0.0.1", port: "30001" }]);
       * var anotherCluster = cluster.duplicate();
       * ```
       */
      duplicate(overrideStartupNodes = [], overrideOptions = {}) {
        const startupNodes = overrideStartupNodes.length > 0 ? overrideStartupNodes : this.startupNodes.slice(0);
        const options = Object.assign({}, this.options, overrideOptions);
        return new _Cluster(startupNodes, options);
      }
      /**
       * Get nodes with the specified role
       */
      nodes(role = "all") {
        if (role !== "all" && role !== "master" && role !== "slave") {
          throw new Error('Invalid role "' + role + '". Expected "all", "master" or "slave"');
        }
        return this.connectionPool.getNodes(role);
      }
      /**
       * This is needed in order not to install a listener for each auto pipeline
       *
       * @ignore
       */
      delayUntilReady(callback) {
        this._readyDelayedCallbacks.push(callback);
      }
      /**
       * Get the number of commands queued in automatic pipelines.
       *
       * This is not available (and returns 0) until the cluster is connected and slots information have been received.
       */
      get autoPipelineQueueSize() {
        let queued = 0;
        for (const pipeline of this._autoPipelines.values()) {
          queued += pipeline.length;
        }
        return queued;
      }
      /**
       * Refresh the slot cache
       *
       * @ignore
       */
      refreshSlotsCache(callback) {
        if (this.isRefreshing) {
          if (callback) {
            process.nextTick(callback);
          }
          return;
        }
        this.isRefreshing = true;
        const _this = this;
        const wrapper = (error) => {
          this.isRefreshing = false;
          if (callback) {
            callback(error);
          }
        };
        const nodes = (0, utils_1.shuffle)(this.connectionPool.getNodes());
        let lastNodeError = null;
        function tryNode(index) {
          if (index === nodes.length) {
            const error = new ClusterAllFailedError_1.default(ClusterAllFailedError_1.default.defaultMessage, lastNodeError);
            return wrapper(error);
          }
          const node = nodes[index];
          const key = `${node.options.host}:${node.options.port}`;
          debug("getting slot cache from %s", key);
          _this.getInfoFromNode(node, function(err) {
            switch (_this.status) {
              case "close":
              case "end":
                return wrapper(new Error("Cluster is disconnected."));
              case "disconnecting":
                return wrapper(new Error("Cluster is disconnecting."));
            }
            if (err) {
              _this.emit("node error", err, key);
              lastNodeError = err;
              tryNode(index + 1);
            } else {
              _this.emit("refresh");
              wrapper();
            }
          });
        }
        tryNode(0);
      }
      /**
       * @ignore
       */
      sendCommand(command, stream, node) {
        if (this.status === "wait") {
          this.connect().catch(utils_1.noop);
        }
        if (this.status === "end") {
          command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          return command.promise;
        }
        let to = this.options.scaleReads;
        if (to !== "master") {
          const isCommandReadOnly = command.isReadOnly || (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "readonly");
          if (!isCommandReadOnly) {
            to = "master";
          }
        }
        let targetSlot = node ? node.slot : command.getSlot();
        const ttl = {};
        const _this = this;
        if (!node && !REJECT_OVERWRITTEN_COMMANDS.has(command)) {
          REJECT_OVERWRITTEN_COMMANDS.add(command);
          const reject = command.reject;
          command.reject = function(err) {
            const partialTry = tryConnection.bind(null, true);
            _this.handleError(err, ttl, {
              moved: function(slot, key) {
                debug("command %s is moved to %s", command.name, key);
                targetSlot = Number(slot);
                if (_this.slots[slot]) {
                  _this.slots[slot][0] = key;
                } else {
                  _this.slots[slot] = [key];
                }
                _this._groupsBySlot[slot] = _this._groupsIds[_this.slots[slot].join(";")];
                _this.connectionPool.findOrCreate(_this.natMapper(key));
                tryConnection();
                debug("refreshing slot caches... (triggered by MOVED error)");
                _this.refreshSlotsCache();
              },
              ask: function(slot, key) {
                debug("command %s is required to ask %s:%s", command.name, key);
                const mapped = _this.natMapper(key);
                _this.connectionPool.findOrCreate(mapped);
                tryConnection(false, `${mapped.host}:${mapped.port}`);
              },
              tryagain: partialTry,
              clusterDown: partialTry,
              connectionClosed: partialTry,
              maxRedirections: function(redirectionError) {
                reject.call(command, redirectionError);
              },
              defaults: function() {
                reject.call(command, err);
              }
            });
          };
        }
        tryConnection();
        function tryConnection(random, asking) {
          if (_this.status === "end") {
            command.reject(new redis_errors_1.AbortError("Cluster is ended."));
            return;
          }
          let redis;
          if (_this.status === "ready" || command.name === "cluster") {
            if (node && node.redis) {
              redis = node.redis;
            } else if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", command.name) || Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", command.name)) {
              redis = _this.subscriber.getInstance();
              if (!redis) {
                command.reject(new redis_errors_1.AbortError("No subscriber for the cluster"));
                return;
              }
            } else {
              if (!random) {
                if (typeof targetSlot === "number" && _this.slots[targetSlot]) {
                  const nodeKeys = _this.slots[targetSlot];
                  if (typeof to === "function") {
                    const nodes = nodeKeys.map(function(key) {
                      return _this.connectionPool.getInstanceByKey(key);
                    });
                    redis = to(nodes, command);
                    if (Array.isArray(redis)) {
                      redis = (0, utils_1.sample)(redis);
                    }
                    if (!redis) {
                      redis = nodes[0];
                    }
                  } else {
                    let key;
                    if (to === "all") {
                      key = (0, utils_1.sample)(nodeKeys);
                    } else if (to === "slave" && nodeKeys.length > 1) {
                      key = (0, utils_1.sample)(nodeKeys, 1);
                    } else {
                      key = nodeKeys[0];
                    }
                    redis = _this.connectionPool.getInstanceByKey(key);
                  }
                }
                if (asking) {
                  redis = _this.connectionPool.getInstanceByKey(asking);
                  redis.asking();
                }
              }
              if (!redis) {
                redis = (typeof to === "function" ? null : _this.connectionPool.getSampleInstance(to)) || _this.connectionPool.getSampleInstance("all");
              }
            }
            if (node && !node.redis) {
              node.redis = redis;
            }
          }
          if (redis) {
            redis.sendCommand(command, stream);
          } else if (_this.options.enableOfflineQueue) {
            _this.offlineQueue.push({
              command,
              stream,
              node
            });
          } else {
            command.reject(new Error("Cluster isn't ready and enableOfflineQueue options is false"));
          }
        }
        return command.promise;
      }
      sscanStream(key, options) {
        return this.createScanStream("sscan", { key, options });
      }
      sscanBufferStream(key, options) {
        return this.createScanStream("sscanBuffer", { key, options });
      }
      hscanStream(key, options) {
        return this.createScanStream("hscan", { key, options });
      }
      hscanBufferStream(key, options) {
        return this.createScanStream("hscanBuffer", { key, options });
      }
      zscanStream(key, options) {
        return this.createScanStream("zscan", { key, options });
      }
      zscanBufferStream(key, options) {
        return this.createScanStream("zscanBuffer", { key, options });
      }
      /**
       * @ignore
       */
      handleError(error, ttl, handlers) {
        if (typeof ttl.value === "undefined") {
          ttl.value = this.options.maxRedirections;
        } else {
          ttl.value -= 1;
        }
        if (ttl.value <= 0) {
          handlers.maxRedirections(new Error("Too many Cluster redirections. Last error: " + error));
          return;
        }
        const errv = error.message.split(" ");
        if (errv[0] === "MOVED") {
          const timeout = this.options.retryDelayOnMoved;
          if (timeout && typeof timeout === "number") {
            this.delayQueue.push("moved", handlers.moved.bind(null, errv[1], errv[2]), { timeout });
          } else {
            handlers.moved(errv[1], errv[2]);
          }
        } else if (errv[0] === "ASK") {
          handlers.ask(errv[1], errv[2]);
        } else if (errv[0] === "TRYAGAIN") {
          this.delayQueue.push("tryagain", handlers.tryagain, {
            timeout: this.options.retryDelayOnTryAgain
          });
        } else if (errv[0] === "CLUSTERDOWN" && this.options.retryDelayOnClusterDown > 0) {
          this.delayQueue.push("clusterdown", handlers.connectionClosed, {
            timeout: this.options.retryDelayOnClusterDown,
            callback: this.refreshSlotsCache.bind(this)
          });
        } else if (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG && this.options.retryDelayOnFailover > 0 && this.status === "ready") {
          this.delayQueue.push("failover", handlers.connectionClosed, {
            timeout: this.options.retryDelayOnFailover,
            callback: this.refreshSlotsCache.bind(this)
          });
        } else {
          handlers.defaults();
        }
      }
      resetOfflineQueue() {
        this.offlineQueue = new Deque();
      }
      clearNodesRefreshInterval() {
        if (this.slotsTimer) {
          clearTimeout(this.slotsTimer);
          this.slotsTimer = null;
        }
      }
      resetNodesRefreshInterval() {
        if (this.slotsTimer || !this.options.slotsRefreshInterval) {
          return;
        }
        const nextRound = () => {
          this.slotsTimer = setTimeout(() => {
            debug('refreshing slot caches... (triggered by "slotsRefreshInterval" option)');
            this.refreshSlotsCache(() => {
              nextRound();
            });
          }, this.options.slotsRefreshInterval);
        };
        nextRound();
      }
      /**
       * Change cluster instance's status
       */
      setStatus(status) {
        debug("status: %s -> %s", this.status || "[empty]", status);
        this.status = status;
        process.nextTick(() => {
          this.emit(status);
        });
      }
      /**
       * Called when closed to check whether a reconnection should be made
       */
      handleCloseEvent(reason) {
        if (reason) {
          debug("closed because %s", reason);
        }
        let retryDelay;
        if (!this.manuallyClosing && typeof this.options.clusterRetryStrategy === "function") {
          retryDelay = this.options.clusterRetryStrategy.call(this, ++this.retryAttempts, reason);
        }
        if (typeof retryDelay === "number") {
          this.setStatus("reconnecting");
          this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            debug("Cluster is disconnected. Retrying after %dms", retryDelay);
            this.connect().catch(function(err) {
              debug("Got error %s when reconnecting. Ignoring...", err);
            });
          }, retryDelay);
        } else {
          this.setStatus("end");
          this.flushQueue(new Error("None of startup nodes is available"));
        }
      }
      /**
       * Flush offline queue with error.
       */
      flushQueue(error) {
        let item;
        while (item = this.offlineQueue.shift()) {
          item.command.reject(error);
        }
      }
      executeOfflineCommands() {
        if (this.offlineQueue.length) {
          debug("send %d commands in offline queue", this.offlineQueue.length);
          const offlineQueue = this.offlineQueue;
          this.resetOfflineQueue();
          let item;
          while (item = offlineQueue.shift()) {
            this.sendCommand(item.command, item.stream, item.node);
          }
        }
      }
      natMapper(nodeKey) {
        if (this.options.natMap && typeof this.options.natMap === "object") {
          const key = typeof nodeKey === "string" ? nodeKey : `${nodeKey.host}:${nodeKey.port}`;
          const mapped = this.options.natMap[key];
          if (mapped) {
            debug("NAT mapping %s -> %O", key, mapped);
            return Object.assign({}, mapped);
          }
        }
        return typeof nodeKey === "string" ? (0, util_1.nodeKeyToRedisOptions)(nodeKey) : nodeKey;
      }
      getInfoFromNode(redis, callback) {
        if (!redis) {
          return callback(new Error("Node is disconnected"));
        }
        const duplicatedConnection = redis.duplicate({
          enableOfflineQueue: true,
          enableReadyCheck: false,
          retryStrategy: null,
          connectionName: (0, util_1.getConnectionName)("refresher", this.options.redisOptions && this.options.redisOptions.connectionName)
        });
        duplicatedConnection.on("error", utils_1.noop);
        duplicatedConnection.cluster("SLOTS", (0, utils_1.timeout)((err, result) => {
          duplicatedConnection.disconnect();
          if (err) {
            return callback(err);
          }
          if (this.status === "disconnecting" || this.status === "close" || this.status === "end") {
            debug("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s", result.length, this.status);
            callback();
            return;
          }
          const nodes = [];
          debug("cluster slots result count: %d", result.length);
          for (let i = 0; i < result.length; ++i) {
            const items = result[i];
            const slotRangeStart = items[0];
            const slotRangeEnd = items[1];
            const keys4 = [];
            for (let j2 = 2; j2 < items.length; j2++) {
              if (!items[j2][0]) {
                continue;
              }
              const node = this.natMapper({
                host: items[j2][0],
                port: items[j2][1]
              });
              node.readOnly = j2 !== 2;
              nodes.push(node);
              keys4.push(node.host + ":" + node.port);
            }
            debug("cluster slots result [%d]: slots %d~%d served by %s", i, slotRangeStart, slotRangeEnd, keys4);
            for (let slot = slotRangeStart; slot <= slotRangeEnd; slot++) {
              this.slots[slot] = keys4;
            }
          }
          this._groupsIds = /* @__PURE__ */ Object.create(null);
          let j = 0;
          for (let i = 0; i < 16384; i++) {
            const target = (this.slots[i] || []).join(";");
            if (!target.length) {
              this._groupsBySlot[i] = void 0;
              continue;
            }
            if (!this._groupsIds[target]) {
              this._groupsIds[target] = ++j;
            }
            this._groupsBySlot[i] = this._groupsIds[target];
          }
          this.connectionPool.reset(nodes);
          callback();
        }, this.options.slotsRefreshTimeout));
      }
      invokeReadyDelayedCallbacks(err) {
        for (const c of this._readyDelayedCallbacks) {
          process.nextTick(c, err);
        }
        this._readyDelayedCallbacks = [];
      }
      /**
       * Check whether Cluster is able to process commands
       */
      readyCheck(callback) {
        this.cluster("INFO", (err, res) => {
          if (err) {
            return callback(err);
          }
          if (typeof res !== "string") {
            return callback();
          }
          let state;
          const lines = res.split("\r\n");
          for (let i = 0; i < lines.length; ++i) {
            const parts = lines[i].split(":");
            if (parts[0] === "cluster_state") {
              state = parts[1];
              break;
            }
          }
          if (state === "fail") {
            debug("cluster state not ok (%s)", state);
            callback(null, state);
          } else {
            callback();
          }
        });
      }
      resolveSrv(hostname) {
        return new Promise((resolve, reject) => {
          this.options.resolveSrv(hostname, (err, records) => {
            if (err) {
              return reject(err);
            }
            const self = this, groupedRecords = (0, util_1.groupSrvRecords)(records), sortedKeys = Object.keys(groupedRecords).sort((a, b) => parseInt(a) - parseInt(b));
            function tryFirstOne(err2) {
              if (!sortedKeys.length) {
                return reject(err2);
              }
              const key = sortedKeys[0], group = groupedRecords[key], record = (0, util_1.weightSrvRecords)(group);
              if (!group.records.length) {
                sortedKeys.shift();
              }
              self.dnsLookup(record.name).then((host) => resolve({
                host,
                port: record.port
              }), tryFirstOne);
            }
            tryFirstOne();
          });
        });
      }
      dnsLookup(hostname) {
        return new Promise((resolve, reject) => {
          this.options.dnsLookup(hostname, (err, address) => {
            if (err) {
              debug("failed to resolve hostname %s to IP: %s", hostname, err.message);
              reject(err);
            } else {
              debug("resolved hostname %s to IP %s", hostname, address);
              resolve(address);
            }
          });
        });
      }
      /**
       * Normalize startup nodes, and resolving hostnames to IPs.
       *
       * This process happens every time when #connect() is called since
       * #startupNodes and DNS records may chanage.
       */
      async resolveStartupNodeHostnames() {
        if (!Array.isArray(this.startupNodes) || this.startupNodes.length === 0) {
          throw new Error("`startupNodes` should contain at least one node.");
        }
        const startupNodes = (0, util_1.normalizeNodeOptions)(this.startupNodes);
        const hostnames = (0, util_1.getUniqueHostnamesFromOptions)(startupNodes);
        if (hostnames.length === 0) {
          return startupNodes;
        }
        const configs = await Promise.all(hostnames.map((this.options.useSRVRecords ? this.resolveSrv : this.dnsLookup).bind(this)));
        const hostnameToConfig = (0, utils_1.zipMap)(hostnames, configs);
        return startupNodes.map((node) => {
          const config = hostnameToConfig.get(node.host);
          if (!config) {
            return node;
          }
          if (this.options.useSRVRecords) {
            return Object.assign({}, node, config);
          }
          return Object.assign({}, node, { host: config });
        });
      }
      createScanStream(command, { key, options = {} }) {
        return new ScanStream_1.default({
          objectMode: true,
          key,
          redis: this,
          command,
          ...options
        });
      }
    };
    (0, applyMixin_1.default)(Cluster, events_1.EventEmitter);
    (0, transaction_1.addTransactionSupport)(Cluster.prototype);
    exports2.default = Cluster;
  }
});

// node_modules/ioredis/built/connectors/AbstractConnector.js
var require_AbstractConnector = __commonJS({
  "node_modules/ioredis/built/connectors/AbstractConnector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var debug = (0, utils_1.Debug)("AbstractConnector");
    var AbstractConnector = class {
      constructor(disconnectTimeout) {
        this.connecting = false;
        this.disconnectTimeout = disconnectTimeout;
      }
      check(info) {
        return true;
      }
      disconnect() {
        this.connecting = false;
        if (this.stream) {
          const stream = this.stream;
          const timeout = setTimeout(() => {
            debug("stream %s:%s still open, destroying it", stream.remoteAddress, stream.remotePort);
            stream.destroy();
          }, this.disconnectTimeout);
          stream.on("close", () => clearTimeout(timeout));
          stream.end();
        }
      }
    };
    exports2.default = AbstractConnector;
  }
});

// node_modules/ioredis/built/connectors/StandaloneConnector.js
var require_StandaloneConnector = __commonJS({
  "node_modules/ioredis/built/connectors/StandaloneConnector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var net_1 = require("net");
    var tls_1 = require("tls");
    var utils_1 = require_utils2();
    var AbstractConnector_1 = require_AbstractConnector();
    var StandaloneConnector = class extends AbstractConnector_1.default {
      constructor(options) {
        super(options.disconnectTimeout);
        this.options = options;
      }
      connect(_) {
        const { options } = this;
        this.connecting = true;
        let connectionOptions;
        if ("path" in options && options.path) {
          connectionOptions = {
            path: options.path
          };
        } else {
          connectionOptions = {};
          if ("port" in options && options.port != null) {
            connectionOptions.port = options.port;
          }
          if ("host" in options && options.host != null) {
            connectionOptions.host = options.host;
          }
          if ("family" in options && options.family != null) {
            connectionOptions.family = options.family;
          }
        }
        if (options.tls) {
          Object.assign(connectionOptions, options.tls);
        }
        return new Promise((resolve, reject) => {
          process.nextTick(() => {
            if (!this.connecting) {
              reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
              return;
            }
            try {
              if (options.tls) {
                this.stream = (0, tls_1.connect)(connectionOptions);
              } else {
                this.stream = (0, net_1.createConnection)(connectionOptions);
              }
            } catch (err) {
              reject(err);
              return;
            }
            this.stream.once("error", (err) => {
              this.firstError = err;
            });
            resolve(this.stream);
          });
        });
      }
    };
    exports2.default = StandaloneConnector;
  }
});

// node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js
var require_SentinelIterator = __commonJS({
  "node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function isSentinelEql(a, b) {
      return (a.host || "127.0.0.1") === (b.host || "127.0.0.1") && (a.port || 26379) === (b.port || 26379);
    }
    var SentinelIterator = class {
      constructor(sentinels) {
        this.cursor = 0;
        this.sentinels = sentinels.slice(0);
      }
      next() {
        const done = this.cursor >= this.sentinels.length;
        return { done, value: done ? void 0 : this.sentinels[this.cursor++] };
      }
      reset(moveCurrentEndpointToFirst) {
        if (moveCurrentEndpointToFirst && this.sentinels.length > 1 && this.cursor !== 1) {
          this.sentinels.unshift(...this.sentinels.splice(this.cursor - 1));
        }
        this.cursor = 0;
      }
      add(sentinel) {
        for (let i = 0; i < this.sentinels.length; i++) {
          if (isSentinelEql(sentinel, this.sentinels[i])) {
            return false;
          }
        }
        this.sentinels.push(sentinel);
        return true;
      }
      toString() {
        return `${JSON.stringify(this.sentinels)} @${this.cursor}`;
      }
    };
    exports2.default = SentinelIterator;
  }
});

// node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js
var require_FailoverDetector = __commonJS({
  "node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FailoverDetector = void 0;
    var utils_1 = require_utils2();
    var debug = (0, utils_1.Debug)("FailoverDetector");
    var CHANNEL_NAME = "+switch-master";
    var FailoverDetector = class {
      // sentinels can't be used for regular commands after this
      constructor(connector, sentinels) {
        this.isDisconnected = false;
        this.connector = connector;
        this.sentinels = sentinels;
      }
      cleanup() {
        this.isDisconnected = true;
        for (const sentinel of this.sentinels) {
          sentinel.client.disconnect();
        }
      }
      async subscribe() {
        debug("Starting FailoverDetector");
        const promises = [];
        for (const sentinel of this.sentinels) {
          const promise = sentinel.client.subscribe(CHANNEL_NAME).catch((err) => {
            debug("Failed to subscribe to failover messages on sentinel %s:%s (%s)", sentinel.address.host || "127.0.0.1", sentinel.address.port || 26739, err.message);
          });
          promises.push(promise);
          sentinel.client.on("message", (channel) => {
            if (!this.isDisconnected && channel === CHANNEL_NAME) {
              this.disconnect();
            }
          });
        }
        await Promise.all(promises);
      }
      disconnect() {
        this.isDisconnected = true;
        debug("Failover detected, disconnecting");
        this.connector.disconnect();
      }
    };
    exports2.FailoverDetector = FailoverDetector;
  }
});

// node_modules/ioredis/built/connectors/SentinelConnector/index.js
var require_SentinelConnector = __commonJS({
  "node_modules/ioredis/built/connectors/SentinelConnector/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SentinelIterator = void 0;
    var net_1 = require("net");
    var utils_1 = require_utils2();
    var tls_1 = require("tls");
    var SentinelIterator_1 = require_SentinelIterator();
    exports2.SentinelIterator = SentinelIterator_1.default;
    var AbstractConnector_1 = require_AbstractConnector();
    var Redis_1 = require_Redis();
    var FailoverDetector_1 = require_FailoverDetector();
    var debug = (0, utils_1.Debug)("SentinelConnector");
    var SentinelConnector = class extends AbstractConnector_1.default {
      constructor(options) {
        super(options.disconnectTimeout);
        this.options = options;
        this.emitter = null;
        this.failoverDetector = null;
        if (!this.options.sentinels.length) {
          throw new Error("Requires at least one sentinel to connect to.");
        }
        if (!this.options.name) {
          throw new Error("Requires the name of master.");
        }
        this.sentinelIterator = new SentinelIterator_1.default(this.options.sentinels);
      }
      check(info) {
        const roleMatches = !info.role || this.options.role === info.role;
        if (!roleMatches) {
          debug("role invalid, expected %s, but got %s", this.options.role, info.role);
          this.sentinelIterator.next();
          this.sentinelIterator.next();
          this.sentinelIterator.reset(true);
        }
        return roleMatches;
      }
      disconnect() {
        super.disconnect();
        if (this.failoverDetector) {
          this.failoverDetector.cleanup();
        }
      }
      connect(eventEmitter) {
        this.connecting = true;
        this.retryAttempts = 0;
        let lastError;
        const connectToNext = async () => {
          const endpoint = this.sentinelIterator.next();
          if (endpoint.done) {
            this.sentinelIterator.reset(false);
            const retryDelay = typeof this.options.sentinelRetryStrategy === "function" ? this.options.sentinelRetryStrategy(++this.retryAttempts) : null;
            let errorMsg = typeof retryDelay !== "number" ? "All sentinels are unreachable and retry is disabled." : `All sentinels are unreachable. Retrying from scratch after ${retryDelay}ms.`;
            if (lastError) {
              errorMsg += ` Last error: ${lastError.message}`;
            }
            debug(errorMsg);
            const error = new Error(errorMsg);
            if (typeof retryDelay === "number") {
              eventEmitter("error", error);
              await new Promise((resolve) => setTimeout(resolve, retryDelay));
              return connectToNext();
            } else {
              throw error;
            }
          }
          let resolved = null;
          let err = null;
          try {
            resolved = await this.resolve(endpoint.value);
          } catch (error) {
            err = error;
          }
          if (!this.connecting) {
            throw new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG);
          }
          const endpointAddress = endpoint.value.host + ":" + endpoint.value.port;
          if (resolved) {
            debug("resolved: %s:%s from sentinel %s", resolved.host, resolved.port, endpointAddress);
            if (this.options.enableTLSForSentinelMode && this.options.tls) {
              Object.assign(resolved, this.options.tls);
              this.stream = (0, tls_1.connect)(resolved);
              this.stream.once("secureConnect", this.initFailoverDetector.bind(this));
            } else {
              this.stream = (0, net_1.createConnection)(resolved);
              this.stream.once("connect", this.initFailoverDetector.bind(this));
            }
            this.stream.once("error", (err2) => {
              this.firstError = err2;
            });
            return this.stream;
          } else {
            const errorMsg = err ? "failed to connect to sentinel " + endpointAddress + " because " + err.message : "connected to sentinel " + endpointAddress + " successfully, but got an invalid reply: " + resolved;
            debug(errorMsg);
            eventEmitter("sentinelError", new Error(errorMsg));
            if (err) {
              lastError = err;
            }
            return connectToNext();
          }
        };
        return connectToNext();
      }
      async updateSentinels(client) {
        if (!this.options.updateSentinels) {
          return;
        }
        const result = await client.sentinel("sentinels", this.options.name);
        if (!Array.isArray(result)) {
          return;
        }
        result.map(utils_1.packObject).forEach((sentinel) => {
          const flags = sentinel.flags ? sentinel.flags.split(",") : [];
          if (flags.indexOf("disconnected") === -1 && sentinel.ip && sentinel.port) {
            const endpoint = this.sentinelNatResolve(addressResponseToAddress(sentinel));
            if (this.sentinelIterator.add(endpoint)) {
              debug("adding sentinel %s:%s", endpoint.host, endpoint.port);
            }
          }
        });
        debug("Updated internal sentinels: %s", this.sentinelIterator);
      }
      async resolveMaster(client) {
        const result = await client.sentinel("get-master-addr-by-name", this.options.name);
        await this.updateSentinels(client);
        return this.sentinelNatResolve(Array.isArray(result) ? { host: result[0], port: Number(result[1]) } : null);
      }
      async resolveSlave(client) {
        const result = await client.sentinel("slaves", this.options.name);
        if (!Array.isArray(result)) {
          return null;
        }
        const availableSlaves = result.map(utils_1.packObject).filter((slave) => slave.flags && !slave.flags.match(/(disconnected|s_down|o_down)/));
        return this.sentinelNatResolve(selectPreferredSentinel(availableSlaves, this.options.preferredSlaves));
      }
      sentinelNatResolve(item) {
        if (!item || !this.options.natMap)
          return item;
        return this.options.natMap[`${item.host}:${item.port}`] || item;
      }
      connectToSentinel(endpoint, options) {
        const redis = new Redis_1.default({
          port: endpoint.port || 26379,
          host: endpoint.host,
          username: this.options.sentinelUsername || null,
          password: this.options.sentinelPassword || null,
          family: endpoint.family || // @ts-expect-error
          ("path" in this.options && this.options.path ? void 0 : (
            // @ts-expect-error
            this.options.family
          )),
          tls: this.options.sentinelTLS,
          retryStrategy: null,
          enableReadyCheck: false,
          connectTimeout: this.options.connectTimeout,
          commandTimeout: this.options.sentinelCommandTimeout,
          ...options
        });
        return redis;
      }
      async resolve(endpoint) {
        const client = this.connectToSentinel(endpoint);
        client.on("error", noop);
        try {
          if (this.options.role === "slave") {
            return await this.resolveSlave(client);
          } else {
            return await this.resolveMaster(client);
          }
        } finally {
          client.disconnect();
        }
      }
      async initFailoverDetector() {
        var _a;
        if (!this.options.failoverDetector) {
          return;
        }
        this.sentinelIterator.reset(true);
        const sentinels = [];
        while (sentinels.length < this.options.sentinelMaxConnections) {
          const { done, value } = this.sentinelIterator.next();
          if (done) {
            break;
          }
          const client = this.connectToSentinel(value, {
            lazyConnect: true,
            retryStrategy: this.options.sentinelReconnectStrategy
          });
          client.on("reconnecting", () => {
            var _a2;
            (_a2 = this.emitter) === null || _a2 === void 0 ? void 0 : _a2.emit("sentinelReconnecting");
          });
          sentinels.push({ address: value, client });
        }
        this.sentinelIterator.reset(false);
        if (this.failoverDetector) {
          this.failoverDetector.cleanup();
        }
        this.failoverDetector = new FailoverDetector_1.FailoverDetector(this, sentinels);
        await this.failoverDetector.subscribe();
        (_a = this.emitter) === null || _a === void 0 ? void 0 : _a.emit("failoverSubscribed");
      }
    };
    exports2.default = SentinelConnector;
    function selectPreferredSentinel(availableSlaves, preferredSlaves) {
      if (availableSlaves.length === 0) {
        return null;
      }
      let selectedSlave;
      if (typeof preferredSlaves === "function") {
        selectedSlave = preferredSlaves(availableSlaves);
      } else if (preferredSlaves !== null && typeof preferredSlaves === "object") {
        const preferredSlavesArray = Array.isArray(preferredSlaves) ? preferredSlaves : [preferredSlaves];
        preferredSlavesArray.sort((a, b) => {
          if (!a.prio) {
            a.prio = 1;
          }
          if (!b.prio) {
            b.prio = 1;
          }
          if (a.prio < b.prio) {
            return -1;
          }
          if (a.prio > b.prio) {
            return 1;
          }
          return 0;
        });
        for (let p = 0; p < preferredSlavesArray.length; p++) {
          for (let a = 0; a < availableSlaves.length; a++) {
            const slave = availableSlaves[a];
            if (slave.ip === preferredSlavesArray[p].ip) {
              if (slave.port === preferredSlavesArray[p].port) {
                selectedSlave = slave;
                break;
              }
            }
          }
          if (selectedSlave) {
            break;
          }
        }
      }
      if (!selectedSlave) {
        selectedSlave = (0, utils_1.sample)(availableSlaves);
      }
      return addressResponseToAddress(selectedSlave);
    }
    function addressResponseToAddress(input) {
      return { host: input.ip, port: Number(input.port) };
    }
    function noop() {
    }
  }
});

// node_modules/ioredis/built/connectors/index.js
var require_connectors = __commonJS({
  "node_modules/ioredis/built/connectors/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SentinelConnector = exports2.StandaloneConnector = void 0;
    var StandaloneConnector_1 = require_StandaloneConnector();
    exports2.StandaloneConnector = StandaloneConnector_1.default;
    var SentinelConnector_1 = require_SentinelConnector();
    exports2.SentinelConnector = SentinelConnector_1.default;
  }
});

// node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js
var require_MaxRetriesPerRequestError = __commonJS({
  "node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var redis_errors_1 = require_redis_errors();
    var MaxRetriesPerRequestError = class extends redis_errors_1.AbortError {
      constructor(maxRetriesPerRequest) {
        const message = `Reached the max retries per request limit (which is ${maxRetriesPerRequest}). Refer to "maxRetriesPerRequest" option for details.`;
        super(message);
        Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
    };
    exports2.default = MaxRetriesPerRequestError;
  }
});

// node_modules/ioredis/built/errors/index.js
var require_errors = __commonJS({
  "node_modules/ioredis/built/errors/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MaxRetriesPerRequestError = void 0;
    var MaxRetriesPerRequestError_1 = require_MaxRetriesPerRequestError();
    exports2.MaxRetriesPerRequestError = MaxRetriesPerRequestError_1.default;
  }
});

// node_modules/redis-parser/lib/parser.js
var require_parser = __commonJS({
  "node_modules/redis-parser/lib/parser.js"(exports2, module2) {
    "use strict";
    var Buffer2 = require("buffer").Buffer;
    var StringDecoder = require("string_decoder").StringDecoder;
    var decoder = new StringDecoder();
    var errors = require_redis_errors();
    var ReplyError = errors.ReplyError;
    var ParserError = errors.ParserError;
    var bufferPool = Buffer2.allocUnsafe(32 * 1024);
    var bufferOffset = 0;
    var interval = null;
    var counter = 0;
    var notDecreased = 0;
    function parseSimpleNumbers(parser) {
      const length = parser.buffer.length - 1;
      var offset = parser.offset;
      var number = 0;
      var sign = 1;
      if (parser.buffer[offset] === 45) {
        sign = -1;
        offset++;
      }
      while (offset < length) {
        const c1 = parser.buffer[offset++];
        if (c1 === 13) {
          parser.offset = offset + 1;
          return sign * number;
        }
        number = number * 10 + (c1 - 48);
      }
    }
    function parseStringNumbers(parser) {
      const length = parser.buffer.length - 1;
      var offset = parser.offset;
      var number = 0;
      var res = "";
      if (parser.buffer[offset] === 45) {
        res += "-";
        offset++;
      }
      while (offset < length) {
        var c1 = parser.buffer[offset++];
        if (c1 === 13) {
          parser.offset = offset + 1;
          if (number !== 0) {
            res += number;
          }
          return res;
        } else if (number > 429496728) {
          res += number * 10 + (c1 - 48);
          number = 0;
        } else if (c1 === 48 && number === 0) {
          res += 0;
        } else {
          number = number * 10 + (c1 - 48);
        }
      }
    }
    function parseSimpleString(parser) {
      const start = parser.offset;
      const buffer = parser.buffer;
      const length = buffer.length - 1;
      var offset = start;
      while (offset < length) {
        if (buffer[offset++] === 13) {
          parser.offset = offset + 1;
          if (parser.optionReturnBuffers === true) {
            return parser.buffer.slice(start, offset - 1);
          }
          return parser.buffer.toString("utf8", start, offset - 1);
        }
      }
    }
    function parseLength(parser) {
      const length = parser.buffer.length - 1;
      var offset = parser.offset;
      var number = 0;
      while (offset < length) {
        const c1 = parser.buffer[offset++];
        if (c1 === 13) {
          parser.offset = offset + 1;
          return number;
        }
        number = number * 10 + (c1 - 48);
      }
    }
    function parseInteger(parser) {
      if (parser.optionStringNumbers === true) {
        return parseStringNumbers(parser);
      }
      return parseSimpleNumbers(parser);
    }
    function parseBulkString(parser) {
      const length = parseLength(parser);
      if (length === void 0) {
        return;
      }
      if (length < 0) {
        return null;
      }
      const offset = parser.offset + length;
      if (offset + 2 > parser.buffer.length) {
        parser.bigStrSize = offset + 2;
        parser.totalChunkSize = parser.buffer.length;
        parser.bufferCache.push(parser.buffer);
        return;
      }
      const start = parser.offset;
      parser.offset = offset + 2;
      if (parser.optionReturnBuffers === true) {
        return parser.buffer.slice(start, offset);
      }
      return parser.buffer.toString("utf8", start, offset);
    }
    function parseError(parser) {
      var string3 = parseSimpleString(parser);
      if (string3 !== void 0) {
        if (parser.optionReturnBuffers === true) {
          string3 = string3.toString();
        }
        return new ReplyError(string3);
      }
    }
    function handleError(parser, type3) {
      const err = new ParserError(
        "Protocol error, got " + JSON.stringify(String.fromCharCode(type3)) + " as reply type byte",
        JSON.stringify(parser.buffer),
        parser.offset
      );
      parser.buffer = null;
      parser.returnFatalError(err);
    }
    function parseArray(parser) {
      const length = parseLength(parser);
      if (length === void 0) {
        return;
      }
      if (length < 0) {
        return null;
      }
      const responses = new Array(length);
      return parseArrayElements(parser, responses, 0);
    }
    function pushArrayCache(parser, array, pos) {
      parser.arrayCache.push(array);
      parser.arrayPos.push(pos);
    }
    function parseArrayChunks(parser) {
      const tmp = parser.arrayCache.pop();
      var pos = parser.arrayPos.pop();
      if (parser.arrayCache.length) {
        const res = parseArrayChunks(parser);
        if (res === void 0) {
          pushArrayCache(parser, tmp, pos);
          return;
        }
        tmp[pos++] = res;
      }
      return parseArrayElements(parser, tmp, pos);
    }
    function parseArrayElements(parser, responses, i) {
      const bufferLength = parser.buffer.length;
      while (i < responses.length) {
        const offset = parser.offset;
        if (parser.offset >= bufferLength) {
          pushArrayCache(parser, responses, i);
          return;
        }
        const response = parseType(parser, parser.buffer[parser.offset++]);
        if (response === void 0) {
          if (!(parser.arrayCache.length || parser.bufferCache.length)) {
            parser.offset = offset;
          }
          pushArrayCache(parser, responses, i);
          return;
        }
        responses[i] = response;
        i++;
      }
      return responses;
    }
    function parseType(parser, type3) {
      switch (type3) {
        case 36:
          return parseBulkString(parser);
        case 43:
          return parseSimpleString(parser);
        case 42:
          return parseArray(parser);
        case 58:
          return parseInteger(parser);
        case 45:
          return parseError(parser);
        default:
          return handleError(parser, type3);
      }
    }
    function decreaseBufferPool() {
      if (bufferPool.length > 50 * 1024) {
        if (counter === 1 || notDecreased > counter * 2) {
          const minSliceLen = Math.floor(bufferPool.length / 10);
          const sliceLength = minSliceLen < bufferOffset ? bufferOffset : minSliceLen;
          bufferOffset = 0;
          bufferPool = bufferPool.slice(sliceLength, bufferPool.length);
        } else {
          notDecreased++;
          counter--;
        }
      } else {
        clearInterval(interval);
        counter = 0;
        notDecreased = 0;
        interval = null;
      }
    }
    function resizeBuffer(length) {
      if (bufferPool.length < length + bufferOffset) {
        const multiplier = length > 1024 * 1024 * 75 ? 2 : 3;
        if (bufferOffset > 1024 * 1024 * 111) {
          bufferOffset = 1024 * 1024 * 50;
        }
        bufferPool = Buffer2.allocUnsafe(length * multiplier + bufferOffset);
        bufferOffset = 0;
        counter++;
        if (interval === null) {
          interval = setInterval(decreaseBufferPool, 50);
        }
      }
    }
    function concatBulkString(parser) {
      const list = parser.bufferCache;
      const oldOffset = parser.offset;
      var chunks = list.length;
      var offset = parser.bigStrSize - parser.totalChunkSize;
      parser.offset = offset;
      if (offset <= 2) {
        if (chunks === 2) {
          return list[0].toString("utf8", oldOffset, list[0].length + offset - 2);
        }
        chunks--;
        offset = list[list.length - 2].length + offset;
      }
      var res = decoder.write(list[0].slice(oldOffset));
      for (var i = 1; i < chunks - 1; i++) {
        res += decoder.write(list[i]);
      }
      res += decoder.end(list[i].slice(0, offset - 2));
      return res;
    }
    function concatBulkBuffer(parser) {
      const list = parser.bufferCache;
      const oldOffset = parser.offset;
      const length = parser.bigStrSize - oldOffset - 2;
      var chunks = list.length;
      var offset = parser.bigStrSize - parser.totalChunkSize;
      parser.offset = offset;
      if (offset <= 2) {
        if (chunks === 2) {
          return list[0].slice(oldOffset, list[0].length + offset - 2);
        }
        chunks--;
        offset = list[list.length - 2].length + offset;
      }
      resizeBuffer(length);
      const start = bufferOffset;
      list[0].copy(bufferPool, start, oldOffset, list[0].length);
      bufferOffset += list[0].length - oldOffset;
      for (var i = 1; i < chunks - 1; i++) {
        list[i].copy(bufferPool, bufferOffset);
        bufferOffset += list[i].length;
      }
      list[i].copy(bufferPool, bufferOffset, 0, offset - 2);
      bufferOffset += offset - 2;
      return bufferPool.slice(start, bufferOffset);
    }
    var JavascriptRedisParser = class {
      /**
       * Javascript Redis Parser constructor
       * @param {{returnError: Function, returnReply: Function, returnFatalError?: Function, returnBuffers: boolean, stringNumbers: boolean }} options
       * @constructor
       */
      constructor(options) {
        if (!options) {
          throw new TypeError("Options are mandatory.");
        }
        if (typeof options.returnError !== "function" || typeof options.returnReply !== "function") {
          throw new TypeError("The returnReply and returnError options have to be functions.");
        }
        this.setReturnBuffers(!!options.returnBuffers);
        this.setStringNumbers(!!options.stringNumbers);
        this.returnError = options.returnError;
        this.returnFatalError = options.returnFatalError || options.returnError;
        this.returnReply = options.returnReply;
        this.reset();
      }
      /**
       * Reset the parser values to the initial state
       *
       * @returns {undefined}
       */
      reset() {
        this.offset = 0;
        this.buffer = null;
        this.bigStrSize = 0;
        this.totalChunkSize = 0;
        this.bufferCache = [];
        this.arrayCache = [];
        this.arrayPos = [];
      }
      /**
       * Set the returnBuffers option
       *
       * @param {boolean} returnBuffers
       * @returns {undefined}
       */
      setReturnBuffers(returnBuffers) {
        if (typeof returnBuffers !== "boolean") {
          throw new TypeError("The returnBuffers argument has to be a boolean");
        }
        this.optionReturnBuffers = returnBuffers;
      }
      /**
       * Set the stringNumbers option
       *
       * @param {boolean} stringNumbers
       * @returns {undefined}
       */
      setStringNumbers(stringNumbers) {
        if (typeof stringNumbers !== "boolean") {
          throw new TypeError("The stringNumbers argument has to be a boolean");
        }
        this.optionStringNumbers = stringNumbers;
      }
      /**
       * Parse the redis buffer
       * @param {Buffer} buffer
       * @returns {undefined}
       */
      execute(buffer) {
        if (this.buffer === null) {
          this.buffer = buffer;
          this.offset = 0;
        } else if (this.bigStrSize === 0) {
          const oldLength = this.buffer.length;
          const remainingLength = oldLength - this.offset;
          const newBuffer = Buffer2.allocUnsafe(remainingLength + buffer.length);
          this.buffer.copy(newBuffer, 0, this.offset, oldLength);
          buffer.copy(newBuffer, remainingLength, 0, buffer.length);
          this.buffer = newBuffer;
          this.offset = 0;
          if (this.arrayCache.length) {
            const arr = parseArrayChunks(this);
            if (arr === void 0) {
              return;
            }
            this.returnReply(arr);
          }
        } else if (this.totalChunkSize + buffer.length >= this.bigStrSize) {
          this.bufferCache.push(buffer);
          var tmp = this.optionReturnBuffers ? concatBulkBuffer(this) : concatBulkString(this);
          this.bigStrSize = 0;
          this.bufferCache = [];
          this.buffer = buffer;
          if (this.arrayCache.length) {
            this.arrayCache[0][this.arrayPos[0]++] = tmp;
            tmp = parseArrayChunks(this);
            if (tmp === void 0) {
              return;
            }
          }
          this.returnReply(tmp);
        } else {
          this.bufferCache.push(buffer);
          this.totalChunkSize += buffer.length;
          return;
        }
        while (this.offset < this.buffer.length) {
          const offset = this.offset;
          const type3 = this.buffer[this.offset++];
          const response = parseType(this, type3);
          if (response === void 0) {
            if (!(this.arrayCache.length || this.bufferCache.length)) {
              this.offset = offset;
            }
            return;
          }
          if (type3 === 45) {
            this.returnError(response);
          } else {
            this.returnReply(response);
          }
        }
        this.buffer = null;
      }
    };
    module2.exports = JavascriptRedisParser;
  }
});

// node_modules/redis-parser/index.js
var require_redis_parser = __commonJS({
  "node_modules/redis-parser/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_parser();
  }
});

// node_modules/ioredis/built/SubscriptionSet.js
var require_SubscriptionSet = __commonJS({
  "node_modules/ioredis/built/SubscriptionSet.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var SubscriptionSet = class {
      constructor() {
        this.set = {
          subscribe: {},
          psubscribe: {},
          ssubscribe: {}
        };
      }
      add(set, channel) {
        this.set[mapSet(set)][channel] = true;
      }
      del(set, channel) {
        delete this.set[mapSet(set)][channel];
      }
      channels(set) {
        return Object.keys(this.set[mapSet(set)]);
      }
      isEmpty() {
        return this.channels("subscribe").length === 0 && this.channels("psubscribe").length === 0 && this.channels("ssubscribe").length === 0;
      }
    };
    exports2.default = SubscriptionSet;
    function mapSet(set) {
      if (set === "unsubscribe") {
        return "subscribe";
      }
      if (set === "punsubscribe") {
        return "psubscribe";
      }
      if (set === "sunsubscribe") {
        return "ssubscribe";
      }
      return set;
    }
  }
});

// node_modules/ioredis/built/DataHandler.js
var require_DataHandler = __commonJS({
  "node_modules/ioredis/built/DataHandler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Command_1 = require_Command();
    var utils_1 = require_utils2();
    var RedisParser = require_redis_parser();
    var SubscriptionSet_1 = require_SubscriptionSet();
    var debug = (0, utils_1.Debug)("dataHandler");
    var DataHandler = class {
      constructor(redis, parserOptions) {
        this.redis = redis;
        const parser = new RedisParser({
          stringNumbers: parserOptions.stringNumbers,
          returnBuffers: true,
          returnError: (err) => {
            this.returnError(err);
          },
          returnFatalError: (err) => {
            this.returnFatalError(err);
          },
          returnReply: (reply) => {
            this.returnReply(reply);
          }
        });
        redis.stream.on("data", (data) => {
          parser.execute(data);
        });
      }
      returnFatalError(err) {
        err.message += ". Please report this.";
        this.redis.recoverFromFatalError(err, err, { offlineQueue: false });
      }
      returnError(err) {
        const item = this.shiftCommand(err);
        if (!item) {
          return;
        }
        err.command = {
          name: item.command.name,
          args: item.command.args
        };
        this.redis.handleReconnection(err, item);
      }
      returnReply(reply) {
        if (this.handleMonitorReply(reply)) {
          return;
        }
        if (this.handleSubscriberReply(reply)) {
          return;
        }
        const item = this.shiftCommand(reply);
        if (!item) {
          return;
        }
        if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", item.command.name)) {
          this.redis.condition.subscriber = new SubscriptionSet_1.default();
          this.redis.condition.subscriber.add(item.command.name, reply[1].toString());
          if (!fillSubCommand(item.command, reply[2])) {
            this.redis.commandQueue.unshift(item);
          }
        } else if (Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", item.command.name)) {
          if (!fillUnsubCommand(item.command, reply[2])) {
            this.redis.commandQueue.unshift(item);
          }
        } else {
          item.command.resolve(reply);
        }
      }
      handleSubscriberReply(reply) {
        if (!this.redis.condition.subscriber) {
          return false;
        }
        const replyType = Array.isArray(reply) ? reply[0].toString() : null;
        debug('receive reply "%s" in subscriber mode', replyType);
        switch (replyType) {
          case "message":
            if (this.redis.listeners("message").length > 0) {
              this.redis.emit("message", reply[1].toString(), reply[2] ? reply[2].toString() : "");
            }
            this.redis.emit("messageBuffer", reply[1], reply[2]);
            break;
          case "pmessage": {
            const pattern = reply[1].toString();
            if (this.redis.listeners("pmessage").length > 0) {
              this.redis.emit("pmessage", pattern, reply[2].toString(), reply[3].toString());
            }
            this.redis.emit("pmessageBuffer", pattern, reply[2], reply[3]);
            break;
          }
          case "smessage": {
            if (this.redis.listeners("smessage").length > 0) {
              this.redis.emit("smessage", reply[1].toString(), reply[2] ? reply[2].toString() : "");
            }
            this.redis.emit("smessageBuffer", reply[1], reply[2]);
            break;
          }
          case "ssubscribe":
          case "subscribe":
          case "psubscribe": {
            const channel = reply[1].toString();
            this.redis.condition.subscriber.add(replyType, channel);
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            if (!fillSubCommand(item.command, reply[2])) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          case "sunsubscribe":
          case "unsubscribe":
          case "punsubscribe": {
            const channel = reply[1] ? reply[1].toString() : null;
            if (channel) {
              this.redis.condition.subscriber.del(replyType, channel);
            }
            const count = reply[2];
            if (Number(count) === 0) {
              this.redis.condition.subscriber = false;
            }
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            if (!fillUnsubCommand(item.command, count)) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          default: {
            const item = this.shiftCommand(reply);
            if (!item) {
              return;
            }
            item.command.resolve(reply);
          }
        }
        return true;
      }
      handleMonitorReply(reply) {
        if (this.redis.status !== "monitoring") {
          return false;
        }
        const replyStr = reply.toString();
        if (replyStr === "OK") {
          return false;
        }
        const len = replyStr.indexOf(" ");
        const timestamp = replyStr.slice(0, len);
        const argIndex = replyStr.indexOf('"');
        const args = replyStr.slice(argIndex + 1, -1).split('" "').map((elem) => elem.replace(/\\"/g, '"'));
        const dbAndSource = replyStr.slice(len + 2, argIndex - 2).split(" ");
        this.redis.emit("monitor", timestamp, args, dbAndSource[1], dbAndSource[0]);
        return true;
      }
      shiftCommand(reply) {
        const item = this.redis.commandQueue.shift();
        if (!item) {
          const message = "Command queue state error. If you can reproduce this, please report it.";
          const error = new Error(message + (reply instanceof Error ? ` Last error: ${reply.message}` : ` Last reply: ${reply.toString()}`));
          this.redis.emit("error", error);
          return null;
        }
        return item;
      }
    };
    exports2.default = DataHandler;
    var remainingRepliesMap = /* @__PURE__ */ new WeakMap();
    function fillSubCommand(command, count) {
      let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
      remainingReplies -= 1;
      if (remainingReplies <= 0) {
        command.resolve(count);
        remainingRepliesMap.delete(command);
        return true;
      }
      remainingRepliesMap.set(command, remainingReplies);
      return false;
    }
    function fillUnsubCommand(command, count) {
      let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
      if (remainingReplies === 0) {
        if (Number(count) === 0) {
          remainingRepliesMap.delete(command);
          command.resolve(count);
          return true;
        }
        return false;
      }
      remainingReplies -= 1;
      if (remainingReplies <= 0) {
        command.resolve(count);
        return true;
      }
      remainingRepliesMap.set(command, remainingReplies);
      return false;
    }
  }
});

// node_modules/ioredis/built/redis/event_handler.js
var require_event_handler = __commonJS({
  "node_modules/ioredis/built/redis/event_handler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readyHandler = exports2.errorHandler = exports2.closeHandler = exports2.connectHandler = void 0;
    var redis_errors_1 = require_redis_errors();
    var Command_1 = require_Command();
    var errors_1 = require_errors();
    var utils_1 = require_utils2();
    var DataHandler_1 = require_DataHandler();
    var debug = (0, utils_1.Debug)("connection");
    function connectHandler(self) {
      return function() {
        self.setStatus("connect");
        self.resetCommandQueue();
        let flushed = false;
        const { connectionEpoch } = self;
        if (self.condition.auth) {
          self.auth(self.condition.auth, function(err) {
            if (connectionEpoch !== self.connectionEpoch) {
              return;
            }
            if (err) {
              if (err.message.indexOf("no password is set") !== -1) {
                console.warn("[WARN] Redis server does not require a password, but a password was supplied.");
              } else if (err.message.indexOf("without any password configured for the default user") !== -1) {
                console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied");
              } else if (err.message.indexOf("wrong number of arguments for 'auth' command") !== -1) {
                console.warn(`[ERROR] The server returned "wrong number of arguments for 'auth' command". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under.`);
              } else {
                flushed = true;
                self.recoverFromFatalError(err, err);
              }
            }
          });
        }
        if (self.condition.select) {
          self.select(self.condition.select).catch((err) => {
            self.silentEmit("error", err);
          });
        }
        if (!self.options.enableReadyCheck) {
          exports2.readyHandler(self)();
        }
        new DataHandler_1.default(self, {
          stringNumbers: self.options.stringNumbers
        });
        if (self.options.enableReadyCheck) {
          self._readyCheck(function(err, info) {
            if (connectionEpoch !== self.connectionEpoch) {
              return;
            }
            if (err) {
              if (!flushed) {
                self.recoverFromFatalError(new Error("Ready check failed: " + err.message), err);
              }
            } else {
              if (self.connector.check(info)) {
                exports2.readyHandler(self)();
              } else {
                self.disconnect(true);
              }
            }
          });
        }
      };
    }
    exports2.connectHandler = connectHandler;
    function abortError(command) {
      const err = new redis_errors_1.AbortError("Command aborted due to connection close");
      err.command = {
        name: command.name,
        args: command.args
      };
      return err;
    }
    function abortIncompletePipelines(commandQueue) {
      var _a;
      let expectedIndex = 0;
      for (let i = 0; i < commandQueue.length; ) {
        const command = (_a = commandQueue.peekAt(i)) === null || _a === void 0 ? void 0 : _a.command;
        const pipelineIndex = command.pipelineIndex;
        if (pipelineIndex === void 0 || pipelineIndex === 0) {
          expectedIndex = 0;
        }
        if (pipelineIndex !== void 0 && pipelineIndex !== expectedIndex++) {
          commandQueue.remove(i, 1);
          command.reject(abortError(command));
          continue;
        }
        i++;
      }
    }
    function abortTransactionFragments(commandQueue) {
      var _a;
      for (let i = 0; i < commandQueue.length; ) {
        const command = (_a = commandQueue.peekAt(i)) === null || _a === void 0 ? void 0 : _a.command;
        if (command.name === "multi") {
          break;
        }
        if (command.name === "exec") {
          commandQueue.remove(i, 1);
          command.reject(abortError(command));
          break;
        }
        if (command.inTransaction) {
          commandQueue.remove(i, 1);
          command.reject(abortError(command));
        } else {
          i++;
        }
      }
    }
    function closeHandler(self) {
      return function() {
        const prevStatus = self.status;
        self.setStatus("close");
        if (self.commandQueue.length) {
          abortIncompletePipelines(self.commandQueue);
        }
        if (self.offlineQueue.length) {
          abortTransactionFragments(self.offlineQueue);
        }
        if (prevStatus === "ready") {
          if (!self.prevCondition) {
            self.prevCondition = self.condition;
          }
          if (self.commandQueue.length) {
            self.prevCommandQueue = self.commandQueue;
          }
        }
        if (self.manuallyClosing) {
          self.manuallyClosing = false;
          debug("skip reconnecting since the connection is manually closed.");
          return close();
        }
        if (typeof self.options.retryStrategy !== "function") {
          debug("skip reconnecting because `retryStrategy` is not a function");
          return close();
        }
        const retryDelay = self.options.retryStrategy(++self.retryAttempts);
        if (typeof retryDelay !== "number") {
          debug("skip reconnecting because `retryStrategy` doesn't return a number");
          return close();
        }
        debug("reconnect in %sms", retryDelay);
        self.setStatus("reconnecting", retryDelay);
        self.reconnectTimeout = setTimeout(function() {
          self.reconnectTimeout = null;
          self.connect().catch(utils_1.noop);
        }, retryDelay);
        const { maxRetriesPerRequest } = self.options;
        if (typeof maxRetriesPerRequest === "number") {
          if (maxRetriesPerRequest < 0) {
            debug("maxRetriesPerRequest is negative, ignoring...");
          } else {
            const remainder = self.retryAttempts % (maxRetriesPerRequest + 1);
            if (remainder === 0) {
              debug("reach maxRetriesPerRequest limitation, flushing command queue...");
              self.flushQueue(new errors_1.MaxRetriesPerRequestError(maxRetriesPerRequest));
            }
          }
        }
      };
      function close() {
        self.setStatus("end");
        self.flushQueue(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
      }
    }
    exports2.closeHandler = closeHandler;
    function errorHandler(self) {
      return function(error) {
        debug("error: %s", error);
        self.silentEmit("error", error);
      };
    }
    exports2.errorHandler = errorHandler;
    function readyHandler(self) {
      return function() {
        self.setStatus("ready");
        self.retryAttempts = 0;
        if (self.options.monitor) {
          self.call("monitor").then(() => self.setStatus("monitoring"), (error) => self.emit("error", error));
          const { sendCommand } = self;
          self.sendCommand = function(command) {
            if (Command_1.default.checkFlag("VALID_IN_MONITOR_MODE", command.name)) {
              return sendCommand.call(self, command);
            }
            command.reject(new Error("Connection is in monitoring mode, can't process commands."));
            return command.promise;
          };
          self.once("close", function() {
            delete self.sendCommand;
          });
          return;
        }
        const finalSelect = self.prevCondition ? self.prevCondition.select : self.condition.select;
        if (self.options.connectionName) {
          debug("set the connection name [%s]", self.options.connectionName);
          self.client("setname", self.options.connectionName).catch(utils_1.noop);
        }
        if (self.options.readOnly) {
          debug("set the connection to readonly mode");
          self.readonly().catch(utils_1.noop);
        }
        if (self.prevCondition) {
          const condition = self.prevCondition;
          self.prevCondition = null;
          if (condition.subscriber && self.options.autoResubscribe) {
            if (self.condition.select !== finalSelect) {
              debug("connect to db [%d]", finalSelect);
              self.select(finalSelect);
            }
            const subscribeChannels = condition.subscriber.channels("subscribe");
            if (subscribeChannels.length) {
              debug("subscribe %d channels", subscribeChannels.length);
              self.subscribe(subscribeChannels);
            }
            const psubscribeChannels = condition.subscriber.channels("psubscribe");
            if (psubscribeChannels.length) {
              debug("psubscribe %d channels", psubscribeChannels.length);
              self.psubscribe(psubscribeChannels);
            }
            const ssubscribeChannels = condition.subscriber.channels("ssubscribe");
            if (ssubscribeChannels.length) {
              debug("ssubscribe %d channels", ssubscribeChannels.length);
              self.ssubscribe(ssubscribeChannels);
            }
          }
        }
        if (self.prevCommandQueue) {
          if (self.options.autoResendUnfulfilledCommands) {
            debug("resend %d unfulfilled commands", self.prevCommandQueue.length);
            while (self.prevCommandQueue.length > 0) {
              const item = self.prevCommandQueue.shift();
              if (item.select !== self.condition.select && item.command.name !== "select") {
                self.select(item.select);
              }
              self.sendCommand(item.command, item.stream);
            }
          } else {
            self.prevCommandQueue = null;
          }
        }
        if (self.offlineQueue.length) {
          debug("send %d commands in offline queue", self.offlineQueue.length);
          const offlineQueue = self.offlineQueue;
          self.resetOfflineQueue();
          while (offlineQueue.length > 0) {
            const item = offlineQueue.shift();
            if (item.select !== self.condition.select && item.command.name !== "select") {
              self.select(item.select);
            }
            self.sendCommand(item.command, item.stream);
          }
        }
        if (self.condition.select !== finalSelect) {
          debug("connect to db [%d]", finalSelect);
          self.select(finalSelect);
        }
      };
    }
    exports2.readyHandler = readyHandler;
  }
});

// node_modules/ioredis/built/redis/RedisOptions.js
var require_RedisOptions = __commonJS({
  "node_modules/ioredis/built/redis/RedisOptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DEFAULT_REDIS_OPTIONS = void 0;
    exports2.DEFAULT_REDIS_OPTIONS = {
      // Connection
      port: 6379,
      host: "localhost",
      family: 4,
      connectTimeout: 1e4,
      disconnectTimeout: 2e3,
      retryStrategy: function(times) {
        return Math.min(times * 50, 2e3);
      },
      keepAlive: 0,
      noDelay: true,
      connectionName: null,
      // Sentinel
      sentinels: null,
      name: null,
      role: "master",
      sentinelRetryStrategy: function(times) {
        return Math.min(times * 10, 1e3);
      },
      sentinelReconnectStrategy: function() {
        return 6e4;
      },
      natMap: null,
      enableTLSForSentinelMode: false,
      updateSentinels: true,
      failoverDetector: false,
      // Status
      username: null,
      password: null,
      db: 0,
      // Others
      enableOfflineQueue: true,
      enableReadyCheck: true,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true,
      lazyConnect: false,
      keyPrefix: "",
      reconnectOnError: null,
      readOnly: false,
      stringNumbers: false,
      maxRetriesPerRequest: 20,
      maxLoadingRetryTime: 1e4,
      enableAutoPipelining: false,
      autoPipeliningIgnoredCommands: [],
      sentinelMaxConnections: 10
    };
  }
});

// node_modules/ioredis/built/Redis.js
var require_Redis = __commonJS({
  "node_modules/ioredis/built/Redis.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var commands_1 = require_built();
    var events_1 = require("events");
    var standard_as_callback_1 = require_built2();
    var cluster_1 = require_cluster();
    var Command_1 = require_Command();
    var connectors_1 = require_connectors();
    var SentinelConnector_1 = require_SentinelConnector();
    var eventHandler = require_event_handler();
    var RedisOptions_1 = require_RedisOptions();
    var ScanStream_1 = require_ScanStream();
    var transaction_1 = require_transaction();
    var utils_1 = require_utils2();
    var applyMixin_1 = require_applyMixin();
    var Commander_1 = require_Commander();
    var lodash_1 = require_lodash3();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("redis");
    var Redis2 = class _Redis extends Commander_1.default {
      constructor(arg1, arg2, arg3) {
        super();
        this.status = "wait";
        this.isCluster = false;
        this.reconnectTimeout = null;
        this.connectionEpoch = 0;
        this.retryAttempts = 0;
        this.manuallyClosing = false;
        this._autoPipelines = /* @__PURE__ */ new Map();
        this._runningAutoPipelines = /* @__PURE__ */ new Set();
        this.parseOptions(arg1, arg2, arg3);
        events_1.EventEmitter.call(this);
        this.resetCommandQueue();
        this.resetOfflineQueue();
        if (this.options.Connector) {
          this.connector = new this.options.Connector(this.options);
        } else if (this.options.sentinels) {
          const sentinelConnector = new SentinelConnector_1.default(this.options);
          sentinelConnector.emitter = this;
          this.connector = sentinelConnector;
        } else {
          this.connector = new connectors_1.StandaloneConnector(this.options);
        }
        if (this.options.scripts) {
          Object.entries(this.options.scripts).forEach(([name, definition]) => {
            this.defineCommand(name, definition);
          });
        }
        if (this.options.lazyConnect) {
          this.setStatus("wait");
        } else {
          this.connect().catch(lodash_1.noop);
        }
      }
      /**
       * Create a Redis instance.
       * This is the same as `new Redis()` but is included for compatibility with node-redis.
       */
      static createClient(...args) {
        return new _Redis(...args);
      }
      get autoPipelineQueueSize() {
        let queued = 0;
        for (const pipeline of this._autoPipelines.values()) {
          queued += pipeline.length;
        }
        return queued;
      }
      /**
       * Create a connection to Redis.
       * This method will be invoked automatically when creating a new Redis instance
       * unless `lazyConnect: true` is passed.
       *
       * When calling this method manually, a Promise is returned, which will
       * be resolved when the connection status is ready.
       */
      connect(callback) {
        const promise = new Promise((resolve, reject) => {
          if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
            reject(new Error("Redis is already connecting/connected"));
            return;
          }
          this.connectionEpoch += 1;
          this.setStatus("connecting");
          const { options } = this;
          this.condition = {
            select: options.db,
            auth: options.username ? [options.username, options.password] : options.password,
            subscriber: false
          };
          const _this = this;
          (0, standard_as_callback_1.default)(this.connector.connect(function(type3, err) {
            _this.silentEmit(type3, err);
          }), function(err, stream) {
            if (err) {
              _this.flushQueue(err);
              _this.silentEmit("error", err);
              reject(err);
              _this.setStatus("end");
              return;
            }
            let CONNECT_EVENT = options.tls ? "secureConnect" : "connect";
            if ("sentinels" in options && options.sentinels && !options.enableTLSForSentinelMode) {
              CONNECT_EVENT = "connect";
            }
            _this.stream = stream;
            if (options.noDelay) {
              stream.setNoDelay(true);
            }
            if (typeof options.keepAlive === "number") {
              if (stream.connecting) {
                stream.once(CONNECT_EVENT, () => {
                  stream.setKeepAlive(true, options.keepAlive);
                });
              } else {
                stream.setKeepAlive(true, options.keepAlive);
              }
            }
            if (stream.connecting) {
              stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
              if (options.connectTimeout) {
                let connectTimeoutCleared = false;
                stream.setTimeout(options.connectTimeout, function() {
                  if (connectTimeoutCleared) {
                    return;
                  }
                  stream.setTimeout(0);
                  stream.destroy();
                  const err2 = new Error("connect ETIMEDOUT");
                  err2.errorno = "ETIMEDOUT";
                  err2.code = "ETIMEDOUT";
                  err2.syscall = "connect";
                  eventHandler.errorHandler(_this)(err2);
                });
                stream.once(CONNECT_EVENT, function() {
                  connectTimeoutCleared = true;
                  stream.setTimeout(0);
                });
              }
            } else if (stream.destroyed) {
              const firstError = _this.connector.firstError;
              if (firstError) {
                process.nextTick(() => {
                  eventHandler.errorHandler(_this)(firstError);
                });
              }
              process.nextTick(eventHandler.closeHandler(_this));
            } else {
              process.nextTick(eventHandler.connectHandler(_this));
            }
            if (!stream.destroyed) {
              stream.once("error", eventHandler.errorHandler(_this));
              stream.once("close", eventHandler.closeHandler(_this));
            }
            const connectionReadyHandler = function() {
              _this.removeListener("close", connectionCloseHandler);
              resolve();
            };
            var connectionCloseHandler = function() {
              _this.removeListener("ready", connectionReadyHandler);
              reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
            };
            _this.once("ready", connectionReadyHandler);
            _this.once("close", connectionCloseHandler);
          });
        });
        return (0, standard_as_callback_1.default)(promise, callback);
      }
      /**
       * Disconnect from Redis.
       *
       * This method closes the connection immediately,
       * and may lose some pending replies that haven't written to client.
       * If you want to wait for the pending replies, use Redis#quit instead.
       */
      disconnect(reconnect = false) {
        if (!reconnect) {
          this.manuallyClosing = true;
        }
        if (this.reconnectTimeout && !reconnect) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        if (this.status === "wait") {
          eventHandler.closeHandler(this)();
        } else {
          this.connector.disconnect();
        }
      }
      /**
       * Disconnect from Redis.
       *
       * @deprecated
       */
      end() {
        this.disconnect();
      }
      /**
       * Create a new instance with the same options as the current one.
       *
       * @example
       * ```js
       * var redis = new Redis(6380);
       * var anotherRedis = redis.duplicate();
       * ```
       */
      duplicate(override) {
        return new _Redis({ ...this.options, ...override });
      }
      /**
       * Mode of the connection.
       *
       * One of `"normal"`, `"subscriber"`, or `"monitor"`. When the connection is
       * not in `"normal"` mode, certain commands are not allowed.
       */
      get mode() {
        var _a;
        return this.options.monitor ? "monitor" : ((_a = this.condition) === null || _a === void 0 ? void 0 : _a.subscriber) ? "subscriber" : "normal";
      }
      /**
       * Listen for all requests received by the server in real time.
       *
       * This command will create a new connection to Redis and send a
       * MONITOR command via the new connection in order to avoid disturbing
       * the current connection.
       *
       * @param callback The callback function. If omit, a promise will be returned.
       * @example
       * ```js
       * var redis = new Redis();
       * redis.monitor(function (err, monitor) {
       *   // Entering monitoring mode.
       *   monitor.on('monitor', function (time, args, source, database) {
       *     console.log(time + ": " + util.inspect(args));
       *   });
       * });
       *
       * // supports promise as well as other commands
       * redis.monitor().then(function (monitor) {
       *   monitor.on('monitor', function (time, args, source, database) {
       *     console.log(time + ": " + util.inspect(args));
       *   });
       * });
       * ```
       */
      monitor(callback) {
        const monitorInstance = this.duplicate({
          monitor: true,
          lazyConnect: false
        });
        return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
          monitorInstance.once("error", reject);
          monitorInstance.once("monitoring", function() {
            resolve(monitorInstance);
          });
        }), callback);
      }
      /**
       * Send a command to Redis
       *
       * This method is used internally and in most cases you should not
       * use it directly. If you need to send a command that is not supported
       * by the library, you can use the `call` method:
       *
       * ```js
       * const redis = new Redis();
       *
       * redis.call('set', 'foo', 'bar');
       * // or
       * redis.call(['set', 'foo', 'bar']);
       * ```
       *
       * @ignore
       */
      sendCommand(command, stream) {
        var _a, _b;
        if (this.status === "wait") {
          this.connect().catch(lodash_1.noop);
        }
        if (this.status === "end") {
          command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          return command.promise;
        }
        if (((_a = this.condition) === null || _a === void 0 ? void 0 : _a.subscriber) && !Command_1.default.checkFlag("VALID_IN_SUBSCRIBER_MODE", command.name)) {
          command.reject(new Error("Connection in subscriber mode, only subscriber commands may be used"));
          return command.promise;
        }
        if (typeof this.options.commandTimeout === "number") {
          command.setTimeout(this.options.commandTimeout);
        }
        let writable = this.status === "ready" || !stream && this.status === "connect" && (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "loading");
        if (!this.stream) {
          writable = false;
        } else if (!this.stream.writable) {
          writable = false;
        } else if (this.stream._writableState && this.stream._writableState.ended) {
          writable = false;
        }
        if (!writable) {
          if (!this.options.enableOfflineQueue) {
            command.reject(new Error("Stream isn't writeable and enableOfflineQueue options is false"));
            return command.promise;
          }
          if (command.name === "quit" && this.offlineQueue.length === 0) {
            this.disconnect();
            command.resolve(Buffer.from("OK"));
            return command.promise;
          }
          if (debug.enabled) {
            debug("queue command[%s]: %d -> %s(%o)", this._getDescription(), this.condition.select, command.name, command.args);
          }
          this.offlineQueue.push({
            command,
            stream,
            select: this.condition.select
          });
        } else {
          if (debug.enabled) {
            debug("write command[%s]: %d -> %s(%o)", this._getDescription(), (_b = this.condition) === null || _b === void 0 ? void 0 : _b.select, command.name, command.args);
          }
          if (stream) {
            if ("isPipeline" in stream && stream.isPipeline) {
              stream.write(command.toWritable(stream.destination.redis.stream));
            } else {
              stream.write(command.toWritable(stream));
            }
          } else {
            this.stream.write(command.toWritable(this.stream));
          }
          this.commandQueue.push({
            command,
            stream,
            select: this.condition.select
          });
          if (Command_1.default.checkFlag("WILL_DISCONNECT", command.name)) {
            this.manuallyClosing = true;
          }
        }
        if (command.name === "select" && (0, utils_1.isInt)(command.args[0])) {
          const db = parseInt(command.args[0], 10);
          if (this.condition.select !== db) {
            this.condition.select = db;
            this.emit("select", db);
            debug("switch to db [%d]", this.condition.select);
          }
        }
        return command.promise;
      }
      scanStream(options) {
        return this.createScanStream("scan", { options });
      }
      scanBufferStream(options) {
        return this.createScanStream("scanBuffer", { options });
      }
      sscanStream(key, options) {
        return this.createScanStream("sscan", { key, options });
      }
      sscanBufferStream(key, options) {
        return this.createScanStream("sscanBuffer", { key, options });
      }
      hscanStream(key, options) {
        return this.createScanStream("hscan", { key, options });
      }
      hscanBufferStream(key, options) {
        return this.createScanStream("hscanBuffer", { key, options });
      }
      zscanStream(key, options) {
        return this.createScanStream("zscan", { key, options });
      }
      zscanBufferStream(key, options) {
        return this.createScanStream("zscanBuffer", { key, options });
      }
      /**
       * Emit only when there's at least one listener.
       *
       * @ignore
       */
      silentEmit(eventName, arg) {
        let error;
        if (eventName === "error") {
          error = arg;
          if (this.status === "end") {
            return;
          }
          if (this.manuallyClosing) {
            if (error instanceof Error && (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG || // @ts-expect-error
            error.syscall === "connect" || // @ts-expect-error
            error.syscall === "read")) {
              return;
            }
          }
        }
        if (this.listeners(eventName).length > 0) {
          return this.emit.apply(this, arguments);
        }
        if (error && error instanceof Error) {
          console.error("[ioredis] Unhandled error event:", error.stack);
        }
        return false;
      }
      /**
       * @ignore
       */
      recoverFromFatalError(_commandError, err, options) {
        this.flushQueue(err, options);
        this.silentEmit("error", err);
        this.disconnect(true);
      }
      /**
       * @ignore
       */
      handleReconnection(err, item) {
        var _a;
        let needReconnect = false;
        if (this.options.reconnectOnError) {
          needReconnect = this.options.reconnectOnError(err);
        }
        switch (needReconnect) {
          case 1:
          case true:
            if (this.status !== "reconnecting") {
              this.disconnect(true);
            }
            item.command.reject(err);
            break;
          case 2:
            if (this.status !== "reconnecting") {
              this.disconnect(true);
            }
            if (((_a = this.condition) === null || _a === void 0 ? void 0 : _a.select) !== item.select && item.command.name !== "select") {
              this.select(item.select);
            }
            this.sendCommand(item.command);
            break;
          default:
            item.command.reject(err);
        }
      }
      /**
       * Get description of the connection. Used for debugging.
       */
      _getDescription() {
        let description;
        if ("path" in this.options && this.options.path) {
          description = this.options.path;
        } else if (this.stream && this.stream.remoteAddress && this.stream.remotePort) {
          description = this.stream.remoteAddress + ":" + this.stream.remotePort;
        } else if ("host" in this.options && this.options.host) {
          description = this.options.host + ":" + this.options.port;
        } else {
          description = "";
        }
        if (this.options.connectionName) {
          description += ` (${this.options.connectionName})`;
        }
        return description;
      }
      resetCommandQueue() {
        this.commandQueue = new Deque();
      }
      resetOfflineQueue() {
        this.offlineQueue = new Deque();
      }
      parseOptions(...args) {
        const options = {};
        let isTls = false;
        for (let i = 0; i < args.length; ++i) {
          const arg = args[i];
          if (arg === null || typeof arg === "undefined") {
            continue;
          }
          if (typeof arg === "object") {
            (0, lodash_1.defaults)(options, arg);
          } else if (typeof arg === "string") {
            (0, lodash_1.defaults)(options, (0, utils_1.parseURL)(arg));
            if (arg.startsWith("rediss://")) {
              isTls = true;
            }
          } else if (typeof arg === "number") {
            options.port = arg;
          } else {
            throw new Error("Invalid argument " + arg);
          }
        }
        if (isTls) {
          (0, lodash_1.defaults)(options, { tls: true });
        }
        (0, lodash_1.defaults)(options, _Redis.defaultOptions);
        if (typeof options.port === "string") {
          options.port = parseInt(options.port, 10);
        }
        if (typeof options.db === "string") {
          options.db = parseInt(options.db, 10);
        }
        this.options = (0, utils_1.resolveTLSProfile)(options);
      }
      /**
       * Change instance's status
       */
      setStatus(status, arg) {
        if (debug.enabled) {
          debug("status[%s]: %s -> %s", this._getDescription(), this.status || "[empty]", status);
        }
        this.status = status;
        process.nextTick(this.emit.bind(this, status, arg));
      }
      createScanStream(command, { key, options = {} }) {
        return new ScanStream_1.default({
          objectMode: true,
          key,
          redis: this,
          command,
          ...options
        });
      }
      /**
       * Flush offline queue and command queue with error.
       *
       * @param error The error object to send to the commands
       * @param options options
       */
      flushQueue(error, options) {
        options = (0, lodash_1.defaults)({}, options, {
          offlineQueue: true,
          commandQueue: true
        });
        let item;
        if (options.offlineQueue) {
          while (item = this.offlineQueue.shift()) {
            item.command.reject(error);
          }
        }
        if (options.commandQueue) {
          if (this.commandQueue.length > 0) {
            if (this.stream) {
              this.stream.removeAllListeners("data");
            }
            while (item = this.commandQueue.shift()) {
              item.command.reject(error);
            }
          }
        }
      }
      /**
       * Check whether Redis has finished loading the persistent data and is able to
       * process commands.
       */
      _readyCheck(callback) {
        const _this = this;
        this.info(function(err, res) {
          if (err) {
            if (err.message && err.message.includes("NOPERM")) {
              console.warn(`Skipping the ready check because INFO command fails: "${err.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`);
              return callback(null, {});
            }
            return callback(err);
          }
          if (typeof res !== "string") {
            return callback(null, res);
          }
          const info = {};
          const lines = res.split("\r\n");
          for (let i = 0; i < lines.length; ++i) {
            const [fieldName, ...fieldValueParts] = lines[i].split(":");
            const fieldValue = fieldValueParts.join(":");
            if (fieldValue) {
              info[fieldName] = fieldValue;
            }
          }
          if (!info.loading || info.loading === "0") {
            callback(null, info);
          } else {
            const loadingEtaMs = (info.loading_eta_seconds || 1) * 1e3;
            const retryTime = _this.options.maxLoadingRetryTime && _this.options.maxLoadingRetryTime < loadingEtaMs ? _this.options.maxLoadingRetryTime : loadingEtaMs;
            debug("Redis server still loading, trying again in " + retryTime + "ms");
            setTimeout(function() {
              _this._readyCheck(callback);
            }, retryTime);
          }
        }).catch(lodash_1.noop);
      }
    };
    Redis2.Cluster = cluster_1.default;
    Redis2.Command = Command_1.default;
    Redis2.defaultOptions = RedisOptions_1.DEFAULT_REDIS_OPTIONS;
    (0, applyMixin_1.default)(Redis2, events_1.EventEmitter);
    (0, transaction_1.addTransactionSupport)(Redis2.prototype);
    exports2.default = Redis2;
  }
});

// node_modules/ioredis/built/index.js
var require_built3 = __commonJS({
  "node_modules/ioredis/built/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.print = exports2.ReplyError = exports2.SentinelIterator = exports2.SentinelConnector = exports2.AbstractConnector = exports2.Pipeline = exports2.ScanStream = exports2.Command = exports2.Cluster = exports2.Redis = exports2.default = void 0;
    exports2 = module2.exports = require_Redis().default;
    var Redis_1 = require_Redis();
    Object.defineProperty(exports2, "default", { enumerable: true, get: function() {
      return Redis_1.default;
    } });
    var Redis_2 = require_Redis();
    Object.defineProperty(exports2, "Redis", { enumerable: true, get: function() {
      return Redis_2.default;
    } });
    var cluster_1 = require_cluster();
    Object.defineProperty(exports2, "Cluster", { enumerable: true, get: function() {
      return cluster_1.default;
    } });
    var Command_1 = require_Command();
    Object.defineProperty(exports2, "Command", { enumerable: true, get: function() {
      return Command_1.default;
    } });
    var ScanStream_1 = require_ScanStream();
    Object.defineProperty(exports2, "ScanStream", { enumerable: true, get: function() {
      return ScanStream_1.default;
    } });
    var Pipeline_1 = require_Pipeline();
    Object.defineProperty(exports2, "Pipeline", { enumerable: true, get: function() {
      return Pipeline_1.default;
    } });
    var AbstractConnector_1 = require_AbstractConnector();
    Object.defineProperty(exports2, "AbstractConnector", { enumerable: true, get: function() {
      return AbstractConnector_1.default;
    } });
    var SentinelConnector_1 = require_SentinelConnector();
    Object.defineProperty(exports2, "SentinelConnector", { enumerable: true, get: function() {
      return SentinelConnector_1.default;
    } });
    Object.defineProperty(exports2, "SentinelIterator", { enumerable: true, get: function() {
      return SentinelConnector_1.SentinelIterator;
    } });
    exports2.ReplyError = require_redis_errors().ReplyError;
    Object.defineProperty(exports2, "Promise", {
      get() {
        console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
        return Promise;
      },
      set(_lib) {
        console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
      }
    });
    function print(err, reply) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Reply: " + reply);
      }
    }
    exports2.print = print;
  }
});

// src/20240217173500-remove-injections-of-nonexisting-uuids.ts
var t2 = __toESM(require_lib(), 1);

// src/utils/api-cache.ts
var import_ioredis = __toESM(require_built3(), 1);
var ApiCache = class {
  redis;
  enableLogging;
  constructor(args) {
    this.enableLogging = args?.enableLogging ?? false;
    if (typeof process.env.REDIS_URL === "string") {
      this.redis = new import_ioredis.default(process.env.REDIS_URL);
    } else {
      throw new Error("Env `REDIS_URL` is not defined");
    }
  }
  async quit() {
    await this.redis.quit();
  }
  async deleteUnrevisedRevisions() {
    await this.redis.del("serlo.org/unrevised");
  }
  async deleteThreadIds(uuid) {
    await this.redis.del(`de.serlo.org/api/threads/${uuid}`);
  }
  async deleteEvent(eventId) {
    await this.redis.del(`de.serlo.org/api/event/${eventId}`);
  }
  async deleteAllNotifications() {
    const keys4 = await this.redis.keys("de.serlo.org/api/notifications/*");
    for (const key of keys4) {
      await this.redis.del(key);
    }
  }
  async deleteUuid(uuid) {
    await this.redis.del(`de.serlo.org/api/uuid/${uuid}`);
    if (this.enableLogging) {
      console.log(`INFO: API cache for UUID ${uuid} deleted`);
    }
  }
};

// src/utils/database.ts
function createDatabase(db) {
  return {
    runSql: async (query, ...params) => {
      return new Promise((resolve, reject) => {
        db.runSql(query, ...params, (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    },
    dropTable: async (table) => {
      return new Promise((resolve, reject) => {
        db.dropTable(table, (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    }
  };
}

// src/utils/edtr-io.ts
var t = __toESM(require_lib(), 1);

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// node_modules/ramda/es/internal/_arrayReduce.js
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;
  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}

// node_modules/ramda/es/isNil.js
var isNil = /* @__PURE__ */ _curry1(function isNil2(x) {
  return x == null;
});
var isNil_default = isNil;

// node_modules/ramda/es/hasPath.js
var hasPath = /* @__PURE__ */ _curry2(function hasPath2(_path, obj) {
  if (_path.length === 0 || isNil_default(obj)) {
    return false;
  }
  var val = obj;
  var idx = 0;
  while (idx < _path.length) {
    if (!isNil_default(val) && _has(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }
  return true;
});
var hasPath_default = hasPath;

// node_modules/ramda/es/has.js
var has = /* @__PURE__ */ _curry2(function has2(prop, obj) {
  return hasPath_default([prop], obj);
});
var has_default = has;

// node_modules/ramda/es/mapObjIndexed.js
var mapObjIndexed = /* @__PURE__ */ _curry2(function mapObjIndexed2(fn, obj) {
  return _arrayReduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys_default(obj));
});
var mapObjIndexed_default = mapObjIndexed;

// src/utils/edtr-io.ts
function transformPlugins(transformations) {
  return transformLists((value) => {
    if (isPlugin(value)) {
      const transformFunc = transformations[value.plugin];
      if (typeof transformFunc === "function") {
        return transformFunc(value);
      }
    }
  });
}
function transformLists(transform) {
  function applyTransformation(value) {
    if (Array.isArray(value)) {
      const newValue = value.flatMap((element) => {
        const transformation = transform(element);
        return transformation !== void 0 ? transformation : [element];
      });
      return newValue.map(applyTransformation);
    }
    if (typeof value === "object" && value !== null) {
      return mapObjIndexed_default(applyTransformation, value);
    }
    return value;
  }
  return applyTransformation;
}
function isPlugin(value) {
  return has_default("plugin", value) && has_default("state", value) && typeof value.plugin === "string";
}
var SlateNodeDecoder = t.type({ type: t.string });

// src/utils/create-migration.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"), 1);
var import_os = require("os");
function createMigration(exports2, {
  up,
  down
}) {
  exports2._meta = {
    version: 1
  };
  exports2.up = (db, cb) => {
    up(createDatabase(db)).then(() => {
      cb(void 0);
    }).catch((error) => {
      cb(error);
    });
  };
  exports2.down = (db, cb) => {
    if (typeof down === "function") {
      down(createDatabase(db)).then(() => {
        cb();
      }).catch((error) => {
        cb(error);
      });
    } else {
      cb();
    }
  };
}
async function migrateSerloEditorContent({
  migrateState,
  dryRun,
  apiCache,
  db,
  migrationName = "migration",
  log = console.log
}) {
  const logFileName = import_path.default.join((0, import_os.tmpdir)(), `${migrationName}.log.json`);
  const logFileStream = (0, import_fs.createWriteStream)(logFileName);
  log("Convert entity revisions");
  await changeUuidContents({
    query: `
          SELECT
            entity_revision_field.id as id,
            entity_revision_field.entity_revision_id as uuid,
            entity_revision_field.value as content
          FROM entity_revision_field
          JOIN entity_revision on entity_revision_field.entity_revision_id = entity_revision.id
          JOIN entity on entity.id = entity_revision.repository_id
          JOIN type on type.id = entity.type_id
          WHERE
            ((entity_revision_field.field = "content" and type.name != "video")
            or field = "reasoning" or field = "description")
            and type.name not in ("input-expression-equal-match-challenge",
              "input-number-exact-match-challenge", "input-string-normalized-match-challenge",
              "math-puzzle", "multiple-choice-right-answer", "multiple-choice-wrong-answer",
              "single-choice-right-answer", "single-choice-wrong-answer")
            and entity_revision_field.id > ?
        `,
    migrateState,
    table: "entity_revision_field",
    column: "value",
    apiCache,
    dryRun,
    db,
    log,
    logFileStream
  });
  log("Convert page revisions");
  await changeUuidContents({
    query: `
          SELECT
            page_revision.id, page_revision.content, page_revision.id as uuid
          FROM page_revision WHERE page_revision.id > ?
        `,
    migrateState,
    table: "page_revision",
    column: "content",
    apiCache,
    dryRun,
    db,
    log,
    logFileStream
  });
  log("Convert taxonomy terms");
  await changeUuidContents({
    query: `
          SELECT id, description as content, id as uuid
          FROM term_taxonomy WHERE id > ?
        `,
    migrateState,
    table: "term_taxonomy",
    column: "description",
    apiCache,
    dryRun,
    db,
    log,
    logFileStream
  });
  log("Convert users");
  await changeUuidContents({
    query: `
          SELECT id, description as content, id as uuid
          FROM user WHERE id != 191656 and description != "NULL" and id > ?
        `,
    migrateState,
    table: "user",
    column: "description",
    apiCache,
    dryRun,
    db,
    log,
    logFileStream
  });
}
async function changeUuidContents({
  query,
  db,
  migrateState,
  apiCache,
  dryRun,
  table,
  column,
  logFileStream,
  log
}) {
  const querySQL = query + " LIMIT ?";
  let uuids = [];
  do {
    const lastID = uuids.at(-1)?.id ?? 0;
    log(`Last ID: ${lastID}`);
    uuids = await db.runSql(querySQL, lastID, 5e3);
    for (const uuid of uuids) {
      let oldState;
      try {
        oldState = JSON.parse(uuid.content);
      } catch (e) {
        continue;
      }
      if (!isPlugin(oldState)) {
        continue;
      }
      const newContent = JSON.stringify(migrateState(oldState));
      if (newContent !== JSON.stringify(oldState)) {
        if (!dryRun) {
          await db.runSql(
            `UPDATE ${table} SET ${column} = ? WHERE id = ?`,
            newContent,
            uuid.id
          );
          await apiCache.deleteUuid(uuid.uuid);
        }
        log(`Update ${table}.${column} with ID ${uuid.uuid}`);
        logFileStream.write(
          JSON.stringify({
            table,
            column,
            uuid: uuid.uuid,
            tableId: uuid.id,
            oldContent: uuid.content,
            newContent
          })
        );
        logFileStream.write("\n");
      }
    }
  } while (uuids.length > 0);
}

// src/20240217173500-remove-injections-of-nonexisting-uuids.ts
var InjectionPlugin = t2.type({
  plugin: t2.literal("injection"),
  state: t2.string
});
createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache();
    const rows = await db.runSql("select id from uuid");
    const uuids = rows.map((x) => x.id);
    await migrateSerloEditorContent({
      apiCache,
      db,
      migrateState: transformPlugins({
        injection: (plugin) => {
          if (!InjectionPlugin.is(plugin)) {
            return void 0;
          }
          const match = /^\/?(\d+)$/.exec(plugin.state);
          if (match) {
            const uuid = parseInt(match[1]);
            if (!Number.isNaN(uuid) && !uuids.includes(uuid)) {
              console.log(`Delete injection with uuid ${uuid}`);
              return void 0;
            }
          }
          return [plugin];
        }
      })
    });
    await apiCache.quit();
  }
});
