const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const arrayAugmentations = []
import Dep from './dep'

export default class Observer {
    constructor(data, expression) {
        this.data = data
        this.dep = new Dep
        this.expression = expression
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
        let expression
        if (this.expression !== '') {
            expression = `${this.expression}.${type}`
        } else {
            expression = type
        }
        let childOb = observe(val, expression)
        Object.defineProperty(data, type, {
            configurable: false,
            enumerable: true,
            get: () => {
                if (Dep.target && Dep.target.type === expression) {
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
                this.dep.notify(this.data)
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

}
export function observe (data, expression = '') {
    if (!data || typeof data !== 'object') {
         return
    }
    return new Observer(data, expression)
}