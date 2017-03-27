const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const arrayAugmentations = []

export default class Observer {
    constructor (data) {
        this.data = data
        this._watch_ = {}
        this.walk(this.data)
    }
    /**
     * 数据绑定
     * 
     * @param {any} data 
     * @param {any} type 
     * @param {any} val 
     * 
     * @memberOf Observer
     */
    convert (data, type, val, path) {
        path = path === '' ? type : path += `.${type}`
        Object.defineProperty(data, type, {
            configurable: false,
            enumerable: true,
            get: () => {
                return val
            },
            set: (newValue) => {
                if (newValue instanceof Object) {
                    this.walk(newValue)
                }
                if (this._watch_.hasOwnProperty(path)) {
                    this._watch_[path](newValue)
                }
                val = newValue
                this.bubble(path, newValue)
            }
        })
    }
    /**
     * 循环数据
     * 
     * @param {any} data 
     * 
     * @memberOf Observer
     */
    walk (data, path = '', parent = '') {
        Object.keys(data).forEach(type => {
            if (data[type] instanceof Object) {
                this.walk(data[type], type, parent === '' ? type : `${parent}.${type}`)
                this.convert(data, type, data[type], parent)
            } else {
                this.convert(data, type, data[type], parent)
            }
        })
    }

    bubble (path) {
        let arr = path.split('.')
        arr = arr.slice(0, arr.length - 1)
        if (arr.length) {
            arr.forEach((type, i) => {
                let num = i + 1
                if (num > 1) {
                    let parents = arr.slice(0, num).join('.')
                    if (this._watch_.hasOwnProperty(parents)) {
                        let that = this
                        this._watch_[parents](eval(`that.data.${parents}`))
                    }
                } else {
                    if (this._watch_.hasOwnProperty(type)) {
                        this._watch_[type](this.data[type])
                    }
                }
            })
        }
    }
    /**
     * 回调
     * 
     * @param {any} type 
     * @param {any} cbk 
     * 
     * @memberOf Observer
     */
    $watch (type, cbk = () =>{}) {
        this._watch_[type] = cbk
    }
}