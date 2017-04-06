import Watcher from './watcher'
import Diff from './element/diff'
import Observer, { observe } from './observer'
import Element from './element/index'
export default class Yiiu {
    constructor (options = {}) {
        this.$options = options
        let data = this._data = options.data
        Object.keys(data).forEach(e => {
            this._proxy(e)
        })
        this.$el = document.querySelector(options.el)
        this._ob = observe(data)
        this.watchs(options.watch)
        this.dom()
    }
    $watch (type, cb) {
        new Watcher(this, type, cb)
        return this
    }
    dom () {
        let html = this.$el.innerHTML
        let child = Element({
            tagName: 'ul',
            props: {
                class: 'list'
            },
            children: [
                Element({
                    tagName: 'li',
                    props: {
                        class: 'item'
                    },
                    children:[
                        'test'
                    ]
                }),
                Element({
                    tagName: 'li',
                    props: {
                        class: 'item{{test}}'
                    },
                    children:[
                        'test'
                    ]
                })
            ]
        })
        let newChild = Element({
            tagName: 'ul',
            props: {
                class: 'list'
            },
            children: [
                Element({
                    tagName: 'li',
                    props: {
                        class: 'item'
                    },
                    children:[
                        'as'
                    ]
                }),
                Element({
                    tagName: 'li',
                    props: {
                        class: 'item{{test}}'
                    },
                    children:[
                        'test'
                    ]
                })
            ]
        })
        Diff(child, newChild)
    }
    watchs (watchs) {
        Object.keys(watchs).forEach(type => {
            this.$watch(type, watchs[type])
        })
    }
    _proxy (key) {
        // 代理
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => this._data[key],
            set: (val) => {
                this._data[key] = val
            } 
        })
    }
}