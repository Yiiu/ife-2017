export default class Observer {
    constructor (data) {
        this.data = data
        this._watch_ = {}
        this.Ob(this.data)
    }
    bind (data, type, val) {
        Object.defineProperty(data, type, {
            configurable: false,
            enumerable: true,
            get: () => {
                console.log('你访问了' + type)
                return val
            },
            set: (newValue) => {
                if (newValue instanceof Object) {
                    this.Ob(newValue)
                }
                console.log('你设置了' + type + ', 新值为：' + newValue)
                if (this._watch_[type]) {
                    this._watch_[type](newValue, val)
                }
                val = newValue
            }
        })
    }
    Ob (data) {
        Object.keys(data).forEach(type => {
            if (data[type] instanceof Object) {
                this.Ob(data[type])
            }
            this.bind(data, type, data[type])
        })
    }
    $watch (type, cbk) {
        if (this.data.hasOwnProperty(type)) {
            this._watch_[type] = cbk
        } else {
            console.log('并没有这个type')
        }
    }

}