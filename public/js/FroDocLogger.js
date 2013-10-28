var globalTimerStop = false;
function fetchUrl(){
    //TODO get by script src   // replace url crap   with regex
    var srcTag = document.getElementById('froDocSrc');
    var url = srcTag.src;
    var domain =url.split('/')[2];

    return 'http://'+domain+'/log';
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
        var uniqueString = ""+new Date().toTimeString().trim();
        document.body.appendChild(iframe);
        iframe.style.display = "none";
        iframe.contentWindow.name = uniqueString;

        // construct a form with hidden inputs, targeting the iframe
        var form = document.createElement("form");
        form.target = uniqueString;

        // insert URL
        form.action = fetchUrl();//"http://daniels-macbook-pro.local:3000/log";


        form.method = "POST";
        var time = uniqueString.substr(0,8);
        // repeat for each parameter
       form.appendChild(createInput('msg',msg));
       form.appendChild(createInput('time',time));

        document.body.appendChild(form);
        form.submit();
    }

   console.log = function(msg){
         crossDomainPost(msg);
   };
    console.log('Logger active');

    //TODO testcode
    function loop(){
        window.setTimeout(function(){
            console.log('loop')
           if(globalTimerStop){
               loop();
           }

        },1000);
    }
    loop();

    jQuery('#stop').click(function(){
        console.log('STOP');
       globalTimerStop = false;
    });
});
