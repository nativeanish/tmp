import { State } from "../types";

declare const ContractAssert: (condition: boolean, message: string) => void;
declare const ContractError: new (arg0: string) => any;
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
