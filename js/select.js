function getElementByAttribute(objectlist,attributename,attributevalue){
    for(i=0;i<objectlist.length;i++){
        if (objectlist[i].getAttribute(attributename) == attributevalue) {
            return objectlist[i]
        }
    }
    return 0
}
if (getElementByAttribute(document.getElementsByName("button"), "value", "Access WebReg") != 0) {
    getElementByAttribute(document.getElementsByName("button"), "value", "Access WebReg").click();
}
if (getElementByAttribute(document.getElementsByName("submit"), "value", "Enrollment Menu") !=0) {
    getElementByAttribute(document.getElementsByName("submit"), "value", "Enrollment Menu").click();
}
if (typeof document.getElementById("add") != null) {
    if (typeof document.getElementsByClassName("WebRegErrorMsg") != null) {
        chrome.runtime.sendMessage({ "messagetitle": "coures_error" }, function (response) {})
    }
    document.getElementById("add").checked = true;
    chrome.runtime.sendMessage({ "messagetitle": "please_send_course" }, function (response) {
        document.getElementsByName("courseCode")[0].value = response;
        getElementByAttribute(document.getElementsByName("button"), "value", "Send Request").click();
    })
}