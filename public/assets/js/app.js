$(document).ready(function () {
  $('#commentModal').on('shown.bs.modal', function () {
    $('#commentInput').focus();
  });

  $(document).on('click', '.save-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $.get('/api/news/' + newsID).done(function (data) {
      console.log('Saved Article', data);
      $.post('/api/saved/' + newsID, data);
    });
  });

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $.get('/api/saved/' + newsID).done(function (data) {

    });
  });

  $('#scrape-btn').on('click', function () {
    $.get('/api/scrape', function (data) {
      console.log('Scrape Complete', data);
      window.location.replace('/');
    });
  });
});
