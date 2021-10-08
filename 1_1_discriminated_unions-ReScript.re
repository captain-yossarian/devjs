
module Text = {
  type t = {text: string};
};

type t;

type case =
  | Doc(array<t>)
  | Text(Text.t)
  | Paragraph(array<t>)
  | Unknown(t);

let classify = (v: t): case =>
  switch v->getType {
  | "doc" => Doc(v->getContent)
  | "text" => Text(v->Obj.magic)
  | "paragraph" => Paragraph(v->getContent)
  | "unknown"
  | _ => Unknown(v)
  };
  
// Compiled code  
/* function classify(v) {
  var match = getType(v);
  switch (match) {
    case "doc" :
        return {
                TAG: /* Doc */0,
                _0: getContent(v)
              };
    case "paragraph" :
        return {
                TAG: /* Paragraph */2,
                _0: getContent(v)
              };
    case "text" :
        return {
                TAG: /* Text */1,
                _0: v
              };
    case "unknown" :
        return {
                TAG: /* Unknown */3,
                _0: v
              };
    default:
      return {
              TAG: /* Unknown */3,
              _0: v
            };
  }
} */