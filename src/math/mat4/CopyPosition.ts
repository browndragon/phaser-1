import { IMatrix4 } from './IMatrix4';

export function CopyPosition (src: IMatrix4, dest: IMatrix4): IMatrix4
{
    const srcData = src.data;
    const destData = dest.data;

    destData[12] = srcData[12];
    destData[13] = srcData[13];
    destData[14] = srcData[14];

    dest.onChange(dest);

    return dest;
}
