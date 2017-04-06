class Element {
    constructor (element) {
        Object.keys(element).forEach(type => this[type] = element[type])
    }
    render () {
        let el = document.createElement(this.tagName)
        Object.keys(this.props).forEach(type => {
            let propValue = this.props[type]
            el.setAttribute(type, propValue)
        })
        this.children.forEach(child => {
            let childEl
            if (child instanceof Element) {
                childEl = child.render()
            } else {
                childEl = document.createTextNode(child)
            }
            el.appendChild(childEl)
        })
        el.vdom = this
        return el
    }
    compare () {
        console.log(1)
    }
}
export default function (data) {
    return new Element(data)
}