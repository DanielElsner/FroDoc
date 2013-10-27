var globalTimerStop = true;
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
        form.action = "http://daniels-macbook-pro.local:3000/log";


        form.method = "POST";

        // repeat for each parameter
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "msg";
        input.value = uniqueString.substr(0,8)+" -- "+msg;
        form.appendChild(input);

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
