var Nasne      = require('../node-nasne/nasne.js'),
    _          = require('lodash'),
    program    = require('commander'),
    ICalendar  = require('icalendar');

program
.version('0.0.0')
.option('-i, --ip [value]', 'specify the Nasne\'s IP')
.parse(process.argv);

var ical = new ICalendar.iCalendar();

var nasne = new Nasne(program.ip);

nasne.getReservedList(function(data) {
  _.each(data.item, function(item) {
    var vevent = ical.addComponent('VEVENT');
    vevent.setSummary(item.title);
    vevent.setDate(new Date(item.startDateTime), item.duration);
    vevent.setDescription(
      ((item.description || '') + "\n\n" + (item.descriptionLong || '')).trim()
      );
  });
  console.log(ical.toString());
});