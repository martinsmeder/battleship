(()=>{"use strict";var e={380:(e,t,r)=>{var o=r(555);const a=e=>{const t=document.querySelector(e);t.textContent="";for(let e=0;e<10;e+=1)for(let r=0;r<10;r+=1){const o=document.createElement("div");o.classList.add("square"),o.dataset.row=e,o.dataset.col=r,t.appendChild(o)}},n=(e,t)=>{document.querySelector(e).querySelectorAll(".square").forEach((e=>{t.forEach((t=>{e.addEventListener(t.eventType,t.handler)}))}))};var l=r(776);(()=>{const e=(0,l.Br)(),t=[{type:"carrier",length:5},{type:"battleship",length:4},{type:"destroyer",length:3},{type:"submarine",length:3},{type:"patrol boat",length:2}];let r=0,s=!0,c=!1;const i=()=>{c=!c},d=[{eventType:"mouseover",handler:e=>{if(s){const o=e.target,a=parseInt(o.dataset.row,10),n=parseInt(o.dataset.col,10),{length:l}=t[r];Array.from({length:l},((e,t)=>{const r=c?a+t:a,o=c?n:n+t;return{playerSquare:document.querySelector(`[data-row="${r}"][data-col="${o}"]`),initialSquare:document.querySelector(`.gameboard.initial [data-row="${r}"][data-col="${o}"]`)}})).forEach((({playerSquare:e,initialSquare:t})=>{e&&e.classList.add("hovered"),t&&t.classList.add("hovered")}))}}},{eventType:"mouseleave",handler:()=>{document.querySelectorAll(".gameboard .hovered").forEach((e=>{e.classList.remove("hovered")}))}},{eventType:"click",handler:a=>{if(s){const n=a.target,i=parseInt(n.dataset.row,10),d=parseInt(n.dataset.col,10),{length:u}=t[r],h=Array.from({length:u},((e,t)=>[c?i+t:i,c?d:d+t])),p=(0,l._V)(u);if(e.placeShip(p,h))if(n.classList.add("placed"),h.forEach((([e,t])=>{document.querySelector(`[data-row="${e}"][data-col="${t}"]`).classList.add("placed"),document.querySelector(`.gameboard.initial [data-row="${e}"][data-col="${t}"]`).classList.add("placed")})),r+=1,r===t.length)s=!1,setTimeout((()=>{o.U.toggleModal(document.querySelector(".modal.initial"),"hide"),console.log("Placed ships:"),e.getShips().forEach(((t,r)=>{console.log(`Ship ${r+1} - Length: ${t.length}`);const o=e.getShipCoordinates(t);console.log("Coordinates:",o)}))}),1e3);else{const e=t[r].type;document.querySelector(".ship-type").textContent=e}}}}];return{init:()=>{o.U.toggleModal(document.querySelector(".modal.endgame"),"hide"),a(".gameboard.initial"),a(".gameboard.player"),a(".gameboard.computer"),n(".gameboard.initial",d),document.querySelector("#rotateBtn").addEventListener("click",i)}}})().init()},776:(e,t,r)=>{r.d(t,{Br:()=>n,_V:()=>a});var o=r(555);const a=e=>{let t=0;return{length:e,hit:()=>{t+=1},isSunk:()=>t>=e,get hits(){return t}}},n=()=>{const e=10,t=Array.from({length:e},(()=>Array(e).fill(null))),r=[],a=[],n=()=>{const r=[];for(let o=0;o<e;o+=1)for(let a=0;a<e;a+=1){const e=t[o][a];null===e||!e.ship||r.includes(e.ship)||e.ship.isSunk()||r.push(e.ship)}return r};return{getGrid:()=>t,placeShip:(r,o)=>{const a=o.every((([t,r])=>t>=0&&t<e&&r>=0&&r<e)),n=o.some((([e,r])=>null!==t[e][r]));if(a&&!n){const e={ship:r,coordinates:o};return e.coordinates.forEach((([r,o])=>{t[r][o]=e})),!0}return!1},getShips:n,getShipCoordinates:r=>{const a=[];for(let n=0;n<e;n+=1)for(let l=0;l<e;l+=1){const e=t[n][l];e&&e.ship===r&&a.push(o.r.convertToAlphanumeric([n,l]))}return a},receiveAttack:e=>{const[n,l]=o.r.convertToIndices(e),s=t[n][l],c=s&&s.ship;c?c.hit():a.push(e),r.push(e)},getMissedAttacks:()=>a,getAttackedCoordinates:()=>r,allShipsSunk:()=>n().every((e=>e.isSunk()))}}},555:(e,t,r)=>{r.d(t,{U:()=>a,r:()=>o});const o=(()=>{const e=[];return{convertToIndices:e=>{const t=e.charCodeAt(0)-65;return[parseInt(e.slice(1),10)-1,t]},convertToAlphanumeric:([e,t])=>String.fromCharCode(t+65)+(e+1),getAllValidCoordinates:t=>{for(let r=0;r<t;r+=1)for(let a=0;a<t;a+=1){const t=o.convertToAlphanumeric([r,a]);e.push(t)}return e}}})(),a={toggleModal:(e,t)=>{const r=e,o="show"===t?"flex":"none";e.closest(".overlay").style.display=o,r.style.display=o}}}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(380),r(776)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkUsSUFBakJELEVBQ0gsT0FBT0EsRUFBYUUsUUFHckIsSUFBSUMsRUFBU04sRUFBeUJFLEdBQVksQ0FHakRHLFFBQVMsQ0FBQyxHQU9YLE9BSEFFLEVBQW9CTCxHQUFVSSxFQUFRQSxFQUFPRCxRQUFTSixHQUcvQ0ssRUFBT0QsT0FDZixDQ3JCQUosRUFBb0JPLEVBQUksQ0FBQ0gsRUFBU0ksS0FDakMsSUFBSSxJQUFJQyxLQUFPRCxFQUNYUixFQUFvQlUsRUFBRUYsRUFBWUMsS0FBU1QsRUFBb0JVLEVBQUVOLEVBQVNLLElBQzVFRSxPQUFPQyxlQUFlUixFQUFTSyxFQUFLLENBQUVJLFlBQVksRUFBTUMsSUFBS04sRUFBV0MsSUFFMUUsRUNORFQsRUFBb0JVLEVBQUksQ0FBQ0ssRUFBS0MsSUFBVUwsT0FBT00sVUFBVUMsZUFBZUMsS0FBS0osRUFBS0MsR0NFbEZoQixFQUFvQixLQUVNQSxFQUFvQixJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIG1vZHVsZSBjYW4gYmUgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBjb250ZW50IG9uIHRoZSBwYWdlLlxuLy8gSXQgY2FuIGluY2x1ZGUgZnVuY3Rpb25zIHRvIHVwZGF0ZSB0aGUgRE9NIGVsZW1lbnRzIHJlcHJlc2VudGluZyB0aGVcbi8vIGdhbWUgYm9hcmRzLCBzaGlwcywgYXR0YWNrcywgbWVzc2FnZXMsIGFuZCBvdGhlciBVSSBjb21wb25lbnRzLiBJdCBzaG91bGRcbi8vIGVuY2Fwc3VsYXRlIHRoZSBET00gbWFuaXB1bGF0aW9uIGNvZGUgYW5kIHByb3ZpZGUgYSBjbGVhbiBpbnRlcmZhY2UgZm9yXG4vLyB1cGRhdGluZyB0aGUgVUkgYmFzZWQgb24gdGhlIGdhbWUgc3RhdGUuIEl0IGNhbiBiZSB0aGUgYnJpZGdlIGJldHdlZW4gdGhlXG4vLyBnYW1lIGxvZ2ljIGFuZCB0aGUgYWN0dWFsIERPTSBtYW5pcHVsYXRpb24uXG5cbmNvbnN0IFJlbmRlcmVyID0gKCgpID0+IHtcbiAgY29uc3QgcmVuZGVyR2FtZWJvYXJkID0gKGNvbnRhaW5lckVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMTA7IGNvbCArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xuICAgICAgICBzcXVhcmUuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXR0YWNoRXZlbnRMaXN0ZW5lcnMgPSAoY29udGFpbmVyRWxlbWVudCwgZXZlbnRMaXN0ZW5lcnMpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIuZXZlbnRUeXBlLCBsaXN0ZW5lci5oYW5kbGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyR2FtZWJvYXJkLFxuICAgIGF0dGFjaEV2ZW50TGlzdGVuZXJzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyZXI7XG4iLCJpbXBvcnQgeyBBcHBIZWxwZXJzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IFNoaXBGYWN0b3J5LCBHYW1lYm9hcmRGYWN0b3J5IH0gZnJvbSBcIi4vZmFjdG9yaWVzXCI7XG5cbi8vIFRoaXMgbW9kdWxlIGNhbiBoYW5kbGUgdGhlIGdhbWUgbG9vcCBhbmQgY29vcmRpbmF0ZSB0aGUgb3ZlcmFsbCBmbG93IG9mXG4vLyB0aGUgZ2FtZS4gSXQgY2FuIGNyZWF0ZSBpbnN0YW5jZXMgb2YgcGxheWVycyBhbmQgZ2FtZWJvYXJkcywgbWFuYWdlIHR1cm5zLFxuLy8gYW5kIGRldGVybWluZSB3aGVuIHRoZSBnYW1lIGVuZHMuIEl0IHNob3VsZCBwcmltYXJpbHkgZm9jdXMgb24gdGhlIGdhbWVcbi8vIGxvZ2ljIGFuZCBvcmNoZXN0cmF0aW9uIHJhdGhlciB0aGFuIGRpcmVjdGx5IGludGVyYWN0aW5nIHdpdGggdGhlIERPTS5cblxuLy8gRXZlbnQgTGlzdGVuZXJzOiBZb3UgY2FuIGhhdmUgZXZlbnQgbGlzdGVuZXJzIGluIGEgc2VwYXJhdGUgbW9kdWxlIG9yXG4vLyBkaXJlY3RseSB3aXRoaW4gYXBwLmpzLCBkZXBlbmRpbmcgb24geW91ciBwcmVmZXJlbmNlIGFuZCB0aGUgY29tcGxleGl0eVxuLy8gb2YgdGhlIGludGVyYWN0aW9ucy4gSWYgeW91IGhhdmUgYSBsYXJnZSBudW1iZXIgb2YgZXZlbnQgbGlzdGVuZXJzIG9yXG4vLyBjb21wbGV4IGV2ZW50IGhhbmRsaW5nLCBpdCBtaWdodCBiZSBiZW5lZmljaWFsIHRvIHNlcGFyYXRlIHRoZW0gaW50byBhXG4vLyBkZWRpY2F0ZWQgbW9kdWxlIHRvIGtlZXAgdGhlIGNvZGUgb3JnYW5pemVkLiBUaGUgZXZlbnQgbGlzdGVuZXJzIHNob3VsZFxuLy8gY2FsbCBhcHByb3ByaWF0ZSBmdW5jdGlvbnMgaW4gYXBwLmpzIG9yIHJlbmRlci5qcyB0byB0cmlnZ2VyIHRoZVxuLy8gY29ycmVzcG9uZGluZyBhY3Rpb25zIGFuZCBVSSB1cGRhdGVzLlxuXG4vLyAxLiAtLS1cbi8vIDIuIC0tLVxuLy8gMy4gLS0tXG4vLyA0LiAtLS1cbi8vIDUuIC0tLVxuLy8gNi4gLS0tXG4vLyA3LiAtLS1cbi8vIDguIFJlZmFjdG9yIC8gY2xlYW4gdXAgY29kZSAtLT4gQWRkIGNvbW1lbnRzIC0tPiBOZXcgbGlzdFxuXG5jb25zdCBDb250cm9sbGVyID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkRmFjdG9yeSgpO1xuXG4gIGNvbnN0IHNoaXBUeXBlcyA9IFtcbiAgICB7IHR5cGU6IFwiY2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IHR5cGU6IFwiYmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IHR5cGU6IFwiZGVzdHJveWVyXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgdHlwZTogXCJzdWJtYXJpbmVcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyB0eXBlOiBcInBhdHJvbCBib2F0XCIsIGxlbmd0aDogMiB9LFxuICBdO1xuXG4gIGxldCBjdXJyZW50U2hpcEluZGV4ID0gMDtcbiAgbGV0IHNoaXBQbGFjZW1lbnRNb2RlID0gdHJ1ZTtcbiAgbGV0IGlzVmVydGljYWwgPSBmYWxzZTtcblxuICBjb25zdCBzaGlwUGxhY2VtZW50SGFuZGxlciA9IChlKSA9PiB7XG4gICAgaWYgKHNoaXBQbGFjZW1lbnRNb2RlKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHN0YXJ0Um93ID0gcGFyc2VJbnQoc3F1YXJlLmRhdGFzZXQucm93LCAxMCk7XG4gICAgICBjb25zdCBzdGFydENvbCA9IHBhcnNlSW50KHNxdWFyZS5kYXRhc2V0LmNvbCwgMTApO1xuICAgICAgY29uc3QgeyBsZW5ndGggfSA9IHNoaXBUeXBlc1tjdXJyZW50U2hpcEluZGV4XTtcblxuICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aCB9LCAoXywgaSkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBpc1ZlcnRpY2FsID8gc3RhcnRSb3cgKyBpIDogc3RhcnRSb3c7XG4gICAgICAgIGNvbnN0IGNvbCA9IGlzVmVydGljYWwgPyBzdGFydENvbCA6IHN0YXJ0Q29sICsgaTtcbiAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2hpcCA9IFNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICBjb25zdCBwbGFjZWQgPSBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIHNoaXBDb29yZGluYXRlcyk7XG5cbiAgICAgIGlmIChwbGFjZWQpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJwbGFjZWRcIik7XG4gICAgICAgIHNoaXBDb29yZGluYXRlcy5mb3JFYWNoKChbcm93LCBjb2xdKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGxhY2VkU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwbGFjZWRTcXVhcmUuY2xhc3NMaXN0LmFkZChcInBsYWNlZFwiKTtcbiAgICAgICAgICBjb25zdCBpbml0aWFsU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuZ2FtZWJvYXJkLmluaXRpYWwgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgaW5pdGlhbFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwicGxhY2VkXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjdXJyZW50U2hpcEluZGV4ICs9IDE7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTaGlwSW5kZXggPT09IHNoaXBUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICBzaGlwUGxhY2VtZW50TW9kZSA9IGZhbHNlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgQXBwSGVscGVycy50b2dnbGVNb2RhbChcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC5pbml0aWFsXCIpLFxuICAgICAgICAgICAgICBcImhpZGVcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxhY2VkIHNoaXBzOlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0gcGxheWVyR2FtZWJvYXJkLmdldFNoaXBzKCk7XG4gICAgICAgICAgICBzaGlwcy5mb3JFYWNoKChhZGRlZFNoaXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTaGlwICR7aW5kZXggKyAxfSAtIExlbmd0aDogJHthZGRlZFNoaXAubGVuZ3RofWApO1xuICAgICAgICAgICAgICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID1cbiAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuZ2V0U2hpcENvb3JkaW5hdGVzKGFkZGVkU2hpcCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcmRpbmF0ZXM6XCIsIHNoaXBzQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgbmV4dFNoaXBUeXBlID0gc2hpcFR5cGVzW2N1cnJlbnRTaGlwSW5kZXhdLnR5cGU7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLXR5cGVcIikudGV4dENvbnRlbnQgPSBuZXh0U2hpcFR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2FtZWJvYXJkSG92ZXJIYW5kbGVyID0gKGUpID0+IHtcbiAgICBpZiAoc2hpcFBsYWNlbWVudE1vZGUpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGUudGFyZ2V0O1xuICAgICAgY29uc3Qgc3RhcnRSb3cgPSBwYXJzZUludChzcXVhcmUuZGF0YXNldC5yb3csIDEwKTtcbiAgICAgIGNvbnN0IHN0YXJ0Q29sID0gcGFyc2VJbnQoc3F1YXJlLmRhdGFzZXQuY29sLCAxMCk7XG4gICAgICBjb25zdCB7IGxlbmd0aCB9ID0gc2hpcFR5cGVzW2N1cnJlbnRTaGlwSW5kZXhdO1xuXG4gICAgICBjb25zdCBob3ZlcmVkU3F1YXJlcyA9IEFycmF5LmZyb20oeyBsZW5ndGggfSwgKF8sIGkpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gaXNWZXJ0aWNhbCA/IHN0YXJ0Um93ICsgaSA6IHN0YXJ0Um93O1xuICAgICAgICBjb25zdCBjb2wgPSBpc1ZlcnRpY2FsID8gc3RhcnRDb2wgOiBzdGFydENvbCArIGk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGxheWVyU3F1YXJlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWBcbiAgICAgICAgICApLFxuICAgICAgICAgIGluaXRpYWxTcXVhcmU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgLmdhbWVib2FyZC5pbml0aWFsIFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWBcbiAgICAgICAgICApLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGhvdmVyZWRTcXVhcmVzLmZvckVhY2goKHsgcGxheWVyU3F1YXJlLCBpbml0aWFsU3F1YXJlIH0pID0+IHtcbiAgICAgICAgaWYgKHBsYXllclNxdWFyZSkge1xuICAgICAgICAgIHBsYXllclNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5pdGlhbFNxdWFyZSkge1xuICAgICAgICAgIGluaXRpYWxTcXVhcmUuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnYW1lYm9hcmRNb3VzZUxlYXZlSGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBob3ZlcmVkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZWJvYXJkIC5ob3ZlcmVkXCIpO1xuICAgIGhvdmVyZWRTcXVhcmVzLmZvckVhY2goKGhvdmVyZWRTcXVhcmUpID0+IHtcbiAgICAgIGhvdmVyZWRTcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgcm90YXRlU2hpcHMgPSAoKSA9PiB7XG4gICAgaXNWZXJ0aWNhbCA9ICFpc1ZlcnRpY2FsO1xuICB9O1xuXG4gIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW1xuICAgIHsgZXZlbnRUeXBlOiBcIm1vdXNlb3ZlclwiLCBoYW5kbGVyOiBnYW1lYm9hcmRIb3ZlckhhbmRsZXIgfSxcbiAgICB7IGV2ZW50VHlwZTogXCJtb3VzZWxlYXZlXCIsIGhhbmRsZXI6IGdhbWVib2FyZE1vdXNlTGVhdmVIYW5kbGVyIH0sXG4gICAgeyBldmVudFR5cGU6IFwiY2xpY2tcIiwgaGFuZGxlcjogc2hpcFBsYWNlbWVudEhhbmRsZXIgfSxcbiAgXTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIEFwcEhlbHBlcnMudG9nZ2xlTW9kYWwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC5lbmRnYW1lXCIpLCBcImhpZGVcIik7XG4gICAgUmVuZGVyZXIucmVuZGVyR2FtZWJvYXJkKFwiLmdhbWVib2FyZC5pbml0aWFsXCIpO1xuICAgIFJlbmRlcmVyLnJlbmRlckdhbWVib2FyZChcIi5nYW1lYm9hcmQucGxheWVyXCIpO1xuICAgIFJlbmRlcmVyLnJlbmRlckdhbWVib2FyZChcIi5nYW1lYm9hcmQuY29tcHV0ZXJcIik7XG4gICAgUmVuZGVyZXIuYXR0YWNoRXZlbnRMaXN0ZW5lcnMoXCIuZ2FtZWJvYXJkLmluaXRpYWxcIiwgZXZlbnRMaXN0ZW5lcnMpO1xuXG4gICAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGVCdG5cIik7XG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3RhdGVTaGlwcyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufSkoKTtcblxuQ29udHJvbGxlci5pbml0KCk7XG4iLCJpbXBvcnQgeyBGYWN0b3J5SGVscGVycyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBjb25zdCBTaGlwRmFjdG9yeSA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGhpdHMgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBoaXRzICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gaGl0cyA+PSBsZW5ndGg7IC8vIFJldHVybiB0cnVlIGlmIGhpdHMgaXMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIGxlbmd0aFxuXG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgZ2V0IGhpdHMoKSB7XG4gICAgICAvLyBHZXR0ZXIgZnVuY3Rpb24gZm9yIGhpdHMuIFVzaW5nIGZ1bmN0aW9uIGRlY2xhcmF0aW9uIHRvIGVuc3VyZSBpdCBoYXMgYWNjZXNzIHRvIHRoZVxuICAgICAgLy8gYGhpdHNgIHZhcmlhYmxlIGR5bmFtaWNhbGx5LCBzaW5jZSBmdW5jdGlvbiBkZWNsYXJhdGlvbnMgYXJlIGhvaXN0ZWQgYW5kIGNhbiBiZSB1c2VkXG4gICAgICAvLyBiZWZvcmUgdGhleSBhcmUgZGVmaW5lZC4gVGhpcyBhbGxvd3MgYWNjZXNzaW5nIHRoZSBjdXJyZW50IHZhbHVlIG9mIGBoaXRzYCBldmVuIGJlZm9yZVxuICAgICAgLy8gY2FsbGluZyB0aGUgYGhpdGAgZnVuY3Rpb25cbiAgICAgIHJldHVybiBoaXRzO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgR2FtZWJvYXJkRmFjdG9yeSA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZFNpemUgPSAxMDtcbiAgY29uc3QgZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGdyaWRTaXplIH0sICgpID0+XG4gICAgQXJyYXkoZ3JpZFNpemUpLmZpbGwobnVsbClcbiAgKTtcblxuICBjb25zdCBhdHRhY2tlZENvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHcmlkID0gKCkgPT4gZ3JpZDtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgY29vcmRpbmF0ZXMpID0+IHtcbiAgICAvLyBDaGVjayBpZiBhbGwgY29vcmRpbmF0ZXMgYXJlIHdpdGhpbiB0aGUgYm91bmRhcmllcyBvZiB0aGUgZ3JpZFxuICAgIGNvbnN0IHdpdGhpbkJvdW5kYXJpZXMgPSBjb29yZGluYXRlcy5ldmVyeShcbiAgICAgIChbcm93LCBjb2xdKSA9PiByb3cgPj0gMCAmJiByb3cgPCBncmlkU2l6ZSAmJiBjb2wgPj0gMCAmJiBjb2wgPCBncmlkU2l6ZVxuICAgICk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGVyZSBhcmUgYW55IGNvbmZsaWN0cyB3aXRoIGV4aXN0aW5nIHNoaXAgcGxhY2VtZW50cyBvbiB0aGUgZ3JpZFxuICAgIGNvbnN0IGNvbmZsaWN0cyA9IGNvb3JkaW5hdGVzLnNvbWUoKFtyb3csIGNvbF0pID0+IGdyaWRbcm93XVtjb2xdICE9PSBudWxsKTtcblxuICAgIC8vIElmIHRoZSBzaGlwIHBsYWNlbWVudCBpcyB3aXRoaW4gYm91bmRhcmllcyBhbmQgaGFzIG5vIGNvbmZsaWN0cy4uLlxuICAgIGlmICh3aXRoaW5Cb3VuZGFyaWVzICYmICFjb25mbGljdHMpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBvYmplY3QgY29udGFpbmluZyBzaGlwIGluZm9ybWF0aW9uIGFuZCBjb29yZGluYXRlc1xuICAgICAgY29uc3Qgc2hpcEluZm8gPSB7XG4gICAgICAgIHNoaXAsXG4gICAgICAgIGNvb3JkaW5hdGVzLFxuICAgICAgfTtcblxuICAgICAgLy8gUGxhY2UgdGhlIHNoaXAgb24gdGhlIGdyaWQgYnkgdXBkYXRpbmcgdGhlIGNvcnJlc3BvbmRpbmcgY2VsbHNcbiAgICAgIHNoaXBJbmZvLmNvb3JkaW5hdGVzLmZvckVhY2goKFtyb3csIGNvbF0pID0+IHtcbiAgICAgICAgZ3JpZFtyb3ddW2NvbF0gPSBzaGlwSW5mbztcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gU2hpcCBwbGFjZW1lbnQgc3VjY2Vzc2Z1bFxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTsgLy8gT3RoZXJ3aXNlLCBzaGlwIHBsYWNlbWVudCBmYWlsZWRcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggY2VsbCBvZiB0aGUgZ3JpZFxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGdyaWRTaXplOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgZ3JpZFNpemU7IGNvbCArPSAxKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBncmlkW3Jvd11bY29sXTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNlbGwgY29udGFpbnMgYSBzaGlwIGFuZCBpdCdzIG5vdCBhbHJlYWR5IGluY2x1ZGVkIGluIHRoZSBzaGlwcyBhcnJheVxuICAgICAgICBpZiAoXG4gICAgICAgICAgY2VsbCAhPT0gbnVsbCAmJlxuICAgICAgICAgIGNlbGwuc2hpcCAmJlxuICAgICAgICAgICFzaGlwcy5pbmNsdWRlcyhjZWxsLnNoaXApICYmXG4gICAgICAgICAgIWNlbGwuc2hpcC5pc1N1bmsoKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBBZGQgdGhlIHNoaXAgdG8gdGhlIHNoaXBzIGFycmF5XG4gICAgICAgICAgc2hpcHMucHVzaChjZWxsLnNoaXApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoaXBzO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBDb29yZGluYXRlcyA9IChzaGlwKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIGNlbGwgb2YgdGhlIGdyaWRcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBncmlkU2l6ZTsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGdyaWRTaXplOyBjb2wgKz0gMSkge1xuICAgICAgICBjb25zdCBjZWxsID0gZ3JpZFtyb3ddW2NvbF07XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjZWxsIGV4aXN0cyBhbmQgY29udGFpbnMgdGhlIHNwZWNpZmllZCBzaGlwXG4gICAgICAgIGlmIChjZWxsICYmIGNlbGwuc2hpcCA9PT0gc2hpcCkge1xuICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHJvdyBhbmQgY29sdW1uIGluZGljZXMgdG8gYWxwaGFudW1lcmljIGNvb3JkaW5hdGVzIGFuZCBhZGQgdGhlbSB0b1xuICAgICAgICAgIC8vIHRoZSBjb29yZGluYXRlcyBhcnJheVxuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goRmFjdG9yeUhlbHBlcnMuY29udmVydFRvQWxwaGFudW1lcmljKFtyb3csIGNvbF0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGUpID0+IHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gRmFjdG9yeUhlbHBlcnMuY29udmVydFRvSW5kaWNlcyhjb29yZGluYXRlKTtcbiAgICBjb25zdCBjZWxsID0gZ3JpZFtyb3ddW2NvbF07XG5cbiAgICBjb25zdCBzaGlwID0gY2VsbCAmJiBjZWxsLnNoaXA7IC8vIEFjY2VzcyB0aGUgc2hpcCBwcm9wZXJ0eSBvZiB0aGUgY2VsbCBvYmplY3RcblxuICAgIGlmIChzaGlwKSB7XG4gICAgICBzaGlwLmhpdCgpOyAvLyBJbmNyZW1lbnQgaGl0IGNvdW50IG9mIHRoZSBzaGlwXG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChjb29yZGluYXRlKTsgLy8gUmVjb3JkIG1pc3NlZCBhdHRhY2sgY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBhdHRhY2tlZENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgZ2V0QXR0YWNrZWRDb29yZGluYXRlcyA9ICgpID0+IGF0dGFja2VkQ29vcmRpbmF0ZXM7XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBzID0gZ2V0U2hpcHMoKTsgLy8gUmV0cmlldmUgYWxsIHRoZSBzaGlwcyBvbiB0aGUgZ2FtZWJvYXJkXG5cbiAgICAvLyBDaGVjayBpZiBhbGwgc2hpcHMgYXJlIHN1bmssIHJldHVybiB0cnVlIGlmIHllcywgYW5kIHJldHVybiBmYWxzZSBpZiBub1xuICAgIHJldHVybiBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRHcmlkLFxuICAgIHBsYWNlU2hpcCxcbiAgICBnZXRTaGlwcyxcbiAgICBnZXRTaGlwQ29vcmRpbmF0ZXMsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRBdHRhY2tzLFxuICAgIGdldEF0dGFja2VkQ29vcmRpbmF0ZXMsXG4gICAgYWxsU2hpcHNTdW5rLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IFBsYXllckZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICBjb25zdCBhdHRhY2tlZENvb3JkaW5hdGVzID0gbmV3IFNldCgpOyAvLyBTZXQgdG8ga2VlcCB0cmFjayBvZiBhdHRhY2tlZCBjb29yZGluYXRlc1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteUdhbWVib2FyZCkgPT4ge1xuICAgIGNvbnN0IGdyaWRTaXplID0gZW5lbXlHYW1lYm9hcmQuZ2V0R3JpZCgpLmxlbmd0aDtcbiAgICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gRmFjdG9yeUhlbHBlcnMuZ2V0QWxsVmFsaWRDb29yZGluYXRlcyhncmlkU2l6ZSk7XG5cbiAgICBsZXQgY29vcmRpbmF0ZSA9IFwiXCI7XG5cbiAgICAvLyBQZXJmb3JtIGEgZG8td2hpbGUgbG9vcCB1bnRpbCBhIHVuaXF1ZSBjb29yZGluYXRlIGlzIGZvdW5kXG4gICAgZG8ge1xuICAgICAgLy8gR2VuZXJhdGUgYSByYW5kb20gaW5kZXggYmFzZWQgb24gdGhlIGxlbmd0aCBvZiB2YWxpZENvb3JkaW5hdGVzIGFycmF5XG4gICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbGlkQ29vcmRpbmF0ZXMubGVuZ3RoKTtcblxuICAgICAgLy8gR2V0IHRoZSBjb29yZGluYXRlIGF0IHRoZSByYW5kb20gaW5kZXhcbiAgICAgIGNvb3JkaW5hdGUgPSB2YWxpZENvb3JkaW5hdGVzW3JhbmRvbUluZGV4XTtcbiAgICB9IHdoaWxlIChcbiAgICAgIC8vIENvbnRpbnVlIGxvb3Bpbmcgd2l0aG91dCBwZXJmb3JtaW5nIGFueSBhY3Rpb25zIGlmIHRoZSBjb29yZGluYXRlIGlzIGFscmVhZHlcbiAgICAgIC8vIGluIHRoZSBwbGF5ZXJzIGF0dGFja2VkQ29vcmRpbmF0ZXMgc2V0IG9yIGlzIGluY2x1ZGVkIGluIHRoZSBlbmVteUdhbWVib2FyZHNcbiAgICAgIC8vIGF0dGFja2VkQ29vcmRpbmF0ZXMgYXJyYXlcbiAgICAgIGF0dGFja2VkQ29vcmRpbmF0ZXMuaGFzKGNvb3JkaW5hdGUpIHx8XG4gICAgICBlbmVteUdhbWVib2FyZC5nZXRBdHRhY2tlZENvb3JkaW5hdGVzKCkuaW5jbHVkZXMoY29vcmRpbmF0ZSlcbiAgICApO1xuXG4gICAgLy8gQWRkIHRoZSBhdHRhY2tlZCBjb29yZGluYXRlIHRvIHRoZSBwbGF5ZXJzIHNldCBvZiBhdHRhY2tlZCBjb29yZGluYXRlc1xuICAgIGF0dGFja2VkQ29vcmRpbmF0ZXMuYWRkKGNvb3JkaW5hdGUpO1xuXG4gICAgLy8gUGVyZm9ybSB0aGUgYXR0YWNrIG9uIHRoZSBlbmVteSBnYW1lYm9hcmRcbiAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBhdHRhY2ssXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IEZhY3RvcnlIZWxwZXJzID0gKCgpID0+IHtcbiAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IGNvbnZlcnRUb0luZGljZXMgPSAoY29vcmRpbmF0ZSkgPT4ge1xuICAgIGNvbnN0IGNvbHVtbiA9IGNvb3JkaW5hdGUuY2hhckNvZGVBdCgwKSAtIDY1OyAvLyBDb252ZXJ0IGNvbHVtbiBsZXR0ZXIgdG8gaW5kZXhcbiAgICBjb25zdCByb3cgPSBwYXJzZUludChjb29yZGluYXRlLnNsaWNlKDEpLCAxMCkgLSAxOyAvLyBDb252ZXJ0IHJvdyBudW1iZXIgdG8gaW5kZXggd2l0aCByYWRpeCAxMFxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICB9O1xuXG4gIGNvbnN0IGNvbnZlcnRUb0FscGhhbnVtZXJpYyA9IChbcm93LCBjb2x1bW5dKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29sdW1uICsgNjUpOyAvLyBDb252ZXJ0IGNvbHVtbiBpbmRleCB0byBsZXR0ZXJcbiAgICByZXR1cm4gY29vcmRpbmF0ZSArIChyb3cgKyAxKTsgLy8gQ29udmVydCByb3cgaW5kZXggdG8gbnVtYmVyXG4gIH07XG5cbiAgY29uc3QgZ2V0QWxsVmFsaWRDb29yZGluYXRlcyA9IChncmlkU2l6ZSkgPT4ge1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGdyaWRTaXplOyByb3cgKz0gMSkge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgZ3JpZFNpemU7IGNvbCArPSAxKSB7XG4gICAgICAgIGNvbnN0IGFscGhhbnVtZXJpY0Nvb3JkaW5hdGUgPSBGYWN0b3J5SGVscGVycy5jb252ZXJ0VG9BbHBoYW51bWVyaWMoW1xuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBjb2wsXG4gICAgICAgIF0pO1xuICAgICAgICB2YWxpZENvb3JkaW5hdGVzLnB1c2goYWxwaGFudW1lcmljQ29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjb252ZXJ0VG9JbmRpY2VzLFxuICAgIGNvbnZlcnRUb0FscGhhbnVtZXJpYyxcbiAgICBnZXRBbGxWYWxpZENvb3JkaW5hdGVzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlbHBlcnMgPSAoKCkgPT4ge1xuICBjb25zdCB0b2dnbGVNb2RhbCA9IChtb2RhbCwgY2hvaWNlKSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlZE1vZGFsID0gbW9kYWw7XG5cbiAgICBjb25zdCBvdmVybGF5ID0gbW9kYWwuY2xvc2VzdChcIi5vdmVybGF5XCIpO1xuICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IGNob2ljZSA9PT0gXCJzaG93XCIgPyBcImZsZXhcIiA6IFwibm9uZVwiO1xuXG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVZhbHVlO1xuICAgIHRvZ2dsZWRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVZhbHVlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgdG9nZ2xlTW9kYWwsXG4gIH07XG59KSgpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oMzgwKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNzc2KTtcbiJdLCJuYW1lcyI6WyJjb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJyb3ciLCJjb2wiLCJzcXVhcmUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImFwcGVuZENoaWxkIiwiZXZlbnRMaXN0ZW5lcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImxpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50VHlwZSIsImhhbmRsZXIiLCJwbGF5ZXJHYW1lYm9hcmQiLCJzaGlwVHlwZXMiLCJ0eXBlIiwibGVuZ3RoIiwiY3VycmVudFNoaXBJbmRleCIsInNoaXBQbGFjZW1lbnRNb2RlIiwiaXNWZXJ0aWNhbCIsInJvdGF0ZVNoaXBzIiwiZSIsInRhcmdldCIsInN0YXJ0Um93IiwicGFyc2VJbnQiLCJzdGFydENvbCIsIkFycmF5IiwiZnJvbSIsIl8iLCJpIiwicGxheWVyU3F1YXJlIiwiaW5pdGlhbFNxdWFyZSIsImhvdmVyZWRTcXVhcmUiLCJyZW1vdmUiLCJzaGlwQ29vcmRpbmF0ZXMiLCJzaGlwIiwicGxhY2VTaGlwIiwic2V0VGltZW91dCIsInRvZ2dsZU1vZGFsIiwiY29uc29sZSIsImxvZyIsImdldFNoaXBzIiwiYWRkZWRTaGlwIiwiaW5kZXgiLCJzaGlwc0Nvb3JkaW5hdGVzIiwiZ2V0U2hpcENvb3JkaW5hdGVzIiwibmV4dFNoaXBUeXBlIiwiaW5pdCIsIlNoaXBGYWN0b3J5IiwiaGl0cyIsImhpdCIsImlzU3VuayIsIkdhbWVib2FyZEZhY3RvcnkiLCJncmlkU2l6ZSIsImdyaWQiLCJmaWxsIiwiYXR0YWNrZWRDb29yZGluYXRlcyIsIm1pc3NlZEF0dGFja3MiLCJzaGlwcyIsImNlbGwiLCJpbmNsdWRlcyIsInB1c2giLCJnZXRHcmlkIiwiY29vcmRpbmF0ZXMiLCJ3aXRoaW5Cb3VuZGFyaWVzIiwiZXZlcnkiLCJjb25mbGljdHMiLCJzb21lIiwic2hpcEluZm8iLCJjb252ZXJ0VG9BbHBoYW51bWVyaWMiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRpbmF0ZSIsImNvbnZlcnRUb0luZGljZXMiLCJnZXRNaXNzZWRBdHRhY2tzIiwiZ2V0QXR0YWNrZWRDb29yZGluYXRlcyIsImFsbFNoaXBzU3VuayIsIkZhY3RvcnlIZWxwZXJzIiwidmFsaWRDb29yZGluYXRlcyIsImNvbHVtbiIsImNoYXJDb2RlQXQiLCJzbGljZSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImdldEFsbFZhbGlkQ29vcmRpbmF0ZXMiLCJhbHBoYW51bWVyaWNDb29yZGluYXRlIiwiQXBwSGVscGVycyIsIm1vZGFsIiwiY2hvaWNlIiwidG9nZ2xlZE1vZGFsIiwiZGlzcGxheVZhbHVlIiwiY2xvc2VzdCIsInN0eWxlIiwiZGlzcGxheSIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsInVuZGVmaW5lZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiZCIsImRlZmluaXRpb24iLCJrZXkiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwib2JqIiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCJdLCJzb3VyY2VSb290IjoiIn0=