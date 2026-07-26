/**
 * @alwatr/loom — page contract.
 *
 * A page is a route: an explicit `permalink` plus a `render` thunk that returns
 * the JSX tree. Routing is driven entirely by the exported `permalink`, never by
 * the file name. A module may default-export a single page or an array of pages.
 */
import type { Child } from "./jsx-runtime.js";

export interface Page {
  /** Output route, e.g. `'/'`, `'/about/'`, or `'/feed.xml'`. */
  permalink: string;
  /** Returns the page's JSX tree. Invoked once at build time. */
  render: () => Child;
}

/** Identity helper that gives a page literal its `Page` type and editor support. */
export const definePage = (page: Page): Page => page;

/**
 * Map a data list to one page per item — the typed replacement for pagination.
 *
 * @example
 * export default collection(courses, (course) => ({
 *   permalink: `/course/${course.key}/`,
 *   render: () => <CoursePage course={course} />,
 * }));
 */
export const collection = <T>(items: readonly T[], map: (item: T, index: number) => Page): Page[] => items.map(map);
