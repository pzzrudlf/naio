import{y as q,k as U,p as w,a as T,o as E,c as x,x as e,v as l,e as u,s as D,f as B,F as R,i as y,D as S}from"./index.8b30d168.js";/* empty css                */import"./el-input.55b498ca.js";import{E as O,b as P,c as $,a as j}from"./el-form-item.78367822.js";/* empty css                       */import{E as z,a as G}from"./el-radio.2829d223.js";import{u as H,S as J}from"./useDialog.8d08ce90.js";import{E as N,T as v}from"./baseEnum.d65d91be.js";import K from"./MenuParent.2d3aa593.js";import"./el-tree.6dd90539.js";import"./el-checkbox.4c6020a8.js";function L(i,F,f,p){const{global:V}=q(),_=U(),r=w({id:"",editType:"",type:"",parentId:"",parentName:"",label:"",icon:"",name:"",path:"",url:"",code:"",orderNum:0}),C=w({type:[{required:!0,trigger:"change",message:"\u8BF7\u9009\u62E9\u83DC\u5355\u7C7B\u578B"}],parentName:[{required:!0,trigger:"change",message:"\u8BF7\u9009\u62E9\u4E0A\u7EA7\u83DC\u5355"}],label:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u83DC\u5355\u540D\u79F0"}],icon:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u83DC\u5355\u56FE\u6807"}],name:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u8DEF\u7531\u540D\u79F0"}],path:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u8DEF\u7531\u8DEF\u5F84"}],url:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u7EC4\u4EF6\u8DEF\u5F84"}],code:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u6743\u9650\u5B57\u6BB5"}]});return{confirm:()=>{var n;(n=_.value)==null||n.validate(c=>{c&&(p("save",r),f())})},show:(n,c)=>{n==N.ADD?i.title=v.ADD:i.title=v.EDIT,F(),V.$resetForm(_.value,r),n==N.EDIT&&V.$objCopy(c,r),r.editType=n},addMenuForm:_,addMenuModel:r,rules:C,select:n=>{console.log("\u7236\u7EC4\u4EF6\u53D6\u5230",n),r.parentId=n.id,r.parentName=n.name}}}function Q(){const i=U();return{parentRef:i,selectParent:()=>{var f;(f=i.value)==null||f.show()}}}const W=y("\u76EE\u5F55"),X=y("\u83DC\u5355"),Y=y("\u6309\u94AE"),pe=T({name:"AddMenu",emits:["save"],setup(i,{expose:F,emit:f}){const{dialog:p,onShow:V,onClose:_}=H(),{confirm:r,show:C,addMenuForm:h,addMenuModel:t,rules:k,select:n}=L(p,V,_,f);F({show:C});const{parentRef:c,selectParent:A}=Q();return(Z,o)=>{const b=z,I=G,d=O,s=P,g=$,m=S,M=j;return E(),x(R,null,[e(J,{title:u(p).title,width:u(p).width,height:u(p).height,visible:u(p).visible,onOnConfirm:u(r),onOnClose:u(_)},{content:l(()=>[e(M,{model:u(t),ref_key:"addMenuForm",ref:h,rules:u(k),"label-width":"80px",inline:!1,size:"normal"},{default:l(()=>[e(g,null,{default:l(()=>[e(s,{span:24,offset:0},{default:l(()=>[e(d,{prop:"type",label:"\u83DC\u5355\u7C7B\u578B"},{default:l(()=>[e(I,{modelValue:u(t).type,"onUpdate:modelValue":o[0]||(o[0]=a=>u(t).type=a)},{default:l(()=>[e(b,{label:"0"},{default:l(()=>[W]),_:1}),e(b,{label:"1"},{default:l(()=>[X]),_:1}),e(b,{label:"2"},{default:l(()=>[Y]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:l(()=>[e(s,{span:12,offset:0},{default:l(()=>[e(d,{prop:"parentName",label:"\u4E0A\u7EA7\u83DC\u5355"},{default:l(()=>[e(m,{type:"hidden",modelValue:u(t).parentId,"onUpdate:modelValue":o[1]||(o[1]=a=>u(t).parentId=a)},null,8,["modelValue"]),e(m,{onClick:u(A),readonly:"",modelValue:u(t).parentName,"onUpdate:modelValue":o[2]||(o[2]=a=>u(t).parentName=a)},null,8,["onClick","modelValue"])]),_:1})]),_:1}),e(s,{span:12,offset:0},{default:l(()=>[e(d,{prop:"label",label:"\u83DC\u5355\u540D\u79F0"},{default:l(()=>[e(m,{modelValue:u(t).label,"onUpdate:modelValue":o[3]||(o[3]=a=>u(t).label=a)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(g,null,{default:l(()=>[u(t).type!="2"?(E(),D(s,{key:0,span:12,offset:0},{default:l(()=>[e(d,{prop:"icon",label:"\u83DC\u5355\u56FE\u6807"},{default:l(()=>[e(m,{modelValue:u(t).icon,"onUpdate:modelValue":o[4]||(o[4]=a=>u(t).icon=a)},null,8,["modelValue"])]),_:1})]),_:1})):B("",!0),u(t).type=="1"?(E(),D(s,{key:1,span:12,offset:0},{default:l(()=>[e(d,{prop:"name",label:"\u8DEF\u7531\u540D\u79F0"},{default:l(()=>[e(m,{modelValue:u(t).name,"onUpdate:modelValue":o[5]||(o[5]=a=>u(t).name=a)},null,8,["modelValue"])]),_:1})]),_:1})):B("",!0)]),_:1}),e(g,null,{default:l(()=>[u(t).type=="1"?(E(),D(s,{key:0,span:12,offset:0},{default:l(()=>[e(d,{prop:"path",label:"\u8DEF\u7531\u5730\u5740"},{default:l(()=>[e(m,{modelValue:u(t).path,"onUpdate:modelValue":o[6]||(o[6]=a=>u(t).path=a)},null,8,["modelValue"])]),_:1})]),_:1})):B("",!0),u(t).type=="1"?(E(),D(s,{key:1,span:12,offset:0},{default:l(()=>[e(d,{prop:"url",label:"\u7EC4\u4EF6\u8DEF\u5F84"},{default:l(()=>[e(m,{modelValue:u(t).url,"onUpdate:modelValue":o[7]||(o[7]=a=>u(t).url=a)},null,8,["modelValue"])]),_:1})]),_:1})):B("",!0)]),_:1}),e(g,null,{default:l(()=>[e(s,{span:12,offset:0},{default:l(()=>[e(d,{prop:"code",label:"\u6743\u9650\u5B57\u6BB5"},{default:l(()=>[e(m,{modelValue:u(t).code,"onUpdate:modelValue":o[8]||(o[8]=a=>u(t).code=a)},null,8,["modelValue"])]),_:1})]),_:1}),e(s,{span:12,offset:0},{default:l(()=>[e(d,{label:"\u83DC\u5355\u5E8F\u53F7"},{default:l(()=>[e(m,{modelValue:u(t).orderNum,"onUpdate:modelValue":o[9]||(o[9]=a=>u(t).orderNum=a)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","width","height","visible","onOnConfirm","onOnClose"]),e(K,{ref_key:"parentRef",ref:c,onSelect:u(n)},null,8,["onSelect"])],64)}}});export{pe as default};