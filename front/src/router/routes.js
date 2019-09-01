
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {name: 'home', meta: {auth: true}, path: '', component: () => import('pages/Index.vue') }
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
