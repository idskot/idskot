const AWGTable = [
    '', '4/0', '3/0', '2/0', '1/0', '1', '2', '3', '4', '6', '8', '10', '12', '14', '16', '18',
    {gauge: '', diameter_mm: 0, area_mm: 0, diameter_inch: 0, area_inch: 0},    
    {gauge: '18', diameter_mm: 1.16, area_mm: 1.06, diameter_inch: 0.046, area_inch: 0.002},
    {gauge: '16', diameter_mm: 1.46, area_mm: 1.68, diameter_inch: 0.058, area_inch: 0.003},
    {gauge: '14', diameter_mm: 1.85, area_mm: 2.68, diameter_inch: 0.073, area_inch: 0.004},
    {gauge: '12', diameter_mm: 2.32, area_mm: 4.25, diameter_inch: 0.092, area_inch: 0.006},
    {gauge: '10', diameter_mm: 2.95, area_mm: 6.76, diameter_inch: 0.116, area_inch: 0.011},
    {gauge: '8', diameter_mm: 3.71, area_mm: 10.76, diameter_inch: 0.146, area_inch: 0.017},
    {gauge: '6', diameter_mm: 4.67, area_mm: 17.09, diameter_inch: 0.184, area_inch: 0.027},
    {gauge: '4', diameter_mm: 5.89, area_mm: 27.19, diameter_inch: 0.232, area_inch: 0.042},
    {gauge: '3', diameter_mm: 6.6, area_mm: 34.28, diameter_inch: 0.26, area_inch: 0.053},
    {gauge: '2', diameter_mm: 7.42, area_mm: 43.23, diameter_inch: 0.292, area_inch: 0.067},
    {gauge: '1', diameter_mm: 8.43, area_mm: 55.8, diameter_inch: 0.332, area_inch: 0.087},
    {gauge: '1/0', diameter_mm: 9.45, area_mm: 70.41, diameter_inch: 0.372, area_inch: 0.109},
    {gauge: '2/0', diameter_mm: 10.62, area_mm: 88.74, diameter_inch: 0.418, area_inch: 0.137},
    {gauge: '3/0', diameter_mm: 11.94, area_mm: 111.9, diameter_inch: 0.47, area_inch: 0.173},
    {gauge: '4/0', diameter_mm: 13.41, area_mm: 141.1, diameter_inch: 0.528, area_inch: 0.219}
];


window.addEventListener('load', initialTableFill());

let conductorInputForm = document.getElementById('conductorInput');

conductorInputForm.addEventListener('change', updateConductorInput);

document.getElementById('conductorInputSubmit').addEventListener('click', calcDuctSizes);

document.getElementById('conductorInputReset').addEventListener('click', resetDuctSizeForm);

document.getElementById('ductCalcSelect').addEventListener('change', updateCalcPage);


function updateCalcPage(){
    let pageElements = document.getElementsByClassName('inputGridWrapper');
    let newCalcSelection = document.getElementById('ductCalcSelect').value;

    pageElements.forEach((element) => {
        if(element.name == newCalcSelection){
            element.style.display = "grid";
        } else {
            element.style.display = "";
        }
    });


}

//---- Search the field to see if additional members should be added --//
function updateConductorInput(){
        // Retrieve the conductor form and set variable for the children
    console.log('Change Detected!');
	let conductorForm = document.getElementById('conductorInput');
    let conductorFormChildren = conductorForm.children;
        // Calculate total number of rows, two children per row
    let conductorFormRows = (conductorFormChildren.length)/2;

        // Initialize variable to store how many rows are filled
    let rowsFilled = 0;
    let wireGaugeColumnFilled = 0;
        // Go through each row of the form
    for(let i = 0; i < conductorFormRows; i++){
            // If both children (wire gauge selection & quantity of conductors) are filled, increment 'rowsFilled' variable
        rowsFilled = (conductorFormChildren[i * 2].children[0].value && conductorFormChildren[1 + (i * 2)].children[0].value) ? rowsFilled + 1 : rowsFilled;
            // Check to see if first column is filled, increment to indicate user has input something
        wireGaugeColumnFilled = conductorFormChildren[i * 2].children[0].value ? wireGaugeColumnFilled + 1: wireGaugeColumnFilled;
    }
        // Read out to console for debug
    console.log('Rows Filled... ' + rowsFilled + '... AWG Column Filled: ' + wireGaugeColumnFilled);

        // If all the wire gauge selection columns are filled, add another input field row.
    if (conductorFormRows <= wireGaugeColumnFilled){
        addInputCalcField(wireGaugeColumnFilled);
    }

        // If at least one row is filled, display the 'submit' button
    document.getElementById('ductCalcButtonsContainer').style.display = (rowsFilled > 0) ? "" : "none";

}

	// Helper function to add an input field to the 'Conductor Input' Table*
function addInputCalcField(inputFieldNum){

            // Add the divisions to the form
        $("<div><select id='conductorGaugeInput" + inputFieldNum + "' name='conductorGaugeInput" + inputFieldNum + "' size='1'></select></div><div><input type='number' id='conductorQty" + inputFieldNum + "' name='conductorQty" + inputFieldNum + "'></input></div>").appendTo('#conductorInput');

            // Store the last select field added
        let lastAddedSelectField = document.getElementById('conductorGaugeInput' + inputFieldNum);
            // Loop through all of the AWG Table and add a child element for each member of the AWG Table
        for(let i=0; i < 16; i++){ 
            var wireGauge = AWGTable[i];
            var optionElement = document.createElement("option");
            optionElement.textContent = wireGauge;
            optionElement.value = wireGauge;
            lastAddedSelectField.appendChild(optionElement);            
        }

}

    // Add 3 input fields on load
function initialTableFill (){
    console.log('Window Loaded!');
    for(let i=0; i < 3; i++){
        addInputCalcField(i);
    }


}

function calcDuctSizes(){
    const ductSizes = [
        {width: 0.5, height: [0.5, 1, 2], usableArea_inch: [0.1125, 0.225, 0.45]},
        {width: 0.75, height: [0.75, 1, 1.5, 2], usableArea_inch: [0.253125, 0.3375, 0.50625, 0.675]},
        {width: 1, height: [1, 1.5, 2, 2.5, 3, 4], usableArea_inch: [0.45, 0.675, 0.9, 1.125, 1.35, 1.8]},
        {width: 1.5, height: [1, 1.5, 2, 2.5, 3, 4], usableArea_inch: [0.675, 1.0125, 1.35, 1.6875, 2.025, 2.7]},
        {width: 2, height: [1, 1.5, 2, 3, 4, 5], usableArea_inch: [0.9, 1.35, 1.8, 2.7, 3.6, 4.5]},
        {width: 2.5, height: [2.5, 3], usableArea_inch: [2.8125, 3.375]},
        {width: 3, height: [1, 2, 2.5, 3, 4, 5], usableArea_inch: [1.35, 2.7, 3.375, 4.05, 5.4, 6.75]},
        {width: 4, height: [1.5, 2, 3, 4, 5], usableArea_inch: [2.7, 3.6, 5.4, 7.2, 9]},
        {width: 6, height: [4], usableArea_inch: [10.8]},
    ];

    let inputWireGauges = [];   // Array to store objects of 
    let conductorForm = document.getElementById('conductorInput');
    let conductorFormChildren = conductorForm.children;
        // Calculate total number of rows, two children per row
    let conductorFormRows = (conductorFormChildren.length)/2;

        // Initialize variable to store how many rows are filled
    let rowsFilled = 0;
        // Go through each row of the form
    for(let i = 0; i < conductorFormRows; i++){
            // Check to see if both wire gauge and quantity have values
        if(conductorFormChildren[i * 2].children[0].value && conductorFormChildren[1 + (i * 2)].children[0].value){
            // If so, store the gauge and quantity into memory
            inputWireGauges.push({gauge: conductorFormChildren[i * 2].children[0].value, quantity: parseInt(conductorFormChildren[1 + (i * 2)].children[0].value)});
        }
    }

    console.log('Input Conductor Info...');
    console.log(inputWireGauges);

    let totalWireAreaAccumulated_inch = 0;
        // Once all input wire sizes are stored, look through each input wire size and calculate total area
    inputWireGauges.forEach((element) => {
        let gaugeTableIndex = AWGTable.findIndex(gaugeElement => gaugeElement.gauge == element.gauge);
            // Append wire diameter and area to element (inch)
        element.wireDiameter_inch = AWGTable[gaugeTableIndex].diameter_inch;
        element.wireArea_inch = AWGTable[gaugeTableIndex].area_inch;
            // Append wire diameter and area to element (mm)
        element.wireDiameter_mm = AWGTable[gaugeTableIndex].diameter_mm;
        element.wireArea_mm = AWGTable[gaugeTableIndex].area_mm;
            // Calculate total cross-sectional area of input wires
        element.totalWireArea_inch = parseFloat((element.wireArea_inch * element.quantity).toFixed(4));
        element.totalWireArea_mm = parseFloat((element.wireArea_mm * element.quantity).toFixed(4));
        totalWireAreaAccumulated_inch += element.totalWireArea_inch;
    });

    totalWireAreaAccumulated_inch = parseFloat((totalWireAreaAccumulated_inch).toFixed(4));
    console.log('Wire Diameter Search Complete...');
    console.log(inputWireGauges);
    console.log('Total Wire Area: ' + totalWireAreaAccumulated_inch);

    let usableDuctSize = [
        {width: 0.5, height:[]},
        {width: 0.75, height:[]},
        {width: 1, height:[]},
        {width: 1.5, height:[]},
        {width: 2, height:[]},
        {width: 2.5, height:[]},
        {width: 3, height:[]},
        {width: 4, height:[]},
        {width: 6, height:[]},
    ];

        // Go through all duct width sizes
    ductSizes.forEach((element, index) => {
            // For each width element, go through each usable area element
       element.usableArea_inch.forEach((areaElem, areaIndex) => {
                // Compare that usable area to total wire area, if  area is >=, store height into 'usable duct size' height
            if(areaElem >= totalWireAreaAccumulated_inch) {
                usableDuctSize[index].height.push(element.height[areaIndex]);
            }
       });

       let ductTableRow = document.getElementsByClassName('ductWidth' + index);
       console.log('Duct Table Row [' + index + ']... Length: ' + ductTableRow.length + ', Type: ' + typeof(ductTableRow));
      // console.log(ductTableRow);
       for (let i = 0; i < ductTableRow.length; i++){
            if(usableDuctSize[index].height.indexOf(ductSizes[index].height[i]) > -1){
                ductTableRow[i].style.background = "green";
                ductTableRow[i].textContent = "✓";
            } else {
                ductTableRow[i].style.background = "red";
                ductTableRow[i].textContent = "X";
            }

            if(ductSizes[index].width == 3){
                console.log('3 inch... Current Height [' + i + ']: ' + ductSizes[index].height[i] + ' ... Index: ' + usableDuctSize[index].height.indexOf(ductSizes[index].height[i]));
                console.log(usableDuctSize[index]);
                console.log('Duct Table Row Length... ' +  ductTableRow.length);
            }
       };
    });

    console.log('Duct Sizes...');
    console.log(usableDuctSize);

    document.getElementById('wireDuctDisplayWrapper').style.display = "grid";

}

    // When reset is input, clear form and reduce to 3 rows
function resetDuctSizeForm () {
    console.log('Resetting Duct Size Form...');

        // Retrieve form for modification
    let ductSizeForm = document.getElementById('conductorInput');
    let ductSizeFormChildren = ductSizeForm.children;

        // Remove any children after the 6th (3rd row)
    if(ductSizeForm.children.length > 6){
        for (let i = ductSizeForm.children.length; i > 6; i--){
            ductSizeForm.removeChild(ductSizeForm.lastChild);
        }
    }

        // Clear fields
    for (let i = 0; i < 3; i++){
        ductSizeFormChildren[i * 2].children[0].value = '';
        ductSizeFormChildren[(i * 2) + 1].children[0].value = '';
    }
    
        // Finally hide the table and control buttons
    document.getElementById('ductCalcButtonsContainer').style.display =  "none";
    document.getElementById('wireDuctDisplayWrapper').style.display =  "none";
}


document.querySelectorAll(".dropDownMain").forEach((item) => {
    item.addEventListener("mouseover", function() {
        document.querySelectorAll(".dropDownMain").forEach((li) => li.classList.remove("active"));
        this.classList.add("active")
    });
});


function ductSelect(inputWidth, inputHeight){
    if (isNaN(inputWidth)){
        throw new Error("Input Width Invalid");
        return -10;
    }
    if (isNaN(inputHeight)){
        throw new Error("Input Height Invalid");
        return -11;
    }

        // Determine if we need to remove some children
    let conductorTableParent = document.getElementById('conductorCountTable');
    let conductorTableChildren = conductorTableParent.children;   

        // If more than 2 children, remove all but the first two
    if(conductorTableChildren.length > 2){
            // Clear all but first two children
        while(conductorTableChildren.length > 2) {
            conductorTableParent.removeChild(conductorTableParent.lastChild);   
        }         
    }

        // Calculate total usable area. Allow 90% of area for top and walls, then 50% of actual area to pass code. 90% * 50% = 45% = 0.45
    let usableHeight_inch = parseFloat(inputHeight) * 0.45;
    let usableArea_inch =inputWidth * usableHeight_inch;

    console.log('Calculating Total Number of Conductors for Width: ' + inputWidth + ', Height: ' + inputHeight + '... Usable Height: ' + usableHeight_inch);

    let conductorQuantity = [];
    for(let i = 17; i < AWGTable.length; i++){
        let conductorCountWidth = Math.floor(inputWidth/AWGTable[i].diameter_inch);
        let conductorCountHeight = Math.floor(usableHeight_inch/AWGTable[i].diameter_inch); 
        let totalConductorCount = conductorCountWidth * conductorCountHeight;
        let conductorArea_inch = totalConductorCount * AWGTable[i].area_inch;
        let areaRemaining_percent = parseFloat((( (usableArea_inch - conductorArea_inch) / usableArea_inch) * 100).toFixed(3));
        conductorQuantity.push({gauge: AWGTable[i].gauge, quantity: totalConductorCount, conductorDiameter: AWGTable[i].diameter_inch, conductorTotalArea: conductorArea_inch, areaRemaining_percent: areaRemaining_percent});

        let gaugeDisplayElement = document.createElement("div");
        gaugeDisplayElement.textContent = AWGTable[i].gauge;
        let quantityDisplayElement = document.createElement("div");
        quantityDisplayElement.textContent = totalConductorCount;

        conductorTableParent.appendChild(gaugeDisplayElement);
        conductorTableParent.appendChild(quantityDisplayElement);
    }

    console.log('Conductor Quantity...');
    console.log(conductorQuantity);

}