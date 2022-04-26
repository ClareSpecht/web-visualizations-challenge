const url = "web-visualizations-challenge/StarterCode/data/samples.json";

function graph(x) {
  d3.json(url).then(function(data) {
    data.samples[x].otu_ids.forEach((element, index) => {
      data.samples[x].otu_ids[index] = 'OTU ' + element;
    })
    slicedDatay = data.samples[x].otu_ids.slice(0, 10);
    let trace = {
      x: data.samples[x].sample_values,
      y: slicedDatay,
      type: "bar",
      orientation: 'h',
      text: data.samples[x].otu_labels,
      transforms: [{
        type: 'sort',
        target: 'x',
        order: 'ascending'
      }]
    };
    Plotly.newPlot("bar", [trace]);
  });
};

function demographic(j) {
  d3.json(url).then(function(data) {
    d3.select(".panel-body").text("")
    const object = data.metadata[j];
    for (const property in object) {
      d3.select(".panel-body").append("li").text(`${property}: ${object[property]}`);
    }
  });
};

function bubbles(y) {
  d3.json(url).then(function(data) {
    let trace1 = {
      x: data.samples[y].otu_ids,
      y: data.samples[y].sample_values,
      mode: 'markers',
      marker: {
        color: data.samples[y].otu_ids,
        size: data.samples[y].sample_values
      },
      text: data.samples[y].otu_labels
    };
    Plotly.newPlot("bubble", [trace1]);
  });
};

function gauge(z) {
  d3.json(url).then(function(data) {
    var data = [
      {
        gauge: {
          axis: {range: [null, 9]}
        },
        value: data.metadata[z].wfreq,
        title: { text: "Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
  });
};

function init() {
  graph(0);
  demographic(0);
  bubbles(0);
  gauge(0);
  d3.json(url).then(function(data) {
    data.names.forEach(id => {
      d3.select("#selDataset")
        .append("option")
        .text(id)
        .property("value", id)
    });
  });
};

init();

function optionChanged(changed) {
  d3.json(url).then(function(data) {
    for (var i = 0; i < data.samples.length; i++) {    
      if (changed === data.samples[i].id) {
        graph(i);
        demographic(i);
        bubbles(i);
        gauge(i);
      };
    };
  });
};