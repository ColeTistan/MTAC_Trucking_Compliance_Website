  // render card links dynamically in links template
const renderCards = () => {
  fetch('/assets/linkData.json').then(response => {
    return response.json();
  }).then(data => {
    let cardLinks = document.getElementById('card-links');
    let cardDiv = '';
    for (let index in data) {
      cardData = data[index];
      cardDiv += `<div class="col-sm-1 col-md-4 col-lg-3">
      <div class="card card-block bg-light h-100 text-center">
        <div class="card-body align-items-center justify-content-center">
          <img class="card-image mb-3" src="${cardData.imgUrl}">
          <h5 class="card-title">${cardData.name}</h5>
        </div>
        <div class="card-footer">
          <a target="_blank" href="${cardData.linkUrl}" class="btn btn-primary">
            click here
          </a>
        </div>
      </div>
      </div>`
    }
    cardLinks.innerHTML = cardDiv;
  })
}

renderCards();