module Unions =
    type Shape =
        | Rectangle of width: float * length: float
        | Circle of radius: float
        | Prism of width: float * float * height: float

    let rect = Rectangle(length = 1.3, width = 10.0)
    let circ = Circle(1.0)
    let prism = Prism(5., 2.0, height = 3.0)
