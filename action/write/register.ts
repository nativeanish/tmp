import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
import check_username from "../read/check_username";
declare const ContractError: new (arg0: string) => any;
export default async function register(
  action: Action,
  state: State
): Promise<_s_returns> {
  if (action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (action.input.username.length > 0) {
      const _username = await check_username(action, state);
      if (_username.result.status === 0) {
        if (action.input.name.length > 0) {
          if (action.input.img_url.length > 0 && action.input.type.length > 0) {
            state.user.push({
              id: address,
              name: action.input.name,
              username: action.input.username,
              img: { url: action.input.img_url, type: action.input.type },
              //@ts-ignore
              created_at: String(EXM.getDate().getTime()),
            });
            return { state: state };
          } else {
            throw new ContractError("img_url or type is missing");
          }
        } else {
          throw new ContractError("Name is missing");
        }
      } else {
        throw new ContractError("Username is already taken");
      }
    } else {
      throw new ContractError("Username is missing");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
