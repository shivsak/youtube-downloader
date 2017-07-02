/**
 * Created by shivsakhuja on 7/1/17.
 */

const renderer = require('./renderer');
const notifier = require('./notifier');
const electron = require('electron');
const remote = electron.remote;
const fs = require('fs')

var downloader = {
    getData: function(url)
    {

        if (isUrl(url)) {
            const dialog = remote.dialog;
            dialog.showSaveDialog({title: 'Where to save your video', }, (fileName) => {
                if (fileName === undefined) {
                    console.log("invalid filename or path");
                    return;
                }

                renderer.textAlert({
                    body: '<span style="color:blue">downloading</span> your file...'
                })
                var youtubedl = require('youtube-dl');
                var fs = require('fs');
                var downloaded = 0;
                if (fs.existsSync(fileName)) {
                    downloaded = fs.statSync(fileName).size;
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

                    renderer.textAlert({
                        body: `The file is ${Math.floor(info.size / 100000) / 10} MB. I'll tell you when I'm done!`
                    })

                });

                console.log(`writing to ${fileName}`)
                video.pipe(fs.createWriteStream(`${fileName}.mp4`, {flags: 'a'}));

                // Will be called if download was already completed and there is nothing more to download.
                video.on('complete', function complete(info) {
                    'use strict';
                    console.log('filename: ' + info._filename + ' already downloaded.');

                    // render success message

                });

                video.on('end', function () {
                    console.log('finished downloading!');
                    notifier.doNotify({
                        title: `Download Finished`,
                        body: `Your file is at ${fileName}.mp4`
                    })
                    renderer.textAlert({
                        body: `Done!`
                    })
                    var shell = require('shelljs');
                    console.log('shell')
                    shell.exec(`open ${fileName}.mp4`, (code, stdout, stderr) => {
                        console.log(stdout);
                        console.log(stderr);
                    });
                });

            });
        }
    },

    isValidUrl: function (string) {
        if (!isUrl(string)) return false;
        console.log('its a url');
        let whitelist = ['youtube'];
        return whitelist.map(site => {
            if (string.includes(site)) {
                return true;
            }
        }).includes(true);
    },
}

function isUrl(string) {
    if (!string || string.length === 0) return false;
    if (string.includes('http')) return true;   // stupid simple
}

module.exports = downloader;