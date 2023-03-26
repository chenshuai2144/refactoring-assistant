'use client';
import React from 'react';
import { lessToCssInJs } from '@chenshuai2144/less2cssinjs';
import { FloatButton, Spin } from 'antd';
import { AuditOutlined } from '@ant-design/icons';

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

function ClassToHooks() {
  const [lessCode, setLessCode] =
    React.useState(`class TagCloud extends Component<TagCloudProps, TagCloudState> {
    state = {
      dv: null,
      height: 0,
      width: 0,
    };
    isUnmount: boolean = false;
    requestRef: number = 0;
    root: HTMLDivElement | undefined = undefined;
    imageMask: HTMLImageElement | undefined = undefined;
    componentDidMount() {
      requestAnimationFrame(() => {
        this.initTagCloud();
        this.renderChart(this.props);
      });
      window.addEventListener('resize', this.resize, {
        passive: true,
      });
    }
    componentDidUpdate(preProps?: TagCloudProps) {
      const { data } = this.props;
      if (preProps && JSON.stringify(preProps.data) !== JSON.stringify(data)) {
        this.renderChart(this.props);
      }
    }
    componentWillUnmount() {
      this.isUnmount = true;
      window.cancelAnimationFrame(this.requestRef);
      window.removeEventListener('resize', this.resize);
    }
    resize = () => {
      this.requestRef = requestAnimationFrame(() => {
        this.renderChart(this.props);
      });
    };
    saveRootRef = (node: HTMLDivElement) => {
      this.root = node;
    };
    initTagCloud = () => {
      function getTextAttrs(cfg: {
        x?: any;
        y?: any;
        style?: any;
        opacity?: any;
        origin?: any;
        color?: any;
      }) {
        return {
          ...cfg.style,
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic',
        };
      }
      (Shape as any).registerShape('point', 'cloud', {
        drawShape(
          cfg: {
            x: any;
            y: any;
          },
          container: {
            addShape: (
              arg0: string,
              arg1: {
                attrs: any;
              },
            ) => void;
          },
        ) {
          const attrs = getTextAttrs(cfg);
          return container.addShape('text', {
            attrs: {
              ...attrs,
              x: cfg.x,
              y: cfg.y,
            },
          });
        },
      });
    };
    renderChart = Debounce((nextProps: TagCloudProps) => {
      // const colors = ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#9AE65C'];
      const { data, height } = nextProps || this.props;
      if (data.length < 1 || !this.root) {
        return;
      }
      const h = height;
      const w = this.root.offsetWidth;
      const onload = () => {
        const dv = new DataSet.View().source(data);
        const range = dv.range('value');
        const [min, max] = range;
        dv.transform({
          type: 'tag-cloud',
          fields: ['name', 'value'],
          imageMask: this.imageMask,
          font: 'Verdana',
          size: [w, h],
          // 宽高设置最好根据 imageMask 做调整
          padding: 0,
          timeInterval: 5000,
          // max execute time
          rotate() {
            return 0;
          },
          fontSize(d: { value: number }) {
            const size = ((d.value - min) / (max - min)) ** 2;
            return size * (17.5 - 5) + 5;
          },
        });
        if (this.isUnmount) {
          return;
        }
        this.setState({
          dv,
          width: w,
          height: h,
        });
      };
      if (!this.imageMask) {
        this.imageMask = new Image();
        this.imageMask.crossOrigin = '';
        this.imageMask.src = imgUrl;
        this.imageMask.onload = onload;
      } else {
        onload();
      }
    }, 500);
    render() {
      const { className, height } = this.props;
      const { dv, width, height: stateHeight } = this.state;
      return (
        <div
          className={classNames(styles.tagCloud, className)}
          style={{
            width: '100%',
            height,
          }}
          ref={this.saveRootRef}
        >
          {dv && (
            <Chart
              width={width}
              height={stateHeight}
              data={dv}
              padding={0}
              scale={{
                x: {
                  nice: false,
                },
                y: {
                  nice: false,
                },
              }}
            >
              <Tooltip showTitle={false} />
              <Coord reflect="y" />
              <Geom
                type="point"
                position="x*y"
                color="text"
                shape="cloud"
                tooltip={[
                  'text*value',
                  function trans(text, value) {
                    return {
                      name: text,
                      value,
                    };
                  },
                ]}
              />
            </Chart>
          )}
        </div>
      );
    }
  }`);
  const [cssInJsCode, setCssInJsCode] =
    React.useState(`import React, { useEffect, useState, useRef } from 'react';
  import { Chart, Coord, Geom, Shape, Tooltip } from 'bizcharts';
  import { DataSet } from '@antv/data-set';
  import Debounce from 'lodash/debounce';
  import classNames from 'classnames';
  import styles from './index.module.scss';
  
  export interface TagCloudData {
    name: string;
    value: number;
  }
  
  interface TagCloudProps {
    className?: string;
    height?: number;
    data: TagCloudData[];
    imgUrl: string;
  }
  
  interface TagCloudState {
    dv: DataSet.View | null;
    height: number;
    width: number;
  }
  
  const TagCloud: React.FC<TagCloudProps> = ({ className, height = 300, data = [], imgUrl }) => {
    const [state, setState] = useState<TagCloudState>({
      dv: null,
      height: 0,
      width: 0,
    });
    const isUnmounted = useRef<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const imageMaskRef = useRef<HTMLImageElement | null>(null);
  
    const initTagCloud = () => {
      function getTextAttrs(cfg: {
        x?: any;
        y?: any;
        style?: any;
        opacity?: any;
        origin?: any;
        color?: any;
      }) {
        return {
          ...cfg.style,
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic',
        };
      }
      (Shape as any).registerShape('point', 'cloud', {
        drawShape(
          cfg: {
            x: any;
            y: any;
          },
          container: {
            addShape: (
              arg0: string,
              arg1: {
                attrs: any;
              },
            ) => void;
          },
        ) {
          const attrs = getTextAttrs(cfg);
          return container.addShape('text', {
            attrs: {
              ...attrs,
              x: cfg.x,
              y: cfg.y,
            },
          });
        },
      });
    };
  
    const renderChart = Debounce((props: TagCloudProps) => {
      const { data, height } = props;
      if (data.length < 1 || !rootRef.current) {
        return;
      }
  
      const h = height;
      const w = rootRef.current.offsetWidth;
      const imageMask = imageMaskRef.current;
  
      const onload = () => {
        const range = (new DataSet.View().source(data) as any).range('value');
        const [min, max] = range;
        const dv = new DataSet.View().source(data).transform({
          type: 'tag-cloud',
          fields: ['name', 'value'],
          imageMask,
          font: 'Verdana',
          size: [w, h],
          padding: 0,
          timeInterval: 5000,
          rotate() {
            return 0;
          },
          fontSize(d: { value: number }) {
            const size = ((d.value - min) / (max - min)) ** 2;
            return size * (17.5 - 5) + 5;
          },
        });
  
        if (!isUnmounted.current) {
          setState({
            dv,
            width: w,
            height: h,
          });
        }
      };
  
      if (!imageMask) {
        const newImageMask = new Image();
        newImageMask.crossOrigin = '';
        newImageMask.src = imgUrl;
        newImageMask.onload = onload;
        imageMaskRef.current = newImageMask;
      } else {
        onload();
      }
    }, 500);
  
    useEffect(() => {
      initTagCloud();
      renderChart({ data, height });
      window.addEventListener('resize', onResize, {
        passive: true,
      });
  
      return () => {
        isUnmounted.current = true;
        window.cancelAnimationFrame(renderChart);
        window.removeEventListener('resize', onResize);
      };
    }, []);
  
    const onResize = () => {
      window.requestAnimationFrame(() => {
        renderChart({ data, height });
      });
    };
  
    const saveRootRef = (node: HTMLDivElement) => {
      rootRef.current = node;
    };
  
    const { dv, width, height: stateHeight } = state;
  
    return (
      <div
        className={classNames(styles.tagCloud, className)}
        style={{
          width: '100%',
          height,
        }}
        ref={saveRootRef}
      >
        {dv && (
          <Chart
            width={width}
            height={stateHeight}
            data={dv}
            padding={0}
            scale={{
              x: {
                nice: false,
              },
              y: {
                nice: false,
              },
            }}
          >
            <Tooltip showTitle={false} />
            <Coord reflect="y" />
            <Geom
              type="point"
              position="x*y"
              color="text"
              shape="cloud"
              tooltip={[
                'text*value',
                function trans(text, value) {
                  return {
                    name: text,
                    value,
                  };
                },
              ]}
            />
          </Chart>
        )}
      </div>
    );
  };
  
  export default TagCloud;`);
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
        icon={<AuditOutlined />}
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

export default ClassToHooks;
