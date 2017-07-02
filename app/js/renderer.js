/**
 * Created by shivsakhuja on 7/1/17.
 */

var renderer = {
    textAlert: function (message) {
        document.getElementById('textNotification').innerHTML += message.body + '<br />';
    },
    hideTextAlert: function () {
        document.getElementById('textNotification').innerHTML = "";
    },
}

module.exports = renderer;