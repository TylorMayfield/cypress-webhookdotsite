const WebHookSiteCommands = require("./webHookSiteCommands");

const register = (Cypress) => {
  const webHookSiteCommands = new WebHookSiteCommands();
  WebHookSiteCommands.cypressCommands.forEach((commandName) => {
    Cypress.Commands.add(
      commandName,
      webHookSiteCommands[commandName].bind(webHookSiteCommands)
    );
  });
};

module.exports = {
  register,
};
