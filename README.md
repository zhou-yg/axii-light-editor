# axii-light-editor
a light editor support basic message type(text/image/link)


# Philosophy

this editor is different from normal rich text editor, just support simple input content

unrecommended:
- text format, like bold, italic, head title
- list
- program code
- any other markup

support message types

- text
- image
- link 
  - http web
  - [to do] video
  - [to do] file

attentions:
- user will input complex html by paste
  - handler: add paste listener to format user's clipboard content, just take Text and base64
- support two way transformation in data and html
  - handler: need to design two parser


# message data struct


```typescript

type IMessage = Array<{
  content: string;
  type: 'text' | 'link' | 'image'
}>

```
render IMessage to html:

> text -> <p>{content}</p>

> link -> <a href={content}>{content}</a>

> image -> <img src={content} />

