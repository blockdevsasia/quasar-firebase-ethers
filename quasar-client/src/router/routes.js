
const routes = [
  {
    path: '/',
    redirect: '/firestore',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/firestore', component: () => import('pages/Firestore.vue') },
      { path: '/ethers', component: () => import('pages/Ethers.vue') },
      { path: '/qrscanner', component: () => import('pages/QrScanner.vue') }
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
