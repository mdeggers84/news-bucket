$(document).ready(function () {
  $('#commentModal').on('shown.bs.modal', function () {
    $('#commentInput').focus();
  });

  $(document).on('click', '.save-btn', function (event) {
    event.preventDefault();
    var doc = {};

    doc.title = $(this).parent().prev()
      .find('[class=title]')
      .text();
    doc.link = $(this).parent().prev()
      .find('a')
      .text();

    $.post('/api/saved/', doc);
  });

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $.get('/api/saved/' + newsID).done(function (data) {

    });
  });

  // $('#scrape-btn').on('click', function () {
  //   $.get('/api/scrape', function (data) {
  //     console.log('Scrape Complete', data);
  //     window.location.replace('/');
  //   });
  // });
});
