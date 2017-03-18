import template from './template.html'

import Observer from './observer.js'

function Fn () {
    console.log(`
        window.data = new Observer({
            name: '小李',
            age: 2,
            f: {
                name: '小明',
                age: 2
            }
        })
        window.data.$watch('name', function (newValue, value) {
            console.log('新的' + newValue)
            console.log('旧的' + value)
        })
    `)
    window.data = new Observer({
        name: '小李',
        age: 2,
        f: {
            name: '小明',
            age: 2
        }
    })
    window.data.$watch('name', function (newValue, value) {
        console.log('新的' + newValue)
        console.log('旧的' + value)
    })
    console.info('修改data')
    console.log(window.data)
}

export {
    template,
    Fn
}