import { g as getProjectBySlug } from "../../../../chunks/projects.js";
import { error } from "@sveltejs/kit";
function load({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    throw error(404, "Project not found");
  }
  return { project };
}
export {
  load
};
