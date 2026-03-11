const fs = require('fs');
const path = require('path');

// Експортуємо одну функцію, яка приймає 3 аргументи
module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    // Якщо помилка - перериваємось і повертаємо помилку через callback
    if (err) {
      return callback(err);
    }

    // Фільтруємо масив, залишаючи лише файли з потрібним розширенням
    const filteredList = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr;
    });

    // Викликаємо callback, передаючи null замість помилки та відфільтрований масив
    callback(null, filteredList);
  });
};