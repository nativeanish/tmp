import { _q_returns, Action, State } from "../types";
declare const ContractError: new (arg0: string) => any;

export default async function get_article_by_id(
  state: State,
  action: Action
): Promise<_q_returns> {
  if (action.input.id && action.input.id.length > 0) {
    const _check = state.articles.filter((e) => e.id === action.input.id);
    if (_check.length) {
      return { result: { status: 1, data: _check[0] } };
    } else {
      return {
        result: { status: 0, data: "Article not found" },
      };
    }
  } else {
    throw new ContractError("id is missing");
  }
}
