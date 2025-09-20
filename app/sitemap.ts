// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.hrpostingpartner.com";

  // Helper to fetch all jobs across pages
  async function fetchAllJobs(): Promise<any[]> {
    let jobs: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        const res = await fetch(
          `https://admin.hrpostingpartner.com/api/jobs?page=${page}`,
          {
            next: { revalidate: 60 },
          }
        );

        if (!res.ok) break;

        const data = await res.json();

        // adjust if your API uses a different structure
        const jobData = Array.isArray(data.data) ? data.data : [];
        jobs = jobs.concat(jobData);

        // check pagination
        if (data.meta && data.meta.current_page < data.meta.last_page) {
          page++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching jobs for sitemap:", error);
        hasMore = false;
      }
    }

    return jobs;
  }

  // Fetch jobs
  const jobs = await fetchAllJobs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/classified-jobs`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic job pages
  const jobPages: MetadataRoute.Sitemap = jobs.map((job: any) => ({
    url: `${baseUrl}/classified-jobs/${job.slug}`,
    lastModified: job.updated_at ? new Date(job.updated_at) : new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticPages, ...jobPages];
}
