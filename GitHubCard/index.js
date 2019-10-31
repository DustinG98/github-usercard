/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>


           
*/

const cards = document.querySelector(".cards");

axios.get("https://api.github.com/users/DustinG98")
  .then(response => {
    console.log(response.data);
    const newData = githubCreator(response.data);
  })
  .catch(err => {
    console.log(`The data isn't being returned!`, err);
  })


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
 
const followers = [];


axios.get("https://api.github.com/users/DustinG98/followers")
  .then(response => {
    console.log(response)
    response.data.forEach(cv => {
      followers.push(cv.login);
    })
    followers.forEach(cv => {
      axios.get("https://api.github.com/users/" + cv)
      .then(response => {
        const newData = githubCreator(response.data);
    });
    });
  })




// axios.get("https://api.github.com/users/" + username)
//   .then(response => {
//     // console.log(response);
//     // const newData = response.data;
//     // followersArray.forEach(login => {
//     //   newData.forEach(login2 => {
//     //     (login === login2.login ? githubCreator(login2) : null);
//     //   })
//     // })
//     const newData = githubCreator(response.data);
//   })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/




function githubCreator(obj){
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  const h3Name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const followers = document.createElement("p")
  const following = document.createElement("p")
  const bio = document.createElement("p")

  cards.appendChild(card);
  card.append(image, cardInfo);
  cardInfo.append(h3Name, username, location, profile, followers, following, bio);
  

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  h3Name.classList.add("name");
  username.classList.add("username");


  h3Name.textContent = obj.name;
  username.textContent = obj.login;
  location.textContent = `Location: ${obj.location}`
  profile.textContent = `Profile:`
  profileLink.textContent = obj.html_url;
  image.src = obj.avatar_url;
  profileLink.setAttribute("href", obj.html_url);
  followers.textContent = `Followers: ${obj.followers}`;
  following.textContent = `Following: ${obj.following}`;
  bio.textContent = obj.bio;
  profile.append(profileLink);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
