"use strict";

// action/utils/pubtoid.ts
async function _ownerToAddress(pubkey, state) {
  try {
    const req = await EXM.deterministicFetch(
      `${state.molecule_endpoints.ar}/${pubkey}`
    );
    const address = req.asJSON()?.address;
    _validateArweaveAddress(address);
    return address;
  } catch (error) {
    throw new ContractError("ERROR_MOLECULE_SERVER_ERROR");
  }
}
function _validateArweaveAddress(address) {
  ContractAssert(
    /[a-z0-9_-]{43}/i.test(address),
    "ERROR_INVALID_ARWEAVE_ADDRESS"
  );
}
var pubtoid_default = _ownerToAddress;

// action/read/check_user.ts
async function check_user(action, state) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      return { result: { status: 1, data: state.user[address] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}

// action/read/check_username.ts
async function check_username(action, state) {
  if (action.input.username && action.input.username.length > 0) {
    for (const address in state.user) {
      if (state.user[address].username === action.input.username) {
        return { result: { status: 1, data: state.user[address] } };
      }
    }
    return { result: { status: 0, data: "username is not register" } };
  } else {
    throw new ContractError("Username is missing");
  }
}

// action/write/register_tag.ts
async function register_tag(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      if (action.input.tag && action.input.tag.length > 0) {
        const re = state.tags.filter((e) => e === action.input.tag);
        if (re.length) {
          return { state };
        } else {
          state.tags.push(action.input.tag);
          return { state };
        }
      } else {
        throw new ContractError("Tag is not Present");
      }
    } else {
      throw new ContractError("User is not Registered");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}

// action/write/register.ts
async function register(action, state) {
  if (action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (action.input.username.length > 0) {
      const _username = await check_username(action, state);
      if (_username.result.status === 0) {
        if (action.input.name.length > 0) {
          if (action.input.img_url.length > 0 && action.input.type.length > 0) {
            state.user[address] = {
              name: action.input.name,
              username: action.input.username,
              img: { url: action.input.img_url, type: action.input.type },
              //@ts-ignore
              created_at: String(EXM.getDate().getTime()),
              articles: [],
              follower: [],
              following: [],
            };
            return { state };
          } else {
            throw new ContractError("img_url or type is missing");
          }
        } else {
          throw new ContractError("Name is missing");
        }
      } else {
        throw new ContractError("Username is already taken");
      }
    } else {
      throw new ContractError("Username is missing");
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}

// action/read/get_tags.ts
async function get_tags(state, __) {
  return { result: { status: 1, data: state.tags } };
}

// action/write/register_article.ts
async function register_articles(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      if (
        action.input.id &&
        action.input.title &&
        action.input.udl &&
        action.input.id.length > 0 &&
        action.input.title.length > 0 &&
        action.input.udl.length > 0
      ) {
        const _check = state.articles.filter((e) => e.id === action.input.id);
        if (!_check.length) {
          state.articles.push({
            id: action.input.id,
            title: action.input.title,
            udl: action.input.udl,
            //@ts-ignore
            created_at: String(EXM.getDate().getTime()),
            owner: [{ address }],
            comment: [],
            like: [],
            tag:
              action.input.tags && action.input.tags.length
                ? action.input.tags
                : [],
          });
          state.user[address].articles.push(action.input.id);
          return { state };
        } else {
          throw new ContractError("Id is already taken");
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

// action/write/like_article.ts
async function like_article(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      if (action.input.id && action.input.id.length > 0) {
        const _article = state.articles.filter((e) => e.id === action.input.id);
        if (_article.length) {
          const __check = _article[0].like.filter((e) => e.address === address);
          if (__check.length) {
            return { state };
          } else {
            state.articles
              .filter((e) => e.id === action.input.id)[0]
              .like.push({ address });
            return { state };
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

// action/write/register_comment.ts
async function register_comment(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      if (
        action.input.article_id &&
        action.input.content &&
        action.input.article_id.length > 0 &&
        action.input.content.length > 0
      ) {
        const _article = state.articles.filter(
          (e) => e.id === action.input.article_id
        );
        if (_article.length) {
          state.articles[state.articles.indexOf(_article[0])].comment.push({
            content: action.input.content,
            owner: [{ address }],
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

// action/write/like_comment.ts
async function like_comment(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
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
              return { state };
            } else {
              state.articles
                .filter((e) => e.id === action.input.article_id)[0]
                .comment.filter((e) => e.content === action.input.id)[0]
                .like.push({ address });
              return { state };
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

// action/utils/username_to_address.ts
async function username_to_address(action, state) {
  if (action.input.username && action.input.username.length) {
    for (const address in state.user) {
      if (state.user[address].username === action.input.username) {
        return { result: { status: 1, data: address } };
      }
    }
    return { result: { status: 0, data: "User is not register" } };
  } else {
    throw new ContractError("Username is missing");
  }
}

// action/write/follow.ts
async function follow(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      if (action.input.username && action.input.username.length) {
        const _followers = await username_to_address(action, state);
        if (
          _followers.result.status &&
          typeof _followers.result.data === "string"
        ) {
          state.user[address].follower.push({
            address: _followers.result.data,
          });
          state.user[_followers.result.data].following.push({
            address,
          });
          return { state };
        } else {
          throw new ContractError("Followers don't exits");
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

// action/read/get_user.ts
async function get_user(state, action) {
  if (action.input.username && action.input.username.length) {
    const user = await username_to_address(action, state);
    if (user.result.status && typeof user.result.data === "string") {
      return { result: { status: 1, data: state.user[user.result.data] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("Username is missing");
  }
}

// action/read/get_article.ts
async function get_article(state, action) {
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

// action/utils/address_to_username.ts
async function address_to_username(state, action) {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await pubtoid_default(action.input.pubKey, state);
    if (state.user[address] !== void 0) {
      return { result: { status: 1, data: state.user[address].username } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}

// action/read/get_articles_recom.ts
async function get_articles_recom(state, action) {
  if (state.articles.length > 3) {
    return { result: { status: 1, data: state.articles.slice(0, 3) } };
  } else {
    return { result: { status: 1, data: state.articles } };
  }
}

// action/read/get_user_recom.ts
async function get_user_recom(state, action) {
  const user = [];
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

// action/read/get_article_by_id.ts
async function get_article_by_id(state, action) {
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

// action/read/get_user_by_address.ts
async function get_user_by_address(state, action) {
  if (action.input.id && action.input.id.length) {
    const user = state.user[action.input.id];
    if (user !== void 0) {
      return { result: { status: 1, data: user } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("ID is missing");
  }
}

// init.ts
export async function handle(state, action) {
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
