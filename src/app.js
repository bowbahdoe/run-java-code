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
      maxLines: Infinity,
      autoScrollEditorIntoView: true,
    });

    const outputEditor = ace.edit(outputEditorRef.current, {
      value: '',
      mode: 'ace/mode/plain_text',
      theme: 'ace/theme/monokai',
      readOnly: true,
      maxLines: Infinity,
      autoScrollEditorIntoView: true,
      showLineNumbers: false,
    });

    editorInstance.current = editor;
    outputEditorInstance.current = outputEditor;

    window.addEventListener('resize', () => {
      editor.resize();
      outputEditor.resize();
    });

    // Adding a delay to ensure all rendering is finished before calculating the lines
    setTimeout(() => {
      // Get the elements' height.
      const editorHeight = editorRef.current.clientHeight;
      const outputEditorHeight = outputEditorRef.current.clientHeight;

      // Calculate the number of lines.
      const editorLines = Math.floor(editorHeight / editor.renderer.lineHeight);
      const outputEditorLines = Math.floor(outputEditorHeight / outputEditor.renderer.lineHeight);

      // Set the number of lines.
      editor.setOption('minLines', editorLines);
      outputEditor.setOption('minLines', outputEditorLines);
    }, 0);
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
      <header className="p-6 bg-blue-500 text-white text-2xl rounded-md mb-4 header flex justify-between items-center">
        <button
          role="button"
          aria-label="Run the Java code"
          className="py-2 px-4 bg-green-500 text-white rounded-md run-button"
          onClick={runCode}
        >
          Run
        </button>
        <div class="title">Java Playground</div>
      </header>
      <main className="main flex">
        <div
          id="editor"
          ref={editorRef}
          className="editor w-full p-2 overflow-hidden rounded-md bg-gray-900 text-white"
        ></div>
        <div
          id="outputEditor"
          ref={outputEditorRef}
          className="outputEditor w-full p-2 overflow-hidden rounded-md bg-gray-900 text-white"
        ></div>
      </main>
    </div>
  );
};

export default App;
