'use client';
import React from 'react';
import { lessToCssInJs } from '@chenshuai2144/less2cssinjs';
import { FloatButton, Spin } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

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
  const [lessCode, setLessCode] = React.useState(`
  export default {
    namespace: 'activityPage',
    state: {
      basic: {},
      schedule: {},
      guide: [],
      guest: [],
      partner: [],
      staticmap: {},
      ticket: [],
      othersActivity: []
    },
    effects: {
      *queryActivityBasic({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivityBasic, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              basic: data
            }
          });
        }
        return data;
      },
      *queryActivityBasicResearch({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivityBasicResearch, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              basic: data
            }
          });
        }
        return data;
      },
      *queryActivitySchedule({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivitySchedule, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              schedule: data
            }
          });
        }
        return code;
      },
      *queryActivityGuest({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivityGuest, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              guest: data
            }
          });
        }
        return code;
      },
      *queryActivityPartner({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivityPartner, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              partner: data
            }
          });
        }
        return code;
      },
      *queryActivityGuide({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivityGuide, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              guide: data
            }
          });
        }
        return code;
      },
      *queryActivityStaticMap({ payload }, { call, put, select }) {
        const res = yield call(service.queryActivityStaticMap, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              staticmap: data
            }
          });
        }
        return code;
      },
      *queryCommunityTicketList({ payload }, { call, put, select }) {
        const res = yield call(service.queryCommunityTicketList, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              ticket: data
            }
          });
        }
        return code;
      },
      *queryCommunityRelatedActivityList({ payload }, { call, put, select }) {
        const res = yield call(service.queryCommunityRelatedActivityList, payload);
        const { code, data } = res;
        if (code === 200) {
          yield put({
            type: 'updateState',
            payload: {
              othersActivity: data
            }
          });
        }
        return code;
      }
    },
    reducers: {
      updateState: (state, { payload }) => ({ ...state, ...payload })
    }
  };
  `);
  const [cssInJsCode, setCssInJsCode] = React.useState(`
  import React, { useReducer, useEffect } from "react";
  import service from "xxx/xxx";
  
  const initialState = {
    basic: {},
    schedule: {},
    guide: [],
    guest: [],
    partner: [],
    staticmap: {},
    ticket: [],
    othersActivity: [],
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case "updateState":
        return {
          ...state,
          ...action.payload,
        };
      default:
        throw new Error("Unexpected action");
    }
  }
  
  function useActivityPage(id) {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
      async function fetchActivityPage() {
        try {
          const [
            basicRes,
            basicResearchRes,
            scheduleRes,
            guestRes,
            partnerRes,
            guideRes,
            staticmapRes,
            ticketRes,
            othersActivityRes,
          ] = await Promise.all([
            service.queryActivityBasic(id),
            service.queryActivityBasicResearch(id),
            service.queryActivitySchedule(id),
            service.queryActivityGuest(id),
            service.queryActivityPartner(id),
            service.queryActivityGuide(id),
            service.queryActivityStaticMap(id),
            service.queryCommunityTicketList(id),
            service.queryCommunityRelatedActivityList(id),
          ]);
          if (basicRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                basic: basicRes.data,
              },
            });
          }
          if (basicResearchRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                basic: basicResearchRes.data,
              },
            });
          }
          if (scheduleRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                schedule: scheduleRes.data,
              },
            });
          }
          if (guestRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                guest: guestRes.data,
              },
            });
          }
          if (partnerRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                partner: partnerRes.data,
              },
            });
          }
          if (guideRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                guide: guideRes.data,
              },
            });
          }
          if (staticmapRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                staticmap: staticmapRes.data,
              },
            });
          }
          if (ticketRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                ticket: ticketRes.data,
              },
            });
          }
          if (othersActivityRes.code === 200) {
            dispatch({
              type: "updateState",
              payload: {
                othersActivity: othersActivityRes.data,
              },
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchActivityPage();
    }, [id]);
  
    return state;
  }
  
  export default useActivityPage;
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
