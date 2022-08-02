import { Color } from "three";
import {
    IfcViewerAPI,
} from "web-ifc-viewer";


const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

viewer.axes.setAxes();
viewer.grid.setGrid();


async function loadIfc(url) {
    // Load the model
    const model = await viewer.IFC.loadIfcUrl(url);
    //Add dropped shadow and post-processing efect
    await viewer.shadowDropper.renderShadow(model.modelID);
    viewer.context.renderer.postProduction.active = true;

    const project = viewer.IFC.getSpatialStructure(model.modelID);
}
loadIfc('./IFC/IFCJS-test.ifc');

// //IFC Loading
// const loader = viewer.IFC.loader;
// const input = document.getElementById("file-input");
// const scene = viewer.context.getScene();

// input.addEventListener('change', async() => {
//     const file = input.files[0];
//     const url = URL.createObjectURL(file);
//     const model = await loader.loadAsync(url);
//     // viewer.shadowDropper.renderShadow(model.modelID);
//     // viewer.context.renderer.postProduction.active = true;
//     scene.add(model);
// })

window.ondblclick = () => SelezionaEls();
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();

function SelezionaEls() {
    viewer.IFC.selector.unpickIfcItems();
    viewer.IFC.selector.pickIfcItem(true, true);
}