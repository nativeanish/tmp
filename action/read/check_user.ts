import { Action, State, _q_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;
export default async function check_user(
  action: Action,
  state: State
): Promise<_q_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    const result = state.user.filter((e) => e.id === address);
    if (result.length > 0) {
      return { result: { status: 1, data: result[0] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
