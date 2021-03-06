const template = `<div class="pf-debug-overlay-section">
    <div class="pf-debug-overlay-left">
        <div class="pf-debug-overlay-text">
            <div>Total time: <span id="pf-debug-overlay-text-totalTime">0</span></div>
            <div>Position: <span id="pf-debug-overlay-text-position">0</span></div>
            <div>State: <span id="pf-debug-overlay-state">Playing</span></div>
            <br>
            <div>Decoded video frames: <span id="pf-debug-overlay-text-decoded-frames">0</span></div>
            <div>Dropped frames: <span id="pf-debug-overlay-text-dropped-frames">11</span></div>
            <div style="display:none">Nudge count: <span id="pf-debug-overlay-text-nudge-amount">0</span></div>
            <br>
            <div>Buffered: <span id="pf-debug-overlay-text-video-buffered-range">0.32 - 23.23</span></div>
            <div>Average Bandwidth: <span id="pf-debug-overlay-text-average-bandwidth">5 Mbit/s</span></div>

        </div>
    </div>
    <div class="pf-debug-overlay-right">
        <div class="pf-debug-overlay-text">
            <div>Active requests: <span id="pf-debug-overlay-text-active-requests">0</span></div>
            <div>&nbsp;</div>
            <div>Bandwidth Graph: </div>
            <canvas id="pf-debug-overlay-download-speed"></canvas>
            <div>Segments: </div>
            <div id="pf-debug-overlay-segments-wrapper">
                <table>
                    <thead>
                        <tr id="pf-debug-overlay-segment-header">

                        </tr>
                    </thead>
                    <tbody id="pf-debug-overlay-segment-body">
                        <tr id="pf-debug-overlay-segment-active"></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;
export default template;