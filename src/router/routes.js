
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'test', component: () => import('pages/test.vue') },
      { path: 'problems', component: () => import('pages/home/Problems.vue') },
      { path: 'submissions', component: () => import('pages/home/Submissions.vue') },
    ]
  },
  {
    path: '/admin',
    redirect:'/admin/dashboard',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/admin/Dashboard.vue') },
      { path: 'menu1', component: () => import('pages/admin/Menu1.vue') },
      { path: 'menu2', component: () => import('pages/admin/Menu2.vue') }
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
