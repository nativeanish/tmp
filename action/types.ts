export interface User {
  id: string;
  name: string;
  username: string;
  img: { url: string; type: "svg" | "base64" };
  created_at: string;
}
export interface State {
  user: Array<User>;
  molecule_endpoints: { ar: "https://molecules-exm.herokuapp.com/ar-ota" };
}
export interface Action {
  input: {
    function: "register" | "check_user" | "check_username";
    pubKey: string;
    username: string;
    img_url: string;
    type: "svg" | "base64";
    name: string;
  };
}
export type _return = _q_returns | _s_returns;
export type _s_returns = { state: State };
export type _q_returns = { result: { status: 0 | 1; data: string | User } };
declare const ContractError: new (arg0: string) => any;
