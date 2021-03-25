# Project Title

Shopify client application server side.

## Getting Started

Using Git Sparse Checkout 

### Step 1: Create a directory.

I named mine shopify-report-app.acodez.ca. You can name the directory whatever you want.

```
mkdir shopify-report-app.acodez.ca
cd shopify-report-app.acodez.ca
```

### Step 2: Initialize a Git repository

```
git init
```

### Step 3: Enable Sparse Checkouts

```
git config core.sparsecheckout true
```

### Step 4: Tell Git which directories you want

Explain what these tests test and why

```
echo ClientApp/Server/ >> .git/info/sparse-checkout
```

### Step 5: Add the remote

```
git remote add -f origin https://gitlab.com/acodez/shopify-report-app.git
```

### Final Step: Fetch the files

```
git pull origin master
```

You should now have the ClientApp/Server directory. No other Git source files exist in your local copy.