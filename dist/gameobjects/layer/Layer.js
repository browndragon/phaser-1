import {GameObject} from "../GameObject";
export class Layer extends GameObject {
  constructor() {
    super();
    this.type = "Layer";
    this.passthru = true;
    this.willRender = false;
  }
}
