import {defineConfig} from 'umi'
import route  from './routes'


export default defineConfig ({
    antd: {},
    routes :route,
    // 按需加载
    dynamicImport: {
       loading: '@/PageLoading/index',
    },
    cssLoader: {
        modules: {
        getLocalIdent: (
          context: {
            resourcePath: string;
          },
          _: string,
          localName: string,
        ) => {
          if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('ant.design.pro.less') ||
            context.resourcePath.includes('global.less')
          ) {
            return localName;
          }
      }
    
      },
    },
    proxy: {
        '/carSystem': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          pathRewrite: { '^/carSystem': '' },
        },
      } 
})