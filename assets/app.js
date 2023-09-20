const colorInputsContainer = document.querySelector('#color-inputs-container');
const numberColor = document.querySelector('#number-color');
const colorCombosContainer = document.querySelector('.color-combos-container');
const compliant = document.querySelector('.compliant');
const noColors = document.querySelector('#confirm-number');
const showAllColorsBtn = document.querySelector('#show-all-combos');
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
        colorContainer.innerHTML = `
        <label for="color${i + 1}">color ${i + 1}:</label>
        <input id="color${i + 1}" type="color">
        <input id="color${i + 1}-input-value" type="text">
        <label for="color${i + 1}-name">nombre del color:</label>
        <input id="color${i + 1}-name" type="text">
        <button type="button" class="trash-color-btn">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path
                    d="M10 2.75C9.58579 2.75 9.25 3.08579 9.25 3.5V4.25H5C4.58579 4.25 4.25 4.58579 4.25 5C4.25 5.41421 4.58579 5.75 5 5.75H19C19.4142 5.75 19.75 5.41421 19.75 5C19.75 4.58579 19.4142 4.25 19 4.25H14.75V3.5C14.75 3.08579 14.4142 2.75 14 2.75H10Z"
                    fill="black" />
                <path
                    d="M13.0607 15.5L14.5303 16.9697C14.8232 17.2626 14.8232 17.7374 14.5303 18.0303C14.2374 18.3232 13.7626 18.3232 13.4697 18.0303L12 16.5607L10.5303 18.0303C10.2374 18.3232 9.76257 18.3232 9.46968 18.0303C9.17678 17.7374 9.17678 17.2626 9.46968 16.9697L10.9393 15.5L9.46967 14.0303C9.17678 13.7374 9.17678 13.2626 9.46967 12.9697C9.76256 12.6768 10.2374 12.6768 10.5303 12.9697L12 14.4393L13.4697 12.9697C13.7626 12.6768 14.2374 12.6768 14.5303 12.9697C14.8232 13.2626 14.8232 13.7374 14.5303 14.0303L13.0607 15.5Z"
                    fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.99142 8.41718C6.03363 8.03735 6.35468 7.75 6.73684 7.75H17.2632C17.6453 7.75 17.9664 8.03735 18.0086 8.41718L18.2087 10.2185C18.5715 13.4838 18.5715 16.7793 18.2087 20.0446L18.189 20.222C18.045 21.5181 17.0404 22.5517 15.7489 22.7325C13.2618 23.0807 10.7382 23.0807 8.25108 22.7325C6.95954 22.5517 5.955 21.5181 5.81098 20.222L5.79128 20.0446C5.42846 16.7793 5.42846 13.4838 5.79128 10.2185L5.99142 8.41718ZM7.40812 9.25L7.2821 10.3842C6.93152 13.5394 6.93152 16.7238 7.2821 19.879L7.3018 20.0563C7.37011 20.671 7.84652 21.1612 8.45905 21.247C10.8082 21.5758 13.1918 21.5758 15.5409 21.247C16.1535 21.1612 16.6299 20.671 16.6982 20.0563L16.7179 19.879C17.0685 16.7238 17.0685 13.5394 16.7179 10.3842L16.5919 9.25H7.40812Z"
                    fill="black" />
            </svg>
        </button>`;
        colorInputsContainer.appendChild(colorContainer);
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

    colorCombosContainer.appendChild(result);
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

const handleShowAllBtn = async () => {
    allColorsSettings = [];
    colorCombosContainer.innerHTML = '';
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

showAllColorsBtn.addEventListener('click', handleShowAllBtn);
/*
small.addEventListener('click', () => {
    colorCombosContainer.innerHTML = '';
    for (let i = 0; i < allColorsSettings.length; i++) {
        if (allColorsSettings[i].contrast.small !== 'Fail') {
            createHtmlElement(i);
        }
    }
});

bold.addEventListener('click', () => {
    colorCombosContainer.innerHTML = '';
    for (let i = 0; i < allColorsSettings.length; i++) {
        if (allColorsSettings[i].contrast.bold !== 'Fail') {
            createHtmlElement(i);
        }
    }
});

large.addEventListener('click', () => {
    colorCombosContainer.innerHTML = '';
    for (let i = 0; i < allColorsSettings.length; i++) {
        if (allColorsSettings[i].contrast.large !== 'Fail') {
            createHtmlElement(i);
        }
    }
});

*/
