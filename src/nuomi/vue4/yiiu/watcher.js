import Dep from './dep'
let uid = 0
export default class watcher {
    constructor (vm, type, cb) {
        this.vm = vm
        this.cb = cb
        this.type = type
        this.id = ++uid
        this.newDeps = []
        this.newDepsId = new Set()
        this.val = this.get()
    }

    get () {
        this.beforeGet()
        const val = eval(`this.vm._data.${this.type}`)
        this.afterGet()
        return val
    }

    addDep (dep) {
        let id = dep.id
        if (!this.newDepsId.has(id)) {
            this.newDepsId.add(id)
            this.newDeps.push(dep)
            dep.addSub(this)
        }
    }

    beforeGet () {
        Dep.target = this
    }

    afterGet () {
        Dep.target = null
        this.newDeps = []
        this.newDepsId.clear()
    }

    update (newValue) {
        this.cb(newValue)
    }
}