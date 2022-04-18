import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { TIP_EDITOR_ID } from './editor.jsx'

function findParentEditor (ele) {
  if (ele.id === TIP_EDITOR_ID) {
    return ele
  }
  return findParentEditor(ele.parentNode)
}

const CustomExtension = Extension.create({
  name: 'imagePaste',
  addProseMirrorPlugins () {
    return [
      new Plugin({
        key: new PluginKey('imagePaste'),
        props: {
          handleKeyDown (view, event) {
            console.log('event: ', event.key, event.shiftKey);
            if (event.key === 'Enter') {
              if (event.shiftKey) {
                //插入到编辑器中，shift + 回车 换行
                const transaction = view.state.tr.insertText('\n')
                view.dispatch(transaction);
              }
              return true
            }
            return false
          },
          handleDOMEvents: {
            paste (view, event) {
              let hasFiles = false;
              let reader = new FileReader();
              //注册加载文件完毕事件
              reader.onload = (readerEvent) => {
                //获取object url
                let imageUrl = readerEvent.target.result;

                const img = new Image
                img.src = imageUrl;
                img.onload = () => {
                  const editor = findParentEditor(event.target)
                  let title = ''
                  if (img.width > editor.offsetWidth) {
                    title = '100p'
                  }


                  //插入到编辑器中
                  const node = view.state.schema.nodes.image.create({
                    src: imageUrl,
                    title
                  });
                  const transaction = view.state.tr.replaceSelectionWith(node);
                  view.dispatch(transaction);
                }
              };
              //从剪贴板中读取图片文件
              Array.from(event.clipboardData.files)
                .filter(item =>item.type.startsWith("image"))//提取图片文件
                .forEach(item => {//读取数据
                    reader.readAsDataURL(item);
                    hasFiles=true;
                });
              //扫尾
              if(hasFiles) {
                event.preventDefault();
                return true;
              }
            },
            dragover (view, e) {
              e.preventDefault()
              e.dataTransfer.dropEffect = 'copy'      
            },
            drop (view, event) {
              event.preventDefault()
              let reader = new FileReader();
              reader.onload = (event) => {
                let imageUrl=event.target.result;
                
                const node = view.state.schema.nodes.image.create({src: imageUrl});
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              };
              Array.from(event.dataTransfer.files)
              .filter(item =>item.type.startsWith("image"))
              .forEach(item => {
                  reader.readAsDataURL(item);
              })
            }
          }
        }
      })
    ]
  }
})

export default CustomExtension
