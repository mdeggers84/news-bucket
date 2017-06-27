$(document).ready(function () {
  $(document).on('click', '.save-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $.post('/api/news/' + newsID);
  });

  $('#scrape-btn').on('click', function () {
    $.get('/api/scrape');
    window.location.replace = '/';
  });
});
