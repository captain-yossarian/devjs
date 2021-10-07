module ContextualTyping =
    let foo x = x * 2
    let bar y = [ y, y + 1 ]
    let baz z = z |> List.length

    let composition a b c = a >> b >> c

    let result = composition foo bar baz
