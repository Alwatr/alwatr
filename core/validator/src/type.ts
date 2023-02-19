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
