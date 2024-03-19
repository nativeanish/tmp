import { Action, State, _s_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;
/**
 * Generate a like for a comment based on certain conditions.
 *
 * @param {State} state - the current state of the application
 * @param {Action} action - the action triggering the like
 * @return {Promise<_s_returns>} returns the updated state after like operation
 */
export default async function like_comment(
  state: State,
  action: Action
): Promise<_s_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      if (
        action.input.id &&
        action.input.id.length > 0 &&
        action.input.article_id &&
        action.input.article_id.length > 0
      ) {
        const _check = state.articles.filter(
          (e) => e.id === action.input.article_id
        );
        if (_check.length) {
          const _comment = _check[0].comment.filter(
            (e) => e.content === action.input.id
          );
          if (_comment.length) {
            const __check = _comment[0].like.filter(
              (e) => e.address === address
            );
            if (__check.length) {
              return { state: state };
            } else {
              state.articles
                .filter((e) => e.id === action.input.article_id)[0]
                .comment.filter((e) => e.content === action.input.id)[0]
                .like.push({ address: address });
              return { state: state };
            }
          } else {
            throw new ContractError("Comment is not present");
          }
        } else {
          throw new ContractError("Article not present");
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
