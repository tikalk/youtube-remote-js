
=======
youtube-remote-js
=================

a youtube application with a remote (on 2nd client) that controls it using fullstack javascript


Git workflow
-----

We using branch per feature workflow [1](http://randyfay.com/content/rebase-workflow-git), [2](http://www.atlassian.com/git/workflows#!workflow-feature-branch) master is protected and always deployable.
- every feature/bug-fix/any code change should be made in separated branch, Never Ever commit to master.
- rebase your branch from latest master and solve conflicts on your side.
- push branch to remote(github) and `request merge` (pul request).
- if code not passed review please fix, rebase and resubmit.

### Steps
```
# create new branch from master
/home/bystac/project-x (master)> git checkout -b feature-y-2231

# commit all you changes
# swtich back to master, pull changes and rebase your branch
> git checkout master && git pull
> git rebase master feature-y-2231 # shortcut to checkout 
> git push origin feature-y-2231
```

Coding style
---

### Install preparations
git clone https://github.com/tikalk/youtube-remote-js.


0) Install node.js

1) npm -g install sails
2) npm install -g yo
3) To start sails:
go to project directory & run
	npm install
	bower install
	sails lift