import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

const CustomExtension = Extension.create({
  name: 'imagePaste',
  addProseMirrorPlugins () {
    return [
      new Plugin({
        key: new PluginKey('imagePaste'),
        props: {
          handleDOMEvents: {
            paste (view, event) {
              let hasFiles=false;
              let reader=new FileReader();
              //注册加载文件完毕事件
              reader.onload = (event) => {
                //获取object url
                let imageUrl=event.target.result;
                //插入到编辑器中
                const node = view.state.schema.nodes.image.create({src: imageUrl});
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
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
              let reader=new FileReader();
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