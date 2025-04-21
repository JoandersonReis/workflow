export const config = {
  JWT: {
    admin: {
      access: {
        expires: '360d',
        secret: String(process.env.ADMIN_JWT_SECRET),
      },
    },
    company: {
      access: {
        expires: '360d',
        secret: String(process.env.COMPANY_JWT_SECRET),
      },
    },
  },
  PASSWORD: {
    min: 8,
    max: 16,
  },
};
