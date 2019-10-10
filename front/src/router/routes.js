
const routes = [
  {
    path: '',
    component: () => import('layouts/Layout.vue'),
    children: [
      {name: 'home', meta: {auth: true}, path: '/home', component: () => import('pages/Index.vue') },
      {name: 'analytics', meta: {auth: true}, path: '/analytics', component: () => import('pages/Analytics.vue') },
      {name: 'trash', meta: {auth: true}, path: '/trash', component: () => import('pages/Analytics.vue') },
      {name: 'settings', meta: {auth: true}, path: '/settings', component: () => import('pages/Analytics.vue') },
      {name: 'help', meta: {auth: true}, path: '/help', component: () => import('pages/Analytics.vue') },

    ]
  },

  {
    path:'',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {name:'login', meta: {auth: false}, path:'/login', component: () => import('pages/Login.vue')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
