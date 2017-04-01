const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const arrayAugmentations = []
import Dep from './dep'

export default class Observer {
    constructor(data, path) {
        this.data = data
        this.dep = new Dep
        this.path = path
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
    convert(data, type, val) {
        let dep = new Dep
        let path
        if (this.path !== '') {
            path = `${this.path}.${type}`
        } else {
            path = type
        }
        let childOb = observe(val, path)
        Object.defineProperty(data, type, {
            configurable: false,
            enumerable: true,
            get: () => {
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        childOb.dep.depend()
                    }
                }
                return val
            },
            set: (newValue) => {
                if (newValue === val) {
                    return
                }
                val = newValue
                dep.notify(newValue)
                childOb = observe(newValue)
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
    walk(data, parent = '') {
        Object.keys(data).forEach(type => {
            this.convert(data, type, data[type])
        })
    }

    bubble (path) {
        let arr = path.split('.')
        arr = arr.slice(0, arr.length - 1)
        let dep = this.dep.filter(val => val.type)
        if (arr.length) {
            arr.forEach((type, i) => {
                let num = i + 1
                if (num > 1) {
                    let parents = arr.slice(0, num).join('.')
                    dep.forEach(val => {
                        if (val.type === parents) {
                            val.notify()
                        }
                    })
                } else {
                    dep.forEach(val => {
                        if (val.type === type) {
                            val.notify()
                        }
                    })
                }
            })
        }
    }

}
export function observe (data, path = '') {
    if (!data || typeof data !== 'object') {
         return
    }
    return new Observer(data, path)
}