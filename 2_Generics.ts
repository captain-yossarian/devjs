type Json =
    | null
    | string
    | number
    | boolean
    | Array<JSON>
    | {
        [prop: string]: Json
    }

// Few words about contextual typing
{
    const foo = <T,>(a: T) => a

    // const foo: <42>(a: 42) => 42
    foo(42)
}

// infer argument
{
    const foo = <T,>(a: T) => a

    // const foo: <{ a: number; }> (a: { a: number; }) => { a: number; }
    foo({ a: 42 })

    foo({ a: 42 } as const)
}

// infer argument 2
{
    const foo = <Value, T extends { a: Value }>(a: T) => a

    // const foo: <{ a: number; }> (a: { a: number; }) => { a: number; }
    foo({ a: 42 })
}

// infer more precisely
{
    const foo = <Value extends number, T extends { a: Value }>(a: T) => a

    // const foo: <{ a: 42; }> (a: { a: 42; }) => { a:42; }
    foo({ a: 42 })
}

// infer precisely in generic way
{
    const foo = <
        Key extends PropertyKey,
        Value extends Json,
        T extends Record<Key, Value>
    >(a: T) => a

    // const foo: <PropertyKey, Json, { a: 42; b: "hello"; }
    foo({ a: 42, b: 'hello' })
}

/**
 * Wrong!
 */
{
    /**
     * 
     * Generic should always be binded with argument
     */
    function fn<Char extends string>(): Char {
        return "a"
    }

    const result = fn<'a' & { extraProp: 'hello' }>().extraProp // "hello"
}