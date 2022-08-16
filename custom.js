$(document).ready(function(){
    init()
    anychart.onDocumentReady(function () {
        var data1 = [10000, 12000, 13000, 10000, 9000, 17000, 20000];
        var data3 = [13000, 16000, 13500, 15000, 12000, 18500, 21000];
        var data4 = [13400, 17000, 13500, 14500, 15000, 18000, 19000];

        // Creates chart.
        var chart = anychart.cartesian();

        // To create a Cartesian chart, use the defaultSeriesType() method
        // to set a series type and add the series using the addSeries() method.
        chart.defaultSeriesType('column');
        chart.addSeries(data1);

        // Also, you can use other series types using the appropriate methods like here.
        chart.line(data3);
        chart.line(data4);

        chart.title('Create a Cartesian chart');
        chart.container('linechartgant');
        chart.draw();
    });

    anychart.onDocumentReady(function () {
        var data1 = [10000, 12000, 13000, 10000, 9000, 17000, 20000];

        // Creates chart.
        var chart = anychart.cartesian();

        // To create a Cartesian chart, use the defaultSeriesType() method
        // to set a series type and add the series using the addSeries() method.
        chart.defaultSeriesType('column');
        chart.addSeries(data1);
        chart.title('Line chart');
        chart.container('linechartgantfirst');
        chart.draw();
    });
})


function init() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        slider.oninput = onSliderInput;

        updateValue(slider);
        updateValuePosition(slider);
        updateLabels(slider);
        updateProgress(slider);

        setTicks(slider);
    }
}

function onSliderInput(event) {
    updateValue(event.target);
    updateValuePosition(event.target);
    updateLabels(event.target);
    updateProgress(event.target);
}

function updateValue(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    value.innerHTML = "<div>" + slider.value + "</div>";
}

function updateValuePosition(slider) {
    let value = document.getElementById(slider.dataset.valueId);

    const percent = getSliderPercent(slider);

    const sliderWidth = slider.getBoundingClientRect().width;
    const valueWidth = value.getBoundingClientRect().width;
    const handleSize = slider.dataset.handleSize;

    let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

    left = Math.min(left, sliderWidth - valueWidth);
    left = slider.value === slider.min ? 0 : left;

    value.style.left = left + "px";
}

function updateLabels(slider) {
    const value = document.getElementById(slider.dataset.valueId);
    const minLabel = document.getElementById(slider.dataset.minLabelId);
    const maxLabel = document.getElementById(slider.dataset.maxLabelId);

    const valueRect = value.getBoundingClientRect();
    const minLabelRect = minLabel.getBoundingClientRect();
    const maxLabelRect = maxLabel.getBoundingClientRect();

    const minLabelDelta = valueRect.left - (minLabelRect.left);
    const maxLabelDelta = maxLabelRect.left - valueRect.left;

    const deltaThreshold = 32;

    if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
    else minLabel.classList.remove("hidden");

    if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
    else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
    let progress = document.getElementById(slider.dataset.progressId);
    const percent = getSliderPercent(slider);

    progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
    const range = slider.max - slider.min;
    const absValue = slider.value - slider.min;

    return absValue / range;
}

function setTicks(slider) {
    let container = document.getElementById(slider.dataset.tickId);
    const spacing = parseFloat(slider.dataset.tickStep);
    const sliderRange = slider.max - slider.min;
    const tickCount = sliderRange / spacing + 1; // +1 to account for 0

    for (let ii = 0; ii < tickCount; ii++) {
        let tick = document.createElement("span");

        tick.className = "tick-slider-tick";

        container.appendChild(tick);
    }
}

function onResize() {
    const sliders = document.getElementsByClassName("tick-slider-input");

    for (let slider of sliders) {
        updateValuePosition(slider);
    }
}