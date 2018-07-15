//UNIX Epoch Jan 1st 1970 00:00:00 am

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());


const moment = require('moment');

var date = moment();
console.log(date.format('MMM Do YYYY h:mm:ss a'));

//10:35 am
console.log(date.format('h:mm a'))

var date = moment(1234);
console.log(date.format('h:mm:ss a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);