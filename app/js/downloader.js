/**
 * Created by shivsakhuja on 7/1/17.
 */

const renderer = require('./renderer');
const notifier = require('./notifier');

var downloader = {
    getData: function()
    {
        var url = 'https://www.youtube.com/watch?v=179MiZSibco';
        if (isUrl(url)) {
            // alert('yes thats a url');
            var youtubedl = require('youtube-dl');
            var fs = require('fs');

            var output = 'mynewvideo.mp4';

            var downloaded = 0;
            if (fs.existsSync(output)) {
                downloaded = fs.statSync(output).size;
            }

            var video = youtubedl(url,

                // Optional arguments passed to youtube-dl.
                ['--format=18'],

                // start will be sent as a range header
                {start: downloaded, cwd: __dirname});

            // Will be called when the download starts.
            video.on('info', function (info) {

                console.log('Download started');
                console.log('filename: ' + info._filename);

                // info.size will be the amount to download, add
                var total = info.size + downloaded;
                console.log('size: ' + total);

                if (downloaded > 0) {
                    // size will be the amount already downloaded
                    console.log('resuming from: ' + downloaded);

                    // display the remaining bytes to download
                    console.log('remaining bytes: ' + info.size);
                }

                renderer.downloadStarted(info);
                notifier.doNotify()

            });

            video.pipe(fs.createWriteStream('myvideo.mp4', {flags: 'a'}));

            // Will be called if download was already completed and there is nothing more to download.
            video.on('complete', function complete(info) {
                'use strict';
                console.log('filename: ' + info._filename + ' already downloaded.');

                // render success message

            });

            video.on('end', function () {
                console.log('finished downloading!');
                notifier.doNotify()
            });
        }
    }
}

function isUrl(string) {
    if (!string || string.length === 0) return false;
    return true;
}

function isValidUrl(string) {
    if (!isUrl) return false;

    let whitelist = ['youtube'];
    // if (string.indexOf(''))

    return true;
}

module.exports = downloader;