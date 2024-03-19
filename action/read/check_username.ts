import { Action, State, _q_returns, _return } from "../types";
declare const ContractError: new (arg0: string) => any;
/**
 * Check if the provided username exists in the user state.
 *
 * @param {Action} action - the action object containing input data
 * @param {State} state - the current state of the user
 * @return {Promise<_q_returns>} an object with the status and data based on username existence
 */
export default async function check_username(
  action: Action,
  state: State
): Promise<_q_returns> {
  if (action.input.username && action.input.username.length > 0) {
    for (const address in state.user) {
      if (state.user[address].username === action.input.username) {
        return { result: { status: 1, data: state.user[address] } };
      }
    }
    return { result: { status: 0, data: "username is not register" } };
  } else {
    throw new ContractError("Username is missing");
  }
}
