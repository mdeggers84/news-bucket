$(document).ready(function () {
  $(document).on('click', '.save-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $.get('/api/news/' + newsID).done(function (data) {
      console.log('Saved Article', data);
      $.post('/api/saved/' + newsID, data);
    });
  });

  $('#scrape-btn').on('click', function () {
    $.get('/api/scrape').done(function () {
      window.location.replace = '/';
    });
  });
});
