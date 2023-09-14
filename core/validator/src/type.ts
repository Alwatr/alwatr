export interface JsonSchema {
  [key: string]:
    | JsonSchema[]
    | JsonSchema
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | string
    | number
    | boolean
    | null;
}
