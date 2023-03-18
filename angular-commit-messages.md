![git branch at different stages](https://user-images.githubusercontent.com/25206487/226081196-e55f18b6-3aa4-478e-b52f-eef0f2c812dd.png)

# Angular Commit Messages
https://medium.com/p/541b2ecadde/edit

In order to have a scalable codebase where team members can work independently while keeping code conflicts to a minimum, one must adhere to a certain set of coding rules. Rules that can be enforced amongst engineers, person to person, and other rules that can be enforced by tools such as prettier.

It goes without saying, if some of these rules are left for humans to enforce they are prone to fail silently, that is why tools such as eslint, prettier and husky exist. In this post, I will focus on discussing the set of rules that are based on the angular commit messages requirements and are enforced tools like husky and commitlint.

Back in the days I used to manually go through commits looking for errors, in the commit messages, looking for someone to blame for something :), however,  I recently discovered that these messages can be automatically checked with the help of tools such as husky. We can use husky to add commitlint for example, which can be ran when you commit or push.

To get a better picture, angular's repo requires that all commit messages headers follow the following requirements: 

```
// https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header

// Commit message header
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
```

_Side note: Beware that the website for conventional commits and the actual angular commit messages requirements diverged in the removal of chore as a type for example. Please refer to the actual angular repo for most up to date info. commit that removed chore if you are interested._

But aren't these just more unnecessary rules that people created to make our lives more difficult? Yes and no. It is a bit tedious having to think what if a title should be refactor or build when some of the work overlaps.

![someone playing with two basketballs at once](https://media.giphy.com/media/2XflxzlENDtNwKSV2j6/giphy.gif).

However, following the angular commit convention helps enumerate version numbers depending on the commit history.

Using 0.71.4 as an example, a commit message with title fix would entail a patch release (0.71.x), a title feat would entail a minor (0.x.4) release, and a commit message with the term BREAKING CHANGE anywhere in the body would entail a major (x.71.4) release. Again, these are based on the commit messages requirements to contribute to angular which can be found here https://github.com/angular/angular/blob/68a6a07/CONTRIBUTING.md#-commit-message-format.

An example of a valid commit message may look like this:

```
git commit -m"fix(router): fix payload parameter access in post request 

This accesses first name parameter correctly from request payload

#19"
```

The example above would mean the next release can be a path release. 

# Conclusion

I'm pretty sure there are more standards but angular's just happen to have become more popular than others standards out there. But honestly, they are a bit cumbersome to follow and can come across as just another set of rules to make our lives harder. It does however provides more predictability while reading commit messages and also prevents them from getting out of control with titles and scope at the beginning, middle or end of the commit messages. In addition, it also helps when determining what version the next release should be.

# References

1. https://typicode.github.io/husky/#/
2. https://github.com/conventional-changelog/commitlint
3. https://github.com/angular/angular/blob/68a6a07/CONTRIBUTING.md#-commit-message-format

https://www.buymeacoffee.com/carlosalmonte04
