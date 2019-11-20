export function pegaTamanhoFinal(cropBox, wrapperBox) {

    var innerWidth = cropBox.width;
    var innerHeight = cropBox.height;

    var width = wrapperBox.width
    var height = wrapperBox.height
    
    var outAspectRatio = width / height;
    var aspectRatio = innerWidth / innerHeight;

    innerWidth = aspectRatio > outAspectRatio ? width : height * aspectRatio;
    innerHeight = aspectRatio > outAspectRatio ? width / aspectRatio : height;
    
    return { width : innerWidth, height : innerHeight }
}

export default { pegaTamanhoFinal }