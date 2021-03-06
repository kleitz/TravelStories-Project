const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/stories', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/stories/create-story', (req, res) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    res.redirect('/auth/sign-in');
                });
        }
        return controller.getForm(req, res);
    });

    app.post('/stories', (req, res) => {
        return controller.create(req, res);
    });

    app.get('/stories/edit-story/:id', (req, res) => {
        return controller.getEditForm(req, res);
    });

    app.post('/stories/edit/:id', (req, res) => {
        return controller.edit(req, res);
    });

    app.post('/stories/delete/:id', (req, res) => {
        return controller.delete(req, res);
    });

    app.get('/stories/:id', (req, res) => {
        return controller.getOne(req, res);
    });
};


module.exports = { attachTo };
