import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
import username_to_address from "../utils/username_to_address";
declare const ContractError: new (arg0: string) => any;
/**
 * Function to handle the follow action.
 *
 * @param {State} state - the current state of the application
 * @param {Action} action - the action to be performed
 * @return {Promise<_s_returns>} Promise that resolves to the updated state
 */
export default async function follow(
  state: State,
  action: Action
): Promise<_s_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      if (action.input.username && action.input.username.length) {
        const _followers = await username_to_address(action, state);
        if (
          _followers.result.status &&
          typeof _followers.result.data === "string"
        ) {
          state.user[address].follower.push({
            address: _followers.result.data,
          });
          state.user[_followers.result.data].following.push({
            address: address,
          });
          return { state: state };
        } else {
          throw new ContractError("Followers don't exits");
        }
      } else {
        throw new ContractError("Id, Title or Udl is missing");
      }
    } else {
      throw new ContractError("User is not Registered");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
