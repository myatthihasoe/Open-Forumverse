const ROUTES = {
  HOME: "/",
  POPULAR: "/popular",
  TAGS: "/tags",
  TAG_DETAILS: (id: string) => "/tags/" + id,
  POSTS: "/posts",
  NEWS: "/news",
  TECH_NEWS: "/tech-news",
  DISCUSSION: "/discussion",
  DISCUSSION_CREATE: "/discussion/create",
  DISCUSSION_DETAIL: (id: string) => "/discussion/" + id,
  COMMUNITY: "/community",
  BOOKMARKS: "/bookmarks",
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  PROFILE: (id: string) => "/profile/" + id,
};

export default ROUTES;
