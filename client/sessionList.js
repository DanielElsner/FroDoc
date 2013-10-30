sessionListSelector =  'sessionListSelector';
currentLogSession = 'currentLogSession';
Session.set(sessionListSelector,{});

Template.sessionList.sessions = function () {
    return Sessions.find(Session.get(sessionListSelector),{limit:50});
};
Template.sessionList.isSelected = function () {
    var currentSession = Session.get(currentLogSession) ;
    return ((currentSession && currentSession.sessionToken == this.sessionToken) ||
        (! currentSession && ! this.sessionToken))? 'active' : '';
}

Template.sessionList.events = {
     'click li a' : function(){
         if(this.sessionToken){
             Session.set(currentLogSession,Sessions.findOne({'sessionToken' : this.sessionToken}))
         }else{
             Session.set(currentLogSession,null);
         }
     }
}   ;