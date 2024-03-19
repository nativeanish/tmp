import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;

/**
 * Like an article based on the provided action input and state.
 *
 * @param {State} state - the current state of the application
 * @param {Action} action - the action triggering the like operation
 * @return {Promise<_s_returns>} Returns a promise with the updated state after liking the article
 */
export default async function like_article(
  state: State,
  action: Action
): Promise<_s_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      if (action.input.id && action.input.id.length > 0) {
        const _article = state.articles.filter((e) => e.id === action.input.id);
        if (_article.length) {
          const __check = _article[0].like.filter((e) => e.address === address);
          if (__check.length) {
            return { state: state };
          } else {
            state.articles
              .filter((e) => e.id === action.input.id)[0]
              .like.push({ address: address });
            return { state: state };
          }
        } else {
          throw new ContractError("Article is not present");
        }
      } else {
        throw new ContractError("Article id is missing");
      }
    } else {
      throw new ContractError("User is not Registered");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
