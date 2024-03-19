import { Action, State, _q_returns } from "../types";
import username_to_address from "../utils/username_to_address";
declare const ContractError: new (arg0: string) => any;

/**
 * Retrieves user information based on the provided username.
 *
 * @param {State} state - the current state of the system
 * @param {Action} action - the action triggering the user retrieval
 * @return {Promise<_q_returns>} an object containing the status and data of the user retrieval result
 */
export default async function get_user(
  state: State,
  action: Action
): Promise<_q_returns> {
  if (action.input.username && action.input.username.length) {
    const user = await username_to_address(action, state);
    if (user.result.status && typeof user.result.data === "string") {
      return { result: { status: 1, data: state.user[user.result.data] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("Username is missing");
  }
}
