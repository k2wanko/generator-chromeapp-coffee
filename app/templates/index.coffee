document.addEventListener 'DOMContentLoaded', ->
  h1 = document.getElementsByTagName 'h1'
  h1[0].innerText = h1[0].innerText + ' ' + chrome.i18n.getMessage('app_name') if h1.length > 0
, false
