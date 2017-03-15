class LineChart {
    constructor(canvas, dataPoints) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.maxValue = 0;

        this.data = [];

        for (let i = 0; i < dataPoints; i++) {
            this.data[i] = 0;
        }
    }

    draw() {
        // Resize the canvas if needed.
        if (this.canvas.clientWidth != this.canvas.width) {
            this.canvas.width = this.canvas.clientWidth;
        }

        // Calculate one over max.
        let oneOverMax = 0;
        if (this.maxValue > 0) {
            oneOverMax = 1 / this.maxValue;
        }

        // Clear the rectangle.
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Make sure we have data.
        if (this.data.length == 0) return;

        let width = this.canvas.width;
        let height = this.canvas.height;

        // Calculate the horizontal step.
        let horizontalDelta = width / (this.data.length - 1);

        // Begin the path.
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineWidth = 1;
        this.context.fillStyle = '#FFFFFF';

        // Start at left bottom and stroke to first element.
        this.context.moveTo(0, height);
        this.context.lineTo(0, height - this.data[0] * oneOverMax * height);

        // Define the new max value we will be looking for.
        let newMax = 0;

        for (let i = 0; i < this.data.length; i++) {
            let value = this.data[i];

            if (value > newMax) {
                newMax = value;
            }

            // Draw a line.
            this.context.lineTo(i * horizontalDelta, height - value * oneOverMax * height);
        }

        // Store the new max value.
        this.maxValue = newMax * 1.1;

        this.context.lineTo(width, height);
        this.context.closePath();
        this.context.fill();
    }

    appendValue(value) {
        this.data.shift();
        this.data.push(value);
    }
}

export default LineChart;
