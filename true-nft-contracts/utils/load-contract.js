const fs = require("fs");
const path = require("path");

// Function for load contracts from ton-labs-contracts submodule
function loadContract(relativePath) {
  function load(suffix) {
    return fs.readFileSync(
      path.resolve(
        __dirname,
        "../../ton-labs-contracts",
        `${relativePath}${suffix}`
      )
    );
  }

  return {
    abi: JSON.parse(load(".abi.json").toString()),
    tvc: load(".tvc").toString("base64"),
  };
}

module.exports = {
  loadContract,
};
