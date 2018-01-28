var a = '[{"coursenum":10001,"selected":false,"tried":false},{"coursenum":10002,"selected":false,"tried":false}£¬{"coursenum":10003,"selected":false,"tried":false}]';
var idealcourse = JSON.parse(a);

var coursenow;
function getcoursetosent() {
    for (i = 0; i < idealcourse.length; i++) {
        if (idealcourse[i].selected == false) {
            if (idealcourse[i].tried == false) {
                return idealcourse[i].coursenum;
            }
        }
    }
    i = 0;
    for (i = 0; i < idealcourse.length; i++) {
        idealcourse[i].tried = false;
    }
    getcoursetosent();
}
function refreshcourse() {
    for (i = 0; i < idealcourse.length; i++) {
        if (idealcourse[i].coursenum == coursenow) {
            idealcourse[i].tried = true;
            idealcourse[i].selected = false;
        }
    }
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.messagetitle) {
        case "please_send_course":
            console.log("Request comes from content script " + sender.tab.url);
            coursenow = getcoursetosent();
            sendResponse(coursenow);
            break;
        case "coures_error":
            refreshcourse();
            getcoursetosent();
            break;
    }
})