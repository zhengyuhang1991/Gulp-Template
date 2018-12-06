// 配置测试、生产环境接口全局变量
const TEST_API = 'https://test.api.com'
const PRODUCTION_API = 'https://production.api.com'

// 配置当前使用的接口
const CURRENT_API = TEST_API

let commonJs = {
  init () {
    this.setEvent()
  },
  setEvent () {
    // Mobile
    FastClick.attach(document.body)
    // Mobile End
  }
}
commonJs.init()
