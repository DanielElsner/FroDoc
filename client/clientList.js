currentSessionClient = 'currentSessionClient';
clientListSelector = 'clientListSelector';
Session.set(clientListSelector,{});
Template.clientList.clients = function () {
    return Clients.find(Session.get(clientListSelector),{limit:50});
};
Template.clientList.isSelected = function () {
    var currentClient = Session.get(currentSessionClient) ;
    return ((currentClient && currentClient.clientToken == this.clientToken) ||
        (! currentClient && ! this.clientToken))? 'active' : '';
}

Template.clientList.events = {
    'click li a' : function(){
        console.log(this.clientToken);
        console.log(this);

        if(this.clientToken){
            Session.set(currentSessionClient,Clients.findOne({'clientToken' : this.clientToken}))
        }else{
            Session.set(currentSessionClient,null);
        }
    }
};