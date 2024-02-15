const newFormHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector("#comment-text").value.trim();
    const blog_id = document.querySelector(".new-comment-form").dataset.blog;
  
    if (text && blog_id) {
      const response = await fetch(`/api/comment`, {
        method: "POST",
        body: JSON.stringify({ text, blog_id }),
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

  document.querySelector('.new-comment-form').addEventListener("submit", newFormHandler)