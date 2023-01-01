export type JsonSchema = {
  [key: string]: JsonSchema | StringConstructor | NumberConstructor | BooleanConstructor;
}

export type ValidType = {
  [key: string]: ValidType | string | number | boolean;
}
