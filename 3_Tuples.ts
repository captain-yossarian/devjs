export { }
{
    const tuple = <
        Fst extends number,
        Scd extends number
    >(fst: Fst, scd: Scd): [Fst, Scd] => [fst, scd]

    const result = tuple(4, 2)
}


const tuple = <
    Fst extends number,
    Scd extends number,
    Tuple extends [Fst, Scd]
>(...params: Tuple) => params

const result0 = tuple(4, 2)


const fst = <
    Fst extends number,
    Scd extends number,
    Tuple extends [Fst, Scd]
>([fst, _]: Tuple): Tuple[0] => fst

const result1 = fst(tuple(4, 2)) // 4
