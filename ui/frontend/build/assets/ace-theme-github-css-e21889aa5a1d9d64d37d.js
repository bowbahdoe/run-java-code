(self["webpackChunkui"] = self["webpackChunkui"] || []).push([["ace-theme-github-css"],{

/***/ "./node_modules/ace-builds/src-noconflict/theme-github-css.js":
/*!********************************************************************!*\
  !*** ./node_modules/ace-builds/src-noconflict/theme-github-css.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
ace.define("ace/theme/github-css",["require","exports","module"], function(require, exports, module){module.exports = "/* CSS style content from github's default pygments highlighter template.\n   Cursor and selection styles from textmate.css. */\n.ace-github .ace_gutter {\n  background: #e8e8e8;\n  color: #AAA;\n}\n\n.ace-github  {\n  background: #fff;\n  color: #000;\n}\n\n.ace-github .ace_keyword {\n  font-weight: bold;\n}\n\n.ace-github .ace_string {\n  color: #D14;\n}\n\n.ace-github .ace_variable.ace_class {\n  color: teal;\n}\n\n.ace-github .ace_constant.ace_numeric {\n  color: #099;\n}\n\n.ace-github .ace_constant.ace_buildin {\n  color: #0086B3;\n}\n\n.ace-github .ace_support.ace_function {\n  color: #0086B3;\n}\n\n.ace-github .ace_comment {\n  color: #998;\n  font-style: italic;\n}\n\n.ace-github .ace_variable.ace_language  {\n  color: #0086B3;\n}\n\n.ace-github .ace_paren {\n  font-weight: bold;\n}\n\n.ace-github .ace_boolean {\n  font-weight: bold;\n}\n\n.ace-github .ace_string.ace_regexp {\n  color: #009926;\n  font-weight: normal;\n}\n\n.ace-github .ace_variable.ace_instance {\n  color: teal;\n}\n\n.ace-github .ace_constant.ace_language {\n  font-weight: bold;\n}\n\n.ace-github .ace_cursor {\n  color: black;\n}\n\n.ace-github.ace_focus .ace_marker-layer .ace_active-line {\n  background: rgb(255, 255, 204);\n}\n.ace-github .ace_marker-layer .ace_active-line {\n  background: rgb(245, 245, 245);\n}\n\n.ace-github .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n\n.ace-github.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px white;\n}\n/* bold keywords cause cursor issues for some fonts */\n/* this disables bold style for editor and keeps for static highlighter */\n.ace-github.ace_nobold .ace_line > span {\n    font-weight: normal !important;\n}\n\n.ace-github .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-github .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-github .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-github .ace_gutter-active-line {\n    background-color : rgba(0, 0, 0, 0.07);\n}\n\n.ace-github .ace_marker-layer .ace_selected-word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-github .ace_invisible {\n  color: #BFBFBF\n}\n\n.ace-github .ace_print-margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-github .ace_indent-guide {\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\n}\n\n.ace-github .ace_indent-guide-active {\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC\") right repeat-y;\n}\n";

});                (function() {
                    ace.require(["ace/theme/github-css"], function(m) {
                        if ( true && module) {
                            module.exports = m;
                        }
                    });
                })();
            

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNlLXRoZW1lLWdpdGh1Yi1jc3MtZTIxODg5YWE1YTFkOWQ2NGQzN2QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUdBQXFHLDRLQUE0Syx3QkFBd0IsZ0JBQWdCLEdBQUcsa0JBQWtCLHFCQUFxQixnQkFBZ0IsR0FBRyw4QkFBOEIsc0JBQXNCLEdBQUcsNkJBQTZCLGdCQUFnQixHQUFHLHlDQUF5QyxnQkFBZ0IsR0FBRywyQ0FBMkMsZ0JBQWdCLEdBQUcsMkNBQTJDLG1CQUFtQixHQUFHLDJDQUEyQyxtQkFBbUIsR0FBRyw4QkFBOEIsZ0JBQWdCLHVCQUF1QixHQUFHLDZDQUE2QyxtQkFBbUIsR0FBRyw0QkFBNEIsc0JBQXNCLEdBQUcsOEJBQThCLHNCQUFzQixHQUFHLHdDQUF3QyxtQkFBbUIsd0JBQXdCLEdBQUcsNENBQTRDLGdCQUFnQixHQUFHLDRDQUE0QyxzQkFBc0IsR0FBRyw2QkFBNkIsaUJBQWlCLEdBQUcsOERBQThELG1DQUFtQyxHQUFHLGtEQUFrRCxtQ0FBbUMsR0FBRyxrREFBa0QsbUNBQW1DLEdBQUcsMERBQTBELGtDQUFrQyxHQUFHLCtLQUErSyxxQ0FBcUMsR0FBRyw2Q0FBNkMsaUNBQWlDLEdBQUcsOENBQThDLG1DQUFtQyxHQUFHLGdEQUFnRCwwQkFBMEIseUNBQXlDLEdBQUcseUNBQXlDLDZDQUE2QyxHQUFHLHNEQUFzRCxtQ0FBbUMseUNBQXlDLEdBQUcsZ0NBQWdDLHFCQUFxQixtQ0FBbUMsZUFBZSx3QkFBd0IsR0FBRyxtQ0FBbUMscUNBQXFDLGtJQUFrSSxHQUFHLDBDQUEwQyxxQ0FBcUMsOE5BQThOLEdBQUc7O0FBRTc1RixDQUFDLGtCQUFrQjtBQUNuQjtBQUNBLDRCQUE0QixLQUF1RDtBQUNuRjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQiIsInNvdXJjZXMiOlsid2VicGFjazovL3VpLy4vbm9kZV9tb2R1bGVzL2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvdGhlbWUtZ2l0aHViLWNzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhY2UuZGVmaW5lKFwiYWNlL3RoZW1lL2dpdGh1Yi1jc3NcIixbXCJyZXF1aXJlXCIsXCJleHBvcnRzXCIsXCJtb2R1bGVcIl0sIGZ1bmN0aW9uKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSl7bW9kdWxlLmV4cG9ydHMgPSBcIi8qIENTUyBzdHlsZSBjb250ZW50IGZyb20gZ2l0aHViJ3MgZGVmYXVsdCBweWdtZW50cyBoaWdobGlnaHRlciB0ZW1wbGF0ZS5cXG4gICBDdXJzb3IgYW5kIHNlbGVjdGlvbiBzdHlsZXMgZnJvbSB0ZXh0bWF0ZS5jc3MuICovXFxuLmFjZS1naXRodWIgLmFjZV9ndXR0ZXIge1xcbiAgYmFja2dyb3VuZDogI2U4ZThlODtcXG4gIGNvbG9yOiAjQUFBO1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX2tleXdvcmQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2Vfc3RyaW5nIHtcXG4gIGNvbG9yOiAjRDE0O1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX3ZhcmlhYmxlLmFjZV9jbGFzcyB7XFxuICBjb2xvcjogdGVhbDtcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9jb25zdGFudC5hY2VfbnVtZXJpYyB7XFxuICBjb2xvcjogIzA5OTtcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9jb25zdGFudC5hY2VfYnVpbGRpbiB7XFxuICBjb2xvcjogIzAwODZCMztcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9zdXBwb3J0LmFjZV9mdW5jdGlvbiB7XFxuICBjb2xvcjogIzAwODZCMztcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9jb21tZW50IHtcXG4gIGNvbG9yOiAjOTk4O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX3ZhcmlhYmxlLmFjZV9sYW5ndWFnZSAge1xcbiAgY29sb3I6ICMwMDg2QjM7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfcGFyZW4ge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfYm9vbGVhbiB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9zdHJpbmcuYWNlX3JlZ2V4cCB7XFxuICBjb2xvcjogIzAwOTkyNjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfdmFyaWFibGUuYWNlX2luc3RhbmNlIHtcXG4gIGNvbG9yOiB0ZWFsO1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX2NvbnN0YW50LmFjZV9sYW5ndWFnZSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9jdXJzb3Ige1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uYWNlLWdpdGh1Yi5hY2VfZm9jdXMgLmFjZV9tYXJrZXItbGF5ZXIgLmFjZV9hY3RpdmUtbGluZSB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAyNTUsIDIwNCk7XFxufVxcbi5hY2UtZ2l0aHViIC5hY2VfbWFya2VyLWxheWVyIC5hY2VfYWN0aXZlLWxpbmUge1xcbiAgYmFja2dyb3VuZDogcmdiKDI0NSwgMjQ1LCAyNDUpO1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX21hcmtlci1sYXllciAuYWNlX3NlbGVjdGlvbiB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTgxLCAyMTMsIDI1NSk7XFxufVxcblxcbi5hY2UtZ2l0aHViLmFjZV9tdWx0aXNlbGVjdCAuYWNlX3NlbGVjdGlvbi5hY2Vfc3RhcnQge1xcbiAgYm94LXNoYWRvdzogMCAwIDNweCAwcHggd2hpdGU7XFxufVxcbi8qIGJvbGQga2V5d29yZHMgY2F1c2UgY3Vyc29yIGlzc3VlcyBmb3Igc29tZSBmb250cyAqL1xcbi8qIHRoaXMgZGlzYWJsZXMgYm9sZCBzdHlsZSBmb3IgZWRpdG9yIGFuZCBrZWVwcyBmb3Igc3RhdGljIGhpZ2hsaWdodGVyICovXFxuLmFjZS1naXRodWIuYWNlX25vYm9sZCAuYWNlX2xpbmUgPiBzcGFuIHtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX21hcmtlci1sYXllciAuYWNlX3N0ZXAge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1MiwgMjU1LCAwKTtcXG59XFxuXFxuLmFjZS1naXRodWIgLmFjZV9tYXJrZXItbGF5ZXIgLmFjZV9zdGFjayB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY0LCAyMjksIDEwMSk7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfbWFya2VyLWxheWVyIC5hY2VfYnJhY2tldCB7XFxuICBtYXJnaW46IC0xcHggMCAwIC0xcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTkyLCAxOTIsIDE5Mik7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfZ3V0dGVyLWFjdGl2ZS1saW5lIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvciA6IHJnYmEoMCwgMCwgMCwgMC4wNyk7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfbWFya2VyLWxheWVyIC5hY2Vfc2VsZWN0ZWQtd29yZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjUwLCAyNTAsIDI1NSk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjAwLCAyMDAsIDI1MCk7XFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfaW52aXNpYmxlIHtcXG4gIGNvbG9yOiAjQkZCRkJGXFxufVxcblxcbi5hY2UtZ2l0aHViIC5hY2VfcHJpbnQtbWFyZ2luIHtcXG4gIHdpZHRoOiAxcHg7XFxuICBiYWNrZ3JvdW5kOiAjZThlOGU4O1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX2luZGVudC1ndWlkZSB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQ0NBWUFBQUNaZ2JZbkFBQUFFMGxFUVZRSW1XUDQvLy8vZjRiTGx5Ly9Cd0FtVmdkMS93MTEvZ0FBQUFCSlJVNUVya0pnZ2c9PVxcXCIpIHJpZ2h0IHJlcGVhdC15O1xcbn1cXG5cXG4uYWNlLWdpdGh1YiAuYWNlX2luZGVudC1ndWlkZS1hY3RpdmUge1xcbiAgYmFja2dyb3VuZDogdXJsKFxcXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUNDQVlBQUFDWmdiWW5BQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUlHTklVazBBQUhvbEFBQ0Fnd0FBK2Y4QUFJRHBBQUIxTUFBQTZtQUFBRHFZQUFBWGI1SmZ4VVlBQUFBWlNVUkJWSGphWXZqLy8vOS9oaXZLeXY4QkFBQUEvLzhEQUNMcUJoYnZrKy9lQUFBQUFFbEZUa1N1UW1DQ1xcXCIpIHJpZ2h0IHJlcGVhdC15O1xcbn1cXG5cIjtcblxufSk7ICAgICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNlLnJlcXVpcmUoW1wiYWNlL3RoZW1lL2dpdGh1Yi1jc3NcIl0sIGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kdWxlID09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBtb2R1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IG07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=