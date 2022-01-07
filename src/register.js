const { webHookDotSiteGetToken } = require("./webHookSiteCommands");

const register = (Cypress) => {
  let commands = ["webHookDotSiteGetToken", "webhookGetResponses"];
  Cypress.Commands.add("webHookDotSiteGetToken", webHookDotSiteGetToken());
};

module.exports = {
  register,
};
