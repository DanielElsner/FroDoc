Meteor.Router.add('/log',function(){
    var message = this.request.body.msg;
    console.log(message);
    var obj = {msg: message};
    obj.timestamp = new Date();
    obj.time = this.request.body.time;
    Logs.insert(obj);
});