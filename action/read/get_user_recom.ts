import { _q_returns, Action, State, User } from "../types";

/**
 * Asynchronous function to get user recommendations.
 *
 * @param {State} state - the state parameter
 * @param {Action} action - the action parameter
 * @return {Promise<_q_returns>} an object with the result status and user data
 */
export default async function get_user_recom(
  state: State,
  action: Action
): Promise<_q_returns> {
  const user: Array<{ address: string; User: User }> = [];
  const key = Object.keys(state.user).slice(0, 3);
  for (const _key of key) {
    user.push({ address: _key, User: state.user[_key] });
  }
  return {
    result: {
      status: 1,
      data: user,
    },
  };
}
