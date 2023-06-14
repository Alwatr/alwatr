export const capitalize = <T extends string>(str: T): Capitalize<T> => {
  return (str[0].toUpperCase() + str.substring(1).toLowerCase()) as Capitalize<T>;
};
