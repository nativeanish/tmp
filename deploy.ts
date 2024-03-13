import * as fs from "fs";
import axios from "axios";

const TESTNET_ENDPOINT = "https://mem-testnet.xyz/deploy";

async function deploy() {
  try {
    const sourceCode = fs.readFileSync(__dirname + "/dist/init.js", {
      encoding: "utf8",
    });
    const initState = fs.readFileSync(__dirname + "/dist/init.json", {
      encoding: "utf8",
    });
    const body = {
      src: sourceCode,
      state: initState,
    };

    const function_id = (await axios.post(TESTNET_ENDPOINT, body))?.data
      ?.function_id;
    console.log(function_id);
    fs.writeFileSync(__dirname + "/FUNCTION_ID", String(function_id));
    return function_id;
  } catch (error) {
    console.log(error);
  }
}
deploy().then(console.log).catch(console.log);
