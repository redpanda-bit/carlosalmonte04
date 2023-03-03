![GitHub text and branch logo next to it](https://miro.medium.com/v2/resize:fit:720/format:webp/1*WlDRD25r-gHMubq52gEAXg.png)
# Branching for a production ready version control system - Git.
https://medium.com/@carlosalmonte04/branching-for-a-production-ready-version-control-system-git-e616dd193ad

Git is  a crucial part of programming that allows a substantial amount of flexibility. It gives Engineers the ability to take snapshots of projects at any given time during the present and come back to it later when needed - in case we mess some things up. As you can imagine this gives us the ability to get fairly creative with our code.

Many teams use it differently, there are different branching models, different branching name conventions and different merge strategies. However, in this post we will focus on a workflow that follows this branching model release/<version number><?-hotfix> and uses merge as the merge strategy and uses <initials>/<subject>-<ticket number> as the branching naming convention for our individual branches.

1. Aside from the version control system, you can pick up your ticket and move it to in progress.

2. Now, create a branch off of the most up to date branch and follow the proper naming convention. <First and last name initials>/<subject>-<optional ticket number> for example: from the main branch git checkout -b CA/detox-39218. FYI you might also be asked to branch off of the most recent version that is the most-ready to be shipped, this branch can look like release/7.4.0 or release/7.4.1-hotfix. This usually happens when the release branch has already been "cut off" from the main branch. Submitting work to the release branch is usually avoided.

3. When your work is done, push to your independent brach by doing git push origin CA/detox-39218 . If more work was pushed to the destination branch, main in our example, you will need to run git pull origin main and merge the changes from main into your branch.

4. Create a PR for your work. Navigate to the project on github > pull request tab > "new pull request". Find the base branch from the left dropdown if not already there, next find the source branch which is the independent branch where your new work is found.

5. Confirm your changes against the base branch your are sending the pull request to, if it all looks accurate press on "create pull request".

6. Feel free to add comments on the PR if some things do not make sense at a glance.

7. Also, feel free to let the team know you have a PR available for review. Github notifications can be missed and your work might be delivered late if no one gets to review your work on time. It is common for work to be your full responsibility, including having the work reviewed by the reviewer.

Having a consistent workflow allows for reliability in the way we write code. We can receive help from other team members that are also following the same Git standards, decreasing the time needing to recover code.

And hopefully it does not happen to you, but if it does following this strategy will help your work stay safe!

If you made it this far and you still have some questions feel free to reach out to email me at c.darioalmonte@gmail.com or direct message me on twitter https://twitter.com/carlosalmonte04.
