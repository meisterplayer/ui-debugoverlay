let proxied = window.XMLHttpRequest.prototype.open;
let activeXHRs = [];
let totalMillisecondsDeltaHistory = [];
let totalBytesDeltaHistory = [];
let maximumHistorySize = 32;
let totalMillisecondsDelta = 0;
let totalBytesDelta = 0;
let totalBytesDownloaded = 0;
let averageBandwidth = 0;

function findActiveXHRIndexByURL(url) {
    for (let i = 0; i < activeXHRs.length; i++) {
        if (activeXHRs[i].url === url) {
            return i;
        }
    }
}

function updateProgress(activeXHR, event) {
    if (event.loaded < activeXHR.bytesDownloaded) {
        activeXHR.bytesDownloaded = 0;
    }

    let bytesDelta = event.loaded - activeXHR.bytesDownloaded;
    let millisecondsDelta = Date.now() - activeXHR.timestamp;

    totalMillisecondsDelta += millisecondsDelta;
    totalBytesDelta += bytesDelta;
    totalBytesDownloaded += bytesDelta;

    activeXHR.bytesDownloaded += event.loaded;
    activeXHR.totalSizeInBytes += event.total;
    activeXHR.timestamp = Date.now();
    activeXHR.downloadProgress = activeXHR.bytesDownloaded / activeXHR.totalSizeInBytes;
}

function resetStatistics() {
    if (totalMillisecondsDelta > 0) {
        totalMillisecondsDeltaHistory.push(totalMillisecondsDelta);
        totalMillisecondsDelta = 0;

        if (totalMillisecondsDeltaHistory.length > maximumHistorySize) {
            totalMillisecondsDeltaHistory.shift();
        }
    }

    if (totalBytesDelta > 0) {
        totalBytesDeltaHistory.push(totalBytesDelta);
        totalBytesDelta = 0;

        if (totalBytesDeltaHistory.length > maximumHistorySize) {
            totalBytesDeltaHistory.shift();
        }
    }

    let milliseconds = 0;
    for (const value of totalMillisecondsDeltaHistory) {
        milliseconds += value;
    }

    let bytes = 0.0;
    for (const value of totalBytesDeltaHistory) {
        bytes += value;
    }

    let avgBandwidth = null;
    if (milliseconds > 0) {
        avgBandwidth = (bytes * 1000) / milliseconds;
    }

    averageBandwidth = averageBandwidth == 0 ? avgBandwidth : (averageBandwidth + avgBandwidth) / 2;

    totalMillisecondsDelta = 0;
    totalBytesDelta = 0;
}


function getBandwidthString(value) {
    if (isNaN(value) || value === 0) {
        return value + '';
    }

    const _bandwidthUnits = ['bits/s', 'kbit/s', 'Mbit/s', 'Gbit/s', 'Tbit/s', 'Pbit/s'];
    const bitsPerSecond = value;
    const e = Math.floor(Math.log(bitsPerSecond) / Math.log(1024));
    const ret = (bitsPerSecond / Math.pow(1024, Math.floor(e))).toString();

    return (ret.substr(0, ret.indexOf('.') + 2)) + ' ' + _bandwidthUnits[e];
}

window.XMLHttpRequest.prototype.open = function() {

    activeXHRs.push({
        url: arguments[1],
        bytesDownloaded: 0,
        timestamp: 0,
        timeOfRequest: Date.now(),
        timeOfResponse: 0,
        roundTripTime: 0,
        totalSizeInBytes: 0,
        downloadProgress: 0,
        bandwidth: 0,
    });

    this.addEventListener('progress', (event) => {
        const activeXHR = activeXHRs[findActiveXHRIndexByURL(arguments[1])];

        updateProgress(activeXHR, event);
    });

    this.addEventListener('loadstart', (event) => {
        const activeXHR = activeXHRs[findActiveXHRIndexByURL(arguments[1])];

        activeXHR.timestamp = Date.now();
    });

    this.addEventListener('load', (event) => {
        const activeXHR = activeXHRs[findActiveXHRIndexByURL(arguments[1])];

        updateProgress(activeXHR, event);
        resetStatistics();

        for (var i = 0; i < activeXHRs.length; i++) {
            if (activeXHRs[i].url == arguments[1]) {
                activeXHRs.splice(i, 1);
            }
        }
    });

    return proxied.apply(this, [].slice.call(arguments));
};

class HijackAjax {
    get activeXHRs() {
        return activeXHRs;
    }

    get averageBandwidthText() {
        return getBandwidthString(averageBandwidth);
    }

    get averageBandwidth() {
        return averageBandwidth;
    }
}

export default HijackAjax;
