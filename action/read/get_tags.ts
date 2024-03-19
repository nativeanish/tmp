import { Action, State, _q_returns } from "../types";

/**
 * Retrieves the tags from the state.
 *
 * @param {State} state - The current state.
 * @param {Action} __ - Unused parameter.
 * @return {Promise<_q_returns>} The result object containing the status and data.
 */
export async function get_tags(state: State, __: Action): Promise<_q_returns> {
  return { result: { status: 1, data: state.tags } };
}
