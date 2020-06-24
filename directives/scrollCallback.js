/**
 * 使用Vue Directive封装DOM操作的scroll事件
 * 需求是在用户滑动到页面的底端时请求更多数据
 * import scrollDirective from '../../directives/scroll'
 * directives: { scroll: scrollDirective }
 * v-scroll = "onScroll"
 * 参考：https://github.com/Elegenthus/scrollDemo/tree/gh-pages
 */
let scrollCallback = function(callback) {
    if (document.body.scrollHeight < 1000) {
        return
    }
    if (document.body.scrollHeight - window.scrollY - 100 <= document.body.clientHeight) {
        callback()
    }
}

let callBackWarpped // 新变量 保存引用
export default {
    bind: function(el, binding, vnode) {
        callBackWarpped =  scrollCallback.bind({}, binding.value)
        window.addEventListener("scroll", callBackWarpped)
    },
    unbind: function() {
        window.removeEventListener("scroll", callBackWarpped)
    }
}