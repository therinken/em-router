HomeController = RouteController.extend({
    template: 'Blog',
    waitOn: function(){
        Meteor.subscribe('articles');
    },
    articles: function(){
        return Articles.find();
    }
});
