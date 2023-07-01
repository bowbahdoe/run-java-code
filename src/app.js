import React, { useEffect, useRef } from 'react';
import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-plain_text';
import './app.css';

const App = () => {
  const editorRef = useRef(null);
  const outputEditorRef = useRef(null);
  const editorInstance = useRef(null);
  const outputEditorInstance = useRef(null);

  useEffect(() => {
    const editor = ace.edit(editorRef.current, {
      value: 'Enter your Java code here',
      mode: 'ace/mode/java',
      theme: 'ace/theme/monokai',
      maxLines: 30,
      minLines: 5,
    });

    const outputEditor = ace.edit(outputEditorRef.current, {
      value: '',
      mode: 'ace/mode/plain_text',
      theme: 'ace/theme/monokai',
      readOnly: true,
      maxLines: 30,
      minLines: 5,
      showLineNumbers: false,
    });

    editorInstance.current = editor;
    outputEditorInstance.current = outputEditor;
  }, []);

  const runJavaCode = (code) => {
    return fetch('http://localhost:3000/run-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    }).then((response) => response.json());
  };

  const runCode = () => {
    const code = editorInstance.current.getValue();
    outputEditorInstance.current.setValue('Running...');
  
    runJavaCode(code)
      .then((data) => {
        if (data.stdout) {
          outputEditorInstance.current.setValue(data.stdout);
        } else if (data.stderr) {
          outputEditorInstance.current.setValue("[Error] " + data.stderr);
        } else if (data.error) {
          outputEditorInstance.current.setValue("[Error] " + data.error);
        } else {
          outputEditorInstance.current.setValue("[Error] Unknown error occurred.");
        }
      })
      .catch((error) => {
        outputEditorInstance.current.setValue("[Error] " + error.message);
      });
  };

  return (
    <div className="bg-gray-100 h-screen">
      <header className="p-6 bg-blue-500 text-center text-white text-2xl rounded-md mb-4">
        Java Playground
      </header>
      <main className="flex flex-wrap justify-center items-start h-full overflow-y-auto">
        <div
          ref={editorRef}
          className="w-full md:w-1/2 h-1/2 p-2 overflow-hidden rounded-md bg-gray-900 text-white"
        ></div>
        <div
          ref={outputEditorRef}
          className="w-full md:w-1/2 h-1/2 p-2 overflow-hidden rounded-md bg-gray-900 text-white"
        ></div>
      </main>
      <footer className="p-6 flex justify-center items-center">
        <button
          role="button"
          aria-label="Run the Java code"
          className="py-2 px-4 bg-green-500 text-white rounded-md run-button"
          onClick={runCode}
        >
          Run
        </button>
      </footer>
    </div>
  );
};

export default App;
