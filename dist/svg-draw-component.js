// svg-draw-component v1.0.1 https://github.com/sdellis/svg-draw-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.svgDrawComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var IIIFComponents;
(function (IIIFComponents) {
    var GifSubject = (function () {
        function GifSubject(target) {
            this.imgID = target;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper" resize="true"></canvas></div>');
        }
        GifSubject.prototype.freeze = function () {
            console.log("Image frozen!");
        };
        GifSubject.prototype.addBackground = function (svgDrawPaper) {
            var _this = this;
            var sup1 = new SuperGif({ gif: document.getElementById(this.imgID), auto_play: 0 });
            var singleDrawLayer = true; // todo: make this an option that can be passed in
            sup1.load(function () {
                var c = sup1.get_canvas();
                var rasters = [];
                var frame_num = sup1.get_length();
                $('.paper').css('width', c.width + 'px');
                $('.paper').css('height', c.height + 'px');
                svgDrawPaper.view.viewSize.width = c.width;
                svgDrawPaper.view.viewSize.height = c.height;
                function rasterLoaded(raster, i) {
                    function paddy(n, p) {
                        var pad = new Array(1 + p).join('0');
                        return (pad + n).slice(-pad.length);
                    }
                    var layer = new svgDrawPaper.Layer({ 'name': 'frame_' + paddy(i, 3), insert: false });
                    var $layerTool;
                    svgDrawPaper.project.addLayer(layer);
                    layer.addChild(raster);
                    raster.position = svgDrawPaper.view.center;
                    raster.locked = true;
                    if (i > 0) {
                        $layerTool = '<li id="' + layer.name + '" class="tool-btn"><input id="' + layer.name + '-eye_btn" class="eye_btn" aria-label="Layer Visibility Toggle" type="checkbox" name="' + layer.name + '"><label for="' + layer.name + '-eye_btn"> <i class="fa fa-fw fa-eye" aria-hidden="true" title="Toggle layer visibility?"></i></label>';
                        if (singleDrawLayer) {
                            $layerTool += '<input id="' + layer.name + '-camera_btn" class="camera_btn" aria-label="Take Snapshot of Drawing Layer" type="checkbox" name="' + layer.name + '"><label for="' + layer.name + '-camera_btn"><i class="fa fa-fw fa-camera" aria-hidden="true" title="Snapshot Drawing to Frame"></i></label>';
                        }
                        $layerTool += '<span>' + layer.name + '</span></li>';
                        layer.visible = false;
                    }
                    else {
                        $layerTool = '<li id="' + layer.name + '" class="tool-btn selected"><input id="' + layer.name + '-eye_btn" class="eye_btn" aria-label="Layer Visibility Toggle" type="checkbox" name="' + layer.name + '" checked><label for="' + layer.name + '-eye_btn"> <i class="fa fa-fw fa-eye" aria-hidden="true" title="Toggle layer visibility?"></i></label>';
                        if (singleDrawLayer) {
                            $layerTool += '<input id="' + layer.name + '-camera_btn" class="camera_btn" aria-label="Take Snapshot of Drawing Layer" type="checkbox" name="' + layer.name + '"><label for="' + layer.name + '-camera_btn"><i class="fa fa-fw fa-camera" aria-hidden="true" title="Snapshot Drawing to Frame"></i></label>';
                        }
                        $layerTool += '<span>' + layer.name + '</span></li>';
                        if (!singleDrawLayer) {
                            layer.activate();
                        }
                    }
                    $layerTool = $($layerTool);
                    $('.toolbar-layers .tools').append($layerTool);
                }
                for (var i = 0; i < frame_num; i++) {
                    sup1.move_to(i);
                    c = sup1.get_canvas();
                    frames[i] = c.toDataURL("image/png");
                    rasters[i] = new svgDrawPaper.Raster(c.toDataURL("image/png"));
                    rasters[i].on('load', rasterLoaded(rasters[i], i));
                }
                $('.jsgif > canvas').hide();
                if (singleDrawLayer) {
                    svgDrawPaper.project.layers['draw'].bringToFront();
                    svgDrawPaper.project.layers['draw'].activate();
                }
                /*
                if(!singleDrawLayer){
                    var drawLayer = new svgDrawPaper.Layer({'name': 'drawLayer'});
                    drawLayer.activate();
                }
                */
            });
        };
        GifSubject.prototype.getSubjectType = function () {
            return IIIFComponents.SubjectType.GIF;
        };
        return GifSubject;
    }());
    IIIFComponents.GifSubject = GifSubject;
})(IIIFComponents || (IIIFComponents = {}));









var IIIFComponents;
(function (IIIFComponents) {
    var ImageSubject = (function () {
        function ImageSubject(target) {
            this.imgID = target;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper" resize="true"></canvas></div>');
        }
        ImageSubject.prototype.freeze = function () {
            console.log("Image frozen!");
        };
        ImageSubject.prototype.addBackground = function (svgDrawPaper) {
            var _this = this;
            this.raster = new svgDrawPaper.Raster(this.imgID);
            this.raster.onLoad = function () {
                console.log('The image has finished loading.');
                $('.paper').css('width', _this.raster.width + 'px');
                $('.paper').css('height', _this.raster.height + 'px');
                svgDrawPaper.view.viewSize.width = _this.raster.width;
                svgDrawPaper.view.viewSize.height = _this.raster.height;
                _this.raster.position = svgDrawPaper.view.center;
            };
        };
        ImageSubject.prototype.getSubjectType = function () {
            return IIIFComponents.SubjectType.IMAGE;
        };
        return ImageSubject;
    }());
    IIIFComponents.ImageSubject = ImageSubject;
})(IIIFComponents || (IIIFComponents = {}));

var IIIFComponents;
(function (IIIFComponents) {
    var OSDSubject = (function () {
        function OSDSubject(target) {
            console.log(target);
            var _this = this;
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
            this.viewer = new OpenSeadragon(target);
            this.viewer.addHandler("open", function () {
                _this.addOverlay();
                _this.addTools();
            });
        }
        OSDSubject.prototype.freeze = function () {
            console.log("OSD frozen!");
        };
        OSDSubject.prototype.addBackground = function (svgDrawPaper) {
            console.log("OSD addBackground!");
        };
        OSDSubject.prototype.getSubjectType = function () {
            return IIIFComponents.SubjectType.OPENSEADRAGON;
        };
        OSDSubject.prototype.addOverlay = function () {
            var element = document.getElementById('canvas-1');
            var rect = new OpenSeadragon.Rect(0, 0, 1, this.viewer.viewport.getAspectRatio() + .07);
            this.viewer.addOverlay({
                element: element,
                location: rect
            });
            paper.view.viewSize.width = $("#canvas-1").width();
            paper.view.viewSize.height = $("#canvas-1").height();
        };
        /*
        <a class="btn btn-danger" href="path/to/settings" aria-label="Delete">
          <i class="fa fa-trash-o" aria-hidden="true" title="Delete this item?"></i>
        </a>
        */
        OSDSubject.prototype.addTools = function () {
            var _this = this;
            $(function () {
                $('.toolbar-tools ul.tools').append($('<li class="tool-btn"><input id="drawmode" type="checkbox" name="drawmode" aria-label="Draw Mode Toggle"><label for="drawmode"><i class="fa fa-fw fa-pencil-square" aria-hidden="true" title="Toggle Draw Mode?"></i></label></li>'));
                $('#drawmode').on('click', function (e) {
                    if (_this.viewer.isMouseNavEnabled() === true) {
                        _this.viewer.setMouseNavEnabled(false);
                    }
                    else {
                        _this.viewer.setMouseNavEnabled(true);
                    }
                });
            });
        };
        return OSDSubject;
    }());
    IIIFComponents.OSDSubject = OSDSubject;
})(IIIFComponents || (IIIFComponents = {}));

var IIIFComponents;
(function (IIIFComponents) {
    var StringValue = (function () {
        function StringValue(value) {
            this.value = "";
            if (value) {
                this.value = value.toLowerCase();
            }
        }
        StringValue.prototype.toString = function () {
            return this.value;
        };
        return StringValue;
    }());
    IIIFComponents.StringValue = StringValue;
})(IIIFComponents || (IIIFComponents = {}));

var IIIFComponents;
(function (IIIFComponents) {
    var Subject = (function () {
        function Subject(target) {
            this.$wrapper = $('<div><canvas id="canvas-1" class="paper"></canvas></div>');
        }
        Subject.prototype.addBackground = function (svgDrawPaper) {
            console.log("Default addBackground!");
        };
        Subject.prototype.freeze = function () {
            console.log("default frozen!");
        };
        Subject.prototype.getSubjectType = function () {
            return new IIIFComponents.SubjectType('');
        };
        return Subject;
    }());
    IIIFComponents.Subject = Subject;
})(IIIFComponents || (IIIFComponents = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IIIFComponents;
(function (IIIFComponents) {
    var SubjectType = (function (_super) {
        __extends(SubjectType, _super);
        function SubjectType() {
            _super.apply(this, arguments);
        }
        SubjectType.DEFAULT = new SubjectType("");
        SubjectType.GIF = new SubjectType("gif");
        SubjectType.IMAGE = new SubjectType("image");
        SubjectType.OPENSEADRAGON = new SubjectType("openseadragon");
        return SubjectType;
    }(IIIFComponents.StringValue));
    IIIFComponents.SubjectType = SubjectType;
})(IIIFComponents || (IIIFComponents = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IIIFComponents;
(function (IIIFComponents) {
    var SvgDrawComponent = (function (_super) {
        __extends(SvgDrawComponent, _super);
        function SvgDrawComponent(options) {
            _super.call(this, options);
            this._init();
            this._resize();
            this._hitOptions = {
                segments: false,
                stroke: false,
                fill: true,
                tolerance: 5,
                class: paper.Path
            };
        }
        SvgDrawComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            var raster;
            if (!success) {
                console.error("Component failed to initialise");
            }
            switch (this.options.subjectType.toString()) {
                case IIIFComponents.SubjectType.OPENSEADRAGON.toString():
                    this.subject = new IIIFComponents.OSDSubject(this.options.subject);
                    break;
                case IIIFComponents.SubjectType.GIF.toString():
                    this.subject = new IIIFComponents.GifSubject(this.options.subject);
                    break;
                case IIIFComponents.SubjectType.IMAGE.toString():
                    this.subject = new IIIFComponents.ImageSubject(this.options.subject);
                    break;
                default:
                    this.subject = new IIIFComponents.Subject(this.options.subject);
            }
            this._$wrapper = this.subject.$wrapper;
            this._$canvas = this._$wrapper.find('#canvas-1');
            this._$element.append(this._$wrapper);
            this.paperSetup(this._$canvas[0]);
            if (this.options.toolbars) {
                if (this.options.toolbars.tools) {
                    this.addToolsToolbar();
                }
                if (this.options.toolbars.layers) {
                    this.addLayersToolbar();
                }
                // Shared Event Handler
                $('.toolbar').draggable({ handle: ".ctrl" });
            }
            return success;
        };
        SvgDrawComponent.prototype.debug = function () {
            this._emit(SvgDrawComponent.Events.DEBUG, this.options.subjectType);
        };
        SvgDrawComponent.prototype.takeSnapshot = function (layer_name) {
            var payload = {};
            var $layer_svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            // 1) copy all layer children from draw layer to this layer and lock all children
            this.svgDrawPaper.project.layers[layer_name].copyContent(this.svgDrawPaper.project.layers['draw']);
            var children = this.svgDrawPaper.project.layers[layer_name].children.map(function (child) {
                child.locked = true;
                child.selected = false;
            });
            var $layer = $(this.svgDrawPaper.project.layers['draw'].exportSVG({ matchShapes: true }));
            $layer_svg.append($layer);
            payload = {
                'name': layer_name,
                'layer_svg': $layer_svg[0].outerHTML
            };
            // 2) fire event with layer svg coordinates and the layer it's being copied to
            this._emit(SvgDrawComponent.Events.SNAPSHOTCOMPLETED, payload);
        };
        SvgDrawComponent.prototype.pathCompleted = function (shape) {
            var payload = {};
            var media_fragment_coords = null;
            var $svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $layer_svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $shape = $(shape.exportSVG({ matchShapes: true }));
            $svg.append($shape);
            if (shape.layer) {
                var $layer = $(shape.layer.exportSVG({ matchShapes: true }));
                $layer_svg.append($layer);
            }
            shape.name = $shape[0].tagName + "_" + shape._id;
            if ($shape[0].tagName === 'rect' && shape.rotation === 0) {
                media_fragment_coords = {
                    'x': shape.bounds.x,
                    'y': shape.bounds.y,
                    'h': shape.bounds.height,
                    'w': shape.bounds.width
                };
            }
            payload = {
                'name': shape.name,
                'media_fragment_coords': media_fragment_coords,
                'svg': $svg[0].outerHTML,
                'layer_svg': $layer_svg[0].outerHTML
            };
            this._emit(SvgDrawComponent.Events.SHAPECOMPLETED, payload);
        };
        SvgDrawComponent.prototype.pathUpdated = function (shape) {
            var payload = {};
            var media_fragment_coords = null;
            var $svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $layer_svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $shape = $(shape.exportSVG({ matchShapes: true }));
            var $layer = $(shape.layer.exportSVG({ matchShapes: true }));
            $svg.append($shape);
            $layer_svg.append($layer);
            if ($shape[0].tagName === 'rect' && shape.rotation === 0) {
                media_fragment_coords = {
                    'x': shape.bounds.x,
                    'y': shape.bounds.y,
                    'h': shape.bounds.height,
                    'w': shape.bounds.width
                };
            }
            payload = {
                'name': shape.name,
                'media_fragment_coords': media_fragment_coords,
                'svg': $svg[0].outerHTML,
                'layer_svg': $layer_svg[0].outerHTML
            };
            this._emit(SvgDrawComponent.Events.SHAPEUPDATED, payload);
        };
        SvgDrawComponent.prototype.pathDeleted = function (name, layer) {
            var $layer_svg = $("<svg xmlns='http://www.w3.org/2000/svg'/>");
            var $layer = $(layer.exportSVG({ matchShapes: true }));
            $layer_svg.append($layer);
            var payload = {
                'name': name,
                'layer_svg': $layer_svg[0].outerHTML
            };
            this._emit(SvgDrawComponent.Events.SHAPEDELETED, payload);
        };
        SvgDrawComponent.prototype._slugify = function (text) {
            return text.toString().toLowerCase().trim()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/&/g, '-and-') // Replace & with 'and'
                .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                .replace(/\-\-+/g, '-'); // Replace multiple - with single -
        };
        SvgDrawComponent.prototype.addLayersToolbar = function () {
            var _this = this;
            //var singleDrawLayer = this.options.toolbars.layers.singleDrawLayer;
            //var markup = '';
            var layers = this.options.toolbars.layers.presets.map(function (layer) {
                var isActive = '', isVisible = '', isLocked = '', tmp;
                tmp = _this.addLayer(layer.name);
                if (layer.active) {
                    isActive = 'selected';
                    tmp.activate();
                }
                ;
                if (layer.visible) {
                    isVisible = 'checked';
                    tmp.visible = true;
                }
                ;
                if (layer.locked) {
                    isLocked = 'checked';
                    tmp.locked = true;
                }
                ;
                return $('<li id="' + tmp.name + '" class="tool-btn ' + isActive + '"><input id="' + tmp.name + '-eye_btn" class="eye_btn" aria-label="Layer Visibility Toggle" type="checkbox" name="' + tmp.name + '" ' + isVisible + '><label for="' + tmp.name + '-eye_btn"> <i class="fa fa-fw fa-eye" aria-hidden="true" title="Toggle layer visibility?"></i></label><input id="' + tmp.name + '-lock_btn" class="lock_btn" aria-label="Lock Layer Toggle" type="checkbox" name="' + tmp.name + '" ' + isLocked + '><label for="' + tmp.name + '-lock_btn"><i class="fa fa-fw fa-lock" aria-hidden="true" title="Toggle layer lock?"></i></label><span>' + layer.name + '</span></li>');
            });
            this._$layersToolbarDiv = $('<div class="toolbar toolbar-layers">');
            this._$layersToolbarCtrl = $('<div class="ctrl ctrl-layers">Layers</div>');
            this._$toolbar = $('<ul class="tools">');
            this._$toolbar.append(layers);
            this._$layersToolbarDiv.append(this._$layersToolbarCtrl);
            this._$layersToolbarDiv.append(this._$toolbar);
            this._$element.after(this._$layersToolbarDiv);
            /* //////
            // EVENT HANDLERS
            */
            $('.ctrl-layers').on("dblclick", function () {
                $('.toolbar-layers').toggleClass('minToolbar');
            });
            $('.toolbar-layers').on('click', 'input', function (e) {
                var target = e.target;
                switch (e.target.className) {
                    case 'eye_btn':
                        _this.svgDrawPaper.project.layers[target.name].visible = !_this.svgDrawPaper.project.layers[target.name].visible;
                        break;
                    case 'lock_btn':
                        _this.svgDrawPaper.project.layers[target.name].locked = !_this.svgDrawPaper.project.layers[target.name].locked;
                        break;
                    case 'camera_btn':
                        _this.takeSnapshot(target.name);
                        break;
                }
            });
            $('.toolbar-layers').on('click', 'span', function (e) {
                var target = e.target;
                // clear select class
                $('.toolbar-layers li').removeClass('selected');
                // activate parent
                _this.svgDrawPaper.project.layers[target.parentElement.id].activate();
                // add select class
                $('li#' + target.parentElement.id).addClass('selected');
            });
        };
        SvgDrawComponent.prototype.addToolsToolbar = function () {
            var _this = this;
            var tools = this.options.toolbars.tools.buttons.map(function (tool) {
                if (tool.name === 'separator') {
                    return $('<li class="separator"></li>');
                }
                else {
                    return $('<li class="tool-btn"><input id="' + tool.name + 'Tool" type="radio" name="toolbar" aria-label="' + tool.name + ' tool"><label for="' + tool.name + 'Tool"><i class="fa fa-fw ' + tool.fa_icon + '" aria-hidden="true" title="' + tool.name + ' tool"></i></label></li>');
                }
            });
            this._$toolbarDiv = $('<div class="toolbar toolbar-tools">');
            this._$toolbarCtrl = $('<div class="ctrl ctrl-tools">Tools</div>');
            this._$toolbar = $('<ul class="tools">');
            this._$toolbar.append(tools);
            this._$toolbarDiv.append(this._$toolbarCtrl);
            this._$toolbarDiv.append(this._$toolbar);
            this._$element.after(this._$toolbarDiv);
            /* //////
            // EVENT HANDLERS
            */
            $('.ctrl-tools').on("dblclick", function () {
                $('.toolbar-tools').toggleClass('minToolbar');
            });
            $('.toolbar-tools input').on('click', function (e) {
                switch (e.target.id) {
                    case 'selectTool':
                        _this.svgDrawPaper.selectTool.activate();
                        break;
                    case 'pointTool':
                        _this.svgDrawPaper.pointTool.activate();
                        break;
                    case 'lineTool':
                        _this.svgDrawPaper.lineTool.activate();
                        break;
                    case 'cloudTool':
                        _this.svgDrawPaper.cloudTool.activate();
                        break;
                    case 'rectTool':
                        _this.svgDrawPaper.rectTool.activate();
                        break;
                    default:
                        _this.svgDrawPaper.selectTool.activate();
                }
            });
        };
        SvgDrawComponent.prototype.importSVG = function (svg) {
            this.svgDrawPaper.project.activeLayer.importSVG(svg, this._emit(SvgDrawComponent.Events.SVGLOADED, true));
        };
        SvgDrawComponent.prototype.layers = function (name) {
            if (name)
                return this.svgDrawPaper.project.layers[name];
            else
                return this.svgDrawPaper.project.layers;
        };
        SvgDrawComponent.prototype.addLayer = function (name) {
            var layer;
            if (name) {
                layer = new this.svgDrawPaper.Layer({ 'name': this._slugify(name) });
            }
            else {
                layer = new this.svgDrawPaper.Layer();
            }
            return layer;
        };
        SvgDrawComponent.prototype.paperSetup = function (el) {
            var path, point, line, cloud, rectangle;
            var dragging = false;
            var _this = this;
            this.svgDrawPaper = new paper.PaperScope();
            this.svgDrawPaper.setup(el);
            // todo: this should return array of layers it creates
            //       and optionally add them to LayerTools
            this.subject.addBackground(this.svgDrawPaper);
            // todo: this code should go into the separate Subject providers
            this.svgDrawPaper.project.activeLayer.name = 'bg';
            var bgLayer = this.svgDrawPaper.project.activeLayer;
            bgLayer.locked = true;
            var drawLayer = this.addLayer('draw');
            drawLayer.bringToFront();
            drawLayer.activate();
            ////// S E L E C T   T O O L ////////////
            this.svgDrawPaper.selectTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.selectTool.onMouseDown = function (event) {
                _this.svgDrawPaper.project.activeLayer.selected = false;
                if (event.item) {
                    event.item.selected = true;
                }
            };
            this.svgDrawPaper.selectTool.onMouseDrag = function (event) {
                if (event.item) {
                    dragging = true;
                    event.item.position.x += event.delta.x;
                    event.item.position.y += event.delta.y;
                }
            };
            this.svgDrawPaper.selectTool.onMouseUp = function (event) {
                if (event.item) {
                    if (dragging) {
                        dragging = false;
                        _this.pathUpdated(event.item); // fire update event
                    }
                }
            };
            this.svgDrawPaper.selectTool.onKeyUp = function (event) {
                if (event.key == 'backspace') {
                    var selected = _this.svgDrawPaper.project.selectedItems;
                    for (var i = 0; i < selected.length; i++) {
                        var item = selected[i];
                        var name = item.name;
                        var layer = item.layer;
                        item.remove();
                        _this.pathDeleted(name, layer); // fire delete event
                    }
                    return false;
                }
            };
            ////// P O I N T S ////////////
            this.svgDrawPaper.pointTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.pointTool.onMouseDown = function (event) {
                point = new _this.svgDrawPaper.Path.Circle(event.point, 10);
                point.strokeColor = 'red';
                point.fillColor = 'white';
                point.opacity = 0.5;
            };
            this.svgDrawPaper.pointTool.onMouseUp = function (event) {
                var pointCopy = point.clone();
                pointCopy.selected = true;
                point.remove();
                _this.pathCompleted(pointCopy); // fire event
            };
            ////// S T R A I G H T  L I N E S ////////////
            this.svgDrawPaper.lineTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.lineTool.onMouseDown = function (event) {
                line = new _this.svgDrawPaper.Path();
                line.strokeColor = 'red';
                line.fillColor = 'white';
                line.opacity = 0.5;
                line.add(event.point);
            };
            this.svgDrawPaper.lineTool.onMouseDrag = function (event) {
                line.add(event.point);
            };
            this.svgDrawPaper.lineTool.onMouseUp = function (event) {
                line.closed = true;
                line.simplify();
                var lineCopy = line.clone();
                line.remove();
                lineCopy.selected = true;
                _this.pathCompleted(lineCopy); // fire event
            };
            ////// C L O U D Y  L I N E S ////////////
            this.svgDrawPaper.cloudTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.cloudTool.minDistance = 20;
            this.svgDrawPaper.cloudTool.onMouseDown = function (event) {
                cloud = new _this.svgDrawPaper.Path();
                cloud.strokeColor = 'red';
                cloud.fillColor = 'white';
                cloud.opacity = 0.5;
                cloud.add(event.point);
            };
            this.svgDrawPaper.cloudTool.onMouseDrag = function (event) {
                // Use the arcTo command to draw cloudy lines
                cloud.arcTo(event.point);
            };
            this.svgDrawPaper.cloudTool.onMouseUp = function (event) {
                cloud.closed = true;
                var cloudCopy = cloud.clone();
                cloud.remove();
                cloudCopy.selected = true;
                _this.pathCompleted(cloudCopy); // fire event
            };
            ////// R E C T A N G L E ////////////
            this.svgDrawPaper.rectTool = new this.svgDrawPaper.Tool();
            this.svgDrawPaper.rectTool.onMouseDrag = function (event) {
                if (rectangle) {
                    rectangle.remove();
                }
                drawRect(event.downPoint, event.point);
            };
            this.svgDrawPaper.rectTool.onMouseUp = function (event) {
                if (rectangle) {
                    var rectCopy = rectangle.clone();
                    rectangle.remove();
                    rectCopy.selected = true;
                    _this.pathCompleted(rectCopy);
                }
            };
            function drawRect(start, end) {
                var rect = new _this.svgDrawPaper.Rectangle(start, end);
                rectangle = new _this.svgDrawPaper.Path.Rectangle(rect);
                rectangle.strokeColor = 'red';
                rectangle.fillColor = 'white';
                rectangle.opacity = 0.5;
            }
        };
        SvgDrawComponent.prototype._getDefaultOptions = function () {
            return {
                subject: {},
                subjectType: IIIFComponents.SubjectType.DEFAULT.toString()
            };
        };
        SvgDrawComponent.prototype._resize = function () {
        };
        return SvgDrawComponent;
    }(_Components.BaseComponent));
    IIIFComponents.SvgDrawComponent = SvgDrawComponent;
})(IIIFComponents || (IIIFComponents = {}));
var IIIFComponents;
(function (IIIFComponents) {
    var SvgDrawComponent;
    (function (SvgDrawComponent) {
        var Events = (function () {
            function Events() {
            }
            Events.DEBUG = 'debug';
            Events.SHAPECOMPLETED = 'shapeCompleted';
            Events.SHAPEUPDATED = 'shapeUpdated';
            Events.SHAPEDELETED = 'shapeDeleted';
            Events.SVGLOADED = 'svgLoaded';
            Events.SNAPSHOTCOMPLETED = 'snapshotCompleted';
            return Events;
        }());
        SvgDrawComponent.Events = Events;
    })(SvgDrawComponent = IIIFComponents.SvgDrawComponent || (IIIFComponents.SvgDrawComponent = {}));
})(IIIFComponents || (IIIFComponents = {}));
(function (w) {
    if (!w.IIIFComponents) {
        w.IIIFComponents = IIIFComponents;
    }
    else {
        w.IIIFComponents.SvgDrawComponent = IIIFComponents.SvgDrawComponent;
    }
})(window);

},{}]},{},[1])(1)
});