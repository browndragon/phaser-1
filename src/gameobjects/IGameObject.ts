import { IBaseWorld } from '../world/IBaseWorld';
import { IBoundsComponent } from '../components/bounds/IBoundsComponent';
import { ICanvasRenderer } from '../renderer/canvas/ICanvasRenderer';
import { IEventInstance } from '../events/IEventInstance';
import { IInputComponent } from '../components/input/IInputComponent';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { Matrix2D } from '../math/mat2d/Matrix2D';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { Vec2 } from '../math/vec2/Vec2';
import { Vertex } from '../components/Vertex';

export interface IGameObject
{
    name: string;
    world: IBaseWorld;
    parent: IGameObject;
    children: IGameObject[];

    willUpdate: boolean;
    willUpdateChildren: boolean;
    willRender: boolean;
    willRenderChildren: boolean;
    willCacheChildren: boolean;

    numChildren: number;

    dirty: number;
    dirtyFrame: number;

    visible: boolean;

    events: Map<string, Set<IEventInstance>>;

    bounds: IBoundsComponent;
    input: IInputComponent;
    vertices: Vertex[];

    localTransform: Matrix2D;
    worldTransform: Matrix2D;
    transformData: Float32Array;
    transformExtent: Rectangle;

    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    originX: number;
    originY: number;
    passthru: boolean;

    isRenderable (): boolean;
    isDirty (flag: number): boolean;
    clearDirty (flag: number): this;
    setDirty (flag: number, flag2?: number): this;

    update (delta: number, time: number): void;
    postUpdate (delta: number, time: number): void;

    renderGL <T extends IRenderPass> (renderPass: T): void;
    renderCanvas <T extends ICanvasRenderer> (renderer: T): void;
    postRenderGL <T extends IRenderPass> (renderPass: T): void;
    postRenderCanvas <T extends ICanvasRenderer> (renderer: T): void;

    getBounds (): Rectangle;

    updateTransform (flag: number, value: number): void;
    updateLocalTransform (): void;
    updateWorldTransform (): void;
    updateExtent (width?: number, height?: number): void;
    setExtent (x: number, y: number, width: number, height: number): void;

    setSize (width: number, height?: number): this;
    setPosition (x: number, y: number): this;
    setOrigin (x: number, y?: number): this;
    setSkew (x: number, y?: number): this;
    setScale (x: number, y?: number): this;
    setRotation (value: number): this;

    getSize (out?: Vec2): Vec2;
    getPosition (out?: Vec2): Vec2;
    getOrigin (out?: Vec2): Vec2;
    getSkew (out?: Vec2): Vec2;
    getScale (out?: Vec2): Vec2;
    getRotation (): number;

    destroy (reparentChildren?: IGameObject): void;
}
