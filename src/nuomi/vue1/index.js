import template from './template.html'

import Observer from './observer'

function Fn () {
    window.data = new Observer({
        name: '小李',
        age: 2,
        f: {
            name: '小明',
            age: 2
        }
    })
    console.info('修改data')
    console.log(window.data)
}

export {
    template,
    Fn
}