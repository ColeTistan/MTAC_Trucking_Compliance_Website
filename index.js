const get_html_file = (file_name) => {
    fetch(`../templates/${file_name}.html`)
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById(`${file_name}`).innerHTML = data;
  });
}

get_html_file("header");
get_html_file("home");