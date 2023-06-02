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



    var select = document.getElementById("selDataset");

    for(var i = 0; i < names.length; i++) {
        var option = names[i];
        var element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        select.appendChild(element);
    }


    let barData = [
        {
            x:sample_values.slice(0,10).reverse(),
            y:otu_ids.slice(0,10).reverse().map(id => 'OTU ' + id),
            text: otu_labels.slice(0,10),
            type: 'bar',
            orientation : 'h'    
        }
    ]

    Plotly.newPlot("bar", barData);

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



    let sample_metadata = metadata.filter(sampleObj => sampleObj.id == sampleNum)[0];
    document.getElementById("sample-metadata").innerText = "id: " + sample_metadata.id + "\n ethnicity: " + sample_metadata.ethnicity + "\n gender: " + sample_metadata.gender + "\n age: " + sample_metadata.age + "\n location: " + sample_metadata.location + "\n bbtype: " + sample_metadata.bbtype + "\n wfreq: " + sample_metadata.wfreq;


    d3.selectAll("#selDataset").on("change", function() {

        let dataSet = d3.select("#selDataset").property("value");
        let newResult = samples.filter(sampleObj => sampleObj.id == dataSet);
        newResult = newResult[0];

        let new_labels = newResult.otu_labels;
        let new_ids = newResult.otu_ids; 
        let new_values = newResult.sample_values;

        let bar_ids = new_ids.slice(0,10).reverse().map(id => 'OTU ' + id); 
        let bar_values = new_values.slice(0,10).reverse();
        let bar_labels = new_labels.slice(0,10);

        //console.log(dataSet, bar_ids)

        Plotly.restyle('bar', 'x', [bar_values])
        Plotly.restyle('bar', 'y', [bar_ids])
        Plotly.restyle('bar', 'text', [bar_labels])

        Plotly.restyle('bubble', 'x', [new_ids])
        Plotly.restyle('bubble', 'y', [new_values])
        Plotly.restyle('bubble', 'text', [new_labels]) 
        Plotly.restyle('bubble', 'marker', {color:new_ids, size:new_values}) 


        let new_metadata = metadata.filter(sampleObj => sampleObj.id == dataSet)[0];
        document.getElementById("sample-metadata").innerText = "id: " + new_metadata.id + "\n ethnicity: " + new_metadata.ethnicity + "\n gender: " + new_metadata.gender + "\n age: " + new_metadata.age + "\n location: " + new_metadata.location + "\n bbtype: " + new_metadata.bbtype + "\n wfreq: " + new_metadata.wfreq;
    })
})



