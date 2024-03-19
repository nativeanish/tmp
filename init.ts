import check_user from "./action/read/check_user";
import check_username from "./action/read/check_username";
import { register_tag } from "./action/write/register_tag";
import { Action, State, _return } from "./action/types";
import register from "./action/write/register";
import { get_tags } from "./action/read/get_tags";
import register_articles from "./action/write/register_article";
import like_article from "./action/write/like_article";
import register_comment from "./action/write/register_comment";
import like_comment from "./action/write/like_comment";
import follow from "./action/write/follow";
import get_user from "./action/read/get_user";
import get_article from "./action/read/get_article";
import address_to_username from "./action/utils/address_to_username";
import username_to_address from "./action/utils/username_to_address";
import get_articles_recom from "./action/read/get_articles_recom";
import get_user_recom from "./action/read/get_user_recom";
import get_article_by_id from "./action/read/get_article_by_id";
import get_user_by_address from "./action/read/get_user_by_address";

declare const ContractError: new (arg0: string) => any;
export async function handle(state: State, action: Action): Promise<_return> {
  try {
    switch (action.input.function) {
      case "register":
        return await register(action, state);
      case "check_user":
        return await check_user(action, state);
      case "check_username":
        return await check_username(action, state);
      case "register_tag":
        return await register_tag(state, action);
      case "get_tag":
        return await get_tags(state, action);
      case "register_article":
        return await register_articles(state, action);
      case "like_article":
        return await like_article(state, action);
      case "register_comment":
        return await register_comment(state, action);
      case "like_comment":
        return await like_comment(state, action);
      case "follow":
        return await follow(state, action);
      case "get_user":
        return await get_user(state, action);
      case "get_article":
        return await get_article(state, action);
      case "address_to_username":
        return await address_to_username(state, action);
      case "username_to_address":
        return await username_to_address(action, state);
      case "get_articles_recom":
        return await get_articles_recom(state, action);
      case "get_user_recom":
        return await get_user_recom(state, action);
      case "get_article_by_id":
        return await get_article_by_id(state, action);
      case "get_user_by_address":
        return await get_user_by_address(state, action);
      default:
        throw new ContractError("ERROR_INVALID_FUNCTION_SUPPLIED");
    }
  } catch (error) {
    throw new ContractError("Something Went Wrong");
  }
}
