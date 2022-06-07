var J=Object.defineProperty,Q=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var z=(a,n,o)=>n in a?J(a,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[n]=o,v=(a,n)=>{for(var o in n||(n={}))Z.call(n,o)&&z(a,o,n[o]);if(G)for(var o of G(n))ee.call(n,o)&&z(a,o,n[o]);return a},g=(a,n)=>Q(a,Y(n));import{b as S,at as D,ax as I,al as N,ak as C,ay as P,k as B,aa as ae,U as y,aj as oe,bM as le,a as E,u as V,o as _,c as h,g as R,a6 as F,bN as M,e,X as A,n as c,r as $,i as K,t as T,b5 as U,_ as w,q as L,h as se,aP as ne,bO as te,aw as re,l as ie,am as de,p as ue,W as pe,V as me,aA as be,w as ce,as as j}from"./index.8b30d168.js";const q=Symbol("radioGroupKey"),O=S({size:D,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),fe=S(g(v({},O),{modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean})),W={[I]:a=>N(a)||C(a)||P(a),change:a=>N(a)||C(a)||P(a)},X=(a,n)=>{const o=B(),s=ae(q,void 0),u=y(()=>!!s),b=y({get(){return u.value?s.modelValue:a.modelValue},set(d){u.value?s.changeEvent(d):n&&n(I,d),o.value.checked=a.modelValue===a.label}}),i=oe(y(()=>s==null?void 0:s.size)),p=le(y(()=>s==null?void 0:s.disabled)),t=B(!1),m=y(()=>p.value||u.value&&b.value!==a.label?-1:0);return{radioRef:o,isGroup:u,radioGroup:s,focus:t,size:i,disabled:p,tabIndex:m,modelValue:b}},ve=["value","name","disabled"],ge={name:"ElRadio"},ye=E(g(v({},ge),{props:fe,emits:W,setup(a,{emit:n}){const o=a,s=V("radio"),{radioRef:u,radioGroup:b,focus:i,size:p,disabled:t,modelValue:m}=X(o,n);function d(){L(()=>n("change",m.value))}return(l,r)=>{var f;return _(),h("label",{class:c([e(s).b(),e(s).is("disabled",e(t)),e(s).is("focus",e(i)),e(s).is("bordered",l.border),e(s).is("checked",e(m)===l.label),e(s).m(e(p))])},[R("span",{class:c([e(s).e("input"),e(s).is("disabled",e(t)),e(s).is("checked",e(m)===l.label)])},[F(R("input",{ref_key:"radioRef",ref:u,"onUpdate:modelValue":r[0]||(r[0]=k=>A(m)?m.value=k:null),class:c(e(s).e("original")),value:l.label,name:l.name||((f=e(b))==null?void 0:f.name),disabled:e(t),type:"radio",onFocus:r[1]||(r[1]=k=>i.value=!0),onBlur:r[2]||(r[2]=k=>i.value=!1),onChange:d},null,42,ve),[[M,e(m)]]),R("span",{class:c(e(s).e("inner"))},null,2)],2),R("span",{class:c(e(s).e("label")),onKeydown:r[3]||(r[3]=U(()=>{},["stop"]))},[$(l.$slots,"default",{},()=>[K(T(l.label),1)])],34)],2)}}}));var Re=w(ye,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Se=S(g(v({},O),{name:{type:String,default:""}})),ke=["value","name","disabled"],Be={name:"ElRadioButton"},Ie=E(g(v({},Be),{props:Se,setup(a){const n=a,o=V("radio"),{radioRef:s,focus:u,size:b,disabled:i,modelValue:p,radioGroup:t}=X(n),m=y(()=>({backgroundColor:(t==null?void 0:t.fill)||"",borderColor:(t==null?void 0:t.fill)||"",boxShadow:t!=null&&t.fill?`-1px 0 0 0 ${t.fill}`:"",color:(t==null?void 0:t.textColor)||""}));return(d,l)=>{var r;return _(),h("label",{class:c([e(o).b("button"),e(o).is("active",e(p)===d.label),e(o).is("disabled",e(i)),e(o).is("focus",e(u)),e(o).bm("button",e(b))])},[F(R("input",{ref_key:"radioRef",ref:s,"onUpdate:modelValue":l[0]||(l[0]=f=>A(p)?p.value=f:null),class:c(e(o).be("button","original-radio")),value:d.label,type:"radio",name:d.name||((r=e(t))==null?void 0:r.name),disabled:e(i),onFocus:l[1]||(l[1]=f=>u.value=!0),onBlur:l[2]||(l[2]=f=>u.value=!1)},null,42,ke),[[M,e(p)]]),R("span",{class:c(e(o).be("button","inner")),style:se(e(p)===d.label?e(m):{}),onKeydown:l[3]||(l[3]=U(()=>{},["stop"]))},[$(d.$slots,"default",{},()=>[K(T(d.label),1)])],38)],2)}}}));var x=w(Ie,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const Ee=S({id:{type:String,default:void 0},size:D,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0}}),Ve=W,_e=["id","aria-label","aria-labelledby"],he={name:"ElRadioGroup"},$e=E(g(v({},he),{props:Ee,emits:Ve,setup(a,{emit:n}){const o=a,s=V("radio"),u=ne(),b=B(),{formItem:i}=te(),{inputId:p,isLabeledByFormItem:t}=re(o,{formItemContext:i}),m=l=>{n(I,l),L(()=>n("change",l))};ie(()=>{const l=b.value.querySelectorAll("[type=radio]"),r=l[0];!Array.from(l).some(f=>f.checked)&&r&&(r.tabIndex=0)});const d=y(()=>o.name||u.value);return de(q,ue(g(v({},pe(o)),{changeEvent:m,name:d}))),me(()=>o.modelValue,()=>i==null?void 0:i.validate("change").catch(l=>be())),(l,r)=>(_(),h("div",{id:e(p),ref_key:"radioGroupRef",ref:b,class:c(e(s).b("group")),role:"radiogroup","aria-label":e(t)?void 0:l.label||"radio-group","aria-labelledby":e(t)?e(i).labelId:void 0},[$(l.$slots,"default")],10,_e))}}));var H=w($e,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const ze=ce(Re,{RadioButton:x,RadioGroup:H}),Ne=j(H);j(x);export{ze as E,Ne as a};
