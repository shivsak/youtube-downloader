/**
 *
 * Created by shivsakhuja on 7/1/17.
 * Starter point from index.html
 *
 */
const downloader = require('../app/js/downloader');
const renderer = require('../app/js/renderer');

// Add the listener
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('downloadButton').addEventListener('click', () => {
        document.getElementById('linkInput');
        if (linkInput) {
            let url = linkInput.value;
            if (url && url.length > 0 && downloader.isValidUrl(url)) {
                downloader.getData(url);
            }
            else {
                console.log('invalid url');
                renderer.textAlert({
                    title: 'Must enter valid URL',
                    body: 'Please enter a valid URL to download'
                })
            }
        } else {
            console.error('linkInput url input field not found');
        }
    })
})