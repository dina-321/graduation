export default {
  api: `/api/${process.env.API_VERSION || "v1"}`,

  images: {
    get: "/images/:filename",
  },

  user: {
    getById: "/users/:id",
    signin: "/users/signin",
    signup: "/users/signup",
    resetpassword: "/users/reset-password",
    showAllUser: "/users",
  },

  company: {
    signin: "/company/signin",
    signup: "/company/signup",
    showAll: "/companys",
    getById: "/companys/:id",
  },

  cv: {
    getAll: "/cvs",
    getById: "/cvs/:id",
    create: "/cvs",
    update: "/cvs/:id",
    delete: "/cvs/:id",
  },
  search: {
    companyName: "/search/:company_name",
    position: "/search/:job_position",
  },
};
