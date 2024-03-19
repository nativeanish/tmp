import { Action, State, _q_returns } from "../types";
import _ownerToAddress from "./pubtoid";
declare const ContractError: new (arg0: string) => any;
/**
 * Generates the username based on the provided address.
 *
 * @param {State} state - the current state of the application
 * @param {Action} action - the action object containing input data
 * @return {Object} an object with status and username data
 */
export default async function address_to_username(
  state: State,
  action: Action
): Promise<_q_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      return { result: { status: 1, data: state.user[address].username } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
