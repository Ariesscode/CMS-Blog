

document.body.addEventListener('click', function (event) {
    if (event.target.matches('.deleteBtn')) {
        const postIdToDelete = event.target.dataset.postId;

        deletePost(postIdToDelete);
    }

   
   
});
async function deletePost(id) {
    try {
        console.log('Deleting post with id:', id);

        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Deleting post with id:', id);
            window.location.replace('/api/dashboard');

            console.log('Post has been deleted');
           
        } else {
            console.error('Error deleting post:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}


async function editPost(postIdToEdit) {
    console.log('Starting editPost with postIdToEdit:', postIdToEdit);

    try {

        console.log('Making GET request for post with ID:', postIdToEdit);

        const response = await fetch('/api/dashboard/' + postIdToEdit, {
            method: 'GET', // Use 'GET' to retrieve the post data
        }); 

        if (response.ok) {
            const post = await response.json();
            console.log(post);

            document.querySelector(".input-title").value = post.post_heading;
            document.querySelector(".input-text").value = post.post_body;

            document.querySelector("#create-post-button").setAttribute("data-edit", postIdToEdit);
            document.querySelector("#create-post-button").innerText = 'Edit Post';

        } else {
            console.error('Failed to fetch user post for editing.');
        }
    } catch (error) {
        console.error('Error fetching user post for editing:', error);
    }
}





document.querySelector('.editBtn').addEventListener('click', editPost)