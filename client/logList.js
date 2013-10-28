logListSelector =  'logListSelector';

Session.set(logListSelector,{});

Template.logList.logs = function () {
    var currentSession = Session.get(currentLogSession) ;
    var selector = currentSession ? {'sessionId' :currentSession._id} : {};
    return Logs.find(selector,{sort:{timestamp:'desc'},limit:50});
};
