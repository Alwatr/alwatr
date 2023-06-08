import {StringifyableRecord} from '@alwatr/type';

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

export interface ValidatorConfig {
  validSchema: JsonSchema;
  additionalProperties: boolean;
  targetObject?: StringifyableRecord | null;
  path?: string,
}
