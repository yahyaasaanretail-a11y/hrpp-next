// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    console.log("here");
  const baseUrl = "https://www.hrpostingpartner.com";

  // 1. Fetch jobs from your API
  let jobs: any[] = [];
  try {
    const res = await fetch("https://admin.hrpostingpartner.com/api/jobs", {
      // Revalidate cache every 60s
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      jobs = Array.isArray(data) ? data : data.data || [];
    }
  } catch (error) {
    console.error("Error fetching jobs for sitemap:", error);
  }

  // 2. Static routes
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

  // 3. Dynamic job pages
  const jobPages: MetadataRoute.Sitemap = jobs.map((job: any) => ({
    url: `${baseUrl}/classified-jobs/${job.slug}`,
    lastModified: job.updated_at ? new Date(job.updated_at) : new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // 4. Return combined sitemap
  return [...staticPages, ...jobPages];
}
