// TypeScript type system has strict functional approach
// can't mutate types
// allows recursion
// has tail recursion optimization

type User = {
    name: string;
}


type User1 = User & {
    name: number;
}

/**
 * How would you change the type of name property to number?
 */
type User2 = {
    [P in keyof User]: P extends 'name' ? number : User[P]
}

type User3 = Omit<User, 'name'> & { name: number }

/**
 * I purposely did not mention interfaces, because they are open to modifications
 */