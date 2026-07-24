export function getLoader(text = "Almost There ..."){

    const component = document.createElement("div");

    component.innerHTML = `
        <div class = "Lcard">
            <div class="loader"></div>
            <div class="Ltext">Almost There ...</div>
        </div>
    `
    const Ltext = component.querySelector(".Ltext");
    Ltext.textContent=text;

    return component

}