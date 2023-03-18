![git branch at different stages](https://user-images.githubusercontent.com/25206487/226081196-e55f18b6-3aa4-478e-b52f-eef0f2c812dd.png)

# Angular Commit Messages
https://medium.com/@carlosalmonte04/angular-commit-messages-541b2ecadde

In order to have a scalable codebase where team members can work independently while keeping code conflicts to a minimum, one must adhere to a certain set of coding rules. Rules that can be enforced amongst engineers, person to person, and other rules that can be enforced by tools such as prettier.

It goes without saying, if some of these rules are left for humans to enforce they are prone to fail silently, that is why tools such as eslint, prettier and husky exist. In this post, I will focus on discussing the set of rules that are based on the angular commit messages requirements and can be enforced by husky and commitlint.

Angular’s repo, for example, requires that all commit messages contain a mandatory header and body + an optional footer.

Here is how the **header** should look like:
```
// https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header

// Commit message **header**
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test

// Example 
fix(router): fix payload parameter in post request // header
```
_Side note: Beware that the website for conventional commits and the actual angular commit messages requirements look to be out of sync as evidenced by the website still making use of chore as a type when it was removed on this commit._

Here is how the **body** should look like:
```
fix(router): fix payload parameter in post request // header

Access first name parameter correctly from request payload // **body**
```

"Just as in the summary, use the imperative, present tense: “fix” not “fixed” nor “fixes”."

Here is an example of the **footer**:
```
fix(router): fix payload parameter in post request // header

Access first name parameter correctly from request payload // body

#19 // **footer**
```
"The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to."

Here are two examples of `BREAKING CHANGE` and `DEPRECATED` cases that I have personally not encountered yet but seem to be useful in determining major version releases.
```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```
or
```
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```
A full example with header, body and footer would look like this:
```
fix(router): fix payload parameter in post request // header

Access first name parameter correctly from request payload // body

#19 // footer
```
But aren’t these just more unnecessary rules that people created to make our lives more difficult? Yes and no. It is a bit tedious having to think what if a title should be refactor or build when some of the work overlaps.


![someone playing with two basketballs at once](https://media.giphy.com/media/2XflxzlENDtNwKSV2j6/giphy.gif)

However, following the angular commit convention helps enumerate version numbers depending on the commit history.

Using 0.71.4 as an example, a commit message with title `fix` would entail a patch release (0.71.x), a title `feat` would entail a minor (0.x.4) release, and a commit message with the term `BREAKING CHANGE` anywhere in the body would entail a major (x.71.4) release. Again, these are based on the commit messages requirements to contribute to angular which can be found here https://github.com/angular/angular/blob/68a6a07/CONTRIBUTING.md#-commit-message-format.

# Conclusion
I’m pretty sure there are more standards but angular’s just happen to have become more popular than others standards out there. But honestly, they are a bit cumbersome to follow and can come across as just another set of rules to make our coding more difficult. It does however, provide more predictability while reading commit messages and also prevents them from getting out of control with titles and scope at the beginning, middle or end of commit messages. It also helps when determining what version the next release should be, and who knows, it may also be used to determine seniority level of engineers, so make sure to use them so your versions, your logs and you look more organized.

# References
1. https://typicode.github.io/husky/#/
2. https://github.com/conventional-changelog/commitlint
3. https://github.com/angular/angular/blob/68a6a07/CONTRIBUTING.md#-commit-message-format

https://www.buymeacoffee.com/carlosalmonte04
