alert("Welcome to Dee's Blog! Peace, love and spaghetti! Buttons might take a few seconds to work :( ")
let postRow= document.querySelector('#post-header');
let postBox = [];
let postForm = document.querySelector('#body-form');
let title = document.querySelector('#post-title');
let body = document.querySelector('#textarea-part');


function hostPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            postBox = data;
                let postHeader = '';
                postBox.forEach(post => {
                        postHeader += `
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="card border-0 mx-auto h-100" style="width: 18rem;">
                                    <img src="img/spaghetti.jpg" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${post.title}</h5>
                                        <p class="card-text" id="post-body">${post.body}</p>
                                        <div class="d-flex justify-content-between">
                                            <button class="btn btn-secondary" id="view-btn" onclick="viewOne(${post.id})">view</button>
                                            <button class="btn btn-primary" onclick="changePost(${post.id})">Update</button>
                                            <button class="btn btn-danger" onclick="removePost(${post.id})">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        `
                    });

            postRow.innerHTML = postHeader;
            })


}


 hostPosts();

 
postForm.addEventListener('submit', addPost)

function addPost(e){

    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts' , {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
          }
    })
    .then((response) => response.json())
    .then((data) => {
        postBox.unshift(data);
         postForm.reset();
        let postHeader = '';
        postBox.forEach(post => {
            postHeader += `
                <div class="col-lg-4 col-md-6 mb-4 col-12">
                        <div class="card border-0 mx-auto" style="width: 18rem;">
                            <img src="img/spaghetti.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text" id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-secondary" id="view-btn" onclick="viewOne(${post.id})">view</button>
                                    <button class="btn btn-primary" onclick="changePost(${post.id})">Update</button>
                                    <button class="btn btn-danger" onclick="removePost(${post.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                </div>
            `
        });
        postRow.innerHTML = postHeader;
    })
}


function changePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            let updateTitles = document.querySelectorAll('#post-title')
            let updateBodies = document.querySelectorAll('#post-body')
            updateTitles.forEach((updateTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        updateTitle.innerHTML = data.title
                    }
                }

            })

            updateBodies.forEach((updateBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        updateBody.innerHTML = data.body
                    }
                }

            })

        });
}

function viewOne(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'view.html'
        });
}

function removePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox = postBox.filter(post => post.id !== id)
            let postHeader = '';
            postBox.forEach(post => {
                    postHeader += `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card border-0 h-100" style="width: 18rem;">
                                <img src="img/spaghetti.jpg" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${post.title}</h5>
                                    <p class="card-text" id="post-body">${post.body}</p>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-secondary" id="view-btn" onclick="viewOne(${post.id})">view</button>
                                        <button class="btn btn-primary" onclick="changePost(${post.id})">Update</button>
                                        <button class="btn btn-danger" onclick="removePost(${post.id})">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    `
                });

        postRow.innerHTML = postHeader;
        })


}
