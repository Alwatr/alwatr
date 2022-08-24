// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<ClassType = Record<string, unknown>> = new (...args: any[]) => ClassType;
