/**
 *  Catch Errors Handler
 */

exports.catchErrors = fn => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

/**
 *  Not Found Error Handler
 */

exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

/**
 *  MongoDB Validation Error Handler
 */

exports.flashValidationErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    // validation errors look like
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach(key => {
        return req.flash('error', err.errors[key].message);
    });
    res.redirect('back');
};

/**
 *  Development Error Handler
 */
exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
    };
    res.status(err.status || 500);
    res.format({
        // Based on the `Accept` http header
        'text/html': () => {
            res.render('error', errorDetails);
        }, // Form Submit, Reload the page
        'application/json': () => {
            return res.json(errorDetails);
        }, // Ajax call, send JSON back
    });
};

/**
 *  Production Error Handler
 */
exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
};
