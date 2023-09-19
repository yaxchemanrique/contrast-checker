const colorInputList = [
    { colors: ['#5c0700', '#5c0700'] },
    { colors: ['#5c0700', '#e4ef65'] },
    { colors: ['#e4ef65', '#5c0700'] },
    { colors: ['#e4ef65', '#e4ef65'] },
]
const urlApi ='https://www.aremycolorsaccessible.com/api/are-they';
const colorsArray = [];
const allColorsSettings = [];
const fetchData = async(colorList) => {
    let contrast = null;
    if(colorList.colors[0] === colorList.colors[1]){
        contrast = {
            "small": "Fail",
            "bold": "Fail",
            "large": "Fail",
            "overall": "Nope",
          };
        colorsArray.push(contrast);
    } else {
    const response = await fetch(urlApi, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(colorList),
      })
      contrast = await response.json();
      colorsArray.push(contrast);
    }
    const settings = {
        ...colorList, contrast: {...contrast}
    }
    allColorsSettings.push(settings);
};

for (const colorList of colorInputList) {
    console.log(colorList);
    fetchData(colorList);
}
