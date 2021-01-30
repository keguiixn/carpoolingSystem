export default [
        {
        path: '/admin',
        component: '../../layout/AdminLayout',
        routes: [
          {
            path: '/admin',name: '主页',component: 'Helloworld',isShow: true
          },
          { path: '/admin/dashboard/user', component: './AdminDashboard/User/',name:"用户管理" ,isShow: true },
          { path: '/admin/dashboard/carPooling', component: './AdminDashboard/CarPooling/' ,name:'拼车信息管理',isShow: true},
          { path: '/admin/dashboard/forum', component: './AdminDashboard/Forum/',name:"论坛管理" ,isShow: true},
          { path: '/admin/dashboard/notice', component: './AdminDashboard/Notice/',name:"公告管理" ,isShow: true},
        ]
      },
      {
        path: '/user',
        component: '../../layout/UserLayout',
        routes: [
          {
            path: '/user',name: '主页',component: 'Helloworld',isShow: true
          },
          { path: '/user/dashboard/carPooling', component: 'UserDashboard/CarPooling/CarPooling' ,name:'拼车信息',isShow: true},
          { path: '/user/dashboard/carPooling/Detail', component: 'UserDashboard/CarPooling/CarPoolDetail' ,isShow: false},
          { path: '/user/dashboard/forum', component: 'UserDashboard/Forum/Forum',name:"拼车论坛" ,isShow: true},
          { path: '/user/dashboard/forum/Detail', component: 'UserDashboard/Forum/ForumDetail' ,isShow: false},
          { path: '/user/dashboard/notice', component: 'UserDashboard/Notice/Notice',name:"公告信息" ,isShow: true},
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
            component: 'Login/Login'
          }]
      }
    ]