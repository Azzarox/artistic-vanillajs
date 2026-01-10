import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('IATYXDTQV6', '7235ed5c6a7421f35385abb20dd2caf1');
const index = client.initIndex('photos');

export const getSearchData = async (query) => {
    const { hits: result } = await index.search(query);
    return result
};

