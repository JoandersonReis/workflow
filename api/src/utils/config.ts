export const config = {
  JWT: {
    admin: {
      access: {
        expires: '360d',
        secret: String(process.env.ADMIN_JWT_SECRET),
      },
    },
  },
};
