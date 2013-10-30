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

function fetchClientId(clientToken){
    var logMsg = 'ClientToken: '+clientToken;
    var client = Clients.findOne({'clientToken' : clientToken});
    var clientId;
    if(client){
        clientId = client._id;
        logMsg += ' found ';
    }else{
        clientId = Clients.insert({'clientToken' : clientToken})
        logMsg += ' add ';
    }
    logMsg += ' clientId: '+clientId;
    console.log(logMsg);
    return clientId ;
}


Meteor.Router.add('/log',function(){
    var message = this.request.body.msg;
    console.log(message);
    var obj = {msg: message};
    obj.timestamp = new Date();
    obj.time = this.request.body.time;
    obj.clientId = fetchClientId(this.request.body.clientToken);
    obj.sessionId = fetchSessionId(this.request.body.sessionToken,obj.clientId);

    Logs.insert(obj);
});