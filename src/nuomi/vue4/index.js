import template from './template.html'

import Yiiu from './yiiu/index.js'

function Fn() {
    window.data = new Yiiu({
        data: {
            test: 1
        }
    })
}

export {
    template,
    Fn
}