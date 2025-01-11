// controllers/appointments.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { route } = require('./auth.js');


//New
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render ('appointments/index.ejs', {
            appointments: currentUser.appointments,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
    }
)


router.get('/new', async (req, res) => {
    res.render('appointments/new.ejs');
  }
);

router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.appointments.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/appointments`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  }
);


//Delete
router.get('/:appointmentId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const appointment = currentUser.appointments.id(req.params.appointmentId);
      res.render('appointments/show.ejs', {
        appointment: appointment,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  }
);

router.delete('/:appointmentId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.appointments.id(req.params.appointmentId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/appointments`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  }
);

//Edit
router.get('/:appointmentId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const appointment = currentUser.appointments.id(req.params.appointmentId);
      res.render('appointments/edit.ejs', {
        appointment: appointment,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  }
);


router.put('/:appointmentId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const appointment = currentUser.appointments.id(req.params.appointmentId);
      appointment.set(req.body);
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/appointments/${req.params.appointmentId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  }
);




module.exports = router;
