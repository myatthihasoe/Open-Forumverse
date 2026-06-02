const ROUTES = {
  HOME: "/",
  POPULAR: "/popular",
  TAGS: "/tags",
  POSTS: "/posts",
  NEWS: "/news",
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
