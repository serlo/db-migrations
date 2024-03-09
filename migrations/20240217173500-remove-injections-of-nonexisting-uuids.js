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
        return function(self2) {
          return body.apply(void 0, __spreadArray([self2], args, false));
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
      return /* @__PURE__ */ (0, function_1.dual)(3, function(self2, f, onNullable) {
        return M.flatMap(self2, (0, exports2.liftNullable)(F)(f, onNullable));
      });
    };
    exports2.flatMapNullable = flatMapNullable;
    var flatMapOption = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(3, function(self2, f, onNone) {
        return M.flatMap(self2, (0, exports2.liftOption)(F)(f, onNone));
      });
    };
    exports2.flatMapOption = flatMapOption;
    var flatMapEither = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self2, f) {
        return M.flatMap(self2, function(a) {
          return F.fromEither(f(a));
        });
      });
    };
    exports2.flatMapEither = flatMapEither;
    var flatMapIO = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self2, f) {
        return M.flatMap(self2, function(a) {
          return F.fromIO(f(a));
        });
      });
    };
    exports2.flatMapIO = flatMapIO;
    var flatMapTask = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self2, f) {
        return M.flatMap(self2, function(a) {
          return F.fromTask(f(a));
        });
      });
    };
    exports2.flatMapTask = flatMapTask;
    var flatMapReader = function(F, M) {
      return /* @__PURE__ */ (0, function_1.dual)(2, function(self2, f) {
        return M.flatMap(self2, function(a) {
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
      return function(self2, b) {
        return F.map(self2, function() {
          return b;
        });
      };
    }
    exports2.as = as;
    function asUnit(F) {
      var asM = as(F);
      return function(self2) {
        return asM(self2, void 0);
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
      return function(self2, f) {
        return tapM(self2, fromEither(f));
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
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
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
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
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
            const self2 = this, groupedRecords = (0, util_1.groupSrvRecords)(records), sortedKeys = Object.keys(groupedRecords).sort((a, b) => parseInt(a) - parseInt(b));
            function tryFirstOne(err2) {
              if (!sortedKeys.length) {
                return reject(err2);
              }
              const key = sortedKeys[0], group = groupedRecords[key], record = (0, util_1.weightSrvRecords)(group);
              if (!group.records.length) {
                sortedKeys.shift();
              }
              self2.dnsLookup(record.name).then((host) => resolve({
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
    function connectHandler(self2) {
      return function() {
        self2.setStatus("connect");
        self2.resetCommandQueue();
        let flushed = false;
        const { connectionEpoch } = self2;
        if (self2.condition.auth) {
          self2.auth(self2.condition.auth, function(err) {
            if (connectionEpoch !== self2.connectionEpoch) {
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
                self2.recoverFromFatalError(err, err);
              }
            }
          });
        }
        if (self2.condition.select) {
          self2.select(self2.condition.select).catch((err) => {
            self2.silentEmit("error", err);
          });
        }
        if (!self2.options.enableReadyCheck) {
          exports2.readyHandler(self2)();
        }
        new DataHandler_1.default(self2, {
          stringNumbers: self2.options.stringNumbers
        });
        if (self2.options.enableReadyCheck) {
          self2._readyCheck(function(err, info) {
            if (connectionEpoch !== self2.connectionEpoch) {
              return;
            }
            if (err) {
              if (!flushed) {
                self2.recoverFromFatalError(new Error("Ready check failed: " + err.message), err);
              }
            } else {
              if (self2.connector.check(info)) {
                exports2.readyHandler(self2)();
              } else {
                self2.disconnect(true);
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
    function closeHandler(self2) {
      return function() {
        const prevStatus = self2.status;
        self2.setStatus("close");
        if (self2.commandQueue.length) {
          abortIncompletePipelines(self2.commandQueue);
        }
        if (self2.offlineQueue.length) {
          abortTransactionFragments(self2.offlineQueue);
        }
        if (prevStatus === "ready") {
          if (!self2.prevCondition) {
            self2.prevCondition = self2.condition;
          }
          if (self2.commandQueue.length) {
            self2.prevCommandQueue = self2.commandQueue;
          }
        }
        if (self2.manuallyClosing) {
          self2.manuallyClosing = false;
          debug("skip reconnecting since the connection is manually closed.");
          return close();
        }
        if (typeof self2.options.retryStrategy !== "function") {
          debug("skip reconnecting because `retryStrategy` is not a function");
          return close();
        }
        const retryDelay = self2.options.retryStrategy(++self2.retryAttempts);
        if (typeof retryDelay !== "number") {
          debug("skip reconnecting because `retryStrategy` doesn't return a number");
          return close();
        }
        debug("reconnect in %sms", retryDelay);
        self2.setStatus("reconnecting", retryDelay);
        self2.reconnectTimeout = setTimeout(function() {
          self2.reconnectTimeout = null;
          self2.connect().catch(utils_1.noop);
        }, retryDelay);
        const { maxRetriesPerRequest } = self2.options;
        if (typeof maxRetriesPerRequest === "number") {
          if (maxRetriesPerRequest < 0) {
            debug("maxRetriesPerRequest is negative, ignoring...");
          } else {
            const remainder = self2.retryAttempts % (maxRetriesPerRequest + 1);
            if (remainder === 0) {
              debug("reach maxRetriesPerRequest limitation, flushing command queue...");
              self2.flushQueue(new errors_1.MaxRetriesPerRequestError(maxRetriesPerRequest));
            }
          }
        }
      };
      function close() {
        self2.setStatus("end");
        self2.flushQueue(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
      }
    }
    exports2.closeHandler = closeHandler;
    function errorHandler(self2) {
      return function(error) {
        debug("error: %s", error);
        self2.silentEmit("error", error);
      };
    }
    exports2.errorHandler = errorHandler;
    function readyHandler(self2) {
      return function() {
        self2.setStatus("ready");
        self2.retryAttempts = 0;
        if (self2.options.monitor) {
          self2.call("monitor").then(() => self2.setStatus("monitoring"), (error) => self2.emit("error", error));
          const { sendCommand } = self2;
          self2.sendCommand = function(command) {
            if (Command_1.default.checkFlag("VALID_IN_MONITOR_MODE", command.name)) {
              return sendCommand.call(self2, command);
            }
            command.reject(new Error("Connection is in monitoring mode, can't process commands."));
            return command.promise;
          };
          self2.once("close", function() {
            delete self2.sendCommand;
          });
          return;
        }
        const finalSelect = self2.prevCondition ? self2.prevCondition.select : self2.condition.select;
        if (self2.options.connectionName) {
          debug("set the connection name [%s]", self2.options.connectionName);
          self2.client("setname", self2.options.connectionName).catch(utils_1.noop);
        }
        if (self2.options.readOnly) {
          debug("set the connection to readonly mode");
          self2.readonly().catch(utils_1.noop);
        }
        if (self2.prevCondition) {
          const condition = self2.prevCondition;
          self2.prevCondition = null;
          if (condition.subscriber && self2.options.autoResubscribe) {
            if (self2.condition.select !== finalSelect) {
              debug("connect to db [%d]", finalSelect);
              self2.select(finalSelect);
            }
            const subscribeChannels = condition.subscriber.channels("subscribe");
            if (subscribeChannels.length) {
              debug("subscribe %d channels", subscribeChannels.length);
              self2.subscribe(subscribeChannels);
            }
            const psubscribeChannels = condition.subscriber.channels("psubscribe");
            if (psubscribeChannels.length) {
              debug("psubscribe %d channels", psubscribeChannels.length);
              self2.psubscribe(psubscribeChannels);
            }
            const ssubscribeChannels = condition.subscriber.channels("ssubscribe");
            if (ssubscribeChannels.length) {
              debug("ssubscribe %d channels", ssubscribeChannels.length);
              self2.ssubscribe(ssubscribeChannels);
            }
          }
        }
        if (self2.prevCommandQueue) {
          if (self2.options.autoResendUnfulfilledCommands) {
            debug("resend %d unfulfilled commands", self2.prevCommandQueue.length);
            while (self2.prevCommandQueue.length > 0) {
              const item = self2.prevCommandQueue.shift();
              if (item.select !== self2.condition.select && item.command.name !== "select") {
                self2.select(item.select);
              }
              self2.sendCommand(item.command, item.stream);
            }
          } else {
            self2.prevCommandQueue = null;
          }
        }
        if (self2.offlineQueue.length) {
          debug("send %d commands in offline queue", self2.offlineQueue.length);
          const offlineQueue = self2.offlineQueue;
          self2.resetOfflineQueue();
          while (offlineQueue.length > 0) {
            const item = offlineQueue.shift();
            if (item.select !== self2.condition.select && item.command.name !== "select") {
              self2.select(item.select);
            }
            self2.sendCommand(item.command, item.stream);
          }
        }
        if (self2.condition.select !== finalSelect) {
          debug("connect to db [%d]", finalSelect);
          self2.select(finalSelect);
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

// node_modules/is-stream/index.js
var require_is_stream = __commonJS({
  "node_modules/is-stream/index.js"(exports2, module2) {
    "use strict";
    var isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
    isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
    isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
    isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
    isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function";
    module2.exports = isStream;
  }
});

// node_modules/p-queue/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/p-queue/node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has3 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once2) {
      this.fn = fn;
      this.context = context;
      this.once = once2 || false;
    }
    function addListener(emitter, event, fn, context, once2) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once2), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has3.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once2(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once2) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once2 || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once2 && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/p-finally/index.js
var require_p_finally = __commonJS({
  "node_modules/p-finally/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (promise, onFinally) => {
      onFinally = onFinally || (() => {
      });
      return promise.then(
        (val) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => val),
        (err) => new Promise((resolve) => {
          resolve(onFinally());
        }).then(() => {
          throw err;
        })
      );
    };
  }
});

// node_modules/p-timeout/index.js
var require_p_timeout = __commonJS({
  "node_modules/p-timeout/index.js"(exports2, module2) {
    "use strict";
    var pFinally = require_p_finally();
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    };
    var pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
      if (typeof milliseconds !== "number" || milliseconds < 0) {
        throw new TypeError("Expected `milliseconds` to be a positive number");
      }
      if (milliseconds === Infinity) {
        resolve(promise);
        return;
      }
      const timer = setTimeout(() => {
        if (typeof fallback === "function") {
          try {
            resolve(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        const message = typeof fallback === "string" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
        const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        reject(timeoutError);
      }, milliseconds);
      pFinally(
        // eslint-disable-next-line promise/prefer-await-to-then
        promise.then(resolve, reject),
        () => {
          clearTimeout(timer);
        }
      );
    });
    module2.exports = pTimeout;
    module2.exports.default = pTimeout;
    module2.exports.TimeoutError = TimeoutError;
  }
});

// node_modules/p-queue/dist/lower-bound.js
var require_lower_bound = __commonJS({
  "node_modules/p-queue/dist/lower-bound.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function lowerBound(array, value, comparator) {
      let first = 0;
      let count = array.length;
      while (count > 0) {
        const step = count / 2 | 0;
        let it = first + step;
        if (comparator(array[it], value) <= 0) {
          first = ++it;
          count -= step + 1;
        } else {
          count = step;
        }
      }
      return first;
    }
    exports2.default = lowerBound;
  }
});

// node_modules/p-queue/dist/priority-queue.js
var require_priority_queue = __commonJS({
  "node_modules/p-queue/dist/priority-queue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var lower_bound_1 = require_lower_bound();
    var PriorityQueue = class {
      constructor() {
        this._queue = [];
      }
      enqueue(run, options) {
        options = Object.assign({ priority: 0 }, options);
        const element = {
          priority: options.priority,
          run
        };
        if (this.size && this._queue[this.size - 1].priority >= options.priority) {
          this._queue.push(element);
          return;
        }
        const index = lower_bound_1.default(this._queue, element, (a, b) => b.priority - a.priority);
        this._queue.splice(index, 0, element);
      }
      dequeue() {
        const item = this._queue.shift();
        return item === null || item === void 0 ? void 0 : item.run;
      }
      filter(options) {
        return this._queue.filter((element) => element.priority === options.priority).map((element) => element.run);
      }
      get size() {
        return this._queue.length;
      }
    };
    exports2.default = PriorityQueue;
  }
});

// node_modules/p-queue/dist/index.js
var require_dist = __commonJS({
  "node_modules/p-queue/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var EventEmitter = require_eventemitter3();
    var p_timeout_1 = require_p_timeout();
    var priority_queue_1 = require_priority_queue();
    var empty = () => {
    };
    var timeoutError = new p_timeout_1.TimeoutError();
    var PQueue = class extends EventEmitter {
      constructor(options) {
        var _a, _b, _c, _d;
        super();
        this._intervalCount = 0;
        this._intervalEnd = 0;
        this._pendingCount = 0;
        this._resolveEmpty = empty;
        this._resolveIdle = empty;
        options = Object.assign({ carryoverConcurrencyCount: false, intervalCap: Infinity, interval: 0, concurrency: Infinity, autoStart: true, queueClass: priority_queue_1.default }, options);
        if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
          throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ""}\` (${typeof options.intervalCap})`);
        }
        if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
          throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""}\` (${typeof options.interval})`);
        }
        this._carryoverConcurrencyCount = options.carryoverConcurrencyCount;
        this._isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
        this._intervalCap = options.intervalCap;
        this._interval = options.interval;
        this._queue = new options.queueClass();
        this._queueClass = options.queueClass;
        this.concurrency = options.concurrency;
        this._timeout = options.timeout;
        this._throwOnTimeout = options.throwOnTimeout === true;
        this._isPaused = options.autoStart === false;
      }
      get _doesIntervalAllowAnother() {
        return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
      }
      get _doesConcurrentAllowAnother() {
        return this._pendingCount < this._concurrency;
      }
      _next() {
        this._pendingCount--;
        this._tryToStartAnother();
        this.emit("next");
      }
      _resolvePromises() {
        this._resolveEmpty();
        this._resolveEmpty = empty;
        if (this._pendingCount === 0) {
          this._resolveIdle();
          this._resolveIdle = empty;
          this.emit("idle");
        }
      }
      _onResumeInterval() {
        this._onInterval();
        this._initializeIntervalIfNeeded();
        this._timeoutId = void 0;
      }
      _isIntervalPaused() {
        const now = Date.now();
        if (this._intervalId === void 0) {
          const delay = this._intervalEnd - now;
          if (delay < 0) {
            this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
          } else {
            if (this._timeoutId === void 0) {
              this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, delay);
            }
            return true;
          }
        }
        return false;
      }
      _tryToStartAnother() {
        if (this._queue.size === 0) {
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }
          this._intervalId = void 0;
          this._resolvePromises();
          return false;
        }
        if (!this._isPaused) {
          const canInitializeInterval = !this._isIntervalPaused();
          if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
            const job = this._queue.dequeue();
            if (!job) {
              return false;
            }
            this.emit("active");
            job();
            if (canInitializeInterval) {
              this._initializeIntervalIfNeeded();
            }
            return true;
          }
        }
        return false;
      }
      _initializeIntervalIfNeeded() {
        if (this._isIntervalIgnored || this._intervalId !== void 0) {
          return;
        }
        this._intervalId = setInterval(() => {
          this._onInterval();
        }, this._interval);
        this._intervalEnd = Date.now() + this._interval;
      }
      _onInterval() {
        if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
          clearInterval(this._intervalId);
          this._intervalId = void 0;
        }
        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        this._processQueue();
      }
      /**
      Executes all queued functions until it reaches the limit.
      */
      _processQueue() {
        while (this._tryToStartAnother()) {
        }
      }
      get concurrency() {
        return this._concurrency;
      }
      set concurrency(newConcurrency) {
        if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
          throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
        }
        this._concurrency = newConcurrency;
        this._processQueue();
      }
      /**
      Adds a sync or async task to the queue. Always returns a promise.
      */
      async add(fn, options = {}) {
        return new Promise((resolve, reject) => {
          const run = async () => {
            this._pendingCount++;
            this._intervalCount++;
            try {
              const operation = this._timeout === void 0 && options.timeout === void 0 ? fn() : p_timeout_1.default(Promise.resolve(fn()), options.timeout === void 0 ? this._timeout : options.timeout, () => {
                if (options.throwOnTimeout === void 0 ? this._throwOnTimeout : options.throwOnTimeout) {
                  reject(timeoutError);
                }
                return void 0;
              });
              resolve(await operation);
            } catch (error) {
              reject(error);
            }
            this._next();
          };
          this._queue.enqueue(run, options);
          this._tryToStartAnother();
          this.emit("add");
        });
      }
      /**
          Same as `.add()`, but accepts an array of sync or async functions.
      
          @returns A promise that resolves when all functions are resolved.
          */
      async addAll(functions, options) {
        return Promise.all(functions.map(async (function_) => this.add(function_, options)));
      }
      /**
      Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
      */
      start() {
        if (!this._isPaused) {
          return this;
        }
        this._isPaused = false;
        this._processQueue();
        return this;
      }
      /**
      Put queue execution on hold.
      */
      pause() {
        this._isPaused = true;
      }
      /**
      Clear the queue.
      */
      clear() {
        this._queue = new this._queueClass();
      }
      /**
          Can be called multiple times. Useful if you for example add additional items at a later time.
      
          @returns A promise that settles when the queue becomes empty.
          */
      async onEmpty() {
        if (this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveEmpty;
          this._resolveEmpty = () => {
            existingResolve();
            resolve();
          };
        });
      }
      /**
          The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
      
          @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
          */
      async onIdle() {
        if (this._pendingCount === 0 && this._queue.size === 0) {
          return;
        }
        return new Promise((resolve) => {
          const existingResolve = this._resolveIdle;
          this._resolveIdle = () => {
            existingResolve();
            resolve();
          };
        });
      }
      /**
      Size of the queue.
      */
      get size() {
        return this._queue.size;
      }
      /**
          Size of the queue, filtered by the given options.
      
          For example, this can be used to find the number of items remaining in the queue with a specific priority level.
          */
      sizeBy(options) {
        return this._queue.filter(options).length;
      }
      /**
      Number of pending promises.
      */
      get pending() {
        return this._pendingCount;
      }
      /**
      Whether the queue is currently paused.
      */
      get isPaused() {
        return this._isPaused;
      }
      get timeout() {
        return this._timeout;
      }
      /**
      Set the timeout for future operations.
      */
      set timeout(milliseconds) {
        this._timeout = milliseconds;
      }
    };
    exports2.default = PQueue;
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports2, module2) {
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    module2.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports2) {
    var RetryOperation = require_retry_operation();
    exports2.operation = function(options) {
      var timeouts = exports2.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports2.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports2.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports2.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = function retryWrapper(original2) {
          var op = exports2.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }.bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports2, module2) {
    module2.exports = require_retry();
  }
});

// node_modules/p-retry/index.js
var require_p_retry = __commonJS({
  "node_modules/p-retry/index.js"(exports2, module2) {
    "use strict";
    var retry = require_retry2();
    var networkErrorMsgs = [
      "Failed to fetch",
      // Chrome
      "NetworkError when attempting to fetch resource.",
      // Firefox
      "The Internet connection appears to be offline.",
      // Safari
      "Network request failed"
      // `cross-fetch`
    ];
    var AbortError = class extends Error {
      constructor(message) {
        super();
        if (message instanceof Error) {
          this.originalError = message;
          ({ message } = message);
        } else {
          this.originalError = new Error(message);
          this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
      }
    };
    var decorateErrorWithCounts = (error, attemptNumber, options) => {
      const retriesLeft = options.retries - (attemptNumber - 1);
      error.attemptNumber = attemptNumber;
      error.retriesLeft = retriesLeft;
      return error;
    };
    var isNetworkError = (errorMessage) => networkErrorMsgs.includes(errorMessage);
    var pRetry = (input, options) => new Promise((resolve, reject) => {
      options = {
        onFailedAttempt: () => {
        },
        retries: 10,
        ...options
      };
      const operation = retry.operation(options);
      operation.attempt(async (attemptNumber) => {
        try {
          resolve(await input(attemptNumber));
        } catch (error) {
          if (!(error instanceof Error)) {
            reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
            return;
          }
          if (error instanceof AbortError) {
            operation.stop();
            reject(error.originalError);
          } else if (error instanceof TypeError && !isNetworkError(error.message)) {
            operation.stop();
            reject(error);
          } else {
            decorateErrorWithCounts(error, attemptNumber, options);
            try {
              await options.onFailedAttempt(error);
            } catch (error2) {
              reject(error2);
              return;
            }
            if (!operation.retry(error)) {
              reject(operation.mainError());
            }
          }
        }
      });
    });
    module2.exports = pRetry;
    module2.exports.default = pRetry;
    module2.exports.AbortError = AbortError;
  }
});

// node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/delayed-stream/lib/delayed_stream.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    var util = require("util");
    module2.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/combined-stream/lib/combined_stream.js"(exports2, module2) {
    var util = require("util");
    var Stream = require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module2.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream) {
      return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
    };
    CombinedStream.prototype.append = function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(function(stream2) {
        var isStreamLike = CombinedStream.isStreamLike(stream2);
        if (isStreamLike) {
          stream2.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream2);
        }
        this._pipeNext(stream2);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream) {
      var self2 = this;
      stream.on("error", function(err) {
        self2._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function")
        this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function")
        this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self2 = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }
        self2.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type3) {
      if (!type3 || typeof type3 !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type3);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2)
          mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type3) {
      if (!type3 || typeof type3 !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type3);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path2) {
      if (!path2 || typeof path2 !== "string") {
        return false;
      }
      var extension2 = extname("x." + path2).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type3) {
        var mime = db[type3];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type3] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type3;
        }
      });
    }
  }
});

// node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/asynckit/lib/defer.js"(exports2, module2) {
    module2.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/asynckit/lib/async.js"(exports2, module2) {
    var defer = require_defer();
    module2.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/asynckit/lib/abort.js"(exports2, module2) {
    module2.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/asynckit/lib/iterate.js"(exports2, module2) {
    var async = require_async();
    var abort = require_abort();
    module2.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/asynckit/lib/state.js"(exports2, module2) {
    module2.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/asynckit/lib/terminator.js"(exports2, module2) {
    var abort = require_abort();
    var async = require_async();
    module2.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/asynckit/parallel.js"(exports2, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/asynckit/serialOrdered.js"(exports2, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = serialOrdered;
    module2.exports.ascending = ascending;
    module2.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/asynckit/serial.js"(exports2, module2) {
    var serialOrdered = require_serialOrdered();
    module2.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  }
});

// node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/asynckit/index.js"(exports2, module2) {
    module2.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/form-data/lib/populate.js"(exports2, module2) {
    module2.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/form-data/lib/form_data.js"(exports2, module2) {
    var CombinedStream = require_combined_stream();
    var util = require("util");
    var path2 = require("path");
    var http = require("http");
    var https = require("https");
    var parseUrl = require("url").parse;
    var fs = require("fs");
    var Stream = require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var populate = require_populate();
    module2.exports = FormData2;
    util.inherits(FormData2, CombinedStream);
    function FormData2(options) {
      if (!(this instanceof FormData2)) {
        return new FormData2(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData2.LINE_BREAK = "\r\n";
    FormData2.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData2.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (util.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData2.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData2.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && value.hasOwnProperty("httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData2.prototype._lengthRetriever = function(value, callback) {
      if (value.hasOwnProperty("fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs.stat(value.path, function(err, stat) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (value.hasOwnProperty("httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (value.hasOwnProperty("httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, +response.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData2.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header == "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (!headers.hasOwnProperty(prop))
          continue;
        header = headers[prop];
        if (header == null) {
          continue;
        }
        if (!Array.isArray(header)) {
          header = [header];
        }
        if (header.length) {
          contents += prop + ": " + header.join("; ") + FormData2.LINE_BREAK;
        }
      }
      return "--" + this.getBoundary() + FormData2.LINE_BREAK + contents + FormData2.LINE_BREAK;
    };
    FormData2.prototype._getContentDisposition = function(value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path2.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path2.basename(options.filename || value.name || value.path);
      } else if (value.readable && value.hasOwnProperty("httpVersion")) {
        filename = path2.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData2.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value.readable && value.hasOwnProperty("httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData2.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData2.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData2.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData2.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData2.LINE_BREAK;
    };
    FormData2.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (userHeaders.hasOwnProperty(header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData2.prototype.setBoundary = function(boundary) {
      this._boundary = boundary;
    };
    FormData2.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData2.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData2.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData2.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData2.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData2.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData2.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData2.prototype.submit = function(params, cb) {
      var request, options, defaults = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request = https.request(options);
      } else {
        request = http.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData2.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData2.prototype.toString = function() {
      return "[object FormData]";
    };
  }
});

// node_modules/proxy-from-env/index.js
var require_proxy_from_env = __commonJS({
  "node_modules/proxy-from-env/index.js"(exports2) {
    "use strict";
    var parseUrl = require("url").parse;
    var DEFAULT_PORTS = {
      ftp: 21,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    };
    var stringEndsWith = String.prototype.endsWith || function(s) {
      return s.length <= this.length && this.indexOf(s, this.length - s.length) !== -1;
    };
    function getProxyForUrl(url) {
      var parsedUrl = typeof url === "string" ? parseUrl(url) : url || {};
      var proto = parsedUrl.protocol;
      var hostname = parsedUrl.host;
      var port = parsedUrl.port;
      if (typeof hostname !== "string" || !hostname || typeof proto !== "string") {
        return "";
      }
      proto = proto.split(":", 1)[0];
      hostname = hostname.replace(/:\d*$/, "");
      port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
      if (!shouldProxy(hostname, port)) {
        return "";
      }
      var proxy = getEnv("npm_config_" + proto + "_proxy") || getEnv(proto + "_proxy") || getEnv("npm_config_proxy") || getEnv("all_proxy");
      if (proxy && proxy.indexOf("://") === -1) {
        proxy = proto + "://" + proxy;
      }
      return proxy;
    }
    function shouldProxy(hostname, port) {
      var NO_PROXY = (getEnv("npm_config_no_proxy") || getEnv("no_proxy")).toLowerCase();
      if (!NO_PROXY) {
        return true;
      }
      if (NO_PROXY === "*") {
        return false;
      }
      return NO_PROXY.split(/[,\s]/).every(function(proxy) {
        if (!proxy) {
          return true;
        }
        var parsedProxy = proxy.match(/^(.+):(\d+)$/);
        var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
        var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
        if (parsedProxyPort && parsedProxyPort !== port) {
          return true;
        }
        if (!/^[.*]/.test(parsedProxyHostname)) {
          return hostname !== parsedProxyHostname;
        }
        if (parsedProxyHostname.charAt(0) === "*") {
          parsedProxyHostname = parsedProxyHostname.slice(1);
        }
        return !stringEndsWith.call(hostname, parsedProxyHostname);
      });
    }
    function getEnv(key) {
      return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
    }
    exports2.getProxyForUrl = getProxyForUrl;
  }
});

// node_modules/follow-redirects/debug.js
var require_debug2 = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports2, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports2, module2) {
    var url = require("url");
    var URL2 = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug2();
    var useNativeURL = false;
    try {
      assert(new URL2());
    } catch (error) {
      useNativeURL = error.code === "ERR_INVALID_URL";
    }
    var preservedUrlFields = [
      "auth",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "hash"
    ];
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded",
      RedirectionError
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );
    var destroy = Writable.prototype.destroy || noop;
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        try {
          self2._processResponse(response);
        } catch (cause) {
          self2.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
        }
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      destroyRequest(this._currentRequest);
      this._currentRequest.abort();
      this.emit("abort");
    };
    RedirectableRequest.prototype.destroy = function(error) {
      destroyRequest(this._currentRequest, error);
      destroy.call(this, error);
      return this;
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction(data)) {
        callback = data;
        data = encoding = null;
      } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        self2.removeListener("abort", clearTimer);
        self2.removeListener("error", clearTimer);
        self2.removeListener("response", clearTimer);
        self2.removeListener("close", clearTimer);
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      this.on("close", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        throw new TypeError("Unsupported protocol " + protocol);
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : (
        // When making a request to a proxy, […]
        // a client MUST send the target URI in absolute-form […].
        this._options.path
      );
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self2._currentRequest) {
            if (error) {
              self2.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      destroyRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        throw new TooManyRedirectsError();
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          // The Host header was set by nativeProtocol.request
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = parseUrl(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl = resolveUrl(location, currentUrl);
      debug("redirecting to", redirectUrl.href);
      this._isRedirect = true;
      spreadUrlObject(redirectUrl, this._options);
      if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (isFunction(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails);
        this._sanitizeOptions(this._options);
      }
      this._performRequest();
    };
    function wrap(protocols) {
      var exports3 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports3[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isURL(input)) {
            input = spreadUrlObject(input);
          } else if (isString(input)) {
            input = spreadUrlObject(parseUrl(input));
          } else {
            callback = options;
            options = validateUrl(input);
            input = { protocol };
          }
          if (isFunction(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports3.maxRedirects,
            maxBodyLength: exports3.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString(options.host) && !isString(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports3;
    }
    function noop() {
    }
    function parseUrl(input) {
      var parsed;
      if (useNativeURL) {
        parsed = new URL2(input);
      } else {
        parsed = validateUrl(url.parse(input));
        if (!isString(parsed.protocol)) {
          throw new InvalidUrlError({ input });
        }
      }
      return parsed;
    }
    function resolveUrl(relative, base) {
      return useNativeURL ? new URL2(relative, base) : parseUrl(url.resolve(base, relative));
    }
    function validateUrl(input) {
      if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
        throw new InvalidUrlError({ input: input.href || input });
      }
      if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
        throw new InvalidUrlError({ input: input.href || input });
      }
      return input;
    }
    function spreadUrlObject(urlObject, target) {
      var spread = target || {};
      for (var key of preservedUrlFields) {
        spread[key] = urlObject[key];
      }
      if (spread.hostname.startsWith("[")) {
        spread.hostname = spread.hostname.slice(1, -1);
      }
      if (spread.port !== "") {
        spread.port = Number(spread.port);
      }
      spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
      return spread;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      CustomError.prototype = new (baseClass || Error)();
      Object.defineProperties(CustomError.prototype, {
        constructor: {
          value: CustomError,
          enumerable: false
        },
        name: {
          value: "Error [" + code + "]",
          enumerable: false
        }
      });
      return CustomError;
    }
    function destroyRequest(request, error) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.destroy(error);
    }
    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isBuffer(value) {
      return typeof value === "object" && "length" in value;
    }
    function isURL(value) {
      return URL2 && value instanceof URL2;
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/dist/node/axios.cjs
var require_axios = __commonJS({
  "node_modules/axios/dist/node/axios.cjs"(exports2, module2) {
    "use strict";
    var FormData$1 = require_form_data();
    var url = require("url");
    var proxyFromEnv = require_proxy_from_env();
    var http = require("http");
    var https = require("https");
    var util = require("util");
    var followRedirects = require_follow_redirects();
    var zlib = require("zlib");
    var stream = require("stream");
    var EventEmitter = require("events");
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var FormData__default = /* @__PURE__ */ _interopDefaultLegacy(FormData$1);
    var url__default = /* @__PURE__ */ _interopDefaultLegacy(url);
    var http__default = /* @__PURE__ */ _interopDefaultLegacy(http);
    var https__default = /* @__PURE__ */ _interopDefaultLegacy(https);
    var util__default = /* @__PURE__ */ _interopDefaultLegacy(util);
    var followRedirects__default = /* @__PURE__ */ _interopDefaultLegacy(followRedirects);
    var zlib__default = /* @__PURE__ */ _interopDefaultLegacy(zlib);
    var stream__default = /* @__PURE__ */ _interopDefaultLegacy(stream);
    var EventEmitter__default = /* @__PURE__ */ _interopDefaultLegacy(EventEmitter);
    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }
    var { toString: toString2 } = Object.prototype;
    var { getPrototypeOf } = Object;
    var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
      const str = toString2.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(/* @__PURE__ */ Object.create(null));
    var kindOfTest = (type3) => {
      type3 = type3.toLowerCase();
      return (thing) => kindOf(thing) === type3;
    };
    var typeOfTest = (type3) => (thing) => typeof thing === type3;
    var { isArray } = Array;
    var isUndefined = typeOfTest("undefined");
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      let result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    var isString = typeOfTest("string");
    var isFunction = typeOfTest("function");
    var isNumber = typeOfTest("number");
    var isObject = (thing) => thing !== null && typeof thing === "object";
    var isBoolean = (thing) => thing === true || thing === false;
    var isPlainObject = (val) => {
      if (kindOf(val) !== "object") {
        return false;
      }
      const prototype2 = getPrototypeOf(val);
      return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    var isStream = (val) => isObject(val) && isFunction(val.pipe);
    var isFormData = (thing) => {
      let kind;
      return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
      kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
    };
    var isURLSearchParams = kindOfTest("URLSearchParams");
    var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    function forEach(obj, fn, { allOwnKeys = false } = {}) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      let i;
      let l;
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        const keys4 = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys4.length;
        let key;
        for (i = 0; i < len; i++) {
          key = keys4[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }
    function findKey(obj, key) {
      key = key.toLowerCase();
      const keys4 = Object.keys(obj);
      let i = keys4.length;
      let _key;
      while (i-- > 0) {
        _key = keys4[i];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }
    var _global = (() => {
      if (typeof globalThis !== "undefined")
        return globalThis;
      return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
    })();
    var isContextDefined = (context) => !isUndefined(context) && context !== _global;
    function merge() {
      const { caseless } = isContextDefined(this) && this || {};
      const result = {};
      const assignValue = (val, key) => {
        const targetKey = caseless && findKey(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };
      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }
      return result;
    }
    var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
      forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, { allOwnKeys });
      return a;
    };
    var stripBOM = (content) => {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    };
    var inherits = (constructor, superConstructor, props, descriptors2) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, "super", {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };
    var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i;
      let prop;
      const merged = {};
      destObj = destObj || {};
      if (sourceObj == null)
        return destObj;
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    };
    var endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
    var toArray = (thing) => {
      if (!thing)
        return null;
      if (isArray(thing))
        return thing;
      let i = thing.length;
      if (!isNumber(i))
        return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };
    var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
      return (thing) => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
    var forEachEntry = (obj, fn) => {
      const generator = obj && obj[Symbol.iterator];
      const iterator = generator.call(obj);
      let result;
      while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };
    var matchAll = (regExp, str) => {
      let matches;
      const arr = [];
      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }
      return arr;
    };
    var isHTMLForm = kindOfTest("HTMLFormElement");
    var toCamelCase = (str) => {
      return str.toLowerCase().replace(
        /[-_\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };
    var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
    var isRegExp = kindOfTest("RegExp");
    var reduceDescriptors = (obj, reducer) => {
      const descriptors2 = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};
      forEach(descriptors2, (descriptor, name) => {
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) {
          reducedDescriptors[name] = ret || descriptor;
        }
      });
      Object.defineProperties(obj, reducedDescriptors);
    };
    var freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
          return false;
        }
        const value = obj[name];
        if (!isFunction(value))
          return;
        descriptor.enumerable = false;
        if ("writable" in descriptor) {
          descriptor.writable = false;
          return;
        }
        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error("Can not rewrite read-only method '" + name + "'");
          };
        }
      });
    };
    var toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};
      const define = (arr) => {
        arr.forEach((value) => {
          obj[value] = true;
        });
      };
      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
      return obj;
    };
    var noop = () => {
    };
    var toFiniteNumber = (value, defaultValue) => {
      value = +value;
      return Number.isFinite(value) ? value : defaultValue;
    };
    var ALPHA = "abcdefghijklmnopqrstuvwxyz";
    var DIGIT = "0123456789";
    var ALPHABET = {
      DIGIT,
      ALPHA,
      ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    };
    var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
      let str = "";
      const { length } = alphabet;
      while (size--) {
        str += alphabet[Math.random() * length | 0];
      }
      return str;
    };
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
    }
    var toJSONObject = (obj) => {
      const stack = new Array(10);
      const visit = (source, i) => {
        if (isObject(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }
          if (!("toJSON" in source)) {
            stack[i] = source;
            const target = isArray(source) ? [] : {};
            forEach(source, (value, key) => {
              const reducedValue = visit(value, i + 1);
              !isUndefined(reducedValue) && (target[key] = reducedValue);
            });
            stack[i] = void 0;
            return target;
          }
        }
        return source;
      };
      return visit(obj, 0);
    };
    var isAsyncFn = kindOfTest("AsyncFunction");
    var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
    var utils$1 = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isRegExp,
      isFunction,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty,
      // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop,
      toFiniteNumber,
      findKey,
      global: _global,
      isContextDefined,
      ALPHABET,
      generateString,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable
    };
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack;
      }
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils$1.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils$1.toJSONObject(this.config),
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype$1 = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED",
      "ERR_NOT_SUPPORT",
      "ERR_INVALID_URL"
      // eslint-disable-next-line func-names
    ].forEach((code) => {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype$1, "isAxiosError", { value: true });
    AxiosError.from = (error, code, config, request, response, customProps) => {
      const axiosError = Object.create(prototype$1);
      utils$1.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, (prop) => {
        return prop !== "isAxiosError";
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.cause = error;
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    function isVisitable(thing) {
      return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
    }
    function removeBrackets(key) {
      return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
    }
    function renderKey(path2, key, dots) {
      if (!path2)
        return key;
      return path2.concat(key).map(function each(token, i) {
        token = removeBrackets(token);
        return !dots && i ? "[" + token + "]" : token;
      }).join(dots ? "." : "");
    }
    function isFlatArray(arr) {
      return utils$1.isArray(arr) && !arr.some(isVisitable);
    }
    var predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });
    function toFormData(obj, formData, options) {
      if (!utils$1.isObject(obj)) {
        throw new TypeError("target must be an object");
      }
      formData = formData || new (FormData__default["default"] || FormData)();
      options = utils$1.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        return !utils$1.isUndefined(source[option]);
      });
      const metaTokens = options.metaTokens;
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
      const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
      if (!utils$1.isFunction(visitor)) {
        throw new TypeError("visitor must be a function");
      }
      function convertValue(value) {
        if (value === null)
          return "";
        if (utils$1.isDate(value)) {
          return value.toISOString();
        }
        if (!useBlob && utils$1.isBlob(value)) {
          throw new AxiosError("Blob is not supported. Use a Buffer instead.");
        }
        if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
          return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function defaultVisitor(value, key, path2) {
        let arr = value;
        if (value && !path2 && typeof value === "object") {
          if (utils$1.endsWith(key, "{}")) {
            key = metaTokens ? key : key.slice(0, -2);
            value = JSON.stringify(value);
          } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
            key = removeBrackets(key);
            arr.forEach(function each(el, index) {
              !(utils$1.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
                convertValue(el)
              );
            });
            return false;
          }
        }
        if (isVisitable(value)) {
          return true;
        }
        formData.append(renderKey(path2, key, dots), convertValue(value));
        return false;
      }
      const stack = [];
      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });
      function build(value, path2) {
        if (utils$1.isUndefined(value))
          return;
        if (stack.indexOf(value) !== -1) {
          throw Error("Circular reference detected in " + path2.join("."));
        }
        stack.push(value);
        utils$1.forEach(value, function each(el, key) {
          const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
            formData,
            el,
            utils$1.isString(key) ? key.trim() : key,
            path2,
            exposedHelpers
          );
          if (result === true) {
            build(el, path2 ? path2.concat(key) : [key]);
          }
        });
        stack.pop();
      }
      if (!utils$1.isObject(obj)) {
        throw new TypeError("data must be an object");
      }
      build(obj);
      return formData;
    }
    function encode$1(str) {
      const charMap = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];
      params && toFormData(params, this, options);
    }
    var prototype = AxiosURLSearchParams.prototype;
    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };
    prototype.toString = function toString3(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;
      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + "=" + _encode(pair[1]);
      }, "").join("&");
    };
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    function buildURL(url2, params, options) {
      if (!params) {
        return url2;
      }
      const _encode = options && options.encode || encode;
      const serializeFn = options && options.serialize;
      let serializedParams;
      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
      }
      if (serializedParams) {
        const hashmarkIndex = url2.indexOf("#");
        if (hashmarkIndex !== -1) {
          url2 = url2.slice(0, hashmarkIndex);
        }
        url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url2;
    }
    var InterceptorManager = class {
      constructor() {
        this.handlers = [];
      }
      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }
      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }
      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }
      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    };
    var InterceptorManager$1 = InterceptorManager;
    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
    var URLSearchParams = url__default["default"].URLSearchParams;
    var platform$1 = {
      isNode: true,
      classes: {
        URLSearchParams,
        FormData: FormData__default["default"],
        Blob: typeof Blob !== "undefined" && Blob || null
      },
      protocols: ["http", "https", "file", "data"]
    };
    var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
    var hasStandardBrowserEnv = ((product) => {
      return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
    })(typeof navigator !== "undefined" && navigator.product);
    var hasStandardBrowserWebWorkerEnv = (() => {
      return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
    })();
    var utils = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      hasBrowserEnv,
      hasStandardBrowserWebWorkerEnv,
      hasStandardBrowserEnv
    });
    var platform = {
      ...utils,
      ...platform$1
    };
    function toURLEncodedForm(data, options) {
      return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path2, helpers) {
          if (platform.isNode && utils$1.isBuffer(value)) {
            this.append(key, value.toString("base64"));
            return false;
          }
          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }
    function parsePropPath(name) {
      return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
        return match[0] === "[]" ? "" : match[1] || match[0];
      });
    }
    function arrayToObject(arr) {
      const obj = {};
      const keys4 = Object.keys(arr);
      let i;
      const len = keys4.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys4[i];
        obj[key] = arr[key];
      }
      return obj;
    }
    function formDataToJSON(formData) {
      function buildPath(path2, value, target, index) {
        let name = path2[index++];
        if (name === "__proto__")
          return true;
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path2.length;
        name = !name && utils$1.isArray(target) ? target.length : name;
        if (isLast) {
          if (utils$1.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }
          return !isNumericKey;
        }
        if (!target[name] || !utils$1.isObject(target[name])) {
          target[name] = [];
        }
        const result = buildPath(path2, value, target[name], index);
        if (result && utils$1.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }
        return !isNumericKey;
      }
      if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
        const obj = {};
        utils$1.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });
        return obj;
      }
      return null;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils$1.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$1.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: ["xhr", "http"],
      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || "";
        const hasJSONContentType = contentType.indexOf("application/json") > -1;
        const isObjectPayload = utils$1.isObject(data);
        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }
        const isFormData2 = utils$1.isFormData(data);
        if (isFormData2) {
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }
        if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data)) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
          return data.toString();
        }
        let isFileList2;
        if (isObjectPayload) {
          if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }
          if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
            const _FormData = this.env && this.env.FormData;
            return toFormData(
              isFileList2 ? { "files[]": data } : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }
        if (isObjectPayload || hasJSONContentType) {
          headers.setContentType("application/json", false);
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === "json";
        if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": void 0
        }
      }
    };
    utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
      defaults.headers[method] = {};
    });
    var defaults$1 = defaults;
    var ignoreDuplicateOf = utils$1.toObjectSet([
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ]);
    var parseHeaders = (rawHeaders) => {
      const parsed = {};
      let key;
      let val;
      let i;
      rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
        i = line.indexOf(":");
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();
        if (!key || parsed[key] && ignoreDuplicateOf[key]) {
          return;
        }
        if (key === "set-cookie") {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      });
      return parsed;
    };
    var $internals = Symbol("internals");
    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }
    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }
      return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
    }
    function parseTokens(str) {
      const tokens = /* @__PURE__ */ Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;
      while (match = tokensRE.exec(str)) {
        tokens[match[1]] = match[2];
      }
      return tokens;
    }
    var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils$1.isFunction(filter)) {
        return filter.call(this, value, header);
      }
      if (isHeaderNameFilter) {
        value = header;
      }
      if (!utils$1.isString(value))
        return;
      if (utils$1.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }
      if (utils$1.isRegExp(filter)) {
        return filter.test(value);
      }
    }
    function formatHeader(header) {
      return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
    }
    function buildAccessors(obj, header) {
      const accessorName = utils$1.toCamelCase(" " + header);
      ["get", "set", "has"].forEach((methodName) => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }
    var AxiosHeaders = class {
      constructor(headers) {
        headers && this.set(headers);
      }
      set(header, valueOrRewrite, rewrite) {
        const self2 = this;
        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);
          if (!lHeader) {
            throw new Error("header name must be a non-empty string");
          }
          const key = utils$1.findKey(self2, lHeader);
          if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
            self2[key || _header] = normalizeValue(_value);
          }
        }
        const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }
        return this;
      }
      get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
          const key = utils$1.findKey(this, header);
          if (key) {
            const value = this[key];
            if (!parser) {
              return value;
            }
            if (parser === true) {
              return parseTokens(value);
            }
            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key);
            }
            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }
            throw new TypeError("parser must be boolean|regexp|function");
          }
        }
      }
      has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
          const key = utils$1.findKey(this, header);
          return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
      }
      delete(header, matcher) {
        const self2 = this;
        let deleted = false;
        function deleteHeader(_header) {
          _header = normalizeHeader(_header);
          if (_header) {
            const key = utils$1.findKey(self2, _header);
            if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
              delete self2[key];
              deleted = true;
            }
          }
        }
        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }
        return deleted;
      }
      clear(matcher) {
        const keys4 = Object.keys(this);
        let i = keys4.length;
        let deleted = false;
        while (i--) {
          const key = keys4[i];
          if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }
        return deleted;
      }
      normalize(format) {
        const self2 = this;
        const headers = {};
        utils$1.forEach(this, (value, header) => {
          const key = utils$1.findKey(headers, header);
          if (key) {
            self2[key] = normalizeValue(value);
            delete self2[header];
            return;
          }
          const normalized = format ? formatHeader(header) : String(header).trim();
          if (normalized !== header) {
            delete self2[header];
          }
          self2[normalized] = normalizeValue(value);
          headers[normalized] = true;
        });
        return this;
      }
      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }
      toJSON(asStrings) {
        const obj = /* @__PURE__ */ Object.create(null);
        utils$1.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
        });
        return obj;
      }
      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }
      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
      }
      get [Symbol.toStringTag]() {
        return "AxiosHeaders";
      }
      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }
      static concat(first, ...targets) {
        const computed = new this(first);
        targets.forEach((target) => computed.set(target));
        return computed;
      }
      static accessor(header) {
        const internals = this[$internals] = this[$internals] = {
          accessors: {}
        };
        const accessors = internals.accessors;
        const prototype2 = this.prototype;
        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);
          if (!accessors[lHeader]) {
            buildAccessors(prototype2, _header);
            accessors[lHeader] = true;
          }
        }
        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
      }
    };
    AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
    utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
      let mapped = key[0].toUpperCase() + key.slice(1);
      return {
        get: () => value,
        set(headerValue) {
          this[mapped] = headerValue;
        }
      };
    });
    utils$1.freezeMethods(AxiosHeaders);
    var AxiosHeaders$1 = AxiosHeaders;
    function transformData(fns, response) {
      const config = this || defaults$1;
      const context = response || config;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;
      utils$1.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
      });
      headers.normalize();
      return data;
    }
    function isCancel(value) {
      return !!(value && value.__CANCEL__);
    }
    function CanceledError(message, config, request) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
      this.name = "CanceledError";
    }
    utils$1.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }
    function isAbsoluteURL(url2) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
    }
    function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    }
    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }
    var VERSION = "1.6.7";
    function parseProtocol(url2) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
      return match && match[1] || "";
    }
    var DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
    function fromDataURI(uri, asBlob, options) {
      const _Blob = options && options.Blob || platform.classes.Blob;
      const protocol = parseProtocol(uri);
      if (asBlob === void 0 && _Blob) {
        asBlob = true;
      }
      if (protocol === "data") {
        uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
        const match = DATA_URL_PATTERN.exec(uri);
        if (!match) {
          throw new AxiosError("Invalid URL", AxiosError.ERR_INVALID_URL);
        }
        const mime = match[1];
        const isBase64 = match[2];
        const body = match[3];
        const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? "base64" : "utf8");
        if (asBlob) {
          if (!_Blob) {
            throw new AxiosError("Blob is not supported", AxiosError.ERR_NOT_SUPPORT);
          }
          return new _Blob([buffer], { type: mime });
        }
        return buffer;
      }
      throw new AxiosError("Unsupported protocol " + protocol, AxiosError.ERR_NOT_SUPPORT);
    }
    function throttle(fn, freq) {
      let timestamp = 0;
      const threshold = 1e3 / freq;
      let timer = null;
      return function throttled(force, args) {
        const now = Date.now();
        if (force || now - timestamp > threshold) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          timestamp = now;
          return fn.apply(null, args);
        }
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            timestamp = Date.now();
            return fn.apply(null, args);
          }, threshold - (now - timestamp));
        }
      };
    }
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;
      min = min !== void 0 ? min : 1e3;
      return function push(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) {
          firstSampleTS = now;
        }
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i = tail;
        let bytesCount = 0;
        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }
        if (now - firstSampleTS < min) {
          return;
        }
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
      };
    }
    var kInternals = Symbol("internals");
    var AxiosTransformStream = class extends stream__default["default"].Transform {
      constructor(options) {
        options = utils$1.toFlatObject(options, {
          maxRate: 0,
          chunkSize: 64 * 1024,
          minChunkSize: 100,
          timeWindow: 500,
          ticksRate: 2,
          samplesCount: 15
        }, null, (prop, source) => {
          return !utils$1.isUndefined(source[prop]);
        });
        super({
          readableHighWaterMark: options.chunkSize
        });
        const self2 = this;
        const internals = this[kInternals] = {
          length: options.length,
          timeWindow: options.timeWindow,
          ticksRate: options.ticksRate,
          chunkSize: options.chunkSize,
          maxRate: options.maxRate,
          minChunkSize: options.minChunkSize,
          bytesSeen: 0,
          isCaptured: false,
          notifiedBytesLoaded: 0,
          ts: Date.now(),
          bytes: 0,
          onReadCallback: null
        };
        const _speedometer = speedometer(internals.ticksRate * options.samplesCount, internals.timeWindow);
        this.on("newListener", (event) => {
          if (event === "progress") {
            if (!internals.isCaptured) {
              internals.isCaptured = true;
            }
          }
        });
        let bytesNotified = 0;
        internals.updateProgress = throttle(function throttledHandler() {
          const totalBytes = internals.length;
          const bytesTransferred = internals.bytesSeen;
          const progressBytes = bytesTransferred - bytesNotified;
          if (!progressBytes || self2.destroyed)
            return;
          const rate = _speedometer(progressBytes);
          bytesNotified = bytesTransferred;
          process.nextTick(() => {
            self2.emit("progress", {
              "loaded": bytesTransferred,
              "total": totalBytes,
              "progress": totalBytes ? bytesTransferred / totalBytes : void 0,
              "bytes": progressBytes,
              "rate": rate ? rate : void 0,
              "estimated": rate && totalBytes && bytesTransferred <= totalBytes ? (totalBytes - bytesTransferred) / rate : void 0
            });
          });
        }, internals.ticksRate);
        const onFinish = () => {
          internals.updateProgress(true);
        };
        this.once("end", onFinish);
        this.once("error", onFinish);
      }
      _read(size) {
        const internals = this[kInternals];
        if (internals.onReadCallback) {
          internals.onReadCallback();
        }
        return super._read(size);
      }
      _transform(chunk, encoding, callback) {
        const self2 = this;
        const internals = this[kInternals];
        const maxRate = internals.maxRate;
        const readableHighWaterMark = this.readableHighWaterMark;
        const timeWindow = internals.timeWindow;
        const divider = 1e3 / timeWindow;
        const bytesThreshold = maxRate / divider;
        const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;
        function pushChunk(_chunk, _callback) {
          const bytes = Buffer.byteLength(_chunk);
          internals.bytesSeen += bytes;
          internals.bytes += bytes;
          if (internals.isCaptured) {
            internals.updateProgress();
          }
          if (self2.push(_chunk)) {
            process.nextTick(_callback);
          } else {
            internals.onReadCallback = () => {
              internals.onReadCallback = null;
              process.nextTick(_callback);
            };
          }
        }
        const transformChunk = (_chunk, _callback) => {
          const chunkSize = Buffer.byteLength(_chunk);
          let chunkRemainder = null;
          let maxChunkSize = readableHighWaterMark;
          let bytesLeft;
          let passed = 0;
          if (maxRate) {
            const now = Date.now();
            if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
              internals.ts = now;
              bytesLeft = bytesThreshold - internals.bytes;
              internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
              passed = 0;
            }
            bytesLeft = bytesThreshold - internals.bytes;
          }
          if (maxRate) {
            if (bytesLeft <= 0) {
              return setTimeout(() => {
                _callback(null, _chunk);
              }, timeWindow - passed);
            }
            if (bytesLeft < maxChunkSize) {
              maxChunkSize = bytesLeft;
            }
          }
          if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
            chunkRemainder = _chunk.subarray(maxChunkSize);
            _chunk = _chunk.subarray(0, maxChunkSize);
          }
          pushChunk(_chunk, chunkRemainder ? () => {
            process.nextTick(_callback, null, chunkRemainder);
          } : _callback);
        };
        transformChunk(chunk, function transformNextChunk(err, _chunk) {
          if (err) {
            return callback(err);
          }
          if (_chunk) {
            transformChunk(_chunk, transformNextChunk);
          } else {
            callback(null);
          }
        });
      }
      setLength(length) {
        this[kInternals].length = +length;
        return this;
      }
    };
    var AxiosTransformStream$1 = AxiosTransformStream;
    var { asyncIterator } = Symbol;
    var readBlob = async function* (blob) {
      if (blob.stream) {
        yield* blob.stream();
      } else if (blob.arrayBuffer) {
        yield await blob.arrayBuffer();
      } else if (blob[asyncIterator]) {
        yield* blob[asyncIterator]();
      } else {
        yield blob;
      }
    };
    var readBlob$1 = readBlob;
    var BOUNDARY_ALPHABET = utils$1.ALPHABET.ALPHA_DIGIT + "-_";
    var textEncoder = new util.TextEncoder();
    var CRLF = "\r\n";
    var CRLF_BYTES = textEncoder.encode(CRLF);
    var CRLF_BYTES_COUNT = 2;
    var FormDataPart = class {
      constructor(name, value) {
        const { escapeName } = this.constructor;
        const isStringValue = utils$1.isString(value);
        let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
        if (isStringValue) {
          value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
        } else {
          headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
        }
        this.headers = textEncoder.encode(headers + CRLF);
        this.contentLength = isStringValue ? value.byteLength : value.size;
        this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
        this.name = name;
        this.value = value;
      }
      async *encode() {
        yield this.headers;
        const { value } = this;
        if (utils$1.isTypedArray(value)) {
          yield value;
        } else {
          yield* readBlob$1(value);
        }
        yield CRLF_BYTES;
      }
      static escapeName(name) {
        return String(name).replace(/[\r\n"]/g, (match) => ({
          "\r": "%0D",
          "\n": "%0A",
          '"': "%22"
        })[match]);
      }
    };
    var formDataToStream = (form, headersHandler, options) => {
      const {
        tag = "form-data-boundary",
        size = 25,
        boundary = tag + "-" + utils$1.generateString(size, BOUNDARY_ALPHABET)
      } = options || {};
      if (!utils$1.isFormData(form)) {
        throw TypeError("FormData instance required");
      }
      if (boundary.length < 1 || boundary.length > 70) {
        throw Error("boundary must be 10-70 characters long");
      }
      const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
      const footerBytes = textEncoder.encode("--" + boundary + "--" + CRLF + CRLF);
      let contentLength = footerBytes.byteLength;
      const parts = Array.from(form.entries()).map(([name, value]) => {
        const part = new FormDataPart(name, value);
        contentLength += part.size;
        return part;
      });
      contentLength += boundaryBytes.byteLength * parts.length;
      contentLength = utils$1.toFiniteNumber(contentLength);
      const computedHeaders = {
        "Content-Type": `multipart/form-data; boundary=${boundary}`
      };
      if (Number.isFinite(contentLength)) {
        computedHeaders["Content-Length"] = contentLength;
      }
      headersHandler && headersHandler(computedHeaders);
      return stream.Readable.from(async function* () {
        for (const part of parts) {
          yield boundaryBytes;
          yield* part.encode();
        }
        yield footerBytes;
      }());
    };
    var formDataToStream$1 = formDataToStream;
    var ZlibHeaderTransformStream = class extends stream__default["default"].Transform {
      __transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
      }
      _transform(chunk, encoding, callback) {
        if (chunk.length !== 0) {
          this._transform = this.__transform;
          if (chunk[0] !== 120) {
            const header = Buffer.alloc(2);
            header[0] = 120;
            header[1] = 156;
            this.push(header, encoding);
          }
        }
        this.__transform(chunk, encoding, callback);
      }
    };
    var ZlibHeaderTransformStream$1 = ZlibHeaderTransformStream;
    var callbackify = (fn, reducer) => {
      return utils$1.isAsyncFn(fn) ? function(...args) {
        const cb = args.pop();
        fn.apply(this, args).then((value) => {
          try {
            reducer ? cb(null, ...reducer(value)) : cb(null, value);
          } catch (err) {
            cb(err);
          }
        }, cb);
      } : fn;
    };
    var callbackify$1 = callbackify;
    var zlibOptions = {
      flush: zlib__default["default"].constants.Z_SYNC_FLUSH,
      finishFlush: zlib__default["default"].constants.Z_SYNC_FLUSH
    };
    var brotliOptions = {
      flush: zlib__default["default"].constants.BROTLI_OPERATION_FLUSH,
      finishFlush: zlib__default["default"].constants.BROTLI_OPERATION_FLUSH
    };
    var isBrotliSupported = utils$1.isFunction(zlib__default["default"].createBrotliDecompress);
    var { http: httpFollow, https: httpsFollow } = followRedirects__default["default"];
    var isHttps = /https:?/;
    var supportedProtocols = platform.protocols.map((protocol) => {
      return protocol + ":";
    });
    function dispatchBeforeRedirect(options, responseDetails) {
      if (options.beforeRedirects.proxy) {
        options.beforeRedirects.proxy(options);
      }
      if (options.beforeRedirects.config) {
        options.beforeRedirects.config(options, responseDetails);
      }
    }
    function setProxy(options, configProxy, location) {
      let proxy = configProxy;
      if (!proxy && proxy !== false) {
        const proxyUrl = proxyFromEnv.getProxyForUrl(location);
        if (proxyUrl) {
          proxy = new URL(proxyUrl);
        }
      }
      if (proxy) {
        if (proxy.username) {
          proxy.auth = (proxy.username || "") + ":" + (proxy.password || "");
        }
        if (proxy.auth) {
          if (proxy.auth.username || proxy.auth.password) {
            proxy.auth = (proxy.auth.username || "") + ":" + (proxy.auth.password || "");
          }
          const base64 = Buffer.from(proxy.auth, "utf8").toString("base64");
          options.headers["Proxy-Authorization"] = "Basic " + base64;
        }
        options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
        const proxyHost = proxy.hostname || proxy.host;
        options.hostname = proxyHost;
        options.host = proxyHost;
        options.port = proxy.port;
        options.path = location;
        if (proxy.protocol) {
          options.protocol = proxy.protocol.includes(":") ? proxy.protocol : `${proxy.protocol}:`;
        }
      }
      options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
        setProxy(redirectOptions, configProxy, redirectOptions.href);
      };
    }
    var isHttpAdapterSupported = typeof process !== "undefined" && utils$1.kindOf(process) === "process";
    var wrapAsync = (asyncExecutor) => {
      return new Promise((resolve, reject) => {
        let onDone;
        let isDone;
        const done = (value, isRejected) => {
          if (isDone)
            return;
          isDone = true;
          onDone && onDone(value, isRejected);
        };
        const _resolve = (value) => {
          done(value);
          resolve(value);
        };
        const _reject = (reason) => {
          done(reason, true);
          reject(reason);
        };
        asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
      });
    };
    var resolveFamily = ({ address, family }) => {
      if (!utils$1.isString(address)) {
        throw TypeError("address must be a string");
      }
      return {
        address,
        family: family || (address.indexOf(".") < 0 ? 6 : 4)
      };
    };
    var buildAddressEntry = (address, family) => resolveFamily(utils$1.isObject(address) ? address : { address, family });
    var httpAdapter = isHttpAdapterSupported && function httpAdapter2(config) {
      return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
        let { data, lookup, family } = config;
        const { responseType, responseEncoding } = config;
        const method = config.method.toUpperCase();
        let isDone;
        let rejected = false;
        let req;
        if (lookup) {
          const _lookup = callbackify$1(lookup, (value) => utils$1.isArray(value) ? value : [value]);
          lookup = (hostname, opt, cb) => {
            _lookup(hostname, opt, (err, arg0, arg1) => {
              if (err) {
                return cb(err);
              }
              const addresses = utils$1.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
              opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
            });
          };
        }
        const emitter = new EventEmitter__default["default"]();
        const onFinished = () => {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(abort);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", abort);
          }
          emitter.removeAllListeners();
        };
        onDone((value, isRejected) => {
          isDone = true;
          if (isRejected) {
            rejected = true;
            onFinished();
          }
        });
        function abort(reason) {
          emitter.emit("abort", !reason || reason.type ? new CanceledError(null, config, req) : reason);
        }
        emitter.once("abort", reject);
        if (config.cancelToken || config.signal) {
          config.cancelToken && config.cancelToken.subscribe(abort);
          if (config.signal) {
            config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
          }
        }
        const fullPath = buildFullPath(config.baseURL, config.url);
        const parsed = new URL(fullPath, "http://localhost");
        const protocol = parsed.protocol || supportedProtocols[0];
        if (protocol === "data:") {
          let convertedData;
          if (method !== "GET") {
            return settle(resolve, reject, {
              status: 405,
              statusText: "method not allowed",
              headers: {},
              config
            });
          }
          try {
            convertedData = fromDataURI(config.url, responseType === "blob", {
              Blob: config.env && config.env.Blob
            });
          } catch (err) {
            throw AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config);
          }
          if (responseType === "text") {
            convertedData = convertedData.toString(responseEncoding);
            if (!responseEncoding || responseEncoding === "utf8") {
              convertedData = utils$1.stripBOM(convertedData);
            }
          } else if (responseType === "stream") {
            convertedData = stream__default["default"].Readable.from(convertedData);
          }
          return settle(resolve, reject, {
            data: convertedData,
            status: 200,
            statusText: "OK",
            headers: new AxiosHeaders$1(),
            config
          });
        }
        if (supportedProtocols.indexOf(protocol) === -1) {
          return reject(new AxiosError(
            "Unsupported protocol " + protocol,
            AxiosError.ERR_BAD_REQUEST,
            config
          ));
        }
        const headers = AxiosHeaders$1.from(config.headers).normalize();
        headers.set("User-Agent", "axios/" + VERSION, false);
        const onDownloadProgress = config.onDownloadProgress;
        const onUploadProgress = config.onUploadProgress;
        const maxRate = config.maxRate;
        let maxUploadRate = void 0;
        let maxDownloadRate = void 0;
        if (utils$1.isSpecCompliantForm(data)) {
          const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
          data = formDataToStream$1(data, (formHeaders) => {
            headers.set(formHeaders);
          }, {
            tag: `axios-${VERSION}-boundary`,
            boundary: userBoundary && userBoundary[1] || void 0
          });
        } else if (utils$1.isFormData(data) && utils$1.isFunction(data.getHeaders)) {
          headers.set(data.getHeaders());
          if (!headers.hasContentLength()) {
            try {
              const knownLength = await util__default["default"].promisify(data.getLength).call(data);
              Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
            } catch (e) {
            }
          }
        } else if (utils$1.isBlob(data)) {
          data.size && headers.setContentType(data.type || "application/octet-stream");
          headers.setContentLength(data.size || 0);
          data = stream__default["default"].Readable.from(readBlob$1(data));
        } else if (data && !utils$1.isStream(data)) {
          if (Buffer.isBuffer(data))
            ;
          else if (utils$1.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils$1.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(new AxiosError(
              "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
              AxiosError.ERR_BAD_REQUEST,
              config
            ));
          }
          headers.setContentLength(data.length, false);
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(new AxiosError(
              "Request body larger than maxBodyLength limit",
              AxiosError.ERR_BAD_REQUEST,
              config
            ));
          }
        }
        const contentLength = utils$1.toFiniteNumber(headers.getContentLength());
        if (utils$1.isArray(maxRate)) {
          maxUploadRate = maxRate[0];
          maxDownloadRate = maxRate[1];
        } else {
          maxUploadRate = maxDownloadRate = maxRate;
        }
        if (data && (onUploadProgress || maxUploadRate)) {
          if (!utils$1.isStream(data)) {
            data = stream__default["default"].Readable.from(data, { objectMode: false });
          }
          data = stream__default["default"].pipeline([data, new AxiosTransformStream$1({
            length: contentLength,
            maxRate: utils$1.toFiniteNumber(maxUploadRate)
          })], utils$1.noop);
          onUploadProgress && data.on("progress", (progress) => {
            onUploadProgress(Object.assign(progress, {
              upload: true
            }));
          });
        }
        let auth = void 0;
        if (config.auth) {
          const username = config.auth.username || "";
          const password = config.auth.password || "";
          auth = username + ":" + password;
        }
        if (!auth && parsed.username) {
          const urlUsername = parsed.username;
          const urlPassword = parsed.password;
          auth = urlUsername + ":" + urlPassword;
        }
        auth && headers.delete("authorization");
        let path2;
        try {
          path2 = buildURL(
            parsed.pathname + parsed.search,
            config.params,
            config.paramsSerializer
          ).replace(/^\?/, "");
        } catch (err) {
          const customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          return reject(customErr);
        }
        headers.set(
          "Accept-Encoding",
          "gzip, compress, deflate" + (isBrotliSupported ? ", br" : ""),
          false
        );
        const options = {
          path: path2,
          method,
          headers: headers.toJSON(),
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth,
          protocol,
          family,
          beforeRedirect: dispatchBeforeRedirect,
          beforeRedirects: {}
        };
        !utils$1.isUndefined(lookup) && (options.lookup = lookup);
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
          setProxy(options, config.proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        let transport;
        const isHttpsRequest = isHttps.test(options.protocol);
        options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsRequest ? https__default["default"] : http__default["default"];
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          if (config.beforeRedirect) {
            options.beforeRedirects.config = config.beforeRedirect;
          }
          transport = isHttpsRequest ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        } else {
          options.maxBodyLength = Infinity;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        req = transport.request(options, function handleResponse(res) {
          if (req.destroyed)
            return;
          const streams = [res];
          const responseLength = +res.headers["content-length"];
          if (onDownloadProgress) {
            const transformStream = new AxiosTransformStream$1({
              length: utils$1.toFiniteNumber(responseLength),
              maxRate: utils$1.toFiniteNumber(maxDownloadRate)
            });
            onDownloadProgress && transformStream.on("progress", (progress) => {
              onDownloadProgress(Object.assign(progress, {
                download: true
              }));
            });
            streams.push(transformStream);
          }
          let responseStream = res;
          const lastRequest = res.req || req;
          if (config.decompress !== false && res.headers["content-encoding"]) {
            if (method === "HEAD" || res.statusCode === 204) {
              delete res.headers["content-encoding"];
            }
            switch ((res.headers["content-encoding"] || "").toLowerCase()) {
              case "gzip":
              case "x-gzip":
              case "compress":
              case "x-compress":
                streams.push(zlib__default["default"].createUnzip(zlibOptions));
                delete res.headers["content-encoding"];
                break;
              case "deflate":
                streams.push(new ZlibHeaderTransformStream$1());
                streams.push(zlib__default["default"].createUnzip(zlibOptions));
                delete res.headers["content-encoding"];
                break;
              case "br":
                if (isBrotliSupported) {
                  streams.push(zlib__default["default"].createBrotliDecompress(brotliOptions));
                  delete res.headers["content-encoding"];
                }
            }
          }
          responseStream = streams.length > 1 ? stream__default["default"].pipeline(streams, utils$1.noop) : streams[0];
          const offListeners = stream__default["default"].finished(responseStream, () => {
            offListeners();
            onFinished();
          });
          const response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: new AxiosHeaders$1(res.headers),
            config,
            request: lastRequest
          };
          if (responseType === "stream") {
            response.data = responseStream;
            settle(resolve, reject, response);
          } else {
            const responseBuffer = [];
            let totalResponseBytes = 0;
            responseStream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                responseStream.destroy();
                reject(new AxiosError(
                  "maxContentLength size of " + config.maxContentLength + " exceeded",
                  AxiosError.ERR_BAD_RESPONSE,
                  config,
                  lastRequest
                ));
              }
            });
            responseStream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              const err = new AxiosError(
                "maxContentLength size of " + config.maxContentLength + " exceeded",
                AxiosError.ERR_BAD_RESPONSE,
                config,
                lastRequest
              );
              responseStream.destroy(err);
              reject(err);
            });
            responseStream.on("error", function handleStreamError(err) {
              if (req.destroyed)
                return;
              reject(AxiosError.from(err, null, config, lastRequest));
            });
            responseStream.on("end", function handleStreamEnd() {
              try {
                let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (responseType !== "arraybuffer") {
                  responseData = responseData.toString(responseEncoding);
                  if (!responseEncoding || responseEncoding === "utf8") {
                    responseData = utils$1.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                return reject(AxiosError.from(err, null, config, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
          emitter.once("abort", (err) => {
            if (!responseStream.destroyed) {
              responseStream.emit("error", err);
              responseStream.destroy();
            }
          });
        });
        emitter.once("abort", (err) => {
          reject(err);
          req.destroy(err);
        });
        req.on("error", function handleRequestError(err) {
          reject(AxiosError.from(err, null, config, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          const timeout = parseInt(config.timeout, 10);
          if (Number.isNaN(timeout)) {
            reject(new AxiosError(
              "error trying to parse `config.timeout` to int",
              AxiosError.ERR_BAD_OPTION_VALUE,
              config,
              req
            ));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            if (isDone)
              return;
            let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
            const transitional = config.transitional || transitionalDefaults;
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(new AxiosError(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
              config,
              req
            ));
            abort();
          });
        }
        if (utils$1.isStream(data)) {
          let ended = false;
          let errored = false;
          data.on("end", () => {
            ended = true;
          });
          data.once("error", (err) => {
            errored = true;
            req.destroy(err);
          });
          data.on("close", () => {
            if (!ended && !errored) {
              abort(new CanceledError("Request stream has been aborted", config, req));
            }
          });
          data.pipe(req);
        } else {
          req.end(data);
        }
      });
    };
    var cookies = platform.hasStandardBrowserEnv ? (
      // Standard browser envs support document.cookie
      {
        write(name, value, expires, path2, domain, secure) {
          const cookie = [name + "=" + encodeURIComponent(value)];
          utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
          utils$1.isString(path2) && cookie.push("path=" + path2);
          utils$1.isString(domain) && cookie.push("domain=" + domain);
          secure === true && cookie.push("secure");
          document.cookie = cookie.join("; ");
        },
        read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      }
    ) : (
      // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {
        },
        read() {
          return null;
        },
        remove() {
        }
      }
    );
    var isURLSameOrigin = platform.hasStandardBrowserEnv ? (
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      function standardBrowserEnv() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement("a");
        let originURL;
        function resolveURL(url2) {
          let href = url2;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin2(requestURL) {
          const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }()
    ) : (
      // Non standard browser envs (web workers, react-native) lack needed support.
      /* @__PURE__ */ function nonStandardBrowserEnv() {
        return function isURLSameOrigin2() {
          return true;
        };
      }()
    );
    function progressEventReducer(listener, isDownloadStream) {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);
      return (e) => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : void 0;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;
        bytesNotified = loaded;
        const data = {
          loaded,
          total,
          progress: total ? loaded / total : void 0,
          bytes: progressBytes,
          rate: rate ? rate : void 0,
          estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
          event: e
        };
        data[isDownloadStream ? "download" : "upload"] = true;
        listener(data);
      };
    }
    var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
    var xhrAdapter = isXHRAdapterSupported && function(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config.data;
        const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
        let { responseType, withXSRFToken } = config;
        let onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        let contentType;
        if (utils$1.isFormData(requestData)) {
          if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
            requestHeaders.setContentType(false);
          } else if ((contentType = requestHeaders.getContentType()) !== false) {
            const [type3, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
            requestHeaders.setContentType([type3 || "multipart/form-data", ...tokens].join("; "));
          }
        }
        let request = new XMLHttpRequest();
        if (config.auth) {
          const username = config.auth.username || "";
          const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
        }
        const fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          const responseHeaders = AxiosHeaders$1.from(
            "getAllResponseHeaders" in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          const transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          ));
          request = null;
        };
        if (platform.hasStandardBrowserEnv) {
          withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));
          if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(fullPath)) {
            const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
            if (xsrfValue) {
              requestHeaders.set(config.xsrfHeaderName, xsrfValue);
            }
          }
        }
        requestData === void 0 && requestHeaders.setContentType(null);
        if ("setRequestHeader" in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }
        if (!utils$1.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
        }
        if (config.cancelToken || config.signal) {
          onCanceled = (cancel) => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        const protocol = parseProtocol(fullPath);
        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData || null);
      });
    };
    var knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter
    };
    utils$1.forEach(knownAdapters, (fn, value) => {
      if (fn) {
        try {
          Object.defineProperty(fn, "name", { value });
        } catch (e) {
        }
        Object.defineProperty(fn, "adapterName", { value });
      }
    });
    var renderReason = (reason) => `- ${reason}`;
    var isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
    var adapters = {
      getAdapter: (adapters2) => {
        adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
        const { length } = adapters2;
        let nameOrAdapter;
        let adapter;
        const rejectedReasons = {};
        for (let i = 0; i < length; i++) {
          nameOrAdapter = adapters2[i];
          let id;
          adapter = nameOrAdapter;
          if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
            if (adapter === void 0) {
              throw new AxiosError(`Unknown adapter '${id}'`);
            }
          }
          if (adapter) {
            break;
          }
          rejectedReasons[id || "#" + i] = adapter;
        }
        if (!adapter) {
          const reasons = Object.entries(rejectedReasons).map(
            ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
          );
          let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
          throw new AxiosError(
            `There is no suitable adapter to dispatch the request ` + s,
            "ERR_NOT_SUPPORT"
          );
        }
        return adapter;
      },
      adapters: knownAdapters
    };
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError(null, config);
      }
    }
    function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = AxiosHeaders$1.from(config.headers);
      config.data = transformData.call(
        config,
        config.transformRequest
      );
      if (["post", "put", "patch"].indexOf(config.method) !== -1) {
        config.headers.setContentType("application/x-www-form-urlencoded", false);
      }
      const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          config.transformResponse,
          response
        );
        response.headers = AxiosHeaders$1.from(response.headers);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }
        return Promise.reject(reason);
      });
    }
    var headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
    function mergeConfig(config1, config2) {
      config2 = config2 || {};
      const config = {};
      function getMergedValue(target, source, caseless) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
          return utils$1.merge.call({ caseless }, target, source);
        } else if (utils$1.isPlainObject(source)) {
          return utils$1.merge({}, source);
        } else if (utils$1.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(a, b, caseless) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(a, b, caseless);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(void 0, a, caseless);
        }
      }
      function valueFromConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(void 0, b);
        }
      }
      function defaultToConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(void 0, b);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(void 0, a);
        }
      }
      function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
          return getMergedValue(a, b);
        } else if (prop in config1) {
          return getMergedValue(void 0, a);
        }
      }
      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        withXSRFToken: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
      };
      utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
        const merge2 = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge2(config1[prop], config2[prop], prop);
        utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    }
    var validators$1 = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach((type3, i) => {
      validators$1[type3] = function validator2(thing) {
        return typeof thing === type3 || "a" + (i < 1 ? "n " : " ") + type3;
      };
    });
    var deprecatedWarnings = {};
    validators$1.transitional = function transitional(validator2, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return (value, opt, opts) => {
        if (validator2 === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator2 ? validator2(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      const keys4 = Object.keys(options);
      let i = keys4.length;
      while (i-- > 0) {
        const opt = keys4[i];
        const validator2 = schema[opt];
        if (validator2) {
          const value = options[opt];
          const result = value === void 0 || validator2(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    var validator = {
      assertOptions,
      validators: validators$1
    };
    var validators = validator.validators;
    var Axios = class {
      constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager$1(),
          response: new InterceptorManager$1()
        };
      }
      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      async request(configOrUrl, config) {
        try {
          return await this._request(configOrUrl, config);
        } catch (err) {
          if (err instanceof Error) {
            let dummy;
            Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
            const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
            if (!err.stack) {
              err.stack = stack;
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
              err.stack += "\n" + stack;
            }
          }
          throw err;
        }
      }
      _request(configOrUrl, config) {
        if (typeof configOrUrl === "string") {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }
        config = mergeConfig(this.defaults, config);
        const { transitional, paramsSerializer, headers } = config;
        if (transitional !== void 0) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }
        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }
        config.method = (config.method || this.defaults.method || "get").toLowerCase();
        let contextHeaders = headers && utils$1.merge(
          headers.common,
          headers[config.method]
        );
        headers && utils$1.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (method) => {
            delete headers[method];
          }
        );
        config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
            return;
          }
          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i = 0;
        let len;
        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), void 0];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;
          promise = Promise.resolve(config);
          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }
          return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config;
        i = 0;
        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }
        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }
        return promise;
      }
      getUri(config) {
        config = mergeConfig(this.defaults, config);
        const fullPath = buildFullPath(config.baseURL, config.url);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    };
    utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url2, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url: url2,
          data: (config || {}).data
        }));
      };
    });
    utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url2, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url: url2,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    var Axios$1 = Axios;
    var CancelToken = class _CancelToken {
      constructor(executor) {
        if (typeof executor !== "function") {
          throw new TypeError("executor must be a function.");
        }
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        const token = this;
        this.promise.then((cancel) => {
          if (!token._listeners)
            return;
          let i = token._listeners.length;
          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });
        this.promise.then = (onfulfilled) => {
          let _resolve;
          const promise = new Promise((resolve) => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);
          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };
          return promise;
        };
        executor(function cancel(message, config, request) {
          if (token.reason) {
            return;
          }
          token.reason = new CanceledError(message, config, request);
          resolvePromise(token.reason);
        });
      }
      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }
      /**
       * Subscribe to the cancel signal
       */
      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }
        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }
      /**
       * Unsubscribe from the cancel signal
       */
      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }
      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new _CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    };
    var CancelToken$1 = CancelToken;
    function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }
    function isAxiosError(payload) {
      return utils$1.isObject(payload) && payload.isAxiosError === true;
    }
    var HttpStatusCode = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511
    };
    Object.entries(HttpStatusCode).forEach(([key, value]) => {
      HttpStatusCode[value] = key;
    });
    var HttpStatusCode$1 = HttpStatusCode;
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);
      utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
      utils$1.extend(instance, context, null, { allOwnKeys: true });
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults$1);
    axios.Axios = Axios$1;
    axios.CanceledError = CanceledError;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel;
    axios.VERSION = VERSION;
    axios.toFormData = toFormData;
    axios.AxiosError = AxiosError;
    axios.Cancel = axios.CanceledError;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = spread;
    axios.isAxiosError = isAxiosError;
    axios.mergeConfig = mergeConfig;
    axios.AxiosHeaders = AxiosHeaders$1;
    axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
    axios.getAdapter = adapters.getAdapter;
    axios.HttpStatusCode = HttpStatusCode$1;
    axios.default = axios;
    module2.exports = axios;
  }
});

// node_modules/is-electron/index.js
var require_is_electron = __commonJS({
  "node_modules/is-electron/index.js"(exports2, module2) {
    function isElectron() {
      if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
        return true;
      }
      if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
        return true;
      }
      if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
        return true;
      }
      return false;
    }
    module2.exports = isElectron;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter32 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has3 = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once2) {
      this.fn = fn;
      this.context = context;
      this.once = once2 || false;
    }
    function addListener(emitter, event, fn, context, once2) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once2), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has3.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once2(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once2) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once2 || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once2 && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter;
    }
  }
});

// node_modules/@slack/types/dist/calls.js
var require_calls = __commonJS({
  "node_modules/@slack/types/dist/calls.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/dialog.js
var require_dialog = __commonJS({
  "node_modules/@slack/types/dist/dialog.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/message-metadata.js
var require_message_metadata = __commonJS({
  "node_modules/@slack/types/dist/message-metadata.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/message-attachments.js
var require_message_attachments = __commonJS({
  "node_modules/@slack/types/dist/message-attachments.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/views.js
var require_views = __commonJS({
  "node_modules/@slack/types/dist/views.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/block-kit/blocks.js
var require_blocks = __commonJS({
  "node_modules/@slack/types/dist/block-kit/blocks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/block-kit/composition-objects.js
var require_composition_objects = __commonJS({
  "node_modules/@slack/types/dist/block-kit/composition-objects.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/block-kit/block-elements.js
var require_block_elements = __commonJS({
  "node_modules/@slack/types/dist/block-kit/block-elements.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/block-kit/extensions.js
var require_extensions = __commonJS({
  "node_modules/@slack/types/dist/block-kit/extensions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/types/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@slack/types/dist/index.js"(exports2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_calls(), exports2);
    __exportStar(require_dialog(), exports2);
    __exportStar(require_message_metadata(), exports2);
    __exportStar(require_message_attachments(), exports2);
    __exportStar(require_views(), exports2);
    __exportStar(require_blocks(), exports2);
    __exportStar(require_composition_objects(), exports2);
    __exportStar(require_block_elements(), exports2);
    __exportStar(require_extensions(), exports2);
  }
});

// node_modules/@slack/web-api/dist/methods.js
var require_methods = __commonJS({
  "node_modules/@slack/web-api/dist/methods.js"(exports2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Methods = void 0;
    var eventemitter3_1 = require_eventemitter32();
    var WebClient_1 = require_WebClient();
    function bindApiCall(self2, method) {
      return self2.apiCall.bind(self2, method);
    }
    function bindFilesUploadV2(self2) {
      return self2.filesUploadV2.bind(self2);
    }
    var Methods = class extends eventemitter3_1.EventEmitter {
      constructor() {
        super();
        this.admin = {
          analytics: {
            /**
             * @description Retrieve analytics data for a given date, presented as a compressed JSON file.
             * @see {@link https://api.slack.com/methods/api.test `api.test` API reference}.
             */
            getFile: bindApiCall(this, "admin.analytics.getFile")
          },
          apps: {
            activities: {
              /**
               * @description Get logs for a specified team/org.
               * @see {@link https://api.slack.com/methods/admin.apps.activities.list `admin.apps.activities.list` API reference}.
               */
              list: bindApiCall(this, "admin.apps.activities.list")
            },
            /**
             * @description Approve an app for installation on a workspace.
             * @see {@link https://api.slack.com/methods/admin.apps.approve `admin.apps.approve` API reference}.
             */
            approve: bindApiCall(this, "admin.apps.approve"),
            approved: {
              /**
               * @description List approved apps for an org or workspace.
               * @see {@link https://api.slack.com/methods/admin.apps.approved.list `admin.apps.approved.list` API reference}.
               */
              list: bindApiCall(this, "admin.apps.approved.list")
            },
            /**
             * @description Clear an app resolution.
             * @see {@link https://api.slack.com/methods/admin.apps.clearResolution `admin.apps.clearResolution` API reference}.
             */
            clearResolution: bindApiCall(this, "admin.apps.clearResolution"),
            config: {
              /**
               * @description Look up the app config for connectors by their IDs.
               * @see {@link https://api.slack.com/methods/admin.apps.config.lookup `admin.apps.config.lookup` API reference}.
               */
              lookup: bindApiCall(this, "admin.apps.config.lookup"),
              /**
               * @description Set the app config for a connector.
               * @see {@link https://api.slack.com/methods/admin.apps.config.set `admin.apps.config.set` API reference}.
               */
              set: bindApiCall(this, "admin.apps.config.set")
            },
            requests: {
              /**
               * @description Cancel app request for team.
               * @see {@link https://api.slack.com/methods/admin.apps.requests.cancel `admin.apps.requests.cancel` API reference}.
               */
              cancel: bindApiCall(this, "admin.apps.requests.cancel"),
              /**
               * @description List app requests for a team/workspace.
               * @see {@link https://api.slack.com/methods/admin.apps.requests.list `admin.apps.requests.list` API reference}.
               */
              list: bindApiCall(this, "admin.apps.requests.list")
            },
            /**
             * @description Restrict an app for installation on a workspace.
             * @see {@link https://api.slack.com/methods/admin.apps.restrict `admin.apps.restrict` API reference}.
             */
            restrict: bindApiCall(this, "admin.apps.restrict"),
            restricted: {
              /**
               * @description List restricted apps for an org or workspace.
               * @see {@link https://api.slack.com/methods/admin.apps.restricted.list `admin.apps.restricted.list` API reference}.
               */
              list: bindApiCall(this, "admin.apps.restricted.list")
            },
            /**
             * @description Uninstall an app from one or many workspaces, or an entire enterprise organization.
             * @see {@link https://api.slack.com/methods/admin.apps.uninstall `admin.apps.uninstall` API reference}.
             */
            uninstall: bindApiCall(this, "admin.apps.uninstall")
          },
          auth: {
            policy: {
              /**
               * @description Assign entities to a particular authentication policy.
               * @see {@link https://api.slack.com/methods/admin.auth.policy.assignEntities `admin.auth.policy.assignEntities` API reference}.
               */
              assignEntities: bindApiCall(this, "admin.auth.policy.assignEntities"),
              /**
               * @description Fetch all the entities assigned to a particular authentication policy by name.
               * @see {@link https://api.slack.com/methods/admin.auth.policy.getEntities `admin.auth.policy.getEntities` API reference}.
               */
              getEntities: bindApiCall(this, "admin.auth.policy.getEntities"),
              /**
               * @description Remove specified entities from a specified authentication policy.
               * @see {@link https://api.slack.com/methods/admin.auth.policy.removeEntities `admin.auth.policy.removeEntities` API reference}.
               */
              removeEntities: bindApiCall(this, "admin.auth.policy.removeEntities")
            }
          },
          barriers: {
            /**
             * @description Create an Information Barrier.
             * @see {@link https://api.slack.com/methods/admin.barriers.create `admin.barriers.create` API reference}.
             */
            create: bindApiCall(this, "admin.barriers.create"),
            /**
             * @description Delete an existing Information Barrier.
             * @see {@link https://api.slack.com/methods/admin.barriers.delete `admin.barriers.delete` API reference}.
             */
            delete: bindApiCall(this, "admin.barriers.delete"),
            /**
             * @description Get all Information Barriers for your organization.
             * @see {@link https://api.slack.com/methods/admin.barriers.list `admin.barriers.list` API reference}.
             */
            list: bindApiCall(this, "admin.barriers.list"),
            /**
             * @description Update an existing Information Barrier.
             * @see {@link https://api.slack.com/methods/admin.barriers.update `admin.barriers.update` API reference}.
             */
            update: bindApiCall(this, "admin.barriers.update")
          },
          conversations: {
            /**
             * @description Archive a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.archive `admin.conversations.archive` API reference}.
             */
            archive: bindApiCall(this, "admin.conversations.archive"),
            /**
             * @description Archive public or private channels in bulk.
             * @see {@link https://api.slack.com/methods/admin.conversations.bulkArchive `admin.conversations.bulkArchive` API reference}.
             */
            bulkArchive: bindApiCall(this, "admin.conversations.bulkArchive"),
            /**
             * @description Delete public or private channels in bulk.
             * @see {@link https://api.slack.com/methods/admin.conversations.bulkDelet `admin.conversations.bulkDelete` API reference}.
             */
            bulkDelete: bindApiCall(this, "admin.conversations.bulkDelete"),
            /**
             * @description Move public or private channels in bulk.
             * @see {@link https://api.slack.com/methods/admin.conversations.bulkMove `admin.conversations.bulkMove` API reference}.
             */
            bulkMove: bindApiCall(this, "admin.conversations.bulkMove"),
            /**
             * @description Convert a public channel to a private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.convertToPrivate `admin.conversations.convertToPrivate` API reference}.
             */
            convertToPrivate: bindApiCall(this, "admin.conversations.convertToPrivate"),
            /**
             * @description Convert a private channel to a public channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.convertToPublic `admin.conversations.convertToPublic` API reference}.
             */
            convertToPublic: bindApiCall(this, "admin.conversations.convertToPublic"),
            /**
             * @description Create a public or private channel-based conversation.
             * @see {@link https://api.slack.com/methods/admin.conversations.create `admin.conversations.create` API reference}.
             */
            create: bindApiCall(this, "admin.conversations.create"),
            /**
             * @description Delete a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.delete `admin.conversations.delete` API reference}.
             */
            delete: bindApiCall(this, "admin.conversations.delete"),
            /**
             * @description Disconnect a connected channel from one or more workspaces.
             * @see {@link https://api.slack.com/methods/admin.conversations.disconnectShared `admin.conversations.disconnectShared` API reference}.
             */
            disconnectShared: bindApiCall(this, "admin.conversations.disconnectShared"),
            ekm: {
              /**
               * @description List all disconnected channels — i.e., channels that were once connected to other workspaces
               * and then disconnected — and the corresponding original channel IDs for key revocation with EKM.
               * @see {@link https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo `admin.conversations.ekm.listOriginalConnectedChannelInfo` API reference}.
               */
              listOriginalConnectedChannelInfo: bindApiCall(this, "admin.conversations.ekm.listOriginalConnectedChannelInfo")
            },
            /**
             * @description Get conversation preferences for a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.getConversationPrefs `admin.conversations.getConversationPrefs` API reference}.
             */
            getConversationPrefs: bindApiCall(this, "admin.conversations.getConversationPrefs"),
            /**
             * @description Get a conversation's retention policy.
             * @see {@link https://api.slack.com/methods/admin.conversations.getCustomRetention `admin.conversations.getCustomRetention` API reference}.
             */
            getCustomRetention: bindApiCall(this, "admin.conversations.getCustomRetention"),
            /**
             * @description Get all the workspaces a given public or private channel is connected to within
             * this Enterprise org.
             * @see {@link https://api.slack.com/methods/admin.conversations.getTeams `admin.conversations.getTeams` API reference}.
             */
            getTeams: bindApiCall(this, "admin.conversations.getTeams"),
            /**
             * @description Invite a user to a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.invite `admin.conversations.invite` API reference}.
             */
            invite: bindApiCall(this, "admin.conversations.invite"),
            /**
             * @description Returns channels on the given team using the filters.
             * @see {@link https://api.slack.com/methods/admin.conversations.lookup `admin.conversations.lookup` API reference}.
             */
            lookup: bindApiCall(this, "admin.conversations.lookup"),
            /**
             * @description Remove a conversation's retention policy.
             * @see {@link https://api.slack.com/methods/admin.conversations.removeCustomRetention `admin.conversations.removeCustomRetention` API reference}.
             */
            removeCustomRetention: bindApiCall(this, "admin.conversations.removeCustomRetention"),
            /**
             * @description Rename a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.rename `admin.conversations.rename` API reference}.
             */
            rename: bindApiCall(this, "admin.conversations.rename"),
            restrictAccess: {
              /**
               * @description Add an allowlist of IDP groups for accessing a channel.
               * @see {@link https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup `admin.conversations.restrictAccess.addGroup` API reference}.
               */
              addGroup: bindApiCall(this, "admin.conversations.restrictAccess.addGroup"),
              /**
               * @description List all IDP Groups linked to a channel.
               * @see {@link https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups `admin.conversations.restrictAccess.listGroups` API reference}.
               */
              listGroups: bindApiCall(this, "admin.conversations.restrictAccess.listGroups"),
              /**
               * @description Remove a linked IDP group linked from a private channel.
               * @see {@link https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup `admin.conversations.restrictAccess.removeGroup` API reference}.
               */
              removeGroup: bindApiCall(this, "admin.conversations.restrictAccess.removeGroup")
            },
            /**
             * @description Search for public or private channels in an Enterprise organization.
             * @see {@link https://api.slack.com/methods/admin.conversations.search `admin.conversations.search` API reference}.
             */
            search: bindApiCall(this, "admin.conversations.search"),
            /**
             * @description Set the posting permissions for a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.setConversationPrefs `admin.conversations.setConversationPrefs` API reference}.
             */
            setConversationPrefs: bindApiCall(this, "admin.conversations.setConversationPrefs"),
            /**
             * @description Set a conversation's retention policy.
             * @see {@link https://api.slack.com/methods/admin.conversations.setCustomRetention `admin.conversations.setCustomRetention` API reference}.
             */
            setCustomRetention: bindApiCall(this, "admin.conversations.setCustomRetention"),
            /**
             * @description Set the workspaces in an Enterprise grid org that connect to a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.setTeams `admin.conversations.setTeams` API reference}.
             */
            setTeams: bindApiCall(this, "admin.conversations.setTeams"),
            /**
             * @description Unarchive a public or private channel.
             * @see {@link https://api.slack.com/methods/admin.conversations.unarchive `admin.conversations.unarchive` API reference}.
             */
            unarchive: bindApiCall(this, "admin.conversations.unarchive")
          },
          emoji: {
            /**
             * @description Add an emoji.
             * @see {@link https://api.slack.com/methods/admin.emoji.add `admin.emoji.add` API reference}.
             */
            add: bindApiCall(this, "admin.emoji.add"),
            /**
             * @description Add an emoji alias.
             * @see {@link https://api.slack.com/methods/admin.emoji.addAlias `admin.emoji.addAlias` API reference}.
             */
            addAlias: bindApiCall(this, "admin.emoji.addAlias"),
            /**
             * @description List emoji for an Enterprise Grid organization.
             * @see {@link https://api.slack.com/methods/admin.emoji.list `admin.emoji.list` API reference}.
             */
            list: bindApiCall(this, "admin.emoji.list"),
            /**
             * @description Remove an emoji across an Enterprise Grid organization.
             * @see {@link https://api.slack.com/methods/admin.emoji.remove `admin.emoji.remove` API reference}.
             */
            remove: bindApiCall(this, "admin.emoji.remove"),
            /**
             * @description Rename an emoji.
             * @see {@link https://api.slack.com/methods/admin.emoji.rename `admin.emoji.rename` API reference}.
             */
            rename: bindApiCall(this, "admin.emoji.rename")
          },
          functions: {
            /**
             * @description Look up functions by a set of apps.
             * @see {@link https://api.slack.com/methods/admin.functions.list `admin.functions.list` API reference}.
             */
            list: bindApiCall(this, "admin.functions.list"),
            permissions: {
              /**
               * @description Lookup the visibility of multiple Slack functions and include the users if
               * it is limited to particular named entities.
               * @see {@link https://api.slack.com/methods/admin.functions.permissions.lookup `admin.functions.permissions.lookup` API reference}.
               */
              lookup: bindApiCall(this, "admin.functions.permissions.lookup"),
              /**
               * @description Set the visibility of a Slack function and define the users or workspaces if
               * it is set to named_entities.
               * @see {@link https://api.slack.com/methods/admin.functions.permissions.set `admin.functions.permissions.set` API reference}.
               */
              set: bindApiCall(this, "admin.functions.permissions.set")
            }
          },
          inviteRequests: {
            /**
             * @description Approve a workspace invite request.
             * @see {@link https://api.slack.com/methods/admin.inviteRequests.approve `admin.inviteRequests.approve` API reference}.
             */
            approve: bindApiCall(this, "admin.inviteRequests.approve"),
            approved: {
              /**
               * @description List all approved workspace invite requests.
               * @see {@link https://api.slack.com/methods/admin.inviteRequests.approved.list `admin.inviteRequests.approved.list` API reference}.
               */
              list: bindApiCall(this, "admin.inviteRequests.approved.list")
            },
            denied: {
              /**
               * @description List all denied workspace invite requests.
               * @see {@link https://api.slack.com/methods/admin.inviteRequests.denied.list `admin.inviteRequests.denied.list` API reference}.
               */
              list: bindApiCall(this, "admin.inviteRequests.denied.list")
            },
            /**
             * @description Deny a workspace invite request.
             * @see {@link https://api.slack.com/methods/admin.inviteRequests.deny `admin.inviteRequests.deny` API reference}.
             */
            deny: bindApiCall(this, "admin.inviteRequests.deny"),
            /**
             * @description List all pending workspace invite requests.
             * @see {@link https://api.slack.com/methods/admin.inviteRequests.list `admin.inviteRequests.list` API reference}.
             */
            list: bindApiCall(this, "admin.inviteRequests.list")
          },
          roles: {
            /**
             * @description Adds members to the specified role with the specified scopes.
             * @see {@link https://api.slack.com/methods/admin.roles.addAssignments `admin.roles.addAssignments` API reference}.
             */
            addAssignments: bindApiCall(this, "admin.roles.addAssignments"),
            /**
             * @description Lists assignments for all roles across entities.
             * Options to scope results by any combination of roles or entities.
             * @see {@link https://api.slack.com/methods/admin.roles.listAssignments `admin.roles.listAssignments` API reference}.
             */
            listAssignments: bindApiCall(this, "admin.roles.listAssignments"),
            /**
             * @description Removes a set of users from a role for the given scopes and entities.
             * @see {@link https://api.slack.com/methods/admin.roles.removeAssignments `admin.roles.removeAssignments` API reference}.
             */
            removeAssignments: bindApiCall(this, "admin.roles.removeAssignments")
          },
          teams: {
            admins: {
              /**
               * @description List all of the admins on a given workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.admins.list `admin.teams.admins.list` API reference}.
               */
              list: bindApiCall(this, "admin.teams.admins.list")
            },
            /**
             * @description Create an Enterprise team.
             * @see {@link https://api.slack.com/methods/admin.teams.create `admin.teams.create` API reference}.
             */
            create: bindApiCall(this, "admin.teams.create"),
            /**
             * @description List all teams on an Enterprise organization.
             * @see {@link https://api.slack.com/methods/admin.teams.list `admin.teams.list` API reference}.
             */
            list: bindApiCall(this, "admin.teams.list"),
            owners: {
              /**
               * @description List all of the owners on a given workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.owners.list `admin.teams.owners.list` API reference}.
               */
              list: bindApiCall(this, "admin.teams.owners.list")
            },
            settings: {
              /**
               * @description Fetch information about settings in a workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.owners.list `admin.teams.owners.list` API reference}.
               */
              info: bindApiCall(this, "admin.teams.settings.info"),
              /**
               * @description Set the default channels of a workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.settings.setDefaultChannels `admin.teams.settings.setDefaultChannels` API reference}.
               */
              setDefaultChannels: bindApiCall(this, "admin.teams.settings.setDefaultChannels"),
              /**
               * @description Set the description of a given workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.settings.setDescription `admin.teams.settings.setDescription` API reference}.
               */
              setDescription: bindApiCall(this, "admin.teams.settings.setDescription"),
              /**
               * @description Set the discoverability of a given workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.settings.setDiscoverability `admin.teams.settings.setDiscoverability` API reference}.
               */
              setDiscoverability: bindApiCall(this, "admin.teams.settings.setDiscoverability"),
              /**
               * @description Sets the icon of a workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.settings.setIcon `admin.teams.settings.setIcon` API reference}.
               */
              setIcon: bindApiCall(this, "admin.teams.settings.setIcon"),
              /**
               * @description Set the name of a given workspace.
               * @see {@link https://api.slack.com/methods/admin.teams.settings.setName `admin.teams.settings.setName` API reference}.
               */
              setName: bindApiCall(this, "admin.teams.settings.setName")
            }
          },
          usergroups: {
            /**
             * @description Add up to one hundred default channels to an IDP group.
             * @see {@link https://api.slack.com/methods/admin.usergroups.addChannels `admin.teams.usergroups.addChannels` API reference}.
             */
            addChannels: bindApiCall(this, "admin.usergroups.addChannels"),
            /**
             * @description Associate one or more default workspaces with an organization-wide IDP group.
             * @see {@link https://api.slack.com/methods/admin.usergroups.addTeams `admin.teams.usergroups.addTeams` API reference}.
             */
            addTeams: bindApiCall(this, "admin.usergroups.addTeams"),
            /**
             * @description List the channels linked to an org-level IDP group (user group).
             * @see {@link https://api.slack.com/methods/admin.usergroups.listChannels `admin.teams.usergroups.listChannels` API reference}.
             */
            listChannels: bindApiCall(this, "admin.usergroups.listChannels"),
            /**
             * @description Remove one or more default channels from an org-level IDP group (user group).
             * @see {@link https://api.slack.com/methods/admin.usergroups.removeChannels `admin.teams.usergroups.removeChannels` API reference}.
             */
            removeChannels: bindApiCall(this, "admin.usergroups.removeChannels")
          },
          users: {
            /**
             * @description Add an Enterprise user to a workspace.
             * @see {@link https://api.slack.com/methods/admin.users.assign `admin.users.assign` API reference}.
             */
            assign: bindApiCall(this, "admin.users.assign"),
            /**
             * @description Invite a user to a workspace.
             * @see {@link https://api.slack.com/methods/admin.users.invite `admin.users.invite` API reference}.
             */
            invite: bindApiCall(this, "admin.users.invite"),
            /**
             * @description List users on a workspace.
             * @see {@link https://api.slack.com/methods/admin.users.list `admin.users.list` API reference}.
             */
            list: bindApiCall(this, "admin.users.list"),
            /**
             * @description Remove a user from a workspace.
             * @see {@link https://api.slack.com/methods/admin.users.remove `admin.users.remove` API reference}.
             */
            remove: bindApiCall(this, "admin.users.remove"),
            session: {
              /**
               * @description Clear user-specific session settings—the session duration and what happens when the client
               * closes—for a list of users.
               * @see {@link https://api.slack.com/methods/admin.users.session.clearSettings `admin.users.session.clearSettings` API reference}.
               */
              clearSettings: bindApiCall(this, "admin.users.session.clearSettings"),
              /**
               * @description Get user-specific session settings—the session duration and what happens when the client
               * closes—given a list of users.
               * @see {@link https://api.slack.com/methods/admin.users.session.getSettings `admin.users.session.getSettings` API reference}.
               */
              getSettings: bindApiCall(this, "admin.users.session.getSettings"),
              /**
               * @description Revoke a single session for a user. The user will be forced to login to Slack.
               * @see {@link https://api.slack.com/methods/admin.users.session.invalidate `admin.users.session.invalidate` API reference}.
               */
              invalidate: bindApiCall(this, "admin.users.session.invalidate"),
              /**
               * @description List active user sessions for an organization.
               * @see {@link https://api.slack.com/methods/admin.users.session.list `admin.users.session.list` API reference}.
               */
              list: bindApiCall(this, "admin.users.session.list"),
              /**
               * @description Wipes all valid sessions on all devices for a given user.
               * @see {@link https://api.slack.com/methods/admin.users.session.reset `admin.users.session.reset` API reference}.
               */
              reset: bindApiCall(this, "admin.users.session.reset"),
              /**
               * @description Enqueues an asynchronous job to wipe all valid sessions on all devices for a given user list.
               * @see {@link https://api.slack.com/methods/admin.users.session.resetBulk `admin.users.session.resetBulk` API reference}.
               */
              resetBulk: bindApiCall(this, "admin.users.session.resetBulk"),
              /**
               * @description Configure the user-level session settings—the session duration and what happens when the client
               * closes—for one or more users.
               * @see {@link https://api.slack.com/methods/admin.users.session.setSettings `admin.users.session.setSettings` API reference}.
               */
              setSettings: bindApiCall(this, "admin.users.session.setSettings")
            },
            /**
             * @description Set an existing guest, regular user, or owner to be an admin user.
             * @see {@link https://api.slack.com/methods/admin.users.setAdmin `admin.users.setAdmin` API reference}.
             */
            setAdmin: bindApiCall(this, "admin.users.setAdmin"),
            /**
             * @description Set an expiration for a guest user.
             * @see {@link https://api.slack.com/methods/admin.users.setExpiration `admin.users.setExpiration` API reference}.
             */
            setExpiration: bindApiCall(this, "admin.users.setExpiration"),
            /**
             * @description Set an existing guest, regular user, or admin user to be a workspace owner.
             * @see {@link https://api.slack.com/methods/admin.users.setOwner `admin.users.setOwner` API reference}.
             */
            setOwner: bindApiCall(this, "admin.users.setOwner"),
            /**
             * @description Set an existing guest user, admin user, or owner to be a regular user.
             * @see {@link https://api.slack.com/methods/admin.users.setRegular `admin.users.setRegular` API reference}.
             */
            setRegular: bindApiCall(this, "admin.users.setRegular"),
            unsupportedVersions: {
              /**
               * @description Ask Slackbot to send you an export listing all workspace members using unsupported software,
               * presented as a zipped CSV file.
               * @see {@link https://api.slack.com/methods/admin.users.unsupportedVersions.export `admin.users.unsupportedVersions.export` API reference}.
               */
              export: bindApiCall(this, "admin.users.unsupportedVersions.export")
            }
          },
          workflows: {
            collaborators: {
              /**
               * @description Add collaborators to workflows within the team or enterprise.
               * @see {@link https://api.slack.com/methods/admin.workflows.collaborators.add `admin.workflows.collaborators.add` API reference}.
               */
              add: bindApiCall(this, "admin.workflows.collaborators.add"),
              /**
               * @description Remove collaborators from workflows within the team or enterprise.
               * @see {@link https://api.slack.com/methods/admin.workflows.collaborators.remove `admin.workflows.collaborators.remove` API reference}.
               */
              remove: bindApiCall(this, "admin.workflows.collaborators.remove")
            },
            permissions: {
              /**
               * @description Look up the permissions for a set of workflows.
               * @see {@link https://api.slack.com/methods/admin.workflows.permissions.lookup `admin.workflows.permissions.lookup` API reference}.
               */
              lookup: bindApiCall(this, "admin.workflows.permissions.lookup")
            },
            /**
             * @description Search workflows within the team or enterprise.
             * @see {@link https://api.slack.com/methods/admin.workflows.search `admin.workflows.search` API reference}.
             */
            search: bindApiCall(this, "admin.workflows.search"),
            /**
             * @description Unpublish workflows within the team or enterprise.
             * @see {@link https://api.slack.com/methods/admin.workflows.unpublish `admin.workflows.unpublish` API reference}.
             */
            unpublish: bindApiCall(this, "admin.workflows.unpublish")
          }
        };
        this.api = {
          /**
           * @description Checks API calling code.
           * @see {@link https://api.slack.com/methods/api.test `api.test` API reference}.
           */
          test: bindApiCall(this, "api.test")
        };
        this.apps = {
          connections: {
            /**
             * @description Generate a temporary Socket Mode WebSocket URL that your app can connect to in order to receive
             * events and interactive payloads over.
             * @see {@link https://api.slack.com/methods/apps.connections.open `apps.connections.open` API reference}.
             */
            open: bindApiCall(this, "apps.connections.open")
          },
          event: {
            authorizations: {
              /**
               * @description Get a list of authorizations for the given event context.
               * Each authorization represents an app installation that the event is visible to.
               * @see {@link https://api.slack.com/methods/apps.event.authorizations.list `apps.event.authorizations.list` API reference}.
               */
              list: bindApiCall(this, "apps.event.authorizations.list")
            }
          },
          manifest: {
            /**
             * @description Create an app from an app manifest.
             * @see {@link https://api.slack.com/methods/apps.manifest.create `apps.manifest.create` API reference}.
             */
            create: bindApiCall(this, "apps.manifest.create"),
            /**
             * @description Permanently deletes an app created through app manifests.
             * @see {@link https://api.slack.com/methods/apps.manifest.delete `apps.manifest.delete` API reference}.
             */
            delete: bindApiCall(this, "apps.manifest.delete"),
            /**
             * @description Export an app manifest from an existing app.
             * @see {@link https://api.slack.com/methods/apps.manifest.export `apps.manifest.export` API reference}.
             */
            export: bindApiCall(this, "apps.manifest.export"),
            /**
             * @description Update an app from an app manifest.
             * @see {@link https://api.slack.com/methods/apps.manifest.update `apps.manifest.update` API reference}.
             */
            update: bindApiCall(this, "apps.manifest.update"),
            /**
             * @description Validate an app manifest.
             * @see {@link https://api.slack.com/methods/apps.manifest.validate `apps.manifest.validate` API reference}.
             */
            validate: bindApiCall(this, "apps.manifest.validate")
          },
          /**
           * @description Uninstalls your app from a workspace.
           * @see {@link https://api.slack.com/methods/apps.uninstall `apps.uninstall` API reference}.
           */
          uninstall: bindApiCall(this, "apps.uninstall")
        };
        this.auth = {
          /**
           * @description Revokes a token.
           * @see {@link https://api.slack.com/methods/auth.revoke `auth.revoke` API reference}.
           */
          revoke: bindApiCall(this, "auth.revoke"),
          teams: {
            /**
             * @description Obtain a full list of workspaces your org-wide app has been approved for.
             * @see {@link https://api.slack.com/methods/auth.teams.list `auth.teams.list` API reference}.
             */
            list: bindApiCall(this, "auth.teams.list")
          },
          test: bindApiCall(this, "auth.test")
        };
        this.bookmarks = {
          /**
           * @description Add bookmark to a channel.
           * @see {@link https://api.slack.com/methods/bookmarks.add `bookmarks.add` API reference}.
           */
          add: bindApiCall(this, "bookmarks.add"),
          /**
           * @description Edit bookmark.
           * @see {@link https://api.slack.com/methods/bookmarks.edit `bookmarks.edit` API reference}.
           */
          edit: bindApiCall(this, "bookmarks.edit"),
          /**
           * @description List bookmarks for a channel.
           * @see {@link https://api.slack.com/methods/bookmarks.list `bookmarks.list` API reference}.
           */
          list: bindApiCall(this, "bookmarks.list"),
          /**
           * @description Remove bookmark from a channel.
           * @see {@link https://api.slack.com/methods/bookmarks.remove `bookmarks.remove` API reference}.
           */
          remove: bindApiCall(this, "bookmarks.remove")
        };
        this.bots = {
          /**
           * @description Gets information about a bot user.
           * @see {@link https://api.slack.com/methods/bots.info `bots.info` API reference}.
           */
          info: bindApiCall(this, "bots.info")
        };
        this.calls = {
          /**
           * @description Registers a new Call.
           * @see {@link https://api.slack.com/methods/calls.add `calls.add` API reference}.
           */
          add: bindApiCall(this, "calls.add"),
          /**
           * @description Ends a Call.
           * @see {@link https://api.slack.com/methods/calls.end `calls.end` API reference}.
           */
          end: bindApiCall(this, "calls.end"),
          /**
           * @description Returns information about a Call.
           * @see {@link https://api.slack.com/methods/calls.info `calls.info` API reference}.
           */
          info: bindApiCall(this, "calls.info"),
          /**
           * @description Updates information about a Call.
           * @see {@link https://api.slack.com/methods/calls.info `calls.info` API reference}.
           */
          update: bindApiCall(this, "calls.update"),
          participants: {
            /**
             * @description Registers new participants added to a Call.
             * @see {@link https://api.slack.com/methods/calls.participants.add `calls.participants.add` API reference}.
             */
            add: bindApiCall(this, "calls.participants.add"),
            remove: bindApiCall(this, "calls.participants.remove")
          }
        };
        this.chat = {
          /**
           * @description Deletes a message.
           * @see {@link https://api.slack.com/methods/chat.delete `chat.delete` API reference}.
           */
          delete: bindApiCall(this, "chat.delete"),
          /**
           * @description Deletes a pending scheduled message from the queue.
           * @see {@link https://api.slack.com/methods/chat.deleteScheduledMessage `chat.deleteScheduledMessage` API reference}.
           */
          deleteScheduledMessage: bindApiCall(this, "chat.deleteScheduledMessage"),
          /**
           * @description Retrieve a permalink URL for a specific extant message.
           * @see {@link https://api.slack.com/methods/chat.getPermalink `chat.getPermalink` API reference}.
           */
          getPermalink: bindApiCall(this, "chat.getPermalink"),
          /**
           * @description Share a me message into a channel.
           * @see {@link https://api.slack.com/methods/chat.meMessage `chat.meMessage` API reference}.
           */
          meMessage: bindApiCall(this, "chat.meMessage"),
          /**
           * @description Sends an ephemeral message to a user in a channel.
           * @see {@link https://api.slack.com/methods/chat.postEphemeral `chat.postEphemeral` API reference}.
           */
          postEphemeral: bindApiCall(this, "chat.postEphemeral"),
          /**
           * @description Sends a message to a channel.
           * @see {@link https://api.slack.com/methods/chat.postMessage `chat.postMessage` API reference}.
           */
          postMessage: bindApiCall(this, "chat.postMessage"),
          /**
           * @description Schedules a message to be sent to a channel.
           * @see {@link https://api.slack.com/methods/chat.scheduleMessage `chat.scheduleMessage` API reference}.
           */
          scheduleMessage: bindApiCall(this, "chat.scheduleMessage"),
          scheduledMessages: {
            /**
             * @description Returns a list of scheduled messages.
             * @see {@link https://api.slack.com/methods/chat.scheduledMessages.list `chat.scheduledMessages.list` API reference}.
             */
            list: bindApiCall(this, "chat.scheduledMessages.list")
          },
          /**
           * @description Provide custom unfurl behavior for user-posted URLs.
           * @see {@link https://api.slack.com/methods/chat.unfurl `chat.unfurl` API reference}.
           */
          unfurl: bindApiCall(this, "chat.unfurl"),
          /**
           * @description Updates a message.
           * @see {@link https://api.slack.com/methods/chat.update `chat.update` API reference}.
           */
          update: bindApiCall(this, "chat.update")
        };
        this.conversations = {
          /**
           * @description Accepts an invitation to a Slack Connect channel.
           * @see {@link https://api.slack.com/methods/conversations.acceptSharedInvite `conversations.acceptSharedInvite` API reference}.
           */
          acceptSharedInvite: bindApiCall(this, "conversations.acceptSharedInvite"),
          /**
           * @description Approves an invitation to a Slack Connect channel.
           * @see {@link https://api.slack.com/methods/conversations.approveSharedInvite `conversations.approveSharedInvite` API reference}.
           */
          approveSharedInvite: bindApiCall(this, "conversations.approveSharedInvite"),
          /**
           * @description Archives a conversation.
           * @see {@link https://api.slack.com/methods/conversations.archive `conversations.archive` API reference}.
           */
          archive: bindApiCall(this, "conversations.archive"),
          /**
           * @description Closes a direct message or multi-person direct message.
           * @see {@link https://api.slack.com/methods/conversations.close `conversations.close` API reference}.
           */
          close: bindApiCall(this, "conversations.close"),
          /**
           * @description Initiates a public or private channel-based conversation.
           * @see {@link https://api.slack.com/methods/conversations.create `conversations.create` API reference}.
           */
          create: bindApiCall(this, "conversations.create"),
          /**
           * @description Declines an invitation to a Slack Connect channel.
           * @see {@link https://api.slack.com/methods/conversations.declineSharedInvite `conversations.declineSharedInvite` API reference}.
           */
          declineSharedInvite: bindApiCall(this, "conversations.declineSharedInvite"),
          /**
           * @description Fetches a conversation's history of messages and events.
           * @see {@link https://api.slack.com/methods/conversations.history `conversations.history` API reference}.
           */
          history: bindApiCall(this, "conversations.history"),
          /**
           * @description Retrieve information about a conversation.
           * @see {@link https://api.slack.com/methods/conversations.info `conversations.info` API reference}.
           */
          info: bindApiCall(this, "conversations.info"),
          /**
           * @description Invites users to a channel.
           * @see {@link https://api.slack.com/methods/conversations.invite `conversations.invite` API reference}.
           */
          invite: bindApiCall(this, "conversations.invite"),
          /**
           * @description Sends an invitation to a Slack Connect channel.
           * @see {@link https://api.slack.com/methods/conversations.inviteShared `conversations.inviteShared` API reference}.
           */
          inviteShared: bindApiCall(this, "conversations.inviteShared"),
          /**
           * @description Joins an existing conversation.
           * @see {@link https://api.slack.com/methods/conversations.join `conversations.join` API reference}.
           */
          join: bindApiCall(this, "conversations.join"),
          /**
           * @description Removes a user from a conversation.
           * @see {@link https://api.slack.com/methods/conversations.kick `conversations.kick` API reference}.
           */
          kick: bindApiCall(this, "conversations.kick"),
          /**
           * @description Leaves a conversation.
           * @see {@link https://api.slack.com/methods/conversations.leave `conversations.leave` API reference}.
           */
          leave: bindApiCall(this, "conversations.leave"),
          /**
           * @description List all channels in a Slack team.
           * @see {@link https://api.slack.com/methods/conversations.list `conversations.list` API reference}.
           */
          list: bindApiCall(this, "conversations.list"),
          /**
           * @description Lists shared channel invites that have been generated or received but have not been approved by
           * all parties.
           * @see {@link https://api.slack.com/methods/conversations.listConnectInvites `conversations.listConnectInvites` API reference}.
           */
          listConnectInvites: bindApiCall(this, "conversations.listConnectInvites"),
          /**
           * @description Sets the read cursor in a channel.
           * @see {@link https://api.slack.com/methods/conversations.mark `conversations.mark` API reference}.
           */
          mark: bindApiCall(this, "conversations.mark"),
          /**
           * @description Retrieve members of a conversation.
           * @see {@link https://api.slack.com/methods/conversations.members `conversations.members` API reference}.
           */
          members: bindApiCall(this, "conversations.members"),
          /**
           * @description Opens or resumes a direct message or multi-person direct message.
           * @see {@link https://api.slack.com/methods/conversations.open `conversations.open` API reference}.
           */
          open: bindApiCall(this, "conversations.open"),
          /**
           * @description Renames a conversation.
           * @see {@link https://api.slack.com/methods/conversations.rename `conversations.rename` API reference}.
           */
          rename: bindApiCall(this, "conversations.rename"),
          /**
           * @description Retrieve a thread of messages posted to a conversation.
           * @see {@link https://api.slack.com/methods/conversations.replies `conversations.replies` API reference}.
           */
          replies: bindApiCall(this, "conversations.replies"),
          /**
           * @description Sets the purpose for a conversation.
           * @see {@link https://api.slack.com/methods/conversations.setPurpose `conversations.setPurpose` API reference}.
           */
          setPurpose: bindApiCall(this, "conversations.setPurpose"),
          /**
           * @description Sets the topic for a conversation.
           * @see {@link https://api.slack.com/methods/conversations.setTopic `conversations.setTopic` API reference}.
           */
          setTopic: bindApiCall(this, "conversations.setTopic"),
          /**
           * @description Reverses conversation archival.
           * @see {@link https://api.slack.com/methods/conversations.unarchive `conversations.unarchive` API reference}.
           */
          unarchive: bindApiCall(this, "conversations.unarchive")
        };
        this.dialog = {
          /**
           * @description Open a dialog with a user.
           * @see {@link https://api.slack.com/methods/dialog.open `dialog.open` API reference}.
           */
          open: bindApiCall(this, "dialog.open")
        };
        this.dnd = {
          /**
           * @description Ends the current user's Do Not Disturb session immediately.
           * @see {@link https://api.slack.com/methods/dnd.endDnd `dnd.endDnd` API reference}.
           */
          endDnd: bindApiCall(this, "dnd.endDnd"),
          /**
           * @description Ends the current user's snooze mode immediately.
           * @see {@link https://api.slack.com/methods/dnd.endSnooze `dnd.endSnooze` API reference}.
           */
          endSnooze: bindApiCall(this, "dnd.endSnooze"),
          /**
           * @description Retrieves a user's current Do Not Disturb status.
           * @see {@link https://api.slack.com/methods/dnd.info `dnd.info` API reference}.
           */
          info: bindApiCall(this, "dnd.info"),
          /**
           * @description Turns on Do Not Disturb mode for the current user, or changes its duration.
           * @see {@link https://api.slack.com/methods/dnd.setSnooze `dnd.setSnooze` API reference}.
           */
          setSnooze: bindApiCall(this, "dnd.setSnooze"),
          /**
           * @description Retrieves the Do Not Disturb status for up to 50 users on a team.
           * @see {@link https://api.slack.com/methods/dnd.teamInfo `dnd.teamInfo` API reference}.
           */
          teamInfo: bindApiCall(this, "dnd.teamInfo")
        };
        this.emoji = {
          /**
           * @description Lists custom emoji for a team.
           * @see {@link https://api.slack.com/methods/emoji.list `emoji.list` API reference}.
           */
          list: bindApiCall(this, "emoji.list")
        };
        this.files = {
          /**
           * @description Finishes an upload started with {@link https://api.slack.com/methods/files.getUploadURLExternal `files.getUploadURLExternal`}.
           * @see {@link https://api.slack.com/methods/files.completeUploadExternal `files.completeUploadExternal` API reference}.
           */
          completeUploadExternal: bindApiCall(this, "files.completeUploadExternal"),
          /**
           * @description Deletes a file.
           * @see {@link https://api.slack.com/methods/files.delete `files.delete` API reference}.
           */
          delete: bindApiCall(this, "files.delete"),
          /**
           * @description Gets a URL for an edge external file upload.
           * @see {@link https://api.slack.com/methods/files.getUploadURLExternal `files.getUploadURLExternal` API reference}.
           */
          getUploadURLExternal: bindApiCall(this, "files.getUploadURLExternal"),
          /**
           * @description Gets information about a file.
           * @see {@link https://api.slack.com/methods/files.info `files.info` API reference}.
           */
          info: bindApiCall(this, "files.info"),
          /**
           * @description List files for a team, in a channel, or from a user with applied filters.
           * @see {@link https://api.slack.com/methods/files.list `files.list` API reference}.
           */
          list: bindApiCall(this, "files.list"),
          /**
           * @description Revokes public/external sharing access for a file.
           * @see {@link https://api.slack.com/methods/files.revokePublicURL `files.revokePublicURL` API reference}.
           */
          revokePublicURL: bindApiCall(this, "files.revokePublicURL"),
          /**
           * @description Enables a file for public/external sharing.
           * @see {@link https://api.slack.com/methods/files.revokePublicURL `files.revokePublicURL` API reference}.
           */
          sharedPublicURL: bindApiCall(this, "files.sharedPublicURL"),
          /**
           * @description Uploads or creates a file.
           * @see {@link https://api.slack.com/methods/files.upload `files.upload` API reference}.
           */
          upload: bindApiCall(this, "files.upload"),
          /**
           * @description Custom method to support a new way of uploading files to Slack.
           * Supports a single file upload
           * Supply:
           * - (required) single file or content
           * - (optional) channel, alt_text, snippet_type,
           * Supports multiple file uploads
           * Supply:
           * - multiple upload_files
           * Will try to honor both single file or content data supplied as well
           * as multiple file uploads property.
           * @see {@link https://slack.dev/node-slack-sdk/web-api#upload-a-file `@slack/web-api` Upload a file documentation}.
          */
          uploadV2: bindFilesUploadV2(this),
          comments: {
            /**
             * @description Deletes an existing comment on a file.
             * @see {@link https://api.slack.com/methods/files.comments.delete `files.comments.delete` API reference}.
             */
            delete: bindApiCall(this, "files.comments.delete")
          },
          remote: {
            /**
             * @description Adds a file from a remote service.
             * @see {@link https://api.slack.com/methods/files.remote.add `files.remote.add` API reference}.
             */
            add: bindApiCall(this, "files.remote.add"),
            /**
             * @description Retrieve information about a remote file added to Slack.
             * @see {@link https://api.slack.com/methods/files.remote.info `files.remote.info` API reference}.
             */
            info: bindApiCall(this, "files.remote.info"),
            /**
             * @description List remote files added to Slack.
             * @see {@link https://api.slack.com/methods/files.remote.list `files.remote.list` API reference}.
             */
            list: bindApiCall(this, "files.remote.list"),
            /**
             * @description Remove a remote file.
             * @see {@link https://api.slack.com/methods/files.remote.remove `files.remote.remove` API reference}.
             */
            remove: bindApiCall(this, "files.remote.remove"),
            /**
             * @description Share a remote file into a channel.
             * @see {@link https://api.slack.com/methods/files.remote.share `files.remote.share` API reference}.
             */
            share: bindApiCall(this, "files.remote.share"),
            /**
             * @description Updates an existing remote file.
             * @see {@link https://api.slack.com/methods/files.remote.update `files.remote.update` API reference}.
             */
            update: bindApiCall(this, "files.remote.update")
          }
        };
        this.functions = {
          /**
           * @description Signal the failure to execute a Custom Function.
           * @see {@link https://api.slack.com/methods/functions.completeError `functions.completeError` API reference}.
           */
          completeError: bindApiCall(this, "functions.completeError"),
          /**
           * @description Signal the successful completion of a Custom Function.
           * @see {@link https://api.slack.com/methods/functions.completeSuccess `functions.completeSuccess` API reference}.
           */
          completeSuccess: bindApiCall(this, "functions.completeSuccess")
        };
        this.migration = {
          /**
           * @description For Enterprise Grid workspaces, map local user IDs to global user IDs.
           * @see {@link https://api.slack.com/methods/migration.exchange `migration.exchange` API reference}.
           */
          exchange: bindApiCall(this, "migration.exchange")
        };
        this.oauth = {
          /**
           * @description Exchanges a temporary OAuth verifier code for an access token.
           * @deprecated This is a legacy method only used by classic Slack apps. Use `oauth.v2.access` for new Slack apps.
           * @see {@link https://api.slack.com/methods/oauth.access `oauth.access` API reference}.
           */
          access: bindApiCall(this, "oauth.access"),
          v2: {
            /**
             * @description Exchanges a temporary OAuth verifier code for an access token.
             * @see {@link https://api.slack.com/methods/oauth.v2.access `oauth.v2.access` API reference}.
             */
            access: bindApiCall(this, "oauth.v2.access"),
            /**
             * @description Exchanges a legacy access token for a new expiring access token and refresh token.
             * @see {@link https://api.slack.com/methods/oauth.v2.exchange `oauth.v2.exchange` API reference}.
             */
            exchange: bindApiCall(this, "oauth.v2.exchange")
          }
        };
        this.openid = {
          connect: {
            /**
             * @description Exchanges a temporary OAuth verifier code for an access token for {@link https://api.slack.com/authentication/sign-in-with-slack Sign in with Slack}.
             * @see {@link https://api.slack.com/methods/openid.connect.token `openid.connect.token` API reference}.
             */
            token: bindApiCall(this, "openid.connect.token"),
            /**
             * @description Get the identity of a user who has authorized {@link https://api.slack.com/authentication/sign-in-with-slack Sign in with Slack}.
             * @see {@link https://api.slack.com/methods/openid.connect.userInfo `openid.connect.userInfo` API reference}.
             */
            userInfo: bindApiCall(this, "openid.connect.userInfo")
          }
        };
        this.pins = {
          /**
           * @description Pins an item to a channel.
           * @see {@link https://api.slack.com/methods/pins.add `pins.add` API reference}.
           */
          add: bindApiCall(this, "pins.add"),
          /**
           * @description Lists items pinned to a channel.
           * @see {@link https://api.slack.com/methods/pins.list `pins.list` API reference}.
           */
          list: bindApiCall(this, "pins.list"),
          /**
           * @description Un-pins an item from a channel.
           * @see {@link https://api.slack.com/methods/pins.remove `pins.remove` API reference}.
           */
          remove: bindApiCall(this, "pins.remove")
        };
        this.reactions = {
          /**
           * @description Adds a reaction to an item.
           * @see {@link https://api.slack.com/methods/reactions.add `reactions.add` API reference}.
           */
          add: bindApiCall(this, "reactions.add"),
          /**
           * @description Gets reactions for an item.
           * @see {@link https://api.slack.com/methods/reactions.get `reactions.get` API reference}.
           */
          get: bindApiCall(this, "reactions.get"),
          /**
           * @description List reactions made by a user.
           * @see {@link https://api.slack.com/methods/reactions.list `reactions.list` API reference}.
           */
          list: bindApiCall(this, "reactions.list"),
          /**
           * @description Removes a reaction from an item.
           * @see {@link https://api.slack.com/methods/reactions.remove `reactions.remove` API reference}.
           */
          remove: bindApiCall(this, "reactions.remove")
        };
        this.reminders = {
          /**
           * @description Creates a reminder.
           * @see {@link https://api.slack.com/methods/reminders.add `reminders.add` API reference}.
           */
          add: bindApiCall(this, "reminders.add"),
          /**
           * @description Marks a reminder as complete.
           * @see {@link https://api.slack.com/methods/reminders.complete `reminders.complete` API reference}.
           */
          complete: bindApiCall(this, "reminders.complete"),
          /**
           * @description Deletes a reminder.
           * @see {@link https://api.slack.com/methods/reminders.delete `reminders.delete` API reference}.
           */
          delete: bindApiCall(this, "reminders.delete"),
          /**
           * @description Gets information about a reminder.
           * @see {@link https://api.slack.com/methods/reminders.info `reminders.info` API reference}.
           */
          info: bindApiCall(this, "reminders.info"),
          /**
           * @description Lists all reminders created by or for a given user.
           * @see {@link https://api.slack.com/methods/reminders.list `reminders.list` API reference}.
           */
          list: bindApiCall(this, "reminders.list")
        };
        this.rtm = {
          /**
           * @description Starts a Real Time Messaging session.
           * @see {@link https://api.slack.com/methods/rtm.connect `rtm.connect` API reference}.
           */
          connect: bindApiCall(this, "rtm.connect"),
          /**
           * @description Starts a Real Time Messaging session.
           * @deprecated Use `rtm.connect` instead. See {@link https://api.slack.com/changelog/2021-10-rtm-start-to-stop our post on retiring `rtm.start`}.
           * @see {@link https://api.slack.com/methods/rtm.start `rtm.start` API reference}.
           */
          start: bindApiCall(this, "rtm.start")
        };
        this.search = {
          /**
           * @description Searches for messages and files matching a query.
           * @see {@link https://api.slack.com/methods/search.all search.all` API reference}.
           */
          all: bindApiCall(this, "search.all"),
          /**
           * @description Searches for files matching a query.
           * @see {@link https://api.slack.com/methods/search.files search.files` API reference}.
           */
          files: bindApiCall(this, "search.files"),
          /**
           * @description Searches for messages matching a query.
           * @see {@link https://api.slack.com/methods/search.messages search.messages` API reference}.
           */
          messages: bindApiCall(this, "search.messages")
        };
        this.team = {
          /**
           * @description Gets the access logs for the current team.
           * @see {@link https://api.slack.com/methods/team.accessLogs `team.accessLogs` API reference}.
           */
          accessLogs: bindApiCall(this, "team.accessLogs"),
          /**
           * @description Gets billable users information for the current team.
           * @see {@link https://api.slack.com/methods/team.billableInfo `team.billableInfo` API reference}.
           */
          billableInfo: bindApiCall(this, "team.billableInfo"),
          billing: {
            /**
             * @description Reads a workspace's billing plan information.
             * @see {@link https://api.slack.com/methods/team.billing.info `team.billing.info` API reference}.
             */
            info: bindApiCall(this, "team.billing.info")
          },
          /**
           * @description Gets information about the current team.
           * @see {@link https://api.slack.com/methods/team.info `team.info` API reference}.
           */
          info: bindApiCall(this, "team.info"),
          /**
           * @description Gets the integration logs for the current team.
           * @see {@link https://api.slack.com/methods/team.integrationLogs `team.integrationLogs` API reference}.
           */
          integrationLogs: bindApiCall(this, "team.integrationLogs"),
          preferences: {
            /**
             * @description Retrieve a list of a workspace's team preferences.
             * @see {@link https://api.slack.com/methods/team.preferences.list `team.preferences.list` API reference}.
             */
            list: bindApiCall(this, "team.preferences.list")
          },
          profile: {
            /**
             * @description Retrieve a team's profile.
             * @see {@link https://api.slack.com/methods/team.profile.get `team.profile.get` API reference}.
             */
            get: bindApiCall(this, "team.profile.get")
          }
        };
        this.tooling = {
          tokens: {
            /**
             * @description Exchanges a refresh token for a new app configuration token.
             * @see {@link https://api.slack.com/methods/tooling.tokens.rotate `tooling.tokens.rotate` API reference}.
             */
            rotate: bindApiCall(this, "tooling.tokens.rotate")
          }
        };
        this.usergroups = {
          /**
           * @description Create a User Group.
           * @see {@link https://api.slack.com/methods/usergroups.create `usergroups.create` API reference}.
           */
          create: bindApiCall(this, "usergroups.create"),
          /**
           * @description Disable an existing User Group.
           * @see {@link https://api.slack.com/methods/usergroups.disable `usergroups.disable` API reference}.
           */
          disable: bindApiCall(this, "usergroups.disable"),
          /**
           * @description Enable an existing User Group.
           * @see {@link https://api.slack.com/methods/usergroups.enable `usergroups.enable` API reference}.
           */
          enable: bindApiCall(this, "usergroups.enable"),
          /**
           * @description List all User Groups for a team.
           * @see {@link https://api.slack.com/methods/usergroups.list `usergroups.list` API reference}.
           */
          list: bindApiCall(this, "usergroups.list"),
          /**
           * @description Update an existing User Group.
           * @see {@link https://api.slack.com/methods/usergroups.update `usergroups.update` API reference}.
           */
          update: bindApiCall(this, "usergroups.update"),
          users: {
            /**
             * @description List all users in a User Group.
             * @see {@link https://api.slack.com/methods/usergroups.users.list `usergroups.users.list` API reference}.
             */
            list: bindApiCall(this, "usergroups.users.list"),
            /**
             * @description Update the list of users in a User Group.
             * @see {@link https://api.slack.com/methods/usergroups.users.update `usergroups.users.update` API reference}.
             */
            update: bindApiCall(this, "usergroups.users.update")
          }
        };
        this.users = {
          /**
           * @description List conversations the calling user may access.
           * @see {@link https://api.slack.com/methods/users.conversations `users.conversations` API reference}.
           */
          conversations: bindApiCall(this, "users.conversations"),
          /**
           * @description Delete the user profile photo.
           * @see {@link https://api.slack.com/methods/users.deletePhoto `users.deletePhoto` API reference}.
           */
          deletePhoto: bindApiCall(this, "users.deletePhoto"),
          /**
           * @description Gets user presence information.
           * @see {@link https://api.slack.com/methods/users.getPresence `users.getPresence` API reference}.
           */
          getPresence: bindApiCall(this, "users.getPresence"),
          /**
           * @description Get a user's identity.
           * @see {@link https://api.slack.com/methods/users.identity `users.identity` API reference}.
           */
          identity: bindApiCall(this, "users.identity"),
          /**
           * @description Gets information about a user.
           * @see {@link https://api.slack.com/methods/users.info `users.info` API reference}.
           */
          info: bindApiCall(this, "users.info"),
          /**
           * @description Lists all users in a Slack team.
           * @see {@link https://api.slack.com/methods/users.list `users.list` API reference}.
           */
          list: bindApiCall(this, "users.list"),
          /**
           * @description Find a user with an email address.
           * @see {@link https://api.slack.com/methods/users.lookupByEmail `users.lookupByEmail` API reference}.
           */
          lookupByEmail: bindApiCall(this, "users.lookupByEmail"),
          /**
           * @description Set the user profile photo.
           * @see {@link https://api.slack.com/methods/users.setPhoto `users.setPhoto` API reference}.
           */
          setPhoto: bindApiCall(this, "users.setPhoto"),
          /**
           * @description Manually sets user presence.
           * @see {@link https://api.slack.com/methods/users.setPresence `users.setPresence` API reference}.
           */
          setPresence: bindApiCall(this, "users.setPresence"),
          profile: {
            /**
             * @description Retrieve a user's profile information, including their custom status.
             * @see {@link https://api.slack.com/methods/users.profile.get `users.profile.get` API reference}.
             */
            get: bindApiCall(this, "users.profile.get"),
            /**
             * @description Set a user's profile information, including custom status.
             * @see {@link https://api.slack.com/methods/users.profile.set `users.profile.set` API reference}.
             */
            set: bindApiCall(this, "users.profile.set")
          }
        };
        this.views = {
          /**
           * @description Open a view for a user.
           * @see {@link https://api.slack.com/methods/views.open `views.open` API reference}.
           */
          open: bindApiCall(this, "views.open"),
          /**
           * @description Publish a static view for a user.
           * @see {@link https://api.slack.com/methods/views.publish `views.publish` API reference}.
           */
          publish: bindApiCall(this, "views.publish"),
          /**
           * @description Push a view onto the stack of a root view.
           * @see {@link https://api.slack.com/methods/views.push `views.push` API reference}.
           */
          push: bindApiCall(this, "views.push"),
          /**
           * @description Update an existing view.
           * @see {@link https://api.slack.com/methods/views.update `views.update` API reference}.
           */
          update: bindApiCall(this, "views.update")
        };
        this.stars = {
          /**
           * @description Save an item for later. Formerly known as adding a star.
           * @deprecated Stars can still be added but they can no longer be viewed or interacted with by end-users.
           * See {@link https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders our post on stars and the Later list}.
           * @see {@link https://api.slack.com/methods/stars.add `stars.add` API reference}.
           */
          add: bindApiCall(this, "stars.add"),
          /**
           * @description List a user's saved items, formerly known as stars.
           * @deprecated Stars can still be listed but they can no longer be viewed or interacted with by end-users.
           * See {@link https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders our post on stars and the Later list}.
           * @see {@link https://api.slack.com/methods/stars.list `stars.list` API reference}.
           */
          list: bindApiCall(this, "stars.list"),
          /**
           * @description Remove a saved item from a user's saved items, formerly known as stars.
           * @deprecated Stars can still be removed but they can no longer be viewed or interacted with by end-users.
           * See {@link https://api.slack.com/changelog/2023-07-its-later-already-for-stars-and-reminders our post on stars and the Later list}.
           * @see {@link https://api.slack.com/methods/stars.remove `stars.remove` API reference}.
           */
          remove: bindApiCall(this, "stars.remove")
        };
        this.workflows = {
          /**
           * @description Indicate that an app's step in a workflow completed execution.
           * @deprecated Steps from Apps is deprecated.
           * We're retiring all Slack app functionality around Steps from Apps in September 2024.
           * See {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back our post on deprecating Steps from Apps}.
           * @see {@link https://api.slack.com/methods/workflows.stepCompleted `workflows.stepCompleted` API reference}.
           */
          stepCompleted: bindApiCall(this, "workflows.stepCompleted"),
          /**
           * @description Indicate that an app's step in a workflow failed to execute.
           * @deprecated Steps from Apps is deprecated.
           * We're retiring all Slack app functionality around Steps from Apps in September 2024.
           * See {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back our post on deprecating Steps from Apps}.
           * @see {@link https://api.slack.com/methods/workflows.stepFailed `workflows.stepFailed` API reference}.
           */
          stepFailed: bindApiCall(this, "workflows.stepFailed"),
          /**
           * @description Update the configuration for a workflow step.
           * @deprecated Steps from Apps is deprecated.
           * We're retiring all Slack app functionality around Steps from Apps in September 2024.
           * See {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back our post on deprecating Steps from Apps}.
           * @see {@link https://api.slack.com/methods/workflows.updateStep `workflows.updateStep` API reference}.
           */
          updateStep: bindApiCall(this, "workflows.updateStep")
        };
        if (new.target !== WebClient_1.WebClient && !(new.target.prototype instanceof WebClient_1.WebClient)) {
          throw new Error("Attempt to inherit from WebClient methods without inheriting from WebClient");
        }
      }
    };
    exports2.Methods = Methods;
    __exportStar(require_dist2(), exports2);
  }
});

// node_modules/@slack/web-api/package.json
var require_package = __commonJS({
  "node_modules/@slack/web-api/package.json"(exports2, module2) {
    module2.exports = {
      name: "@slack/web-api",
      version: "7.0.2",
      description: "Official library for using the Slack Platform's Web API",
      author: "Slack Technologies, LLC",
      license: "MIT",
      keywords: [
        "slack",
        "web-api",
        "bot",
        "client",
        "http",
        "api",
        "proxy",
        "rate-limiting",
        "pagination"
      ],
      main: "dist/index.js",
      types: "./dist/index.d.ts",
      files: [
        "dist/**/*"
      ],
      engines: {
        node: ">= 18",
        npm: ">= 8.6.0"
      },
      repository: "slackapi/node-slack-sdk",
      homepage: "https://slack.dev/node-slack-sdk/web-api",
      publishConfig: {
        access: "public"
      },
      bugs: {
        url: "https://github.com/slackapi/node-slack-sdk/issues"
      },
      scripts: {
        prepare: "npm run build",
        build: "npm run build:clean && tsc",
        "build:clean": "shx rm -rf ./dist ./coverage ./.nyc_output",
        lint: "eslint --ext .ts src",
        mocha: "mocha --config .mocharc.json src/*.spec.js",
        test: "npm run lint && npm run test:unit && npm run test:types && npm run test:integration",
        "test:integration": "npm run build && node test/integration/commonjs-project/index.js && node test/integration/esm-project/index.mjs",
        "test:unit": "npm run build && nyc --reporter=text-summary npm run mocha",
        "test:types": "tsd",
        "ref-docs:model": "api-extractor run",
        watch: "npx nodemon --watch 'src' --ext 'ts' --exec npm run build"
      },
      dependencies: {
        "@slack/logger": "^4.0.0",
        "@slack/types": "^2.9.0",
        "@types/node": ">=18.0.0",
        axios: "^1.6.5",
        eventemitter3: "^5.0.1",
        "form-data": "^4.0.0",
        "is-electron": "2.2.2",
        "is-stream": "^2",
        "p-queue": "^6",
        "p-retry": "^4",
        retry: "^0.13.1"
      },
      devDependencies: {
        "@microsoft/api-extractor": "^7",
        "@tsconfig/recommended": "^1",
        "@types/chai": "^4",
        "@types/mocha": "^10",
        "@types/sinon": "^17",
        "@typescript-eslint/eslint-plugin": "^6",
        "@typescript-eslint/parser": "^6",
        busboy: "^1",
        chai: "^4",
        eslint: "^8",
        "eslint-config-airbnb-base": "^15",
        "eslint-config-airbnb-typescript": "^17",
        "eslint-plugin-import": "^2",
        "eslint-plugin-import-newlines": "^1.3.4",
        "eslint-plugin-jsdoc": "^48",
        "eslint-plugin-node": "^11",
        mocha: "^10",
        nock: "^13",
        nyc: "^15",
        shx: "^0.3.2",
        sinon: "^17",
        "source-map-support": "^0.5.21",
        "ts-node": "^10",
        tsd: "^0.30.0",
        typescript: "5.3.3"
      },
      tsd: {
        directory: "test/types"
      }
    };
  }
});

// node_modules/@slack/web-api/dist/instrument.js
var require_instrument = __commonJS({
  "node_modules/@slack/web-api/dist/instrument.js"(exports2) {
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
    exports2.getUserAgent = exports2.addAppMetadata = void 0;
    var os = __importStar(require("os"));
    var path_1 = require("path");
    var packageJson = require_package();
    function replaceSlashes(s) {
      return s.replace("/", ":");
    }
    var baseUserAgent = `${replaceSlashes(packageJson.name)}/${packageJson.version} ${(0, path_1.basename)(process.title)}/${process.version.replace("v", "")} ${os.platform()}/${os.release()}`;
    var appMetadata = {};
    function addAppMetadata({ name, version }) {
      appMetadata[replaceSlashes(name)] = version;
    }
    exports2.addAppMetadata = addAppMetadata;
    function getUserAgent() {
      const appIdentifier = Object.entries(appMetadata).map(([name, version]) => `${name}/${version}`).join(" ");
      return (appIdentifier.length > 0 ? `${appIdentifier} ` : "") + baseUserAgent;
    }
    exports2.getUserAgent = getUserAgent;
  }
});

// node_modules/@slack/web-api/dist/errors.js
var require_errors2 = __commonJS({
  "node_modules/@slack/web-api/dist/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.rateLimitedErrorWithDelay = exports2.platformErrorFromResult = exports2.httpErrorFromResponse = exports2.requestErrorWithOriginal = exports2.errorWithCode = exports2.ErrorCode = void 0;
    var ErrorCode;
    (function(ErrorCode2) {
      ErrorCode2["RequestError"] = "slack_webapi_request_error";
      ErrorCode2["HTTPError"] = "slack_webapi_http_error";
      ErrorCode2["PlatformError"] = "slack_webapi_platform_error";
      ErrorCode2["RateLimitedError"] = "slack_webapi_rate_limited_error";
      ErrorCode2["FileUploadInvalidArgumentsError"] = "slack_webapi_file_upload_invalid_args_error";
      ErrorCode2["FileUploadReadFileDataError"] = "slack_webapi_file_upload_read_file_data_error";
    })(ErrorCode || (exports2.ErrorCode = ErrorCode = {}));
    function errorWithCode(error, code) {
      const codedError = error;
      codedError.code = code;
      return codedError;
    }
    exports2.errorWithCode = errorWithCode;
    function requestErrorWithOriginal(original) {
      const error = errorWithCode(new Error(`A request error occurred: ${original.message}`), ErrorCode.RequestError);
      error.original = original;
      return error;
    }
    exports2.requestErrorWithOriginal = requestErrorWithOriginal;
    function httpErrorFromResponse(response) {
      const error = errorWithCode(new Error(`An HTTP protocol error occurred: statusCode = ${response.status}`), ErrorCode.HTTPError);
      error.statusCode = response.status;
      error.statusMessage = response.statusText;
      const nonNullHeaders = {};
      Object.keys(response.headers).forEach((k) => {
        if (k && response.headers[k]) {
          nonNullHeaders[k] = response.headers[k];
        }
      });
      error.headers = nonNullHeaders;
      error.body = response.data;
      return error;
    }
    exports2.httpErrorFromResponse = httpErrorFromResponse;
    function platformErrorFromResult(result) {
      const error = errorWithCode(new Error(`An API error occurred: ${result.error}`), ErrorCode.PlatformError);
      error.data = result;
      return error;
    }
    exports2.platformErrorFromResult = platformErrorFromResult;
    function rateLimitedErrorWithDelay(retrySec) {
      const error = errorWithCode(new Error(`A rate-limit has been reached, you may retry this request in ${retrySec} seconds`), ErrorCode.RateLimitedError);
      error.retryAfter = retrySec;
      return error;
    }
    exports2.rateLimitedErrorWithDelay = rateLimitedErrorWithDelay;
  }
});

// node_modules/@slack/logger/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/@slack/logger/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConsoleLogger = exports2.LogLevel = void 0;
    var LogLevel;
    (function(LogLevel2) {
      LogLevel2["ERROR"] = "error";
      LogLevel2["WARN"] = "warn";
      LogLevel2["INFO"] = "info";
      LogLevel2["DEBUG"] = "debug";
    })(LogLevel = exports2.LogLevel || (exports2.LogLevel = {}));
    var ConsoleLogger = class _ConsoleLogger {
      constructor() {
        this.level = LogLevel.INFO;
        this.name = "";
      }
      getLevel() {
        return this.level;
      }
      /**
       * Sets the instance's log level so that only messages which are equal or more severe are output to the console.
       */
      setLevel(level) {
        this.level = level;
      }
      /**
       * Set the instance's name, which will appear on each log line before the message.
       */
      setName(name) {
        this.name = name;
      }
      /**
       * Log a debug message
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      debug(...msg) {
        if (_ConsoleLogger.isMoreOrEqualSevere(LogLevel.DEBUG, this.level)) {
          console.debug(_ConsoleLogger.labels.get(LogLevel.DEBUG), this.name, ...msg);
        }
      }
      /**
       * Log an info message
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      info(...msg) {
        if (_ConsoleLogger.isMoreOrEqualSevere(LogLevel.INFO, this.level)) {
          console.info(_ConsoleLogger.labels.get(LogLevel.INFO), this.name, ...msg);
        }
      }
      /**
       * Log a warning message
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      warn(...msg) {
        if (_ConsoleLogger.isMoreOrEqualSevere(LogLevel.WARN, this.level)) {
          console.warn(_ConsoleLogger.labels.get(LogLevel.WARN), this.name, ...msg);
        }
      }
      /**
       * Log an error message
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error(...msg) {
        if (_ConsoleLogger.isMoreOrEqualSevere(LogLevel.ERROR, this.level)) {
          console.error(_ConsoleLogger.labels.get(LogLevel.ERROR), this.name, ...msg);
        }
      }
      /**
       * Helper to compare two log levels and determine if a is equal or more severe than b
       */
      static isMoreOrEqualSevere(a, b) {
        return _ConsoleLogger.severity[a] >= _ConsoleLogger.severity[b];
      }
    };
    exports2.ConsoleLogger = ConsoleLogger;
    ConsoleLogger.labels = (() => {
      const entries = Object.entries(LogLevel);
      const map = entries.map(([key, value]) => [value, `[${key}] `]);
      return new Map(map);
    })();
    ConsoleLogger.severity = {
      [LogLevel.ERROR]: 400,
      [LogLevel.WARN]: 300,
      [LogLevel.INFO]: 200,
      [LogLevel.DEBUG]: 100
    };
  }
});

// node_modules/@slack/web-api/dist/logger.js
var require_logger = __commonJS({
  "node_modules/@slack/web-api/dist/logger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getLogger = exports2.LogLevel = void 0;
    var logger_1 = require_dist3();
    var logger_2 = require_dist3();
    Object.defineProperty(exports2, "LogLevel", { enumerable: true, get: function() {
      return logger_2.LogLevel;
    } });
    var instanceCount = 0;
    function getLogger(name, level, existingLogger) {
      const instanceId = instanceCount;
      instanceCount += 1;
      const logger = (() => {
        if (existingLogger !== void 0) {
          return existingLogger;
        }
        return new logger_1.ConsoleLogger();
      })();
      logger.setName(`web-api:${name}:${instanceId}`);
      if (level !== void 0) {
        logger.setLevel(level);
      }
      return logger;
    }
    exports2.getLogger = getLogger;
  }
});

// node_modules/@slack/web-api/dist/retry-policies.js
var require_retry_policies = __commonJS({
  "node_modules/@slack/web-api/dist/retry-policies.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.rapidRetryPolicy = exports2.fiveRetriesInFiveMinutes = exports2.tenRetriesInAboutThirtyMinutes = void 0;
    exports2.tenRetriesInAboutThirtyMinutes = {
      retries: 10,
      factor: 1.96821,
      randomize: true
    };
    exports2.fiveRetriesInFiveMinutes = {
      retries: 5,
      factor: 3.86
    };
    exports2.rapidRetryPolicy = {
      minTimeout: 0,
      maxTimeout: 1
    };
    var policies = {
      tenRetriesInAboutThirtyMinutes: exports2.tenRetriesInAboutThirtyMinutes,
      fiveRetriesInFiveMinutes: exports2.fiveRetriesInFiveMinutes,
      rapidRetryPolicy: exports2.rapidRetryPolicy
    };
    exports2.default = policies;
  }
});

// node_modules/@slack/web-api/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/@slack/web-api/dist/helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function delay(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    exports2.default = delay;
  }
});

// node_modules/@slack/web-api/dist/file-upload.js
var require_file_upload = __commonJS({
  "node_modules/@slack/web-api/dist/file-upload.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buildInvalidFilesUploadParamError = exports2.buildMultipleChannelsErrorMsg = exports2.buildChannelsWarning = exports2.buildFilesUploadMissingMessage = exports2.buildGeneralFilesUploadWarning = exports2.buildLegacyMethodWarning = exports2.buildMissingExtensionWarning = exports2.buildMissingFileNameWarning = exports2.buildLegacyFileTypeWarning = exports2.buildFileSizeErrorMsg = exports2.buildMissingFileIdError = exports2.warnIfLegacyFileType = exports2.warnIfMissingOrInvalidFileNameAndDefault = exports2.errorIfInvalidOrMissingFileData = exports2.errorIfChannelsCsv = exports2.warnIfChannels = exports2.warnIfNotUsingFilesUploadV2 = exports2.getAllFileUploadsToComplete = exports2.getFileDataAsStream = exports2.getFileDataLength = exports2.getFileData = exports2.getMultipleFileUploadJobs = exports2.getFileUploadJob = void 0;
    var fs_1 = require("fs");
    var stream_1 = require("stream");
    var errors_1 = require_errors2();
    function getFileUploadJob(options, logger) {
      var _a, _b, _c, _d;
      return __awaiter(this, void 0, void 0, function* () {
        warnIfLegacyFileType(options, logger);
        warnIfChannels(options, logger);
        errorIfChannelsCsv(options);
        const fileName = warnIfMissingOrInvalidFileNameAndDefault(options, logger);
        const fileData = yield getFileData(options);
        const fileDataBytesLength = getFileDataLength(fileData);
        const fileUploadJob = {
          // supplied by user
          alt_text: options.alt_text,
          channel_id: (_a = options.channels) !== null && _a !== void 0 ? _a : options.channel_id,
          filename: (_b = options.filename) !== null && _b !== void 0 ? _b : fileName,
          initial_comment: options.initial_comment,
          snippet_type: options.snippet_type,
          title: (_c = options.title) !== null && _c !== void 0 ? _c : (_d = options.filename) !== null && _d !== void 0 ? _d : fileName,
          // default title to filename unless otherwise specified
          // calculated
          data: fileData,
          length: fileDataBytesLength
        };
        if ("thread_ts" in options) {
          fileUploadJob.thread_ts = options.thread_ts;
        }
        if ("token" in options) {
          fileUploadJob.token = options.token;
        }
        if ("content" in options) {
          return Object.assign({ content: options.content }, fileUploadJob);
        }
        if ("file" in options) {
          return Object.assign({ file: options.file }, fileUploadJob);
        }
        throw (0, errors_1.errorWithCode)(new Error("Either a file or content field is required for valid file upload. You must supply one"), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
      });
    }
    exports2.getFileUploadJob = getFileUploadJob;
    function getMultipleFileUploadJobs(options, logger) {
      return __awaiter(this, void 0, void 0, function* () {
        if ("file_uploads" in options) {
          return Promise.all(options.file_uploads.map((upload) => {
            const { channel_id, channels, initial_comment, thread_ts } = upload;
            if (channel_id || channels || initial_comment || thread_ts) {
              throw (0, errors_1.errorWithCode)(new Error(buildInvalidFilesUploadParamError()), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
            }
            const uploadJobArgs = Object.assign(Object.assign({}, upload), { channels: options.channels, channel_id: options.channel_id, initial_comment: options.initial_comment });
            if ("thread_ts" in options) {
              uploadJobArgs.thread_ts = options.thread_ts;
            }
            if ("token" in options) {
              uploadJobArgs.token = options.token;
            }
            if ("content" in upload) {
              return getFileUploadJob(Object.assign({ content: upload.content }, uploadJobArgs), logger);
            }
            if ("file" in upload) {
              return getFileUploadJob(Object.assign({ file: upload.file }, uploadJobArgs), logger);
            }
            throw (0, errors_1.errorWithCode)(new Error("Either a file or content field is required for valid file upload. You must supply one"), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
          }));
        }
        throw new Error(buildFilesUploadMissingMessage());
      });
    }
    exports2.getMultipleFileUploadJobs = getMultipleFileUploadJobs;
    function getFileData(options) {
      return __awaiter(this, void 0, void 0, function* () {
        errorIfInvalidOrMissingFileData(options);
        if ("file" in options) {
          const { file } = options;
          if (Buffer.isBuffer(file))
            return file;
          if (typeof file === "string") {
            try {
              const dataBuffer = (0, fs_1.readFileSync)(file);
              return dataBuffer;
            } catch (error) {
              throw (0, errors_1.errorWithCode)(new Error(`Unable to resolve file data for ${file}. Please supply a filepath string, or binary data Buffer or String directly.`), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
            }
          }
          const data = yield getFileDataAsStream(file);
          if (data)
            return data;
        }
        if ("content" in options)
          return Buffer.from(options.content);
        throw (0, errors_1.errorWithCode)(new Error("There was an issue getting the file data for the file or content supplied"), errors_1.ErrorCode.FileUploadReadFileDataError);
      });
    }
    exports2.getFileData = getFileData;
    function getFileDataLength(data) {
      if (data) {
        return Buffer.byteLength(data, "utf8");
      }
      throw (0, errors_1.errorWithCode)(new Error(buildFileSizeErrorMsg()), errors_1.ErrorCode.FileUploadReadFileDataError);
    }
    exports2.getFileDataLength = getFileDataLength;
    function getFileDataAsStream(readable) {
      return __awaiter(this, void 0, void 0, function* () {
        const chunks = [];
        return new Promise((resolve, reject) => {
          readable.on("readable", () => {
            let chunk;
            while ((chunk = readable.read()) !== null) {
              chunks.push(chunk);
            }
          });
          readable.on("end", () => {
            if (chunks.length > 0) {
              const content = Buffer.concat(chunks);
              resolve(content);
            } else {
              reject(Error("No data in supplied file"));
            }
          });
        });
      });
    }
    exports2.getFileDataAsStream = getFileDataAsStream;
    function getAllFileUploadsToComplete(fileUploads) {
      const toComplete = {};
      fileUploads.forEach((upload) => {
        const { channel_id, thread_ts, initial_comment, file_id, title } = upload;
        if (file_id) {
          const compareString = `:::${channel_id}:::${thread_ts}:::${initial_comment}`;
          if (!Object.prototype.hasOwnProperty.call(toComplete, compareString)) {
            toComplete[compareString] = {
              files: [{ id: file_id, title }],
              channel_id,
              initial_comment
            };
            if (thread_ts) {
              toComplete[compareString].thread_ts = upload.thread_ts;
            }
            if ("token" in upload) {
              toComplete[compareString].token = upload.token;
            }
          } else {
            toComplete[compareString].files.push({
              id: file_id,
              title
            });
          }
        } else {
          throw new Error(buildMissingFileIdError());
        }
      });
      return toComplete;
    }
    exports2.getAllFileUploadsToComplete = getAllFileUploadsToComplete;
    function warnIfNotUsingFilesUploadV2(method, logger) {
      const targetMethods = ["files.upload"];
      const isTargetMethod = targetMethods.includes(method);
      if (method === "files.upload")
        logger.warn(buildLegacyMethodWarning(method));
      if (isTargetMethod)
        logger.info(buildGeneralFilesUploadWarning());
    }
    exports2.warnIfNotUsingFilesUploadV2 = warnIfNotUsingFilesUploadV2;
    function warnIfChannels(options, logger) {
      if (options.channels)
        logger.warn(buildChannelsWarning());
    }
    exports2.warnIfChannels = warnIfChannels;
    function errorIfChannelsCsv(options) {
      const channels = options.channels ? options.channels.split(",") : [];
      if (channels.length > 1) {
        throw (0, errors_1.errorWithCode)(new Error(buildMultipleChannelsErrorMsg()), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
      }
    }
    exports2.errorIfChannelsCsv = errorIfChannelsCsv;
    function errorIfInvalidOrMissingFileData(options) {
      const hasFile = "file" in options;
      const hasContent = "content" in options;
      if (!(hasFile || hasContent) || hasFile && hasContent) {
        throw (0, errors_1.errorWithCode)(new Error("Either a file or content field is required for valid file upload. You cannot supply both"), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
      }
      if ("file" in options) {
        const { file } = options;
        if (file && !(typeof file === "string" || Buffer.isBuffer(file) || file instanceof stream_1.Readable)) {
          throw (0, errors_1.errorWithCode)(new Error("file must be a valid string path, buffer or Readable"), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
        }
      }
      if ("content" in options && options.content && typeof options.content !== "string") {
        throw (0, errors_1.errorWithCode)(new Error("content must be a string"), errors_1.ErrorCode.FileUploadInvalidArgumentsError);
      }
    }
    exports2.errorIfInvalidOrMissingFileData = errorIfInvalidOrMissingFileData;
    function warnIfMissingOrInvalidFileNameAndDefault(options, logger) {
      var _a;
      const DEFAULT_FILETYPE = "txt";
      const DEFAULT_FILENAME = `file.${(_a = options.filetype) !== null && _a !== void 0 ? _a : DEFAULT_FILETYPE}`;
      const { filename } = options;
      if (!filename) {
        logger.warn(buildMissingFileNameWarning());
        return DEFAULT_FILENAME;
      }
      if (filename.split(".").length < 2) {
        logger.warn(buildMissingExtensionWarning(filename));
      }
      return filename;
    }
    exports2.warnIfMissingOrInvalidFileNameAndDefault = warnIfMissingOrInvalidFileNameAndDefault;
    function warnIfLegacyFileType(options, logger) {
      if (options.filetype) {
        logger.warn(buildLegacyFileTypeWarning());
      }
    }
    exports2.warnIfLegacyFileType = warnIfLegacyFileType;
    function buildMissingFileIdError() {
      return "Missing required file id for file upload completion";
    }
    exports2.buildMissingFileIdError = buildMissingFileIdError;
    function buildFileSizeErrorMsg() {
      return "There was an issue calculating the size of your file";
    }
    exports2.buildFileSizeErrorMsg = buildFileSizeErrorMsg;
    function buildLegacyFileTypeWarning() {
      return "filetype is no longer a supported field in files.uploadV2. \nPlease remove this field. To indicate file type, please do so via the required filename property using the appropriate file extension, e.g. image.png, text.txt";
    }
    exports2.buildLegacyFileTypeWarning = buildLegacyFileTypeWarning;
    function buildMissingFileNameWarning() {
      return "filename is a required field for files.uploadV2. \n For backwards compatibility and ease of migration, defaulting the filename. For best experience and consistent unfurl behavior, you should set the filename property with correct file extension, e.g. image.png, text.txt";
    }
    exports2.buildMissingFileNameWarning = buildMissingFileNameWarning;
    function buildMissingExtensionWarning(filename) {
      return `filename supplied '${filename}' may be missing a proper extension. Missing extenions may result in unexpected unfurl behavior when shared`;
    }
    exports2.buildMissingExtensionWarning = buildMissingExtensionWarning;
    function buildLegacyMethodWarning(method) {
      return `${method} may cause some issues like timeouts for relatively large files.`;
    }
    exports2.buildLegacyMethodWarning = buildLegacyMethodWarning;
    function buildGeneralFilesUploadWarning() {
      return "Our latest recommendation is to use client.files.uploadV2() method, which is mostly compatible and much stabler, instead.";
    }
    exports2.buildGeneralFilesUploadWarning = buildGeneralFilesUploadWarning;
    function buildFilesUploadMissingMessage() {
      return "Something went wrong with processing file_uploads";
    }
    exports2.buildFilesUploadMissingMessage = buildFilesUploadMissingMessage;
    function buildChannelsWarning() {
      return "Although the 'channels' parameter is still supported for smoother migration from legacy files.upload, we recommend using the new channel_id parameter with a single str value instead (e.g. 'C12345').";
    }
    exports2.buildChannelsWarning = buildChannelsWarning;
    function buildMultipleChannelsErrorMsg() {
      return "Sharing files with multiple channels is no longer supported in v2. Share files in each channel separately instead.";
    }
    exports2.buildMultipleChannelsErrorMsg = buildMultipleChannelsErrorMsg;
    function buildInvalidFilesUploadParamError() {
      return "You may supply file_uploads only for a single channel, comment, thread respectively. Therefore, please supply any channel_id, initial_comment, thread_ts in the top-layer.";
    }
    exports2.buildInvalidFilesUploadParamError = buildInvalidFilesUploadParamError;
  }
});

// node_modules/@slack/web-api/dist/WebClient.js
var require_WebClient = __commonJS({
  "node_modules/@slack/web-api/dist/WebClient.js"(exports2) {
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
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __await = exports2 && exports2.__await || function(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    var __asyncGenerator = exports2 && exports2.__asyncGenerator || function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function awaitReturn(f) {
        return function(v) {
          return Promise.resolve(v).then(f, reject);
        };
      }
      function verb(n, f) {
        if (g[n]) {
          i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
          if (f)
            i[n] = f(i[n]);
        }
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]);
      }
    };
    var __asyncValues = exports2 && exports2.__asyncValues || function(o) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buildThreadTsWarningMessage = exports2.WebClient = exports2.WebClientEvent = void 0;
    var querystring_1 = require("querystring");
    var path_1 = require("path");
    var zlib_1 = __importDefault(require("zlib"));
    var util_1 = require("util");
    var is_stream_1 = __importDefault(require_is_stream());
    var p_queue_1 = __importDefault(require_dist());
    var p_retry_1 = __importStar(require_p_retry());
    var axios_1 = __importDefault(require_axios());
    var form_data_1 = __importDefault(require_form_data());
    var is_electron_1 = __importDefault(require_is_electron());
    var methods_1 = require_methods();
    var instrument_1 = require_instrument();
    var errors_1 = require_errors2();
    var logger_1 = require_logger();
    var retry_policies_1 = require_retry_policies();
    var helpers_1 = __importDefault(require_helpers());
    var file_upload_1 = require_file_upload();
    var axiosHeaderPropsToIgnore = ["delete", "common", "get", "put", "head", "post", "link", "patch", "purge", "unlink", "options"];
    var defaultFilename = "Untitled";
    var defaultPageSize = 200;
    var noopPageReducer = () => void 0;
    var WebClientEvent;
    (function(WebClientEvent2) {
      WebClientEvent2["RATE_LIMITED"] = "rate_limited";
    })(WebClientEvent || (exports2.WebClientEvent = WebClientEvent = {}));
    var WebClient2 = class _WebClient extends methods_1.Methods {
      /**
       * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)
       */
      constructor(token, { slackApiUrl = "https://slack.com/api/", logger = void 0, logLevel = void 0, maxRequestConcurrency = 100, retryConfig = retry_policies_1.tenRetriesInAboutThirtyMinutes, agent = void 0, tls = void 0, timeout = 0, rejectRateLimitedCalls = false, headers = {}, teamId = void 0 } = {}) {
        super();
        this.token = token;
        this.slackApiUrl = slackApiUrl;
        this.retryConfig = retryConfig;
        this.requestQueue = new p_queue_1.default({ concurrency: maxRequestConcurrency });
        this.tlsConfig = tls !== void 0 ? tls : {};
        this.rejectRateLimitedCalls = rejectRateLimitedCalls;
        this.teamId = teamId;
        if (typeof logger !== "undefined") {
          this.logger = logger;
          if (typeof logLevel !== "undefined") {
            this.logger.debug("The logLevel given to WebClient was ignored as you also gave logger");
          }
        } else {
          this.logger = (0, logger_1.getLogger)(_WebClient.loggerName, logLevel !== null && logLevel !== void 0 ? logLevel : logger_1.LogLevel.INFO, logger);
        }
        if (this.token && !headers.Authorization)
          headers.Authorization = `Bearer ${this.token}`;
        this.axios = axios_1.default.create({
          timeout,
          baseURL: slackApiUrl,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          headers: (0, is_electron_1.default)() ? headers : Object.assign({ "User-Agent": (0, instrument_1.getUserAgent)() }, headers),
          httpAgent: agent,
          httpsAgent: agent,
          transformRequest: [this.serializeApiCallOptions.bind(this)],
          validateStatus: () => true,
          // all HTTP status codes should result in a resolved promise (as opposed to only 2xx)
          maxRedirects: 0,
          // disabling axios' automatic proxy support:
          // axios would read from envvars to configure a proxy automatically, but it doesn't support TLS destinations.
          // for compatibility with https://api.slack.com, and for a larger set of possible proxies (SOCKS or other
          // protocols), users of this package should use the `agent` option to configure a proxy.
          proxy: false
        });
        delete this.axios.defaults.headers.post["Content-Type"];
        this.logger.debug("initialized");
      }
      /**
       * Generic method for calling a Web API method
       * @param method - the Web API method to call {@link https://api.slack.com/methods}
       * @param options - options
       */
      apiCall(method, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          this.logger.debug(`apiCall('${method}') start`);
          warnDeprecations(method, this.logger);
          warnIfFallbackIsMissing(method, this.logger, options);
          warnIfThreadTsIsNotString(method, this.logger, options);
          if (typeof options === "string" || typeof options === "number" || typeof options === "boolean") {
            throw new TypeError(`Expected an options argument but instead received a ${typeof options}`);
          }
          (0, file_upload_1.warnIfNotUsingFilesUploadV2)(method, this.logger);
          if (method === "files.uploadV2")
            return this.filesUploadV2(options);
          const headers = {};
          if (options.token)
            headers.Authorization = `Bearer ${options.token}`;
          const response = yield this.makeRequest(method, Object.assign({ team_id: this.teamId }, options), headers);
          const result = yield this.buildResult(response);
          this.logger.debug(`http request result: ${JSON.stringify(result)}`);
          if (result.response_metadata !== void 0 && result.response_metadata.warnings !== void 0) {
            result.response_metadata.warnings.forEach(this.logger.warn.bind(this.logger));
          }
          if (result.response_metadata !== void 0 && result.response_metadata.messages !== void 0) {
            result.response_metadata.messages.forEach((msg) => {
              const errReg = /\[ERROR\](.*)/;
              const warnReg = /\[WARN\](.*)/;
              if (errReg.test(msg)) {
                const errMatch = msg.match(errReg);
                if (errMatch != null) {
                  this.logger.error(errMatch[1].trim());
                }
              } else if (warnReg.test(msg)) {
                const warnMatch = msg.match(warnReg);
                if (warnMatch != null) {
                  this.logger.warn(warnMatch[1].trim());
                }
              }
            });
          }
          if (!result.ok && response.headers["content-type"] !== "application/gzip") {
            throw (0, errors_1.platformErrorFromResult)(result);
          } else if ("ok" in result && result.ok === false) {
            throw (0, errors_1.platformErrorFromResult)(result);
          }
          this.logger.debug(`apiCall('${method}') end`);
          return result;
        });
      }
      paginate(method, options, shouldStop, reduce) {
        const pageSize = (() => {
          if (options !== void 0 && typeof options.limit === "number") {
            const { limit } = options;
            delete options.limit;
            return limit;
          }
          return defaultPageSize;
        })();
        function generatePages() {
          return __asyncGenerator(this, arguments, function* generatePages_1() {
            let result;
            let paginationOptions = {
              limit: pageSize
            };
            if (options !== void 0 && options.cursor !== void 0) {
              paginationOptions.cursor = options.cursor;
            }
            while (result === void 0 || paginationOptions !== void 0) {
              result = yield __await(this.apiCall(method, Object.assign(options !== void 0 ? options : {}, paginationOptions)));
              yield yield __await(result);
              paginationOptions = paginationOptionsForNextPage(result, pageSize);
            }
          });
        }
        if (shouldStop === void 0) {
          return generatePages.call(this);
        }
        const pageReducer = reduce !== void 0 ? reduce : noopPageReducer;
        let index = 0;
        return (() => __awaiter(this, void 0, void 0, function* () {
          var _a, e_1, _b, _c;
          const pageIterator = generatePages.call(this);
          const firstIteratorResult = yield pageIterator.next(void 0);
          const firstPage = firstIteratorResult.value;
          let accumulator = pageReducer(void 0, firstPage, index);
          index += 1;
          if (shouldStop(firstPage)) {
            return accumulator;
          }
          try {
            for (var _d = true, pageIterator_1 = __asyncValues(pageIterator), pageIterator_1_1; pageIterator_1_1 = yield pageIterator_1.next(), _a = pageIterator_1_1.done, !_a; _d = true) {
              _c = pageIterator_1_1.value;
              _d = false;
              const page = _c;
              accumulator = pageReducer(accumulator, page, index);
              if (shouldStop(page)) {
                return accumulator;
              }
              index += 1;
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (!_d && !_a && (_b = pageIterator_1.return))
                yield _b.call(pageIterator_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return accumulator;
        }))();
      }
      /**
       * This wrapper method provides an easy way to upload files using the following endpoints:
       *
       * **#1**: For each file submitted with this method, submit filenames
       * and file metadata to {@link https://api.slack.com/methods/files.getUploadURLExternal files.getUploadURLExternal} to request a URL to
       * which to send the file data to and an id for the file
       *
       * **#2**: for each returned file `upload_url`, upload corresponding file to
       * URLs returned from step 1 (e.g. https://files.slack.com/upload/v1/...\")
       *
       * **#3**: Complete uploads {@link https://api.slack.com/methods/files.completeUploadExternal files.completeUploadExternal}
       * @param options
       */
      filesUploadV2(options) {
        return __awaiter(this, void 0, void 0, function* () {
          this.logger.debug("files.uploadV2() start");
          const fileUploads = yield this.getAllFileUploads(options);
          const fileUploadsURLRes = yield this.fetchAllUploadURLExternal(fileUploads);
          fileUploadsURLRes.forEach((res, idx) => {
            fileUploads[idx].upload_url = res.upload_url;
            fileUploads[idx].file_id = res.file_id;
          });
          yield this.postFileUploadsToExternalURL(fileUploads, options);
          const completion = yield this.completeFileUploads(fileUploads);
          return { ok: true, files: completion };
        });
      }
      /**
       * For each file submitted with this method, submits filenames
       * and file metadata to files.getUploadURLExternal to request a URL to
       * which to send the file data to and an id for the file
       * @param fileUploads
       */
      fetchAllUploadURLExternal(fileUploads) {
        return __awaiter(this, void 0, void 0, function* () {
          return Promise.all(fileUploads.map((upload) => {
            const options = {
              filename: upload.filename,
              length: upload.length,
              alt_text: upload.alt_text,
              snippet_type: upload.snippet_type
            };
            if ("token" in upload) {
              options.token = upload.token;
            }
            return this.files.getUploadURLExternal(options);
          }));
        });
      }
      /**
       * Complete uploads.
       * @param fileUploads
       * @returns
       */
      completeFileUploads(fileUploads) {
        return __awaiter(this, void 0, void 0, function* () {
          const toComplete = Object.values((0, file_upload_1.getAllFileUploadsToComplete)(fileUploads));
          return Promise.all(toComplete.map((job) => this.files.completeUploadExternal(job)));
        });
      }
      /**
       * for each returned file upload URL, upload corresponding file
       * @param fileUploads
       * @returns
       */
      postFileUploadsToExternalURL(fileUploads, options) {
        return __awaiter(this, void 0, void 0, function* () {
          return Promise.all(fileUploads.map((upload) => __awaiter(this, void 0, void 0, function* () {
            const { upload_url, file_id, filename, data } = upload;
            const body = data;
            if (upload_url) {
              const headers = {};
              if (options.token)
                headers.Authorization = `Bearer ${options.token}`;
              const uploadRes = yield this.makeRequest(upload_url, {
                body
              }, headers);
              if (uploadRes.status !== 200) {
                return Promise.reject(Error(`Failed to upload file (id:${file_id}, filename: ${filename})`));
              }
              const returnData = { ok: true, body: uploadRes.data };
              return Promise.resolve(returnData);
            }
            return Promise.reject(Error(`No upload url found for file (id: ${file_id}, filename: ${filename}`));
          })));
        });
      }
      /**
       * @param options All file uploads arguments
       * @returns An array of file upload entries
       */
      getAllFileUploads(options) {
        return __awaiter(this, void 0, void 0, function* () {
          let fileUploads = [];
          if ("file" in options || "content" in options) {
            fileUploads.push(yield (0, file_upload_1.getFileUploadJob)(options, this.logger));
          }
          if ("file_uploads" in options) {
            fileUploads = fileUploads.concat(yield (0, file_upload_1.getMultipleFileUploadJobs)(options, this.logger));
          }
          return fileUploads;
        });
      }
      /**
       * Low-level function to make a single API request. handles queuing, retries, and http-level errors
       */
      makeRequest(url, body, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const task = () => this.requestQueue.add(() => __awaiter(this, void 0, void 0, function* () {
            const requestURL = url.startsWith("https") ? url : `${this.axios.getUri() + url}`;
            try {
              const config = Object.assign({ headers }, this.tlsConfig);
              if (url.endsWith("admin.analytics.getFile")) {
                config.responseType = "arraybuffer";
              }
              if (url.endsWith("apps.event.authorizations.list")) {
                delete body.token;
              }
              this.logger.debug(`http request url: ${requestURL}`);
              this.logger.debug(`http request body: ${JSON.stringify(redact(body))}`);
              let allHeaders = Object.keys(this.axios.defaults.headers).reduce((acc, cur) => {
                if (!axiosHeaderPropsToIgnore.includes(cur)) {
                  acc[cur] = this.axios.defaults.headers[cur];
                }
                return acc;
              }, {});
              allHeaders = Object.assign(Object.assign(Object.assign({}, this.axios.defaults.headers.common), allHeaders), headers);
              this.logger.debug(`http request headers: ${JSON.stringify(redact(allHeaders))}`);
              const response = yield this.axios.post(url, body, config);
              this.logger.debug("http response received");
              if (response.status === 429) {
                const retrySec = parseRetryHeaders(response);
                if (retrySec !== void 0) {
                  this.emit(WebClientEvent.RATE_LIMITED, retrySec, { url, body });
                  if (this.rejectRateLimitedCalls) {
                    throw new p_retry_1.AbortError((0, errors_1.rateLimitedErrorWithDelay)(retrySec));
                  }
                  this.logger.info(`API Call failed due to rate limiting. Will retry in ${retrySec} seconds.`);
                  this.requestQueue.pause();
                  yield (0, helpers_1.default)(retrySec * 1e3);
                  this.requestQueue.start();
                  throw Error(`A rate limit was exceeded (url: ${url}, retry-after: ${retrySec})`);
                } else {
                  throw new p_retry_1.AbortError(new Error(`Retry header did not contain a valid timeout (url: ${url}, retry-after header: ${response.headers["retry-after"]})`));
                }
              }
              if (response.status !== 200) {
                throw (0, errors_1.httpErrorFromResponse)(response);
              }
              return response;
            } catch (error) {
              const e = error;
              this.logger.warn("http request failed", e.message);
              if (e.request) {
                throw (0, errors_1.requestErrorWithOriginal)(e);
              }
              throw error;
            }
          }));
          return (0, p_retry_1.default)(task, this.retryConfig);
        });
      }
      /**
       * Transforms options (a simple key-value object) into an acceptable value for a body. This can be either
       * a string, used when posting with a content-type of url-encoded. Or, it can be a readable stream, used
       * when the options contain a binary (a stream or a buffer) and the upload should be done with content-type
       * multipart/form-data.
       * @param options - arguments for the Web API method
       * @param headers - a mutable object representing the HTTP headers for the outgoing request
       */
      serializeApiCallOptions(options, headers) {
        let containsBinaryData = false;
        const flattened = Object.entries(options).map(([key, value]) => {
          if (value === void 0 || value === null) {
            return [];
          }
          let serializedValue = value;
          if (Buffer.isBuffer(value) || (0, is_stream_1.default)(value)) {
            containsBinaryData = true;
          } else if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
            serializedValue = JSON.stringify(value);
          }
          return [key, serializedValue];
        });
        if (containsBinaryData) {
          this.logger.debug("Request arguments contain binary data");
          const form = flattened.reduce((frm, [key, value]) => {
            if (Buffer.isBuffer(value) || (0, is_stream_1.default)(value)) {
              const opts = {};
              opts.filename = (() => {
                const streamOrBuffer = value;
                if (typeof streamOrBuffer.name === "string") {
                  return (0, path_1.basename)(streamOrBuffer.name);
                }
                if (typeof streamOrBuffer.path === "string") {
                  return (0, path_1.basename)(streamOrBuffer.path);
                }
                return defaultFilename;
              })();
              frm.append(key, value, opts);
            } else if (key !== void 0 && value !== void 0) {
              frm.append(key, value);
            }
            return frm;
          }, new form_data_1.default());
          if (headers) {
            Object.entries(form.getHeaders()).forEach(([header, value]) => {
              headers[header] = value;
            });
          }
          return form;
        }
        if (headers)
          headers["Content-Type"] = "application/x-www-form-urlencoded";
        const initialValue = {};
        return (0, querystring_1.stringify)(flattened.reduce((accumulator, [key, value]) => {
          if (key !== void 0 && value !== void 0) {
            accumulator[key] = value;
          }
          return accumulator;
        }, initialValue));
      }
      /**
       * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevant
       * HTTP headers into the object.
       * @param response - an http response
       */
      // eslint-disable-next-line class-methods-use-this
      buildResult(response) {
        return __awaiter(this, void 0, void 0, function* () {
          let { data } = response;
          const isGzipResponse = response.headers["content-type"] === "application/gzip";
          if (isGzipResponse) {
            try {
              const unzippedData = yield new Promise((resolve, reject) => {
                zlib_1.default.unzip(data, (err, buf) => {
                  if (err) {
                    return reject(err);
                  }
                  return resolve(buf.toString().split("\n"));
                });
              }).then((res) => res).catch((err) => {
                throw err;
              });
              const fileData = [];
              if (Array.isArray(unzippedData)) {
                unzippedData.forEach((dataset) => {
                  if (dataset && dataset.length > 0) {
                    fileData.push(JSON.parse(dataset));
                  }
                });
              }
              data = { file_data: fileData };
            } catch (err) {
              data = { ok: false, error: err };
            }
          } else if (!isGzipResponse && response.request.path === "/api/admin.analytics.getFile") {
            data = JSON.parse(new util_1.TextDecoder().decode(data));
          }
          if (typeof data === "string") {
            try {
              data = JSON.parse(data);
            } catch (_) {
              data = { ok: false, error: data };
            }
          }
          if (data.response_metadata === void 0) {
            data.response_metadata = {};
          }
          if (response.headers["x-oauth-scopes"] !== void 0) {
            data.response_metadata.scopes = response.headers["x-oauth-scopes"].trim().split(/\s*,\s*/);
          }
          if (response.headers["x-accepted-oauth-scopes"] !== void 0) {
            data.response_metadata.acceptedScopes = response.headers["x-accepted-oauth-scopes"].trim().split(/\s*,\s*/);
          }
          const retrySec = parseRetryHeaders(response);
          if (retrySec !== void 0) {
            data.response_metadata.retryAfter = retrySec;
          }
          return data;
        });
      }
    };
    exports2.WebClient = WebClient2;
    WebClient2.loggerName = "WebClient";
    exports2.default = WebClient2;
    function paginationOptionsForNextPage(previousResult, pageSize) {
      if (previousResult !== void 0 && previousResult.response_metadata !== void 0 && previousResult.response_metadata.next_cursor !== void 0 && previousResult.response_metadata.next_cursor !== "") {
        return {
          limit: pageSize,
          cursor: previousResult.response_metadata.next_cursor
        };
      }
      return void 0;
    }
    function parseRetryHeaders(response) {
      if (response.headers["retry-after"] !== void 0) {
        const retryAfter = parseInt(response.headers["retry-after"], 10);
        if (!Number.isNaN(retryAfter)) {
          return retryAfter;
        }
      }
      return void 0;
    }
    function warnDeprecations(method, logger) {
      const deprecatedMethods = ["workflows."];
      const isDeprecated = deprecatedMethods.some((depMethod) => {
        const re = new RegExp(`^${depMethod}`);
        return re.test(method);
      });
      if (isDeprecated) {
        logger.warn(`${method} is deprecated. Please check on https://api.slack.com/methods for an alternative.`);
      }
    }
    function warnIfFallbackIsMissing(method, logger, options) {
      const targetMethods = ["chat.postEphemeral", "chat.postMessage", "chat.scheduleMessage"];
      const isTargetMethod = targetMethods.includes(method);
      const hasAttachments = (args) => Array.isArray(args.attachments) && args.attachments.length;
      const missingAttachmentFallbackDetected = (args) => Array.isArray(args.attachments) && args.attachments.some((attachment) => !attachment.fallback || attachment.fallback.trim() === "");
      const isEmptyText = (args) => args.text === void 0 || args.text === null || args.text === "";
      const buildMissingTextWarning = () => `The top-level \`text\` argument is missing in the request payload for a ${method} call - It's a best practice to always provide a \`text\` argument when posting a message. The \`text\` is used in places where the content cannot be rendered such as: system push notifications, assistive technology such as screen readers, etc.`;
      const buildMissingFallbackWarning = () => `Additionally, the attachment-level \`fallback\` argument is missing in the request payload for a ${method} call - To avoid this warning, it is recommended to always provide a top-level \`text\` argument when posting a message. Alternatively, you can provide an attachment-level \`fallback\` argument, though this is now considered a legacy field (see https://api.slack.com/reference/messaging/attachments#legacy_fields for more details).`;
      if (isTargetMethod && typeof options === "object") {
        if (hasAttachments(options)) {
          if (missingAttachmentFallbackDetected(options) && isEmptyText(options)) {
            logger.warn(buildMissingTextWarning());
            logger.warn(buildMissingFallbackWarning());
          }
        } else if (isEmptyText(options)) {
          logger.warn(buildMissingTextWarning());
        }
      }
    }
    function warnIfThreadTsIsNotString(method, logger, options) {
      const targetMethods = ["chat.postEphemeral", "chat.postMessage", "chat.scheduleMessage", "files.upload"];
      const isTargetMethod = targetMethods.includes(method);
      if (isTargetMethod && (options === null || options === void 0 ? void 0 : options.thread_ts) !== void 0 && typeof (options === null || options === void 0 ? void 0 : options.thread_ts) !== "string") {
        logger.warn(buildThreadTsWarningMessage(method));
      }
    }
    function buildThreadTsWarningMessage(method) {
      return `The given thread_ts value in the request payload for a ${method} call is a float value. We highly recommend using a string value instead.`;
    }
    exports2.buildThreadTsWarningMessage = buildThreadTsWarningMessage;
    function redact(body) {
      const flattened = Object.entries(body).map(([key, value]) => {
        if (value === void 0 || value === null) {
          return [];
        }
        let serializedValue = value;
        if (key.match(/.*token.*/) !== null || key.match(/[Aa]uthorization/)) {
          serializedValue = "[[REDACTED]]";
        }
        if (Buffer.isBuffer(value) || (0, is_stream_1.default)(value)) {
          serializedValue = "[[BINARY VALUE OMITTED]]";
        } else if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
          serializedValue = JSON.stringify(value);
        }
        return [key, serializedValue];
      });
      const initialValue = {};
      return flattened.reduce((accumulator, [key, value]) => {
        if (key !== void 0 && value !== void 0) {
          accumulator[key] = value;
        }
        return accumulator;
      }, initialValue);
    }
  }
});

// node_modules/@slack/web-api/dist/types/request/index.js
var require_request = __commonJS({
  "node_modules/@slack/web-api/dist/types/request/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/web-api/dist/types/response/index.js
var require_response = __commonJS({
  "node_modules/@slack/web-api/dist/types/response/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@slack/web-api/dist/index.js
var require_dist4 = __commonJS({
  "node_modules/@slack/web-api/dist/index.js"(exports2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addAppMetadata = exports2.retryPolicies = exports2.ErrorCode = exports2.LogLevel = exports2.WebClientEvent = exports2.WebClient = void 0;
    var WebClient_1 = require_WebClient();
    Object.defineProperty(exports2, "WebClient", { enumerable: true, get: function() {
      return WebClient_1.WebClient;
    } });
    Object.defineProperty(exports2, "WebClientEvent", { enumerable: true, get: function() {
      return WebClient_1.WebClientEvent;
    } });
    var logger_1 = require_logger();
    Object.defineProperty(exports2, "LogLevel", { enumerable: true, get: function() {
      return logger_1.LogLevel;
    } });
    var errors_1 = require_errors2();
    Object.defineProperty(exports2, "ErrorCode", { enumerable: true, get: function() {
      return errors_1.ErrorCode;
    } });
    var retry_policies_1 = require_retry_policies();
    Object.defineProperty(exports2, "retryPolicies", { enumerable: true, get: function() {
      return __importDefault(retry_policies_1).default;
    } });
    var instrument_1 = require_instrument();
    Object.defineProperty(exports2, "addAppMetadata", { enumerable: true, get: function() {
      return instrument_1.addAppMetadata;
    } });
    __exportStar(require_methods(), exports2);
    __exportStar(require_request(), exports2);
    __exportStar(require_response(), exports2);
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

// src/utils/slack-logger.ts
var import_fs = require("fs");
var import_os = require("os");
var import_path = __toESM(require("path"), 1);
var import_web_api = __toESM(require_dist4(), 1);
var import_events = require("events");
var SlackLogger = class {
  constructor(name) {
    this.name = name;
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    this.logFileName = `${currentDate}-${this.name}.log.jsonl`;
    this.logFilePath = import_path.default.join((0, import_os.tmpdir)(), this.logFileName);
    this.logFileStream = (0, import_fs.createWriteStream)(this.logFilePath);
    this.logEvent("logStarted", { name: this.name });
  }
  logFileName;
  logFilePath;
  logFileStream;
  logEvent(eventType, data) {
    const event = { eventType, data, time: (/* @__PURE__ */ new Date()).toISOString() };
    this.logFileStream.write(JSON.stringify(event));
    this.logFileStream.write("\n");
  }
  async closeAndSend() {
    await this.close();
    await this.send();
  }
  async close() {
    this.logEvent("logEnded", { name: this.name });
    this.logFileStream.end();
    await (0, import_events.once)(this.logFileStream, "finish");
  }
  async send() {
    const environment = process.env.ENVIRONMENT;
    const token = process.env.SLACK_TOKEN;
    const channel = process.env.SLACK_CHANNEL;
    if (token == null)
      return;
    const slack = new import_web_api.WebClient(token);
    await slack.files.uploadV2({
      file: this.logFilePath,
      filename: this.logFileName,
      channel_id: channel,
      initial_comment: `*${environment}:* Migration "${this.name}" finished.`
    });
  }
};

// src/utils/create-migration.ts
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
  const logger = new SlackLogger(migrationName);
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
    logger
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
    logger
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
    logger
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
    logger
  });
  await logger.closeAndSend();
}
async function changeUuidContents({
  query,
  db,
  migrateState,
  apiCache,
  dryRun,
  table,
  column,
  logger,
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
        logger.logEvent("contentChanged", {
          table,
          column,
          uuid: uuid.uuid,
          tableId: uuid.id,
          oldContent: uuid.content,
          newContent
        });
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
      migrationName: "remove-injections-of-nonexisting-uuids",
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
              return [];
            }
          }
          return [plugin];
        }
      })
    });
    await apiCache.quit();
  }
});
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
