const url = "/data/samples.json";

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

function init() {
  graph(0);
  demographic(0);
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
      };
    };
  });
};