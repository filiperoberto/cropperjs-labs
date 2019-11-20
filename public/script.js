import { pegaTamanhoFinal } from './crop-helper.js'

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  }
  
  Vue.component('v-style', {
    render: function (createElement) {
      return createElement('style', this.$slots.default)
    }
  });
  
  var app = new Vue({
    el: '#app',
    data() {
      return {
        cropper : undefined,
        preview :undefined,
        circle: false,
        backgroundBlur: true,
        width: 400,
        height: 400,
        angle: 0,
        cropBoxWidth: 0,
        cropBoxHeight: 0,
        maxWidth: 400,
        maxHeight: 400
      }
    },
  
    mounted() {
      this.initCropper();
    },
    
    computed: {
      aspectRatio() {
        return parseFloat(this.width) / parseFloat(this.height)
      },
      borderRadiusPreview() {

        var angle = this.backgroundBlur ? 0 : this.angle;
        return Math.min(parseFloat(this.cropBoxWidth),parseFloat(this.cropBoxHeight)) * parseInt(angle) / 100
      }
    },
  
    methods: {
  
      initCropper() {
  
        var vue = this;
  
        this.cropper = new Cropper(this.$refs.image, {
          data: {
            width: 400,
            height: 400,
          },
          //aspectRatio: this.maxWidth / tmaxHeight,
          crop(event) {
            
            var box = vue.cropper.getCropBoxData()
                      
            vue.cropBoxWidth = box.width
            vue.cropBoxHeight = box.height
            vue.width = event.detail.width;
            vue.height = event.detail.height;
          }
        })
      },
      crop() {
        
        let options = {fillColor: '#333'}
        
        /*if(this.backgroundBlur) {
          options.maxWidth = this.maxWidth;
          options.maxHeight = this.maxHeight;
        }*/
        
        var croppedCanvas = this.cropper.getCroppedCanvas(options);
  
        var roundedCanvas;
        
        if(this.backgroundBlur) {
          croppedCanvas = this.blurBackgroundImage(croppedCanvas)
        }

        if (this.circle) {
          roundedCanvas = this.getRoundedCanvas(croppedCanvas);
        } else if (this.angle > 0) {
          roundedCanvas = this.getRoundedRectCanvas(croppedCanvas);
        } else {
          roundedCanvas = croppedCanvas;
        }
        // Round
  
        roundedCanvas.toBlob(blob => {
          this.preview = URL.createObjectURL(blob);
        });
      },
      getRoundedRectCanvas(sourceCanvas) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        //var scaleX = width / height;
  
        var radius = Math.min(width,height) * (parseInt(this.angle)/100)
  
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = "destination-in";
        //context.scale(scaleX,1);
        context.beginPath();
        context.roundRect(0,0,width,height,radius);
        context.fill();
        return canvas;
      },
      getRoundedCanvas(sourceCanvas) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        var scaleX = width / height;
  
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = "destination-in";
        context.beginPath();
        context.scale(scaleX,1);
        context.arc(
          (width / 2) / scaleX,
          height / 2,
          Math.min(width / scaleX, height) / 2,
          0,
          2 * Math.PI,
          true
        );
        context.fill();
        return canvas;
      },
      
      blurBackgroundImage(croppedCanvas) {
        
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        
        var box = this.cropper.getData();
        
        var width = this.maxWidth;
        var height = this.maxHeight;
        
        canvas.width = width;
        canvas.height = height;
        
        context.imageSmoothingEnabled = true;
        
        context.save();
        
        context.filter = 'blur(5px)';
        context.drawImage(this.cropper.image, 0, 0, width, height);
        
        context.restore();      

        var finalBox = pegaTamanhoFinal(croppedCanvas, canvas);

        innerWidth = finalBox.width
        innerHeight = finalBox.height
        
        context.drawImage(croppedCanvas,
          canvas.width / 2 - innerWidth / 2,
          canvas.height / 2 - innerHeight / 2,
          innerWidth,
          innerHeight
        );
        
        return canvas
      },
      
      changeWidth() {
        this.cropper.setData({width : parseInt(this.width)})
      },
      changeHeight() {
        this.cropper.setData({height : parseInt(this.height)})
      }
    }
  
  })
  