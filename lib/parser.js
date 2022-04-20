import { Editor } from '@tiptap/core'
import { plugins } from './editor'
/**
 * @param {{
 *   "type": "string",
 *   "content": Array<{
 *     "type": "paragraph" | "image",
 *     "content": Array<{
 *       "type": "text", "marks": Array<{ "type": "link", "attrs": { "href": string, "target": "_blank"}}>
 *     }>
 *   }>
 * }}
 */
const e = new Editor({
  extensions: plugins(),
  content: ''
})
export function generateHTML (json) {
  e.commands.setContent(json)
  return `<div class="axii-message">${e.getHTML()}</div>`
}
