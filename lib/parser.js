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
export function generateHTML (json) {
  const e = new Editor({
    extensions: [
      Image,
      Document,
      Paragraph,
      Text,
      Link
    ],
    content: json
  })
  console.log('e.getHTML(): ', e.getHTML());
  return e.getHTML()
}
