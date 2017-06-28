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

    $.post('/api/news/', doc);
  });

  $(document).on('click', '.comment-btn', function (event) {
    event.preventDefault();
    var newsID = $(this).data('id');

    $.get('/api/news/' + newsID).done(function (data) {
      console.log(data);
      
    });
  });
});
