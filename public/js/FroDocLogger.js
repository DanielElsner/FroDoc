var sessionToken = guid();
function fetchUrl(){
    //TODO get by script src   // replace url crap   with regex
    var srcTag = document.getElementById('froDocSrc');
    var url = srcTag.src;
    var domain =url.split('/')[2];

    return 'http://'+domain+'/log';
}


function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function createInput(name,value){
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
}
jQuery(document).ready( function(){

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
        document.body.appendChild(form);
        form.submit();
        window.setTimeout(function(){
            jQuery(form).remove();
            jQuery('#'+uniqueString).remove();

        },10000) ;

    }
   console = console || {};
   console.log = function(msg){
         crossDomainPost(msg);
   };
    if(! window.__suppressLoggerActive){
        console.log('Logger active');
    }
    window.__suppressLoggerActive = true;
});
