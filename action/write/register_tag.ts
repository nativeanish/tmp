import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;
/**
 * Register a tag for a user if the user is registered and the tag is not already present.
 *
 * @param {State} state - the current state of the contract
 * @param {Action} action - the action triggering the function
 * @return {Promise<_s_returns>} the updated state after registering the tag
 */
export async function register_tag(
  state: State,
  action: Action
): Promise<_s_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      if (action.input.tag && action.input.tag.length > 0) {
        const re = state.tags.filter((e) => e === action.input.tag);
        if (re.length) {
          return { state };
        } else {
          state.tags.push(action.input.tag);
          return { state };
        }
      } else {
        throw new ContractError("Tag is not Present");
      }
    } else {
      throw new ContractError("User is not Registered");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
