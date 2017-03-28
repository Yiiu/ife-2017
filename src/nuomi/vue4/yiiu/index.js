import Watcher from './watcher.js'
import Observer, { observe } from './observer.js'
export default class Yiiu {
    constructor (options = {}) {
        this.$options = options
        let data = this._data = options.data
        Object.keys(data).forEach(e => {
            this._proxy(e)
        })
        this._ob = observe(data)
        this.watchs(options.watch)
    }
    $watch (type, cb) {
        new Watcher(this, type, cb)
        return this
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