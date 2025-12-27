import { w as writable } from "./index.js";
const defaultValue = "en";
const initialValue = defaultValue;
const language = writable(initialValue);
language.subscribe((value) => {
});
export {
  language as l
};
