const { body } = require('express-validator');
const User = require('../models/User');



exports.register = [
        
    body('username', 'Username is invalid')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 } )
    .custom(value => {
        return User.findOne({username: value}).then(user => {
          if (user) {
            return Promise.reject('Username already exists!');
          }
        });
    }),

    body('password', 'Password is invalid')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 8 } )
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.repeatPassword) {
            throw new Error("Passwords don't match!");
        } else {
            return value;
        }
    }),
];



exports.login = [
        
    body('username', 'Username is invalid')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5, max: 22 } )
    .custom(value => {
        return User.findOne({username: value}).then(user => {
          if (!user) {
            return Promise.reject('Username does not exist');
          }
        });
    }),

    body('password', 'Password is invalid')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 8 , max: 22 } ),
    
];



exports.create = [
        
  body('name', 'Name must be 5 characters or more and only consist of letters, numbers, and spaces')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d\s]+/)
  .isLength( { min: 5, max: 30} ),
  
  body('description', 'Description must be at least 20 characters long.')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d,;'\"\s.!?]+/)
  .isLength( { min: 20, max: 300} ),

  body('imageUrl', 'Invalid image URL! Only accepts valid image URLs')
  .trim()
  .notEmpty()
  .isURL()
];



exports.edit = [
        
  body('name', 'Name must be 5 characters or more and only consist of letters, numbers, and spaces')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d\s]+/)
  .isLength( { min: 5, max: 30} ),
  
  body('description', 'Description must be at least 20 characters long.')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d,;'\"\s.!?]+/)
  .isLength( { min: 20, max: 300} ),

  body('imageUrl', 'Invalid image URL! Only accepts valid image URLs')
  .trim()
  .notEmpty()
  .isURL()
];