/**
 * Created by shivsakhuja on 7/1/17.
 */

var path = require('path');

var notifier = {
    doNotify: ({ title, body }) =>  {
        new Notification(title, { title, body });
    }
}

module.exports = notifier;