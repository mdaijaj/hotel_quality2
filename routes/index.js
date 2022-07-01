// const multer  = require('multer');
// const path=require('path')
// const fs=require('fs')
const express= require('express')
const router=express()
const user= require('../controller/user_controller') 
const hotel= require('../controller/hotel_controller')
const guest= require('../controller/guest_controller')
const service= require('../controller/servie_controller')
const {authenticate}= require('../middleware/index')
const {login_required}= require('../middleware/index')


// middleware
router.use(express.static(__dirname + '/public'));
// router.use('/uploads', express.static('uploads'));
// const upload = multer({ dest: 'uploads/' })


//users routes
router.post('/signup', user.signup);
router.post('/login', user.login)
router.get('/logout', login_required, user.logout)
router.get('/allUsers', user.allUsers)
router.put('/updateuser/:id', login_required, user.updateUser)
router.get('/userdetails/:id', login_required, user.userDetails)


//routes for hotel crude admin
router.post('/addhotel', hotel.addHotel)
router.get('/allhotels', hotel.allHotels)
router.get('/hoteldetails/:id', hotel.hotelDetails)
router.put('/updatehotel/:id',login_required, hotel.updateHotel)
router.delete('/deletehotel/:id', login_required, hotel.deleteHotel)

//search hotel
router.get('/searchhotel', hotel.searchHotel)


// routes for service crude
router.post('/createservice', service.addService)
router.get('/allservices', service.allServices)
router.get('/servicedetails/:id', service.serviceDetails)
router.put('/updateservice/:id', service.updateService)
router.delete('/deleteservice/:id', service.deleteService)

// routes for guest crude
router.post('/addguest', guest.addGuest)
router.get('/allguest', guest.allGuest)
router.get('/guestdetails/:id', guest.guestDetails)
router.delete('/deleteguest/:id', guest.deleteGuest)


module.exports = router;