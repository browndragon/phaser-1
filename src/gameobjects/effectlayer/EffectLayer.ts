import { DIRTY_CONST } from '../DIRTY_CONST';
import { DrawTexturedQuad } from '../../renderer/webgl1/draw/DrawTexturedQuad';
import { Flush } from '../../renderer/webgl1/renderpass/Flush';
import { IEffectLayer } from './IEffectLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { PopFramebuffer } from '../../renderer/webgl1/renderpass/PopFramebuffer';
import { RenderLayer } from '../renderlayer/RenderLayer';

//  A WebGL specific EffectLayer
//  EffectLayerCanvas is a canvas alternative

export class EffectLayer extends RenderLayer implements IEffectLayer
{
    shaders: IShader[] = [];

    constructor (...shaders: IShader[])
    {
        super();

        if (Array.isArray(shaders))
        {
            this.shaders = shaders;
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const shaders = this.shaders;
        const texture = this.texture;

        Flush(renderPass);

        PopFramebuffer(renderPass);

        //  this.framebuffer contains a texture with all of this layers sprites drawn to it

        if (shaders.length === 0)
        {
            DrawTexturedQuad(renderPass, texture);
        }
        else
        {
            let prevTexture = texture;

            for (let i: number = 0; i < shaders.length; i++)
            {
                const shader = shaders[i];

                DrawTexturedQuad(renderPass, prevTexture, shader);

                prevTexture = shader.texture;
            }

            DrawTexturedQuad(renderPass, prevTexture);
        }

        this.clearDirty(DIRTY_CONST.TRANSFORM);
    }
}
