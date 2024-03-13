import { Action, State, _q_returns, _return } from "../types";
declare const ContractError: new (arg0: string) => any;
export default async function check_username(
  action: Action,
  state: State
): Promise<_q_returns> {
  if (action.input.username && action.input.username.length > 0) {
    const result = state.user.filter(
      (e) => e.username === action.input.username
    );
    if (result.length > 0) {
      return { result: { status: 1, data: result[0] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("Username is missing");
  }
}
