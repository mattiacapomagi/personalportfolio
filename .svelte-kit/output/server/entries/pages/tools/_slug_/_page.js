import { g as getToolBySlug } from "../../../../chunks/tools.js";
import { error } from "@sveltejs/kit";
const ssr = false;
function load({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    throw error(404, "Tool not found");
  }
  return { tool };
}
export {
  load,
  ssr
};
