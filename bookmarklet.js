let myInit = {
    method: "GET",
    mode: "cors"
};
fetch("https://raw.githubusercontent.com/EliasYoussefOMS/MakeXlateLookupTable/master/script.js", myInit).then((t) => {
    return t.text()
}).then(text => {
    eval(text)
});