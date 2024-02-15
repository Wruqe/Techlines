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
        document.location.reload();
       
      } else {
        alert("Failed to create post");
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      console.log(id);
      const response = await fetch(`/api/blog/${id}`, {
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
  
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
  
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", delButtonHandler);
  });
  
