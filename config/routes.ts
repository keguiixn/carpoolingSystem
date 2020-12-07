export default [
        {
        path: '/admin',
        component: '../../layout/AdminLayout',
        routes: [
          {
            path: '/admin',
            component: 'Helloworld',
          },
          {
            path: '/admin/helloworld',
            name: '主页',
            component: 'Helloworld'
          },
          {
            path: '/admin/dashboard',
            routes: [
              { path: '/admin/dashboard/analysis', component: 'Dashboard/Analysis',name:"分析页"},
              { path: '/admin/dashboard/monitor', component: 'Dashboard/Monitor' ,name:'监控页'},
              { path: '/admin/dashboard/workplace', component: 'Dashboard/Workplace',name:"工作台" }
            ]
          },
        ]
      },
      {
        path: '/user',
        component: '../../layout/UserLayout',
        routes: [
          {
            path: '/user',
            component: 'Helloworld',
          },
          {
            path: '/user/helloworld',
            name:'你好世界',
            component: 'Helloworld'
          },
          {
            path: '/user/dashboard',
            routes: [
              { path: '/user/dashboard/analysis', component: 'Dashboard/Analysis',name:'分析页'},
              { path: '/user/dashboard/monitor', component: 'Dashboard/Monitor' ,name:'监控页'},
              { path: '/user/dashboard/workplace', component: 'Dashboard/Workplace' ,name:'工作台'}
            ]
            }
          ]
      },
      {
        path:'/',
        routes: [
          {
            path: '/',
            redirect: '/login',
          },
          {
            path: '/login',
            component: 'Login'
          }]
      }
    ]