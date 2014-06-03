var PocketRedditor,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PocketRedditor = (function() {
  function PocketRedditor() {
    this.find_links = __bind(this.find_links, this);
    console.log('pocket redditing');
    this.attempts = 0;
    setTimeout(this.find_links, 500);
  }

  PocketRedditor.prototype.find_links = function() {
    var links;
    links = $('.queue_list a.original_url');
    this.attempts += 1;
    if (links.length < 1) {
      if (this.attempts < 5) {
        console.log("didn't find any links yet, waiting...");
        setTimeout(this.find_links, 1000);
      } else {
        console.log('giving up on finding Pocket links');
      }
      return;
    }
    console.log('found', links.length, 'links:', links);
    return this.extract_original_urls(links);
  };

  PocketRedditor.prototype.extract_original_urls = function(links) {
    var i, id, link, link_el, original_url, pocket_url, _i, _len, _results;
    _results = [];
    for (i = _i = 0, _len = links.length; _i < _len; i = ++_i) {
      link_el = links[i];
      link = $(link_el);
      pocket_url = link.attr('href');
      original_url = decodeURIComponent(pocket_url.split('?url=')[1]);
      id = link.attr('id');
      if (!id) {
        id = "pocket-reddit-link-" + i;
        link.attr('id', id);
      }
      _results.push(this.get_reddit_url(id, original_url));
    }
    return _results;
  };

  PocketRedditor.prototype.get_reddit_url = function(dom_id, article_url) {
    var query_data, query_url;
    query_url = 'http://www.reddit.com/search.json';
    query_data = {
      q: article_url,
      sort: 'comments'
    };
    return $.getJSON(query_url, query_data, function(data) {
      return console.log(article_url, data);
    });
  };

  return PocketRedditor;

})();

new PocketRedditor();
