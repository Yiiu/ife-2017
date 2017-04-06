import template from './template'

import Yiiu from './yiiu/index'

function Fn() {
    window.data = new Yiiu({
        el:'#yiiu-app',
        data: {
            test: {
                b: 1
            },
            a: 2
        },
        watch: {
            test: () => {
                console.log('诶')
            },
            'test.b': () => {
                console.log('123')
            }
        }
    })
}

export {
    template,
    Fn
}