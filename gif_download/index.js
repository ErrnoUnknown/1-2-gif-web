import gifs from './gif_data.js';

const container = document.getElementById('gif-container');
const searchInput = document.getElementById('searchInput');
let filteredGifs = [];

function createGifItem(gif) {
    return `
    <div class="gif-item">
        <img src="${gif.src}">
        <div class="description">
            <p class="gif-title">${gif.title}</p>
            <p class="gif-description">${gif.person}</p>
        </div>
        <button class="download-button" onclick="downloadGIF('${gif.src}', '${gif.filename}')">저장</button>
    </div>`;
}

function renderGifs(gifsToRender) {
    container.innerHTML = '';
    gifsToRender.forEach(gif => {
        const gifItemHTML = createGifItem(gif);
        container.innerHTML += gifItemHTML;
    });
}

function filterGifs(searchTerm) {
    filteredGifs = gifs.filter(gif => {
        return gif.title.toLowerCase().includes(searchTerm) || gif.person.toLowerCase().includes(searchTerm) || gif.hidden_keyword.toLowerCase().includes(searchTerm);
    });
    renderGifs(filteredGifs);
}

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterGifs(searchTerm);
});

function downloadGIF(filename, downloadName) {
    let anchor = document.createElement('a');
    anchor.style.display = 'none';
    document.body.appendChild(anchor);

    anchor.href = filename;
    anchor.setAttribute('download', downloadName);

    anchor.click();

    document.body.removeChild(anchor);
}

function downloadAllGIFs() {
    filteredGifs.forEach(gif => {
        downloadGIF(gif.src, gif.filename);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadAllButton = document.querySelector('.download-all-button');
    filterGifs(' ');
    downloadAllButton.addEventListener('click', downloadAllGIFs);
});

renderGifs(gifs);