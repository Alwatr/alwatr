export type JsonSchema = {
  [key: string]:
    | JsonSchema
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | string
    | number
    | boolean
    | null;
};

export type ValidType = {
  [key: string]: ValidType | string | number | boolean | null;
};
