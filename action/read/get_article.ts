import { Action, State, _q_returns } from "../types";
declare const ContractError: new (arg0: string) => any;

/**
 * Retrieves an article from the state based on the given title and article_id in the action input.
 *
 * @param {State} state - the current state of the application
 * @param {Action} action - the action containing input with title and article_id
 * @return {Promise<_q_returns>} an object with status and data based on the article retrieval outcome
 */
export default async function get_article(
  state: State,
  action: Action
): Promise<_q_returns> {
  if (action.input.title && action.input.title.length) {
    const articles = state.articles.filter(
      (e) => e.title === action.input.title
    );
    if (articles.length) {
      return { result: { status: 1, data: articles[0] } };
    } else {
      return { result: { status: 0, data: "article not found" } };
    }
  } else {
    throw new ContractError("title is missing");
  }
}
