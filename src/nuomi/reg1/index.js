import template from './template'

function Fn () {
    let reg1 = /\b188\d{8}/
    let reg2 = /\b(\w+)\b\s\1/
    console.info('电话号码的', /\b188\d{8}/)
    console.info('第二个正则', /\b(\w+)\b\s\1/)
    console.log('18888888888 匹配：', reg1.test(18888888888))
    console.log('12345678901 匹配：', reg1.test(12345678901))
    console.log('foot foot 匹配：', reg2.test('foot foot'))
    console.log('foot fosot 匹配：', reg2.test('foot fosot'))
}

export {
    template,
    Fn
}