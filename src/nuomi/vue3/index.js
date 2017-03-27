import template from './template.html'

import Observer from './observer.js'

function Fn () {
    console.log(`
window.data = new Observer({
    name: '小李',
    age: 2,
    f: {
        name: '小明',
        age: 2,
        test: {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            }
        }
    }
})
window.data.$watch('f', function (newValue) {
    console.log('新的', newValue)
})
    `)
    window.data = new Observer({
        name: '小李',
        age: 2,
        f: {
            name: '小明',
            age: 2,
            test: {
                a: 1,
                b: {
                    c: 2,
                    d: {
                        e: 3
                    }
                }
            }
        }
    })
    window.data.$watch('f', function (newValue) {
        console.log('新的', newValue)
    })
    console.info('修改data')
    console.log(window.data)
}

export {
    template,
    Fn
}