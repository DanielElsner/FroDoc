var sessionToken = guid();
var clientToken = getClientToken();
function fetchUrl(){
    //TODO get by script src   // replace url crap   with regex
    var srcTag = document.getElementById('froDocSrc');
    var url = srcTag.src;
    var domain =url.split('/')[2];

    return 'http://'+domain+'/log';
}
function modifiedConsoleLog(msg){
    if(document.body){
        crossDomainPost(msg);
    }else{
        window.setTimeout(function(){
            modifiedConsoleLog(msg)
        },1000);
    }
}
function overrideConsoleLog(){
    console = console || {};
    console.log = modifiedConsoleLog;
}



function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

var cookieIdSessionVar = 'cookieIdSessionVar';
function getClientToken(){
    var id = getCookie(cookieIdSessionVar);
    if(! id){
       id = guid();
       setCookie(cookieIdSessionVar,id,365);
    }
    return id;
}

function getCookie(name){
    var cookieValue = document.cookie;
    var cookieStart = cookieValue.indexOf(" " + name + "=");
    if (cookieStart == -1){
        cookieStart = cookieValue.indexOf(name + "=");
    }
    if (cookieStart == -1){
        cookieValue = null;
    }else {
        cookieStart = cookieValue.indexOf("=", cookieStart) + 1;
        var cookieEnd = cookieValue.indexOf(";", cookieStart);
        if (cookieEnd == -1){
            cookieEnd = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStart,cookieEnd));
    }
    return cookieValue;
}

function setCookie(name,value,expireDays){
    var expireDate=new Date();
    expireDate.setDate(expireDate.getDate() + expireDays);
    var cookieValueString=escape(value) + ((expireDays==null) ? "" : "; expires="+expireDate.toUTCString());
    document.cookie=name + "=" + cookieValueString;
}



function createInput(name,value){
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = JSON.stringify(value);
    return input;
}
function crossDomainPost(msg) {
    // Add the iframe with a unique name
    var iframe = document.createElement("iframe");
    var uniqueString = guid();

    iframe.id = uniqueString;
    document.body.appendChild(iframe);
    iframe.style.display = "none";
    iframe.contentWindow.name = uniqueString;
    // construct a form with hidden inputs, targeting the iframe
    var form = document.createElement("form");
    form.target = uniqueString;
    // insert URL
    form.action = fetchUrl();//"http://daniels-macbook-pro.local:3000/log";
    form.method = "POST";
    var time = ""+new Date().toTimeString().trim().substr(0,8);
    // repeat for each parameter
    if(msg != null && typeof msg === 'object') {
        msg = JSON.stringify(msg);
    }
    form.appendChild(createInput('msg',msg));
    form.appendChild(createInput('time',time));
    form.appendChild(createInput('sessionToken',sessionToken));
    form.appendChild(createInput('clientToken',clientToken));
//    form.appendChild(createInput('userAgent',clientToken));
    document.body.appendChild(form);
    form.submit();
    window.setTimeout(function(){
        jQuery(form).remove();
        jQuery('#'+uniqueString).remove();

    },10000) ;

}

jQuery(document).ready( function(){
    overrideConsoleLog();
    window.onerror = function(msg, url,lineNumber){
        console.log(msg + ' '+url+' '+lineNumber);
    }
});
overrideConsoleLog();