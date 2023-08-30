//search expand
const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("search-bar");
const navList = document.getElementById("nav-list");

searchIcon.addEventListener("click", () => {
  if (screen.width <= 767) {
    console.log(1);

    searchInput.classList.toggle("xs:scale-100");
    searchInput.classList.toggle("sm:scale-100");
    searchInput.classList.toggle("xs:scale-0");
    searchInput.classList.toggle("sm:scale-0");
    searchIcon.classList.toggle("xs:translate-x-32");
  }
});

// getting posts
async function fetchPosts() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  const postsData = data.posts;
  return postsData;
}

//getting Users
async function fetchUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=0");
  const data = await res.json();
  const usersData = data.users;
  return usersData;
}

//posts generator

const postsContainer = document.getElementById("posts-container");

fetchPosts().then(async (postsData) => {
  const users = await fetchUsers();

  postsData.forEach((post) => {
    let postTitle = post.title;
    let postBody = post.body;
    let userIdPerPost = post.userId;
    const userData = users.find((user) => {
      return user.id === post.userId;
    });
    let reactions = post.reactions;
    const newGeneratedPost = ` <div class="bg-white p-2 my-2 rounded-md">
      <!-- user data -->
      <div class="flex justify-between items-center mx-4">
        <!-- info -->
        <div class="flex items-center justify-center">
          <a href="./profile.html" class="w-16"
            ><img
              class="w-full h-full object-fit border-2  rounded-full p-2"
              src=${userData && userData.image ? userData.image : ""}
              alt=""
            />
          </a>
          <p class="flex flex-col ml-3">
            <a href="./profile.html" class="font-semibold">${
              userData && userData.firstName && userData.lastName
                ? userData.firstName + " " + userData.lastName
                : ""
            }</a>
            <a class="text-sm" href="./profile.html">${
              userData && userData.company.title ? userData.company.title : ""
            }</a>
          </p>
        </div>
        <!-- follow btn -->
        <p class="text-primaryBlue text-md font-semibold">+ Follow</p>
      </div>
      <!-- post body -->
      <div>
        <!-- content -->
        <p class="m-4">
          ${postTitle}
          ${postBody}
        </p>
        <img src="../../media/post-place-holder.png" alt="" />
      </div>
      <!-- reactions -->
      <div class="flex justify-between mx-6">
        <div>
          <i class="fa-solid fa-heart fa-xs" style="color: #e30d0d"></i>
          <i
            class="fa-solid fa-thumbs-up fa-xs"
            style="color: #1f68e5"
          ></i>
          <span class="text-xs text-gray-500">${reactions}</span>
        </div>
        <div class="text-xs text-gray-500 flex">
          <p class="m-1"><span>25</span> comments</p>
          <p class="m-1"><span>25</span> reposts</p>
        </div>
      </div>
      <!-- controls -->
      <hr />
      <ul class="my-4 flex items-center justify-between mx-6 p-4  gap-10">
        <li class="flex flex-col items-center justify-between cursor-pointer ">
          <i
            class="fa-regular fa-thumbs-up fa-xl my-4 p-2 text-[#5c5e60]"
          ></i>
          Like
        </li>
        <li class="flex flex-col items-center justify-between cursor-pointer">
          <i class="fa-regular fa-comments fa-xl my-4 p-2 text-[#5c5e60]"></i>
          Comment
        </li>
        <li class="flex flex-col items-center justify-between cursor-pointer">
          <i class="fa-solid fa-retweet fa-xl my-4 p-2 text-[#5c5e60]"></i>
          Repost
        </li>
        <li class="flex flex-col items-center justify-between cursor-pointer">
          <i
            class="fa-solid fa-paper-plane fa-xl my-4 p-2 text-[#5c5e60]"
          ></i>
          Send
        </li>
      </ul>
    </div>`;
    postsContainer.innerHTML += newGeneratedPost;
  });
});
// //getting user data
let url = new URL(window.location);
let params = new URLSearchParams(url.search);
let signedInUserEmail = params.get("email");

//customize home page
const homeLink = document.getElementById("homeLink");

// check if user signed in
if (localStorage.getItem(`${signedInUserEmail}`)) {
  let signedInUser = JSON.parse(localStorage.getItem(`${signedInUserEmail}`));
  //change name
  document.getElementById("user-name").innerText = signedInUser.firstName;
  //change profile link
  const profileLinkingIcon = document.querySelectorAll(".profile-link");
  profileLinkingIcon.forEach((link) => {
    link.href = `/dist/profile/profile.html?email=${signedInUser.email}`;
  });
  // Add post
  const addPostInput = document.getElementById("add-post");
  const newPostInput = document.getElementById("new-post-Input");
  const imgPostInput = document.getElementById("new-post-image");
  const postBtn = document.getElementById("post-btn");
  addPostInput.addEventListener("keydown", () => {
    newPostInput.setAttribute("rows", "10");
    postBtn.classList.remove("hidden");
    imgPostInput.classList.remove("hidden");
  });
  postBtn.addEventListener("click", () => {
    const newPostBody = newPostInput.value;
    let file = imgPostInput.files && imgPostInput.files[0];
    let img = new Image();
    let newPostImg = "";
    if (file) {
      img.src = window.URL.createObjectURL(file);
    }
    newPostImg = img.src;
    const newAddedPost = ` <div class="bg-white p-2 my-2 rounded-md">
      <!-- user data -->
      <div class="flex justify-between items-center mx-4">
        <!-- info -->
        <div class="flex items-center justify-center">
          <a href="/dist/profile/profile.html?email=${
            signedInUser.email
          }" class="w-16"
            ><img
              class="w-full h-full object-fit border-2  rounded-full p-2"
              src=${
                signedInUser && signedInUser.image ? signedInUser.image : ""
              }
              alt=""
            />
          </a>
          <p class="flex flex-col ml-3">
            <a href="/dist/profile/profile.html?email=${
              signedInUser.email
            }" class="font-semibold">${
      signedInUser && signedInUser.firstName && signedInUser.lastName
        ? signedInUser.firstName + " " + signedInUser.lastName
        : ""
    }</a>
            <a class="text-sm" href="/dist/profile/profile.html?email=${
              signedInUser.email
            }">${
      signedInUser && signedInUser.title ? signedInUser.title : ""
    }</a>
          </p>
        </div>
        <!-- follow btn -->
        <p class="text-primaryBlue text-md font-semibold">+ Follow</p>
      </div>
      <!-- post body -->
      <div>
        <!-- content -->
        <p class="m-4">
          ${newPostBody}
        </p>
        <img src="${newPostImg ? newPostImg : ""}" alt="" />
      </div>
      <!-- reactions -->
      <div class="flex justify-between mx-6">
        <div>
          <i class="fa-solid fa-heart fa-xs" style="color: #e30d0d"></i>
          <i
            class="fa-solid fa-thumbs-up fa-xs"
            style="color: #1f68e5"
          ></i>
          <span class="text-xs text-gray-500">0</span>
        </div>
        <div class="text-xs text-gray-500 flex">
          <p class="m-1"><span>0</span> comments</p>
          <p class="m-1"><span>0</span> reposts</p>
        </div>
      </div>
      <!-- controls -->
      <hr />
      <ul class="my-4 flex items-center justify-between mx-6 p-4  gap-10">
        <li class="flex flex-col items-center justify-between cursor-pointer ">
          <i
            class="fa-regular fa-thumbs-up fa-xl my-4 p-2 text-[#5c5e60]"
          ></i>
          Like
        </li>
        <li class="flex flex-col items-center justify-between cursor-pointer">
          <i class="fa-regular fa-comments fa-xl my-4 p-2 text-[#5c5e60]"></i>
          Comment
        </li>
        <li class="flex flex-col items-center justify-between cursor-pointer">
          <i class="fa-solid fa-retweet fa-xl my-4 p-2 text-[#5c5e60]"></i>
          Repost
        </li>
        <li class="flex flex-col items-center justify-between cursor-pointer">
          <i
            class="fa-solid fa-paper-plane fa-xl my-4 p-2 text-[#5c5e60]"
          ></i>
          Send
        </li>
      </ul>
    </div>`;
    newPostInput.setAttribute("rows", "2");

    newPostInput.value = "";
    postBtn.classList.add("hidden");
    imgPostInput.classList.add("hidden");
    postsContainer.insertAdjacentHTML("beforebegin", newAddedPost);
  });
} else {
  const profileLinkingIcon = document.querySelectorAll(".profile-link");
  profileLinkingIcon.forEach((link) => {
    link.href = `/dist/index/index.html`;
  });
}
// generate fake users data
fetchUsers().then(async (users) => {
  let i = 1;
  const suggestedAccountsContainer = document.getElementById(
    "suggested-accounts-container"
  );
  users.forEach((user) => {
    if (i < 4) {
      const suggestedAccounts = ` <div class="flex items-start">
      <a href="./profile.html" class="w-16"
        ><img
          class="w-full h-full object-fit border-2 border-primaryBlue rounded-full p-2"
          src="${user.image}"
          alt=""
        />
      </a>
      <p class="flex flex-col justify-start ml-3 mt-1">
        <a href="./profile.html" class="font-semibold"> ${user.firstName}</a>
        <a class="text-sm" href="./profile.html">${user.company.title}</a>
        <button
          class="border-2 rounded-2xl py-1 mt-2 w-20 text-md font-semibold"
        >
          + Follow
        </button>
      </p>
    </div>`;
      suggestedAccountsContainer.innerHTML += suggestedAccounts;
    }
    i++;
  });
});
