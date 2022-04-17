import { Editor } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

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
  extensions: [
    Image,
    Document,
    Paragraph,
    Text,
    Link
  ],
  content: ''
})
export function generateHTML (json) {
  e.commands.setContent(json)
  return e.getHTML()
}
