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
// //getting user data
let url = new URL(window.location);
let params = new URLSearchParams(url.search);
let signedInUserEmail = params.get("email");

//customize home page
const homeLink = document.getElementById("homeLink");
//customize image
const profileImage = document.getElementById("profile-image");
const profileImageInput = document.getElementById("profile-image-input");

// check if user signed in
if (localStorage.getItem(`${signedInUserEmail}`)) {
  let userObj = JSON.parse(localStorage.getItem(`${signedInUserEmail}`));
  //change name
  document.getElementById("user-name").innerText =
    userObj.firstName + " " + userObj.lastName;
  //setting Title
  const userTitle = document.getElementById("userTitle");
  if (userObj.RecentJob) {
    userTitle.href = `/dist/complete-profile-data/profile-data.html?email=${userObj.email}`;
    userTitle.innerText = userObj.RecentJob;
  } else {
    userTitle.href = `/dist/complete-profile-data/profile-data.html?email=${userObj.email}`;
    userTitle.textContent = "Edit Profile Data";
  }

  const userCity = document.getElementById("userCity");
  userCity.innerText = userObj.country;
  //change profile link
  const profileLinkingIcon = document.querySelectorAll("#home-link");
  profileLinkingIcon.forEach((link) => {
    link.href = `/dist/feed/feed.html?email=${userObj.email}`;
  });
  // listening on when someone selects a file
  profileImageInput.onchange = function (e) {
    e.preventDefault();
    // get the file someone selected
    let file = profileImageInput.files && profileImageInput.files[0];
    // create an image element with that selected file
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    // as soon as the image has been loaded
    img.onload = function () {
      var width = img.naturalWidth,
        height = img.naturalHeight;
      // check its dimensions
      if (width <= 1080 && height <= 1080) {
        profileImage.setAttribute("src", img.src);
      } else {
        profileImageInput.value = "";
        alert("only 1080 px images");
      }
    };
  };
}

//getting Users
async function fetchUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=0");
  const data = await res.json();
  const usersData = data.users;
  return usersData;
}
//adding suggested users
fetchUsers().then(async (users) => {
  let i = 1;
  const suggestedAccountsContainer = document.getElementById(
    "suggested-accounts-container"
  );
  users.forEach((user) => {
    if (i < 5) {
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
