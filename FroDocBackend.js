Logs = new Meteor.Collection('logs');
if (Meteor.isClient) {
  Template.hello.logs = function () {
    return Logs.find({},{sort:{timestamp:'desc'},limit:50});
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
