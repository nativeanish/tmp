import { _q_returns, Action, State } from "../types";
declare const ContractError: new (arg0: string) => any;

export default async function get_user_by_address(
  state: State,
  action: Action
): Promise<_q_returns> {
  if (action.input.id && action.input.id.length) {
    const user = state.user[action.input.id];
    if (user !== undefined) {
      return { result: { status: 1, data: user } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("ID is missing");
  }
}
