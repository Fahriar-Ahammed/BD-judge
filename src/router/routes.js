
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {  path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'admin-login', component: () => import('pages/admin/login.vue') },
      { path: 'login', component: () => import('pages/Auth.vue') },
      { path: 'problems', component: () => import('pages/Problems.vue') },
      { path: 'problem-details', name:'problem-details', component: () => import('pages/ProblemDetails.vue') },
      { path: 'page2', component: () => import('pages/Page2.vue') },
      { path: 'user-profile', component: () => import('pages/user/Profile.vue') },
    ]
  },
  {
    path: '/admin',
    redirect:'/admin/dashboard',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { meta:{requiresAdmin: true} ,path: 'dashboard', component: () => import('pages/admin/Dashboard.vue') },
      { meta:{requiresAdmin: true} , path: 'problems', component: () => import('pages/admin/Problems.vue') },
      { meta:{requiresAdmin: true} , path: 'menu2', component: () => import('pages/admin/Menu2.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
