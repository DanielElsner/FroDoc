sessionListSelector =  'sessionListSelector';
currentLogSession = 'currentLogSession';
Session.set(sessionListSelector,{});

Template.sessionList.sessions = function () {
    return Sessions.find(Session.get(sessionListSelector),{limit:50});
};
Template.sessionList.isSelected = function () {
    var currentSession = Session.get(currentLogSession) ;
    return currentSession && currentSession.sessionToken == this.sessionToken ? 'selected' : '';
}

Template.sessionList.events = {
     'click li' : function(){
         Session.set(currentLogSession,Sessions.findOne({'sessionToken' : this.sessionToken}))
     }
}   ;