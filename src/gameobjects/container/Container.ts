import { GetDefaultOriginX, GetDefaultOriginY } from '../../config/defaultorigin';
import { UpdateLocalTransform, UpdateWorldTransform } from '../../components/transform';

import { AddTransform2DComponent } from '../../components/AddTransform2DComponent';
import { DIRTY_CONST } from '../DIRTY_CONST';
import { GameObject } from '../GameObject';
import { GameObjectWorld } from '../../components/GameObjectWorld';
import { GetRectangleSize } from '../../geom/rectangle/GetRectangleSize';
import { IContainer } from './IContainer';
import { IGameObject } from '../IGameObject';
import { Matrix2D } from '../../math/mat2d/Matrix2D';
import { Matrix2DComponent } from '../../components/Matrix2DComponent';
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { Transform2DComponent } from '../../components/Transform2DComponent';
import { UpdateTransform2DSystem } from '../../components/UpdateTransform2DSystem';
import { Vec2 } from '../../math/vec2/Vec2';
import { addComponent } from 'bitecs';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    constructor (x: number = 0, y: number = 0, width?: number, height?: number)
    {
        super(x, y);

        this.type = 'Container';
        if (width !== undefined)
        {
            this.setSize(width, height);
        }

    }

    get alpha (): number
    {
        return this._alpha;
    }

    set alpha (value: number)
    {
        if (value !== this._alpha)
        {
            this._alpha = value;

            this.vertices.forEach(vertex =>
            {
                vertex.setAlpha(value);
            });

            this.setDirty(DIRTY_CONST.COLORS);
        }
    }
}
