import strapi from './client';
import qs from 'qs';

export const getJobs = async ({ start = 0, limit = 100 } = {}) => {
    const query = qs.stringify(
        {
            populate: ['company', 'company.logo', 'company', 'skillsTags'],
            pagination: {
                start,
                limit
            }
        },
        {
            encodeValuesOnly: true
        }
    )
    const res = await strapi.get(`/jobs?${query}`);
    const rawJobs = res.data.data;
    return rawJobs;
}

export const getJobsSlugs = async () => {
    const query = qs.stringify(
        {
            fields: ['slug']
        },
        {
            encodeValuesOnly: true
        }
    )

    const res = await strapi.get(`/jobs?${query}`)
    const rawSlugs = res.data.data;
    const slugs = rawSlugs.map((rawSlug) => rawSlug.attributes.slug)
    return slugs
}

export const getJobBySlug = async ({ slug }) => {
    const query = qs.stringify(
        {
            filters: {
                slug: {
                    $eq: slug
                }
            },
            populate: [
                'company', 
                'company.logo', 
                'relatedJobs', 
                'relatedJobs.company', 
                'relatedJobs.company.logo', 
                'skillsTags'
            ]
        },
        {
            encodeValuesOnly: true
        }
    )

    const res = await strapi.get(`/jobs?${query}`);
    const rawJob = res.data.data[0];
    return rawJob;
}

export const getJobsByCompanyId = async ({ id }) => {
    const query = qs.stringify(
        {
            filters: {
                company: {
                    id: {
                        $eq: id
                    }
                }
            },
            populate: ['company', 'company.logo', 'skillsTags']
        },
        {
            encodeValuesOnly: true
        }
    );
    const res = await strapi.get(`/jobs?/${query}`);
    const rawJobs = res.data.data;
    return rawJobs;
}