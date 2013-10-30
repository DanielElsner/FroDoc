currentSessionClient = 'currentSessionClient';
clientListSelector = 'clientListSelector';
Session.set(clientListSelector,{});
Template.clientList.clients = function () {
    return Clients.find(Session.get(clientListSelector),{limit:50});
};
Template.clientList.isSelected = function () {
    var currentClient = Session.get(currentLogSession) ;
    return ((currentClient && currentClient.clientToken == this.clientToken) ||
        (! currentClient && ! this.clientToken))? 'active' : '';
}

Template.clientList.events = {
    'click li a' : function(){
        if(this.clientToken){
            Session.set(currentSessionClient,Clients.findOne({'clientToken' : this.clientToken}))
        }else{
            Session.set(currentSessionClient,null);
        }
    }
};