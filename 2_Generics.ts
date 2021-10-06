type Json =
    | null
    | string
    | number
    | boolean
    | Array<JSON>
    | {
        [prop: string]: Json
    }
{
    const foo = <T,>(a: T) => a

    // const foo: <42>(a: 42) => 42
    foo(42)
}

{
    const foo = <T,>(a: T) => a

    // const foo: <{ a: number; }> (a: { a: number; }) => { a: number; }
    foo({ a: 42 })

    foo({ a: 42 } as const)
}

{
    const foo = <Value, T extends { a: Value }>(a: T) => a

    // const foo: <{ a: number; }> (a: { a: number; }) => { a: number; }
    foo({ a: 42 })
}


{
    const foo = <Value extends number, T extends { a: Value }>(a: T) => a

    // const foo: <{ a: 42; }> (a: { a: 42; }) => { a:42; }
    foo({ a: 42 })
}

{
    const foo = <
        Key extends PropertyKey,
        Value extends number | string,
        T extends Record<Key, Value>
    >(a: T) => a


    // const foo: <PropertyKey, string | number, { a: 42; b: "hello";}> 
    foo({ a: 42, b: 'hello' })
}

{


    const foo = <
        Key extends PropertyKey,
        Value extends Json,
        T extends Record<Key, Value>
    >(a: T) => a

    // const foo: <PropertyKey, Json, { a: 42; b: "hello"; }
    foo({ a: 42, b: 'hello' })
}

// Why do we even need to infer literal types ?
{
    const foo = <
        V extends number,
        A extends { a: V }[]
    >(a: [...A]) => a

    foo([{ a: 1 }, { a: 42 }])
}

// Structural recursive
{
    type Reduce<Tuple extends Array<{ tag: any }>, Cache extends any[] = []> =
        Tuple extends []
        ? Cache
        : Tuple extends [infer Head, ...infer Tail]
        ? Tail extends Array<{ tag: any }>
        ? Head extends { tag: any }
        ? Reduce<Tail, [...Cache, Head['tag']]>
        : never
        : never
        : never

    const foo = <
        V extends number,
        Tuple extends { tag: V }[],
        >(a: [...Tuple]): Reduce<Tuple> => null as any

    const result = foo([{ tag: 1 }, { tag: 42 }]) // [1, 42]
}