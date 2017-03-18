export default class Observer {
    constructor (data) {
        this.data = data
        this.watch(this.data)
    }

    watch (data) {
        for (let type in data) {
            if (data[type] instanceof Object) {
                this.watch(data[type])
            } else {
                Object.defineProperty(data, type, {
                    get () {
                        console.log('你访问了' + type)
                        return type
                    },
                    set (newValue) {
                        console.log('你设置了' + type + ', 新值为：' + newValue)
                    }
                })
            }
        }
    }
}