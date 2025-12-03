function goBack() {
  if(history.length>1) history.back();
  else location.href="index.html";
}

const badWords = ["욕1","욕2","욕3"];
function filter(text){ badWords.forEach(w=>text=text.replace(new RegExp(w,"gi"),"***")); return text; }

function savePost() {
  let title = document.getElementById("title").value;
  let content = filter(document.getElementById("content").value);
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push({
    id: Date.now(),
    title,
    content,
    avatar: getAvatar(),
    likes: 0,
    date: new Date().toLocaleString(),
    comments: []
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  location.href = "index.html";
}

if(location.pathname.includes("index")){
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const list = document.getElementById("post-list");
  posts.slice().reverse().forEach(p=>{
    list.innerHTML += `<div class="post-card glass" onclick="location.href='post.html?id=${p.id}'">
      ${p.avatar} <b>${p.title}</b><br>
      <small>${p.date}</small><br>
      ❤️ ${p.likes}
    </div>`;
  });

  let v = JSON.parse(localStorage.getItem("visits")) || {};
  let today = new Date().toLocaleDateString();
  v[today] = (v[today]||0)+1;
  localStorage.setItem("visits",JSON.stringify(v));
}

if(location.pathname.includes("post")){
  const id = Number(new URLSearchParams(location.search).get("id"));
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let p = posts.find(x=>x.id===id);
  document.getElementById("title-box").innerText = p.title;
  document.getElementById("content-box").innerText = p.content;
  document.getElementById("like-count").innerText = p.likes;
  document.getElementById("avatar-box").innerHTML = p.avatar;
  loadComments(p);
}

function likePost(){
  const id = Number(new URLSearchParams(location.search).get("id"));
  let posts = JSON.parse(localStorage.getItem("posts"));
  let p = posts.find(x=>x.id===id);
  p.likes++;
  localStorage.setItem("posts",JSON.stringify(posts));
  document.getElementById("like-count").innerText = p.likes;
}

function addComment(){
  const id = Number(new URLSearchParams(location.search).get("id"));
  let posts = JSON.parse(localStorage.getItem("posts"));
  let p = posts.find(x=>x.id===id);
  let text = filter(document.getElementById("comment-input").value);
  if(!text.trim()) return;
  p.comments.push({text, avatar:getAvatar()});
  localStorage.setItem("posts",JSON.stringify(posts));
  loadComments(p);
  document.getElementById("comment-input").value = "";
}

function loadComments(p){
  const list = document.getElementById("comment-list");
  list.innerHTML = "";
  p.comments.forEach((c,index)=>{
    list.innerHTML += `<div class="comment">
      ${c.avatar} ${c.text}
      <button class="btn small danger" onclick="deleteComment(${p.id},${index})">삭제</button>
    </div>`;
  });
}

function deletePost(id){
  const pw = prompt("관리자 비밀번호:");
  if(pw!=="admin123") return alert("비밀번호 틀림");
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter(x=>x.id!==Number(id));
  localStorage.setItem("posts",JSON.stringify(posts));
  alert("삭제됨");
  location.reload();
}

function deleteComment(postId,index){
  const pw = prompt("관리자 비밀번호:");
  if(pw!=="admin123") return alert("비밀번호 틀림");
  let posts = JSON.parse(localStorage.getItem("posts"));
  let p = posts.find(x=>x.id===Number(postId));
  p.comments.splice(index,1);
  localStorage.setItem("posts",JSON.stringify(posts));
  loadComments(p);
}
