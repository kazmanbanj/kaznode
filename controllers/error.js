exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'resources', 'views', 'html', '404.html'));

    // res.status(404).render('pug/404', {docTitle: 'Page not found'});
    // res.status(404).render('handlebars/404', {docTitle: 'Page not found'});
    res.status(404).render('ejs/404', {docTitle: 'Page not found'});
};