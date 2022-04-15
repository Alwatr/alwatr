// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export type Constructor<ClassType = {}> = new (...args: any[]) => ClassType;
