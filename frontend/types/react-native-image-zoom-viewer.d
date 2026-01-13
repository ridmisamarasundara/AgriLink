declare module "react-native-image-zoom-viewer" {
  import { Component } from "react";
  import { ViewProps, ImageProps } from "react-native";

  export interface ImageObject {
    url: string;
    props?: ImageProps;
  }

  export interface ImageViewerProps extends ViewProps {
    imageUrls: ImageObject[];
    enableSwipeDown?: boolean;
    onSwipeDown?: () => void;
    saveToLocalByLongPress?: boolean;
  }

  export default class ImageViewer extends Component<ImageViewerProps> {}
}
