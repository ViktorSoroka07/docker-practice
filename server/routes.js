const express = require('express');
const uuid = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { BasicStrategy } = require('passport-http');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { findByUserName } = require('./users');
const Todo = require('./db.js');

const router = express.Router();
const JWT_TTL = 100000;

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

passport.use(new JwtStrategy(
  {
    jwtFromRequest: req => req && req.cookies ? req.cookies.jwt : null,
    secretOrKey: process.env.JWT_SECRET,
  },
  ((jwtPayload, done) => {
    const user = findByUserName(jwtPayload.userName);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  }),
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CLIENT_CALLBACKURL,
},
((accessToken, refreshToken, profile, done) => {
  console.log(profile);
  const user = findByUserName(profile.emails[0].value);

  if (!user) {
    return done(null, false);
  }

  return done(null, user);
})));

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  }));

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const payload = { userName: req.user.userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_TTL });

    return res.cookie('jwt', token, { httpOnly: false, secure: false }).sendStatus(200);
  });

router.post('/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const payload = { userName: req.user.userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_TTL });

    return res.cookie('jwt', token, { httpOnly: false, secure: false }).sendStatus(200);
  });

router.get('/todos',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Todo.find({}, (err, allTodos) => {
      if (err) return res.status(404).send(err);

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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
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
