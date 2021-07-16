"use strict";

/**
 * Read the documentation (https:strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(ctx) {
    const rawBuilder = strapi.connections.default.raw(`SELECT DISTINCT s.id,
     s.*,
      ARRAY((
         SELECT
             jsonb_build_object(
               'id', a.id,
               'activity_name', a.activity_name,
               'start_instruction', a.start_instruction,
               'end_instruction', a.end_instruction,
               'duration', a.duration,
                'guide', jsonb_build_object(
                  'guide_id', g.id,
                  'name', g.name,
                  'content', g.content,
                  'description',g.description
                ),
                'resource', jsonb_build_object(
                  'resource_id', r.id,
                  'resource_name', r.resource_name,
                  'link', r.link,
                  'img', r.img,
                  'resource_type', r.resource_type,
                  'description', r.description, 
                  'resource_details', r.resource_details
                )
              )
        FROM activities a
        JOIN resources r ON r.activity_id = a.id
        JOIN guides g ON g.activity_id = a.id
        WHERE a.session_id = s.id
       )) AS session_activities
 FROM sessions s
 JOIN activities a ON a.session_id = s.id
 WHERE s.unit_id =1
 ORDER BY s.session_name;`);
    const resp = await rawBuilder.then();
    return resp.rows;
  },
};
