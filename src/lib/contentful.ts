import * as contentful from "contentful";
import type { EntryFieldTypes } from "contentful";

export interface Project {
  contentTypeId: "project",
  fields: {
    projectTitle: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
}
}

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});