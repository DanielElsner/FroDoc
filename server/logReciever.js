Meteor.Router.add('/log',function(){
    var message = this.request.body.msg;
    console.log(message);
    var obj = {msg: message};
    obj.timestamp = new Date();
    Logs.insert(obj);
});