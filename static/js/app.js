const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {

    let names = data.names;
    let metadata = data.metadata; 
    let samples = data.samples;

    let sampleNum = 940;
    let results = samples.filter(sampleObj => sampleObj.id == sampleNum);
    let firstResult = results[0];

    let otu_labels = firstResult.otu_labels;
    let otu_ids = firstResult.otu_ids; 
    let sample_values = firstResult.sample_values;

    let barData = [
        {
            x:sample_values.slice(0,10).reverse(),
            y:otu_ids.slice(0,10).reverse().map(id => 'OTU ' + id),
            text: otu_labels.slice(0,10),
            type: 'bar',
            orientation : 'h'    
        }
    ]

    Plotly.newPlot("bar", barData)

    var bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      }];
            
      var bubbleLayout = {
        xaxis: {title: "OTU ID"},
        height: 500,
        width: 1000
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);

      

})