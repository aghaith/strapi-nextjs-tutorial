import strapi from './client';
import qs from 'qs';

export const getCompanies = async () => {
    const res = await strapi.get('/companies');
    const rawCompanies = res.data.data;
    return rawCompanies;
}

export const getCompaniesSlugs = async () => {
    const query = qs.stringify(
        {
            fields: ['slug']
        },
        {
            encodeValuesOnly: true
        }
    )

    const res = await strapi.get(`/companies?${query}`)
    const rawSlugs = res.data.data;
    const slugs = rawSlugs.map((rawSlug) => rawSlug.attributes.slug)
    return slugs
}

export const getCompanyBySlug = async ({ slug }) => {
    const query = qs.stringify(
        {
            filters: {
                slug: {
                    $eq: slug
                }
            },
            populate: ['logo', 'coverImage']

        },
        {
            encodeValuesOnly: true
        }
    )

    const res = await strapi.get(`/companies?${query}`);
    const rawCompany = res.data.data[0];
    return rawCompany;
}