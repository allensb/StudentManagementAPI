var express = require('express');
var pg = require('pg');
var router = express.Router();

var connection = "postgres://postgres@localhost/StudentManagement";

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/students').get(function(req, res) {
        pg.connect(connection, function (err, client, done) {

            console.log(err);
            var handleError = function (err) {
                if (!err) return false;

                done(client);
                res.send(err);
                return true;
            };

            client.query('Select id, first, last from students order by id', function(err, result) {
                if(handleError(err)) return;

                res.json(result.rows);
                done();
            });
        });
    });

router.route('/student/:id').get(function(req, res) {
    var id = req.params.id;

    pg.connect(connection, function (err, client, done) {

        console.log(err);
        var handleError = function (err) {
            if (!err) return false;

            done(client);
            res.send(err);
            return true;
        };

        client.query('Select id, first, last from students where id = ' + id, function(err, result) {
            if(handleError(err)) return;

            res.json(result.rows[0]);
            done();
        });
    });
});

router.route('/student/insert/').post(function(req, res) {
    var first = req.body.first,
        last = req.body.last

    pg.connect(connection, function (err, client, done) {

        console.log(err);
        var handleError = function (err) {
            if (!err) return false;

            done(client);
            res.send(err);
            return true;
        };

        client.query('Insert into students(first, last) VALUES ($1, $2)', [first, last], function(err, result) {
            if(handleError(err)) return;

            res.send('success');
            done();
        });
    });
});

router.route('/student/update/').post(function(req, res) {
    var id = req.body.id,
        first = req.body.first,
        last = req.body.last

    pg.connect(connection, function (err, client, done) {

        console.log(err);
        var handleError = function (err) {
            if (!err) return false;

            done(client);
            res.send(err);
            return true;
        };

        client.query('Update students Set first = $1, last = $2 where id = $3', [first, last, id], function(err, result) {
            if(handleError(err)) return;

            res.send('success');
            done();
        });
    });
});

router.route('/student/delete/:id').post(function(req, res) {
    var id = req.params.id;

    pg.connect(connection, function (err, client, done) {

        console.log(err);
        var handleError = function (err) {
            if (!err) return false;

            done(client);
            res.send(err);
            return true;
        };

        client.query('Delete from students where id = ' + id, function(err, result) {
            if(handleError(err)) return;

            res.send('success');
            done();
        });
    });
});

module.exports = router;
