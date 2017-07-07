# GitHub Flow

### The gist

1. `master` must always be deployable.
1. **all changes** made through feature branches (pull-request + merge)
1. Review Code. Have someone review your code.
1. Push and verify changes in Staging/Production.
1. Rebase to avoid/resolve conflicts; merge in to `master`

Or, simply:

![github-flow](../images/github-flow.png)

![flow](https://www.evernote.com/shard/s198/sh/ab988957-0a27-4674-9e81-ddb59fb4f2c8/cce725edb5dac7881acc9bc9db2bd26a/deep/0/Pasted-Image-2014-09-17-19-02.png)



That is the entire flow. It is very simple, very effective and works for fairly large teams.

### The workflow

```bash
# everything is happy and up-to-date in master
git checkout master
git pull origin master

# let's branch to make changes
git checkout -b my-new-feature

# go ahead, make changes now.
$EDITOR file

# commit your (incremental, atomic) changes
git add -p
git commit -m "my changes"

# keep abreast of other changes, to your feature branch or master.
# rebasing keeps our code working, merging easy, and history clean.
git fetch origin
git rebase origin/my-new-feature
git rebase origin/master

# optional: push your branch for discussion (pull-request)
#           you might do this many times as you develop.
git push origin my-new-feature

# optional: feel free to rebase within your feature branch at will.
#           ok to rebase after pushing if your team can handle it!
git rebase -i origin/master

# merge when done developing.
# --no-ff preserves feature history and easy full-feature reverts
# merge commits should not include changes; rebasing reconciles issues
# github takes care of this in a Pull-Request merge
git checkout master
git pull origin master
git merge --no-ff my-new-feature


# optional: tag important things, such as releases
git tag 1.0.0-RC1
```

### useful config

```bash
# autosetup rebase so that pulls rebase by default
git config --global branch.autosetuprebase always

# if you already have branches (made before `autosetuprebase always`)
git config branch.<branchname>.rebase true
```

## Naming Branches

Use prefixes when naming branches:

1. Story Type

```
wip       Works in progress; stuff that won't be finished soon
feat      Feature I'm adding or expanding
fix       Bug fix or experiment
exp       Throwaway branch created to experiment
task      Required changes

```

2. Short Summary: 2-3 words about what the branch contains


For example, branch name - `fix/missing-favicon`


With this convention, you can quickly tell which branches have reached each different stage, and you can group them together easily using Git's pattern matching options.

```
$ git branch --list "bug/*"
bug/missing-favicon
bug/bar-foo

$ git branch --list "*/foo"
wip/foo
feat/foo
exp/foo
```
