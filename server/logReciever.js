function fetchSessionId(sessionToken){
    console.log('token: '+sessionToken);
    var session = Sessions.findOne({'sessionToken' : sessionToken});
    var sessionId;
    if(session){
        sessionId = session._id;
        console.log('found');
    }else{
        sessionId = Sessions.insert({'sessionToken' : sessionToken})
        console.log('add');
    }
    console.log('sessionId: '+sessionId);
   return sessionId ;
}


Meteor.Router.add('/log',function(){
    var message = this.request.body.msg;
    console.log(message);
    var obj = {msg: message};
    obj.timestamp = new Date();
    obj.time = this.request.body.time;
    var sessionId = fetchSessionId(this.request.body.sessionToken);
    obj.sessionId = sessionId;
    Logs.insert(obj);
});