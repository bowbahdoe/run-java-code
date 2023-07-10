(self["webpackChunkui"] = self["webpackChunkui"] || []).push([["ace-keybinding-vim"],{

/***/ "./node_modules/ace-builds/src-noconflict/keybinding-vim.js":
/*!******************************************************************!*\
  !*** ./node_modules/ace-builds/src-noconflict/keybinding-vim.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
ace.define("ace/ext/hardwrap",["require","exports","module","ace/range","ace/editor","ace/config"], function(require, exports, module){"use strict";
var Range = require("../range").Range;
function hardWrap(editor, options) {
    var max = options.column || editor.getOption("printMarginColumn");
    var allowMerge = options.allowMerge != false;
    var row = Math.min(options.startRow, options.endRow);
    var endRow = Math.max(options.startRow, options.endRow);
    var session = editor.session;
    while (row <= endRow) {
        var line = session.getLine(row);
        if (line.length > max) {
            var space = findSpace(line, max, 5);
            if (space) {
                var indentation = /^\s*/.exec(line)[0];
                session.replace(new Range(row, space.start, row, space.end), "\n" + indentation);
            }
            endRow++;
        }
        else if (allowMerge && /\S/.test(line) && row != endRow) {
            var nextLine = session.getLine(row + 1);
            if (nextLine && /\S/.test(nextLine)) {
                var trimmedLine = line.replace(/\s+$/, "");
                var trimmedNextLine = nextLine.replace(/^\s+/, "");
                var mergedLine = trimmedLine + " " + trimmedNextLine;
                var space = findSpace(mergedLine, max, 5);
                if (space && space.start > trimmedLine.length || mergedLine.length < max) {
                    var replaceRange = new Range(row, trimmedLine.length, row + 1, nextLine.length - trimmedNextLine.length);
                    session.replace(replaceRange, " ");
                    row--;
                    endRow--;
                }
                else if (trimmedLine.length < line.length) {
                    session.remove(new Range(row, trimmedLine.length, row, line.length));
                }
            }
        }
        row++;
    }
    function findSpace(line, max, min) {
        if (line.length < max)
            return;
        var before = line.slice(0, max);
        var after = line.slice(max);
        var spaceAfter = /^(?:(\s+)|(\S+)(\s+))/.exec(after);
        var spaceBefore = /(?:(\s+)|(\s+)(\S+))$/.exec(before);
        var start = 0;
        var end = 0;
        if (spaceBefore && !spaceBefore[2]) {
            start = max - spaceBefore[1].length;
            end = max;
        }
        if (spaceAfter && !spaceAfter[2]) {
            if (!start)
                start = max;
            end = max + spaceAfter[1].length;
        }
        if (start) {
            return {
                start: start,
                end: end
            };
        }
        if (spaceBefore && spaceBefore[2] && spaceBefore.index > min) {
            return {
                start: spaceBefore.index,
                end: spaceBefore.index + spaceBefore[2].length
            };
        }
        if (spaceAfter && spaceAfter[2]) {
            start = max + spaceAfter[2].length;
            return {
                start: start,
                end: start + spaceAfter[3].length
            };
        }
    }
}
function wrapAfterInput(e) {
    if (e.command.name == "insertstring" && /\S/.test(e.args)) {
        var editor = e.editor;
        var cursor = editor.selection.cursor;
        if (cursor.column <= editor.renderer.$printMarginColumn)
            return;
        var lastDelta = editor.session.$undoManager.$lastDelta;
        hardWrap(editor, {
            startRow: cursor.row, endRow: cursor.row,
            allowMerge: false
        });
        if (lastDelta != editor.session.$undoManager.$lastDelta)
            editor.session.markUndoGroup();
    }
}
var Editor = require("../editor").Editor;
require("../config").defineOptions(Editor.prototype, "editor", {
    hardWrap: {
        set: function (val) {
            if (val) {
                this.commands.on("afterExec", wrapAfterInput);
            }
            else {
                this.commands.off("afterExec", wrapAfterInput);
            }
        },
        value: false
    }
});
exports.hardWrap = hardWrap;

});

ace.define("ace/keyboard/vim",["require","exports","module","ace/range","ace/lib/event_emitter","ace/lib/dom","ace/lib/oop","ace/lib/keys","ace/lib/event","ace/search","ace/lib/useragent","ace/search_highlight","ace/commands/multi_select_commands","ace/mode/text","ace/ext/hardwrap","ace/multi_select"], function(require, exports, module){// CodeMirror, copyright (c) by Marijn Haverbeke and others
'use strict';
function log() {
    var d = "";
    function format(p) {
        if (typeof p != "object")
            return p + "";
        if ("line" in p) {
            return p.line + ":" + p.ch;
        }
        if ("anchor" in p) {
            return format(p.anchor) + "->" + format(p.head);
        }
        if (Array.isArray(p))
            return "[" + p.map(function (x) {
                return format(x);
            }) + "]";
        return JSON.stringify(p);
    }
    for (var i = 0; i < arguments.length; i++) {
        var p = arguments[i];
        var f = format(p);
        d += f + "  ";
    }
    console.log(d);
}
var Range = require("../range").Range;
var EventEmitter = require("../lib/event_emitter").EventEmitter;
var domLib = require("../lib/dom");
var oop = require("../lib/oop");
var KEYS = require("../lib/keys");
var event = require("../lib/event");
var Search = require("../search").Search;
var useragent = require("../lib/useragent");
var SearchHighlight = require("../search_highlight").SearchHighlight;
var multiSelectCommands = require("../commands/multi_select_commands");
var TextModeTokenRe = require("../mode/text").Mode.prototype.tokenRe;
var hardWrap = require("../ext/hardwrap").hardWrap;
require("../multi_select");
var CodeMirror = function (ace) {
    this.ace = ace;
    this.state = {};
    this.marks = {};
    this.options = {};
    this.$uid = 0;
    this.onChange = this.onChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onBeforeEndOperation = this.onBeforeEndOperation.bind(this);
    this.ace.on('change', this.onChange);
    this.ace.on('changeSelection', this.onSelectionChange);
    this.ace.on('beforeEndOperation', this.onBeforeEndOperation);
};
CodeMirror.Pos = function (line, ch) {
    if (!(this instanceof Pos))
        return new Pos(line, ch);
    this.line = line;
    this.ch = ch;
};
CodeMirror.defineOption = function (name, val, setter) { };
CodeMirror.commands = {
    redo: function (cm) { cm.ace.redo(); },
    undo: function (cm) { cm.ace.undo(); },
    newlineAndIndent: function (cm) { cm.ace.insert("\n"); },
    goLineLeft: function (cm) { cm.ace.selection.moveCursorLineStart(); },
    goLineRight: function (cm) { cm.ace.selection.moveCursorLineEnd(); }
};
CodeMirror.keyMap = {};
CodeMirror.addClass = CodeMirror.rmClass = function () { };
CodeMirror.e_stop = CodeMirror.e_preventDefault = event.stopEvent;
CodeMirror.keyName = function (e) {
    var key = (KEYS[e.keyCode] || e.key || "");
    if (key.length == 1)
        key = key.toUpperCase();
    key = event.getModifierString(e).replace(/(^|-)\w/g, function (m) {
        return m.toUpperCase();
    }) + key;
    return key;
};
CodeMirror.keyMap['default'] = function (key) {
    return function (cm) {
        var cmd = cm.ace.commands.commandKeyBinding[key.toLowerCase()];
        return cmd && cm.ace.execCommand(cmd) !== false;
    };
};
CodeMirror.lookupKey = function lookupKey(key, map, handle) {
    if (!map)
        map = "default";
    if (typeof map == "string")
        map = CodeMirror.keyMap[map];
    var found = typeof map == "function" ? map(key) : map[key];
    if (found === false)
        return "nothing";
    if (found === "...")
        return "multi";
    if (found != null && handle(found))
        return "handled";
    if (map.fallthrough) {
        if (!Array.isArray(map.fallthrough))
            return lookupKey(key, map.fallthrough, handle);
        for (var i = 0; i < map.fallthrough.length; i++) {
            var result = lookupKey(key, map.fallthrough[i], handle);
            if (result)
                return result;
        }
    }
};
CodeMirror.findMatchingTag = function (cm, head) {
    return cm.findMatchingTag(head);
};
CodeMirror.findEnclosingTag = function (cm, head) {
};
CodeMirror.signal = function (o, name, e) { return o._signal(name, e); };
CodeMirror.on = event.addListener;
CodeMirror.off = event.removeListener;
CodeMirror.isWordChar = function (ch) {
    if (ch < "\x7f")
        return /^\w$/.test(ch);
    TextModeTokenRe.lastIndex = 0;
    return TextModeTokenRe.test(ch);
};
(function () {
    oop.implement(CodeMirror.prototype, EventEmitter);
    this.destroy = function () {
        this.ace.off('change', this.onChange);
        this.ace.off('changeSelection', this.onSelectionChange);
        this.ace.off('beforeEndOperation', this.onBeforeEndOperation);
        this.removeOverlay();
    };
    this.virtualSelectionMode = function () {
        return this.ace.inVirtualSelectionMode && this.ace.selection.index;
    };
    this.onChange = function (delta) {
        var change = { text: delta.action[0] == 'i' ? delta.lines : [] };
        var curOp = this.curOp = this.curOp || {};
        if (!curOp.changeHandlers)
            curOp.changeHandlers = this._eventRegistry["change"] && this._eventRegistry["change"].slice();
        if (!curOp.lastChange) {
            curOp.lastChange = curOp.change = change;
        }
        else {
            curOp.lastChange.next = curOp.lastChange = change;
        }
        this.$updateMarkers(delta);
    };
    this.onSelectionChange = function () {
        var curOp = this.curOp = this.curOp || {};
        if (!curOp.cursorActivityHandlers)
            curOp.cursorActivityHandlers = this._eventRegistry["cursorActivity"] && this._eventRegistry["cursorActivity"].slice();
        this.curOp.cursorActivity = true;
        if (this.ace.inMultiSelectMode) {
            this.ace.keyBinding.removeKeyboardHandler(multiSelectCommands.keyboardHandler);
        }
    };
    this.operation = function (fn, force) {
        if (!force && this.curOp || force && this.curOp && this.curOp.force) {
            return fn();
        }
        if (force || !this.ace.curOp) {
            if (this.curOp)
                this.onBeforeEndOperation();
        }
        if (!this.ace.curOp) {
            var prevOp = this.ace.prevOp;
            this.ace.startOperation({
                command: { name: "vim", scrollIntoView: "cursor" }
            });
        }
        var curOp = this.curOp = this.curOp || {};
        this.curOp.force = force;
        var result = fn();
        if (this.ace.curOp && this.ace.curOp.command.name == "vim") {
            if (this.state.dialog)
                this.ace.curOp.command.scrollIntoView = this.ace.curOp.vimDialogScroll;
            this.ace.endOperation();
            if (!curOp.cursorActivity && !curOp.lastChange && prevOp)
                this.ace.prevOp = prevOp;
        }
        if (force || !this.ace.curOp) {
            if (this.curOp)
                this.onBeforeEndOperation();
        }
        return result;
    };
    this.onBeforeEndOperation = function () {
        var op = this.curOp;
        if (op) {
            if (op.change) {
                this.signal("change", op.change, op);
            }
            if (op && op.cursorActivity) {
                this.signal("cursorActivity", null, op);
            }
            this.curOp = null;
        }
    };
    this.signal = function (eventName, e, handlers) {
        var listeners = handlers ? handlers[eventName + "Handlers"]
            : (this._eventRegistry || {})[eventName];
        if (!listeners)
            return;
        listeners = listeners.slice();
        for (var i = 0; i < listeners.length; i++)
            listeners[i](this, e);
    };
    this.firstLine = function () { return 0; };
    this.lastLine = function () { return this.ace.session.getLength() - 1; };
    this.lineCount = function () { return this.ace.session.getLength(); };
    this.setCursor = function (line, ch) {
        if (typeof line === 'object') {
            ch = line.ch;
            line = line.line;
        }
        var shouldScroll = !this.curOp && !this.ace.inVirtualSelectionMode;
        if (!this.ace.inVirtualSelectionMode)
            this.ace.exitMultiSelectMode();
        this.ace.session.unfold({ row: line, column: ch });
        this.ace.selection.moveTo(line, ch);
        if (shouldScroll) {
            this.ace.renderer.scrollCursorIntoView();
            this.ace.endOperation();
        }
    };
    this.getCursor = function (p) {
        var sel = this.ace.selection;
        var pos = p == 'anchor' ? (sel.isEmpty() ? sel.lead : sel.anchor) :
            p == 'head' || !p ? sel.lead : sel.getRange()[p];
        return toCmPos(pos);
    };
    this.listSelections = function (p) {
        var ranges = this.ace.multiSelect.rangeList.ranges;
        if (!ranges.length || this.ace.inVirtualSelectionMode)
            return [{ anchor: this.getCursor('anchor'), head: this.getCursor('head') }];
        return ranges.map(function (r) {
            return {
                anchor: this.clipPos(toCmPos(r.cursor == r.end ? r.start : r.end)),
                head: this.clipPos(toCmPos(r.cursor))
            };
        }, this);
    };
    this.setSelections = function (p, primIndex) {
        var sel = this.ace.multiSelect;
        var ranges = p.map(function (x) {
            var anchor = toAcePos(x.anchor);
            var head = toAcePos(x.head);
            var r = Range.comparePoints(anchor, head) < 0
                ? new Range.fromPoints(anchor, head)
                : new Range.fromPoints(head, anchor);
            r.cursor = Range.comparePoints(r.start, head) ? r.end : r.start;
            return r;
        });
        if (this.ace.inVirtualSelectionMode) {
            this.ace.selection.fromOrientedRange(ranges[0]);
            return;
        }
        if (!primIndex) {
            ranges = ranges.reverse();
        }
        else if (ranges[primIndex]) {
            ranges.push(ranges.splice(primIndex, 1)[0]);
        }
        sel.toSingleRange(ranges[0].clone());
        var session = this.ace.session;
        for (var i = 0; i < ranges.length; i++) {
            var range = session.$clipRangeToDocument(ranges[i]); // todo why ace doesn't do this?
            sel.addRange(range);
        }
    };
    this.setSelection = function (a, h, options) {
        var sel = this.ace.selection;
        sel.moveTo(a.line, a.ch);
        sel.selectTo(h.line, h.ch);
        if (options && options.origin == '*mouse') {
            this.onBeforeEndOperation();
        }
    };
    this.somethingSelected = function (p) {
        return !this.ace.selection.isEmpty();
    };
    this.clipPos = function (p) {
        var pos = this.ace.session.$clipPositionToDocument(p.line, p.ch);
        return toCmPos(pos);
    };
    this.foldCode = function (pos) {
        this.ace.session.$toggleFoldWidget(pos.line, {});
    };
    this.markText = function (cursor) {
        return { clear: function () { }, find: function () { } };
    };
    this.$updateMarkers = function (delta) {
        var isInsert = delta.action == "insert";
        var start = delta.start;
        var end = delta.end;
        var rowShift = (end.row - start.row) * (isInsert ? 1 : -1);
        var colShift = (end.column - start.column) * (isInsert ? 1 : -1);
        if (isInsert)
            end = start;
        for (var i in this.marks) {
            var point = this.marks[i];
            var cmp = Range.comparePoints(point, start);
            if (cmp < 0) {
                continue; // delta starts after the range
            }
            if (cmp === 0) {
                if (isInsert) {
                    if (point.bias == 1) {
                        cmp = 1;
                    }
                    else {
                        point.bias = -1;
                        continue;
                    }
                }
            }
            var cmp2 = isInsert ? cmp : Range.comparePoints(point, end);
            if (cmp2 > 0) {
                point.row += rowShift;
                point.column += point.row == end.row ? colShift : 0;
                continue;
            }
            if (!isInsert && cmp2 <= 0) {
                point.row = start.row;
                point.column = start.column;
                if (cmp2 === 0)
                    point.bias = 1;
            }
        }
    };
    var Marker = function (cm, id, row, column) {
        this.cm = cm;
        this.id = id;
        this.row = row;
        this.column = column;
        cm.marks[this.id] = this;
    };
    Marker.prototype.clear = function () { delete this.cm.marks[this.id]; };
    Marker.prototype.find = function () { return toCmPos(this); };
    this.setBookmark = function (cursor, options) {
        var bm = new Marker(this, this.$uid++, cursor.line, cursor.ch);
        if (!options || !options.insertLeft)
            bm.$insertRight = true;
        this.marks[bm.id] = bm;
        return bm;
    };
    this.moveH = function (increment, unit) {
        if (unit == 'char') {
            var sel = this.ace.selection;
            sel.clearSelection();
            sel.moveCursorBy(0, increment);
        }
    };
    this.findPosV = function (start, amount, unit, goalColumn) {
        if (unit == 'page') {
            var renderer = this.ace.renderer;
            var config = renderer.layerConfig;
            amount = amount * Math.floor(config.height / config.lineHeight);
            unit = 'line';
        }
        if (unit == 'line') {
            var screenPos = this.ace.session.documentToScreenPosition(start.line, start.ch);
            if (goalColumn != null)
                screenPos.column = goalColumn;
            screenPos.row += amount;
            screenPos.row = Math.min(Math.max(0, screenPos.row), this.ace.session.getScreenLength() - 1);
            var pos = this.ace.session.screenToDocumentPosition(screenPos.row, screenPos.column);
            return toCmPos(pos);
        }
        else {
            debugger;
        }
    };
    this.charCoords = function (pos, mode) {
        if (mode == 'div' || !mode) {
            var sc = this.ace.session.documentToScreenPosition(pos.line, pos.ch);
            return { left: sc.column, top: sc.row };
        }
        if (mode == 'local') {
            var renderer = this.ace.renderer;
            var sc = this.ace.session.documentToScreenPosition(pos.line, pos.ch);
            var lh = renderer.layerConfig.lineHeight;
            var cw = renderer.layerConfig.characterWidth;
            var top = lh * sc.row;
            return { left: sc.column * cw, top: top, bottom: top + lh };
        }
    };
    this.coordsChar = function (pos, mode) {
        var renderer = this.ace.renderer;
        if (mode == 'local') {
            var row = Math.max(0, Math.floor(pos.top / renderer.lineHeight));
            var col = Math.max(0, Math.floor(pos.left / renderer.characterWidth));
            var ch = renderer.session.screenToDocumentPosition(row, col);
            return toCmPos(ch);
        }
        else if (mode == 'div') {
            throw "not implemented";
        }
    };
    this.getSearchCursor = function (query, pos, caseFold) {
        var caseSensitive = false;
        var isRegexp = false;
        if (query instanceof RegExp && !query.global) {
            caseSensitive = !query.ignoreCase;
            query = query.source;
            isRegexp = true;
        }
        if (query == "\\n") {
            query = "\n";
            isRegexp = false;
        }
        var search = new Search();
        if (pos.ch == undefined)
            pos.ch = Number.MAX_VALUE;
        var acePos = { row: pos.line, column: pos.ch };
        var cm = this;
        var last = null;
        return {
            findNext: function () { return this.find(false); },
            findPrevious: function () { return this.find(true); },
            find: function (back) {
                search.setOptions({
                    needle: query,
                    caseSensitive: caseSensitive,
                    wrap: false,
                    backwards: back,
                    regExp: isRegexp,
                    start: last || acePos
                });
                var range = search.find(cm.ace.session);
                last = range;
                return last && [!last.isEmpty()];
            },
            from: function () { return last && toCmPos(last.start); },
            to: function () { return last && toCmPos(last.end); },
            replace: function (text) {
                if (last) {
                    last.end = cm.ace.session.doc.replace(last, text);
                }
            }
        };
    };
    this.scrollTo = function (x, y) {
        var renderer = this.ace.renderer;
        var config = renderer.layerConfig;
        var maxHeight = config.maxHeight;
        maxHeight -= (renderer.$size.scrollerHeight - renderer.lineHeight) * renderer.$scrollPastEnd;
        if (y != null)
            this.ace.session.setScrollTop(Math.max(0, Math.min(y, maxHeight)));
        if (x != null)
            this.ace.session.setScrollLeft(Math.max(0, Math.min(x, config.width)));
    };
    this.scrollInfo = function () { return 0; };
    this.scrollIntoView = function (pos, margin) {
        if (pos) {
            var renderer = this.ace.renderer;
            var viewMargin = { "top": 0, "bottom": margin };
            renderer.scrollCursorIntoView(toAcePos(pos), (renderer.lineHeight * 2) / renderer.$size.scrollerHeight, viewMargin);
        }
    };
    this.getLine = function (row) { return this.ace.session.getLine(row); };
    this.getRange = function (s, e) {
        return this.ace.session.getTextRange(new Range(s.line, s.ch, e.line, e.ch));
    };
    this.replaceRange = function (text, s, e) {
        if (!e)
            e = s;
        var range = new Range(s.line, s.ch, e.line, e.ch);
        this.ace.session.$clipRangeToDocument(range);
        return this.ace.session.replace(range, text);
    };
    this.replaceSelection =
        this.replaceSelections = function (p) {
            var sel = this.ace.selection;
            if (this.ace.inVirtualSelectionMode) {
                this.ace.session.replace(sel.getRange(), p[0] || "");
                return;
            }
            sel.inVirtualSelectionMode = true;
            var ranges = sel.rangeList.ranges;
            if (!ranges.length)
                ranges = [this.ace.multiSelect.getRange()];
            for (var i = ranges.length; i--;)
                this.ace.session.replace(ranges[i], p[i] || "");
            sel.inVirtualSelectionMode = false;
        };
    this.getSelection = function () {
        return this.ace.getSelectedText();
    };
    this.getSelections = function () {
        return this.listSelections().map(function (x) {
            return this.getRange(x.anchor, x.head);
        }, this);
    };
    this.getInputField = function () {
        return this.ace.textInput.getElement();
    };
    this.getWrapperElement = function () {
        return this.ace.container;
    };
    var optMap = {
        indentWithTabs: "useSoftTabs",
        indentUnit: "tabSize",
        tabSize: "tabSize",
        firstLineNumber: "firstLineNumber",
        readOnly: "readOnly"
    };
    this.setOption = function (name, val) {
        this.state[name] = val;
        switch (name) {
            case 'indentWithTabs':
                name = optMap[name];
                val = !val;
                break;
            case 'keyMap':
                this.state.$keyMap = val;
                return;
                break;
            default:
                name = optMap[name];
        }
        if (name)
            this.ace.setOption(name, val);
    };
    this.getOption = function (name) {
        var val;
        var aceOpt = optMap[name];
        if (aceOpt)
            val = this.ace.getOption(aceOpt);
        switch (name) {
            case 'indentWithTabs':
                name = optMap[name];
                return !val;
            case 'keyMap':
                return this.state.$keyMap || 'vim';
        }
        return aceOpt ? val : this.state[name];
    };
    this.toggleOverwrite = function (on) {
        this.state.overwrite = on;
        return this.ace.setOverwrite(on);
    };
    this.addOverlay = function (o) {
        if (!this.$searchHighlight || !this.$searchHighlight.session) {
            var highlight = new SearchHighlight(null, "ace_highlight-marker", "text");
            var marker = this.ace.session.addDynamicMarker(highlight);
            highlight.id = marker.id;
            highlight.session = this.ace.session;
            highlight.destroy = function (o) {
                highlight.session.off("change", highlight.updateOnChange);
                highlight.session.off("changeEditor", highlight.destroy);
                highlight.session.removeMarker(highlight.id);
                highlight.session = null;
            };
            highlight.updateOnChange = function (delta) {
                var row = delta.start.row;
                if (row == delta.end.row)
                    highlight.cache[row] = undefined;
                else
                    highlight.cache.splice(row, highlight.cache.length);
            };
            highlight.session.on("changeEditor", highlight.destroy);
            highlight.session.on("change", highlight.updateOnChange);
        }
        var re = new RegExp(o.query.source, "gmi");
        this.$searchHighlight = o.highlight = highlight;
        this.$searchHighlight.setRegexp(re);
        this.ace.renderer.updateBackMarkers();
    };
    this.removeOverlay = function (o) {
        if (this.$searchHighlight && this.$searchHighlight.session) {
            this.$searchHighlight.destroy();
        }
    };
    this.getScrollInfo = function () {
        var renderer = this.ace.renderer;
        var config = renderer.layerConfig;
        return {
            left: renderer.scrollLeft,
            top: renderer.scrollTop,
            height: config.maxHeight,
            width: config.width,
            clientHeight: config.height,
            clientWidth: config.width
        };
    };
    this.getValue = function () {
        return this.ace.getValue();
    };
    this.setValue = function (v) {
        return this.ace.setValue(v, -1);
    };
    this.getTokenTypeAt = function (pos) {
        var token = this.ace.session.getTokenAt(pos.line, pos.ch);
        return token && /comment|string/.test(token.type) ? "string" : "";
    };
    this.findMatchingBracket = function (pos) {
        var m = this.ace.session.findMatchingBracket(toAcePos(pos));
        return { to: m && toCmPos(m) };
    };
    this.findMatchingTag = function (pos) {
        var m = this.ace.session.getMatchingTags(toAcePos(pos));
        if (!m)
            return;
        return {
            open: {
                from: toCmPos(m.openTag.start),
                to: toCmPos(m.openTag.end)
            },
            close: {
                from: toCmPos(m.closeTag.start),
                to: toCmPos(m.closeTag.end)
            }
        };
    };
    this.indentLine = function (line, method) {
        if (method === true)
            this.ace.session.indentRows(line, line, "\t");
        else if (method === false)
            this.ace.session.outdentRows(new Range(line, 0, line, 0));
    };
    this.indexFromPos = function (pos) {
        return this.ace.session.doc.positionToIndex(toAcePos(pos));
    };
    this.posFromIndex = function (index) {
        return toCmPos(this.ace.session.doc.indexToPosition(index));
    };
    this.focus = function (index) {
        return this.ace.textInput.focus();
    };
    this.blur = function (index) {
        return this.ace.blur();
    };
    this.defaultTextHeight = function (index) {
        return this.ace.renderer.layerConfig.lineHeight;
    };
    this.scanForBracket = function (pos, dir, _, options) {
        var re = options.bracketRegex.source;
        var tokenRe = /paren|text|operator|tag/;
        if (dir == 1) {
            var m = this.ace.session.$findClosingBracket(re.slice(1, 2), toAcePos(pos), tokenRe);
        }
        else {
            var m = this.ace.session.$findOpeningBracket(re.slice(-2, -1), { row: pos.line, column: pos.ch + 1 }, tokenRe);
        }
        return m && { pos: toCmPos(m) };
    };
    this.refresh = function () {
        return this.ace.resize(true);
    };
    this.getMode = function () {
        return { name: this.getOption("mode") };
    };
    this.execCommand = function (name) {
        if (CodeMirror.commands.hasOwnProperty(name))
            return CodeMirror.commands[name](this);
        if (name == "indentAuto")
            return this.ace.execCommand("autoindent");
        console.log(name + " is not implemented");
    };
    this.getLineNumber = function (handle) {
        return handle.row;
    };
    this.getLineHandle = function (row) {
        return { text: this.ace.session.getLine(row), row: row };
    };
}).call(CodeMirror.prototype);
function toAcePos(cmPos) {
    return { row: cmPos.line, column: cmPos.ch };
}
function toCmPos(acePos) {
    return new Pos(acePos.row, acePos.column);
}
var StringStream = CodeMirror.StringStream = function (string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
};
StringStream.prototype = {
    eol: function () { return this.pos >= this.string.length; },
    sol: function () { return this.pos == this.lineStart; },
    peek: function () { return this.string.charAt(this.pos) || undefined; },
    next: function () {
        if (this.pos < this.string.length)
            return this.string.charAt(this.pos++);
    },
    eat: function (match) {
        var ch = this.string.charAt(this.pos);
        if (typeof match == "string")
            var ok = ch == match;
        else
            var ok = ch && (match.test ? match.test(ch) : match(ch));
        if (ok) {
            ++this.pos;
            return ch;
        }
    },
    eatWhile: function (match) {
        var start = this.pos;
        while (this.eat(match)) { }
        return this.pos > start;
    },
    eatSpace: function () {
        var start = this.pos;
        while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))
            ++this.pos;
        return this.pos > start;
    },
    skipToEnd: function () { this.pos = this.string.length; },
    skipTo: function (ch) {
        var found = this.string.indexOf(ch, this.pos);
        if (found > -1) {
            this.pos = found;
            return true;
        }
    },
    backUp: function (n) { this.pos -= n; },
    column: function () {
        throw "not implemented";
    },
    indentation: function () {
        throw "not implemented";
    },
    match: function (pattern, consume, caseInsensitive) {
        if (typeof pattern == "string") {
            var cased = function (str) { return caseInsensitive ? str.toLowerCase() : str; };
            var substr = this.string.substr(this.pos, pattern.length);
            if (cased(substr) == cased(pattern)) {
                if (consume !== false)
                    this.pos += pattern.length;
                return true;
            }
        }
        else {
            var match = this.string.slice(this.pos).match(pattern);
            if (match && match.index > 0)
                return null;
            if (match && consume !== false)
                this.pos += match[0].length;
            return match;
        }
    },
    current: function () { return this.string.slice(this.start, this.pos); },
    hideFirstChars: function (n, inner) {
        this.lineStart += n;
        try {
            return inner();
        }
        finally {
            this.lineStart -= n;
        }
    }
};
CodeMirror.defineExtension = function (name, fn) {
    CodeMirror.prototype[name] = fn;
};
domLib.importCssString(".normal-mode .ace_cursor{\n    border: none;\n    background-color: rgba(255,0,0,0.5);\n}\n.normal-mode .ace_hidden-cursors .ace_cursor{\n  background-color: transparent;\n  border: 1px solid red;\n  opacity: 0.7\n}\n.ace_dialog {\n  position: absolute;\n  left: 0; right: 0;\n  background: inherit;\n  z-index: 15;\n  padding: .1em .8em;\n  overflow: hidden;\n  color: inherit;\n}\n.ace_dialog-top {\n  border-bottom: 1px solid #444;\n  top: 0;\n}\n.ace_dialog-bottom {\n  border-top: 1px solid #444;\n  bottom: 0;\n}\n.ace_dialog input {\n  border: none;\n  outline: none;\n  background: transparent;\n  width: 20em;\n  color: inherit;\n  font-family: monospace;\n}", "vimMode", false);
(function () {
    function dialogDiv(cm, template, bottom) {
        var wrap = cm.ace.container;
        var dialog;
        dialog = wrap.appendChild(document.createElement("div"));
        if (bottom)
            dialog.className = "ace_dialog ace_dialog-bottom";
        else
            dialog.className = "ace_dialog ace_dialog-top";
        if (typeof template == "string") {
            dialog.innerHTML = template;
        }
        else { // Assuming it's a detached DOM element.
            dialog.appendChild(template);
        }
        return dialog;
    }
    function closeNotification(cm, newVal) {
        if (cm.state.currentNotificationClose)
            cm.state.currentNotificationClose();
        cm.state.currentNotificationClose = newVal;
    }
    CodeMirror.defineExtension("openDialog", function (template, callback, options) {
        if (this.virtualSelectionMode())
            return;
        if (!options)
            options = {};
        closeNotification(this, null);
        var dialog = dialogDiv(this, template, options.bottom);
        var closed = false, me = this;
        this.state.dialog = dialog;
        function close(newVal) {
            if (typeof newVal == 'string') {
                inp.value = newVal;
            }
            else {
                if (closed)
                    return;
                if (newVal && newVal.type == "blur") {
                    if (document.activeElement === inp)
                        return;
                }
                if (me.state.dialog == dialog) {
                    me.state.dialog = null;
                    me.focus();
                }
                closed = true;
                dialog.remove();
                if (options.onClose)
                    options.onClose(dialog);
                var cm = me;
                if (cm.state.vim) {
                    cm.state.vim.status = null;
                    cm.ace._signal("changeStatus");
                    cm.ace.renderer.$loop.schedule(cm.ace.renderer.CHANGE_CURSOR);
                }
            }
        }
        var inp = dialog.getElementsByTagName("input")[0], button;
        if (inp) {
            if (options.value) {
                inp.value = options.value;
                if (options.selectValueOnOpen !== false)
                    inp.select();
            }
            if (options.onInput)
                CodeMirror.on(inp, "input", function (e) { options.onInput(e, inp.value, close); });
            if (options.onKeyUp)
                CodeMirror.on(inp, "keyup", function (e) { options.onKeyUp(e, inp.value, close); });
            CodeMirror.on(inp, "keydown", function (e) {
                if (options && options.onKeyDown && options.onKeyDown(e, inp.value, close)) {
                    return;
                }
                if (e.keyCode == 13)
                    callback(inp.value);
                if (e.keyCode == 27 || (options.closeOnEnter !== false && e.keyCode == 13)) {
                    CodeMirror.e_stop(e);
                    close();
                }
            });
            if (options.closeOnBlur !== false)
                CodeMirror.on(inp, "blur", close);
            inp.focus();
        }
        else if (button = dialog.getElementsByTagName("button")[0]) {
            CodeMirror.on(button, "click", function () {
                close();
                me.focus();
            });
            if (options.closeOnBlur !== false)
                CodeMirror.on(button, "blur", close);
            button.focus();
        }
        return close;
    });
    CodeMirror.defineExtension("openNotification", function (template, options) {
        if (this.virtualSelectionMode())
            return;
        closeNotification(this, close);
        var dialog = dialogDiv(this, template, options && options.bottom);
        var closed = false, doneTimer;
        var duration = options && typeof options.duration !== "undefined" ? options.duration : 5000;
        function close() {
            if (closed)
                return;
            closed = true;
            clearTimeout(doneTimer);
            dialog.remove();
        }
        CodeMirror.on(dialog, 'click', function (e) {
            CodeMirror.e_preventDefault(e);
            close();
        });
        if (duration)
            doneTimer = setTimeout(close, duration);
        return close;
    });
})();
var Pos = CodeMirror.Pos;
function transformCursor(cm, range) {
    var vim = cm.state.vim;
    if (!vim || vim.insertMode)
        return range.head;
    var head = vim.sel.head;
    if (!head)
        return range.head;
    if (vim.visualBlock) {
        if (range.head.line != head.line) {
            return;
        }
    }
    if (range.from() == range.anchor && !range.empty()) {
        if (range.head.line == head.line && range.head.ch != head.ch)
            return new Pos(range.head.line, range.head.ch - 1);
    }
    return range.head;
}
function updateSelectionForSurrogateCharacters(cm, curStart, curEnd) {
    if (curStart.line === curEnd.line && curStart.ch >= curEnd.ch - 1) {
        var text = cm.getLine(curStart.line);
        var charCode = text.charCodeAt(curStart.ch);
        if (0xD800 <= charCode && charCode <= 0xD8FF) {
            curEnd.ch += 1;
        }
    }
    return { start: curStart, end: curEnd };
}
var defaultKeymap = [
    { keys: '<Left>', type: 'keyToKey', toKeys: 'h' },
    { keys: '<Right>', type: 'keyToKey', toKeys: 'l' },
    { keys: '<Up>', type: 'keyToKey', toKeys: 'k' },
    { keys: '<Down>', type: 'keyToKey', toKeys: 'j' },
    { keys: 'g<Up>', type: 'keyToKey', toKeys: 'gk' },
    { keys: 'g<Down>', type: 'keyToKey', toKeys: 'gj' },
    { keys: '<Space>', type: 'keyToKey', toKeys: 'l' },
    { keys: '<BS>', type: 'keyToKey', toKeys: 'h', context: 'normal' },
    { keys: '<Del>', type: 'keyToKey', toKeys: 'x', context: 'normal' },
    { keys: '<C-Space>', type: 'keyToKey', toKeys: 'W' },
    { keys: '<C-BS>', type: 'keyToKey', toKeys: 'B', context: 'normal' },
    { keys: '<S-Space>', type: 'keyToKey', toKeys: 'w' },
    { keys: '<S-BS>', type: 'keyToKey', toKeys: 'b', context: 'normal' },
    { keys: '<C-n>', type: 'keyToKey', toKeys: 'j' },
    { keys: '<C-p>', type: 'keyToKey', toKeys: 'k' },
    { keys: '<C-[>', type: 'keyToKey', toKeys: '<Esc>' },
    { keys: '<C-c>', type: 'keyToKey', toKeys: '<Esc>' },
    { keys: '<C-[>', type: 'keyToKey', toKeys: '<Esc>', context: 'insert' },
    { keys: '<C-c>', type: 'keyToKey', toKeys: '<Esc>', context: 'insert' },
    { keys: '<C-Esc>', type: 'keyToKey', toKeys: '<Esc>' },
    { keys: '<C-Esc>', type: 'keyToKey', toKeys: '<Esc>', context: 'insert' },
    { keys: 's', type: 'keyToKey', toKeys: 'cl', context: 'normal' },
    { keys: 's', type: 'keyToKey', toKeys: 'c', context: 'visual' },
    { keys: 'S', type: 'keyToKey', toKeys: 'cc', context: 'normal' },
    { keys: 'S', type: 'keyToKey', toKeys: 'VdO', context: 'visual' },
    { keys: '<Home>', type: 'keyToKey', toKeys: '0' },
    { keys: '<End>', type: 'keyToKey', toKeys: '$' },
    { keys: '<PageUp>', type: 'keyToKey', toKeys: '<C-b>' },
    { keys: '<PageDown>', type: 'keyToKey', toKeys: '<C-f>' },
    { keys: '<CR>', type: 'keyToKey', toKeys: 'j^', context: 'normal' },
    { keys: '<Ins>', type: 'keyToKey', toKeys: 'i', context: 'normal' },
    { keys: '<Ins>', type: 'action', action: 'toggleOverwrite', context: 'insert' },
    { keys: 'H', type: 'motion', motion: 'moveToTopLine', motionArgs: { linewise: true, toJumplist: true } },
    { keys: 'M', type: 'motion', motion: 'moveToMiddleLine', motionArgs: { linewise: true, toJumplist: true } },
    { keys: 'L', type: 'motion', motion: 'moveToBottomLine', motionArgs: { linewise: true, toJumplist: true } },
    { keys: 'h', type: 'motion', motion: 'moveByCharacters', motionArgs: { forward: false } },
    { keys: 'l', type: 'motion', motion: 'moveByCharacters', motionArgs: { forward: true } },
    { keys: 'j', type: 'motion', motion: 'moveByLines', motionArgs: { forward: true, linewise: true } },
    { keys: 'k', type: 'motion', motion: 'moveByLines', motionArgs: { forward: false, linewise: true } },
    { keys: 'gj', type: 'motion', motion: 'moveByDisplayLines', motionArgs: { forward: true } },
    { keys: 'gk', type: 'motion', motion: 'moveByDisplayLines', motionArgs: { forward: false } },
    { keys: 'w', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: false } },
    { keys: 'W', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: false, bigWord: true } },
    { keys: 'e', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: true, inclusive: true } },
    { keys: 'E', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: true, bigWord: true, inclusive: true } },
    { keys: 'b', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: false } },
    { keys: 'B', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: false, bigWord: true } },
    { keys: 'ge', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: true, inclusive: true } },
    { keys: 'gE', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: true, bigWord: true, inclusive: true } },
    { keys: '{', type: 'motion', motion: 'moveByParagraph', motionArgs: { forward: false, toJumplist: true } },
    { keys: '}', type: 'motion', motion: 'moveByParagraph', motionArgs: { forward: true, toJumplist: true } },
    { keys: '(', type: 'motion', motion: 'moveBySentence', motionArgs: { forward: false } },
    { keys: ')', type: 'motion', motion: 'moveBySentence', motionArgs: { forward: true } },
    { keys: '<C-f>', type: 'motion', motion: 'moveByPage', motionArgs: { forward: true } },
    { keys: '<C-b>', type: 'motion', motion: 'moveByPage', motionArgs: { forward: false } },
    { keys: '<C-d>', type: 'motion', motion: 'moveByScroll', motionArgs: { forward: true, explicitRepeat: true } },
    { keys: '<C-u>', type: 'motion', motion: 'moveByScroll', motionArgs: { forward: false, explicitRepeat: true } },
    { keys: 'gg', type: 'motion', motion: 'moveToLineOrEdgeOfDocument', motionArgs: { forward: false, explicitRepeat: true, linewise: true, toJumplist: true } },
    { keys: 'G', type: 'motion', motion: 'moveToLineOrEdgeOfDocument', motionArgs: { forward: true, explicitRepeat: true, linewise: true, toJumplist: true } },
    { keys: "g$", type: "motion", motion: "moveToEndOfDisplayLine" },
    { keys: "g^", type: "motion", motion: "moveToStartOfDisplayLine" },
    { keys: "g0", type: "motion", motion: "moveToStartOfDisplayLine" },
    { keys: '0', type: 'motion', motion: 'moveToStartOfLine' },
    { keys: '^', type: 'motion', motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: '+', type: 'motion', motion: 'moveByLines', motionArgs: { forward: true, toFirstChar: true } },
    { keys: '-', type: 'motion', motion: 'moveByLines', motionArgs: { forward: false, toFirstChar: true } },
    { keys: '_', type: 'motion', motion: 'moveByLines', motionArgs: { forward: true, toFirstChar: true, repeatOffset: -1 } },
    { keys: '$', type: 'motion', motion: 'moveToEol', motionArgs: { inclusive: true } },
    { keys: '%', type: 'motion', motion: 'moveToMatchedSymbol', motionArgs: { inclusive: true, toJumplist: true } },
    { keys: 'f<character>', type: 'motion', motion: 'moveToCharacter', motionArgs: { forward: true, inclusive: true } },
    { keys: 'F<character>', type: 'motion', motion: 'moveToCharacter', motionArgs: { forward: false } },
    { keys: 't<character>', type: 'motion', motion: 'moveTillCharacter', motionArgs: { forward: true, inclusive: true } },
    { keys: 'T<character>', type: 'motion', motion: 'moveTillCharacter', motionArgs: { forward: false } },
    { keys: ';', type: 'motion', motion: 'repeatLastCharacterSearch', motionArgs: { forward: true } },
    { keys: ',', type: 'motion', motion: 'repeatLastCharacterSearch', motionArgs: { forward: false } },
    { keys: '\'<character>', type: 'motion', motion: 'goToMark', motionArgs: { toJumplist: true, linewise: true } },
    { keys: '`<character>', type: 'motion', motion: 'goToMark', motionArgs: { toJumplist: true } },
    { keys: ']`', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: true } },
    { keys: '[`', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: false } },
    { keys: ']\'', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: true, linewise: true } },
    { keys: '[\'', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: false, linewise: true } },
    { keys: ']p', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: true, isEdit: true, matchIndent: true } },
    { keys: '[p', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: false, isEdit: true, matchIndent: true } },
    { keys: ']<character>', type: 'motion', motion: 'moveToSymbol', motionArgs: { forward: true, toJumplist: true } },
    { keys: '[<character>', type: 'motion', motion: 'moveToSymbol', motionArgs: { forward: false, toJumplist: true } },
    { keys: '|', type: 'motion', motion: 'moveToColumn' },
    { keys: 'o', type: 'motion', motion: 'moveToOtherHighlightedEnd', context: 'visual' },
    { keys: 'O', type: 'motion', motion: 'moveToOtherHighlightedEnd', motionArgs: { sameLine: true }, context: 'visual' },
    { keys: 'd', type: 'operator', operator: 'delete' },
    { keys: 'y', type: 'operator', operator: 'yank' },
    { keys: 'c', type: 'operator', operator: 'change' },
    { keys: '=', type: 'operator', operator: 'indentAuto' },
    { keys: '>', type: 'operator', operator: 'indent', operatorArgs: { indentRight: true } },
    { keys: '<', type: 'operator', operator: 'indent', operatorArgs: { indentRight: false } },
    { keys: 'g~', type: 'operator', operator: 'changeCase' },
    { keys: 'gu', type: 'operator', operator: 'changeCase', operatorArgs: { toLower: true }, isEdit: true },
    { keys: 'gU', type: 'operator', operator: 'changeCase', operatorArgs: { toLower: false }, isEdit: true },
    { keys: 'n', type: 'motion', motion: 'findNext', motionArgs: { forward: true, toJumplist: true } },
    { keys: 'N', type: 'motion', motion: 'findNext', motionArgs: { forward: false, toJumplist: true } },
    { keys: 'gn', type: 'motion', motion: 'findAndSelectNextInclusive', motionArgs: { forward: true } },
    { keys: 'gN', type: 'motion', motion: 'findAndSelectNextInclusive', motionArgs: { forward: false } },
    { keys: 'x', type: 'operatorMotion', operator: 'delete', motion: 'moveByCharacters', motionArgs: { forward: true }, operatorMotionArgs: { visualLine: false } },
    { keys: 'X', type: 'operatorMotion', operator: 'delete', motion: 'moveByCharacters', motionArgs: { forward: false }, operatorMotionArgs: { visualLine: true } },
    { keys: 'D', type: 'operatorMotion', operator: 'delete', motion: 'moveToEol', motionArgs: { inclusive: true }, context: 'normal' },
    { keys: 'D', type: 'operator', operator: 'delete', operatorArgs: { linewise: true }, context: 'visual' },
    { keys: 'Y', type: 'operatorMotion', operator: 'yank', motion: 'expandToLine', motionArgs: { linewise: true }, context: 'normal' },
    { keys: 'Y', type: 'operator', operator: 'yank', operatorArgs: { linewise: true }, context: 'visual' },
    { keys: 'C', type: 'operatorMotion', operator: 'change', motion: 'moveToEol', motionArgs: { inclusive: true }, context: 'normal' },
    { keys: 'C', type: 'operator', operator: 'change', operatorArgs: { linewise: true }, context: 'visual' },
    { keys: '~', type: 'operatorMotion', operator: 'changeCase', motion: 'moveByCharacters', motionArgs: { forward: true }, operatorArgs: { shouldMoveCursor: true }, context: 'normal' },
    { keys: '~', type: 'operator', operator: 'changeCase', context: 'visual' },
    { keys: '<C-u>', type: 'operatorMotion', operator: 'delete', motion: 'moveToStartOfLine', context: 'insert' },
    { keys: '<C-w>', type: 'operatorMotion', operator: 'delete', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: false }, context: 'insert' },
    { keys: '<C-w>', type: 'idle', context: 'normal' },
    { keys: '<C-i>', type: 'action', action: 'jumpListWalk', actionArgs: { forward: true } },
    { keys: '<C-o>', type: 'action', action: 'jumpListWalk', actionArgs: { forward: false } },
    { keys: '<C-e>', type: 'action', action: 'scroll', actionArgs: { forward: true, linewise: true } },
    { keys: '<C-y>', type: 'action', action: 'scroll', actionArgs: { forward: false, linewise: true } },
    { keys: 'a', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'charAfter' }, context: 'normal' },
    { keys: 'A', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'eol' }, context: 'normal' },
    { keys: 'A', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'endOfSelectedArea' }, context: 'visual' },
    { keys: 'i', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'inplace' }, context: 'normal' },
    { keys: 'gi', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'lastEdit' }, context: 'normal' },
    { keys: 'I', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'firstNonBlank' }, context: 'normal' },
    { keys: 'gI', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'bol' }, context: 'normal' },
    { keys: 'I', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'startOfSelectedArea' }, context: 'visual' },
    { keys: 'o', type: 'action', action: 'newLineAndEnterInsertMode', isEdit: true, interlaceInsertRepeat: true, actionArgs: { after: true }, context: 'normal' },
    { keys: 'O', type: 'action', action: 'newLineAndEnterInsertMode', isEdit: true, interlaceInsertRepeat: true, actionArgs: { after: false }, context: 'normal' },
    { keys: 'v', type: 'action', action: 'toggleVisualMode' },
    { keys: 'V', type: 'action', action: 'toggleVisualMode', actionArgs: { linewise: true } },
    { keys: '<C-v>', type: 'action', action: 'toggleVisualMode', actionArgs: { blockwise: true } },
    { keys: '<C-q>', type: 'action', action: 'toggleVisualMode', actionArgs: { blockwise: true } },
    { keys: 'gv', type: 'action', action: 'reselectLastSelection' },
    { keys: 'J', type: 'action', action: 'joinLines', isEdit: true },
    { keys: 'gJ', type: 'action', action: 'joinLines', actionArgs: { keepSpaces: true }, isEdit: true },
    { keys: 'p', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: true, isEdit: true } },
    { keys: 'P', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: false, isEdit: true } },
    { keys: 'r<character>', type: 'action', action: 'replace', isEdit: true },
    { keys: '@<character>', type: 'action', action: 'replayMacro' },
    { keys: 'q<character>', type: 'action', action: 'enterMacroRecordMode' },
    { keys: 'R', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { replace: true }, context: 'normal' },
    { keys: 'R', type: 'operator', operator: 'change', operatorArgs: { linewise: true, fullLine: true }, context: 'visual', exitVisualBlock: true },
    { keys: 'u', type: 'action', action: 'undo', context: 'normal' },
    { keys: 'u', type: 'operator', operator: 'changeCase', operatorArgs: { toLower: true }, context: 'visual', isEdit: true },
    { keys: 'U', type: 'operator', operator: 'changeCase', operatorArgs: { toLower: false }, context: 'visual', isEdit: true },
    { keys: '<C-r>', type: 'action', action: 'redo' },
    { keys: 'm<character>', type: 'action', action: 'setMark' },
    { keys: '"<character>', type: 'action', action: 'setRegister' },
    { keys: 'zz', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'center' } },
    { keys: 'z.', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'center' }, motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: 'zt', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'top' } },
    { keys: 'z<CR>', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'top' }, motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: 'zb', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'bottom' } },
    { keys: 'z-', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'bottom' }, motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: '.', type: 'action', action: 'repeatLastEdit' },
    { keys: '<C-a>', type: 'action', action: 'incrementNumberToken', isEdit: true, actionArgs: { increase: true, backtrack: false } },
    { keys: '<C-x>', type: 'action', action: 'incrementNumberToken', isEdit: true, actionArgs: { increase: false, backtrack: false } },
    { keys: '<C-t>', type: 'action', action: 'indent', actionArgs: { indentRight: true }, context: 'insert' },
    { keys: '<C-d>', type: 'action', action: 'indent', actionArgs: { indentRight: false }, context: 'insert' },
    { keys: 'a<character>', type: 'motion', motion: 'textObjectManipulation' },
    { keys: 'i<character>', type: 'motion', motion: 'textObjectManipulation', motionArgs: { textObjectInner: true } },
    { keys: '/', type: 'search', searchArgs: { forward: true, querySrc: 'prompt', toJumplist: true } },
    { keys: '?', type: 'search', searchArgs: { forward: false, querySrc: 'prompt', toJumplist: true } },
    { keys: '*', type: 'search', searchArgs: { forward: true, querySrc: 'wordUnderCursor', wholeWordOnly: true, toJumplist: true } },
    { keys: '#', type: 'search', searchArgs: { forward: false, querySrc: 'wordUnderCursor', wholeWordOnly: true, toJumplist: true } },
    { keys: 'g*', type: 'search', searchArgs: { forward: true, querySrc: 'wordUnderCursor', toJumplist: true } },
    { keys: 'g#', type: 'search', searchArgs: { forward: false, querySrc: 'wordUnderCursor', toJumplist: true } },
    { keys: ':', type: 'ex' }
];
var defaultKeymapLength = defaultKeymap.length;
var defaultExCommandMap = [
    { name: 'colorscheme', shortName: 'colo' },
    { name: 'map' },
    { name: 'imap', shortName: 'im' },
    { name: 'nmap', shortName: 'nm' },
    { name: 'vmap', shortName: 'vm' },
    { name: 'unmap' },
    { name: 'write', shortName: 'w' },
    { name: 'undo', shortName: 'u' },
    { name: 'redo', shortName: 'red' },
    { name: 'set', shortName: 'se' },
    { name: 'setlocal', shortName: 'setl' },
    { name: 'setglobal', shortName: 'setg' },
    { name: 'sort', shortName: 'sor' },
    { name: 'substitute', shortName: 's', possiblyAsync: true },
    { name: 'nohlsearch', shortName: 'noh' },
    { name: 'yank', shortName: 'y' },
    { name: 'delmarks', shortName: 'delm' },
    { name: 'registers', shortName: 'reg', excludeFromCommandHistory: true },
    { name: 'vglobal', shortName: 'v' },
    { name: 'global', shortName: 'g' }
];
function enterVimMode(cm) {
    cm.setOption('disableInput', true);
    cm.setOption('showCursorWhenSelecting', false);
    CodeMirror.signal(cm, "vim-mode-change", { mode: "normal" });
    cm.on('cursorActivity', onCursorActivity);
    maybeInitVimState(cm);
    CodeMirror.on(cm.getInputField(), 'paste', getOnPasteFn(cm));
}
function leaveVimMode(cm) {
    cm.setOption('disableInput', false);
    cm.off('cursorActivity', onCursorActivity);
    CodeMirror.off(cm.getInputField(), 'paste', getOnPasteFn(cm));
    cm.state.vim = null;
    if (highlightTimeout)
        clearTimeout(highlightTimeout);
}
function detachVimMap(cm, next) {
    if (this == CodeMirror.keyMap.vim) {
        cm.options.$customCursor = null;
        CodeMirror.rmClass(cm.getWrapperElement(), "cm-fat-cursor");
    }
    if (!next || next.attach != attachVimMap)
        leaveVimMode(cm);
}
function attachVimMap(cm, prev) {
    if (this == CodeMirror.keyMap.vim) {
        if (cm.curOp)
            cm.curOp.selectionChanged = true;
        cm.options.$customCursor = transformCursor;
        CodeMirror.addClass(cm.getWrapperElement(), "cm-fat-cursor");
    }
    if (!prev || prev.attach != attachVimMap)
        enterVimMode(cm);
}
CodeMirror.defineOption('vimMode', false, function (cm, val, prev) {
    if (val && cm.getOption("keyMap") != "vim")
        cm.setOption("keyMap", "vim");
    else if (!val && prev != CodeMirror.Init && /^vim/.test(cm.getOption("keyMap")))
        cm.setOption("keyMap", "default");
});
function cmKey(key, cm) {
    if (!cm) {
        return undefined;
    }
    if (this[key]) {
        return this[key];
    }
    var vimKey = cmKeyToVimKey(key);
    if (!vimKey) {
        return false;
    }
    var cmd = vimApi.findKey(cm, vimKey);
    if (typeof cmd == 'function') {
        CodeMirror.signal(cm, 'vim-keypress', vimKey);
    }
    return cmd;
}
var modifiers = { Shift: 'S', Ctrl: 'C', Alt: 'A', Cmd: 'D', Mod: 'A', CapsLock: '' };
var specialKeys = { Enter: 'CR', Backspace: 'BS', Delete: 'Del', Insert: 'Ins' };
function cmKeyToVimKey(key) {
    if (key.charAt(0) == '\'') {
        return key.charAt(1);
    }
    var pieces = key.split(/-(?!$)/);
    var lastPiece = pieces[pieces.length - 1];
    if (pieces.length == 1 && pieces[0].length == 1) {
        return false;
    }
    else if (pieces.length == 2 && pieces[0] == 'Shift' && lastPiece.length == 1) {
        return false;
    }
    var hasCharacter = false;
    for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];
        if (piece in modifiers) {
            pieces[i] = modifiers[piece];
        }
        else {
            hasCharacter = true;
        }
        if (piece in specialKeys) {
            pieces[i] = specialKeys[piece];
        }
    }
    if (!hasCharacter) {
        return false;
    }
    if (isUpperCase(lastPiece)) {
        pieces[pieces.length - 1] = lastPiece.toLowerCase();
    }
    return '<' + pieces.join('-') + '>';
}
function getOnPasteFn(cm) {
    var vim = cm.state.vim;
    if (!vim.onPasteFn) {
        vim.onPasteFn = function () {
            if (!vim.insertMode) {
                cm.setCursor(offsetCursor(cm.getCursor(), 0, 1));
                actions.enterInsertMode(cm, {}, vim);
            }
        };
    }
    return vim.onPasteFn;
}
var numberRegex = /[\d]/;
var wordCharTest = [CodeMirror.isWordChar, function (ch) {
        return ch && !CodeMirror.isWordChar(ch) && !/\s/.test(ch);
    }], bigWordCharTest = [function (ch) {
        return /\S/.test(ch);
    }];
function makeKeyRange(start, size) {
    var keys = [];
    for (var i = start; i < start + size; i++) {
        keys.push(String.fromCharCode(i));
    }
    return keys;
}
var upperCaseAlphabet = makeKeyRange(65, 26);
var lowerCaseAlphabet = makeKeyRange(97, 26);
var numbers = makeKeyRange(48, 10);
var validMarks = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, ['<', '>']);
var validRegisters = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, ['-', '"', '.', ':', '_', '/', '+']);
var upperCaseChars;
try {
    upperCaseChars = new RegExp("^[\\p{Lu}]$", "u");
}
catch (_) {
    upperCaseChars = /^[A-Z]$/;
}
function isLine(cm, line) {
    return line >= cm.firstLine() && line <= cm.lastLine();
}
function isLowerCase(k) {
    return (/^[a-z]$/).test(k);
}
function isMatchableSymbol(k) {
    return '()[]{}'.indexOf(k) != -1;
}
function isNumber(k) {
    return numberRegex.test(k);
}
function isUpperCase(k) {
    return upperCaseChars.test(k);
}
function isWhiteSpaceString(k) {
    return (/^\s*$/).test(k);
}
function isEndOfSentenceSymbol(k) {
    return '.?!'.indexOf(k) != -1;
}
function inArray(val, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}
var options = {};
function defineOption(name, defaultValue, type, aliases, callback) {
    if (defaultValue === undefined && !callback) {
        throw Error('defaultValue is required unless callback is provided');
    }
    if (!type) {
        type = 'string';
    }
    options[name] = {
        type: type,
        defaultValue: defaultValue,
        callback: callback
    };
    if (aliases) {
        for (var i = 0; i < aliases.length; i++) {
            options[aliases[i]] = options[name];
        }
    }
    if (defaultValue) {
        setOption(name, defaultValue);
    }
}
function setOption(name, value, cm, cfg) {
    var option = options[name];
    cfg = cfg || {};
    var scope = cfg.scope;
    if (!option) {
        return new Error('Unknown option: ' + name);
    }
    if (option.type == 'boolean') {
        if (value && value !== true) {
            return new Error('Invalid argument: ' + name + '=' + value);
        }
        else if (value !== false) {
            value = true;
        }
    }
    if (option.callback) {
        if (scope !== 'local') {
            option.callback(value, undefined);
        }
        if (scope !== 'global' && cm) {
            option.callback(value, cm);
        }
    }
    else {
        if (scope !== 'local') {
            option.value = option.type == 'boolean' ? !!value : value;
        }
        if (scope !== 'global' && cm) {
            cm.state.vim.options[name] = { value: value };
        }
    }
}
function getOption(name, cm, cfg) {
    var option = options[name];
    cfg = cfg || {};
    var scope = cfg.scope;
    if (!option) {
        return new Error('Unknown option: ' + name);
    }
    if (option.callback) {
        var local = cm && option.callback(undefined, cm);
        if (scope !== 'global' && local !== undefined) {
            return local;
        }
        if (scope !== 'local') {
            return option.callback();
        }
        return;
    }
    else {
        var local = (scope !== 'global') && (cm && cm.state.vim.options[name]);
        return (local || (scope !== 'local') && option || {}).value;
    }
}
defineOption('filetype', undefined, 'string', ['ft'], function (name, cm) {
    if (cm === undefined) {
        return;
    }
    if (name === undefined) {
        var mode = cm.getOption('mode');
        return mode == 'null' ? '' : mode;
    }
    else {
        var mode = name == '' ? 'null' : name;
        cm.setOption('mode', mode);
    }
});
var createCircularJumpList = function () {
    var size = 100;
    var pointer = -1;
    var head = 0;
    var tail = 0;
    var buffer = new Array(size);
    function add(cm, oldCur, newCur) {
        var current = pointer % size;
        var curMark = buffer[current];
        function useNextSlot(cursor) {
            var next = ++pointer % size;
            var trashMark = buffer[next];
            if (trashMark) {
                trashMark.clear();
            }
            buffer[next] = cm.setBookmark(cursor);
        }
        if (curMark) {
            var markPos = curMark.find();
            if (markPos && !cursorEqual(markPos, oldCur)) {
                useNextSlot(oldCur);
            }
        }
        else {
            useNextSlot(oldCur);
        }
        useNextSlot(newCur);
        head = pointer;
        tail = pointer - size + 1;
        if (tail < 0) {
            tail = 0;
        }
    }
    function move(cm, offset) {
        pointer += offset;
        if (pointer > head) {
            pointer = head;
        }
        else if (pointer < tail) {
            pointer = tail;
        }
        var mark = buffer[(size + pointer) % size];
        if (mark && !mark.find()) {
            var inc = offset > 0 ? 1 : -1;
            var newCur;
            var oldCur = cm.getCursor();
            do {
                pointer += inc;
                mark = buffer[(size + pointer) % size];
                if (mark &&
                    (newCur = mark.find()) &&
                    !cursorEqual(oldCur, newCur)) {
                    break;
                }
            } while (pointer < head && pointer > tail);
        }
        return mark;
    }
    function find(cm, offset) {
        var oldPointer = pointer;
        var mark = move(cm, offset);
        pointer = oldPointer;
        return mark && mark.find();
    }
    return {
        cachedCursor: undefined,
        add: add,
        find: find,
        move: move
    };
};
var createInsertModeChanges = function (c) {
    if (c) {
        return {
            changes: c.changes,
            expectCursorActivityForChange: c.expectCursorActivityForChange
        };
    }
    return {
        changes: [],
        expectCursorActivityForChange: false
    };
};
function MacroModeState() {
    this.latestRegister = undefined;
    this.isPlaying = false;
    this.isRecording = false;
    this.replaySearchQueries = [];
    this.onRecordingDone = undefined;
    this.lastInsertModeChanges = createInsertModeChanges();
}
MacroModeState.prototype = {
    exitMacroRecordMode: function () {
        var macroModeState = vimGlobalState.macroModeState;
        if (macroModeState.onRecordingDone) {
            macroModeState.onRecordingDone(); // close dialog
        }
        macroModeState.onRecordingDone = undefined;
        macroModeState.isRecording = false;
    },
    enterMacroRecordMode: function (cm, registerName) {
        var register = vimGlobalState.registerController.getRegister(registerName);
        if (register) {
            register.clear();
            this.latestRegister = registerName;
            if (cm.openDialog) {
                var template = dom('span', { class: 'cm-vim-message' }, 'recording @' + registerName);
                this.onRecordingDone = cm.openDialog(template, null, { bottom: true });
            }
            this.isRecording = true;
        }
    }
};
function maybeInitVimState(cm) {
    if (!cm.state.vim) {
        cm.state.vim = {
            inputState: new InputState(),
            lastEditInputState: undefined,
            lastEditActionCommand: undefined,
            lastHPos: -1,
            lastHSPos: -1,
            lastMotion: null,
            marks: {},
            insertMode: false,
            insertModeRepeat: undefined,
            visualMode: false,
            visualLine: false,
            visualBlock: false,
            lastSelection: null,
            lastPastedText: null,
            sel: {},
            options: {}
        };
    }
    return cm.state.vim;
}
var vimGlobalState;
function resetVimGlobalState() {
    vimGlobalState = {
        searchQuery: null,
        searchIsReversed: false,
        lastSubstituteReplacePart: undefined,
        jumpList: createCircularJumpList(),
        macroModeState: new MacroModeState,
        lastCharacterSearch: { increment: 0, forward: true, selectedCharacter: '' },
        registerController: new RegisterController({}),
        searchHistoryController: new HistoryController(),
        exCommandHistoryController: new HistoryController()
    };
    for (var optionName in options) {
        var option = options[optionName];
        option.value = option.defaultValue;
    }
}
var lastInsertModeKeyTimer;
var vimApi = {
    enterVimMode: enterVimMode,
    leaveVimMode: leaveVimMode,
    buildKeyMap: function () {
    },
    getRegisterController: function () {
        return vimGlobalState.registerController;
    },
    resetVimGlobalState_: resetVimGlobalState,
    getVimGlobalState_: function () {
        return vimGlobalState;
    },
    maybeInitVimState_: maybeInitVimState,
    suppressErrorLogging: false,
    InsertModeKey: InsertModeKey,
    map: function (lhs, rhs, ctx) {
        exCommandDispatcher.map(lhs, rhs, ctx);
    },
    unmap: function (lhs, ctx) {
        return exCommandDispatcher.unmap(lhs, ctx);
    },
    noremap: function (lhs, rhs, ctx) {
        function toCtxArray(ctx) {
            return ctx ? [ctx] : ['normal', 'insert', 'visual'];
        }
        var ctxsToMap = toCtxArray(ctx);
        var actualLength = defaultKeymap.length, origLength = defaultKeymapLength;
        for (var i = actualLength - origLength; i < actualLength && ctxsToMap.length; i++) {
            var mapping = defaultKeymap[i];
            if (mapping.keys == rhs &&
                (!ctx || !mapping.context || mapping.context === ctx) &&
                mapping.type.substr(0, 2) !== 'ex' &&
                mapping.type.substr(0, 3) !== 'key') {
                var newMapping = {};
                for (var key in mapping) {
                    newMapping[key] = mapping[key];
                }
                newMapping.keys = lhs;
                if (ctx && !newMapping.context) {
                    newMapping.context = ctx;
                }
                this._mapCommand(newMapping);
                var mappedCtxs = toCtxArray(mapping.context);
                ctxsToMap = ctxsToMap.filter(function (el) { return mappedCtxs.indexOf(el) === -1; });
            }
        }
    },
    mapclear: function (ctx) {
        var actualLength = defaultKeymap.length, origLength = defaultKeymapLength;
        var userKeymap = defaultKeymap.slice(0, actualLength - origLength);
        defaultKeymap = defaultKeymap.slice(actualLength - origLength);
        if (ctx) {
            for (var i = userKeymap.length - 1; i >= 0; i--) {
                var mapping = userKeymap[i];
                if (ctx !== mapping.context) {
                    if (mapping.context) {
                        this._mapCommand(mapping);
                    }
                    else {
                        var contexts = ['normal', 'insert', 'visual'];
                        for (var j in contexts) {
                            if (contexts[j] !== ctx) {
                                var newMapping = {};
                                for (var key in mapping) {
                                    newMapping[key] = mapping[key];
                                }
                                newMapping.context = contexts[j];
                                this._mapCommand(newMapping);
                            }
                        }
                    }
                }
            }
        }
    },
    setOption: setOption,
    getOption: getOption,
    defineOption: defineOption,
    defineEx: function (name, prefix, func) {
        if (!prefix) {
            prefix = name;
        }
        else if (name.indexOf(prefix) !== 0) {
            throw new Error('(Vim.defineEx) "' + prefix + '" is not a prefix of "' + name + '", command not registered');
        }
        exCommands[name] = func;
        exCommandDispatcher.commandMap_[prefix] = { name: name, shortName: prefix, type: 'api' };
    },
    handleKey: function (cm, key, origin) {
        var command = this.findKey(cm, key, origin);
        if (typeof command === 'function') {
            return command();
        }
    },
    multiSelectHandleKey: multiSelectHandleKey,
    findKey: function (cm, key, origin) {
        var vim = maybeInitVimState(cm);
        function handleMacroRecording() {
            var macroModeState = vimGlobalState.macroModeState;
            if (macroModeState.isRecording) {
                if (key == 'q') {
                    macroModeState.exitMacroRecordMode();
                    clearInputState(cm);
                    return true;
                }
                if (origin != 'mapping') {
                    logKey(macroModeState, key);
                }
            }
        }
        function handleEsc() {
            if (key == '<Esc>') {
                if (vim.visualMode) {
                    exitVisualMode(cm);
                }
                else if (vim.insertMode) {
                    exitInsertMode(cm);
                }
                else {
                    return;
                }
                clearInputState(cm);
                return true;
            }
        }
        function doKeyToKey(keys) {
            var match;
            while (keys) {
                match = (/<\w+-.+?>|<\w+>|./).exec(keys);
                key = match[0];
                keys = keys.substring(match.index + key.length);
                vimApi.handleKey(cm, key, 'mapping');
            }
        }
        function handleKeyInsertMode() {
            if (handleEsc()) {
                return true;
            }
            var keys = vim.inputState.keyBuffer = vim.inputState.keyBuffer + key;
            var keysAreChars = key.length == 1;
            var match = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
            while (keys.length > 1 && match.type != 'full') {
                var keys = vim.inputState.keyBuffer = keys.slice(1);
                var thisMatch = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
                if (thisMatch.type != 'none') {
                    match = thisMatch;
                }
            }
            if (match.type == 'none') {
                clearInputState(cm);
                return false;
            }
            else if (match.type == 'partial') {
                if (lastInsertModeKeyTimer) {
                    window.clearTimeout(lastInsertModeKeyTimer);
                }
                lastInsertModeKeyTimer = window.setTimeout(function () { if (vim.insertMode && vim.inputState.keyBuffer) {
                    clearInputState(cm);
                } }, getOption('insertModeEscKeysTimeout'));
                return !keysAreChars;
            }
            if (lastInsertModeKeyTimer) {
                window.clearTimeout(lastInsertModeKeyTimer);
            }
            if (keysAreChars) {
                var selections = cm.listSelections();
                for (var i = 0; i < selections.length; i++) {
                    var here = selections[i].head;
                    cm.replaceRange('', offsetCursor(here, 0, -(keys.length - 1)), here, '+input');
                }
                vimGlobalState.macroModeState.lastInsertModeChanges.changes.pop();
            }
            clearInputState(cm);
            return match.command;
        }
        function handleKeyNonInsertMode() {
            if (handleMacroRecording() || handleEsc()) {
                return true;
            }
            var keys = vim.inputState.keyBuffer = vim.inputState.keyBuffer + key;
            if (/^[1-9]\d*$/.test(keys)) {
                return true;
            }
            var keysMatcher = /^(\d*)(.*)$/.exec(keys);
            if (!keysMatcher) {
                clearInputState(cm);
                return false;
            }
            var context = vim.visualMode ? 'visual' :
                'normal';
            var mainKey = keysMatcher[2] || keysMatcher[1];
            if (vim.inputState.operatorShortcut && vim.inputState.operatorShortcut.slice(-1) == mainKey) {
                mainKey = vim.inputState.operatorShortcut;
            }
            var match = commandDispatcher.matchCommand(mainKey, defaultKeymap, vim.inputState, context);
            if (match.type == 'none') {
                clearInputState(cm);
                return false;
            }
            else if (match.type == 'partial') {
                return true;
            }
            else if (match.type == 'clear') {
                clearInputState(cm);
                return true;
            }
            vim.inputState.keyBuffer = '';
            keysMatcher = /^(\d*)(.*)$/.exec(keys);
            if (keysMatcher[1] && keysMatcher[1] != '0') {
                vim.inputState.pushRepeatDigit(keysMatcher[1]);
            }
            return match.command;
        }
        var command;
        if (vim.insertMode) {
            command = handleKeyInsertMode();
        }
        else {
            command = handleKeyNonInsertMode();
        }
        if (command === false) {
            return undefined; //ace_patch
        }
        else if (command === true) {
            return function () { return true; };
        }
        else {
            return function () {
                if ((command.operator || command.isEdit) && cm.getOption('readOnly'))
                    return; // ace_patch
                return cm.operation(function () {
                    cm.curOp.isVimOp = true;
                    try {
                        if (command.type == 'keyToKey') {
                            doKeyToKey(command.toKeys);
                        }
                        else {
                            commandDispatcher.processCommand(cm, vim, command);
                        }
                    }
                    catch (e) {
                        cm.state.vim = undefined;
                        maybeInitVimState(cm);
                        if (!vimApi.suppressErrorLogging) {
                            console['log'](e);
                        }
                        throw e;
                    }
                    return true;
                });
            };
        }
    },
    handleEx: function (cm, input) {
        exCommandDispatcher.processCommand(cm, input);
    },
    defineMotion: defineMotion,
    defineAction: defineAction,
    defineOperator: defineOperator,
    mapCommand: mapCommand,
    _mapCommand: _mapCommand,
    defineRegister: defineRegister,
    exitVisualMode: exitVisualMode,
    exitInsertMode: exitInsertMode
};
function InputState() {
    this.prefixRepeat = [];
    this.motionRepeat = [];
    this.operator = null;
    this.operatorArgs = null;
    this.motion = null;
    this.motionArgs = null;
    this.keyBuffer = []; // For matching multi-key commands.
    this.registerName = null; // Defaults to the unnamed register.
}
InputState.prototype.pushRepeatDigit = function (n) {
    if (!this.operator) {
        this.prefixRepeat = this.prefixRepeat.concat(n);
    }
    else {
        this.motionRepeat = this.motionRepeat.concat(n);
    }
};
InputState.prototype.getRepeat = function () {
    var repeat = 0;
    if (this.prefixRepeat.length > 0 || this.motionRepeat.length > 0) {
        repeat = 1;
        if (this.prefixRepeat.length > 0) {
            repeat *= parseInt(this.prefixRepeat.join(''), 10);
        }
        if (this.motionRepeat.length > 0) {
            repeat *= parseInt(this.motionRepeat.join(''), 10);
        }
    }
    return repeat;
};
function clearInputState(cm, reason) {
    cm.state.vim.inputState = new InputState();
    CodeMirror.signal(cm, 'vim-command-done', reason);
}
function Register(text, linewise, blockwise) {
    this.clear();
    this.keyBuffer = [text || ''];
    this.insertModeChanges = [];
    this.searchQueries = [];
    this.linewise = !!linewise;
    this.blockwise = !!blockwise;
}
Register.prototype = {
    setText: function (text, linewise, blockwise) {
        this.keyBuffer = [text || ''];
        this.linewise = !!linewise;
        this.blockwise = !!blockwise;
    },
    pushText: function (text, linewise) {
        if (linewise) {
            if (!this.linewise) {
                this.keyBuffer.push('\n');
            }
            this.linewise = true;
        }
        this.keyBuffer.push(text);
    },
    pushInsertModeChanges: function (changes) {
        this.insertModeChanges.push(createInsertModeChanges(changes));
    },
    pushSearchQuery: function (query) {
        this.searchQueries.push(query);
    },
    clear: function () {
        this.keyBuffer = [];
        this.insertModeChanges = [];
        this.searchQueries = [];
        this.linewise = false;
    },
    toString: function () {
        return this.keyBuffer.join('');
    }
};
function defineRegister(name, register) {
    var registers = vimGlobalState.registerController.registers;
    if (!name || name.length != 1) {
        throw Error('Register name must be 1 character');
    }
    registers[name] = register;
    validRegisters.push(name);
}
function RegisterController(registers) {
    this.registers = registers;
    this.unnamedRegister = registers['"'] = new Register();
    registers['.'] = new Register();
    registers[':'] = new Register();
    registers['/'] = new Register();
    registers['+'] = new Register();
}
RegisterController.prototype = {
    pushText: function (registerName, operator, text, linewise, blockwise) {
        if (registerName === '_')
            return;
        if (linewise && text.charAt(text.length - 1) !== '\n') {
            text += '\n';
        }
        var register = this.isValidRegister(registerName) ?
            this.getRegister(registerName) : null;
        if (!register) {
            switch (operator) {
                case 'yank':
                    this.registers['0'] = new Register(text, linewise, blockwise);
                    break;
                case 'delete':
                case 'change':
                    if (text.indexOf('\n') == -1) {
                        this.registers['-'] = new Register(text, linewise);
                    }
                    else {
                        this.shiftNumericRegisters_();
                        this.registers['1'] = new Register(text, linewise);
                    }
                    break;
            }
            this.unnamedRegister.setText(text, linewise, blockwise);
            return;
        }
        var append = isUpperCase(registerName);
        if (append) {
            register.pushText(text, linewise);
        }
        else {
            register.setText(text, linewise, blockwise);
        }
        if (registerName === '+' && typeof navigator !== 'undefined' &&
            typeof navigator.clipboard !== 'undefined' &&
            typeof navigator.clipboard.readText === 'function') {
            navigator.clipboard.writeText(text);
        }
        this.unnamedRegister.setText(register.toString(), linewise);
    },
    getRegister: function (name) {
        if (!this.isValidRegister(name)) {
            return this.unnamedRegister;
        }
        name = name.toLowerCase();
        if (!this.registers[name]) {
            this.registers[name] = new Register();
        }
        return this.registers[name];
    },
    isValidRegister: function (name) {
        return name && inArray(name, validRegisters);
    },
    shiftNumericRegisters_: function () {
        for (var i = 9; i >= 2; i--) {
            this.registers[i] = this.getRegister('' + (i - 1));
        }
    }
};
function HistoryController() {
    this.historyBuffer = [];
    this.iterator = 0;
    this.initialPrefix = null;
}
HistoryController.prototype = {
    nextMatch: function (input, up) {
        var historyBuffer = this.historyBuffer;
        var dir = up ? -1 : 1;
        if (this.initialPrefix === null)
            this.initialPrefix = input;
        for (var i = this.iterator + dir; up ? i >= 0 : i < historyBuffer.length; i += dir) {
            var element = historyBuffer[i];
            for (var j = 0; j <= element.length; j++) {
                if (this.initialPrefix == element.substring(0, j)) {
                    this.iterator = i;
                    return element;
                }
            }
        }
        if (i >= historyBuffer.length) {
            this.iterator = historyBuffer.length;
            return this.initialPrefix;
        }
        if (i < 0)
            return input;
    },
    pushInput: function (input) {
        var index = this.historyBuffer.indexOf(input);
        if (index > -1)
            this.historyBuffer.splice(index, 1);
        if (input.length)
            this.historyBuffer.push(input);
    },
    reset: function () {
        this.initialPrefix = null;
        this.iterator = this.historyBuffer.length;
    }
};
var commandDispatcher = {
    matchCommand: function (keys, keyMap, inputState, context) {
        var matches = commandMatches(keys, keyMap, context, inputState);
        if (!matches.full && !matches.partial) {
            return { type: 'none' };
        }
        else if (!matches.full && matches.partial) {
            return { type: 'partial' };
        }
        var bestMatch;
        for (var i = 0; i < matches.full.length; i++) {
            var match = matches.full[i];
            if (!bestMatch) {
                bestMatch = match;
            }
        }
        if (bestMatch.keys.slice(-11) == '<character>') {
            var character = lastChar(keys);
            if (!character || character.length > 1)
                return { type: 'clear' };
            inputState.selectedCharacter = character;
        }
        return { type: 'full', command: bestMatch };
    },
    processCommand: function (cm, vim, command) {
        vim.inputState.repeatOverride = command.repeatOverride;
        switch (command.type) {
            case 'motion':
                this.processMotion(cm, vim, command);
                break;
            case 'operator':
                this.processOperator(cm, vim, command);
                break;
            case 'operatorMotion':
                this.processOperatorMotion(cm, vim, command);
                break;
            case 'action':
                this.processAction(cm, vim, command);
                break;
            case 'search':
                this.processSearch(cm, vim, command);
                break;
            case 'ex':
            case 'keyToEx':
                this.processEx(cm, vim, command);
                break;
            default:
                break;
        }
    },
    processMotion: function (cm, vim, command) {
        vim.inputState.motion = command.motion;
        vim.inputState.motionArgs = copyArgs(command.motionArgs);
        this.evalInput(cm, vim);
    },
    processOperator: function (cm, vim, command) {
        var inputState = vim.inputState;
        if (inputState.operator) {
            if (inputState.operator == command.operator) {
                inputState.motion = 'expandToLine';
                inputState.motionArgs = { linewise: true };
                this.evalInput(cm, vim);
                return;
            }
            else {
                clearInputState(cm);
            }
        }
        inputState.operator = command.operator;
        inputState.operatorArgs = copyArgs(command.operatorArgs);
        if (command.keys.length > 1) {
            inputState.operatorShortcut = command.keys;
        }
        if (command.exitVisualBlock) {
            vim.visualBlock = false;
            updateCmSelection(cm);
        }
        if (vim.visualMode) {
            this.evalInput(cm, vim);
        }
    },
    processOperatorMotion: function (cm, vim, command) {
        var visualMode = vim.visualMode;
        var operatorMotionArgs = copyArgs(command.operatorMotionArgs);
        if (operatorMotionArgs) {
            if (visualMode && operatorMotionArgs.visualLine) {
                vim.visualLine = true;
            }
        }
        this.processOperator(cm, vim, command);
        if (!visualMode) {
            this.processMotion(cm, vim, command);
        }
    },
    processAction: function (cm, vim, command) {
        var inputState = vim.inputState;
        var repeat = inputState.getRepeat();
        var repeatIsExplicit = !!repeat;
        var actionArgs = copyArgs(command.actionArgs) || {};
        if (inputState.selectedCharacter) {
            actionArgs.selectedCharacter = inputState.selectedCharacter;
        }
        if (command.operator) {
            this.processOperator(cm, vim, command);
        }
        if (command.motion) {
            this.processMotion(cm, vim, command);
        }
        if (command.motion || command.operator) {
            this.evalInput(cm, vim);
        }
        actionArgs.repeat = repeat || 1;
        actionArgs.repeatIsExplicit = repeatIsExplicit;
        actionArgs.registerName = inputState.registerName;
        clearInputState(cm);
        vim.lastMotion = null;
        if (command.isEdit) {
            this.recordLastEdit(vim, inputState, command);
        }
        actions[command.action](cm, actionArgs, vim);
    },
    processSearch: function (cm, vim, command) {
        if (!cm.getSearchCursor) {
            return;
        }
        var forward = command.searchArgs.forward;
        var wholeWordOnly = command.searchArgs.wholeWordOnly;
        getSearchState(cm).setReversed(!forward);
        var promptPrefix = (forward) ? '/' : '?';
        var originalQuery = getSearchState(cm).getQuery();
        var originalScrollPos = cm.getScrollInfo();
        function handleQuery(query, ignoreCase, smartCase) {
            vimGlobalState.searchHistoryController.pushInput(query);
            vimGlobalState.searchHistoryController.reset();
            try {
                updateSearchQuery(cm, query, ignoreCase, smartCase);
            }
            catch (e) {
                showConfirm(cm, 'Invalid regex: ' + query);
                clearInputState(cm);
                return;
            }
            commandDispatcher.processMotion(cm, vim, {
                type: 'motion',
                motion: 'findNext',
                motionArgs: { forward: true, toJumplist: command.searchArgs.toJumplist }
            });
        }
        function onPromptClose(query) {
            handleQuery(query, true /** ignoreCase */, true /** smartCase */);
            var macroModeState = vimGlobalState.macroModeState;
            if (macroModeState.isRecording) {
                logSearchQuery(macroModeState, query);
            }
        }
        function onPromptKeyUp(e, query, close) {
            var keyName = CodeMirror.keyName(e), up, offset;
            if (keyName == 'Up' || keyName == 'Down') {
                up = keyName == 'Up' ? true : false;
                offset = e.target ? e.target.selectionEnd : 0;
                query = vimGlobalState.searchHistoryController.nextMatch(query, up) || '';
                close(query);
                if (offset && e.target)
                    e.target.selectionEnd = e.target.selectionStart = Math.min(offset, e.target.value.length);
            }
            else {
                if (keyName != 'Left' && keyName != 'Right' && keyName != 'Ctrl' && keyName != 'Alt' && keyName != 'Shift')
                    vimGlobalState.searchHistoryController.reset();
            }
            var parsedQuery;
            try {
                parsedQuery = updateSearchQuery(cm, query, true /** ignoreCase */, true /** smartCase */);
            }
            catch (e) {
            }
            if (parsedQuery) {
                cm.scrollIntoView(findNext(cm, !forward, parsedQuery), 30);
            }
            else {
                clearSearchHighlight(cm);
                cm.scrollTo(originalScrollPos.left, originalScrollPos.top);
            }
        }
        function onPromptKeyDown(e, query, close) {
            var keyName = CodeMirror.keyName(e);
            if (keyName == 'Esc' || keyName == 'Ctrl-C' || keyName == 'Ctrl-[' ||
                (keyName == 'Backspace' && query == '')) {
                vimGlobalState.searchHistoryController.pushInput(query);
                vimGlobalState.searchHistoryController.reset();
                updateSearchQuery(cm, originalQuery);
                clearSearchHighlight(cm);
                cm.scrollTo(originalScrollPos.left, originalScrollPos.top);
                CodeMirror.e_stop(e);
                clearInputState(cm);
                close();
                cm.focus();
            }
            else if (keyName == 'Up' || keyName == 'Down') {
                CodeMirror.e_stop(e);
            }
            else if (keyName == 'Ctrl-U') {
                CodeMirror.e_stop(e);
                close('');
            }
        }
        switch (command.searchArgs.querySrc) {
            case 'prompt':
                var macroModeState = vimGlobalState.macroModeState;
                if (macroModeState.isPlaying) {
                    var query = macroModeState.replaySearchQueries.shift();
                    handleQuery(query, true /** ignoreCase */, false /** smartCase */);
                }
                else {
                    showPrompt(cm, {
                        onClose: onPromptClose,
                        prefix: promptPrefix,
                        desc: '(JavaScript regexp)',
                        onKeyUp: onPromptKeyUp,
                        onKeyDown: onPromptKeyDown
                    });
                }
                break;
            case 'wordUnderCursor':
                var word = expandWordUnderCursor(cm, false /** inclusive */, true /** forward */, false /** bigWord */, true /** noSymbol */);
                var isKeyword = true;
                if (!word) {
                    word = expandWordUnderCursor(cm, false /** inclusive */, true /** forward */, false /** bigWord */, false /** noSymbol */);
                    isKeyword = false;
                }
                if (!word) {
                    return;
                }
                var query = cm.getLine(word.start.line).substring(word.start.ch, word.end.ch);
                if (isKeyword && wholeWordOnly) {
                    query = '\\b' + query + '\\b';
                }
                else {
                    query = escapeRegex(query);
                }
                vimGlobalState.jumpList.cachedCursor = cm.getCursor();
                cm.setCursor(word.start);
                handleQuery(query, true /** ignoreCase */, false /** smartCase */);
                break;
        }
    },
    processEx: function (cm, vim, command) {
        function onPromptClose(input) {
            vimGlobalState.exCommandHistoryController.pushInput(input);
            vimGlobalState.exCommandHistoryController.reset();
            exCommandDispatcher.processCommand(cm, input);
            if (cm.state.vim)
                clearInputState(cm);
        }
        function onPromptKeyDown(e, input, close) {
            var keyName = CodeMirror.keyName(e), up, offset;
            if (keyName == 'Esc' || keyName == 'Ctrl-C' || keyName == 'Ctrl-[' ||
                (keyName == 'Backspace' && input == '')) {
                vimGlobalState.exCommandHistoryController.pushInput(input);
                vimGlobalState.exCommandHistoryController.reset();
                CodeMirror.e_stop(e);
                clearInputState(cm);
                close();
                cm.focus();
            }
            if (keyName == 'Up' || keyName == 'Down') {
                CodeMirror.e_stop(e);
                up = keyName == 'Up' ? true : false;
                offset = e.target ? e.target.selectionEnd : 0;
                input = vimGlobalState.exCommandHistoryController.nextMatch(input, up) || '';
                close(input);
                if (offset && e.target)
                    e.target.selectionEnd = e.target.selectionStart = Math.min(offset, e.target.value.length);
            }
            else if (keyName == 'Ctrl-U') {
                CodeMirror.e_stop(e);
                close('');
            }
            else {
                if (keyName != 'Left' && keyName != 'Right' && keyName != 'Ctrl' && keyName != 'Alt' && keyName != 'Shift')
                    vimGlobalState.exCommandHistoryController.reset();
            }
        }
        if (command.type == 'keyToEx') {
            exCommandDispatcher.processCommand(cm, command.exArgs.input);
        }
        else {
            if (vim.visualMode) {
                showPrompt(cm, { onClose: onPromptClose, prefix: ':', value: '\'<,\'>',
                    onKeyDown: onPromptKeyDown, selectValueOnOpen: false });
            }
            else {
                showPrompt(cm, { onClose: onPromptClose, prefix: ':',
                    onKeyDown: onPromptKeyDown });
            }
        }
    },
    evalInput: function (cm, vim) {
        var inputState = vim.inputState;
        var motion = inputState.motion;
        var motionArgs = inputState.motionArgs || {};
        var operator = inputState.operator;
        var operatorArgs = inputState.operatorArgs || {};
        var registerName = inputState.registerName;
        var sel = vim.sel;
        var origHead = copyCursor(vim.visualMode ? clipCursorToContent(cm, sel.head) : cm.getCursor('head'));
        var origAnchor = copyCursor(vim.visualMode ? clipCursorToContent(cm, sel.anchor) : cm.getCursor('anchor'));
        var oldHead = copyCursor(origHead);
        var oldAnchor = copyCursor(origAnchor);
        var newHead, newAnchor;
        var repeat;
        if (operator) {
            this.recordLastEdit(vim, inputState);
        }
        if (inputState.repeatOverride !== undefined) {
            repeat = inputState.repeatOverride;
        }
        else {
            repeat = inputState.getRepeat();
        }
        if (repeat > 0 && motionArgs.explicitRepeat) {
            motionArgs.repeatIsExplicit = true;
        }
        else if (motionArgs.noRepeat ||
            (!motionArgs.explicitRepeat && repeat === 0)) {
            repeat = 1;
            motionArgs.repeatIsExplicit = false;
        }
        if (inputState.selectedCharacter) {
            motionArgs.selectedCharacter = operatorArgs.selectedCharacter =
                inputState.selectedCharacter;
        }
        motionArgs.repeat = repeat;
        clearInputState(cm);
        if (motion) {
            var motionResult = motions[motion](cm, origHead, motionArgs, vim, inputState);
            vim.lastMotion = motions[motion];
            if (!motionResult) {
                return;
            }
            if (motionArgs.toJumplist) {
                if (!operator && cm.ace.curOp != null)
                    cm.ace.curOp.command.scrollIntoView = "center-animate"; // ace_patch
                var jumpList = vimGlobalState.jumpList;
                var cachedCursor = jumpList.cachedCursor;
                if (cachedCursor) {
                    recordJumpPosition(cm, cachedCursor, motionResult);
                    delete jumpList.cachedCursor;
                }
                else {
                    recordJumpPosition(cm, origHead, motionResult);
                }
            }
            if (motionResult instanceof Array) {
                newAnchor = motionResult[0];
                newHead = motionResult[1];
            }
            else {
                newHead = motionResult;
            }
            if (!newHead) {
                newHead = copyCursor(origHead);
            }
            if (vim.visualMode) {
                if (!(vim.visualBlock && newHead.ch === Infinity)) {
                    newHead = clipCursorToContent(cm, newHead, oldHead);
                }
                if (newAnchor) {
                    newAnchor = clipCursorToContent(cm, newAnchor);
                }
                newAnchor = newAnchor || oldAnchor;
                sel.anchor = newAnchor;
                sel.head = newHead;
                updateCmSelection(cm);
                updateMark(cm, vim, '<', cursorIsBefore(newAnchor, newHead) ? newAnchor
                    : newHead);
                updateMark(cm, vim, '>', cursorIsBefore(newAnchor, newHead) ? newHead
                    : newAnchor);
            }
            else if (!operator) {
                if (cm.ace.curOp)
                    cm.ace.curOp.vimDialogScroll = "center-animate"; // ace_patch
                newHead = clipCursorToContent(cm, newHead, oldHead);
                cm.setCursor(newHead.line, newHead.ch);
            }
        }
        if (operator) {
            if (operatorArgs.lastSel) {
                newAnchor = oldAnchor;
                var lastSel = operatorArgs.lastSel;
                var lineOffset = Math.abs(lastSel.head.line - lastSel.anchor.line);
                var chOffset = Math.abs(lastSel.head.ch - lastSel.anchor.ch);
                if (lastSel.visualLine) {
                    newHead = new Pos(oldAnchor.line + lineOffset, oldAnchor.ch);
                }
                else if (lastSel.visualBlock) {
                    newHead = new Pos(oldAnchor.line + lineOffset, oldAnchor.ch + chOffset);
                }
                else if (lastSel.head.line == lastSel.anchor.line) {
                    newHead = new Pos(oldAnchor.line, oldAnchor.ch + chOffset);
                }
                else {
                    newHead = new Pos(oldAnchor.line + lineOffset, oldAnchor.ch);
                }
                vim.visualMode = true;
                vim.visualLine = lastSel.visualLine;
                vim.visualBlock = lastSel.visualBlock;
                sel = vim.sel = {
                    anchor: newAnchor,
                    head: newHead
                };
                updateCmSelection(cm);
            }
            else if (vim.visualMode) {
                operatorArgs.lastSel = {
                    anchor: copyCursor(sel.anchor),
                    head: copyCursor(sel.head),
                    visualBlock: vim.visualBlock,
                    visualLine: vim.visualLine
                };
            }
            var curStart, curEnd, linewise, mode;
            var cmSel;
            if (vim.visualMode) {
                curStart = cursorMin(sel.head, sel.anchor);
                curEnd = cursorMax(sel.head, sel.anchor);
                linewise = vim.visualLine || operatorArgs.linewise;
                mode = vim.visualBlock ? 'block' :
                    linewise ? 'line' :
                        'char';
                var newPositions = updateSelectionForSurrogateCharacters(cm, curStart, curEnd);
                cmSel = makeCmSelection(cm, {
                    anchor: newPositions.start,
                    head: newPositions.end
                }, mode);
                if (linewise) {
                    var ranges = cmSel.ranges;
                    if (mode == 'block') {
                        for (var i = 0; i < ranges.length; i++) {
                            ranges[i].head.ch = lineLength(cm, ranges[i].head.line);
                        }
                    }
                    else if (mode == 'line') {
                        ranges[0].head = new Pos(ranges[0].head.line + 1, 0);
                    }
                }
            }
            else {
                curStart = copyCursor(newAnchor || oldAnchor);
                curEnd = copyCursor(newHead || oldHead);
                if (cursorIsBefore(curEnd, curStart)) {
                    var tmp = curStart;
                    curStart = curEnd;
                    curEnd = tmp;
                }
                linewise = motionArgs.linewise || operatorArgs.linewise;
                if (linewise) {
                    expandSelectionToLine(cm, curStart, curEnd);
                }
                else if (motionArgs.forward) {
                    clipToLine(cm, curStart, curEnd);
                }
                mode = 'char';
                var exclusive = !motionArgs.inclusive || linewise;
                var newPositions = updateSelectionForSurrogateCharacters(cm, curStart, curEnd);
                cmSel = makeCmSelection(cm, {
                    anchor: newPositions.start,
                    head: newPositions.end
                }, mode, exclusive);
            }
            cm.setSelections(cmSel.ranges, cmSel.primary);
            vim.lastMotion = null;
            operatorArgs.repeat = repeat; // For indent in visual mode.
            operatorArgs.registerName = registerName;
            operatorArgs.linewise = linewise;
            var operatorMoveTo = operators[operator](cm, operatorArgs, cmSel.ranges, oldAnchor, newHead);
            if (vim.visualMode) {
                exitVisualMode(cm, operatorMoveTo != null);
            }
            if (operatorMoveTo) {
                cm.setCursor(operatorMoveTo);
            }
        }
    },
    recordLastEdit: function (vim, inputState, actionCommand) {
        var macroModeState = vimGlobalState.macroModeState;
        if (macroModeState.isPlaying) {
            return;
        }
        vim.lastEditInputState = inputState;
        vim.lastEditActionCommand = actionCommand;
        macroModeState.lastInsertModeChanges.changes = [];
        macroModeState.lastInsertModeChanges.expectCursorActivityForChange = false;
        macroModeState.lastInsertModeChanges.visualBlock = vim.visualBlock ? vim.sel.head.line - vim.sel.anchor.line : 0;
    }
};
var motions = {
    moveToTopLine: function (cm, _head, motionArgs) {
        var line = getUserVisibleLines(cm).top + motionArgs.repeat - 1;
        return new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
    },
    moveToMiddleLine: function (cm) {
        var range = getUserVisibleLines(cm);
        var line = Math.floor((range.top + range.bottom) * 0.5);
        return new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
    },
    moveToBottomLine: function (cm, _head, motionArgs) {
        var line = getUserVisibleLines(cm).bottom - motionArgs.repeat + 1;
        return new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
    },
    expandToLine: function (_cm, head, motionArgs) {
        var cur = head;
        return new Pos(cur.line + motionArgs.repeat - 1, Infinity);
    },
    findNext: function (cm, _head, motionArgs) {
        var state = getSearchState(cm);
        var query = state.getQuery();
        if (!query) {
            return;
        }
        var prev = !motionArgs.forward;
        prev = (state.isReversed()) ? !prev : prev;
        highlightSearchMatches(cm, query);
        return findNext(cm, prev /** prev */, query, motionArgs.repeat);
    },
    findAndSelectNextInclusive: function (cm, _head, motionArgs, vim, prevInputState) {
        var state = getSearchState(cm);
        var query = state.getQuery();
        if (!query) {
            return;
        }
        var prev = !motionArgs.forward;
        prev = (state.isReversed()) ? !prev : prev;
        var next = findNextFromAndToInclusive(cm, prev, query, motionArgs.repeat, vim);
        if (!next) {
            return;
        }
        if (prevInputState.operator) {
            return next;
        }
        var from = next[0];
        var to = new Pos(next[1].line, next[1].ch - 1);
        if (vim.visualMode) {
            if (vim.visualLine || vim.visualBlock) {
                vim.visualLine = false;
                vim.visualBlock = false;
                CodeMirror.signal(cm, "vim-mode-change", { mode: "visual", subMode: "" });
            }
            var anchor = vim.sel.anchor;
            if (anchor) {
                if (state.isReversed()) {
                    if (motionArgs.forward) {
                        return [anchor, from];
                    }
                    return [anchor, to];
                }
                else {
                    if (motionArgs.forward) {
                        return [anchor, to];
                    }
                    return [anchor, from];
                }
            }
        }
        else {
            vim.visualMode = true;
            vim.visualLine = false;
            vim.visualBlock = false;
            CodeMirror.signal(cm, "vim-mode-change", { mode: "visual", subMode: "" });
        }
        return prev ? [to, from] : [from, to];
    },
    goToMark: function (cm, _head, motionArgs, vim) {
        var pos = getMarkPos(cm, vim, motionArgs.selectedCharacter);
        if (pos) {
            return motionArgs.linewise ? { line: pos.line, ch: findFirstNonWhiteSpaceCharacter(cm.getLine(pos.line)) } : pos;
        }
        return null;
    },
    moveToOtherHighlightedEnd: function (cm, _head, motionArgs, vim) {
        if (vim.visualBlock && motionArgs.sameLine) {
            var sel = vim.sel;
            return [
                clipCursorToContent(cm, new Pos(sel.anchor.line, sel.head.ch)),
                clipCursorToContent(cm, new Pos(sel.head.line, sel.anchor.ch))
            ];
        }
        else {
            return ([vim.sel.head, vim.sel.anchor]);
        }
    },
    jumpToMark: function (cm, head, motionArgs, vim) {
        var best = head;
        for (var i = 0; i < motionArgs.repeat; i++) {
            var cursor = best;
            for (var key in vim.marks) {
                if (!isLowerCase(key)) {
                    continue;
                }
                var mark = vim.marks[key].find();
                var isWrongDirection = (motionArgs.forward) ?
                    cursorIsBefore(mark, cursor) : cursorIsBefore(cursor, mark);
                if (isWrongDirection) {
                    continue;
                }
                if (motionArgs.linewise && (mark.line == cursor.line)) {
                    continue;
                }
                var equal = cursorEqual(cursor, best);
                var between = (motionArgs.forward) ?
                    cursorIsBetween(cursor, mark, best) :
                    cursorIsBetween(best, mark, cursor);
                if (equal || between) {
                    best = mark;
                }
            }
        }
        if (motionArgs.linewise) {
            best = new Pos(best.line, findFirstNonWhiteSpaceCharacter(cm.getLine(best.line)));
        }
        return best;
    },
    moveByCharacters: function (_cm, head, motionArgs) {
        var cur = head;
        var repeat = motionArgs.repeat;
        var ch = motionArgs.forward ? cur.ch + repeat : cur.ch - repeat;
        return new Pos(cur.line, ch);
    },
    moveByLines: function (cm, head, motionArgs, vim) {
        var cur = head;
        var endCh = cur.ch;
        switch (vim.lastMotion) {
            case this.moveByLines:
            case this.moveByDisplayLines:
            case this.moveByScroll:
            case this.moveToColumn:
            case this.moveToEol:
                endCh = vim.lastHPos;
                break;
            default:
                vim.lastHPos = endCh;
        }
        var repeat = motionArgs.repeat + (motionArgs.repeatOffset || 0);
        var line = motionArgs.forward ? cur.line + repeat : cur.line - repeat;
        var first = cm.firstLine();
        var last = cm.lastLine();
        if (line < first && cur.line == first) {
            return this.moveToStartOfLine(cm, head, motionArgs, vim);
        }
        else if (line > last && cur.line == last) {
            return moveToEol(cm, head, motionArgs, vim, true);
        }
        var fold = cm.ace.session.getFoldLine(line);
        if (fold) {
            if (motionArgs.forward) {
                if (line > fold.start.row)
                    line = fold.end.row + 1;
            }
            else {
                line = fold.start.row;
            }
        }
        if (motionArgs.toFirstChar) {
            endCh = findFirstNonWhiteSpaceCharacter(cm.getLine(line));
            vim.lastHPos = endCh;
        }
        vim.lastHSPos = cm.charCoords(new Pos(line, endCh), 'div').left;
        return new Pos(line, endCh);
    },
    moveByDisplayLines: function (cm, head, motionArgs, vim) {
        var cur = head;
        switch (vim.lastMotion) {
            case this.moveByDisplayLines:
            case this.moveByScroll:
            case this.moveByLines:
            case this.moveToColumn:
            case this.moveToEol:
                break;
            default:
                vim.lastHSPos = cm.charCoords(cur, 'div').left;
        }
        var repeat = motionArgs.repeat;
        var res = cm.findPosV(cur, (motionArgs.forward ? repeat : -repeat), 'line', vim.lastHSPos);
        if (res.hitSide) {
            if (motionArgs.forward) {
                var lastCharCoords = cm.charCoords(res, 'div');
                var goalCoords = { top: lastCharCoords.top + 8, left: vim.lastHSPos };
                var res = cm.coordsChar(goalCoords, 'div');
            }
            else {
                var resCoords = cm.charCoords(new Pos(cm.firstLine(), 0), 'div');
                resCoords.left = vim.lastHSPos;
                res = cm.coordsChar(resCoords, 'div');
            }
        }
        vim.lastHPos = res.ch;
        return res;
    },
    moveByPage: function (cm, head, motionArgs) {
        var curStart = head;
        var repeat = motionArgs.repeat;
        return cm.findPosV(curStart, (motionArgs.forward ? repeat : -repeat), 'page');
    },
    moveByParagraph: function (cm, head, motionArgs) {
        var dir = motionArgs.forward ? 1 : -1;
        return findParagraph(cm, head, motionArgs.repeat, dir);
    },
    moveBySentence: function (cm, head, motionArgs) {
        var dir = motionArgs.forward ? 1 : -1;
        return findSentence(cm, head, motionArgs.repeat, dir);
    },
    moveByScroll: function (cm, head, motionArgs, vim) {
        var scrollbox = cm.getScrollInfo();
        var curEnd = null;
        var repeat = motionArgs.repeat;
        if (!repeat) {
            repeat = scrollbox.clientHeight / (2 * cm.defaultTextHeight());
        }
        var orig = cm.charCoords(head, 'local');
        motionArgs.repeat = repeat;
        curEnd = motions.moveByDisplayLines(cm, head, motionArgs, vim);
        if (!curEnd) {
            return null;
        }
        var dest = cm.charCoords(curEnd, 'local');
        cm.scrollTo(null, scrollbox.top + dest.top - orig.top);
        return curEnd;
    },
    moveByWords: function (cm, head, motionArgs) {
        return moveToWord(cm, head, motionArgs.repeat, !!motionArgs.forward, !!motionArgs.wordEnd, !!motionArgs.bigWord);
    },
    moveTillCharacter: function (cm, _head, motionArgs) {
        var repeat = motionArgs.repeat;
        var curEnd = moveToCharacter(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter);
        var increment = motionArgs.forward ? -1 : 1;
        recordLastCharacterSearch(increment, motionArgs);
        if (!curEnd)
            return null;
        curEnd.ch += increment;
        return curEnd;
    },
    moveToCharacter: function (cm, head, motionArgs) {
        var repeat = motionArgs.repeat;
        recordLastCharacterSearch(0, motionArgs);
        return moveToCharacter(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter) || head;
    },
    moveToSymbol: function (cm, head, motionArgs) {
        var repeat = motionArgs.repeat;
        return findSymbol(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter) || head;
    },
    moveToColumn: function (cm, head, motionArgs, vim) {
        var repeat = motionArgs.repeat;
        vim.lastHPos = repeat - 1;
        vim.lastHSPos = cm.charCoords(head, 'div').left;
        return moveToColumn(cm, repeat);
    },
    moveToEol: function (cm, head, motionArgs, vim) {
        return moveToEol(cm, head, motionArgs, vim, false);
    },
    moveToFirstNonWhiteSpaceCharacter: function (cm, head) {
        var cursor = head;
        return new Pos(cursor.line, findFirstNonWhiteSpaceCharacter(cm.getLine(cursor.line)));
    },
    moveToMatchedSymbol: function (cm, head) {
        var cursor = head;
        var line = cursor.line;
        var ch = cursor.ch;
        var lineText = cm.getLine(line);
        var symbol;
        for (; ch < lineText.length; ch++) {
            symbol = lineText.charAt(ch);
            if (symbol && isMatchableSymbol(symbol)) {
                var style = cm.getTokenTypeAt(new Pos(line, ch + 1));
                if (style !== "string" && style !== "comment") {
                    break;
                }
            }
        }
        if (ch < lineText.length) {
            var re = /[<>]/.test(lineText[ch]) ? /[(){}[\]<>]/ : /[(){}[\]]/; //ace_patch?
            var matched = cm.findMatchingBracket(new Pos(line, ch + 1), { bracketRegex: re });
            return matched.to;
        }
        else {
            return cursor;
        }
    },
    moveToStartOfLine: function (_cm, head) {
        return new Pos(head.line, 0);
    },
    moveToLineOrEdgeOfDocument: function (cm, _head, motionArgs) {
        var lineNum = motionArgs.forward ? cm.lastLine() : cm.firstLine();
        if (motionArgs.repeatIsExplicit) {
            lineNum = motionArgs.repeat - cm.getOption('firstLineNumber');
        }
        return new Pos(lineNum, findFirstNonWhiteSpaceCharacter(cm.getLine(lineNum)));
    },
    moveToStartOfDisplayLine: function (cm) {
        cm.execCommand("goLineLeft");
        return cm.getCursor();
    },
    moveToEndOfDisplayLine: function (cm) {
        cm.execCommand("goLineRight");
        var head = cm.getCursor();
        if (head.sticky == "before")
            head.ch--;
        return head;
    },
    textObjectManipulation: function (cm, head, motionArgs, vim) {
        var mirroredPairs = { '(': ')', ')': '(',
            '{': '}', '}': '{',
            '[': ']', ']': '[',
            '<': '>', '>': '<' };
        var selfPaired = { '\'': true, '"': true, '`': true };
        var character = motionArgs.selectedCharacter;
        if (character == 'b') {
            character = '(';
        }
        else if (character == 'B') {
            character = '{';
        }
        var inclusive = !motionArgs.textObjectInner;
        var tmp;
        if (mirroredPairs[character]) {
            tmp = selectCompanionObject(cm, head, character, inclusive);
        }
        else if (selfPaired[character]) {
            tmp = findBeginningAndEnd(cm, head, character, inclusive);
        }
        else if (character === 'W') {
            tmp = expandWordUnderCursor(cm, inclusive, true /** forward */, true /** bigWord */);
        }
        else if (character === 'w') {
            tmp = expandWordUnderCursor(cm, inclusive, true /** forward */, false /** bigWord */);
        }
        else if (character === 'p') {
            tmp = findParagraph(cm, head, motionArgs.repeat, 0, inclusive);
            motionArgs.linewise = true;
            if (vim.visualMode) {
                if (!vim.visualLine) {
                    vim.visualLine = true;
                }
            }
            else {
                var operatorArgs = vim.inputState.operatorArgs;
                if (operatorArgs) {
                    operatorArgs.linewise = true;
                }
                tmp.end.line--;
            }
        }
        else if (character === 't') {
            tmp = expandTagUnderCursor(cm, head, inclusive);
        }
        else if (character === 's') {
            var content = cm.getLine(head.line);
            if (head.ch > 0 && isEndOfSentenceSymbol(content[head.ch])) {
                head.ch -= 1;
            }
            var end = getSentence(cm, head, motionArgs.repeat, 1, inclusive);
            var start = getSentence(cm, head, motionArgs.repeat, -1, inclusive);
            if (isWhiteSpaceString(cm.getLine(start.line)[start.ch])
                && isWhiteSpaceString(cm.getLine(end.line)[end.ch - 1])) {
                start = { line: start.line, ch: start.ch + 1 };
            }
            tmp = { start: start, end: end };
        }
        else {
            return null;
        }
        if (!cm.state.vim.visualMode) {
            return [tmp.start, tmp.end];
        }
        else {
            return expandSelection(cm, tmp.start, tmp.end);
        }
    },
    repeatLastCharacterSearch: function (cm, head, motionArgs) {
        var lastSearch = vimGlobalState.lastCharacterSearch;
        var repeat = motionArgs.repeat;
        var forward = motionArgs.forward === lastSearch.forward;
        var increment = (lastSearch.increment ? 1 : 0) * (forward ? -1 : 1);
        cm.moveH(-increment, 'char');
        motionArgs.inclusive = forward ? true : false;
        var curEnd = moveToCharacter(cm, repeat, forward, lastSearch.selectedCharacter);
        if (!curEnd) {
            cm.moveH(increment, 'char');
            return head;
        }
        curEnd.ch += increment;
        return curEnd;
    }
};
function defineMotion(name, fn) {
    motions[name] = fn;
}
function fillArray(val, times) {
    var arr = [];
    for (var i = 0; i < times; i++) {
        arr.push(val);
    }
    return arr;
}
var operators = {
    change: function (cm, args, ranges) {
        var finalHead, text;
        var vim = cm.state.vim;
        var anchor = ranges[0].anchor, head = ranges[0].head;
        if (!vim.visualMode) {
            text = cm.getRange(anchor, head);
            var lastState = vim.lastEditInputState || {};
            if (lastState.motion == "moveByWords" && !isWhiteSpaceString(text)) {
                var match = (/\s+$/).exec(text);
                if (match && lastState.motionArgs && lastState.motionArgs.forward) {
                    head = offsetCursor(head, 0, -match[0].length);
                    text = text.slice(0, -match[0].length);
                }
            }
            var prevLineEnd = new Pos(anchor.line - 1, Number.MAX_VALUE);
            var wasLastLine = cm.firstLine() == cm.lastLine();
            if (head.line > cm.lastLine() && args.linewise && !wasLastLine) {
                cm.replaceRange('', prevLineEnd, head);
            }
            else {
                cm.replaceRange('', anchor, head);
            }
            if (args.linewise) {
                if (!wasLastLine) {
                    cm.setCursor(prevLineEnd);
                    CodeMirror.commands.newlineAndIndent(cm);
                }
                anchor.ch = Number.MAX_VALUE;
            }
            finalHead = anchor;
        }
        else if (args.fullLine) {
            head.ch = Number.MAX_VALUE;
            head.line--;
            cm.setSelection(anchor, head);
            text = cm.getSelection();
            cm.replaceSelection("");
            finalHead = anchor;
        }
        else {
            text = cm.getSelection();
            var replacement = fillArray('', ranges.length);
            cm.replaceSelections(replacement);
            finalHead = cursorMin(ranges[0].head, ranges[0].anchor);
        }
        vimGlobalState.registerController.pushText(args.registerName, 'change', text, args.linewise, ranges.length > 1);
        actions.enterInsertMode(cm, { head: finalHead }, cm.state.vim);
    },
    'delete': function (cm, args, ranges) {
        var finalHead, text;
        var vim = cm.state.vim;
        if (!vim.visualBlock) {
            var anchor = ranges[0].anchor, head = ranges[0].head;
            if (args.linewise &&
                head.line != cm.firstLine() &&
                anchor.line == cm.lastLine() &&
                anchor.line == head.line - 1) {
                if (anchor.line == cm.firstLine()) {
                    anchor.ch = 0;
                }
                else {
                    anchor = new Pos(anchor.line - 1, lineLength(cm, anchor.line - 1));
                }
            }
            text = cm.getRange(anchor, head);
            cm.replaceRange('', anchor, head);
            finalHead = anchor;
            if (args.linewise) {
                finalHead = motions.moveToFirstNonWhiteSpaceCharacter(cm, anchor);
            }
        }
        else {
            text = cm.getSelection();
            var replacement = fillArray('', ranges.length);
            cm.replaceSelections(replacement);
            finalHead = cursorMin(ranges[0].head, ranges[0].anchor);
        }
        vimGlobalState.registerController.pushText(args.registerName, 'delete', text, args.linewise, vim.visualBlock);
        return clipCursorToContent(cm, finalHead);
    },
    indent: function (cm, args, ranges) {
        var vim = cm.state.vim;
        if (cm.indentMore) {
            var repeat = (vim.visualMode) ? args.repeat : 1;
            for (var j = 0; j < repeat; j++) {
                if (args.indentRight)
                    cm.indentMore();
                else
                    cm.indentLess();
            }
        }
        else {
            var startLine = ranges[0].anchor.line;
            var endLine = vim.visualBlock ?
                ranges[ranges.length - 1].anchor.line :
                ranges[0].head.line;
            var repeat = (vim.visualMode) ? args.repeat : 1;
            if (args.linewise) {
                endLine--;
            }
            for (var i = startLine; i <= endLine; i++) {
                for (var j = 0; j < repeat; j++) {
                    cm.indentLine(i, args.indentRight);
                }
            }
        }
        return motions.moveToFirstNonWhiteSpaceCharacter(cm, ranges[0].anchor);
    },
    indentAuto: function (cm, _args, ranges) {
        if (ranges.length > 1) { // ace_patch
            cm.setSelection(ranges[0].anchor, ranges[ranges.length - 1].head);
        }
        cm.execCommand("indentAuto");
        return motions.moveToFirstNonWhiteSpaceCharacter(cm, ranges[0].anchor);
    },
    changeCase: function (cm, args, ranges, oldAnchor, newHead) {
        var selections = cm.getSelections();
        var swapped = [];
        var toLower = args.toLower;
        for (var j = 0; j < selections.length; j++) {
            var toSwap = selections[j];
            var text = '';
            if (toLower === true) {
                text = toSwap.toLowerCase();
            }
            else if (toLower === false) {
                text = toSwap.toUpperCase();
            }
            else {
                for (var i = 0; i < toSwap.length; i++) {
                    var character = toSwap.charAt(i);
                    text += isUpperCase(character) ? character.toLowerCase() :
                        character.toUpperCase();
                }
            }
            swapped.push(text);
        }
        cm.replaceSelections(swapped);
        if (args.shouldMoveCursor) {
            return newHead;
        }
        else if (!cm.state.vim.visualMode && args.linewise && ranges[0].anchor.line + 1 == ranges[0].head.line) {
            return motions.moveToFirstNonWhiteSpaceCharacter(cm, oldAnchor);
        }
        else if (args.linewise) {
            return oldAnchor;
        }
        else {
            return cursorMin(ranges[0].anchor, ranges[0].head);
        }
    },
    yank: function (cm, args, ranges, oldAnchor) {
        var vim = cm.state.vim;
        var text = cm.getSelection();
        var endPos = vim.visualMode
            ? cursorMin(vim.sel.anchor, vim.sel.head, ranges[0].head, ranges[0].anchor)
            : oldAnchor;
        vimGlobalState.registerController.pushText(args.registerName, 'yank', text, args.linewise, vim.visualBlock);
        return endPos;
    }
};
function defineOperator(name, fn) {
    operators[name] = fn;
}
var actions = {
    jumpListWalk: function (cm, actionArgs, vim) {
        if (vim.visualMode) {
            return;
        }
        var repeat = actionArgs.repeat;
        var forward = actionArgs.forward;
        var jumpList = vimGlobalState.jumpList;
        var mark = jumpList.move(cm, forward ? repeat : -repeat);
        var markPos = mark ? mark.find() : undefined;
        markPos = markPos ? markPos : cm.getCursor();
        cm.setCursor(markPos);
        cm.ace.curOp.command.scrollIntoView = "center-animate"; // ace_patch
    },
    scroll: function (cm, actionArgs, vim) {
        if (vim.visualMode) {
            return;
        }
        var repeat = actionArgs.repeat || 1;
        var lineHeight = cm.defaultTextHeight();
        var top = cm.getScrollInfo().top;
        var delta = lineHeight * repeat;
        var newPos = actionArgs.forward ? top + delta : top - delta;
        var cursor = copyCursor(cm.getCursor());
        var cursorCoords = cm.charCoords(cursor, 'local');
        if (actionArgs.forward) {
            if (newPos > cursorCoords.top) {
                cursor.line += (newPos - cursorCoords.top) / lineHeight;
                cursor.line = Math.ceil(cursor.line);
                cm.setCursor(cursor);
                cursorCoords = cm.charCoords(cursor, 'local');
                cm.scrollTo(null, cursorCoords.top);
            }
            else {
                cm.scrollTo(null, newPos);
            }
        }
        else {
            var newBottom = newPos + cm.getScrollInfo().clientHeight;
            if (newBottom < cursorCoords.bottom) {
                cursor.line -= (cursorCoords.bottom - newBottom) / lineHeight;
                cursor.line = Math.floor(cursor.line);
                cm.setCursor(cursor);
                cursorCoords = cm.charCoords(cursor, 'local');
                cm.scrollTo(null, cursorCoords.bottom - cm.getScrollInfo().clientHeight);
            }
            else {
                cm.scrollTo(null, newPos);
            }
        }
    },
    scrollToCursor: function (cm, actionArgs) {
        var lineNum = cm.getCursor().line;
        var charCoords = cm.charCoords(new Pos(lineNum, 0), 'local');
        var height = cm.getScrollInfo().clientHeight;
        var y = charCoords.top;
        switch (actionArgs.position) {
            case 'center':
                y = charCoords.bottom - height / 2;
                break;
            case 'bottom':
                var lineLastCharPos = new Pos(lineNum, cm.getLine(lineNum).length - 1);
                var lineLastCharCoords = cm.charCoords(lineLastCharPos, 'local');
                var lineHeight = lineLastCharCoords.bottom - y;
                y = y - height + lineHeight;
                break;
        }
        cm.scrollTo(null, y);
    },
    replayMacro: function (cm, actionArgs, vim) {
        var registerName = actionArgs.selectedCharacter;
        var repeat = actionArgs.repeat;
        var macroModeState = vimGlobalState.macroModeState;
        if (registerName == '@') {
            registerName = macroModeState.latestRegister;
        }
        else {
            macroModeState.latestRegister = registerName;
        }
        while (repeat--) {
            executeMacroRegister(cm, vim, macroModeState, registerName);
        }
    },
    enterMacroRecordMode: function (cm, actionArgs) {
        var macroModeState = vimGlobalState.macroModeState;
        var registerName = actionArgs.selectedCharacter;
        if (vimGlobalState.registerController.isValidRegister(registerName)) {
            macroModeState.enterMacroRecordMode(cm, registerName);
        }
    },
    toggleOverwrite: function (cm) {
        if (!cm.state.overwrite) {
            cm.toggleOverwrite(true);
            cm.setOption('keyMap', 'vim-replace');
            CodeMirror.signal(cm, "vim-mode-change", { mode: "replace" });
        }
        else {
            cm.toggleOverwrite(false);
            cm.setOption('keyMap', 'vim-insert');
            CodeMirror.signal(cm, "vim-mode-change", { mode: "insert" });
        }
    },
    enterInsertMode: function (cm, actionArgs, vim) {
        if (cm.getOption('readOnly')) {
            return;
        }
        vim.insertMode = true;
        vim.insertModeRepeat = actionArgs && actionArgs.repeat || 1;
        var insertAt = (actionArgs) ? actionArgs.insertAt : null;
        var sel = vim.sel;
        var head = actionArgs.head || cm.getCursor('head');
        var height = cm.listSelections().length;
        if (insertAt == 'eol') {
            head = new Pos(head.line, lineLength(cm, head.line));
        }
        else if (insertAt == 'bol') {
            head = new Pos(head.line, 0);
        }
        else if (insertAt == 'charAfter') {
            var newPosition = updateSelectionForSurrogateCharacters(cm, head, offsetCursor(head, 0, 1));
            head = newPosition.end;
        }
        else if (insertAt == 'firstNonBlank') {
            var newPosition = updateSelectionForSurrogateCharacters(cm, head, motions.moveToFirstNonWhiteSpaceCharacter(cm, head));
            head = newPosition.end;
        }
        else if (insertAt == 'startOfSelectedArea') {
            if (!vim.visualMode)
                return;
            if (!vim.visualBlock) {
                if (sel.head.line < sel.anchor.line) {
                    head = sel.head;
                }
                else {
                    head = new Pos(sel.anchor.line, 0);
                }
            }
            else {
                head = new Pos(Math.min(sel.head.line, sel.anchor.line), Math.min(sel.head.ch, sel.anchor.ch));
                height = Math.abs(sel.head.line - sel.anchor.line) + 1;
            }
        }
        else if (insertAt == 'endOfSelectedArea') {
            if (!vim.visualMode)
                return;
            if (!vim.visualBlock) {
                if (sel.head.line >= sel.anchor.line) {
                    head = offsetCursor(sel.head, 0, 1);
                }
                else {
                    head = new Pos(sel.anchor.line, 0);
                }
            }
            else {
                head = new Pos(Math.min(sel.head.line, sel.anchor.line), Math.max(sel.head.ch, sel.anchor.ch) + 1);
                height = Math.abs(sel.head.line - sel.anchor.line) + 1;
            }
        }
        else if (insertAt == 'inplace') {
            if (vim.visualMode) {
                return;
            }
        }
        else if (insertAt == 'lastEdit') {
            head = getLastEditPos(cm) || head;
        }
        cm.setOption('disableInput', false);
        if (actionArgs && actionArgs.replace) {
            cm.toggleOverwrite(true);
            cm.setOption('keyMap', 'vim-replace');
            CodeMirror.signal(cm, "vim-mode-change", { mode: "replace" });
        }
        else {
            cm.toggleOverwrite(false);
            cm.setOption('keyMap', 'vim-insert');
            CodeMirror.signal(cm, "vim-mode-change", { mode: "insert" });
        }
        if (!vimGlobalState.macroModeState.isPlaying) {
            cm.on('change', onChange);
            CodeMirror.on(cm.getInputField(), 'keydown', onKeyEventTargetKeyDown);
        }
        if (vim.visualMode) {
            exitVisualMode(cm);
        }
        selectForInsert(cm, head, height);
    },
    toggleVisualMode: function (cm, actionArgs, vim) {
        var repeat = actionArgs.repeat;
        var anchor = cm.getCursor();
        var head;
        if (!vim.visualMode) {
            vim.visualMode = true;
            vim.visualLine = !!actionArgs.linewise;
            vim.visualBlock = !!actionArgs.blockwise;
            head = clipCursorToContent(cm, new Pos(anchor.line, anchor.ch + repeat - 1));
            var newPosition = updateSelectionForSurrogateCharacters(cm, anchor, head);
            vim.sel = {
                anchor: newPosition.start,
                head: newPosition.end
            };
            CodeMirror.signal(cm, "vim-mode-change", { mode: "visual", subMode: vim.visualLine ? "linewise" : vim.visualBlock ? "blockwise" : "" });
            updateCmSelection(cm);
            updateMark(cm, vim, '<', cursorMin(anchor, head));
            updateMark(cm, vim, '>', cursorMax(anchor, head));
        }
        else if (vim.visualLine ^ actionArgs.linewise ||
            vim.visualBlock ^ actionArgs.blockwise) {
            vim.visualLine = !!actionArgs.linewise;
            vim.visualBlock = !!actionArgs.blockwise;
            CodeMirror.signal(cm, "vim-mode-change", { mode: "visual", subMode: vim.visualLine ? "linewise" : vim.visualBlock ? "blockwise" : "" });
            updateCmSelection(cm);
        }
        else {
            exitVisualMode(cm);
        }
    },
    reselectLastSelection: function (cm, _actionArgs, vim) {
        var lastSelection = vim.lastSelection;
        if (vim.visualMode) {
            updateLastSelection(cm, vim);
        }
        if (lastSelection) {
            var anchor = lastSelection.anchorMark.find();
            var head = lastSelection.headMark.find();
            if (!anchor || !head) {
                return;
            }
            vim.sel = {
                anchor: anchor,
                head: head
            };
            vim.visualMode = true;
            vim.visualLine = lastSelection.visualLine;
            vim.visualBlock = lastSelection.visualBlock;
            updateCmSelection(cm);
            updateMark(cm, vim, '<', cursorMin(anchor, head));
            updateMark(cm, vim, '>', cursorMax(anchor, head));
            CodeMirror.signal(cm, 'vim-mode-change', {
                mode: 'visual',
                subMode: vim.visualLine ? 'linewise' :
                    vim.visualBlock ? 'blockwise' : ''
            });
        }
    },
    joinLines: function (cm, actionArgs, vim) {
        var curStart, curEnd;
        if (vim.visualMode) {
            curStart = cm.getCursor('anchor');
            curEnd = cm.getCursor('head');
            if (cursorIsBefore(curEnd, curStart)) {
                var tmp = curEnd;
                curEnd = curStart;
                curStart = tmp;
            }
            curEnd.ch = lineLength(cm, curEnd.line) - 1;
        }
        else {
            var repeat = Math.max(actionArgs.repeat, 2);
            curStart = cm.getCursor();
            curEnd = clipCursorToContent(cm, new Pos(curStart.line + repeat - 1, Infinity));
        }
        var finalCh = 0;
        for (var i = curStart.line; i < curEnd.line; i++) {
            finalCh = lineLength(cm, curStart.line);
            var text = '';
            var nextStartCh = 0;
            if (!actionArgs.keepSpaces) {
                var nextLine = cm.getLine(curStart.line + 1);
                nextStartCh = nextLine.search(/\S/);
                if (nextStartCh == -1) {
                    nextStartCh = nextLine.length;
                }
                else {
                    text = " ";
                }
            }
            cm.replaceRange(text, new Pos(curStart.line, finalCh), new Pos(curStart.line + 1, nextStartCh));
        }
        var curFinalPos = clipCursorToContent(cm, new Pos(curStart.line, finalCh));
        if (vim.visualMode) {
            exitVisualMode(cm, false);
        }
        cm.setCursor(curFinalPos);
    },
    newLineAndEnterInsertMode: function (cm, actionArgs, vim) {
        vim.insertMode = true;
        var insertAt = copyCursor(cm.getCursor());
        if (insertAt.line === cm.firstLine() && !actionArgs.after) {
            cm.replaceRange('\n', new Pos(cm.firstLine(), 0));
            cm.setCursor(cm.firstLine(), 0);
        }
        else {
            insertAt.line = (actionArgs.after) ? insertAt.line :
                insertAt.line - 1;
            insertAt.ch = lineLength(cm, insertAt.line);
            cm.setCursor(insertAt);
            var newlineFn = CodeMirror.commands.newlineAndIndentContinueComment ||
                CodeMirror.commands.newlineAndIndent;
            newlineFn(cm);
        }
        this.enterInsertMode(cm, { repeat: actionArgs.repeat }, vim);
    },
    paste: function (cm, actionArgs, vim) {
        var _this = this;
        var register = vimGlobalState.registerController.getRegister(actionArgs.registerName);
        var fallback = function () {
            var text = register.toString();
            _this.continuePaste(cm, actionArgs, vim, text, register);
        };
        if (actionArgs.registerName === '+' &&
            typeof navigator !== 'undefined' &&
            typeof navigator.clipboard !== 'undefined' &&
            typeof navigator.clipboard.readText === 'function') {
            navigator.clipboard.readText().then(function (value) {
                _this.continuePaste(cm, actionArgs, vim, value, register);
            }, function () { fallback(); });
        }
        else {
            fallback();
        }
    },
    continuePaste: function (cm, actionArgs, vim, text, register) {
        var cur = copyCursor(cm.getCursor());
        if (!text) {
            return;
        }
        if (actionArgs.matchIndent) {
            var tabSize = cm.getOption("tabSize");
            var whitespaceLength = function (str) {
                var tabs = (str.split("\t").length - 1);
                var spaces = (str.split(" ").length - 1);
                return tabs * tabSize + spaces * 1;
            };
            var currentLine = cm.getLine(cm.getCursor().line);
            var indent = whitespaceLength(currentLine.match(/^\s*/)[0]);
            var chompedText = text.replace(/\n$/, '');
            var wasChomped = text !== chompedText;
            var firstIndent = whitespaceLength(text.match(/^\s*/)[0]);
            var text = chompedText.replace(/^\s*/gm, function (wspace) {
                var newIndent = indent + (whitespaceLength(wspace) - firstIndent);
                if (newIndent < 0) {
                    return "";
                }
                else if (cm.getOption("indentWithTabs")) {
                    var quotient = Math.floor(newIndent / tabSize);
                    return Array(quotient + 1).join('\t');
                }
                else {
                    return Array(newIndent + 1).join(' ');
                }
            });
            text += wasChomped ? "\n" : "";
        }
        if (actionArgs.repeat > 1) {
            var text = Array(actionArgs.repeat + 1).join(text);
        }
        var linewise = register.linewise;
        var blockwise = register.blockwise;
        if (blockwise) {
            text = text.split('\n');
            if (linewise) {
                text.pop();
            }
            for (var i = 0; i < text.length; i++) {
                text[i] = (text[i] == '') ? ' ' : text[i];
            }
            cur.ch += actionArgs.after ? 1 : 0;
            cur.ch = Math.min(lineLength(cm, cur.line), cur.ch);
        }
        else if (linewise) {
            if (vim.visualMode) {
                text = vim.visualLine ? text.slice(0, -1) : '\n' + text.slice(0, text.length - 1) + '\n';
            }
            else if (actionArgs.after) {
                text = '\n' + text.slice(0, text.length - 1);
                cur.ch = lineLength(cm, cur.line);
            }
            else {
                cur.ch = 0;
            }
        }
        else {
            cur.ch += actionArgs.after ? 1 : 0;
        }
        var curPosFinal;
        var idx;
        if (vim.visualMode) {
            vim.lastPastedText = text;
            var lastSelectionCurEnd;
            var selectedArea = getSelectedAreaRange(cm, vim);
            var selectionStart = selectedArea[0];
            var selectionEnd = selectedArea[1];
            var selectedText = cm.getSelection();
            var selections = cm.listSelections();
            var emptyStrings = new Array(selections.length).join('1').split('1');
            if (vim.lastSelection) {
                lastSelectionCurEnd = vim.lastSelection.headMark.find();
            }
            vimGlobalState.registerController.unnamedRegister.setText(selectedText);
            if (blockwise) {
                cm.replaceSelections(emptyStrings);
                selectionEnd = new Pos(selectionStart.line + text.length - 1, selectionStart.ch);
                cm.setCursor(selectionStart);
                selectBlock(cm, selectionEnd);
                cm.replaceSelections(text);
                curPosFinal = selectionStart;
            }
            else if (vim.visualBlock) {
                cm.replaceSelections(emptyStrings);
                cm.setCursor(selectionStart);
                cm.replaceRange(text, selectionStart, selectionStart);
                curPosFinal = selectionStart;
            }
            else {
                cm.replaceRange(text, selectionStart, selectionEnd);
                curPosFinal = cm.posFromIndex(cm.indexFromPos(selectionStart) + text.length - 1);
            }
            if (lastSelectionCurEnd) {
                vim.lastSelection.headMark = cm.setBookmark(lastSelectionCurEnd);
            }
            if (linewise) {
                curPosFinal.ch = 0;
            }
        }
        else {
            if (blockwise) {
                cm.setCursor(cur);
                for (var i = 0; i < text.length; i++) {
                    var line = cur.line + i;
                    if (line > cm.lastLine()) {
                        cm.replaceRange('\n', new Pos(line, 0));
                    }
                    var lastCh = lineLength(cm, line);
                    if (lastCh < cur.ch) {
                        extendLineToColumn(cm, line, cur.ch);
                    }
                }
                cm.setCursor(cur);
                selectBlock(cm, new Pos(cur.line + text.length - 1, cur.ch));
                cm.replaceSelections(text);
                curPosFinal = cur;
            }
            else {
                cm.replaceRange(text, cur);
                if (linewise && actionArgs.after) {
                    curPosFinal = new Pos(cur.line + 1, findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line + 1)));
                }
                else if (linewise && !actionArgs.after) {
                    curPosFinal = new Pos(cur.line, findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line)));
                }
                else if (!linewise && actionArgs.after) {
                    idx = cm.indexFromPos(cur);
                    curPosFinal = cm.posFromIndex(idx + text.length - 1);
                }
                else {
                    idx = cm.indexFromPos(cur);
                    curPosFinal = cm.posFromIndex(idx + text.length);
                }
            }
        }
        if (vim.visualMode) {
            exitVisualMode(cm, false);
        }
        cm.setCursor(curPosFinal);
    },
    undo: function (cm, actionArgs) {
        cm.operation(function () {
            repeatFn(cm, CodeMirror.commands.undo, actionArgs.repeat)();
            cm.setCursor(clipCursorToContent(cm, cm.getCursor('start')));
        });
    },
    redo: function (cm, actionArgs) {
        repeatFn(cm, CodeMirror.commands.redo, actionArgs.repeat)();
    },
    setRegister: function (_cm, actionArgs, vim) {
        vim.inputState.registerName = actionArgs.selectedCharacter;
    },
    setMark: function (cm, actionArgs, vim) {
        var markName = actionArgs.selectedCharacter;
        updateMark(cm, vim, markName, cm.getCursor());
    },
    replace: function (cm, actionArgs, vim) {
        var replaceWith = actionArgs.selectedCharacter;
        var curStart = cm.getCursor();
        var replaceTo;
        var curEnd;
        var selections = cm.listSelections();
        if (vim.visualMode) {
            curStart = cm.getCursor('start');
            curEnd = cm.getCursor('end');
        }
        else {
            var line = cm.getLine(curStart.line);
            replaceTo = curStart.ch + actionArgs.repeat;
            if (replaceTo > line.length) {
                replaceTo = line.length;
            }
            curEnd = new Pos(curStart.line, replaceTo);
        }
        var newPositions = updateSelectionForSurrogateCharacters(cm, curStart, curEnd);
        curStart = newPositions.start;
        curEnd = newPositions.end;
        if (replaceWith == '\n') {
            if (!vim.visualMode)
                cm.replaceRange('', curStart, curEnd);
            (CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent)(cm);
        }
        else {
            var replaceWithStr = cm.getRange(curStart, curEnd);
            replaceWithStr = replaceWithStr.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, replaceWith);
            replaceWithStr = replaceWithStr.replace(/[^\n]/g, replaceWith);
            if (vim.visualBlock) {
                var spaces = new Array(cm.getOption("tabSize") + 1).join(' ');
                replaceWithStr = cm.getSelection();
                replaceWithStr = replaceWithStr.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, replaceWith);
                replaceWithStr = replaceWithStr.replace(/\t/g, spaces).replace(/[^\n]/g, replaceWith).split('\n');
                cm.replaceSelections(replaceWithStr);
            }
            else {
                cm.replaceRange(replaceWithStr, curStart, curEnd);
            }
            if (vim.visualMode) {
                curStart = cursorIsBefore(selections[0].anchor, selections[0].head) ?
                    selections[0].anchor : selections[0].head;
                cm.setCursor(curStart);
                exitVisualMode(cm, false);
            }
            else {
                cm.setCursor(offsetCursor(curEnd, 0, -1));
            }
        }
    },
    incrementNumberToken: function (cm, actionArgs) {
        var cur = cm.getCursor();
        var lineStr = cm.getLine(cur.line);
        var re = /(-?)(?:(0x)([\da-f]+)|(0b|0|)(\d+))/gi;
        var match;
        var start;
        var end;
        var numberStr;
        while ((match = re.exec(lineStr)) !== null) {
            start = match.index;
            end = start + match[0].length;
            if (cur.ch < end)
                break;
        }
        if (!actionArgs.backtrack && (end <= cur.ch))
            return;
        if (match) {
            var baseStr = match[2] || match[4];
            var digits = match[3] || match[5];
            var increment = actionArgs.increase ? 1 : -1;
            var base = { '0b': 2, '0': 8, '': 10, '0x': 16 }[baseStr.toLowerCase()];
            var number = parseInt(match[1] + digits, base) + (increment * actionArgs.repeat);
            numberStr = number.toString(base);
            var zeroPadding = baseStr ? new Array(digits.length - numberStr.length + 1 + match[1].length).join('0') : '';
            if (numberStr.charAt(0) === '-') {
                numberStr = '-' + baseStr + zeroPadding + numberStr.substr(1);
            }
            else {
                numberStr = baseStr + zeroPadding + numberStr;
            }
            var from = new Pos(cur.line, start);
            var to = new Pos(cur.line, end);
            cm.replaceRange(numberStr, from, to);
        }
        else {
            return;
        }
        cm.setCursor(new Pos(cur.line, start + numberStr.length - 1));
    },
    repeatLastEdit: function (cm, actionArgs, vim) {
        var lastEditInputState = vim.lastEditInputState;
        if (!lastEditInputState) {
            return;
        }
        var repeat = actionArgs.repeat;
        if (repeat && actionArgs.repeatIsExplicit) {
            vim.lastEditInputState.repeatOverride = repeat;
        }
        else {
            repeat = vim.lastEditInputState.repeatOverride || repeat;
        }
        repeatLastEdit(cm, vim, repeat, false /** repeatForInsert */);
    },
    indent: function (cm, actionArgs) {
        cm.indentLine(cm.getCursor().line, actionArgs.indentRight);
    },
    exitInsertMode: exitInsertMode
};
function defineAction(name, fn) {
    actions[name] = fn;
}
function clipCursorToContent(cm, cur, oldCur) {
    var vim = cm.state.vim;
    var includeLineBreak = vim.insertMode || vim.visualMode;
    var line = Math.min(Math.max(cm.firstLine(), cur.line), cm.lastLine());
    var text = cm.getLine(line);
    var maxCh = text.length - 1 + !!includeLineBreak;
    var ch = Math.min(Math.max(0, cur.ch), maxCh);
    var charCode = text.charCodeAt(ch);
    if (0xDC00 < charCode && charCode < 0xDFFF) {
        var direction = 1;
        if (oldCur && oldCur.line == line) {
            if (oldCur.ch > ch) {
                direction = -1;
            }
        }
        ch += direction;
        if (ch > maxCh)
            ch -= 2;
    }
    return new Pos(line, ch);
}
function copyArgs(args) {
    var ret = {};
    for (var prop in args) {
        if (args.hasOwnProperty(prop)) {
            ret[prop] = args[prop];
        }
    }
    return ret;
}
function offsetCursor(cur, offsetLine, offsetCh) {
    if (typeof offsetLine === 'object') {
        offsetCh = offsetLine.ch;
        offsetLine = offsetLine.line;
    }
    return new Pos(cur.line + offsetLine, cur.ch + offsetCh);
}
function commandMatches(keys, keyMap, context, inputState) {
    var match, partial = [], full = [];
    for (var i = 0; i < keyMap.length; i++) {
        var command = keyMap[i];
        if (context == 'insert' && command.context != 'insert' ||
            command.context && command.context != context ||
            inputState.operator && command.type == 'action' ||
            !(match = commandMatch(keys, command.keys))) {
            continue;
        }
        if (match == 'partial') {
            partial.push(command);
        }
        if (match == 'full') {
            full.push(command);
        }
    }
    return {
        partial: partial.length && partial,
        full: full.length && full
    };
}
function commandMatch(pressed, mapped) {
    if (mapped.slice(-11) == '<character>') {
        var prefixLen = mapped.length - 11;
        var pressedPrefix = pressed.slice(0, prefixLen);
        var mappedPrefix = mapped.slice(0, prefixLen);
        return pressedPrefix == mappedPrefix && pressed.length > prefixLen ? 'full' :
            mappedPrefix.indexOf(pressedPrefix) == 0 ? 'partial' : false;
    }
    else {
        return pressed == mapped ? 'full' :
            mapped.indexOf(pressed) == 0 ? 'partial' : false;
    }
}
function lastChar(keys) {
    var match = /^.*(<[^>]+>)$/.exec(keys);
    var selectedCharacter = match ? match[1] : keys.slice(-1);
    if (selectedCharacter.length > 1) {
        switch (selectedCharacter) {
            case '<CR>':
                selectedCharacter = '\n';
                break;
            case '<Space>':
                selectedCharacter = ' ';
                break;
            default:
                selectedCharacter = '';
                break;
        }
    }
    return selectedCharacter;
}
function repeatFn(cm, fn, repeat) {
    return function () {
        for (var i = 0; i < repeat; i++) {
            fn(cm);
        }
    };
}
function copyCursor(cur) {
    return new Pos(cur.line, cur.ch);
}
function cursorEqual(cur1, cur2) {
    return cur1.ch == cur2.ch && cur1.line == cur2.line;
}
function cursorIsBefore(cur1, cur2) {
    if (cur1.line < cur2.line) {
        return true;
    }
    if (cur1.line == cur2.line && cur1.ch < cur2.ch) {
        return true;
    }
    return false;
}
function cursorMin(cur1, cur2) {
    if (arguments.length > 2) {
        cur2 = cursorMin.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
    return cursorIsBefore(cur1, cur2) ? cur1 : cur2;
}
function cursorMax(cur1, cur2) {
    if (arguments.length > 2) {
        cur2 = cursorMax.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
    return cursorIsBefore(cur1, cur2) ? cur2 : cur1;
}
function cursorIsBetween(cur1, cur2, cur3) {
    var cur1before2 = cursorIsBefore(cur1, cur2);
    var cur2before3 = cursorIsBefore(cur2, cur3);
    return cur1before2 && cur2before3;
}
function lineLength(cm, lineNum) {
    return cm.getLine(lineNum).length;
}
function trim(s) {
    if (s.trim) {
        return s.trim();
    }
    return s.replace(/^\s+|\s+$/g, '');
}
function escapeRegex(s) {
    return s.replace(/([.?*+$\[\]\/\\(){}|\-])/g, '\\$1');
}
function extendLineToColumn(cm, lineNum, column) {
    var endCh = lineLength(cm, lineNum);
    var spaces = new Array(column - endCh + 1).join(' ');
    cm.setCursor(new Pos(lineNum, endCh));
    cm.replaceRange(spaces, cm.getCursor());
}
function selectBlock(cm, selectionEnd) {
    var selections = [], ranges = cm.listSelections();
    var head = copyCursor(cm.clipPos(selectionEnd));
    var isClipped = !cursorEqual(selectionEnd, head);
    var curHead = cm.getCursor('head');
    var primIndex = getIndex(ranges, curHead);
    var wasClipped = cursorEqual(ranges[primIndex].head, ranges[primIndex].anchor);
    var max = ranges.length - 1;
    var index = max - primIndex > primIndex ? max : 0;
    var base = ranges[index].anchor;
    var firstLine = Math.min(base.line, head.line);
    var lastLine = Math.max(base.line, head.line);
    var baseCh = base.ch, headCh = head.ch;
    var dir = ranges[index].head.ch - baseCh;
    var newDir = headCh - baseCh;
    if (dir > 0 && newDir <= 0) {
        baseCh++;
        if (!isClipped) {
            headCh--;
        }
    }
    else if (dir < 0 && newDir >= 0) {
        baseCh--;
        if (!wasClipped) {
            headCh++;
        }
    }
    else if (dir < 0 && newDir == -1) {
        baseCh--;
        headCh++;
    }
    for (var line = firstLine; line <= lastLine; line++) {
        var range = { anchor: new Pos(line, baseCh), head: new Pos(line, headCh) };
        selections.push(range);
    }
    cm.setSelections(selections);
    selectionEnd.ch = headCh;
    base.ch = baseCh;
    return base;
}
function selectForInsert(cm, head, height) {
    var sel = [];
    for (var i = 0; i < height; i++) {
        var lineHead = offsetCursor(head, i, 0);
        sel.push({ anchor: lineHead, head: lineHead });
    }
    cm.setSelections(sel, 0);
}
function getIndex(ranges, cursor, end) {
    for (var i = 0; i < ranges.length; i++) {
        var atAnchor = end != 'head' && cursorEqual(ranges[i].anchor, cursor);
        var atHead = end != 'anchor' && cursorEqual(ranges[i].head, cursor);
        if (atAnchor || atHead) {
            return i;
        }
    }
    return -1;
}
function getSelectedAreaRange(cm, vim) {
    var lastSelection = vim.lastSelection;
    var getCurrentSelectedAreaRange = function () {
        var selections = cm.listSelections();
        var start = selections[0];
        var end = selections[selections.length - 1];
        var selectionStart = cursorIsBefore(start.anchor, start.head) ? start.anchor : start.head;
        var selectionEnd = cursorIsBefore(end.anchor, end.head) ? end.head : end.anchor;
        return [selectionStart, selectionEnd];
    };
    var getLastSelectedAreaRange = function () {
        var selectionStart = cm.getCursor();
        var selectionEnd = cm.getCursor();
        var block = lastSelection.visualBlock;
        if (block) {
            var width = block.width;
            var height = block.height;
            selectionEnd = new Pos(selectionStart.line + height, selectionStart.ch + width);
            var selections = [];
            for (var i = selectionStart.line; i < selectionEnd.line; i++) {
                var anchor = new Pos(i, selectionStart.ch);
                var head = new Pos(i, selectionEnd.ch);
                var range = { anchor: anchor, head: head };
                selections.push(range);
            }
            cm.setSelections(selections);
        }
        else {
            var start = lastSelection.anchorMark.find();
            var end = lastSelection.headMark.find();
            var line = end.line - start.line;
            var ch = end.ch - start.ch;
            selectionEnd = { line: selectionEnd.line + line, ch: line ? selectionEnd.ch : ch + selectionEnd.ch };
            if (lastSelection.visualLine) {
                selectionStart = new Pos(selectionStart.line, 0);
                selectionEnd = new Pos(selectionEnd.line, lineLength(cm, selectionEnd.line));
            }
            cm.setSelection(selectionStart, selectionEnd);
        }
        return [selectionStart, selectionEnd];
    };
    if (!vim.visualMode) {
        return getLastSelectedAreaRange();
    }
    else {
        return getCurrentSelectedAreaRange();
    }
}
function updateLastSelection(cm, vim) {
    var anchor = vim.sel.anchor;
    var head = vim.sel.head;
    if (vim.lastPastedText) {
        head = cm.posFromIndex(cm.indexFromPos(anchor) + vim.lastPastedText.length);
        vim.lastPastedText = null;
    }
    vim.lastSelection = { 'anchorMark': cm.setBookmark(anchor),
        'headMark': cm.setBookmark(head),
        'anchor': copyCursor(anchor),
        'head': copyCursor(head),
        'visualMode': vim.visualMode,
        'visualLine': vim.visualLine,
        'visualBlock': vim.visualBlock };
}
function expandSelection(cm, start, end) {
    var sel = cm.state.vim.sel;
    var head = sel.head;
    var anchor = sel.anchor;
    var tmp;
    if (cursorIsBefore(end, start)) {
        tmp = end;
        end = start;
        start = tmp;
    }
    if (cursorIsBefore(head, anchor)) {
        head = cursorMin(start, head);
        anchor = cursorMax(anchor, end);
    }
    else {
        anchor = cursorMin(start, anchor);
        head = cursorMax(head, end);
        head = offsetCursor(head, 0, -1);
        if (head.ch == -1 && head.line != cm.firstLine()) {
            head = new Pos(head.line - 1, lineLength(cm, head.line - 1));
        }
    }
    return [anchor, head];
}
function updateCmSelection(cm, sel, mode) {
    var vim = cm.state.vim;
    sel = sel || vim.sel;
    var mode = mode ||
        vim.visualLine ? 'line' : vim.visualBlock ? 'block' : 'char';
    var cmSel = makeCmSelection(cm, sel, mode);
    cm.setSelections(cmSel.ranges, cmSel.primary);
}
function makeCmSelection(cm, sel, mode, exclusive) {
    var head = copyCursor(sel.head);
    var anchor = copyCursor(sel.anchor);
    if (mode == 'char') {
        var headOffset = !exclusive && !cursorIsBefore(sel.head, sel.anchor) ? 1 : 0;
        var anchorOffset = cursorIsBefore(sel.head, sel.anchor) ? 1 : 0;
        head = offsetCursor(sel.head, 0, headOffset);
        anchor = offsetCursor(sel.anchor, 0, anchorOffset);
        return {
            ranges: [{ anchor: anchor, head: head }],
            primary: 0
        };
    }
    else if (mode == 'line') {
        if (!cursorIsBefore(sel.head, sel.anchor)) {
            anchor.ch = 0;
            var lastLine = cm.lastLine();
            if (head.line > lastLine) {
                head.line = lastLine;
            }
            head.ch = lineLength(cm, head.line);
        }
        else {
            head.ch = 0;
            anchor.ch = lineLength(cm, anchor.line);
        }
        return {
            ranges: [{ anchor: anchor, head: head }],
            primary: 0
        };
    }
    else if (mode == 'block') {
        var top = Math.min(anchor.line, head.line), fromCh = anchor.ch, bottom = Math.max(anchor.line, head.line), toCh = head.ch;
        if (fromCh < toCh) {
            toCh += 1;
        }
        else {
            fromCh += 1;
        }
        ;
        var height = bottom - top + 1;
        var primary = head.line == top ? 0 : height - 1;
        var ranges = [];
        for (var i = 0; i < height; i++) {
            ranges.push({
                anchor: new Pos(top + i, fromCh),
                head: new Pos(top + i, toCh)
            });
        }
        return {
            ranges: ranges,
            primary: primary
        };
    }
}
function getHead(cm) {
    var cur = cm.getCursor('head');
    if (cm.getSelection().length == 1) {
        cur = cursorMin(cur, cm.getCursor('anchor'));
    }
    return cur;
}
function exitVisualMode(cm, moveHead) {
    var vim = cm.state.vim;
    if (moveHead !== false) {
        cm.setCursor(clipCursorToContent(cm, vim.sel.head));
    }
    updateLastSelection(cm, vim);
    vim.visualMode = false;
    vim.visualLine = false;
    vim.visualBlock = false;
    if (!vim.insertMode)
        CodeMirror.signal(cm, "vim-mode-change", { mode: "normal" });
}
function clipToLine(cm, curStart, curEnd) {
    var selection = cm.getRange(curStart, curEnd);
    if (/\n\s*$/.test(selection)) {
        var lines = selection.split('\n');
        lines.pop();
        var line;
        for (var line = lines.pop(); lines.length > 0 && line && isWhiteSpaceString(line); line = lines.pop()) {
            curEnd.line--;
            curEnd.ch = 0;
        }
        if (line) {
            curEnd.line--;
            curEnd.ch = lineLength(cm, curEnd.line);
        }
        else {
            curEnd.ch = 0;
        }
    }
}
function expandSelectionToLine(_cm, curStart, curEnd) {
    curStart.ch = 0;
    curEnd.ch = 0;
    curEnd.line++;
}
function findFirstNonWhiteSpaceCharacter(text) {
    if (!text) {
        return 0;
    }
    var firstNonWS = text.search(/\S/);
    return firstNonWS == -1 ? text.length : firstNonWS;
}
function expandWordUnderCursor(cm, inclusive, _forward, bigWord, noSymbol) {
    var cur = getHead(cm);
    var line = cm.getLine(cur.line);
    var idx = cur.ch;
    var test = noSymbol ? wordCharTest[0] : bigWordCharTest[0];
    while (!test(line.charAt(idx))) {
        idx++;
        if (idx >= line.length) {
            return null;
        }
    }
    if (bigWord) {
        test = bigWordCharTest[0];
    }
    else {
        test = wordCharTest[0];
        if (!test(line.charAt(idx))) {
            test = wordCharTest[1];
        }
    }
    var end = idx, start = idx;
    while (test(line.charAt(end)) && end < line.length) {
        end++;
    }
    while (test(line.charAt(start)) && start >= 0) {
        start--;
    }
    start++;
    if (inclusive) {
        var wordEnd = end;
        while (/\s/.test(line.charAt(end)) && end < line.length) {
            end++;
        }
        if (wordEnd == end) {
            var wordStart = start;
            while (/\s/.test(line.charAt(start - 1)) && start > 0) {
                start--;
            }
            if (!start) {
                start = wordStart;
            }
        }
    }
    return { start: new Pos(cur.line, start), end: new Pos(cur.line, end) };
}
function expandTagUnderCursor(cm, head, inclusive) {
    var cur = head;
    if (!CodeMirror.findMatchingTag || !CodeMirror.findEnclosingTag) {
        return { start: cur, end: cur };
    }
    var tags = CodeMirror.findMatchingTag(cm, head) || CodeMirror.findEnclosingTag(cm, head);
    if (!tags || !tags.open || !tags.close) {
        return { start: cur, end: cur };
    }
    if (inclusive) {
        return { start: tags.open.from, end: tags.close.to };
    }
    return { start: tags.open.to, end: tags.close.from };
}
function recordJumpPosition(cm, oldCur, newCur) {
    if (!cursorEqual(oldCur, newCur)) {
        vimGlobalState.jumpList.add(cm, oldCur, newCur);
    }
}
function recordLastCharacterSearch(increment, args) {
    vimGlobalState.lastCharacterSearch.increment = increment;
    vimGlobalState.lastCharacterSearch.forward = args.forward;
    vimGlobalState.lastCharacterSearch.selectedCharacter = args.selectedCharacter;
}
var symbolToMode = {
    '(': 'bracket', ')': 'bracket', '{': 'bracket', '}': 'bracket',
    '[': 'section', ']': 'section',
    '*': 'comment', '/': 'comment',
    'm': 'method', 'M': 'method',
    '#': 'preprocess'
};
var findSymbolModes = {
    bracket: {
        isComplete: function (state) {
            if (state.nextCh === state.symb) {
                state.depth++;
                if (state.depth >= 1)
                    return true;
            }
            else if (state.nextCh === state.reverseSymb) {
                state.depth--;
            }
            return false;
        }
    },
    section: {
        init: function (state) {
            state.curMoveThrough = true;
            state.symb = (state.forward ? ']' : '[') === state.symb ? '{' : '}';
        },
        isComplete: function (state) {
            return state.index === 0 && state.nextCh === state.symb;
        }
    },
    comment: {
        isComplete: function (state) {
            var found = state.lastCh === '*' && state.nextCh === '/';
            state.lastCh = state.nextCh;
            return found;
        }
    },
    method: {
        init: function (state) {
            state.symb = (state.symb === 'm' ? '{' : '}');
            state.reverseSymb = state.symb === '{' ? '}' : '{';
        },
        isComplete: function (state) {
            if (state.nextCh === state.symb)
                return true;
            return false;
        }
    },
    preprocess: {
        init: function (state) {
            state.index = 0;
        },
        isComplete: function (state) {
            if (state.nextCh === '#') {
                var token = state.lineText.match(/^#(\w+)/)[1];
                if (token === 'endif') {
                    if (state.forward && state.depth === 0) {
                        return true;
                    }
                    state.depth++;
                }
                else if (token === 'if') {
                    if (!state.forward && state.depth === 0) {
                        return true;
                    }
                    state.depth--;
                }
                if (token === 'else' && state.depth === 0)
                    return true;
            }
            return false;
        }
    }
};
function findSymbol(cm, repeat, forward, symb) {
    var cur = copyCursor(cm.getCursor());
    var increment = forward ? 1 : -1;
    var endLine = forward ? cm.lineCount() : -1;
    var curCh = cur.ch;
    var line = cur.line;
    var lineText = cm.getLine(line);
    var state = {
        lineText: lineText,
        nextCh: lineText.charAt(curCh),
        lastCh: null,
        index: curCh,
        symb: symb,
        reverseSymb: (forward ? { ')': '(', '}': '{' } : { '(': ')', '{': '}' })[symb],
        forward: forward,
        depth: 0,
        curMoveThrough: false
    };
    var mode = symbolToMode[symb];
    if (!mode)
        return cur;
    var init = findSymbolModes[mode].init;
    var isComplete = findSymbolModes[mode].isComplete;
    if (init) {
        init(state);
    }
    while (line !== endLine && repeat) {
        state.index += increment;
        state.nextCh = state.lineText.charAt(state.index);
        if (!state.nextCh) {
            line += increment;
            state.lineText = cm.getLine(line) || '';
            if (increment > 0) {
                state.index = 0;
            }
            else {
                var lineLen = state.lineText.length;
                state.index = (lineLen > 0) ? (lineLen - 1) : 0;
            }
            state.nextCh = state.lineText.charAt(state.index);
        }
        if (isComplete(state)) {
            cur.line = line;
            cur.ch = state.index;
            repeat--;
        }
    }
    if (state.nextCh || state.curMoveThrough) {
        return new Pos(line, state.index);
    }
    return cur;
}
function findWord(cm, cur, forward, bigWord, emptyLineIsWord) {
    var lineNum = cur.line;
    var pos = cur.ch;
    var line = cm.getLine(lineNum);
    var dir = forward ? 1 : -1;
    var charTests = bigWord ? bigWordCharTest : wordCharTest;
    if (emptyLineIsWord && line == '') {
        lineNum += dir;
        line = cm.getLine(lineNum);
        if (!isLine(cm, lineNum)) {
            return null;
        }
        pos = (forward) ? 0 : line.length;
    }
    while (true) {
        if (emptyLineIsWord && line == '') {
            return { from: 0, to: 0, line: lineNum };
        }
        var stop = (dir > 0) ? line.length : -1;
        var wordStart = stop, wordEnd = stop;
        while (pos != stop) {
            var foundWord = false;
            for (var i = 0; i < charTests.length && !foundWord; ++i) {
                if (charTests[i](line.charAt(pos))) {
                    wordStart = pos;
                    while (pos != stop && charTests[i](line.charAt(pos))) {
                        pos += dir;
                    }
                    wordEnd = pos;
                    foundWord = wordStart != wordEnd;
                    if (wordStart == cur.ch && lineNum == cur.line &&
                        wordEnd == wordStart + dir) {
                        continue;
                    }
                    else {
                        return {
                            from: Math.min(wordStart, wordEnd + 1),
                            to: Math.max(wordStart, wordEnd),
                            line: lineNum
                        };
                    }
                }
            }
            if (!foundWord) {
                pos += dir;
            }
        }
        lineNum += dir;
        if (!isLine(cm, lineNum)) {
            return null;
        }
        line = cm.getLine(lineNum);
        pos = (dir > 0) ? 0 : line.length;
    }
}
function moveToWord(cm, cur, repeat, forward, wordEnd, bigWord) {
    var curStart = copyCursor(cur);
    var words = [];
    if (forward && !wordEnd || !forward && wordEnd) {
        repeat++;
    }
    var emptyLineIsWord = !(forward && wordEnd);
    for (var i = 0; i < repeat; i++) {
        var word = findWord(cm, cur, forward, bigWord, emptyLineIsWord);
        if (!word) {
            var eodCh = lineLength(cm, cm.lastLine());
            words.push(forward
                ? { line: cm.lastLine(), from: eodCh, to: eodCh }
                : { line: 0, from: 0, to: 0 });
            break;
        }
        words.push(word);
        cur = new Pos(word.line, forward ? (word.to - 1) : word.from);
    }
    var shortCircuit = words.length != repeat;
    var firstWord = words[0];
    var lastWord = words.pop();
    if (forward && !wordEnd) {
        if (!shortCircuit && (firstWord.from != curStart.ch || firstWord.line != curStart.line)) {
            lastWord = words.pop();
        }
        return new Pos(lastWord.line, lastWord.from);
    }
    else if (forward && wordEnd) {
        return new Pos(lastWord.line, lastWord.to - 1);
    }
    else if (!forward && wordEnd) {
        if (!shortCircuit && (firstWord.to != curStart.ch || firstWord.line != curStart.line)) {
            lastWord = words.pop();
        }
        return new Pos(lastWord.line, lastWord.to);
    }
    else {
        return new Pos(lastWord.line, lastWord.from);
    }
}
function moveToEol(cm, head, motionArgs, vim, keepHPos) {
    var cur = head;
    var retval = new Pos(cur.line + motionArgs.repeat - 1, Infinity);
    var end = cm.clipPos(retval);
    end.ch--;
    if (!keepHPos) {
        vim.lastHPos = Infinity;
        vim.lastHSPos = cm.charCoords(end, 'div').left;
    }
    return retval;
}
function moveToCharacter(cm, repeat, forward, character) {
    var cur = cm.getCursor();
    var start = cur.ch;
    var idx;
    for (var i = 0; i < repeat; i++) {
        var line = cm.getLine(cur.line);
        idx = charIdxInLine(start, line, character, forward, true);
        if (idx == -1) {
            return null;
        }
        start = idx;
    }
    return new Pos(cm.getCursor().line, idx);
}
function moveToColumn(cm, repeat) {
    var line = cm.getCursor().line;
    return clipCursorToContent(cm, new Pos(line, repeat - 1));
}
function updateMark(cm, vim, markName, pos) {
    if (!inArray(markName, validMarks)) {
        return;
    }
    if (vim.marks[markName]) {
        vim.marks[markName].clear();
    }
    vim.marks[markName] = cm.setBookmark(pos);
}
function charIdxInLine(start, line, character, forward, includeChar) {
    var idx;
    if (forward) {
        idx = line.indexOf(character, start + 1);
        if (idx != -1 && !includeChar) {
            idx -= 1;
        }
    }
    else {
        idx = line.lastIndexOf(character, start - 1);
        if (idx != -1 && !includeChar) {
            idx += 1;
        }
    }
    return idx;
}
function findParagraph(cm, head, repeat, dir, inclusive) {
    var line = head.line;
    var min = cm.firstLine();
    var max = cm.lastLine();
    var start, end, i = line;
    function isEmpty(i) { return !/\S/.test(cm.getLine(i)); } // ace_patch
    function isBoundary(i, dir, any) {
        if (any) {
            return isEmpty(i) != isEmpty(i + dir);
        }
        return !isEmpty(i) && isEmpty(i + dir);
    }
    function skipFold(i) {
        dir = dir > 0 ? 1 : -1;
        var foldLine = cm.ace.session.getFoldLine(i);
        if (foldLine) {
            if (i + dir > foldLine.start.row && i + dir < foldLine.end.row)
                dir = (dir > 0 ? foldLine.end.row : foldLine.start.row) - i;
        }
    }
    if (dir) {
        while (min <= i && i <= max && repeat > 0) {
            skipFold(i);
            if (isBoundary(i, dir)) {
                repeat--;
            }
            i += dir;
        }
        return new Pos(i, 0);
    }
    var vim = cm.state.vim;
    if (vim.visualLine && isBoundary(line, 1, true)) {
        var anchor = vim.sel.anchor;
        if (isBoundary(anchor.line, -1, true)) {
            if (!inclusive || anchor.line != line) {
                line += 1;
            }
        }
    }
    var startState = isEmpty(line);
    for (i = line; i <= max && repeat; i++) {
        if (isBoundary(i, 1, true)) {
            if (!inclusive || isEmpty(i) != startState) {
                repeat--;
            }
        }
    }
    end = new Pos(i, 0);
    if (i > max && !startState) {
        startState = true;
    }
    else {
        inclusive = false;
    }
    for (i = line; i > min; i--) {
        if (!inclusive || isEmpty(i) == startState || i == line) {
            if (isBoundary(i, -1, true)) {
                break;
            }
        }
    }
    start = new Pos(i, 0);
    return { start: start, end: end };
}
function getSentence(cm, cur, repeat, dir, inclusive /*includes whitespace*/) {
    function nextChar(curr) {
        if (curr.pos + curr.dir < 0 || curr.pos + curr.dir >= curr.line.length) {
            curr.line = null;
        }
        else {
            curr.pos += curr.dir;
        }
    }
    function forward(cm, ln, pos, dir) {
        var line = cm.getLine(ln);
        var curr = {
            line: line,
            ln: ln,
            pos: pos,
            dir: dir,
        };
        if (curr.line === "") {
            return { ln: curr.ln, pos: curr.pos };
        }
        var lastSentencePos = curr.pos;
        nextChar(curr);
        while (curr.line !== null) {
            lastSentencePos = curr.pos;
            if (isEndOfSentenceSymbol(curr.line[curr.pos])) {
                if (!inclusive) {
                    return { ln: curr.ln, pos: curr.pos + 1 };
                }
                else {
                    nextChar(curr);
                    while (curr.line !== null) {
                        if (isWhiteSpaceString(curr.line[curr.pos])) {
                            lastSentencePos = curr.pos;
                            nextChar(curr);
                        }
                        else {
                            break;
                        }
                    }
                    return { ln: curr.ln, pos: lastSentencePos + 1 };
                }
            }
            nextChar(curr);
        }
        return { ln: curr.ln, pos: lastSentencePos + 1 };
    }
    function reverse(cm, ln, pos, dir) {
        var line = cm.getLine(ln);
        var curr = {
            line: line,
            ln: ln,
            pos: pos,
            dir: dir,
        };
        if (curr.line === "") {
            return { ln: curr.ln, pos: curr.pos };
        }
        var lastSentencePos = curr.pos;
        nextChar(curr);
        while (curr.line !== null) {
            if (!isWhiteSpaceString(curr.line[curr.pos]) && !isEndOfSentenceSymbol(curr.line[curr.pos])) {
                lastSentencePos = curr.pos;
            }
            else if (isEndOfSentenceSymbol(curr.line[curr.pos])) {
                if (!inclusive) {
                    return { ln: curr.ln, pos: lastSentencePos };
                }
                else {
                    if (isWhiteSpaceString(curr.line[curr.pos + 1])) {
                        return { ln: curr.ln, pos: curr.pos + 1 };
                    }
                    else {
                        return { ln: curr.ln, pos: lastSentencePos };
                    }
                }
            }
            nextChar(curr);
        }
        curr.line = line;
        if (inclusive && isWhiteSpaceString(curr.line[curr.pos])) {
            return { ln: curr.ln, pos: curr.pos };
        }
        else {
            return { ln: curr.ln, pos: lastSentencePos };
        }
    }
    var curr_index = {
        ln: cur.line,
        pos: cur.ch,
    };
    while (repeat > 0) {
        if (dir < 0) {
            curr_index = reverse(cm, curr_index.ln, curr_index.pos, dir);
        }
        else {
            curr_index = forward(cm, curr_index.ln, curr_index.pos, dir);
        }
        repeat--;
    }
    return new Pos(curr_index.ln, curr_index.pos);
}
function findSentence(cm, cur, repeat, dir) {
    function nextChar(cm, idx) {
        if (idx.pos + idx.dir < 0 || idx.pos + idx.dir >= idx.line.length) {
            idx.ln += idx.dir;
            if (!isLine(cm, idx.ln)) {
                idx.line = null;
                idx.ln = null;
                idx.pos = null;
                return;
            }
            idx.line = cm.getLine(idx.ln);
            idx.pos = (idx.dir > 0) ? 0 : idx.line.length - 1;
        }
        else {
            idx.pos += idx.dir;
        }
    }
    function forward(cm, ln, pos, dir) {
        var line = cm.getLine(ln);
        var stop = (line === "");
        var curr = {
            line: line,
            ln: ln,
            pos: pos,
            dir: dir,
        };
        var last_valid = {
            ln: curr.ln,
            pos: curr.pos,
        };
        var skip_empty_lines = (curr.line === "");
        nextChar(cm, curr);
        while (curr.line !== null) {
            last_valid.ln = curr.ln;
            last_valid.pos = curr.pos;
            if (curr.line === "" && !skip_empty_lines) {
                return { ln: curr.ln, pos: curr.pos, };
            }
            else if (stop && curr.line !== "" && !isWhiteSpaceString(curr.line[curr.pos])) {
                return { ln: curr.ln, pos: curr.pos, };
            }
            else if (isEndOfSentenceSymbol(curr.line[curr.pos])
                && !stop
                && (curr.pos === curr.line.length - 1
                    || isWhiteSpaceString(curr.line[curr.pos + 1]))) {
                stop = true;
            }
            nextChar(cm, curr);
        }
        var line = cm.getLine(last_valid.ln);
        last_valid.pos = 0;
        for (var i = line.length - 1; i >= 0; --i) {
            if (!isWhiteSpaceString(line[i])) {
                last_valid.pos = i;
                break;
            }
        }
        return last_valid;
    }
    function reverse(cm, ln, pos, dir) {
        var line = cm.getLine(ln);
        var curr = {
            line: line,
            ln: ln,
            pos: pos,
            dir: dir,
        };
        var last_valid = {
            ln: curr.ln,
            pos: null,
        };
        var skip_empty_lines = (curr.line === "");
        nextChar(cm, curr);
        while (curr.line !== null) {
            if (curr.line === "" && !skip_empty_lines) {
                if (last_valid.pos !== null) {
                    return last_valid;
                }
                else {
                    return { ln: curr.ln, pos: curr.pos };
                }
            }
            else if (isEndOfSentenceSymbol(curr.line[curr.pos])
                && last_valid.pos !== null
                && !(curr.ln === last_valid.ln && curr.pos + 1 === last_valid.pos)) {
                return last_valid;
            }
            else if (curr.line !== "" && !isWhiteSpaceString(curr.line[curr.pos])) {
                skip_empty_lines = false;
                last_valid = { ln: curr.ln, pos: curr.pos };
            }
            nextChar(cm, curr);
        }
        var line = cm.getLine(last_valid.ln);
        last_valid.pos = 0;
        for (var i = 0; i < line.length; ++i) {
            if (!isWhiteSpaceString(line[i])) {
                last_valid.pos = i;
                break;
            }
        }
        return last_valid;
    }
    var curr_index = {
        ln: cur.line,
        pos: cur.ch,
    };
    while (repeat > 0) {
        if (dir < 0) {
            curr_index = reverse(cm, curr_index.ln, curr_index.pos, dir);
        }
        else {
            curr_index = forward(cm, curr_index.ln, curr_index.pos, dir);
        }
        repeat--;
    }
    return new Pos(curr_index.ln, curr_index.pos);
}
function selectCompanionObject(cm, head, symb, inclusive) {
    var cur = head, start, end;
    var bracketRegexp = ({
        '(': /[()]/, ')': /[()]/,
        '[': /[[\]]/, ']': /[[\]]/,
        '{': /[{}]/, '}': /[{}]/,
        '<': /[<>]/, '>': /[<>]/
    })[symb];
    var openSym = ({
        '(': '(', ')': '(',
        '[': '[', ']': '[',
        '{': '{', '}': '{',
        '<': '<', '>': '<'
    })[symb];
    var curChar = cm.getLine(cur.line).charAt(cur.ch);
    var offset = curChar === openSym ? 1 : 0;
    start = cm.scanForBracket(new Pos(cur.line, cur.ch + offset), -1, undefined, { 'bracketRegex': bracketRegexp });
    end = cm.scanForBracket(new Pos(cur.line, cur.ch + offset), 1, undefined, { 'bracketRegex': bracketRegexp });
    if (!start || !end) {
        return { start: cur, end: cur };
    }
    start = start.pos;
    end = end.pos;
    if ((start.line == end.line && start.ch > end.ch)
        || (start.line > end.line)) {
        var tmp = start;
        start = end;
        end = tmp;
    }
    if (inclusive) {
        end.ch += 1;
    }
    else {
        start.ch += 1;
    }
    return { start: start, end: end };
}
function findBeginningAndEnd(cm, head, symb, inclusive) {
    var cur = copyCursor(head);
    var line = cm.getLine(cur.line);
    var chars = line.split('');
    var start, end, i, len;
    var firstIndex = chars.indexOf(symb);
    if (cur.ch < firstIndex) {
        cur.ch = firstIndex;
    }
    else if (firstIndex < cur.ch && chars[cur.ch] == symb) {
        end = cur.ch; // assign end to the current cursor
        --cur.ch; // make sure to look backwards
    }
    if (chars[cur.ch] == symb && !end) {
        start = cur.ch + 1; // assign start to ahead of the cursor
    }
    else {
        for (i = cur.ch; i > -1 && !start; i--) {
            if (chars[i] == symb) {
                start = i + 1;
            }
        }
    }
    if (start && !end) {
        for (i = start, len = chars.length; i < len && !end; i++) {
            if (chars[i] == symb) {
                end = i;
            }
        }
    }
    if (!start || !end) {
        return { start: cur, end: cur };
    }
    if (inclusive) {
        --start;
        ++end;
    }
    return {
        start: new Pos(cur.line, start),
        end: new Pos(cur.line, end)
    };
}
defineOption('pcre', true, 'boolean');
function SearchState() { }
SearchState.prototype = {
    getQuery: function () {
        return vimGlobalState.query;
    },
    setQuery: function (query) {
        vimGlobalState.query = query;
    },
    getOverlay: function () {
        return this.searchOverlay;
    },
    setOverlay: function (overlay) {
        this.searchOverlay = overlay;
    },
    isReversed: function () {
        return vimGlobalState.isReversed;
    },
    setReversed: function (reversed) {
        vimGlobalState.isReversed = reversed;
    },
    getScrollbarAnnotate: function () {
        return this.annotate;
    },
    setScrollbarAnnotate: function (annotate) {
        this.annotate = annotate;
    }
};
function getSearchState(cm) {
    var vim = cm.state.vim;
    return vim.searchState_ || (vim.searchState_ = new SearchState());
}
function splitBySlash(argString) {
    return splitBySeparator(argString, '/');
}
function findUnescapedSlashes(argString) {
    return findUnescapedSeparators(argString, '/');
}
function splitBySeparator(argString, separator) {
    var slashes = findUnescapedSeparators(argString, separator) || [];
    if (!slashes.length)
        return [];
    var tokens = [];
    if (slashes[0] !== 0)
        return;
    for (var i = 0; i < slashes.length; i++) {
        if (typeof slashes[i] == 'number')
            tokens.push(argString.substring(slashes[i] + 1, slashes[i + 1]));
    }
    return tokens;
}
function findUnescapedSeparators(str, separator) {
    if (!separator)
        separator = '/';
    var escapeNextChar = false;
    var slashes = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (!escapeNextChar && c == separator) {
            slashes.push(i);
        }
        escapeNextChar = !escapeNextChar && (c == '\\');
    }
    return slashes;
}
function translateRegex(str) {
    var specials = '|(){';
    var unescape = '}';
    var escapeNextChar = false;
    var out = [];
    for (var i = -1; i < str.length; i++) {
        var c = str.charAt(i) || '';
        var n = str.charAt(i + 1) || '';
        var specialComesNext = (n && specials.indexOf(n) != -1);
        if (escapeNextChar) {
            if (c !== '\\' || !specialComesNext) {
                out.push(c);
            }
            escapeNextChar = false;
        }
        else {
            if (c === '\\') {
                escapeNextChar = true;
                if (n && unescape.indexOf(n) != -1) {
                    specialComesNext = true;
                }
                if (!specialComesNext || n === '\\') {
                    out.push(c);
                }
            }
            else {
                out.push(c);
                if (specialComesNext && n !== '\\') {
                    out.push('\\');
                }
            }
        }
    }
    return out.join('');
}
var charUnescapes = { '\\n': '\n', '\\r': '\r', '\\t': '\t' };
function translateRegexReplace(str) {
    var escapeNextChar = false;
    var out = [];
    for (var i = -1; i < str.length; i++) {
        var c = str.charAt(i) || '';
        var n = str.charAt(i + 1) || '';
        if (charUnescapes[c + n]) {
            out.push(charUnescapes[c + n]);
            i++;
        }
        else if (escapeNextChar) {
            out.push(c);
            escapeNextChar = false;
        }
        else {
            if (c === '\\') {
                escapeNextChar = true;
                if ((isNumber(n) || n === '$')) {
                    out.push('$');
                }
                else if (n !== '/' && n !== '\\') {
                    out.push('\\');
                }
            }
            else {
                if (c === '$') {
                    out.push('$');
                }
                out.push(c);
                if (n === '/') {
                    out.push('\\');
                }
            }
        }
    }
    return out.join('');
}
var unescapes = { '\\/': '/', '\\\\': '\\', '\\n': '\n', '\\r': '\r', '\\t': '\t', '\\&': '&' };
function unescapeRegexReplace(str) {
    var stream = new CodeMirror.StringStream(str);
    var output = [];
    while (!stream.eol()) {
        while (stream.peek() && stream.peek() != '\\') {
            output.push(stream.next());
        }
        var matched = false;
        for (var matcher in unescapes) {
            if (stream.match(matcher, true)) {
                matched = true;
                output.push(unescapes[matcher]);
                break;
            }
        }
        if (!matched) {
            output.push(stream.next());
        }
    }
    return output.join('');
}
function parseQuery(query, ignoreCase, smartCase) {
    var lastSearchRegister = vimGlobalState.registerController.getRegister('/');
    lastSearchRegister.setText(query);
    if (query instanceof RegExp) {
        return query;
    }
    var slashes = findUnescapedSlashes(query);
    var regexPart;
    var forceIgnoreCase;
    if (!slashes.length) {
        regexPart = query;
    }
    else {
        regexPart = query.substring(0, slashes[0]);
        var flagsPart = query.substring(slashes[0]);
        forceIgnoreCase = (flagsPart.indexOf('i') != -1);
    }
    if (!regexPart) {
        return null;
    }
    if (!getOption('pcre')) {
        regexPart = translateRegex(regexPart);
    }
    if (smartCase) {
        ignoreCase = (/^[^A-Z]*$/).test(regexPart);
    }
    var regexp = new RegExp(regexPart, (ignoreCase || forceIgnoreCase) ? 'im' : 'm');
    return regexp;
}
function dom(n) {
    if (typeof n === 'string')
        n = document.createElement(n);
    for (var a, i = 1; i < arguments.length; i++) {
        if (!(a = arguments[i]))
            continue;
        if (typeof a !== 'object')
            a = document.createTextNode(a);
        if (a.nodeType)
            n.appendChild(a);
        else
            for (var key in a) {
                if (!Object.prototype.hasOwnProperty.call(a, key))
                    continue;
                if (key[0] === '$')
                    n.style[key.slice(1)] = a[key];
                else
                    n.setAttribute(key, a[key]);
            }
    }
    return n;
}
function showConfirm(cm, template) {
    var pre = dom('div', { $color: 'red', $whiteSpace: 'pre', class: 'cm-vim-message' }, template);
    if (cm.openNotification) {
        cm.openNotification(pre, { bottom: true, duration: 5000 });
    }
    else {
        alert(pre.innerText);
    }
}
function makePrompt(prefix, desc) {
    return dom(document.createDocumentFragment(), dom('span', { $fontFamily: 'monospace', $whiteSpace: 'pre' }, prefix, dom('input', { type: 'text', autocorrect: 'off',
        autocapitalize: 'off', spellcheck: 'false' })), desc && dom('span', { $color: '#888' }, desc));
}
function showPrompt(cm, options) {
    var template = makePrompt(options.prefix, options.desc);
    if (cm.openDialog) {
        cm.openDialog(template, options.onClose, {
            onKeyDown: options.onKeyDown, onKeyUp: options.onKeyUp,
            bottom: true, selectValueOnOpen: false, value: options.value
        });
    }
    else {
        var shortText = '';
        if (typeof options.prefix != "string" && options.prefix)
            shortText += options.prefix.textContent;
        if (options.desc)
            shortText += " " + options.desc;
        options.onClose(prompt(shortText, ''));
    }
}
function regexEqual(r1, r2) {
    if (r1 instanceof RegExp && r2 instanceof RegExp) {
        var props = ['global', 'multiline', 'ignoreCase', 'source'];
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (r1[prop] !== r2[prop]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
function updateSearchQuery(cm, rawQuery, ignoreCase, smartCase) {
    if (!rawQuery) {
        return;
    }
    var state = getSearchState(cm);
    var query = parseQuery(rawQuery, !!ignoreCase, !!smartCase);
    if (!query) {
        return;
    }
    highlightSearchMatches(cm, query);
    if (regexEqual(query, state.getQuery())) {
        return query;
    }
    state.setQuery(query);
    return query;
}
function searchOverlay(query) {
    if (query.source.charAt(0) == '^') {
        var matchSol = true;
    }
    return {
        token: function (stream) {
            if (matchSol && !stream.sol()) {
                stream.skipToEnd();
                return;
            }
            var match = stream.match(query, false);
            if (match) {
                if (match[0].length == 0) {
                    stream.next();
                    return 'searching';
                }
                if (!stream.sol()) {
                    stream.backUp(1);
                    if (!query.exec(stream.next() + match[0])) {
                        stream.next();
                        return null;
                    }
                }
                stream.match(query);
                return 'searching';
            }
            while (!stream.eol()) {
                stream.next();
                if (stream.match(query, false))
                    break;
            }
        },
        query: query
    };
}
var highlightTimeout = 0;
function highlightSearchMatches(cm, query) {
    clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(function () {
        if (!cm.state.vim)
            return;
        var searchState = getSearchState(cm);
        var overlay = searchState.getOverlay();
        if (!overlay || query != overlay.query) {
            if (overlay) {
                cm.removeOverlay(overlay);
            }
            overlay = searchOverlay(query);
            cm.addOverlay(overlay);
            if (cm.showMatchesOnScrollbar) {
                if (searchState.getScrollbarAnnotate()) {
                    searchState.getScrollbarAnnotate().clear();
                }
                searchState.setScrollbarAnnotate(cm.showMatchesOnScrollbar(query));
            }
            searchState.setOverlay(overlay);
        }
    }, 50);
}
function findNext(cm, prev, query, repeat) {
    if (repeat === undefined) {
        repeat = 1;
    }
    return cm.operation(function () {
        var pos = cm.getCursor();
        var cursor = cm.getSearchCursor(query, pos);
        for (var i = 0; i < repeat; i++) {
            var found = cursor.find(prev);
            if (i == 0 && found && cursorEqual(cursor.from(), pos)) {
                var lastEndPos = prev ? cursor.from() : cursor.to();
                found = cursor.find(prev);
                if (found && !found[0] && cursorEqual(cursor.from(), lastEndPos)) {
                    if (cm.getLine(lastEndPos.line).length == lastEndPos.ch)
                        found = cursor.find(prev);
                }
            }
            if (!found) {
                cursor = cm.getSearchCursor(query, (prev) ? new Pos(cm.lastLine()) : new Pos(cm.firstLine(), 0));
                if (!cursor.find(prev)) {
                    return;
                }
            }
        }
        return cursor.from();
    });
}
function findNextFromAndToInclusive(cm, prev, query, repeat, vim) {
    if (repeat === undefined) {
        repeat = 1;
    }
    return cm.operation(function () {
        var pos = cm.getCursor();
        var cursor = cm.getSearchCursor(query, pos);
        var found = cursor.find(!prev);
        if (!vim.visualMode && found && cursorEqual(cursor.from(), pos)) {
            cursor.find(!prev);
        }
        for (var i = 0; i < repeat; i++) {
            found = cursor.find(prev);
            if (!found) {
                cursor = cm.getSearchCursor(query, (prev) ? new Pos(cm.lastLine()) : new Pos(cm.firstLine(), 0));
                if (!cursor.find(prev)) {
                    return;
                }
            }
        }
        return [cursor.from(), cursor.to()];
    });
}
function clearSearchHighlight(cm) {
    var state = getSearchState(cm);
    cm.removeOverlay(getSearchState(cm).getOverlay());
    state.setOverlay(null);
    if (state.getScrollbarAnnotate()) {
        state.getScrollbarAnnotate().clear();
        state.setScrollbarAnnotate(null);
    }
}
function isInRange(pos, start, end) {
    if (typeof pos != 'number') {
        pos = pos.line;
    }
    if (start instanceof Array) {
        return inArray(pos, start);
    }
    else {
        if (typeof end == 'number') {
            return (pos >= start && pos <= end);
        }
        else {
            return pos == start;
        }
    }
}
function getUserVisibleLines(cm) {
    var renderer = cm.ace.renderer;
    return {
        top: renderer.getFirstFullyVisibleRow(),
        bottom: renderer.getLastFullyVisibleRow()
    };
}
function getMarkPos(cm, vim, markName) {
    if (markName == '\'' || markName == '`') {
        return vimGlobalState.jumpList.find(cm, -1) || new Pos(0, 0);
    }
    else if (markName == '.') {
        return getLastEditPos(cm);
    }
    var mark = vim.marks[markName];
    return mark && mark.find();
}
function getLastEditPos(cm) {
    var undoManager = cm.ace.session.$undoManager;
    if (undoManager && undoManager.$lastDelta)
        return toCmPos(undoManager.$lastDelta.end);
}
var ExCommandDispatcher = function () {
    this.buildCommandMap_();
};
ExCommandDispatcher.prototype = {
    processCommand: function (cm, input, opt_params) {
        var that = this;
        cm.operation(function () {
            cm.curOp.isVimOp = true;
            that._processCommand(cm, input, opt_params);
        });
    },
    _processCommand: function (cm, input, opt_params) {
        var vim = cm.state.vim;
        var commandHistoryRegister = vimGlobalState.registerController.getRegister(':');
        var previousCommand = commandHistoryRegister.toString();
        if (vim.visualMode) {
            exitVisualMode(cm);
        }
        var inputStream = new CodeMirror.StringStream(input);
        commandHistoryRegister.setText(input);
        var params = opt_params || {};
        params.input = input;
        try {
            this.parseInput_(cm, inputStream, params);
        }
        catch (e) {
            showConfirm(cm, e.toString());
            throw e;
        }
        var command;
        var commandName;
        if (!params.commandName) {
            if (params.line !== undefined) {
                commandName = 'move';
            }
        }
        else {
            command = this.matchCommand_(params.commandName);
            if (command) {
                commandName = command.name;
                if (command.excludeFromCommandHistory) {
                    commandHistoryRegister.setText(previousCommand);
                }
                this.parseCommandArgs_(inputStream, params, command);
                if (command.type == 'exToKey') {
                    for (var i = 0; i < command.toKeys.length; i++) {
                        vimApi.handleKey(cm, command.toKeys[i], 'mapping');
                    }
                    return;
                }
                else if (command.type == 'exToEx') {
                    this.processCommand(cm, command.toInput);
                    return;
                }
            }
        }
        if (!commandName) {
            showConfirm(cm, 'Not an editor command ":' + input + '"');
            return;
        }
        try {
            exCommands[commandName](cm, params);
            if ((!command || !command.possiblyAsync) && params.callback) {
                params.callback();
            }
        }
        catch (e) {
            showConfirm(cm, e.toString());
            throw e;
        }
    },
    parseInput_: function (cm, inputStream, result) {
        inputStream.eatWhile(':');
        if (inputStream.eat('%')) {
            result.line = cm.firstLine();
            result.lineEnd = cm.lastLine();
        }
        else {
            result.line = this.parseLineSpec_(cm, inputStream);
            if (result.line !== undefined && inputStream.eat(',')) {
                result.lineEnd = this.parseLineSpec_(cm, inputStream);
            }
        }
        var commandMatch = inputStream.match(/^(\w+|!!|@@|[!#&*<=>@~])/);
        if (commandMatch) {
            result.commandName = commandMatch[1];
        }
        else {
            result.commandName = inputStream.match(/.*/)[0];
        }
        return result;
    },
    parseLineSpec_: function (cm, inputStream) {
        var numberMatch = inputStream.match(/^(\d+)/);
        if (numberMatch) {
            return parseInt(numberMatch[1], 10) - 1;
        }
        switch (inputStream.next()) {
            case '.':
                return this.parseLineSpecOffset_(inputStream, cm.getCursor().line);
            case '$':
                return this.parseLineSpecOffset_(inputStream, cm.lastLine());
            case '\'':
                var markName = inputStream.next();
                var markPos = getMarkPos(cm, cm.state.vim, markName);
                if (!markPos)
                    throw new Error('Mark not set');
                return this.parseLineSpecOffset_(inputStream, markPos.line);
            case '-':
            case '+':
                inputStream.backUp(1);
                return this.parseLineSpecOffset_(inputStream, cm.getCursor().line);
            default:
                inputStream.backUp(1);
                return undefined;
        }
    },
    parseLineSpecOffset_: function (inputStream, line) {
        var offsetMatch = inputStream.match(/^([+-])?(\d+)/);
        if (offsetMatch) {
            var offset = parseInt(offsetMatch[2], 10);
            if (offsetMatch[1] == "-") {
                line -= offset;
            }
            else {
                line += offset;
            }
        }
        return line;
    },
    parseCommandArgs_: function (inputStream, params, command) {
        if (inputStream.eol()) {
            return;
        }
        params.argString = inputStream.match(/.*/)[0];
        var delim = command.argDelimiter || /\s+/;
        var args = trim(params.argString).split(delim);
        if (args.length && args[0]) {
            params.args = args;
        }
    },
    matchCommand_: function (commandName) {
        for (var i = commandName.length; i > 0; i--) {
            var prefix = commandName.substring(0, i);
            if (this.commandMap_[prefix]) {
                var command = this.commandMap_[prefix];
                if (command.name.indexOf(commandName) === 0) {
                    return command;
                }
            }
        }
        return null;
    },
    buildCommandMap_: function () {
        this.commandMap_ = {};
        for (var i = 0; i < defaultExCommandMap.length; i++) {
            var command = defaultExCommandMap[i];
            var key = command.shortName || command.name;
            this.commandMap_[key] = command;
        }
    },
    map: function (lhs, rhs, ctx) {
        if (lhs != ':' && lhs.charAt(0) == ':') {
            if (ctx) {
                throw Error('Mode not supported for ex mappings');
            }
            var commandName = lhs.substring(1);
            if (rhs != ':' && rhs.charAt(0) == ':') {
                this.commandMap_[commandName] = {
                    name: commandName,
                    type: 'exToEx',
                    toInput: rhs.substring(1),
                    user: true
                };
            }
            else {
                this.commandMap_[commandName] = {
                    name: commandName,
                    type: 'exToKey',
                    toKeys: rhs,
                    user: true
                };
            }
        }
        else {
            if (rhs != ':' && rhs.charAt(0) == ':') {
                var mapping = {
                    keys: lhs,
                    type: 'keyToEx',
                    exArgs: { input: rhs.substring(1) }
                };
                if (ctx) {
                    mapping.context = ctx;
                }
                defaultKeymap.unshift(mapping);
            }
            else {
                var mapping = {
                    keys: lhs,
                    type: 'keyToKey',
                    toKeys: rhs
                };
                if (ctx) {
                    mapping.context = ctx;
                }
                defaultKeymap.unshift(mapping);
            }
        }
    },
    unmap: function (lhs, ctx) {
        if (lhs != ':' && lhs.charAt(0) == ':') {
            if (ctx) {
                throw Error('Mode not supported for ex mappings');
            }
            var commandName = lhs.substring(1);
            if (this.commandMap_[commandName] && this.commandMap_[commandName].user) {
                delete this.commandMap_[commandName];
                return true;
            }
        }
        else {
            var keys = lhs;
            for (var i = 0; i < defaultKeymap.length; i++) {
                if (keys == defaultKeymap[i].keys
                    && defaultKeymap[i].context === ctx) {
                    defaultKeymap.splice(i, 1);
                    return true;
                }
            }
        }
    }
};
var exCommands = {
    colorscheme: function (cm, params) {
        if (!params.args || params.args.length < 1) {
            showConfirm(cm, cm.getOption('theme'));
            return;
        }
        cm.setOption('theme', params.args[0]);
    },
    map: function (cm, params, ctx) {
        var mapArgs = params.args;
        if (!mapArgs || mapArgs.length < 2) {
            if (cm) {
                showConfirm(cm, 'Invalid mapping: ' + params.input);
            }
            return;
        }
        exCommandDispatcher.map(mapArgs[0], mapArgs[1], ctx);
    },
    imap: function (cm, params) { this.map(cm, params, 'insert'); },
    nmap: function (cm, params) { this.map(cm, params, 'normal'); },
    vmap: function (cm, params) { this.map(cm, params, 'visual'); },
    unmap: function (cm, params, ctx) {
        var mapArgs = params.args;
        if (!mapArgs || mapArgs.length < 1 || !exCommandDispatcher.unmap(mapArgs[0], ctx)) {
            if (cm) {
                showConfirm(cm, 'No such mapping: ' + params.input);
            }
        }
    },
    move: function (cm, params) {
        commandDispatcher.processCommand(cm, cm.state.vim, {
            type: 'motion',
            motion: 'moveToLineOrEdgeOfDocument',
            motionArgs: { forward: false, explicitRepeat: true,
                linewise: true },
            repeatOverride: params.line + 1
        });
    },
    set: function (cm, params) {
        var setArgs = params.args;
        var setCfg = params.setCfg || {};
        if (!setArgs || setArgs.length < 1) {
            if (cm) {
                showConfirm(cm, 'Invalid mapping: ' + params.input);
            }
            return;
        }
        var expr = setArgs[0].split('=');
        var optionName = expr[0];
        var value = expr[1];
        var forceGet = false;
        if (optionName.charAt(optionName.length - 1) == '?') {
            if (value) {
                throw Error('Trailing characters: ' + params.argString);
            }
            optionName = optionName.substring(0, optionName.length - 1);
            forceGet = true;
        }
        if (value === undefined && optionName.substring(0, 2) == 'no') {
            optionName = optionName.substring(2);
            value = false;
        }
        var optionIsBoolean = options[optionName] && options[optionName].type == 'boolean';
        if (optionIsBoolean && value == undefined) {
            value = true;
        }
        if (!optionIsBoolean && value === undefined || forceGet) {
            var oldValue = getOption(optionName, cm, setCfg);
            if (oldValue instanceof Error) {
                showConfirm(cm, oldValue.message);
            }
            else if (oldValue === true || oldValue === false) {
                showConfirm(cm, ' ' + (oldValue ? '' : 'no') + optionName);
            }
            else {
                showConfirm(cm, '  ' + optionName + '=' + oldValue);
            }
        }
        else {
            var setOptionReturn = setOption(optionName, value, cm, setCfg);
            if (setOptionReturn instanceof Error) {
                showConfirm(cm, setOptionReturn.message);
            }
        }
    },
    setlocal: function (cm, params) {
        params.setCfg = { scope: 'local' };
        this.set(cm, params);
    },
    setglobal: function (cm, params) {
        params.setCfg = { scope: 'global' };
        this.set(cm, params);
    },
    registers: function (cm, params) {
        var regArgs = params.args;
        var registers = vimGlobalState.registerController.registers;
        var regInfo = '----------Registers----------\n\n';
        if (!regArgs) {
            for (var registerName in registers) {
                var text = registers[registerName].toString();
                if (text.length) {
                    regInfo += '"' + registerName + '    ' + text + '\n';
                }
            }
        }
        else {
            var registerName;
            regArgs = regArgs.join('');
            for (var i = 0; i < regArgs.length; i++) {
                registerName = regArgs.charAt(i);
                if (!vimGlobalState.registerController.isValidRegister(registerName)) {
                    continue;
                }
                var register = registers[registerName] || new Register();
                regInfo += '"' + registerName + '    ' + register.toString() + '\n';
            }
        }
        showConfirm(cm, regInfo);
    },
    sort: function (cm, params) {
        var reverse, ignoreCase, unique, number, pattern;
        function parseArgs() {
            if (params.argString) {
                var args = new CodeMirror.StringStream(params.argString);
                if (args.eat('!')) {
                    reverse = true;
                }
                if (args.eol()) {
                    return;
                }
                if (!args.eatSpace()) {
                    return 'Invalid arguments';
                }
                var opts = args.match(/([dinuox]+)?\s*(\/.+\/)?\s*/);
                if (!opts && !args.eol()) {
                    return 'Invalid arguments';
                }
                if (opts[1]) {
                    ignoreCase = opts[1].indexOf('i') != -1;
                    unique = opts[1].indexOf('u') != -1;
                    var decimal = opts[1].indexOf('d') != -1 || opts[1].indexOf('n') != -1 && 1;
                    var hex = opts[1].indexOf('x') != -1 && 1;
                    var octal = opts[1].indexOf('o') != -1 && 1;
                    if (decimal + hex + octal > 1) {
                        return 'Invalid arguments';
                    }
                    number = decimal && 'decimal' || hex && 'hex' || octal && 'octal';
                }
                if (opts[2]) {
                    pattern = new RegExp(opts[2].substr(1, opts[2].length - 2), ignoreCase ? 'i' : '');
                }
            }
        }
        var err = parseArgs();
        if (err) {
            showConfirm(cm, err + ': ' + params.argString);
            return;
        }
        var lineStart = params.line || cm.firstLine();
        var lineEnd = params.lineEnd || params.line || cm.lastLine();
        if (lineStart == lineEnd) {
            return;
        }
        var curStart = new Pos(lineStart, 0);
        var curEnd = new Pos(lineEnd, lineLength(cm, lineEnd));
        var text = cm.getRange(curStart, curEnd).split('\n');
        var numberRegex = pattern ? pattern :
            (number == 'decimal') ? /(-?)([\d]+)/ :
                (number == 'hex') ? /(-?)(?:0x)?([0-9a-f]+)/i :
                    (number == 'octal') ? /([0-7]+)/ : null;
        var radix = (number == 'decimal') ? 10 : (number == 'hex') ? 16 : (number == 'octal') ? 8 : null;
        var numPart = [], textPart = [];
        if (number || pattern) {
            for (var i = 0; i < text.length; i++) {
                var matchPart = pattern ? text[i].match(pattern) : null;
                if (matchPart && matchPart[0] != '') {
                    numPart.push(matchPart);
                }
                else if (!pattern && numberRegex.exec(text[i])) {
                    numPart.push(text[i]);
                }
                else {
                    textPart.push(text[i]);
                }
            }
        }
        else {
            textPart = text;
        }
        function compareFn(a, b) {
            if (reverse) {
                var tmp;
                tmp = a;
                a = b;
                b = tmp;
            }
            if (ignoreCase) {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }
            var anum = number && numberRegex.exec(a);
            var bnum = number && numberRegex.exec(b);
            if (!anum) {
                return a < b ? -1 : 1;
            }
            anum = parseInt((anum[1] + anum[2]).toLowerCase(), radix);
            bnum = parseInt((bnum[1] + bnum[2]).toLowerCase(), radix);
            return anum - bnum;
        }
        function comparePatternFn(a, b) {
            if (reverse) {
                var tmp;
                tmp = a;
                a = b;
                b = tmp;
            }
            if (ignoreCase) {
                a[0] = a[0].toLowerCase();
                b[0] = b[0].toLowerCase();
            }
            return (a[0] < b[0]) ? -1 : 1;
        }
        numPart.sort(pattern ? comparePatternFn : compareFn);
        if (pattern) {
            for (var i = 0; i < numPart.length; i++) {
                numPart[i] = numPart[i].input;
            }
        }
        else if (!number) {
            textPart.sort(compareFn);
        }
        text = (!reverse) ? textPart.concat(numPart) : numPart.concat(textPart);
        if (unique) { // Remove duplicate lines
            var textOld = text;
            var lastLine;
            text = [];
            for (var i = 0; i < textOld.length; i++) {
                if (textOld[i] != lastLine) {
                    text.push(textOld[i]);
                }
                lastLine = textOld[i];
            }
        }
        cm.replaceRange(text.join('\n'), curStart, curEnd);
    },
    vglobal: function (cm, params) {
        this.global(cm, params);
    },
    global: function (cm, params) {
        var argString = params.argString;
        if (!argString) {
            showConfirm(cm, 'Regular Expression missing from global');
            return;
        }
        var inverted = params.commandName[0] === 'v';
        var lineStart = (params.line !== undefined) ? params.line : cm.firstLine();
        var lineEnd = params.lineEnd || params.line || cm.lastLine();
        var tokens = splitBySlash(argString);
        var regexPart = argString, cmd;
        if (tokens.length) {
            regexPart = tokens[0];
            cmd = tokens.slice(1, tokens.length).join('/');
        }
        if (regexPart) {
            try {
                updateSearchQuery(cm, regexPart, true /** ignoreCase */, true /** smartCase */);
            }
            catch (e) {
                showConfirm(cm, 'Invalid regex: ' + regexPart);
                return;
            }
        }
        var query = getSearchState(cm).getQuery();
        var matchedLines = [];
        for (var i = lineStart; i <= lineEnd; i++) {
            var line = cm.getLineHandle(i);
            var matched = query.test(line.text);
            if (matched !== inverted) {
                matchedLines.push(cmd ? line : line.text);
            }
        }
        if (!cmd) {
            showConfirm(cm, matchedLines.join('\n'));
            return;
        }
        var index = 0;
        var nextCommand = function () {
            if (index < matchedLines.length) {
                var line = matchedLines[index++];
                var lineNum = cm.getLineNumber(line);
                if (lineNum == null) {
                    nextCommand();
                    return;
                }
                var command = (lineNum + 1) + cmd;
                exCommandDispatcher.processCommand(cm, command, {
                    callback: nextCommand
                });
            }
        };
        nextCommand();
    },
    substitute: function (cm, params) {
        if (!cm.getSearchCursor) {
            throw new Error('Search feature not available. Requires searchcursor.js or ' +
                'any other getSearchCursor implementation.');
        }
        var argString = params.argString;
        var tokens = argString ? splitBySeparator(argString, argString[0]) : [];
        var regexPart, replacePart = '', trailing, flagsPart, count;
        var confirm = false; // Whether to confirm each replace.
        var global = false; // True to replace all instances on a line, false to replace only 1.
        if (tokens.length) {
            regexPart = tokens[0];
            if (getOption('pcre') && regexPart !== '') {
                regexPart = new RegExp(regexPart).source; //normalize not escaped characters
            }
            replacePart = tokens[1];
            if (replacePart !== undefined) {
                if (getOption('pcre')) {
                    replacePart = unescapeRegexReplace(replacePart.replace(/([^\\])&/g, "$1$$&"));
                }
                else {
                    replacePart = translateRegexReplace(replacePart);
                }
                vimGlobalState.lastSubstituteReplacePart = replacePart;
            }
            trailing = tokens[2] ? tokens[2].split(' ') : [];
        }
        else {
            if (argString && argString.length) {
                showConfirm(cm, 'Substitutions should be of the form ' +
                    ':s/pattern/replace/');
                return;
            }
        }
        if (trailing) {
            flagsPart = trailing[0];
            count = parseInt(trailing[1]);
            if (flagsPart) {
                if (flagsPart.indexOf('c') != -1) {
                    confirm = true;
                }
                if (flagsPart.indexOf('g') != -1) {
                    global = true;
                }
                if (getOption('pcre')) {
                    regexPart = regexPart + '/' + flagsPart;
                }
                else {
                    regexPart = regexPart.replace(/\//g, "\\/") + '/' + flagsPart;
                }
            }
        }
        if (regexPart) {
            try {
                updateSearchQuery(cm, regexPart, true /** ignoreCase */, true /** smartCase */);
            }
            catch (e) {
                showConfirm(cm, 'Invalid regex: ' + regexPart);
                return;
            }
        }
        replacePart = replacePart || vimGlobalState.lastSubstituteReplacePart;
        if (replacePart === undefined) {
            showConfirm(cm, 'No previous substitute regular expression');
            return;
        }
        var state = getSearchState(cm);
        var query = state.getQuery();
        var lineStart = (params.line !== undefined) ? params.line : cm.getCursor().line;
        var lineEnd = params.lineEnd || lineStart;
        if (lineStart == cm.firstLine() && lineEnd == cm.lastLine()) {
            lineEnd = Infinity;
        }
        if (count) {
            lineStart = lineEnd;
            lineEnd = lineStart + count - 1;
        }
        var startPos = clipCursorToContent(cm, new Pos(lineStart, 0));
        var cursor = cm.getSearchCursor(query, startPos);
        doReplace(cm, confirm, global, lineStart, lineEnd, cursor, query, replacePart, params.callback);
    },
    redo: CodeMirror.commands.redo,
    undo: CodeMirror.commands.undo,
    write: function (cm) {
        if (CodeMirror.commands.save) {
            CodeMirror.commands.save(cm);
        }
        else if (cm.save) {
            cm.save();
        }
    },
    nohlsearch: function (cm) {
        clearSearchHighlight(cm);
    },
    yank: function (cm) {
        var cur = copyCursor(cm.getCursor());
        var line = cur.line;
        var lineText = cm.getLine(line);
        vimGlobalState.registerController.pushText('0', 'yank', lineText, true, true);
    },
    delmarks: function (cm, params) {
        if (!params.argString || !trim(params.argString)) {
            showConfirm(cm, 'Argument required');
            return;
        }
        var state = cm.state.vim;
        var stream = new CodeMirror.StringStream(trim(params.argString));
        while (!stream.eol()) {
            stream.eatSpace();
            var count = stream.pos;
            if (!stream.match(/[a-zA-Z]/, false)) {
                showConfirm(cm, 'Invalid argument: ' + params.argString.substring(count));
                return;
            }
            var sym = stream.next();
            if (stream.match('-', true)) {
                if (!stream.match(/[a-zA-Z]/, false)) {
                    showConfirm(cm, 'Invalid argument: ' + params.argString.substring(count));
                    return;
                }
                var startMark = sym;
                var finishMark = stream.next();
                if (isLowerCase(startMark) && isLowerCase(finishMark) ||
                    isUpperCase(startMark) && isUpperCase(finishMark)) {
                    var start = startMark.charCodeAt(0);
                    var finish = finishMark.charCodeAt(0);
                    if (start >= finish) {
                        showConfirm(cm, 'Invalid argument: ' + params.argString.substring(count));
                        return;
                    }
                    for (var j = 0; j <= finish - start; j++) {
                        var mark = String.fromCharCode(start + j);
                        delete state.marks[mark];
                    }
                }
                else {
                    showConfirm(cm, 'Invalid argument: ' + startMark + '-');
                    return;
                }
            }
            else {
                delete state.marks[sym];
            }
        }
    }
};
var exCommandDispatcher = new ExCommandDispatcher();
function doReplace(cm, confirm, global, lineStart, lineEnd, searchCursor, query, replaceWith, callback) {
    cm.state.vim.exMode = true;
    var done = false;
    var lastPos, modifiedLineNumber, joined;
    function replaceAll() {
        cm.operation(function () {
            while (!done) {
                replace();
                next();
            }
            stop();
        });
    }
    function replace() {
        var text = cm.getRange(searchCursor.from(), searchCursor.to());
        var newText = text.replace(query, replaceWith);
        var unmodifiedLineNumber = searchCursor.to().line;
        searchCursor.replace(newText);
        modifiedLineNumber = searchCursor.to().line;
        lineEnd += modifiedLineNumber - unmodifiedLineNumber;
        joined = modifiedLineNumber < unmodifiedLineNumber;
    }
    function findNextValidMatch() {
        var lastMatchTo = lastPos && copyCursor(searchCursor.to());
        var match = searchCursor.findNext();
        if (match && !match[0] && lastMatchTo && cursorEqual(searchCursor.from(), lastMatchTo)) {
            match = searchCursor.findNext();
        }
        return match;
    }
    function next() {
        while (findNextValidMatch() &&
            isInRange(searchCursor.from(), lineStart, lineEnd)) {
            if (!global && searchCursor.from().line == modifiedLineNumber && !joined) {
                continue;
            }
            cm.scrollIntoView(searchCursor.from(), 30);
            cm.setSelection(searchCursor.from(), searchCursor.to());
            lastPos = searchCursor.from();
            done = false;
            return;
        }
        done = true;
    }
    function stop(close) {
        if (close) {
            close();
        }
        cm.focus();
        if (lastPos) {
            cm.setCursor(lastPos);
            var vim = cm.state.vim;
            vim.exMode = false;
            vim.lastHPos = vim.lastHSPos = lastPos.ch;
        }
        if (callback) {
            callback();
        }
    }
    function onPromptKeyDown(e, _value, close) {
        CodeMirror.e_stop(e);
        var keyName = CodeMirror.keyName(e);
        switch (keyName) {
            case 'Y':
                replace();
                next();
                break;
            case 'N':
                next();
                break;
            case 'A':
                var savedCallback = callback;
                callback = undefined;
                cm.operation(replaceAll);
                callback = savedCallback;
                break;
            case 'L':
                replace();
            case 'Q':
            case 'Esc':
            case 'Ctrl-C':
            case 'Ctrl-[':
                stop(close);
                break;
        }
        if (done) {
            stop(close);
        }
        return true;
    }
    next();
    if (done) {
        showConfirm(cm, 'No matches for ' + query.source);
        return;
    }
    if (!confirm) {
        replaceAll();
        if (callback) {
            callback();
        }
        return;
    }
    showPrompt(cm, {
        prefix: dom('span', 'replace with ', dom('strong', replaceWith), ' (y/n/a/q/l)'),
        onKeyDown: onPromptKeyDown
    });
}
CodeMirror.keyMap.vim = {
    attach: attachVimMap,
    detach: detachVimMap,
    call: cmKey
};
function exitInsertMode(cm) {
    var vim = cm.state.vim;
    var macroModeState = vimGlobalState.macroModeState;
    var insertModeChangeRegister = vimGlobalState.registerController.getRegister('.');
    var isPlaying = macroModeState.isPlaying;
    var lastChange = macroModeState.lastInsertModeChanges;
    if (!isPlaying) {
        cm.off('change', onChange);
        CodeMirror.off(cm.getInputField(), 'keydown', onKeyEventTargetKeyDown);
    }
    if (!isPlaying && vim.insertModeRepeat > 1) {
        repeatLastEdit(cm, vim, vim.insertModeRepeat - 1, true /** repeatForInsert */);
        vim.lastEditInputState.repeatOverride = vim.insertModeRepeat;
    }
    delete vim.insertModeRepeat;
    vim.insertMode = false;
    cm.setCursor(cm.getCursor().line, cm.getCursor().ch - 1);
    cm.setOption('keyMap', 'vim');
    cm.setOption('disableInput', true);
    cm.toggleOverwrite(false); // exit replace mode if we were in it.
    insertModeChangeRegister.setText(lastChange.changes.join(''));
    CodeMirror.signal(cm, "vim-mode-change", { mode: "normal" });
    if (macroModeState.isRecording) {
        logInsertModeChange(macroModeState);
    }
}
function _mapCommand(command) {
    defaultKeymap.unshift(command);
}
function mapCommand(keys, type, name, args, extra) {
    var command = { keys: keys, type: type };
    command[type] = name;
    command[type + "Args"] = args;
    for (var key in extra)
        command[key] = extra[key];
    _mapCommand(command);
}
defineOption('insertModeEscKeysTimeout', 200, 'number');
CodeMirror.keyMap['vim-insert'] = {
    fallthrough: ['default'],
    attach: attachVimMap,
    detach: detachVimMap,
    call: cmKey
};
CodeMirror.keyMap['vim-replace'] = {
    'Backspace': 'goCharLeft',
    fallthrough: ['vim-insert'],
    attach: attachVimMap,
    detach: detachVimMap,
    call: cmKey
};
function executeMacroRegister(cm, vim, macroModeState, registerName) {
    var register = vimGlobalState.registerController.getRegister(registerName);
    if (registerName == ':') {
        if (register.keyBuffer[0]) {
            exCommandDispatcher.processCommand(cm, register.keyBuffer[0]);
        }
        macroModeState.isPlaying = false;
        return;
    }
    var keyBuffer = register.keyBuffer;
    var imc = 0;
    macroModeState.isPlaying = true;
    macroModeState.replaySearchQueries = register.searchQueries.slice(0);
    for (var i = 0; i < keyBuffer.length; i++) {
        var text = keyBuffer[i];
        var match, key;
        while (text) {
            match = (/<\w+-.+?>|<\w+>|./).exec(text);
            key = match[0];
            text = text.substring(match.index + key.length);
            vimApi.handleKey(cm, key, 'macro');
            if (vim.insertMode) {
                var changes = register.insertModeChanges[imc++].changes;
                vimGlobalState.macroModeState.lastInsertModeChanges.changes =
                    changes;
                repeatInsertModeChanges(cm, changes, 1);
                exitInsertMode(cm);
            }
        }
    }
    macroModeState.isPlaying = false;
}
function logKey(macroModeState, key) {
    if (macroModeState.isPlaying) {
        return;
    }
    var registerName = macroModeState.latestRegister;
    var register = vimGlobalState.registerController.getRegister(registerName);
    if (register) {
        register.pushText(key);
    }
}
function logInsertModeChange(macroModeState) {
    if (macroModeState.isPlaying) {
        return;
    }
    var registerName = macroModeState.latestRegister;
    var register = vimGlobalState.registerController.getRegister(registerName);
    if (register && register.pushInsertModeChanges) {
        register.pushInsertModeChanges(macroModeState.lastInsertModeChanges);
    }
}
function logSearchQuery(macroModeState, query) {
    if (macroModeState.isPlaying) {
        return;
    }
    var registerName = macroModeState.latestRegister;
    var register = vimGlobalState.registerController.getRegister(registerName);
    if (register && register.pushSearchQuery) {
        register.pushSearchQuery(query);
    }
}
function onChange(cm, changeObj) {
    var macroModeState = vimGlobalState.macroModeState;
    var lastChange = macroModeState.lastInsertModeChanges;
    if (!macroModeState.isPlaying) {
        while (changeObj) {
            lastChange.expectCursorActivityForChange = true;
            if (lastChange.ignoreCount > 1) {
                lastChange.ignoreCount--;
            }
            else if (changeObj.origin == '+input' || changeObj.origin == 'paste'
                || changeObj.origin === undefined /* only in testing */) {
                var selectionCount = cm.listSelections().length;
                if (selectionCount > 1)
                    lastChange.ignoreCount = selectionCount;
                var text = changeObj.text.join('\n');
                if (lastChange.maybeReset) {
                    lastChange.changes = [];
                    lastChange.maybeReset = false;
                }
                if (text) {
                    if (cm.state.overwrite && !/\n/.test(text)) {
                        lastChange.changes.push([text]);
                    }
                    else {
                        lastChange.changes.push(text);
                    }
                }
            }
            changeObj = changeObj.next;
        }
    }
}
function onCursorActivity(cm) {
    var vim = cm.state.vim;
    if (vim.insertMode) {
        var macroModeState = vimGlobalState.macroModeState;
        if (macroModeState.isPlaying) {
            return;
        }
        var lastChange = macroModeState.lastInsertModeChanges;
        if (lastChange.expectCursorActivityForChange) {
            lastChange.expectCursorActivityForChange = false;
        }
        else {
            lastChange.maybeReset = true;
        }
    }
    else if (!cm.curOp.isVimOp) {
        handleExternalSelection(cm, vim);
    }
}
function handleExternalSelection(cm, vim, keepHPos) {
    var anchor = cm.getCursor('anchor');
    var head = cm.getCursor('head');
    if (vim.visualMode && !cm.somethingSelected()) {
        exitVisualMode(cm, false);
    }
    else if (!vim.visualMode && !vim.insertMode && cm.somethingSelected()) {
        vim.visualMode = true;
        vim.visualLine = false;
        CodeMirror.signal(cm, "vim-mode-change", { mode: "visual" });
    }
    if (vim.visualMode) {
        var headOffset = !cursorIsBefore(head, anchor) ? -1 : 0;
        var anchorOffset = cursorIsBefore(head, anchor) ? -1 : 0;
        head = offsetCursor(head, 0, headOffset);
        anchor = offsetCursor(anchor, 0, anchorOffset);
        vim.sel = {
            anchor: anchor,
            head: head
        };
        updateMark(cm, vim, '<', cursorMin(head, anchor));
        updateMark(cm, vim, '>', cursorMax(head, anchor));
    }
    else if (!vim.insertMode && !keepHPos) {
        vim.lastHPos = cm.getCursor().ch;
    }
}
function InsertModeKey(keyName) {
    this.keyName = keyName;
}
function onKeyEventTargetKeyDown(e) {
    var macroModeState = vimGlobalState.macroModeState;
    var lastChange = macroModeState.lastInsertModeChanges;
    var keyName = CodeMirror.keyName(e);
    if (!keyName) {
        return;
    }
    function onKeyFound() {
        if (lastChange.maybeReset) {
            lastChange.changes = [];
            lastChange.maybeReset = false;
        }
        lastChange.changes.push(new InsertModeKey(keyName));
        return true;
    }
    if (keyName.indexOf('Delete') != -1 || keyName.indexOf('Backspace') != -1) {
        CodeMirror.lookupKey(keyName, 'vim-insert', onKeyFound);
    }
}
function repeatLastEdit(cm, vim, repeat, repeatForInsert) {
    var macroModeState = vimGlobalState.macroModeState;
    macroModeState.isPlaying = true;
    var isAction = !!vim.lastEditActionCommand;
    var cachedInputState = vim.inputState;
    function repeatCommand() {
        if (isAction) {
            commandDispatcher.processAction(cm, vim, vim.lastEditActionCommand);
        }
        else {
            commandDispatcher.evalInput(cm, vim);
        }
    }
    function repeatInsert(repeat) {
        if (macroModeState.lastInsertModeChanges.changes.length > 0) {
            repeat = !vim.lastEditActionCommand ? 1 : repeat;
            var changeObject = macroModeState.lastInsertModeChanges;
            repeatInsertModeChanges(cm, changeObject.changes, repeat);
        }
    }
    vim.inputState = vim.lastEditInputState;
    if (isAction && vim.lastEditActionCommand.interlaceInsertRepeat) {
        for (var i = 0; i < repeat; i++) {
            repeatCommand();
            repeatInsert(1);
        }
    }
    else {
        if (!repeatForInsert) {
            repeatCommand();
        }
        repeatInsert(repeat);
    }
    vim.inputState = cachedInputState;
    if (vim.insertMode && !repeatForInsert) {
        exitInsertMode(cm);
    }
    macroModeState.isPlaying = false;
}
function repeatInsertModeChanges(cm, changes, repeat) {
    function keyHandler(binding) {
        if (typeof binding == 'string') {
            CodeMirror.commands[binding](cm);
        }
        else {
            binding(cm);
        }
        return true;
    }
    var head = cm.getCursor('head');
    var visualBlock = vimGlobalState.macroModeState.lastInsertModeChanges.visualBlock;
    if (visualBlock) {
        selectForInsert(cm, head, visualBlock + 1);
        repeat = cm.listSelections().length;
        cm.setCursor(head);
    }
    for (var i = 0; i < repeat; i++) {
        if (visualBlock) {
            cm.setCursor(offsetCursor(head, i, 0));
        }
        for (var j = 0; j < changes.length; j++) {
            var change = changes[j];
            if (change instanceof InsertModeKey) {
                CodeMirror.lookupKey(change.keyName, 'vim-insert', keyHandler);
            }
            else if (typeof change == "string") {
                cm.replaceSelection(change);
            }
            else {
                var start = cm.getCursor();
                var end = offsetCursor(start, 0, change[0].length);
                cm.replaceRange(change[0], start, end);
                cm.setCursor(end);
            }
        }
    }
    if (visualBlock) {
        cm.setCursor(offsetCursor(head, 0, 1));
    }
}
resetVimGlobalState();
CodeMirror.Vim = vimApi;
var specialKey = { 'return': 'CR', backspace: 'BS', 'delete': 'Del', esc: 'Esc',
    left: 'Left', right: 'Right', up: 'Up', down: 'Down', space: 'Space', insert: 'Ins',
    home: 'Home', end: 'End', pageup: 'PageUp', pagedown: 'PageDown', enter: 'CR'
};
function lookupKey(hashId, key, e) {
    if (key.length > 1 && key[0] == "n") {
        key = key.replace("numpad", "");
    }
    key = specialKey[key] || key;
    var name = '';
    if (e.ctrlKey) {
        name += 'C-';
    }
    if (e.altKey) {
        name += 'A-';
    }
    if ((name || key.length > 1) && e.shiftKey) {
        name += 'S-';
    }
    name += key;
    if (name.length > 1) {
        name = '<' + name + '>';
    }
    return name;
}
var handleKey = vimApi.handleKey.bind(vimApi);
vimApi.handleKey = function (cm, key, origin) {
    return cm.operation(function () {
        return handleKey(cm, key, origin);
    }, true);
};
function cloneVimState(state) {
    var n = new state.constructor();
    Object.keys(state).forEach(function (key) {
        var o = state[key];
        if (Array.isArray(o))
            o = o.slice();
        else if (o && typeof o == "object" && o.constructor != Object)
            o = cloneVimState(o);
        n[key] = o;
    });
    if (state.sel) {
        n.sel = {
            head: state.sel.head && copyCursor(state.sel.head),
            anchor: state.sel.anchor && copyCursor(state.sel.anchor)
        };
    }
    return n;
}
function multiSelectHandleKey(cm, key, origin) {
    var isHandled = false;
    var vim = vimApi.maybeInitVimState_(cm);
    var visualBlock = vim.visualBlock || vim.wasInVisualBlock;
    var wasMultiselect = cm.ace.inMultiSelectMode;
    if (vim.wasInVisualBlock && !wasMultiselect) {
        vim.wasInVisualBlock = false;
    }
    else if (wasMultiselect && vim.visualBlock) {
        vim.wasInVisualBlock = true;
    }
    if (key == '<Esc>' && !vim.insertMode && !vim.visualMode && wasMultiselect) {
        cm.ace.exitMultiSelectMode();
    }
    else if (visualBlock || !wasMultiselect || cm.ace.inVirtualSelectionMode) {
        isHandled = vimApi.handleKey(cm, key, origin);
    }
    else {
        var old = cloneVimState(vim);
        cm.operation(function () {
            cm.ace.forEachSelection(function () {
                var sel = cm.ace.selection;
                cm.state.vim.lastHPos = sel.$desiredColumn == null ? sel.lead.column : sel.$desiredColumn;
                var head = cm.getCursor("head");
                var anchor = cm.getCursor("anchor");
                var headOffset = !cursorIsBefore(head, anchor) ? -1 : 0;
                var anchorOffset = cursorIsBefore(head, anchor) ? -1 : 0;
                head = offsetCursor(head, 0, headOffset);
                anchor = offsetCursor(anchor, 0, anchorOffset);
                cm.state.vim.sel.head = head;
                cm.state.vim.sel.anchor = anchor;
                isHandled = handleKey(cm, key, origin);
                sel.$desiredColumn = cm.state.vim.lastHPos == -1 ? null : cm.state.vim.lastHPos;
                if (cm.virtualSelectionMode()) {
                    cm.state.vim = cloneVimState(old);
                }
            });
            if (cm.curOp.cursorActivity && !isHandled)
                cm.curOp.cursorActivity = false;
        }, true);
    }
    if (isHandled && !vim.visualMode && !vim.insert && vim.visualMode != cm.somethingSelected()) {
        handleExternalSelection(cm, vim, true);
    }
    return isHandled;
}
exports.CodeMirror = CodeMirror;
var getVim = vimApi.maybeInitVimState_;
exports.handler = {
    $id: "ace/keyboard/vim",
    drawCursor: function (element, pixelPos, config, sel, session) {
        var vim = this.state.vim || {};
        var w = config.characterWidth;
        var h = config.lineHeight;
        var top = pixelPos.top;
        var left = pixelPos.left;
        if (!vim.insertMode) {
            var isbackwards = !sel.cursor
                ? session.selection.isBackwards() || session.selection.isEmpty()
                : Range.comparePoints(sel.cursor, sel.start) <= 0;
            if (!isbackwards && left > w)
                left -= w;
        }
        if (!vim.insertMode && vim.status) {
            h = h / 2;
            top += h;
        }
        domLib.translate(element, left, top);
        domLib.setStyle(element.style, "width", w + "px");
        domLib.setStyle(element.style, "height", h + "px");
    },
    $getDirectionForHighlight: function (editor) {
        var cm = editor.state.cm;
        var vim = getVim(cm);
        if (!vim.insertMode) {
            return editor.session.selection.isBackwards() || editor.session.selection.isEmpty();
        }
    },
    handleKeyboard: function (data, hashId, key, keyCode, e) {
        var editor = data.editor;
        var cm = editor.state.cm;
        var vim = getVim(cm);
        if (keyCode == -1)
            return;
        if (!vim.insertMode) {
            if (hashId == -1) {
                if (key.charCodeAt(0) > 0xFF) {
                    if (data.inputKey) {
                        key = data.inputKey;
                        if (key && data.inputHash == 4)
                            key = key.toUpperCase();
                    }
                }
                data.inputChar = key;
            }
            else if (hashId == 4 || hashId == 0) {
                if (data.inputKey == key && data.inputHash == hashId && data.inputChar) {
                    key = data.inputChar;
                    hashId = -1;
                }
                else {
                    data.inputChar = null;
                    data.inputKey = key;
                    data.inputHash = hashId;
                }
            }
            else {
                data.inputChar = data.inputKey = null;
            }
        }
        if (cm.state.overwrite && vim.insertMode && key == "backspace" && hashId == 0) {
            return { command: "gotoleft" };
        }
        if (key == "c" && hashId == 1) { // key == "ctrl-c"
            if (!useragent.isMac && editor.getCopyText()) {
                editor.once("copy", function () {
                    if (vim.insertMode)
                        editor.selection.clearSelection();
                    else
                        cm.operation(function () { exitVisualMode(cm); });
                });
                return { command: "null", passEvent: true };
            }
        }
        if (key == "esc" && !vim.insertMode && !vim.visualMode && !cm.ace.inMultiSelectMode) {
            var searchState = getSearchState(cm);
            var overlay = searchState.getOverlay();
            if (overlay)
                cm.removeOverlay(overlay);
        }
        if (hashId == -1 || hashId & 1 || hashId === 0 && key.length > 1) {
            var insertMode = vim.insertMode;
            var name = lookupKey(hashId, key, e || {});
            if (vim.status == null)
                vim.status = "";
            var isHandled = multiSelectHandleKey(cm, name, 'user');
            vim = getVim(cm); // may be changed by multiSelectHandleKey
            if (isHandled && vim.status != null)
                vim.status += name;
            else if (vim.status == null)
                vim.status = "";
            cm._signal("changeStatus");
            if (!isHandled && (hashId != -1 || insertMode))
                return;
            return { command: "null", passEvent: !isHandled };
        }
    },
    attach: function (editor) {
        if (!editor.state)
            editor.state = {};
        var cm = new CodeMirror(editor);
        editor.state.cm = cm;
        editor.$vimModeHandler = this;
        CodeMirror.keyMap.vim.attach(cm);
        getVim(cm).status = null;
        cm.on('vim-command-done', function () {
            if (cm.virtualSelectionMode())
                return;
            getVim(cm).status = null;
            cm.ace._signal("changeStatus");
            cm.ace.session.markUndoGroup();
        });
        cm.on("changeStatus", function () {
            cm.ace.renderer.updateCursor();
            cm.ace._signal("changeStatus");
        });
        cm.on("vim-mode-change", function () {
            if (cm.virtualSelectionMode())
                return;
            updateInputMode();
            cm._signal("changeStatus");
        });
        function updateInputMode() {
            var isIntsert = getVim(cm).insertMode;
            cm.ace.renderer.setStyle("normal-mode", !isIntsert);
            editor.textInput.setCommandMode(!isIntsert);
            editor.renderer.$keepTextAreaAtCursor = isIntsert;
            editor.renderer.$blockCursor = !isIntsert;
        }
        updateInputMode();
        editor.renderer.$cursorLayer.drawCursor = this.drawCursor.bind(cm);
    },
    detach: function (editor) {
        var cm = editor.state.cm;
        CodeMirror.keyMap.vim.detach(cm);
        cm.destroy();
        editor.state.cm = null;
        editor.$vimModeHandler = null;
        editor.renderer.$cursorLayer.drawCursor = null;
        editor.renderer.setStyle("normal-mode", false);
        editor.textInput.setCommandMode(false);
        editor.renderer.$keepTextAreaAtCursor = true;
    },
    getStatusText: function (editor) {
        var cm = editor.state.cm;
        var vim = getVim(cm);
        if (vim.insertMode)
            return "INSERT";
        var status = "";
        if (vim.visualMode) {
            status += "VISUAL";
            if (vim.visualLine)
                status += " LINE";
            if (vim.visualBlock)
                status += " BLOCK";
        }
        if (vim.status)
            status += (status ? " " : "") + vim.status;
        return status;
    }
};
vimApi.defineOption({
    name: "wrap",
    set: function (value, cm) {
        if (cm) {
            cm.ace.setOption("wrap", value);
        }
    },
    type: "boolean"
}, false);
vimApi.defineEx('write', 'w', function () {
    console.log(':write is not implemented');
});
defaultKeymap.push({ keys: 'zc', type: 'action', action: 'fold', actionArgs: { open: false } }, { keys: 'zC', type: 'action', action: 'fold', actionArgs: { open: false, all: true } }, { keys: 'zo', type: 'action', action: 'fold', actionArgs: { open: true } }, { keys: 'zO', type: 'action', action: 'fold', actionArgs: { open: true, all: true } }, { keys: 'za', type: 'action', action: 'fold', actionArgs: { toggle: true } }, { keys: 'zA', type: 'action', action: 'fold', actionArgs: { toggle: true, all: true } }, { keys: 'zf', type: 'action', action: 'fold', actionArgs: { open: true, all: true } }, { keys: 'zd', type: 'action', action: 'fold', actionArgs: { open: true, all: true } }, { keys: '<C-A-k>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorAbove" } }, { keys: '<C-A-j>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorBelow" } }, { keys: '<C-A-S-k>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorAboveSkipCurrent" } }, { keys: '<C-A-S-j>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorBelowSkipCurrent" } }, { keys: '<C-A-h>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectMoreBefore" } }, { keys: '<C-A-l>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectMoreAfter" } }, { keys: '<C-A-S-h>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectNextBefore" } }, { keys: '<C-A-S-l>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectNextAfter" } });
defaultKeymap.push({
    keys: 'gq',
    type: 'operator',
    operator: 'hardWrap'
});
vimApi.defineOperator("hardWrap", function (cm, operatorArgs, ranges, oldAnchor, newHead) {
    var anchor = ranges[0].anchor.line;
    var head = ranges[0].head.line;
    if (operatorArgs.linewise)
        head--;
    hardWrap(cm.ace, { startRow: anchor, endRow: head });
    return Pos(head, 0);
});
defineOption('textwidth', undefined, 'number', ['tw'], function (width, cm) {
    if (cm === undefined) {
        return;
    }
    if (width === undefined) {
        var value = cm.ace.getOption('printMarginColumn');
        return value;
    }
    else {
        var column = Math.round(width);
        if (column > 1) {
            cm.ace.setOption('printMarginColumn', column);
        }
    }
});
actions.aceCommand = function (cm, actionArgs, vim) {
    cm.vimCmd = actionArgs;
    if (cm.ace.inVirtualSelectionMode)
        cm.ace.on("beforeEndOperation", delayedExecAceCommand);
    else
        delayedExecAceCommand(null, cm.ace);
};
function delayedExecAceCommand(op, ace) {
    ace.off("beforeEndOperation", delayedExecAceCommand);
    var cmd = ace.state.cm.vimCmd;
    if (cmd) {
        ace.execCommand(cmd.exec ? cmd : cmd.name, cmd.args);
    }
    ace.curOp = ace.prevOp;
}
actions.fold = function (cm, actionArgs, vim) {
    cm.ace.execCommand(['toggleFoldWidget', 'toggleFoldWidget', 'foldOther', 'unfoldall'
    ][(actionArgs.all ? 2 : 0) + (actionArgs.open ? 1 : 0)]);
};
exports.handler.defaultKeymap = defaultKeymap;
exports.handler.actions = actions;
exports.Vim = vimApi;

});                (function() {
                    ace.require(["ace/keyboard/vim"], function(m) {
                        if ( true && module) {
                            module.exports = m;
                        }
                    });
                })();
            

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNlLWtleWJpbmRpbmctdmltLWE2NDYwMmY0YTlmMDE3ODQ1N2VkLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVJQUF1STtBQUN2STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSxDQUFDOztBQUVELG1WQUFtVjtBQUNuVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxtQ0FBbUM7QUFDaEg7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyx5QkFBeUI7QUFDdEUsdUVBQXVFLGNBQWM7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyx3Q0FBd0M7QUFDbEY7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHdCQUF3Qix5QkFBeUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsMEVBQTBFO0FBQzFFO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG1CQUFtQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCw2QkFBNkI7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELDZCQUE2QjtBQUNwRjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyw0RUFBNEU7QUFDdkg7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsZ0JBQWdCLE9BQU87QUFDOUUsMEVBQTBFLGtCQUFrQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCLGFBQWE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtQ0FBbUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0EsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLHVCQUF1QjtBQUNyRTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsZ0JBQWdCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNEQUFzRDtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0JBQWdCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsTUFBTTtBQUM5RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaURBQWlELE1BQU07QUFDdkQsaURBQWlELE1BQU0sTUFBTTtBQUM3RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxZQUFZLEtBQUssSUFBSSxJQUFJLFlBQVksS0FBSyxHQUFHO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9DQUFvQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTyxNQUFNLE9BQU87QUFDOUI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBVSxLQUFLLEtBQUssS0FBSztBQUN6QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUZBQW1GLCtCQUErQjtBQUNsSCxnRkFBZ0YsK0JBQStCO0FBQy9HO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSx5QkFBeUIsa0JBQWtCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxpQkFBaUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNERBQTREO0FBQ3ZGO0FBQ0EsbUNBQW1DLDhCQUE4QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsOENBQThDLHlCQUF5QjtBQUN2SSxvREFBb0QsMEJBQTBCLGdCQUFnQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQywyQkFBMkI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLGdDQUFnQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQ0FBa0MsaUNBQWlDO0FBQ25FLGtDQUFrQyxpQ0FBaUM7QUFDbkUsa0NBQWtDLGlDQUFpQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixnQ0FBZ0M7QUFDaEM7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsY0FBYztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxxQkFBcUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLCtDQUErQyxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnQkFBZ0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxxQkFBcUI7QUFDeEUsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QscUJBQXFCLDBEQUEwRCxlQUFlLElBQUksMERBQTBELDBCQUEwQixJQUFJLDBEQUEwRCxjQUFjLElBQUksMERBQTBELHlCQUF5QixJQUFJLDBEQUEwRCxnQkFBZ0IsSUFBSSwwREFBMEQsMkJBQTJCLElBQUksMERBQTBELHlCQUF5QixJQUFJLDBEQUEwRCx5QkFBeUIsSUFBSSxxRUFBcUUsMEJBQTBCLElBQUkscUVBQXFFLDBCQUEwQixJQUFJLHVFQUF1RSxxQ0FBcUMsSUFBSSx1RUFBdUUscUNBQXFDLElBQUkscUVBQXFFLDRCQUE0QixJQUFJLHFFQUFxRSwyQkFBMkIsSUFBSSx1RUFBdUUsNEJBQTRCLElBQUksdUVBQXVFLDJCQUEyQjtBQUMxK0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQ0FBZ0M7QUFDdkQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLGtCQUFrQjtBQUNuQjtBQUNBLDRCQUE0QixLQUF1RDtBQUNuRjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQiIsInNvdXJjZXMiOlsid2VicGFjazovL3VpLy4vbm9kZV9tb2R1bGVzL2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3Qva2V5YmluZGluZy12aW0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiYWNlLmRlZmluZShcImFjZS9leHQvaGFyZHdyYXBcIixbXCJyZXF1aXJlXCIsXCJleHBvcnRzXCIsXCJtb2R1bGVcIixcImFjZS9yYW5nZVwiLFwiYWNlL2VkaXRvclwiLFwiYWNlL2NvbmZpZ1wiXSwgZnVuY3Rpb24ocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKXtcInVzZSBzdHJpY3RcIjtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbmZ1bmN0aW9uIGhhcmRXcmFwKGVkaXRvciwgb3B0aW9ucykge1xuICAgIHZhciBtYXggPSBvcHRpb25zLmNvbHVtbiB8fCBlZGl0b3IuZ2V0T3B0aW9uKFwicHJpbnRNYXJnaW5Db2x1bW5cIik7XG4gICAgdmFyIGFsbG93TWVyZ2UgPSBvcHRpb25zLmFsbG93TWVyZ2UgIT0gZmFsc2U7XG4gICAgdmFyIHJvdyA9IE1hdGgubWluKG9wdGlvbnMuc3RhcnRSb3csIG9wdGlvbnMuZW5kUm93KTtcbiAgICB2YXIgZW5kUm93ID0gTWF0aC5tYXgob3B0aW9ucy5zdGFydFJvdywgb3B0aW9ucy5lbmRSb3cpO1xuICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgd2hpbGUgKHJvdyA8PSBlbmRSb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID4gbWF4KSB7XG4gICAgICAgICAgICB2YXIgc3BhY2UgPSBmaW5kU3BhY2UobGluZSwgbWF4LCA1KTtcbiAgICAgICAgICAgIGlmIChzcGFjZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRlbnRhdGlvbiA9IC9eXFxzKi8uZXhlYyhsaW5lKVswXTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgc3BhY2Uuc3RhcnQsIHJvdywgc3BhY2UuZW5kKSwgXCJcXG5cIiArIGluZGVudGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdysrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsbG93TWVyZ2UgJiYgL1xcUy8udGVzdChsaW5lKSAmJiByb3cgIT0gZW5kUm93KSB7XG4gICAgICAgICAgICB2YXIgbmV4dExpbmUgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgICAgICBpZiAobmV4dExpbmUgJiYgL1xcUy8udGVzdChuZXh0TGluZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpbW1lZExpbmUgPSBsaW5lLnJlcGxhY2UoL1xccyskLywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWROZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIG1lcmdlZExpbmUgPSB0cmltbWVkTGluZSArIFwiIFwiICsgdHJpbW1lZE5leHRMaW5lO1xuICAgICAgICAgICAgICAgIHZhciBzcGFjZSA9IGZpbmRTcGFjZShtZXJnZWRMaW5lLCBtYXgsIDUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFjZSAmJiBzcGFjZS5zdGFydCA+IHRyaW1tZWRMaW5lLmxlbmd0aCB8fCBtZXJnZWRMaW5lLmxlbmd0aCA8IG1heCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVJhbmdlID0gbmV3IFJhbmdlKHJvdywgdHJpbW1lZExpbmUubGVuZ3RoLCByb3cgKyAxLCBuZXh0TGluZS5sZW5ndGggLSB0cmltbWVkTmV4dExpbmUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKHJlcGxhY2VSYW5nZSwgXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICByb3ctLTtcbiAgICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRyaW1tZWRMaW5lLmxlbmd0aCA8IGxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlKG5ldyBSYW5nZShyb3csIHRyaW1tZWRMaW5lLmxlbmd0aCwgcm93LCBsaW5lLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByb3crKztcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZFNwYWNlKGxpbmUsIG1heCwgbWluKSB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA8IG1heClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGJlZm9yZSA9IGxpbmUuc2xpY2UoMCwgbWF4KTtcbiAgICAgICAgdmFyIGFmdGVyID0gbGluZS5zbGljZShtYXgpO1xuICAgICAgICB2YXIgc3BhY2VBZnRlciA9IC9eKD86KFxccyspfChcXFMrKShcXHMrKSkvLmV4ZWMoYWZ0ZXIpO1xuICAgICAgICB2YXIgc3BhY2VCZWZvcmUgPSAvKD86KFxccyspfChcXHMrKShcXFMrKSkkLy5leGVjKGJlZm9yZSk7XG4gICAgICAgIHZhciBzdGFydCA9IDA7XG4gICAgICAgIHZhciBlbmQgPSAwO1xuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgIXNwYWNlQmVmb3JlWzJdKSB7XG4gICAgICAgICAgICBzdGFydCA9IG1heCAtIHNwYWNlQmVmb3JlWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIGVuZCA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VBZnRlciAmJiAhc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgaWYgKCFzdGFydClcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1heDtcbiAgICAgICAgICAgIGVuZCA9IG1heCArIHNwYWNlQWZ0ZXJbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmIHNwYWNlQmVmb3JlWzJdICYmIHNwYWNlQmVmb3JlLmluZGV4ID4gbWluKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzcGFjZUJlZm9yZS5pbmRleCxcbiAgICAgICAgICAgICAgICBlbmQ6IHNwYWNlQmVmb3JlLmluZGV4ICsgc3BhY2VCZWZvcmVbMl0ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmIHNwYWNlQWZ0ZXJbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gbWF4ICsgc3BhY2VBZnRlclsyXS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IHN0YXJ0ICsgc3BhY2VBZnRlclszXS5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiB3cmFwQWZ0ZXJJbnB1dChlKSB7XG4gICAgaWYgKGUuY29tbWFuZC5uYW1lID09IFwiaW5zZXJ0c3RyaW5nXCIgJiYgL1xcUy8udGVzdChlLmFyZ3MpKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBlLmVkaXRvcjtcbiAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5zZWxlY3Rpb24uY3Vyc29yO1xuICAgICAgICBpZiAoY3Vyc29yLmNvbHVtbiA8PSBlZGl0b3IucmVuZGVyZXIuJHByaW50TWFyZ2luQ29sdW1uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgbGFzdERlbHRhID0gZWRpdG9yLnNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGE7XG4gICAgICAgIGhhcmRXcmFwKGVkaXRvciwge1xuICAgICAgICAgICAgc3RhcnRSb3c6IGN1cnNvci5yb3csIGVuZFJvdzogY3Vyc29yLnJvdyxcbiAgICAgICAgICAgIGFsbG93TWVyZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGFzdERlbHRhICE9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhKVxuICAgICAgICAgICAgZWRpdG9yLnNlc3Npb24ubWFya1VuZG9Hcm91cCgpO1xuICAgIH1cbn1cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgaGFyZFdyYXA6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vbihcImFmdGVyRXhlY1wiLCB3cmFwQWZ0ZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9mZihcImFmdGVyRXhlY1wiLCB3cmFwQWZ0ZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH1cbn0pO1xuZXhwb3J0cy5oYXJkV3JhcCA9IGhhcmRXcmFwO1xuXG59KTtcblxuYWNlLmRlZmluZShcImFjZS9rZXlib2FyZC92aW1cIixbXCJyZXF1aXJlXCIsXCJleHBvcnRzXCIsXCJtb2R1bGVcIixcImFjZS9yYW5nZVwiLFwiYWNlL2xpYi9ldmVudF9lbWl0dGVyXCIsXCJhY2UvbGliL2RvbVwiLFwiYWNlL2xpYi9vb3BcIixcImFjZS9saWIva2V5c1wiLFwiYWNlL2xpYi9ldmVudFwiLFwiYWNlL3NlYXJjaFwiLFwiYWNlL2xpYi91c2VyYWdlbnRcIixcImFjZS9zZWFyY2hfaGlnaGxpZ2h0XCIsXCJhY2UvY29tbWFuZHMvbXVsdGlfc2VsZWN0X2NvbW1hbmRzXCIsXCJhY2UvbW9kZS90ZXh0XCIsXCJhY2UvZXh0L2hhcmR3cmFwXCIsXCJhY2UvbXVsdGlfc2VsZWN0XCJdLCBmdW5jdGlvbihyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpey8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4ndXNlIHN0cmljdCc7XG5mdW5jdGlvbiBsb2coKSB7XG4gICAgdmFyIGQgPSBcIlwiO1xuICAgIGZ1bmN0aW9uIGZvcm1hdChwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcCAhPSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuIHAgKyBcIlwiO1xuICAgICAgICBpZiAoXCJsaW5lXCIgaW4gcCkge1xuICAgICAgICAgICAgcmV0dXJuIHAubGluZSArIFwiOlwiICsgcC5jaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJhbmNob3JcIiBpbiBwKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0KHAuYW5jaG9yKSArIFwiLT5cIiArIGZvcm1hdChwLmhlYWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHApKVxuICAgICAgICAgICAgcmV0dXJuIFwiW1wiICsgcC5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0KHgpO1xuICAgICAgICAgICAgfSkgKyBcIl1cIjtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHApO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcCA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgdmFyIGYgPSBmb3JtYXQocCk7XG4gICAgICAgIGQgKz0gZiArIFwiICBcIjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coZCk7XG59XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbnZhciBkb21MaWIgPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBLRVlTID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi4vc2VhcmNoXCIpLlNlYXJjaDtcbnZhciB1c2VyYWdlbnQgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJhZ2VudFwiKTtcbnZhciBTZWFyY2hIaWdobGlnaHQgPSByZXF1aXJlKFwiLi4vc2VhcmNoX2hpZ2hsaWdodFwiKS5TZWFyY2hIaWdobGlnaHQ7XG52YXIgbXVsdGlTZWxlY3RDb21tYW5kcyA9IHJlcXVpcmUoXCIuLi9jb21tYW5kcy9tdWx0aV9zZWxlY3RfY29tbWFuZHNcIik7XG52YXIgVGV4dE1vZGVUb2tlblJlID0gcmVxdWlyZShcIi4uL21vZGUvdGV4dFwiKS5Nb2RlLnByb3RvdHlwZS50b2tlblJlO1xudmFyIGhhcmRXcmFwID0gcmVxdWlyZShcIi4uL2V4dC9oYXJkd3JhcFwiKS5oYXJkV3JhcDtcbnJlcXVpcmUoXCIuLi9tdWx0aV9zZWxlY3RcIik7XG52YXIgQ29kZU1pcnJvciA9IGZ1bmN0aW9uIChhY2UpIHtcbiAgICB0aGlzLmFjZSA9IGFjZTtcbiAgICB0aGlzLnN0YXRlID0ge307XG4gICAgdGhpcy5tYXJrcyA9IHt9O1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIHRoaXMuJHVpZCA9IDA7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlID0gdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24gPSB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY2Uub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9uKCdjaGFuZ2VTZWxlY3Rpb24nLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKTtcbiAgICB0aGlzLmFjZS5vbignYmVmb3JlRW5kT3BlcmF0aW9uJywgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbik7XG59O1xuQ29kZU1pcnJvci5Qb3MgPSBmdW5jdGlvbiAobGluZSwgY2gpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUG9zKSlcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgY2gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5jaCA9IGNoO1xufTtcbkNvZGVNaXJyb3IuZGVmaW5lT3B0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbCwgc2V0dGVyKSB7IH07XG5Db2RlTWlycm9yLmNvbW1hbmRzID0ge1xuICAgIHJlZG86IGZ1bmN0aW9uIChjbSkgeyBjbS5hY2UucmVkbygpOyB9LFxuICAgIHVuZG86IGZ1bmN0aW9uIChjbSkgeyBjbS5hY2UudW5kbygpOyB9LFxuICAgIG5ld2xpbmVBbmRJbmRlbnQ6IGZ1bmN0aW9uIChjbSkgeyBjbS5hY2UuaW5zZXJ0KFwiXFxuXCIpOyB9LFxuICAgIGdvTGluZUxlZnQ6IGZ1bmN0aW9uIChjbSkgeyBjbS5hY2Uuc2VsZWN0aW9uLm1vdmVDdXJzb3JMaW5lU3RhcnQoKTsgfSxcbiAgICBnb0xpbmVSaWdodDogZnVuY3Rpb24gKGNtKSB7IGNtLmFjZS5zZWxlY3Rpb24ubW92ZUN1cnNvckxpbmVFbmQoKTsgfVxufTtcbkNvZGVNaXJyb3Iua2V5TWFwID0ge307XG5Db2RlTWlycm9yLmFkZENsYXNzID0gQ29kZU1pcnJvci5ybUNsYXNzID0gZnVuY3Rpb24gKCkgeyB9O1xuQ29kZU1pcnJvci5lX3N0b3AgPSBDb2RlTWlycm9yLmVfcHJldmVudERlZmF1bHQgPSBldmVudC5zdG9wRXZlbnQ7XG5Db2RlTWlycm9yLmtleU5hbWUgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBrZXkgPSAoS0VZU1tlLmtleUNvZGVdIHx8IGUua2V5IHx8IFwiXCIpO1xuICAgIGlmIChrZXkubGVuZ3RoID09IDEpXG4gICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgIGtleSA9IGV2ZW50LmdldE1vZGlmaWVyU3RyaW5nKGUpLnJlcGxhY2UoLyhefC0pXFx3L2csIGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkgKyBrZXk7XG4gICAgcmV0dXJuIGtleTtcbn07XG5Db2RlTWlycm9yLmtleU1hcFsnZGVmYXVsdCddID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoY20pIHtcbiAgICAgICAgdmFyIGNtZCA9IGNtLmFjZS5jb21tYW5kcy5jb21tYW5kS2V5QmluZGluZ1trZXkudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIHJldHVybiBjbWQgJiYgY20uYWNlLmV4ZWNDb21tYW5kKGNtZCkgIT09IGZhbHNlO1xuICAgIH07XG59O1xuQ29kZU1pcnJvci5sb29rdXBLZXkgPSBmdW5jdGlvbiBsb29rdXBLZXkoa2V5LCBtYXAsIGhhbmRsZSkge1xuICAgIGlmICghbWFwKVxuICAgICAgICBtYXAgPSBcImRlZmF1bHRcIjtcbiAgICBpZiAodHlwZW9mIG1hcCA9PSBcInN0cmluZ1wiKVxuICAgICAgICBtYXAgPSBDb2RlTWlycm9yLmtleU1hcFttYXBdO1xuICAgIHZhciBmb3VuZCA9IHR5cGVvZiBtYXAgPT0gXCJmdW5jdGlvblwiID8gbWFwKGtleSkgOiBtYXBba2V5XTtcbiAgICBpZiAoZm91bmQgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm4gXCJub3RoaW5nXCI7XG4gICAgaWYgKGZvdW5kID09PSBcIi4uLlwiKVxuICAgICAgICByZXR1cm4gXCJtdWx0aVwiO1xuICAgIGlmIChmb3VuZCAhPSBudWxsICYmIGhhbmRsZShmb3VuZCkpXG4gICAgICAgIHJldHVybiBcImhhbmRsZWRcIjtcbiAgICBpZiAobWFwLmZhbGx0aHJvdWdoKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtYXAuZmFsbHRocm91Z2gpKVxuICAgICAgICAgICAgcmV0dXJuIGxvb2t1cEtleShrZXksIG1hcC5mYWxsdGhyb3VnaCwgaGFuZGxlKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXAuZmFsbHRocm91Z2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBsb29rdXBLZXkoa2V5LCBtYXAuZmFsbHRocm91Z2hbaV0sIGhhbmRsZSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuQ29kZU1pcnJvci5maW5kTWF0Y2hpbmdUYWcgPSBmdW5jdGlvbiAoY20sIGhlYWQpIHtcbiAgICByZXR1cm4gY20uZmluZE1hdGNoaW5nVGFnKGhlYWQpO1xufTtcbkNvZGVNaXJyb3IuZmluZEVuY2xvc2luZ1RhZyA9IGZ1bmN0aW9uIChjbSwgaGVhZCkge1xufTtcbkNvZGVNaXJyb3Iuc2lnbmFsID0gZnVuY3Rpb24gKG8sIG5hbWUsIGUpIHsgcmV0dXJuIG8uX3NpZ25hbChuYW1lLCBlKTsgfTtcbkNvZGVNaXJyb3Iub24gPSBldmVudC5hZGRMaXN0ZW5lcjtcbkNvZGVNaXJyb3Iub2ZmID0gZXZlbnQucmVtb3ZlTGlzdGVuZXI7XG5Db2RlTWlycm9yLmlzV29yZENoYXIgPSBmdW5jdGlvbiAoY2gpIHtcbiAgICBpZiAoY2ggPCBcIlxceDdmXCIpXG4gICAgICAgIHJldHVybiAvXlxcdyQvLnRlc3QoY2gpO1xuICAgIFRleHRNb2RlVG9rZW5SZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBUZXh0TW9kZVRva2VuUmUudGVzdChjaCk7XG59O1xuKGZ1bmN0aW9uICgpIHtcbiAgICBvb3AuaW1wbGVtZW50KENvZGVNaXJyb3IucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIpO1xuICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hY2Uub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlKTtcbiAgICAgICAgdGhpcy5hY2Uub2ZmKCdjaGFuZ2VTZWxlY3Rpb24nLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKTtcbiAgICAgICAgdGhpcy5hY2Uub2ZmKCdiZWZvcmVFbmRPcGVyYXRpb24nLCB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKTtcbiAgICAgICAgdGhpcy5yZW1vdmVPdmVybGF5KCk7XG4gICAgfTtcbiAgICB0aGlzLnZpcnR1YWxTZWxlY3Rpb25Nb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSAmJiB0aGlzLmFjZS5zZWxlY3Rpb24uaW5kZXg7XG4gICAgfTtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZnVuY3Rpb24gKGRlbHRhKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSB7IHRleHQ6IGRlbHRhLmFjdGlvblswXSA9PSAnaScgPyBkZWx0YS5saW5lcyA6IFtdIH07XG4gICAgICAgIHZhciBjdXJPcCA9IHRoaXMuY3VyT3AgPSB0aGlzLmN1ck9wIHx8IHt9O1xuICAgICAgICBpZiAoIWN1ck9wLmNoYW5nZUhhbmRsZXJzKVxuICAgICAgICAgICAgY3VyT3AuY2hhbmdlSGFuZGxlcnMgPSB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY2hhbmdlXCJdICYmIHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjaGFuZ2VcIl0uc2xpY2UoKTtcbiAgICAgICAgaWYgKCFjdXJPcC5sYXN0Q2hhbmdlKSB7XG4gICAgICAgICAgICBjdXJPcC5sYXN0Q2hhbmdlID0gY3VyT3AuY2hhbmdlID0gY2hhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VyT3AubGFzdENoYW5nZS5uZXh0ID0gY3VyT3AubGFzdENoYW5nZSA9IGNoYW5nZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiR1cGRhdGVNYXJrZXJzKGRlbHRhKTtcbiAgICB9O1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdXJPcCA9IHRoaXMuY3VyT3AgPSB0aGlzLmN1ck9wIHx8IHt9O1xuICAgICAgICBpZiAoIWN1ck9wLmN1cnNvckFjdGl2aXR5SGFuZGxlcnMpXG4gICAgICAgICAgICBjdXJPcC5jdXJzb3JBY3Rpdml0eUhhbmRsZXJzID0gdGhpcy5fZXZlbnRSZWdpc3RyeVtcImN1cnNvckFjdGl2aXR5XCJdICYmIHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjdXJzb3JBY3Rpdml0eVwiXS5zbGljZSgpO1xuICAgICAgICB0aGlzLmN1ck9wLmN1cnNvckFjdGl2aXR5ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWNlLmluTXVsdGlTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmFjZS5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcihtdWx0aVNlbGVjdENvbW1hbmRzLmtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZuLCBmb3JjZSkge1xuICAgICAgICBpZiAoIWZvcmNlICYmIHRoaXMuY3VyT3AgfHwgZm9yY2UgJiYgdGhpcy5jdXJPcCAmJiB0aGlzLmN1ck9wLmZvcmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9yY2UgfHwgIXRoaXMuYWNlLmN1ck9wKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJPcClcbiAgICAgICAgICAgICAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmFjZS5jdXJPcCkge1xuICAgICAgICAgICAgdmFyIHByZXZPcCA9IHRoaXMuYWNlLnByZXZPcDtcbiAgICAgICAgICAgIHRoaXMuYWNlLnN0YXJ0T3BlcmF0aW9uKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiB7IG5hbWU6IFwidmltXCIsIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJPcCA9IHRoaXMuY3VyT3AgPSB0aGlzLmN1ck9wIHx8IHt9O1xuICAgICAgICB0aGlzLmN1ck9wLmZvcmNlID0gZm9yY2U7XG4gICAgICAgIHZhciByZXN1bHQgPSBmbigpO1xuICAgICAgICBpZiAodGhpcy5hY2UuY3VyT3AgJiYgdGhpcy5hY2UuY3VyT3AuY29tbWFuZC5uYW1lID09IFwidmltXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmRpYWxvZylcbiAgICAgICAgICAgICAgICB0aGlzLmFjZS5jdXJPcC5jb21tYW5kLnNjcm9sbEludG9WaWV3ID0gdGhpcy5hY2UuY3VyT3AudmltRGlhbG9nU2Nyb2xsO1xuICAgICAgICAgICAgdGhpcy5hY2UuZW5kT3BlcmF0aW9uKCk7XG4gICAgICAgICAgICBpZiAoIWN1ck9wLmN1cnNvckFjdGl2aXR5ICYmICFjdXJPcC5sYXN0Q2hhbmdlICYmIHByZXZPcClcbiAgICAgICAgICAgICAgICB0aGlzLmFjZS5wcmV2T3AgPSBwcmV2T3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcmNlIHx8ICF0aGlzLmFjZS5jdXJPcCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VyT3ApXG4gICAgICAgICAgICAgICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3AgPSB0aGlzLmN1ck9wO1xuICAgICAgICBpZiAob3ApIHtcbiAgICAgICAgICAgIGlmIChvcC5jaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25hbChcImNoYW5nZVwiLCBvcC5jaGFuZ2UsIG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcCAmJiBvcC5jdXJzb3JBY3Rpdml0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2lnbmFsKFwiY3Vyc29yQWN0aXZpdHlcIiwgbnVsbCwgb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJPcCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuc2lnbmFsID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZSwgaGFuZGxlcnMpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXJzID8gaGFuZGxlcnNbZXZlbnROYW1lICsgXCJIYW5kbGVyc1wiXVxuICAgICAgICAgICAgOiAodGhpcy5fZXZlbnRSZWdpc3RyeSB8fCB7fSlbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGxpc3RlbmVyc1tpXSh0aGlzLCBlKTtcbiAgICB9O1xuICAgIHRoaXMuZmlyc3RMaW5lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfTtcbiAgICB0aGlzLmxhc3RMaW5lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMZW5ndGgoKSAtIDE7IH07XG4gICAgdGhpcy5saW5lQ291bnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmdldExlbmd0aCgpOyB9O1xuICAgIHRoaXMuc2V0Q3Vyc29yID0gZnVuY3Rpb24gKGxpbmUsIGNoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbGluZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNoID0gbGluZS5jaDtcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lLmxpbmU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3VsZFNjcm9sbCA9ICF0aGlzLmN1ck9wICYmICF0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlO1xuICAgICAgICBpZiAoIXRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpXG4gICAgICAgICAgICB0aGlzLmFjZS5leGl0TXVsdGlTZWxlY3RNb2RlKCk7XG4gICAgICAgIHRoaXMuYWNlLnNlc3Npb24udW5mb2xkKHsgcm93OiBsaW5lLCBjb2x1bW46IGNoIH0pO1xuICAgICAgICB0aGlzLmFjZS5zZWxlY3Rpb24ubW92ZVRvKGxpbmUsIGNoKTtcbiAgICAgICAgaWYgKHNob3VsZFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5hY2UucmVuZGVyZXIuc2Nyb2xsQ3Vyc29ySW50b1ZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuYWNlLmVuZE9wZXJhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmdldEN1cnNvciA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgICAgIHZhciBwb3MgPSBwID09ICdhbmNob3InID8gKHNlbC5pc0VtcHR5KCkgPyBzZWwubGVhZCA6IHNlbC5hbmNob3IpIDpcbiAgICAgICAgICAgIHAgPT0gJ2hlYWQnIHx8ICFwID8gc2VsLmxlYWQgOiBzZWwuZ2V0UmFuZ2UoKVtwXTtcbiAgICAgICAgcmV0dXJuIHRvQ21Qb3MocG9zKTtcbiAgICB9O1xuICAgIHRoaXMubGlzdFNlbGVjdGlvbnMgPSBmdW5jdGlvbiAocCkge1xuICAgICAgICB2YXIgcmFuZ2VzID0gdGhpcy5hY2UubXVsdGlTZWxlY3QucmFuZ2VMaXN0LnJhbmdlcztcbiAgICAgICAgaWYgKCFyYW5nZXMubGVuZ3RoIHx8IHRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpXG4gICAgICAgICAgICByZXR1cm4gW3sgYW5jaG9yOiB0aGlzLmdldEN1cnNvcignYW5jaG9yJyksIGhlYWQ6IHRoaXMuZ2V0Q3Vyc29yKCdoZWFkJykgfV07XG4gICAgICAgIHJldHVybiByYW5nZXMubWFwKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFuY2hvcjogdGhpcy5jbGlwUG9zKHRvQ21Qb3Moci5jdXJzb3IgPT0gci5lbmQgPyByLnN0YXJ0IDogci5lbmQpKSxcbiAgICAgICAgICAgICAgICBoZWFkOiB0aGlzLmNsaXBQb3ModG9DbVBvcyhyLmN1cnNvcikpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyA9IGZ1bmN0aW9uIChwLCBwcmltSW5kZXgpIHtcbiAgICAgICAgdmFyIHNlbCA9IHRoaXMuYWNlLm11bHRpU2VsZWN0O1xuICAgICAgICB2YXIgcmFuZ2VzID0gcC5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSB0b0FjZVBvcyh4LmFuY2hvcik7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IHRvQWNlUG9zKHguaGVhZCk7XG4gICAgICAgICAgICB2YXIgciA9IFJhbmdlLmNvbXBhcmVQb2ludHMoYW5jaG9yLCBoZWFkKSA8IDBcbiAgICAgICAgICAgICAgICA/IG5ldyBSYW5nZS5mcm9tUG9pbnRzKGFuY2hvciwgaGVhZClcbiAgICAgICAgICAgICAgICA6IG5ldyBSYW5nZS5mcm9tUG9pbnRzKGhlYWQsIGFuY2hvcik7XG4gICAgICAgICAgICByLmN1cnNvciA9IFJhbmdlLmNvbXBhcmVQb2ludHMoci5zdGFydCwgaGVhZCkgPyByLmVuZCA6IHIuc3RhcnQ7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmFjZS5zZWxlY3Rpb24uZnJvbU9yaWVudGVkUmFuZ2UocmFuZ2VzWzBdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByaW1JbmRleCkge1xuICAgICAgICAgICAgcmFuZ2VzID0gcmFuZ2VzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyYW5nZXNbcHJpbUluZGV4XSkge1xuICAgICAgICAgICAgcmFuZ2VzLnB1c2gocmFuZ2VzLnNwbGljZShwcmltSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBzZWwudG9TaW5nbGVSYW5nZShyYW5nZXNbMF0uY2xvbmUoKSk7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5hY2Uuc2Vzc2lvbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uJGNsaXBSYW5nZVRvRG9jdW1lbnQocmFuZ2VzW2ldKTsgLy8gdG9kbyB3aHkgYWNlIGRvZXNuJ3QgZG8gdGhpcz9cbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuc2V0U2VsZWN0aW9uID0gZnVuY3Rpb24gKGEsIGgsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICAgICAgc2VsLm1vdmVUbyhhLmxpbmUsIGEuY2gpO1xuICAgICAgICBzZWwuc2VsZWN0VG8oaC5saW5lLCBoLmNoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vcmlnaW4gPT0gJyptb3VzZScpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zb21ldGhpbmdTZWxlY3RlZCA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5hY2Uuc2VsZWN0aW9uLmlzRW1wdHkoKTtcbiAgICB9O1xuICAgIHRoaXMuY2xpcFBvcyA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmFjZS5zZXNzaW9uLiRjbGlwUG9zaXRpb25Ub0RvY3VtZW50KHAubGluZSwgcC5jaCk7XG4gICAgICAgIHJldHVybiB0b0NtUG9zKHBvcyk7XG4gICAgfTtcbiAgICB0aGlzLmZvbGRDb2RlID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLiR0b2dnbGVGb2xkV2lkZ2V0KHBvcy5saW5lLCB7fSk7XG4gICAgfTtcbiAgICB0aGlzLm1hcmtUZXh0ID0gZnVuY3Rpb24gKGN1cnNvcikge1xuICAgICAgICByZXR1cm4geyBjbGVhcjogZnVuY3Rpb24gKCkgeyB9LCBmaW5kOiBmdW5jdGlvbiAoKSB7IH0gfTtcbiAgICB9O1xuICAgIHRoaXMuJHVwZGF0ZU1hcmtlcnMgPSBmdW5jdGlvbiAoZGVsdGEpIHtcbiAgICAgICAgdmFyIGlzSW5zZXJ0ID0gZGVsdGEuYWN0aW9uID09IFwiaW5zZXJ0XCI7XG4gICAgICAgIHZhciBzdGFydCA9IGRlbHRhLnN0YXJ0O1xuICAgICAgICB2YXIgZW5kID0gZGVsdGEuZW5kO1xuICAgICAgICB2YXIgcm93U2hpZnQgPSAoZW5kLnJvdyAtIHN0YXJ0LnJvdykgKiAoaXNJbnNlcnQgPyAxIDogLTEpO1xuICAgICAgICB2YXIgY29sU2hpZnQgPSAoZW5kLmNvbHVtbiAtIHN0YXJ0LmNvbHVtbikgKiAoaXNJbnNlcnQgPyAxIDogLTEpO1xuICAgICAgICBpZiAoaXNJbnNlcnQpXG4gICAgICAgICAgICBlbmQgPSBzdGFydDtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLm1hcmtzKSB7XG4gICAgICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLm1hcmtzW2ldO1xuICAgICAgICAgICAgdmFyIGNtcCA9IFJhbmdlLmNvbXBhcmVQb2ludHMocG9pbnQsIHN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChjbXAgPCAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7IC8vIGRlbHRhIHN0YXJ0cyBhZnRlciB0aGUgcmFuZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjbXAgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNJbnNlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50LmJpYXMgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY21wID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50LmJpYXMgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNtcDIgPSBpc0luc2VydCA/IGNtcCA6IFJhbmdlLmNvbXBhcmVQb2ludHMocG9pbnQsIGVuZCk7XG4gICAgICAgICAgICBpZiAoY21wMiA+IDApIHtcbiAgICAgICAgICAgICAgICBwb2ludC5yb3cgKz0gcm93U2hpZnQ7XG4gICAgICAgICAgICAgICAgcG9pbnQuY29sdW1uICs9IHBvaW50LnJvdyA9PSBlbmQucm93ID8gY29sU2hpZnQgOiAwO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0luc2VydCAmJiBjbXAyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBwb2ludC5yb3cgPSBzdGFydC5yb3c7XG4gICAgICAgICAgICAgICAgcG9pbnQuY29sdW1uID0gc3RhcnQuY29sdW1uO1xuICAgICAgICAgICAgICAgIGlmIChjbXAyID09PSAwKVxuICAgICAgICAgICAgICAgICAgICBwb2ludC5iaWFzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIE1hcmtlciA9IGZ1bmN0aW9uIChjbSwgaWQsIHJvdywgY29sdW1uKSB7XG4gICAgICAgIHRoaXMuY20gPSBjbTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIGNtLm1hcmtzW3RoaXMuaWRdID0gdGhpcztcbiAgICB9O1xuICAgIE1hcmtlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7IGRlbGV0ZSB0aGlzLmNtLm1hcmtzW3RoaXMuaWRdOyB9O1xuICAgIE1hcmtlci5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvQ21Qb3ModGhpcyk7IH07XG4gICAgdGhpcy5zZXRCb29rbWFyayA9IGZ1bmN0aW9uIChjdXJzb3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGJtID0gbmV3IE1hcmtlcih0aGlzLCB0aGlzLiR1aWQrKywgY3Vyc29yLmxpbmUsIGN1cnNvci5jaCk7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5pbnNlcnRMZWZ0KVxuICAgICAgICAgICAgYm0uJGluc2VydFJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tYXJrc1tibS5pZF0gPSBibTtcbiAgICAgICAgcmV0dXJuIGJtO1xuICAgIH07XG4gICAgdGhpcy5tb3ZlSCA9IGZ1bmN0aW9uIChpbmNyZW1lbnQsIHVuaXQpIHtcbiAgICAgICAgaWYgKHVuaXQgPT0gJ2NoYXInKSB7XG4gICAgICAgICAgICB2YXIgc2VsID0gdGhpcy5hY2Uuc2VsZWN0aW9uO1xuICAgICAgICAgICAgc2VsLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBzZWwubW92ZUN1cnNvckJ5KDAsIGluY3JlbWVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZmluZFBvc1YgPSBmdW5jdGlvbiAoc3RhcnQsIGFtb3VudCwgdW5pdCwgZ29hbENvbHVtbikge1xuICAgICAgICBpZiAodW5pdCA9PSAncGFnZScpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgICAgICAgICAgYW1vdW50ID0gYW1vdW50ICogTWF0aC5mbG9vcihjb25maWcuaGVpZ2h0IC8gY29uZmlnLmxpbmVIZWlnaHQpO1xuICAgICAgICAgICAgdW5pdCA9ICdsaW5lJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodW5pdCA9PSAnbGluZScpIHtcbiAgICAgICAgICAgIHZhciBzY3JlZW5Qb3MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihzdGFydC5saW5lLCBzdGFydC5jaCk7XG4gICAgICAgICAgICBpZiAoZ29hbENvbHVtbiAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHNjcmVlblBvcy5jb2x1bW4gPSBnb2FsQ29sdW1uO1xuICAgICAgICAgICAgc2NyZWVuUG9zLnJvdyArPSBhbW91bnQ7XG4gICAgICAgICAgICBzY3JlZW5Qb3Mucm93ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgc2NyZWVuUG9zLnJvdyksIHRoaXMuYWNlLnNlc3Npb24uZ2V0U2NyZWVuTGVuZ3RoKCkgLSAxKTtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmFjZS5zZXNzaW9uLnNjcmVlblRvRG9jdW1lbnRQb3NpdGlvbihzY3JlZW5Qb3Mucm93LCBzY3JlZW5Qb3MuY29sdW1uKTtcbiAgICAgICAgICAgIHJldHVybiB0b0NtUG9zKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5jaGFyQ29vcmRzID0gZnVuY3Rpb24gKHBvcywgbW9kZSkge1xuICAgICAgICBpZiAobW9kZSA9PSAnZGl2JyB8fCAhbW9kZSkge1xuICAgICAgICAgICAgdmFyIHNjID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUG9zaXRpb24ocG9zLmxpbmUsIHBvcy5jaCk7XG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0OiBzYy5jb2x1bW4sIHRvcDogc2Mucm93IH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGUgPT0gJ2xvY2FsJykge1xuICAgICAgICAgICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgICAgICAgICB2YXIgc2MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihwb3MubGluZSwgcG9zLmNoKTtcbiAgICAgICAgICAgIHZhciBsaCA9IHJlbmRlcmVyLmxheWVyQ29uZmlnLmxpbmVIZWlnaHQ7XG4gICAgICAgICAgICB2YXIgY3cgPSByZW5kZXJlci5sYXllckNvbmZpZy5jaGFyYWN0ZXJXaWR0aDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBsaCAqIHNjLnJvdztcbiAgICAgICAgICAgIHJldHVybiB7IGxlZnQ6IHNjLmNvbHVtbiAqIGN3LCB0b3A6IHRvcCwgYm90dG9tOiB0b3AgKyBsaCB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmNvb3Jkc0NoYXIgPSBmdW5jdGlvbiAocG9zLCBtb2RlKSB7XG4gICAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgICBpZiAobW9kZSA9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihwb3MudG9wIC8gcmVuZGVyZXIubGluZUhlaWdodCkpO1xuICAgICAgICAgICAgdmFyIGNvbCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IocG9zLmxlZnQgLyByZW5kZXJlci5jaGFyYWN0ZXJXaWR0aCkpO1xuICAgICAgICAgICAgdmFyIGNoID0gcmVuZGVyZXIuc2Vzc2lvbi5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24ocm93LCBjb2wpO1xuICAgICAgICAgICAgcmV0dXJuIHRvQ21Qb3MoY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT0gJ2RpdicpIHtcbiAgICAgICAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZ2V0U2VhcmNoQ3Vyc29yID0gZnVuY3Rpb24gKHF1ZXJ5LCBwb3MsIGNhc2VGb2xkKSB7XG4gICAgICAgIHZhciBjYXNlU2Vuc2l0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBpc1JlZ2V4cCA9IGZhbHNlO1xuICAgICAgICBpZiAocXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgJiYgIXF1ZXJ5Lmdsb2JhbCkge1xuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZSA9ICFxdWVyeS5pZ25vcmVDYXNlO1xuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS5zb3VyY2U7XG4gICAgICAgICAgICBpc1JlZ2V4cCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1ZXJ5ID09IFwiXFxcXG5cIikge1xuICAgICAgICAgICAgcXVlcnkgPSBcIlxcblwiO1xuICAgICAgICAgICAgaXNSZWdleHAgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCgpO1xuICAgICAgICBpZiAocG9zLmNoID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHBvcy5jaCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIHZhciBhY2VQb3MgPSB7IHJvdzogcG9zLmxpbmUsIGNvbHVtbjogcG9zLmNoIH07XG4gICAgICAgIHZhciBjbSA9IHRoaXM7XG4gICAgICAgIHZhciBsYXN0ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbmROZXh0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmZpbmQoZmFsc2UpOyB9LFxuICAgICAgICAgICAgZmluZFByZXZpb3VzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmZpbmQodHJ1ZSk7IH0sXG4gICAgICAgICAgICBmaW5kOiBmdW5jdGlvbiAoYmFjaykge1xuICAgICAgICAgICAgICAgIHNlYXJjaC5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgbmVlZGxlOiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogY2FzZVNlbnNpdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgd3JhcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGJhY2t3YXJkczogYmFjayxcbiAgICAgICAgICAgICAgICAgICAgcmVnRXhwOiBpc1JlZ2V4cCxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGxhc3QgfHwgYWNlUG9zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gc2VhcmNoLmZpbmQoY20uYWNlLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGxhc3QgPSByYW5nZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFzdCAmJiBbIWxhc3QuaXNFbXB0eSgpXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tOiBmdW5jdGlvbiAoKSB7IHJldHVybiBsYXN0ICYmIHRvQ21Qb3MobGFzdC5zdGFydCk7IH0sXG4gICAgICAgICAgICB0bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGFzdCAmJiB0b0NtUG9zKGxhc3QuZW5kKTsgfSxcbiAgICAgICAgICAgIHJlcGxhY2U6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5lbmQgPSBjbS5hY2Uuc2Vzc2lvbi5kb2MucmVwbGFjZShsYXN0LCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB0aGlzLnNjcm9sbFRvID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICAgICAgdmFyIG1heEhlaWdodCA9IGNvbmZpZy5tYXhIZWlnaHQ7XG4gICAgICAgIG1heEhlaWdodCAtPSAocmVuZGVyZXIuJHNpemUuc2Nyb2xsZXJIZWlnaHQgLSByZW5kZXJlci5saW5lSGVpZ2h0KSAqIHJlbmRlcmVyLiRzY3JvbGxQYXN0RW5kO1xuICAgICAgICBpZiAoeSAhPSBudWxsKVxuICAgICAgICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5zZXRTY3JvbGxUb3AoTWF0aC5tYXgoMCwgTWF0aC5taW4oeSwgbWF4SGVpZ2h0KSkpO1xuICAgICAgICBpZiAoeCAhPSBudWxsKVxuICAgICAgICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5zZXRTY3JvbGxMZWZ0KE1hdGgubWF4KDAsIE1hdGgubWluKHgsIGNvbmZpZy53aWR0aCkpKTtcbiAgICB9O1xuICAgIHRoaXMuc2Nyb2xsSW5mbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH07XG4gICAgdGhpcy5zY3JvbGxJbnRvVmlldyA9IGZ1bmN0aW9uIChwb3MsIG1hcmdpbikge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICAgICAgICAgIHZhciB2aWV3TWFyZ2luID0geyBcInRvcFwiOiAwLCBcImJvdHRvbVwiOiBtYXJnaW4gfTtcbiAgICAgICAgICAgIHJlbmRlcmVyLnNjcm9sbEN1cnNvckludG9WaWV3KHRvQWNlUG9zKHBvcyksIChyZW5kZXJlci5saW5lSGVpZ2h0ICogMikgLyByZW5kZXJlci4kc2l6ZS5zY3JvbGxlckhlaWdodCwgdmlld01hcmdpbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZ2V0TGluZSA9IGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZShyb3cpOyB9O1xuICAgIHRoaXMuZ2V0UmFuZ2UgPSBmdW5jdGlvbiAocywgZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UobmV3IFJhbmdlKHMubGluZSwgcy5jaCwgZS5saW5lLCBlLmNoKSk7XG4gICAgfTtcbiAgICB0aGlzLnJlcGxhY2VSYW5nZSA9IGZ1bmN0aW9uICh0ZXh0LCBzLCBlKSB7XG4gICAgICAgIGlmICghZSlcbiAgICAgICAgICAgIGUgPSBzO1xuICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgUmFuZ2Uocy5saW5lLCBzLmNoLCBlLmxpbmUsIGUuY2gpO1xuICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLiRjbGlwUmFuZ2VUb0RvY3VtZW50KHJhbmdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShyYW5nZSwgdGV4dCk7XG4gICAgfTtcbiAgICB0aGlzLnJlcGxhY2VTZWxlY3Rpb24gPVxuICAgICAgICB0aGlzLnJlcGxhY2VTZWxlY3Rpb25zID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZiAodGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShzZWwuZ2V0UmFuZ2UoKSwgcFswXSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWwuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmFuZ2VzID0gc2VsLnJhbmdlTGlzdC5yYW5nZXM7XG4gICAgICAgICAgICBpZiAoIXJhbmdlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmFuZ2VzID0gW3RoaXMuYWNlLm11bHRpU2VsZWN0LmdldFJhbmdlKCldO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHJhbmdlcy5sZW5ndGg7IGktLTspXG4gICAgICAgICAgICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5yZXBsYWNlKHJhbmdlc1tpXSwgcFtpXSB8fCBcIlwiKTtcbiAgICAgICAgICAgIHNlbC5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgdGhpcy5nZXRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjZS5nZXRTZWxlY3RlZFRleHQoKTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0U2VsZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdGlvbnMoKS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJhbmdlKHguYW5jaG9yLCB4LmhlYWQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0SW5wdXRGaWVsZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnRleHRJbnB1dC5nZXRFbGVtZW50KCk7XG4gICAgfTtcbiAgICB0aGlzLmdldFdyYXBwZXJFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2UuY29udGFpbmVyO1xuICAgIH07XG4gICAgdmFyIG9wdE1hcCA9IHtcbiAgICAgICAgaW5kZW50V2l0aFRhYnM6IFwidXNlU29mdFRhYnNcIixcbiAgICAgICAgaW5kZW50VW5pdDogXCJ0YWJTaXplXCIsXG4gICAgICAgIHRhYlNpemU6IFwidGFiU2l6ZVwiLFxuICAgICAgICBmaXJzdExpbmVOdW1iZXI6IFwiZmlyc3RMaW5lTnVtYmVyXCIsXG4gICAgICAgIHJlYWRPbmx5OiBcInJlYWRPbmx5XCJcbiAgICB9O1xuICAgIHRoaXMuc2V0T3B0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xuICAgICAgICB0aGlzLnN0YXRlW25hbWVdID0gdmFsO1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2luZGVudFdpdGhUYWJzJzpcbiAgICAgICAgICAgICAgICBuYW1lID0gb3B0TWFwW25hbWVdO1xuICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdrZXlNYXAnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuJGtleU1hcCA9IHZhbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG5hbWUgPSBvcHRNYXBbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUpXG4gICAgICAgICAgICB0aGlzLmFjZS5zZXRPcHRpb24obmFtZSwgdmFsKTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0T3B0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgdmFyIGFjZU9wdCA9IG9wdE1hcFtuYW1lXTtcbiAgICAgICAgaWYgKGFjZU9wdClcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuYWNlLmdldE9wdGlvbihhY2VPcHQpO1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2luZGVudFdpdGhUYWJzJzpcbiAgICAgICAgICAgICAgICBuYW1lID0gb3B0TWFwW25hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiAhdmFsO1xuICAgICAgICAgICAgY2FzZSAna2V5TWFwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS4ka2V5TWFwIHx8ICd2aW0nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2VPcHQgPyB2YWwgOiB0aGlzLnN0YXRlW25hbWVdO1xuICAgIH07XG4gICAgdGhpcy50b2dnbGVPdmVyd3JpdGUgPSBmdW5jdGlvbiAob24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5vdmVyd3JpdGUgPSBvbjtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnNldE92ZXJ3cml0ZShvbik7XG4gICAgfTtcbiAgICB0aGlzLmFkZE92ZXJsYXkgPSBmdW5jdGlvbiAobykge1xuICAgICAgICBpZiAoIXRoaXMuJHNlYXJjaEhpZ2hsaWdodCB8fCAhdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LnNlc3Npb24pIHtcbiAgICAgICAgICAgIHZhciBoaWdobGlnaHQgPSBuZXcgU2VhcmNoSGlnaGxpZ2h0KG51bGwsIFwiYWNlX2hpZ2hsaWdodC1tYXJrZXJcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICAgICAgdmFyIG1hcmtlciA9IHRoaXMuYWNlLnNlc3Npb24uYWRkRHluYW1pY01hcmtlcihoaWdobGlnaHQpO1xuICAgICAgICAgICAgaGlnaGxpZ2h0LmlkID0gbWFya2VyLmlkO1xuICAgICAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24gPSB0aGlzLmFjZS5zZXNzaW9uO1xuICAgICAgICAgICAgaGlnaGxpZ2h0LmRlc3Ryb3kgPSBmdW5jdGlvbiAobykge1xuICAgICAgICAgICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLm9mZihcImNoYW5nZVwiLCBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLm9mZihcImNoYW5nZUVkaXRvclwiLCBoaWdobGlnaHQuZGVzdHJveSk7XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ucmVtb3ZlTWFya2VyKGhpZ2hsaWdodC5pZCk7XG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24gPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGhpZ2hsaWdodC51cGRhdGVPbkNoYW5nZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciByb3cgPSBkZWx0YS5zdGFydC5yb3c7XG4gICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBkZWx0YS5lbmQucm93KVxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQuY2FjaGVbcm93XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodC5jYWNoZS5zcGxpY2Uocm93LCBoaWdobGlnaHQuY2FjaGUubGVuZ3RoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vbihcImNoYW5nZUVkaXRvclwiLCBoaWdobGlnaHQuZGVzdHJveSk7XG4gICAgICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vbihcImNoYW5nZVwiLCBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoby5xdWVyeS5zb3VyY2UsIFwiZ21pXCIpO1xuICAgICAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQgPSBvLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LnNldFJlZ2V4cChyZSk7XG4gICAgICAgIHRoaXMuYWNlLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gICAgfTtcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXkgPSBmdW5jdGlvbiAobykge1xuICAgICAgICBpZiAodGhpcy4kc2VhcmNoSGlnaGxpZ2h0ICYmIHRoaXMuJHNlYXJjaEhpZ2hsaWdodC5zZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmdldFNjcm9sbEluZm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgICB2YXIgY29uZmlnID0gcmVuZGVyZXIubGF5ZXJDb25maWc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiByZW5kZXJlci5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgdG9wOiByZW5kZXJlci5zY3JvbGxUb3AsXG4gICAgICAgICAgICBoZWlnaHQ6IGNvbmZpZy5tYXhIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoLFxuICAgICAgICAgICAgY2xpZW50SGVpZ2h0OiBjb25maWcuaGVpZ2h0LFxuICAgICAgICAgICAgY2xpZW50V2lkdGg6IGNvbmZpZy53aWR0aFxuICAgICAgICB9O1xuICAgIH07XG4gICAgdGhpcy5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLmdldFZhbHVlKCk7XG4gICAgfTtcbiAgICB0aGlzLnNldFZhbHVlID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnNldFZhbHVlKHYsIC0xKTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0VG9rZW5UeXBlQXQgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHRoaXMuYWNlLnNlc3Npb24uZ2V0VG9rZW5BdChwb3MubGluZSwgcG9zLmNoKTtcbiAgICAgICAgcmV0dXJuIHRva2VuICYmIC9jb21tZW50fHN0cmluZy8udGVzdCh0b2tlbi50eXBlKSA/IFwic3RyaW5nXCIgOiBcIlwiO1xuICAgIH07XG4gICAgdGhpcy5maW5kTWF0Y2hpbmdCcmFja2V0ID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB2YXIgbSA9IHRoaXMuYWNlLnNlc3Npb24uZmluZE1hdGNoaW5nQnJhY2tldCh0b0FjZVBvcyhwb3MpKTtcbiAgICAgICAgcmV0dXJuIHsgdG86IG0gJiYgdG9DbVBvcyhtKSB9O1xuICAgIH07XG4gICAgdGhpcy5maW5kTWF0Y2hpbmdUYWcgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRNYXRjaGluZ1RhZ3ModG9BY2VQb3MocG9zKSk7XG4gICAgICAgIGlmICghbSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wZW46IHtcbiAgICAgICAgICAgICAgICBmcm9tOiB0b0NtUG9zKG0ub3BlblRhZy5zdGFydCksXG4gICAgICAgICAgICAgICAgdG86IHRvQ21Qb3MobS5vcGVuVGFnLmVuZClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZToge1xuICAgICAgICAgICAgICAgIGZyb206IHRvQ21Qb3MobS5jbG9zZVRhZy5zdGFydCksXG4gICAgICAgICAgICAgICAgdG86IHRvQ21Qb3MobS5jbG9zZVRhZy5lbmQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB0aGlzLmluZGVudExpbmUgPSBmdW5jdGlvbiAobGluZSwgbWV0aG9kKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IHRydWUpXG4gICAgICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLmluZGVudFJvd3MobGluZSwgbGluZSwgXCJcXHRcIik7XG4gICAgICAgIGVsc2UgaWYgKG1ldGhvZCA9PT0gZmFsc2UpXG4gICAgICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLm91dGRlbnRSb3dzKG5ldyBSYW5nZShsaW5lLCAwLCBsaW5lLCAwKSk7XG4gICAgfTtcbiAgICB0aGlzLmluZGV4RnJvbVBvcyA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleCh0b0FjZVBvcyhwb3MpKTtcbiAgICB9O1xuICAgIHRoaXMucG9zRnJvbUluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0b0NtUG9zKHRoaXMuYWNlLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihpbmRleCkpO1xuICAgIH07XG4gICAgdGhpcy5mb2N1cyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2UudGV4dElucHV0LmZvY3VzKCk7XG4gICAgfTtcbiAgICB0aGlzLmJsdXIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLmJsdXIoKTtcbiAgICB9O1xuICAgIHRoaXMuZGVmYXVsdFRleHRIZWlnaHQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnJlbmRlcmVyLmxheWVyQ29uZmlnLmxpbmVIZWlnaHQ7XG4gICAgfTtcbiAgICB0aGlzLnNjYW5Gb3JCcmFja2V0ID0gZnVuY3Rpb24gKHBvcywgZGlyLCBfLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciByZSA9IG9wdGlvbnMuYnJhY2tldFJlZ2V4LnNvdXJjZTtcbiAgICAgICAgdmFyIHRva2VuUmUgPSAvcGFyZW58dGV4dHxvcGVyYXRvcnx0YWcvO1xuICAgICAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi4kZmluZENsb3NpbmdCcmFja2V0KHJlLnNsaWNlKDEsIDIpLCB0b0FjZVBvcyhwb3MpLCB0b2tlblJlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi4kZmluZE9wZW5pbmdCcmFja2V0KHJlLnNsaWNlKC0yLCAtMSksIHsgcm93OiBwb3MubGluZSwgY29sdW1uOiBwb3MuY2ggKyAxIH0sIHRva2VuUmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtICYmIHsgcG9zOiB0b0NtUG9zKG0pIH07XG4gICAgfTtcbiAgICB0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjZS5yZXNpemUodHJ1ZSk7XG4gICAgfTtcbiAgICB0aGlzLmdldE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7IG5hbWU6IHRoaXMuZ2V0T3B0aW9uKFwibW9kZVwiKSB9O1xuICAgIH07XG4gICAgdGhpcy5leGVjQ29tbWFuZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmIChDb2RlTWlycm9yLmNvbW1hbmRzLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuIENvZGVNaXJyb3IuY29tbWFuZHNbbmFtZV0odGhpcyk7XG4gICAgICAgIGlmIChuYW1lID09IFwiaW5kZW50QXV0b1wiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWNlLmV4ZWNDb21tYW5kKFwiYXV0b2luZGVudFwiKTtcbiAgICAgICAgY29uc29sZS5sb2cobmFtZSArIFwiIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9O1xuICAgIHRoaXMuZ2V0TGluZU51bWJlciA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZS5yb3c7XG4gICAgfTtcbiAgICB0aGlzLmdldExpbmVIYW5kbGUgPSBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiB7IHRleHQ6IHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZShyb3cpLCByb3c6IHJvdyB9O1xuICAgIH07XG59KS5jYWxsKENvZGVNaXJyb3IucHJvdG90eXBlKTtcbmZ1bmN0aW9uIHRvQWNlUG9zKGNtUG9zKSB7XG4gICAgcmV0dXJuIHsgcm93OiBjbVBvcy5saW5lLCBjb2x1bW46IGNtUG9zLmNoIH07XG59XG5mdW5jdGlvbiB0b0NtUG9zKGFjZVBvcykge1xuICAgIHJldHVybiBuZXcgUG9zKGFjZVBvcy5yb3csIGFjZVBvcy5jb2x1bW4pO1xufVxudmFyIFN0cmluZ1N0cmVhbSA9IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtID0gZnVuY3Rpb24gKHN0cmluZywgdGFiU2l6ZSkge1xuICAgIHRoaXMucG9zID0gdGhpcy5zdGFydCA9IDA7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWJTaXplID0gdGFiU2l6ZSB8fCA4O1xuICAgIHRoaXMubGFzdENvbHVtblBvcyA9IHRoaXMubGFzdENvbHVtblZhbHVlID0gMDtcbiAgICB0aGlzLmxpbmVTdGFydCA9IDA7XG59O1xuU3RyaW5nU3RyZWFtLnByb3RvdHlwZSA9IHtcbiAgICBlb2w6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMucG9zID49IHRoaXMuc3RyaW5nLmxlbmd0aDsgfSxcbiAgICBzb2w6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMucG9zID09IHRoaXMubGluZVN0YXJ0OyB9LFxuICAgIHBlZWs6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcykgfHwgdW5kZWZpbmVkOyB9LFxuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zIDwgdGhpcy5zdHJpbmcubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcysrKTtcbiAgICB9LFxuICAgIGVhdDogZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHZhciBjaCA9IHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcyk7XG4gICAgICAgIGlmICh0eXBlb2YgbWF0Y2ggPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHZhciBvayA9IGNoID09IG1hdGNoO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB2YXIgb2sgPSBjaCAmJiAobWF0Y2gudGVzdCA/IG1hdGNoLnRlc3QoY2gpIDogbWF0Y2goY2gpKTtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICArK3RoaXMucG9zO1xuICAgICAgICAgICAgcmV0dXJuIGNoO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBlYXRXaGlsZTogZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHRoaXMucG9zO1xuICAgICAgICB3aGlsZSAodGhpcy5lYXQobWF0Y2gpKSB7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zID4gc3RhcnQ7XG4gICAgfSxcbiAgICBlYXRTcGFjZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLnBvcztcbiAgICAgICAgd2hpbGUgKC9bXFxzXFx1MDBhMF0vLnRlc3QodGhpcy5zdHJpbmcuY2hhckF0KHRoaXMucG9zKSkpXG4gICAgICAgICAgICArK3RoaXMucG9zO1xuICAgICAgICByZXR1cm4gdGhpcy5wb3MgPiBzdGFydDtcbiAgICB9LFxuICAgIHNraXBUb0VuZDogZnVuY3Rpb24gKCkgeyB0aGlzLnBvcyA9IHRoaXMuc3RyaW5nLmxlbmd0aDsgfSxcbiAgICBza2lwVG86IGZ1bmN0aW9uIChjaCkge1xuICAgICAgICB2YXIgZm91bmQgPSB0aGlzLnN0cmluZy5pbmRleE9mKGNoLCB0aGlzLnBvcyk7XG4gICAgICAgIGlmIChmb3VuZCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnBvcyA9IGZvdW5kO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJhY2tVcDogZnVuY3Rpb24gKG4pIHsgdGhpcy5wb3MgLT0gbjsgfSxcbiAgICBjb2x1bW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgICB9LFxuICAgIGluZGVudGF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XG4gICAgfSxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHBhdHRlcm4sIGNvbnN1bWUsIGNhc2VJbnNlbnNpdGl2ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdmFyIGNhc2VkID0gZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gY2FzZUluc2Vuc2l0aXZlID8gc3RyLnRvTG93ZXJDYXNlKCkgOiBzdHI7IH07XG4gICAgICAgICAgICB2YXIgc3Vic3RyID0gdGhpcy5zdHJpbmcuc3Vic3RyKHRoaXMucG9zLCBwYXR0ZXJuLmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoY2FzZWQoc3Vic3RyKSA9PSBjYXNlZChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIGlmIChjb25zdW1lICE9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gcGF0dGVybi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLnN0cmluZy5zbGljZSh0aGlzLnBvcykubWF0Y2gocGF0dGVybik7XG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2guaW5kZXggPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG1hdGNoICYmIGNvbnN1bWUgIT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHRoaXMucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3VycmVudDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5zdHJpbmcuc2xpY2UodGhpcy5zdGFydCwgdGhpcy5wb3MpOyB9LFxuICAgIGhpZGVGaXJzdENoYXJzOiBmdW5jdGlvbiAobiwgaW5uZXIpIHtcbiAgICAgICAgdGhpcy5saW5lU3RhcnQgKz0gbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBpbm5lcigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5saW5lU3RhcnQgLT0gbjtcbiAgICAgICAgfVxuICAgIH1cbn07XG5Db2RlTWlycm9yLmRlZmluZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIENvZGVNaXJyb3IucHJvdG90eXBlW25hbWVdID0gZm47XG59O1xuZG9tTGliLmltcG9ydENzc1N0cmluZyhcIi5ub3JtYWwtbW9kZSAuYWNlX2N1cnNvcntcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwwLDAsMC41KTtcXG59XFxuLm5vcm1hbC1tb2RlIC5hY2VfaGlkZGVuLWN1cnNvcnMgLmFjZV9jdXJzb3J7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXG4gIG9wYWNpdHk6IDAuN1xcbn1cXG4uYWNlX2RpYWxvZyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwOyByaWdodDogMDtcXG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XFxuICB6LWluZGV4OiAxNTtcXG4gIHBhZGRpbmc6IC4xZW0gLjhlbTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLmFjZV9kaWFsb2ctdG9wIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNDQ0O1xcbiAgdG9wOiAwO1xcbn1cXG4uYWNlX2RpYWxvZy1ib3R0b20ge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0NDQ7XFxuICBib3R0b206IDA7XFxufVxcbi5hY2VfZGlhbG9nIGlucHV0IHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIHdpZHRoOiAyMGVtO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cIiwgXCJ2aW1Nb2RlXCIsIGZhbHNlKTtcbihmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gZGlhbG9nRGl2KGNtLCB0ZW1wbGF0ZSwgYm90dG9tKSB7XG4gICAgICAgIHZhciB3cmFwID0gY20uYWNlLmNvbnRhaW5lcjtcbiAgICAgICAgdmFyIGRpYWxvZztcbiAgICAgICAgZGlhbG9nID0gd3JhcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICAgICAgaWYgKGJvdHRvbSlcbiAgICAgICAgICAgIGRpYWxvZy5jbGFzc05hbWUgPSBcImFjZV9kaWFsb2cgYWNlX2RpYWxvZy1ib3R0b21cIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGlhbG9nLmNsYXNzTmFtZSA9IFwiYWNlX2RpYWxvZyBhY2VfZGlhbG9nLXRvcFwiO1xuICAgICAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGRpYWxvZy5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gQXNzdW1pbmcgaXQncyBhIGRldGFjaGVkIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgZGlhbG9nLmFwcGVuZENoaWxkKHRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlhbG9nO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9zZU5vdGlmaWNhdGlvbihjbSwgbmV3VmFsKSB7XG4gICAgICAgIGlmIChjbS5zdGF0ZS5jdXJyZW50Tm90aWZpY2F0aW9uQ2xvc2UpXG4gICAgICAgICAgICBjbS5zdGF0ZS5jdXJyZW50Tm90aWZpY2F0aW9uQ2xvc2UoKTtcbiAgICAgICAgY20uc3RhdGUuY3VycmVudE5vdGlmaWNhdGlvbkNsb3NlID0gbmV3VmFsO1xuICAgIH1cbiAgICBDb2RlTWlycm9yLmRlZmluZUV4dGVuc2lvbihcIm9wZW5EaWFsb2dcIiwgZnVuY3Rpb24gKHRlbXBsYXRlLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIGNsb3NlTm90aWZpY2F0aW9uKHRoaXMsIG51bGwpO1xuICAgICAgICB2YXIgZGlhbG9nID0gZGlhbG9nRGl2KHRoaXMsIHRlbXBsYXRlLCBvcHRpb25zLmJvdHRvbSk7XG4gICAgICAgIHZhciBjbG9zZWQgPSBmYWxzZSwgbWUgPSB0aGlzO1xuICAgICAgICB0aGlzLnN0YXRlLmRpYWxvZyA9IGRpYWxvZztcbiAgICAgICAgZnVuY3Rpb24gY2xvc2UobmV3VmFsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucC52YWx1ZSA9IG5ld1ZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjbG9zZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsICYmIG5ld1ZhbC50eXBlID09IFwiYmx1clwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZS5zdGF0ZS5kaWFsb2cgPT0gZGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnN0YXRlLmRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIG1lLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uQ2xvc2UpXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25DbG9zZShkaWFsb2cpO1xuICAgICAgICAgICAgICAgIHZhciBjbSA9IG1lO1xuICAgICAgICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY20uc3RhdGUudmltLnN0YXR1cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNtLmFjZS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbS5hY2UucmVuZGVyZXIuJGxvb3Auc2NoZWR1bGUoY20uYWNlLnJlbmRlcmVyLkNIQU5HRV9DVVJTT1IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5wID0gZGlhbG9nLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIilbMF0sIGJ1dHRvbjtcbiAgICAgICAgaWYgKGlucCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbnAudmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNlbGVjdFZhbHVlT25PcGVuICE9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgaW5wLnNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMub25JbnB1dClcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLm9uKGlucCwgXCJpbnB1dFwiLCBmdW5jdGlvbiAoZSkgeyBvcHRpb25zLm9uSW5wdXQoZSwgaW5wLnZhbHVlLCBjbG9zZSk7IH0pO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMub25LZXlVcClcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLm9uKGlucCwgXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkgeyBvcHRpb25zLm9uS2V5VXAoZSwgaW5wLnZhbHVlLCBjbG9zZSk7IH0pO1xuICAgICAgICAgICAgQ29kZU1pcnJvci5vbihpbnAsIFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub25LZXlEb3duICYmIG9wdGlvbnMub25LZXlEb3duKGUsIGlucC52YWx1ZSwgY2xvc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMylcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaW5wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3IHx8IChvcHRpb25zLmNsb3NlT25FbnRlciAhPT0gZmFsc2UgJiYgZS5rZXlDb2RlID09IDEzKSkge1xuICAgICAgICAgICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNsb3NlT25CbHVyICE9PSBmYWxzZSlcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLm9uKGlucCwgXCJibHVyXCIsIGNsb3NlKTtcbiAgICAgICAgICAgIGlucC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJ1dHRvbiA9IGRpYWxvZy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXSkge1xuICAgICAgICAgICAgQ29kZU1pcnJvci5vbihidXR0b24sIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgbWUuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2xvc2VPbkJsdXIgIT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIENvZGVNaXJyb3Iub24oYnV0dG9uLCBcImJsdXJcIiwgY2xvc2UpO1xuICAgICAgICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsb3NlO1xuICAgIH0pO1xuICAgIENvZGVNaXJyb3IuZGVmaW5lRXh0ZW5zaW9uKFwib3Blbk5vdGlmaWNhdGlvblwiLCBmdW5jdGlvbiAodGVtcGxhdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNlbGVjdGlvbk1vZGUoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2xvc2VOb3RpZmljYXRpb24odGhpcywgY2xvc2UpO1xuICAgICAgICB2YXIgZGlhbG9nID0gZGlhbG9nRGl2KHRoaXMsIHRlbXBsYXRlLCBvcHRpb25zICYmIG9wdGlvbnMuYm90dG9tKTtcbiAgICAgICAgdmFyIGNsb3NlZCA9IGZhbHNlLCBkb25lVGltZXI7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuZHVyYXRpb24gIT09IFwidW5kZWZpbmVkXCIgPyBvcHRpb25zLmR1cmF0aW9uIDogNTAwMDtcbiAgICAgICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICBpZiAoY2xvc2VkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZG9uZVRpbWVyKTtcbiAgICAgICAgICAgIGRpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBDb2RlTWlycm9yLm9uKGRpYWxvZywgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZHVyYXRpb24pXG4gICAgICAgICAgICBkb25lVGltZXIgPSBzZXRUaW1lb3V0KGNsb3NlLCBkdXJhdGlvbik7XG4gICAgICAgIHJldHVybiBjbG9zZTtcbiAgICB9KTtcbn0pKCk7XG52YXIgUG9zID0gQ29kZU1pcnJvci5Qb3M7XG5mdW5jdGlvbiB0cmFuc2Zvcm1DdXJzb3IoY20sIHJhbmdlKSB7XG4gICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICBpZiAoIXZpbSB8fCB2aW0uaW5zZXJ0TW9kZSlcbiAgICAgICAgcmV0dXJuIHJhbmdlLmhlYWQ7XG4gICAgdmFyIGhlYWQgPSB2aW0uc2VsLmhlYWQ7XG4gICAgaWYgKCFoZWFkKVxuICAgICAgICByZXR1cm4gcmFuZ2UuaGVhZDtcbiAgICBpZiAodmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgIGlmIChyYW5nZS5oZWFkLmxpbmUgIT0gaGVhZC5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJhbmdlLmZyb20oKSA9PSByYW5nZS5hbmNob3IgJiYgIXJhbmdlLmVtcHR5KCkpIHtcbiAgICAgICAgaWYgKHJhbmdlLmhlYWQubGluZSA9PSBoZWFkLmxpbmUgJiYgcmFuZ2UuaGVhZC5jaCAhPSBoZWFkLmNoKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3MocmFuZ2UuaGVhZC5saW5lLCByYW5nZS5oZWFkLmNoIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiByYW5nZS5oZWFkO1xufVxuZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCkge1xuICAgIGlmIChjdXJTdGFydC5saW5lID09PSBjdXJFbmQubGluZSAmJiBjdXJTdGFydC5jaCA+PSBjdXJFbmQuY2ggLSAxKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gY20uZ2V0TGluZShjdXJTdGFydC5saW5lKTtcbiAgICAgICAgdmFyIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGN1clN0YXJ0LmNoKTtcbiAgICAgICAgaWYgKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweEQ4RkYpIHtcbiAgICAgICAgICAgIGN1ckVuZC5jaCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBjdXJTdGFydCwgZW5kOiBjdXJFbmQgfTtcbn1cbnZhciBkZWZhdWx0S2V5bWFwID0gW1xuICAgIHsga2V5czogJzxMZWZ0PicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2gnIH0sXG4gICAgeyBrZXlzOiAnPFJpZ2h0PicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2wnIH0sXG4gICAgeyBrZXlzOiAnPFVwPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2snIH0sXG4gICAgeyBrZXlzOiAnPERvd24+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaicgfSxcbiAgICB7IGtleXM6ICdnPFVwPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2drJyB9LFxuICAgIHsga2V5czogJ2c8RG93bj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdnaicgfSxcbiAgICB7IGtleXM6ICc8U3BhY2U+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnbCcgfSxcbiAgICB7IGtleXM6ICc8QlM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaCcsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnPERlbD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICd4JywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICc8Qy1TcGFjZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdXJyB9LFxuICAgIHsga2V5czogJzxDLUJTPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ0InLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJzxTLVNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ3cnIH0sXG4gICAgeyBrZXlzOiAnPFMtQlM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnYicsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnPEMtbj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdqJyB9LFxuICAgIHsga2V5czogJzxDLXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaycgfSxcbiAgICB7IGtleXM6ICc8Qy1bPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JyB9LFxuICAgIHsga2V5czogJzxDLWM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sXG4gICAgeyBrZXlzOiAnPEMtWz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtYz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtRXNjPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JyB9LFxuICAgIHsga2V5czogJzxDLUVzYz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAncycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2NsJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdzJywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnYycsIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnUycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2NjJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdTJywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnVmRPJywgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICc8SG9tZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICcwJyB9LFxuICAgIHsga2V5czogJzxFbmQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnJCcgfSxcbiAgICB7IGtleXM6ICc8UGFnZVVwPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxDLWI+JyB9LFxuICAgIHsga2V5czogJzxQYWdlRG93bj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8Qy1mPicgfSxcbiAgICB7IGtleXM6ICc8Q1I+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnal4nLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJzxJbnM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaScsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnPElucz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlT3ZlcndyaXRlJywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICdIJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1RvcExpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdNJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb01pZGRsZUxpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdMJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb0JvdHRvbUxpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdoJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICdsJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ2onLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5TGluZXMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGxpbmV3aXNlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdrJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ2dqJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeURpc3BsYXlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnZ2snLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5RGlzcGxheUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAndycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJ1cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IGZhbHNlLCBiaWdXb3JkOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdlJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB3b3JkRW5kOiB0cnVlLCBpbmNsdXNpdmU6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ0UnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IHRydWUsIGJpZ1dvcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnYicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICdCJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogZmFsc2UsIGJpZ1dvcmQ6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ2dlJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdnRScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IHRydWUsIGJpZ1dvcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAneycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlQYXJhZ3JhcGgnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd9JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhcmFncmFwaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnKCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTZW50ZW5jZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJyknLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5U2VudGVuY2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSB9LFxuICAgIHsga2V5czogJzxDLWY+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhZ2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSB9LFxuICAgIHsga2V5czogJzxDLWI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhZ2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1kPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTY3JvbGwnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGV4cGxpY2l0UmVwZWF0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICc8Qy11PicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTY3JvbGwnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnZ2cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTGluZU9yRWRnZU9mRG9jdW1lbnQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSwgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ0cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTGluZU9yRWRnZU9mRG9jdW1lbnQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGV4cGxpY2l0UmVwZWF0OiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiBcImckXCIsIHR5cGU6IFwibW90aW9uXCIsIG1vdGlvbjogXCJtb3ZlVG9FbmRPZkRpc3BsYXlMaW5lXCIgfSxcbiAgICB7IGtleXM6IFwiZ15cIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZVwiIH0sXG4gICAgeyBrZXlzOiBcImcwXCIsIHR5cGU6IFwibW90aW9uXCIsIG1vdGlvbjogXCJtb3ZlVG9TdGFydE9mRGlzcGxheUxpbmVcIiB9LFxuICAgIHsga2V5czogJzAnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3RhcnRPZkxpbmUnIH0sXG4gICAgeyBrZXlzOiAnXicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnKycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9GaXJzdENoYXI6IHRydWUgfSB9LFxuICAgIHsga2V5czogJy0nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5TGluZXMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB0b0ZpcnN0Q2hhcjogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnXycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9GaXJzdENoYXI6IHRydWUsIHJlcGVhdE9mZnNldDogLTEgfSB9LFxuICAgIHsga2V5czogJyQnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvRW9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUgfSB9LFxuICAgIHsga2V5czogJyUnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTWF0Y2hlZFN5bWJvbCcsIG1vdGlvbkFyZ3M6IHsgaW5jbHVzaXZlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdmPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQ2hhcmFjdGVyJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBpbmNsdXNpdmU6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ0Y8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9DaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICd0PGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRpbGxDaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnVDxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUaWxsQ2hhcmFjdGVyJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAnOycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdyZXBlYXRMYXN0Q2hhcmFjdGVyU2VhcmNoJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICcsJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3JlcGVhdExhc3RDaGFyYWN0ZXJTZWFyY2gnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICdcXCc8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdnb1RvTWFyaycsIG1vdGlvbkFyZ3M6IHsgdG9KdW1wbGlzdDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ2A8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdnb1RvTWFyaycsIG1vdGlvbkFyZ3M6IHsgdG9KdW1wbGlzdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnXWAnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnW2AnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJ11cXCcnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ1tcXCcnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICddcCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdwYXN0ZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSwgaXNFZGl0OiB0cnVlLCBtYXRjaEluZGVudDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnW3AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlLCBpc0VkaXQ6IHRydWUsIG1hdGNoSW5kZW50OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICddPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3ltYm9sJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdbPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3ltYm9sJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9KdW1wbGlzdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnfCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Db2x1bW4nIH0sXG4gICAgeyBrZXlzOiAnbycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9PdGhlckhpZ2hsaWdodGVkRW5kJywgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICdPJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQnLCBtb3Rpb25BcmdzOiB7IHNhbWVMaW5lOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnZCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnZGVsZXRlJyB9LFxuICAgIHsga2V5czogJ3knLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ3lhbmsnIH0sXG4gICAgeyBrZXlzOiAnYycsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlJyB9LFxuICAgIHsga2V5czogJz0nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2luZGVudEF1dG8nIH0sXG4gICAgeyBrZXlzOiAnPicsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaW5kZW50Jywgb3BlcmF0b3JBcmdzOiB7IGluZGVudFJpZ2h0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICc8JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdpbmRlbnQnLCBvcGVyYXRvckFyZ3M6IHsgaW5kZW50UmlnaHQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICdnficsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScgfSxcbiAgICB7IGtleXM6ICdndScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczogeyB0b0xvd2VyOiB0cnVlIH0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ2dVJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7IHRvTG93ZXI6IGZhbHNlIH0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ24nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZE5leHQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ04nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZE5leHQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdnbicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnZ04nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZEFuZFNlbGVjdE5leHRJbmNsdXNpdmUnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICd4JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH0sIG9wZXJhdG9yTW90aW9uQXJnczogeyB2aXN1YWxMaW5lOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAnWCcsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnZGVsZXRlJywgbW90aW9uOiAnbW92ZUJ5Q2hhcmFjdGVycycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfSwgb3BlcmF0b3JNb3Rpb25BcmdzOiB7IHZpc3VhbExpbmU6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ0QnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVUb0VvbCcsIG1vdGlvbkFyZ3M6IHsgaW5jbHVzaXZlOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnRCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnZGVsZXRlJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnWScsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAneWFuaycsIG1vdGlvbjogJ2V4cGFuZFRvTGluZScsIG1vdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdZJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICd5YW5rJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnQycsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnY2hhbmdlJywgbW90aW9uOiAnbW92ZVRvRW9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdDJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2UnLCBvcGVyYXRvckFyZ3M6IHsgbGluZXdpc2U6IHRydWUgfSwgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICd+JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgbW90aW9uOiAnbW92ZUJ5Q2hhcmFjdGVycycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9LCBvcGVyYXRvckFyZ3M6IHsgc2hvdWxkTW92ZUN1cnNvcjogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ34nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBjb250ZXh0OiAndmlzdWFsJyB9LFxuICAgIHsga2V5czogJzxDLXU+JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlVG9TdGFydE9mTGluZScsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtdz4nLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogZmFsc2UgfSwgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy13PicsIHR5cGU6ICdpZGxlJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICc8Qy1pPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqdW1wTGlzdFdhbGsnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSB9LFxuICAgIHsga2V5czogJzxDLW8+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2p1bXBMaXN0V2FsaycsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJzxDLWU+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbCcsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIHsga2V5czogJzxDLXk+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbCcsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdhJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2NoYXJBZnRlcicgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdBJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2VvbCcgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdBJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2VuZE9mU2VsZWN0ZWRBcmVhJyB9LCBjb250ZXh0OiAndmlzdWFsJyB9LFxuICAgIHsga2V5czogJ2knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnaW5wbGFjZScgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdnaScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdsYXN0RWRpdCcgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdJJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2ZpcnN0Tm9uQmxhbmsnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnZ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnYm9sJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnc3RhcnRPZlNlbGVjdGVkQXJlYScgfSwgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICdvJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ25ld0xpbmVBbmRFbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGludGVybGFjZUluc2VydFJlcGVhdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ08nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnbmV3TGluZUFuZEVudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgaW50ZXJsYWNlSW5zZXJ0UmVwZWF0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiBmYWxzZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScgfSxcbiAgICB7IGtleXM6ICdWJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICc8Qy12PicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVWaXN1YWxNb2RlJywgYWN0aW9uQXJnczogeyBibG9ja3dpc2U6IHRydWUgfSB9LFxuICAgIHsga2V5czogJzxDLXE+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGJsb2Nrd2lzZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnZ3YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVzZWxlY3RMYXN0U2VsZWN0aW9uJyB9LFxuICAgIHsga2V5czogJ0onLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnam9pbkxpbmVzJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnZ0onLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnam9pbkxpbmVzJywgYWN0aW9uQXJnczogeyBrZWVwU3BhY2VzOiB0cnVlIH0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ3AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IHRydWUsIGlzRWRpdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnUCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdwYXN0ZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogZmFsc2UsIGlzRWRpdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAncjxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3JlcGxhY2UnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdAPGNoYXJhY3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVwbGF5TWFjcm8nIH0sXG4gICAgeyBrZXlzOiAncTxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVyTWFjcm9SZWNvcmRNb2RlJyB9LFxuICAgIHsga2V5czogJ1InLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IHJlcGxhY2U6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdSJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2UnLCBvcGVyYXRvckFyZ3M6IHsgbGluZXdpc2U6IHRydWUsIGZ1bGxMaW5lOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnLCBleGl0VmlzdWFsQmxvY2s6IHRydWUgfSxcbiAgICB7IGtleXM6ICd1JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3VuZG8nLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3UnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBvcGVyYXRvckFyZ3M6IHsgdG9Mb3dlcjogdHJ1ZSB9LCBjb250ZXh0OiAndmlzdWFsJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnVScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczogeyB0b0xvd2VyOiBmYWxzZSB9LCBjb250ZXh0OiAndmlzdWFsJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnPEMtcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVkbycgfSxcbiAgICB7IGtleXM6ICdtPGNoYXJhY3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2V0TWFyaycgfSxcbiAgICB7IGtleXM6ICdcIjxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3NldFJlZ2lzdGVyJyB9LFxuICAgIHsga2V5czogJ3p6JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2NlbnRlcicgfSB9LFxuICAgIHsga2V5czogJ3ouJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2NlbnRlcicgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJ3p0JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ3RvcCcgfSB9LFxuICAgIHsga2V5czogJ3o8Q1I+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ3RvcCcgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJ3piJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2JvdHRvbScgfSB9LFxuICAgIHsga2V5czogJ3otJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2JvdHRvbScgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJy4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVwZWF0TGFzdEVkaXQnIH0sXG4gICAgeyBrZXlzOiAnPEMtYT4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5jcmVtZW50TnVtYmVyVG9rZW4nLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5jcmVhc2U6IHRydWUsIGJhY2t0cmFjazogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJzxDLXg+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luY3JlbWVudE51bWJlclRva2VuJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluY3JlYXNlOiBmYWxzZSwgYmFja3RyYWNrOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAnPEMtdD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5kZW50JywgYWN0aW9uQXJnczogeyBpbmRlbnRSaWdodDogdHJ1ZSB9LCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJzxDLWQ+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luZGVudCcsIGFjdGlvbkFyZ3M6IHsgaW5kZW50UmlnaHQ6IGZhbHNlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnYTxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3RleHRPYmplY3RNYW5pcHVsYXRpb24nIH0sXG4gICAgeyBrZXlzOiAnaTxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3RleHRPYmplY3RNYW5pcHVsYXRpb24nLCBtb3Rpb25BcmdzOiB7IHRleHRPYmplY3RJbm5lcjogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnLycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IHRydWUsIHF1ZXJ5U3JjOiAncHJvbXB0JywgdG9KdW1wbGlzdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnPycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBxdWVyeVNyYzogJ3Byb21wdCcsIHRvSnVtcGxpc3Q6IHRydWUgfSB9LFxuICAgIHsga2V5czogJyonLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiB0cnVlLCBxdWVyeVNyYzogJ3dvcmRVbmRlckN1cnNvcicsIHdob2xlV29yZE9ubHk6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfSB9LFxuICAgIHsga2V5czogJyMnLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB3aG9sZVdvcmRPbmx5OiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdnKicsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IHRydWUsIHF1ZXJ5U3JjOiAnd29yZFVuZGVyQ3Vyc29yJywgdG9KdW1wbGlzdDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnZyMnLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB0b0p1bXBsaXN0OiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICc6JywgdHlwZTogJ2V4JyB9XG5dO1xudmFyIGRlZmF1bHRLZXltYXBMZW5ndGggPSBkZWZhdWx0S2V5bWFwLmxlbmd0aDtcbnZhciBkZWZhdWx0RXhDb21tYW5kTWFwID0gW1xuICAgIHsgbmFtZTogJ2NvbG9yc2NoZW1lJywgc2hvcnROYW1lOiAnY29sbycgfSxcbiAgICB7IG5hbWU6ICdtYXAnIH0sXG4gICAgeyBuYW1lOiAnaW1hcCcsIHNob3J0TmFtZTogJ2ltJyB9LFxuICAgIHsgbmFtZTogJ25tYXAnLCBzaG9ydE5hbWU6ICdubScgfSxcbiAgICB7IG5hbWU6ICd2bWFwJywgc2hvcnROYW1lOiAndm0nIH0sXG4gICAgeyBuYW1lOiAndW5tYXAnIH0sXG4gICAgeyBuYW1lOiAnd3JpdGUnLCBzaG9ydE5hbWU6ICd3JyB9LFxuICAgIHsgbmFtZTogJ3VuZG8nLCBzaG9ydE5hbWU6ICd1JyB9LFxuICAgIHsgbmFtZTogJ3JlZG8nLCBzaG9ydE5hbWU6ICdyZWQnIH0sXG4gICAgeyBuYW1lOiAnc2V0Jywgc2hvcnROYW1lOiAnc2UnIH0sXG4gICAgeyBuYW1lOiAnc2V0bG9jYWwnLCBzaG9ydE5hbWU6ICdzZXRsJyB9LFxuICAgIHsgbmFtZTogJ3NldGdsb2JhbCcsIHNob3J0TmFtZTogJ3NldGcnIH0sXG4gICAgeyBuYW1lOiAnc29ydCcsIHNob3J0TmFtZTogJ3NvcicgfSxcbiAgICB7IG5hbWU6ICdzdWJzdGl0dXRlJywgc2hvcnROYW1lOiAncycsIHBvc3NpYmx5QXN5bmM6IHRydWUgfSxcbiAgICB7IG5hbWU6ICdub2hsc2VhcmNoJywgc2hvcnROYW1lOiAnbm9oJyB9LFxuICAgIHsgbmFtZTogJ3lhbmsnLCBzaG9ydE5hbWU6ICd5JyB9LFxuICAgIHsgbmFtZTogJ2RlbG1hcmtzJywgc2hvcnROYW1lOiAnZGVsbScgfSxcbiAgICB7IG5hbWU6ICdyZWdpc3RlcnMnLCBzaG9ydE5hbWU6ICdyZWcnLCBleGNsdWRlRnJvbUNvbW1hbmRIaXN0b3J5OiB0cnVlIH0sXG4gICAgeyBuYW1lOiAndmdsb2JhbCcsIHNob3J0TmFtZTogJ3YnIH0sXG4gICAgeyBuYW1lOiAnZ2xvYmFsJywgc2hvcnROYW1lOiAnZycgfVxuXTtcbmZ1bmN0aW9uIGVudGVyVmltTW9kZShjbSkge1xuICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgdHJ1ZSk7XG4gICAgY20uc2V0T3B0aW9uKCdzaG93Q3Vyc29yV2hlblNlbGVjdGluZycsIGZhbHNlKTtcbiAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcIm5vcm1hbFwiIH0pO1xuICAgIGNtLm9uKCdjdXJzb3JBY3Rpdml0eScsIG9uQ3Vyc29yQWN0aXZpdHkpO1xuICAgIG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICBDb2RlTWlycm9yLm9uKGNtLmdldElucHV0RmllbGQoKSwgJ3Bhc3RlJywgZ2V0T25QYXN0ZUZuKGNtKSk7XG59XG5mdW5jdGlvbiBsZWF2ZVZpbU1vZGUoY20pIHtcbiAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIGZhbHNlKTtcbiAgICBjbS5vZmYoJ2N1cnNvckFjdGl2aXR5Jywgb25DdXJzb3JBY3Rpdml0eSk7XG4gICAgQ29kZU1pcnJvci5vZmYoY20uZ2V0SW5wdXRGaWVsZCgpLCAncGFzdGUnLCBnZXRPblBhc3RlRm4oY20pKTtcbiAgICBjbS5zdGF0ZS52aW0gPSBudWxsO1xuICAgIGlmIChoaWdobGlnaHRUaW1lb3V0KVxuICAgICAgICBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0VGltZW91dCk7XG59XG5mdW5jdGlvbiBkZXRhY2hWaW1NYXAoY20sIG5leHQpIHtcbiAgICBpZiAodGhpcyA9PSBDb2RlTWlycm9yLmtleU1hcC52aW0pIHtcbiAgICAgICAgY20ub3B0aW9ucy4kY3VzdG9tQ3Vyc29yID0gbnVsbDtcbiAgICAgICAgQ29kZU1pcnJvci5ybUNsYXNzKGNtLmdldFdyYXBwZXJFbGVtZW50KCksIFwiY20tZmF0LWN1cnNvclwiKTtcbiAgICB9XG4gICAgaWYgKCFuZXh0IHx8IG5leHQuYXR0YWNoICE9IGF0dGFjaFZpbU1hcClcbiAgICAgICAgbGVhdmVWaW1Nb2RlKGNtKTtcbn1cbmZ1bmN0aW9uIGF0dGFjaFZpbU1hcChjbSwgcHJldikge1xuICAgIGlmICh0aGlzID09IENvZGVNaXJyb3Iua2V5TWFwLnZpbSkge1xuICAgICAgICBpZiAoY20uY3VyT3ApXG4gICAgICAgICAgICBjbS5jdXJPcC5zZWxlY3Rpb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgY20ub3B0aW9ucy4kY3VzdG9tQ3Vyc29yID0gdHJhbnNmb3JtQ3Vyc29yO1xuICAgICAgICBDb2RlTWlycm9yLmFkZENsYXNzKGNtLmdldFdyYXBwZXJFbGVtZW50KCksIFwiY20tZmF0LWN1cnNvclwiKTtcbiAgICB9XG4gICAgaWYgKCFwcmV2IHx8IHByZXYuYXR0YWNoICE9IGF0dGFjaFZpbU1hcClcbiAgICAgICAgZW50ZXJWaW1Nb2RlKGNtKTtcbn1cbkNvZGVNaXJyb3IuZGVmaW5lT3B0aW9uKCd2aW1Nb2RlJywgZmFsc2UsIGZ1bmN0aW9uIChjbSwgdmFsLCBwcmV2KSB7XG4gICAgaWYgKHZhbCAmJiBjbS5nZXRPcHRpb24oXCJrZXlNYXBcIikgIT0gXCJ2aW1cIilcbiAgICAgICAgY20uc2V0T3B0aW9uKFwia2V5TWFwXCIsIFwidmltXCIpO1xuICAgIGVsc2UgaWYgKCF2YWwgJiYgcHJldiAhPSBDb2RlTWlycm9yLkluaXQgJiYgL152aW0vLnRlc3QoY20uZ2V0T3B0aW9uKFwia2V5TWFwXCIpKSlcbiAgICAgICAgY20uc2V0T3B0aW9uKFwia2V5TWFwXCIsIFwiZGVmYXVsdFwiKTtcbn0pO1xuZnVuY3Rpb24gY21LZXkoa2V5LCBjbSkge1xuICAgIGlmICghY20pIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXNba2V5XSkge1xuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgIH1cbiAgICB2YXIgdmltS2V5ID0gY21LZXlUb1ZpbUtleShrZXkpO1xuICAgIGlmICghdmltS2V5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGNtZCA9IHZpbUFwaS5maW5kS2V5KGNtLCB2aW1LZXkpO1xuICAgIGlmICh0eXBlb2YgY21kID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sICd2aW0ta2V5cHJlc3MnLCB2aW1LZXkpO1xuICAgIH1cbiAgICByZXR1cm4gY21kO1xufVxudmFyIG1vZGlmaWVycyA9IHsgU2hpZnQ6ICdTJywgQ3RybDogJ0MnLCBBbHQ6ICdBJywgQ21kOiAnRCcsIE1vZDogJ0EnLCBDYXBzTG9jazogJycgfTtcbnZhciBzcGVjaWFsS2V5cyA9IHsgRW50ZXI6ICdDUicsIEJhY2tzcGFjZTogJ0JTJywgRGVsZXRlOiAnRGVsJywgSW5zZXJ0OiAnSW5zJyB9O1xuZnVuY3Rpb24gY21LZXlUb1ZpbUtleShrZXkpIHtcbiAgICBpZiAoa2V5LmNoYXJBdCgwKSA9PSAnXFwnJykge1xuICAgICAgICByZXR1cm4ga2V5LmNoYXJBdCgxKTtcbiAgICB9XG4gICAgdmFyIHBpZWNlcyA9IGtleS5zcGxpdCgvLSg/ISQpLyk7XG4gICAgdmFyIGxhc3RQaWVjZSA9IHBpZWNlc1twaWVjZXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKHBpZWNlcy5sZW5ndGggPT0gMSAmJiBwaWVjZXNbMF0ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmIChwaWVjZXMubGVuZ3RoID09IDIgJiYgcGllY2VzWzBdID09ICdTaGlmdCcgJiYgbGFzdFBpZWNlLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGhhc0NoYXJhY3RlciA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGllY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1tpXTtcbiAgICAgICAgaWYgKHBpZWNlIGluIG1vZGlmaWVycykge1xuICAgICAgICAgICAgcGllY2VzW2ldID0gbW9kaWZpZXJzW3BpZWNlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhc0NoYXJhY3RlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBpZWNlIGluIHNwZWNpYWxLZXlzKSB7XG4gICAgICAgICAgICBwaWVjZXNbaV0gPSBzcGVjaWFsS2V5c1twaWVjZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFoYXNDaGFyYWN0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNVcHBlckNhc2UobGFzdFBpZWNlKSkge1xuICAgICAgICBwaWVjZXNbcGllY2VzLmxlbmd0aCAtIDFdID0gbGFzdFBpZWNlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiAnPCcgKyBwaWVjZXMuam9pbignLScpICsgJz4nO1xufVxuZnVuY3Rpb24gZ2V0T25QYXN0ZUZuKGNtKSB7XG4gICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICBpZiAoIXZpbS5vblBhc3RlRm4pIHtcbiAgICAgICAgdmltLm9uUGFzdGVGbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgICBjbS5zZXRDdXJzb3Iob2Zmc2V0Q3Vyc29yKGNtLmdldEN1cnNvcigpLCAwLCAxKSk7XG4gICAgICAgICAgICAgICAgYWN0aW9ucy5lbnRlckluc2VydE1vZGUoY20sIHt9LCB2aW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdmltLm9uUGFzdGVGbjtcbn1cbnZhciBudW1iZXJSZWdleCA9IC9bXFxkXS87XG52YXIgd29yZENoYXJUZXN0ID0gW0NvZGVNaXJyb3IuaXNXb3JkQ2hhciwgZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgIHJldHVybiBjaCAmJiAhQ29kZU1pcnJvci5pc1dvcmRDaGFyKGNoKSAmJiAhL1xccy8udGVzdChjaCk7XG4gICAgfV0sIGJpZ1dvcmRDaGFyVGVzdCA9IFtmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgcmV0dXJuIC9cXFMvLnRlc3QoY2gpO1xuICAgIH1dO1xuZnVuY3Rpb24gbWFrZUtleVJhbmdlKHN0YXJ0LCBzaXplKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBzdGFydCArIHNpemU7IGkrKykge1xuICAgICAgICBrZXlzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xufVxudmFyIHVwcGVyQ2FzZUFscGhhYmV0ID0gbWFrZUtleVJhbmdlKDY1LCAyNik7XG52YXIgbG93ZXJDYXNlQWxwaGFiZXQgPSBtYWtlS2V5UmFuZ2UoOTcsIDI2KTtcbnZhciBudW1iZXJzID0gbWFrZUtleVJhbmdlKDQ4LCAxMCk7XG52YXIgdmFsaWRNYXJrcyA9IFtdLmNvbmNhdCh1cHBlckNhc2VBbHBoYWJldCwgbG93ZXJDYXNlQWxwaGFiZXQsIG51bWJlcnMsIFsnPCcsICc+J10pO1xudmFyIHZhbGlkUmVnaXN0ZXJzID0gW10uY29uY2F0KHVwcGVyQ2FzZUFscGhhYmV0LCBsb3dlckNhc2VBbHBoYWJldCwgbnVtYmVycywgWyctJywgJ1wiJywgJy4nLCAnOicsICdfJywgJy8nLCAnKyddKTtcbnZhciB1cHBlckNhc2VDaGFycztcbnRyeSB7XG4gICAgdXBwZXJDYXNlQ2hhcnMgPSBuZXcgUmVnRXhwKFwiXltcXFxccHtMdX1dJFwiLCBcInVcIik7XG59XG5jYXRjaCAoXykge1xuICAgIHVwcGVyQ2FzZUNoYXJzID0gL15bQS1aXSQvO1xufVxuZnVuY3Rpb24gaXNMaW5lKGNtLCBsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUgPj0gY20uZmlyc3RMaW5lKCkgJiYgbGluZSA8PSBjbS5sYXN0TGluZSgpO1xufVxuZnVuY3Rpb24gaXNMb3dlckNhc2Uoaykge1xuICAgIHJldHVybiAoL15bYS16XSQvKS50ZXN0KGspO1xufVxuZnVuY3Rpb24gaXNNYXRjaGFibGVTeW1ib2woaykge1xuICAgIHJldHVybiAnKClbXXt9Jy5pbmRleE9mKGspICE9IC0xO1xufVxuZnVuY3Rpb24gaXNOdW1iZXIoaykge1xuICAgIHJldHVybiBudW1iZXJSZWdleC50ZXN0KGspO1xufVxuZnVuY3Rpb24gaXNVcHBlckNhc2Uoaykge1xuICAgIHJldHVybiB1cHBlckNhc2VDaGFycy50ZXN0KGspO1xufVxuZnVuY3Rpb24gaXNXaGl0ZVNwYWNlU3RyaW5nKGspIHtcbiAgICByZXR1cm4gKC9eXFxzKiQvKS50ZXN0KGspO1xufVxuZnVuY3Rpb24gaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGspIHtcbiAgICByZXR1cm4gJy4/IScuaW5kZXhPZihrKSAhPSAtMTtcbn1cbmZ1bmN0aW9uIGluQXJyYXkodmFsLCBhcnIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyW2ldID09IHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxudmFyIG9wdGlvbnMgPSB7fTtcbmZ1bmN0aW9uIGRlZmluZU9wdGlvbihuYW1lLCBkZWZhdWx0VmFsdWUsIHR5cGUsIGFsaWFzZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBFcnJvcignZGVmYXVsdFZhbHVlIGlzIHJlcXVpcmVkIHVubGVzcyBjYWxsYmFjayBpcyBwcm92aWRlZCcpO1xuICAgIH1cbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgIH1cbiAgICBvcHRpb25zW25hbWVdID0ge1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfTtcbiAgICBpZiAoYWxpYXNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsaWFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9wdGlvbnNbYWxpYXNlc1tpXV0gPSBvcHRpb25zW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc2V0T3B0aW9uKG5hbWUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0T3B0aW9uKG5hbWUsIHZhbHVlLCBjbSwgY2ZnKSB7XG4gICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbbmFtZV07XG4gICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgIHZhciBzY29wZSA9IGNmZy5zY29wZTtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdVbmtub3duIG9wdGlvbjogJyArIG5hbWUpO1xuICAgIH1cbiAgICBpZiAob3B0aW9uLnR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogJyArIG5hbWUgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbi5jYWxsYmFjaykge1xuICAgICAgICBpZiAoc2NvcGUgIT09ICdsb2NhbCcpIHtcbiAgICAgICAgICAgIG9wdGlvbi5jYWxsYmFjayh2YWx1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUgIT09ICdnbG9iYWwnICYmIGNtKSB7XG4gICAgICAgICAgICBvcHRpb24uY2FsbGJhY2sodmFsdWUsIGNtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBvcHRpb24udHlwZSA9PSAnYm9vbGVhbicgPyAhIXZhbHVlIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlICE9PSAnZ2xvYmFsJyAmJiBjbSkge1xuICAgICAgICAgICAgY20uc3RhdGUudmltLm9wdGlvbnNbbmFtZV0gPSB7IHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUsIGNtLCBjZmcpIHtcbiAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tuYW1lXTtcbiAgICBjZmcgPSBjZmcgfHwge307XG4gICAgdmFyIHNjb3BlID0gY2ZnLnNjb3BlO1xuICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Vua25vd24gb3B0aW9uOiAnICsgbmFtZSk7XG4gICAgfVxuICAgIGlmIChvcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxvY2FsID0gY20gJiYgb3B0aW9uLmNhbGxiYWNrKHVuZGVmaW5lZCwgY20pO1xuICAgICAgICBpZiAoc2NvcGUgIT09ICdnbG9iYWwnICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUgIT09ICdsb2NhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgbG9jYWwgPSAoc2NvcGUgIT09ICdnbG9iYWwnKSAmJiAoY20gJiYgY20uc3RhdGUudmltLm9wdGlvbnNbbmFtZV0pO1xuICAgICAgICByZXR1cm4gKGxvY2FsIHx8IChzY29wZSAhPT0gJ2xvY2FsJykgJiYgb3B0aW9uIHx8IHt9KS52YWx1ZTtcbiAgICB9XG59XG5kZWZpbmVPcHRpb24oJ2ZpbGV0eXBlJywgdW5kZWZpbmVkLCAnc3RyaW5nJywgWydmdCddLCBmdW5jdGlvbiAobmFtZSwgY20pIHtcbiAgICBpZiAoY20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1vZGUgPSBjbS5nZXRPcHRpb24oJ21vZGUnKTtcbiAgICAgICAgcmV0dXJuIG1vZGUgPT0gJ251bGwnID8gJycgOiBtb2RlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG1vZGUgPSBuYW1lID09ICcnID8gJ251bGwnIDogbmFtZTtcbiAgICAgICAgY20uc2V0T3B0aW9uKCdtb2RlJywgbW9kZSk7XG4gICAgfVxufSk7XG52YXIgY3JlYXRlQ2lyY3VsYXJKdW1wTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2l6ZSA9IDEwMDtcbiAgICB2YXIgcG9pbnRlciA9IC0xO1xuICAgIHZhciBoZWFkID0gMDtcbiAgICB2YXIgdGFpbCA9IDA7XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheShzaXplKTtcbiAgICBmdW5jdGlvbiBhZGQoY20sIG9sZEN1ciwgbmV3Q3VyKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gcG9pbnRlciAlIHNpemU7XG4gICAgICAgIHZhciBjdXJNYXJrID0gYnVmZmVyW2N1cnJlbnRdO1xuICAgICAgICBmdW5jdGlvbiB1c2VOZXh0U2xvdChjdXJzb3IpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gKytwb2ludGVyICUgc2l6ZTtcbiAgICAgICAgICAgIHZhciB0cmFzaE1hcmsgPSBidWZmZXJbbmV4dF07XG4gICAgICAgICAgICBpZiAodHJhc2hNYXJrKSB7XG4gICAgICAgICAgICAgICAgdHJhc2hNYXJrLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXJbbmV4dF0gPSBjbS5zZXRCb29rbWFyayhjdXJzb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJNYXJrKSB7XG4gICAgICAgICAgICB2YXIgbWFya1BvcyA9IGN1ck1hcmsuZmluZCgpO1xuICAgICAgICAgICAgaWYgKG1hcmtQb3MgJiYgIWN1cnNvckVxdWFsKG1hcmtQb3MsIG9sZEN1cikpIHtcbiAgICAgICAgICAgICAgICB1c2VOZXh0U2xvdChvbGRDdXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdXNlTmV4dFNsb3Qob2xkQ3VyKTtcbiAgICAgICAgfVxuICAgICAgICB1c2VOZXh0U2xvdChuZXdDdXIpO1xuICAgICAgICBoZWFkID0gcG9pbnRlcjtcbiAgICAgICAgdGFpbCA9IHBvaW50ZXIgLSBzaXplICsgMTtcbiAgICAgICAgaWYgKHRhaWwgPCAwKSB7XG4gICAgICAgICAgICB0YWlsID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtb3ZlKGNtLCBvZmZzZXQpIHtcbiAgICAgICAgcG9pbnRlciArPSBvZmZzZXQ7XG4gICAgICAgIGlmIChwb2ludGVyID4gaGVhZCkge1xuICAgICAgICAgICAgcG9pbnRlciA9IGhlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocG9pbnRlciA8IHRhaWwpIHtcbiAgICAgICAgICAgIHBvaW50ZXIgPSB0YWlsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXJrID0gYnVmZmVyWyhzaXplICsgcG9pbnRlcikgJSBzaXplXTtcbiAgICAgICAgaWYgKG1hcmsgJiYgIW1hcmsuZmluZCgpKSB7XG4gICAgICAgICAgICB2YXIgaW5jID0gb2Zmc2V0ID4gMCA/IDEgOiAtMTtcbiAgICAgICAgICAgIHZhciBuZXdDdXI7XG4gICAgICAgICAgICB2YXIgb2xkQ3VyID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgcG9pbnRlciArPSBpbmM7XG4gICAgICAgICAgICAgICAgbWFyayA9IGJ1ZmZlclsoc2l6ZSArIHBvaW50ZXIpICUgc2l6ZV07XG4gICAgICAgICAgICAgICAgaWYgKG1hcmsgJiZcbiAgICAgICAgICAgICAgICAgICAgKG5ld0N1ciA9IG1hcmsuZmluZCgpKSAmJlxuICAgICAgICAgICAgICAgICAgICAhY3Vyc29yRXF1YWwob2xkQ3VyLCBuZXdDdXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKHBvaW50ZXIgPCBoZWFkICYmIHBvaW50ZXIgPiB0YWlsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFyaztcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZChjbSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBvbGRQb2ludGVyID0gcG9pbnRlcjtcbiAgICAgICAgdmFyIG1hcmsgPSBtb3ZlKGNtLCBvZmZzZXQpO1xuICAgICAgICBwb2ludGVyID0gb2xkUG9pbnRlcjtcbiAgICAgICAgcmV0dXJuIG1hcmsgJiYgbWFyay5maW5kKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNhY2hlZEN1cnNvcjogdW5kZWZpbmVkLFxuICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgZmluZDogZmluZCxcbiAgICAgICAgbW92ZTogbW92ZVxuICAgIH07XG59O1xudmFyIGNyZWF0ZUluc2VydE1vZGVDaGFuZ2VzID0gZnVuY3Rpb24gKGMpIHtcbiAgICBpZiAoYykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hhbmdlczogYy5jaGFuZ2VzLFxuICAgICAgICAgICAgZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2U6IGMuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbmdlczogW10sXG4gICAgICAgIGV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlOiBmYWxzZVxuICAgIH07XG59O1xuZnVuY3Rpb24gTWFjcm9Nb2RlU3RhdGUoKSB7XG4gICAgdGhpcy5sYXRlc3RSZWdpc3RlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlcGxheVNlYXJjaFF1ZXJpZXMgPSBbXTtcbiAgICB0aGlzLm9uUmVjb3JkaW5nRG9uZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcyA9IGNyZWF0ZUluc2VydE1vZGVDaGFuZ2VzKCk7XG59XG5NYWNyb01vZGVTdGF0ZS5wcm90b3R5cGUgPSB7XG4gICAgZXhpdE1hY3JvUmVjb3JkTW9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSkge1xuICAgICAgICAgICAgbWFjcm9Nb2RlU3RhdGUub25SZWNvcmRpbmdEb25lKCk7IC8vIGNsb3NlIGRpYWxvZ1xuICAgICAgICB9XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICB9LFxuICAgIGVudGVyTWFjcm9SZWNvcmRNb2RlOiBmdW5jdGlvbiAoY20sIHJlZ2lzdGVyTmFtZSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyKSB7XG4gICAgICAgICAgICByZWdpc3Rlci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5sYXRlc3RSZWdpc3RlciA9IHJlZ2lzdGVyTmFtZTtcbiAgICAgICAgICAgIGlmIChjbS5vcGVuRGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gZG9tKCdzcGFuJywgeyBjbGFzczogJ2NtLXZpbS1tZXNzYWdlJyB9LCAncmVjb3JkaW5nIEAnICsgcmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVjb3JkaW5nRG9uZSA9IGNtLm9wZW5EaWFsb2codGVtcGxhdGUsIG51bGwsIHsgYm90dG9tOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gbWF5YmVJbml0VmltU3RhdGUoY20pIHtcbiAgICBpZiAoIWNtLnN0YXRlLnZpbSkge1xuICAgICAgICBjbS5zdGF0ZS52aW0gPSB7XG4gICAgICAgICAgICBpbnB1dFN0YXRlOiBuZXcgSW5wdXRTdGF0ZSgpLFxuICAgICAgICAgICAgbGFzdEVkaXRJbnB1dFN0YXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBsYXN0RWRpdEFjdGlvbkNvbW1hbmQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxhc3RIUG9zOiAtMSxcbiAgICAgICAgICAgIGxhc3RIU1BvczogLTEsXG4gICAgICAgICAgICBsYXN0TW90aW9uOiBudWxsLFxuICAgICAgICAgICAgbWFya3M6IHt9LFxuICAgICAgICAgICAgaW5zZXJ0TW9kZTogZmFsc2UsXG4gICAgICAgICAgICBpbnNlcnRNb2RlUmVwZWF0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2aXN1YWxNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpc3VhbExpbmU6IGZhbHNlLFxuICAgICAgICAgICAgdmlzdWFsQmxvY2s6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFNlbGVjdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGxhc3RQYXN0ZWRUZXh0OiBudWxsLFxuICAgICAgICAgICAgc2VsOiB7fSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHt9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjbS5zdGF0ZS52aW07XG59XG52YXIgdmltR2xvYmFsU3RhdGU7XG5mdW5jdGlvbiByZXNldFZpbUdsb2JhbFN0YXRlKCkge1xuICAgIHZpbUdsb2JhbFN0YXRlID0ge1xuICAgICAgICBzZWFyY2hRdWVyeTogbnVsbCxcbiAgICAgICAgc2VhcmNoSXNSZXZlcnNlZDogZmFsc2UsXG4gICAgICAgIGxhc3RTdWJzdGl0dXRlUmVwbGFjZVBhcnQ6IHVuZGVmaW5lZCxcbiAgICAgICAganVtcExpc3Q6IGNyZWF0ZUNpcmN1bGFySnVtcExpc3QoKSxcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGU6IG5ldyBNYWNyb01vZGVTdGF0ZSxcbiAgICAgICAgbGFzdENoYXJhY3RlclNlYXJjaDogeyBpbmNyZW1lbnQ6IDAsIGZvcndhcmQ6IHRydWUsIHNlbGVjdGVkQ2hhcmFjdGVyOiAnJyB9LFxuICAgICAgICByZWdpc3RlckNvbnRyb2xsZXI6IG5ldyBSZWdpc3RlckNvbnRyb2xsZXIoe30pLFxuICAgICAgICBzZWFyY2hIaXN0b3J5Q29udHJvbGxlcjogbmV3IEhpc3RvcnlDb250cm9sbGVyKCksXG4gICAgICAgIGV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyOiBuZXcgSGlzdG9yeUNvbnRyb2xsZXIoKVxuICAgIH07XG4gICAgZm9yICh2YXIgb3B0aW9uTmFtZSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgICBvcHRpb24udmFsdWUgPSBvcHRpb24uZGVmYXVsdFZhbHVlO1xuICAgIH1cbn1cbnZhciBsYXN0SW5zZXJ0TW9kZUtleVRpbWVyO1xudmFyIHZpbUFwaSA9IHtcbiAgICBlbnRlclZpbU1vZGU6IGVudGVyVmltTW9kZSxcbiAgICBsZWF2ZVZpbU1vZGU6IGxlYXZlVmltTW9kZSxcbiAgICBidWlsZEtleU1hcDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG4gICAgZ2V0UmVnaXN0ZXJDb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXI7XG4gICAgfSxcbiAgICByZXNldFZpbUdsb2JhbFN0YXRlXzogcmVzZXRWaW1HbG9iYWxTdGF0ZSxcbiAgICBnZXRWaW1HbG9iYWxTdGF0ZV86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlO1xuICAgIH0sXG4gICAgbWF5YmVJbml0VmltU3RhdGVfOiBtYXliZUluaXRWaW1TdGF0ZSxcbiAgICBzdXBwcmVzc0Vycm9yTG9nZ2luZzogZmFsc2UsXG4gICAgSW5zZXJ0TW9kZUtleTogSW5zZXJ0TW9kZUtleSxcbiAgICBtYXA6IGZ1bmN0aW9uIChsaHMsIHJocywgY3R4KSB7XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIubWFwKGxocywgcmhzLCBjdHgpO1xuICAgIH0sXG4gICAgdW5tYXA6IGZ1bmN0aW9uIChsaHMsIGN0eCkge1xuICAgICAgICByZXR1cm4gZXhDb21tYW5kRGlzcGF0Y2hlci51bm1hcChsaHMsIGN0eCk7XG4gICAgfSxcbiAgICBub3JlbWFwOiBmdW5jdGlvbiAobGhzLCByaHMsIGN0eCkge1xuICAgICAgICBmdW5jdGlvbiB0b0N0eEFycmF5KGN0eCkge1xuICAgICAgICAgICAgcmV0dXJuIGN0eCA/IFtjdHhdIDogWydub3JtYWwnLCAnaW5zZXJ0JywgJ3Zpc3VhbCddO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdHhzVG9NYXAgPSB0b0N0eEFycmF5KGN0eCk7XG4gICAgICAgIHZhciBhY3R1YWxMZW5ndGggPSBkZWZhdWx0S2V5bWFwLmxlbmd0aCwgb3JpZ0xlbmd0aCA9IGRlZmF1bHRLZXltYXBMZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSBhY3R1YWxMZW5ndGggLSBvcmlnTGVuZ3RoOyBpIDwgYWN0dWFsTGVuZ3RoICYmIGN0eHNUb01hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1hcHBpbmcgPSBkZWZhdWx0S2V5bWFwW2ldO1xuICAgICAgICAgICAgaWYgKG1hcHBpbmcua2V5cyA9PSByaHMgJiZcbiAgICAgICAgICAgICAgICAoIWN0eCB8fCAhbWFwcGluZy5jb250ZXh0IHx8IG1hcHBpbmcuY29udGV4dCA9PT0gY3R4KSAmJlxuICAgICAgICAgICAgICAgIG1hcHBpbmcudHlwZS5zdWJzdHIoMCwgMikgIT09ICdleCcgJiZcbiAgICAgICAgICAgICAgICBtYXBwaW5nLnR5cGUuc3Vic3RyKDAsIDMpICE9PSAna2V5Jykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdNYXBwaW5nID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TWFwcGluZ1trZXldID0gbWFwcGluZ1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdNYXBwaW5nLmtleXMgPSBsaHM7XG4gICAgICAgICAgICAgICAgaWYgKGN0eCAmJiAhbmV3TWFwcGluZy5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01hcHBpbmcuY29udGV4dCA9IGN0eDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwQ29tbWFuZChuZXdNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgbWFwcGVkQ3R4cyA9IHRvQ3R4QXJyYXkobWFwcGluZy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICBjdHhzVG9NYXAgPSBjdHhzVG9NYXAuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gbWFwcGVkQ3R4cy5pbmRleE9mKGVsKSA9PT0gLTE7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtYXBjbGVhcjogZnVuY3Rpb24gKGN0eCkge1xuICAgICAgICB2YXIgYWN0dWFsTGVuZ3RoID0gZGVmYXVsdEtleW1hcC5sZW5ndGgsIG9yaWdMZW5ndGggPSBkZWZhdWx0S2V5bWFwTGVuZ3RoO1xuICAgICAgICB2YXIgdXNlcktleW1hcCA9IGRlZmF1bHRLZXltYXAuc2xpY2UoMCwgYWN0dWFsTGVuZ3RoIC0gb3JpZ0xlbmd0aCk7XG4gICAgICAgIGRlZmF1bHRLZXltYXAgPSBkZWZhdWx0S2V5bWFwLnNsaWNlKGFjdHVhbExlbmd0aCAtIG9yaWdMZW5ndGgpO1xuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdXNlcktleW1hcC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXBwaW5nID0gdXNlcktleW1hcFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoY3R4ICE9PSBtYXBwaW5nLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcHBpbmcuY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ29tbWFuZChtYXBwaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0cyA9IFsnbm9ybWFsJywgJ2luc2VydCcsICd2aXN1YWwnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogaW4gY29udGV4dHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dHNbal0gIT09IGN0eCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3TWFwcGluZyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwcGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3TWFwcGluZ1trZXldID0gbWFwcGluZ1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld01hcHBpbmcuY29udGV4dCA9IGNvbnRleHRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBDb21tYW5kKG5ld01hcHBpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0T3B0aW9uOiBzZXRPcHRpb24sXG4gICAgZ2V0T3B0aW9uOiBnZXRPcHRpb24sXG4gICAgZGVmaW5lT3B0aW9uOiBkZWZpbmVPcHRpb24sXG4gICAgZGVmaW5lRXg6IGZ1bmN0aW9uIChuYW1lLCBwcmVmaXgsIGZ1bmMpIHtcbiAgICAgICAgaWYgKCFwcmVmaXgpIHtcbiAgICAgICAgICAgIHByZWZpeCA9IG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5pbmRleE9mKHByZWZpeCkgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKFZpbS5kZWZpbmVFeCkgXCInICsgcHJlZml4ICsgJ1wiIGlzIG5vdCBhIHByZWZpeCBvZiBcIicgKyBuYW1lICsgJ1wiLCBjb21tYW5kIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZXhDb21tYW5kc1tuYW1lXSA9IGZ1bmM7XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIuY29tbWFuZE1hcF9bcHJlZml4XSA9IHsgbmFtZTogbmFtZSwgc2hvcnROYW1lOiBwcmVmaXgsIHR5cGU6ICdhcGknIH07XG4gICAgfSxcbiAgICBoYW5kbGVLZXk6IGZ1bmN0aW9uIChjbSwga2V5LCBvcmlnaW4pIHtcbiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmZpbmRLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbWFuZCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtdWx0aVNlbGVjdEhhbmRsZUtleTogbXVsdGlTZWxlY3RIYW5kbGVLZXksXG4gICAgZmluZEtleTogZnVuY3Rpb24gKGNtLCBrZXksIG9yaWdpbikge1xuICAgICAgICB2YXIgdmltID0gbWF5YmVJbml0VmltU3RhdGUoY20pO1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVNYWNyb1JlY29yZGluZygpIHtcbiAgICAgICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUmVjb3JkaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAncScpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFjcm9Nb2RlU3RhdGUuZXhpdE1hY3JvUmVjb3JkTW9kZSgpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbiAhPSAnbWFwcGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nS2V5KG1hY3JvTW9kZVN0YXRlLCBrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFc2MoKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09ICc8RXNjPicpIHtcbiAgICAgICAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBleGl0SW5zZXJ0TW9kZShjbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZG9LZXlUb0tleShrZXlzKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgICB3aGlsZSAoa2V5cykge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gKC88XFx3Ky0uKz8+fDxcXHcrPnwuLykuZXhlYyhrZXlzKTtcbiAgICAgICAgICAgICAgICBrZXkgPSBtYXRjaFswXTtcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5cy5zdWJzdHJpbmcobWF0Y2guaW5kZXggKyBrZXkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2aW1BcGkuaGFuZGxlS2V5KGNtLCBrZXksICdtYXBwaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlS2V5SW5zZXJ0TW9kZSgpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVFc2MoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGtleXMgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgKyBrZXk7XG4gICAgICAgICAgICB2YXIga2V5c0FyZUNoYXJzID0ga2V5Lmxlbmd0aCA9PSAxO1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gY29tbWFuZERpc3BhdGNoZXIubWF0Y2hDb21tYW5kKGtleXMsIGRlZmF1bHRLZXltYXAsIHZpbS5pbnB1dFN0YXRlLCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgICB3aGlsZSAoa2V5cy5sZW5ndGggPiAxICYmIG1hdGNoLnR5cGUgIT0gJ2Z1bGwnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgPSBrZXlzLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHZhciB0aGlzTWF0Y2ggPSBjb21tYW5kRGlzcGF0Y2hlci5tYXRjaENvbW1hbmQoa2V5cywgZGVmYXVsdEtleW1hcCwgdmltLmlucHV0U3RhdGUsICdpbnNlcnQnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpc01hdGNoLnR5cGUgIT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdGhpc01hdGNoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaC50eXBlID09ICdub25lJykge1xuICAgICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2gudHlwZSA9PSAncGFydGlhbCcpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdEluc2VydE1vZGVLZXlUaW1lcikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGxhc3RJbnNlcnRNb2RlS2V5VGltZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0SW5zZXJ0TW9kZUtleVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBpZiAodmltLmluc2VydE1vZGUgJiYgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgfSB9LCBnZXRPcHRpb24oJ2luc2VydE1vZGVFc2NLZXlzVGltZW91dCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWtleXNBcmVDaGFycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0SW5zZXJ0TW9kZUtleVRpbWVyKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChsYXN0SW5zZXJ0TW9kZUtleVRpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXlzQXJlQ2hhcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZXJlID0gc2VsZWN0aW9uc1tpXS5oZWFkO1xuICAgICAgICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIG9mZnNldEN1cnNvcihoZXJlLCAwLCAtKGtleXMubGVuZ3RoIC0gMSkpLCBoZXJlLCAnK2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5jaGFuZ2VzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaC5jb21tYW5kO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUtleU5vbkluc2VydE1vZGUoKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlTWFjcm9SZWNvcmRpbmcoKSB8fCBoYW5kbGVFc2MoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGtleXMgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgKyBrZXk7XG4gICAgICAgICAgICBpZiAoL15bMS05XVxcZCokLy50ZXN0KGtleXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIga2V5c01hdGNoZXIgPSAvXihcXGQqKSguKikkLy5leGVjKGtleXMpO1xuICAgICAgICAgICAgaWYgKCFrZXlzTWF0Y2hlcikge1xuICAgICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB2aW0udmlzdWFsTW9kZSA/ICd2aXN1YWwnIDpcbiAgICAgICAgICAgICAgICAnbm9ybWFsJztcbiAgICAgICAgICAgIHZhciBtYWluS2V5ID0ga2V5c01hdGNoZXJbMl0gfHwga2V5c01hdGNoZXJbMV07XG4gICAgICAgICAgICBpZiAodmltLmlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dCAmJiB2aW0uaW5wdXRTdGF0ZS5vcGVyYXRvclNob3J0Y3V0LnNsaWNlKC0xKSA9PSBtYWluS2V5KSB7XG4gICAgICAgICAgICAgICAgbWFpbktleSA9IHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBjb21tYW5kRGlzcGF0Y2hlci5tYXRjaENvbW1hbmQobWFpbktleSwgZGVmYXVsdEtleW1hcCwgdmltLmlucHV0U3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKG1hdGNoLnR5cGUgPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtYXRjaC50eXBlID09ICdwYXJ0aWFsJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2gudHlwZSA9PSAnY2xlYXInKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAga2V5c01hdGNoZXIgPSAvXihcXGQqKSguKikkLy5leGVjKGtleXMpO1xuICAgICAgICAgICAgaWYgKGtleXNNYXRjaGVyWzFdICYmIGtleXNNYXRjaGVyWzFdICE9ICcwJykge1xuICAgICAgICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLnB1c2hSZXBlYXREaWdpdChrZXlzTWF0Y2hlclsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2guY29tbWFuZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29tbWFuZDtcbiAgICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gaGFuZGxlS2V5SW5zZXJ0TW9kZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tbWFuZCA9IGhhbmRsZUtleU5vbkluc2VydE1vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vYWNlX3BhdGNoXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29tbWFuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgoY29tbWFuZC5vcGVyYXRvciB8fCBjb21tYW5kLmlzRWRpdCkgJiYgY20uZ2V0T3B0aW9uKCdyZWFkT25seScpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIGFjZV9wYXRjaFxuICAgICAgICAgICAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjbS5jdXJPcC5pc1ZpbU9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT0gJ2tleVRvS2V5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvS2V5VG9LZXkoY29tbWFuZC50b0tleXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNtLnN0YXRlLnZpbSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmltQXBpLnN1cHByZXNzRXJyb3JMb2dnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZVsnbG9nJ10oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlRXg6IGZ1bmN0aW9uIChjbSwgaW5wdXQpIHtcbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgaW5wdXQpO1xuICAgIH0sXG4gICAgZGVmaW5lTW90aW9uOiBkZWZpbmVNb3Rpb24sXG4gICAgZGVmaW5lQWN0aW9uOiBkZWZpbmVBY3Rpb24sXG4gICAgZGVmaW5lT3BlcmF0b3I6IGRlZmluZU9wZXJhdG9yLFxuICAgIG1hcENvbW1hbmQ6IG1hcENvbW1hbmQsXG4gICAgX21hcENvbW1hbmQ6IF9tYXBDb21tYW5kLFxuICAgIGRlZmluZVJlZ2lzdGVyOiBkZWZpbmVSZWdpc3RlcixcbiAgICBleGl0VmlzdWFsTW9kZTogZXhpdFZpc3VhbE1vZGUsXG4gICAgZXhpdEluc2VydE1vZGU6IGV4aXRJbnNlcnRNb2RlXG59O1xuZnVuY3Rpb24gSW5wdXRTdGF0ZSgpIHtcbiAgICB0aGlzLnByZWZpeFJlcGVhdCA9IFtdO1xuICAgIHRoaXMubW90aW9uUmVwZWF0ID0gW107XG4gICAgdGhpcy5vcGVyYXRvciA9IG51bGw7XG4gICAgdGhpcy5vcGVyYXRvckFyZ3MgPSBudWxsO1xuICAgIHRoaXMubW90aW9uID0gbnVsbDtcbiAgICB0aGlzLm1vdGlvbkFyZ3MgPSBudWxsO1xuICAgIHRoaXMua2V5QnVmZmVyID0gW107IC8vIEZvciBtYXRjaGluZyBtdWx0aS1rZXkgY29tbWFuZHMuXG4gICAgdGhpcy5yZWdpc3Rlck5hbWUgPSBudWxsOyAvLyBEZWZhdWx0cyB0byB0aGUgdW5uYW1lZCByZWdpc3Rlci5cbn1cbklucHV0U3RhdGUucHJvdG90eXBlLnB1c2hSZXBlYXREaWdpdCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKCF0aGlzLm9wZXJhdG9yKSB7XG4gICAgICAgIHRoaXMucHJlZml4UmVwZWF0ID0gdGhpcy5wcmVmaXhSZXBlYXQuY29uY2F0KG4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5tb3Rpb25SZXBlYXQgPSB0aGlzLm1vdGlvblJlcGVhdC5jb25jYXQobik7XG4gICAgfVxufTtcbklucHV0U3RhdGUucHJvdG90eXBlLmdldFJlcGVhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVwZWF0ID0gMDtcbiAgICBpZiAodGhpcy5wcmVmaXhSZXBlYXQubGVuZ3RoID4gMCB8fCB0aGlzLm1vdGlvblJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcGVhdCA9IDE7XG4gICAgICAgIGlmICh0aGlzLnByZWZpeFJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXBlYXQgKj0gcGFyc2VJbnQodGhpcy5wcmVmaXhSZXBlYXQuam9pbignJyksIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb3Rpb25SZXBlYXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVwZWF0ICo9IHBhcnNlSW50KHRoaXMubW90aW9uUmVwZWF0LmpvaW4oJycpLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcGVhdDtcbn07XG5mdW5jdGlvbiBjbGVhcklucHV0U3RhdGUoY20sIHJlYXNvbikge1xuICAgIGNtLnN0YXRlLnZpbS5pbnB1dFN0YXRlID0gbmV3IElucHV0U3RhdGUoKTtcbiAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgJ3ZpbS1jb21tYW5kLWRvbmUnLCByZWFzb24pO1xufVxuZnVuY3Rpb24gUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmtleUJ1ZmZlciA9IFt0ZXh0IHx8ICcnXTtcbiAgICB0aGlzLmluc2VydE1vZGVDaGFuZ2VzID0gW107XG4gICAgdGhpcy5zZWFyY2hRdWVyaWVzID0gW107XG4gICAgdGhpcy5saW5ld2lzZSA9ICEhbGluZXdpc2U7XG4gICAgdGhpcy5ibG9ja3dpc2UgPSAhIWJsb2Nrd2lzZTtcbn1cblJlZ2lzdGVyLnByb3RvdHlwZSA9IHtcbiAgICBzZXRUZXh0OiBmdW5jdGlvbiAodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSkge1xuICAgICAgICB0aGlzLmtleUJ1ZmZlciA9IFt0ZXh0IHx8ICcnXTtcbiAgICAgICAgdGhpcy5saW5ld2lzZSA9ICEhbGluZXdpc2U7XG4gICAgICAgIHRoaXMuYmxvY2t3aXNlID0gISFibG9ja3dpc2U7XG4gICAgfSxcbiAgICBwdXNoVGV4dDogZnVuY3Rpb24gKHRleHQsIGxpbmV3aXNlKSB7XG4gICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlCdWZmZXIucHVzaCgnXFxuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpbmV3aXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleUJ1ZmZlci5wdXNoKHRleHQpO1xuICAgIH0sXG4gICAgcHVzaEluc2VydE1vZGVDaGFuZ2VzOiBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLmluc2VydE1vZGVDaGFuZ2VzLnB1c2goY3JlYXRlSW5zZXJ0TW9kZUNoYW5nZXMoY2hhbmdlcykpO1xuICAgIH0sXG4gICAgcHVzaFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyaWVzLnB1c2gocXVlcnkpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5rZXlCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pbnNlcnRNb2RlQ2hhbmdlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5saW5ld2lzZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5QnVmZmVyLmpvaW4oJycpO1xuICAgIH1cbn07XG5mdW5jdGlvbiBkZWZpbmVSZWdpc3RlcihuYW1lLCByZWdpc3Rlcikge1xuICAgIHZhciByZWdpc3RlcnMgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucmVnaXN0ZXJzO1xuICAgIGlmICghbmFtZSB8fCBuYW1lLmxlbmd0aCAhPSAxKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdSZWdpc3RlciBuYW1lIG11c3QgYmUgMSBjaGFyYWN0ZXInKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJzW25hbWVdID0gcmVnaXN0ZXI7XG4gICAgdmFsaWRSZWdpc3RlcnMucHVzaChuYW1lKTtcbn1cbmZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcihyZWdpc3RlcnMpIHtcbiAgICB0aGlzLnJlZ2lzdGVycyA9IHJlZ2lzdGVycztcbiAgICB0aGlzLnVubmFtZWRSZWdpc3RlciA9IHJlZ2lzdGVyc1snXCInXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgIHJlZ2lzdGVyc1snLiddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgcmVnaXN0ZXJzWyc6J10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICByZWdpc3RlcnNbJy8nXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgIHJlZ2lzdGVyc1snKyddID0gbmV3IFJlZ2lzdGVyKCk7XG59XG5SZWdpc3RlckNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xuICAgIHB1c2hUZXh0OiBmdW5jdGlvbiAocmVnaXN0ZXJOYW1lLCBvcGVyYXRvciwgdGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSkge1xuICAgICAgICBpZiAocmVnaXN0ZXJOYW1lID09PSAnXycpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChsaW5ld2lzZSAmJiB0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aCAtIDEpICE9PSAnXFxuJykge1xuICAgICAgICAgICAgdGV4dCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVnaXN0ZXIgPSB0aGlzLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSA6IG51bGw7XG4gICAgICAgIGlmICghcmVnaXN0ZXIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd5YW5rJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlcnNbJzAnXSA9IG5ldyBSZWdpc3Rlcih0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKCdcXG4nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlcnNbJy0nXSA9IG5ldyBSZWdpc3Rlcih0ZXh0LCBsaW5ld2lzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0TnVtZXJpY1JlZ2lzdGVyc18oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWycxJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bm5hbWVkUmVnaXN0ZXIuc2V0VGV4dCh0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXBwZW5kID0gaXNVcHBlckNhc2UocmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgaWYgKGFwcGVuZCkge1xuICAgICAgICAgICAgcmVnaXN0ZXIucHVzaFRleHQodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVnaXN0ZXIuc2V0VGV4dCh0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnaXN0ZXJOYW1lID09PSAnKycgJiYgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQocmVnaXN0ZXIudG9TdHJpbmcoKSwgbGluZXdpc2UpO1xuICAgIH0sXG4gICAgZ2V0UmVnaXN0ZXI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkUmVnaXN0ZXIobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVubmFtZWRSZWdpc3RlcjtcbiAgICAgICAgfVxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMucmVnaXN0ZXJzW25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1tuYW1lXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyc1tuYW1lXTtcbiAgICB9LFxuICAgIGlzVmFsaWRSZWdpc3RlcjogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWUgJiYgaW5BcnJheShuYW1lLCB2YWxpZFJlZ2lzdGVycyk7XG4gICAgfSxcbiAgICBzaGlmdE51bWVyaWNSZWdpc3RlcnNfOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSA5OyBpID49IDI7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcnNbaV0gPSB0aGlzLmdldFJlZ2lzdGVyKCcnICsgKGkgLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gSGlzdG9yeUNvbnRyb2xsZXIoKSB7XG4gICAgdGhpcy5oaXN0b3J5QnVmZmVyID0gW107XG4gICAgdGhpcy5pdGVyYXRvciA9IDA7XG4gICAgdGhpcy5pbml0aWFsUHJlZml4ID0gbnVsbDtcbn1cbkhpc3RvcnlDb250cm9sbGVyLnByb3RvdHlwZSA9IHtcbiAgICBuZXh0TWF0Y2g6IGZ1bmN0aW9uIChpbnB1dCwgdXApIHtcbiAgICAgICAgdmFyIGhpc3RvcnlCdWZmZXIgPSB0aGlzLmhpc3RvcnlCdWZmZXI7XG4gICAgICAgIHZhciBkaXIgPSB1cCA/IC0xIDogMTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFByZWZpeCA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFByZWZpeCA9IGlucHV0O1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5pdGVyYXRvciArIGRpcjsgdXAgPyBpID49IDAgOiBpIDwgaGlzdG9yeUJ1ZmZlci5sZW5ndGg7IGkgKz0gZGlyKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGhpc3RvcnlCdWZmZXJbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBlbGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFByZWZpeCA9PSBlbGVtZW50LnN1YnN0cmluZygwLCBqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID49IGhpc3RvcnlCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gaGlzdG9yeUJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsUHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9LFxuICAgIHB1c2hJbnB1dDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaGlzdG9yeUJ1ZmZlci5pbmRleE9mKGlucHV0KTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKGlucHV0Lmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeUJ1ZmZlci5wdXNoKGlucHV0KTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFByZWZpeCA9IG51bGw7XG4gICAgICAgIHRoaXMuaXRlcmF0b3IgPSB0aGlzLmhpc3RvcnlCdWZmZXIubGVuZ3RoO1xuICAgIH1cbn07XG52YXIgY29tbWFuZERpc3BhdGNoZXIgPSB7XG4gICAgbWF0Y2hDb21tYW5kOiBmdW5jdGlvbiAoa2V5cywga2V5TWFwLCBpbnB1dFN0YXRlLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gY29tbWFuZE1hdGNoZXMoa2V5cywga2V5TWFwLCBjb250ZXh0LCBpbnB1dFN0YXRlKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzLmZ1bGwgJiYgIW1hdGNoZXMucGFydGlhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ25vbmUnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW1hdGNoZXMuZnVsbCAmJiBtYXRjaGVzLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdwYXJ0aWFsJyB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBiZXN0TWF0Y2g7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF0Y2hlcy5mdWxsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBtYXRjaGVzLmZ1bGxbaV07XG4gICAgICAgICAgICBpZiAoIWJlc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgIGJlc3RNYXRjaCA9IG1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiZXN0TWF0Y2gua2V5cy5zbGljZSgtMTEpID09ICc8Y2hhcmFjdGVyPicpIHtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBsYXN0Q2hhcihrZXlzKTtcbiAgICAgICAgICAgIGlmICghY2hhcmFjdGVyIHx8IGNoYXJhY3Rlci5sZW5ndGggPiAxKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdjbGVhcicgfTtcbiAgICAgICAgICAgIGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2Z1bGwnLCBjb21tYW5kOiBiZXN0TWF0Y2ggfTtcbiAgICB9LFxuICAgIHByb2Nlc3NDb21tYW5kOiBmdW5jdGlvbiAoY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSA9IGNvbW1hbmQucmVwZWF0T3ZlcnJpZGU7XG4gICAgICAgIHN3aXRjaCAoY29tbWFuZC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtb3Rpb24nOlxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29wZXJhdG9yJzpcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvcihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29wZXJhdG9yTW90aW9uJzpcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvck1vdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2FjdGlvbic6XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2VhcmNoJzpcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2goY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdleCc6XG4gICAgICAgICAgICBjYXNlICdrZXlUb0V4JzpcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NFeChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByb2Nlc3NNb3Rpb246IGZ1bmN0aW9uIChjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIHZpbS5pbnB1dFN0YXRlLm1vdGlvbiA9IGNvbW1hbmQubW90aW9uO1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5tb3Rpb25BcmdzID0gY29weUFyZ3MoY29tbWFuZC5tb3Rpb25BcmdzKTtcbiAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgfSxcbiAgICBwcm9jZXNzT3BlcmF0b3I6IGZ1bmN0aW9uIChjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciBpbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXRTdGF0ZS5vcGVyYXRvciA9PSBjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRTdGF0ZS5tb3Rpb24gPSAnZXhwYW5kVG9MaW5lJztcbiAgICAgICAgICAgICAgICBpbnB1dFN0YXRlLm1vdGlvbkFyZ3MgPSB7IGxpbmV3aXNlOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yID0gY29tbWFuZC5vcGVyYXRvcjtcbiAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvckFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLm9wZXJhdG9yQXJncyk7XG4gICAgICAgIGlmIChjb21tYW5kLmtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvclNob3J0Y3V0ID0gY29tbWFuZC5rZXlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21tYW5kLmV4aXRWaXN1YWxCbG9jaykge1xuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvY2Vzc09wZXJhdG9yTW90aW9uOiBmdW5jdGlvbiAoY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgdmlzdWFsTW9kZSA9IHZpbS52aXN1YWxNb2RlO1xuICAgICAgICB2YXIgb3BlcmF0b3JNb3Rpb25BcmdzID0gY29weUFyZ3MoY29tbWFuZC5vcGVyYXRvck1vdGlvbkFyZ3MpO1xuICAgICAgICBpZiAob3BlcmF0b3JNb3Rpb25BcmdzKSB7XG4gICAgICAgICAgICBpZiAodmlzdWFsTW9kZSAmJiBvcGVyYXRvck1vdGlvbkFyZ3MudmlzdWFsTGluZSkge1xuICAgICAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvcihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgaWYgKCF2aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByb2Nlc3NBY3Rpb246IGZ1bmN0aW9uIChjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciBpbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICAgIHZhciByZXBlYXQgPSBpbnB1dFN0YXRlLmdldFJlcGVhdCgpO1xuICAgICAgICB2YXIgcmVwZWF0SXNFeHBsaWNpdCA9ICEhcmVwZWF0O1xuICAgICAgICB2YXIgYWN0aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQuYWN0aW9uQXJncykgfHwge307XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgICBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyID0gaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC5vcGVyYXRvcikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT3BlcmF0b3IoY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQubW90aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQubW90aW9uIHx8IGNvbW1hbmQub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgICB9XG4gICAgICAgIGFjdGlvbkFyZ3MucmVwZWF0ID0gcmVwZWF0IHx8IDE7XG4gICAgICAgIGFjdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCA9IHJlcGVhdElzRXhwbGljaXQ7XG4gICAgICAgIGFjdGlvbkFyZ3MucmVnaXN0ZXJOYW1lID0gaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWU7XG4gICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgIHZpbS5sYXN0TW90aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGNvbW1hbmQuaXNFZGl0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29yZExhc3RFZGl0KHZpbSwgaW5wdXRTdGF0ZSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uc1tjb21tYW5kLmFjdGlvbl0oY20sIGFjdGlvbkFyZ3MsIHZpbSk7XG4gICAgfSxcbiAgICBwcm9jZXNzU2VhcmNoOiBmdW5jdGlvbiAoY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICBpZiAoIWNtLmdldFNlYXJjaEN1cnNvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb3J3YXJkID0gY29tbWFuZC5zZWFyY2hBcmdzLmZvcndhcmQ7XG4gICAgICAgIHZhciB3aG9sZVdvcmRPbmx5ID0gY29tbWFuZC5zZWFyY2hBcmdzLndob2xlV29yZE9ubHk7XG4gICAgICAgIGdldFNlYXJjaFN0YXRlKGNtKS5zZXRSZXZlcnNlZCghZm9yd2FyZCk7XG4gICAgICAgIHZhciBwcm9tcHRQcmVmaXggPSAoZm9yd2FyZCkgPyAnLycgOiAnPyc7XG4gICAgICAgIHZhciBvcmlnaW5hbFF1ZXJ5ID0gZ2V0U2VhcmNoU3RhdGUoY20pLmdldFF1ZXJ5KCk7XG4gICAgICAgIHZhciBvcmlnaW5hbFNjcm9sbFBvcyA9IGNtLmdldFNjcm9sbEluZm8oKTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUXVlcnkocXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSkge1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucHVzaElucHV0KHF1ZXJ5KTtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCBxdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIHJlZ2V4OiAnICsgcXVlcnkpO1xuICAgICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc01vdGlvbihjbSwgdmltLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ21vdGlvbicsXG4gICAgICAgICAgICAgICAgbW90aW9uOiAnZmluZE5leHQnLFxuICAgICAgICAgICAgICAgIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogY29tbWFuZC5zZWFyY2hBcmdzLnRvSnVtcGxpc3QgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRDbG9zZShxdWVyeSkge1xuICAgICAgICAgICAgaGFuZGxlUXVlcnkocXVlcnksIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sIHRydWUgLyoqIHNtYXJ0Q2FzZSAqLyk7XG4gICAgICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZykge1xuICAgICAgICAgICAgICAgIGxvZ1NlYXJjaFF1ZXJ5KG1hY3JvTW9kZVN0YXRlLCBxdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlVcChlLCBxdWVyeSwgY2xvc2UpIHtcbiAgICAgICAgICAgIHZhciBrZXlOYW1lID0gQ29kZU1pcnJvci5rZXlOYW1lKGUpLCB1cCwgb2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGtleU5hbWUgPT0gJ1VwJyB8fCBrZXlOYW1lID09ICdEb3duJykge1xuICAgICAgICAgICAgICAgIHVwID0ga2V5TmFtZSA9PSAnVXAnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IGUudGFyZ2V0ID8gZS50YXJnZXQuc2VsZWN0aW9uRW5kIDogMDtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLm5leHRNYXRjaChxdWVyeSwgdXApIHx8ICcnO1xuICAgICAgICAgICAgICAgIGNsb3NlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ICYmIGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zZWxlY3Rpb25FbmQgPSBlLnRhcmdldC5zZWxlY3Rpb25TdGFydCA9IE1hdGgubWluKG9mZnNldCwgZS50YXJnZXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChrZXlOYW1lICE9ICdMZWZ0JyAmJiBrZXlOYW1lICE9ICdSaWdodCcgJiYga2V5TmFtZSAhPSAnQ3RybCcgJiYga2V5TmFtZSAhPSAnQWx0JyAmJiBrZXlOYW1lICE9ICdTaGlmdCcpXG4gICAgICAgICAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGFyc2VkUXVlcnk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnNlZFF1ZXJ5ID0gdXBkYXRlU2VhcmNoUXVlcnkoY20sIHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJzZWRRdWVyeSkge1xuICAgICAgICAgICAgICAgIGNtLnNjcm9sbEludG9WaWV3KGZpbmROZXh0KGNtLCAhZm9yd2FyZCwgcGFyc2VkUXVlcnkpLCAzMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhclNlYXJjaEhpZ2hsaWdodChjbSk7XG4gICAgICAgICAgICAgICAgY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgcXVlcnksIGNsb3NlKSB7XG4gICAgICAgICAgICB2YXIga2V5TmFtZSA9IENvZGVNaXJyb3Iua2V5TmFtZShlKTtcbiAgICAgICAgICAgIGlmIChrZXlOYW1lID09ICdFc2MnIHx8IGtleU5hbWUgPT0gJ0N0cmwtQycgfHwga2V5TmFtZSA9PSAnQ3RybC1bJyB8fFxuICAgICAgICAgICAgICAgIChrZXlOYW1lID09ICdCYWNrc3BhY2UnICYmIHF1ZXJ5ID09ICcnKSkge1xuICAgICAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChxdWVyeSk7XG4gICAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgb3JpZ2luYWxRdWVyeSk7XG4gICAgICAgICAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgICAgICAgICAgIGNtLnNjcm9sbFRvKG9yaWdpbmFsU2Nyb2xsUG9zLmxlZnQsIG9yaWdpbmFsU2Nyb2xsUG9zLnRvcCk7XG4gICAgICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlOYW1lID09ICdVcCcgfHwga2V5TmFtZSA9PSAnRG93bicpIHtcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleU5hbWUgPT0gJ0N0cmwtVScpIHtcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgICAgICBjbG9zZSgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb21tYW5kLnNlYXJjaEFyZ3MucXVlcnlTcmMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Byb21wdCc6XG4gICAgICAgICAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgICAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBtYWNyb01vZGVTdGF0ZS5yZXBsYXlTZWFyY2hRdWVyaWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCBmYWxzZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dQcm9tcHQoY20sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IHByb21wdFByZWZpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2M6ICcoSmF2YVNjcmlwdCByZWdleHApJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5VXA6IG9uUHJvbXB0S2V5VXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93blxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3b3JkVW5kZXJDdXJzb3InOlxuICAgICAgICAgICAgICAgIHZhciB3b3JkID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBmYWxzZSAvKiogaW5jbHVzaXZlICovLCB0cnVlIC8qKiBmb3J3YXJkICovLCBmYWxzZSAvKiogYmlnV29yZCAqLywgdHJ1ZSAvKiogbm9TeW1ib2wgKi8pO1xuICAgICAgICAgICAgICAgIHZhciBpc0tleXdvcmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgICAgICAgICAgICB3b3JkID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBmYWxzZSAvKiogaW5jbHVzaXZlICovLCB0cnVlIC8qKiBmb3J3YXJkICovLCBmYWxzZSAvKiogYmlnV29yZCAqLywgZmFsc2UgLyoqIG5vU3ltYm9sICovKTtcbiAgICAgICAgICAgICAgICAgICAgaXNLZXl3b3JkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IGNtLmdldExpbmUod29yZC5zdGFydC5saW5lKS5zdWJzdHJpbmcod29yZC5zdGFydC5jaCwgd29yZC5lbmQuY2gpO1xuICAgICAgICAgICAgICAgIGlmIChpc0tleXdvcmQgJiYgd2hvbGVXb3JkT25seSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeSA9ICdcXFxcYicgKyBxdWVyeSArICdcXFxcYic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IGVzY2FwZVJlZ2V4KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuanVtcExpc3QuY2FjaGVkQ3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHdvcmQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCBmYWxzZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvY2Vzc0V4OiBmdW5jdGlvbiAoY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICBmdW5jdGlvbiBvblByb21wdENsb3NlKGlucHV0KSB7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5wdXNoSW5wdXQoaW5wdXQpO1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGlucHV0KTtcbiAgICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0pXG4gICAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgaW5wdXQsIGNsb3NlKSB7XG4gICAgICAgICAgICB2YXIga2V5TmFtZSA9IENvZGVNaXJyb3Iua2V5TmFtZShlKSwgdXAsIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChrZXlOYW1lID09ICdFc2MnIHx8IGtleU5hbWUgPT0gJ0N0cmwtQycgfHwga2V5TmFtZSA9PSAnQ3RybC1bJyB8fFxuICAgICAgICAgICAgICAgIChrZXlOYW1lID09ICdCYWNrc3BhY2UnICYmIGlucHV0ID09ICcnKSkge1xuICAgICAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChpbnB1dCk7XG4gICAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXlOYW1lID09ICdVcCcgfHwga2V5TmFtZSA9PSAnRG93bicpIHtcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgICAgICB1cCA9IGtleU5hbWUgPT0gJ1VwJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnNlbGVjdGlvbkVuZCA6IDA7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5uZXh0TWF0Y2goaW5wdXQsIHVwKSB8fCAnJztcbiAgICAgICAgICAgICAgICBjbG9zZShpbnB1dCk7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldCAmJiBlLnRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc2VsZWN0aW9uRW5kID0gZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihvZmZzZXQsIGUudGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlOYW1lID09ICdDdHJsLVUnKSB7XG4gICAgICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICAgICAgY2xvc2UoJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleU5hbWUgIT0gJ0xlZnQnICYmIGtleU5hbWUgIT0gJ1JpZ2h0JyAmJiBrZXlOYW1lICE9ICdDdHJsJyAmJiBrZXlOYW1lICE9ICdBbHQnICYmIGtleU5hbWUgIT0gJ1NoaWZ0JylcbiAgICAgICAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09ICdrZXlUb0V4Jykge1xuICAgICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgY29tbWFuZC5leEFyZ3MuaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgc2hvd1Byb21wdChjbSwgeyBvbkNsb3NlOiBvblByb21wdENsb3NlLCBwcmVmaXg6ICc6JywgdmFsdWU6ICdcXCc8LFxcJz4nLFxuICAgICAgICAgICAgICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93biwgc2VsZWN0VmFsdWVPbk9wZW46IGZhbHNlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1Byb21wdChjbSwgeyBvbkNsb3NlOiBvblByb21wdENsb3NlLCBwcmVmaXg6ICc6JyxcbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd24gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGV2YWxJbnB1dDogZnVuY3Rpb24gKGNtLCB2aW0pIHtcbiAgICAgICAgdmFyIGlucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICAgICAgdmFyIG1vdGlvbiA9IGlucHV0U3RhdGUubW90aW9uO1xuICAgICAgICB2YXIgbW90aW9uQXJncyA9IGlucHV0U3RhdGUubW90aW9uQXJncyB8fCB7fTtcbiAgICAgICAgdmFyIG9wZXJhdG9yID0gaW5wdXRTdGF0ZS5vcGVyYXRvcjtcbiAgICAgICAgdmFyIG9wZXJhdG9yQXJncyA9IGlucHV0U3RhdGUub3BlcmF0b3JBcmdzIHx8IHt9O1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWU7XG4gICAgICAgIHZhciBzZWwgPSB2aW0uc2VsO1xuICAgICAgICB2YXIgb3JpZ0hlYWQgPSBjb3B5Q3Vyc29yKHZpbS52aXN1YWxNb2RlID8gY2xpcEN1cnNvclRvQ29udGVudChjbSwgc2VsLmhlYWQpIDogY20uZ2V0Q3Vyc29yKCdoZWFkJykpO1xuICAgICAgICB2YXIgb3JpZ0FuY2hvciA9IGNvcHlDdXJzb3IodmltLnZpc3VhbE1vZGUgPyBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBzZWwuYW5jaG9yKSA6IGNtLmdldEN1cnNvcignYW5jaG9yJykpO1xuICAgICAgICB2YXIgb2xkSGVhZCA9IGNvcHlDdXJzb3Iob3JpZ0hlYWQpO1xuICAgICAgICB2YXIgb2xkQW5jaG9yID0gY29weUN1cnNvcihvcmlnQW5jaG9yKTtcbiAgICAgICAgdmFyIG5ld0hlYWQsIG5ld0FuY2hvcjtcbiAgICAgICAgdmFyIHJlcGVhdDtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29yZExhc3RFZGl0KHZpbSwgaW5wdXRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVwZWF0ID0gaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcGVhdCA9IGlucHV0U3RhdGUuZ2V0UmVwZWF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcGVhdCA+IDAgJiYgbW90aW9uQXJncy5leHBsaWNpdFJlcGVhdCkge1xuICAgICAgICAgICAgbW90aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtb3Rpb25BcmdzLm5vUmVwZWF0IHx8XG4gICAgICAgICAgICAoIW1vdGlvbkFyZ3MuZXhwbGljaXRSZXBlYXQgJiYgcmVwZWF0ID09PSAwKSkge1xuICAgICAgICAgICAgcmVwZWF0ID0gMTtcbiAgICAgICAgICAgIG1vdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgICBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyID0gb3BlcmF0b3JBcmdzLnNlbGVjdGVkQ2hhcmFjdGVyID1cbiAgICAgICAgICAgICAgICBpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIG1vdGlvbkFyZ3MucmVwZWF0ID0gcmVwZWF0O1xuICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICBpZiAobW90aW9uKSB7XG4gICAgICAgICAgICB2YXIgbW90aW9uUmVzdWx0ID0gbW90aW9uc1ttb3Rpb25dKGNtLCBvcmlnSGVhZCwgbW90aW9uQXJncywgdmltLCBpbnB1dFN0YXRlKTtcbiAgICAgICAgICAgIHZpbS5sYXN0TW90aW9uID0gbW90aW9uc1ttb3Rpb25dO1xuICAgICAgICAgICAgaWYgKCFtb3Rpb25SZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW90aW9uQXJncy50b0p1bXBsaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRvciAmJiBjbS5hY2UuY3VyT3AgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY20uYWNlLmN1ck9wLmNvbW1hbmQuc2Nyb2xsSW50b1ZpZXcgPSBcImNlbnRlci1hbmltYXRlXCI7IC8vIGFjZV9wYXRjaFxuICAgICAgICAgICAgICAgIHZhciBqdW1wTGlzdCA9IHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0O1xuICAgICAgICAgICAgICAgIHZhciBjYWNoZWRDdXJzb3IgPSBqdW1wTGlzdC5jYWNoZWRDdXJzb3I7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlZEN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRKdW1wUG9zaXRpb24oY20sIGNhY2hlZEN1cnNvciwgbW90aW9uUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGp1bXBMaXN0LmNhY2hlZEN1cnNvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZEp1bXBQb3NpdGlvbihjbSwgb3JpZ0hlYWQsIG1vdGlvblJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vdGlvblJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgbmV3QW5jaG9yID0gbW90aW9uUmVzdWx0WzBdO1xuICAgICAgICAgICAgICAgIG5ld0hlYWQgPSBtb3Rpb25SZXN1bHRbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdIZWFkID0gbW90aW9uUmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuZXdIZWFkKSB7XG4gICAgICAgICAgICAgICAgbmV3SGVhZCA9IGNvcHlDdXJzb3Iob3JpZ0hlYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEodmltLnZpc3VhbEJsb2NrICYmIG5ld0hlYWQuY2ggPT09IEluZmluaXR5KSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdIZWFkID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3SGVhZCwgb2xkSGVhZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXdBbmNob3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3QW5jaG9yID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3QW5jaG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3QW5jaG9yID0gbmV3QW5jaG9yIHx8IG9sZEFuY2hvcjtcbiAgICAgICAgICAgICAgICBzZWwuYW5jaG9yID0gbmV3QW5jaG9yO1xuICAgICAgICAgICAgICAgIHNlbC5oZWFkID0gbmV3SGVhZDtcbiAgICAgICAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvcklzQmVmb3JlKG5ld0FuY2hvciwgbmV3SGVhZCkgPyBuZXdBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgOiBuZXdIZWFkKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc+JywgY3Vyc29ySXNCZWZvcmUobmV3QW5jaG9yLCBuZXdIZWFkKSA/IG5ld0hlYWRcbiAgICAgICAgICAgICAgICAgICAgOiBuZXdBbmNob3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIW9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNtLmFjZS5jdXJPcClcbiAgICAgICAgICAgICAgICAgICAgY20uYWNlLmN1ck9wLnZpbURpYWxvZ1Njcm9sbCA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgICAgICAgICAgICAgbmV3SGVhZCA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ld0hlYWQsIG9sZEhlYWQpO1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihuZXdIZWFkLmxpbmUsIG5ld0hlYWQuY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgaWYgKG9wZXJhdG9yQXJncy5sYXN0U2VsKSB7XG4gICAgICAgICAgICAgICAgbmV3QW5jaG9yID0gb2xkQW5jaG9yO1xuICAgICAgICAgICAgICAgIHZhciBsYXN0U2VsID0gb3BlcmF0b3JBcmdzLmxhc3RTZWw7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmVPZmZzZXQgPSBNYXRoLmFicyhsYXN0U2VsLmhlYWQubGluZSAtIGxhc3RTZWwuYW5jaG9yLmxpbmUpO1xuICAgICAgICAgICAgICAgIHZhciBjaE9mZnNldCA9IE1hdGguYWJzKGxhc3RTZWwuaGVhZC5jaCAtIGxhc3RTZWwuYW5jaG9yLmNoKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlbC52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hlYWQgPSBuZXcgUG9zKG9sZEFuY2hvci5saW5lICsgbGluZU9mZnNldCwgb2xkQW5jaG9yLmNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFzdFNlbC52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSArIGxpbmVPZmZzZXQsIG9sZEFuY2hvci5jaCArIGNoT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFzdFNlbC5oZWFkLmxpbmUgPT0gbGFzdFNlbC5hbmNob3IubGluZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSwgb2xkQW5jaG9yLmNoICsgY2hPZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUgKyBsaW5lT2Zmc2V0LCBvbGRBbmNob3IuY2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBsYXN0U2VsLnZpc3VhbExpbmU7XG4gICAgICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gbGFzdFNlbC52aXN1YWxCbG9jaztcbiAgICAgICAgICAgICAgICBzZWwgPSB2aW0uc2VsID0ge1xuICAgICAgICAgICAgICAgICAgICBhbmNob3I6IG5ld0FuY2hvcixcbiAgICAgICAgICAgICAgICAgICAgaGVhZDogbmV3SGVhZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgICAgICBvcGVyYXRvckFyZ3MubGFzdFNlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBjb3B5Q3Vyc29yKHNlbC5hbmNob3IpLFxuICAgICAgICAgICAgICAgICAgICBoZWFkOiBjb3B5Q3Vyc29yKHNlbC5oZWFkKSxcbiAgICAgICAgICAgICAgICAgICAgdmlzdWFsQmxvY2s6IHZpbS52aXN1YWxCbG9jayxcbiAgICAgICAgICAgICAgICAgICAgdmlzdWFsTGluZTogdmltLnZpc3VhbExpbmVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGN1clN0YXJ0LCBjdXJFbmQsIGxpbmV3aXNlLCBtb2RlO1xuICAgICAgICAgICAgdmFyIGNtU2VsO1xuICAgICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgY3VyU3RhcnQgPSBjdXJzb3JNaW4oc2VsLmhlYWQsIHNlbC5hbmNob3IpO1xuICAgICAgICAgICAgICAgIGN1ckVuZCA9IGN1cnNvck1heChzZWwuaGVhZCwgc2VsLmFuY2hvcik7XG4gICAgICAgICAgICAgICAgbGluZXdpc2UgPSB2aW0udmlzdWFsTGluZSB8fCBvcGVyYXRvckFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgICAgICAgbW9kZSA9IHZpbS52aXN1YWxCbG9jayA/ICdibG9jaycgOlxuICAgICAgICAgICAgICAgICAgICBsaW5ld2lzZSA/ICdsaW5lJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAnY2hhcic7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9ucyA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgICAgIGNtU2VsID0gbWFrZUNtU2VsZWN0aW9uKGNtLCB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb25zLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbnMuZW5kXG4gICAgICAgICAgICAgICAgfSwgbW9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZXMgPSBjbVNlbC5yYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlID09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzW2ldLmhlYWQuY2ggPSBsaW5lTGVuZ3RoKGNtLCByYW5nZXNbaV0uaGVhZC5saW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtb2RlID09ICdsaW5lJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzWzBdLmhlYWQgPSBuZXcgUG9zKHJhbmdlc1swXS5oZWFkLmxpbmUgKyAxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1clN0YXJ0ID0gY29weUN1cnNvcihuZXdBbmNob3IgfHwgb2xkQW5jaG9yKTtcbiAgICAgICAgICAgICAgICBjdXJFbmQgPSBjb3B5Q3Vyc29yKG5ld0hlYWQgfHwgb2xkSGVhZCk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvcklzQmVmb3JlKGN1ckVuZCwgY3VyU3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSBjdXJTdGFydDtcbiAgICAgICAgICAgICAgICAgICAgY3VyU3RhcnQgPSBjdXJFbmQ7XG4gICAgICAgICAgICAgICAgICAgIGN1ckVuZCA9IHRtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGluZXdpc2UgPSBtb3Rpb25BcmdzLmxpbmV3aXNlIHx8IG9wZXJhdG9yQXJncy5saW5ld2lzZTtcbiAgICAgICAgICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kU2VsZWN0aW9uVG9MaW5lKGNtLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaXBUb0xpbmUoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2RlID0gJ2NoYXInO1xuICAgICAgICAgICAgICAgIHZhciBleGNsdXNpdmUgPSAhbW90aW9uQXJncy5pbmNsdXNpdmUgfHwgbGluZXdpc2U7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9ucyA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgICAgIGNtU2VsID0gbWFrZUNtU2VsZWN0aW9uKGNtLCB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb25zLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbnMuZW5kXG4gICAgICAgICAgICAgICAgfSwgbW9kZSwgZXhjbHVzaXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNtLnNldFNlbGVjdGlvbnMoY21TZWwucmFuZ2VzLCBjbVNlbC5wcmltYXJ5KTtcbiAgICAgICAgICAgIHZpbS5sYXN0TW90aW9uID0gbnVsbDtcbiAgICAgICAgICAgIG9wZXJhdG9yQXJncy5yZXBlYXQgPSByZXBlYXQ7IC8vIEZvciBpbmRlbnQgaW4gdmlzdWFsIG1vZGUuXG4gICAgICAgICAgICBvcGVyYXRvckFyZ3MucmVnaXN0ZXJOYW1lID0gcmVnaXN0ZXJOYW1lO1xuICAgICAgICAgICAgb3BlcmF0b3JBcmdzLmxpbmV3aXNlID0gbGluZXdpc2U7XG4gICAgICAgICAgICB2YXIgb3BlcmF0b3JNb3ZlVG8gPSBvcGVyYXRvcnNbb3BlcmF0b3JdKGNtLCBvcGVyYXRvckFyZ3MsIGNtU2VsLnJhbmdlcywgb2xkQW5jaG9yLCBuZXdIZWFkKTtcbiAgICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBvcGVyYXRvck1vdmVUbyAhPSBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcGVyYXRvck1vdmVUbykge1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihvcGVyYXRvck1vdmVUbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlY29yZExhc3RFZGl0OiBmdW5jdGlvbiAodmltLCBpbnB1dFN0YXRlLCBhY3Rpb25Db21tYW5kKSB7XG4gICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmltLmxhc3RFZGl0SW5wdXRTdGF0ZSA9IGlucHV0U3RhdGU7XG4gICAgICAgIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQgPSBhY3Rpb25Db21tYW5kO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcyA9IFtdO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLnZpc3VhbEJsb2NrID0gdmltLnZpc3VhbEJsb2NrID8gdmltLnNlbC5oZWFkLmxpbmUgLSB2aW0uc2VsLmFuY2hvci5saW5lIDogMDtcbiAgICB9XG59O1xudmFyIG1vdGlvbnMgPSB7XG4gICAgbW92ZVRvVG9wTGluZTogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZSA9IGdldFVzZXJWaXNpYmxlTGluZXMoY20pLnRvcCArIG1vdGlvbkFyZ3MucmVwZWF0IC0gMTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgfSxcbiAgICBtb3ZlVG9NaWRkbGVMaW5lOiBmdW5jdGlvbiAoY20pIHtcbiAgICAgICAgdmFyIHJhbmdlID0gZ2V0VXNlclZpc2libGVMaW5lcyhjbSk7XG4gICAgICAgIHZhciBsaW5lID0gTWF0aC5mbG9vcigocmFuZ2UudG9wICsgcmFuZ2UuYm90dG9tKSAqIDAuNSk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lKSkpO1xuICAgIH0sXG4gICAgbW92ZVRvQm90dG9tTGluZTogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZSA9IGdldFVzZXJWaXNpYmxlTGluZXMoY20pLmJvdHRvbSAtIG1vdGlvbkFyZ3MucmVwZWF0ICsgMTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgfSxcbiAgICBleHBhbmRUb0xpbmU6IGZ1bmN0aW9uIChfY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGN1ci5saW5lICsgbW90aW9uQXJncy5yZXBlYXQgLSAxLCBJbmZpbml0eSk7XG4gICAgfSxcbiAgICBmaW5kTmV4dDogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBxdWVyeSA9IHN0YXRlLmdldFF1ZXJ5KCk7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldiA9ICFtb3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIHByZXYgPSAoc3RhdGUuaXNSZXZlcnNlZCgpKSA/ICFwcmV2IDogcHJldjtcbiAgICAgICAgaGlnaGxpZ2h0U2VhcmNoTWF0Y2hlcyhjbSwgcXVlcnkpO1xuICAgICAgICByZXR1cm4gZmluZE5leHQoY20sIHByZXYgLyoqIHByZXYgKi8sIHF1ZXJ5LCBtb3Rpb25BcmdzLnJlcGVhdCk7XG4gICAgfSxcbiAgICBmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZTogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltLCBwcmV2SW5wdXRTdGF0ZSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBxdWVyeSA9IHN0YXRlLmdldFF1ZXJ5KCk7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldiA9ICFtb3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIHByZXYgPSAoc3RhdGUuaXNSZXZlcnNlZCgpKSA/ICFwcmV2IDogcHJldjtcbiAgICAgICAgdmFyIG5leHQgPSBmaW5kTmV4dEZyb21BbmRUb0luY2x1c2l2ZShjbSwgcHJldiwgcXVlcnksIG1vdGlvbkFyZ3MucmVwZWF0LCB2aW0pO1xuICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldklucHV0U3RhdGUub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBmcm9tID0gbmV4dFswXTtcbiAgICAgICAgdmFyIHRvID0gbmV3IFBvcyhuZXh0WzFdLmxpbmUsIG5leHRbMV0uY2ggLSAxKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbExpbmUgfHwgdmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiBcIlwiIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFuY2hvciA9IHZpbS5zZWwuYW5jaG9yO1xuICAgICAgICAgICAgaWYgKGFuY2hvcikge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pc1JldmVyc2VkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIGZyb21dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbYW5jaG9yLCB0b107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2FuY2hvciwgdG9dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbYW5jaG9yLCBmcm9tXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiBcIlwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2ID8gW3RvLCBmcm9tXSA6IFtmcm9tLCB0b107XG4gICAgfSxcbiAgICBnb1RvTWFyazogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBwb3MgPSBnZXRNYXJrUG9zKGNtLCB2aW0sIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIpO1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gbW90aW9uQXJncy5saW5ld2lzZSA/IHsgbGluZTogcG9zLmxpbmUsIGNoOiBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUocG9zLmxpbmUpKSB9IDogcG9zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgbW92ZVRvT3RoZXJIaWdobGlnaHRlZEVuZDogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2sgJiYgbW90aW9uQXJncy5zYW1lTGluZSkge1xuICAgICAgICAgICAgdmFyIHNlbCA9IHZpbS5zZWw7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3Moc2VsLmFuY2hvci5saW5lLCBzZWwuaGVhZC5jaCkpLFxuICAgICAgICAgICAgICAgIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3Moc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5jaCkpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChbdmltLnNlbC5oZWFkLCB2aW0uc2VsLmFuY2hvcl0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBqdW1wVG9NYXJrOiBmdW5jdGlvbiAoY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgYmVzdCA9IGhlYWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW90aW9uQXJncy5yZXBlYXQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGJlc3Q7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmltLm1hcmtzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0xvd2VyQ2FzZShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWFyayA9IHZpbS5tYXJrc1trZXldLmZpbmQoKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNXcm9uZ0RpcmVjdGlvbiA9IChtb3Rpb25BcmdzLmZvcndhcmQpID9cbiAgICAgICAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobWFyaywgY3Vyc29yKSA6IGN1cnNvcklzQmVmb3JlKGN1cnNvciwgbWFyayk7XG4gICAgICAgICAgICAgICAgaWYgKGlzV3JvbmdEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmxpbmV3aXNlICYmIChtYXJrLmxpbmUgPT0gY3Vyc29yLmxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZXF1YWwgPSBjdXJzb3JFcXVhbChjdXJzb3IsIGJlc3QpO1xuICAgICAgICAgICAgICAgIHZhciBiZXR3ZWVuID0gKG1vdGlvbkFyZ3MuZm9yd2FyZCkgP1xuICAgICAgICAgICAgICAgICAgICBjdXJzb3JJc0JldHdlZW4oY3Vyc29yLCBtYXJrLCBiZXN0KSA6XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcklzQmV0d2VlbihiZXN0LCBtYXJrLCBjdXJzb3IpO1xuICAgICAgICAgICAgICAgIGlmIChlcXVhbCB8fCBiZXR3ZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3QgPSBtYXJrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobW90aW9uQXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgYmVzdCA9IG5ldyBQb3MoYmVzdC5saW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUoYmVzdC5saW5lKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgIH0sXG4gICAgbW92ZUJ5Q2hhcmFjdGVyczogZnVuY3Rpb24gKF9jbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgY2ggPSBtb3Rpb25BcmdzLmZvcndhcmQgPyBjdXIuY2ggKyByZXBlYXQgOiBjdXIuY2ggLSByZXBlYXQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGN1ci5saW5lLCBjaCk7XG4gICAgfSxcbiAgICBtb3ZlQnlMaW5lczogZnVuY3Rpb24gKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHZhciBlbmRDaCA9IGN1ci5jaDtcbiAgICAgICAgc3dpdGNoICh2aW0ubGFzdE1vdGlvbikge1xuICAgICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeUxpbmVzOlxuICAgICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeURpc3BsYXlMaW5lczpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlTY3JvbGw6XG4gICAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvQ29sdW1uOlxuICAgICAgICAgICAgY2FzZSB0aGlzLm1vdmVUb0VvbDpcbiAgICAgICAgICAgICAgICBlbmRDaCA9IHZpbS5sYXN0SFBvcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmltLmxhc3RIUG9zID0gZW5kQ2g7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0ICsgKG1vdGlvbkFyZ3MucmVwZWF0T2Zmc2V0IHx8IDApO1xuICAgICAgICB2YXIgbGluZSA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IGN1ci5saW5lICsgcmVwZWF0IDogY3VyLmxpbmUgLSByZXBlYXQ7XG4gICAgICAgIHZhciBmaXJzdCA9IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICB2YXIgbGFzdCA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgIGlmIChsaW5lIDwgZmlyc3QgJiYgY3VyLmxpbmUgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVUb1N0YXJ0T2ZMaW5lKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxpbmUgPiBsYXN0ICYmIGN1ci5saW5lID09IGxhc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlVG9Fb2woY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvbGQgPSBjbS5hY2Uuc2Vzc2lvbi5nZXRGb2xkTGluZShsaW5lKTtcbiAgICAgICAgaWYgKGZvbGQpIHtcbiAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGluZSA+IGZvbGQuc3RhcnQucm93KVxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gZm9sZC5lbmQucm93ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpbmUgPSBmb2xkLnN0YXJ0LnJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobW90aW9uQXJncy50b0ZpcnN0Q2hhcikge1xuICAgICAgICAgICAgZW5kQ2ggPSBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpO1xuICAgICAgICAgICAgdmltLmxhc3RIUG9zID0gZW5kQ2g7XG4gICAgICAgIH1cbiAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMobmV3IFBvcyhsaW5lLCBlbmRDaCksICdkaXYnKS5sZWZ0O1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBlbmRDaCk7XG4gICAgfSxcbiAgICBtb3ZlQnlEaXNwbGF5TGluZXM6IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICBzd2l0Y2ggKHZpbS5sYXN0TW90aW9uKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5RGlzcGxheUxpbmVzOlxuICAgICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeVNjcm9sbDpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlMaW5lczpcbiAgICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Db2x1bW46XG4gICAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvRW9sOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhjdXIsICdkaXYnKS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIHJlcyA9IGNtLmZpbmRQb3NWKGN1ciwgKG1vdGlvbkFyZ3MuZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpLCAnbGluZScsIHZpbS5sYXN0SFNQb3MpO1xuICAgICAgICBpZiAocmVzLmhpdFNpZGUpIHtcbiAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdENoYXJDb29yZHMgPSBjbS5jaGFyQ29vcmRzKHJlcywgJ2RpdicpO1xuICAgICAgICAgICAgICAgIHZhciBnb2FsQ29vcmRzID0geyB0b3A6IGxhc3RDaGFyQ29vcmRzLnRvcCArIDgsIGxlZnQ6IHZpbS5sYXN0SFNQb3MgfTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gY20uY29vcmRzQ2hhcihnb2FsQ29vcmRzLCAnZGl2Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzQ29vcmRzID0gY20uY2hhckNvb3JkcyhuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSwgJ2RpdicpO1xuICAgICAgICAgICAgICAgIHJlc0Nvb3Jkcy5sZWZ0ID0gdmltLmxhc3RIU1BvcztcbiAgICAgICAgICAgICAgICByZXMgPSBjbS5jb29yZHNDaGFyKHJlc0Nvb3JkcywgJ2RpdicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IHJlcy5jaDtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9LFxuICAgIG1vdmVCeVBhZ2U6IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgY3VyU3RhcnQgPSBoZWFkO1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHJldHVybiBjbS5maW5kUG9zVihjdXJTdGFydCwgKG1vdGlvbkFyZ3MuZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpLCAncGFnZScpO1xuICAgIH0sXG4gICAgbW92ZUJ5UGFyYWdyYXBoOiBmdW5jdGlvbiAoY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGRpciA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IDEgOiAtMTtcbiAgICAgICAgcmV0dXJuIGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCBkaXIpO1xuICAgIH0sXG4gICAgbW92ZUJ5U2VudGVuY2U6IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgZGlyID0gbW90aW9uQXJncy5mb3J3YXJkID8gMSA6IC0xO1xuICAgICAgICByZXR1cm4gZmluZFNlbnRlbmNlKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgZGlyKTtcbiAgICB9LFxuICAgIG1vdmVCeVNjcm9sbDogZnVuY3Rpb24gKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHNjcm9sbGJveCA9IGNtLmdldFNjcm9sbEluZm8oKTtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG51bGw7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgaWYgKCFyZXBlYXQpIHtcbiAgICAgICAgICAgIHJlcGVhdCA9IHNjcm9sbGJveC5jbGllbnRIZWlnaHQgLyAoMiAqIGNtLmRlZmF1bHRUZXh0SGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcmlnID0gY20uY2hhckNvb3JkcyhoZWFkLCAnbG9jYWwnKTtcbiAgICAgICAgbW90aW9uQXJncy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIGN1ckVuZCA9IG1vdGlvbnMubW92ZUJ5RGlzcGxheUxpbmVzKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pO1xuICAgICAgICBpZiAoIWN1ckVuZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlc3QgPSBjbS5jaGFyQ29vcmRzKGN1ckVuZCwgJ2xvY2FsJyk7XG4gICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIHNjcm9sbGJveC50b3AgKyBkZXN0LnRvcCAtIG9yaWcudG9wKTtcbiAgICAgICAgcmV0dXJuIGN1ckVuZDtcbiAgICB9LFxuICAgIG1vdmVCeVdvcmRzOiBmdW5jdGlvbiAoY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIG1vdmVUb1dvcmQoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAhIW1vdGlvbkFyZ3MuZm9yd2FyZCwgISFtb3Rpb25BcmdzLndvcmRFbmQsICEhbW90aW9uQXJncy5iaWdXb3JkKTtcbiAgICB9LFxuICAgIG1vdmVUaWxsQ2hhcmFjdGVyOiBmdW5jdGlvbiAoY20sIF9oZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBtb3Rpb25BcmdzLmZvcndhcmQsIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIpO1xuICAgICAgICB2YXIgaW5jcmVtZW50ID0gbW90aW9uQXJncy5mb3J3YXJkID8gLTEgOiAxO1xuICAgICAgICByZWNvcmRMYXN0Q2hhcmFjdGVyU2VhcmNoKGluY3JlbWVudCwgbW90aW9uQXJncyk7XG4gICAgICAgIGlmICghY3VyRW5kKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGN1ckVuZC5jaCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgfSxcbiAgICBtb3ZlVG9DaGFyYWN0ZXI6IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHJlY29yZExhc3RDaGFyYWN0ZXJTZWFyY2goMCwgbW90aW9uQXJncyk7XG4gICAgICAgIHJldHVybiBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgbW90aW9uQXJncy5mb3J3YXJkLCBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyKSB8fCBoZWFkO1xuICAgIH0sXG4gICAgbW92ZVRvU3ltYm9sOiBmdW5jdGlvbiAoY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICByZXR1cm4gZmluZFN5bWJvbChjbSwgcmVwZWF0LCBtb3Rpb25BcmdzLmZvcndhcmQsIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIpIHx8IGhlYWQ7XG4gICAgfSxcbiAgICBtb3ZlVG9Db2x1bW46IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmltLmxhc3RIUG9zID0gcmVwZWF0IC0gMTtcbiAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMoaGVhZCwgJ2RpdicpLmxlZnQ7XG4gICAgICAgIHJldHVybiBtb3ZlVG9Db2x1bW4oY20sIHJlcGVhdCk7XG4gICAgfSxcbiAgICBtb3ZlVG9Fb2w6IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHJldHVybiBtb3ZlVG9Fb2woY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgZmFsc2UpO1xuICAgIH0sXG4gICAgbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyOiBmdW5jdGlvbiAoY20sIGhlYWQpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IGhlYWQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGN1cnNvci5saW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUoY3Vyc29yLmxpbmUpKSk7XG4gICAgfSxcbiAgICBtb3ZlVG9NYXRjaGVkU3ltYm9sOiBmdW5jdGlvbiAoY20sIGhlYWQpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IGhlYWQ7XG4gICAgICAgIHZhciBsaW5lID0gY3Vyc29yLmxpbmU7XG4gICAgICAgIHZhciBjaCA9IGN1cnNvci5jaDtcbiAgICAgICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgICAgdmFyIHN5bWJvbDtcbiAgICAgICAgZm9yICg7IGNoIDwgbGluZVRleHQubGVuZ3RoOyBjaCsrKSB7XG4gICAgICAgICAgICBzeW1ib2wgPSBsaW5lVGV4dC5jaGFyQXQoY2gpO1xuICAgICAgICAgICAgaWYgKHN5bWJvbCAmJiBpc01hdGNoYWJsZVN5bWJvbChzeW1ib2wpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gY20uZ2V0VG9rZW5UeXBlQXQobmV3IFBvcyhsaW5lLCBjaCArIDEpKTtcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGUgIT09IFwic3RyaW5nXCIgJiYgc3R5bGUgIT09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPCBsaW5lVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciByZSA9IC9bPD5dLy50ZXN0KGxpbmVUZXh0W2NoXSkgPyAvWygpe31bXFxdPD5dLyA6IC9bKCl7fVtcXF1dLzsgLy9hY2VfcGF0Y2g/XG4gICAgICAgICAgICB2YXIgbWF0Y2hlZCA9IGNtLmZpbmRNYXRjaGluZ0JyYWNrZXQobmV3IFBvcyhsaW5lLCBjaCArIDEpLCB7IGJyYWNrZXRSZWdleDogcmUgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlZC50bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJzb3I7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vdmVUb1N0YXJ0T2ZMaW5lOiBmdW5jdGlvbiAoX2NtLCBoZWFkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGhlYWQubGluZSwgMCk7XG4gICAgfSxcbiAgICBtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudDogZnVuY3Rpb24gKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZU51bSA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IGNtLmxhc3RMaW5lKCkgOiBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgaWYgKG1vdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCkge1xuICAgICAgICAgICAgbGluZU51bSA9IG1vdGlvbkFyZ3MucmVwZWF0IC0gY20uZ2V0T3B0aW9uKCdmaXJzdExpbmVOdW1iZXInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lTnVtLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZU51bSkpKTtcbiAgICB9LFxuICAgIG1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZTogZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lTGVmdFwiKTtcbiAgICAgICAgcmV0dXJuIGNtLmdldEN1cnNvcigpO1xuICAgIH0sXG4gICAgbW92ZVRvRW5kT2ZEaXNwbGF5TGluZTogZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lUmlnaHRcIik7XG4gICAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIGlmIChoZWFkLnN0aWNreSA9PSBcImJlZm9yZVwiKVxuICAgICAgICAgICAgaGVhZC5jaC0tO1xuICAgICAgICByZXR1cm4gaGVhZDtcbiAgICB9LFxuICAgIHRleHRPYmplY3RNYW5pcHVsYXRpb246IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBtaXJyb3JlZFBhaXJzID0geyAnKCc6ICcpJywgJyknOiAnKCcsXG4gICAgICAgICAgICAneyc6ICd9JywgJ30nOiAneycsXG4gICAgICAgICAgICAnWyc6ICddJywgJ10nOiAnWycsXG4gICAgICAgICAgICAnPCc6ICc+JywgJz4nOiAnPCcgfTtcbiAgICAgICAgdmFyIHNlbGZQYWlyZWQgPSB7ICdcXCcnOiB0cnVlLCAnXCInOiB0cnVlLCAnYCc6IHRydWUgfTtcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIGlmIChjaGFyYWN0ZXIgPT0gJ2InKSB7XG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSAnKCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09ICdCJykge1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gJ3snO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmNsdXNpdmUgPSAhbW90aW9uQXJncy50ZXh0T2JqZWN0SW5uZXI7XG4gICAgICAgIHZhciB0bXA7XG4gICAgICAgIGlmIChtaXJyb3JlZFBhaXJzW2NoYXJhY3Rlcl0pIHtcbiAgICAgICAgICAgIHRtcCA9IHNlbGVjdENvbXBhbmlvbk9iamVjdChjbSwgaGVhZCwgY2hhcmFjdGVyLCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGZQYWlyZWRbY2hhcmFjdGVyXSkge1xuICAgICAgICAgICAgdG1wID0gZmluZEJlZ2lubmluZ0FuZEVuZChjbSwgaGVhZCwgY2hhcmFjdGVyLCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ1cnKSB7XG4gICAgICAgICAgICB0bXAgPSBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIGluY2x1c2l2ZSwgdHJ1ZSAvKiogZm9yd2FyZCAqLywgdHJ1ZSAvKiogYmlnV29yZCAqLyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSAndycpIHtcbiAgICAgICAgICAgIHRtcCA9IGV4cGFuZFdvcmRVbmRlckN1cnNvcihjbSwgaW5jbHVzaXZlLCB0cnVlIC8qKiBmb3J3YXJkICovLCBmYWxzZSAvKiogYmlnV29yZCAqLyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSAncCcpIHtcbiAgICAgICAgICAgIHRtcCA9IGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAwLCBpbmNsdXNpdmUpO1xuICAgICAgICAgICAgbW90aW9uQXJncy5saW5ld2lzZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZpbS52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgb3BlcmF0b3JBcmdzID0gdmltLmlucHV0U3RhdGUub3BlcmF0b3JBcmdzO1xuICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvckFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3JBcmdzLmxpbmV3aXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG1wLmVuZC5saW5lLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyID09PSAndCcpIHtcbiAgICAgICAgICAgIHRtcCA9IGV4cGFuZFRhZ1VuZGVyQ3Vyc29yKGNtLCBoZWFkLCBpbmNsdXNpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ3MnKSB7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGNtLmdldExpbmUoaGVhZC5saW5lKTtcbiAgICAgICAgICAgIGlmIChoZWFkLmNoID4gMCAmJiBpc0VuZE9mU2VudGVuY2VTeW1ib2woY29udGVudFtoZWFkLmNoXSkpIHtcbiAgICAgICAgICAgICAgICBoZWFkLmNoIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZW5kID0gZ2V0U2VudGVuY2UoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAxLCBpbmNsdXNpdmUpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gZ2V0U2VudGVuY2UoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAtMSwgaW5jbHVzaXZlKTtcbiAgICAgICAgICAgIGlmIChpc1doaXRlU3BhY2VTdHJpbmcoY20uZ2V0TGluZShzdGFydC5saW5lKVtzdGFydC5jaF0pXG4gICAgICAgICAgICAgICAgJiYgaXNXaGl0ZVNwYWNlU3RyaW5nKGNtLmdldExpbmUoZW5kLmxpbmUpW2VuZC5jaCAtIDFdKSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0geyBsaW5lOiBzdGFydC5saW5lLCBjaDogc3RhcnQuY2ggKyAxIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0bXAgPSB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY20uc3RhdGUudmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBbdG1wLnN0YXJ0LCB0bXAuZW5kXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBleHBhbmRTZWxlY3Rpb24oY20sIHRtcC5zdGFydCwgdG1wLmVuZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlcGVhdExhc3RDaGFyYWN0ZXJTZWFyY2g6IGZ1bmN0aW9uIChjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGFzdFNlYXJjaCA9IHZpbUdsb2JhbFN0YXRlLmxhc3RDaGFyYWN0ZXJTZWFyY2g7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGZvcndhcmQgPSBtb3Rpb25BcmdzLmZvcndhcmQgPT09IGxhc3RTZWFyY2guZm9yd2FyZDtcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IChsYXN0U2VhcmNoLmluY3JlbWVudCA/IDEgOiAwKSAqIChmb3J3YXJkID8gLTEgOiAxKTtcbiAgICAgICAgY20ubW92ZUgoLWluY3JlbWVudCwgJ2NoYXInKTtcbiAgICAgICAgbW90aW9uQXJncy5pbmNsdXNpdmUgPSBmb3J3YXJkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB2YXIgY3VyRW5kID0gbW92ZVRvQ2hhcmFjdGVyKGNtLCByZXBlYXQsIGZvcndhcmQsIGxhc3RTZWFyY2guc2VsZWN0ZWRDaGFyYWN0ZXIpO1xuICAgICAgICBpZiAoIWN1ckVuZCkge1xuICAgICAgICAgICAgY20ubW92ZUgoaW5jcmVtZW50LCAnY2hhcicpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgY3VyRW5kLmNoICs9IGluY3JlbWVudDtcbiAgICAgICAgcmV0dXJuIGN1ckVuZDtcbiAgICB9XG59O1xuZnVuY3Rpb24gZGVmaW5lTW90aW9uKG5hbWUsIGZuKSB7XG4gICAgbW90aW9uc1tuYW1lXSA9IGZuO1xufVxuZnVuY3Rpb24gZmlsbEFycmF5KHZhbCwgdGltZXMpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XG4gICAgICAgIGFyci5wdXNoKHZhbCk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG52YXIgb3BlcmF0b3JzID0ge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gKGNtLCBhcmdzLCByYW5nZXMpIHtcbiAgICAgICAgdmFyIGZpbmFsSGVhZCwgdGV4dDtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIGFuY2hvciA9IHJhbmdlc1swXS5hbmNob3IsIGhlYWQgPSByYW5nZXNbMF0uaGVhZDtcbiAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgdGV4dCA9IGNtLmdldFJhbmdlKGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgICB2YXIgbGFzdFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZSB8fCB7fTtcbiAgICAgICAgICAgIGlmIChsYXN0U3RhdGUubW90aW9uID09IFwibW92ZUJ5V29yZHNcIiAmJiAhaXNXaGl0ZVNwYWNlU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gKC9cXHMrJC8pLmV4ZWModGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIGxhc3RTdGF0ZS5tb3Rpb25BcmdzICYmIGxhc3RTdGF0ZS5tb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihoZWFkLCAwLCAtbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc2xpY2UoMCwgLW1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZXZMaW5lRW5kID0gbmV3IFBvcyhhbmNob3IubGluZSAtIDEsIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICAgICAgdmFyIHdhc0xhc3RMaW5lID0gY20uZmlyc3RMaW5lKCkgPT0gY20ubGFzdExpbmUoKTtcbiAgICAgICAgICAgIGlmIChoZWFkLmxpbmUgPiBjbS5sYXN0TGluZSgpICYmIGFyZ3MubGluZXdpc2UgJiYgIXdhc0xhc3RMaW5lKSB7XG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBwcmV2TGluZUVuZCwgaGVhZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgICAgIGlmICghd2FzTGFzdExpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHByZXZMaW5lRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50KGNtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYW5jaG9yLmNoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmZ1bGxMaW5lKSB7XG4gICAgICAgICAgICBoZWFkLmNoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIGhlYWQubGluZS0tO1xuICAgICAgICAgICAgY20uc2V0U2VsZWN0aW9uKGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgICB0ZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKFwiXCIpO1xuICAgICAgICAgICAgZmluYWxIZWFkID0gYW5jaG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gZmlsbEFycmF5KCcnLCByYW5nZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHJlcGxhY2VtZW50KTtcbiAgICAgICAgICAgIGZpbmFsSGVhZCA9IGN1cnNvck1pbihyYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KGFyZ3MucmVnaXN0ZXJOYW1lLCAnY2hhbmdlJywgdGV4dCwgYXJncy5saW5ld2lzZSwgcmFuZ2VzLmxlbmd0aCA+IDEpO1xuICAgICAgICBhY3Rpb25zLmVudGVySW5zZXJ0TW9kZShjbSwgeyBoZWFkOiBmaW5hbEhlYWQgfSwgY20uc3RhdGUudmltKTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbiAoY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgZmluYWxIZWFkLCB0ZXh0O1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IHJhbmdlc1swXS5hbmNob3IsIGhlYWQgPSByYW5nZXNbMF0uaGVhZDtcbiAgICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlICYmXG4gICAgICAgICAgICAgICAgaGVhZC5saW5lICE9IGNtLmZpcnN0TGluZSgpICYmXG4gICAgICAgICAgICAgICAgYW5jaG9yLmxpbmUgPT0gY20ubGFzdExpbmUoKSAmJlxuICAgICAgICAgICAgICAgIGFuY2hvci5saW5lID09IGhlYWQubGluZSAtIDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLmxpbmUgPT0gY20uZmlyc3RMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yLmNoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvciA9IG5ldyBQb3MoYW5jaG9yLmxpbmUgLSAxLCBsaW5lTGVuZ3RoKGNtLCBhbmNob3IubGluZSAtIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0ID0gY20uZ2V0UmFuZ2UoYW5jaG9yLCBoZWFkKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnJywgYW5jaG9yLCBoZWFkKTtcbiAgICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgICAgZmluYWxIZWFkID0gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIGFuY2hvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBmaWxsQXJyYXkoJycsIHJhbmdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZW1lbnQpO1xuICAgICAgICAgICAgZmluYWxIZWFkID0gY3Vyc29yTWluKHJhbmdlc1swXS5oZWFkLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucHVzaFRleHQoYXJncy5yZWdpc3Rlck5hbWUsICdkZWxldGUnLCB0ZXh0LCBhcmdzLmxpbmV3aXNlLCB2aW0udmlzdWFsQmxvY2spO1xuICAgICAgICByZXR1cm4gY2xpcEN1cnNvclRvQ29udGVudChjbSwgZmluYWxIZWFkKTtcbiAgICB9LFxuICAgIGluZGVudDogZnVuY3Rpb24gKGNtLCBhcmdzLCByYW5nZXMpIHtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgaWYgKGNtLmluZGVudE1vcmUpIHtcbiAgICAgICAgICAgIHZhciByZXBlYXQgPSAodmltLnZpc3VhbE1vZGUpID8gYXJncy5yZXBlYXQgOiAxO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXBlYXQ7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmluZGVudFJpZ2h0KVxuICAgICAgICAgICAgICAgICAgICBjbS5pbmRlbnRNb3JlKCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjbS5pbmRlbnRMZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRMaW5lID0gcmFuZ2VzWzBdLmFuY2hvci5saW5lO1xuICAgICAgICAgICAgdmFyIGVuZExpbmUgPSB2aW0udmlzdWFsQmxvY2sgP1xuICAgICAgICAgICAgICAgIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0uYW5jaG9yLmxpbmUgOlxuICAgICAgICAgICAgICAgIHJhbmdlc1swXS5oZWFkLmxpbmU7XG4gICAgICAgICAgICB2YXIgcmVwZWF0ID0gKHZpbS52aXN1YWxNb2RlKSA/IGFyZ3MucmVwZWF0IDogMTtcbiAgICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgICAgZW5kTGluZS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0TGluZTsgaSA8PSBlbmRMaW5lOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlcGVhdDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtLmluZGVudExpbmUoaSwgYXJncy5pbmRlbnRSaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb3Rpb25zLm1vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbSwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgfSxcbiAgICBpbmRlbnRBdXRvOiBmdW5jdGlvbiAoY20sIF9hcmdzLCByYW5nZXMpIHtcbiAgICAgICAgaWYgKHJhbmdlcy5sZW5ndGggPiAxKSB7IC8vIGFjZV9wYXRjaFxuICAgICAgICAgICAgY20uc2V0U2VsZWN0aW9uKHJhbmdlc1swXS5hbmNob3IsIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0uaGVhZCk7XG4gICAgICAgIH1cbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJpbmRlbnRBdXRvXCIpO1xuICAgICAgICByZXR1cm4gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIHJhbmdlc1swXS5hbmNob3IpO1xuICAgIH0sXG4gICAgY2hhbmdlQ2FzZTogZnVuY3Rpb24gKGNtLCBhcmdzLCByYW5nZXMsIG9sZEFuY2hvciwgbmV3SGVhZCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmdldFNlbGVjdGlvbnMoKTtcbiAgICAgICAgdmFyIHN3YXBwZWQgPSBbXTtcbiAgICAgICAgdmFyIHRvTG93ZXIgPSBhcmdzLnRvTG93ZXI7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VsZWN0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIHRvU3dhcCA9IHNlbGVjdGlvbnNbal07XG4gICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgICAgaWYgKHRvTG93ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdG9Td2FwLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0b0xvd2VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRleHQgPSB0b1N3YXAudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9Td2FwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSB0b1N3YXAuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IGlzVXBwZXJDYXNlKGNoYXJhY3RlcikgPyBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2FwcGVkLnB1c2godGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMoc3dhcHBlZCk7XG4gICAgICAgIGlmIChhcmdzLnNob3VsZE1vdmVDdXJzb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdIZWFkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFjbS5zdGF0ZS52aW0udmlzdWFsTW9kZSAmJiBhcmdzLmxpbmV3aXNlICYmIHJhbmdlc1swXS5hbmNob3IubGluZSArIDEgPT0gcmFuZ2VzWzBdLmhlYWQubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCBvbGRBbmNob3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MubGluZXdpc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBvbGRBbmNob3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY3Vyc29yTWluKHJhbmdlc1swXS5hbmNob3IsIHJhbmdlc1swXS5oZWFkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgeWFuazogZnVuY3Rpb24gKGNtLCBhcmdzLCByYW5nZXMsIG9sZEFuY2hvcikge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgZW5kUG9zID0gdmltLnZpc3VhbE1vZGVcbiAgICAgICAgICAgID8gY3Vyc29yTWluKHZpbS5zZWwuYW5jaG9yLCB2aW0uc2VsLmhlYWQsIHJhbmdlc1swXS5oZWFkLCByYW5nZXNbMF0uYW5jaG9yKVxuICAgICAgICAgICAgOiBvbGRBbmNob3I7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChhcmdzLnJlZ2lzdGVyTmFtZSwgJ3lhbmsnLCB0ZXh0LCBhcmdzLmxpbmV3aXNlLCB2aW0udmlzdWFsQmxvY2spO1xuICAgICAgICByZXR1cm4gZW5kUG9zO1xuICAgIH1cbn07XG5mdW5jdGlvbiBkZWZpbmVPcGVyYXRvcihuYW1lLCBmbikge1xuICAgIG9wZXJhdG9yc1tuYW1lXSA9IGZuO1xufVxudmFyIGFjdGlvbnMgPSB7XG4gICAganVtcExpc3RXYWxrOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gYWN0aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBmb3J3YXJkID0gYWN0aW9uQXJncy5mb3J3YXJkO1xuICAgICAgICB2YXIganVtcExpc3QgPSB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdDtcbiAgICAgICAgdmFyIG1hcmsgPSBqdW1wTGlzdC5tb3ZlKGNtLCBmb3J3YXJkID8gcmVwZWF0IDogLXJlcGVhdCk7XG4gICAgICAgIHZhciBtYXJrUG9zID0gbWFyayA/IG1hcmsuZmluZCgpIDogdW5kZWZpbmVkO1xuICAgICAgICBtYXJrUG9zID0gbWFya1BvcyA/IG1hcmtQb3MgOiBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgY20uc2V0Q3Vyc29yKG1hcmtQb3MpO1xuICAgICAgICBjbS5hY2UuY3VyT3AuY29tbWFuZC5zY3JvbGxJbnRvVmlldyA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgfSxcbiAgICBzY3JvbGw6IGZ1bmN0aW9uIChjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdCB8fCAxO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IGNtLmRlZmF1bHRUZXh0SGVpZ2h0KCk7XG4gICAgICAgIHZhciB0b3AgPSBjbS5nZXRTY3JvbGxJbmZvKCkudG9wO1xuICAgICAgICB2YXIgZGVsdGEgPSBsaW5lSGVpZ2h0ICogcmVwZWF0O1xuICAgICAgICB2YXIgbmV3UG9zID0gYWN0aW9uQXJncy5mb3J3YXJkID8gdG9wICsgZGVsdGEgOiB0b3AgLSBkZWx0YTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICB2YXIgY3Vyc29yQ29vcmRzID0gY20uY2hhckNvb3JkcyhjdXJzb3IsICdsb2NhbCcpO1xuICAgICAgICBpZiAoYWN0aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICBpZiAobmV3UG9zID4gY3Vyc29yQ29vcmRzLnRvcCkge1xuICAgICAgICAgICAgICAgIGN1cnNvci5saW5lICs9IChuZXdQb3MgLSBjdXJzb3JDb29yZHMudG9wKSAvIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgY3Vyc29yLmxpbmUgPSBNYXRoLmNlaWwoY3Vyc29yLmxpbmUpO1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXJzb3IpO1xuICAgICAgICAgICAgICAgIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBjdXJzb3JDb29yZHMudG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIG5ld1Bvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbmV3Qm90dG9tID0gbmV3UG9zICsgY20uZ2V0U2Nyb2xsSW5mbygpLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGlmIChuZXdCb3R0b20gPCBjdXJzb3JDb29yZHMuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yLmxpbmUgLT0gKGN1cnNvckNvb3Jkcy5ib3R0b20gLSBuZXdCb3R0b20pIC8gbGluZUhlaWdodDtcbiAgICAgICAgICAgICAgICBjdXJzb3IubGluZSA9IE1hdGguZmxvb3IoY3Vyc29yLmxpbmUpO1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXJzb3IpO1xuICAgICAgICAgICAgICAgIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBjdXJzb3JDb29yZHMuYm90dG9tIC0gY20uZ2V0U2Nyb2xsSW5mbygpLmNsaWVudEhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBuZXdQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzY3JvbGxUb0N1cnNvcjogZnVuY3Rpb24gKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBsaW5lTnVtID0gY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICAgICAgdmFyIGNoYXJDb29yZHMgPSBjbS5jaGFyQ29vcmRzKG5ldyBQb3MobGluZU51bSwgMCksICdsb2NhbCcpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gY20uZ2V0U2Nyb2xsSW5mbygpLmNsaWVudEhlaWdodDtcbiAgICAgICAgdmFyIHkgPSBjaGFyQ29vcmRzLnRvcDtcbiAgICAgICAgc3dpdGNoIChhY3Rpb25BcmdzLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgIHkgPSBjaGFyQ29vcmRzLmJvdHRvbSAtIGhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHZhciBsaW5lTGFzdENoYXJQb3MgPSBuZXcgUG9zKGxpbmVOdW0sIGNtLmdldExpbmUobGluZU51bSkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmVMYXN0Q2hhckNvb3JkcyA9IGNtLmNoYXJDb29yZHMobGluZUxhc3RDaGFyUG9zLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IGxpbmVMYXN0Q2hhckNvb3Jkcy5ib3R0b20gLSB5O1xuICAgICAgICAgICAgICAgIHkgPSB5IC0gaGVpZ2h0ICsgbGluZUhlaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCB5KTtcbiAgICB9LFxuICAgIHJlcGxheU1hY3JvOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PSAnQCcpIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXIgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHJlcGVhdC0tKSB7XG4gICAgICAgICAgICBleGVjdXRlTWFjcm9SZWdpc3RlcihjbSwgdmltLCBtYWNyb01vZGVTdGF0ZSwgcmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZW50ZXJNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uIChjbSwgYWN0aW9uQXJncykge1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIGlmICh2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuaXNWYWxpZFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSkpIHtcbiAgICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLmVudGVyTWFjcm9SZWNvcmRNb2RlKGNtLCByZWdpc3Rlck5hbWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0b2dnbGVPdmVyd3JpdGU6IGZ1bmN0aW9uIChjbSkge1xuICAgICAgICBpZiAoIWNtLnN0YXRlLm92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKHRydWUpO1xuICAgICAgICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltLXJlcGxhY2UnKTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7IG1vZGU6IFwicmVwbGFjZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKGZhbHNlKTtcbiAgICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1pbnNlcnQnKTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7IG1vZGU6IFwiaW5zZXJ0XCIgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVudGVySW5zZXJ0TW9kZTogZnVuY3Rpb24gKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgaWYgKGNtLmdldE9wdGlvbigncmVhZE9ubHknKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlID0gdHJ1ZTtcbiAgICAgICAgdmltLmluc2VydE1vZGVSZXBlYXQgPSBhY3Rpb25BcmdzICYmIGFjdGlvbkFyZ3MucmVwZWF0IHx8IDE7XG4gICAgICAgIHZhciBpbnNlcnRBdCA9IChhY3Rpb25BcmdzKSA/IGFjdGlvbkFyZ3MuaW5zZXJ0QXQgOiBudWxsO1xuICAgICAgICB2YXIgc2VsID0gdmltLnNlbDtcbiAgICAgICAgdmFyIGhlYWQgPSBhY3Rpb25BcmdzLmhlYWQgfHwgY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aDtcbiAgICAgICAgaWYgKGluc2VydEF0ID09ICdlb2wnKSB7XG4gICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUsIGxpbmVMZW5ndGgoY20sIGhlYWQubGluZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluc2VydEF0ID09ICdib2wnKSB7XG4gICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluc2VydEF0ID09ICdjaGFyQWZ0ZXInKSB7XG4gICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBoZWFkLCBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgMSkpO1xuICAgICAgICAgICAgaGVhZCA9IG5ld1Bvc2l0aW9uLmVuZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnNlcnRBdCA9PSAnZmlyc3ROb25CbGFuaycpIHtcbiAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGhlYWQsIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCBoZWFkKSk7XG4gICAgICAgICAgICBoZWFkID0gbmV3UG9zaXRpb24uZW5kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluc2VydEF0ID09ICdzdGFydE9mU2VsZWN0ZWRBcmVhJykge1xuICAgICAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgICAgIGlmIChzZWwuaGVhZC5saW5lIDwgc2VsLmFuY2hvci5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWQgPSBzZWwuaGVhZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3MoTWF0aC5taW4oc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5saW5lKSwgTWF0aC5taW4oc2VsLmhlYWQuY2gsIHNlbC5hbmNob3IuY2gpKTtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBNYXRoLmFicyhzZWwuaGVhZC5saW5lIC0gc2VsLmFuY2hvci5saW5lKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2VuZE9mU2VsZWN0ZWRBcmVhJykge1xuICAgICAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgICAgIGlmIChzZWwuaGVhZC5saW5lID49IHNlbC5hbmNob3IubGluZSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKHNlbC5oZWFkLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3MoTWF0aC5taW4oc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5saW5lKSwgTWF0aC5tYXgoc2VsLmhlYWQuY2gsIHNlbC5hbmNob3IuY2gpICsgMSk7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoc2VsLmhlYWQubGluZSAtIHNlbC5hbmNob3IubGluZSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluc2VydEF0ID09ICdpbnBsYWNlJykge1xuICAgICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluc2VydEF0ID09ICdsYXN0RWRpdCcpIHtcbiAgICAgICAgICAgIGhlYWQgPSBnZXRMYXN0RWRpdFBvcyhjbSkgfHwgaGVhZDtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIGZhbHNlKTtcbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MgJiYgYWN0aW9uQXJncy5yZXBsYWNlKSB7XG4gICAgICAgICAgICBjbS50b2dnbGVPdmVyd3JpdGUodHJ1ZSk7XG4gICAgICAgICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0tcmVwbGFjZScpO1xuICAgICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHsgbW9kZTogXCJyZXBsYWNlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpO1xuICAgICAgICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltLWluc2VydCcpO1xuICAgICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHsgbW9kZTogXCJpbnNlcnRcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICAgICAgY20ub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iub24oY20uZ2V0SW5wdXRGaWVsZCgpLCAna2V5ZG93bicsIG9uS2V5RXZlbnRUYXJnZXRLZXlEb3duKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RGb3JJbnNlcnQoY20sIGhlYWQsIGhlaWdodCk7XG4gICAgfSxcbiAgICB0b2dnbGVWaXN1YWxNb2RlOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVwZWF0ID0gYWN0aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBhbmNob3IgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGhlYWQ7XG4gICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gISFhY3Rpb25BcmdzLmxpbmV3aXNlO1xuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gISFhY3Rpb25BcmdzLmJsb2Nrd2lzZTtcbiAgICAgICAgICAgIGhlYWQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGFuY2hvci5saW5lLCBhbmNob3IuY2ggKyByZXBlYXQgLSAxKSk7XG4gICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBhbmNob3IsIGhlYWQpO1xuICAgICAgICAgICAgdmltLnNlbCA9IHtcbiAgICAgICAgICAgICAgICBhbmNob3I6IG5ld1Bvc2l0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGhlYWQ6IG5ld1Bvc2l0aW9uLmVuZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7IG1vZGU6IFwidmlzdWFsXCIsIHN1Yk1vZGU6IHZpbS52aXN1YWxMaW5lID8gXCJsaW5ld2lzZVwiIDogdmltLnZpc3VhbEJsb2NrID8gXCJibG9ja3dpc2VcIiA6IFwiXCIgfSk7XG4gICAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JywgY3Vyc29yTWluKGFuY2hvciwgaGVhZCkpO1xuICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsIGN1cnNvck1heChhbmNob3IsIGhlYWQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aW0udmlzdWFsTGluZSBeIGFjdGlvbkFyZ3MubGluZXdpc2UgfHxcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayBeIGFjdGlvbkFyZ3MuYmxvY2t3aXNlKSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsTGluZSA9ICEhYWN0aW9uQXJncy5saW5ld2lzZTtcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9ICEhYWN0aW9uQXJncy5ibG9ja3dpc2U7XG4gICAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiB2aW0udmlzdWFsTGluZSA/IFwibGluZXdpc2VcIiA6IHZpbS52aXN1YWxCbG9jayA/IFwiYmxvY2t3aXNlXCIgOiBcIlwiIH0pO1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZXNlbGVjdExhc3RTZWxlY3Rpb246IGZ1bmN0aW9uIChjbSwgX2FjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbGFzdFNlbGVjdGlvbiA9IHZpbS5sYXN0U2VsZWN0aW9uO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSBsYXN0U2VsZWN0aW9uLmFuY2hvck1hcmsuZmluZCgpO1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBsYXN0U2VsZWN0aW9uLmhlYWRNYXJrLmZpbmQoKTtcbiAgICAgICAgICAgIGlmICghYW5jaG9yIHx8ICFoZWFkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmltLnNlbCA9IHtcbiAgICAgICAgICAgICAgICBhbmNob3I6IGFuY2hvcixcbiAgICAgICAgICAgICAgICBoZWFkOiBoZWFkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbExpbmU7XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbEJsb2NrO1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvck1pbihhbmNob3IsIGhlYWQpKTtcbiAgICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLCBjdXJzb3JNYXgoYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgJ3ZpbS1tb2RlLWNoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBtb2RlOiAndmlzdWFsJyxcbiAgICAgICAgICAgICAgICBzdWJNb2RlOiB2aW0udmlzdWFsTGluZSA/ICdsaW5ld2lzZScgOlxuICAgICAgICAgICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPyAnYmxvY2t3aXNlJyA6ICcnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgam9pbkxpbmVzOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgY3VyU3RhcnQsIGN1ckVuZDtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBjdXJTdGFydCA9IGNtLmdldEN1cnNvcignYW5jaG9yJyk7XG4gICAgICAgICAgICBjdXJFbmQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgICAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShjdXJFbmQsIGN1clN0YXJ0KSkge1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBjdXJFbmQ7XG4gICAgICAgICAgICAgICAgY3VyRW5kID0gY3VyU3RhcnQ7XG4gICAgICAgICAgICAgICAgY3VyU3RhcnQgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJFbmQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJFbmQubGluZSkgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlcGVhdCA9IE1hdGgubWF4KGFjdGlvbkFyZ3MucmVwZWF0LCAyKTtcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICBjdXJFbmQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGN1clN0YXJ0LmxpbmUgKyByZXBlYXQgLSAxLCBJbmZpbml0eSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaW5hbENoID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IGN1clN0YXJ0LmxpbmU7IGkgPCBjdXJFbmQubGluZTsgaSsrKSB7XG4gICAgICAgICAgICBmaW5hbENoID0gbGluZUxlbmd0aChjbSwgY3VyU3RhcnQubGluZSk7XG4gICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgICAgdmFyIG5leHRTdGFydENoID0gMDtcbiAgICAgICAgICAgIGlmICghYWN0aW9uQXJncy5rZWVwU3BhY2VzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRMaW5lID0gY20uZ2V0TGluZShjdXJTdGFydC5saW5lICsgMSk7XG4gICAgICAgICAgICAgICAgbmV4dFN0YXJ0Q2ggPSBuZXh0TGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U3RhcnRDaCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRDaCA9IG5leHRMaW5lLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcIiBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgbmV3IFBvcyhjdXJTdGFydC5saW5lLCBmaW5hbENoKSwgbmV3IFBvcyhjdXJTdGFydC5saW5lICsgMSwgbmV4dFN0YXJ0Q2gpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyRmluYWxQb3MgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIGZpbmFsQ2gpKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldEN1cnNvcihjdXJGaW5hbFBvcyk7XG4gICAgfSxcbiAgICBuZXdMaW5lQW5kRW50ZXJJbnNlcnRNb2RlOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2aW0uaW5zZXJ0TW9kZSA9IHRydWU7XG4gICAgICAgIHZhciBpbnNlcnRBdCA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICBpZiAoaW5zZXJ0QXQubGluZSA9PT0gY20uZmlyc3RMaW5lKCkgJiYgIWFjdGlvbkFyZ3MuYWZ0ZXIpIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnXFxuJywgbmV3IFBvcyhjbS5maXJzdExpbmUoKSwgMCkpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmZpcnN0TGluZSgpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGluc2VydEF0LmxpbmUgPSAoYWN0aW9uQXJncy5hZnRlcikgPyBpbnNlcnRBdC5saW5lIDpcbiAgICAgICAgICAgICAgICBpbnNlcnRBdC5saW5lIC0gMTtcbiAgICAgICAgICAgIGluc2VydEF0LmNoID0gbGluZUxlbmd0aChjbSwgaW5zZXJ0QXQubGluZSk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoaW5zZXJ0QXQpO1xuICAgICAgICAgICAgdmFyIG5ld2xpbmVGbiA9IENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudENvbnRpbnVlQ29tbWVudCB8fFxuICAgICAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudDtcbiAgICAgICAgICAgIG5ld2xpbmVGbihjbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbnRlckluc2VydE1vZGUoY20sIHsgcmVwZWF0OiBhY3Rpb25BcmdzLnJlcGVhdCB9LCB2aW0pO1xuICAgIH0sXG4gICAgcGFzdGU6IGZ1bmN0aW9uIChjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihhY3Rpb25BcmdzLnJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIHZhciBmYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gcmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIF90aGlzLmNvbnRpbnVlUGFzdGUoY20sIGFjdGlvbkFyZ3MsIHZpbSwgdGV4dCwgcmVnaXN0ZXIpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoYWN0aW9uQXJncy5yZWdpc3Rlck5hbWUgPT09ICcrJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNvbnRpbnVlUGFzdGUoY20sIGFjdGlvbkFyZ3MsIHZpbSwgdmFsdWUsIHJlZ2lzdGVyKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgZmFsbGJhY2soKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjb250aW51ZVBhc3RlOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSwgdGV4dCwgcmVnaXN0ZXIpIHtcbiAgICAgICAgdmFyIGN1ciA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uQXJncy5tYXRjaEluZGVudCkge1xuICAgICAgICAgICAgdmFyIHRhYlNpemUgPSBjbS5nZXRPcHRpb24oXCJ0YWJTaXplXCIpO1xuICAgICAgICAgICAgdmFyIHdoaXRlc3BhY2VMZW5ndGggPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhYnMgPSAoc3RyLnNwbGl0KFwiXFx0XCIpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHZhciBzcGFjZXMgPSAoc3RyLnNwbGl0KFwiIFwiKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFicyAqIHRhYlNpemUgKyBzcGFjZXMgKiAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50TGluZSA9IGNtLmdldExpbmUoY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gd2hpdGVzcGFjZUxlbmd0aChjdXJyZW50TGluZS5tYXRjaCgvXlxccyovKVswXSk7XG4gICAgICAgICAgICB2YXIgY2hvbXBlZFRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgICAgICAgICB2YXIgd2FzQ2hvbXBlZCA9IHRleHQgIT09IGNob21wZWRUZXh0O1xuICAgICAgICAgICAgdmFyIGZpcnN0SW5kZW50ID0gd2hpdGVzcGFjZUxlbmd0aCh0ZXh0Lm1hdGNoKC9eXFxzKi8pWzBdKTtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gY2hvbXBlZFRleHQucmVwbGFjZSgvXlxccyovZ20sIGZ1bmN0aW9uICh3c3BhY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW5kZW50ID0gaW5kZW50ICsgKHdoaXRlc3BhY2VMZW5ndGgod3NwYWNlKSAtIGZpcnN0SW5kZW50KTtcbiAgICAgICAgICAgICAgICBpZiAobmV3SW5kZW50IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY20uZ2V0T3B0aW9uKFwiaW5kZW50V2l0aFRhYnNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHF1b3RpZW50ID0gTWF0aC5mbG9vcihuZXdJbmRlbnQgLyB0YWJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KHF1b3RpZW50ICsgMSkuam9pbignXFx0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkobmV3SW5kZW50ICsgMSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGV4dCArPSB3YXNDaG9tcGVkID8gXCJcXG5cIiA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MucmVwZWF0ID4gMSkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSBBcnJheShhY3Rpb25BcmdzLnJlcGVhdCArIDEpLmpvaW4odGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmV3aXNlID0gcmVnaXN0ZXIubGluZXdpc2U7XG4gICAgICAgIHZhciBibG9ja3dpc2UgPSByZWdpc3Rlci5ibG9ja3dpc2U7XG4gICAgICAgIGlmIChibG9ja3dpc2UpIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgICAgIHRleHQucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ZXh0W2ldID0gKHRleHRbaV0gPT0gJycpID8gJyAnIDogdGV4dFtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1ci5jaCArPSBhY3Rpb25BcmdzLmFmdGVyID8gMSA6IDA7XG4gICAgICAgICAgICBjdXIuY2ggPSBNYXRoLm1pbihsaW5lTGVuZ3RoKGNtLCBjdXIubGluZSksIGN1ci5jaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgICAgIHRleHQgPSB2aW0udmlzdWFsTGluZSA/IHRleHQuc2xpY2UoMCwgLTEpIDogJ1xcbicgKyB0ZXh0LnNsaWNlKDAsIHRleHQubGVuZ3RoIC0gMSkgKyAnXFxuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdGlvbkFyZ3MuYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gJ1xcbicgKyB0ZXh0LnNsaWNlKDAsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgY3VyLmNoID0gbGluZUxlbmd0aChjbSwgY3VyLmxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VyLmNoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1ci5jaCArPSBhY3Rpb25BcmdzLmFmdGVyID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1clBvc0ZpbmFsO1xuICAgICAgICB2YXIgaWR4O1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHZpbS5sYXN0UGFzdGVkVGV4dCA9IHRleHQ7XG4gICAgICAgICAgICB2YXIgbGFzdFNlbGVjdGlvbkN1ckVuZDtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEFyZWEgPSBnZXRTZWxlY3RlZEFyZWFSYW5nZShjbSwgdmltKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGVkQXJlYVswXTtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25FbmQgPSBzZWxlY3RlZEFyZWFbMV07XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgICAgICB2YXIgZW1wdHlTdHJpbmdzID0gbmV3IEFycmF5KHNlbGVjdGlvbnMubGVuZ3RoKS5qb2luKCcxJykuc3BsaXQoJzEnKTtcbiAgICAgICAgICAgIGlmICh2aW0ubGFzdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIGxhc3RTZWxlY3Rpb25DdXJFbmQgPSB2aW0ubGFzdFNlbGVjdGlvbi5oZWFkTWFyay5maW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQoc2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgICAgIGlmIChibG9ja3dpc2UpIHtcbiAgICAgICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhlbXB0eVN0cmluZ3MpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSArIHRleHQubGVuZ3RoIC0gMSwgc2VsZWN0aW9uU3RhcnQuY2gpO1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0QmxvY2soY20sIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnModGV4dCk7XG4gICAgICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKGVtcHR5U3RyaW5ncyk7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY20ucG9zRnJvbUluZGV4KGNtLmluZGV4RnJvbVBvcyhzZWxlY3Rpb25TdGFydCkgKyB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhc3RTZWxlY3Rpb25DdXJFbmQpIHtcbiAgICAgICAgICAgICAgICB2aW0ubGFzdFNlbGVjdGlvbi5oZWFkTWFyayA9IGNtLnNldEJvb2ttYXJrKGxhc3RTZWxlY3Rpb25DdXJFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgICAgY3VyUG9zRmluYWwuY2ggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJsb2Nrd2lzZSkge1xuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXIpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IGN1ci5saW5lICsgaTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUgPiBjbS5sYXN0TGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJ1xcbicsIG5ldyBQb3MobGluZSwgMCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0Q2ggPSBsaW5lTGVuZ3RoKGNtLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RDaCA8IGN1ci5jaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kTGluZVRvQ29sdW1uKGNtLCBsaW5lLCBjdXIuY2gpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXIpO1xuICAgICAgICAgICAgICAgIHNlbGVjdEJsb2NrKGNtLCBuZXcgUG9zKGN1ci5saW5lICsgdGV4dC5sZW5ndGggLSAxLCBjdXIuY2gpKTtcbiAgICAgICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyh0ZXh0KTtcbiAgICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IGN1cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBjdXIpO1xuICAgICAgICAgICAgICAgIGlmIChsaW5ld2lzZSAmJiBhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gbmV3IFBvcyhjdXIubGluZSArIDEsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShjdXIubGluZSArIDEpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxpbmV3aXNlICYmICFhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gbmV3IFBvcyhjdXIubGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGN1ci5saW5lKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghbGluZXdpc2UgJiYgYWN0aW9uQXJncy5hZnRlcikge1xuICAgICAgICAgICAgICAgICAgICBpZHggPSBjbS5pbmRleEZyb21Qb3MoY3VyKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBjbS5wb3NGcm9tSW5kZXgoaWR4ICsgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IGNtLmluZGV4RnJvbVBvcyhjdXIpO1xuICAgICAgICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IGNtLnBvc0Zyb21JbmRleChpZHggKyB0ZXh0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRDdXJzb3IoY3VyUG9zRmluYWwpO1xuICAgIH0sXG4gICAgdW5kbzogZnVuY3Rpb24gKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXBlYXRGbihjbSwgQ29kZU1pcnJvci5jb21tYW5kcy51bmRvLCBhY3Rpb25BcmdzLnJlcGVhdCkoKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBjbS5nZXRDdXJzb3IoJ3N0YXJ0JykpKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZWRvOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgcmVwZWF0Rm4oY20sIENvZGVNaXJyb3IuY29tbWFuZHMucmVkbywgYWN0aW9uQXJncy5yZXBlYXQpKCk7XG4gICAgfSxcbiAgICBzZXRSZWdpc3RlcjogZnVuY3Rpb24gKF9jbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZpbS5pbnB1dFN0YXRlLnJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgfSxcbiAgICBzZXRNYXJrOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbWFya05hbWUgPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sIG1hcmtOYW1lLCBjbS5nZXRDdXJzb3IoKSk7XG4gICAgfSxcbiAgICByZXBsYWNlOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVwbGFjZVdpdGggPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB2YXIgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIHJlcGxhY2VUbztcbiAgICAgICAgdmFyIGN1ckVuZDtcbiAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCdzdGFydCcpO1xuICAgICAgICAgICAgY3VyRW5kID0gY20uZ2V0Q3Vyc29yKCdlbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXJTdGFydC5saW5lKTtcbiAgICAgICAgICAgIHJlcGxhY2VUbyA9IGN1clN0YXJ0LmNoICsgYWN0aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgICAgICBpZiAocmVwbGFjZVRvID4gbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlVG8gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1ckVuZCA9IG5ldyBQb3MoY3VyU3RhcnQubGluZSwgcmVwbGFjZVRvKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3UG9zaXRpb25zID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgIGN1clN0YXJ0ID0gbmV3UG9zaXRpb25zLnN0YXJ0O1xuICAgICAgICBjdXJFbmQgPSBuZXdQb3NpdGlvbnMuZW5kO1xuICAgICAgICBpZiAocmVwbGFjZVdpdGggPT0gJ1xcbicpIHtcbiAgICAgICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpXG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIChDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnRDb250aW51ZUNvbW1lbnQgfHwgQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50KShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVwbGFjZVdpdGhTdHIgPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IHJlcGxhY2VXaXRoU3RyLnJlcGxhY2UoL1teXFxuXS9nLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNwYWNlcyA9IG5ldyBBcnJheShjbS5nZXRPcHRpb24oXCJ0YWJTaXplXCIpICsgMSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSByZXBsYWNlV2l0aFN0ci5yZXBsYWNlKC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2csIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IHJlcGxhY2VXaXRoU3RyLnJlcGxhY2UoL1xcdC9nLCBzcGFjZXMpLnJlcGxhY2UoL1teXFxuXS9nLCByZXBsYWNlV2l0aCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHJlcGxhY2VXaXRoU3RyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShyZXBsYWNlV2l0aFN0ciwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgICAgICBjdXJTdGFydCA9IGN1cnNvcklzQmVmb3JlKHNlbGVjdGlvbnNbMF0uYW5jaG9yLCBzZWxlY3Rpb25zWzBdLmhlYWQpID9cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uc1swXS5hbmNob3IgOiBzZWxlY3Rpb25zWzBdLmhlYWQ7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1clN0YXJ0KTtcbiAgICAgICAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihjdXJFbmQsIDAsIC0xKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGluY3JlbWVudE51bWJlclRva2VuOiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGN1ciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgbGluZVN0ciA9IGNtLmdldExpbmUoY3VyLmxpbmUpO1xuICAgICAgICB2YXIgcmUgPSAvKC0/KSg/OigweCkoW1xcZGEtZl0rKXwoMGJ8MHwpKFxcZCspKS9naTtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICB2YXIgc3RhcnQ7XG4gICAgICAgIHZhciBlbmQ7XG4gICAgICAgIHZhciBudW1iZXJTdHI7XG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGxpbmVTdHIpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhcnQgPSBtYXRjaC5pbmRleDtcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGN1ci5jaCA8IGVuZClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFjdGlvbkFyZ3MuYmFja3RyYWNrICYmIChlbmQgPD0gY3VyLmNoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgYmFzZVN0ciA9IG1hdGNoWzJdIHx8IG1hdGNoWzRdO1xuICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IG1hdGNoWzNdIHx8IG1hdGNoWzVdO1xuICAgICAgICAgICAgdmFyIGluY3JlbWVudCA9IGFjdGlvbkFyZ3MuaW5jcmVhc2UgPyAxIDogLTE7XG4gICAgICAgICAgICB2YXIgYmFzZSA9IHsgJzBiJzogMiwgJzAnOiA4LCAnJzogMTAsICcweCc6IDE2IH1bYmFzZVN0ci50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChtYXRjaFsxXSArIGRpZ2l0cywgYmFzZSkgKyAoaW5jcmVtZW50ICogYWN0aW9uQXJncy5yZXBlYXQpO1xuICAgICAgICAgICAgbnVtYmVyU3RyID0gbnVtYmVyLnRvU3RyaW5nKGJhc2UpO1xuICAgICAgICAgICAgdmFyIHplcm9QYWRkaW5nID0gYmFzZVN0ciA/IG5ldyBBcnJheShkaWdpdHMubGVuZ3RoIC0gbnVtYmVyU3RyLmxlbmd0aCArIDEgKyBtYXRjaFsxXS5sZW5ndGgpLmpvaW4oJzAnKSA6ICcnO1xuICAgICAgICAgICAgaWYgKG51bWJlclN0ci5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICAgICAgICAgIG51bWJlclN0ciA9ICctJyArIGJhc2VTdHIgKyB6ZXJvUGFkZGluZyArIG51bWJlclN0ci5zdWJzdHIoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBudW1iZXJTdHIgPSBiYXNlU3RyICsgemVyb1BhZGRpbmcgKyBudW1iZXJTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZnJvbSA9IG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0KTtcbiAgICAgICAgICAgIHZhciB0byA9IG5ldyBQb3MoY3VyLmxpbmUsIGVuZCk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UobnVtYmVyU3RyLCBmcm9tLCB0byk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0Q3Vyc29yKG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0ICsgbnVtYmVyU3RyLmxlbmd0aCAtIDEpKTtcbiAgICB9LFxuICAgIHJlcGVhdExhc3RFZGl0OiBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbGFzdEVkaXRJbnB1dFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZTtcbiAgICAgICAgaWYgKCFsYXN0RWRpdElucHV0U3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gYWN0aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIGlmIChyZXBlYXQgJiYgYWN0aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0KSB7XG4gICAgICAgICAgICB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlID0gcmVwZWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwZWF0ID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSB8fCByZXBlYXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0TGFzdEVkaXQoY20sIHZpbSwgcmVwZWF0LCBmYWxzZSAvKiogcmVwZWF0Rm9ySW5zZXJ0ICovKTtcbiAgICB9LFxuICAgIGluZGVudDogZnVuY3Rpb24gKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIGNtLmluZGVudExpbmUoY20uZ2V0Q3Vyc29yKCkubGluZSwgYWN0aW9uQXJncy5pbmRlbnRSaWdodCk7XG4gICAgfSxcbiAgICBleGl0SW5zZXJ0TW9kZTogZXhpdEluc2VydE1vZGVcbn07XG5mdW5jdGlvbiBkZWZpbmVBY3Rpb24obmFtZSwgZm4pIHtcbiAgICBhY3Rpb25zW25hbWVdID0gZm47XG59XG5mdW5jdGlvbiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBjdXIsIG9sZEN1cikge1xuICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgdmFyIGluY2x1ZGVMaW5lQnJlYWsgPSB2aW0uaW5zZXJ0TW9kZSB8fCB2aW0udmlzdWFsTW9kZTtcbiAgICB2YXIgbGluZSA9IE1hdGgubWluKE1hdGgubWF4KGNtLmZpcnN0TGluZSgpLCBjdXIubGluZSksIGNtLmxhc3RMaW5lKCkpO1xuICAgIHZhciB0ZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICB2YXIgbWF4Q2ggPSB0ZXh0Lmxlbmd0aCAtIDEgKyAhIWluY2x1ZGVMaW5lQnJlYWs7XG4gICAgdmFyIGNoID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgY3VyLmNoKSwgbWF4Q2gpO1xuICAgIHZhciBjaGFyQ29kZSA9IHRleHQuY2hhckNvZGVBdChjaCk7XG4gICAgaWYgKDB4REMwMCA8IGNoYXJDb2RlICYmIGNoYXJDb2RlIDwgMHhERkZGKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSAxO1xuICAgICAgICBpZiAob2xkQ3VyICYmIG9sZEN1ci5saW5lID09IGxpbmUpIHtcbiAgICAgICAgICAgIGlmIChvbGRDdXIuY2ggPiBjaCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoICs9IGRpcmVjdGlvbjtcbiAgICAgICAgaWYgKGNoID4gbWF4Q2gpXG4gICAgICAgICAgICBjaCAtPSAyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBjaCk7XG59XG5mdW5jdGlvbiBjb3B5QXJncyhhcmdzKSB7XG4gICAgdmFyIHJldCA9IHt9O1xuICAgIGZvciAodmFyIHByb3AgaW4gYXJncykge1xuICAgICAgICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgcmV0W3Byb3BdID0gYXJnc1twcm9wXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuZnVuY3Rpb24gb2Zmc2V0Q3Vyc29yKGN1ciwgb2Zmc2V0TGluZSwgb2Zmc2V0Q2gpIHtcbiAgICBpZiAodHlwZW9mIG9mZnNldExpbmUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG9mZnNldENoID0gb2Zmc2V0TGluZS5jaDtcbiAgICAgICAgb2Zmc2V0TGluZSA9IG9mZnNldExpbmUubGluZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQb3MoY3VyLmxpbmUgKyBvZmZzZXRMaW5lLCBjdXIuY2ggKyBvZmZzZXRDaCk7XG59XG5mdW5jdGlvbiBjb21tYW5kTWF0Y2hlcyhrZXlzLCBrZXlNYXAsIGNvbnRleHQsIGlucHV0U3RhdGUpIHtcbiAgICB2YXIgbWF0Y2gsIHBhcnRpYWwgPSBbXSwgZnVsbCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5TWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0ga2V5TWFwW2ldO1xuICAgICAgICBpZiAoY29udGV4dCA9PSAnaW5zZXJ0JyAmJiBjb21tYW5kLmNvbnRleHQgIT0gJ2luc2VydCcgfHxcbiAgICAgICAgICAgIGNvbW1hbmQuY29udGV4dCAmJiBjb21tYW5kLmNvbnRleHQgIT0gY29udGV4dCB8fFxuICAgICAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvciAmJiBjb21tYW5kLnR5cGUgPT0gJ2FjdGlvbicgfHxcbiAgICAgICAgICAgICEobWF0Y2ggPSBjb21tYW5kTWF0Y2goa2V5cywgY29tbWFuZC5rZXlzKSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaCA9PSAncGFydGlhbCcpIHtcbiAgICAgICAgICAgIHBhcnRpYWwucHVzaChjb21tYW5kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2ggPT0gJ2Z1bGwnKSB7XG4gICAgICAgICAgICBmdWxsLnB1c2goY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFydGlhbDogcGFydGlhbC5sZW5ndGggJiYgcGFydGlhbCxcbiAgICAgICAgZnVsbDogZnVsbC5sZW5ndGggJiYgZnVsbFxuICAgIH07XG59XG5mdW5jdGlvbiBjb21tYW5kTWF0Y2gocHJlc3NlZCwgbWFwcGVkKSB7XG4gICAgaWYgKG1hcHBlZC5zbGljZSgtMTEpID09ICc8Y2hhcmFjdGVyPicpIHtcbiAgICAgICAgdmFyIHByZWZpeExlbiA9IG1hcHBlZC5sZW5ndGggLSAxMTtcbiAgICAgICAgdmFyIHByZXNzZWRQcmVmaXggPSBwcmVzc2VkLnNsaWNlKDAsIHByZWZpeExlbik7XG4gICAgICAgIHZhciBtYXBwZWRQcmVmaXggPSBtYXBwZWQuc2xpY2UoMCwgcHJlZml4TGVuKTtcbiAgICAgICAgcmV0dXJuIHByZXNzZWRQcmVmaXggPT0gbWFwcGVkUHJlZml4ICYmIHByZXNzZWQubGVuZ3RoID4gcHJlZml4TGVuID8gJ2Z1bGwnIDpcbiAgICAgICAgICAgIG1hcHBlZFByZWZpeC5pbmRleE9mKHByZXNzZWRQcmVmaXgpID09IDAgPyAncGFydGlhbCcgOiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwcmVzc2VkID09IG1hcHBlZCA/ICdmdWxsJyA6XG4gICAgICAgICAgICBtYXBwZWQuaW5kZXhPZihwcmVzc2VkKSA9PSAwID8gJ3BhcnRpYWwnIDogZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gbGFzdENoYXIoa2V5cykge1xuICAgIHZhciBtYXRjaCA9IC9eLiooPFtePl0rPikkLy5leGVjKGtleXMpO1xuICAgIHZhciBzZWxlY3RlZENoYXJhY3RlciA9IG1hdGNoID8gbWF0Y2hbMV0gOiBrZXlzLnNsaWNlKC0xKTtcbiAgICBpZiAoc2VsZWN0ZWRDaGFyYWN0ZXIubGVuZ3RoID4gMSkge1xuICAgICAgICBzd2l0Y2ggKHNlbGVjdGVkQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgICBjYXNlICc8Q1I+JzpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENoYXJhY3RlciA9ICdcXG4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnPFNwYWNlPic6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDaGFyYWN0ZXIgPSAnICc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2hhcmFjdGVyID0gJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkQ2hhcmFjdGVyO1xufVxuZnVuY3Rpb24gcmVwZWF0Rm4oY20sIGZuLCByZXBlYXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgICBmbihjbSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY29weUN1cnNvcihjdXIpIHtcbiAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSwgY3VyLmNoKTtcbn1cbmZ1bmN0aW9uIGN1cnNvckVxdWFsKGN1cjEsIGN1cjIpIHtcbiAgICByZXR1cm4gY3VyMS5jaCA9PSBjdXIyLmNoICYmIGN1cjEubGluZSA9PSBjdXIyLmxpbmU7XG59XG5mdW5jdGlvbiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSB7XG4gICAgaWYgKGN1cjEubGluZSA8IGN1cjIubGluZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGN1cjEubGluZSA9PSBjdXIyLmxpbmUgJiYgY3VyMS5jaCA8IGN1cjIuY2gpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGN1cnNvck1pbihjdXIxLCBjdXIyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGN1cjIgPSBjdXJzb3JNaW4uYXBwbHkodW5kZWZpbmVkLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnNvcklzQmVmb3JlKGN1cjEsIGN1cjIpID8gY3VyMSA6IGN1cjI7XG59XG5mdW5jdGlvbiBjdXJzb3JNYXgoY3VyMSwgY3VyMikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICBjdXIyID0gY3Vyc29yTWF4LmFwcGx5KHVuZGVmaW5lZCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfVxuICAgIHJldHVybiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSA/IGN1cjIgOiBjdXIxO1xufVxuZnVuY3Rpb24gY3Vyc29ySXNCZXR3ZWVuKGN1cjEsIGN1cjIsIGN1cjMpIHtcbiAgICB2YXIgY3VyMWJlZm9yZTIgPSBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKTtcbiAgICB2YXIgY3VyMmJlZm9yZTMgPSBjdXJzb3JJc0JlZm9yZShjdXIyLCBjdXIzKTtcbiAgICByZXR1cm4gY3VyMWJlZm9yZTIgJiYgY3VyMmJlZm9yZTM7XG59XG5mdW5jdGlvbiBsaW5lTGVuZ3RoKGNtLCBsaW5lTnVtKSB7XG4gICAgcmV0dXJuIGNtLmdldExpbmUobGluZU51bSkubGVuZ3RoO1xufVxuZnVuY3Rpb24gdHJpbShzKSB7XG4gICAgaWYgKHMudHJpbSkge1xuICAgICAgICByZXR1cm4gcy50cmltKCk7XG4gICAgfVxuICAgIHJldHVybiBzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC8oWy4/KiskXFxbXFxdXFwvXFxcXCgpe318XFwtXSkvZywgJ1xcXFwkMScpO1xufVxuZnVuY3Rpb24gZXh0ZW5kTGluZVRvQ29sdW1uKGNtLCBsaW5lTnVtLCBjb2x1bW4pIHtcbiAgICB2YXIgZW5kQ2ggPSBsaW5lTGVuZ3RoKGNtLCBsaW5lTnVtKTtcbiAgICB2YXIgc3BhY2VzID0gbmV3IEFycmF5KGNvbHVtbiAtIGVuZENoICsgMSkuam9pbignICcpO1xuICAgIGNtLnNldEN1cnNvcihuZXcgUG9zKGxpbmVOdW0sIGVuZENoKSk7XG4gICAgY20ucmVwbGFjZVJhbmdlKHNwYWNlcywgY20uZ2V0Q3Vyc29yKCkpO1xufVxuZnVuY3Rpb24gc2VsZWN0QmxvY2soY20sIHNlbGVjdGlvbkVuZCkge1xuICAgIHZhciBzZWxlY3Rpb25zID0gW10sIHJhbmdlcyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgdmFyIGhlYWQgPSBjb3B5Q3Vyc29yKGNtLmNsaXBQb3Moc2VsZWN0aW9uRW5kKSk7XG4gICAgdmFyIGlzQ2xpcHBlZCA9ICFjdXJzb3JFcXVhbChzZWxlY3Rpb25FbmQsIGhlYWQpO1xuICAgIHZhciBjdXJIZWFkID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgdmFyIHByaW1JbmRleCA9IGdldEluZGV4KHJhbmdlcywgY3VySGVhZCk7XG4gICAgdmFyIHdhc0NsaXBwZWQgPSBjdXJzb3JFcXVhbChyYW5nZXNbcHJpbUluZGV4XS5oZWFkLCByYW5nZXNbcHJpbUluZGV4XS5hbmNob3IpO1xuICAgIHZhciBtYXggPSByYW5nZXMubGVuZ3RoIC0gMTtcbiAgICB2YXIgaW5kZXggPSBtYXggLSBwcmltSW5kZXggPiBwcmltSW5kZXggPyBtYXggOiAwO1xuICAgIHZhciBiYXNlID0gcmFuZ2VzW2luZGV4XS5hbmNob3I7XG4gICAgdmFyIGZpcnN0TGluZSA9IE1hdGgubWluKGJhc2UubGluZSwgaGVhZC5saW5lKTtcbiAgICB2YXIgbGFzdExpbmUgPSBNYXRoLm1heChiYXNlLmxpbmUsIGhlYWQubGluZSk7XG4gICAgdmFyIGJhc2VDaCA9IGJhc2UuY2gsIGhlYWRDaCA9IGhlYWQuY2g7XG4gICAgdmFyIGRpciA9IHJhbmdlc1tpbmRleF0uaGVhZC5jaCAtIGJhc2VDaDtcbiAgICB2YXIgbmV3RGlyID0gaGVhZENoIC0gYmFzZUNoO1xuICAgIGlmIChkaXIgPiAwICYmIG5ld0RpciA8PSAwKSB7XG4gICAgICAgIGJhc2VDaCsrO1xuICAgICAgICBpZiAoIWlzQ2xpcHBlZCkge1xuICAgICAgICAgICAgaGVhZENoLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZGlyIDwgMCAmJiBuZXdEaXIgPj0gMCkge1xuICAgICAgICBiYXNlQ2gtLTtcbiAgICAgICAgaWYgKCF3YXNDbGlwcGVkKSB7XG4gICAgICAgICAgICBoZWFkQ2grKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkaXIgPCAwICYmIG5ld0RpciA9PSAtMSkge1xuICAgICAgICBiYXNlQ2gtLTtcbiAgICAgICAgaGVhZENoKys7XG4gICAgfVxuICAgIGZvciAodmFyIGxpbmUgPSBmaXJzdExpbmU7IGxpbmUgPD0gbGFzdExpbmU7IGxpbmUrKykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB7IGFuY2hvcjogbmV3IFBvcyhsaW5lLCBiYXNlQ2gpLCBoZWFkOiBuZXcgUG9zKGxpbmUsIGhlYWRDaCkgfTtcbiAgICAgICAgc2VsZWN0aW9ucy5wdXNoKHJhbmdlKTtcbiAgICB9XG4gICAgY20uc2V0U2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICBzZWxlY3Rpb25FbmQuY2ggPSBoZWFkQ2g7XG4gICAgYmFzZS5jaCA9IGJhc2VDaDtcbiAgICByZXR1cm4gYmFzZTtcbn1cbmZ1bmN0aW9uIHNlbGVjdEZvckluc2VydChjbSwgaGVhZCwgaGVpZ2h0KSB7XG4gICAgdmFyIHNlbCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmVIZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIGksIDApO1xuICAgICAgICBzZWwucHVzaCh7IGFuY2hvcjogbGluZUhlYWQsIGhlYWQ6IGxpbmVIZWFkIH0pO1xuICAgIH1cbiAgICBjbS5zZXRTZWxlY3Rpb25zKHNlbCwgMCk7XG59XG5mdW5jdGlvbiBnZXRJbmRleChyYW5nZXMsIGN1cnNvciwgZW5kKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0QW5jaG9yID0gZW5kICE9ICdoZWFkJyAmJiBjdXJzb3JFcXVhbChyYW5nZXNbaV0uYW5jaG9yLCBjdXJzb3IpO1xuICAgICAgICB2YXIgYXRIZWFkID0gZW5kICE9ICdhbmNob3InICYmIGN1cnNvckVxdWFsKHJhbmdlc1tpXS5oZWFkLCBjdXJzb3IpO1xuICAgICAgICBpZiAoYXRBbmNob3IgfHwgYXRIZWFkKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5mdW5jdGlvbiBnZXRTZWxlY3RlZEFyZWFSYW5nZShjbSwgdmltKSB7XG4gICAgdmFyIGxhc3RTZWxlY3Rpb24gPSB2aW0ubGFzdFNlbGVjdGlvbjtcbiAgICB2YXIgZ2V0Q3VycmVudFNlbGVjdGVkQXJlYVJhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgIHZhciBzdGFydCA9IHNlbGVjdGlvbnNbMF07XG4gICAgICAgIHZhciBlbmQgPSBzZWxlY3Rpb25zW3NlbGVjdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IGN1cnNvcklzQmVmb3JlKHN0YXJ0LmFuY2hvciwgc3RhcnQuaGVhZCkgPyBzdGFydC5hbmNob3IgOiBzdGFydC5oZWFkO1xuICAgICAgICB2YXIgc2VsZWN0aW9uRW5kID0gY3Vyc29ySXNCZWZvcmUoZW5kLmFuY2hvciwgZW5kLmhlYWQpID8gZW5kLmhlYWQgOiBlbmQuYW5jaG9yO1xuICAgICAgICByZXR1cm4gW3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdO1xuICAgIH07XG4gICAgdmFyIGdldExhc3RTZWxlY3RlZEFyZWFSYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBzZWxlY3Rpb25FbmQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGJsb2NrID0gbGFzdFNlbGVjdGlvbi52aXN1YWxCbG9jaztcbiAgICAgICAgaWYgKGJsb2NrKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSBibG9jay53aWR0aDtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBibG9jay5oZWlnaHQ7XG4gICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBuZXcgUG9zKHNlbGVjdGlvblN0YXJ0LmxpbmUgKyBoZWlnaHQsIHNlbGVjdGlvblN0YXJ0LmNoICsgd2lkdGgpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzZWxlY3Rpb25TdGFydC5saW5lOyBpIDwgc2VsZWN0aW9uRW5kLmxpbmU7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBhbmNob3IgPSBuZXcgUG9zKGksIHNlbGVjdGlvblN0YXJ0LmNoKTtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZCA9IG5ldyBQb3MoaSwgc2VsZWN0aW9uRW5kLmNoKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSB7IGFuY2hvcjogYW5jaG9yLCBoZWFkOiBoZWFkIH07XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKHJhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNtLnNldFNlbGVjdGlvbnMoc2VsZWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBsYXN0U2VsZWN0aW9uLmFuY2hvck1hcmsuZmluZCgpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IGxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBlbmQubGluZSAtIHN0YXJ0LmxpbmU7XG4gICAgICAgICAgICB2YXIgY2ggPSBlbmQuY2ggLSBzdGFydC5jaDtcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHsgbGluZTogc2VsZWN0aW9uRW5kLmxpbmUgKyBsaW5lLCBjaDogbGluZSA/IHNlbGVjdGlvbkVuZC5jaCA6IGNoICsgc2VsZWN0aW9uRW5kLmNoIH07XG4gICAgICAgICAgICBpZiAobGFzdFNlbGVjdGlvbi52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBuZXcgUG9zKHNlbGVjdGlvblN0YXJ0LmxpbmUsIDApO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uRW5kLmxpbmUsIGxpbmVMZW5ndGgoY20sIHNlbGVjdGlvbkVuZC5saW5lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXTtcbiAgICB9O1xuICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgcmV0dXJuIGdldExhc3RTZWxlY3RlZEFyZWFSYW5nZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRTZWxlY3RlZEFyZWFSYW5nZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSkge1xuICAgIHZhciBhbmNob3IgPSB2aW0uc2VsLmFuY2hvcjtcbiAgICB2YXIgaGVhZCA9IHZpbS5zZWwuaGVhZDtcbiAgICBpZiAodmltLmxhc3RQYXN0ZWRUZXh0KSB7XG4gICAgICAgIGhlYWQgPSBjbS5wb3NGcm9tSW5kZXgoY20uaW5kZXhGcm9tUG9zKGFuY2hvcikgKyB2aW0ubGFzdFBhc3RlZFRleHQubGVuZ3RoKTtcbiAgICAgICAgdmltLmxhc3RQYXN0ZWRUZXh0ID0gbnVsbDtcbiAgICB9XG4gICAgdmltLmxhc3RTZWxlY3Rpb24gPSB7ICdhbmNob3JNYXJrJzogY20uc2V0Qm9va21hcmsoYW5jaG9yKSxcbiAgICAgICAgJ2hlYWRNYXJrJzogY20uc2V0Qm9va21hcmsoaGVhZCksXG4gICAgICAgICdhbmNob3InOiBjb3B5Q3Vyc29yKGFuY2hvciksXG4gICAgICAgICdoZWFkJzogY29weUN1cnNvcihoZWFkKSxcbiAgICAgICAgJ3Zpc3VhbE1vZGUnOiB2aW0udmlzdWFsTW9kZSxcbiAgICAgICAgJ3Zpc3VhbExpbmUnOiB2aW0udmlzdWFsTGluZSxcbiAgICAgICAgJ3Zpc3VhbEJsb2NrJzogdmltLnZpc3VhbEJsb2NrIH07XG59XG5mdW5jdGlvbiBleHBhbmRTZWxlY3Rpb24oY20sIHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc2VsID0gY20uc3RhdGUudmltLnNlbDtcbiAgICB2YXIgaGVhZCA9IHNlbC5oZWFkO1xuICAgIHZhciBhbmNob3IgPSBzZWwuYW5jaG9yO1xuICAgIHZhciB0bXA7XG4gICAgaWYgKGN1cnNvcklzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XG4gICAgICAgIHRtcCA9IGVuZDtcbiAgICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gdG1wO1xuICAgIH1cbiAgICBpZiAoY3Vyc29ySXNCZWZvcmUoaGVhZCwgYW5jaG9yKSkge1xuICAgICAgICBoZWFkID0gY3Vyc29yTWluKHN0YXJ0LCBoZWFkKTtcbiAgICAgICAgYW5jaG9yID0gY3Vyc29yTWF4KGFuY2hvciwgZW5kKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFuY2hvciA9IGN1cnNvck1pbihzdGFydCwgYW5jaG9yKTtcbiAgICAgICAgaGVhZCA9IGN1cnNvck1heChoZWFkLCBlbmQpO1xuICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIC0xKTtcbiAgICAgICAgaWYgKGhlYWQuY2ggPT0gLTEgJiYgaGVhZC5saW5lICE9IGNtLmZpcnN0TGluZSgpKSB7XG4gICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUgLSAxLCBsaW5lTGVuZ3RoKGNtLCBoZWFkLmxpbmUgLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFthbmNob3IsIGhlYWRdO1xufVxuZnVuY3Rpb24gdXBkYXRlQ21TZWxlY3Rpb24oY20sIHNlbCwgbW9kZSkge1xuICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgc2VsID0gc2VsIHx8IHZpbS5zZWw7XG4gICAgdmFyIG1vZGUgPSBtb2RlIHx8XG4gICAgICAgIHZpbS52aXN1YWxMaW5lID8gJ2xpbmUnIDogdmltLnZpc3VhbEJsb2NrID8gJ2Jsb2NrJyA6ICdjaGFyJztcbiAgICB2YXIgY21TZWwgPSBtYWtlQ21TZWxlY3Rpb24oY20sIHNlbCwgbW9kZSk7XG4gICAgY20uc2V0U2VsZWN0aW9ucyhjbVNlbC5yYW5nZXMsIGNtU2VsLnByaW1hcnkpO1xufVxuZnVuY3Rpb24gbWFrZUNtU2VsZWN0aW9uKGNtLCBzZWwsIG1vZGUsIGV4Y2x1c2l2ZSkge1xuICAgIHZhciBoZWFkID0gY29weUN1cnNvcihzZWwuaGVhZCk7XG4gICAgdmFyIGFuY2hvciA9IGNvcHlDdXJzb3Ioc2VsLmFuY2hvcik7XG4gICAgaWYgKG1vZGUgPT0gJ2NoYXInKSB7XG4gICAgICAgIHZhciBoZWFkT2Zmc2V0ID0gIWV4Y2x1c2l2ZSAmJiAhY3Vyc29ySXNCZWZvcmUoc2VsLmhlYWQsIHNlbC5hbmNob3IpID8gMSA6IDA7XG4gICAgICAgIHZhciBhbmNob3JPZmZzZXQgPSBjdXJzb3JJc0JlZm9yZShzZWwuaGVhZCwgc2VsLmFuY2hvcikgPyAxIDogMDtcbiAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihzZWwuaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgIGFuY2hvciA9IG9mZnNldEN1cnNvcihzZWwuYW5jaG9yLCAwLCBhbmNob3JPZmZzZXQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFuZ2VzOiBbeyBhbmNob3I6IGFuY2hvciwgaGVhZDogaGVhZCB9XSxcbiAgICAgICAgICAgIHByaW1hcnk6IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZSA9PSAnbGluZScpIHtcbiAgICAgICAgaWYgKCFjdXJzb3JJc0JlZm9yZShzZWwuaGVhZCwgc2VsLmFuY2hvcikpIHtcbiAgICAgICAgICAgIGFuY2hvci5jaCA9IDA7XG4gICAgICAgICAgICB2YXIgbGFzdExpbmUgPSBjbS5sYXN0TGluZSgpO1xuICAgICAgICAgICAgaWYgKGhlYWQubGluZSA+IGxhc3RMaW5lKSB7XG4gICAgICAgICAgICAgICAgaGVhZC5saW5lID0gbGFzdExpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoZWFkLmNoID0gbGluZUxlbmd0aChjbSwgaGVhZC5saW5lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhlYWQuY2ggPSAwO1xuICAgICAgICAgICAgYW5jaG9yLmNoID0gbGluZUxlbmd0aChjbSwgYW5jaG9yLmxpbmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYW5nZXM6IFt7IGFuY2hvcjogYW5jaG9yLCBoZWFkOiBoZWFkIH1dLFxuICAgICAgICAgICAgcHJpbWFyeTogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChtb2RlID09ICdibG9jaycpIHtcbiAgICAgICAgdmFyIHRvcCA9IE1hdGgubWluKGFuY2hvci5saW5lLCBoZWFkLmxpbmUpLCBmcm9tQ2ggPSBhbmNob3IuY2gsIGJvdHRvbSA9IE1hdGgubWF4KGFuY2hvci5saW5lLCBoZWFkLmxpbmUpLCB0b0NoID0gaGVhZC5jaDtcbiAgICAgICAgaWYgKGZyb21DaCA8IHRvQ2gpIHtcbiAgICAgICAgICAgIHRvQ2ggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZyb21DaCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGJvdHRvbSAtIHRvcCArIDE7XG4gICAgICAgIHZhciBwcmltYXJ5ID0gaGVhZC5saW5lID09IHRvcCA/IDAgOiBoZWlnaHQgLSAxO1xuICAgICAgICB2YXIgcmFuZ2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIHJhbmdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBhbmNob3I6IG5ldyBQb3ModG9wICsgaSwgZnJvbUNoKSxcbiAgICAgICAgICAgICAgICBoZWFkOiBuZXcgUG9zKHRvcCArIGksIHRvQ2gpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFuZ2VzOiByYW5nZXMsXG4gICAgICAgICAgICBwcmltYXJ5OiBwcmltYXJ5XG4gICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0SGVhZChjbSkge1xuICAgIHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICBpZiAoY20uZ2V0U2VsZWN0aW9uKCkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY3VyID0gY3Vyc29yTWluKGN1ciwgY20uZ2V0Q3Vyc29yKCdhbmNob3InKSk7XG4gICAgfVxuICAgIHJldHVybiBjdXI7XG59XG5mdW5jdGlvbiBleGl0VmlzdWFsTW9kZShjbSwgbW92ZUhlYWQpIHtcbiAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgIGlmIChtb3ZlSGVhZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY20uc2V0Q3Vyc29yKGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIHZpbS5zZWwuaGVhZCkpO1xuICAgIH1cbiAgICB1cGRhdGVMYXN0U2VsZWN0aW9uKGNtLCB2aW0pO1xuICAgIHZpbS52aXN1YWxNb2RlID0gZmFsc2U7XG4gICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKVxuICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcIm5vcm1hbFwiIH0pO1xufVxuZnVuY3Rpb24gY2xpcFRvTGluZShjbSwgY3VyU3RhcnQsIGN1ckVuZCkge1xuICAgIHZhciBzZWxlY3Rpb24gPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKTtcbiAgICBpZiAoL1xcblxccyokLy50ZXN0KHNlbGVjdGlvbikpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc2VsZWN0aW9uLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgbGluZXMucG9wKCk7XG4gICAgICAgIHZhciBsaW5lO1xuICAgICAgICBmb3IgKHZhciBsaW5lID0gbGluZXMucG9wKCk7IGxpbmVzLmxlbmd0aCA+IDAgJiYgbGluZSAmJiBpc1doaXRlU3BhY2VTdHJpbmcobGluZSk7IGxpbmUgPSBsaW5lcy5wb3AoKSkge1xuICAgICAgICAgICAgY3VyRW5kLmxpbmUtLTtcbiAgICAgICAgICAgIGN1ckVuZC5jaCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgIGN1ckVuZC5saW5lLS07XG4gICAgICAgICAgICBjdXJFbmQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJFbmQubGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJFbmQuY2ggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZXhwYW5kU2VsZWN0aW9uVG9MaW5lKF9jbSwgY3VyU3RhcnQsIGN1ckVuZCkge1xuICAgIGN1clN0YXJ0LmNoID0gMDtcbiAgICBjdXJFbmQuY2ggPSAwO1xuICAgIGN1ckVuZC5saW5lKys7XG59XG5mdW5jdGlvbiBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKHRleHQpIHtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciBmaXJzdE5vbldTID0gdGV4dC5zZWFyY2goL1xcUy8pO1xuICAgIHJldHVybiBmaXJzdE5vbldTID09IC0xID8gdGV4dC5sZW5ndGggOiBmaXJzdE5vbldTO1xufVxuZnVuY3Rpb24gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBpbmNsdXNpdmUsIF9mb3J3YXJkLCBiaWdXb3JkLCBub1N5bWJvbCkge1xuICAgIHZhciBjdXIgPSBnZXRIZWFkKGNtKTtcbiAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyLmxpbmUpO1xuICAgIHZhciBpZHggPSBjdXIuY2g7XG4gICAgdmFyIHRlc3QgPSBub1N5bWJvbCA/IHdvcmRDaGFyVGVzdFswXSA6IGJpZ1dvcmRDaGFyVGVzdFswXTtcbiAgICB3aGlsZSAoIXRlc3QobGluZS5jaGFyQXQoaWR4KSkpIHtcbiAgICAgICAgaWR4Kys7XG4gICAgICAgIGlmIChpZHggPj0gbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChiaWdXb3JkKSB7XG4gICAgICAgIHRlc3QgPSBiaWdXb3JkQ2hhclRlc3RbMF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0ZXN0ID0gd29yZENoYXJUZXN0WzBdO1xuICAgICAgICBpZiAoIXRlc3QobGluZS5jaGFyQXQoaWR4KSkpIHtcbiAgICAgICAgICAgIHRlc3QgPSB3b3JkQ2hhclRlc3RbMV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVuZCA9IGlkeCwgc3RhcnQgPSBpZHg7XG4gICAgd2hpbGUgKHRlc3QobGluZS5jaGFyQXQoZW5kKSkgJiYgZW5kIDwgbGluZS5sZW5ndGgpIHtcbiAgICAgICAgZW5kKys7XG4gICAgfVxuICAgIHdoaWxlICh0ZXN0KGxpbmUuY2hhckF0KHN0YXJ0KSkgJiYgc3RhcnQgPj0gMCkge1xuICAgICAgICBzdGFydC0tO1xuICAgIH1cbiAgICBzdGFydCsrO1xuICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgdmFyIHdvcmRFbmQgPSBlbmQ7XG4gICAgICAgIHdoaWxlICgvXFxzLy50ZXN0KGxpbmUuY2hhckF0KGVuZCkpICYmIGVuZCA8IGxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbmQrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAod29yZEVuZCA9PSBlbmQpIHtcbiAgICAgICAgICAgIHZhciB3b3JkU3RhcnQgPSBzdGFydDtcbiAgICAgICAgICAgIHdoaWxlICgvXFxzLy50ZXN0KGxpbmUuY2hhckF0KHN0YXJ0IC0gMSkpICYmIHN0YXJ0ID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB3b3JkU3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhcnQ6IG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0KSwgZW5kOiBuZXcgUG9zKGN1ci5saW5lLCBlbmQpIH07XG59XG5mdW5jdGlvbiBleHBhbmRUYWdVbmRlckN1cnNvcihjbSwgaGVhZCwgaW5jbHVzaXZlKSB7XG4gICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgaWYgKCFDb2RlTWlycm9yLmZpbmRNYXRjaGluZ1RhZyB8fCAhQ29kZU1pcnJvci5maW5kRW5jbG9zaW5nVGFnKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgfVxuICAgIHZhciB0YWdzID0gQ29kZU1pcnJvci5maW5kTWF0Y2hpbmdUYWcoY20sIGhlYWQpIHx8IENvZGVNaXJyb3IuZmluZEVuY2xvc2luZ1RhZyhjbSwgaGVhZCk7XG4gICAgaWYgKCF0YWdzIHx8ICF0YWdzLm9wZW4gfHwgIXRhZ3MuY2xvc2UpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICB9XG4gICAgaWYgKGluY2x1c2l2ZSkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogdGFncy5vcGVuLmZyb20sIGVuZDogdGFncy5jbG9zZS50byB9O1xuICAgIH1cbiAgICByZXR1cm4geyBzdGFydDogdGFncy5vcGVuLnRvLCBlbmQ6IHRhZ3MuY2xvc2UuZnJvbSB9O1xufVxuZnVuY3Rpb24gcmVjb3JkSnVtcFBvc2l0aW9uKGNtLCBvbGRDdXIsIG5ld0N1cikge1xuICAgIGlmICghY3Vyc29yRXF1YWwob2xkQ3VyLCBuZXdDdXIpKSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0LmFkZChjbSwgb2xkQ3VyLCBuZXdDdXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlY29yZExhc3RDaGFyYWN0ZXJTZWFyY2goaW5jcmVtZW50LCBhcmdzKSB7XG4gICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5pbmNyZW1lbnQgPSBpbmNyZW1lbnQ7XG4gICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5mb3J3YXJkID0gYXJncy5mb3J3YXJkO1xuICAgIHZpbUdsb2JhbFN0YXRlLmxhc3RDaGFyYWN0ZXJTZWFyY2guc2VsZWN0ZWRDaGFyYWN0ZXIgPSBhcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xufVxudmFyIHN5bWJvbFRvTW9kZSA9IHtcbiAgICAnKCc6ICdicmFja2V0JywgJyknOiAnYnJhY2tldCcsICd7JzogJ2JyYWNrZXQnLCAnfSc6ICdicmFja2V0JyxcbiAgICAnWyc6ICdzZWN0aW9uJywgJ10nOiAnc2VjdGlvbicsXG4gICAgJyonOiAnY29tbWVudCcsICcvJzogJ2NvbW1lbnQnLFxuICAgICdtJzogJ21ldGhvZCcsICdNJzogJ21ldGhvZCcsXG4gICAgJyMnOiAncHJlcHJvY2Vzcydcbn07XG52YXIgZmluZFN5bWJvbE1vZGVzID0ge1xuICAgIGJyYWNrZXQ6IHtcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUubmV4dENoID09PSBzdGF0ZS5zeW1iKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZGVwdGgrKztcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZGVwdGggPj0gMSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdGF0ZS5uZXh0Q2ggPT09IHN0YXRlLnJldmVyc2VTeW1iKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZGVwdGgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2VjdGlvbjoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHN0YXRlLmN1ck1vdmVUaHJvdWdoID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YXRlLnN5bWIgPSAoc3RhdGUuZm9yd2FyZCA/ICddJyA6ICdbJykgPT09IHN0YXRlLnN5bWIgPyAneycgOiAnfSc7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmluZGV4ID09PSAwICYmIHN0YXRlLm5leHRDaCA9PT0gc3RhdGUuc3ltYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tbWVudDoge1xuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZCA9IHN0YXRlLmxhc3RDaCA9PT0gJyonICYmIHN0YXRlLm5leHRDaCA9PT0gJy8nO1xuICAgICAgICAgICAgc3RhdGUubGFzdENoID0gc3RhdGUubmV4dENoO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2Q6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBzdGF0ZS5zeW1iID0gKHN0YXRlLnN5bWIgPT09ICdtJyA/ICd7JyA6ICd9Jyk7XG4gICAgICAgICAgICBzdGF0ZS5yZXZlcnNlU3ltYiA9IHN0YXRlLnN5bWIgPT09ICd7JyA/ICd9JyA6ICd7JztcbiAgICAgICAgfSxcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUubmV4dENoID09PSBzdGF0ZS5zeW1iKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwcmVwcm9jZXNzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgICAgc3RhdGUuaW5kZXggPSAwO1xuICAgICAgICB9LFxuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5uZXh0Q2ggPT09ICcjJykge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHN0YXRlLmxpbmVUZXh0Lm1hdGNoKC9eIyhcXHcrKS8pWzFdO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gJ2VuZGlmJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZm9yd2FyZCAmJiBzdGF0ZS5kZXB0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVwdGgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodG9rZW4gPT09ICdpZicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5mb3J3YXJkICYmIHN0YXRlLmRlcHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZXB0aC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4gPT09ICdlbHNlJyAmJiBzdGF0ZS5kZXB0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gZmluZFN5bWJvbChjbSwgcmVwZWF0LCBmb3J3YXJkLCBzeW1iKSB7XG4gICAgdmFyIGN1ciA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgIHZhciBpbmNyZW1lbnQgPSBmb3J3YXJkID8gMSA6IC0xO1xuICAgIHZhciBlbmRMaW5lID0gZm9yd2FyZCA/IGNtLmxpbmVDb3VudCgpIDogLTE7XG4gICAgdmFyIGN1ckNoID0gY3VyLmNoO1xuICAgIHZhciBsaW5lID0gY3VyLmxpbmU7XG4gICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgIGxpbmVUZXh0OiBsaW5lVGV4dCxcbiAgICAgICAgbmV4dENoOiBsaW5lVGV4dC5jaGFyQXQoY3VyQ2gpLFxuICAgICAgICBsYXN0Q2g6IG51bGwsXG4gICAgICAgIGluZGV4OiBjdXJDaCxcbiAgICAgICAgc3ltYjogc3ltYixcbiAgICAgICAgcmV2ZXJzZVN5bWI6IChmb3J3YXJkID8geyAnKSc6ICcoJywgJ30nOiAneycgfSA6IHsgJygnOiAnKScsICd7JzogJ30nIH0pW3N5bWJdLFxuICAgICAgICBmb3J3YXJkOiBmb3J3YXJkLFxuICAgICAgICBkZXB0aDogMCxcbiAgICAgICAgY3VyTW92ZVRocm91Z2g6IGZhbHNlXG4gICAgfTtcbiAgICB2YXIgbW9kZSA9IHN5bWJvbFRvTW9kZVtzeW1iXTtcbiAgICBpZiAoIW1vZGUpXG4gICAgICAgIHJldHVybiBjdXI7XG4gICAgdmFyIGluaXQgPSBmaW5kU3ltYm9sTW9kZXNbbW9kZV0uaW5pdDtcbiAgICB2YXIgaXNDb21wbGV0ZSA9IGZpbmRTeW1ib2xNb2Rlc1ttb2RlXS5pc0NvbXBsZXRlO1xuICAgIGlmIChpbml0KSB7XG4gICAgICAgIGluaXQoc3RhdGUpO1xuICAgIH1cbiAgICB3aGlsZSAobGluZSAhPT0gZW5kTGluZSAmJiByZXBlYXQpIHtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gaW5jcmVtZW50O1xuICAgICAgICBzdGF0ZS5uZXh0Q2ggPSBzdGF0ZS5saW5lVGV4dC5jaGFyQXQoc3RhdGUuaW5kZXgpO1xuICAgICAgICBpZiAoIXN0YXRlLm5leHRDaCkge1xuICAgICAgICAgICAgbGluZSArPSBpbmNyZW1lbnQ7XG4gICAgICAgICAgICBzdGF0ZS5saW5lVGV4dCA9IGNtLmdldExpbmUobGluZSkgfHwgJyc7XG4gICAgICAgICAgICBpZiAoaW5jcmVtZW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YXRlLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lTGVuID0gc3RhdGUubGluZVRleHQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHN0YXRlLmluZGV4ID0gKGxpbmVMZW4gPiAwKSA/IChsaW5lTGVuIC0gMSkgOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUubmV4dENoID0gc3RhdGUubGluZVRleHQuY2hhckF0KHN0YXRlLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb21wbGV0ZShzdGF0ZSkpIHtcbiAgICAgICAgICAgIGN1ci5saW5lID0gbGluZTtcbiAgICAgICAgICAgIGN1ci5jaCA9IHN0YXRlLmluZGV4O1xuICAgICAgICAgICAgcmVwZWF0LS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0YXRlLm5leHRDaCB8fCBzdGF0ZS5jdXJNb3ZlVGhyb3VnaCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBzdGF0ZS5pbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBjdXI7XG59XG5mdW5jdGlvbiBmaW5kV29yZChjbSwgY3VyLCBmb3J3YXJkLCBiaWdXb3JkLCBlbXB0eUxpbmVJc1dvcmQpIHtcbiAgICB2YXIgbGluZU51bSA9IGN1ci5saW5lO1xuICAgIHZhciBwb3MgPSBjdXIuY2g7XG4gICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgIHZhciBkaXIgPSBmb3J3YXJkID8gMSA6IC0xO1xuICAgIHZhciBjaGFyVGVzdHMgPSBiaWdXb3JkID8gYmlnV29yZENoYXJUZXN0IDogd29yZENoYXJUZXN0O1xuICAgIGlmIChlbXB0eUxpbmVJc1dvcmQgJiYgbGluZSA9PSAnJykge1xuICAgICAgICBsaW5lTnVtICs9IGRpcjtcbiAgICAgICAgbGluZSA9IGNtLmdldExpbmUobGluZU51bSk7XG4gICAgICAgIGlmICghaXNMaW5lKGNtLCBsaW5lTnVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcG9zID0gKGZvcndhcmQpID8gMCA6IGxpbmUubGVuZ3RoO1xuICAgIH1cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAoZW1wdHlMaW5lSXNXb3JkICYmIGxpbmUgPT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGZyb206IDAsIHRvOiAwLCBsaW5lOiBsaW5lTnVtIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0b3AgPSAoZGlyID4gMCkgPyBsaW5lLmxlbmd0aCA6IC0xO1xuICAgICAgICB2YXIgd29yZFN0YXJ0ID0gc3RvcCwgd29yZEVuZCA9IHN0b3A7XG4gICAgICAgIHdoaWxlIChwb3MgIT0gc3RvcCkge1xuICAgICAgICAgICAgdmFyIGZvdW5kV29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFyVGVzdHMubGVuZ3RoICYmICFmb3VuZFdvcmQ7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChjaGFyVGVzdHNbaV0obGluZS5jaGFyQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd29yZFN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocG9zICE9IHN0b3AgJiYgY2hhclRlc3RzW2ldKGxpbmUuY2hhckF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgKz0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdvcmRFbmQgPSBwb3M7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kV29yZCA9IHdvcmRTdGFydCAhPSB3b3JkRW5kO1xuICAgICAgICAgICAgICAgICAgICBpZiAod29yZFN0YXJ0ID09IGN1ci5jaCAmJiBsaW5lTnVtID09IGN1ci5saW5lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkRW5kID09IHdvcmRTdGFydCArIGRpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IE1hdGgubWluKHdvcmRTdGFydCwgd29yZEVuZCArIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiBNYXRoLm1heCh3b3JkU3RhcnQsIHdvcmRFbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGxpbmVOdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZvdW5kV29yZCkge1xuICAgICAgICAgICAgICAgIHBvcyArPSBkaXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGluZU51bSArPSBkaXI7XG4gICAgICAgIGlmICghaXNMaW5lKGNtLCBsaW5lTnVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGluZSA9IGNtLmdldExpbmUobGluZU51bSk7XG4gICAgICAgIHBvcyA9IChkaXIgPiAwKSA/IDAgOiBsaW5lLmxlbmd0aDtcbiAgICB9XG59XG5mdW5jdGlvbiBtb3ZlVG9Xb3JkKGNtLCBjdXIsIHJlcGVhdCwgZm9yd2FyZCwgd29yZEVuZCwgYmlnV29yZCkge1xuICAgIHZhciBjdXJTdGFydCA9IGNvcHlDdXJzb3IoY3VyKTtcbiAgICB2YXIgd29yZHMgPSBbXTtcbiAgICBpZiAoZm9yd2FyZCAmJiAhd29yZEVuZCB8fCAhZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIHJlcGVhdCsrO1xuICAgIH1cbiAgICB2YXIgZW1wdHlMaW5lSXNXb3JkID0gIShmb3J3YXJkICYmIHdvcmRFbmQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgdmFyIHdvcmQgPSBmaW5kV29yZChjbSwgY3VyLCBmb3J3YXJkLCBiaWdXb3JkLCBlbXB0eUxpbmVJc1dvcmQpO1xuICAgICAgICBpZiAoIXdvcmQpIHtcbiAgICAgICAgICAgIHZhciBlb2RDaCA9IGxpbmVMZW5ndGgoY20sIGNtLmxhc3RMaW5lKCkpO1xuICAgICAgICAgICAgd29yZHMucHVzaChmb3J3YXJkXG4gICAgICAgICAgICAgICAgPyB7IGxpbmU6IGNtLmxhc3RMaW5lKCksIGZyb206IGVvZENoLCB0bzogZW9kQ2ggfVxuICAgICAgICAgICAgICAgIDogeyBsaW5lOiAwLCBmcm9tOiAwLCB0bzogMCB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHdvcmRzLnB1c2god29yZCk7XG4gICAgICAgIGN1ciA9IG5ldyBQb3Mod29yZC5saW5lLCBmb3J3YXJkID8gKHdvcmQudG8gLSAxKSA6IHdvcmQuZnJvbSk7XG4gICAgfVxuICAgIHZhciBzaG9ydENpcmN1aXQgPSB3b3Jkcy5sZW5ndGggIT0gcmVwZWF0O1xuICAgIHZhciBmaXJzdFdvcmQgPSB3b3Jkc1swXTtcbiAgICB2YXIgbGFzdFdvcmQgPSB3b3Jkcy5wb3AoKTtcbiAgICBpZiAoZm9yd2FyZCAmJiAhd29yZEVuZCkge1xuICAgICAgICBpZiAoIXNob3J0Q2lyY3VpdCAmJiAoZmlyc3RXb3JkLmZyb20gIT0gY3VyU3RhcnQuY2ggfHwgZmlyc3RXb3JkLmxpbmUgIT0gY3VyU3RhcnQubGluZSkpIHtcbiAgICAgICAgICAgIGxhc3RXb3JkID0gd29yZHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQuZnJvbSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZvcndhcmQgJiYgd29yZEVuZCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsYXN0V29yZC5saW5lLCBsYXN0V29yZC50byAtIDEpO1xuICAgIH1cbiAgICBlbHNlIGlmICghZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIGlmICghc2hvcnRDaXJjdWl0ICYmIChmaXJzdFdvcmQudG8gIT0gY3VyU3RhcnQuY2ggfHwgZmlyc3RXb3JkLmxpbmUgIT0gY3VyU3RhcnQubGluZSkpIHtcbiAgICAgICAgICAgIGxhc3RXb3JkID0gd29yZHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQudG8pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQuZnJvbSk7XG4gICAgfVxufVxuZnVuY3Rpb24gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIGtlZXBIUG9zKSB7XG4gICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgdmFyIHJldHZhbCA9IG5ldyBQb3MoY3VyLmxpbmUgKyBtb3Rpb25BcmdzLnJlcGVhdCAtIDEsIEluZmluaXR5KTtcbiAgICB2YXIgZW5kID0gY20uY2xpcFBvcyhyZXR2YWwpO1xuICAgIGVuZC5jaC0tO1xuICAgIGlmICgha2VlcEhQb3MpIHtcbiAgICAgICAgdmltLmxhc3RIUG9zID0gSW5maW5pdHk7XG4gICAgICAgIHZpbS5sYXN0SFNQb3MgPSBjbS5jaGFyQ29vcmRzKGVuZCwgJ2RpdicpLmxlZnQ7XG4gICAgfVxuICAgIHJldHVybiByZXR2YWw7XG59XG5mdW5jdGlvbiBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgZm9yd2FyZCwgY2hhcmFjdGVyKSB7XG4gICAgdmFyIGN1ciA9IGNtLmdldEN1cnNvcigpO1xuICAgIHZhciBzdGFydCA9IGN1ci5jaDtcbiAgICB2YXIgaWR4O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGN1ci5saW5lKTtcbiAgICAgICAgaWR4ID0gY2hhcklkeEluTGluZShzdGFydCwgbGluZSwgY2hhcmFjdGVyLCBmb3J3YXJkLCB0cnVlKTtcbiAgICAgICAgaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBpZHg7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUG9zKGNtLmdldEN1cnNvcigpLmxpbmUsIGlkeCk7XG59XG5mdW5jdGlvbiBtb3ZlVG9Db2x1bW4oY20sIHJlcGVhdCkge1xuICAgIHZhciBsaW5lID0gY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICByZXR1cm4gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhsaW5lLCByZXBlYXQgLSAxKSk7XG59XG5mdW5jdGlvbiB1cGRhdGVNYXJrKGNtLCB2aW0sIG1hcmtOYW1lLCBwb3MpIHtcbiAgICBpZiAoIWluQXJyYXkobWFya05hbWUsIHZhbGlkTWFya3MpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHZpbS5tYXJrc1ttYXJrTmFtZV0pIHtcbiAgICAgICAgdmltLm1hcmtzW21hcmtOYW1lXS5jbGVhcigpO1xuICAgIH1cbiAgICB2aW0ubWFya3NbbWFya05hbWVdID0gY20uc2V0Qm9va21hcmsocG9zKTtcbn1cbmZ1bmN0aW9uIGNoYXJJZHhJbkxpbmUoc3RhcnQsIGxpbmUsIGNoYXJhY3RlciwgZm9yd2FyZCwgaW5jbHVkZUNoYXIpIHtcbiAgICB2YXIgaWR4O1xuICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgIGlkeCA9IGxpbmUuaW5kZXhPZihjaGFyYWN0ZXIsIHN0YXJ0ICsgMSk7XG4gICAgICAgIGlmIChpZHggIT0gLTEgJiYgIWluY2x1ZGVDaGFyKSB7XG4gICAgICAgICAgICBpZHggLT0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWR4ID0gbGluZS5sYXN0SW5kZXhPZihjaGFyYWN0ZXIsIHN0YXJ0IC0gMSk7XG4gICAgICAgIGlmIChpZHggIT0gLTEgJiYgIWluY2x1ZGVDaGFyKSB7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWR4O1xufVxuZnVuY3Rpb24gZmluZFBhcmFncmFwaChjbSwgaGVhZCwgcmVwZWF0LCBkaXIsIGluY2x1c2l2ZSkge1xuICAgIHZhciBsaW5lID0gaGVhZC5saW5lO1xuICAgIHZhciBtaW4gPSBjbS5maXJzdExpbmUoKTtcbiAgICB2YXIgbWF4ID0gY20ubGFzdExpbmUoKTtcbiAgICB2YXIgc3RhcnQsIGVuZCwgaSA9IGxpbmU7XG4gICAgZnVuY3Rpb24gaXNFbXB0eShpKSB7IHJldHVybiAhL1xcUy8udGVzdChjbS5nZXRMaW5lKGkpKTsgfSAvLyBhY2VfcGF0Y2hcbiAgICBmdW5jdGlvbiBpc0JvdW5kYXJ5KGksIGRpciwgYW55KSB7XG4gICAgICAgIGlmIChhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VtcHR5KGkpICE9IGlzRW1wdHkoaSArIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFpc0VtcHR5KGkpICYmIGlzRW1wdHkoaSArIGRpcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNraXBGb2xkKGkpIHtcbiAgICAgICAgZGlyID0gZGlyID4gMCA/IDEgOiAtMTtcbiAgICAgICAgdmFyIGZvbGRMaW5lID0gY20uYWNlLnNlc3Npb24uZ2V0Rm9sZExpbmUoaSk7XG4gICAgICAgIGlmIChmb2xkTGluZSkge1xuICAgICAgICAgICAgaWYgKGkgKyBkaXIgPiBmb2xkTGluZS5zdGFydC5yb3cgJiYgaSArIGRpciA8IGZvbGRMaW5lLmVuZC5yb3cpXG4gICAgICAgICAgICAgICAgZGlyID0gKGRpciA+IDAgPyBmb2xkTGluZS5lbmQucm93IDogZm9sZExpbmUuc3RhcnQucm93KSAtIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRpcikge1xuICAgICAgICB3aGlsZSAobWluIDw9IGkgJiYgaSA8PSBtYXggJiYgcmVwZWF0ID4gMCkge1xuICAgICAgICAgICAgc2tpcEZvbGQoaSk7XG4gICAgICAgICAgICBpZiAoaXNCb3VuZGFyeShpLCBkaXIpKSB7XG4gICAgICAgICAgICAgICAgcmVwZWF0LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IGRpcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhpLCAwKTtcbiAgICB9XG4gICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICBpZiAodmltLnZpc3VhbExpbmUgJiYgaXNCb3VuZGFyeShsaW5lLCAxLCB0cnVlKSkge1xuICAgICAgICB2YXIgYW5jaG9yID0gdmltLnNlbC5hbmNob3I7XG4gICAgICAgIGlmIChpc0JvdW5kYXJ5KGFuY2hvci5saW5lLCAtMSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIGlmICghaW5jbHVzaXZlIHx8IGFuY2hvci5saW5lICE9IGxpbmUpIHtcbiAgICAgICAgICAgICAgICBsaW5lICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN0YXJ0U3RhdGUgPSBpc0VtcHR5KGxpbmUpO1xuICAgIGZvciAoaSA9IGxpbmU7IGkgPD0gbWF4ICYmIHJlcGVhdDsgaSsrKSB7XG4gICAgICAgIGlmIChpc0JvdW5kYXJ5KGksIDEsIHRydWUpKSB7XG4gICAgICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBpc0VtcHR5KGkpICE9IHN0YXJ0U3RhdGUpIHtcbiAgICAgICAgICAgICAgICByZXBlYXQtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbmQgPSBuZXcgUG9zKGksIDApO1xuICAgIGlmIChpID4gbWF4ICYmICFzdGFydFN0YXRlKSB7XG4gICAgICAgIHN0YXJ0U3RhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5jbHVzaXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGZvciAoaSA9IGxpbmU7IGkgPiBtaW47IGktLSkge1xuICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBpc0VtcHR5KGkpID09IHN0YXJ0U3RhdGUgfHwgaSA9PSBsaW5lKSB7XG4gICAgICAgICAgICBpZiAoaXNCb3VuZGFyeShpLCAtMSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGFydCA9IG5ldyBQb3MoaSwgMCk7XG4gICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9O1xufVxuZnVuY3Rpb24gZ2V0U2VudGVuY2UoY20sIGN1ciwgcmVwZWF0LCBkaXIsIGluY2x1c2l2ZSAvKmluY2x1ZGVzIHdoaXRlc3BhY2UqLykge1xuICAgIGZ1bmN0aW9uIG5leHRDaGFyKGN1cnIpIHtcbiAgICAgICAgaWYgKGN1cnIucG9zICsgY3Vyci5kaXIgPCAwIHx8IGN1cnIucG9zICsgY3Vyci5kaXIgPj0gY3Vyci5saW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgY3Vyci5saW5lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnIucG9zICs9IGN1cnIuZGlyO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZvcndhcmQoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuICAgICAgICAgICAgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgICAgIGlmICghaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zICsgMSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyArIDEgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgKyAxIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJldmVyc2UoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pICYmICFpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgICAgICBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgICAgIGlmICghaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3MgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zICsgMSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyLmxpbmUgPSBsaW5lO1xuICAgICAgICBpZiAoaW5jbHVzaXZlICYmIGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjdXJyX2luZGV4ID0ge1xuICAgICAgICBsbjogY3VyLmxpbmUsXG4gICAgICAgIHBvczogY3VyLmNoLFxuICAgIH07XG4gICAgd2hpbGUgKHJlcGVhdCA+IDApIHtcbiAgICAgICAgaWYgKGRpciA8IDApIHtcbiAgICAgICAgICAgIGN1cnJfaW5kZXggPSByZXZlcnNlKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJfaW5kZXggPSBmb3J3YXJkKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICByZXBlYXQtLTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQb3MoY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MpO1xufVxuZnVuY3Rpb24gZmluZFNlbnRlbmNlKGNtLCBjdXIsIHJlcGVhdCwgZGlyKSB7XG4gICAgZnVuY3Rpb24gbmV4dENoYXIoY20sIGlkeCkge1xuICAgICAgICBpZiAoaWR4LnBvcyArIGlkeC5kaXIgPCAwIHx8IGlkeC5wb3MgKyBpZHguZGlyID49IGlkeC5saW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgaWR4LmxuICs9IGlkeC5kaXI7XG4gICAgICAgICAgICBpZiAoIWlzTGluZShjbSwgaWR4LmxuKSkge1xuICAgICAgICAgICAgICAgIGlkeC5saW5lID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZHgubG4gPSBudWxsO1xuICAgICAgICAgICAgICAgIGlkeC5wb3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeC5saW5lID0gY20uZ2V0TGluZShpZHgubG4pO1xuICAgICAgICAgICAgaWR4LnBvcyA9IChpZHguZGlyID4gMCkgPyAwIDogaWR4LmxpbmUubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlkeC5wb3MgKz0gaWR4LmRpcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmb3J3YXJkKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcbiAgICAgICAgdmFyIHN0b3AgPSAobGluZSA9PT0gXCJcIik7XG4gICAgICAgIHZhciBjdXJyID0ge1xuICAgICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIH07XG4gICAgICAgIHZhciBsYXN0X3ZhbGlkID0ge1xuICAgICAgICAgICAgbG46IGN1cnIubG4sXG4gICAgICAgICAgICBwb3M6IGN1cnIucG9zLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2tpcF9lbXB0eV9saW5lcyA9IChjdXJyLmxpbmUgPT09IFwiXCIpO1xuICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxhc3RfdmFsaWQubG4gPSBjdXJyLmxuO1xuICAgICAgICAgICAgbGFzdF92YWxpZC5wb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIgJiYgIXNraXBfZW1wdHlfbGluZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcywgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0b3AgJiYgY3Vyci5saW5lICE9PSBcIlwiICYmICFpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcywgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKVxuICAgICAgICAgICAgICAgICYmICFzdG9wXG4gICAgICAgICAgICAgICAgJiYgKGN1cnIucG9zID09PSBjdXJyLmxpbmUubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICB8fCBpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zICsgMV0pKSkge1xuICAgICAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsYXN0X3ZhbGlkLmxuKTtcbiAgICAgICAgbGFzdF92YWxpZC5wb3MgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gbGluZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKCFpc1doaXRlU3BhY2VTdHJpbmcobGluZVtpXSkpIHtcbiAgICAgICAgICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJldmVyc2UoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgbGFzdF92YWxpZCA9IHtcbiAgICAgICAgICAgIGxuOiBjdXJyLmxuLFxuICAgICAgICAgICAgcG9zOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2tpcF9lbXB0eV9saW5lcyA9IChjdXJyLmxpbmUgPT09IFwiXCIpO1xuICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIgJiYgIXNraXBfZW1wdHlfbGluZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdF92YWxpZC5wb3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKVxuICAgICAgICAgICAgICAgICYmIGxhc3RfdmFsaWQucG9zICE9PSBudWxsXG4gICAgICAgICAgICAgICAgJiYgIShjdXJyLmxuID09PSBsYXN0X3ZhbGlkLmxuICYmIGN1cnIucG9zICsgMSA9PT0gbGFzdF92YWxpZC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjdXJyLmxpbmUgIT09IFwiXCIgJiYgIWlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgICAgIHNraXBfZW1wdHlfbGluZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsYXN0X3ZhbGlkID0geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsYXN0X3ZhbGlkLmxuKTtcbiAgICAgICAgbGFzdF92YWxpZC5wb3MgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGxpbmVbaV0pKSB7XG4gICAgICAgICAgICAgICAgbGFzdF92YWxpZC5wb3MgPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgIH1cbiAgICB2YXIgY3Vycl9pbmRleCA9IHtcbiAgICAgICAgbG46IGN1ci5saW5lLFxuICAgICAgICBwb3M6IGN1ci5jaCxcbiAgICB9O1xuICAgIHdoaWxlIChyZXBlYXQgPiAwKSB7XG4gICAgICAgIGlmIChkaXIgPCAwKSB7XG4gICAgICAgICAgICBjdXJyX2luZGV4ID0gcmV2ZXJzZShjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyX2luZGV4ID0gZm9yd2FyZChjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0LS07XG4gICAgfVxuICAgIHJldHVybiBuZXcgUG9zKGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zKTtcbn1cbmZ1bmN0aW9uIHNlbGVjdENvbXBhbmlvbk9iamVjdChjbSwgaGVhZCwgc3ltYiwgaW5jbHVzaXZlKSB7XG4gICAgdmFyIGN1ciA9IGhlYWQsIHN0YXJ0LCBlbmQ7XG4gICAgdmFyIGJyYWNrZXRSZWdleHAgPSAoe1xuICAgICAgICAnKCc6IC9bKCldLywgJyknOiAvWygpXS8sXG4gICAgICAgICdbJzogL1tbXFxdXS8sICddJzogL1tbXFxdXS8sXG4gICAgICAgICd7JzogL1t7fV0vLCAnfSc6IC9be31dLyxcbiAgICAgICAgJzwnOiAvWzw+XS8sICc+JzogL1s8Pl0vXG4gICAgfSlbc3ltYl07XG4gICAgdmFyIG9wZW5TeW0gPSAoe1xuICAgICAgICAnKCc6ICcoJywgJyknOiAnKCcsXG4gICAgICAgICdbJzogJ1snLCAnXSc6ICdbJyxcbiAgICAgICAgJ3snOiAneycsICd9JzogJ3snLFxuICAgICAgICAnPCc6ICc8JywgJz4nOiAnPCdcbiAgICB9KVtzeW1iXTtcbiAgICB2YXIgY3VyQ2hhciA9IGNtLmdldExpbmUoY3VyLmxpbmUpLmNoYXJBdChjdXIuY2gpO1xuICAgIHZhciBvZmZzZXQgPSBjdXJDaGFyID09PSBvcGVuU3ltID8gMSA6IDA7XG4gICAgc3RhcnQgPSBjbS5zY2FuRm9yQnJhY2tldChuZXcgUG9zKGN1ci5saW5lLCBjdXIuY2ggKyBvZmZzZXQpLCAtMSwgdW5kZWZpbmVkLCB7ICdicmFja2V0UmVnZXgnOiBicmFja2V0UmVnZXhwIH0pO1xuICAgIGVuZCA9IGNtLnNjYW5Gb3JCcmFja2V0KG5ldyBQb3MoY3VyLmxpbmUsIGN1ci5jaCArIG9mZnNldCksIDEsIHVuZGVmaW5lZCwgeyAnYnJhY2tldFJlZ2V4JzogYnJhY2tldFJlZ2V4cCB9KTtcbiAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICB9XG4gICAgc3RhcnQgPSBzdGFydC5wb3M7XG4gICAgZW5kID0gZW5kLnBvcztcbiAgICBpZiAoKHN0YXJ0LmxpbmUgPT0gZW5kLmxpbmUgJiYgc3RhcnQuY2ggPiBlbmQuY2gpXG4gICAgICAgIHx8IChzdGFydC5saW5lID4gZW5kLmxpbmUpKSB7XG4gICAgICAgIHZhciB0bXAgPSBzdGFydDtcbiAgICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICAgIGVuZCA9IHRtcDtcbiAgICB9XG4gICAgaWYgKGluY2x1c2l2ZSkge1xuICAgICAgICBlbmQuY2ggKz0gMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YXJ0LmNoICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbn1cbmZ1bmN0aW9uIGZpbmRCZWdpbm5pbmdBbmRFbmQoY20sIGhlYWQsIHN5bWIsIGluY2x1c2l2ZSkge1xuICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGhlYWQpO1xuICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgdmFyIGNoYXJzID0gbGluZS5zcGxpdCgnJyk7XG4gICAgdmFyIHN0YXJ0LCBlbmQsIGksIGxlbjtcbiAgICB2YXIgZmlyc3RJbmRleCA9IGNoYXJzLmluZGV4T2Yoc3ltYik7XG4gICAgaWYgKGN1ci5jaCA8IGZpcnN0SW5kZXgpIHtcbiAgICAgICAgY3VyLmNoID0gZmlyc3RJbmRleDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmlyc3RJbmRleCA8IGN1ci5jaCAmJiBjaGFyc1tjdXIuY2hdID09IHN5bWIpIHtcbiAgICAgICAgZW5kID0gY3VyLmNoOyAvLyBhc3NpZ24gZW5kIHRvIHRoZSBjdXJyZW50IGN1cnNvclxuICAgICAgICAtLWN1ci5jaDsgLy8gbWFrZSBzdXJlIHRvIGxvb2sgYmFja3dhcmRzXG4gICAgfVxuICAgIGlmIChjaGFyc1tjdXIuY2hdID09IHN5bWIgJiYgIWVuZCkge1xuICAgICAgICBzdGFydCA9IGN1ci5jaCArIDE7IC8vIGFzc2lnbiBzdGFydCB0byBhaGVhZCBvZiB0aGUgY3Vyc29yXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSBjdXIuY2g7IGkgPiAtMSAmJiAhc3RhcnQ7IGktLSkge1xuICAgICAgICAgICAgaWYgKGNoYXJzW2ldID09IHN5bWIpIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzdGFydCAmJiAhZW5kKSB7XG4gICAgICAgIGZvciAoaSA9IHN0YXJ0LCBsZW4gPSBjaGFycy5sZW5ndGg7IGkgPCBsZW4gJiYgIWVuZDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hhcnNbaV0gPT0gc3ltYikge1xuICAgICAgICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzdGFydCB8fCAhZW5kKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgfVxuICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgLS1zdGFydDtcbiAgICAgICAgKytlbmQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBuZXcgUG9zKGN1ci5saW5lLCBzdGFydCksXG4gICAgICAgIGVuZDogbmV3IFBvcyhjdXIubGluZSwgZW5kKVxuICAgIH07XG59XG5kZWZpbmVPcHRpb24oJ3BjcmUnLCB0cnVlLCAnYm9vbGVhbicpO1xuZnVuY3Rpb24gU2VhcmNoU3RhdGUoKSB7IH1cblNlYXJjaFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgICBnZXRRdWVyeTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmltR2xvYmFsU3RhdGUucXVlcnk7XG4gICAgfSxcbiAgICBzZXRRdWVyeTogZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnF1ZXJ5ID0gcXVlcnk7XG4gICAgfSxcbiAgICBnZXRPdmVybGF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaE92ZXJsYXk7XG4gICAgfSxcbiAgICBzZXRPdmVybGF5OiBmdW5jdGlvbiAob3ZlcmxheSkge1xuICAgICAgICB0aGlzLnNlYXJjaE92ZXJsYXkgPSBvdmVybGF5O1xuICAgIH0sXG4gICAgaXNSZXZlcnNlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmltR2xvYmFsU3RhdGUuaXNSZXZlcnNlZDtcbiAgICB9LFxuICAgIHNldFJldmVyc2VkOiBmdW5jdGlvbiAocmV2ZXJzZWQpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUuaXNSZXZlcnNlZCA9IHJldmVyc2VkO1xuICAgIH0sXG4gICAgZ2V0U2Nyb2xsYmFyQW5ub3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5ub3RhdGU7XG4gICAgfSxcbiAgICBzZXRTY3JvbGxiYXJBbm5vdGF0ZTogZnVuY3Rpb24gKGFubm90YXRlKSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGUgPSBhbm5vdGF0ZTtcbiAgICB9XG59O1xuZnVuY3Rpb24gZ2V0U2VhcmNoU3RhdGUoY20pIHtcbiAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgIHJldHVybiB2aW0uc2VhcmNoU3RhdGVfIHx8ICh2aW0uc2VhcmNoU3RhdGVfID0gbmV3IFNlYXJjaFN0YXRlKCkpO1xufVxuZnVuY3Rpb24gc3BsaXRCeVNsYXNoKGFyZ1N0cmluZykge1xuICAgIHJldHVybiBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgJy8nKTtcbn1cbmZ1bmN0aW9uIGZpbmRVbmVzY2FwZWRTbGFzaGVzKGFyZ1N0cmluZykge1xuICAgIHJldHVybiBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhhcmdTdHJpbmcsICcvJyk7XG59XG5mdW5jdGlvbiBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgc2VwYXJhdG9yKSB7XG4gICAgdmFyIHNsYXNoZXMgPSBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhhcmdTdHJpbmcsIHNlcGFyYXRvcikgfHwgW107XG4gICAgaWYgKCFzbGFzaGVzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICBpZiAoc2xhc2hlc1swXSAhPT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xhc2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHNsYXNoZXNbaV0gPT0gJ251bWJlcicpXG4gICAgICAgICAgICB0b2tlbnMucHVzaChhcmdTdHJpbmcuc3Vic3RyaW5nKHNsYXNoZXNbaV0gKyAxLCBzbGFzaGVzW2kgKyAxXSkpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xufVxuZnVuY3Rpb24gZmluZFVuZXNjYXBlZFNlcGFyYXRvcnMoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICBpZiAoIXNlcGFyYXRvcilcbiAgICAgICAgc2VwYXJhdG9yID0gJy8nO1xuICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgIHZhciBzbGFzaGVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICBpZiAoIWVzY2FwZU5leHRDaGFyICYmIGMgPT0gc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICBzbGFzaGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgZXNjYXBlTmV4dENoYXIgPSAhZXNjYXBlTmV4dENoYXIgJiYgKGMgPT0gJ1xcXFwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHNsYXNoZXM7XG59XG5mdW5jdGlvbiB0cmFuc2xhdGVSZWdleChzdHIpIHtcbiAgICB2YXIgc3BlY2lhbHMgPSAnfCgpeyc7XG4gICAgdmFyIHVuZXNjYXBlID0gJ30nO1xuICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gLTE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpIHx8ICcnO1xuICAgICAgICB2YXIgbiA9IHN0ci5jaGFyQXQoaSArIDEpIHx8ICcnO1xuICAgICAgICB2YXIgc3BlY2lhbENvbWVzTmV4dCA9IChuICYmIHNwZWNpYWxzLmluZGV4T2YobikgIT0gLTEpO1xuICAgICAgICBpZiAoZXNjYXBlTmV4dENoYXIpIHtcbiAgICAgICAgICAgIGlmIChjICE9PSAnXFxcXCcgfHwgIXNwZWNpYWxDb21lc05leHQpIHtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChuICYmIHVuZXNjYXBlLmluZGV4T2YobikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlY2lhbENvbWVzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc3BlY2lhbENvbWVzTmV4dCB8fCBuID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxDb21lc05leHQgJiYgbiAhPT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dC5wdXNoKCdcXFxcJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQuam9pbignJyk7XG59XG52YXIgY2hhclVuZXNjYXBlcyA9IHsgJ1xcXFxuJzogJ1xcbicsICdcXFxccic6ICdcXHInLCAnXFxcXHQnOiAnXFx0JyB9O1xuZnVuY3Rpb24gdHJhbnNsYXRlUmVnZXhSZXBsYWNlKHN0cikge1xuICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gLTE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpIHx8ICcnO1xuICAgICAgICB2YXIgbiA9IHN0ci5jaGFyQXQoaSArIDEpIHx8ICcnO1xuICAgICAgICBpZiAoY2hhclVuZXNjYXBlc1tjICsgbl0pIHtcbiAgICAgICAgICAgIG91dC5wdXNoKGNoYXJVbmVzY2FwZXNbYyArIG5dKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlc2NhcGVOZXh0Q2hhcikge1xuICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGMgPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoKGlzTnVtYmVyKG4pIHx8IG4gPT09ICckJykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goJyQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobiAhPT0gJy8nICYmIG4gIT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgICAgICBvdXQucHVzaCgnXFxcXCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjID09PSAnJCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goJyQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICAgICAgaWYgKG4gPT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgICBvdXQucHVzaCgnXFxcXCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xufVxudmFyIHVuZXNjYXBlcyA9IHsgJ1xcXFwvJzogJy8nLCAnXFxcXFxcXFwnOiAnXFxcXCcsICdcXFxcbic6ICdcXG4nLCAnXFxcXHInOiAnXFxyJywgJ1xcXFx0JzogJ1xcdCcsICdcXFxcJic6ICcmJyB9O1xuZnVuY3Rpb24gdW5lc2NhcGVSZWdleFJlcGxhY2Uoc3RyKSB7XG4gICAgdmFyIHN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShzdHIpO1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICB3aGlsZSAoIXN0cmVhbS5lb2woKSkge1xuICAgICAgICB3aGlsZSAoc3RyZWFtLnBlZWsoKSAmJiBzdHJlYW0ucGVlaygpICE9ICdcXFxcJykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goc3RyZWFtLm5leHQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgbWF0Y2hlciBpbiB1bmVzY2FwZXMpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2gobWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh1bmVzY2FwZXNbbWF0Y2hlcl0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2hlZCkge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goc3RyZWFtLm5leHQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIHBhcnNlUXVlcnkocXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSkge1xuICAgIHZhciBsYXN0U2VhcmNoUmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJy8nKTtcbiAgICBsYXN0U2VhcmNoUmVnaXN0ZXIuc2V0VGV4dChxdWVyeSk7XG4gICAgaWYgKHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG4gICAgdmFyIHNsYXNoZXMgPSBmaW5kVW5lc2NhcGVkU2xhc2hlcyhxdWVyeSk7XG4gICAgdmFyIHJlZ2V4UGFydDtcbiAgICB2YXIgZm9yY2VJZ25vcmVDYXNlO1xuICAgIGlmICghc2xhc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgcmVnZXhQYXJ0ID0gcXVlcnk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZWdleFBhcnQgPSBxdWVyeS5zdWJzdHJpbmcoMCwgc2xhc2hlc1swXSk7XG4gICAgICAgIHZhciBmbGFnc1BhcnQgPSBxdWVyeS5zdWJzdHJpbmcoc2xhc2hlc1swXSk7XG4gICAgICAgIGZvcmNlSWdub3JlQ2FzZSA9IChmbGFnc1BhcnQuaW5kZXhPZignaScpICE9IC0xKTtcbiAgICB9XG4gICAgaWYgKCFyZWdleFBhcnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghZ2V0T3B0aW9uKCdwY3JlJykpIHtcbiAgICAgICAgcmVnZXhQYXJ0ID0gdHJhbnNsYXRlUmVnZXgocmVnZXhQYXJ0KTtcbiAgICB9XG4gICAgaWYgKHNtYXJ0Q2FzZSkge1xuICAgICAgICBpZ25vcmVDYXNlID0gKC9eW15BLVpdKiQvKS50ZXN0KHJlZ2V4UGFydCk7XG4gICAgfVxuICAgIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKHJlZ2V4UGFydCwgKGlnbm9yZUNhc2UgfHwgZm9yY2VJZ25vcmVDYXNlKSA/ICdpbScgOiAnbScpO1xuICAgIHJldHVybiByZWdleHA7XG59XG5mdW5jdGlvbiBkb20obikge1xuICAgIGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycpXG4gICAgICAgIG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG4pO1xuICAgIGZvciAodmFyIGEsIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghKGEgPSBhcmd1bWVudHNbaV0pKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmICh0eXBlb2YgYSAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgICBhID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYSk7XG4gICAgICAgIGlmIChhLm5vZGVUeXBlKVxuICAgICAgICAgICAgbi5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBrZXkpKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5WzBdID09PSAnJCcpXG4gICAgICAgICAgICAgICAgICAgIG4uc3R5bGVba2V5LnNsaWNlKDEpXSA9IGFba2V5XTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG4uc2V0QXR0cmlidXRlKGtleSwgYVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG5mdW5jdGlvbiBzaG93Q29uZmlybShjbSwgdGVtcGxhdGUpIHtcbiAgICB2YXIgcHJlID0gZG9tKCdkaXYnLCB7ICRjb2xvcjogJ3JlZCcsICR3aGl0ZVNwYWNlOiAncHJlJywgY2xhc3M6ICdjbS12aW0tbWVzc2FnZScgfSwgdGVtcGxhdGUpO1xuICAgIGlmIChjbS5vcGVuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGNtLm9wZW5Ob3RpZmljYXRpb24ocHJlLCB7IGJvdHRvbTogdHJ1ZSwgZHVyYXRpb246IDUwMDAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbGVydChwcmUuaW5uZXJUZXh0KTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlUHJvbXB0KHByZWZpeCwgZGVzYykge1xuICAgIHJldHVybiBkb20oZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLCBkb20oJ3NwYW4nLCB7ICRmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgJHdoaXRlU3BhY2U6ICdwcmUnIH0sIHByZWZpeCwgZG9tKCdpbnB1dCcsIHsgdHlwZTogJ3RleHQnLCBhdXRvY29ycmVjdDogJ29mZicsXG4gICAgICAgIGF1dG9jYXBpdGFsaXplOiAnb2ZmJywgc3BlbGxjaGVjazogJ2ZhbHNlJyB9KSksIGRlc2MgJiYgZG9tKCdzcGFuJywgeyAkY29sb3I6ICcjODg4JyB9LCBkZXNjKSk7XG59XG5mdW5jdGlvbiBzaG93UHJvbXB0KGNtLCBvcHRpb25zKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gbWFrZVByb21wdChvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5kZXNjKTtcbiAgICBpZiAoY20ub3BlbkRpYWxvZykge1xuICAgICAgICBjbS5vcGVuRGlhbG9nKHRlbXBsYXRlLCBvcHRpb25zLm9uQ2xvc2UsIHtcbiAgICAgICAgICAgIG9uS2V5RG93bjogb3B0aW9ucy5vbktleURvd24sIG9uS2V5VXA6IG9wdGlvbnMub25LZXlVcCxcbiAgICAgICAgICAgIGJvdHRvbTogdHJ1ZSwgc2VsZWN0VmFsdWVPbk9wZW46IGZhbHNlLCB2YWx1ZTogb3B0aW9ucy52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBzaG9ydFRleHQgPSAnJztcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnByZWZpeCAhPSBcInN0cmluZ1wiICYmIG9wdGlvbnMucHJlZml4KVxuICAgICAgICAgICAgc2hvcnRUZXh0ICs9IG9wdGlvbnMucHJlZml4LnRleHRDb250ZW50O1xuICAgICAgICBpZiAob3B0aW9ucy5kZXNjKVxuICAgICAgICAgICAgc2hvcnRUZXh0ICs9IFwiIFwiICsgb3B0aW9ucy5kZXNjO1xuICAgICAgICBvcHRpb25zLm9uQ2xvc2UocHJvbXB0KHNob3J0VGV4dCwgJycpKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZWdleEVxdWFsKHIxLCByMikge1xuICAgIGlmIChyMSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByMiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICB2YXIgcHJvcHMgPSBbJ2dsb2JhbCcsICdtdWx0aWxpbmUnLCAnaWdub3JlQ2FzZScsICdzb3VyY2UnXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgIGlmIChyMVtwcm9wXSAhPT0gcjJbcHJvcF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCByYXdRdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKSB7XG4gICAgaWYgKCFyYXdRdWVyeSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICB2YXIgcXVlcnkgPSBwYXJzZVF1ZXJ5KHJhd1F1ZXJ5LCAhIWlnbm9yZUNhc2UsICEhc21hcnRDYXNlKTtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGlnaGxpZ2h0U2VhcmNoTWF0Y2hlcyhjbSwgcXVlcnkpO1xuICAgIGlmIChyZWdleEVxdWFsKHF1ZXJ5LCBzdGF0ZS5nZXRRdWVyeSgpKSkge1xuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIHN0YXRlLnNldFF1ZXJ5KHF1ZXJ5KTtcbiAgICByZXR1cm4gcXVlcnk7XG59XG5mdW5jdGlvbiBzZWFyY2hPdmVybGF5KHF1ZXJ5KSB7XG4gICAgaWYgKHF1ZXJ5LnNvdXJjZS5jaGFyQXQoMCkgPT0gJ14nKSB7XG4gICAgICAgIHZhciBtYXRjaFNvbCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuOiBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hTb2wgJiYgIXN0cmVhbS5zb2woKSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBzdHJlYW0ubWF0Y2gocXVlcnksIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFswXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlYXJjaGluZyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcXVlcnkuZXhlYyhzdHJlYW0ubmV4dCgpICsgbWF0Y2hbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyZWFtLm1hdGNoKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NlYXJjaGluZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoIXN0cmVhbS5lb2woKSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChxdWVyeSwgZmFsc2UpKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgfTtcbn1cbnZhciBoaWdobGlnaHRUaW1lb3V0ID0gMDtcbmZ1bmN0aW9uIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KSB7XG4gICAgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodFRpbWVvdXQpO1xuICAgIGhpZ2hsaWdodFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFjbS5zdGF0ZS52aW0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBzZWFyY2hTdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBzZWFyY2hTdGF0ZS5nZXRPdmVybGF5KCk7XG4gICAgICAgIGlmICghb3ZlcmxheSB8fCBxdWVyeSAhPSBvdmVybGF5LnF1ZXJ5KSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxheSkge1xuICAgICAgICAgICAgICAgIGNtLnJlbW92ZU92ZXJsYXkob3ZlcmxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVybGF5ID0gc2VhcmNoT3ZlcmxheShxdWVyeSk7XG4gICAgICAgICAgICBjbS5hZGRPdmVybGF5KG92ZXJsYXkpO1xuICAgICAgICAgICAgaWYgKGNtLnNob3dNYXRjaGVzT25TY3JvbGxiYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoU3RhdGUuZ2V0U2Nyb2xsYmFyQW5ub3RhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hTdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlYXJjaFN0YXRlLnNldFNjcm9sbGJhckFubm90YXRlKGNtLnNob3dNYXRjaGVzT25TY3JvbGxiYXIocXVlcnkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFN0YXRlLnNldE92ZXJsYXkob3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9LCA1MCk7XG59XG5mdW5jdGlvbiBmaW5kTmV4dChjbSwgcHJldiwgcXVlcnksIHJlcGVhdCkge1xuICAgIGlmIChyZXBlYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXBlYXQgPSAxO1xuICAgIH1cbiAgICByZXR1cm4gY20ub3BlcmF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvcyA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LCBwb3MpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICAgIGlmIChpID09IDAgJiYgZm91bmQgJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgcG9zKSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0RW5kUG9zID0gcHJldiA/IGN1cnNvci5mcm9tKCkgOiBjdXJzb3IudG8oKTtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgICAgICAgIGlmIChmb3VuZCAmJiAhZm91bmRbMF0gJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgbGFzdEVuZFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNtLmdldExpbmUobGFzdEVuZFBvcy5saW5lKS5sZW5ndGggPT0gbGFzdEVuZFBvcy5jaClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gY3Vyc29yLmZpbmQocHJldik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgKHByZXYpID8gbmV3IFBvcyhjbS5sYXN0TGluZSgpKSA6IG5ldyBQb3MoY20uZmlyc3RMaW5lKCksIDApKTtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnNvci5maW5kKHByZXYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnNvci5mcm9tKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaW5kTmV4dEZyb21BbmRUb0luY2x1c2l2ZShjbSwgcHJldiwgcXVlcnksIHJlcGVhdCwgdmltKSB7XG4gICAgaWYgKHJlcGVhdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlcGVhdCA9IDE7XG4gICAgfVxuICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9zID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksIHBvcyk7XG4gICAgICAgIHZhciBmb3VuZCA9IGN1cnNvci5maW5kKCFwcmV2KTtcbiAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSAmJiBmb3VuZCAmJiBjdXJzb3JFcXVhbChjdXJzb3IuZnJvbSgpLCBwb3MpKSB7XG4gICAgICAgICAgICBjdXJzb3IuZmluZCghcHJldik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgICAgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksIChwcmV2KSA/IG5ldyBQb3MoY20ubGFzdExpbmUoKSkgOiBuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IuZmluZChwcmV2KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbY3Vyc29yLmZyb20oKSwgY3Vyc29yLnRvKCldO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pIHtcbiAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgY20ucmVtb3ZlT3ZlcmxheShnZXRTZWFyY2hTdGF0ZShjbSkuZ2V0T3ZlcmxheSgpKTtcbiAgICBzdGF0ZS5zZXRPdmVybGF5KG51bGwpO1xuICAgIGlmIChzdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpKSB7XG4gICAgICAgIHN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkuY2xlYXIoKTtcbiAgICAgICAgc3RhdGUuc2V0U2Nyb2xsYmFyQW5ub3RhdGUobnVsbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNJblJhbmdlKHBvcywgc3RhcnQsIGVuZCkge1xuICAgIGlmICh0eXBlb2YgcG9zICE9ICdudW1iZXInKSB7XG4gICAgICAgIHBvcyA9IHBvcy5saW5lO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gaW5BcnJheShwb3MsIHN0YXJ0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gKHBvcyA+PSBzdGFydCAmJiBwb3MgPD0gZW5kKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwb3MgPT0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRVc2VyVmlzaWJsZUxpbmVzKGNtKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gY20uYWNlLnJlbmRlcmVyO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVuZGVyZXIuZ2V0Rmlyc3RGdWxseVZpc2libGVSb3coKSxcbiAgICAgICAgYm90dG9tOiByZW5kZXJlci5nZXRMYXN0RnVsbHlWaXNpYmxlUm93KClcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0TWFya1BvcyhjbSwgdmltLCBtYXJrTmFtZSkge1xuICAgIGlmIChtYXJrTmFtZSA9PSAnXFwnJyB8fCBtYXJrTmFtZSA9PSAnYCcpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0LmZpbmQoY20sIC0xKSB8fCBuZXcgUG9zKDAsIDApO1xuICAgIH1cbiAgICBlbHNlIGlmIChtYXJrTmFtZSA9PSAnLicpIHtcbiAgICAgICAgcmV0dXJuIGdldExhc3RFZGl0UG9zKGNtKTtcbiAgICB9XG4gICAgdmFyIG1hcmsgPSB2aW0ubWFya3NbbWFya05hbWVdO1xuICAgIHJldHVybiBtYXJrICYmIG1hcmsuZmluZCgpO1xufVxuZnVuY3Rpb24gZ2V0TGFzdEVkaXRQb3MoY20pIHtcbiAgICB2YXIgdW5kb01hbmFnZXIgPSBjbS5hY2Uuc2Vzc2lvbi4kdW5kb01hbmFnZXI7XG4gICAgaWYgKHVuZG9NYW5hZ2VyICYmIHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGEpXG4gICAgICAgIHJldHVybiB0b0NtUG9zKHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGEuZW5kKTtcbn1cbnZhciBFeENvbW1hbmREaXNwYXRjaGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYnVpbGRDb21tYW5kTWFwXygpO1xufTtcbkV4Q29tbWFuZERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuICAgIHByb2Nlc3NDb21tYW5kOiBmdW5jdGlvbiAoY20sIGlucHV0LCBvcHRfcGFyYW1zKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNtLmN1ck9wLmlzVmltT3AgPSB0cnVlO1xuICAgICAgICAgICAgdGhhdC5fcHJvY2Vzc0NvbW1hbmQoY20sIGlucHV0LCBvcHRfcGFyYW1zKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBfcHJvY2Vzc0NvbW1hbmQ6IGZ1bmN0aW9uIChjbSwgaW5wdXQsIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJzonKTtcbiAgICAgICAgdmFyIHByZXZpb3VzQ29tbWFuZCA9IGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlucHV0U3RyZWFtID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKGlucHV0KTtcbiAgICAgICAgY29tbWFuZEhpc3RvcnlSZWdpc3Rlci5zZXRUZXh0KGlucHV0KTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IG9wdF9wYXJhbXMgfHwge307XG4gICAgICAgIHBhcmFtcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5wYXJzZUlucHV0XyhjbSwgaW5wdXRTdHJlYW0sIHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCBlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29tbWFuZDtcbiAgICAgICAgdmFyIGNvbW1hbmROYW1lO1xuICAgICAgICBpZiAoIXBhcmFtcy5jb21tYW5kTmFtZSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5saW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kTmFtZSA9ICdtb3ZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSB0aGlzLm1hdGNoQ29tbWFuZF8ocGFyYW1zLmNvbW1hbmROYW1lKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZE5hbWUgPSBjb21tYW5kLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQuZXhjbHVkZUZyb21Db21tYW5kSGlzdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kSGlzdG9yeVJlZ2lzdGVyLnNldFRleHQocHJldmlvdXNDb21tYW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbW1hbmRBcmdzXyhpbnB1dFN0cmVhbSwgcGFyYW1zLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09ICdleFRvS2V5Jykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmQudG9LZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aW1BcGkuaGFuZGxlS2V5KGNtLCBjb21tYW5kLnRvS2V5c1tpXSwgJ21hcHBpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PSAnZXhUb0V4Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLnRvSW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29tbWFuZE5hbWUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm90IGFuIGVkaXRvciBjb21tYW5kIFwiOicgKyBpbnB1dCArICdcIicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBleENvbW1hbmRzW2NvbW1hbmROYW1lXShjbSwgcGFyYW1zKTtcbiAgICAgICAgICAgIGlmICgoIWNvbW1hbmQgfHwgIWNvbW1hbmQucG9zc2libHlBc3luYykgJiYgcGFyYW1zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCBlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGFyc2VJbnB1dF86IGZ1bmN0aW9uIChjbSwgaW5wdXRTdHJlYW0sIHJlc3VsdCkge1xuICAgICAgICBpbnB1dFN0cmVhbS5lYXRXaGlsZSgnOicpO1xuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZWF0KCclJykpIHtcbiAgICAgICAgICAgIHJlc3VsdC5saW5lID0gY20uZmlyc3RMaW5lKCk7XG4gICAgICAgICAgICByZXN1bHQubGluZUVuZCA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQubGluZSA9IHRoaXMucGFyc2VMaW5lU3BlY18oY20sIGlucHV0U3RyZWFtKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQubGluZSAhPT0gdW5kZWZpbmVkICYmIGlucHV0U3RyZWFtLmVhdCgnLCcpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmxpbmVFbmQgPSB0aGlzLnBhcnNlTGluZVNwZWNfKGNtLCBpbnB1dFN0cmVhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbW1hbmRNYXRjaCA9IGlucHV0U3RyZWFtLm1hdGNoKC9eKFxcdyt8ISF8QEB8WyEjJio8PT5Afl0pLyk7XG4gICAgICAgIGlmIChjb21tYW5kTWF0Y2gpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb21tYW5kTmFtZSA9IGNvbW1hbmRNYXRjaFsxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5jb21tYW5kTmFtZSA9IGlucHV0U3RyZWFtLm1hdGNoKC8uKi8pWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBwYXJzZUxpbmVTcGVjXzogZnVuY3Rpb24gKGNtLCBpbnB1dFN0cmVhbSkge1xuICAgICAgICB2YXIgbnVtYmVyTWF0Y2ggPSBpbnB1dFN0cmVhbS5tYXRjaCgvXihcXGQrKS8pO1xuICAgICAgICBpZiAobnVtYmVyTWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1iZXJNYXRjaFsxXSwgMTApIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGlucHV0U3RyZWFtLm5leHQoKSkge1xuICAgICAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmdldEN1cnNvcigpLmxpbmUpO1xuICAgICAgICAgICAgY2FzZSAnJCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmxhc3RMaW5lKCkpO1xuICAgICAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICAgICAgICB2YXIgbWFya05hbWUgPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG1hcmtQb3MgPSBnZXRNYXJrUG9zKGNtLCBjbS5zdGF0ZS52aW0sIG1hcmtOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1hcmtQb3MpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFyayBub3Qgc2V0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIG1hcmtQb3MubGluZSk7XG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgICAgICAgIGlucHV0U3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlucHV0U3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJzZUxpbmVTcGVjT2Zmc2V0XzogZnVuY3Rpb24gKGlucHV0U3RyZWFtLCBsaW5lKSB7XG4gICAgICAgIHZhciBvZmZzZXRNYXRjaCA9IGlucHV0U3RyZWFtLm1hdGNoKC9eKFsrLV0pPyhcXGQrKS8pO1xuICAgICAgICBpZiAob2Zmc2V0TWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBwYXJzZUludChvZmZzZXRNYXRjaFsyXSwgMTApO1xuICAgICAgICAgICAgaWYgKG9mZnNldE1hdGNoWzFdID09IFwiLVwiKSB7XG4gICAgICAgICAgICAgICAgbGluZSAtPSBvZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaW5lICs9IG9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9LFxuICAgIHBhcnNlQ29tbWFuZEFyZ3NfOiBmdW5jdGlvbiAoaW5wdXRTdHJlYW0sIHBhcmFtcywgY29tbWFuZCkge1xuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwYXJhbXMuYXJnU3RyaW5nID0gaW5wdXRTdHJlYW0ubWF0Y2goLy4qLylbMF07XG4gICAgICAgIHZhciBkZWxpbSA9IGNvbW1hbmQuYXJnRGVsaW1pdGVyIHx8IC9cXHMrLztcbiAgICAgICAgdmFyIGFyZ3MgPSB0cmltKHBhcmFtcy5hcmdTdHJpbmcpLnNwbGl0KGRlbGltKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoICYmIGFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcmdzID0gYXJncztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWF0Y2hDb21tYW5kXzogZnVuY3Rpb24gKGNvbW1hbmROYW1lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBjb21tYW5kTmFtZS5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBjb21tYW5kTmFtZS5zdWJzdHJpbmcoMCwgaSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb21tYW5kTWFwX1twcmVmaXhdKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRNYXBfW3ByZWZpeF07XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQubmFtZS5pbmRleE9mKGNvbW1hbmROYW1lKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBidWlsZENvbW1hbmRNYXBfOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZE1hcF8gPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWZhdWx0RXhDb21tYW5kTWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IGRlZmF1bHRFeENvbW1hbmRNYXBbaV07XG4gICAgICAgICAgICB2YXIga2V5ID0gY29tbWFuZC5zaG9ydE5hbWUgfHwgY29tbWFuZC5uYW1lO1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kTWFwX1trZXldID0gY29tbWFuZDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbiAobGhzLCByaHMsIGN0eCkge1xuICAgICAgICBpZiAobGhzICE9ICc6JyAmJiBsaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdNb2RlIG5vdCBzdXBwb3J0ZWQgZm9yIGV4IG1hcHBpbmdzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBsaHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgaWYgKHJocyAhPSAnOicgJiYgcmhzLmNoYXJBdCgwKSA9PSAnOicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29tbWFuZE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdleFRvRXgnLFxuICAgICAgICAgICAgICAgICAgICB0b0lucHV0OiByaHMuc3Vic3RyaW5nKDEpLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiB0cnVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21tYW5kTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2V4VG9LZXknLFxuICAgICAgICAgICAgICAgICAgICB0b0tleXM6IHJocyxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocmhzICE9ICc6JyAmJiByaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgICAgICAgIHZhciBtYXBwaW5nID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlzOiBsaHMsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdrZXlUb0V4JyxcbiAgICAgICAgICAgICAgICAgICAgZXhBcmdzOiB7IGlucHV0OiByaHMuc3Vic3RyaW5nKDEpIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwcGluZy5jb250ZXh0ID0gY3R4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0S2V5bWFwLnVuc2hpZnQobWFwcGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFwcGluZyA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5czogbGhzLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAna2V5VG9LZXknLFxuICAgICAgICAgICAgICAgICAgICB0b0tleXM6IHJoc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgICAgICAgICBtYXBwaW5nLmNvbnRleHQgPSBjdHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHRLZXltYXAudW5zaGlmdChtYXBwaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdW5tYXA6IGZ1bmN0aW9uIChsaHMsIGN0eCkge1xuICAgICAgICBpZiAobGhzICE9ICc6JyAmJiBsaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdNb2RlIG5vdCBzdXBwb3J0ZWQgZm9yIGV4IG1hcHBpbmdzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBsaHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdICYmIHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdLnVzZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IGxocztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVmYXVsdEtleW1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzID09IGRlZmF1bHRLZXltYXBbaV0ua2V5c1xuICAgICAgICAgICAgICAgICAgICAmJiBkZWZhdWx0S2V5bWFwW2ldLmNvbnRleHQgPT09IGN0eCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0S2V5bWFwLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbnZhciBleENvbW1hbmRzID0ge1xuICAgIGNvbG9yc2NoZW1lOiBmdW5jdGlvbiAoY20sIHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcy5hcmdzIHx8IHBhcmFtcy5hcmdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCBjbS5nZXRPcHRpb24oJ3RoZW1lJykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldE9wdGlvbigndGhlbWUnLCBwYXJhbXMuYXJnc1swXSk7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uIChjbSwgcGFyYW1zLCBjdHgpIHtcbiAgICAgICAgdmFyIG1hcEFyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgaWYgKCFtYXBBcmdzIHx8IG1hcEFyZ3MubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgaWYgKGNtKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIG1hcHBpbmc6ICcgKyBwYXJhbXMuaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIubWFwKG1hcEFyZ3NbMF0sIG1hcEFyZ3NbMV0sIGN0eCk7XG4gICAgfSxcbiAgICBpbWFwOiBmdW5jdGlvbiAoY20sIHBhcmFtcykgeyB0aGlzLm1hcChjbSwgcGFyYW1zLCAnaW5zZXJ0Jyk7IH0sXG4gICAgbm1hcDogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ25vcm1hbCcpOyB9LFxuICAgIHZtYXA6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICd2aXN1YWwnKTsgfSxcbiAgICB1bm1hcDogZnVuY3Rpb24gKGNtLCBwYXJhbXMsIGN0eCkge1xuICAgICAgICB2YXIgbWFwQXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICBpZiAoIW1hcEFyZ3MgfHwgbWFwQXJncy5sZW5ndGggPCAxIHx8ICFleENvbW1hbmREaXNwYXRjaGVyLnVubWFwKG1hcEFyZ3NbMF0sIGN0eCkpIHtcbiAgICAgICAgICAgIGlmIChjbSkge1xuICAgICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gc3VjaCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGNtLnN0YXRlLnZpbSwge1xuICAgICAgICAgICAgdHlwZTogJ21vdGlvbicsXG4gICAgICAgICAgICBtb3Rpb246ICdtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudCcsXG4gICAgICAgICAgICBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW5ld2lzZTogdHJ1ZSB9LFxuICAgICAgICAgICAgcmVwZWF0T3ZlcnJpZGU6IHBhcmFtcy5saW5lICsgMVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHNldEFyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgdmFyIHNldENmZyA9IHBhcmFtcy5zZXRDZmcgfHwge307XG4gICAgICAgIGlmICghc2V0QXJncyB8fCBzZXRBcmdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGlmIChjbSkge1xuICAgICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXhwciA9IHNldEFyZ3NbMF0uc3BsaXQoJz0nKTtcbiAgICAgICAgdmFyIG9wdGlvbk5hbWUgPSBleHByWzBdO1xuICAgICAgICB2YXIgdmFsdWUgPSBleHByWzFdO1xuICAgICAgICB2YXIgZm9yY2VHZXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9wdGlvbk5hbWUuY2hhckF0KG9wdGlvbk5hbWUubGVuZ3RoIC0gMSkgPT0gJz8nKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignVHJhaWxpbmcgY2hhcmFjdGVyczogJyArIHBhcmFtcy5hcmdTdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDAsIG9wdGlvbk5hbWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBmb3JjZUdldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgb3B0aW9uTmFtZS5zdWJzdHJpbmcoMCwgMikgPT0gJ25vJykge1xuICAgICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3B0aW9uSXNCb29sZWFuID0gb3B0aW9uc1tvcHRpb25OYW1lXSAmJiBvcHRpb25zW29wdGlvbk5hbWVdLnR5cGUgPT0gJ2Jvb2xlYW4nO1xuICAgICAgICBpZiAob3B0aW9uSXNCb29sZWFuICYmIHZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW9uSXNCb29sZWFuICYmIHZhbHVlID09PSB1bmRlZmluZWQgfHwgZm9yY2VHZXQpIHtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IGdldE9wdGlvbihvcHRpb25OYW1lLCBjbSwgc2V0Q2ZnKTtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sIG9sZFZhbHVlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkVmFsdWUgPT09IHRydWUgfHwgb2xkVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICcgJyArIChvbGRWYWx1ZSA/ICcnIDogJ25vJykgKyBvcHRpb25OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnICAnICsgb3B0aW9uTmFtZSArICc9JyArIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzZXRPcHRpb25SZXR1cm4gPSBzZXRPcHRpb24ob3B0aW9uTmFtZSwgdmFsdWUsIGNtLCBzZXRDZmcpO1xuICAgICAgICAgICAgaWYgKHNldE9wdGlvblJldHVybiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sIHNldE9wdGlvblJldHVybi5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0bG9jYWw6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcy5zZXRDZmcgPSB7IHNjb3BlOiAnbG9jYWwnIH07XG4gICAgICAgIHRoaXMuc2V0KGNtLCBwYXJhbXMpO1xuICAgIH0sXG4gICAgc2V0Z2xvYmFsOiBmdW5jdGlvbiAoY20sIHBhcmFtcykge1xuICAgICAgICBwYXJhbXMuc2V0Q2ZnID0geyBzY29wZTogJ2dsb2JhbCcgfTtcbiAgICAgICAgdGhpcy5zZXQoY20sIHBhcmFtcyk7XG4gICAgfSxcbiAgICByZWdpc3RlcnM6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciByZWdBcmdzID0gcGFyYW1zLmFyZ3M7XG4gICAgICAgIHZhciByZWdpc3RlcnMgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucmVnaXN0ZXJzO1xuICAgICAgICB2YXIgcmVnSW5mbyA9ICctLS0tLS0tLS0tUmVnaXN0ZXJzLS0tLS0tLS0tLVxcblxcbic7XG4gICAgICAgIGlmICghcmVnQXJncykge1xuICAgICAgICAgICAgZm9yICh2YXIgcmVnaXN0ZXJOYW1lIGluIHJlZ2lzdGVycykge1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gcmVnaXN0ZXJzW3JlZ2lzdGVyTmFtZV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnSW5mbyArPSAnXCInICsgcmVnaXN0ZXJOYW1lICsgJyAgICAnICsgdGV4dCArICdcXG4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZWdpc3Rlck5hbWU7XG4gICAgICAgICAgICByZWdBcmdzID0gcmVnQXJncy5qb2luKCcnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVnQXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyTmFtZSA9IHJlZ0FyZ3MuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmICghdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcmVnaXN0ZXIgPSByZWdpc3RlcnNbcmVnaXN0ZXJOYW1lXSB8fCBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICByZWdJbmZvICs9ICdcIicgKyByZWdpc3Rlck5hbWUgKyAnICAgICcgKyByZWdpc3Rlci50b1N0cmluZygpICsgJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hvd0NvbmZpcm0oY20sIHJlZ0luZm8pO1xuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHJldmVyc2UsIGlnbm9yZUNhc2UsIHVuaXF1ZSwgbnVtYmVyLCBwYXR0ZXJuO1xuICAgICAgICBmdW5jdGlvbiBwYXJzZUFyZ3MoKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmFyZ1N0cmluZykge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKHBhcmFtcy5hcmdTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmVhdCgnIScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldmVyc2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXJncy5lb2woKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYXJncy5lYXRTcGFjZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnSW52YWxpZCBhcmd1bWVudHMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3MubWF0Y2goLyhbZGludW94XSspP1xccyooXFwvLitcXC8pP1xccyovKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMgJiYgIWFyZ3MuZW9sKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdJbnZhbGlkIGFyZ3VtZW50cyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlnbm9yZUNhc2UgPSBvcHRzWzFdLmluZGV4T2YoJ2knKSAhPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlID0gb3B0c1sxXS5pbmRleE9mKCd1JykgIT0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNpbWFsID0gb3B0c1sxXS5pbmRleE9mKCdkJykgIT0gLTEgfHwgb3B0c1sxXS5pbmRleE9mKCduJykgIT0gLTEgJiYgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhleCA9IG9wdHNbMV0uaW5kZXhPZigneCcpICE9IC0xICYmIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvY3RhbCA9IG9wdHNbMV0uaW5kZXhPZignbycpICE9IC0xICYmIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWNpbWFsICsgaGV4ICsgb2N0YWwgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYXJndW1lbnRzJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBkZWNpbWFsICYmICdkZWNpbWFsJyB8fCBoZXggJiYgJ2hleCcgfHwgb2N0YWwgJiYgJ29jdGFsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9wdHNbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybiA9IG5ldyBSZWdFeHAob3B0c1syXS5zdWJzdHIoMSwgb3B0c1syXS5sZW5ndGggLSAyKSwgaWdub3JlQ2FzZSA/ICdpJyA6ICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVyciA9IHBhcnNlQXJncygpO1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgZXJyICsgJzogJyArIHBhcmFtcy5hcmdTdHJpbmcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lU3RhcnQgPSBwYXJhbXMubGluZSB8fCBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBwYXJhbXMubGluZUVuZCB8fCBwYXJhbXMubGluZSB8fCBjbS5sYXN0TGluZSgpO1xuICAgICAgICBpZiAobGluZVN0YXJ0ID09IGxpbmVFbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyU3RhcnQgPSBuZXcgUG9zKGxpbmVTdGFydCwgMCk7XG4gICAgICAgIHZhciBjdXJFbmQgPSBuZXcgUG9zKGxpbmVFbmQsIGxpbmVMZW5ndGgoY20sIGxpbmVFbmQpKTtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciBudW1iZXJSZWdleCA9IHBhdHRlcm4gPyBwYXR0ZXJuIDpcbiAgICAgICAgICAgIChudW1iZXIgPT0gJ2RlY2ltYWwnKSA/IC8oLT8pKFtcXGRdKykvIDpcbiAgICAgICAgICAgICAgICAobnVtYmVyID09ICdoZXgnKSA/IC8oLT8pKD86MHgpPyhbMC05YS1mXSspL2kgOlxuICAgICAgICAgICAgICAgICAgICAobnVtYmVyID09ICdvY3RhbCcpID8gLyhbMC03XSspLyA6IG51bGw7XG4gICAgICAgIHZhciByYWRpeCA9IChudW1iZXIgPT0gJ2RlY2ltYWwnKSA/IDEwIDogKG51bWJlciA9PSAnaGV4JykgPyAxNiA6IChudW1iZXIgPT0gJ29jdGFsJykgPyA4IDogbnVsbDtcbiAgICAgICAgdmFyIG51bVBhcnQgPSBbXSwgdGV4dFBhcnQgPSBbXTtcbiAgICAgICAgaWYgKG51bWJlciB8fCBwYXR0ZXJuKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hQYXJ0ID0gcGF0dGVybiA/IHRleHRbaV0ubWF0Y2gocGF0dGVybikgOiBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFBhcnQgJiYgbWF0Y2hQYXJ0WzBdICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVBhcnQucHVzaChtYXRjaFBhcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghcGF0dGVybiAmJiBudW1iZXJSZWdleC5leGVjKHRleHRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVBhcnQucHVzaCh0ZXh0W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRQYXJ0LnB1c2godGV4dFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dFBhcnQgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmVGbihhLCBiKSB7XG4gICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgIHZhciB0bXA7XG4gICAgICAgICAgICAgICAgdG1wID0gYTtcbiAgICAgICAgICAgICAgICBhID0gYjtcbiAgICAgICAgICAgICAgICBiID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgICAgICBhID0gYS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGIgPSBiLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYW51bSA9IG51bWJlciAmJiBudW1iZXJSZWdleC5leGVjKGEpO1xuICAgICAgICAgICAgdmFyIGJudW0gPSBudW1iZXIgJiYgbnVtYmVyUmVnZXguZXhlYyhiKTtcbiAgICAgICAgICAgIGlmICghYW51bSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFudW0gPSBwYXJzZUludCgoYW51bVsxXSArIGFudW1bMl0pLnRvTG93ZXJDYXNlKCksIHJhZGl4KTtcbiAgICAgICAgICAgIGJudW0gPSBwYXJzZUludCgoYm51bVsxXSArIGJudW1bMl0pLnRvTG93ZXJDYXNlKCksIHJhZGl4KTtcbiAgICAgICAgICAgIHJldHVybiBhbnVtIC0gYm51bTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjb21wYXJlUGF0dGVybkZuKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcDtcbiAgICAgICAgICAgICAgICB0bXAgPSBhO1xuICAgICAgICAgICAgICAgIGEgPSBiO1xuICAgICAgICAgICAgICAgIGIgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgICAgIGFbMF0gPSBhWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgYlswXSA9IGJbMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoYVswXSA8IGJbMF0pID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIG51bVBhcnQuc29ydChwYXR0ZXJuID8gY29tcGFyZVBhdHRlcm5GbiA6IGNvbXBhcmVGbik7XG4gICAgICAgIGlmIChwYXR0ZXJuKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVBhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBudW1QYXJ0W2ldID0gbnVtUGFydFtpXS5pbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbnVtYmVyKSB7XG4gICAgICAgICAgICB0ZXh0UGFydC5zb3J0KGNvbXBhcmVGbik7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dCA9ICghcmV2ZXJzZSkgPyB0ZXh0UGFydC5jb25jYXQobnVtUGFydCkgOiBudW1QYXJ0LmNvbmNhdCh0ZXh0UGFydCk7XG4gICAgICAgIGlmICh1bmlxdWUpIHsgLy8gUmVtb3ZlIGR1cGxpY2F0ZSBsaW5lc1xuICAgICAgICAgICAgdmFyIHRleHRPbGQgPSB0ZXh0O1xuICAgICAgICAgICAgdmFyIGxhc3RMaW5lO1xuICAgICAgICAgICAgdGV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0T2xkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRPbGRbaV0gIT0gbGFzdExpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dC5wdXNoKHRleHRPbGRbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0TGluZSA9IHRleHRPbGRbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQuam9pbignXFxuJyksIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgIH0sXG4gICAgdmdsb2JhbDogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdGhpcy5nbG9iYWwoY20sIHBhcmFtcyk7XG4gICAgfSxcbiAgICBnbG9iYWw6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciBhcmdTdHJpbmcgPSBwYXJhbXMuYXJnU3RyaW5nO1xuICAgICAgICBpZiAoIWFyZ1N0cmluZykge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdSZWd1bGFyIEV4cHJlc3Npb24gbWlzc2luZyBmcm9tIGdsb2JhbCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnZlcnRlZCA9IHBhcmFtcy5jb21tYW5kTmFtZVswXSA9PT0gJ3YnO1xuICAgICAgICB2YXIgbGluZVN0YXJ0ID0gKHBhcmFtcy5saW5lICE9PSB1bmRlZmluZWQpID8gcGFyYW1zLmxpbmUgOiBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBwYXJhbXMubGluZUVuZCB8fCBwYXJhbXMubGluZSB8fCBjbS5sYXN0TGluZSgpO1xuICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXRCeVNsYXNoKGFyZ1N0cmluZyk7XG4gICAgICAgIHZhciByZWdleFBhcnQgPSBhcmdTdHJpbmcsIGNtZDtcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlZ2V4UGFydCA9IHRva2Vuc1swXTtcbiAgICAgICAgICAgIGNtZCA9IHRva2Vucy5zbGljZSgxLCB0b2tlbnMubGVuZ3RoKS5qb2luKCcvJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ2V4UGFydCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcmVnZXhQYXJ0LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgcmVnZXg6ICcgKyByZWdleFBhcnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcXVlcnkgPSBnZXRTZWFyY2hTdGF0ZShjbSkuZ2V0UXVlcnkoKTtcbiAgICAgICAgdmFyIG1hdGNoZWRMaW5lcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gbGluZVN0YXJ0OyBpIDw9IGxpbmVFbmQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGkpO1xuICAgICAgICAgICAgdmFyIG1hdGNoZWQgPSBxdWVyeS50ZXN0KGxpbmUudGV4dCk7XG4gICAgICAgICAgICBpZiAobWF0Y2hlZCAhPT0gaW52ZXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVkTGluZXMucHVzaChjbWQgPyBsaW5lIDogbGluZS50ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNtZCkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sIG1hdGNoZWRMaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIG5leHRDb21tYW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgbWF0Y2hlZExpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gbWF0Y2hlZExpbmVzW2luZGV4KytdO1xuICAgICAgICAgICAgICAgIHZhciBsaW5lTnVtID0gY20uZ2V0TGluZU51bWJlcihsaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAobGluZU51bSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDb21tYW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSAobGluZU51bSArIDEpICsgY21kO1xuICAgICAgICAgICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGNvbW1hbmQsIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IG5leHRDb21tYW5kXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5leHRDb21tYW5kKCk7XG4gICAgfSxcbiAgICBzdWJzdGl0dXRlOiBmdW5jdGlvbiAoY20sIHBhcmFtcykge1xuICAgICAgICBpZiAoIWNtLmdldFNlYXJjaEN1cnNvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWFyY2ggZmVhdHVyZSBub3QgYXZhaWxhYmxlLiBSZXF1aXJlcyBzZWFyY2hjdXJzb3IuanMgb3IgJyArXG4gICAgICAgICAgICAgICAgJ2FueSBvdGhlciBnZXRTZWFyY2hDdXJzb3IgaW1wbGVtZW50YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyZ1N0cmluZyA9IHBhcmFtcy5hcmdTdHJpbmc7XG4gICAgICAgIHZhciB0b2tlbnMgPSBhcmdTdHJpbmcgPyBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgYXJnU3RyaW5nWzBdKSA6IFtdO1xuICAgICAgICB2YXIgcmVnZXhQYXJ0LCByZXBsYWNlUGFydCA9ICcnLCB0cmFpbGluZywgZmxhZ3NQYXJ0LCBjb3VudDtcbiAgICAgICAgdmFyIGNvbmZpcm0gPSBmYWxzZTsgLy8gV2hldGhlciB0byBjb25maXJtIGVhY2ggcmVwbGFjZS5cbiAgICAgICAgdmFyIGdsb2JhbCA9IGZhbHNlOyAvLyBUcnVlIHRvIHJlcGxhY2UgYWxsIGluc3RhbmNlcyBvbiBhIGxpbmUsIGZhbHNlIHRvIHJlcGxhY2Ugb25seSAxLlxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVnZXhQYXJ0ID0gdG9rZW5zWzBdO1xuICAgICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpICYmIHJlZ2V4UGFydCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZWdleFBhcnQgPSBuZXcgUmVnRXhwKHJlZ2V4UGFydCkuc291cmNlOyAvL25vcm1hbGl6ZSBub3QgZXNjYXBlZCBjaGFyYWN0ZXJzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBsYWNlUGFydCA9IHRva2Vuc1sxXTtcbiAgICAgICAgICAgIGlmIChyZXBsYWNlUGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VQYXJ0ID0gdW5lc2NhcGVSZWdleFJlcGxhY2UocmVwbGFjZVBhcnQucmVwbGFjZSgvKFteXFxcXF0pJi9nLCBcIiQxJCQmXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VQYXJ0ID0gdHJhbnNsYXRlUmVnZXhSZXBsYWNlKHJlcGxhY2VQYXJ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdFN1YnN0aXR1dGVSZXBsYWNlUGFydCA9IHJlcGxhY2VQYXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhaWxpbmcgPSB0b2tlbnNbMl0gPyB0b2tlbnNbMl0uc3BsaXQoJyAnKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFyZ1N0cmluZyAmJiBhcmdTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdTdWJzdGl0dXRpb25zIHNob3VsZCBiZSBvZiB0aGUgZm9ybSAnICtcbiAgICAgICAgICAgICAgICAgICAgJzpzL3BhdHRlcm4vcmVwbGFjZS8nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWlsaW5nKSB7XG4gICAgICAgICAgICBmbGFnc1BhcnQgPSB0cmFpbGluZ1swXTtcbiAgICAgICAgICAgIGNvdW50ID0gcGFyc2VJbnQodHJhaWxpbmdbMV0pO1xuICAgICAgICAgICAgaWYgKGZsYWdzUGFydCkge1xuICAgICAgICAgICAgICAgIGlmIChmbGFnc1BhcnQuaW5kZXhPZignYycpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmxhZ3NQYXJ0LmluZGV4T2YoJ2cnKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZ2V0T3B0aW9uKCdwY3JlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXhQYXJ0ID0gcmVnZXhQYXJ0ICsgJy8nICsgZmxhZ3NQYXJ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXhQYXJ0ID0gcmVnZXhQYXJ0LnJlcGxhY2UoL1xcLy9nLCBcIlxcXFwvXCIpICsgJy8nICsgZmxhZ3NQYXJ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnZXhQYXJ0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCByZWdleFBhcnQsIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sIHRydWUgLyoqIHNtYXJ0Q2FzZSAqLyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCByZWdleDogJyArIHJlZ2V4UGFydCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcGxhY2VQYXJ0ID0gcmVwbGFjZVBhcnQgfHwgdmltR2xvYmFsU3RhdGUubGFzdFN1YnN0aXR1dGVSZXBsYWNlUGFydDtcbiAgICAgICAgaWYgKHJlcGxhY2VQYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gcHJldmlvdXMgc3Vic3RpdHV0ZSByZWd1bGFyIGV4cHJlc3Npb24nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBxdWVyeSA9IHN0YXRlLmdldFF1ZXJ5KCk7XG4gICAgICAgIHZhciBsaW5lU3RhcnQgPSAocGFyYW1zLmxpbmUgIT09IHVuZGVmaW5lZCkgPyBwYXJhbXMubGluZSA6IGNtLmdldEN1cnNvcigpLmxpbmU7XG4gICAgICAgIHZhciBsaW5lRW5kID0gcGFyYW1zLmxpbmVFbmQgfHwgbGluZVN0YXJ0O1xuICAgICAgICBpZiAobGluZVN0YXJ0ID09IGNtLmZpcnN0TGluZSgpICYmIGxpbmVFbmQgPT0gY20ubGFzdExpbmUoKSkge1xuICAgICAgICAgICAgbGluZUVuZCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgbGluZVN0YXJ0ID0gbGluZUVuZDtcbiAgICAgICAgICAgIGxpbmVFbmQgPSBsaW5lU3RhcnQgKyBjb3VudCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhsaW5lU3RhcnQsIDApKTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgc3RhcnRQb3MpO1xuICAgICAgICBkb1JlcGxhY2UoY20sIGNvbmZpcm0sIGdsb2JhbCwgbGluZVN0YXJ0LCBsaW5lRW5kLCBjdXJzb3IsIHF1ZXJ5LCByZXBsYWNlUGFydCwgcGFyYW1zLmNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHJlZG86IENvZGVNaXJyb3IuY29tbWFuZHMucmVkbyxcbiAgICB1bmRvOiBDb2RlTWlycm9yLmNvbW1hbmRzLnVuZG8sXG4gICAgd3JpdGU6IGZ1bmN0aW9uIChjbSkge1xuICAgICAgICBpZiAoQ29kZU1pcnJvci5jb21tYW5kcy5zYXZlKSB7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmNvbW1hbmRzLnNhdmUoY20pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNtLnNhdmUpIHtcbiAgICAgICAgICAgIGNtLnNhdmUoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbm9obHNlYXJjaDogZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgIGNsZWFyU2VhcmNoSGlnaGxpZ2h0KGNtKTtcbiAgICB9LFxuICAgIHlhbms6IGZ1bmN0aW9uIChjbSkge1xuICAgICAgICB2YXIgY3VyID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIHZhciBsaW5lID0gY3VyLmxpbmU7XG4gICAgICAgIHZhciBsaW5lVGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dCgnMCcsICd5YW5rJywgbGluZVRleHQsIHRydWUsIHRydWUpO1xuICAgIH0sXG4gICAgZGVsbWFya3M6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zLmFyZ1N0cmluZyB8fCAhdHJpbShwYXJhbXMuYXJnU3RyaW5nKSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdBcmd1bWVudCByZXF1aXJlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGF0ZSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIHN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbSh0cmltKHBhcmFtcy5hcmdTdHJpbmcpKTtcbiAgICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICAgIHN0cmVhbS5lYXRTcGFjZSgpO1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gc3RyZWFtLnBvcztcbiAgICAgICAgICAgIGlmICghc3RyZWFtLm1hdGNoKC9bYS16QS1aXS8sIGZhbHNlKSkge1xuICAgICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBhcmd1bWVudDogJyArIHBhcmFtcy5hcmdTdHJpbmcuc3Vic3RyaW5nKGNvdW50KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN5bSA9IHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKCctJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0cmVhbS5tYXRjaCgvW2EtekEtWl0vLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgcGFyYW1zLmFyZ1N0cmluZy5zdWJzdHJpbmcoY291bnQpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRNYXJrID0gc3ltO1xuICAgICAgICAgICAgICAgIHZhciBmaW5pc2hNYXJrID0gc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNMb3dlckNhc2Uoc3RhcnRNYXJrKSAmJiBpc0xvd2VyQ2FzZShmaW5pc2hNYXJrKSB8fFxuICAgICAgICAgICAgICAgICAgICBpc1VwcGVyQ2FzZShzdGFydE1hcmspICYmIGlzVXBwZXJDYXNlKGZpbmlzaE1hcmspKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0TWFyay5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmluaXNoID0gZmluaXNoTWFyay5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnQgPj0gZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBwYXJhbXMuYXJnU3RyaW5nLnN1YnN0cmluZyhjb3VudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IGZpbmlzaCAtIHN0YXJ0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXJrID0gU3RyaW5nLmZyb21DaGFyQ29kZShzdGFydCArIGopO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLm1hcmtzW21hcmtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBzdGFydE1hcmsgKyAnLScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLm1hcmtzW3N5bV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIGV4Q29tbWFuZERpc3BhdGNoZXIgPSBuZXcgRXhDb21tYW5kRGlzcGF0Y2hlcigpO1xuZnVuY3Rpb24gZG9SZXBsYWNlKGNtLCBjb25maXJtLCBnbG9iYWwsIGxpbmVTdGFydCwgbGluZUVuZCwgc2VhcmNoQ3Vyc29yLCBxdWVyeSwgcmVwbGFjZVdpdGgsIGNhbGxiYWNrKSB7XG4gICAgY20uc3RhdGUudmltLmV4TW9kZSA9IHRydWU7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB2YXIgbGFzdFBvcywgbW9kaWZpZWRMaW5lTnVtYmVyLCBqb2luZWQ7XG4gICAgZnVuY3Rpb24gcmVwbGFjZUFsbCgpIHtcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2UoKTtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlKCkge1xuICAgICAgICB2YXIgdGV4dCA9IGNtLmdldFJhbmdlKHNlYXJjaEN1cnNvci5mcm9tKCksIHNlYXJjaEN1cnNvci50bygpKTtcbiAgICAgICAgdmFyIG5ld1RleHQgPSB0ZXh0LnJlcGxhY2UocXVlcnksIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgdmFyIHVubW9kaWZpZWRMaW5lTnVtYmVyID0gc2VhcmNoQ3Vyc29yLnRvKCkubGluZTtcbiAgICAgICAgc2VhcmNoQ3Vyc29yLnJlcGxhY2UobmV3VGV4dCk7XG4gICAgICAgIG1vZGlmaWVkTGluZU51bWJlciA9IHNlYXJjaEN1cnNvci50bygpLmxpbmU7XG4gICAgICAgIGxpbmVFbmQgKz0gbW9kaWZpZWRMaW5lTnVtYmVyIC0gdW5tb2RpZmllZExpbmVOdW1iZXI7XG4gICAgICAgIGpvaW5lZCA9IG1vZGlmaWVkTGluZU51bWJlciA8IHVubW9kaWZpZWRMaW5lTnVtYmVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kTmV4dFZhbGlkTWF0Y2goKSB7XG4gICAgICAgIHZhciBsYXN0TWF0Y2hUbyA9IGxhc3RQb3MgJiYgY29weUN1cnNvcihzZWFyY2hDdXJzb3IudG8oKSk7XG4gICAgICAgIHZhciBtYXRjaCA9IHNlYXJjaEN1cnNvci5maW5kTmV4dCgpO1xuICAgICAgICBpZiAobWF0Y2ggJiYgIW1hdGNoWzBdICYmIGxhc3RNYXRjaFRvICYmIGN1cnNvckVxdWFsKHNlYXJjaEN1cnNvci5mcm9tKCksIGxhc3RNYXRjaFRvKSkge1xuICAgICAgICAgICAgbWF0Y2ggPSBzZWFyY2hDdXJzb3IuZmluZE5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHdoaWxlIChmaW5kTmV4dFZhbGlkTWF0Y2goKSAmJlxuICAgICAgICAgICAgaXNJblJhbmdlKHNlYXJjaEN1cnNvci5mcm9tKCksIGxpbmVTdGFydCwgbGluZUVuZCkpIHtcbiAgICAgICAgICAgIGlmICghZ2xvYmFsICYmIHNlYXJjaEN1cnNvci5mcm9tKCkubGluZSA9PSBtb2RpZmllZExpbmVOdW1iZXIgJiYgIWpvaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY20uc2Nyb2xsSW50b1ZpZXcoc2VhcmNoQ3Vyc29yLmZyb20oKSwgMzApO1xuICAgICAgICAgICAgY20uc2V0U2VsZWN0aW9uKHNlYXJjaEN1cnNvci5mcm9tKCksIHNlYXJjaEN1cnNvci50bygpKTtcbiAgICAgICAgICAgIGxhc3RQb3MgPSBzZWFyY2hDdXJzb3IuZnJvbSgpO1xuICAgICAgICAgICAgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdG9wKGNsb3NlKSB7XG4gICAgICAgIGlmIChjbG9zZSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICBpZiAobGFzdFBvcykge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGxhc3RQb3MpO1xuICAgICAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgICAgIHZpbS5leE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZpbS5sYXN0SFBvcyA9IHZpbS5sYXN0SFNQb3MgPSBsYXN0UG9zLmNoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgX3ZhbHVlLCBjbG9zZSkge1xuICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgdmFyIGtleU5hbWUgPSBDb2RlTWlycm9yLmtleU5hbWUoZSk7XG4gICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnWSc6XG4gICAgICAgICAgICAgICAgcmVwbGFjZSgpO1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgIHZhciBzYXZlZENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY20ub3BlcmF0aW9uKHJlcGxhY2VBbGwpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gc2F2ZWRDYWxsYmFjaztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICAgIHJlcGxhY2UoKTtcbiAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgY2FzZSAnRXNjJzpcbiAgICAgICAgICAgIGNhc2UgJ0N0cmwtQyc6XG4gICAgICAgICAgICBjYXNlICdDdHJsLVsnOlxuICAgICAgICAgICAgICAgIHN0b3AoY2xvc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBzdG9wKGNsb3NlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbmV4dCgpO1xuICAgIGlmIChkb25lKSB7XG4gICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gbWF0Y2hlcyBmb3IgJyArIHF1ZXJ5LnNvdXJjZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjb25maXJtKSB7XG4gICAgICAgIHJlcGxhY2VBbGwoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2hvd1Byb21wdChjbSwge1xuICAgICAgICBwcmVmaXg6IGRvbSgnc3BhbicsICdyZXBsYWNlIHdpdGggJywgZG9tKCdzdHJvbmcnLCByZXBsYWNlV2l0aCksICcgKHkvbi9hL3EvbCknKSxcbiAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd25cbiAgICB9KTtcbn1cbkNvZGVNaXJyb3Iua2V5TWFwLnZpbSA9IHtcbiAgICBhdHRhY2g6IGF0dGFjaFZpbU1hcCxcbiAgICBkZXRhY2g6IGRldGFjaFZpbU1hcCxcbiAgICBjYWxsOiBjbUtleVxufTtcbmZ1bmN0aW9uIGV4aXRJbnNlcnRNb2RlKGNtKSB7XG4gICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICB2YXIgaW5zZXJ0TW9kZUNoYW5nZVJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKCcuJyk7XG4gICAgdmFyIGlzUGxheWluZyA9IG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZztcbiAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICBpZiAoIWlzUGxheWluZykge1xuICAgICAgICBjbS5vZmYoJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgQ29kZU1pcnJvci5vZmYoY20uZ2V0SW5wdXRGaWVsZCgpLCAna2V5ZG93bicsIG9uS2V5RXZlbnRUYXJnZXRLZXlEb3duKTtcbiAgICB9XG4gICAgaWYgKCFpc1BsYXlpbmcgJiYgdmltLmluc2VydE1vZGVSZXBlYXQgPiAxKSB7XG4gICAgICAgIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHZpbS5pbnNlcnRNb2RlUmVwZWF0IC0gMSwgdHJ1ZSAvKiogcmVwZWF0Rm9ySW5zZXJ0ICovKTtcbiAgICAgICAgdmltLmxhc3RFZGl0SW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSA9IHZpbS5pbnNlcnRNb2RlUmVwZWF0O1xuICAgIH1cbiAgICBkZWxldGUgdmltLmluc2VydE1vZGVSZXBlYXQ7XG4gICAgdmltLmluc2VydE1vZGUgPSBmYWxzZTtcbiAgICBjbS5zZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCkubGluZSwgY20uZ2V0Q3Vyc29yKCkuY2ggLSAxKTtcbiAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0nKTtcbiAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIHRydWUpO1xuICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZShmYWxzZSk7IC8vIGV4aXQgcmVwbGFjZSBtb2RlIGlmIHdlIHdlcmUgaW4gaXQuXG4gICAgaW5zZXJ0TW9kZUNoYW5nZVJlZ2lzdGVyLnNldFRleHQobGFzdENoYW5nZS5jaGFuZ2VzLmpvaW4oJycpKTtcbiAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcIm5vcm1hbFwiIH0pO1xuICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZykge1xuICAgICAgICBsb2dJbnNlcnRNb2RlQ2hhbmdlKG1hY3JvTW9kZVN0YXRlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfbWFwQ29tbWFuZChjb21tYW5kKSB7XG4gICAgZGVmYXVsdEtleW1hcC51bnNoaWZ0KGNvbW1hbmQpO1xufVxuZnVuY3Rpb24gbWFwQ29tbWFuZChrZXlzLCB0eXBlLCBuYW1lLCBhcmdzLCBleHRyYSkge1xuICAgIHZhciBjb21tYW5kID0geyBrZXlzOiBrZXlzLCB0eXBlOiB0eXBlIH07XG4gICAgY29tbWFuZFt0eXBlXSA9IG5hbWU7XG4gICAgY29tbWFuZFt0eXBlICsgXCJBcmdzXCJdID0gYXJncztcbiAgICBmb3IgKHZhciBrZXkgaW4gZXh0cmEpXG4gICAgICAgIGNvbW1hbmRba2V5XSA9IGV4dHJhW2tleV07XG4gICAgX21hcENvbW1hbmQoY29tbWFuZCk7XG59XG5kZWZpbmVPcHRpb24oJ2luc2VydE1vZGVFc2NLZXlzVGltZW91dCcsIDIwMCwgJ251bWJlcicpO1xuQ29kZU1pcnJvci5rZXlNYXBbJ3ZpbS1pbnNlcnQnXSA9IHtcbiAgICBmYWxsdGhyb3VnaDogWydkZWZhdWx0J10sXG4gICAgYXR0YWNoOiBhdHRhY2hWaW1NYXAsXG4gICAgZGV0YWNoOiBkZXRhY2hWaW1NYXAsXG4gICAgY2FsbDogY21LZXlcbn07XG5Db2RlTWlycm9yLmtleU1hcFsndmltLXJlcGxhY2UnXSA9IHtcbiAgICAnQmFja3NwYWNlJzogJ2dvQ2hhckxlZnQnLFxuICAgIGZhbGx0aHJvdWdoOiBbJ3ZpbS1pbnNlcnQnXSxcbiAgICBhdHRhY2g6IGF0dGFjaFZpbU1hcCxcbiAgICBkZXRhY2g6IGRldGFjaFZpbU1hcCxcbiAgICBjYWxsOiBjbUtleVxufTtcbmZ1bmN0aW9uIGV4ZWN1dGVNYWNyb1JlZ2lzdGVyKGNtLCB2aW0sIG1hY3JvTW9kZVN0YXRlLCByZWdpc3Rlck5hbWUpIHtcbiAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICBpZiAocmVnaXN0ZXJOYW1lID09ICc6Jykge1xuICAgICAgICBpZiAocmVnaXN0ZXIua2V5QnVmZmVyWzBdKSB7XG4gICAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCByZWdpc3Rlci5rZXlCdWZmZXJbMF0pO1xuICAgICAgICB9XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBrZXlCdWZmZXIgPSByZWdpc3Rlci5rZXlCdWZmZXI7XG4gICAgdmFyIGltYyA9IDA7XG4gICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICBtYWNyb01vZGVTdGF0ZS5yZXBsYXlTZWFyY2hRdWVyaWVzID0gcmVnaXN0ZXIuc2VhcmNoUXVlcmllcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGV4dCA9IGtleUJ1ZmZlcltpXTtcbiAgICAgICAgdmFyIG1hdGNoLCBrZXk7XG4gICAgICAgIHdoaWxlICh0ZXh0KSB7XG4gICAgICAgICAgICBtYXRjaCA9ICgvPFxcdystLis/Pnw8XFx3Kz58Li8pLmV4ZWModGV4dCk7XG4gICAgICAgICAgICBrZXkgPSBtYXRjaFswXTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZyhtYXRjaC5pbmRleCArIGtleS5sZW5ndGgpO1xuICAgICAgICAgICAgdmltQXBpLmhhbmRsZUtleShjbSwga2V5LCAnbWFjcm8nKTtcbiAgICAgICAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gcmVnaXN0ZXIuaW5zZXJ0TW9kZUNoYW5nZXNbaW1jKytdLmNoYW5nZXM7XG4gICAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmNoYW5nZXMgPVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzO1xuICAgICAgICAgICAgICAgIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VzLCAxKTtcbiAgICAgICAgICAgICAgICBleGl0SW5zZXJ0TW9kZShjbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiBsb2dLZXkobWFjcm9Nb2RlU3RhdGUsIGtleSkge1xuICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgaWYgKHJlZ2lzdGVyKSB7XG4gICAgICAgIHJlZ2lzdGVyLnB1c2hUZXh0KGtleSk7XG4gICAgfVxufVxuZnVuY3Rpb24gbG9nSW5zZXJ0TW9kZUNoYW5nZShtYWNyb01vZGVTdGF0ZSkge1xuICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgaWYgKHJlZ2lzdGVyICYmIHJlZ2lzdGVyLnB1c2hJbnNlcnRNb2RlQ2hhbmdlcykge1xuICAgICAgICByZWdpc3Rlci5wdXNoSW5zZXJ0TW9kZUNoYW5nZXMobWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBsb2dTZWFyY2hRdWVyeShtYWNyb01vZGVTdGF0ZSwgcXVlcnkpIHtcbiAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgIGlmIChyZWdpc3RlciAmJiByZWdpc3Rlci5wdXNoU2VhcmNoUXVlcnkpIHtcbiAgICAgICAgcmVnaXN0ZXIucHVzaFNlYXJjaFF1ZXJ5KHF1ZXJ5KTtcbiAgICB9XG59XG5mdW5jdGlvbiBvbkNoYW5nZShjbSwgY2hhbmdlT2JqKSB7XG4gICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgdmFyIGxhc3RDaGFuZ2UgPSBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXM7XG4gICAgaWYgKCFtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgd2hpbGUgKGNoYW5nZU9iaikge1xuICAgICAgICAgICAgbGFzdENoYW5nZS5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAobGFzdENoYW5nZS5pZ25vcmVDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmlnbm9yZUNvdW50LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VPYmoub3JpZ2luID09ICcraW5wdXQnIHx8IGNoYW5nZU9iai5vcmlnaW4gPT0gJ3Bhc3RlJ1xuICAgICAgICAgICAgICAgIHx8IGNoYW5nZU9iai5vcmlnaW4gPT09IHVuZGVmaW5lZCAvKiBvbmx5IGluIHRlc3RpbmcgKi8pIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uQ291bnQgPSBjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uQ291bnQgPiAxKVxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmlnbm9yZUNvdW50ID0gc2VsZWN0aW9uQ291bnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBjaGFuZ2VPYmoudGV4dC5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdENoYW5nZS5tYXliZVJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsYXN0Q2hhbmdlLm1heWJlUmVzZXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNtLnN0YXRlLm92ZXJ3cml0ZSAmJiAhL1xcbi8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2goW3RleHRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcy5wdXNoKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhbmdlT2JqID0gY2hhbmdlT2JqLm5leHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBvbkN1cnNvckFjdGl2aXR5KGNtKSB7XG4gICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICBpZiAodmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgICAgaWYgKGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UpIHtcbiAgICAgICAgICAgIGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxhc3RDaGFuZ2UubWF5YmVSZXNldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoIWNtLmN1ck9wLmlzVmltT3ApIHtcbiAgICAgICAgaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSwga2VlcEhQb3MpIHtcbiAgICB2YXIgYW5jaG9yID0gY20uZ2V0Q3Vyc29yKCdhbmNob3InKTtcbiAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgIGlmICh2aW0udmlzdWFsTW9kZSAmJiAhY20uc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xuICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgIH1cbiAgICBlbHNlIGlmICghdmltLnZpc3VhbE1vZGUgJiYgIXZpbS5pbnNlcnRNb2RlICYmIGNtLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgeyBtb2RlOiBcInZpc3VhbFwiIH0pO1xuICAgIH1cbiAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgdmFyIGhlYWRPZmZzZXQgPSAhY3Vyc29ySXNCZWZvcmUoaGVhZCwgYW5jaG9yKSA/IC0xIDogMDtcbiAgICAgICAgdmFyIGFuY2hvck9mZnNldCA9IGN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgIGFuY2hvciA9IG9mZnNldEN1cnNvcihhbmNob3IsIDAsIGFuY2hvck9mZnNldCk7XG4gICAgICAgIHZpbS5zZWwgPSB7XG4gICAgICAgICAgICBhbmNob3I6IGFuY2hvcixcbiAgICAgICAgICAgIGhlYWQ6IGhlYWRcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvck1pbihoZWFkLCBhbmNob3IpKTtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsIGN1cnNvck1heChoZWFkLCBhbmNob3IpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXZpbS5pbnNlcnRNb2RlICYmICFrZWVwSFBvcykge1xuICAgICAgICB2aW0ubGFzdEhQb3MgPSBjbS5nZXRDdXJzb3IoKS5jaDtcbiAgICB9XG59XG5mdW5jdGlvbiBJbnNlcnRNb2RlS2V5KGtleU5hbWUpIHtcbiAgICB0aGlzLmtleU5hbWUgPSBrZXlOYW1lO1xufVxuZnVuY3Rpb24gb25LZXlFdmVudFRhcmdldEtleURvd24oZSkge1xuICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgIHZhciBrZXlOYW1lID0gQ29kZU1pcnJvci5rZXlOYW1lKGUpO1xuICAgIGlmICgha2V5TmFtZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uS2V5Rm91bmQoKSB7XG4gICAgICAgIGlmIChsYXN0Q2hhbmdlLm1heWJlUmVzZXQpIHtcbiAgICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgbGFzdENoYW5nZS5tYXliZVJlc2V0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2gobmV3IEluc2VydE1vZGVLZXkoa2V5TmFtZSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGtleU5hbWUuaW5kZXhPZignRGVsZXRlJykgIT0gLTEgfHwga2V5TmFtZS5pbmRleE9mKCdCYWNrc3BhY2UnKSAhPSAtMSkge1xuICAgICAgICBDb2RlTWlycm9yLmxvb2t1cEtleShrZXlOYW1lLCAndmltLWluc2VydCcsIG9uS2V5Rm91bmQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHJlcGVhdCwgcmVwZWF0Rm9ySW5zZXJ0KSB7XG4gICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB2YXIgaXNBY3Rpb24gPSAhIXZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQ7XG4gICAgdmFyIGNhY2hlZElucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICBmdW5jdGlvbiByZXBlYXRDb21tYW5kKCkge1xuICAgICAgICBpZiAoaXNBY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NBY3Rpb24oY20sIHZpbSwgdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwZWF0SW5zZXJ0KHJlcGVhdCkge1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmNoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVwZWF0ID0gIXZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQgPyAxIDogcmVwZWF0O1xuICAgICAgICAgICAgdmFyIGNoYW5nZU9iamVjdCA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgICAgICAgIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VPYmplY3QuY2hhbmdlcywgcmVwZWF0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2aW0uaW5wdXRTdGF0ZSA9IHZpbS5sYXN0RWRpdElucHV0U3RhdGU7XG4gICAgaWYgKGlzQWN0aW9uICYmIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQuaW50ZXJsYWNlSW5zZXJ0UmVwZWF0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICAgIHJlcGVhdENvbW1hbmQoKTtcbiAgICAgICAgICAgIHJlcGVhdEluc2VydCgxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCFyZXBlYXRGb3JJbnNlcnQpIHtcbiAgICAgICAgICAgIHJlcGVhdENvbW1hbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXBlYXRJbnNlcnQocmVwZWF0KTtcbiAgICB9XG4gICAgdmltLmlucHV0U3RhdGUgPSBjYWNoZWRJbnB1dFN0YXRlO1xuICAgIGlmICh2aW0uaW5zZXJ0TW9kZSAmJiAhcmVwZWF0Rm9ySW5zZXJ0KSB7XG4gICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtKTtcbiAgICB9XG4gICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiByZXBlYXRJbnNlcnRNb2RlQ2hhbmdlcyhjbSwgY2hhbmdlcywgcmVwZWF0KSB7XG4gICAgZnVuY3Rpb24ga2V5SGFuZGxlcihiaW5kaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYmluZGluZyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgQ29kZU1pcnJvci5jb21tYW5kc1tiaW5kaW5nXShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBiaW5kaW5nKGNtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGhlYWQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICB2YXIgdmlzdWFsQmxvY2sgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMudmlzdWFsQmxvY2s7XG4gICAgaWYgKHZpc3VhbEJsb2NrKSB7XG4gICAgICAgIHNlbGVjdEZvckluc2VydChjbSwgaGVhZCwgdmlzdWFsQmxvY2sgKyAxKTtcbiAgICAgICAgcmVwZWF0ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgIGNtLnNldEN1cnNvcihoZWFkKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICBpZiAodmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoaGVhZCwgaSwgMCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2hhbmdlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbal07XG4gICAgICAgICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0TW9kZUtleSkge1xuICAgICAgICAgICAgICAgIENvZGVNaXJyb3IubG9va3VwS2V5KGNoYW5nZS5rZXlOYW1lLCAndmltLWluc2VydCcsIGtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoYW5nZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbihjaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IG9mZnNldEN1cnNvcihzdGFydCwgMCwgY2hhbmdlWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKGNoYW5nZVswXSwgc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZpc3VhbEJsb2NrKSB7XG4gICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoaGVhZCwgMCwgMSkpO1xuICAgIH1cbn1cbnJlc2V0VmltR2xvYmFsU3RhdGUoKTtcbkNvZGVNaXJyb3IuVmltID0gdmltQXBpO1xudmFyIHNwZWNpYWxLZXkgPSB7ICdyZXR1cm4nOiAnQ1InLCBiYWNrc3BhY2U6ICdCUycsICdkZWxldGUnOiAnRGVsJywgZXNjOiAnRXNjJyxcbiAgICBsZWZ0OiAnTGVmdCcsIHJpZ2h0OiAnUmlnaHQnLCB1cDogJ1VwJywgZG93bjogJ0Rvd24nLCBzcGFjZTogJ1NwYWNlJywgaW5zZXJ0OiAnSW5zJyxcbiAgICBob21lOiAnSG9tZScsIGVuZDogJ0VuZCcsIHBhZ2V1cDogJ1BhZ2VVcCcsIHBhZ2Vkb3duOiAnUGFnZURvd24nLCBlbnRlcjogJ0NSJ1xufTtcbmZ1bmN0aW9uIGxvb2t1cEtleShoYXNoSWQsIGtleSwgZSkge1xuICAgIGlmIChrZXkubGVuZ3RoID4gMSAmJiBrZXlbMF0gPT0gXCJuXCIpIHtcbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoXCJudW1wYWRcIiwgXCJcIik7XG4gICAgfVxuICAgIGtleSA9IHNwZWNpYWxLZXlba2V5XSB8fCBrZXk7XG4gICAgdmFyIG5hbWUgPSAnJztcbiAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgIG5hbWUgKz0gJ0MtJztcbiAgICB9XG4gICAgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgIG5hbWUgKz0gJ0EtJztcbiAgICB9XG4gICAgaWYgKChuYW1lIHx8IGtleS5sZW5ndGggPiAxKSAmJiBlLnNoaWZ0S2V5KSB7XG4gICAgICAgIG5hbWUgKz0gJ1MtJztcbiAgICB9XG4gICAgbmFtZSArPSBrZXk7XG4gICAgaWYgKG5hbWUubGVuZ3RoID4gMSkge1xuICAgICAgICBuYW1lID0gJzwnICsgbmFtZSArICc+JztcbiAgICB9XG4gICAgcmV0dXJuIG5hbWU7XG59XG52YXIgaGFuZGxlS2V5ID0gdmltQXBpLmhhbmRsZUtleS5iaW5kKHZpbUFwaSk7XG52aW1BcGkuaGFuZGxlS2V5ID0gZnVuY3Rpb24gKGNtLCBrZXksIG9yaWdpbikge1xuICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgfSwgdHJ1ZSk7XG59O1xuZnVuY3Rpb24gY2xvbmVWaW1TdGF0ZShzdGF0ZSkge1xuICAgIHZhciBuID0gbmV3IHN0YXRlLmNvbnN0cnVjdG9yKCk7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgbyA9IHN0YXRlW2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKVxuICAgICAgICAgICAgbyA9IG8uc2xpY2UoKTtcbiAgICAgICAgZWxzZSBpZiAobyAmJiB0eXBlb2YgbyA9PSBcIm9iamVjdFwiICYmIG8uY29uc3RydWN0b3IgIT0gT2JqZWN0KVxuICAgICAgICAgICAgbyA9IGNsb25lVmltU3RhdGUobyk7XG4gICAgICAgIG5ba2V5XSA9IG87XG4gICAgfSk7XG4gICAgaWYgKHN0YXRlLnNlbCkge1xuICAgICAgICBuLnNlbCA9IHtcbiAgICAgICAgICAgIGhlYWQ6IHN0YXRlLnNlbC5oZWFkICYmIGNvcHlDdXJzb3Ioc3RhdGUuc2VsLmhlYWQpLFxuICAgICAgICAgICAgYW5jaG9yOiBzdGF0ZS5zZWwuYW5jaG9yICYmIGNvcHlDdXJzb3Ioc3RhdGUuc2VsLmFuY2hvcilcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG5mdW5jdGlvbiBtdWx0aVNlbGVjdEhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pIHtcbiAgICB2YXIgaXNIYW5kbGVkID0gZmFsc2U7XG4gICAgdmFyIHZpbSA9IHZpbUFwaS5tYXliZUluaXRWaW1TdGF0ZV8oY20pO1xuICAgIHZhciB2aXN1YWxCbG9jayA9IHZpbS52aXN1YWxCbG9jayB8fCB2aW0ud2FzSW5WaXN1YWxCbG9jaztcbiAgICB2YXIgd2FzTXVsdGlzZWxlY3QgPSBjbS5hY2UuaW5NdWx0aVNlbGVjdE1vZGU7XG4gICAgaWYgKHZpbS53YXNJblZpc3VhbEJsb2NrICYmICF3YXNNdWx0aXNlbGVjdCkge1xuICAgICAgICB2aW0ud2FzSW5WaXN1YWxCbG9jayA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIGlmICh3YXNNdWx0aXNlbGVjdCAmJiB2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgdmltLndhc0luVmlzdWFsQmxvY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoa2V5ID09ICc8RXNjPicgJiYgIXZpbS5pbnNlcnRNb2RlICYmICF2aW0udmlzdWFsTW9kZSAmJiB3YXNNdWx0aXNlbGVjdCkge1xuICAgICAgICBjbS5hY2UuZXhpdE11bHRpU2VsZWN0TW9kZSgpO1xuICAgIH1cbiAgICBlbHNlIGlmICh2aXN1YWxCbG9jayB8fCAhd2FzTXVsdGlzZWxlY3QgfHwgY20uYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpIHtcbiAgICAgICAgaXNIYW5kbGVkID0gdmltQXBpLmhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG9sZCA9IGNsb25lVmltU3RhdGUodmltKTtcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNtLmFjZS5mb3JFYWNoU2VsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsID0gY20uYWNlLnNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICBjbS5zdGF0ZS52aW0ubGFzdEhQb3MgPSBzZWwuJGRlc2lyZWRDb2x1bW4gPT0gbnVsbCA/IHNlbC5sZWFkLmNvbHVtbiA6IHNlbC4kZGVzaXJlZENvbHVtbjtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcihcImhlYWRcIik7XG4gICAgICAgICAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcihcImFuY2hvclwiKTtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZE9mZnNldCA9ICFjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICAgICAgICAgIHZhciBhbmNob3JPZmZzZXQgPSBjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICAgICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgICAgICAgICAgYW5jaG9yID0gb2Zmc2V0Q3Vyc29yKGFuY2hvciwgMCwgYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjbS5zdGF0ZS52aW0uc2VsLmhlYWQgPSBoZWFkO1xuICAgICAgICAgICAgICAgIGNtLnN0YXRlLnZpbS5zZWwuYW5jaG9yID0gYW5jaG9yO1xuICAgICAgICAgICAgICAgIGlzSGFuZGxlZCA9IGhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pO1xuICAgICAgICAgICAgICAgIHNlbC4kZGVzaXJlZENvbHVtbiA9IGNtLnN0YXRlLnZpbS5sYXN0SFBvcyA9PSAtMSA/IG51bGwgOiBjbS5zdGF0ZS52aW0ubGFzdEhQb3M7XG4gICAgICAgICAgICAgICAgaWYgKGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY20uc3RhdGUudmltID0gY2xvbmVWaW1TdGF0ZShvbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNtLmN1ck9wLmN1cnNvckFjdGl2aXR5ICYmICFpc0hhbmRsZWQpXG4gICAgICAgICAgICAgICAgY20uY3VyT3AuY3Vyc29yQWN0aXZpdHkgPSBmYWxzZTtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChpc0hhbmRsZWQgJiYgIXZpbS52aXN1YWxNb2RlICYmICF2aW0uaW5zZXJ0ICYmIHZpbS52aXN1YWxNb2RlICE9IGNtLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiBpc0hhbmRsZWQ7XG59XG5leHBvcnRzLkNvZGVNaXJyb3IgPSBDb2RlTWlycm9yO1xudmFyIGdldFZpbSA9IHZpbUFwaS5tYXliZUluaXRWaW1TdGF0ZV87XG5leHBvcnRzLmhhbmRsZXIgPSB7XG4gICAgJGlkOiBcImFjZS9rZXlib2FyZC92aW1cIixcbiAgICBkcmF3Q3Vyc29yOiBmdW5jdGlvbiAoZWxlbWVudCwgcGl4ZWxQb3MsIGNvbmZpZywgc2VsLCBzZXNzaW9uKSB7XG4gICAgICAgIHZhciB2aW0gPSB0aGlzLnN0YXRlLnZpbSB8fCB7fTtcbiAgICAgICAgdmFyIHcgPSBjb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICAgIHZhciBoID0gY29uZmlnLmxpbmVIZWlnaHQ7XG4gICAgICAgIHZhciB0b3AgPSBwaXhlbFBvcy50b3A7XG4gICAgICAgIHZhciBsZWZ0ID0gcGl4ZWxQb3MubGVmdDtcbiAgICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgdmFyIGlzYmFja3dhcmRzID0gIXNlbC5jdXJzb3JcbiAgICAgICAgICAgICAgICA/IHNlc3Npb24uc2VsZWN0aW9uLmlzQmFja3dhcmRzKCkgfHwgc2Vzc2lvbi5zZWxlY3Rpb24uaXNFbXB0eSgpXG4gICAgICAgICAgICAgICAgOiBSYW5nZS5jb21wYXJlUG9pbnRzKHNlbC5jdXJzb3IsIHNlbC5zdGFydCkgPD0gMDtcbiAgICAgICAgICAgIGlmICghaXNiYWNrd2FyZHMgJiYgbGVmdCA+IHcpXG4gICAgICAgICAgICAgICAgbGVmdCAtPSB3O1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmltLmluc2VydE1vZGUgJiYgdmltLnN0YXR1cykge1xuICAgICAgICAgICAgaCA9IGggLyAyO1xuICAgICAgICAgICAgdG9wICs9IGg7XG4gICAgICAgIH1cbiAgICAgICAgZG9tTGliLnRyYW5zbGF0ZShlbGVtZW50LCBsZWZ0LCB0b3ApO1xuICAgICAgICBkb21MaWIuc2V0U3R5bGUoZWxlbWVudC5zdHlsZSwgXCJ3aWR0aFwiLCB3ICsgXCJweFwiKTtcbiAgICAgICAgZG9tTGliLnNldFN0eWxlKGVsZW1lbnQuc3R5bGUsIFwiaGVpZ2h0XCIsIGggKyBcInB4XCIpO1xuICAgIH0sXG4gICAgJGdldERpcmVjdGlvbkZvckhpZ2hsaWdodDogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICAgIHZhciB2aW0gPSBnZXRWaW0oY20pO1xuICAgICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLnNlc3Npb24uc2VsZWN0aW9uLmlzQmFja3dhcmRzKCkgfHwgZWRpdG9yLnNlc3Npb24uc2VsZWN0aW9uLmlzRW1wdHkoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlS2V5Ym9hcmQ6IGZ1bmN0aW9uIChkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSwgZSkge1xuICAgICAgICB2YXIgZWRpdG9yID0gZGF0YS5lZGl0b3I7XG4gICAgICAgIHZhciBjbSA9IGVkaXRvci5zdGF0ZS5jbTtcbiAgICAgICAgdmFyIHZpbSA9IGdldFZpbShjbSk7XG4gICAgICAgIGlmIChrZXlDb2RlID09IC0xKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5jaGFyQ29kZUF0KDApID4gMHhGRikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pbnB1dEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gZGF0YS5pbnB1dEtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgJiYgZGF0YS5pbnB1dEhhc2ggPT0gNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc2hJZCA9PSA0IHx8IGhhc2hJZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaW5wdXRLZXkgPT0ga2V5ICYmIGRhdGEuaW5wdXRIYXNoID09IGhhc2hJZCAmJiBkYXRhLmlucHV0Q2hhcikge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBkYXRhLmlucHV0Q2hhcjtcbiAgICAgICAgICAgICAgICAgICAgaGFzaElkID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW5wdXRLZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW5wdXRIYXNoID0gaGFzaElkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEuaW5wdXRDaGFyID0gZGF0YS5pbnB1dEtleSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNtLnN0YXRlLm92ZXJ3cml0ZSAmJiB2aW0uaW5zZXJ0TW9kZSAmJiBrZXkgPT0gXCJiYWNrc3BhY2VcIiAmJiBoYXNoSWQgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgY29tbWFuZDogXCJnb3RvbGVmdFwiIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PSBcImNcIiAmJiBoYXNoSWQgPT0gMSkgeyAvLyBrZXkgPT0gXCJjdHJsLWNcIlxuICAgICAgICAgICAgaWYgKCF1c2VyYWdlbnQuaXNNYWMgJiYgZWRpdG9yLmdldENvcHlUZXh0KCkpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3Iub25jZShcImNvcHlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmltLmluc2VydE1vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbiAoKSB7IGV4aXRWaXN1YWxNb2RlKGNtKTsgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tbWFuZDogXCJudWxsXCIsIHBhc3NFdmVudDogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgPT0gXCJlc2NcIiAmJiAhdmltLmluc2VydE1vZGUgJiYgIXZpbS52aXN1YWxNb2RlICYmICFjbS5hY2UuaW5NdWx0aVNlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hTdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgICAgIHZhciBvdmVybGF5ID0gc2VhcmNoU3RhdGUuZ2V0T3ZlcmxheSgpO1xuICAgICAgICAgICAgaWYgKG92ZXJsYXkpXG4gICAgICAgICAgICAgICAgY20ucmVtb3ZlT3ZlcmxheShvdmVybGF5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzaElkID09IC0xIHx8IGhhc2hJZCAmIDEgfHwgaGFzaElkID09PSAwICYmIGtleS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgaW5zZXJ0TW9kZSA9IHZpbS5pbnNlcnRNb2RlO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBsb29rdXBLZXkoaGFzaElkLCBrZXksIGUgfHwge30pO1xuICAgICAgICAgICAgaWYgKHZpbS5zdGF0dXMgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB2aW0uc3RhdHVzID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpc0hhbmRsZWQgPSBtdWx0aVNlbGVjdEhhbmRsZUtleShjbSwgbmFtZSwgJ3VzZXInKTtcbiAgICAgICAgICAgIHZpbSA9IGdldFZpbShjbSk7IC8vIG1heSBiZSBjaGFuZ2VkIGJ5IG11bHRpU2VsZWN0SGFuZGxlS2V5XG4gICAgICAgICAgICBpZiAoaXNIYW5kbGVkICYmIHZpbS5zdGF0dXMgIT0gbnVsbClcbiAgICAgICAgICAgICAgICB2aW0uc3RhdHVzICs9IG5hbWU7XG4gICAgICAgICAgICBlbHNlIGlmICh2aW0uc3RhdHVzID09IG51bGwpXG4gICAgICAgICAgICAgICAgdmltLnN0YXR1cyA9IFwiXCI7XG4gICAgICAgICAgICBjbS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICAgICAgaWYgKCFpc0hhbmRsZWQgJiYgKGhhc2hJZCAhPSAtMSB8fCBpbnNlcnRNb2RlKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICByZXR1cm4geyBjb21tYW5kOiBcIm51bGxcIiwgcGFzc0V2ZW50OiAhaXNIYW5kbGVkIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGF0dGFjaDogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBpZiAoIWVkaXRvci5zdGF0ZSlcbiAgICAgICAgICAgIGVkaXRvci5zdGF0ZSA9IHt9O1xuICAgICAgICB2YXIgY20gPSBuZXcgQ29kZU1pcnJvcihlZGl0b3IpO1xuICAgICAgICBlZGl0b3Iuc3RhdGUuY20gPSBjbTtcbiAgICAgICAgZWRpdG9yLiR2aW1Nb2RlSGFuZGxlciA9IHRoaXM7XG4gICAgICAgIENvZGVNaXJyb3Iua2V5TWFwLnZpbS5hdHRhY2goY20pO1xuICAgICAgICBnZXRWaW0oY20pLnN0YXR1cyA9IG51bGw7XG4gICAgICAgIGNtLm9uKCd2aW0tY29tbWFuZC1kb25lJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZ2V0VmltKGNtKS5zdGF0dXMgPSBudWxsO1xuICAgICAgICAgICAgY20uYWNlLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgICAgICAgICBjbS5hY2Uuc2Vzc2lvbi5tYXJrVW5kb0dyb3VwKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbS5vbihcImNoYW5nZVN0YXR1c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbS5hY2UucmVuZGVyZXIudXBkYXRlQ3Vyc29yKCk7XG4gICAgICAgICAgICBjbS5hY2UuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNtLm9uKFwidmltLW1vZGUtY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjbS52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHVwZGF0ZUlucHV0TW9kZSgpO1xuICAgICAgICAgICAgY20uX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUlucHV0TW9kZSgpIHtcbiAgICAgICAgICAgIHZhciBpc0ludHNlcnQgPSBnZXRWaW0oY20pLmluc2VydE1vZGU7XG4gICAgICAgICAgICBjbS5hY2UucmVuZGVyZXIuc2V0U3R5bGUoXCJub3JtYWwtbW9kZVwiLCAhaXNJbnRzZXJ0KTtcbiAgICAgICAgICAgIGVkaXRvci50ZXh0SW5wdXQuc2V0Q29tbWFuZE1vZGUoIWlzSW50c2VydCk7XG4gICAgICAgICAgICBlZGl0b3IucmVuZGVyZXIuJGtlZXBUZXh0QXJlYUF0Q3Vyc29yID0gaXNJbnRzZXJ0O1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLiRibG9ja0N1cnNvciA9ICFpc0ludHNlcnQ7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlSW5wdXRNb2RlKCk7XG4gICAgICAgIGVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZHJhd0N1cnNvciA9IHRoaXMuZHJhd0N1cnNvci5iaW5kKGNtKTtcbiAgICB9LFxuICAgIGRldGFjaDogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICAgIENvZGVNaXJyb3Iua2V5TWFwLnZpbS5kZXRhY2goY20pO1xuICAgICAgICBjbS5kZXN0cm95KCk7XG4gICAgICAgIGVkaXRvci5zdGF0ZS5jbSA9IG51bGw7XG4gICAgICAgIGVkaXRvci4kdmltTW9kZUhhbmRsZXIgPSBudWxsO1xuICAgICAgICBlZGl0b3IucmVuZGVyZXIuJGN1cnNvckxheWVyLmRyYXdDdXJzb3IgPSBudWxsO1xuICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2V0U3R5bGUoXCJub3JtYWwtbW9kZVwiLCBmYWxzZSk7XG4gICAgICAgIGVkaXRvci50ZXh0SW5wdXQuc2V0Q29tbWFuZE1vZGUoZmFsc2UpO1xuICAgICAgICBlZGl0b3IucmVuZGVyZXIuJGtlZXBUZXh0QXJlYUF0Q3Vyc29yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGdldFN0YXR1c1RleHQ6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgICB2YXIgdmltID0gZ2V0VmltKGNtKTtcbiAgICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlKVxuICAgICAgICAgICAgcmV0dXJuIFwiSU5TRVJUXCI7XG4gICAgICAgIHZhciBzdGF0dXMgPSBcIlwiO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHN0YXR1cyArPSBcIlZJU1VBTFwiO1xuICAgICAgICAgICAgaWYgKHZpbS52aXN1YWxMaW5lKVxuICAgICAgICAgICAgICAgIHN0YXR1cyArPSBcIiBMSU5FXCI7XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrKVxuICAgICAgICAgICAgICAgIHN0YXR1cyArPSBcIiBCTE9DS1wiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aW0uc3RhdHVzKVxuICAgICAgICAgICAgc3RhdHVzICs9IChzdGF0dXMgPyBcIiBcIiA6IFwiXCIpICsgdmltLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG59O1xudmltQXBpLmRlZmluZU9wdGlvbih7XG4gICAgbmFtZTogXCJ3cmFwXCIsXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUsIGNtKSB7XG4gICAgICAgIGlmIChjbSkge1xuICAgICAgICAgICAgY20uYWNlLnNldE9wdGlvbihcIndyYXBcIiwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0eXBlOiBcImJvb2xlYW5cIlxufSwgZmFsc2UpO1xudmltQXBpLmRlZmluZUV4KCd3cml0ZScsICd3JywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCc6d3JpdGUgaXMgbm90IGltcGxlbWVudGVkJyk7XG59KTtcbmRlZmF1bHRLZXltYXAucHVzaCh7IGtleXM6ICd6YycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiBmYWxzZSB9IH0sIHsga2V5czogJ3pDJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IGZhbHNlLCBhbGw6IHRydWUgfSB9LCB7IGtleXM6ICd6bycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlIH0gfSwgeyBrZXlzOiAnek8nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogdHJ1ZSwgYWxsOiB0cnVlIH0gfSwgeyBrZXlzOiAnemEnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgdG9nZ2xlOiB0cnVlIH0gfSwgeyBrZXlzOiAnekEnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgdG9nZ2xlOiB0cnVlLCBhbGw6IHRydWUgfSB9LCB7IGtleXM6ICd6ZicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlLCBhbGw6IHRydWUgfSB9LCB7IGtleXM6ICd6ZCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlLCBhbGw6IHRydWUgfSB9LCB7IGtleXM6ICc8Qy1BLWs+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQWJvdmVcIiB9IH0sIHsga2V5czogJzxDLUEtaj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JCZWxvd1wiIH0gfSwgeyBrZXlzOiAnPEMtQS1TLWs+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQWJvdmVTa2lwQ3VycmVudFwiIH0gfSwgeyBrZXlzOiAnPEMtQS1TLWo+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQmVsb3dTa2lwQ3VycmVudFwiIH0gfSwgeyBrZXlzOiAnPEMtQS1oPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE1vcmVCZWZvcmVcIiB9IH0sIHsga2V5czogJzxDLUEtbD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJzZWxlY3RNb3JlQWZ0ZXJcIiB9IH0sIHsga2V5czogJzxDLUEtUy1oPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE5leHRCZWZvcmVcIiB9IH0sIHsga2V5czogJzxDLUEtUy1sPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE5leHRBZnRlclwiIH0gfSk7XG5kZWZhdWx0S2V5bWFwLnB1c2goe1xuICAgIGtleXM6ICdncScsXG4gICAgdHlwZTogJ29wZXJhdG9yJyxcbiAgICBvcGVyYXRvcjogJ2hhcmRXcmFwJ1xufSk7XG52aW1BcGkuZGVmaW5lT3BlcmF0b3IoXCJoYXJkV3JhcFwiLCBmdW5jdGlvbiAoY20sIG9wZXJhdG9yQXJncywgcmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpIHtcbiAgICB2YXIgYW5jaG9yID0gcmFuZ2VzWzBdLmFuY2hvci5saW5lO1xuICAgIHZhciBoZWFkID0gcmFuZ2VzWzBdLmhlYWQubGluZTtcbiAgICBpZiAob3BlcmF0b3JBcmdzLmxpbmV3aXNlKVxuICAgICAgICBoZWFkLS07XG4gICAgaGFyZFdyYXAoY20uYWNlLCB7IHN0YXJ0Um93OiBhbmNob3IsIGVuZFJvdzogaGVhZCB9KTtcbiAgICByZXR1cm4gUG9zKGhlYWQsIDApO1xufSk7XG5kZWZpbmVPcHRpb24oJ3RleHR3aWR0aCcsIHVuZGVmaW5lZCwgJ251bWJlcicsIFsndHcnXSwgZnVuY3Rpb24gKHdpZHRoLCBjbSkge1xuICAgIGlmIChjbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHdpZHRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gY20uYWNlLmdldE9wdGlvbigncHJpbnRNYXJnaW5Db2x1bW4nKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IE1hdGgucm91bmQod2lkdGgpO1xuICAgICAgICBpZiAoY29sdW1uID4gMSkge1xuICAgICAgICAgICAgY20uYWNlLnNldE9wdGlvbigncHJpbnRNYXJnaW5Db2x1bW4nLCBjb2x1bW4pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5hY3Rpb25zLmFjZUNvbW1hbmQgPSBmdW5jdGlvbiAoY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgIGNtLnZpbUNtZCA9IGFjdGlvbkFyZ3M7XG4gICAgaWYgKGNtLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKVxuICAgICAgICBjbS5hY2Uub24oXCJiZWZvcmVFbmRPcGVyYXRpb25cIiwgZGVsYXllZEV4ZWNBY2VDb21tYW5kKTtcbiAgICBlbHNlXG4gICAgICAgIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZChudWxsLCBjbS5hY2UpO1xufTtcbmZ1bmN0aW9uIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZChvcCwgYWNlKSB7XG4gICAgYWNlLm9mZihcImJlZm9yZUVuZE9wZXJhdGlvblwiLCBkZWxheWVkRXhlY0FjZUNvbW1hbmQpO1xuICAgIHZhciBjbWQgPSBhY2Uuc3RhdGUuY20udmltQ21kO1xuICAgIGlmIChjbWQpIHtcbiAgICAgICAgYWNlLmV4ZWNDb21tYW5kKGNtZC5leGVjID8gY21kIDogY21kLm5hbWUsIGNtZC5hcmdzKTtcbiAgICB9XG4gICAgYWNlLmN1ck9wID0gYWNlLnByZXZPcDtcbn1cbmFjdGlvbnMuZm9sZCA9IGZ1bmN0aW9uIChjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgY20uYWNlLmV4ZWNDb21tYW5kKFsndG9nZ2xlRm9sZFdpZGdldCcsICd0b2dnbGVGb2xkV2lkZ2V0JywgJ2ZvbGRPdGhlcicsICd1bmZvbGRhbGwnXG4gICAgXVsoYWN0aW9uQXJncy5hbGwgPyAyIDogMCkgKyAoYWN0aW9uQXJncy5vcGVuID8gMSA6IDApXSk7XG59O1xuZXhwb3J0cy5oYW5kbGVyLmRlZmF1bHRLZXltYXAgPSBkZWZhdWx0S2V5bWFwO1xuZXhwb3J0cy5oYW5kbGVyLmFjdGlvbnMgPSBhY3Rpb25zO1xuZXhwb3J0cy5WaW0gPSB2aW1BcGk7XG5cbn0pOyAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjZS5yZXF1aXJlKFtcImFjZS9rZXlib2FyZC92aW1cIl0sIGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBtb2R1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IG07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=