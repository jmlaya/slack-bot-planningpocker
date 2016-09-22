import { env } from "loaders/config";
import HttpError from 'lib/http-errors';

module.exports = [

    function error404(req, res, next) {
        next(new HttpError(404));
    },

    function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    },

    function appErrorHandler(err, req, res, next) {

        if (err instanceof HttpError) {
            let error = {
                message: err.message,
            };
            res.statusCode = err.code;
            res.statusMessage = err.message;

            if (env.name === env.local_environment_name) {
                error.error = err;
            }

            res.send(error);
        } else {
            next(err);
        }
    },

    function errorHandler(err, req, res, next) {
        res.statusCode = 500;
        res.send({
            error: err
        });
    }
];
