/**
 * Unions are not discriminated by the default in typescript because of structural type system 
 * Discriminated union also known as tagged unions
 * SHow f# example
 */
{
    /**
     * Unions
     */

    type A = 'a'
    type B = 'b'
    type Base = 'base'

    type VariantA = {
        a: A
        base: Base
    }

    type VariantB = {
        b: B,
        base: Base
    }

    const fn = (arg: VariantA | VariantB) => { }

    const b: B = 'b'
    const a: A = 'a'
    const base: Base = 'base'

    fn({ a, base }) // ok
    fn({ b, base }) // ok

    fn({ b, a, base })  // no error, but we might expect


}

{
    type A = 'a'
    type B = 'b'
    type Base = 'base'

    type VariantA = {
        tag: 'a',
        a: A,
        base: Base
    }
    type VariantB = {
        tag: 'b',
        b: B,
        base: Base
    } 


    const b: B = 'b'
    const a: A = 'a'

    const fn = <T extends VariantA | VariantB>(arg: T) => { }


    const base: Base = 'base'

    fn({ a, base, tag: 'a' }) // ok
    fn({ b, base, tag: 'b' }) // ok

    fn({ a, b, base })  // expected error, no tag

}

{
    // credits goes to https://stackoverflow.com/questions/65805600/type-union-not-checking-for-excess-properties#answer-65805753
    type UnionKeys<T> = T extends T ? keyof T : never;
    type StrictUnionHelper<T, TAll> =
        T extends any
        ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

    type StrictUnion<T> = StrictUnionHelper<T, T>

    type A = 'a'
    type B = 'b'
    type Base = 'base'

    type VariantA = {
        a: A,
        base: Base
    }

    type VariantB = {
        b: B,
        base: Base
    }

    type Result = StrictUnion<VariantA | VariantB>

    const fn = <T extends StrictUnion<VariantA | VariantB>>(arg: T) => { }

    const b: B = 'b'
    const a: A = 'a'
    const base: Base = 'base'

    fn({ a, base }) // ok
    fn({ b, base }) // ok

    fn({ a, b, base })  // error without any changes in the union

}

