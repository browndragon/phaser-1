export class Cubic
{
    static In (v: number): number
    {
        return v * v * v;
    }

    static Out (v: number): number
    {
        return --v * v * v + 1;
    }

    static InOut (v: number): number
    {
        if ((v *= 2) < 1)
        {
            return 0.5 * v * v * v;
        }
        else
        {
            return 0.5 * ((v -= 2) * v * v + 2);
        }
    }
}
