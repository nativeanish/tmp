import check_user from "./action/read/check_user";
import check_username from "./action/read/check_username";
import { Action, State, _return } from "./action/types";
import register from "./action/write/register";

declare const ContractError: new (arg0: string) => any;
export async function handle(action: Action, state: State): Promise<_return> {
  try {
    switch (action.input.function) {
      case "register":
        return await register(action, state);
      case "check_user":
        return await check_user(action, state);
      case "check_username":
        return await check_username(action, state);
      default:
        throw new ContractError("ERROR_INVALID_FUNCTION_SUPPLIED");
    }
  } catch (error) {
    throw new ContractError("Something Went Wrong");
  }
}
