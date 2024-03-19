import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;

/**
 * Registers articles in the state based on the provided action.
 *
 * @param {State} state - The current state of the system.
 * @param {Action} action - The action to be performed.
 * @return {Promise<_s_returns>} The updated state after registering the articles.
 */
export default async function register_articles(
  state: State,
  action: Action
): Promise<_s_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      if (
        action.input.id &&
        action.input.title &&
        action.input.udl &&
        action.input.id.length > 0 &&
        action.input.title.length > 0 &&
        action.input.udl.length > 0
      ) {
        const _check = state.articles.filter((e) => e.id === action.input.id);
        if (!_check.length) {
          state.articles.push({
            id: action.input.id,
            title: action.input.title,
            udl: action.input.udl,
            //@ts-ignore
            created_at: String(EXM.getDate().getTime()),
            owner: [{ address: address }],
            comment: [],
            like: [],
            tag:
              action.input.tags && action.input.tags.length
                ? action.input.tags
                : [],
          });
          state.user[address].articles.push(action.input.id);
          return { state };
        } else {
          throw new ContractError("Id is already taken");
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
