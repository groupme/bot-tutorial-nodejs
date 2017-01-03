# Hubot Subreddit
[![npm](https://img.shields.io/npm/v/hubot-subreddit.svg)](https://www.npmjs.com/package/hubot-subreddit)

Gets a random post from a subreddit

## Installation

In your hubot repo, run:
`npm install --save hubot-subreddit`

Then add it to your `external-scripts.json` file:

`["hubot-subreddit"]`

## Example Usages

### Aliased subreddit

user> hubot food me

hubot> http://i.imgur.com/abcdef.jpg

### Any subreddit

user> hubot sub me movies

hubot> http://...

## Alias Configuration

### Using config file `subreddit_aliases.json`
```json
{
  "prog": "programming",
  "food": "food"
}
```

### Using environment variable
`export HUBOT_SUBREDDIT_ALIASES="prog:programming,food:food"`
