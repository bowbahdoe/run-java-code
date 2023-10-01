import Prism from 'prismjs';
import { Runtime, makePosition, Position } from './types';

interface ConfigureRustErrorsArgs {
  enableFeatureGate: (feature: string) => void;
  getRuntime: () => Runtime;
  gotoPosition: (line: string | number, column: string | number) => void;
  selectText: (start: Position, end: Position) => void;
  addImport: (code: string) => void;
}

export function configureRustErrors({
  enableFeatureGate,
  getRuntime,
  gotoPosition,
  selectText,
  addImport,
}: ConfigureRustErrorsArgs) {
  Prism.languages.rust_errors = {
    'warning': {
      pattern: /^warning(\[E\d+\])?:.*$/m,
      inside: {
        'error-explanation': /\[E\d+\]/,
      },
    },
    'error': {
      pattern: /^error(\[E\d+\])?:.*$/m,
      inside: {
        'error-explanation': /\[E\d+\]/,
      },
    },
    'note': {
      pattern: /^\s*=\s*note:.*$/m,
      inside: {
        'see-issue': /see .*rust-lang\/rust\/issues\/\d+>/,
      },
    },
    'error-location': /-->\s+(\/playground\/)?src\/.*\n/,
    'import-suggestion-outer': {
      pattern: /\+\s+use\s+([^;]+);/,
      inside: {
        'import-suggestion': /use\s+.*/,
      },
    },
    'rust-errors-help': {
      pattern: /help:.*\n/,
      inside: {
        'feature-gate': /add `#\!\[feature\(.+?\)\]`/,
      },
    },
  };

  Prism.languages.rust_mir = {
    'mir-source': /src\/[A-Za-z0-9_.\-]+\.rs:\d+:\d+: \d+:\d+/,
  }

  Prism.hooks.add('wrap', env => {
    if (env.type === 'error-explanation') {
      const errorMatch = /E\d+/.exec(env.content);
      if (errorMatch) {
        const [errorCode] = errorMatch;
        env.tag = 'a';
        env.attributes.href = `https://doc.rust-lang.org/${getRuntime()}/error_codes/${errorCode}.html`;
        env.attributes.target = '_blank';
      }
    }
    if (env.type === 'see-issue') {
      const errorMatch = /\d+/.exec(env.content);
      if (errorMatch) {
        const [errorCode] = errorMatch;
        env.tag = 'a';
        env.attributes.href = `https://github.com/rust-lang/rust/issues/${errorCode}`;
        env.attributes.target = '_blank';
      }
    }
    if (env.type === 'error-location') {
      let line;
      let col;
      const errorMatchFull = /(\d+):(\d+)/.exec(env.content);
      if (errorMatchFull) {
        line = errorMatchFull[1];
        col = errorMatchFull[2];
      } else {
        const errorMatchShort = /:(\d+)/.exec(env.content);
        if (errorMatchShort) {
          line = errorMatchShort[1];
          col = '1';
        }
      }
      env.tag = 'a';
      env.attributes.href = '#';
      if (line && col) {
        env.attributes['data-line'] = line;
        env.attributes['data-col'] = col;
      }
    }
    if (env.type === 'import-suggestion') {
      env.tag = 'a';
      env.attributes.href = '#';
      env.attributes['data-suggestion'] = env.content;
    }
    if (env.type === 'feature-gate') {
      const featureMatch = /feature\((.*?)\)/.exec(env.content);
      if (featureMatch) {
        const [_, featureGate] = featureMatch;
        env.tag = 'a';
        env.attributes.href = '#';
        env.attributes['data-feature-gate'] = featureGate;
      }
    }
    if (env.type === 'mir-source') {
      const lineMatch = /(\d+):(\d+): (\d+):(\d+)/.exec(env.content);
      if (lineMatch) {
        const [_, startLine, startCol, endLine, endCol] = lineMatch;
        env.tag = 'a';
        env.attributes.href = '#';
        env.attributes['data-start-line'] = startLine;
        env.attributes['data-start-col'] = startCol;
        env.attributes['data-end-line'] = endLine;
        env.attributes['data-end-col'] = endCol;
      }
    }
  });

  Prism.hooks.add('after-highlight', env => {
    const links = env.element.querySelectorAll('.error-location, .backtrace-location');
    Array.from(links).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        const { line, col } = link.dataset;
        link.onclick = e => {
          e.preventDefault();
          if (line && col) {
            gotoPosition(line, col);
          }
        };
      }
    });

    const importSuggestions = env.element.querySelectorAll('.import-suggestion');
    Array.from(importSuggestions).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        const { suggestion } = link.dataset;
        link.onclick = (e) => {
          e.preventDefault();
          addImport(suggestion + '\n');
        };
      }
    });

    const featureGateEnablers = env.element.querySelectorAll('.feature-gate');
    Array.from(featureGateEnablers).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        link.onclick = e => {
          e.preventDefault();
          if (link.dataset.featureGate) {
            enableFeatureGate(link.dataset.featureGate);
            gotoPosition(1, 1);
          }
        };
      }
    });

    const mirSourceLinks = env.element.querySelectorAll('.mir-source');
    Array.from(mirSourceLinks).forEach(link => {
      if (link instanceof HTMLAnchorElement) {
        const { startLine, startCol, endLine, endCol } = link.dataset;
        if (startLine && startCol && endLine && endCol) {
          const start = makePosition(startLine, startCol);
          const end = makePosition(endLine, endCol);

          link.onclick = e => {
            e.preventDefault();
            selectText(start, end);
          };
        }
      }
    });
  });
}
