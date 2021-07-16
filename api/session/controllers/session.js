'use strict';

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

//Not ideal, will replace with query/foreign key solution soon
module.exports = {
  findByUnit: async ctx => {
    // const id = ctx.params.id;
    const { id } = ctx.params;
    const sessions = await strapi.services.session.findByUnit(id)
    return sessions
  }
};
