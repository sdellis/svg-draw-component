// base-component v1.0.2 https://github.com/viewdir/base-component#readme
interface Window {
    _Components: any;
}

declare var TinyEmitter: any;
declare namespace _Components {
    class BaseComponent implements IBaseComponent {
        options: IBaseComponentOptions;
        protected _$element: JQuery;
        constructor(options: IBaseComponentOptions);
        protected _init(): boolean;
        protected _getDefaultOptions(): IBaseComponentOptions;
        protected _emit(event: string, ...args: any[]): void;
        protected _resize(): void;
        databind(data?: any): void;
    }
    function applyMixins(derivedCtor: any, baseCtors: any[]): void;
}

declare namespace _Components {
    interface IBaseComponent {
        options: IBaseComponentOptions;
        databind(data?: any): void;
    }
}

declare namespace _Components {
    interface IBaseComponentOptions {
        element?: string;
    }
}

// custom definitions go in here
declare var paper: any;
declare var SuperGif: any;
declare namespace IIIFComponents {
    class GifSubject implements ISubject {
        raster: any;
        $wrapper: JQuery;
        private imgID;
        constructor(target: any);
        freeze(): void;
        addBackground(svgDrawPaper: any): void;
        getSubjectType(): SubjectType;
    }
}

declare namespace IIIFComponents {
    interface ISubject {
        $wrapper: JQuery;
        addBackground(svgDrawPaper: any): void;
        getSubjectType(): SubjectType;
        freeze(): void;
    }
}

declare namespace IIIFComponents {
    interface ISubjectOptions {
        target?: any;
    }
}

declare namespace IIIFComponents {
    interface ISvgDrawComponent extends _Components.IBaseComponent {
    }
}

declare namespace IIIFComponents {
    interface ISvgDrawComponentOptions extends _Components.IBaseComponentOptions {
        subjectType?: string;
        subject?: any;
        toolbars?: any;
    }
}

declare var paper: any;
declare namespace IIIFComponents {
    class ImageSubject implements ISubject {
        raster: any;
        $wrapper: JQuery;
        private imgID;
        constructor(target: any);
        freeze(): void;
        addBackground(svgDrawPaper: any): void;
        getSubjectType(): SubjectType;
    }
}

declare var OpenSeadragon: any;
declare var paper: any;
declare namespace IIIFComponents {
    class OSDSubject implements ISubject {
        $wrapper: JQuery;
        private viewer;
        constructor(target: any);
        freeze(): void;
        addBackground(svgDrawPaper: any): void;
        getSubjectType(): SubjectType;
        private addOverlay();
        private addTools();
    }
}

declare namespace IIIFComponents {
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
}

declare namespace IIIFComponents {
    class Subject implements ISubject {
        $wrapper: JQuery;
        constructor(target: any);
        addBackground(svgDrawPaper: any): void;
        freeze(): void;
        getSubjectType(): SubjectType;
    }
}

declare namespace IIIFComponents {
    class SubjectType extends StringValue {
        static DEFAULT: SubjectType;
        static GIF: SubjectType;
        static IMAGE: SubjectType;
        static OPENSEADRAGON: SubjectType;
    }
}

declare var paper: any;
declare namespace IIIFComponents {
    class SvgDrawComponent extends _Components.BaseComponent implements ISvgDrawComponent {
        options: ISvgDrawComponentOptions;
        subject: ISubject;
        importSVG(svg: any): void;
        private _$canvas;
        private _$wrapper;
        private _$toolbarDiv;
        private _$toolbarCtrl;
        private _$layersToolbarDiv;
        private _$layersToolbarCtrl;
        private _$toolbar;
        svgDrawPaper: any;
        private _hitOptions;
        constructor(options: ISvgDrawComponentOptions);
        protected _init(): boolean;
        debug(): void;
        takeSnapshot(layer_name: any): void;
        pathCompleted(shape: any): void;
        pathUpdated(shape: any): void;
        pathDeleted(name: any, layer: any): void;
        private _slugify(text);
        addLayersToolbar(): void;
        addToolsToolbar(): void;
        layers(name?: string): any;
        addLayer(name?: string): any;
        paperSetup(el: HTMLElement): void;
        protected _getDefaultOptions(): ISvgDrawComponentOptions;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.SvgDrawComponent {
    class Events {
        static DEBUG: string;
        static SHAPECOMPLETED: string;
        static SHAPEUPDATED: string;
        static SHAPEDELETED: string;
        static SVGLOADED: string;
        static SNAPSHOTCOMPLETED: string;
    }
}
