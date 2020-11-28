const express = require('express');
const uuid = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const { BasicStrategy } = require('passport-http');

const { findByUserName } = require('./users');
const Todo = require('./db.js');

const router = express.Router();

passport.use(new BasicStrategy(
  ((username, password, done) => {
    const user = findByUserName(username);

    if (!user) {
      return done(null, false);
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return done(null, false);

      return done(null, user);
    });
  }),
));

router.get('/todos',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    Todo.find({}, (err, allTodos) => {
      if (err) return res.sendStatus(404).send(err);

      res.json(allTodos);
    });
  });

router.post('/todos',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const newTodo = new Todo({
      id: uuid.v4(),
      title: req.body.title,
      createdBy: req.user.userName,
    });

    newTodo.save(err => {
      if (err) return res.status(404).send(err);

      res.status(201).json(newTodo);
    });
  });

router.put('/todos/:id',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    Todo.findOne({ id: req.params.id }, (errFind, todo) => {
      if (errFind || !todo) {
        return res.sendStatus(404);
      }

      if (todo.createdBy !== req.user.userName) {
        return res.sendStatus(403);
      }

      Todo.update(
        { id: req.params.id },
        { title: req.body.title },
        (err, obj) => {
          if (err || obj.n === 0) return res.sendStatus(404);

          return res.json({
            ...todo.toJSON(),
            title: req.body.title,
          });
        },
      );
    });
  });

router.delete('/todos/:id',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    Todo.findOne({ id: req.params.id }, (errFind, todo) => {
      if (errFind) return res.status(404).send(errFind);

      if (todo.createdBy !== req.user.userName) {
        return res.sendStatus(403);
      }

      Todo.remove({ id: req.params.id }, errRemove => {
        if (errRemove) return res.status(404).send(errRemove);

        res.sendStatus(200);
      });
    });
  });

module.exports = router;
