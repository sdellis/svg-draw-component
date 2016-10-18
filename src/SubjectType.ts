namespace IIIFComponents {
    export class SubjectType extends StringValue{
        public static DEFAULT = new SubjectType("");
        public static GIF = new SubjectType("gif");
        public static IMAGE = new SubjectType("image");
        public static OPENSEADRAGON = new SubjectType("openseadragon");
    }
}
