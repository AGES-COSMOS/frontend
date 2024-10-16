export const ROUTES = {
  FEED: () => '/',
  ABOUT_US: () => '/sobre-nos',
  PROJECT_LISTING: () => '/projetos',
  CREATE_PROJECTS: () => '/criar-projeto',
  CREATE_EVENTS: () => '/criar-evento',
  EVENT_LISTING: () => '/eventos',
  ABOUT_EVENT: (id: number | string) => `/about-event/${id}`,
};
