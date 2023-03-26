'use client';
import React from 'react';
import { lessToCssInJs } from '@chenshuai2144/less2cssinjs';
import { FloatButton, Spin } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(
  () => import('./components/MonacoEditor').then((e) => e.MonacoEditor),
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

function Home() {
  const [lessCode, setLessCode] = React.useState(`
  .miniChart {
    position: relative;
    width: 100%;
    .chartContent {
      position: absolute;
      bottom: -28px;
      width: 100%;
      > div {
        margin: 0 -5px;
        overflow: hidden;
      }
    }
    .chartLoading {
      position: absolute;
      top: 16px;
      left: 50%;
      margin-left: -7px;
    }
  }
  `);
  const [cssInJsCode, setCssInJsCode] = React.useState(`
  import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    miniChart: {
      position: 'relative',
      width: '100%',
    },
    chartContent: {
      position: 'absolute',
      bottom: '-28px',
      width: '100%',
      '> div': { margin: '0 -5px', overflow: 'hidden' },
    },
    chartLoading: {
      position: 'absolute',
      top: '16px',
      left: '50%',
      marginLeft: '-7px',
    },
  };
});
export default useStyles;
  `);
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
        icon={<CloudSyncOutlined />}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        <MonacoEditor
          language="typescript"
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

export default Home;
