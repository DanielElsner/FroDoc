function fetchSessionId(sessionToken,clientId){
    var logMsg = 'SessionToken: '+sessionToken;
    var session = Sessions.findOne({'sessionToken' : sessionToken});
    var sessionId;
    if(session){
        sessionId = session._id;
        logMsg += ' found';
    }else{
        sessionId = Sessions.insert({
            'sessionToken' : sessionToken,
            'clientId': clientId
        })
        logMsg += ' add';
    }
    logMsg += ' sessionId: '+sessionId;
    console.log(logMsg);
   return sessionId ;
}

function fetchClientId (token){
    return fetchObj('clientToken',Clients)(token);
}
//function fetchClientId(clientToken){
//    var logMsg = 'ClientToken: '+clientToken;
//    var client = Clients.findOne({'clientToken' : clientToken});
//    var clientId;
//    if(client){
//        clientId = client._id;
//        logMsg += ' found ';
//    }else{
//        clientId = Clients.insert({'clientToken' : clientToken})
//        logMsg += ' add ';
//    }
//    logMsg += ' clientId: '+clientId;
//    console.log(logMsg);
//    return clientId ;
//}

function fetchObj(tokenIdentifier,collection){

    return function(token){var logMsg = tokenIdentifier+': '+token;
        var searchObj = {};
        searchObj[''+tokenIdentifier] = token;
//        console.log(searchObj);
        var obj = collection.findOne(searchObj);
//        console.log('DEBUG: tokenIdentifier: '+tokenIdentifier);
        var objId;

        console.log(obj);
        console.log(searchObj);
        if(obj){
            objId = obj._id;
            logMsg += ' found ';
        }else{
            objId = collection.insert(searchObj);
            logMsg += ' add ';
        }
        logMsg += ' objId: '+objId;
        console.log(logMsg);
        return objId ;
    };
}



Meteor.Router.add('/log',function(){
    var message = this.request.body.msg;
    var obj = {msg: message};
    obj.timestamp = new Date();
    obj.time = JSON.parse(this.request.body.time);
    obj.clientId = fetchClientId(JSON.parse(this.request.body.clientToken));
    obj.sessionId = fetchSessionId(JSON.parse(this.request.body.sessionToken,obj.clientId));

    Logs.insert(obj);
});