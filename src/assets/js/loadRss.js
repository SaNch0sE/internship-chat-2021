/* eslint-disable no-undef */
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser());
const url = 'https://cors-anywhere.herokuapp.com/https://kagonekoshiro.com/?xml';
/* Fetch the RSS Feed */
fetch(url).then((res) => {
    res.text().then((xmlTxt) => {
        const frag = document.createDocumentFragment();
        let hasBegun = true;
        /* Parse the RSS Feed and display the content */
        try {
            const doc = DOMPARSER(xmlTxt, 'text/xml');
            const heading = document.createElement('h1');
            heading.textContent = url.hostname;
            frag.appendChild(heading);
            doc.querySelectorAll('item').forEach((item) => {
                const temp = document.importNode(document.querySelector('template').content, true);
                const i = item.querySelector.bind(item);
                const t = temp.querySelector.bind(temp);
                t('h2').textContent = i('title') ? i('title').textContent : '-';
                t('a').href = i('link') ? i('link').textContent : '#';
                t('a').textContent = t('a').href;
                t('p').innerHTML = i('description') ? i('description').textContent : '-';
                t('h3').textContent = url.hostname;
                frag.appendChild(temp);
            });
        } catch (e) {
            console.error('Error in parsing the feed');
        }
        if (hasBegun) {
            document.querySelector('output').textContent = '';
            hasBegun = false;
        }
        document.querySelector('output').appendChild(frag);
    });
}).catch(() => console.error('Error in fetching the RSS feed'));
