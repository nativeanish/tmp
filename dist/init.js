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
    const result = state.user.filter((e) => e.id === address);
    if (result.length > 0) {
      return { result: { status: 1, data: result[0] } };
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
    const result = state.user.filter(
      (e) => e.username === action.input.username
    );
    if (result.length > 0) {
      return { result: { status: 1, data: result[0] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("Username is missing");
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
            state.user.push({
              id: address,
              name: action.input.name,
              username: action.input.username,
              img: { url: action.input.img_url, type: action.input.type },
              //@ts-ignore
              created_at: String(EXM.getDate().getTime()),
            });
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
      default:
        throw new ContractError("ERROR_INVALID_FUNCTION_SUPPLIED");
    }
  } catch (error) {
    throw new ContractError("Something Went Wrong");
  }
}
