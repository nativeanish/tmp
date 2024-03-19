import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;

/**
 * Registers a comment in the state.
 *
 * @param {State} state - The current state of the application.
 * @param {Action} action - The action object containing the input data.
 * @return {Promise<_s_returns>} The updated state after registering the comment.
 */
export default async function register_comment(
  state: State,
  action: Action
): Promise<_s_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      if (
        action.input.article_id &&
        action.input.id &&
        action.input.article_id.length > 0 &&
        action.input.id.length > 0
      ) {
        const _article = state.articles.filter((e) => e.id === action.input.id);
        if (_article.length) {
          state.articles
            .filter((e) => e.id === action.input.article_id)[0]
            .comment.push({
              id: action.input.id,
              owner: [{ address: address }],
              like: [],
              //@ts-ignore
              created_at: String(EXM.getDate().getTime()),
            });
          return { state };
        } else {
          throw new ContractError("Article is not present");
        }
      } else {
        throw new ContractError("Comment Id or Article Id is missign");
      }
    } else {
      throw new ContractError("User is not Registered");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
