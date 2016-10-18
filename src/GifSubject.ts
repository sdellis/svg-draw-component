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
                console.log('oh hey, now the gif is loaded');
                var c = sup1.get_canvas();

                var rasters = [];
                var frame_num = sup1.get_length();

                $('.paper').css('width', c.width + 'px');
                $('.paper').css('height', c.height + 'px');
                svgDrawPaper.view.viewSize.width = c.width;
                svgDrawPaper.view.viewSize.height = c.height;

                function rasterLoaded(raster, i) {
                   var layer = new svgDrawPaper.Layer({'name': 'frame_'+i, insert: false});
                   svgDrawPaper.project.addLayer(layer);
                   layer.addChild(raster);
                   raster.position = svgDrawPaper.view.center;
                   layer.visible = false;
                }

                /*
                function loadRaster(num){

                }

                sup1.move_to(0);
                c = sup1.get_canvas();
                loadRaster(0);
                */

                for (var i = 0; i < frame_num; i++) {
                    sup1.move_to(i);
                    c = sup1.get_canvas();
                    rasters[i] = new svgDrawPaper.Raster(c.toDataURL("image/png"));
                    rasters[i].on('load', rasterLoaded(rasters[i],i));
                }


            });

        }

        public getSubjectType(): SubjectType {
          return SubjectType.GIF;
        }

    }
}
