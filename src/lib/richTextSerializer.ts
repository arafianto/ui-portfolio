import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Options } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

export function richTextToHtml(doc: any) {
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => `<strong class="font-semibold">${text}</strong>`,
      [MARKS.ITALIC]: (text) => `<em class="italic">${text}</em>`,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, next) =>
        `<h1 class="text-[1.2rem] md:text-2xl font-medium mt-6 md:mt-8 mb-2 md:mb-4 text-p0">${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node, next) =>
        `<h2 class="text-2xl md:text-xl font-semibold mt-5 mb-3">${next(node.content)}</h2>`,
      [BLOCKS.PARAGRAPH]: (node, next) =>
        `<p class="text-[0.8rem] md:text-[1rem] mb-4 md:mb-4 text-base leading-5 md:leading-6 text-bw6">${next(node.content)}</p>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul class="list-disc ml-6 mb-2 md:mb-4">${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) => `<ol class="list-decimal ml-6 mb-2">${next(node.content)}</ol>`,
      [BLOCKS.QUOTE]: (node, next) =>
        `<blockquote class="border-l-4 pl-4 italic text-bw5 mb-4">${next(node.content)}</blockquote>`,
      [INLINES.HYPERLINK]: (node, next) => {
        const href = node.data.uri;
        return `<a href="${href}" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">${next(
          node.content
        )}</a>`;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const url = node.data?.target?.fields?.file?.url;
        const alt = node.data?.target?.fields?.description || "";
        return url
          ? `<img src="https:${url}" alt="${alt}" class="my-6 md:my-12 w-full object-cover rounded-lg" />`
          : "";
      },
    },
  };

  return documentToHtmlString(doc, options);
}
