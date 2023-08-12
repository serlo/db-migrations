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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/fp-ts/lib/function.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dual = exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
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
    exports.getBooleanAlgebra = getBooleanAlgebra;
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
    exports.getSemigroup = getSemigroup;
    var getMonoid = function(M) {
      var getSemigroupM = (0, exports.getSemigroup)(M);
      return function() {
        return {
          concat: getSemigroupM().concat,
          empty: function() {
            return M.empty;
          }
        };
      };
    };
    exports.getMonoid = getMonoid;
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
    exports.getSemiring = getSemiring;
    var getRing = function(R) {
      var S = (0, exports.getSemiring)(R);
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
    exports.getRing = getRing;
    var apply = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports.apply = apply;
    function identity(a) {
      return a;
    }
    exports.identity = identity;
    exports.unsafeCoerce = identity;
    function constant(a) {
      return function() {
        return a;
      };
    }
    exports.constant = constant;
    exports.constTrue = constant(true);
    exports.constFalse = constant(false);
    exports.constNull = constant(null);
    exports.constUndefined = constant(void 0);
    exports.constVoid = exports.constUndefined;
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
    exports.flip = flip;
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
    exports.flow = flow;
    function tuple() {
      var t2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t2[_i] = arguments[_i];
      }
      return t2;
    }
    exports.tuple = tuple;
    function increment(n) {
      return n + 1;
    }
    exports.increment = increment;
    function decrement(n) {
      return n - 1;
    }
    exports.decrement = decrement;
    function absurd(_) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    exports.absurd = absurd;
    function tupled(f) {
      return function(a) {
        return f.apply(void 0, a);
      };
    }
    exports.tupled = tupled;
    function untupled(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return f(a);
      };
    }
    exports.untupled = untupled;
    function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi) {
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
    exports.pipe = pipe2;
    exports.hole = absurd;
    var SK = function(_, b) {
      return b;
    };
    exports.SK = SK;
    function not(predicate) {
      return function(a) {
        return !predicate(a);
      };
    }
    exports.not = not;
    var getEndomorphismMonoid = function() {
      return {
        concat: function(first, second) {
          return flow(first, second);
        },
        empty: identity
      };
    };
    exports.getEndomorphismMonoid = getEndomorphismMonoid;
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
    exports.dual = dual;
  }
});

// node_modules/fp-ts/lib/internal.js
var require_internal = __commonJS({
  "node_modules/fp-ts/lib/internal.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.flatMapReader = exports.flatMapTask = exports.flatMapIO = exports.flatMapEither = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
    var function_1 = require_function();
    var isNone = function(fa) {
      return fa._tag === "None";
    };
    exports.isNone = isNone;
    var isSome = function(fa) {
      return fa._tag === "Some";
    };
    exports.isSome = isSome;
    exports.none = { _tag: "None" };
    var some = function(a) {
      return { _tag: "Some", value: a };
    };
    exports.some = some;
    var isLeft = function(ma) {
      return ma._tag === "Left";
    };
    exports.isLeft = isLeft;
    var isRight = function(ma) {
      return ma._tag === "Right";
    };
    exports.isRight = isRight;
    var left = function(e) {
      return { _tag: "Left", left: e };
    };
    exports.left = left;
    var right = function(a) {
      return { _tag: "Right", right: a };
    };
    exports.right = right;
    var singleton = function(a) {
      return [a];
    };
    exports.singleton = singleton;
    var isNonEmpty = function(as) {
      return as.length > 0;
    };
    exports.isNonEmpty = isNonEmpty;
    var head = function(as) {
      return as[0];
    };
    exports.head = head;
    var tail = function(as) {
      return as.slice(1);
    };
    exports.tail = tail;
    exports.emptyReadonlyArray = [];
    exports.emptyRecord = {};
    exports.has = Object.prototype.hasOwnProperty;
    var fromReadonlyNonEmptyArray = function(as) {
      return __spreadArray([as[0]], as.slice(1), true);
    };
    exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
    var liftNullable = function(F) {
      return function(f, onNullable) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither(o == null ? (0, exports.left)(onNullable.apply(void 0, a)) : (0, exports.right)(o));
        };
      };
    };
    exports.liftNullable = liftNullable;
    var liftOption = function(F) {
      return function(f, onNone) {
        return function() {
          var a = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
          }
          var o = f.apply(void 0, a);
          return F.fromEither((0, exports.isNone)(o) ? (0, exports.left)(onNone.apply(void 0, a)) : (0, exports.right)(o.value));
        };
      };
    };
    exports.liftOption = liftOption;
    var flatMapNullable = function(F, M) {
      return (0, function_1.dual)(3, function(self, f, onNullable) {
        return M.flatMap(self, (0, exports.liftNullable)(F)(f, onNullable));
      });
    };
    exports.flatMapNullable = flatMapNullable;
    var flatMapOption = function(F, M) {
      return (0, function_1.dual)(3, function(self, f, onNone) {
        return M.flatMap(self, (0, exports.liftOption)(F)(f, onNone));
      });
    };
    exports.flatMapOption = flatMapOption;
    var flatMapEither = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromEither(f(a));
        });
      });
    };
    exports.flatMapEither = flatMapEither;
    var flatMapIO = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromIO(f(a));
        });
      });
    };
    exports.flatMapIO = flatMapIO;
    var flatMapTask = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromTask(f(a));
        });
      });
    };
    exports.flatMapTask = flatMapTask;
    var flatMapReader = function(F, M) {
      return (0, function_1.dual)(2, function(self, f) {
        return M.flatMap(self, function(a) {
          return F.fromReader(f(a));
        });
      });
    };
    exports.flatMapReader = flatMapReader;
  }
});

// node_modules/fp-ts/lib/Apply.js
var require_Apply = __commonJS({
  "node_modules/fp-ts/lib/Apply.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
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
    exports.ap = ap;
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
    exports.apFirst = apFirst;
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
    exports.apSecond = apSecond;
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
    exports.apS = apS;
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
    exports.getApplySemigroup = getApplySemigroup;
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
    exports.sequenceT = sequenceT;
    function getRecordConstructor(keys) {
      var len = keys.length;
      switch (len) {
        case 1:
          return function(a) {
            var _a;
            return _a = {}, _a[keys[0]] = a, _a;
          };
        case 2:
          return function(a) {
            return function(b) {
              var _a;
              return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a;
            };
          };
        case 3:
          return function(a) {
            return function(b) {
              return function(c) {
                var _a;
                return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a;
              };
            };
          };
        case 4:
          return function(a) {
            return function(b) {
              return function(c) {
                return function(d) {
                  var _a;
                  return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a;
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
                    return _a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a[keys[3]] = d, _a[keys[4]] = e, _a;
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
              r[keys[i]] = args[i];
            }
            return r;
          }, len - 1, []);
      }
    }
    function sequenceS(F) {
      return function(r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
          fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
      };
    }
    exports.sequenceS = sequenceS;
  }
});

// node_modules/fp-ts/lib/Functor.js
var require_Functor = __commonJS({
  "node_modules/fp-ts/lib/Functor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asUnit = exports.as = exports.getFunctorComposition = exports.let = exports.bindTo = exports.flap = exports.map = void 0;
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
    exports.map = map;
    function flap(F) {
      return function(a) {
        return function(fab) {
          return F.map(fab, function(f) {
            return f(a);
          });
        };
      };
    }
    exports.flap = flap;
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
    exports.bindTo = bindTo;
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
    exports.let = let_;
    function getFunctorComposition(F, G) {
      var _map2 = map(F, G);
      return {
        map: function(fga, f) {
          return (0, function_1.pipe)(fga, _map2(f));
        }
      };
    }
    exports.getFunctorComposition = getFunctorComposition;
    function as(F) {
      return function(self, b) {
        return F.map(self, function() {
          return b;
        });
      };
    }
    exports.as = as;
    function asUnit(F) {
      var asM = as(F);
      return function(self) {
        return asM(self, void 0);
      };
    }
    exports.asUnit = asUnit;
  }
});

// node_modules/fp-ts/lib/Applicative.js
var require_Applicative = __commonJS({
  "node_modules/fp-ts/lib/Applicative.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getApplicativeComposition = exports.getApplicativeMonoid = void 0;
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
    exports.getApplicativeMonoid = getApplicativeMonoid;
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
    exports.getApplicativeComposition = getApplicativeComposition;
  }
});

// node_modules/fp-ts/lib/Chain.js
var require_Chain = __commonJS({
  "node_modules/fp-ts/lib/Chain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bind = exports.tap = exports.chainFirst = void 0;
    function chainFirst(M) {
      var tapM = tap(M);
      return function(f) {
        return function(first) {
          return tapM(first, f);
        };
      };
    }
    exports.chainFirst = chainFirst;
    function tap(M) {
      return function(first, f) {
        return M.chain(first, function(a) {
          return M.map(f(a), function() {
            return a;
          });
        });
      };
    }
    exports.tap = tap;
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
    exports.bind = bind;
  }
});

// node_modules/fp-ts/lib/ChainRec.js
var require_ChainRec = __commonJS({
  "node_modules/fp-ts/lib/ChainRec.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tailRec = void 0;
    var tailRec = function(startWith, f) {
      var ab = f(startWith);
      while (ab._tag === "Left") {
        ab = f(ab.left);
      }
      return ab.right;
    };
    exports.tailRec = tailRec;
  }
});

// node_modules/fp-ts/lib/FromEither.js
var require_FromEither = __commonJS({
  "node_modules/fp-ts/lib/FromEither.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tapEither = exports.filterOrElse = exports.chainFirstEitherK = exports.chainEitherK = exports.fromEitherK = exports.chainOptionK = exports.fromOptionK = exports.fromPredicate = exports.fromOption = void 0;
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
    exports.fromOption = fromOption;
    function fromPredicate(F) {
      return function(predicate, onFalse) {
        return function(a) {
          return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
      };
    }
    exports.fromPredicate = fromPredicate;
    function fromOptionK(F) {
      var fromOptionF = fromOption(F);
      return function(onNone) {
        var from = fromOptionF(onNone);
        return function(f) {
          return (0, function_1.flow)(f, from);
        };
      };
    }
    exports.fromOptionK = fromOptionK;
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
    exports.chainOptionK = chainOptionK;
    function fromEitherK(F) {
      return function(f) {
        return (0, function_1.flow)(f, F.fromEither);
      };
    }
    exports.fromEitherK = fromEitherK;
    function chainEitherK(F, M) {
      var fromEitherKF = fromEitherK(F);
      return function(f) {
        return function(ma) {
          return M.chain(ma, fromEitherKF(f));
        };
      };
    }
    exports.chainEitherK = chainEitherK;
    function chainFirstEitherK(F, M) {
      var tapEitherM = tapEither(F, M);
      return function(f) {
        return function(ma) {
          return tapEitherM(ma, f);
        };
      };
    }
    exports.chainFirstEitherK = chainFirstEitherK;
    function filterOrElse(F, M) {
      return function(predicate, onFalse) {
        return function(ma) {
          return M.chain(ma, function(a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
          });
        };
      };
    }
    exports.filterOrElse = filterOrElse;
    function tapEither(F, M) {
      var fromEither = fromEitherK(F);
      var tapM = (0, Chain_1.tap)(M);
      return function(self, f) {
        return tapM(self, fromEither(f));
      };
    }
    exports.tapEither = tapEither;
  }
});

// node_modules/fp-ts/lib/Separated.js
var require_Separated = __commonJS({
  "node_modules/fp-ts/lib/Separated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
    var function_1 = require_function();
    var Functor_1 = require_Functor();
    var separated = function(left2, right2) {
      return { left: left2, right: right2 };
    };
    exports.separated = separated;
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f));
    };
    var _bimap = function(fa, g, f) {
      return (0, function_1.pipe)(fa, (0, exports.bimap)(g, f));
    };
    var map = function(f) {
      return function(fa) {
        return (0, exports.separated)((0, exports.left)(fa), f((0, exports.right)(fa)));
      };
    };
    exports.map = map;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports.separated)(f((0, exports.left)(fa)), (0, exports.right)(fa));
      };
    };
    exports.mapLeft = mapLeft;
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports.separated)(f((0, exports.left)(fa)), g((0, exports.right)(fa)));
      };
    };
    exports.bimap = bimap;
    exports.URI = "Separated";
    exports.Bifunctor = {
      URI: exports.URI,
      mapLeft: _mapLeft,
      bimap: _bimap
    };
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    var left = function(s) {
      return s.left;
    };
    exports.left = left;
    var right = function(s) {
      return s.right;
    };
    exports.right = right;
  }
});

// node_modules/fp-ts/lib/Witherable.js
var require_Witherable = __commonJS({
  "node_modules/fp-ts/lib/Witherable.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filterE = exports.witherDefault = exports.wiltDefault = void 0;
    var _ = __importStar(require_internal());
    function wiltDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.separate);
        };
      };
    }
    exports.wiltDefault = wiltDefault;
    function witherDefault(T, C) {
      return function(F) {
        var traverseF = T.traverse(F);
        return function(wa, f) {
          return F.map(traverseF(wa, f), C.compact);
        };
      };
    }
    exports.witherDefault = witherDefault;
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
    exports.filterE = filterE;
  }
});

// node_modules/fp-ts/lib/Either.js
var require_Either = __commonJS({
  "node_modules/fp-ts/lib/Either.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.match = exports.foldW = exports.matchW = exports.isRight = exports.isLeft = exports.fromOption = exports.fromPredicate = exports.FromEither = exports.MonadThrow = exports.throwError = exports.ChainRec = exports.Extend = exports.extend = exports.Alt = exports.alt = exports.altW = exports.Bifunctor = exports.mapLeft = exports.bimap = exports.Traversable = exports.sequence = exports.traverse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.Applicative = exports.Apply = exports.ap = exports.apW = exports.Pointed = exports.of = exports.asUnit = exports.as = exports.Functor = exports.map = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.flatMap = exports.right = exports.left = void 0;
    exports.chainFirstW = exports.chainFirst = exports.chain = exports.chainW = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toError = exports.toUnion = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.orElse = exports.orElseW = exports.swap = exports.filterOrElseW = exports.filterOrElse = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.chainOptionKW = exports.chainOptionK = exports.fromOptionK = exports.duplicate = exports.flatten = exports.flattenW = exports.tap = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = exports.fold = void 0;
    exports.getValidation = exports.getValidationMonoid = exports.getValidationSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.either = exports.stringifyJSON = exports.parseJSON = void 0;
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
    exports.left = _.left;
    exports.right = _.right;
    exports.flatMap = (0, function_1.dual)(2, function(ma, f) {
      return (0, exports.isLeft)(ma) ? ma : f(ma.right);
    });
    var _map2 = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.map)(f));
    };
    var _ap = function(fab, fa) {
      return (0, function_1.pipe)(fab, (0, exports.ap)(fa));
    };
    var _reduce = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f));
    };
    var _foldMap = function(M) {
      return function(fa, f) {
        var foldMapM = (0, exports.foldMap)(M);
        return (0, function_1.pipe)(fa, foldMapM(f));
      };
    };
    var _reduceRight = function(fa, b, f) {
      return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f));
    };
    var _traverse = function(F) {
      var traverseF = (0, exports.traverse)(F);
      return function(ta, f) {
        return (0, function_1.pipe)(ta, traverseF(f));
      };
    };
    var _bimap = function(fa, f, g) {
      return (0, function_1.pipe)(fa, (0, exports.bimap)(f, g));
    };
    var _mapLeft = function(fa, f) {
      return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f));
    };
    var _alt = function(fa, that) {
      return (0, function_1.pipe)(fa, (0, exports.alt)(that));
    };
    var _extend = function(wa, f) {
      return (0, function_1.pipe)(wa, (0, exports.extend)(f));
    };
    var _chainRec = function(a, f) {
      return (0, ChainRec_1.tailRec)(f(a), function(e) {
        return (0, exports.isLeft)(e) ? (0, exports.right)((0, exports.left)(e.left)) : (0, exports.isLeft)(e.right) ? (0, exports.left)(f(e.right.left)) : (0, exports.right)((0, exports.right)(e.right.right));
      });
    };
    exports.URI = "Either";
    var getShow = function(SE, SA) {
      return {
        show: function(ma) {
          return (0, exports.isLeft)(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")");
        }
      };
    };
    exports.getShow = getShow;
    var getEq = function(EL, EA) {
      return {
        equals: function(x, y) {
          return x === y || ((0, exports.isLeft)(x) ? (0, exports.isLeft)(y) && EL.equals(x.left, y.left) : (0, exports.isRight)(y) && EA.equals(x.right, y.right));
        }
      };
    };
    exports.getEq = getEq;
    var getSemigroup = function(S) {
      return {
        concat: function(x, y) {
          return (0, exports.isLeft)(y) ? x : (0, exports.isLeft)(x) ? y : (0, exports.right)(S.concat(x.right, y.right));
        }
      };
    };
    exports.getSemigroup = getSemigroup;
    var getCompactable = function(M) {
      var empty = (0, exports.left)(M.empty);
      return {
        URI: exports.URI,
        _E: void 0,
        compact: function(ma) {
          return (0, exports.isLeft)(ma) ? ma : ma.right._tag === "None" ? empty : (0, exports.right)(ma.right.value);
        },
        separate: function(ma) {
          return (0, exports.isLeft)(ma) ? (0, Separated_1.separated)(ma, ma) : (0, exports.isLeft)(ma.right) ? (0, Separated_1.separated)((0, exports.right)(ma.right.left), empty) : (0, Separated_1.separated)(empty, (0, exports.right)(ma.right.right));
        }
      };
    };
    exports.getCompactable = getCompactable;
    var getFilterable = function(M) {
      var empty = (0, exports.left)(M.empty);
      var _a = (0, exports.getCompactable)(M), compact = _a.compact, separate = _a.separate;
      var filter = function(ma, predicate) {
        return (0, exports.isLeft)(ma) ? ma : predicate(ma.right) ? ma : empty;
      };
      var partition = function(ma, p) {
        return (0, exports.isLeft)(ma) ? (0, Separated_1.separated)(ma, ma) : p(ma.right) ? (0, Separated_1.separated)(empty, (0, exports.right)(ma.right)) : (0, Separated_1.separated)((0, exports.right)(ma.right), empty);
      };
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map2,
        compact,
        separate,
        filter,
        filterMap: function(ma, f) {
          if ((0, exports.isLeft)(ma)) {
            return ma;
          }
          var ob = f(ma.right);
          return ob._tag === "None" ? empty : (0, exports.right)(ob.value);
        },
        partition,
        partitionMap: function(ma, f) {
          if ((0, exports.isLeft)(ma)) {
            return (0, Separated_1.separated)(ma, ma);
          }
          var e = f(ma.right);
          return (0, exports.isLeft)(e) ? (0, Separated_1.separated)((0, exports.right)(e.left), empty) : (0, Separated_1.separated)(empty, (0, exports.right)(e.right));
        }
      };
    };
    exports.getFilterable = getFilterable;
    var getWitherable = function(M) {
      var F_ = (0, exports.getFilterable)(M);
      var C = (0, exports.getCompactable)(M);
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map2,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: exports.sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: (0, Witherable_1.witherDefault)(exports.Traversable, C),
        wilt: (0, Witherable_1.wiltDefault)(exports.Traversable, C)
      };
    };
    exports.getWitherable = getWitherable;
    var getApplicativeValidation = function(SE) {
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map2,
        ap: function(fab, fa) {
          return (0, exports.isLeft)(fab) ? (0, exports.isLeft)(fa) ? (0, exports.left)(SE.concat(fab.left, fa.left)) : fab : (0, exports.isLeft)(fa) ? fa : (0, exports.right)(fab.right(fa.right));
        },
        of: exports.of
      };
    };
    exports.getApplicativeValidation = getApplicativeValidation;
    var getAltValidation = function(SE) {
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map2,
        alt: function(me, that) {
          if ((0, exports.isRight)(me)) {
            return me;
          }
          var ea = that();
          return (0, exports.isLeft)(ea) ? (0, exports.left)(SE.concat(me.left, ea.left)) : ea;
        }
      };
    };
    exports.getAltValidation = getAltValidation;
    var map = function(f) {
      return function(fa) {
        return (0, exports.isLeft)(fa) ? fa : (0, exports.right)(f(fa.right));
      };
    };
    exports.map = map;
    exports.Functor = {
      URI: exports.URI,
      map: _map2
    };
    exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
    exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
    exports.of = exports.right;
    exports.Pointed = {
      URI: exports.URI,
      of: exports.of
    };
    var apW = function(fa) {
      return function(fab) {
        return (0, exports.isLeft)(fab) ? fab : (0, exports.isLeft)(fa) ? fa : (0, exports.right)(fab.right(fa.right));
      };
    };
    exports.apW = apW;
    exports.ap = exports.apW;
    exports.Apply = {
      URI: exports.URI,
      map: _map2,
      ap: _ap
    };
    exports.Applicative = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of
    };
    exports.Chain = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: exports.flatMap
    };
    exports.Monad = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap
    };
    var reduce = function(b, f) {
      return function(fa) {
        return (0, exports.isLeft)(fa) ? b : f(b, fa.right);
      };
    };
    exports.reduce = reduce;
    var foldMap = function(M) {
      return function(f) {
        return function(fa) {
          return (0, exports.isLeft)(fa) ? M.empty : f(fa.right);
        };
      };
    };
    exports.foldMap = foldMap;
    var reduceRight = function(b, f) {
      return function(fa) {
        return (0, exports.isLeft)(fa) ? b : f(fa.right, b);
      };
    };
    exports.reduceRight = reduceRight;
    exports.Foldable = {
      URI: exports.URI,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight
    };
    var traverse = function(F) {
      return function(f) {
        return function(ta) {
          return (0, exports.isLeft)(ta) ? F.of((0, exports.left)(ta.left)) : F.map(f(ta.right), exports.right);
        };
      };
    };
    exports.traverse = traverse;
    var sequence = function(F) {
      return function(ma) {
        return (0, exports.isLeft)(ma) ? F.of((0, exports.left)(ma.left)) : F.map(ma.right, exports.right);
      };
    };
    exports.sequence = sequence;
    exports.Traversable = {
      URI: exports.URI,
      map: _map2,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence
    };
    var bimap = function(f, g) {
      return function(fa) {
        return (0, exports.isLeft)(fa) ? (0, exports.left)(f(fa.left)) : (0, exports.right)(g(fa.right));
      };
    };
    exports.bimap = bimap;
    var mapLeft = function(f) {
      return function(fa) {
        return (0, exports.isLeft)(fa) ? (0, exports.left)(f(fa.left)) : fa;
      };
    };
    exports.mapLeft = mapLeft;
    exports.Bifunctor = {
      URI: exports.URI,
      bimap: _bimap,
      mapLeft: _mapLeft
    };
    var altW = function(that) {
      return function(fa) {
        return (0, exports.isLeft)(fa) ? that() : fa;
      };
    };
    exports.altW = altW;
    exports.alt = exports.altW;
    exports.Alt = {
      URI: exports.URI,
      map: _map2,
      alt: _alt
    };
    var extend = function(f) {
      return function(wa) {
        return (0, exports.isLeft)(wa) ? wa : (0, exports.right)(f(wa));
      };
    };
    exports.extend = extend;
    exports.Extend = {
      URI: exports.URI,
      map: _map2,
      extend: _extend
    };
    exports.ChainRec = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      chain: exports.flatMap,
      chainRec: _chainRec
    };
    exports.throwError = exports.left;
    exports.MonadThrow = {
      URI: exports.URI,
      map: _map2,
      ap: _ap,
      of: exports.of,
      chain: exports.flatMap,
      throwError: exports.throwError
    };
    exports.FromEither = {
      URI: exports.URI,
      fromEither: function_1.identity
    };
    exports.fromPredicate = (0, FromEither_1.fromPredicate)(exports.FromEither);
    exports.fromOption = /* @__PURE__ */ (0, FromEither_1.fromOption)(exports.FromEither);
    exports.isLeft = _.isLeft;
    exports.isRight = _.isRight;
    var matchW = function(onLeft, onRight) {
      return function(ma) {
        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : onRight(ma.right);
      };
    };
    exports.matchW = matchW;
    exports.foldW = exports.matchW;
    exports.match = exports.matchW;
    exports.fold = exports.match;
    var getOrElseW = function(onLeft) {
      return function(ma) {
        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : ma.right;
      };
    };
    exports.getOrElseW = getOrElseW;
    exports.getOrElse = exports.getOrElseW;
    exports.flap = (0, Functor_1.flap)(exports.Functor);
    exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
    exports.apFirstW = exports.apFirst;
    exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
    exports.apSecondW = exports.apSecond;
    exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
    exports.flattenW = /* @__PURE__ */ (0, exports.flatMap)(function_1.identity);
    exports.flatten = exports.flattenW;
    exports.duplicate = (0, exports.extend)(function_1.identity);
    exports.fromOptionK = /* @__PURE__ */ (0, FromEither_1.fromOptionK)(exports.FromEither);
    exports.chainOptionK = (0, FromEither_1.chainOptionK)(exports.FromEither, exports.Chain);
    exports.chainOptionKW = exports.chainOptionK;
    var _FromEither = {
      fromEither: exports.FromEither.fromEither
    };
    exports.liftNullable = _.liftNullable(_FromEither);
    exports.liftOption = _.liftOption(_FromEither);
    var _FlatMap = {
      flatMap: exports.flatMap
    };
    exports.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
    exports.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
    exports.filterOrElse = (0, FromEither_1.filterOrElse)(exports.FromEither, exports.Chain);
    exports.filterOrElseW = exports.filterOrElse;
    var swap = function(ma) {
      return (0, exports.isLeft)(ma) ? (0, exports.right)(ma.left) : (0, exports.left)(ma.right);
    };
    exports.swap = swap;
    var orElseW = function(onLeft) {
      return function(ma) {
        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : ma;
      };
    };
    exports.orElseW = orElseW;
    exports.orElse = exports.orElseW;
    var fromNullable = function(e) {
      return function(a) {
        return a == null ? (0, exports.left)(e) : (0, exports.right)(a);
      };
    };
    exports.fromNullable = fromNullable;
    var tryCatch = function(f, onThrow) {
      try {
        return (0, exports.right)(f());
      } catch (e) {
        return (0, exports.left)(onThrow(e));
      }
    };
    exports.tryCatch = tryCatch;
    var tryCatchK = function(f, onThrow) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return (0, exports.tryCatch)(function() {
          return f.apply(void 0, a);
        }, onThrow);
      };
    };
    exports.tryCatchK = tryCatchK;
    var fromNullableK = function(e) {
      var from = (0, exports.fromNullable)(e);
      return function(f) {
        return (0, function_1.flow)(f, from);
      };
    };
    exports.fromNullableK = fromNullableK;
    var chainNullableK = function(e) {
      var from = (0, exports.fromNullableK)(e);
      return function(f) {
        return (0, exports.flatMap)(from(f));
      };
    };
    exports.chainNullableK = chainNullableK;
    exports.toUnion = (0, exports.foldW)(function_1.identity, function_1.identity);
    function toError(e) {
      return e instanceof Error ? e : new Error(String(e));
    }
    exports.toError = toError;
    function elem(E) {
      return function(a, ma) {
        if (ma === void 0) {
          var elemE_1 = elem(E);
          return function(ma2) {
            return elemE_1(a, ma2);
          };
        }
        return (0, exports.isLeft)(ma) ? false : E.equals(a, ma.right);
      };
    }
    exports.elem = elem;
    var exists = function(predicate) {
      return function(ma) {
        return (0, exports.isLeft)(ma) ? false : predicate(ma.right);
      };
    };
    exports.exists = exists;
    exports.Do = (0, exports.of)(_.emptyRecord);
    exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
    var let_ = /* @__PURE__ */ (0, Functor_1.let)(exports.Functor);
    exports.let = let_;
    exports.bind = chainable.bind(exports.Chain);
    exports.bindW = exports.bind;
    exports.apS = (0, Apply_1.apS)(exports.Apply);
    exports.apSW = exports.apS;
    exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
    var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
      return function(as) {
        var e = f(0, _.head(as));
        if ((0, exports.isLeft)(e)) {
          return e;
        }
        var out = [e.right];
        for (var i = 1; i < as.length; i++) {
          var e_1 = f(i, as[i]);
          if ((0, exports.isLeft)(e_1)) {
            return e_1;
          }
          out.push(e_1.right);
        }
        return (0, exports.right)(out);
      };
    };
    exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
    var traverseReadonlyArrayWithIndex = function(f) {
      var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
      return function(as) {
        return _.isNonEmpty(as) ? g(as) : exports.ApT;
      };
    };
    exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
    exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
    var traverseArray = function(f) {
      return (0, exports.traverseReadonlyArrayWithIndex)(function(_2, a) {
        return f(a);
      });
    };
    exports.traverseArray = traverseArray;
    exports.sequenceArray = /* @__PURE__ */ (0, exports.traverseArray)(function_1.identity);
    exports.chainW = exports.flatMap;
    exports.chain = exports.flatMap;
    exports.chainFirst = exports.tap;
    exports.chainFirstW = exports.tap;
    function parseJSON(s, onError) {
      return (0, exports.tryCatch)(function() {
        return JSON.parse(s);
      }, onError);
    }
    exports.parseJSON = parseJSON;
    var stringifyJSON = function(u, onError) {
      return (0, exports.tryCatch)(function() {
        var s = JSON.stringify(u);
        if (typeof s !== "string") {
          throw new Error("Converting unsupported structure to JSON");
        }
        return s;
      }, onError);
    };
    exports.stringifyJSON = stringifyJSON;
    exports.either = {
      URI: exports.URI,
      map: _map2,
      of: exports.of,
      ap: _ap,
      chain: exports.flatMap,
      reduce: _reduce,
      foldMap: _foldMap,
      reduceRight: _reduceRight,
      traverse: _traverse,
      sequence: exports.sequence,
      bimap: _bimap,
      mapLeft: _mapLeft,
      alt: _alt,
      extend: _extend,
      chainRec: _chainRec,
      throwError: exports.throwError
    };
    exports.getApplySemigroup = /* @__PURE__ */ (0, Apply_1.getApplySemigroup)(exports.Apply);
    exports.getApplyMonoid = /* @__PURE__ */ (0, Applicative_1.getApplicativeMonoid)(exports.Applicative);
    var getValidationSemigroup = function(SE, SA) {
      return (0, Apply_1.getApplySemigroup)((0, exports.getApplicativeValidation)(SE))(SA);
    };
    exports.getValidationSemigroup = getValidationSemigroup;
    var getValidationMonoid = function(SE, MA) {
      return (0, Applicative_1.getApplicativeMonoid)((0, exports.getApplicativeValidation)(SE))(MA);
    };
    exports.getValidationMonoid = getValidationMonoid;
    function getValidation(SE) {
      var ap = (0, exports.getApplicativeValidation)(SE).ap;
      var alt = (0, exports.getAltValidation)(SE).alt;
      return {
        URI: exports.URI,
        _E: void 0,
        map: _map2,
        of: exports.of,
        chain: exports.flatMap,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: exports.sequence,
        chainRec: _chainRec,
        throwError: exports.throwError,
        ap,
        alt
      };
    }
    exports.getValidation = getValidation;
  }
});

// node_modules/io-ts/lib/index.js
var require_lib = __commonJS({
  "node_modules/io-ts/lib/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
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
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t2[p] = s[p];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.partial = exports.PartialType = exports.type = exports.InterfaceType = exports.array = exports.ArrayType = exports.recursion = exports.RecursiveType = exports.Int = exports.brand = exports.RefinementType = exports.keyof = exports.KeyofType = exports.literal = exports.LiteralType = exports.void = exports.undefined = exports.null = exports.UnknownRecord = exports.AnyDictionaryType = exports.UnknownArray = exports.AnyArrayType = exports.boolean = exports.BooleanType = exports.bigint = exports.BigIntType = exports.number = exports.NumberType = exports.string = exports.StringType = exports.unknown = exports.UnknownType = exports.voidType = exports.VoidType = exports.UndefinedType = exports.nullType = exports.NullType = exports.getIndex = exports.getTags = exports.emptyTags = exports.mergeAll = exports.getDomainKeys = exports.appendContext = exports.getContextEntry = exports.getFunctionName = exports.identity = exports.Type = exports.success = exports.failure = exports.failures = void 0;
    exports.alias = exports.clean = exports.StrictType = exports.dictionary = exports.object = exports.ObjectType = exports.Dictionary = exports.getDefaultContext = exports.getValidationError = exports.interface = exports.Array = exports.taggedUnion = exports.TaggedUnionType = exports.Integer = exports.refinement = exports.any = exports.AnyType = exports.never = exports.NeverType = exports.Function = exports.FunctionType = exports.exact = exports.ExactType = exports.strict = exports.readonlyArray = exports.ReadonlyArrayType = exports.readonly = exports.ReadonlyType = exports.tuple = exports.TupleType = exports.intersection = exports.IntersectionType = exports.union = exports.UnionType = exports.record = exports.DictionaryType = void 0;
    var Either_1 = require_Either();
    exports.failures = Either_1.left;
    var failure = function(value, context, message) {
      return (0, exports.failures)([{ value, context, message }]);
    };
    exports.failure = failure;
    exports.success = Either_1.right;
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
          }, this.encode === exports.identity && ab.encode === exports.identity ? exports.identity : function(b) {
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
    exports.Type = Type;
    var identity = function(a) {
      return a;
    };
    exports.identity = identity;
    function getFunctionName(f) {
      return f.displayName || f.name || "<function".concat(f.length, ">");
    }
    exports.getFunctionName = getFunctionName;
    function getContextEntry(key, decoder) {
      return { key, type: decoder };
    }
    exports.getContextEntry = getContextEntry;
    function appendContext(c, key, decoder, actual) {
      var len = c.length;
      var r = Array(len + 1);
      for (var i = 0; i < len; i++) {
        r[i] = c[i];
      }
      r[len] = { key, type: decoder, actual };
      return r;
    }
    exports.appendContext = appendContext;
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
        if (codecs[i].encode !== exports.identity) {
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
    function enumerableRecord(keys, domain, codomain, name) {
      if (name === void 0) {
        name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }");
      }
      var len = keys.length;
      return new DictionaryType(name, function(u) {
        return exports.UnknownRecord.is(u) && keys.every(function(k) {
          return codomain.is(u[k]);
        });
      }, function(u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var o = e.right;
        var a = {};
        var errors = [];
        var changed = false;
        for (var i = 0; i < len; i++) {
          var k = keys[i];
          var ok = o[k];
          var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
          if ((0, Either_1.isLeft)(codomainResult)) {
            pushAll(errors, codomainResult.left);
          } else {
            var vok = codomainResult.right;
            changed = changed || vok !== ok;
            a[k] = vok;
          }
        }
        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(changed || Object.keys(o).length !== len ? a : o);
      }, codomain.encode === exports.identity ? exports.identity : function(a) {
        var s = {};
        for (var i = 0; i < len; i++) {
          var k = keys[i];
          s[k] = codomain.encode(a[k]);
        }
        return s;
      }, domain, codomain);
    }
    function getDomainKeys(domain) {
      var _a;
      if (isLiteralC(domain)) {
        var literal_1 = domain.value;
        if (exports.string.is(literal_1)) {
          return _a = {}, _a[literal_1] = null, _a;
        }
      } else if (isKeyofC(domain)) {
        return domain.keys;
      } else if (isUnionC(domain)) {
        var keys = domain.types.map(function(type3) {
          return getDomainKeys(type3);
        });
        return keys.some(undefinedType.is) ? void 0 : Object.assign.apply(Object, __spreadArray([{}], keys, false));
      }
      return void 0;
    }
    exports.getDomainKeys = getDomainKeys;
    function nonEnumerableRecord(domain, codomain, name) {
      if (name === void 0) {
        name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }");
      }
      return new DictionaryType(name, function(u) {
        if (exports.UnknownRecord.is(u)) {
          return Object.keys(u).every(function(k) {
            return domain.is(k) && codomain.is(u[k]);
          });
        }
        return isAnyC(codomain) && Array.isArray(u);
      }, function(u, c) {
        if (exports.UnknownRecord.is(u)) {
          var a = {};
          var errors = [];
          var keys = Object.keys(u);
          var len = keys.length;
          var changed = false;
          for (var i = 0; i < len; i++) {
            var k = keys[i];
            var ok = u[k];
            var domainResult = domain.validate(k, appendContext(c, k, domain, k));
            if ((0, Either_1.isLeft)(domainResult)) {
              pushAll(errors, domainResult.left);
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
          return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(changed ? a : u);
        }
        if (isAnyC(codomain) && Array.isArray(u)) {
          return (0, exports.success)(u);
        }
        return (0, exports.failure)(u, c);
      }, domain.encode === exports.identity && codomain.encode === exports.identity ? exports.identity : function(a) {
        var s = {};
        var keys = Object.keys(a);
        var len = keys.length;
        for (var i = 0; i < len; i++) {
          var k = keys[i];
          s[String(domain.encode(k))] = codomain.encode(a[k]);
        }
        return s;
      }, domain, codomain);
    }
    function getUnionName(codecs) {
      return "(" + codecs.map(function(type3) {
        return type3.name;
      }).join(" | ") + ")";
    }
    function mergeAll(base, us) {
      var equal = true;
      var primitive = true;
      var baseIsNotADictionary = !exports.UnknownRecord.is(base);
      for (var _i = 0, us_1 = us; _i < us_1.length; _i++) {
        var u = us_1[_i];
        if (u !== base) {
          equal = false;
        }
        if (exports.UnknownRecord.is(u)) {
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
    exports.mergeAll = mergeAll;
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
          return codec.types.reduce(function(props, type3) {
            return Object.assign(props, getProps(type3));
          }, {});
      }
    }
    function stripKeys(o, props) {
      var keys = Object.getOwnPropertyNames(o);
      var shouldStrip = false;
      var r = {};
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
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
    exports.emptyTags = {};
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
      if (a === exports.emptyTags) {
        return b;
      }
      if (b === exports.emptyTags) {
        return a;
      }
      var r = Object.assign({}, a);
      for (var k in b) {
        if (hasOwnProperty.call(a, k)) {
          var intersection_1 = intersect(a[k], b[k]);
          if (isNonEmpty(intersection_1)) {
            r[k] = intersection_1;
          } else {
            r = exports.emptyTags;
            break;
          }
        } else {
          r[k] = b[k];
        }
      }
      return r;
    }
    function intersectTags(a, b) {
      if (a === exports.emptyTags || b === exports.emptyTags) {
        return exports.emptyTags;
      }
      var r = exports.emptyTags;
      for (var k in a) {
        if (hasOwnProperty.call(b, k)) {
          var intersection_2 = intersect(a[k], b[k]);
          if (intersection_2.length === 0) {
            if (r === exports.emptyTags) {
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
        return exports.emptyTags;
      }
      if (isTypeC(codec) || isStrictC(codec)) {
        var index = exports.emptyTags;
        for (var k in codec.props) {
          var prop = codec.props[k];
          if (isLiteralC(prop)) {
            if (index === exports.emptyTags) {
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
        }, exports.emptyTags);
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
      return exports.emptyTags;
    }
    exports.getTags = getTags;
    function getIndex(codecs) {
      var tags = getTags(codecs[0]);
      var keys = Object.keys(tags);
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
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
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
    exports.getIndex = getIndex;
    var NullType = (
      /** @class */
      function(_super) {
        __extends(NullType2, _super);
        function NullType2() {
          var _this = _super.call(this, "null", function(u) {
            return u === null;
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "NullType";
          return _this;
        }
        return NullType2;
      }(Type)
    );
    exports.NullType = NullType;
    exports.nullType = new NullType();
    exports.null = exports.nullType;
    var UndefinedType = (
      /** @class */
      function(_super) {
        __extends(UndefinedType2, _super);
        function UndefinedType2() {
          var _this = _super.call(this, "undefined", function(u) {
            return u === void 0;
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "UndefinedType";
          return _this;
        }
        return UndefinedType2;
      }(Type)
    );
    exports.UndefinedType = UndefinedType;
    var undefinedType = new UndefinedType();
    exports.undefined = undefinedType;
    var VoidType = (
      /** @class */
      function(_super) {
        __extends(VoidType2, _super);
        function VoidType2() {
          var _this = _super.call(this, "void", undefinedType.is, undefinedType.validate, exports.identity) || this;
          _this._tag = "VoidType";
          return _this;
        }
        return VoidType2;
      }(Type)
    );
    exports.VoidType = VoidType;
    exports.voidType = new VoidType();
    exports.void = exports.voidType;
    var UnknownType = (
      /** @class */
      function(_super) {
        __extends(UnknownType2, _super);
        function UnknownType2() {
          var _this = _super.call(this, "unknown", function(_) {
            return true;
          }, exports.success, exports.identity) || this;
          _this._tag = "UnknownType";
          return _this;
        }
        return UnknownType2;
      }(Type)
    );
    exports.UnknownType = UnknownType;
    exports.unknown = new UnknownType();
    var StringType = (
      /** @class */
      function(_super) {
        __extends(StringType2, _super);
        function StringType2() {
          var _this = _super.call(this, "string", function(u) {
            return typeof u === "string";
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "StringType";
          return _this;
        }
        return StringType2;
      }(Type)
    );
    exports.StringType = StringType;
    exports.string = new StringType();
    var NumberType = (
      /** @class */
      function(_super) {
        __extends(NumberType2, _super);
        function NumberType2() {
          var _this = _super.call(this, "number", function(u) {
            return typeof u === "number";
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "NumberType";
          return _this;
        }
        return NumberType2;
      }(Type)
    );
    exports.NumberType = NumberType;
    exports.number = new NumberType();
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
              return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
            },
            exports.identity
          ) || this;
          _this._tag = "BigIntType";
          return _this;
        }
        return BigIntType2;
      }(Type)
    );
    exports.BigIntType = BigIntType;
    exports.bigint = new BigIntType();
    var BooleanType = (
      /** @class */
      function(_super) {
        __extends(BooleanType2, _super);
        function BooleanType2() {
          var _this = _super.call(this, "boolean", function(u) {
            return typeof u === "boolean";
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "BooleanType";
          return _this;
        }
        return BooleanType2;
      }(Type)
    );
    exports.BooleanType = BooleanType;
    exports.boolean = new BooleanType();
    var AnyArrayType = (
      /** @class */
      function(_super) {
        __extends(AnyArrayType2, _super);
        function AnyArrayType2() {
          var _this = _super.call(this, "UnknownArray", Array.isArray, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "AnyArrayType";
          return _this;
        }
        return AnyArrayType2;
      }(Type)
    );
    exports.AnyArrayType = AnyArrayType;
    exports.UnknownArray = new AnyArrayType();
    exports.Array = exports.UnknownArray;
    var AnyDictionaryType = (
      /** @class */
      function(_super) {
        __extends(AnyDictionaryType2, _super);
        function AnyDictionaryType2() {
          var _this = _super.call(this, "UnknownRecord", function(u) {
            return u !== null && typeof u === "object" && !Array.isArray(u);
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "AnyDictionaryType";
          return _this;
        }
        return AnyDictionaryType2;
      }(Type)
    );
    exports.AnyDictionaryType = AnyDictionaryType;
    exports.UnknownRecord = new AnyDictionaryType();
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
    exports.LiteralType = LiteralType;
    function literal2(value, name) {
      if (name === void 0) {
        name = JSON.stringify(value);
      }
      var is = function(u) {
        return u === value;
      };
      return new LiteralType(name, is, function(u, c) {
        return is(u) ? (0, exports.success)(value) : (0, exports.failure)(u, c);
      }, exports.identity, value);
    }
    exports.literal = literal2;
    var KeyofType = (
      /** @class */
      function(_super) {
        __extends(KeyofType2, _super);
        function KeyofType2(name, is, validate, encode, keys) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.keys = keys;
          _this._tag = "KeyofType";
          return _this;
        }
        return KeyofType2;
      }(Type)
    );
    exports.KeyofType = KeyofType;
    function keyof(keys, name) {
      if (name === void 0) {
        name = Object.keys(keys).map(function(k) {
          return JSON.stringify(k);
        }).join(" | ");
      }
      var is = function(u) {
        return exports.string.is(u) && hasOwnProperty.call(keys, u);
      };
      return new KeyofType(name, is, function(u, c) {
        return is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
      }, exports.identity, keys);
    }
    exports.keyof = keyof;
    var RefinementType = (
      /** @class */
      function(_super) {
        __extends(RefinementType2, _super);
        function RefinementType2(name, is, validate, encode, type3, predicate) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type3;
          _this.predicate = predicate;
          _this._tag = "RefinementType";
          return _this;
        }
        return RefinementType2;
      }(Type)
    );
    exports.RefinementType = RefinementType;
    function brand(codec, predicate, name) {
      return refinement(codec, predicate, name);
    }
    exports.brand = brand;
    exports.Int = brand(exports.number, function(n) {
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
    exports.RecursiveType = RecursiveType;
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
    exports.recursion = recursion;
    var ArrayType = (
      /** @class */
      function(_super) {
        __extends(ArrayType2, _super);
        function ArrayType2(name, is, validate, encode, type3) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type3;
          _this._tag = "ArrayType";
          return _this;
        }
        return ArrayType2;
      }(Type)
    );
    exports.ArrayType = ArrayType;
    function array2(item, name) {
      if (name === void 0) {
        name = "Array<".concat(item.name, ">");
      }
      return new ArrayType(name, function(u) {
        return exports.UnknownArray.is(u) && u.every(item.is);
      }, function(u, c) {
        var e = exports.UnknownArray.validate(u, c);
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
        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(as);
      }, item.encode === exports.identity ? exports.identity : function(a) {
        return a.map(item.encode);
      }, item);
    }
    exports.array = array2;
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
    exports.InterfaceType = InterfaceType;
    function type2(props, name) {
      if (name === void 0) {
        name = getInterfaceTypeName(props);
      }
      var keys = Object.keys(props);
      var types = keys.map(function(key) {
        return props[key];
      });
      var len = keys.length;
      return new InterfaceType(name, function(u) {
        if (exports.UnknownRecord.is(u)) {
          for (var i = 0; i < len; i++) {
            var k = keys[i];
            var uk = u[k];
            if (uk === void 0 && !hasOwnProperty.call(u, k) || !types[i].is(uk)) {
              return false;
            }
          }
          return true;
        }
        return false;
      }, function(u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var o = e.right;
        var a = o;
        var errors = [];
        for (var i = 0; i < len; i++) {
          var k = keys[i];
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
        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(a);
      }, useIdentity(types) ? exports.identity : function(a) {
        var s = __assign({}, a);
        for (var i = 0; i < len; i++) {
          var k = keys[i];
          var encode = types[i].encode;
          if (encode !== exports.identity) {
            s[k] = encode(a[k]);
          }
        }
        return s;
      }, props);
    }
    exports.type = type2;
    exports.interface = type2;
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
    exports.PartialType = PartialType;
    function partial(props, name) {
      if (name === void 0) {
        name = getPartialTypeName(getInterfaceTypeName(props));
      }
      var keys = Object.keys(props);
      var types = keys.map(function(key) {
        return props[key];
      });
      var len = keys.length;
      return new PartialType(name, function(u) {
        if (exports.UnknownRecord.is(u)) {
          for (var i = 0; i < len; i++) {
            var k = keys[i];
            var uk = u[k];
            if (uk !== void 0 && !props[k].is(uk)) {
              return false;
            }
          }
          return true;
        }
        return false;
      }, function(u, c) {
        var e = exports.UnknownRecord.validate(u, c);
        if ((0, Either_1.isLeft)(e)) {
          return e;
        }
        var o = e.right;
        var a = o;
        var errors = [];
        for (var i = 0; i < len; i++) {
          var k = keys[i];
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
        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(a);
      }, useIdentity(types) ? exports.identity : function(a) {
        var s = __assign({}, a);
        for (var i = 0; i < len; i++) {
          var k = keys[i];
          var ak = a[k];
          if (ak !== void 0) {
            s[k] = types[i].encode(ak);
          }
        }
        return s;
      }, props);
    }
    exports.partial = partial;
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
    exports.DictionaryType = DictionaryType;
    function record(domain, codomain, name) {
      var keys = getDomainKeys(domain);
      return keys ? enumerableRecord(Object.keys(keys), domain, codomain, name) : nonEnumerableRecord(domain, codomain, name);
    }
    exports.record = record;
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
    exports.UnionType = UnionType;
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
          if (exports.UnknownRecord.is(u)) {
            var i = find_1(u[tag_1]);
            return i !== void 0 ? codecs[i].is(u) : false;
          }
          return false;
        }, function(u, c) {
          var e = exports.UnknownRecord.validate(u, c);
          if ((0, Either_1.isLeft)(e)) {
            return e;
          }
          var r = e.right;
          var i = find_1(r[tag_1]);
          if (i === void 0) {
            return (0, exports.failure)(u, c);
          }
          var codec = codecs[i];
          return codec.validate(r, appendContext(c, String(i), codec, r));
        }, useIdentity(codecs) ? exports.identity : function(a) {
          var i = find_1(a[tag_1]);
          if (i === void 0) {
            throw new Error("no codec found to encode value in union codec ".concat(name));
          } else {
            return codecs[i].encode(a);
          }
        }, codecs, tag_1);
      } else {
        return new UnionType(name, function(u) {
          return codecs.some(function(type3) {
            return type3.is(u);
          });
        }, function(u, c) {
          var errors = [];
          for (var i = 0; i < codecs.length; i++) {
            var codec = codecs[i];
            var result = codec.validate(u, appendContext(c, String(i), codec, u));
            if ((0, Either_1.isLeft)(result)) {
              pushAll(errors, result.left);
            } else {
              return (0, exports.success)(result.right);
            }
          }
          return (0, exports.failures)(errors);
        }, useIdentity(codecs) ? exports.identity : function(a) {
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
    exports.union = union;
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
    exports.IntersectionType = IntersectionType;
    function intersection(codecs, name) {
      if (name === void 0) {
        name = "(".concat(codecs.map(function(type3) {
          return type3.name;
        }).join(" & "), ")");
      }
      var len = codecs.length;
      return new IntersectionType(name, function(u) {
        return codecs.every(function(type3) {
          return type3.is(u);
        });
      }, codecs.length === 0 ? exports.success : function(u, c) {
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
        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(mergeAll(u, us));
      }, codecs.length === 0 ? exports.identity : function(a) {
        return mergeAll(a, codecs.map(function(codec) {
          return codec.encode(a);
        }));
      }, codecs);
    }
    exports.intersection = intersection;
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
    exports.TupleType = TupleType;
    function tuple(codecs, name) {
      if (name === void 0) {
        name = "[".concat(codecs.map(function(type3) {
          return type3.name;
        }).join(", "), "]");
      }
      var len = codecs.length;
      return new TupleType(name, function(u) {
        return exports.UnknownArray.is(u) && u.length === len && codecs.every(function(type3, i) {
          return type3.is(u[i]);
        });
      }, function(u, c) {
        var e = exports.UnknownArray.validate(u, c);
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
        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(as);
      }, useIdentity(codecs) ? exports.identity : function(a) {
        return codecs.map(function(type3, i) {
          return type3.encode(a[i]);
        });
      }, codecs);
    }
    exports.tuple = tuple;
    var ReadonlyType = (
      /** @class */
      function(_super) {
        __extends(ReadonlyType2, _super);
        function ReadonlyType2(name, is, validate, encode, type3) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type3;
          _this._tag = "ReadonlyType";
          return _this;
        }
        return ReadonlyType2;
      }(Type)
    );
    exports.ReadonlyType = ReadonlyType;
    function readonly(codec, name) {
      if (name === void 0) {
        name = "Readonly<".concat(codec.name, ">");
      }
      return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
    }
    exports.readonly = readonly;
    var ReadonlyArrayType = (
      /** @class */
      function(_super) {
        __extends(ReadonlyArrayType2, _super);
        function ReadonlyArrayType2(name, is, validate, encode, type3) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type3;
          _this._tag = "ReadonlyArrayType";
          return _this;
        }
        return ReadonlyArrayType2;
      }(Type)
    );
    exports.ReadonlyArrayType = ReadonlyArrayType;
    function readonlyArray(item, name) {
      if (name === void 0) {
        name = "ReadonlyArray<".concat(item.name, ">");
      }
      var codec = array2(item);
      return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
    }
    exports.readonlyArray = readonlyArray;
    var strict = function(props, name) {
      return exact(type2(props), name);
    };
    exports.strict = strict;
    var ExactType = (
      /** @class */
      function(_super) {
        __extends(ExactType2, _super);
        function ExactType2(name, is, validate, encode, type3) {
          var _this = _super.call(this, name, is, validate, encode) || this;
          _this.type = type3;
          _this._tag = "ExactType";
          return _this;
        }
        return ExactType2;
      }(Type)
    );
    exports.ExactType = ExactType;
    function exact(codec, name) {
      if (name === void 0) {
        name = getExactTypeName(codec);
      }
      var props = getProps(codec);
      return new ExactType(name, codec.is, function(u, c) {
        var e = exports.UnknownRecord.validate(u, c);
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
    exports.exact = exact;
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
              return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
            },
            exports.identity
          ) || this;
          _this._tag = "FunctionType";
          return _this;
        }
        return FunctionType2;
      }(Type)
    );
    exports.FunctionType = FunctionType;
    exports.Function = new FunctionType();
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
              return (0, exports.failure)(u, c);
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
    exports.NeverType = NeverType;
    exports.never = new NeverType();
    var AnyType = (
      /** @class */
      function(_super) {
        __extends(AnyType2, _super);
        function AnyType2() {
          var _this = _super.call(this, "any", function(_) {
            return true;
          }, exports.success, exports.identity) || this;
          _this._tag = "AnyType";
          return _this;
        }
        return AnyType2;
      }(Type)
    );
    exports.AnyType = AnyType;
    exports.any = new AnyType();
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
        return predicate(a) ? (0, exports.success)(a) : (0, exports.failure)(a, c);
      }, codec.encode, codec, predicate);
    }
    exports.refinement = refinement;
    exports.Integer = refinement(exports.number, Number.isInteger, "Integer");
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
    exports.TaggedUnionType = TaggedUnionType;
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
    exports.taggedUnion = taggedUnion;
    var getValidationError = function(value, context) {
      return {
        value,
        context
      };
    };
    exports.getValidationError = getValidationError;
    var getDefaultContext = function(decoder) {
      return [
        { key: "", type: decoder }
      ];
    };
    exports.getDefaultContext = getDefaultContext;
    exports.Dictionary = exports.UnknownRecord;
    var ObjectType = (
      /** @class */
      function(_super) {
        __extends(ObjectType2, _super);
        function ObjectType2() {
          var _this = _super.call(this, "object", function(u) {
            return u !== null && typeof u === "object";
          }, function(u, c) {
            return _this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c);
          }, exports.identity) || this;
          _this._tag = "ObjectType";
          return _this;
        }
        return ObjectType2;
      }(Type)
    );
    exports.ObjectType = ObjectType;
    exports.object = new ObjectType();
    exports.dictionary = record;
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
    exports.StrictType = StrictType;
    function clean(codec) {
      return codec;
    }
    exports.clean = clean;
    function alias(codec) {
      return function() {
        return codec;
      };
    }
    exports.alias = alias;
  }
});

// src/20230724123400-migrate-equations.ts
var migrate_equations_exports = {};
__export(migrate_equations_exports, {
  migrateEquationsState: () => migrateEquationsState
});
module.exports = __toCommonJS(migrate_equations_exports);
var t = __toESM(require_lib(), 1);

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

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// src/utils/create-migration.ts
function createMigration(exports, {
  up,
  down
}) {
  exports._meta = {
    version: 1
  };
  exports.up = (db, cb) => {
    up(createDatabase(db)).then(() => {
      cb(void 0);
    }).catch((error) => {
      cb(error);
    });
  };
  exports.down = (db, cb) => {
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

// src/20230724123400-migrate-equations.ts
createMigration(module.exports, {
  up: async (db) => {
    try {
      async function processResults(results2) {
        try {
          if (results2.length === 0)
            return;
          const [field, ...remainingResults] = results2;
          const state = JSON.parse(field.value);
          const newState = JSON.stringify(migrateState(state));
          if (field.value !== newState) {
            await db.runSql(
              `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
              newState,
              field.id
            );
            console.log("Updated revision", field.revision);
          }
          await processResults(remainingResults);
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.stack);
            console.error(results2[0].id);
          }
        }
      }
      const results = await db.runSql(`
      SELECT erf.id, erf.value, er.id as revision
      FROM entity_revision_field erf
        LEFT JOIN entity_revision er on erf.entity_revision_id = er.id
        LEFT JOIN entity e on er.repository_id = e.id
      WHERE erf.field = 'content'
        AND erf.value LIKE '%{"plugin":"equations"%'
    `);
      await processResults(results);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.stack);
      }
    }
  }
});
var LegacyEquationsState = t.type({
  steps: t.array(
    t.type({
      left: t.type({ plugin: t.literal("text") }),
      right: t.type({ plugin: t.literal("text") }),
      transform: t.type({ plugin: t.literal("text") }),
      sign: t.string
    })
  )
});
function migrateState(document) {
  switch (document.plugin) {
    case "equations":
      if (LegacyEquationsState.is(document.state)) {
        return migrateEquationsState(
          document.state
        );
      } else {
        return document;
      }
    case "blockquote":
      return {
        ...document,
        state: migrateState(document.state)
      };
    case "exercise":
      return {
        ...document,
        state: {
          ...document.state,
          content: migrateState(document.state.content),
          interactive: document.state.interactive ? migrateState(document.state.interactive) : void 0
        }
      };
    case "important":
      return {
        ...document,
        state: migrateState(document.state)
      };
    case "inputExercise":
      return {
        ...document,
        state: {
          ...document.state,
          answers: document.state.answers.map((answer) => {
            return {
              ...answer,
              feedback: migrateState(answer.feedback)
            };
          })
        }
      };
    case "layout":
      return {
        ...document,
        state: document.state.map((row) => {
          return {
            ...row,
            child: migrateState(row.child)
          };
        })
      };
    case "multimedia":
      return {
        ...document,
        state: {
          ...document.state,
          explanation: migrateState(document.state.explanation),
          multimedia: migrateState(document.state.multimedia)
        }
      };
    case "rows":
      return {
        ...document,
        state: document.state.map((row) => {
          return migrateState(row);
        })
      };
    case "scMcExercise":
      return {
        ...document,
        state: {
          ...document.state,
          answers: document.state.answers.map((answer) => {
            return {
              ...answer,
              content: migrateState(answer.content),
              feedback: migrateState(answer.feedback)
            };
          })
        }
      };
    case "spoiler":
      return {
        ...document,
        state: {
          ...document.state,
          content: migrateState(document.state.content)
        }
      };
    case "solution":
      return {
        ...document,
        state: {
          ...document.state,
          strategy: migrateState(document.state.strategy),
          steps: migrateState(document.state.steps)
        }
      };
    case "anchor":
    case "deprecated":
    case "error":
    case "geogebra":
    case "highlight":
    case "image":
    case "injection":
    case "separator":
    case "table":
    case "text":
    case "video":
    case "box":
    case "article":
    case "serloTable":
      return document;
    default:
      console.log(document);
      throw new Error(`Unexpected plugin: ${document.plugin}`);
  }
}
function migrateEquationsState(state) {
  try {
    return {
      plugin: "equations",
      state: {
        steps: state.steps.map((step) => {
          const { left, sign, right, transform } = step;
          return {
            left: extractSingleFormulaFromText(left),
            sign,
            right: extractSingleFormulaFromText(right),
            ...extractTransformOrExplanationFromText(transform)
          };
        })
      }
    };
  } catch (e) {
    console.log(state);
    const error = e;
    console.log("Failed to", error.message);
    return {
      plugin: "deprecated",
      state: {
        plugin: "equations",
        state
      }
    };
  }
}
function extractSingleFormulaFromText(textState) {
  const paragraphs = textState.state.filter((paragraph2) => {
    return paragraph2.type === "p" && getCleanChildren(paragraph2.children).length > 0;
  });
  if (paragraphs.length === 0)
    return "";
  if (paragraphs.length !== 1) {
    throw new Error("text has more than one paragraph");
  }
  const paragraph = paragraphs[0];
  if (paragraph.type !== "p") {
    throw new Error("text has block that is not a paragraph");
  }
  const children = getCleanChildren(paragraph.children);
  if (children.length === 0)
    return "";
  return children.map((child) => {
    if (child.type === "math") {
      return children[0].src;
    } else if (child.text) {
      return child.text;
    } else {
      throw new Error("text contains unexpected child");
    }
  }).join("");
}
function extractTransformOrExplanationFromText(textState) {
  if (textState.state.length !== 1)
    return noTransform();
  const paragraph = textState.state[0];
  if (paragraph.type !== "p")
    return noTransform();
  const cleanChildren = getCleanChildren(paragraph.children);
  if (cleanChildren.length === 1 && cleanChildren[0].type === "math") {
    const src = cleanChildren[0].src;
    if (src.startsWith("|") || src.startsWith("\\vert")) {
      return transform(src.replace(/^(\||\\vert)(\\:)*/, "").trim());
    }
    if (src.startsWith("\\left|")) {
      return transform(
        src.replace(/^\\left\|/, "").replace(/\\right\.$/, "").trim()
      );
    }
  }
  return noTransform();
  function noTransform() {
    return {
      transform: "",
      explanation: textState
    };
  }
  function transform(src) {
    return {
      transform: src,
      explanation: {
        plugin: "text"
      }
    };
  }
}
function getCleanChildren(children) {
  return children.filter((child) => {
    return Object.keys(child).length !== 0 && child["text"] !== "" && child["text"] !== " ";
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  migrateEquationsState
});
