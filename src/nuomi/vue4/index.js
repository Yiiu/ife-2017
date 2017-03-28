import template from './template.html'

import Yiiu from './yiiu/index.js'

function Fn() {
    window.data = new Yiiu({
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