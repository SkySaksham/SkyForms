export function getLoader(text = "Almost There ..."){

    const component = document.createElement("div");
    component.className = "Loadercard"

    component.innerHTML = `
            <div class="loader"></div>
            <div class="Loadertext">Almost There ...</div>
    `
    const Ltext = component.querySelector(".Loadertext");
    Ltext.textContent=text;

    return component

}