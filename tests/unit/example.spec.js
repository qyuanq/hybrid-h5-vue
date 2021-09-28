import { shallowMount } from '@vue/test-utils'
import BackToTop from '@/components/BackToTop/index.vue'

describe('BackToTop.vue', () => {
  // let wrapper
  // 它是Jest的钩子函数，会在执行每一个测试用例之前调用，在这个钩子函数中我们重新挂载组件，避免多个测试用例互相影响。
  // beforeEach(() => {
  //   wrapper = shallowMount(BackToTop)
  // })
  // 断言
  it('props', () => {
    const wrapper = shallowMount(BackToTop, {
      propsData: { scrollTopValue: 300 }
    })
    // 预期
    expect(wrapper.props('scrollTopValue')).toBe(300)
    expect(wrapper.isVisible()).toBe(true)
  })

  // it('show', async() => {
  //   wrapper.vm.toTop()
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.isVisible()).toBe(false)
  // })
})
