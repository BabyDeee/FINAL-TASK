function viewedItem() {
    let page = localStorage.getItem('viewedPost')
    console.log(page);
    let blog = JSON.parse(page)
    console.log(blog)
    // console.log(post.title)
    document.getElementById('post-id').innerHTML = blog.id
    document.getElementById('post-title').innerHTML = blog.title
    document.getElementById('post-body').innerHTML = blog.body
}

viewedItem();