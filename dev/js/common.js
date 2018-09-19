let commonJs = {
  init() {
    this.setEvent()
  },
  setEvent() {
    // Mobile
    FastClick.attach(document.body)
    // Mobile End
  }
}
commonJs.init()