# Description:
#   Replies with a random post from a subreddit
#
# Dependencies:
#   None
#
# Configuration:
#   subreddit_aliases.json
#   HUBOT_SUBREDDIT_ALIASES
#
# Commands:
#   hubot sub me SUBREDDIT - Get a post from the given subreddit
#   hubot SUBREDDIT_ALIAS me - Get a post from the aliased subreddit

url = require("url")
fs = require("fs")

sendRandomPost = (msg, subreddit) ->
  msg.http("https://www.reddit.com/r/#{subreddit}.json")
    .get() (err, res, body) ->
      result = JSON.parse(body)

      urls = [ ]
      for child in result.data.children
        if child.data.domain != "self.#{subreddit}"
          urls.push(child.data.url)

      if urls.count <= 0
        msg.send "Couldn't find anything..."
        return

      rnd = Math.floor(Math.random() * urls.length)
      picked_url = urls[rnd]

      parsed_url = url.parse(picked_url)
      if parsed_url.host == "imgur.com"
        parsed_url.host = "i.imgur.com"
        parsed_url.pathname = parsed_url.pathname + ".jpg"

        picked_url = url.format(parsed_url)

      msg.send picked_url

module.exports = (robot) ->
  aliases = {}

  if process.env.HUBOT_SUBREDDIT_ALIASES
    subs = process.env.HUBOT_SUBREDDIT_ALIASES.split(',')
    for sub in subs
      [alias, subreddit] = sub.replace(/^\s*|\s*$/g, '').split(':')
      aliases[alias] = subreddit

  else if fs.existsSync 'subreddit_aliases.json'
    file = fs.readFileSync 'subreddit_aliases.json', 'utf8'
    aliases = JSON.parse(file);

  for alias, subreddit of aliases
    robot.respond "/#{alias}( me)?/i", (msg) ->
      sendRandomPost(msg, subreddit)

  robot.respond "/sub( me)? (.*)/i", (msg) ->
    subreddit = msg.match[2]
    sendRandomPost(msg, subreddit)
