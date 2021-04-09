function $(v) {
  return document.getElementById(v);
}
function getEventSrc(e) {
  return window.event ? window.event.srcElement : e.target;
}
function CancelEvent(e) {
  if (typeof e == "undefined" && typeof window.event != "undefined") {
    e = window.event;
  }
  if (typeof window.event != "undefined") {
    e.cancelBubble = true;
  } else {
    e.stopPropagation();
  }
}
function AjaxCreate() {
  try {
    return new XMLHttpRequest();
  } catch (e) {}
  try {
    return new ActiveXObject("MSXML2.XMLHTTP");
  } catch (e) {}
  try {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e) {}
  return false;
}
function AjaxExecute(url, data, funct) {
  var xhr = AjaxCreate();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      funct(xhr.responseText);
    }
  };
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
}
function AjaxDummy(data) {}
function ltrim(s) {
  return s.replace(/^\s*/, "");
}
function rtrim(s) {
  return s.replace(/\s*$/, "");
}
function trim(s) {
  return rtrim(ltrim(s));
}
function showHelp(iShow) {
  $("help").style.display = iShow ? "block" : "none";
  return false;
}
function toggleHelp() {
  $("help").style.display =
    $("help").style.display == "block" ? "none" : "block";
  return false;
}
function setFavorite(iURL, iTitle) {
  if (window.sidebar) {
    window.sidebar.addPanel(iTitle, iURL, "");
  } else if (window.external) {
    window.external.AddFavorite(iURL, iTitle);
  }
}
