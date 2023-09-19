const form = document.querySelector('form');
const numberColor = document.querySelector('#number-color');
const results = document.querySelector('.results');
const compliant = document.querySelector('.compliant');
const noColors = document.querySelector('#confirm-number');
const confColors = document.querySelector('#confirm-colors');
const small = document.querySelector('#small');
const bold = document.querySelector('#bold');
const large = document.querySelector('#large');
let allColorsSettings = [];
const urlApi = 'https://www.aremycolorsaccessible.com/api/are-they';

let noOfColors = 0;

const generateColorInputs = () => {
    noOfColors = Number(numberColor.value);
    for (let i = 0; i < noOfColors; i++) {
        const colorContainer = document.createElement('div');
        colorContainer.innerHTML = `<label for="color${i + 1}">color${i + 1}</label>
        <input id="color${i + 1}" type="color">`;
        form.appendChild(colorContainer);
    }
};

noColors.addEventListener('click', generateColorInputs);
numberColor.addEventListener('keyup', (e)=> {
    if(e.key === 'Enter'){
        generateColorInputs();
    }
});

const createHtmlElement = (i) => {
    const result = document.createElement('div');
    result.innerHTML = 
        `<div class="color-container">
            foreground: ${allColorsSettings[i].colors[0]}
            <br> 
            background: ${allColorsSettings[i].colors[1]}
            <br>
            small: ${allColorsSettings[i].contrast.small ?? 'fail'} 
            <br>
            bold: ${allColorsSettings[i].contrast.bold ?? 'fail'} 
            <br>
            large: ${allColorsSettings[i]?.contrast?.large ?? 'fail'}
            <br>
            contrast: ${allColorsSettings[i]?.contrast?.contrast ?? 0}
        </div>`;
    result.style.backgroundColor = allColorsSettings[i].colors[1];
    result.style.color = allColorsSettings[i].colors[0];

    results.appendChild(result);
}

const applyToHtml = () => {
    for (let i = 0; i < allColorsSettings.length; i++) {
        createHtmlElement(i);
    }
}

const fetchData = async (colorList) => {
    let contrast = null;
    /* if (colorList.colors[0] !== colorList.colors[1]) {
        cost response = await ...
        */
    /*if (colorList.colors[0] === colorList.colors[1]) {
        contrast = {
            "small": "Fail",
            "bold": "Fail",
            "large": "Fail",
            "overall": "Nope",
        };
        // colorsArray.push(contrast);
    } else {*/
        const response = await fetch(urlApi, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(colorList),
        })
        contrast = await response.json();
        // colorsArray.push(contrast);
    /*} 
    const settings = {
        ...colorList, contrast: { ...contrast }
    }
    allColorsSettings.push(settings); */
    return contrast;
};

const handleConfirmBtn = async () => {
    allColorsSettings = [];
    results.innerHTML = '';
    const colorInputsElements = [...document.querySelectorAll('input[type=color]')];
    const colorInputsValues = [];
    const colorInputList = [];
    for (let i = 0; i < colorInputsElements.length; i++) {
        const colorValue = colorInputsElements[i].value;
        colorInputsValues.push(colorValue);
    }
    
    for (let i = 0; i < colorInputsElements.length; i++) {
        for (let j = 0; j < colorInputsElements.length; j++) {
            const color = { colors: [colorInputsValues[i], colorInputsValues[j]] };
            colorInputList.push(color);
        }
    }
    
    for (const colorList of colorInputList) {
        if (colorList.colors[0] === colorList.colors[1]) {
            continue;
        }
        const contrast = await fetchData(colorList);
        const combination = {...colorList, contrast};
        allColorsSettings.push(combination);
    };
    // console.log(allColorsSettings);
    applyToHtml();
};

confColors.addEventListener('click', handleConfirmBtn);

small.addEventListener('click', () => {
    results.innerHTML = '';
    for (let i = 0; i < allColorsSettings.length; i++) {
        if (allColorsSettings[i].contrast.small !== 'Fail') {
            createHtmlElement(i);
        }
    }
});

bold.addEventListener('click', () => {
    results.innerHTML = '';
    for (let i = 0; i < allColorsSettings.length; i++) {
        if (allColorsSettings[i].contrast.bold !== 'Fail') {
            createHtmlElement(i);
        }
    }
});

large.addEventListener('click', () => {
    results.innerHTML = '';
    for (let i = 0; i < allColorsSettings.length; i++) {
        if (allColorsSettings[i].contrast.large !== 'Fail') {
            createHtmlElement(i);
        }
    }
});


