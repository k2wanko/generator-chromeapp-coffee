document.addEventListener 'DOMContentLoaded', ->
  h1 = document.getElementsByTagName 'h1'
  h1[0].innerText = h1[0].innerText + ' \'Allo' if h1.length > 0
, false
