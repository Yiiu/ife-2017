import Router from './router'

let index = resolve => require(['./components/index'], resolve)

let vue1 = resolve => require(['./nuomi/vue-1'], resolve)

let router = [
    {
        path: '/',
        component: index
    },
    {
        path: '/test',
        component: vue1
    }
]

window.Router = new Router(router).$mount('main.main')

window.Router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    console.log(next)
})