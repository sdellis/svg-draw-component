declare var paper: any;
declare var SuperGif: any;

namespace IIIFComponents {
    export class GifSubject implements ISubject {

        public raster: any;
        public $wrapper: JQuery;
        private imgID: string;

        constructor(target) {
            this.imgID = target;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper" resize="true"></canvas></div>');
        }

        public freeze(): void {
          console.log("Image frozen!");
        }

        public addBackground(svgDrawPaper): void {
            var _this = this;
            var sup1 = new SuperGif({ gif: document.getElementById(this.imgID), auto_play: 0 } );

            sup1.load(function(){
                var c = sup1.get_canvas();
                var rasters = [];
                var frame_num = sup1.get_length();

                $('.paper').css('width', c.width + 'px');
                $('.paper').css('height', c.height + 'px');
                svgDrawPaper.view.viewSize.width = c.width;
                svgDrawPaper.view.viewSize.height = c.height;

                function rasterLoaded(raster, i) {
                   var layer = new svgDrawPaper.Layer({'name': 'frame_'+i, insert: false});
                   var $layerTool;
                   svgDrawPaper.project.addLayer(layer);
                   layer.addChild(raster);
                   raster.position = svgDrawPaper.view.center;
                   raster.locked = true;

                   if(i > 0){
                       $layerTool = $('<li id="'+ layer.name +'" class="tool-btn"><input id="'+ layer.name +'-eye_btn" class="eye_btn" aria-label="Layer Visibility Toggle" type="checkbox" name="'+ layer.name +'"><label for="'+ layer.name +'-eye_btn"> <i class="fa fa-fw fa-eye" aria-hidden="true" title="Toggle layer visibility?"></i></label><input id="'+ layer.name +'-lock_btn" class="lock_btn" aria-label="Lock Layer Toggle" type="checkbox" name="'+ layer.name +'"><label for="'+ layer.name +'-lock_btn"><i class="fa fa-fw fa-lock" aria-hidden="true" title="Toggle layer lock?"></i></label><span>'+ layer.name +'</span></li>');
                       layer.visible = false;
                   } else {
                       $layerTool = $('<li id="'+ layer.name +'" class="tool-btn selected"><input id="'+ layer.name +'-eye_btn" class="eye_btn" aria-label="Layer Visibility Toggle" type="checkbox" name="'+ layer.name +'" checked><label for="'+ layer.name +'-eye_btn"> <i class="fa fa-fw fa-eye" aria-hidden="true" title="Toggle layer visibility?"></i></label><input id="'+ layer.name +'-lock_btn" class="lock_btn" aria-label="Lock Layer Toggle" type="checkbox" name="'+ layer.name +'"><label for="'+ layer.name +'-lock_btn"><i class="fa fa-fw fa-lock" aria-hidden="true" title="Toggle layer lock?"></i></label><span>'+ layer.name +'</span></li>');
                       layer.activate();
                   }

                   $('.toolbar-layers .tools').append($layerTool);
                }

                for (var i = 0; i < frame_num; i++) {
                    sup1.move_to(i);
                    c = sup1.get_canvas();
                    frames[i] = c.toDataURL("image/png");
                    rasters[i] = new svgDrawPaper.Raster(c.toDataURL("image/png"));
                    rasters[i].on('load', rasterLoaded(rasters[i],i));
                }

                $('.jsgif > canvas').hide();

            });

        }

        public getSubjectType(): SubjectType {
          return SubjectType.GIF;
        }

    }
}
