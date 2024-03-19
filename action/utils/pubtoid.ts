import { State } from "../types";

declare const ContractAssert: (condition: boolean, message: string) => void;
declare const ContractError: new (arg0: string) => any;
/**
 * Retrieves the address associated with a given public key from the state object.
 *
 * @param {string} pubkey - The public key to look up the address for.
 * @param {State} state - The current state object containing molecule endpoints.
 * @return {string} The address associated with the provided public key.
 */
async function _ownerToAddress(pubkey: string, state: State) {
  try {
    //@ts-ignore
    const req = await EXM.deterministicFetch(
      `${state.molecule_endpoints.ar}/${pubkey}`
    );
    const address: string = req.asJSON()?.address;
    _validateArweaveAddress(address);
    return address;
  } catch (error) {
    throw new ContractError("ERROR_MOLECULE_SERVER_ERROR");
  }
}
function _validateArweaveAddress(address: string) {
  ContractAssert(
    /[a-z0-9_-]{43}/i.test(address),
    "ERROR_INVALID_ARWEAVE_ADDRESS"
  );
}

export default _ownerToAddress;
