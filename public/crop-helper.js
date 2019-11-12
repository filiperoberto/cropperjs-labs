export function pegaTamanhoFinal(cropBox, wrapperBox) {

    var innerWidth = cropBox.width;
    var innerHeight = cropBox.height;

    var width = wrapperBox.width
    var height = wrapperBox.height
    
    var outAspectRatio = width / height;
    var aspectRatio = innerWidth / innerHeight;

    if(innerWidth <= width && aspectRatio >= 1) {
        innerWidth = width
        innerHeight = innerWidth / aspectRatio
    } else if (innerHeight <= height && aspectRatio < 1) {
        innerHeight = height
        innerWidth = innerHeight * aspectRatio
    }

    return { width : innerWidth, height : innerHeight }
}

export default { pegaTamanhoFinal }