const ROUTES = {
  HOME: "/",
  POPULAR: "/popular",
  PROFILE: "/profile",
  TAGS: "/tags",
  POSTS: "/posts",
  NEWS: "/news",
  DISCUSSION: "/discussion",
  DISCUSSION_CREATE: "/discussion/create",
  DISCUSSION_DETAIL: (id: string) => "/discussion/" + id,
  COMMUNITY: "/community",
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

export default ROUTES;
