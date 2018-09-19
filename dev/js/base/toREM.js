(function () {
  let PSDWidth = 750
  let maxWidth = 1920
  let toRem = PSDWidth / 100
  let fs

  function HTMLfontSize() {
    let html = document.documentElement
    let screenWidth = window.innerWidth

    if (screenWidth <= maxWidth) {
      fs = screenWidth / toRem
    } else {
      fs = maxWidth / toRem
    }
    html.style.fontSize = fs + "px"
  }

  HTMLfontSize()

  let timer = null
  window.addEventListener('resize', function () {
    clearTimeout(timer)
    timer = setTimeout(HTMLfontSize, 60)
  }, false)
})()