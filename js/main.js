//functions that require no dependency

function createElemWithText(elemType = "p",txtContent = "", optionalClassName){
    let elemCreated = document.createElement(elemType);
    elemCreated.textContent = txtContent;

    if(optionalClassName){
        elemCreated.className = optionalClassName;

    }
    return elemCreated;

}

function createSelectOptions(){}

function toggleCommentSection(postID){
    if(!postId){
        return undefined;
    } else{
    const commentSections = document.querySelectorAll('[data-post-id]');
    for(let i = 0; i < commentSections[i]; i++){
        const commentSection = commentSections[i];
    }
    if(commentSections.getAttribute('data-post-id') === postId){
        commentSections.classList.toggle('hide');
        return commentSections;
    }
    }
}

function toggleCommentButton(){}

function deleteChildElements(){}

//beginning of small dependency functions 

function addButtonListeners(){}

function removeButtonListeners(){}

function createComments(){}

function populateSelectMenu(){}

//Async/Await funcitons

function getUsers(){}

function getUserPosts(){}

function getUser(){}

function getPostComments(){}

//

function displayComments(){}

function createPosts(){}

function displayPosts(){}

//procedural functions

function toggleComments(){}

function refreshPosts(){}

function selectMenuChangeEventHandler(){}

function initPage(){}

function initApp(){}

