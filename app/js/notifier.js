/**
 * Created by shivsakhuja on 7/1/17.
 */

var path = require('path');
var options = [
    {
        title: "Basic Notification",
        body: "Short message part"
    },
    {
        title: "Content-Image Notification",
        body: "Short message plus a custom content image",
        icon: path.join(__dirname, 'icon.png')
    }
]

var notifier = {
    doNotify: (evt) =>  {
        console.log('notifying now');
        new Notification(options[0].title, options[0]);
    }
}

module.exports = notifier;