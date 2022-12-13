//functions that require no dependency

//1. createElemWithText
function createElemWithText(elemType = "p",txtContent = "",optionalClassName) {
    let elemCreated = document.createElement(elemType);
    elemCreated.textContent = txtContent;
  
    if (optionalClassName) {
      elemCreated.className = optionalClassName;
    }
    return elemCreated;
}

//2.createSelectOptions
function createSelectOptions(users){
    let option = [];
     if(!users) return;
 
     return users.map((user) => {
         let options = document.createElement("option");
         options.value = user.id;
         options.textContent = user.name;
         return options;
     });
}

//3.toggleCommentSection
let toggleCommentSection = (postId) => {
    
    if(!postId) return;
    
    let section = document.querySelector(`section[data-post-id='${postId}']`);
    if(section){
        section.classList.toggle('hide');
        return section;
    }
    return null;
}

//4.toggleCommentButton
function toggleCommentButton(postID) {
    if(!postID){
        return;
    }
    const buttonSelect = document.querySelector(`button[data-post-id = "${postID}"]`);

    if(buttonSelect != null){
        buttonSelect.textContent === "Show Comments" ? (buttonSelect.textContent = "Hide Comments") : (buttonSelect.textContent = "Show Comments");
    }
    return buttonSelect;
}

/*
5.deleteChildElements
a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement
*/


function deleteChildElements(parentElement) {
    if(!parentElement?.lastElementChild) return;
    
    let child = parentElement.lastElementChild;
    
    while(child){
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }

    return parentElement;
}

//beginning of small dependency functions 

//6.addButtonListeners
function addButtonListeners() {
    const buttons = document.querySelectorAll('main button')
 
         for (const button of buttons){
           const postId = button.dataset.postId;
           button.addEventListener("click", function (e) {toggleComments(e, postId)}, false);
         }
 
 
         return buttons; 
}

//7.removeButtonListeners
function removeButtonListeners() {
    const buttons = document.querySelectorAll('main button')

   for (const button of buttons){
     const postId = button.dataset.postId;
     button.removeEventListener("click", function (e) {toggleComments(e, postId)}, false);
   }


   return buttons; 
}


/*
8. createComments
a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:
${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element
*/

function createComments(comments) {
    if(!comments) return;
     let fragment = document.createDocumentFragment();
     for(let i = 0; i < comments.length; i++){
        //let comment = comments[i];
         let article = document.createElement("article");
         let h3 = createElemWithText('h3', comment.name);
         let p1 = createElemWithText('p', comment.body);
         let p2 = createElemWithText('p', `From: ${comment.email}`);
         article.appendChild('h3');
         article.appendChild('p');
         article.appendChild('p');
         fragment.appendChild(article);
     }
     return fragment;
}

//9. populateSelectMenu
function populateSelectMenu(users) {
    if(!users){
           return;
       }
       let menu = document.querySelector("#selectMenu");
       let options = createSelectOptions(users);
   
       for(let i = 0; i < options.length; i++){
           menu.append(options[i]);
       }
       return menu;
}
//Async/Await funcitons

//10.getUsers
const getUsers = async() => {
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const data = await response.json();
      return data;
    }
    catch(err){
      console.log(err);
    }
}

//11. getUserPosts
const getUserPosts = async (id) => {
    if(!id) return;
      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
          const data = await response.json();
          return data;   
      }
      catch(err) {
          console.log(err);
      }
}


//12. getUser
const getUser = async (userId) => {
    if(!userId) return;
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        console.log(userId);
        return data;
    }
    catch(err){
        console.log(err);
    }
}


//13. getPostComments
const getPostComments = async (postId) => {
    if(!postId) return;
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const data = await response.json();
      return data;
    }
    catch(err){
      console.log(err);
    }
}

/*
14. displayComments
a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element
*/

const displayComments = async (postId) => {
    if(!postId) return;
    let section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    console.log(section);
    return section;
}

/*
15. createPosts
a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:
g. Create an article element with document.createElement()
h. Create an h2 element with the post title
i. Create an p element with the post body
j. Create another p element with text of `Post ID: ${post.id}`
k. Define an author variable equal to the result of await getUser(post.userId)
l. Create another p element with text of `Author: ${author.name} with
${author.company.name}`
m. Create another p element with the author’s company catch phrase.
n. Create a button with the text 'Show Comments'
o. Set an attribute on the button with button.dataset.postId = post.id
p. Append the h2, paragraphs, button, and section elements you have created to
the article element.
q. Create a variable named section equal to the result of await
displayComments(post.id);
r. Append the section element to the article element
s. After the loop completes, append the article element to the fragment
t. Return the fragment element
*/

const createPosts= async (posts) => {
    /*if(!posts){
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for(const post of posts){
        const article = document.createElement("article");
        const h2 = createElemWithText("h2", post.title);
        const p1 = createElemWithText("p" , post.body);
        const p2 = createElemWithText("p", `Post ID: ${post.id}`);
        const author = await getUser(post.UserID);
        const p3 = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
        const p4 = createElemWithText("p", author.company.catchPhrase);
        const button = ("button", "Show Comments");
        button.dataset.postID = post.id;
        article.append(h2,p1,p2,p3,p4,button);
        const section = await displayComments(post.id);
        article.append(section);
        fragment.append(article);
    }
    return fragment;*/
}

/*
16. displayPosts
a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable
*/

let displayPosts = async(posts) => {
    let main = document.querySelector("main");
    let element;
    if(posts != null){
        element = await createPosts(posts);
    }
    else {
        element = createElemWithText("p", "Select an Employee to display their posts.");
        main.append(element);
        return element;
    }
}

//procedural functions


//17. toggleComments
const toggleComments= (event, postId) =>{

    if(!event || !postId) return;
    event.target.listener = true;
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    return[section,button];
}

/*
//18 refreshPosts
a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
addButtonListeners
b. Is an async function
c. Receives posts JSON data as a parameter
d. Call removeButtonListeners
e. Result of removeButtonListeners is the buttons returned from this function
f. Call deleteChildElements with the main element passed in as the parameter
g. Result of deleteChildElements is the return of the main element
h. Passes posts JSON data to displayPosts and awaits completion
i. Result of displayPosts is a document fragment
j. Call addButtonListeners
k. Result of addButtonListeners is the buttons returned from this function
l. Return an array of the results from the functions called: [removeButtons, main,
fragment, addButtons]
*/

const refreshPosts = async (posts) => {
    if(!posts) return;
    let buttons = removeButtonListeners();
    let main = deleteChildElements(document.querySelector("main"));
    let fragment = await displayPosts(posts);
    let button = addButtonListeners();
    return[buttons, main, fragment, button];

}

/*
//19. selectMenuChangeEventHandler
a. Dependencies: getUserPosts, refreshPosts
b. Should be an async function
c. Automatically receives the event as a parameter (see cheatsheet)
d. Disables the select menu when called into action (disabled property)
e. Defines userId = event.target.value || 1; (see cheatsheet)
f. Passes the userId parameter to await getUserPosts
g. Result is the posts JSON data
h. Passes the posts JSON data to await refreshPosts
i. Result is the refreshPostsArray
j. Enables the select menu after results are received (disabled property)
k. Return an array with the userId, posts and the array returned from refreshPosts:
[userId, posts, refreshPostsArray]
*/

const selectMenuChangeEventHandler = async (e) => {
    let userId = e?.target.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    return [userId, posts, refreshPostsArray];
} 

/*
//20. initPage
a. Dependencies: getUsers, populateSelectMenu
b. Should be an async function
c. No parameters.
d. Call await getUsers
e. Result is the users JSON data
f. Passes the users JSON data to the populateSelectMenu function
g. Result is the select element returned from populateSelectMenu
h. Return an array with users JSON data from getUsers and the select element
result from populateSelectMenu: [users, select]
*/

const initPage = async () => {
    let users = await getUsers();
    let select = populateSelectMenu(users);
    return[users,select];
}

/*
//21. initApp
a. Dependencies: initPage, selectMenuChangeEventHandler
b. Call the initPage() function.
c. Select the #selectMenu element by id
d. Add an event listener to the #selectMenu for the “change” event
e. The event listener should call selectMenuChangeEventHandler when the change
event fires for the #selectMenu
f. NOTE: All of the above needs to be correct for you app to function correctly.
However, I can only test if the initApp function exists. It does not return anything.
*/

const initApp = async () => {
    initPage();
    let select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler, false);
}

document.addEventListener("DOMContentLoaded", initApp, false);



/*NOTE: There is one last step to get your app to function correctly. 
I cannot test for this, but you
must apply it to call the script into action.
*** This must be underneath the definition of initApp in your file.
1. Add an event listener to the document.
2. Listen for the “DOMContentLoaded” event.
3. Put initApp in the listener as the event handler function.
4. This will call initApp after the DOM content 
has loaded and your app will be started.*/