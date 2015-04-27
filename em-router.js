Articles = new Meteor.Collection('articles');

Router.configure({
    layoutTemplate: 'Layout',
    loadingTemplate: 'Loading'
});

Router.route('/', {
    name: 'home'
});

Router.route('/blog/new', {
    name: 'article.new',
    template: 'ArticleNew'
});

Router.route('/blog/:_id', {
    name: 'article.show'
});

if (Meteor.isClient) {
    Template.Blog.helpers({
        showArticles: function() {
            return Articles.find();
        }

    });
}
if (Meteor.isServer) {

    Meteor.publish('articles', function() {
        return Articles.find();
    });
    Meteor.publish('article', function(id) {
        return Articles.find({
            _id: id
        });
    });

    Meteor.startup(function() {
        if (Articles.find().count() > 0)
            return;

        for (var i = 0; i < 3; i++) {
            Articles.insert({
                title: 'Blog Article ' + i,
                body: 'This is the text body for the article I want to show.',
                createdAt: new Date(),
                author: 'Kaben Naby'
            });
        }
    });
}
