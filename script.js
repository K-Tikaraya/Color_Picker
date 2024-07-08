const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const clearAll=document.querySelector(".clear-all");

const copyColor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "copied";
    setTimeout(()=>  elem.innerText=elem.dataset.color,1000)
}

const showColors = () =>{
    if(!pickedColors.length) return;  //not show anything if no colors picked 

    colorList.innerHTML= pickedColors.map(color =>
    `<li class="color">
        <span class="rect" style = "background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color} "></span>
        <span class="value"; data-color = "${color}"> ${color}</span>
    </li>`
    ).join("");  //Generating li for the picked color and adding it to Colorlist

    document.querySelector(".picked-colors").classList.remove("hide");

    // on clicking colorlist element color copied
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}


showColors();
const activateEyeDropper = () => {
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            const eyeDropper = new EyeDropper();
            const {sRGBHex} = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);
            if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
           showColors();
            }
        }
        catch(error) {
            console.log("failed to print color ");
        }

        document.body.style.display = "block";
    },10) 
    

}
// Clearing all picked colors ,and hiding picked colors element and updating localStorage and 
const clearAllcolors = () =>{
    pickedColors.length = 0;
    localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
    
}

colorPickerBtn.addEventListener("click",activateEyeDropper);
clearAll.addEventListener("click",clearAllcolors);
