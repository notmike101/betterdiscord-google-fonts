/**

 * @version 2.2.7
 * @source https://github.com/notmike101/betterdiscord-google-fonts
 * @website https://mikeorozco.dev
 * @author DeNial
 * @donate https://buymeacoffee.com/mikeorozcodev
 * @updateUrl https://raw.githubusercontent.com/notmike101/betterdiscord-google-fonts/release/betterdiscord-google-fonts.plugin.js
 * @authorLink https://mikeorozco.dev
 * @description Injects Google Fonts into Discord
 * @name GoogleFonts
 * @authorId 142347724392497152
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.tsx
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/SettingsPanel/styles.scss
var styles_default = `
.settings-panel .settings-panel-body {
  color: var(--text-normal);
  display: flex;
  flex-direction: column;
  position: relative;
}
.settings-panel .settings-panel-body .settings-panel-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
}
.settings-panel .settings-panel-body .settings-panel-row.border-bottom {
  padding-bottom: 5px;
  border-bottom: 1px solid var(--text-normal);
}
.settings-panel .settings-panel-body .settings-panel-row.scrollable {
  overflow-y: auto;
}
.settings-panel .settings-panel-body .settings-panel-row:last-of-type {
  margin-bottom: 0;
}
.settings-panel .settings-panel-body span {
  flex: 1;
}
.settings-panel .settings-panel-body p {
  margin: 0;
  padding: 0;
}
.settings-panel .settings-panel-body .font-list-filter {
  display: flex;
  flex: 1;
  padding: 5px;
  border-radius: 3px;
}
.settings-panel .settings-panel-body .font-list {
  height: 200px;
  width: 100%;
  background-color: var(--background-color);
}
.settings-panel .settings-panel-body .font-list .font-list-item {
  width: 100%;
  display: block;
  cursor: pointer;
  padding: 2px 0;
}`;

// src/SettingsPanel/index.tsx
var import_bdapi = require("betterdiscord/bdapi");
var SettingsPanel = (props) => {
  let fonts = props.fonts;
  const debounceTimer = import_bdapi.React.useRef(null);
  const isMounted = import_bdapi.React.useRef(false);
  const [selectedFont, setSelectedFont] = import_bdapi.React.useState((0, import_bdapi.getData)("betterdiscord-google-fonts", "selectedFont"));
  const [searchFilter, setSearchFilter] = import_bdapi.React.useState("");
  const handleFontChange = (fontName) => {
    setSelectedFont(fontName);
    if (props.fontChangeCallback) {
      props.fontChangeCallback(fontName);
    }
  };
  const updateSearchFilter = (event) => {
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setSearchFilter(event.target.value);
      debounceTimer.current = null;
    }, 150);
  };
  const mountHandler = () => {
    isMounted.current = true;
    (0, import_bdapi.injectCSS)("betterdiscord-google-fonts-settings-panel", styles_default);
  };
  const unmountHandler = () => {
    (0, import_bdapi.clearCSS)("betterdiscord-google-fonts-settings-panel", styles_default);
  };
  const handleFontPropChange = (propFonts) => {
    fonts = propFonts;
  };
  import_bdapi.React.useEffect(() => {
    if (isMounted.current === false) {
      mountHandler();
    }
    handleFontPropChange(props.fonts);
    return unmountHandler;
  }, [props.fonts]);
  return /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "settings-panel"
  }, /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "settings-panel-body"
  }, /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "settings-panel-row border-bottom"
  }, /* @__PURE__ */ import_bdapi.React.createElement("span", null, "Active Font:"), /* @__PURE__ */ import_bdapi.React.createElement("p", null, selectedFont ?? "Default")), /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "settings-panel-row"
  }, /* @__PURE__ */ import_bdapi.React.createElement("input", {
    className: "font-list-filter",
    type: "text",
    placeholder: "Search for a font...",
    onChange: updateSearchFilter
  })), /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "settings-panel-row scrollable"
  }, /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "font-list"
  }, /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "font-list-item",
    onClick: () => handleFontChange(null)
  }, "Default"), fonts.filter((font) => font.includes(searchFilter)).map((font) => /* @__PURE__ */ import_bdapi.React.createElement("div", {
    className: "font-list-item",
    key: font,
    onClick: () => handleFontChange(font)
  }, font))))));
};
var SettingsPanel_default = SettingsPanel;

// src/main.tsx
var import_bdapi3 = require("betterdiscord/bdapi");

// node_modules/betterdiscord-plugin-libs/dist/index.esm.js
var import_bdapi2 = require("betterdiscord/bdapi");
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports, module2) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports, module2) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    module2.exports = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH,
      MAX_SAFE_INTEGER,
      MAX_SAFE_COMPONENT_LENGTH
    };
  }
});
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports, module2) {
    var { MAX_SAFE_COMPONENT_LENGTH } = require_constants();
    var debug = require_debug();
    exports = module2.exports = {};
    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.t = {};
    var R = 0;
    var createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
    createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports, module2) {
    var opts = ["includePrerelease", "loose", "rtl"];
    var parseOptions = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
      o[k] = true;
      return o;
    }, {});
    module2.exports = parseOptions;
  }
});
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports, module2) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports, module2) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      inc(release, identifier) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
      }
    };
    module2.exports = SemVer;
  }
});
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports, module2) {
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports, module2) {
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});
var Easing = {
  Linear: {
    None: function(amount) {
      return amount;
    }
  },
  Quadratic: {
    In: function(amount) {
      return amount * amount;
    },
    Out: function(amount) {
      return amount * (2 - amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }
      return -0.5 * (--amount * (amount - 2) - 1);
    }
  },
  Cubic: {
    In: function(amount) {
      return amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount + 2);
    }
  },
  Quartic: {
    In: function(amount) {
      return amount * amount * amount * amount;
    },
    Out: function(amount) {
      return 1 - --amount * amount * amount * amount;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }
      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    }
  },
  Quintic: {
    In: function(amount) {
      return amount * amount * amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    }
  },
  Sinusoidal: {
    In: function(amount) {
      return 1 - Math.cos(amount * Math.PI / 2);
    },
    Out: function(amount) {
      return Math.sin(amount * Math.PI / 2);
    },
    InOut: function(amount) {
      return 0.5 * (1 - Math.cos(Math.PI * amount));
    }
  },
  Exponential: {
    In: function(amount) {
      return amount === 0 ? 0 : Math.pow(1024, amount - 1);
    },
    Out: function(amount) {
      return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    }
  },
  Circular: {
    In: function(amount) {
      return 1 - Math.sqrt(1 - amount * amount);
    },
    Out: function(amount) {
      return Math.sqrt(1 - --amount * amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    }
  },
  Elastic: {
    In: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      amount *= 2;
      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }
      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function(amount) {
      var s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: function(amount) {
      var s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: function(amount) {
      var s = 1.70158 * 1.525;
      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }
      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    }
  },
  Bounce: {
    In: function(amount) {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: function(amount) {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: function(amount) {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }
      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    }
  }
};
var now;
if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
  now = function() {
    var time = process.hrtime();
    return time[0] * 1e3 + time[1] / 1e6;
  };
} else if (typeof self !== "undefined" && self.performance !== void 0 && self.performance.now !== void 0) {
  now = self.performance.now.bind(self.performance);
} else if (Date.now !== void 0) {
  now = Date.now;
} else {
  now = function() {
    return new Date().getTime();
  };
}
var now$1 = now;
var Group = function() {
  function Group2() {
    this._tweens = {};
    this._tweensAddedDuringUpdate = {};
  }
  Group2.prototype.getAll = function() {
    var _this = this;
    return Object.keys(this._tweens).map(function(tweenId) {
      return _this._tweens[tweenId];
    });
  };
  Group2.prototype.removeAll = function() {
    this._tweens = {};
  };
  Group2.prototype.add = function(tween) {
    this._tweens[tween.getId()] = tween;
    this._tweensAddedDuringUpdate[tween.getId()] = tween;
  };
  Group2.prototype.remove = function(tween) {
    delete this._tweens[tween.getId()];
    delete this._tweensAddedDuringUpdate[tween.getId()];
  };
  Group2.prototype.update = function(time, preserve) {
    if (time === void 0) {
      time = now$1();
    }
    if (preserve === void 0) {
      preserve = false;
    }
    var tweenIds = Object.keys(this._tweens);
    if (tweenIds.length === 0) {
      return false;
    }
    while (tweenIds.length > 0) {
      this._tweensAddedDuringUpdate = {};
      for (var i = 0; i < tweenIds.length; i++) {
        var tween = this._tweens[tweenIds[i]];
        var autoStart = !preserve;
        if (tween && tween.update(time, autoStart) === false && !preserve) {
          delete this._tweens[tweenIds[i]];
        }
      }
      tweenIds = Object.keys(this._tweensAddedDuringUpdate);
    }
    return true;
  };
  return Group2;
}();
var Interpolation = {
  Linear: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;
    if (k < 0) {
      return fn(v[0], v[1], f);
    }
    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }
    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function(v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;
    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }
    return b;
  },
  CatmullRom: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;
    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }
      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }
      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }
      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function(p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function(n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function() {
      var a = [1];
      return function(n) {
        var s = 1;
        if (a[n]) {
          return a[n];
        }
        for (var i = n; i > 1; i--) {
          s *= i;
        }
        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function(p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
};
var Sequence = function() {
  function Sequence2() {
  }
  Sequence2.nextId = function() {
    return Sequence2._nextId++;
  };
  Sequence2._nextId = 0;
  return Sequence2;
}();
var mainGroup = new Group();
var Tween = function() {
  function Tween2(_object, _group) {
    if (_group === void 0) {
      _group = mainGroup;
    }
    this._object = _object;
    this._group = _group;
    this._isPaused = false;
    this._pauseStart = 0;
    this._valuesStart = {};
    this._valuesEnd = {};
    this._valuesStartRepeat = {};
    this._duration = 1e3;
    this._initialRepeat = 0;
    this._repeat = 0;
    this._yoyo = false;
    this._isPlaying = false;
    this._reversed = false;
    this._delayTime = 0;
    this._startTime = 0;
    this._easingFunction = Easing.Linear.None;
    this._interpolationFunction = Interpolation.Linear;
    this._chainedTweens = [];
    this._onStartCallbackFired = false;
    this._id = Sequence.nextId();
    this._isChainStopped = false;
    this._goToEnd = false;
  }
  Tween2.prototype.getId = function() {
    return this._id;
  };
  Tween2.prototype.isPlaying = function() {
    return this._isPlaying;
  };
  Tween2.prototype.isPaused = function() {
    return this._isPaused;
  };
  Tween2.prototype.to = function(properties, duration) {
    this._valuesEnd = Object.create(properties);
    if (duration !== void 0) {
      this._duration = duration;
    }
    return this;
  };
  Tween2.prototype.duration = function(d) {
    this._duration = d;
    return this;
  };
  Tween2.prototype.start = function(time) {
    if (this._isPlaying) {
      return this;
    }
    this._group && this._group.add(this);
    this._repeat = this._initialRepeat;
    if (this._reversed) {
      this._reversed = false;
      for (var property in this._valuesStartRepeat) {
        this._swapEndStartRepeatValues(property);
        this._valuesStart[property] = this._valuesStartRepeat[property];
      }
    }
    this._isPlaying = true;
    this._isPaused = false;
    this._onStartCallbackFired = false;
    this._isChainStopped = false;
    this._startTime = time !== void 0 ? typeof time === "string" ? now$1() + parseFloat(time) : time : now$1();
    this._startTime += this._delayTime;
    this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
    return this;
  };
  Tween2.prototype._setupProperties = function(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
    for (var property in _valuesEnd) {
      var startValue = _object[property];
      var startValueIsArray = Array.isArray(startValue);
      var propType = startValueIsArray ? "array" : typeof startValue;
      var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
      if (propType === "undefined" || propType === "function") {
        continue;
      }
      if (isInterpolationList) {
        var endValues = _valuesEnd[property];
        if (endValues.length === 0) {
          continue;
        }
        endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
        _valuesEnd[property] = [startValue].concat(endValues);
      }
      if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
        _valuesStart[property] = startValueIsArray ? [] : {};
        for (var prop in startValue) {
          _valuesStart[property][prop] = startValue[prop];
        }
        _valuesStartRepeat[property] = startValueIsArray ? [] : {};
        this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
      } else {
        if (typeof _valuesStart[property] === "undefined") {
          _valuesStart[property] = startValue;
        }
        if (!startValueIsArray) {
          _valuesStart[property] *= 1;
        }
        if (isInterpolationList) {
          _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
        } else {
          _valuesStartRepeat[property] = _valuesStart[property] || 0;
        }
      }
    }
  };
  Tween2.prototype.stop = function() {
    if (!this._isChainStopped) {
      this._isChainStopped = true;
      this.stopChainedTweens();
    }
    if (!this._isPlaying) {
      return this;
    }
    this._group && this._group.remove(this);
    this._isPlaying = false;
    this._isPaused = false;
    if (this._onStopCallback) {
      this._onStopCallback(this._object);
    }
    return this;
  };
  Tween2.prototype.end = function() {
    this._goToEnd = true;
    this.update(Infinity);
    return this;
  };
  Tween2.prototype.pause = function(time) {
    if (time === void 0) {
      time = now$1();
    }
    if (this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = true;
    this._pauseStart = time;
    this._group && this._group.remove(this);
    return this;
  };
  Tween2.prototype.resume = function(time) {
    if (time === void 0) {
      time = now$1();
    }
    if (!this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = false;
    this._startTime += time - this._pauseStart;
    this._pauseStart = 0;
    this._group && this._group.add(this);
    return this;
  };
  Tween2.prototype.stopChainedTweens = function() {
    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
      this._chainedTweens[i].stop();
    }
    return this;
  };
  Tween2.prototype.group = function(group) {
    this._group = group;
    return this;
  };
  Tween2.prototype.delay = function(amount) {
    this._delayTime = amount;
    return this;
  };
  Tween2.prototype.repeat = function(times) {
    this._initialRepeat = times;
    this._repeat = times;
    return this;
  };
  Tween2.prototype.repeatDelay = function(amount) {
    this._repeatDelayTime = amount;
    return this;
  };
  Tween2.prototype.yoyo = function(yoyo) {
    this._yoyo = yoyo;
    return this;
  };
  Tween2.prototype.easing = function(easingFunction) {
    this._easingFunction = easingFunction;
    return this;
  };
  Tween2.prototype.interpolation = function(interpolationFunction) {
    this._interpolationFunction = interpolationFunction;
    return this;
  };
  Tween2.prototype.chain = function() {
    var tweens = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      tweens[_i] = arguments[_i];
    }
    this._chainedTweens = tweens;
    return this;
  };
  Tween2.prototype.onStart = function(callback) {
    this._onStartCallback = callback;
    return this;
  };
  Tween2.prototype.onUpdate = function(callback) {
    this._onUpdateCallback = callback;
    return this;
  };
  Tween2.prototype.onRepeat = function(callback) {
    this._onRepeatCallback = callback;
    return this;
  };
  Tween2.prototype.onComplete = function(callback) {
    this._onCompleteCallback = callback;
    return this;
  };
  Tween2.prototype.onStop = function(callback) {
    this._onStopCallback = callback;
    return this;
  };
  Tween2.prototype.update = function(time, autoStart) {
    if (time === void 0) {
      time = now$1();
    }
    if (autoStart === void 0) {
      autoStart = true;
    }
    if (this._isPaused)
      return true;
    var property;
    var elapsed;
    var endTime = this._startTime + this._duration;
    if (!this._goToEnd && !this._isPlaying) {
      if (time > endTime)
        return false;
      if (autoStart)
        this.start(time);
    }
    this._goToEnd = false;
    if (time < this._startTime) {
      return true;
    }
    if (this._onStartCallbackFired === false) {
      if (this._onStartCallback) {
        this._onStartCallback(this._object);
      }
      this._onStartCallbackFired = true;
    }
    elapsed = (time - this._startTime) / this._duration;
    elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
    var value = this._easingFunction(elapsed);
    this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
    if (this._onUpdateCallback) {
      this._onUpdateCallback(this._object, elapsed);
    }
    if (elapsed === 1) {
      if (this._repeat > 0) {
        if (isFinite(this._repeat)) {
          this._repeat--;
        }
        for (property in this._valuesStartRepeat) {
          if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
          }
          if (this._yoyo) {
            this._swapEndStartRepeatValues(property);
          }
          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
        if (this._yoyo) {
          this._reversed = !this._reversed;
        }
        if (this._repeatDelayTime !== void 0) {
          this._startTime = time + this._repeatDelayTime;
        } else {
          this._startTime = time + this._delayTime;
        }
        if (this._onRepeatCallback) {
          this._onRepeatCallback(this._object);
        }
        return true;
      } else {
        if (this._onCompleteCallback) {
          this._onCompleteCallback(this._object);
        }
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          this._chainedTweens[i].start(this._startTime + this._duration);
        }
        this._isPlaying = false;
        return false;
      }
    }
    return true;
  };
  Tween2.prototype._updateProperties = function(_object, _valuesStart, _valuesEnd, value) {
    for (var property in _valuesEnd) {
      if (_valuesStart[property] === void 0) {
        continue;
      }
      var start = _valuesStart[property] || 0;
      var end = _valuesEnd[property];
      var startIsArray = Array.isArray(_object[property]);
      var endIsArray = Array.isArray(end);
      var isInterpolationList = !startIsArray && endIsArray;
      if (isInterpolationList) {
        _object[property] = this._interpolationFunction(end, value);
      } else if (typeof end === "object" && end) {
        this._updateProperties(_object[property], start, end, value);
      } else {
        end = this._handleRelativeValue(start, end);
        if (typeof end === "number") {
          _object[property] = start + (end - start) * value;
        }
      }
    }
  };
  Tween2.prototype._handleRelativeValue = function(start, end) {
    if (typeof end !== "string") {
      return end;
    }
    if (end.charAt(0) === "+" || end.charAt(0) === "-") {
      return start + parseFloat(end);
    } else {
      return parseFloat(end);
    }
  };
  Tween2.prototype._swapEndStartRepeatValues = function(property) {
    var tmp = this._valuesStartRepeat[property];
    var endValue = this._valuesEnd[property];
    if (typeof endValue === "string") {
      this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
    } else {
      this._valuesStartRepeat[property] = this._valuesEnd[property];
    }
    this._valuesEnd[property] = tmp;
  };
  return Tween2;
}();
var nextId = Sequence.nextId;
var TWEEN = mainGroup;
var getAll = TWEEN.getAll.bind(TWEEN);
var removeAll = TWEEN.removeAll.bind(TWEEN);
var add = TWEEN.add.bind(TWEEN);
var remove = TWEEN.remove.bind(TWEEN);
var update = TWEEN.update.bind(TWEEN);
var Banners = class {
  bannerContainer;
  banners;
  constructor(targetContainer) {
    this.banners = [];
    const existingBannerContainer = document.querySelector("#plugin-banner-container-c81mc1");
    if (!existingBannerContainer) {
      const bannerContainer = document.createElement("div");
      this.bannerContainer = bannerContainer;
      this.bannerContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          align-items: center;
          justify-content: center;
        `;
      this.bannerContainer.id = "plugin-banner-container-c81mc1";
      if (targetContainer) {
        targetContainer.prepend(this.bannerContainer);
      }
    } else {
      this.bannerContainer = existingBannerContainer;
    }
  }
  createBanner(content, options) {
    const banner = document.createElement("div");
    const bannerText = document.createElement("span");
    const bannerApprove = document.createElement("button");
    const bannerDismiss = document.createElement("button");
    const bannerIndex = this.banners.length;
    banner.style.cssText = `
      display: flex;
      flex: 1;
      background-color: ${options.backgroundColor ?? "var(--info-help-background)"};
      color: ${options.fontColor ?? "var(--info-help-text)"};
      padding: 6px 0;
      font-size: 12px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      margin: 0 15px;
    `;
    bannerApprove.style.cssText = `
      color: ${options.acceptButtonFontColor ?? "#ffffff"};
      background-color: ${options.acceptButtonBackgroundColor ?? "var(--button-positive-background)"};
      border: 1px solid ${options.acceptButtonBorderColor ?? "var(--button-positive-border)"};
      outline: none;
      margin: 0 15px;
    `;
    bannerDismiss.style.cssText = `
      color: ${options.dismissButtonFontColor ?? "#ffffff"};
      background-color: ${options.dismissButtonBackgroundColor ?? "var(--button-danger-background)"};
      border: 1px solid ${options.dismissButtonBorderColor ?? "var(--button-danger-border)"};
      outline: none;
    `;
    bannerApprove.textContent = options.acceptButtonString ?? "Accept";
    bannerDismiss.textContent = options.dismissButtonString ?? "Dismiss";
    bannerText.textContent = content;
    bannerApprove.addEventListener("pointerup", () => {
      this.dismissBanner(bannerIndex);
      if (options.acceptCallback) {
        options.acceptCallback();
      }
    });
    bannerDismiss.addEventListener("pointerup", () => {
      this.dismissBanner(bannerIndex);
      if (options.dismissCallback) {
        options.dismissCallback();
      }
    });
    banner.append(bannerText, bannerApprove, bannerDismiss);
    this.bannerContainer.append(banner);
    this.banners.push(banner);
    return bannerIndex;
  }
  dismissBanner(bannerIndex) {
    if (this.banners[bannerIndex]) {
      this.banners[bannerIndex].remove();
    }
  }
};
var Logger = class {
  logPrefix;
  logPrefixColor;
  logColor;
  constructor(logPrefix, logPrefixColor = "lightblue", logColor = "white") {
    this.logPrefix = logPrefix;
    this.logPrefixColor = logPrefixColor;
    this.logColor = logColor;
  }
  log(...messages) {
    console.log(`%c[${this.logPrefix}] %c${messages.join(" ")}`, `color: ${this.logPrefixColor};`, `color: ${this.logColor}`);
  }
  warn(...messages) {
    console.warn(`%c[${this.logPrefix}] %c${messages.join(" ")}`, `color: ${this.logPrefixColor};`, `color: ${this.logColor}`);
  }
  error(...messages) {
    console.error(`%c[${this.logPrefix}] %c${messages.join(" ")}`, `color: ${this.logPrefixColor};`, `color: ${this.logColor}`);
  }
  info(...messages) {
    console.info(`%c[${this.logPrefix}] %c${messages.join(" ")}`, `color: ${this.logPrefixColor};`, `color: ${this.logColor}`);
  }
};
var import_gt = __toESM(require_gt());
var Updater = class {
  updatePath;
  storagePath;
  currentVersion;
  remotePluginInfo;
  logger;
  constructor(options) {
    this.updatePath = options.updatePath;
    this.storagePath = options.storagePath;
    this.currentVersion = options.currentVersion;
    this.remotePluginInfo = {};
    this.logger = new Logger("PluginUpdater", "lightblue", "white");
  }
  async downloadPluginFile() {
    try {
      const res = await fetch(this.updatePath);
      const pluginText = await res.text();
      this.remotePluginInfo.fileName = this.updatePath.split("/").slice(-1)[0];
      this.remotePluginInfo.name = pluginText.match(/@name (.*)/)[1];
      this.remotePluginInfo.version = pluginText.match(/@version (.*)/)[1];
      this.remotePluginInfo.content = pluginText;
    } catch (err) {
      this.logger.log("Failed to download plugin file", err.message);
    }
  }
  async isUpdateAvailable() {
    try {
      if (!this.updatePath)
        throw new Error("No update path defined for this plugin");
      if (!this.currentVersion)
        throw new Error("Current version of plugin unknown");
      await this.downloadPluginFile();
      return (0, import_gt.default)(this.remotePluginInfo.version, this.currentVersion);
    } catch (err) {
      this.logger.log("Failed to check for updates", err.message);
      return false;
    }
  }
  async installUpdate() {
    try {
      const fs = __require("fs");
      if (!fs)
        throw new Error("Unable to load `fs` module");
      await new Promise((resolve, reject) => {
        fs.writeFile(`${this.storagePath}/${this.remotePluginInfo.fileName}`, this.remotePluginInfo.content, (err) => {
          if (err)
            reject(err);
          resolve(true);
        });
      });
      return true;
    } catch (err) {
      this.logger.log("Failed to install update", err.message);
      return false;
    }
  }
};
var selectedGuildStore = (0, import_bdapi2.findModuleByProps)("getLastSelectedGuildId");
var guildStore = (0, import_bdapi2.findModuleByProps)("getGuilds");
var app = (0, import_bdapi2.findModuleByProps)("app", "layers");
var DiscordModules = Object.freeze({
  selectedGuildStore,
  guildStore,
  app
});

// src/main.tsx
var Plugin = class {
  updater;
  logger;
  banners;
  fonts;
  selectedFont;
  originalFont;
  loadingFonts;
  updateBannerId;
  modules;
  async getGoogleFonts() {
    this.loadingFonts = true;
    try {
      const res = await fetch("https://cdn.jsdelivr.net/gh/notmike101/betterdiscord-google-fonts@google-fonts-host/google-fonts.json");
      const fonts = await res.json();
      this.fonts = fonts;
      this.logger.log("Loaded fonts from GitHub");
    } catch (err) {
      this.logger.error(err.message);
      this.fonts = [];
    }
    this.loadingFonts = false;
  }
  async start() {
    this.modules = {
      app: DiscordModules.app
    };
    this.logger = this.logger ?? new Logger("GoogleFonts v2.2.7");
    this.updater = this.updater ?? new Updater({
      storagePath: import_bdapi3.Plugins.folder,
      currentVersion: "2.2.7",
      updatePath: "https://raw.githubusercontent.com/notmike101/betterdiscord-google-fonts/release/betterdiscord-google-fonts.plugin.js"
    });
    this.banners = this.banners ?? new Banners(document.querySelector("." + this.modules.app.app));
    this.logger.log("Starting plugin");
    this.selectedFont = (0, import_bdapi3.getData)("betterdiscord-google-fonts", "selectedFont") ?? null;
    this.originalFont = getComputedStyle(document.documentElement).getPropertyValue("--font-primary").trim();
    this.update();
    await this.getGoogleFonts();
    this.applyFont(this.selectedFont);
  }
  stop() {
    this.applyFont(null);
    if (this.updateBannerId !== null) {
      this.banners.dismissBanner(this.updateBannerId);
    }
  }
  async update() {
    const isUpdateAvailable = await this.updater.isUpdateAvailable();
    if (isUpdateAvailable) {
      this.updateBannerId = this.banners.createBanner("Update available for GoogleFonts", {
        acceptCallback: async () => {
          const updateSuccess = await this.updater.installUpdate();
          if (updateSuccess) {
            (0, import_bdapi3.showToast)("GoogleFonts successfully updated", { type: "success" });
          } else {
            (0, import_bdapi3.showToast)("Failed to update GoogleFonts", { type: "error" });
          }
        }
      });
    }
  }
  applyFont(fontName) {
    (0, import_bdapi3.clearCSS)("betterdiscord-google-fonts-customfont");
    if (!!fontName) {
      this.logger.log(`Changing font to ${fontName}`);
      const style = `
        @import url('https://fonts.googleapis.com/css?family=${fontName}&display=swap');

        :root {
          --font-gfont: ${fontName} !important;
        }

        *:not([class*="hljs"]):not(code){
          font-family: var(--font-gfont) !important;
        }
      `;
      (0, import_bdapi3.injectCSS)("betterdiscord-google-fonts-customfont", style);
    } else {
      this.logger.log(`Reverting to original font (${this.originalFont})`);
    }
  }
  fontChangeCallback(fontName) {
    this.selectedFont = fontName;
    (0, import_bdapi3.setData)("betterdiscord-google-fonts", "selectedFont", fontName);
    this.applyFont(fontName);
  }
  getSettingsPanel() {
    if (this.loadingFonts) {
      return /* @__PURE__ */ import_bdapi3.React.createElement("div", {
        style: { color: "var(--text-normal)" }
      }, "Font list is still being built, please wait a few minutes and then open this panel again");
    } else {
      return /* @__PURE__ */ import_bdapi3.React.createElement(SettingsPanel_default, {
        fonts: this.fonts,
        fontChangeCallback: this.fontChangeCallback.bind(this)
      });
    }
  }
};
var main_default = Plugin;
