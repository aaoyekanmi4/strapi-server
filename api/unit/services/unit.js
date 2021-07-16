'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find() {
    const rawBuilder = strapi.connections.default.raw(`
    SELECT u.*,
      (SELECT COUNT(*) AS session_count FROM sessions WHERE u.id = sessions.unit_id) 
    FROM units u
    ORDER BY unit_name;
    `);
    const resp = await rawBuilder.then();
    return resp.rows;
  },
};
