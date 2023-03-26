'use client';
import { ProLayout, PageContainer } from '@ant-design/pro-layout';
import {
  AuditOutlined,
  BulbOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export const BaseLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <ProLayout
        menuItemRender={(menuItemProps, defaultDom) => {
          if (!menuItemProps.path) return defaultDom;
          return <Link href={menuItemProps.path}>{defaultDom}</Link>;
        }}
        token={{
          pageContainer: {
            paddingBlockPageContainerContent: 0,
            paddingInlinePageContainerContent: 0,
          },
        }}
        defaultCollapsed
        siderWidth={220}
        route={{
          routes: [
            {
              path: '/',
              icon: <CloudSyncOutlined />,
              name: 'less to css in js',
            },
            {
              path: '/classtohooks',
              icon: <AuditOutlined />,
              name: 'class 转 hooks',
            },
            {
              path: '/bigfishtov4',
              icon: <BulbOutlined />,
              name: 'dva 改 hooks',
            },
          ],
        }}
      >
        {children}
      </ProLayout>
    </div>
  );
};

export default BaseLayout;
