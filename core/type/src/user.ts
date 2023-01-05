export type User = {
  id: string;
  identity: {
    phoneNumber: string;
    email?: string;
  };
};
