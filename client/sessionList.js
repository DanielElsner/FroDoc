sessionListSelector =  'sessionListSelector';
currentLogSession = 'currentLogSession';


Template.sessionList.sessions = function () {
    var currentClient = Session.get(currentSessionClient) ;
    var selector = currentClient ? {'clientId' :currentClient._id} : {};
    return Sessions.find(selector,{sort:{timestamp:'desc'},limit:50});
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
};