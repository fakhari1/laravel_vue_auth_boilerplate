import VueRouter from 'vue-router' 

import mainApp from './mainApp'
import DashboardComponent from './components/DashboardComponent'
import LoginComponent from './components/LoginComponent'
import NotFound from './components/NotFound'

export const router = new VueRouter({ 
    mode: 'history', 
    
    routes: [ 
        {
            path: '/', 
            component: mainApp,
            props: {loginComponent: LoginComponent},
    
            children: [
                {
                    path: 'dashboard',
                    component: DashboardComponent,
                    beforeEnter: (to, from, next) => {
                        if (!window.auth.check()) {
                            next({
                                path: '/'
                            });
                            return;
                        }
                        next();
                    }
                },
            ]
        },

        {
            path: '/*',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    // Start the route progress bar.
    NProgress.start()
    
    next()
    
})

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})
