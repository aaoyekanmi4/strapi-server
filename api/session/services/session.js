"use strict";

/**
 * Read the documentation (https:strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async findByUnit(params) {
    const rawBuilder = strapi.connections.default.raw(`
    SELECT
      session_name,
      unit_id,
      activities AS session_activities
    FROM sessions
    JOIN activities ON activities.session_id = sessions.id
    WHERE sessions.unit_id =${params}
    ORDER BY sessions.session_name;`
    );
    const resp = await rawBuilder.then();
    return resp.rows;
  },
};
