const { to } = require('await-to-js');

function controllerHandler(controllerAction) {
    return async (req, res, next) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: {
                authorization: req.headers.authorization,
            },
        };

        const [err, result] = await to(controllerAction(httpRequest));

        if(err) return next(err);

        return res.status(result.status || 200).send(result);
    }
}

module.exports = controllerHandler;