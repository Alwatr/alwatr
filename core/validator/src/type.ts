export type JsonSchema = {
  [key: string]:
    | Array<JsonSchema>
    | JsonSchema
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | string
    | number
    | boolean
    | null;
};
