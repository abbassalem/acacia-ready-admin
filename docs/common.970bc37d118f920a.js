"use strict";(self.webpackChunkacacia_ready_admin=self.webpackChunkacacia_ready_admin||[]).push([[592],{5685:(R,P,w)=>{w.d(P,{H:()=>x});var E=w(5620),C=w(5e3),r=(()=>{return(u=r||(r={}))[u.EntitiesOnly=0]="EntitiesOnly",u[u.Both=1]="Both",u[u.None=2]="None",r;var u})();function d(u){return function(l,y){const p={ids:[...y.ids],entities:Object.assign({},y.entities)},M=u(l,p);return M===r.Both?Object.assign({},y,p):M===r.EntitiesOnly?Object.assign(Object.assign({},y),{entities:p.entities}):y}}function g(u,a){const l=a(u);return(0,C.X6Q)()&&void 0===l&&console.warn("@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.","You should probably provide your own `selectId` implementation.","The entity that was passed:",u,"The `selectId` implementation:",a.toString()),l}function S(u){function a(o,t){const e=g(o,u);return e in t.entities?r.None:(t.ids.push(e),t.entities[e]=o,r.Both)}function l(o,t){let e=!1;for(const n of o)e=a(n,t)!==r.None||e;return e?r.Both:r.None}function p(o,t){const e=g(o,u);return e in t.entities?(t.entities[e]=o,r.EntitiesOnly):(t.ids.push(e),t.entities[e]=o,r.Both)}function b(o,t){const n=(o instanceof Array?o:t.ids.filter(i=>o(t.entities[i]))).filter(i=>i in t.entities).map(i=>delete t.entities[i]).length>0;return n&&(t.ids=t.ids.filter(i=>i in t.entities)),n?r.Both:r.None}function A(o,t){return _([o],t)}function _(o,t){const e={};return(o=o.filter(i=>i.id in t.entities)).length>0?o.filter(s=>function j(o,t,e){const i=Object.assign({},e.entities[t.id],t.changes),s=g(i,u),c=s!==t.id;return c&&(o[t.id]=s,delete e.entities[t.id]),e.entities[s]=i,c}(e,s,t)).length>0?(t.ids=t.ids.map(s=>e[s]||s),r.Both):r.EntitiesOnly:r.None}function v(o,t){const e=[],n=[];for(const c of o){const f=g(c,u);f in t.entities?n.push({id:f,changes:c}):e.push(c)}const i=_(n,t),s=l(e,t);switch(!0){case s===r.None&&i===r.None:return r.None;case s===r.Both||i===r.Both:return r.Both;default:return r.EntitiesOnly}}return{removeAll:function m(o){return Object.assign({},o,{ids:[],entities:{}})},addOne:d(a),addMany:d(l),setAll:d(function y(o,t){return t.ids=[],t.entities={},l(o,t),r.Both}),setOne:d(p),setMany:d(function M(o,t){const e=o.map(n=>p(n,t));switch(!0){case e.some(n=>n===r.Both):return r.Both;case e.some(n=>n===r.EntitiesOnly):return r.EntitiesOnly;default:return r.None}}),updateOne:d(A),updateMany:d(_),upsertOne:d(function k(o,t){return v([o],t)}),upsertMany:d(v),removeOne:d(function h(o,t){return b([o],t)}),removeMany:d(b),map:d(function N(o,t){return _(t.ids.reduce((i,s)=>{const c=o(t.entities[s]);return c!==t.entities[s]&&i.push({id:s,changes:c}),i},[]).filter(({id:i})=>i in t.entities),t)}),mapOne:d(function I({map:o,id:t},e){const n=e.entities[t];return n?A({id:t,changes:o(n)},e):r.None})}}function x(u={}){var a,l;const{selectId:y,sortComparer:p}={selectId:null!==(a=u.selectId)&&void 0!==a?a:m=>m.id,sortComparer:null!==(l=u.sortComparer)&&void 0!==l&&l},M=function T(){return{getInitialState:function u(a={}){return Object.assign({ids:[],entities:{}},a)}}}(),h=function U(){return{getSelectors:function u(a){const l=h=>h.ids,y=h=>h.entities,p=(0,E.P1)(l,y,(h,b)=>h.map(m=>b[m])),M=(0,E.P1)(l,h=>h.length);return a?{selectIds:(0,E.P1)(a,l),selectEntities:(0,E.P1)(a,y),selectAll:(0,E.P1)(a,p),selectTotal:(0,E.P1)(a,M)}:{selectIds:l,selectEntities:y,selectAll:p,selectTotal:M}}}}(),b=p?function F(u,a){const{removeOne:l,removeMany:y,removeAll:p}=S(u);function M(e,n){return h([e],n)}function h(e,n){const i=e.filter(s=>!(g(s,u)in n.entities));return 0===i.length?r.None:(t(i,n),r.Both)}function m(e,n){const i=g(e,u);return i in n.entities?(n.ids=n.ids.filter(s=>s!==i),t([e],n),r.Both):M(e,n)}function A(e,n){return N([e],n)}function N(e,n){const i=[],s=e.filter(c=>function _(e,n,i){if(!(n.id in i.entities))return!1;const c=Object.assign({},i.entities[n.id],n.changes),f=g(c,u);return delete i.entities[n.id],e.push(c),f!==n.id}(i,c,n)).length>0;if(0===i.length)return r.None;{const c=n.ids,f=[];return n.ids=n.ids.filter((O,B)=>O in n.entities||(f.push(B),!1)),t(i,n),!s&&f.every(O=>n.ids[O]===c[O])?r.EntitiesOnly:r.Both}}function o(e,n){const i=[],s=[];for(const O of e){const B=g(O,u);B in n.entities?s.push({id:B,changes:O}):i.push(O)}const c=N(s,n),f=h(i,n);switch(!0){case f===r.None&&c===r.None:return r.None;case f===r.Both||c===r.Both:return r.Both;default:return r.EntitiesOnly}}function t(e,n){e.sort(a);const i=[];let s=0,c=0;for(;s<e.length&&c<n.ids.length;){const f=e[s],O=g(f,u),B=n.ids[c];a(f,n.entities[B])<=0?(i.push(O),s++):(i.push(B),c++)}n.ids=i.concat(s<e.length?e.slice(s).map(u):n.ids.slice(c)),e.forEach((f,O)=>{n.entities[u(f)]=f})}return{removeOne:l,removeMany:y,removeAll:p,addOne:d(M),updateOne:d(A),upsertOne:d(function v(e,n){return o([e],n)}),setAll:d(function b(e,n){return n.entities={},n.ids=[],h(e,n),r.Both}),setOne:d(m),setMany:d(function j(e,n){const i=e.map(s=>m(s,n));switch(!0){case i.some(s=>s===r.Both):return r.Both;case i.some(s=>s===r.EntitiesOnly):return r.EntitiesOnly;default:return r.None}}),addMany:d(h),updateMany:d(N),upsertMany:d(o),map:d(function I(e,n){return N(n.ids.reduce((s,c)=>{const f=e(n.entities[c]);return f!==n.entities[c]&&s.push({id:c,changes:f}),s},[]),n)}),mapOne:d(function k({map:e,id:n},i){const s=i.entities[n];return s?A({id:n,changes:e(s)},i):r.None})}}(y,p):S(y);return Object.assign(Object.assign(Object.assign({selectId:y,sortComparer:p},M),h),b)}}}]);