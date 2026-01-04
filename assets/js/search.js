
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('query');
    const searchSection = document.getElementById('search');
    const searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchSection.appendChild(searchResults);

    let pages = [
        'Animadores.html',
        'articulo 6 recomendaciones.html',
        'artículo arcane.html',
        'artículo chainsawman.html',
        'artículo el fantásticomisterfox.html',
        'artículo miyazaki.html',
        'articulo si me pasara.html',
        'articulo stop.html',
        'contacto.html',
        'elements.html',
        'generic.html',
        'historia.html',
        'index.html',
        'sobremi.html',
        'tiposdeanimacion.html'
    ];

    let searchIndex = [];

    Promise.all(pages.map(page => fetch(page).then(response => response.text())))
        .then(htmls => {
            htmls.forEach((html, i) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const title = doc.querySelector('title').innerText;
                const body = doc.querySelector('body').innerText;
                searchIndex.push({
                    path: pages[i],
                    title: title,
                    content: body
                });
            });
        });

    searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 3) {
            return;
        }

        const results = searchIndex.filter(page => {
            return page.title.toLowerCase().includes(query) || page.content.toLowerCase().includes(query);
        });

        if (results.length > 0) {
            const resultList = document.createElement('ul');
            results.forEach(result => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = result.path;
                link.textContent = result.title;
                listItem.appendChild(link);
                resultList.appendChild(listItem);
            });
            searchResults.appendChild(resultList);
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
        }
    });
});
