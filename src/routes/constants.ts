export const ROUTES = {
  FEED: () => '/',
  ABOUT_US: () => '/sobre-nos',
  PROJECT_LISTING: () => '/projetos',
  CREATE_PROJECTS: () => '/criar-projeto',
  ABOUT_PROJECTS: (id: number | string = ':id') => `/projetos/${id}`,
};
