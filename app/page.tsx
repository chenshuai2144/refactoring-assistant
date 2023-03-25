'use client';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { lessToCssInJs } from '@chenshuai2144/less2cssinjs';

function Home() {
  const [lessCode, setLessCode] = React.useState('');
  const [cssInJsCode, setCssInJsCode] = React.useState('');
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <button
        style={{
          position: 'fixed',
          right: 25,
          zIndex: 100,
          padding: 12,
          bottom: 25,
        }}
        onClick={() => {
          try {
            setCssInJsCode(lessToCssInJs(lessCode));
          } catch (error) {
            console.log(error);
            alert("Can't parse less code");
          }
        }}
      >
        lessToCssInJs
      </button>
      <MonacoEditor
        language="less"
        editorDidMount={() => {
          // @ts-ignore
          window.MonacoEnvironment.getWorkerUrl = (
            _moduleId: string,
            label: string
          ) => {
            if (label === 'json') return '_next/static/json.worker.js';
            if (label === 'css') return '_next/static/css.worker.js';
            if (label === 'less') return '_next/static/less.worker.js';
            if (label === 'typescript' || label === 'javascript')
              return '_next/static/ts.worker.js';
            return '_next/static/editor.worker.js';
          };
        }}
        width="50vw"
        height="100vh"
        theme="vs-dark"
        value={lessCode}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={setLessCode}
      />
      <MonacoEditor
        language="typescript"
        editorDidMount={() => {
          // @ts-ignore
          window.MonacoEnvironment.getWorkerUrl = (
            _moduleId: string,
            label: string
          ) => {
            if (label === 'json') return '_next/static/json.worker.js';
            if (label === 'css') return '_next/static/css.worker.js';
            if (label === 'less') return '_next/static/less.worker.js';
            if (label === 'typescript' || label === 'javascript')
              return '_next/static/ts.worker.js';
            return '_next/static/editor.worker.js';
          };
        }}
        width="50vw"
        height="100vh"
        theme="vs-dark"
        value={cssInJsCode}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
}

export default Home;
