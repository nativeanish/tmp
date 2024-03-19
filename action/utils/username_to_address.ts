import { Action, State, _q_returns } from "../types";
declare const ContractError: new (arg0: string) => any;

/**
 * Converts a username to an address.
 *
 * @param {Action} action - The action object containing the input.
 * @param {State} state - The state object containing the user data.
 * @return {Promise<_q_returns>} A promise that resolves to the result of the conversion.
 */
export default async function username_to_address(
  action: Action,
  state: State
): Promise<_q_returns> {
  if (action.input.username && action.input.username.length) {
    for (const address in state.user) {
      if (state.user[address].username === action.input.username) {
        return { result: { status: 1, data: address } };
      }
    }
    return { result: { status: 0, data: "User is not register" } };
  } else {
    throw new ContractError("Username is missing");
  }
}
