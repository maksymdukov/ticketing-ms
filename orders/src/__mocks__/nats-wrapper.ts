export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation((subj: any, data: any, callback: any) => {
        callback();
      }),
  },
};
