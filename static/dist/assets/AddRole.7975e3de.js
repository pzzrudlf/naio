import{y as R,k,p as E,a as V,o as x,s as y,v as n,x as t,e,D as I}from"./index.8b30d168.js";/* empty css                */import{E as T,b as A,c as B,a as O}from"./el-form-item.78367822.js";import"./el-input.55b498ca.js";import{u as S,S as U}from"./useDialog.8d08ce90.js";import{E as v,T as C}from"./baseEnum.d65d91be.js";function M(_,d,f,l){const{global:r}=R(),m=k(),a=E({id:"",name:"",remark:"",createUser:"",type:""}),c=E({name:[{required:!0,trigger:"change",message:"\u8BF7\u586B\u5199\u89D2\u8272\u540D\u79F0"}]});return{confirm:()=>{var o;(o=m.value)==null||o.validate(u=>{u&&(l("save",a),d())})},show:(o,u)=>{o==v.ADD?_.title=C.ADD:C.EDIT,f(),r.$resetForm(m.value,a),o==v.EDIT&&r.$objCopy(u,a),a.type=o},addRoleForm:m,addRoleModel:a,rules:c}}const H=V({name:"AddRole",emits:["save"],setup(_,{expose:d,emit:f}){const{dialog:l,onClose:r,onShow:m}=S(),{confirm:a,show:c,addRoleModel:s,rules:D,addRoleForm:o}=M(l,r,m,f);return d({show:c}),(u,i)=>{const h=I,g=T,w=A,b=B,F=O;return x(),y(U,{title:e(l).title,width:e(l).width,visible:e(l).visible,height:e(l).height,onOnClose:e(r),onOnConfirm:e(a)},{content:n(()=>[t(F,{model:e(s),ref_key:"addRoleForm",ref:o,rules:e(D),"label-width":"80px",inline:!1,size:"normal"},{default:n(()=>[t(b,{gutter:20},{default:n(()=>[t(w,{span:12,offset:0},{default:n(()=>[t(g,{prop:"name",label:"\u89D2\u8272\u540D\u79F0"},{default:n(()=>[t(h,{modelValue:e(s).name,"onUpdate:modelValue":i[0]||(i[0]=p=>e(s).name=p)},null,8,["modelValue"])]),_:1})]),_:1}),t(w,{span:12,offset:0},{default:n(()=>[t(g,{label:"\u89D2\u8272\u5907\u6CE8"},{default:n(()=>[t(h,{modelValue:e(s).remark,"onUpdate:modelValue":i[1]||(i[1]=p=>e(s).remark=p)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","width","visible","height","onOnClose","onOnConfirm"])}}});export{H as default};
