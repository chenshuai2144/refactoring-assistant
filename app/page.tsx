'use client';
import React, { useEffect } from 'react';
import { lessToCssInJs } from '@chenshuai2144/less2cssinjs';
import { FloatButton } from 'antd';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { CloudSyncOutlined } from '@ant-design/icons';

const MonacoEditor: React.FC<{
  language?: string;
  width?: string;
  height?: string;
  theme?: string;
  value?: string;
  editorDidMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  options?: monaco.editor.IEditorOptions;
  onChange?: (value: string) => void;
}> = (props) => {
  const htmlRef = React.useRef<HTMLDivElement>(null);
  const monacoEditorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  // 初始化编辑器
  useEffect(() => {
    if (!htmlRef.current) return;

    if (typeof window === 'undefined') return;
    if (typeof navigator === 'undefined') return;

    // @ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (
      _moduleId: string,
      label: string
    ) => {
      if (label === 'json') return '_next/static/json.worker.js';
      if (label === 'css') return '_next/static/css.worker.js';
      if (label === 'less') return '_next/static/css.worker.js';
      if (label === 'typescript' || label === 'javascript')
        return '_next/static/ts.worker.js';
      return '_next/static/editor.worker.js';
    };

    // 初始化编辑器
    const monacoEditor = monaco.editor.create(htmlRef.current, {
      value: props.value,
      theme: props.theme || 'vs-dark',
      language: props.language || 'typescript',
      automaticLayout: true,
      ...props.options,
    });
    // 监听编辑器内容变化
    monacoEditor.onDidChangeModelContent((event) => {
      props.onChange?.(monacoEditor.getValue());
    });
    // 暴露编辑器实例
    props.editorDidMount?.(monacoEditor);
    monacoEditorRef.current = monacoEditor;
  }, []);

  // 更新编辑器内容
  useEffect(() => {
    if (!props.value) return;
    if (!monacoEditorRef.current) return;

    const { value } = props;
    if (value === monacoEditorRef.current?.getValue()) {
      return;
    }
    const model = monacoEditorRef.current?.getModel();
    monacoEditorRef.current?.pushUndoStop();
    // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
    model?.pushEditOperations(
      [],
      [
        {
          range: model.getFullModelRange(),
          text: value,
        },
      ],
      () => null
    );
    monacoEditorRef.current?.pushUndoStop();
  }, [props.value]);

  useEffect(() => {
    if (htmlRef.current === null) return;
    if (!window.ResizeObserver) return;
    if (!monacoEditorRef.current) return;
    // 监听编辑器容器大小变化
    const observer = new ResizeObserver(() => {
      // 需要延迟一帧执行
      window.setTimeout(() => monacoEditorRef.current?.layout(), 0);
    });
    observer.observe(htmlRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={htmlRef}
      style={{
        width: props.width,
        height: props.height,
      }}
    />
  );
};

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
      <FloatButton
        onClick={() => {
          try {
            setCssInJsCode(lessToCssInJs(lessCode));
          } catch (error) {
            console.log(error);
            alert("Can't parse less code");
          }
        }}
        type="primary"
        icon={<CloudSyncOutlined />}
      />
      <MonacoEditor
        language="less"
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
