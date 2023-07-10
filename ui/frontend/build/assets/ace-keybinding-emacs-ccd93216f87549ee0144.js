(self["webpackChunkui"] = self["webpackChunkui"] || []).push([["ace-keybinding-emacs"],{

/***/ "./node_modules/ace-builds/src-noconflict/keybinding-emacs.js":
/*!********************************************************************!*\
  !*** ./node_modules/ace-builds/src-noconflict/keybinding-emacs.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
ace.define("ace/occur",["require","exports","module","ace/lib/oop","ace/search","ace/edit_session","ace/search_highlight","ace/lib/dom"], function(require, exports, module){"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var oop = require("./lib/oop");
var Search = require("./search").Search;
var EditSession = require("./edit_session").EditSession;
var SearchHighlight = require("./search_highlight").SearchHighlight;
var Occur = /** @class */ (function (_super) {
    __extends(Occur, _super);
    function Occur() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Occur.prototype.enter = function (editor, options) {
        if (!options.needle)
            return false;
        var pos = editor.getCursorPosition();
        this.displayOccurContent(editor, options);
        var translatedPos = this.originalToOccurPosition(editor.session, pos);
        editor.moveCursorToPosition(translatedPos);
        return true;
    };
    Occur.prototype.exit = function (editor, options) {
        var pos = options.translatePosition && editor.getCursorPosition();
        var translatedPos = pos && this.occurToOriginalPosition(editor.session, pos);
        this.displayOriginalContent(editor);
        if (translatedPos)
            editor.moveCursorToPosition(translatedPos);
        return true;
    };
    Occur.prototype.highlight = function (sess, regexp) {
        var hl = sess.$occurHighlight = sess.$occurHighlight || sess.addDynamicMarker(new SearchHighlight(null, "ace_occur-highlight", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
    };
    Occur.prototype.displayOccurContent = function (editor, options) {
        this.$originalSession = editor.session;
        var found = this.matchingLines(editor.session, options);
        var lines = found.map(function (foundLine) { return foundLine.content; });
        var occurSession = new EditSession(lines.join('\n'));
        occurSession.$occur = this;
        occurSession.$occurMatchingLines = found;
        editor.setSession(occurSession);
        this.$useEmacsStyleLineStart = this.$originalSession.$useEmacsStyleLineStart;
        occurSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
        this.highlight(occurSession, options.re);
        occurSession._emit('changeBackMarker');
    };
    Occur.prototype.displayOriginalContent = function (editor) {
        editor.setSession(this.$originalSession);
        this.$originalSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
    };
    Occur.prototype.originalToOccurPosition = function (session, pos) {
        var lines = session.$occurMatchingLines;
        var nullPos = { row: 0, column: 0 };
        if (!lines)
            return nullPos;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].row === pos.row)
                return { row: i, column: pos.column };
        }
        return nullPos;
    };
    Occur.prototype.occurToOriginalPosition = function (session, pos) {
        var lines = session.$occurMatchingLines;
        if (!lines || !lines[pos.row])
            return pos;
        return { row: lines[pos.row].row, column: pos.column };
    };
    Occur.prototype.matchingLines = function (session, options) {
        options = oop.mixin({}, options);
        if (!session || !options.needle)
            return [];
        var search = new Search();
        search.set(options);
        return search.findAll(session).reduce(function (lines, range) {
            var row = range.start.row;
            var last = lines[lines.length - 1];
            return last && last.row === row ?
                lines :
                lines.concat({ row: row, content: session.getLine(row) });
        }, []);
    };
    return Occur;
}(Search));
var dom = require('./lib/dom');
dom.importCssString(".ace_occur-highlight {\n\
    border-radius: 4px;\n\
    background-color: rgba(87, 255, 8, 0.25);\n\
    position: absolute;\n\
    z-index: 4;\n\
    box-sizing: border-box;\n\
    box-shadow: 0 0 4px rgb(91, 255, 50);\n\
}\n\
.ace_dark .ace_occur-highlight {\n\
    background-color: rgb(80, 140, 85);\n\
    box-shadow: 0 0 4px rgb(60, 120, 70);\n\
}\n", "incremental-occur-highlighting", false);
exports.Occur = Occur;

});

ace.define("ace/commands/occur_commands",["require","exports","module","ace/config","ace/occur","ace/keyboard/hash_handler","ace/lib/oop"], function(require, exports, module){var config = require("../config"), Occur = require("../occur").Occur;
var occurStartCommand = {
    name: "occur",
    exec: function (editor, options) {
        var alreadyInOccur = !!editor.session.$occur;
        var occurSessionActive = new Occur().enter(editor, options);
        if (occurSessionActive && !alreadyInOccur)
            OccurKeyboardHandler.installIn(editor);
    },
    readOnly: true
};
var occurCommands = [{
        name: "occurexit",
        bindKey: 'esc|Ctrl-G',
        exec: function (editor) {
            var occur = editor.session.$occur;
            if (!occur)
                return;
            occur.exit(editor, {});
            if (!editor.session.$occur)
                OccurKeyboardHandler.uninstallFrom(editor);
        },
        readOnly: true
    }, {
        name: "occuraccept",
        bindKey: 'enter',
        exec: function (editor) {
            var occur = editor.session.$occur;
            if (!occur)
                return;
            occur.exit(editor, { translatePosition: true });
            if (!editor.session.$occur)
                OccurKeyboardHandler.uninstallFrom(editor);
        },
        readOnly: true
    }];
var HashHandler = require("../keyboard/hash_handler").HashHandler;
var oop = require("../lib/oop");
function OccurKeyboardHandler() { }
oop.inherits(OccurKeyboardHandler, HashHandler);
(function () {
    this.isOccurHandler = true;
    this.attach = function (editor) {
        HashHandler.call(this, occurCommands, editor.commands.platform);
        this.$editor = editor;
    };
    var handleKeyboard$super = this.handleKeyboard;
    this.handleKeyboard = function (data, hashId, key, keyCode) {
        var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
        return (cmd && cmd.command) ? cmd : undefined;
    };
}).call(OccurKeyboardHandler.prototype);
OccurKeyboardHandler.installIn = function (editor) {
    var handler = new this();
    editor.keyBinding.addKeyboardHandler(handler);
    editor.commands.addCommands(occurCommands);
};
OccurKeyboardHandler.uninstallFrom = function (editor) {
    editor.commands.removeCommands(occurCommands);
    var handler = editor.getKeyboardHandler();
    if (handler.isOccurHandler)
        editor.keyBinding.removeKeyboardHandler(handler);
};
exports.occurStartCommand = occurStartCommand;

});

ace.define("ace/commands/incremental_search_commands",["require","exports","module","ace/config","ace/lib/oop","ace/keyboard/hash_handler","ace/commands/occur_commands"], function(require, exports, module){var config = require("../config");
var oop = require("../lib/oop");
var HashHandler = require("../keyboard/hash_handler").HashHandler;
var occurStartCommand = require("./occur_commands").occurStartCommand;
exports.iSearchStartCommands = [{
        name: "iSearch",
        bindKey: { win: "Ctrl-F", mac: "Command-F" },
        exec: function (editor, options) {
            config.loadModule(["core", "ace/incremental_search"], function (e) {
                var iSearch = e.iSearch = e.iSearch || new e.IncrementalSearch();
                iSearch.activate(editor, options.backwards);
                if (options.jumpToFirstMatch)
                    iSearch.next(options);
            });
        },
        readOnly: true
    }, {
        name: "iSearchBackwards",
        exec: function (editor, jumpToNext) { editor.execCommand('iSearch', { backwards: true }); },
        readOnly: true
    }, {
        name: "iSearchAndGo",
        bindKey: { win: "Ctrl-K", mac: "Command-G" },
        exec: function (editor, jumpToNext) { editor.execCommand('iSearch', { jumpToFirstMatch: true, useCurrentOrPrevSearch: true }); },
        readOnly: true
    }, {
        name: "iSearchBackwardsAndGo",
        bindKey: { win: "Ctrl-Shift-K", mac: "Command-Shift-G" },
        exec: function (editor) { editor.execCommand('iSearch', { jumpToFirstMatch: true, backwards: true, useCurrentOrPrevSearch: true }); },
        readOnly: true
    }];
exports.iSearchCommands = [{
        name: "restartSearch",
        bindKey: { win: "Ctrl-F", mac: "Command-F" },
        exec: function (iSearch) {
            iSearch.cancelSearch(true);
        }
    }, {
        name: "searchForward",
        bindKey: { win: "Ctrl-S|Ctrl-K", mac: "Ctrl-S|Command-G" },
        exec: function (iSearch, options) {
            options.useCurrentOrPrevSearch = true;
            iSearch.next(options);
        }
    }, {
        name: "searchBackward",
        bindKey: { win: "Ctrl-R|Ctrl-Shift-K", mac: "Ctrl-R|Command-Shift-G" },
        exec: function (iSearch, options) {
            options.useCurrentOrPrevSearch = true;
            options.backwards = true;
            iSearch.next(options);
        }
    }, {
        name: "extendSearchTerm",
        exec: function (iSearch, string) {
            iSearch.addString(string);
        }
    }, {
        name: "extendSearchTermSpace",
        bindKey: "space",
        exec: function (iSearch) { iSearch.addString(' '); }
    }, {
        name: "shrinkSearchTerm",
        bindKey: "backspace",
        exec: function (iSearch) {
            iSearch.removeChar();
        }
    }, {
        name: 'confirmSearch',
        bindKey: 'return',
        exec: function (iSearch) { iSearch.deactivate(); }
    }, {
        name: 'cancelSearch',
        bindKey: 'esc|Ctrl-G',
        exec: function (iSearch) { iSearch.deactivate(true); }
    }, {
        name: 'occurisearch',
        bindKey: 'Ctrl-O',
        exec: function (iSearch) {
            var options = oop.mixin({}, iSearch.$options);
            iSearch.deactivate();
            occurStartCommand.exec(iSearch.$editor, options);
        }
    }, {
        name: "yankNextWord",
        bindKey: "Ctrl-w",
        exec: function (iSearch) {
            var ed = iSearch.$editor, range = ed.selection.getRangeOfMovements(function (sel) { sel.moveCursorWordRight(); }), string = ed.session.getTextRange(range);
            iSearch.addString(string);
        }
    }, {
        name: "yankNextChar",
        bindKey: "Ctrl-Alt-y",
        exec: function (iSearch) {
            var ed = iSearch.$editor, range = ed.selection.getRangeOfMovements(function (sel) { sel.moveCursorRight(); }), string = ed.session.getTextRange(range);
            iSearch.addString(string);
        }
    }, {
        name: 'recenterTopBottom',
        bindKey: 'Ctrl-l',
        exec: function (iSearch) { iSearch.$editor.execCommand('recenterTopBottom'); }
    }, {
        name: 'selectAllMatches',
        bindKey: 'Ctrl-space',
        exec: function (iSearch) {
            var ed = iSearch.$editor, hl = ed.session.$isearchHighlight, ranges = hl && hl.cache ? hl.cache
                .reduce(function (ranges, ea) {
                return ranges.concat(ea ? ea : []);
            }, []) : [];
            iSearch.deactivate(false);
            ranges.forEach(ed.selection.addRange.bind(ed.selection));
        }
    }, {
        name: 'searchAsRegExp',
        bindKey: 'Alt-r',
        exec: function (iSearch) {
            iSearch.convertNeedleToRegExp();
        }
    }].map(function (cmd) {
    cmd.readOnly = true;
    cmd.isIncrementalSearchCommand = true;
    cmd.scrollIntoView = "animate-cursor";
    return cmd;
});
function IncrementalSearchKeyboardHandler(iSearch) {
    this.$iSearch = iSearch;
}
oop.inherits(IncrementalSearchKeyboardHandler, HashHandler);
(function () {
    this.attach = function (editor) {
        var iSearch = this.$iSearch;
        HashHandler.call(this, exports.iSearchCommands, editor.commands.platform);
        this.$commandExecHandler = editor.commands.on('exec', function (e) {
            if (!e.command.isIncrementalSearchCommand)
                return iSearch.deactivate();
            e.stopPropagation();
            e.preventDefault();
            var scrollTop = editor.session.getScrollTop();
            var result = e.command.exec(iSearch, e.args || {});
            editor.renderer.scrollCursorIntoView(null, 0.5);
            editor.renderer.animateScrolling(scrollTop);
            return result;
        });
    };
    this.detach = function (editor) {
        if (!this.$commandExecHandler)
            return;
        editor.commands.off('exec', this.$commandExecHandler);
        delete this.$commandExecHandler;
    };
    var handleKeyboard$super = this.handleKeyboard;
    this.handleKeyboard = function (data, hashId, key, keyCode) {
        if (((hashId === 1 /*ctrl*/ || hashId === 8 /*command*/) && key === 'v')
            || (hashId === 1 /*ctrl*/ && key === 'y'))
            return null;
        var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
        if (cmd && cmd.command) {
            return cmd;
        }
        if (hashId == -1) {
            var extendCmd = this.commands.extendSearchTerm;
            if (extendCmd) {
                return { command: extendCmd, args: key };
            }
        }
        return false;
    };
}).call(IncrementalSearchKeyboardHandler.prototype);
exports.IncrementalSearchKeyboardHandler = IncrementalSearchKeyboardHandler;

});

ace.define("ace/incremental_search",["require","exports","module","ace/range","ace/search","ace/search_highlight","ace/commands/incremental_search_commands","ace/lib/dom","ace/commands/command_manager","ace/editor","ace/config"], function(require, exports, module){"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Range = require("./range").Range;
var Search = require("./search").Search;
var SearchHighlight = require("./search_highlight").SearchHighlight;
var iSearchCommandModule = require("./commands/incremental_search_commands");
var ISearchKbd = iSearchCommandModule.IncrementalSearchKeyboardHandler;
function isRegExp(obj) {
    return obj instanceof RegExp;
}
function regExpToObject(re) {
    var string = String(re), start = string.indexOf('/'), flagStart = string.lastIndexOf('/');
    return {
        expression: string.slice(start + 1, flagStart),
        flags: string.slice(flagStart + 1)
    };
}
function stringToRegExp(string, flags) {
    try {
        return new RegExp(string, flags);
    }
    catch (e) {
        return string;
    }
}
function objectToRegExp(obj) {
    return stringToRegExp(obj.expression, obj.flags);
}
var IncrementalSearch = /** @class */ (function (_super) {
    __extends(IncrementalSearch, _super);
    function IncrementalSearch() {
        var _this = _super.call(this) || this;
        _this.$options = { wrap: false, skipCurrent: false };
        _this.$keyboardHandler = new ISearchKbd(_this);
        return _this;
    }
    IncrementalSearch.prototype.activate = function (editor, backwards) {
        this.$editor = editor;
        this.$startPos = this.$currentPos = editor.getCursorPosition();
        this.$options.needle = '';
        this.$options.backwards = backwards;
        editor.keyBinding.addKeyboardHandler(this.$keyboardHandler);
        this.$originalEditorOnPaste = editor.onPaste;
        editor.onPaste = this.onPaste.bind(this);
        this.$mousedownHandler = editor.on('mousedown', this.onMouseDown.bind(this));
        this.selectionFix(editor);
        this.statusMessage(true);
    };
    IncrementalSearch.prototype.deactivate = function (reset) {
        this.cancelSearch(reset);
        var editor = this.$editor;
        editor.keyBinding.removeKeyboardHandler(this.$keyboardHandler);
        if (this.$mousedownHandler) {
            editor.off('mousedown', this.$mousedownHandler);
            delete this.$mousedownHandler;
        }
        editor.onPaste = this.$originalEditorOnPaste;
        this.message('');
    };
    IncrementalSearch.prototype.selectionFix = function (editor) {
        if (editor.selection.isEmpty() && !editor.session.$emacsMark) {
            editor.clearSelection();
        }
    };
    IncrementalSearch.prototype.highlight = function (regexp) {
        var sess = this.$editor.session, hl = sess.$isearchHighlight = sess.$isearchHighlight || sess.addDynamicMarker(new SearchHighlight(null, "ace_isearch-result", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
    };
    IncrementalSearch.prototype.cancelSearch = function (reset) {
        var e = this.$editor;
        this.$prevNeedle = this.$options.needle;
        this.$options.needle = '';
        if (reset) {
            e.moveCursorToPosition(this.$startPos);
            this.$currentPos = this.$startPos;
        }
        else {
            e.pushEmacsMark && e.pushEmacsMark(this.$startPos, false);
        }
        this.highlight(null);
        return Range.fromPoints(this.$currentPos, this.$currentPos);
    };
    IncrementalSearch.prototype.highlightAndFindWithNeedle = function (moveToNext, needleUpdateFunc) {
        if (!this.$editor)
            return null;
        var options = this.$options;
        if (needleUpdateFunc) {
            options.needle = needleUpdateFunc.call(this, options.needle || '') || '';
        }
        if (options.needle.length === 0) {
            this.statusMessage(true);
            return this.cancelSearch(true);
        }
        options.start = this.$currentPos;
        var session = this.$editor.session, found = this.find(session), shouldSelect = this.$editor.emacsMark ?
            !!this.$editor.emacsMark() : !this.$editor.selection.isEmpty();
        if (found) {
            if (options.backwards)
                found = Range.fromPoints(found.end, found.start);
            this.$editor.selection.setRange(Range.fromPoints(shouldSelect ? this.$startPos : found.end, found.end));
            if (moveToNext)
                this.$currentPos = found.end;
            this.highlight(options.re);
        }
        this.statusMessage(found);
        return found;
    };
    IncrementalSearch.prototype.addString = function (s) {
        return this.highlightAndFindWithNeedle(false, function (needle) {
            if (!isRegExp(needle))
                return needle + s;
            var reObj = regExpToObject(needle);
            reObj.expression += s;
            return objectToRegExp(reObj);
        });
    };
    IncrementalSearch.prototype.removeChar = function (c) {
        return this.highlightAndFindWithNeedle(false, function (needle) {
            if (!isRegExp(needle))
                return needle.substring(0, needle.length - 1);
            var reObj = regExpToObject(needle);
            reObj.expression = reObj.expression.substring(0, reObj.expression.length - 1);
            return objectToRegExp(reObj);
        });
    };
    IncrementalSearch.prototype.next = function (options) {
        options = options || {};
        this.$options.backwards = !!options.backwards;
        this.$currentPos = this.$editor.getCursorPosition();
        return this.highlightAndFindWithNeedle(true, function (needle) {
            return options.useCurrentOrPrevSearch && needle.length === 0 ?
                this.$prevNeedle || '' : needle;
        });
    };
    IncrementalSearch.prototype.onMouseDown = function (evt) {
        this.deactivate();
        return true;
    };
    IncrementalSearch.prototype.onPaste = function (text) {
        this.addString(text);
    };
    IncrementalSearch.prototype.convertNeedleToRegExp = function () {
        return this.highlightAndFindWithNeedle(false, function (needle) {
            return isRegExp(needle) ? needle : stringToRegExp(needle, 'ig');
        });
    };
    IncrementalSearch.prototype.convertNeedleToString = function () {
        return this.highlightAndFindWithNeedle(false, function (needle) {
            return isRegExp(needle) ? regExpToObject(needle).expression : needle;
        });
    };
    IncrementalSearch.prototype.statusMessage = function (found) {
        var options = this.$options, msg = '';
        msg += options.backwards ? 'reverse-' : '';
        msg += 'isearch: ' + options.needle;
        msg += found ? '' : ' (not found)';
        this.message(msg);
    };
    IncrementalSearch.prototype.message = function (msg) {
        if (this.$editor.showCommandLine) {
            this.$editor.showCommandLine(msg);
            this.$editor.focus();
        }
    };
    return IncrementalSearch;
}(Search));
exports.IncrementalSearch = IncrementalSearch;
var dom = require('./lib/dom');
dom.importCssString("\n.ace_marker-layer .ace_isearch-result {\n  position: absolute;\n  z-index: 6;\n  box-sizing: border-box;\n}\ndiv.ace_isearch-result {\n  border-radius: 4px;\n  background-color: rgba(255, 200, 0, 0.5);\n  box-shadow: 0 0 4px rgb(255, 200, 0);\n}\n.ace_dark div.ace_isearch-result {\n  background-color: rgb(100, 110, 160);\n  box-shadow: 0 0 4px rgb(80, 90, 140);\n}", "incremental-search-highlighting", false);
var commands = require("./commands/command_manager");
(function () {
    this.setupIncrementalSearch = function (editor, val) {
        if (this.usesIncrementalSearch == val)
            return;
        this.usesIncrementalSearch = val;
        var iSearchCommands = iSearchCommandModule.iSearchStartCommands;
        var method = val ? 'addCommands' : 'removeCommands';
        this[method](iSearchCommands);
    };
}).call(commands.CommandManager.prototype);
var Editor = require("./editor").Editor;
require("./config").defineOptions(Editor.prototype, "editor", {
    useIncrementalSearch: {
        set: function (val) {
            this.keyBinding.$handlers.forEach(function (handler) {
                if (handler.setupIncrementalSearch) {
                    handler.setupIncrementalSearch(this, val);
                }
            });
            this._emit('incrementalSearchSettingChanged', { isEnabled: val });
        }
    }
});

});

ace.define("ace/keyboard/emacs",["require","exports","module","ace/lib/dom","ace/incremental_search","ace/commands/incremental_search_commands","ace/keyboard/hash_handler","ace/lib/keys"], function(require, exports, module){"use strict";
var dom = require("../lib/dom");
require("../incremental_search");
var iSearchCommandModule = require("../commands/incremental_search_commands");
var HashHandler = require("./hash_handler").HashHandler;
exports.handler = new HashHandler();
exports.handler.isEmacs = true;
exports.handler.$id = "ace/keyboard/emacs";
dom.importCssString("\n.emacs-mode .ace_cursor{\n    border: 1px rgba(50,250,50,0.8) solid!important;\n    box-sizing: border-box!important;\n    background-color: rgba(0,250,0,0.9);\n    opacity: 0.5;\n}\n.emacs-mode .ace_hidden-cursors .ace_cursor{\n    opacity: 1;\n    background-color: transparent;\n}\n.emacs-mode .ace_overwrite-cursors .ace_cursor {\n    opacity: 1;\n    background-color: transparent;\n    border-width: 0 0 2px 2px !important;\n}\n.emacs-mode .ace_text-layer {\n    z-index: 4\n}\n.emacs-mode .ace_cursor-layer {\n    z-index: 2\n}", 'emacsMode');
var $formerLongWords;
var $formerLineStart;
exports.handler.attach = function (editor) {
    $formerLongWords = editor.session.$selectLongWords;
    editor.session.$selectLongWords = true;
    $formerLineStart = editor.session.$useEmacsStyleLineStart;
    editor.session.$useEmacsStyleLineStart = true;
    editor.session.$emacsMark = null; // the active mark
    editor.session.$emacsMarkRing = editor.session.$emacsMarkRing || [];
    editor.emacsMark = function () {
        return this.session.$emacsMark;
    };
    editor.setEmacsMark = function (p) {
        this.session.$emacsMark = p;
    };
    editor.pushEmacsMark = function (p, activate) {
        var prevMark = this.session.$emacsMark;
        if (prevMark)
            this.session.$emacsMarkRing.push(prevMark);
        if (!p || activate)
            this.setEmacsMark(p);
        else
            this.session.$emacsMarkRing.push(p);
    };
    editor.popEmacsMark = function () {
        var mark = this.emacsMark();
        if (mark) {
            this.setEmacsMark(null);
            return mark;
        }
        return this.session.$emacsMarkRing.pop();
    };
    editor.getLastEmacsMark = function (p) {
        return this.session.$emacsMark || this.session.$emacsMarkRing.slice(-1)[0];
    };
    editor.emacsMarkForSelection = function (replacement) {
        var sel = this.selection, multiRangeLength = this.multiSelect ?
            this.multiSelect.getAllRanges().length : 1, selIndex = sel.index || 0, markRing = this.session.$emacsMarkRing, markIndex = markRing.length - (multiRangeLength - selIndex), lastMark = markRing[markIndex] || sel.anchor;
        if (replacement) {
            markRing.splice(markIndex, 1, "row" in replacement && "column" in replacement ?
                replacement : undefined);
        }
        return lastMark;
    };
    editor.on("click", $resetMarkMode);
    editor.on("changeSession", $kbSessionChange);
    editor.renderer.$blockCursor = true;
    editor.setStyle("emacs-mode");
    editor.commands.addCommands(commands);
    exports.handler.platform = editor.commands.platform;
    editor.$emacsModeHandler = this;
    editor.on('copy', this.onCopy);
    editor.on('paste', this.onPaste);
};
exports.handler.detach = function (editor) {
    editor.renderer.$blockCursor = false;
    editor.session.$selectLongWords = $formerLongWords;
    editor.session.$useEmacsStyleLineStart = $formerLineStart;
    editor.off("click", $resetMarkMode);
    editor.off("changeSession", $kbSessionChange);
    editor.unsetStyle("emacs-mode");
    editor.commands.removeCommands(commands);
    editor.off('copy', this.onCopy);
    editor.off('paste', this.onPaste);
    editor.$emacsModeHandler = null;
};
var $kbSessionChange = function (e) {
    if (e.oldSession) {
        e.oldSession.$selectLongWords = $formerLongWords;
        e.oldSession.$useEmacsStyleLineStart = $formerLineStart;
    }
    $formerLongWords = e.session.$selectLongWords;
    e.session.$selectLongWords = true;
    $formerLineStart = e.session.$useEmacsStyleLineStart;
    e.session.$useEmacsStyleLineStart = true;
    if (!e.session.hasOwnProperty('$emacsMark'))
        e.session.$emacsMark = null;
    if (!e.session.hasOwnProperty('$emacsMarkRing'))
        e.session.$emacsMarkRing = [];
};
var $resetMarkMode = function (e) {
    e.editor.session.$emacsMark = null;
};
var keys = require("../lib/keys").KEY_MODS;
var eMods = { C: "ctrl", S: "shift", M: "alt", CMD: "command" };
var combinations = ["C-S-M-CMD",
    "S-M-CMD", "C-M-CMD", "C-S-CMD", "C-S-M",
    "M-CMD", "S-CMD", "S-M", "C-CMD", "C-M", "C-S",
    "CMD", "M", "S", "C"];
combinations.forEach(function (c) {
    var hashId = 0;
    c.split("-").forEach(function (c) {
        hashId = hashId | keys[eMods[c]];
    });
    eMods[hashId] = c.toLowerCase() + "-";
});
exports.handler.onCopy = function (e, editor) {
    if (editor.$handlesEmacsOnCopy)
        return;
    editor.$handlesEmacsOnCopy = true;
    exports.handler.commands.killRingSave.exec(editor);
    editor.$handlesEmacsOnCopy = false;
};
exports.handler.onPaste = function (e, editor) {
    editor.pushEmacsMark(editor.getCursorPosition());
};
exports.handler.bindKey = function (key, command) {
    if (typeof key == "object")
        key = key[this.platform];
    if (!key)
        return;
    var ckb = this.commandKeyBinding;
    key.split("|").forEach(function (keyPart) {
        keyPart = keyPart.toLowerCase();
        ckb[keyPart] = command;
        var keyParts = keyPart.split(" ").slice(0, -1);
        keyParts.reduce(function (keyMapKeys, keyPart, i) {
            var prefix = keyMapKeys[i - 1] ? keyMapKeys[i - 1] + ' ' : '';
            return keyMapKeys.concat([prefix + keyPart]);
        }, []).forEach(function (keyPart) {
            if (!ckb[keyPart])
                ckb[keyPart] = "null";
        });
    }, this);
};
exports.handler.getStatusText = function (editor, data) {
    var str = "";
    if (data.count)
        str += data.count;
    if (data.keyChain)
        str += " " + data.keyChain;
    return str;
};
exports.handler.handleKeyboard = function (data, hashId, key, keyCode) {
    if (keyCode === -1)
        return undefined;
    var editor = data.editor;
    editor._signal("changeStatus");
    if (hashId == -1) {
        editor.pushEmacsMark();
        if (data.count) {
            var str = new Array(data.count + 1).join(key);
            data.count = null;
            return { command: "insertstring", args: str };
        }
    }
    var modifier = eMods[hashId];
    if (modifier == "c-" || data.count) {
        var count = parseInt(key[key.length - 1]);
        if (typeof count === 'number' && !isNaN(count)) {
            data.count = Math.max(data.count, 0) || 0;
            data.count = 10 * data.count + count;
            return { command: "null" };
        }
    }
    if (modifier)
        key = modifier + key;
    if (data.keyChain)
        key = data.keyChain += " " + key;
    var command = this.commandKeyBinding[key];
    data.keyChain = command == "null" ? key : "";
    if (!command)
        return undefined;
    if (command === "null")
        return { command: "null" };
    if (command === "universalArgument") {
        data.count = -4;
        return { command: "null" };
    }
    var args;
    if (typeof command !== "string") {
        args = command.args;
        if (command.command)
            command = command.command;
        if (command === "goorselect") {
            command = editor.emacsMark() ? args[1] : args[0];
            args = null;
        }
    }
    if (typeof command === "string") {
        if (command === "insertstring" ||
            command === "splitline" ||
            command === "togglecomment") {
            editor.pushEmacsMark();
        }
        command = this.commands[command] || editor.commands.commands[command];
        if (!command)
            return undefined;
    }
    if (!command.readOnly && !command.isYank)
        data.lastCommand = null;
    if (!command.readOnly && editor.emacsMark())
        editor.setEmacsMark(null);
    if (data.count) {
        var count = data.count;
        data.count = 0;
        if (!command || !command.handlesCount) {
            return {
                args: args,
                command: {
                    exec: function (editor, args) {
                        for (var i = 0; i < count; i++)
                            command.exec(editor, args);
                    },
                    multiSelectAction: command.multiSelectAction
                }
            };
        }
        else {
            if (!args)
                args = {};
            if (typeof args === 'object')
                args.count = count;
        }
    }
    return { command: command, args: args };
};
exports.emacsKeys = {
    "Up|C-p": { command: "goorselect", args: ["golineup", "selectup"] },
    "Down|C-n": { command: "goorselect", args: ["golinedown", "selectdown"] },
    "Left|C-b": { command: "goorselect", args: ["gotoleft", "selectleft"] },
    "Right|C-f": { command: "goorselect", args: ["gotoright", "selectright"] },
    "C-Left|M-b": { command: "goorselect", args: ["gotowordleft", "selectwordleft"] },
    "C-Right|M-f": { command: "goorselect", args: ["gotowordright", "selectwordright"] },
    "Home|C-a": { command: "goorselect", args: ["gotolinestart", "selecttolinestart"] },
    "End|C-e": { command: "goorselect", args: ["gotolineend", "selecttolineend"] },
    "C-Home|S-M-,": { command: "goorselect", args: ["gotostart", "selecttostart"] },
    "C-End|S-M-.": { command: "goorselect", args: ["gotoend", "selecttoend"] },
    "S-Up|S-C-p": "selectup",
    "S-Down|S-C-n": "selectdown",
    "S-Left|S-C-b": "selectleft",
    "S-Right|S-C-f": "selectright",
    "S-C-Left|S-M-b": "selectwordleft",
    "S-C-Right|S-M-f": "selectwordright",
    "S-Home|S-C-a": "selecttolinestart",
    "S-End|S-C-e": "selecttolineend",
    "S-C-Home": "selecttostart",
    "S-C-End": "selecttoend",
    "C-l": "recenterTopBottom",
    "M-s": "centerselection",
    "M-g": "gotoline",
    "C-x C-p": "selectall",
    "C-Down": { command: "goorselect", args: ["gotopagedown", "selectpagedown"] },
    "C-Up": { command: "goorselect", args: ["gotopageup", "selectpageup"] },
    "PageDown|C-v": { command: "goorselect", args: ["gotopagedown", "selectpagedown"] },
    "PageUp|M-v": { command: "goorselect", args: ["gotopageup", "selectpageup"] },
    "S-C-Down": "selectpagedown",
    "S-C-Up": "selectpageup",
    "C-s": "iSearch",
    "C-r": "iSearchBackwards",
    "M-C-s": "findnext",
    "M-C-r": "findprevious",
    "S-M-5": "replace",
    "Backspace": "backspace",
    "Delete|C-d": "del",
    "Return|C-m": { command: "insertstring", args: "\n" },
    "C-o": "splitline",
    "M-d|C-Delete": { command: "killWord", args: "right" },
    "C-Backspace|M-Backspace|M-Delete": { command: "killWord", args: "left" },
    "C-k": "killLine",
    "C-y|S-Delete": "yank",
    "M-y": "yankRotate",
    "C-g": "keyboardQuit",
    "C-w|C-S-W": "killRegion",
    "M-w": "killRingSave",
    "C-Space": "setMark",
    "C-x C-x": "exchangePointAndMark",
    "C-t": "transposeletters",
    "M-u": "touppercase",
    "M-l": "tolowercase",
    "M-/": "autocomplete",
    "C-u": "universalArgument",
    "M-;": "togglecomment",
    "C-/|C-x u|S-C--|C-z": "undo",
    "S-C-/|S-C-x u|C--|S-C-z": "redo",
    "C-x r": "selectRectangularRegion",
    "M-x": { command: "focusCommandLine", args: "M-x " }
};
exports.handler.bindKeys(exports.emacsKeys);
exports.handler.addCommands({
    recenterTopBottom: function (editor) {
        var renderer = editor.renderer;
        var pos = renderer.$cursorLayer.getPixelPosition();
        var h = renderer.$size.scrollerHeight - renderer.lineHeight;
        var scrollTop = renderer.scrollTop;
        if (Math.abs(pos.top - scrollTop) < 2) {
            scrollTop = pos.top - h;
        }
        else if (Math.abs(pos.top - scrollTop - h * 0.5) < 2) {
            scrollTop = pos.top;
        }
        else {
            scrollTop = pos.top - h * 0.5;
        }
        editor.session.setScrollTop(scrollTop);
    },
    selectRectangularRegion: function (editor) {
        editor.multiSelect.toggleBlockSelection();
    },
    setMark: {
        exec: function (editor, args) {
            if (args && args.count) {
                if (editor.inMultiSelectMode)
                    editor.forEachSelection(moveToMark);
                else
                    moveToMark();
                moveToMark();
                return;
            }
            var mark = editor.emacsMark(), ranges = editor.selection.getAllRanges(), rangePositions = ranges.map(function (r) { return { row: r.start.row, column: r.start.column }; }), transientMarkModeActive = true, hasNoSelection = ranges.every(function (range) { return range.isEmpty(); });
            if (transientMarkModeActive && (mark || !hasNoSelection)) {
                if (editor.inMultiSelectMode)
                    editor.forEachSelection({ exec: editor.clearSelection.bind(editor) });
                else
                    editor.clearSelection();
                if (mark)
                    editor.pushEmacsMark(null);
                return;
            }
            if (!mark) {
                rangePositions.forEach(function (pos) { editor.pushEmacsMark(pos); });
                editor.setEmacsMark(rangePositions[rangePositions.length - 1]);
                return;
            }
            function moveToMark() {
                var mark = editor.popEmacsMark();
                mark && editor.moveCursorToPosition(mark);
            }
        },
        readOnly: true,
        handlesCount: true
    },
    exchangePointAndMark: {
        exec: function exchangePointAndMark$exec(editor, args) {
            var sel = editor.selection;
            if (!args.count && !sel.isEmpty()) { // just invert selection
                sel.setSelectionRange(sel.getRange(), !sel.isBackwards());
                return;
            }
            if (args.count) { // replace mark and point
                var pos = { row: sel.lead.row, column: sel.lead.column };
                sel.clearSelection();
                sel.moveCursorToPosition(editor.emacsMarkForSelection(pos));
            }
            else { // create selection to last mark
                sel.selectToPosition(editor.emacsMarkForSelection());
            }
        },
        readOnly: true,
        handlesCount: true,
        multiSelectAction: "forEach"
    },
    killWord: {
        exec: function (editor, dir) {
            editor.clearSelection();
            if (dir == "left")
                editor.selection.selectWordLeft();
            else
                editor.selection.selectWordRight();
            var range = editor.getSelectionRange();
            var text = editor.session.getTextRange(range);
            exports.killRing.add(text);
            editor.session.remove(range);
            editor.clearSelection();
        },
        multiSelectAction: "forEach"
    },
    killLine: function (editor) {
        editor.pushEmacsMark(null);
        editor.clearSelection();
        var range = editor.getSelectionRange();
        var line = editor.session.getLine(range.start.row);
        range.end.column = line.length;
        line = line.substr(range.start.column);
        var foldLine = editor.session.getFoldLine(range.start.row);
        if (foldLine && range.end.row != foldLine.end.row) {
            range.end.row = foldLine.end.row;
            line = "x";
        }
        if (/^\s*$/.test(line)) {
            range.end.row++;
            line = editor.session.getLine(range.end.row);
            range.end.column = /^\s*$/.test(line) ? line.length : 0;
        }
        var text = editor.session.getTextRange(range);
        if (editor.prevOp.command == this)
            exports.killRing.append(text);
        else
            exports.killRing.add(text);
        editor.session.remove(range);
        editor.clearSelection();
    },
    yank: function (editor) {
        editor.onPaste(exports.killRing.get() || '');
        editor.keyBinding.$data.lastCommand = "yank";
    },
    yankRotate: function (editor) {
        if (editor.keyBinding.$data.lastCommand != "yank")
            return;
        editor.undo();
        editor.session.$emacsMarkRing.pop(); // also undo recording mark
        editor.onPaste(exports.killRing.rotate());
        editor.keyBinding.$data.lastCommand = "yank";
    },
    killRegion: {
        exec: function (editor) {
            exports.killRing.add(editor.getCopyText());
            editor.commands.byName.cut.exec(editor);
            editor.setEmacsMark(null);
        },
        readOnly: true,
        multiSelectAction: "forEach"
    },
    killRingSave: {
        exec: function (editor) {
            editor.$handlesEmacsOnCopy = true;
            var marks = editor.session.$emacsMarkRing.slice(), deselectedMarks = [];
            exports.killRing.add(editor.getCopyText());
            setTimeout(function () {
                function deselect() {
                    var sel = editor.selection, range = sel.getRange(), pos = sel.isBackwards() ? range.end : range.start;
                    deselectedMarks.push({ row: pos.row, column: pos.column });
                    sel.clearSelection();
                }
                editor.$handlesEmacsOnCopy = false;
                if (editor.inMultiSelectMode)
                    editor.forEachSelection({ exec: deselect });
                else
                    deselect();
                editor.setEmacsMark(null);
                editor.session.$emacsMarkRing = marks.concat(deselectedMarks.reverse());
            }, 0);
        },
        readOnly: true
    },
    keyboardQuit: function (editor) {
        editor.selection.clearSelection();
        editor.setEmacsMark(null);
        editor.keyBinding.$data.count = null;
    },
    focusCommandLine: function (editor, arg) {
        if (editor.showCommandLine)
            editor.showCommandLine(arg);
    }
});
exports.handler.addCommands(iSearchCommandModule.iSearchStartCommands);
var commands = exports.handler.commands;
commands.yank.isYank = true;
commands.yankRotate.isYank = true;
exports.killRing = {
    $data: [],
    add: function (str) {
        str && this.$data.push(str);
        if (this.$data.length > 30)
            this.$data.shift();
    },
    append: function (str) {
        var idx = this.$data.length - 1;
        var text = this.$data[idx] || "";
        if (str)
            text += str;
        if (text)
            this.$data[idx] = text;
    },
    get: function (n) {
        n = n || 1;
        return this.$data.slice(this.$data.length - n, this.$data.length).reverse().join('\n');
    },
    pop: function () {
        if (this.$data.length > 1)
            this.$data.pop();
        return this.get();
    },
    rotate: function () {
        this.$data.unshift(this.$data.pop());
        return this.get();
    }
};

});                (function() {
                    ace.require(["ace/keyboard/emacs"], function(m) {
                        if ( true && module) {
                            module.exports = m;
                        }
                    });
                })();
            

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNlLWtleWJpbmRpbmctZW1hY3MtY2NkOTMyMTZmODc1NDllZTAxNDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsNktBQTZLO0FBQzdLO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCLHNDQUFzQyxrQkFBa0I7QUFDdkYsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsMkJBQTJCO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix5Q0FBeUM7QUFDeEUsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwyQ0FBMkM7QUFDM0MsdUJBQXVCO0FBQ3ZCLDZDQUE2QztBQUM3Qyx1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLDJCQUEyQjtBQUMzQix5Q0FBeUM7QUFDekMsQ0FBQztBQUNELGdDQUFnQztBQUNoQyx1Q0FBdUM7QUFDdkMseUNBQXlDO0FBQ3pDLENBQUM7QUFDRDs7QUFFQSxDQUFDOztBQUVELCtL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDhEQUE4RCx1QkFBdUIsZUFBZSwyQkFBMkIsR0FBRywwQkFBMEIsdUJBQXVCLDZDQUE2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QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsa0NBQWtDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxrQkFBa0I7QUFDbkI7QUFDQSw0QkFBNEIsS0FBdUQ7QUFDbkY7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91aS8uL25vZGVfbW9kdWxlcy9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2tleWJpbmRpbmctZW1hY3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYWNlLmRlZmluZShcImFjZS9vY2N1clwiLFtcInJlcXVpcmVcIixcImV4cG9ydHNcIixcIm1vZHVsZVwiLFwiYWNlL2xpYi9vb3BcIixcImFjZS9zZWFyY2hcIixcImFjZS9lZGl0X3Nlc3Npb25cIixcImFjZS9zZWFyY2hfaGlnaGxpZ2h0XCIsXCJhY2UvbGliL2RvbVwiXSwgZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKXtcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgb29wID0gcmVxdWlyZShcIi4vbGliL29vcFwiKTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIikuU2VhcmNoO1xudmFyIEVkaXRTZXNzaW9uID0gcmVxdWlyZShcIi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xudmFyIFNlYXJjaEhpZ2hsaWdodCA9IHJlcXVpcmUoXCIuL3NlYXJjaF9oaWdobGlnaHRcIikuU2VhcmNoSGlnaGxpZ2h0O1xudmFyIE9jY3VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPY2N1ciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPY2N1cigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBPY2N1ci5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5uZWVkbGUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwb3MgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5T2NjdXJDb250ZW50KGVkaXRvciwgb3B0aW9ucyk7XG4gICAgICAgIHZhciB0cmFuc2xhdGVkUG9zID0gdGhpcy5vcmlnaW5hbFRvT2NjdXJQb3NpdGlvbihlZGl0b3Iuc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgZWRpdG9yLm1vdmVDdXJzb3JUb1Bvc2l0aW9uKHRyYW5zbGF0ZWRQb3MpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIE9jY3VyLnByb3RvdHlwZS5leGl0ID0gZnVuY3Rpb24gKGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgcG9zID0gb3B0aW9ucy50cmFuc2xhdGVQb3NpdGlvbiAmJiBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZWRQb3MgPSBwb3MgJiYgdGhpcy5vY2N1clRvT3JpZ2luYWxQb3NpdGlvbihlZGl0b3Iuc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5T3JpZ2luYWxDb250ZW50KGVkaXRvcik7XG4gICAgICAgIGlmICh0cmFuc2xhdGVkUG9zKVxuICAgICAgICAgICAgZWRpdG9yLm1vdmVDdXJzb3JUb1Bvc2l0aW9uKHRyYW5zbGF0ZWRQb3MpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIE9jY3VyLnByb3RvdHlwZS5oaWdobGlnaHQgPSBmdW5jdGlvbiAoc2VzcywgcmVnZXhwKSB7XG4gICAgICAgIHZhciBobCA9IHNlc3MuJG9jY3VySGlnaGxpZ2h0ID0gc2Vzcy4kb2NjdXJIaWdobGlnaHQgfHwgc2Vzcy5hZGREeW5hbWljTWFya2VyKG5ldyBTZWFyY2hIaWdobGlnaHQobnVsbCwgXCJhY2Vfb2NjdXItaGlnaGxpZ2h0XCIsIFwidGV4dFwiKSk7XG4gICAgICAgIGhsLnNldFJlZ2V4cChyZWdleHApO1xuICAgICAgICBzZXNzLl9lbWl0KFwiY2hhbmdlQmFja01hcmtlclwiKTsgLy8gZm9yY2UgaGlnaGxpZ2h0IGxheWVyIHJlZHJhd1xuICAgIH07XG4gICAgT2NjdXIucHJvdG90eXBlLmRpc3BsYXlPY2N1ckNvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuJG9yaWdpbmFsU2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgICAgICB2YXIgZm91bmQgPSB0aGlzLm1hdGNoaW5nTGluZXMoZWRpdG9yLnNlc3Npb24sIG9wdGlvbnMpO1xuICAgICAgICB2YXIgbGluZXMgPSBmb3VuZC5tYXAoZnVuY3Rpb24gKGZvdW5kTGluZSkgeyByZXR1cm4gZm91bmRMaW5lLmNvbnRlbnQ7IH0pO1xuICAgICAgICB2YXIgb2NjdXJTZXNzaW9uID0gbmV3IEVkaXRTZXNzaW9uKGxpbmVzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgb2NjdXJTZXNzaW9uLiRvY2N1ciA9IHRoaXM7XG4gICAgICAgIG9jY3VyU2Vzc2lvbi4kb2NjdXJNYXRjaGluZ0xpbmVzID0gZm91bmQ7XG4gICAgICAgIGVkaXRvci5zZXRTZXNzaW9uKG9jY3VyU2Vzc2lvbik7XG4gICAgICAgIHRoaXMuJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0aGlzLiRvcmlnaW5hbFNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgICAgIG9jY3VyU2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9IHRoaXMuJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KG9jY3VyU2Vzc2lvbiwgb3B0aW9ucy5yZSk7XG4gICAgICAgIG9jY3VyU2Vzc2lvbi5fZW1pdCgnY2hhbmdlQmFja01hcmtlcicpO1xuICAgIH07XG4gICAgT2NjdXIucHJvdG90eXBlLmRpc3BsYXlPcmlnaW5hbENvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZXRTZXNzaW9uKHRoaXMuJG9yaWdpbmFsU2Vzc2lvbik7XG4gICAgICAgIHRoaXMuJG9yaWdpbmFsU2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9IHRoaXMuJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgfTtcbiAgICBPY2N1ci5wcm90b3R5cGUub3JpZ2luYWxUb09jY3VyUG9zaXRpb24gPSBmdW5jdGlvbiAoc2Vzc2lvbiwgcG9zKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHNlc3Npb24uJG9jY3VyTWF0Y2hpbmdMaW5lcztcbiAgICAgICAgdmFyIG51bGxQb3MgPSB7IHJvdzogMCwgY29sdW1uOiAwIH07XG4gICAgICAgIGlmICghbGluZXMpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFBvcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxpbmVzW2ldLnJvdyA9PT0gcG9zLnJvdylcbiAgICAgICAgICAgICAgICByZXR1cm4geyByb3c6IGksIGNvbHVtbjogcG9zLmNvbHVtbiB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsUG9zO1xuICAgIH07XG4gICAgT2NjdXIucHJvdG90eXBlLm9jY3VyVG9PcmlnaW5hbFBvc2l0aW9uID0gZnVuY3Rpb24gKHNlc3Npb24sIHBvcykge1xuICAgICAgICB2YXIgbGluZXMgPSBzZXNzaW9uLiRvY2N1ck1hdGNoaW5nTGluZXM7XG4gICAgICAgIGlmICghbGluZXMgfHwgIWxpbmVzW3Bvcy5yb3ddKVxuICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgcmV0dXJuIHsgcm93OiBsaW5lc1twb3Mucm93XS5yb3csIGNvbHVtbjogcG9zLmNvbHVtbiB9O1xuICAgIH07XG4gICAgT2NjdXIucHJvdG90eXBlLm1hdGNoaW5nTGluZXMgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb29wLm1peGluKHt9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCFzZXNzaW9uIHx8ICFvcHRpb25zLm5lZWRsZSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IG5ldyBTZWFyY2goKTtcbiAgICAgICAgc2VhcmNoLnNldChvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHNlYXJjaC5maW5kQWxsKHNlc3Npb24pLnJlZHVjZShmdW5jdGlvbiAobGluZXMsIHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gcmFuZ2Uuc3RhcnQucm93O1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBsaW5lc1tsaW5lcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHJldHVybiBsYXN0ICYmIGxhc3Qucm93ID09PSByb3cgP1xuICAgICAgICAgICAgICAgIGxpbmVzIDpcbiAgICAgICAgICAgICAgICBsaW5lcy5jb25jYXQoeyByb3c6IHJvdywgY29udGVudDogc2Vzc2lvbi5nZXRMaW5lKHJvdykgfSk7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9O1xuICAgIHJldHVybiBPY2N1cjtcbn0oU2VhcmNoKSk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi9saWIvZG9tJyk7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKFwiLmFjZV9vY2N1ci1oaWdobGlnaHQge1xcblxcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcblxcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4NywgMjU1LCA4LCAwLjI1KTtcXG5cXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXFxuICAgIHotaW5kZXg6IDQ7XFxuXFxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoOTEsIDI1NSwgNTApO1xcblxcXG59XFxuXFxcbi5hY2VfZGFyayAuYWNlX29jY3VyLWhpZ2hsaWdodCB7XFxuXFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODAsIDE0MCwgODUpO1xcblxcXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoNjAsIDEyMCwgNzApO1xcblxcXG59XFxuXCIsIFwiaW5jcmVtZW50YWwtb2NjdXItaGlnaGxpZ2h0aW5nXCIsIGZhbHNlKTtcbmV4cG9ydHMuT2NjdXIgPSBPY2N1cjtcblxufSk7XG5cbmFjZS5kZWZpbmUoXCJhY2UvY29tbWFuZHMvb2NjdXJfY29tbWFuZHNcIixbXCJyZXF1aXJlXCIsXCJleHBvcnRzXCIsXCJtb2R1bGVcIixcImFjZS9jb25maWdcIixcImFjZS9vY2N1clwiLFwiYWNlL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiLFwiYWNlL2xpYi9vb3BcIl0sIGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSl7dmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIiksIE9jY3VyID0gcmVxdWlyZShcIi4uL29jY3VyXCIpLk9jY3VyO1xudmFyIG9jY3VyU3RhcnRDb21tYW5kID0ge1xuICAgIG5hbWU6IFwib2NjdXJcIixcbiAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBhbHJlYWR5SW5PY2N1ciA9ICEhZWRpdG9yLnNlc3Npb24uJG9jY3VyO1xuICAgICAgICB2YXIgb2NjdXJTZXNzaW9uQWN0aXZlID0gbmV3IE9jY3VyKCkuZW50ZXIoZWRpdG9yLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKG9jY3VyU2Vzc2lvbkFjdGl2ZSAmJiAhYWxyZWFkeUluT2NjdXIpXG4gICAgICAgICAgICBPY2N1cktleWJvYXJkSGFuZGxlci5pbnN0YWxsSW4oZWRpdG9yKTtcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB0cnVlXG59O1xudmFyIG9jY3VyQ29tbWFuZHMgPSBbe1xuICAgICAgICBuYW1lOiBcIm9jY3VyZXhpdFwiLFxuICAgICAgICBiaW5kS2V5OiAnZXNjfEN0cmwtRycsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgICAgIHZhciBvY2N1ciA9IGVkaXRvci5zZXNzaW9uLiRvY2N1cjtcbiAgICAgICAgICAgIGlmICghb2NjdXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgb2NjdXIuZXhpdChlZGl0b3IsIHt9KTtcbiAgICAgICAgICAgIGlmICghZWRpdG9yLnNlc3Npb24uJG9jY3VyKVxuICAgICAgICAgICAgICAgIE9jY3VyS2V5Ym9hcmRIYW5kbGVyLnVuaW5zdGFsbEZyb20oZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwib2NjdXJhY2NlcHRcIixcbiAgICAgICAgYmluZEtleTogJ2VudGVyJyxcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICAgICAgdmFyIG9jY3VyID0gZWRpdG9yLnNlc3Npb24uJG9jY3VyO1xuICAgICAgICAgICAgaWYgKCFvY2N1cilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBvY2N1ci5leGl0KGVkaXRvciwgeyB0cmFuc2xhdGVQb3NpdGlvbjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGlmICghZWRpdG9yLnNlc3Npb24uJG9jY3VyKVxuICAgICAgICAgICAgICAgIE9jY3VyS2V5Ym9hcmRIYW5kbGVyLnVuaW5zdGFsbEZyb20oZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICB9XTtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5mdW5jdGlvbiBPY2N1cktleWJvYXJkSGFuZGxlcigpIHsgfVxub29wLmluaGVyaXRzKE9jY3VyS2V5Ym9hcmRIYW5kbGVyLCBIYXNoSGFuZGxlcik7XG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNPY2N1ckhhbmRsZXIgPSB0cnVlO1xuICAgIHRoaXMuYXR0YWNoID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBIYXNoSGFuZGxlci5jYWxsKHRoaXMsIG9jY3VyQ29tbWFuZHMsIGVkaXRvci5jb21tYW5kcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuJGVkaXRvciA9IGVkaXRvcjtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVLZXlib2FyZCRzdXBlciA9IHRoaXMuaGFuZGxlS2V5Ym9hcmQ7XG4gICAgdGhpcy5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uIChkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSkge1xuICAgICAgICB2YXIgY21kID0gaGFuZGxlS2V5Ym9hcmQkc3VwZXIuY2FsbCh0aGlzLCBkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSk7XG4gICAgICAgIHJldHVybiAoY21kICYmIGNtZC5jb21tYW5kKSA/IGNtZCA6IHVuZGVmaW5lZDtcbiAgICB9O1xufSkuY2FsbChPY2N1cktleWJvYXJkSGFuZGxlci5wcm90b3R5cGUpO1xuT2NjdXJLZXlib2FyZEhhbmRsZXIuaW5zdGFsbEluID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgIHZhciBoYW5kbGVyID0gbmV3IHRoaXMoKTtcbiAgICBlZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgZWRpdG9yLmNvbW1hbmRzLmFkZENvbW1hbmRzKG9jY3VyQ29tbWFuZHMpO1xufTtcbk9jY3VyS2V5Ym9hcmRIYW5kbGVyLnVuaW5zdGFsbEZyb20gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgZWRpdG9yLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmRzKG9jY3VyQ29tbWFuZHMpO1xuICAgIHZhciBoYW5kbGVyID0gZWRpdG9yLmdldEtleWJvYXJkSGFuZGxlcigpO1xuICAgIGlmIChoYW5kbGVyLmlzT2NjdXJIYW5kbGVyKVxuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIoaGFuZGxlcik7XG59O1xuZXhwb3J0cy5vY2N1clN0YXJ0Q29tbWFuZCA9IG9jY3VyU3RhcnRDb21tYW5kO1xuXG59KTtcblxuYWNlLmRlZmluZShcImFjZS9jb21tYW5kcy9pbmNyZW1lbnRhbF9zZWFyY2hfY29tbWFuZHNcIixbXCJyZXF1aXJlXCIsXCJleHBvcnRzXCIsXCJtb2R1bGVcIixcImFjZS9jb25maWdcIixcImFjZS9saWIvb29wXCIsXCJhY2Uva2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIsXCJhY2UvY29tbWFuZHMvb2NjdXJfY29tbWFuZHNcIl0sIGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSl7dmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIG9jY3VyU3RhcnRDb21tYW5kID0gcmVxdWlyZShcIi4vb2NjdXJfY29tbWFuZHNcIikub2NjdXJTdGFydENvbW1hbmQ7XG5leHBvcnRzLmlTZWFyY2hTdGFydENvbW1hbmRzID0gW3tcbiAgICAgICAgbmFtZTogXCJpU2VhcmNoXCIsXG4gICAgICAgIGJpbmRLZXk6IHsgd2luOiBcIkN0cmwtRlwiLCBtYWM6IFwiQ29tbWFuZC1GXCIgfSxcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoW1wiY29yZVwiLCBcImFjZS9pbmNyZW1lbnRhbF9zZWFyY2hcIl0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlTZWFyY2ggPSBlLmlTZWFyY2ggPSBlLmlTZWFyY2ggfHwgbmV3IGUuSW5jcmVtZW50YWxTZWFyY2goKTtcbiAgICAgICAgICAgICAgICBpU2VhcmNoLmFjdGl2YXRlKGVkaXRvciwgb3B0aW9ucy5iYWNrd2FyZHMpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmp1bXBUb0ZpcnN0TWF0Y2gpXG4gICAgICAgICAgICAgICAgICAgIGlTZWFyY2gubmV4dChvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJpU2VhcmNoQmFja3dhcmRzXCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IsIGp1bXBUb05leHQpIHsgZWRpdG9yLmV4ZWNDb21tYW5kKCdpU2VhcmNoJywgeyBiYWNrd2FyZHM6IHRydWUgfSk7IH0sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgfSwge1xuICAgICAgICBuYW1lOiBcImlTZWFyY2hBbmRHb1wiLFxuICAgICAgICBiaW5kS2V5OiB7IHdpbjogXCJDdHJsLUtcIiwgbWFjOiBcIkNvbW1hbmQtR1wiIH0sXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IsIGp1bXBUb05leHQpIHsgZWRpdG9yLmV4ZWNDb21tYW5kKCdpU2VhcmNoJywgeyBqdW1wVG9GaXJzdE1hdGNoOiB0cnVlLCB1c2VDdXJyZW50T3JQcmV2U2VhcmNoOiB0cnVlIH0pOyB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJpU2VhcmNoQmFja3dhcmRzQW5kR29cIixcbiAgICAgICAgYmluZEtleTogeyB3aW46IFwiQ3RybC1TaGlmdC1LXCIsIG1hYzogXCJDb21tYW5kLVNoaWZ0LUdcIiB9LFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yKSB7IGVkaXRvci5leGVjQ29tbWFuZCgnaVNlYXJjaCcsIHsganVtcFRvRmlyc3RNYXRjaDogdHJ1ZSwgYmFja3dhcmRzOiB0cnVlLCB1c2VDdXJyZW50T3JQcmV2U2VhcmNoOiB0cnVlIH0pOyB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgIH1dO1xuZXhwb3J0cy5pU2VhcmNoQ29tbWFuZHMgPSBbe1xuICAgICAgICBuYW1lOiBcInJlc3RhcnRTZWFyY2hcIixcbiAgICAgICAgYmluZEtleTogeyB3aW46IFwiQ3RybC1GXCIsIG1hYzogXCJDb21tYW5kLUZcIiB9LFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoaVNlYXJjaCkge1xuICAgICAgICAgICAgaVNlYXJjaC5jYW5jZWxTZWFyY2godHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwic2VhcmNoRm9yd2FyZFwiLFxuICAgICAgICBiaW5kS2V5OiB7IHdpbjogXCJDdHJsLVN8Q3RybC1LXCIsIG1hYzogXCJDdHJsLVN8Q29tbWFuZC1HXCIgfSxcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGlTZWFyY2gsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudXNlQ3VycmVudE9yUHJldlNlYXJjaCA9IHRydWU7XG4gICAgICAgICAgICBpU2VhcmNoLm5leHQob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwic2VhcmNoQmFja3dhcmRcIixcbiAgICAgICAgYmluZEtleTogeyB3aW46IFwiQ3RybC1SfEN0cmwtU2hpZnQtS1wiLCBtYWM6IFwiQ3RybC1SfENvbW1hbmQtU2hpZnQtR1wiIH0sXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChpU2VhcmNoLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zLnVzZUN1cnJlbnRPclByZXZTZWFyY2ggPSB0cnVlO1xuICAgICAgICAgICAgb3B0aW9ucy5iYWNrd2FyZHMgPSB0cnVlO1xuICAgICAgICAgICAgaVNlYXJjaC5uZXh0KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBuYW1lOiBcImV4dGVuZFNlYXJjaFRlcm1cIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGlTZWFyY2gsIHN0cmluZykge1xuICAgICAgICAgICAgaVNlYXJjaC5hZGRTdHJpbmcoc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJleHRlbmRTZWFyY2hUZXJtU3BhY2VcIixcbiAgICAgICAgYmluZEtleTogXCJzcGFjZVwiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoaVNlYXJjaCkgeyBpU2VhcmNoLmFkZFN0cmluZygnICcpOyB9XG4gICAgfSwge1xuICAgICAgICBuYW1lOiBcInNocmlua1NlYXJjaFRlcm1cIixcbiAgICAgICAgYmluZEtleTogXCJiYWNrc3BhY2VcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGlTZWFyY2gpIHtcbiAgICAgICAgICAgIGlTZWFyY2gucmVtb3ZlQ2hhcigpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnY29uZmlybVNlYXJjaCcsXG4gICAgICAgIGJpbmRLZXk6ICdyZXR1cm4nLFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoaVNlYXJjaCkgeyBpU2VhcmNoLmRlYWN0aXZhdGUoKTsgfVxuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ2NhbmNlbFNlYXJjaCcsXG4gICAgICAgIGJpbmRLZXk6ICdlc2N8Q3RybC1HJyxcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGlTZWFyY2gpIHsgaVNlYXJjaC5kZWFjdGl2YXRlKHRydWUpOyB9XG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnb2NjdXJpc2VhcmNoJyxcbiAgICAgICAgYmluZEtleTogJ0N0cmwtTycsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChpU2VhcmNoKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG9vcC5taXhpbih7fSwgaVNlYXJjaC4kb3B0aW9ucyk7XG4gICAgICAgICAgICBpU2VhcmNoLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIG9jY3VyU3RhcnRDb21tYW5kLmV4ZWMoaVNlYXJjaC4kZWRpdG9yLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJ5YW5rTmV4dFdvcmRcIixcbiAgICAgICAgYmluZEtleTogXCJDdHJsLXdcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGlTZWFyY2gpIHtcbiAgICAgICAgICAgIHZhciBlZCA9IGlTZWFyY2guJGVkaXRvciwgcmFuZ2UgPSBlZC5zZWxlY3Rpb24uZ2V0UmFuZ2VPZk1vdmVtZW50cyhmdW5jdGlvbiAoc2VsKSB7IHNlbC5tb3ZlQ3Vyc29yV29yZFJpZ2h0KCk7IH0pLCBzdHJpbmcgPSBlZC5zZXNzaW9uLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICBpU2VhcmNoLmFkZFN0cmluZyhzdHJpbmcpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBuYW1lOiBcInlhbmtOZXh0Q2hhclwiLFxuICAgICAgICBiaW5kS2V5OiBcIkN0cmwtQWx0LXlcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGlTZWFyY2gpIHtcbiAgICAgICAgICAgIHZhciBlZCA9IGlTZWFyY2guJGVkaXRvciwgcmFuZ2UgPSBlZC5zZWxlY3Rpb24uZ2V0UmFuZ2VPZk1vdmVtZW50cyhmdW5jdGlvbiAoc2VsKSB7IHNlbC5tb3ZlQ3Vyc29yUmlnaHQoKTsgfSksIHN0cmluZyA9IGVkLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIGlTZWFyY2guYWRkU3RyaW5nKHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdyZWNlbnRlclRvcEJvdHRvbScsXG4gICAgICAgIGJpbmRLZXk6ICdDdHJsLWwnLFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoaVNlYXJjaCkgeyBpU2VhcmNoLiRlZGl0b3IuZXhlY0NvbW1hbmQoJ3JlY2VudGVyVG9wQm90dG9tJyk7IH1cbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdzZWxlY3RBbGxNYXRjaGVzJyxcbiAgICAgICAgYmluZEtleTogJ0N0cmwtc3BhY2UnLFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoaVNlYXJjaCkge1xuICAgICAgICAgICAgdmFyIGVkID0gaVNlYXJjaC4kZWRpdG9yLCBobCA9IGVkLnNlc3Npb24uJGlzZWFyY2hIaWdobGlnaHQsIHJhbmdlcyA9IGhsICYmIGhsLmNhY2hlID8gaGwuY2FjaGVcbiAgICAgICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChyYW5nZXMsIGVhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlcy5jb25jYXQoZWEgPyBlYSA6IFtdKTtcbiAgICAgICAgICAgIH0sIFtdKSA6IFtdO1xuICAgICAgICAgICAgaVNlYXJjaC5kZWFjdGl2YXRlKGZhbHNlKTtcbiAgICAgICAgICAgIHJhbmdlcy5mb3JFYWNoKGVkLnNlbGVjdGlvbi5hZGRSYW5nZS5iaW5kKGVkLnNlbGVjdGlvbikpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnc2VhcmNoQXNSZWdFeHAnLFxuICAgICAgICBiaW5kS2V5OiAnQWx0LXInLFxuICAgICAgICBleGVjOiBmdW5jdGlvbiAoaVNlYXJjaCkge1xuICAgICAgICAgICAgaVNlYXJjaC5jb252ZXJ0TmVlZGxlVG9SZWdFeHAoKTtcbiAgICAgICAgfVxuICAgIH1dLm1hcChmdW5jdGlvbiAoY21kKSB7XG4gICAgY21kLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICBjbWQuaXNJbmNyZW1lbnRhbFNlYXJjaENvbW1hbmQgPSB0cnVlO1xuICAgIGNtZC5zY3JvbGxJbnRvVmlldyA9IFwiYW5pbWF0ZS1jdXJzb3JcIjtcbiAgICByZXR1cm4gY21kO1xufSk7XG5mdW5jdGlvbiBJbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlcihpU2VhcmNoKSB7XG4gICAgdGhpcy4kaVNlYXJjaCA9IGlTZWFyY2g7XG59XG5vb3AuaW5oZXJpdHMoSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXIsIEhhc2hIYW5kbGVyKTtcbihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hdHRhY2ggPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHZhciBpU2VhcmNoID0gdGhpcy4kaVNlYXJjaDtcbiAgICAgICAgSGFzaEhhbmRsZXIuY2FsbCh0aGlzLCBleHBvcnRzLmlTZWFyY2hDb21tYW5kcywgZWRpdG9yLmNvbW1hbmRzLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy4kY29tbWFuZEV4ZWNIYW5kbGVyID0gZWRpdG9yLmNvbW1hbmRzLm9uKCdleGVjJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghZS5jb21tYW5kLmlzSW5jcmVtZW50YWxTZWFyY2hDb21tYW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiBpU2VhcmNoLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gZWRpdG9yLnNlc3Npb24uZ2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZS5jb21tYW5kLmV4ZWMoaVNlYXJjaCwgZS5hcmdzIHx8IHt9KTtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5zY3JvbGxDdXJzb3JJbnRvVmlldyhudWxsLCAwLjUpO1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLmFuaW1hdGVTY3JvbGxpbmcoc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhpcy5kZXRhY2ggPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGlmICghdGhpcy4kY29tbWFuZEV4ZWNIYW5kbGVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlZGl0b3IuY29tbWFuZHMub2ZmKCdleGVjJywgdGhpcy4kY29tbWFuZEV4ZWNIYW5kbGVyKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuJGNvbW1hbmRFeGVjSGFuZGxlcjtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVLZXlib2FyZCRzdXBlciA9IHRoaXMuaGFuZGxlS2V5Ym9hcmQ7XG4gICAgdGhpcy5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uIChkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSkge1xuICAgICAgICBpZiAoKChoYXNoSWQgPT09IDEgLypjdHJsKi8gfHwgaGFzaElkID09PSA4IC8qY29tbWFuZCovKSAmJiBrZXkgPT09ICd2JylcbiAgICAgICAgICAgIHx8IChoYXNoSWQgPT09IDEgLypjdHJsKi8gJiYga2V5ID09PSAneScpKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBjbWQgPSBoYW5kbGVLZXlib2FyZCRzdXBlci5jYWxsKHRoaXMsIGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKTtcbiAgICAgICAgaWYgKGNtZCAmJiBjbWQuY29tbWFuZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNtZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgICAgICB2YXIgZXh0ZW5kQ21kID0gdGhpcy5jb21tYW5kcy5leHRlbmRTZWFyY2hUZXJtO1xuICAgICAgICAgICAgaWYgKGV4dGVuZENtZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbW1hbmQ6IGV4dGVuZENtZCwgYXJnczoga2V5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59KS5jYWxsKEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyLnByb3RvdHlwZSk7XG5leHBvcnRzLkluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyID0gSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXI7XG5cbn0pO1xuXG5hY2UuZGVmaW5lKFwiYWNlL2luY3JlbWVudGFsX3NlYXJjaFwiLFtcInJlcXVpcmVcIixcImV4cG9ydHNcIixcIm1vZHVsZVwiLFwiYWNlL3JhbmdlXCIsXCJhY2Uvc2VhcmNoXCIsXCJhY2Uvc2VhcmNoX2hpZ2hsaWdodFwiLFwiYWNlL2NvbW1hbmRzL2luY3JlbWVudGFsX3NlYXJjaF9jb21tYW5kc1wiLFwiYWNlL2xpYi9kb21cIixcImFjZS9jb21tYW5kcy9jb21tYW5kX21hbmFnZXJcIixcImFjZS9lZGl0b3JcIixcImFjZS9jb25maWdcIl0sIGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSl7XCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgU2VhcmNoID0gcmVxdWlyZShcIi4vc2VhcmNoXCIpLlNlYXJjaDtcbnZhciBTZWFyY2hIaWdobGlnaHQgPSByZXF1aXJlKFwiLi9zZWFyY2hfaGlnaGxpZ2h0XCIpLlNlYXJjaEhpZ2hsaWdodDtcbnZhciBpU2VhcmNoQ29tbWFuZE1vZHVsZSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRzL2luY3JlbWVudGFsX3NlYXJjaF9jb21tYW5kc1wiKTtcbnZhciBJU2VhcmNoS2JkID0gaVNlYXJjaENvbW1hbmRNb2R1bGUuSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXI7XG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgUmVnRXhwO1xufVxuZnVuY3Rpb24gcmVnRXhwVG9PYmplY3QocmUpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlKSwgc3RhcnQgPSBzdHJpbmcuaW5kZXhPZignLycpLCBmbGFnU3RhcnQgPSBzdHJpbmcubGFzdEluZGV4T2YoJy8nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBleHByZXNzaW9uOiBzdHJpbmcuc2xpY2Uoc3RhcnQgKyAxLCBmbGFnU3RhcnQpLFxuICAgICAgICBmbGFnczogc3RyaW5nLnNsaWNlKGZsYWdTdGFydCArIDEpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnRXhwKHN0cmluZywgZmxhZ3MpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHJpbmcsIGZsYWdzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG59XG5mdW5jdGlvbiBvYmplY3RUb1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gc3RyaW5nVG9SZWdFeHAob2JqLmV4cHJlc3Npb24sIG9iai5mbGFncyk7XG59XG52YXIgSW5jcmVtZW50YWxTZWFyY2ggPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEluY3JlbWVudGFsU2VhcmNoLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEluY3JlbWVudGFsU2VhcmNoKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy4kb3B0aW9ucyA9IHsgd3JhcDogZmFsc2UsIHNraXBDdXJyZW50OiBmYWxzZSB9O1xuICAgICAgICBfdGhpcy4ka2V5Ym9hcmRIYW5kbGVyID0gbmV3IElTZWFyY2hLYmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEluY3JlbWVudGFsU2VhcmNoLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGJhY2t3YXJkcykge1xuICAgICAgICB0aGlzLiRlZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuJHN0YXJ0UG9zID0gdGhpcy4kY3VycmVudFBvcyA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLiRvcHRpb25zLm5lZWRsZSA9ICcnO1xuICAgICAgICB0aGlzLiRvcHRpb25zLmJhY2t3YXJkcyA9IGJhY2t3YXJkcztcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKHRoaXMuJGtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgIHRoaXMuJG9yaWdpbmFsRWRpdG9yT25QYXN0ZSA9IGVkaXRvci5vblBhc3RlO1xuICAgICAgICBlZGl0b3Iub25QYXN0ZSA9IHRoaXMub25QYXN0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRtb3VzZWRvd25IYW5kbGVyID0gZWRpdG9yLm9uKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkZpeChlZGl0b3IpO1xuICAgICAgICB0aGlzLnN0YXR1c01lc3NhZ2UodHJ1ZSk7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbFNlYXJjaC5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uIChyZXNldCkge1xuICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaChyZXNldCk7XG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLiRlZGl0b3I7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcih0aGlzLiRrZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICBpZiAodGhpcy4kbW91c2Vkb3duSGFuZGxlcikge1xuICAgICAgICAgICAgZWRpdG9yLm9mZignbW91c2Vkb3duJywgdGhpcy4kbW91c2Vkb3duSGFuZGxlcik7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kbW91c2Vkb3duSGFuZGxlcjtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iub25QYXN0ZSA9IHRoaXMuJG9yaWdpbmFsRWRpdG9yT25QYXN0ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlKCcnKTtcbiAgICB9O1xuICAgIEluY3JlbWVudGFsU2VhcmNoLnByb3RvdHlwZS5zZWxlY3Rpb25GaXggPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGlmIChlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSAmJiAhZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFyaykge1xuICAgICAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEluY3JlbWVudGFsU2VhcmNoLnByb3RvdHlwZS5oaWdobGlnaHQgPSBmdW5jdGlvbiAocmVnZXhwKSB7XG4gICAgICAgIHZhciBzZXNzID0gdGhpcy4kZWRpdG9yLnNlc3Npb24sIGhsID0gc2Vzcy4kaXNlYXJjaEhpZ2hsaWdodCA9IHNlc3MuJGlzZWFyY2hIaWdobGlnaHQgfHwgc2Vzcy5hZGREeW5hbWljTWFya2VyKG5ldyBTZWFyY2hIaWdobGlnaHQobnVsbCwgXCJhY2VfaXNlYXJjaC1yZXN1bHRcIiwgXCJ0ZXh0XCIpKTtcbiAgICAgICAgaGwuc2V0UmVnZXhwKHJlZ2V4cCk7XG4gICAgICAgIHNlc3MuX2VtaXQoXCJjaGFuZ2VCYWNrTWFya2VyXCIpOyAvLyBmb3JjZSBoaWdobGlnaHQgbGF5ZXIgcmVkcmF3XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbFNlYXJjaC5wcm90b3R5cGUuY2FuY2VsU2VhcmNoID0gZnVuY3Rpb24gKHJlc2V0KSB7XG4gICAgICAgIHZhciBlID0gdGhpcy4kZWRpdG9yO1xuICAgICAgICB0aGlzLiRwcmV2TmVlZGxlID0gdGhpcy4kb3B0aW9ucy5uZWVkbGU7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMubmVlZGxlID0gJyc7XG4gICAgICAgIGlmIChyZXNldCkge1xuICAgICAgICAgICAgZS5tb3ZlQ3Vyc29yVG9Qb3NpdGlvbih0aGlzLiRzdGFydFBvcyk7XG4gICAgICAgICAgICB0aGlzLiRjdXJyZW50UG9zID0gdGhpcy4kc3RhcnRQb3M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlLnB1c2hFbWFjc01hcmsgJiYgZS5wdXNoRW1hY3NNYXJrKHRoaXMuJHN0YXJ0UG9zLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWdobGlnaHQobnVsbCk7XG4gICAgICAgIHJldHVybiBSYW5nZS5mcm9tUG9pbnRzKHRoaXMuJGN1cnJlbnRQb3MsIHRoaXMuJGN1cnJlbnRQb3MpO1xuICAgIH07XG4gICAgSW5jcmVtZW50YWxTZWFyY2gucHJvdG90eXBlLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlID0gZnVuY3Rpb24gKG1vdmVUb05leHQsIG5lZWRsZVVwZGF0ZUZ1bmMpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRlZGl0b3IpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xuICAgICAgICBpZiAobmVlZGxlVXBkYXRlRnVuYykge1xuICAgICAgICAgICAgb3B0aW9ucy5uZWVkbGUgPSBuZWVkbGVVcGRhdGVGdW5jLmNhbGwodGhpcywgb3B0aW9ucy5uZWVkbGUgfHwgJycpIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm5lZWRsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbmNlbFNlYXJjaCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnN0YXJ0ID0gdGhpcy4kY3VycmVudFBvcztcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbiwgZm91bmQgPSB0aGlzLmZpbmQoc2Vzc2lvbiksIHNob3VsZFNlbGVjdCA9IHRoaXMuJGVkaXRvci5lbWFjc01hcmsgP1xuICAgICAgICAgICAgISF0aGlzLiRlZGl0b3IuZW1hY3NNYXJrKCkgOiAhdGhpcy4kZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYmFja3dhcmRzKVxuICAgICAgICAgICAgICAgIGZvdW5kID0gUmFuZ2UuZnJvbVBvaW50cyhmb3VuZC5lbmQsIGZvdW5kLnN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuJGVkaXRvci5zZWxlY3Rpb24uc2V0UmFuZ2UoUmFuZ2UuZnJvbVBvaW50cyhzaG91bGRTZWxlY3QgPyB0aGlzLiRzdGFydFBvcyA6IGZvdW5kLmVuZCwgZm91bmQuZW5kKSk7XG4gICAgICAgICAgICBpZiAobW92ZVRvTmV4dClcbiAgICAgICAgICAgICAgICB0aGlzLiRjdXJyZW50UG9zID0gZm91bmQuZW5kO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQob3B0aW9ucy5yZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0dXNNZXNzYWdlKGZvdW5kKTtcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH07XG4gICAgSW5jcmVtZW50YWxTZWFyY2gucHJvdG90eXBlLmFkZFN0cmluZyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVnRXhwKG5lZWRsZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lZWRsZSArIHM7XG4gICAgICAgICAgICB2YXIgcmVPYmogPSByZWdFeHBUb09iamVjdChuZWVkbGUpO1xuICAgICAgICAgICAgcmVPYmouZXhwcmVzc2lvbiArPSBzO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFRvUmVnRXhwKHJlT2JqKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbFNlYXJjaC5wcm90b3R5cGUucmVtb3ZlQ2hhciA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVnRXhwKG5lZWRsZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lZWRsZS5zdWJzdHJpbmcoMCwgbmVlZGxlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHJlT2JqID0gcmVnRXhwVG9PYmplY3QobmVlZGxlKTtcbiAgICAgICAgICAgIHJlT2JqLmV4cHJlc3Npb24gPSByZU9iai5leHByZXNzaW9uLnN1YnN0cmluZygwLCByZU9iai5leHByZXNzaW9uLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFRvUmVnRXhwKHJlT2JqKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbFNlYXJjaC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLiRvcHRpb25zLmJhY2t3YXJkcyA9ICEhb3B0aW9ucy5iYWNrd2FyZHM7XG4gICAgICAgIHRoaXMuJGN1cnJlbnRQb3MgPSB0aGlzLiRlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUodHJ1ZSwgZnVuY3Rpb24gKG5lZWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMudXNlQ3VycmVudE9yUHJldlNlYXJjaCAmJiBuZWVkbGUubGVuZ3RoID09PSAwID9cbiAgICAgICAgICAgICAgICB0aGlzLiRwcmV2TmVlZGxlIHx8ICcnIDogbmVlZGxlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluY3JlbWVudGFsU2VhcmNoLnByb3RvdHlwZS5vbk1vdXNlRG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgSW5jcmVtZW50YWxTZWFyY2gucHJvdG90eXBlLm9uUGFzdGUgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB0aGlzLmFkZFN0cmluZyh0ZXh0KTtcbiAgICB9O1xuICAgIEluY3JlbWVudGFsU2VhcmNoLnByb3RvdHlwZS5jb252ZXJ0TmVlZGxlVG9SZWdFeHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNSZWdFeHAobmVlZGxlKSA/IG5lZWRsZSA6IHN0cmluZ1RvUmVnRXhwKG5lZWRsZSwgJ2lnJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5jcmVtZW50YWxTZWFyY2gucHJvdG90eXBlLmNvbnZlcnROZWVkbGVUb1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUoZmFsc2UsIGZ1bmN0aW9uIChuZWVkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpc1JlZ0V4cChuZWVkbGUpID8gcmVnRXhwVG9PYmplY3QobmVlZGxlKS5leHByZXNzaW9uIDogbmVlZGxlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluY3JlbWVudGFsU2VhcmNoLnByb3RvdHlwZS5zdGF0dXNNZXNzYWdlID0gZnVuY3Rpb24gKGZvdW5kKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucywgbXNnID0gJyc7XG4gICAgICAgIG1zZyArPSBvcHRpb25zLmJhY2t3YXJkcyA/ICdyZXZlcnNlLScgOiAnJztcbiAgICAgICAgbXNnICs9ICdpc2VhcmNoOiAnICsgb3B0aW9ucy5uZWVkbGU7XG4gICAgICAgIG1zZyArPSBmb3VuZCA/ICcnIDogJyAobm90IGZvdW5kKSc7XG4gICAgICAgIHRoaXMubWVzc2FnZShtc2cpO1xuICAgIH07XG4gICAgSW5jcmVtZW50YWxTZWFyY2gucHJvdG90eXBlLm1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLiRlZGl0b3Iuc2hvd0NvbW1hbmRMaW5lKSB7XG4gICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2hvd0NvbW1hbmRMaW5lKG1zZyk7XG4gICAgICAgICAgICB0aGlzLiRlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEluY3JlbWVudGFsU2VhcmNoO1xufShTZWFyY2gpKTtcbmV4cG9ydHMuSW5jcmVtZW50YWxTZWFyY2ggPSBJbmNyZW1lbnRhbFNlYXJjaDtcbnZhciBkb20gPSByZXF1aXJlKCcuL2xpYi9kb20nKTtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoXCJcXG4uYWNlX21hcmtlci1sYXllciAuYWNlX2lzZWFyY2gtcmVzdWx0IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDY7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5kaXYuYWNlX2lzZWFyY2gtcmVzdWx0IHtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyMDAsIDAsIDAuNSk7XFxuICBib3gtc2hhZG93OiAwIDAgNHB4IHJnYigyNTUsIDIwMCwgMCk7XFxufVxcbi5hY2VfZGFyayBkaXYuYWNlX2lzZWFyY2gtcmVzdWx0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMDAsIDExMCwgMTYwKTtcXG4gIGJveC1zaGFkb3c6IDAgMCA0cHggcmdiKDgwLCA5MCwgMTQwKTtcXG59XCIsIFwiaW5jcmVtZW50YWwtc2VhcmNoLWhpZ2hsaWdodGluZ1wiLCBmYWxzZSk7XG52YXIgY29tbWFuZHMgPSByZXF1aXJlKFwiLi9jb21tYW5kcy9jb21tYW5kX21hbmFnZXJcIik7XG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0dXBJbmNyZW1lbnRhbFNlYXJjaCA9IGZ1bmN0aW9uIChlZGl0b3IsIHZhbCkge1xuICAgICAgICBpZiAodGhpcy51c2VzSW5jcmVtZW50YWxTZWFyY2ggPT0gdmFsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnVzZXNJbmNyZW1lbnRhbFNlYXJjaCA9IHZhbDtcbiAgICAgICAgdmFyIGlTZWFyY2hDb21tYW5kcyA9IGlTZWFyY2hDb21tYW5kTW9kdWxlLmlTZWFyY2hTdGFydENvbW1hbmRzO1xuICAgICAgICB2YXIgbWV0aG9kID0gdmFsID8gJ2FkZENvbW1hbmRzJyA6ICdyZW1vdmVDb21tYW5kcyc7XG4gICAgICAgIHRoaXNbbWV0aG9kXShpU2VhcmNoQ29tbWFuZHMpO1xuICAgIH07XG59KS5jYWxsKGNvbW1hbmRzLkNvbW1hbmRNYW5hZ2VyLnByb3RvdHlwZSk7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICB1c2VJbmNyZW1lbnRhbFNlYXJjaDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMua2V5QmluZGluZy4kaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyLnNldHVwSW5jcmVtZW50YWxTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5zZXR1cEluY3JlbWVudGFsU2VhcmNoKHRoaXMsIHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdpbmNyZW1lbnRhbFNlYXJjaFNldHRpbmdDaGFuZ2VkJywgeyBpc0VuYWJsZWQ6IHZhbCB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG59KTtcblxuYWNlLmRlZmluZShcImFjZS9rZXlib2FyZC9lbWFjc1wiLFtcInJlcXVpcmVcIixcImV4cG9ydHNcIixcIm1vZHVsZVwiLFwiYWNlL2xpYi9kb21cIixcImFjZS9pbmNyZW1lbnRhbF9zZWFyY2hcIixcImFjZS9jb21tYW5kcy9pbmNyZW1lbnRhbF9zZWFyY2hfY29tbWFuZHNcIixcImFjZS9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIixcImFjZS9saWIva2V5c1wiXSwgZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKXtcInVzZSBzdHJpY3RcIjtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnJlcXVpcmUoXCIuLi9pbmNyZW1lbnRhbF9zZWFyY2hcIik7XG52YXIgaVNlYXJjaENvbW1hbmRNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tbWFuZHMvaW5jcmVtZW50YWxfc2VhcmNoX2NvbW1hbmRzXCIpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4vaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xuZXhwb3J0cy5oYW5kbGVyID0gbmV3IEhhc2hIYW5kbGVyKCk7XG5leHBvcnRzLmhhbmRsZXIuaXNFbWFjcyA9IHRydWU7XG5leHBvcnRzLmhhbmRsZXIuJGlkID0gXCJhY2Uva2V5Ym9hcmQvZW1hY3NcIjtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoXCJcXG4uZW1hY3MtbW9kZSAuYWNlX2N1cnNvcntcXG4gICAgYm9yZGVyOiAxcHggcmdiYSg1MCwyNTAsNTAsMC44KSBzb2xpZCFpbXBvcnRhbnQ7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3ghaW1wb3J0YW50O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMjUwLDAsMC45KTtcXG4gICAgb3BhY2l0eTogMC41O1xcbn1cXG4uZW1hY3MtbW9kZSAuYWNlX2hpZGRlbi1jdXJzb3JzIC5hY2VfY3Vyc29ye1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLmVtYWNzLW1vZGUgLmFjZV9vdmVyd3JpdGUtY3Vyc29ycyAuYWNlX2N1cnNvciB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItd2lkdGg6IDAgMCAycHggMnB4ICFpbXBvcnRhbnQ7XFxufVxcbi5lbWFjcy1tb2RlIC5hY2VfdGV4dC1sYXllciB7XFxuICAgIHotaW5kZXg6IDRcXG59XFxuLmVtYWNzLW1vZGUgLmFjZV9jdXJzb3ItbGF5ZXIge1xcbiAgICB6LWluZGV4OiAyXFxufVwiLCAnZW1hY3NNb2RlJyk7XG52YXIgJGZvcm1lckxvbmdXb3JkcztcbnZhciAkZm9ybWVyTGluZVN0YXJ0O1xuZXhwb3J0cy5oYW5kbGVyLmF0dGFjaCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAkZm9ybWVyTG9uZ1dvcmRzID0gZWRpdG9yLnNlc3Npb24uJHNlbGVjdExvbmdXb3JkcztcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gdHJ1ZTtcbiAgICAkZm9ybWVyTGluZVN0YXJ0ID0gZWRpdG9yLnNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgZWRpdG9yLnNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0cnVlO1xuICAgIGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmsgPSBudWxsOyAvLyB0aGUgYWN0aXZlIG1hcmtcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmtSaW5nIHx8IFtdO1xuICAgIGVkaXRvci5lbWFjc01hcmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFyaztcbiAgICB9O1xuICAgIGVkaXRvci5zZXRFbWFjc01hcmsgPSBmdW5jdGlvbiAocCkge1xuICAgICAgICB0aGlzLnNlc3Npb24uJGVtYWNzTWFyayA9IHA7XG4gICAgfTtcbiAgICBlZGl0b3IucHVzaEVtYWNzTWFyayA9IGZ1bmN0aW9uIChwLCBhY3RpdmF0ZSkge1xuICAgICAgICB2YXIgcHJldk1hcmsgPSB0aGlzLnNlc3Npb24uJGVtYWNzTWFyaztcbiAgICAgICAgaWYgKHByZXZNYXJrKVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnB1c2gocHJldk1hcmspO1xuICAgICAgICBpZiAoIXAgfHwgYWN0aXZhdGUpXG4gICAgICAgICAgICB0aGlzLnNldEVtYWNzTWFyayhwKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnB1c2gocCk7XG4gICAgfTtcbiAgICBlZGl0b3IucG9wRW1hY3NNYXJrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWFyayA9IHRoaXMuZW1hY3NNYXJrKCk7XG4gICAgICAgIGlmIChtYXJrKSB7XG4gICAgICAgICAgICB0aGlzLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgICAgIHJldHVybiBtYXJrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1JpbmcucG9wKCk7XG4gICAgfTtcbiAgICBlZGl0b3IuZ2V0TGFzdEVtYWNzTWFyayA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFyayB8fCB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1Jpbmcuc2xpY2UoLTEpWzBdO1xuICAgIH07XG4gICAgZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uIChyZXBsYWNlbWVudCkge1xuICAgICAgICB2YXIgc2VsID0gdGhpcy5zZWxlY3Rpb24sIG11bHRpUmFuZ2VMZW5ndGggPSB0aGlzLm11bHRpU2VsZWN0ID9cbiAgICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3QuZ2V0QWxsUmFuZ2VzKCkubGVuZ3RoIDogMSwgc2VsSW5kZXggPSBzZWwuaW5kZXggfHwgMCwgbWFya1JpbmcgPSB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1JpbmcsIG1hcmtJbmRleCA9IG1hcmtSaW5nLmxlbmd0aCAtIChtdWx0aVJhbmdlTGVuZ3RoIC0gc2VsSW5kZXgpLCBsYXN0TWFyayA9IG1hcmtSaW5nW21hcmtJbmRleF0gfHwgc2VsLmFuY2hvcjtcbiAgICAgICAgaWYgKHJlcGxhY2VtZW50KSB7XG4gICAgICAgICAgICBtYXJrUmluZy5zcGxpY2UobWFya0luZGV4LCAxLCBcInJvd1wiIGluIHJlcGxhY2VtZW50ICYmIFwiY29sdW1uXCIgaW4gcmVwbGFjZW1lbnQgP1xuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50IDogdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFzdE1hcms7XG4gICAgfTtcbiAgICBlZGl0b3Iub24oXCJjbGlja1wiLCAkcmVzZXRNYXJrTW9kZSk7XG4gICAgZWRpdG9yLm9uKFwiY2hhbmdlU2Vzc2lvblwiLCAka2JTZXNzaW9uQ2hhbmdlKTtcbiAgICBlZGl0b3IucmVuZGVyZXIuJGJsb2NrQ3Vyc29yID0gdHJ1ZTtcbiAgICBlZGl0b3Iuc2V0U3R5bGUoXCJlbWFjcy1tb2RlXCIpO1xuICAgIGVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kcyhjb21tYW5kcyk7XG4gICAgZXhwb3J0cy5oYW5kbGVyLnBsYXRmb3JtID0gZWRpdG9yLmNvbW1hbmRzLnBsYXRmb3JtO1xuICAgIGVkaXRvci4kZW1hY3NNb2RlSGFuZGxlciA9IHRoaXM7XG4gICAgZWRpdG9yLm9uKCdjb3B5JywgdGhpcy5vbkNvcHkpO1xuICAgIGVkaXRvci5vbigncGFzdGUnLCB0aGlzLm9uUGFzdGUpO1xufTtcbmV4cG9ydHMuaGFuZGxlci5kZXRhY2ggPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgZWRpdG9yLnJlbmRlcmVyLiRibG9ja0N1cnNvciA9IGZhbHNlO1xuICAgIGVkaXRvci5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHMgPSAkZm9ybWVyTG9uZ1dvcmRzO1xuICAgIGVkaXRvci5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gJGZvcm1lckxpbmVTdGFydDtcbiAgICBlZGl0b3Iub2ZmKFwiY2xpY2tcIiwgJHJlc2V0TWFya01vZGUpO1xuICAgIGVkaXRvci5vZmYoXCJjaGFuZ2VTZXNzaW9uXCIsICRrYlNlc3Npb25DaGFuZ2UpO1xuICAgIGVkaXRvci51bnNldFN0eWxlKFwiZW1hY3MtbW9kZVwiKTtcbiAgICBlZGl0b3IuY29tbWFuZHMucmVtb3ZlQ29tbWFuZHMoY29tbWFuZHMpO1xuICAgIGVkaXRvci5vZmYoJ2NvcHknLCB0aGlzLm9uQ29weSk7XG4gICAgZWRpdG9yLm9mZigncGFzdGUnLCB0aGlzLm9uUGFzdGUpO1xuICAgIGVkaXRvci4kZW1hY3NNb2RlSGFuZGxlciA9IG51bGw7XG59O1xudmFyICRrYlNlc3Npb25DaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLm9sZFNlc3Npb24pIHtcbiAgICAgICAgZS5vbGRTZXNzaW9uLiRzZWxlY3RMb25nV29yZHMgPSAkZm9ybWVyTG9uZ1dvcmRzO1xuICAgICAgICBlLm9sZFNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSAkZm9ybWVyTGluZVN0YXJ0O1xuICAgIH1cbiAgICAkZm9ybWVyTG9uZ1dvcmRzID0gZS5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHM7XG4gICAgZS5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHMgPSB0cnVlO1xuICAgICRmb3JtZXJMaW5lU3RhcnQgPSBlLnNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgZS5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdHJ1ZTtcbiAgICBpZiAoIWUuc2Vzc2lvbi5oYXNPd25Qcm9wZXJ0eSgnJGVtYWNzTWFyaycpKVxuICAgICAgICBlLnNlc3Npb24uJGVtYWNzTWFyayA9IG51bGw7XG4gICAgaWYgKCFlLnNlc3Npb24uaGFzT3duUHJvcGVydHkoJyRlbWFjc01hcmtSaW5nJykpXG4gICAgICAgIGUuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IFtdO1xufTtcbnZhciAkcmVzZXRNYXJrTW9kZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5lZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrID0gbnVsbDtcbn07XG52YXIga2V5cyA9IHJlcXVpcmUoXCIuLi9saWIva2V5c1wiKS5LRVlfTU9EUztcbnZhciBlTW9kcyA9IHsgQzogXCJjdHJsXCIsIFM6IFwic2hpZnRcIiwgTTogXCJhbHRcIiwgQ01EOiBcImNvbW1hbmRcIiB9O1xudmFyIGNvbWJpbmF0aW9ucyA9IFtcIkMtUy1NLUNNRFwiLFxuICAgIFwiUy1NLUNNRFwiLCBcIkMtTS1DTURcIiwgXCJDLVMtQ01EXCIsIFwiQy1TLU1cIixcbiAgICBcIk0tQ01EXCIsIFwiUy1DTURcIiwgXCJTLU1cIiwgXCJDLUNNRFwiLCBcIkMtTVwiLCBcIkMtU1wiLFxuICAgIFwiQ01EXCIsIFwiTVwiLCBcIlNcIiwgXCJDXCJdO1xuY29tYmluYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICB2YXIgaGFzaElkID0gMDtcbiAgICBjLnNwbGl0KFwiLVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGhhc2hJZCA9IGhhc2hJZCB8IGtleXNbZU1vZHNbY11dO1xuICAgIH0pO1xuICAgIGVNb2RzW2hhc2hJZF0gPSBjLnRvTG93ZXJDYXNlKCkgKyBcIi1cIjtcbn0pO1xuZXhwb3J0cy5oYW5kbGVyLm9uQ29weSA9IGZ1bmN0aW9uIChlLCBlZGl0b3IpIHtcbiAgICBpZiAoZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkpXG4gICAgICAgIHJldHVybjtcbiAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IHRydWU7XG4gICAgZXhwb3J0cy5oYW5kbGVyLmNvbW1hbmRzLmtpbGxSaW5nU2F2ZS5leGVjKGVkaXRvcik7XG4gICAgZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkgPSBmYWxzZTtcbn07XG5leHBvcnRzLmhhbmRsZXIub25QYXN0ZSA9IGZ1bmN0aW9uIChlLCBlZGl0b3IpIHtcbiAgICBlZGl0b3IucHVzaEVtYWNzTWFyayhlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKSk7XG59O1xuZXhwb3J0cy5oYW5kbGVyLmJpbmRLZXkgPSBmdW5jdGlvbiAoa2V5LCBjb21tYW5kKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gXCJvYmplY3RcIilcbiAgICAgICAga2V5ID0ga2V5W3RoaXMucGxhdGZvcm1dO1xuICAgIGlmICgha2V5KVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGNrYiA9IHRoaXMuY29tbWFuZEtleUJpbmRpbmc7XG4gICAga2V5LnNwbGl0KFwifFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlQYXJ0KSB7XG4gICAgICAgIGtleVBhcnQgPSBrZXlQYXJ0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNrYltrZXlQYXJ0XSA9IGNvbW1hbmQ7XG4gICAgICAgIHZhciBrZXlQYXJ0cyA9IGtleVBhcnQuc3BsaXQoXCIgXCIpLnNsaWNlKDAsIC0xKTtcbiAgICAgICAga2V5UGFydHMucmVkdWNlKGZ1bmN0aW9uIChrZXlNYXBLZXlzLCBrZXlQYXJ0LCBpKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0ga2V5TWFwS2V5c1tpIC0gMV0gPyBrZXlNYXBLZXlzW2kgLSAxXSArICcgJyA6ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGtleU1hcEtleXMuY29uY2F0KFtwcmVmaXggKyBrZXlQYXJ0XSk7XG4gICAgICAgIH0sIFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlQYXJ0KSB7XG4gICAgICAgICAgICBpZiAoIWNrYltrZXlQYXJ0XSlcbiAgICAgICAgICAgICAgICBja2Jba2V5UGFydF0gPSBcIm51bGxcIjtcbiAgICAgICAgfSk7XG4gICAgfSwgdGhpcyk7XG59O1xuZXhwb3J0cy5oYW5kbGVyLmdldFN0YXR1c1RleHQgPSBmdW5jdGlvbiAoZWRpdG9yLCBkYXRhKSB7XG4gICAgdmFyIHN0ciA9IFwiXCI7XG4gICAgaWYgKGRhdGEuY291bnQpXG4gICAgICAgIHN0ciArPSBkYXRhLmNvdW50O1xuICAgIGlmIChkYXRhLmtleUNoYWluKVxuICAgICAgICBzdHIgKz0gXCIgXCIgKyBkYXRhLmtleUNoYWluO1xuICAgIHJldHVybiBzdHI7XG59O1xuZXhwb3J0cy5oYW5kbGVyLmhhbmRsZUtleWJvYXJkID0gZnVuY3Rpb24gKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgaWYgKGtleUNvZGUgPT09IC0xKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHZhciBlZGl0b3IgPSBkYXRhLmVkaXRvcjtcbiAgICBlZGl0b3IuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKCk7XG4gICAgICAgIGlmIChkYXRhLmNvdW50KSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gbmV3IEFycmF5KGRhdGEuY291bnQgKyAxKS5qb2luKGtleSk7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB7IGNvbW1hbmQ6IFwiaW5zZXJ0c3RyaW5nXCIsIGFyZ3M6IHN0ciB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBtb2RpZmllciA9IGVNb2RzW2hhc2hJZF07XG4gICAgaWYgKG1vZGlmaWVyID09IFwiYy1cIiB8fCBkYXRhLmNvdW50KSB7XG4gICAgICAgIHZhciBjb3VudCA9IHBhcnNlSW50KGtleVtrZXkubGVuZ3RoIC0gMV0pO1xuICAgICAgICBpZiAodHlwZW9mIGNvdW50ID09PSAnbnVtYmVyJyAmJiAhaXNOYU4oY291bnQpKSB7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gTWF0aC5tYXgoZGF0YS5jb3VudCwgMCkgfHwgMDtcbiAgICAgICAgICAgIGRhdGEuY291bnQgPSAxMCAqIGRhdGEuY291bnQgKyBjb3VudDtcbiAgICAgICAgICAgIHJldHVybiB7IGNvbW1hbmQ6IFwibnVsbFwiIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vZGlmaWVyKVxuICAgICAgICBrZXkgPSBtb2RpZmllciArIGtleTtcbiAgICBpZiAoZGF0YS5rZXlDaGFpbilcbiAgICAgICAga2V5ID0gZGF0YS5rZXlDaGFpbiArPSBcIiBcIiArIGtleTtcbiAgICB2YXIgY29tbWFuZCA9IHRoaXMuY29tbWFuZEtleUJpbmRpbmdba2V5XTtcbiAgICBkYXRhLmtleUNoYWluID0gY29tbWFuZCA9PSBcIm51bGxcIiA/IGtleSA6IFwiXCI7XG4gICAgaWYgKCFjb21tYW5kKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGlmIChjb21tYW5kID09PSBcIm51bGxcIilcbiAgICAgICAgcmV0dXJuIHsgY29tbWFuZDogXCJudWxsXCIgfTtcbiAgICBpZiAoY29tbWFuZCA9PT0gXCJ1bml2ZXJzYWxBcmd1bWVudFwiKSB7XG4gICAgICAgIGRhdGEuY291bnQgPSAtNDtcbiAgICAgICAgcmV0dXJuIHsgY29tbWFuZDogXCJudWxsXCIgfTtcbiAgICB9XG4gICAgdmFyIGFyZ3M7XG4gICAgaWYgKHR5cGVvZiBjb21tYW5kICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGFyZ3MgPSBjb21tYW5kLmFyZ3M7XG4gICAgICAgIGlmIChjb21tYW5kLmNvbW1hbmQpXG4gICAgICAgICAgICBjb21tYW5kID0gY29tbWFuZC5jb21tYW5kO1xuICAgICAgICBpZiAoY29tbWFuZCA9PT0gXCJnb29yc2VsZWN0XCIpIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSBlZGl0b3IuZW1hY3NNYXJrKCkgPyBhcmdzWzFdIDogYXJnc1swXTtcbiAgICAgICAgICAgIGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29tbWFuZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoY29tbWFuZCA9PT0gXCJpbnNlcnRzdHJpbmdcIiB8fFxuICAgICAgICAgICAgY29tbWFuZCA9PT0gXCJzcGxpdGxpbmVcIiB8fFxuICAgICAgICAgICAgY29tbWFuZCA9PT0gXCJ0b2dnbGVjb21tZW50XCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tbWFuZCA9IHRoaXMuY29tbWFuZHNbY29tbWFuZF0gfHwgZWRpdG9yLmNvbW1hbmRzLmNvbW1hbmRzW2NvbW1hbmRdO1xuICAgICAgICBpZiAoIWNvbW1hbmQpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoIWNvbW1hbmQucmVhZE9ubHkgJiYgIWNvbW1hbmQuaXNZYW5rKVxuICAgICAgICBkYXRhLmxhc3RDb21tYW5kID0gbnVsbDtcbiAgICBpZiAoIWNvbW1hbmQucmVhZE9ubHkgJiYgZWRpdG9yLmVtYWNzTWFyaygpKVxuICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgIGlmIChkYXRhLmNvdW50KSB7XG4gICAgICAgIHZhciBjb3VudCA9IGRhdGEuY291bnQ7XG4gICAgICAgIGRhdGEuY291bnQgPSAwO1xuICAgICAgICBpZiAoIWNvbW1hbmQgfHwgIWNvbW1hbmQuaGFuZGxlc0NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgICAgICAgICAgY29tbWFuZDoge1xuICAgICAgICAgICAgICAgICAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5leGVjKGVkaXRvciwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0QWN0aW9uOiBjb21tYW5kLm11bHRpU2VsZWN0QWN0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghYXJncylcbiAgICAgICAgICAgICAgICBhcmdzID0ge307XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIGFyZ3MuY291bnQgPSBjb3VudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBjb21tYW5kOiBjb21tYW5kLCBhcmdzOiBhcmdzIH07XG59O1xuZXhwb3J0cy5lbWFjc0tleXMgPSB7XG4gICAgXCJVcHxDLXBcIjogeyBjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ29saW5ldXBcIiwgXCJzZWxlY3R1cFwiXSB9LFxuICAgIFwiRG93bnxDLW5cIjogeyBjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ29saW5lZG93blwiLCBcInNlbGVjdGRvd25cIl0gfSxcbiAgICBcIkxlZnR8Qy1iXCI6IHsgY29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9sZWZ0XCIsIFwic2VsZWN0bGVmdFwiXSB9LFxuICAgIFwiUmlnaHR8Qy1mXCI6IHsgY29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9yaWdodFwiLCBcInNlbGVjdHJpZ2h0XCJdIH0sXG4gICAgXCJDLUxlZnR8TS1iXCI6IHsgY29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG93b3JkbGVmdFwiLCBcInNlbGVjdHdvcmRsZWZ0XCJdIH0sXG4gICAgXCJDLVJpZ2h0fE0tZlwiOiB7IGNvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3Rvd29yZHJpZ2h0XCIsIFwic2VsZWN0d29yZHJpZ2h0XCJdIH0sXG4gICAgXCJIb21lfEMtYVwiOiB7IGNvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvbGluZXN0YXJ0XCIsIFwic2VsZWN0dG9saW5lc3RhcnRcIl0gfSxcbiAgICBcIkVuZHxDLWVcIjogeyBjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b2xpbmVlbmRcIiwgXCJzZWxlY3R0b2xpbmVlbmRcIl0gfSxcbiAgICBcIkMtSG9tZXxTLU0tLFwiOiB7IGNvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3Rvc3RhcnRcIiwgXCJzZWxlY3R0b3N0YXJ0XCJdIH0sXG4gICAgXCJDLUVuZHxTLU0tLlwiOiB7IGNvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvZW5kXCIsIFwic2VsZWN0dG9lbmRcIl0gfSxcbiAgICBcIlMtVXB8Uy1DLXBcIjogXCJzZWxlY3R1cFwiLFxuICAgIFwiUy1Eb3dufFMtQy1uXCI6IFwic2VsZWN0ZG93blwiLFxuICAgIFwiUy1MZWZ0fFMtQy1iXCI6IFwic2VsZWN0bGVmdFwiLFxuICAgIFwiUy1SaWdodHxTLUMtZlwiOiBcInNlbGVjdHJpZ2h0XCIsXG4gICAgXCJTLUMtTGVmdHxTLU0tYlwiOiBcInNlbGVjdHdvcmRsZWZ0XCIsXG4gICAgXCJTLUMtUmlnaHR8Uy1NLWZcIjogXCJzZWxlY3R3b3JkcmlnaHRcIixcbiAgICBcIlMtSG9tZXxTLUMtYVwiOiBcInNlbGVjdHRvbGluZXN0YXJ0XCIsXG4gICAgXCJTLUVuZHxTLUMtZVwiOiBcInNlbGVjdHRvbGluZWVuZFwiLFxuICAgIFwiUy1DLUhvbWVcIjogXCJzZWxlY3R0b3N0YXJ0XCIsXG4gICAgXCJTLUMtRW5kXCI6IFwic2VsZWN0dG9lbmRcIixcbiAgICBcIkMtbFwiOiBcInJlY2VudGVyVG9wQm90dG9tXCIsXG4gICAgXCJNLXNcIjogXCJjZW50ZXJzZWxlY3Rpb25cIixcbiAgICBcIk0tZ1wiOiBcImdvdG9saW5lXCIsXG4gICAgXCJDLXggQy1wXCI6IFwic2VsZWN0YWxsXCIsXG4gICAgXCJDLURvd25cIjogeyBjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3BhZ2Vkb3duXCIsIFwic2VsZWN0cGFnZWRvd25cIl0gfSxcbiAgICBcIkMtVXBcIjogeyBjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3BhZ2V1cFwiLCBcInNlbGVjdHBhZ2V1cFwiXSB9LFxuICAgIFwiUGFnZURvd258Qy12XCI6IHsgY29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9wYWdlZG93blwiLCBcInNlbGVjdHBhZ2Vkb3duXCJdIH0sXG4gICAgXCJQYWdlVXB8TS12XCI6IHsgY29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9wYWdldXBcIiwgXCJzZWxlY3RwYWdldXBcIl0gfSxcbiAgICBcIlMtQy1Eb3duXCI6IFwic2VsZWN0cGFnZWRvd25cIixcbiAgICBcIlMtQy1VcFwiOiBcInNlbGVjdHBhZ2V1cFwiLFxuICAgIFwiQy1zXCI6IFwiaVNlYXJjaFwiLFxuICAgIFwiQy1yXCI6IFwiaVNlYXJjaEJhY2t3YXJkc1wiLFxuICAgIFwiTS1DLXNcIjogXCJmaW5kbmV4dFwiLFxuICAgIFwiTS1DLXJcIjogXCJmaW5kcHJldmlvdXNcIixcbiAgICBcIlMtTS01XCI6IFwicmVwbGFjZVwiLFxuICAgIFwiQmFja3NwYWNlXCI6IFwiYmFja3NwYWNlXCIsXG4gICAgXCJEZWxldGV8Qy1kXCI6IFwiZGVsXCIsXG4gICAgXCJSZXR1cm58Qy1tXCI6IHsgY29tbWFuZDogXCJpbnNlcnRzdHJpbmdcIiwgYXJnczogXCJcXG5cIiB9LFxuICAgIFwiQy1vXCI6IFwic3BsaXRsaW5lXCIsXG4gICAgXCJNLWR8Qy1EZWxldGVcIjogeyBjb21tYW5kOiBcImtpbGxXb3JkXCIsIGFyZ3M6IFwicmlnaHRcIiB9LFxuICAgIFwiQy1CYWNrc3BhY2V8TS1CYWNrc3BhY2V8TS1EZWxldGVcIjogeyBjb21tYW5kOiBcImtpbGxXb3JkXCIsIGFyZ3M6IFwibGVmdFwiIH0sXG4gICAgXCJDLWtcIjogXCJraWxsTGluZVwiLFxuICAgIFwiQy15fFMtRGVsZXRlXCI6IFwieWFua1wiLFxuICAgIFwiTS15XCI6IFwieWFua1JvdGF0ZVwiLFxuICAgIFwiQy1nXCI6IFwia2V5Ym9hcmRRdWl0XCIsXG4gICAgXCJDLXd8Qy1TLVdcIjogXCJraWxsUmVnaW9uXCIsXG4gICAgXCJNLXdcIjogXCJraWxsUmluZ1NhdmVcIixcbiAgICBcIkMtU3BhY2VcIjogXCJzZXRNYXJrXCIsXG4gICAgXCJDLXggQy14XCI6IFwiZXhjaGFuZ2VQb2ludEFuZE1hcmtcIixcbiAgICBcIkMtdFwiOiBcInRyYW5zcG9zZWxldHRlcnNcIixcbiAgICBcIk0tdVwiOiBcInRvdXBwZXJjYXNlXCIsXG4gICAgXCJNLWxcIjogXCJ0b2xvd2VyY2FzZVwiLFxuICAgIFwiTS0vXCI6IFwiYXV0b2NvbXBsZXRlXCIsXG4gICAgXCJDLXVcIjogXCJ1bml2ZXJzYWxBcmd1bWVudFwiLFxuICAgIFwiTS07XCI6IFwidG9nZ2xlY29tbWVudFwiLFxuICAgIFwiQy0vfEMteCB1fFMtQy0tfEMtelwiOiBcInVuZG9cIixcbiAgICBcIlMtQy0vfFMtQy14IHV8Qy0tfFMtQy16XCI6IFwicmVkb1wiLFxuICAgIFwiQy14IHJcIjogXCJzZWxlY3RSZWN0YW5ndWxhclJlZ2lvblwiLFxuICAgIFwiTS14XCI6IHsgY29tbWFuZDogXCJmb2N1c0NvbW1hbmRMaW5lXCIsIGFyZ3M6IFwiTS14IFwiIH1cbn07XG5leHBvcnRzLmhhbmRsZXIuYmluZEtleXMoZXhwb3J0cy5lbWFjc0tleXMpO1xuZXhwb3J0cy5oYW5kbGVyLmFkZENvbW1hbmRzKHtcbiAgICByZWNlbnRlclRvcEJvdHRvbTogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSBlZGl0b3IucmVuZGVyZXI7XG4gICAgICAgIHZhciBwb3MgPSByZW5kZXJlci4kY3Vyc29yTGF5ZXIuZ2V0UGl4ZWxQb3NpdGlvbigpO1xuICAgICAgICB2YXIgaCA9IHJlbmRlcmVyLiRzaXplLnNjcm9sbGVySGVpZ2h0IC0gcmVuZGVyZXIubGluZUhlaWdodDtcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHJlbmRlcmVyLnNjcm9sbFRvcDtcbiAgICAgICAgaWYgKE1hdGguYWJzKHBvcy50b3AgLSBzY3JvbGxUb3ApIDwgMikge1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gcG9zLnRvcCAtIGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnMocG9zLnRvcCAtIHNjcm9sbFRvcCAtIGggKiAwLjUpIDwgMikge1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gcG9zLnRvcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHBvcy50b3AgLSBoICogMC41O1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnNldFNjcm9sbFRvcChzY3JvbGxUb3ApO1xuICAgIH0sXG4gICAgc2VsZWN0UmVjdGFuZ3VsYXJSZWdpb246IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLm11bHRpU2VsZWN0LnRvZ2dsZUJsb2NrU2VsZWN0aW9uKCk7XG4gICAgfSxcbiAgICBzZXRNYXJrOiB7XG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhcmdzICYmIGFyZ3MuY291bnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmluTXVsdGlTZWxlY3RNb2RlKVxuICAgICAgICAgICAgICAgICAgICBlZGl0b3IuZm9yRWFjaFNlbGVjdGlvbihtb3ZlVG9NYXJrKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG1vdmVUb01hcmsoKTtcbiAgICAgICAgICAgICAgICBtb3ZlVG9NYXJrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hcmsgPSBlZGl0b3IuZW1hY3NNYXJrKCksIHJhbmdlcyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0QWxsUmFuZ2VzKCksIHJhbmdlUG9zaXRpb25zID0gcmFuZ2VzLm1hcChmdW5jdGlvbiAocikgeyByZXR1cm4geyByb3c6IHIuc3RhcnQucm93LCBjb2x1bW46IHIuc3RhcnQuY29sdW1uIH07IH0pLCB0cmFuc2llbnRNYXJrTW9kZUFjdGl2ZSA9IHRydWUsIGhhc05vU2VsZWN0aW9uID0gcmFuZ2VzLmV2ZXJ5KGZ1bmN0aW9uIChyYW5nZSkgeyByZXR1cm4gcmFuZ2UuaXNFbXB0eSgpOyB9KTtcbiAgICAgICAgICAgIGlmICh0cmFuc2llbnRNYXJrTW9kZUFjdGl2ZSAmJiAobWFyayB8fCAhaGFzTm9TZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvci5pbk11bHRpU2VsZWN0TW9kZSlcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmZvckVhY2hTZWxlY3Rpb24oeyBleGVjOiBlZGl0b3IuY2xlYXJTZWxlY3Rpb24uYmluZChlZGl0b3IpIH0pO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hcmspXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbWFyaykge1xuICAgICAgICAgICAgICAgIHJhbmdlUG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKHBvcykgeyBlZGl0b3IucHVzaEVtYWNzTWFyayhwb3MpOyB9KTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKHJhbmdlUG9zaXRpb25zW3JhbmdlUG9zaXRpb25zLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtb3ZlVG9NYXJrKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXJrID0gZWRpdG9yLnBvcEVtYWNzTWFyaygpO1xuICAgICAgICAgICAgICAgIG1hcmsgJiYgZWRpdG9yLm1vdmVDdXJzb3JUb1Bvc2l0aW9uKG1hcmspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgaGFuZGxlc0NvdW50OiB0cnVlXG4gICAgfSxcbiAgICBleGNoYW5nZVBvaW50QW5kTWFyazoge1xuICAgICAgICBleGVjOiBmdW5jdGlvbiBleGNoYW5nZVBvaW50QW5kTWFyayRleGVjKGVkaXRvciwgYXJncykge1xuICAgICAgICAgICAgdmFyIHNlbCA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZiAoIWFyZ3MuY291bnQgJiYgIXNlbC5pc0VtcHR5KCkpIHsgLy8ganVzdCBpbnZlcnQgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgc2VsLnNldFNlbGVjdGlvblJhbmdlKHNlbC5nZXRSYW5nZSgpLCAhc2VsLmlzQmFja3dhcmRzKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmdzLmNvdW50KSB7IC8vIHJlcGxhY2UgbWFyayBhbmQgcG9pbnRcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0geyByb3c6IHNlbC5sZWFkLnJvdywgY29sdW1uOiBzZWwubGVhZC5jb2x1bW4gfTtcbiAgICAgICAgICAgICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBzZWwubW92ZUN1cnNvclRvUG9zaXRpb24oZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbihwb3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBjcmVhdGUgc2VsZWN0aW9uIHRvIGxhc3QgbWFya1xuICAgICAgICAgICAgICAgIHNlbC5zZWxlY3RUb1Bvc2l0aW9uKGVkaXRvci5lbWFjc01hcmtGb3JTZWxlY3Rpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICBoYW5kbGVzQ291bnQ6IHRydWUsXG4gICAgICAgIG11bHRpU2VsZWN0QWN0aW9uOiBcImZvckVhY2hcIlxuICAgIH0sXG4gICAga2lsbFdvcmQ6IHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24gKGVkaXRvciwgZGlyKSB7XG4gICAgICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmIChkaXIgPT0gXCJsZWZ0XCIpXG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3RXb3JkTGVmdCgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0V29yZFJpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKHRleHQpO1xuICAgICAgICAgICAgZWRpdG9yLnNlc3Npb24ucmVtb3ZlKHJhbmdlKTtcbiAgICAgICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9LFxuICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCJcbiAgICB9LFxuICAgIGtpbGxMaW5lOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKG51bGwpO1xuICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCk7XG4gICAgICAgIHZhciBsaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cihyYW5nZS5zdGFydC5jb2x1bW4pO1xuICAgICAgICB2YXIgZm9sZExpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRGb2xkTGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICBpZiAoZm9sZExpbmUgJiYgcmFuZ2UuZW5kLnJvdyAhPSBmb2xkTGluZS5lbmQucm93KSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gZm9sZExpbmUuZW5kLnJvdztcbiAgICAgICAgICAgIGxpbmUgPSBcInhcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL15cXHMqJC8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdysrO1xuICAgICAgICAgICAgbGluZSA9IGVkaXRvci5zZXNzaW9uLmdldExpbmUocmFuZ2UuZW5kLnJvdyk7XG4gICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gL15cXHMqJC8udGVzdChsaW5lKSA/IGxpbmUubGVuZ3RoIDogMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dCA9IGVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgICAgIGlmIChlZGl0b3IucHJldk9wLmNvbW1hbmQgPT0gdGhpcylcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYXBwZW5kKHRleHQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBleHBvcnRzLmtpbGxSaW5nLmFkZCh0ZXh0KTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ucmVtb3ZlKHJhbmdlKTtcbiAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfSxcbiAgICB5YW5rOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5vblBhc3RlKGV4cG9ydHMua2lsbFJpbmcuZ2V0KCkgfHwgJycpO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5sYXN0Q29tbWFuZCA9IFwieWFua1wiO1xuICAgIH0sXG4gICAgeWFua1JvdGF0ZTogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBpZiAoZWRpdG9yLmtleUJpbmRpbmcuJGRhdGEubGFzdENvbW1hbmQgIT0gXCJ5YW5rXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVkaXRvci51bmRvKCk7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnBvcCgpOyAvLyBhbHNvIHVuZG8gcmVjb3JkaW5nIG1hcmtcbiAgICAgICAgZWRpdG9yLm9uUGFzdGUoZXhwb3J0cy5raWxsUmluZy5yb3RhdGUoKSk7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLiRkYXRhLmxhc3RDb21tYW5kID0gXCJ5YW5rXCI7XG4gICAgfSxcbiAgICBraWxsUmVnaW9uOiB7XG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKGVkaXRvci5nZXRDb3B5VGV4dCgpKTtcbiAgICAgICAgICAgIGVkaXRvci5jb21tYW5kcy5ieU5hbWUuY3V0LmV4ZWMoZWRpdG9yKTtcbiAgICAgICAgICAgIGVkaXRvci5zZXRFbWFjc01hcmsobnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCJcbiAgICB9LFxuICAgIGtpbGxSaW5nU2F2ZToge1xuICAgICAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbWFya3MgPSBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZy5zbGljZSgpLCBkZXNlbGVjdGVkTWFya3MgPSBbXTtcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKGVkaXRvci5nZXRDb3B5VGV4dCgpKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlc2VsZWN0KCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbiwgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2UoKSwgcG9zID0gc2VsLmlzQmFja3dhcmRzKCkgPyByYW5nZS5lbmQgOiByYW5nZS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgZGVzZWxlY3RlZE1hcmtzLnB1c2goeyByb3c6IHBvcy5yb3csIGNvbHVtbjogcG9zLmNvbHVtbiB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVkaXRvci4kaGFuZGxlc0VtYWNzT25Db3B5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvci5pbk11bHRpU2VsZWN0TW9kZSlcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmZvckVhY2hTZWxlY3Rpb24oeyBleGVjOiBkZXNlbGVjdCB9KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IG1hcmtzLmNvbmNhdChkZXNlbGVjdGVkTWFya3MucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sXG4gICAga2V5Ym9hcmRRdWl0OiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24uY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuJGRhdGEuY291bnQgPSBudWxsO1xuICAgIH0sXG4gICAgZm9jdXNDb21tYW5kTGluZTogZnVuY3Rpb24gKGVkaXRvciwgYXJnKSB7XG4gICAgICAgIGlmIChlZGl0b3Iuc2hvd0NvbW1hbmRMaW5lKVxuICAgICAgICAgICAgZWRpdG9yLnNob3dDb21tYW5kTGluZShhcmcpO1xuICAgIH1cbn0pO1xuZXhwb3J0cy5oYW5kbGVyLmFkZENvbW1hbmRzKGlTZWFyY2hDb21tYW5kTW9kdWxlLmlTZWFyY2hTdGFydENvbW1hbmRzKTtcbnZhciBjb21tYW5kcyA9IGV4cG9ydHMuaGFuZGxlci5jb21tYW5kcztcbmNvbW1hbmRzLnlhbmsuaXNZYW5rID0gdHJ1ZTtcbmNvbW1hbmRzLnlhbmtSb3RhdGUuaXNZYW5rID0gdHJ1ZTtcbmV4cG9ydHMua2lsbFJpbmcgPSB7XG4gICAgJGRhdGE6IFtdLFxuICAgIGFkZDogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBzdHIgJiYgdGhpcy4kZGF0YS5wdXNoKHN0cik7XG4gICAgICAgIGlmICh0aGlzLiRkYXRhLmxlbmd0aCA+IDMwKVxuICAgICAgICAgICAgdGhpcy4kZGF0YS5zaGlmdCgpO1xuICAgIH0sXG4gICAgYXBwZW5kOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBpZHggPSB0aGlzLiRkYXRhLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy4kZGF0YVtpZHhdIHx8IFwiXCI7XG4gICAgICAgIGlmIChzdHIpXG4gICAgICAgICAgICB0ZXh0ICs9IHN0cjtcbiAgICAgICAgaWYgKHRleHQpXG4gICAgICAgICAgICB0aGlzLiRkYXRhW2lkeF0gPSB0ZXh0O1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiAobikge1xuICAgICAgICBuID0gbiB8fCAxO1xuICAgICAgICByZXR1cm4gdGhpcy4kZGF0YS5zbGljZSh0aGlzLiRkYXRhLmxlbmd0aCAtIG4sIHRoaXMuJGRhdGEubGVuZ3RoKS5yZXZlcnNlKCkuam9pbignXFxuJyk7XG4gICAgfSxcbiAgICBwb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJGRhdGEubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHRoaXMuJGRhdGEucG9wKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIH0sXG4gICAgcm90YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGRhdGEudW5zaGlmdCh0aGlzLiRkYXRhLnBvcCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfVxufTtcblxufSk7ICAgICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNlLnJlcXVpcmUoW1wiYWNlL2tleWJvYXJkL2VtYWNzXCJdLCBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZSA9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgbW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9