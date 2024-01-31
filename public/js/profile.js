const deleteButton = document.querySelector(".delete");

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const description = document.querySelector("#blog-content").value.trim();

  if (title && description) {
    const response = await fetch(`/api/blog`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};


// Array for random gif generator
// _________________________________________________________________

document.addEventListener('DOMContentLoaded', function () {
const profileGifarray = [
  "https://funsubstance.com/uploads/gif/215/215926.gif",
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2278b3fc-f672-4faf-a444-beeb961b3837/d9iwbur-eae690d3-1b68-4763-9316-9f15ea02393f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8yMjc4YjNmYy1mNjcyLTRmYWYtYTQ0NC1iZWViOTYxYjM4MzcvZDlpd2J1ci1lYWU2OTBkMy0xYjY4LTQ3NjMtOTMxNi05ZjE1ZWEwMjM5M2YuZ2lmIn1dXX0.ATVroCn83-Lkt_McmLPxSTdVo8a0fpoOKVp-XRQ44oI",
  "https://clipart-library.com/images/yTkRkXGTE.gif",
  "https://cdn.streamelements.com/uploads/a1d2c157-df6e-469c-8658-52ea113b57d9.gif",
  "https://i.gifer.com/1V94.gif"
]

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * profileGifarray.length);
  return profileGifarray[randomIndex];
}

const randomImageUrl = getRandomImage();
document.getElementById('profileGif').src = randomImageUrl;

});

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

if (deleteButton) {
  deleteButton.addEventListener("click", delButtonHandler);
}
