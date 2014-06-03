class PocketRedditor
  constructor: ->
    console.log 'pocket redditing'
    @attempts = 0
    setTimeout @find_links, 500

  find_links: =>
    links = $('.queue_list a.original_url')
    @attempts += 1
    if links.length < 1
      if @attempts < 5
        console.log "didn't find any links yet, waiting..."
        setTimeout @find_links, 1000
      else
        console.log 'giving up on finding Pocket links'
      return
    console.log 'found', links.length, 'links:', links
    @extract_original_urls links

  extract_original_urls: (links) ->
    for link_el, i in links
      link = $(link_el)
      pocket_url = link.attr('href')
      original_url = decodeURIComponent(pocket_url.split('?url=')[1])
      id = link.attr('id')
      unless id
        id = "pocket-reddit-link-#{i}"
        link.attr 'id', id
      @get_reddit_url id, original_url

  get_reddit_url: (dom_id, article_url) ->
    query_url = 'http://www.reddit.com/search.json'
    query_data =
      q: article_url
      sort: 'comments'
    $.getJSON query_url, query_data, (data) ->
      console.log article_url, data

new PocketRedditor()
