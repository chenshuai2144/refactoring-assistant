'use client';
import React from 'react';
import { lessToCssInJs } from '@chenshuai2144/less2cssinjs';
import { FloatButton, Spin } from 'antd';
import {
  AuditOutlined,
  BulbOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(
  () => import('../components/MonacoEditor').then((e) => e.MonacoEditor),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          padding: 64,
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>
    ),
  }
);

function BigfishToV4() {
  const [lessCode, setLessCode] = React.useState('');
  const [cssInJsCode, setCssInJsCode] = React.useState('');
  return (
    <>
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
        icon={<BulbOutlined />}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        <MonacoEditor
          language="less"
          width="50%"
          height="100%"
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
          width="50%"
          height="100%"
          theme="vs-dark"
          value={cssInJsCode}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </>
  );
}

export default BigfishToV4;
