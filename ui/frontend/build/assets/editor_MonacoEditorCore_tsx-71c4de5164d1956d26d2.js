"use strict";
(self["webpackChunkui"] = self["webpackChunkui"] || []).push([["editor_MonacoEditorCore_tsx"],{

/***/ "./editor/MonacoEditorCore.tsx":
/*!*************************************!*\
  !*** ./editor/MonacoEditorCore.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-monaco-editor */ "./node_modules/react-monaco-editor/lib/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _rust_monaco_def__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rust_monaco_def */ "./editor/rust_monaco_def.ts");
/* harmony import */ var _Editor_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Editor.module.css */ "./editor/Editor.module.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






const MODE_ID = 'java';
const initMonaco = monaco => {
  monaco.editor.defineTheme('vscode-dark-plus', _rust_monaco_def__WEBPACK_IMPORTED_MODULE_3__.themeVsDarkPlus);
  monaco.languages.register({
    id: MODE_ID
  });
  monaco.languages.onLanguage(MODE_ID, async () => {
    monaco.languages.setLanguageConfiguration(MODE_ID, _rust_monaco_def__WEBPACK_IMPORTED_MODULE_3__.config);
    monaco.languages.setMonarchTokensProvider(MODE_ID, _rust_monaco_def__WEBPACK_IMPORTED_MODULE_3__.grammar);
  });
};
const initEditor = execute => (editor, monaco) => {
  editor.focus();
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    execute();
  });
  // Ace's Vim mode runs code with :w, so let's do the same
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    execute();
  });
};
const MonacoEditorCore = props => {
  const theme = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(s => s.configuration.monaco.theme);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_monaco_editor__WEBPACK_IMPORTED_MODULE_1__["default"], {
    language: MODE_ID,
    theme: theme,
    className: _Editor_module_css__WEBPACK_IMPORTED_MODULE_4__["default"].monaco,
    value: props.code,
    onChange: props.onEditCode,
    editorWillMount: initMonaco,
    editorDidMount: initEditor(props.execute),
    options: {
      automaticLayout: true,
      'semanticHighlighting.enabled': true
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MonacoEditorCore);

/***/ }),

/***/ "./editor/rust_monaco_def.ts":
/*!***********************************!*\
  !*** ./editor/rust_monaco_def.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   grammar: () => (/* binding */ grammar),
/* harmony export */   semanticTokensLegend: () => (/* binding */ semanticTokensLegend),
/* harmony export */   themeVsDarkPlus: () => (/* binding */ themeVsDarkPlus)
/* harmony export */ });
const config = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [{
    open: '[',
    close: ']'
  }, {
    open: '{',
    close: '}'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"',
    notIn: ['string']
  }],
  surroundingPairs: [{
    open: '{',
    close: '}'
  }, {
    open: '[',
    close: ']'
  }, {
    open: '(',
    close: ')'
  }, {
    open: '"',
    close: '"'
  }, {
    open: '\'',
    close: '\''
  }],
  folding: {
    markers: {
      start: new RegExp('^\\s*#pragma\\s+region\\b'),
      end: new RegExp('^\\s*#pragma\\s+endregion\\b')
    }
  }
};
const grammar = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',
  keywords: ['as', 'break', 'const', 'crate', 'enum', 'extern', 'false', 'fn', 'impl', 'in', 'let', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'macro_rules'],
  controlFlowKeywords: ['continue', 'else', 'for', 'if', 'while', 'loop', 'match'],
  typeKeywords: ['Self', 'm32', 'm64', 'm128', 'f80', 'f16', 'f128', 'int', 'uint', 'float', 'char', 'bool', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'i8', 'i16', 'i32', 'i64', 'str', 'Option', 'Either', 'c_float', 'c_double', 'c_void', 'FILE', 'fpos_t', 'DIR', 'dirent', 'c_char', 'c_schar', 'c_uchar', 'c_short', 'c_ushort', 'c_int', 'c_uint', 'c_long', 'c_ulong', 'size_t', 'ptrdiff_t', 'clock_t', 'time_t', 'c_longlong', 'c_ulonglong', 'intptr_t', 'uintptr_t', 'off_t', 'dev_t', 'ino_t', 'pid_t', 'mode_t', 'ssize_t'],
  operators: ['=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='],
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  // for strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [[/r"/, {
      token: 'string.quote',
      next: '@rawstring0'
    }], [/r(#+)"/, {
      token: 'string.quote',
      next: '@rawstring1.$1'
    }],
    // identifiers and keywords
    [/[a-z_$][\w$]*/, {
      cases: {
        '@typeKeywords': 'type.identifier',
        '@keywords': {
          cases: {
            'fn': {
              token: 'keyword',
              next: '@func_decl'
            },
            '@default': 'keyword'
          }
        },
        '@controlFlowKeywords': 'keyword.control',
        '@default': 'variable'
      }
    }], [/[A-Z][\w\$]*/, 'type.identifier'],
    // whitespace
    {
      include: '@whitespace'
    },
    // delimiters and operators
    [/[{}()\[\]]/, '@brackets'], [/[<>](?!@symbols)/, '@brackets'], [/@symbols/, {
      cases: {
        '@operators': 'operator',
        '@default': ''
      }
    }],
    // @ annotations.
    // As an example, we emit a debugging log message on these tokens.
    // Note: message are supressed during the first load -- change some lines to see them.
    [/@\s*[a-zA-Z_\$][\w\$]*/, {
      token: 'annotation',
      log: 'annotation token: $0'
    }],
    // numbers
    [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'], [/0[xX][0-9a-fA-F]+/, 'number.hex'], [/\d+/, 'number'],
    // delimiter: after number because of .\d floats
    [/[;,.]/, 'delimiter'],
    // strings
    [/"([^"\\]|\\.)*$/, 'string.invalid'], [/"/, {
      token: 'string.quote',
      bracket: '@open',
      next: '@string'
    }],
    // characters
    [/'[^\\']'/, 'string'], [/(')(@escapes)(')/, ['string', 'string.escape', 'string']], [/'/, 'string.invalid']],
    comment: [[/[^\/*]+/, 'comment'], [/\/\*/, 'comment', '@push'], ['\\*/', 'comment', '@pop'], [/[\/*]/, 'comment']],
    rawstring0: [[/[^"]+/, 'string'], [/"/, {
      token: 'string.quote',
      next: '@pop'
    }]],
    rawstring1: [[/"(#+)/, {
      cases: {
        '$1==$S2': {
          token: 'string.quote',
          next: '@pop'
        },
        '@default': {
          token: 'string'
        }
      }
    }], [/./, 'string']],
    string: [[/[^\\"]+/, 'string'], [/@escapes/, 'string.escape'], [/\\./, 'string.escape.invalid'], [/"/, {
      token: 'string.quote',
      bracket: '@close',
      next: '@pop'
    }]],
    whitespace: [[/[ \t\r\n]+/, 'white'], [/\/\*/, 'comment', '@comment'], [/\/\/.*$/, 'comment']],
    func_decl: [[/[a-z_$][\w$]*/, 'support.function', '@pop']]
  }
};
const themeVsDarkPlus = {
  base: 'vs-dark',
  inherit: true,
  colors: {},
  rules: [{
    token: 'keyword.control',
    foreground: 'C586C0'
  }, {
    token: 'string.escape',
    foreground: 'D7BA7D'
  }, {
    token: 'keyword.controlFlow',
    foreground: 'C586C0'
  }, {
    token: 'variable',
    foreground: '9CDCFE'
  }, {
    token: 'parameter',
    foreground: '9CDCFE'
  }, {
    token: 'property',
    foreground: '9CDCFE'
  }, {
    token: 'support.function',
    foreground: 'DCDCAA'
  }, {
    token: 'function',
    foreground: 'DCDCAA'
  }, {
    token: 'member',
    foreground: '4FC1FF'
  }, {
    token: 'variable.constant',
    foreground: '4FC1FF'
  }, {
    token: 'macro',
    foreground: '569CD6'
  }, {
    token: 'typeParameter',
    foreground: '4EC9B0'
  }, {
    token: 'interface',
    foreground: '4EC9B0'
  }, {
    token: 'namespace',
    foreground: '4EC9B0'
  }, {
    token: 'variable.mutable',
    fontStyle: 'underline'
  }, {
    token: 'parameter.mutable',
    fontStyle: 'underline'
  }]
};
const semanticTokensLegend = {
  tokenTypes: ['comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace', 'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function', 'member', 'macro', 'variable', 'parameter', 'property', 'label', 'unsupported'],
  tokenModifiers: ['documentation', 'declaration', 'definition', 'static', 'abstract', 'deprecated', 'readonly', 'default_library', 'async', 'attribute', 'callable', 'constant', 'consuming', 'controlFlow', 'crateRoot', 'injected', 'intraDocLink', 'library', 'mutable', 'public', 'reference', 'trait', 'unsafe']
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yX01vbmFjb0VkaXRvckNvcmVfdHN4LTcxYzRkZTUxNjRkMTk1NmQyNmQyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBRTBEO0FBQzFDO0FBRTJCO0FBRTVCO0FBQUE7QUFFekMsTUFBTVMsT0FBTyxHQUFHLE1BQU07QUFFdEIsTUFBTUMsVUFBVSxHQUFxQkMsTUFBTSxJQUFJO0VBQzdDQSxNQUFNLENBQUNDLE1BQU0sQ0FBQ0MsV0FBVyxDQUFDLGtCQUFrQixFQUFFUiw2REFBZSxDQUFDO0VBQzlETSxNQUFNLENBQUNHLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDO0lBQ3hCQyxFQUFFLEVBQUVQO0dBQ0wsQ0FBQztFQUVGRSxNQUFNLENBQUNHLFNBQVMsQ0FBQ0csVUFBVSxDQUFDUixPQUFPLEVBQUUsWUFBVztJQUM5Q0UsTUFBTSxDQUFDRyxTQUFTLENBQUNJLHdCQUF3QixDQUFDVCxPQUFPLEVBQUVOLG9EQUFNLENBQUM7SUFDMURRLE1BQU0sQ0FBQ0csU0FBUyxDQUFDSyx3QkFBd0IsQ0FBQ1YsT0FBTyxFQUFFTCxxREFBTyxDQUFDO0VBQzdELENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNZ0IsVUFBVSxHQUFJQyxPQUFrQixJQUFxQixDQUFDVCxNQUFNLEVBQUVELE1BQU0sS0FBSTtFQUM1RUMsTUFBTSxDQUFDVSxLQUFLLEVBQUU7RUFDZFYsTUFBTSxDQUFDVyxVQUFVLENBQUNaLE1BQU0sQ0FBQ2EsTUFBTSxDQUFDQyxPQUFPLEdBQUdkLE1BQU0sQ0FBQ2UsT0FBTyxDQUFDQyxLQUFLLEVBQUUsTUFBSztJQUNuRU4sT0FBTyxFQUFFO0VBQ1gsQ0FBQyxDQUFDO0VBQ0Y7RUFDQVQsTUFBTSxDQUFDVyxVQUFVLENBQUNaLE1BQU0sQ0FBQ2EsTUFBTSxDQUFDQyxPQUFPLEdBQUdkLE1BQU0sQ0FBQ2UsT0FBTyxDQUFDRSxJQUFJLEVBQUUsTUFBSztJQUNsRVAsT0FBTyxFQUFFO0VBQ1gsQ0FBQyxDQUFDO0FBQ0os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Q1YsV0FBVyxFQUNYLGFBQWEsRUFDYixXQUFXLEVBQ1gsVUFBVSxFQUNWLGNBQWMsRUFDZCxTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsRUFDUixXQUFXLEVBQ1gsT0FBTyxFQUNQLFFBQVE7Q0FFWCIsInNvdXJjZXMiOlsid2VicGFjazovL3VpLy4vZWRpdG9yL01vbmFjb0VkaXRvckNvcmUudHN4Iiwid2VicGFjazovL3VpLy4vZWRpdG9yL3J1c3RfbW9uYWNvX2RlZi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ29tbW9uRWRpdG9yUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgTW9uYWNvRWRpdG9yLCB7IEVkaXRvckRpZE1vdW50LCBFZGl0b3JXaWxsTW91bnQgfSBmcm9tICdyZWFjdC1tb25hY28tZWRpdG9yJztcbmltcG9ydCB7IHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7IGNvbmZpZywgZ3JhbW1hciwgdGhlbWVWc0RhcmtQbHVzIH0gZnJvbSAnLi9ydXN0X21vbmFjb19kZWYnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRWRpdG9yLm1vZHVsZS5jc3MnO1xuXG5jb25zdCBNT0RFX0lEID0gJ2phdmEnO1xuXG5jb25zdCBpbml0TW9uYWNvOiBFZGl0b3JXaWxsTW91bnQgPSAobW9uYWNvKSA9PiB7XG4gIG1vbmFjby5lZGl0b3IuZGVmaW5lVGhlbWUoJ3ZzY29kZS1kYXJrLXBsdXMnLCB0aGVtZVZzRGFya1BsdXMpO1xuICBtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyKHtcbiAgICBpZDogTU9ERV9JRCxcbiAgfSk7XG5cbiAgbW9uYWNvLmxhbmd1YWdlcy5vbkxhbmd1YWdlKE1PREVfSUQsIGFzeW5jICgpID0+IHtcbiAgICBtb25hY28ubGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbihNT0RFX0lELCBjb25maWcpO1xuICAgIG1vbmFjby5sYW5ndWFnZXMuc2V0TW9uYXJjaFRva2Vuc1Byb3ZpZGVyKE1PREVfSUQsIGdyYW1tYXIpO1xuICB9KTtcbn07XG5cbmNvbnN0IGluaXRFZGl0b3IgPSAoZXhlY3V0ZTogKCkgPT4gYW55KTogRWRpdG9yRGlkTW91bnQgPT4gKGVkaXRvciwgbW9uYWNvKSA9PiB7XG4gIGVkaXRvci5mb2N1cygpO1xuICBlZGl0b3IuYWRkQ29tbWFuZChtb25hY28uS2V5TW9kLkN0cmxDbWQgfCBtb25hY28uS2V5Q29kZS5FbnRlciwgKCkgPT4ge1xuICAgIGV4ZWN1dGUoKTtcbiAgfSk7XG4gIC8vIEFjZSdzIFZpbSBtb2RlIHJ1bnMgY29kZSB3aXRoIDp3LCBzbyBsZXQncyBkbyB0aGUgc2FtZVxuICBlZGl0b3IuYWRkQ29tbWFuZChtb25hY28uS2V5TW9kLkN0cmxDbWQgfCBtb25hY28uS2V5Q29kZS5LZXlTLCAoKSA9PiB7XG4gICAgZXhlY3V0ZSgpO1xuICB9KTtcbn07XG5cbmNvbnN0IE1vbmFjb0VkaXRvckNvcmU6IFJlYWN0LkZDPENvbW1vbkVkaXRvclByb3BzPiA9IHByb3BzID0+IHtcbiAgY29uc3QgdGhlbWUgPSB1c2VTZWxlY3RvcigoczogU3RhdGUpID0+IHMuY29uZmlndXJhdGlvbi5tb25hY28udGhlbWUpO1xuXG4gIHJldHVybiAoXG4gICAgPE1vbmFjb0VkaXRvclxuICAgICAgbGFuZ3VhZ2U9e01PREVfSUR9XG4gICAgICB0aGVtZT17dGhlbWV9XG4gICAgICBjbGFzc05hbWU9e3N0eWxlcy5tb25hY299XG4gICAgICB2YWx1ZT17cHJvcHMuY29kZX1cbiAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkVkaXRDb2RlfVxuICAgICAgZWRpdG9yV2lsbE1vdW50PXtpbml0TW9uYWNvfVxuICAgICAgZWRpdG9yRGlkTW91bnQ9e2luaXRFZGl0b3IocHJvcHMuZXhlY3V0ZSl9XG4gICAgICBvcHRpb25zPXt7XG4gICAgICAgIGF1dG9tYXRpY0xheW91dDogdHJ1ZSxcbiAgICAgICAgJ3NlbWFudGljSGlnaGxpZ2h0aW5nLmVuYWJsZWQnOiB0cnVlLFxuICAgICAgfX1cbiAgICAvPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNb25hY29FZGl0b3JDb3JlO1xuIiwiaW1wb3J0IHsgbGFuZ3VhZ2VzLCBlZGl0b3IgfSBmcm9tICdtb25hY28tZWRpdG9yJztcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogbGFuZ3VhZ2VzLkxhbmd1YWdlQ29uZmlndXJhdGlvbiA9IHtcbiAgY29tbWVudHM6IHtcbiAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICBibG9ja0NvbW1lbnQ6IFsnLyonLCAnKi8nXSxcbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbJ3snLCAnfSddLFxuICAgIFsnWycsICddJ10sXG4gICAgWycoJywgJyknXSxcbiAgXSxcbiAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZyddIH0sXG4gIF0sXG4gIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gIF0sXG4gIGZvbGRpbmc6IHtcbiAgICBtYXJrZXJzOiB7XG4gICAgICBzdGFydDogbmV3IFJlZ0V4cCgnXlxcXFxzKiNwcmFnbWFcXFxccytyZWdpb25cXFxcYicpLFxuICAgICAgZW5kOiBuZXcgUmVnRXhwKCdeXFxcXHMqI3ByYWdtYVxcXFxzK2VuZHJlZ2lvblxcXFxiJyksXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBncmFtbWFyOiBsYW5ndWFnZXMuSU1vbmFyY2hMYW5ndWFnZSA9IHtcbiAgLy8gU2V0IGRlZmF1bHRUb2tlbiB0byBpbnZhbGlkIHRvIHNlZSB3aGF0IHlvdSBkbyBub3QgdG9rZW5pemUgeWV0XG4gIC8vIGRlZmF1bHRUb2tlbjogJ2ludmFsaWQnLFxuXG4gIGtleXdvcmRzOiBbXG4gICAgJ2FzJywgJ2JyZWFrJywgJ2NvbnN0JywgJ2NyYXRlJywgJ2VudW0nLCAnZXh0ZXJuJywgJ2ZhbHNlJywgJ2ZuJywgJ2ltcGwnLCAnaW4nLFxuICAgICdsZXQnLCAnbW9kJywgJ21vdmUnLCAnbXV0JywgJ3B1YicsICdyZWYnLCAncmV0dXJuJywgJ3NlbGYnLCAnU2VsZicsICdzdGF0aWMnLFxuICAgICdzdHJ1Y3QnLCAnc3VwZXInLCAndHJhaXQnLCAndHJ1ZScsICd0eXBlJywgJ3Vuc2FmZScsICd1c2UnLCAnd2hlcmUnLFxuICAgICdtYWNyb19ydWxlcycsXG4gIF0sXG5cbiAgY29udHJvbEZsb3dLZXl3b3JkczogW1xuICAgICdjb250aW51ZScsICdlbHNlJywgJ2ZvcicsICdpZicsICd3aGlsZScsICdsb29wJywgJ21hdGNoJyxcbiAgXSxcblxuICB0eXBlS2V5d29yZHM6IFtcbiAgICAnU2VsZicsICdtMzInLCAnbTY0JywgJ20xMjgnLCAnZjgwJywgJ2YxNicsICdmMTI4JywgJ2ludCcsICd1aW50JywgJ2Zsb2F0JywgJ2NoYXInLFxuICAgICdib29sJywgJ3U4JywgJ3UxNicsICd1MzInLCAndTY0JywgJ2YzMicsICdmNjQnLCAnaTgnLCAnaTE2JywgJ2kzMicsICdpNjQnLCAnc3RyJyxcbiAgICAnT3B0aW9uJywgJ0VpdGhlcicsICdjX2Zsb2F0JywgJ2NfZG91YmxlJywgJ2Nfdm9pZCcsICdGSUxFJywgJ2Zwb3NfdCcsICdESVInLCAnZGlyZW50JyxcbiAgICAnY19jaGFyJywgJ2Nfc2NoYXInLCAnY191Y2hhcicsICdjX3Nob3J0JywgJ2NfdXNob3J0JywgJ2NfaW50JywgJ2NfdWludCcsICdjX2xvbmcnLCAnY191bG9uZycsXG4gICAgJ3NpemVfdCcsICdwdHJkaWZmX3QnLCAnY2xvY2tfdCcsICd0aW1lX3QnLCAnY19sb25nbG9uZycsICdjX3Vsb25nbG9uZycsICdpbnRwdHJfdCcsXG4gICAgJ3VpbnRwdHJfdCcsICdvZmZfdCcsICdkZXZfdCcsICdpbm9fdCcsICdwaWRfdCcsICdtb2RlX3QnLCAnc3NpemVfdCcsXG4gIF0sXG5cbiAgb3BlcmF0b3JzOiBbXG4gICAgJz0nLCAnPicsICc8JywgJyEnLCAnficsICc/JywgJzonLCAnPT0nLCAnPD0nLCAnPj0nLCAnIT0nLFxuICAgICcmJicsICd8fCcsICcrKycsICctLScsICcrJywgJy0nLCAnKicsICcvJywgJyYnLCAnfCcsICdeJywgJyUnLFxuICAgICc8PCcsICc+PicsICc+Pj4nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJj0nLCAnfD0nLCAnXj0nLFxuICAgICclPScsICc8PD0nLCAnPj49JywgJz4+Pj0nLFxuICBdLFxuXG4gIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgc3ltYm9sczogL1s9Pjwhfj86JnwrXFwtKlxcL1xcXiVdKy8sXG5cbiAgLy8gZm9yIHN0cmluZ3NcbiAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcblxuICAvLyBUaGUgbWFpbiB0b2tlbml6ZXIgZm9yIG91ciBsYW5ndWFnZXNcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1xuICAgICAgWy9yXCIvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgbmV4dDogJ0ByYXdzdHJpbmcwJyB9XSxcbiAgICAgIFsvcigjKylcIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBuZXh0OiAnQHJhd3N0cmluZzEuJDEnIH1dLFxuICAgICAgLy8gaWRlbnRpZmllcnMgYW5kIGtleXdvcmRzXG4gICAgICBbL1thLXpfJF1bXFx3JF0qLywge1xuICAgICAgICBjYXNlczoge1xuICAgICAgICAgICdAdHlwZUtleXdvcmRzJzogJ3R5cGUuaWRlbnRpZmllcicsXG4gICAgICAgICAgJ0BrZXl3b3Jkcyc6IHtcbiAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICdmbic6IHsgdG9rZW46ICdrZXl3b3JkJywgbmV4dDogJ0BmdW5jX2RlY2wnIH0sXG4gICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnQGNvbnRyb2xGbG93S2V5d29yZHMnOiAna2V5d29yZC5jb250cm9sJyxcbiAgICAgICAgICAnQGRlZmF1bHQnOiAndmFyaWFibGUnLFxuICAgICAgICB9LFxuICAgICAgfV0sXG4gICAgICBbL1tBLVpdW1xcd1xcJF0qLywgJ3R5cGUuaWRlbnRpZmllciddLCAgLy8gdG8gc2hvdyBjbGFzcyBuYW1lcyBuaWNlbHlcblxuICAgICAgLy8gd2hpdGVzcGFjZVxuICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG5cbiAgICAgIC8vIGRlbGltaXRlcnMgYW5kIG9wZXJhdG9yc1xuICAgICAgWy9be30oKVxcW1xcXV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCAnQGJyYWNrZXRzJ10sXG4gICAgICBbL0BzeW1ib2xzLywge1xuICAgICAgICBjYXNlczoge1xuICAgICAgICAgICdAb3BlcmF0b3JzJzogJ29wZXJhdG9yJyxcbiAgICAgICAgICAnQGRlZmF1bHQnOiAnJyxcbiAgICAgICAgfSxcbiAgICAgIH1dLFxuXG4gICAgICAvLyBAIGFubm90YXRpb25zLlxuICAgICAgLy8gQXMgYW4gZXhhbXBsZSwgd2UgZW1pdCBhIGRlYnVnZ2luZyBsb2cgbWVzc2FnZSBvbiB0aGVzZSB0b2tlbnMuXG4gICAgICAvLyBOb3RlOiBtZXNzYWdlIGFyZSBzdXByZXNzZWQgZHVyaW5nIHRoZSBmaXJzdCBsb2FkIC0tIGNoYW5nZSBzb21lIGxpbmVzIHRvIHNlZSB0aGVtLlxuICAgICAgWy9AXFxzKlthLXpBLVpfXFwkXVtcXHdcXCRdKi8sIHsgdG9rZW46ICdhbm5vdGF0aW9uJywgbG9nOiAnYW5ub3RhdGlvbiB0b2tlbjogJDAnIH1dLFxuXG4gICAgICAvLyBudW1iZXJzXG4gICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdCddLFxuICAgICAgWy8wW3hYXVswLTlhLWZBLUZdKy8sICdudW1iZXIuaGV4J10sXG4gICAgICBbL1xcZCsvLCAnbnVtYmVyJ10sXG5cbiAgICAgIC8vIGRlbGltaXRlcjogYWZ0ZXIgbnVtYmVyIGJlY2F1c2Ugb2YgLlxcZCBmbG9hdHNcbiAgICAgIFsvWzssLl0vLCAnZGVsaW1pdGVyJ10sXG5cbiAgICAgIC8vIHN0cmluZ3NcbiAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgJ3N0cmluZy5pbnZhbGlkJ10sICAvLyBub24tdGVtaW5hdGVkIHN0cmluZ1xuICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQG9wZW4nLCBuZXh0OiAnQHN0cmluZycgfV0sXG5cbiAgICAgIC8vIGNoYXJhY3RlcnNcbiAgICAgIFsvJ1teXFxcXCddJy8sICdzdHJpbmcnXSxcbiAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgWy8nLywgJ3N0cmluZy5pbnZhbGlkJ10sXG4gICAgXSxcblxuICAgIGNvbW1lbnQ6IFtcbiAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudCddLFxuICAgICAgWy9cXC9cXCovLCAnY29tbWVudCcsICdAcHVzaCddLCAgICAvLyBuZXN0ZWQgY29tbWVudFxuICAgICAgWydcXFxcKi8nLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICBbL1tcXC8qXS8sICdjb21tZW50J10sXG4gICAgXSxcblxuICAgIHJhd3N0cmluZzA6IFtbL1teXCJdKy8sICdzdHJpbmcnXSwgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBuZXh0OiAnQHBvcCcgfV1dLFxuICAgIHJhd3N0cmluZzE6IFtcbiAgICAgIFsvXCIoIyspLywge1xuICAgICAgICBjYXNlczoge1xuICAgICAgICAgICckMT09JFMyJzogeyB0b2tlbjogJ3N0cmluZy5xdW90ZScsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46ICdzdHJpbmcnIH0sXG4gICAgICAgIH0sXG4gICAgICB9XSxcbiAgICAgIFsvLi8sICdzdHJpbmcnXSxcbiAgICBdLFxuICAgIHN0cmluZzogW1xuICAgICAgWy9bXlxcXFxcIl0rLywgJ3N0cmluZyddLFxuICAgICAgWy9AZXNjYXBlcy8sICdzdHJpbmcuZXNjYXBlJ10sXG4gICAgICBbL1xcXFwuLywgJ3N0cmluZy5lc2NhcGUuaW52YWxpZCddLFxuICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBicmFja2V0OiAnQGNsb3NlJywgbmV4dDogJ0Bwb3AnIH1dLFxuICAgIF0sXG5cbiAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICBbL1sgXFx0XFxyXFxuXSsvLCAnd2hpdGUnXSxcbiAgICAgIFsvXFwvXFwqLywgJ2NvbW1lbnQnLCAnQGNvbW1lbnQnXSxcbiAgICAgIFsvXFwvXFwvLiokLywgJ2NvbW1lbnQnXSxcbiAgICBdLFxuXG4gICAgZnVuY19kZWNsOiBbXG4gICAgICBbXG4gICAgICAgIC9bYS16XyRdW1xcdyRdKi8sICdzdXBwb3J0LmZ1bmN0aW9uJywgJ0Bwb3AnLFxuICAgICAgXSxcbiAgICBdLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHRoZW1lVnNEYXJrUGx1czogZWRpdG9yLklTdGFuZGFsb25lVGhlbWVEYXRhID0ge1xuICBiYXNlOiAndnMtZGFyaycsXG4gIGluaGVyaXQ6IHRydWUsXG4gIGNvbG9yczoge30sXG4gIHJ1bGVzOiBbXG4gICAgeyB0b2tlbjogJ2tleXdvcmQuY29udHJvbCcsIGZvcmVncm91bmQ6ICdDNTg2QzAnIH0sXG4gICAgeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUnLCBmb3JlZ3JvdW5kOiAnRDdCQTdEJyB9LFxuICAgIHsgdG9rZW46ICdrZXl3b3JkLmNvbnRyb2xGbG93JywgZm9yZWdyb3VuZDogJ0M1ODZDMCcgfSxcbiAgICB7IHRva2VuOiAndmFyaWFibGUnLCBmb3JlZ3JvdW5kOiAnOUNEQ0ZFJyB9LFxuICAgIHsgdG9rZW46ICdwYXJhbWV0ZXInLCBmb3JlZ3JvdW5kOiAnOUNEQ0ZFJyB9LFxuICAgIHsgdG9rZW46ICdwcm9wZXJ0eScsIGZvcmVncm91bmQ6ICc5Q0RDRkUnIH0sXG4gICAgeyB0b2tlbjogJ3N1cHBvcnQuZnVuY3Rpb24nLCBmb3JlZ3JvdW5kOiAnRENEQ0FBJyB9LFxuICAgIHsgdG9rZW46ICdmdW5jdGlvbicsIGZvcmVncm91bmQ6ICdEQ0RDQUEnIH0sXG4gICAgeyB0b2tlbjogJ21lbWJlcicsIGZvcmVncm91bmQ6ICc0RkMxRkYnIH0sXG4gICAgeyB0b2tlbjogJ3ZhcmlhYmxlLmNvbnN0YW50JywgZm9yZWdyb3VuZDogJzRGQzFGRicgfSxcbiAgICB7IHRva2VuOiAnbWFjcm8nLCBmb3JlZ3JvdW5kOiAnNTY5Q0Q2JyB9LFxuICAgIHsgdG9rZW46ICd0eXBlUGFyYW1ldGVyJywgZm9yZWdyb3VuZDogJzRFQzlCMCcgfSxcbiAgICB7IHRva2VuOiAnaW50ZXJmYWNlJywgZm9yZWdyb3VuZDogJzRFQzlCMCcgfSxcbiAgICB7IHRva2VuOiAnbmFtZXNwYWNlJywgZm9yZWdyb3VuZDogJzRFQzlCMCcgfSxcbiAgICB7IHRva2VuOiAndmFyaWFibGUubXV0YWJsZScsIGZvbnRTdHlsZTogJ3VuZGVybGluZScgfSxcbiAgICB7IHRva2VuOiAncGFyYW1ldGVyLm11dGFibGUnLCBmb250U3R5bGU6ICd1bmRlcmxpbmUnIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3Qgc2VtYW50aWNUb2tlbnNMZWdlbmQ6IGxhbmd1YWdlcy5TZW1hbnRpY1Rva2Vuc0xlZ2VuZCA9IHtcbiAgdG9rZW5UeXBlczogW1xuICAgICdjb21tZW50JyxcbiAgICAnc3RyaW5nJyxcbiAgICAna2V5d29yZCcsXG4gICAgJ251bWJlcicsXG4gICAgJ3JlZ2V4cCcsXG4gICAgJ29wZXJhdG9yJyxcbiAgICAnbmFtZXNwYWNlJyxcbiAgICAndHlwZScsXG4gICAgJ3N0cnVjdCcsXG4gICAgJ2NsYXNzJyxcbiAgICAnaW50ZXJmYWNlJyxcbiAgICAnZW51bScsXG4gICAgJ3R5cGVQYXJhbWV0ZXInLFxuICAgICdmdW5jdGlvbicsXG4gICAgJ21lbWJlcicsXG4gICAgJ21hY3JvJyxcbiAgICAndmFyaWFibGUnLFxuICAgICdwYXJhbWV0ZXInLFxuICAgICdwcm9wZXJ0eScsXG4gICAgJ2xhYmVsJyxcbiAgICAndW5zdXBwb3J0ZWQnLFxuICBdLFxuICB0b2tlbk1vZGlmaWVyczogW1xuICAgICdkb2N1bWVudGF0aW9uJyxcbiAgICAnZGVjbGFyYXRpb24nLFxuICAgICdkZWZpbml0aW9uJyxcbiAgICAnc3RhdGljJyxcbiAgICAnYWJzdHJhY3QnLFxuICAgICdkZXByZWNhdGVkJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdkZWZhdWx0X2xpYnJhcnknLFxuICAgICdhc3luYycsXG4gICAgJ2F0dHJpYnV0ZScsXG4gICAgJ2NhbGxhYmxlJyxcbiAgICAnY29uc3RhbnQnLFxuICAgICdjb25zdW1pbmcnLFxuICAgICdjb250cm9sRmxvdycsXG4gICAgJ2NyYXRlUm9vdCcsXG4gICAgJ2luamVjdGVkJyxcbiAgICAnaW50cmFEb2NMaW5rJyxcbiAgICAnbGlicmFyeScsXG4gICAgJ211dGFibGUnLFxuICAgICdwdWJsaWMnLFxuICAgICdyZWZlcmVuY2UnLFxuICAgICd0cmFpdCcsXG4gICAgJ3Vuc2FmZScsXG4gIF0sXG59O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiTW9uYWNvRWRpdG9yIiwidXNlU2VsZWN0b3IiLCJjb25maWciLCJncmFtbWFyIiwidGhlbWVWc0RhcmtQbHVzIiwic3R5bGVzIiwianN4IiwiX2pzeCIsIk1PREVfSUQiLCJpbml0TW9uYWNvIiwibW9uYWNvIiwiZWRpdG9yIiwiZGVmaW5lVGhlbWUiLCJsYW5ndWFnZXMiLCJyZWdpc3RlciIsImlkIiwib25MYW5ndWFnZSIsInNldExhbmd1YWdlQ29uZmlndXJhdGlvbiIsInNldE1vbmFyY2hUb2tlbnNQcm92aWRlciIsImluaXRFZGl0b3IiLCJleGVjdXRlIiwiZm9jdXMiLCJhZGRDb21tYW5kIiwiS2V5TW9kIiwiQ3RybENtZCIsIktleUNvZGUiLCJFbnRlciIsIktleVMiLCJNb25hY29FZGl0b3JDb3JlIiwicHJvcHMiLCJ0aGVtZSIsInMiLCJjb25maWd1cmF0aW9uIiwibGFuZ3VhZ2UiLCJjbGFzc05hbWUiLCJ2YWx1ZSIsImNvZGUiLCJvbkNoYW5nZSIsIm9uRWRpdENvZGUiLCJlZGl0b3JXaWxsTW91bnQiLCJlZGl0b3JEaWRNb3VudCIsIm9wdGlvbnMiLCJhdXRvbWF0aWNMYXlvdXQiLCJjb21tZW50cyIsImxpbmVDb21tZW50IiwiYmxvY2tDb21tZW50IiwiYnJhY2tldHMiLCJhdXRvQ2xvc2luZ1BhaXJzIiwib3BlbiIsImNsb3NlIiwibm90SW4iLCJzdXJyb3VuZGluZ1BhaXJzIiwiZm9sZGluZyIsIm1hcmtlcnMiLCJzdGFydCIsIlJlZ0V4cCIsImVuZCIsImtleXdvcmRzIiwiY29udHJvbEZsb3dLZXl3b3JkcyIsInR5cGVLZXl3b3JkcyIsIm9wZXJhdG9ycyIsInN5bWJvbHMiLCJlc2NhcGVzIiwidG9rZW5pemVyIiwicm9vdCIsInRva2VuIiwibmV4dCIsImNhc2VzIiwiaW5jbHVkZSIsImxvZyIsImJyYWNrZXQiLCJjb21tZW50IiwicmF3c3RyaW5nMCIsInJhd3N0cmluZzEiLCJzdHJpbmciLCJ3aGl0ZXNwYWNlIiwiZnVuY19kZWNsIiwiYmFzZSIsImluaGVyaXQiLCJjb2xvcnMiLCJydWxlcyIsImZvcmVncm91bmQiLCJmb250U3R5bGUiLCJzZW1hbnRpY1Rva2Vuc0xlZ2VuZCIsInRva2VuVHlwZXMiLCJ0b2tlbk1vZGlmaWVycyJdLCJzb3VyY2VSb290IjoiIn0=