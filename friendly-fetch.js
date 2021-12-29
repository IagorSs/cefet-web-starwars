export async function friendlyFetch(url) {
    const itemStorage = localStorage.getItem(url);

    if(itemStorage !== null) return JSON.parse(itemStorage);

    const fetchedItem = await (await fetch(url)).json();

    localStorage.setItem(url, JSON.stringify(fetchedItem));

    return fetchedItem;
}
