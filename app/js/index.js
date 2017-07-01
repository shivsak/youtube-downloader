/**
 *
 * Created by shivsakhuja on 7/1/17.
 * Starter point from index.html
 *
 */
const downloader = require('../app/js/downloader');

// Add the listener
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('downloadButton').addEventListener('click', () => {
        alert('thanks for clicking');
        downloader.getData();
    })
})