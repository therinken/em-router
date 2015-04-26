Articles = new Meteor.Collection('articles');

Router.configure({
    layoutTemplate: 'Layout',
    loadingTemplate: 'Loading'
});

Router.route('/', function() {
    this.layout('Layout');
    this.render('Blog');
});

Router.route('/blog/new', function() {
    this.layout('Layout');
    this.render('ArticleNew');
}, {
    name: 'article.new'
});

Router.route('/blog/:_id', function() {
    this.layout('Layout');
    this.render('Article');
}, {
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
    Meteor.startup(function() {
        Articles.remove({});
        for (var i = 0; i < 3; i++) {
            Articles.insert({
                title: 'Blog Article ' + i,
                body: 'Thisis the text body for the article I want to show.',
                createdAt: new Date(),
                author: 'Kaben Naby'
            });
        }
    });
}
