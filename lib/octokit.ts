import { Octokit } from "octokit";

export const octokit: Octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});
