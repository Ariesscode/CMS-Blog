
document.querySelector('.deleteBtn').addEventListener('click', function () {
    const postIdToDelete = this.dataset.postId;
    deletePost(postIdToDelete);
   
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

// async function editPost(id) {
//     const response = await fetch(`/dashboard/${id}`, {
//         method: 'PUT',
//     })
//     if (response.ok) {
//         console.log('Post has been edited');
//         // window.location.replace('/api/dashboard');   
//         return;
//      } else {
//         console.error('Post could not be edited.');
//     }
// }


