export default class Yiiu {
    constructor (options = {}) {
        this.$options = options
        let data = this._data = options.data
        Object.keys(data).forEach(e => {
            this._proxy(e)
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