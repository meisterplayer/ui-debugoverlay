import Shortcut from 'keyboard-shortcut';
import template from './template.build';
import HeartBeat from 'meister-heartbeat';
import LineChart from './LineChart';
import Hijax from './lib/Hijax';
import HijackAjax from './HijackAjax';

class DebugOverlay extends Meister.UiPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.isActivated = false;

        Shortcut('ctrl m j s', () => {
            if (!this.isActivated) {
                this.activate();
                this.isActivated = true;
            } else {
                this.deactivate();
                this.isActivated = false;
            }
        });

        this.positionEl = null;
        this.totalTimeEl = null;
        this.downloadSpeedChart = null;

        this.averageBandwidth = 0;
        this.qualitysEls = [];


        this.hearbeat = new HeartBeat(0.1);
        this.hearbeat.beat(this.onBeat.bind(this));
        this.hearbeat.mute();

        this.hijackAjax = new HijackAjax();

        // this.hijackRequest();
    }

    static get pluginName() {
        return 'DebugOverlay';
    }

    onBeat() {
        this.positionEl.innerHTML = this.meister.currentTime;
        this.totalTimeEl.innerHTML = this.meister.duration;
        this.decodedFramesEl.innerHTML = this.meister.playerPlugin.mediaElement.webkitDecodedFrameCount;
        this.droppedFramesEl.innerHTML = this.meister.playerPlugin.mediaElement.webkitDroppedFrameCount;
        this.activeRequestsEl.innerHTML = this.hijackAjax.activeXHRs.length;
        this.bandwidthEl.innerHTML = this.hijackAjax.averageBandwidthText;

        if (this.meister.playerPlugin.mediaElement.buffered.length) {
            this.videoBufferedEl.innerHTML = `${this.meister.playerPlugin.mediaElement.buffered.start(0)} - ${this.meister.playerPlugin.mediaElement.buffered.end(0)}`;
        }

        // Right panel
        this.downloadSpeedChart.appendValue(this.hijackAjax.averageBandwidth);
        this.downloadSpeedChart.draw();
    }

    activate() {
        this.hearbeat.unmute();
        this.wrapperElement.style.display = 'block';
    }

    deactivate() {
        this.wrapperElement.style.display = 'none';
        this.hearbeat.mute();
    }

    initializeRightPanel() {
        this.downloadSpeedChart = new LineChart(this.downloadSpeedChartEl, 600);
    }

    setElements() {
        this.positionEl = document.getElementById('pf-debug-overlay-text-position');
        this.totalTimeEl = document.getElementById('pf-debug-overlay-text-totalTime');
        this.decodedFramesEl = document.getElementById('pf-debug-overlay-text-decoded-frames');
        this.droppedFramesEl = document.getElementById('pf-debug-overlay-text-dropped-frames');
        this.downloadSpeedChartEl = document.getElementById('pf-debug-overlay-download-speed');
        this.activeRequestsEl = document.getElementById('pf-debug-overlay-text-active-requests');
        this.bandwidthEl = document.getElementById('pf-debug-overlay-text-average-bandwidth');
        this.videoBufferedEl = document.getElementById('pf-debug-overlay-text-video-buffered-range');
        this.theadSegmentTableEl = document.getElementById('pf-debug-overlay-segment-header');
        this.segmentTableActiveEl = document.getElementById('pf-debug-overlay-segment-active');
        this.playerStateEl = document.getElementById('pf-debug-overlay-state');
        this.nudgeAmountEl = document.getElementById('pf-debug-overlay-text-nudge-amount');

        this.meister.on('itemBitrates', (event) => {
            this.createSegmentInterface(event.bitrates);
        });

        this.meister.on('requestBitrate', (event) => {
            for (const qualityEl of this.qualitysEls) {
                qualityEl.innerHTML = ' ';
            }

            this.qualitysEls[(this.qualitysEls.length) - (event.bitrateIndex + 2)].innerHTML = 'x';
        });

        this.meister.on('playerPlay', () => {
            this.playerStateEl.innerHTML = 'Playing';
        });

        this.meister.on('playerPause', () => {
            this.playerStateEl.innerHTML = 'Paused';
        });

        this.meister.on('playerSeek', () => {
            this.playerStateEl.innerHTML = 'Seeking';
        });

        this.meister.on('playerNudge', (event) => {
            this.nudgeAmountEl.parentElement.style.display = 'block';
            this.nudgeAmountEl.innerHTML = event.totalNudges;
        });

        this.meister.on('playerAutoSwitchBitrate', (quality) => {
            for (const qualityEl of this.qualitysEls) {
                qualityEl.innerHTML = ' ';
            }

            this.qualitysEls[(this.qualitysEls.length - (quality.newBitrateIndex + 2))].innerHTML = 'x';
        });

        this.initializeRightPanel();
    }

    createSegmentInterface(bitrates) {
        for (const bitrate of bitrates) {
            const th = document.createElement('th');
            th.style.color = this.getRandomColor();
            th.innerHTML = bitrate.bitrate;
            this.theadSegmentTableEl.appendChild(th);

            // Creating a cell for each bitrate.
            const td = document.createElement('td');
            td.innerHTML = (bitrate.bitrate === 0 ? 'x' : ' ');
            this.segmentTableActiveEl.appendChild(td);
            this.qualitysEls.push(td);
        }
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i += 1) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    onUiReady() {
        const element = document.createElement('div');
        element.classList.add('pf-debug-overlay');
        element.innerHTML = template;
        this.wrapperElement = element;
        this.meister.defaultWrapper.appendChild(element);

        this.setElements();
    }
}

Meister.registerPlugin(DebugOverlay.pluginName, DebugOverlay);

export default DebugOverlay;
