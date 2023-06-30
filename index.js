var editor;
var outputEditor;

function handleTabKey(event) {
  if (event.key === "Tab") {
    event.preventDefault(); // Prevent the default focus switching behavior

    var textarea = event.target;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;

    // Insert a tab character at the current cursor position
    textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

    // Move the cursor position after the inserted tab character
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
}

function runCode() {
  var code = editor.getValue();
  outputEditor.setValue('Running...');

  fetch('http://146.190.154.242:3000/run-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({code: code})
  })
  .then(response => response.json())
  .then(data => {
    if (data.stdout) outputEditor.setValue(data.stdout);
    if (data.stderr) outputEditor.setValue("[Error] " + data.stderr);
    if (data.error) outputEditor.setValue("[Error] " + data.error);
  });
}

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {
  editor = monaco.editor.create(document.getElementById('editorContainer'), {
    value: 'Enter your Java code here',
    language: 'java',
    theme: 'vs-dark'
  });

  outputEditor = monaco.editor.create(document.getElementById('outputContainer'), {
    value: '',
    language: 'plaintext',
    theme: 'vs-dark',
    readOnly: true,
    minimap: {
      enabled: false
    }
  });
});
