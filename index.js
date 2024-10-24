const elBtnBox = document.querySelector(".js-btn-box");
const elListBox = document.querySelector(".js-lists-box");
const elUsersList = elListBox.querySelector(".js-users-list");
const elPostsList = elListBox.querySelector(".js-posts-list");
const elCommentsList = elListBox.querySelector(".js-comments-list");
const elClearBtn = document.querySelector(".js-clear-btn"); 
const elListItemTemp = document.querySelector(".js-list-item-temp").content;

const handleGetFn = (api, ap) => fetch(api).then(res => res.json()).then(arr => handleRenderFn(arr, ap)).catch(err => console.log(err.message));
const handleClone = (deep, { title, id }) => {
    const clone = elListItemTemp.cloneNode(deep);
    const elListItem = clone.querySelector(".js-list-item");
    elListItem.textContent = title;
    elListItem.dataset.id = id;
    return clone;
}
function handleRenderFn(arr, { users, posts, comments }) {
    if (arr && arr?.length) {
        const docFragment = document.createDocumentFragment();
        if (users && !(posts && comments)) {
            elUsersList.innerHTML = "";
            arr.forEach(({ username, id }) => {
                const clone = handleClone(true, { title: username, id: id });
                docFragment.append(clone);
            });
            elUsersList.append(docFragment);
        };
        if (posts && !(users && comments)) {
            elPostsList.innerHTML = "";
            arr.forEach(({ title, userId }) => {
                const clone = handleClone(true, { title: title, id: userId });
                docFragment.append(clone);
            });
            elPostsList.append(docFragment);
        }
        if (comments && !(posts && users)){ 
            elCommentsList.innerHTML = "";
            arr.forEach(({ body, postId }) => {
                const clone = handleClone(true, { title: body, id: postId });
                docFragment.append(clone);
            });
            elCommentsList.append(docFragment);
        };

    }
}

const handleClearBtn = () => {
    elUsersList.innerHTML = "";
    elPostsList.innerHTML = "";
    elCommentsList.innerHTML = "";
}

const handleClick = evt => {
    if(evt.target.matches(".js-list-item")){
        const id = evt.target.dataset.id;
        handleGetFn(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {users: false, posts: true, comments: false});
        handleGetFn(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, {users: false, posts: false, comments: true});
    }
}

elBtnBox.addEventListener("click", evt => {
    if (evt.target.matches(".js-users-get-btn")) {
        handleGetFn("https://jsonplaceholder.typicode.com/users", { users: true, posts: false, comments: false });
    }
    if (evt.target.matches(".js-posts-get-btn")) {
        handleGetFn("https://jsonplaceholder.typicode.com/posts", { users: false, posts: true, comments: false });
    }
    if (evt.target.matches(".js-comments-get-btn")) {
        handleGetFn("https://jsonplaceholder.typicode.com/comments", { users: false, posts: false, comments: true });
    }
})
elUsersList.addEventListener("click", handleClick)
elClearBtn.addEventListener("click", handleClearBtn)
