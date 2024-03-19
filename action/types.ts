export interface User {
  name: string;
  username: string;
  img: { url: string; type: "svg" | "base64" };
  created_at: string;
  articles: Array<string>;
  follower: Array<{ address: string }>;
  following: Array<{ address: string }>;
}
export type _tags = Array<string>;
export interface State {
  user: { [address: string]: User };
  molecule_endpoints: { ar: "https://molecules-exm.herokuapp.com/ar-ota" };
  tags: _tags;
  articles: Array<Articles>;
}
export interface Comment {
  content: string;
  like: Array<{ address: string }>;
  created_at: string;
  owner: Array<{ address: string }>;
}
export interface Articles {
  title: string;
  id: string;
  like: Array<{ address: string }>;
  tag: _tags;
  created_at: string;
  udl: string;
  owner: Array<{ address: string }>;
  comment: Array<Comment>;
}
export interface Action {
  input: {
    function:
      | "register"
      | "check_user"
      | "check_username"
      | "register_tag"
      | "get_tag"
      | "register_article"
      | "like_article"
      | "register_comment"
      | "like_comment"
      | "follow"
      | "get_user"
      | "get_article"
      | "address_to_username"
      | "username_to_address"
      | "get_articles_recom"
      | "get_user_recom"
      | "get_article_by_id";
    pubKey: string;
    username: string;
    img_url: string;
    type: "svg" | "base64";
    name: string;
    tag: string;
    title: string;
    id: string;
    tags: Array<string>;
    udl: string;
    article_id: string;
    content: string;
  };
}
export type _return = _q_returns | _s_returns;
export type _s_returns = { state: State };
export type _q_returns = {
  result: {
    status: 0 | 1;
    data:
      | string
      | User
      | _tags
      | Articles
      | Array<User>
      | Array<Articles>
      | Array<{ address: string; User: User }>;
  };
};
declare const ContractError: new (arg0: string) => any;
