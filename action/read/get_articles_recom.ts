import { _q_returns, Action, State } from "../types";

/**
 * Asynchronous function to retrieve recommended articles based on the state and action provided.
 *
 * @param {State} state - the current state object
 * @param {Action} action - the action object
 * @return {Promise<_q_returns>} an object containing the result status and data
 */
export default async function get_articles_recom(
  state: State,
  action: Action
): Promise<_q_returns> {
  if (state.articles.length > 3) {
    return { result: { status: 1, data: state.articles.slice(0, 3) } };
  } else {
    return { result: { status: 1, data: state.articles } };
  }
}
