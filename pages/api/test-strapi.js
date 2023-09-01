import datasource from '../../datalayer';

export default async function handler(req, res) {
    // const companiesSlugs = await datasource.getCompaniesSlugs();
    // const jobsSlugs = await datasource.getJobsSlugs();
    // const companyBySlug = await datasource.getCompanyBySlug({
    //     slug: 'super-future-india'
    // })
    // const jobBySlug = await datasource.getJobBySlug({
    //     slug: 'full-stack-web-developer'
    // })
    // const jobsByCompanyId = await datasource.getJobsByCompanyId({
    //     id: 1
    // })
    const jobs = await datasource.getJobs({ start: 2, limit: 2 })
    const result = JSON.stringify({
        // companiesSlugs: companiesSlugs,
        // jobsSlugs: jobsSlugs,
        // companyBySlug: companyBySlug,
        // jobBySlug: jobBySlug,
        // jobsByCompanyId: jobsByCompanyId,
        jobs: jobs
    }, null, 2);
    res.status(200).send(result);
}
