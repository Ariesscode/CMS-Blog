
document.body.addEventListener('click', function (event) {
    if (event.target.matches('.deleteBtn')) {
        const postIdToDelete = event.target.dataset.postId;

        deletePost(postIdToDelete);
    }

    if (event.target.matches('.editBtn')) {
        const postIdToEdit = event.target.dataset.postId;

        deletePost(postIdToEdit);
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

async function editPost(id) {
    try {
        console.log('Edit post with id:', id);

        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'PUT',
        });

        if (response.ok) {
            console.log('Editing post with id:', id);
            window.location.replace('/api/dashboard');

            console.log('Post has been updated');
           
        } else {
            console.error('Error updating post:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

