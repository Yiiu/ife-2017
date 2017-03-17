function url (urls) {
    return urls.replace('#','')
}

export default class Router {
    constructor (routes) {
        this.routes = routes
        this.currentUrl = ''
        this.before = null
        this.hash = '/'

        this.body = null
        this.init()
    }

    init () {
        window.addEventListener('load', () => {
            this.default()
        }, false)
        window.addEventListener('hashchange', () => {
            this.change()
        }, false)
    }
    
    default () {
        if (location.hash === '') {
            location.hash = '/'
            this.match ('/')
        } else {
            this.match(url(location.hash))
        }
    }

    match (urls) {
        this.routes.forEach(route => {
            if (route.path === urls) {
                route.component ? route.component(this.resolve.bind(this)) : () => {}
            }
        })
    }

    resolve (component) {
        this.body.innerHTML = component.template
        console.log(component)
        component.Fn ? component.Fn() : () => {}
    }

    change (to, from) {
        this.match(url(location.hash))
    }

    $mount (query) {
        this.body = document.querySelector(query)
        return this
    }

    beforeEach (cbk) {
        this.before = cbk
    }
}