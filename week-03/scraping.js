import puppeteer from "puppeteer";
import fetch from "node-fetch";
import fs from "fs";

const filePath = 'data.json'
const urlPupp = 'https://weworkremotely.com/categories/remote-front-end-programming-jobs#job-listings'


const max_retries = 3;

async function withRetry(fn, retries = max_retries) {
  try {
    return await fn();
  } catch (error) {
    if (retries > max_retries) {
      console.log(`Retrying... attempts left: ${retries}`);
      return await withRetry(fn, retries - 1);
    } else {
      throw error;
    }
  }
}


//screatData with Puppeteer
async function getJobScreap(page) {
    return await withRetry(async () => {
      try {
        return await page.evaluate(() => {
          const jobs = [];
          const jobList = document.querySelectorAll(".jobs ul li a");
          for (let job of jobList) {
            const titleElement = job.querySelector(".title");
            const companyElement = job.querySelector(".company");
            const locationElement = job.querySelector(".region");
  
            if (titleElement && companyElement && locationElement) {
              const title = titleElement.innerText;
              const company = companyElement.innerText;
              const location = locationElement.innerText;
              const url = job.href;
              jobs.push({ title, company, location, url });
            }
          }
          return jobs;
        });
      } catch (error) {
        console.error("Error occurred while getting job listings:", error);
        return [];
      }
    });
  }


//=========================================
//API COM FETCH

const urlAPI = "https://remoteok.com/api"

async function getRemoteOkJobsAPI() {
    return await withRetry(async () => {
      const response = await fetch("https://remoteok.com/api");
      if (!response.ok) {
        throw new Error(`RemoteOK API responded with status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((job) => ({
        title: job.position,
        company: job.company,
        location: job.location || "Remote",
        url: job.url,
      }));
    });
  }
  

//MAIN

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await withRetry(async () => {
      await page.goto(
        "https://weworkremotely.com/categories/remote-front-end-programming-jobs#job-listings",
        { waitUntil: "networkidle2" }
      );
    });

    const jobs = await getJobScreap(page);

    const remoteOkJobs = await getRemoteOkJobsAPI();

    const combinedJobs = [...jobs, ...remoteOkJobs];

    fs.writeFile("data.json", JSON.stringify(combinedJobs, null, 2), (err) => {
      if (err) {
        console.error("Error occurred while saving job listings:", err);
      } else {
        console.log("Job listings saved successfully.");
      }
    });

    await browser.close();
  } catch (error) {
    console.error("Error occurred while scraping:", error);
  }
})();

